(function () {
  "use strict";

  var STORAGE_KEY = "sbux_qc_data_v1";
  var LIMITS = { employees: 20, drinks: 20, questions: 20 };

  var DB = null;
  var evalState = { step: 1, employeeId: null, drinkId: null, answers: {} };
  var histFilters = { empId: "", drinkId: "" };
  var toastTimer = null;

  /* ---------- storage ---------- */

  function emptyDB() {
    return { employees: [], drinks: [], questions: [], evaluations: [] };
  }

  function loadDB() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyDB();
      var parsed = JSON.parse(raw);
      return {
        employees: Array.isArray(parsed.employees) ? parsed.employees : [],
        drinks: Array.isArray(parsed.drinks) ? parsed.drinks : [],
        questions: Array.isArray(parsed.questions) ? parsed.questions : [],
        evaluations: Array.isArray(parsed.evaluations) ? parsed.evaluations : []
      };
    } catch (err) {
      console.error("Error al cargar datos", err);
      return emptyDB();
    }
  }

  function saveDB() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
  }

  /* ---------- helpers ---------- */

  function uid(prefix) {
    return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function formatDateTime(ts) {
    try {
      return new Date(ts).toLocaleString("es-MX", {
        day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
      });
    } catch (err) {
      return new Date(ts).toString();
    }
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  function emptyStateHtml(icon, msg, view) {
    var btn = view
      ? '<div style="margin-top:12px;"><button class="btn btn-primary" data-action="nav:' + view + '">Ir a agregar</button></div>'
      : "";
    return '<div class="empty-state"><span class="big-emoji">' + icon + "</span>" + esc(msg) + btn + "</div>";
  }

  function downloadBlob(content, filename, type) {
    var blob = new Blob([content], { type: type });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  /* ---------- modal ---------- */

  function openModal(html) {
    document.getElementById("modal-sheet").innerHTML = html;
    document.getElementById("modal-overlay").classList.add("active");
  }

  function closeModal() {
    document.getElementById("modal-overlay").classList.remove("active");
    document.getElementById("modal-sheet").innerHTML = "";
  }

  /* ---------- navigation ---------- */

  function showView(name) {
    document.querySelectorAll(".view").forEach(function (v) {
      v.classList.toggle("active", v.id === "view-" + name);
    });
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.action === "nav:" + name);
    });
    if (name === "historial") renderHistorial();
    window.scrollTo(0, 0);
  }

  /* ---------- scoring / comparison ---------- */

  function computeScore(answers) {
    var yn = answers.filter(function (a) { return a.type === "yn"; });
    if (!yn.length) return null;
    var yes = yn.filter(function (a) { return a.value === true; }).length;
    return Math.round((yes / yn.length) * 100);
  }

  function findPreviousEval(evaluation, sameDrinkOnly) {
    var list = DB.evaluations.filter(function (e) {
      return e.employeeId === evaluation.employeeId &&
        e.id !== evaluation.id &&
        e.createdAt < evaluation.createdAt &&
        (!sameDrinkOnly || e.drinkId === evaluation.drinkId);
    });
    if (!list.length) return null;
    list.sort(function (a, b) { return b.createdAt - a.createdAt; });
    return list[0];
  }

  function compareLine(current, previous) {
    if (!previous || previous.score == null || current.score == null) return null;
    var delta = current.score - previous.score;
    var cls = delta > 0 ? "trend-up" : delta < 0 ? "trend-down" : "trend-flat";
    var arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "●";
    var sign = delta > 0 ? "+" : "";
    return { cls: cls, text: arrow + " " + sign + delta + " pts vs. anterior (" + previous.score + "%)" };
  }

  function computeRanking() {
    return DB.employees.map(function (emp) {
      var evals = DB.evaluations
        .filter(function (e) { return e.employeeId === emp.id && e.score != null; })
        .sort(function (a, b) { return a.createdAt - b.createdAt; });
      var avg = evals.length
        ? Math.round(evals.reduce(function (s, e) { return s + e.score; }, 0) / evals.length)
        : null;
      var last = evals.length ? evals[evals.length - 1] : null;
      var prev = evals.length > 1 ? evals[evals.length - 2] : null;
      var trendDelta = (last && prev) ? last.score - prev.score : null;
      return { emp: emp, avg: avg, count: evals.length, trendDelta: trendDelta };
    }).sort(function (a, b) {
      if (a.avg == null && b.avg == null) return a.emp.name.localeCompare(b.emp.name);
      if (a.avg == null) return 1;
      if (b.avg == null) return -1;
      return b.avg - a.avg;
    });
  }

  /* ---------- render: ranking ---------- */

  function spotHtml(item, cls, medal) {
    return '<div class="spot ' + cls + '">' +
      '<div class="medal">' + medal + "</div>" +
      '<div class="p-name">' + esc(item.emp.name) + "</div>" +
      '<div class="p-score">' + (item.avg == null ? "—" : item.avg + "%") + "</div>" +
      "</div>";
  }

  function renderRanking() {
    var c = document.getElementById("ranking-content");
    if (!DB.employees.length) {
      c.innerHTML = emptyStateHtml("🏆", "Agrega empleados para comenzar a construir el ranking.", "empleados");
      return;
    }
    var ranking = computeRanking();
    var podiumHtml = "";
    if (ranking.length) {
      var p1 = ranking[0], p2 = ranking[1], p3 = ranking[2];
      podiumHtml = '<div class="podium">' +
        (p2 ? spotHtml(p2, "second", "🥈") : '<div class="spot"></div>') +
        (p1 ? spotHtml(p1, "first", "🥇") : '<div class="spot"></div>') +
        (p3 ? spotHtml(p3, "third", "🥉") : '<div class="spot"></div>') +
        "</div>";
    }
    var listHtml = ranking.map(function (item, idx) {
      var trendHtml = "";
      if (item.trendDelta != null) {
        var cls = item.trendDelta > 0 ? "trend-up" : item.trendDelta < 0 ? "trend-down" : "trend-flat";
        var arrow = item.trendDelta > 0 ? "▲" : item.trendDelta < 0 ? "▼" : "●";
        var sign = item.trendDelta > 0 ? "+" : "";
        trendHtml = '<div class="trend ' + cls + '">' + arrow + " " + sign + item.trendDelta + "pp</div>";
      }
      return '<div class="rank-row">' +
        '<div class="rank-pos">' + (idx + 1) + "</div>" +
        '<div class="rank-info">' +
        '<div class="name">' + esc(item.emp.name) + "</div>" +
        '<div class="role">' + esc(item.emp.role || "Sin puesto") + " · " + item.count + " evaluación(es)</div>" +
        "</div>" +
        '<div class="rank-score">' +
        '<div class="val">' + (item.avg == null ? "—" : item.avg + "%") + "</div>" +
        trendHtml +
        "</div>" +
        "</div>";
    }).join("");
    c.innerHTML = podiumHtml + listHtml;
  }

  /* ---------- render: empleados ---------- */

  function renderEmpleados() {
    document.getElementById("emp-counter").textContent = DB.employees.length + "/" + LIMITS.employees;
    document.getElementById("btn-add-empleado").disabled = DB.employees.length >= LIMITS.employees;
    var c = document.getElementById("empleados-content");
    if (!DB.employees.length) {
      c.innerHTML = emptyStateHtml("👤", 'Aún no hay empleados registrados. Toca "+" para agregar el primero.', null);
      return;
    }
    c.innerHTML = DB.employees.map(function (emp) {
      var evals = DB.evaluations.filter(function (e) { return e.employeeId === emp.id && e.score != null; });
      var avg = evals.length ? Math.round(evals.reduce(function (s, e) { return s + e.score; }, 0) / evals.length) : null;
      return '<div class="list-row">' +
        '<div class="info">' +
        '<div class="name">' + esc(emp.name) + "</div>" +
        '<div class="meta">' + esc(emp.role || "Sin puesto") + " · " + evals.length + " evaluación(es)" +
        (avg != null ? " · Prom. " + avg + "%" : "") + "</div>" +
        "</div>" +
        '<div class="row-actions">' +
        '<button class="icon-btn" data-action="edit-empleado:' + emp.id + '" title="Editar">✏️</button>' +
        '<button class="icon-btn danger" data-action="delete-empleado:' + emp.id + '" title="Eliminar">🗑️</button>' +
        "</div>" +
        "</div>";
    }).join("");
  }

  function openEmpleadoForm(id) {
    var emp = id ? DB.employees.find(function (x) { return x.id === id; }) : null;
    openModal(
      '<div class="modal-header"><h2>' + (emp ? "Editar" : "Agregar") + ' empleado</h2><button type="button" class="modal-close" data-action="close-modal">✕</button></div>' +
      '<form id="form-empleado" data-id="' + (emp ? emp.id : "") + '">' +
      '<div class="field"><label>Nombre completo</label><input type="text" name="name" required maxlength="60" value="' + esc(emp ? emp.name : "") + '" placeholder="Ej. Juan Pérez"></div>' +
      '<div class="field"><label>Puesto / Ocupación</label><input type="text" name="role" maxlength="60" value="' + esc(emp ? emp.role : "") + '" placeholder="Ej. Barista"></div>' +
      '<button type="submit" class="btn btn-primary btn-block">Guardar</button>' +
      "</form>"
    );
    var input = document.querySelector("#form-empleado [name=name]");
    if (input) input.focus();
  }

  function saveEmpleadoFromForm(form) {
    var id = form.dataset.id;
    var name = form.name.value.trim();
    var role = form.role.value.trim();
    if (!name) { toast("El nombre es obligatorio"); return; }
    if (id) {
      var emp = DB.employees.find(function (x) { return x.id === id; });
      if (emp) { emp.name = name; emp.role = role; }
    } else {
      if (DB.employees.length >= LIMITS.employees) { toast("Límite de 20 empleados alcanzado"); return; }
      DB.employees.push({ id: uid("emp"), name: name, role: role, createdAt: Date.now() });
    }
    saveDB(); closeModal(); renderAll(); toast("Empleado guardado");
  }

  function deleteEmpleado(id) {
    if (!confirm("¿Eliminar este empleado? Su historial de evaluaciones se conservará, pero ya no aparecerá en el ranking.")) return;
    DB.employees = DB.employees.filter(function (x) { return x.id !== id; });
    saveDB(); renderAll(); toast("Empleado eliminado");
  }

  /* ---------- render: bebidas ---------- */

  function renderBebidas() {
    document.getElementById("drink-counter").textContent = DB.drinks.length + "/" + LIMITS.drinks;
    document.getElementById("btn-add-bebida").disabled = DB.drinks.length >= LIMITS.drinks;
    var c = document.getElementById("bebidas-content");
    if (!DB.drinks.length) {
      c.innerHTML = emptyStateHtml("🥤", 'Aún no hay bebidas registradas. Toca "+" para agregar la primera.', null);
      return;
    }
    c.innerHTML = DB.drinks.map(function (drink) {
      var count = DB.evaluations.filter(function (e) { return e.drinkId === drink.id; }).length;
      return '<div class="list-row">' +
        '<div class="info">' +
        '<div class="name">' + esc(drink.name) + "</div>" +
        '<div class="meta">' + count + " evaluación(es) registradas</div>" +
        "</div>" +
        '<div class="row-actions">' +
        '<button class="icon-btn" data-action="edit-bebida:' + drink.id + '" title="Editar">✏️</button>' +
        '<button class="icon-btn danger" data-action="delete-bebida:' + drink.id + '" title="Eliminar">🗑️</button>' +
        "</div>" +
        "</div>";
    }).join("");
  }

  function openBebidaForm(id) {
    var drink = id ? DB.drinks.find(function (x) { return x.id === id; }) : null;
    openModal(
      '<div class="modal-header"><h2>' + (drink ? "Editar" : "Agregar") + ' bebida</h2><button type="button" class="modal-close" data-action="close-modal">✕</button></div>' +
      '<form id="form-bebida" data-id="' + (drink ? drink.id : "") + '">' +
      '<div class="field"><label>Nombre de la bebida</label><input type="text" name="name" required maxlength="60" value="' + esc(drink ? drink.name : "") + '" placeholder="Ej. Frapuccino de Caramelo"></div>' +
      '<button type="submit" class="btn btn-primary btn-block">Guardar</button>' +
      "</form>"
    );
    var input = document.querySelector("#form-bebida [name=name]");
    if (input) input.focus();
  }

  function saveBebidaFromForm(form) {
    var id = form.dataset.id;
    var name = form.name.value.trim();
    if (!name) { toast("El nombre es obligatorio"); return; }
    if (id) {
      var drink = DB.drinks.find(function (x) { return x.id === id; });
      if (drink) drink.name = name;
    } else {
      if (DB.drinks.length >= LIMITS.drinks) { toast("Límite de 20 bebidas alcanzado"); return; }
      DB.drinks.push({ id: uid("drk"), name: name, createdAt: Date.now() });
    }
    saveDB(); closeModal(); renderAll(); toast("Bebida guardada");
  }

  function deleteBebida(id) {
    if (!confirm("¿Eliminar esta bebida? El historial de evaluaciones que ya la usaron se conservará.")) return;
    DB.drinks = DB.drinks.filter(function (x) { return x.id !== id; });
    saveDB(); renderAll(); toast("Bebida eliminada");
  }

  /* ---------- render: preguntas ---------- */

  function renderPreguntas() {
    document.getElementById("q-counter").textContent = DB.questions.length + "/" + LIMITS.questions;
    document.getElementById("btn-add-pregunta").disabled = DB.questions.length >= LIMITS.questions;
    var c = document.getElementById("preguntas-content");
    if (!DB.questions.length) {
      c.innerHTML = emptyStateHtml("📋", 'Aún no hay preguntas registradas. Toca "+" para agregar la primera.', null);
      return;
    }
    c.innerHTML = DB.questions.map(function (q) {
      return '<div class="list-row">' +
        '<div class="info">' +
        '<div class="name">' + esc(q.text) + "</div>" +
        '<div class="meta">' + (q.type === "yn" ? "Pregunta Sí / No (cuenta para el puntaje)" : "Pregunta abierta (comentario)") + "</div>" +
        "</div>" +
        '<div class="row-actions">' +
        '<button class="icon-btn" data-action="edit-pregunta:' + q.id + '" title="Editar">✏️</button>' +
        '<button class="icon-btn danger" data-action="delete-pregunta:' + q.id + '" title="Eliminar">🗑️</button>' +
        "</div>" +
        "</div>";
    }).join("");
  }

  function openPreguntaForm(id) {
    var q = id ? DB.questions.find(function (x) { return x.id === id; }) : null;
    var type = q ? q.type : "yn";
    openModal(
      '<div class="modal-header"><h2>' + (q ? "Editar" : "Agregar") + ' pregunta</h2><button type="button" class="modal-close" data-action="close-modal">✕</button></div>' +
      '<form id="form-pregunta" data-id="' + (q ? q.id : "") + '">' +
      '<div class="field"><label>Pregunta</label><textarea name="text" required maxlength="160" rows="2" placeholder="Ej. ¿La bebida se sirvió a la temperatura correcta?">' + esc(q ? q.text : "") + "</textarea></div>" +
      '<div class="field"><label>Tipo de respuesta</label>' +
      '<div class="radio-group">' +
      '<label><input type="radio" name="type" value="yn"' + (type === "yn" ? " checked" : "") + '><span>Sí / No</span></label>' +
      '<label><input type="radio" name="type" value="open"' + (type === "open" ? " checked" : "") + '><span>Abierta</span></label>' +
      "</div>" +
      '<div class="field-hint">Las preguntas Sí / No cuentan para el puntaje. Las abiertas son solo comentarios.</div>' +
      "</div>" +
      '<button type="submit" class="btn btn-primary btn-block">Guardar</button>' +
      "</form>"
    );
  }

  function savePreguntaFromForm(form) {
    var id = form.dataset.id;
    var text = form.text.value.trim();
    var type = form.type.value;
    if (!text) { toast("La pregunta no puede estar vacía"); return; }
    if (id) {
      var q = DB.questions.find(function (x) { return x.id === id; });
      if (q) { q.text = text; q.type = type; }
    } else {
      if (DB.questions.length >= LIMITS.questions) { toast("Límite de 20 preguntas alcanzado"); return; }
      DB.questions.push({ id: uid("q"), text: text, type: type, createdAt: Date.now() });
    }
    saveDB(); closeModal(); renderAll(); toast("Pregunta guardada");
  }

  function deletePregunta(id) {
    if (!confirm("¿Eliminar esta pregunta? Las evaluaciones ya guardadas conservarán su respuesta.")) return;
    DB.questions = DB.questions.filter(function (x) { return x.id !== id; });
    saveDB(); renderAll(); toast("Pregunta eliminada");
  }

  /* ---------- evaluar (wizard) ---------- */

  function evalRestart() {
    evalState = { step: 1, employeeId: null, drinkId: null, answers: {} };
    renderEvaluar();
  }

  function evalPickEmployee(id) {
    evalState.employeeId = id;
    evalState.step = 2;
    renderEvaluar();
  }

  function evalPickDrink(id) {
    evalState.drinkId = id;
    evalState.step = 3;
    renderEvaluar();
  }

  function evalBack() {
    if (evalState.step > 1 && evalState.step !== "result") evalState.step--;
    renderEvaluar();
  }

  function evalAnswerYN(qid, val) {
    evalState.answers[qid] = { type: "yn", value: val === "yes" };
    renderEvaluar();
  }

  function evalOpenInput(qid, val) {
    evalState.answers[qid] = { type: "open", value: val };
  }

  function evalSubmit() {
    var emp = DB.employees.find(function (e) { return e.id === evalState.employeeId; });
    var drink = DB.drinks.find(function (d) { return d.id === evalState.drinkId; });
    if (!emp || !drink) { toast("Selecciona empleado y bebida"); return; }
    var answers = DB.questions.map(function (q) {
      var a = evalState.answers[q.id];
      if (q.type === "yn") {
        return { questionId: q.id, text: q.text, type: "yn", value: a ? a.value : null };
      }
      return { questionId: q.id, text: q.text, type: "open", value: a ? (a.value || "") : "" };
    });
    var ynAnswered = answers.filter(function (a) { return a.type === "yn"; });
    if (ynAnswered.some(function (a) { return a.value === null; })) {
      toast("Responde todas las preguntas Sí / No"); return;
    }
    var score = computeScore(answers);
    var newEval = {
      id: uid("ev"),
      employeeId: emp.id, employeeName: emp.name, employeeRole: emp.role,
      drinkId: drink.id, drinkName: drink.name,
      answers: answers, score: score,
      createdAt: Date.now()
    };
    DB.evaluations.push(newEval);
    saveDB();
    evalState.step = "result";
    evalState.resultId = newEval.id;
    renderAll();
    toast("Evaluación guardada");
  }

  function evalResultHtml(ev, isWizardResult) {
    var prevAny = findPreviousEval(ev, false);
    var prevSame = findPreviousEval(ev, true);
    var cmpAny = compareLine(ev, prevAny);
    var cmpSame = (prevSame && (!prevAny || prevSame.id !== prevAny.id)) ? compareLine(ev, prevSame) : null;
    var scoreDisplay = ev.score == null ? "N/A" : ev.score + "%";
    var html = '<div class="score-hero">' +
      '<div class="score-num">' + scoreDisplay + "</div>" +
      '<div class="score-label">' + esc(ev.employeeName) + " · " + esc(ev.drinkName) + "</div>" +
      '<div class="score-label">' + formatDateTime(ev.createdAt) + "</div>" +
      (cmpAny
        ? '<div class="compare ' + cmpAny.cls + '">' + cmpAny.text + "</div>"
        : '<div class="compare">Primera evaluación registrada para este empleado</div>') +
      (cmpSame ? '<div class="compare ' + cmpSame.cls + '">Misma bebida: ' + cmpSame.text + "</div>" : "") +
      "</div>" +
      '<div class="section-title">Respuestas</div>' +
      ev.answers.map(function (a) {
        var answerHtml = a.type === "yn"
          ? '<div class="qa-answer ' + (a.value ? "yes" : "no") + '">' + (a.value ? "Sí ✓" : "No ✗") + "</div>"
          : '<div class="qa-answer open">' + (a.value ? esc(a.value) : '<span class="field-hint">Sin comentario</span>') + "</div>";
        return '<div class="qa-item"><div class="q-text">' + esc(a.text) + "</div>" + answerHtml + "</div>";
      }).join("");
    if (isWizardResult) {
      html += '<div class="btn-row">' +
        '<button class="btn btn-secondary" data-action="eval-restart">Nueva evaluación</button>' +
        '<button class="btn btn-primary" data-action="nav:ranking">Ver ranking</button>' +
        "</div>";
    }
    return html;
  }

  function renderEvaluar() {
    var c = document.getElementById("evaluar-content");
    if (!DB.employees.length) { c.innerHTML = emptyStateHtml("👤", "Primero agrega al menos un empleado.", "empleados"); return; }
    if (!DB.drinks.length) { c.innerHTML = emptyStateHtml("🥤", "Primero agrega al menos una bebida a evaluar.", "bebidas"); return; }
    if (!DB.questions.length) { c.innerHTML = emptyStateHtml("📋", "Primero agrega al menos una pregunta de evaluación.", "preguntas"); return; }

    if (evalState.step === "result") {
      var ev = DB.evaluations.find(function (e) { return e.id === evalState.resultId; });
      if (!ev) { evalRestart(); return; }
      c.innerHTML = evalResultHtml(ev, true);
      return;
    }

    var stepperHtml = '<div class="stepper">' + [1, 2, 3].map(function (n) {
      return '<div class="step ' + (evalState.step >= n ? "done" : "") + '"></div>';
    }).join("") + "</div>";

    if (evalState.step === 1) {
      c.innerHTML = stepperHtml +
        '<div class="progress-summary">Paso 1 de 3 · Selecciona al empleado</div>' +
        '<div class="chip-select">' +
        DB.employees.map(function (e) {
          return '<div class="chip' + (evalState.employeeId === e.id ? " selected" : "") + '" data-action="eval-pick-employee:' + e.id + '">' + esc(e.name) + "</div>";
        }).join("") +
        "</div>";
      return;
    }

    if (evalState.step === 2) {
      c.innerHTML = stepperHtml +
        '<div class="progress-summary">Paso 2 de 3 · Bebida a evaluar</div>' +
        '<button class="btn btn-secondary btn-sm" data-action="eval-back" style="margin-bottom:10px;">← Atrás</button>' +
        '<div class="chip-select">' +
        DB.drinks.map(function (d) {
          return '<div class="chip' + (evalState.drinkId === d.id ? " selected" : "") + '" data-action="eval-pick-drink:' + d.id + '">' + esc(d.name) + "</div>";
        }).join("") +
        "</div>";
      return;
    }

    // step 3
    var qHtml = DB.questions.map(function (q) {
      var a = evalState.answers[q.id];
      if (q.type === "yn") {
        var selYes = a && a.type === "yn" && a.value === true;
        var selNo = a && a.type === "yn" && a.value === false;
        return '<div class="qa-item">' +
          '<div class="q-text">' + esc(q.text) + "</div>" +
          '<div class="btn-row">' +
          '<button type="button" class="btn ' + (selYes ? "btn-primary" : "btn-secondary") + ' btn-sm" data-action="eval-answer-yn:' + q.id + ':yes">Sí</button>' +
          '<button type="button" class="btn ' + (selNo ? "btn-primary" : "btn-secondary") + ' btn-sm" data-action="eval-answer-yn:' + q.id + ':no">No</button>' +
          "</div>" +
          "</div>";
      }
      var val = a && a.type === "open" ? a.value : "";
      return '<div class="qa-item">' +
        '<div class="q-text">' + esc(q.text) + "</div>" +
        '<textarea data-role="open-answer" data-qid="' + q.id + '" rows="2" placeholder="Comentario (opcional)">' + esc(val) + "</textarea>" +
        "</div>";
    }).join("");

    var ynQuestions = DB.questions.filter(function (q) { return q.type === "yn"; });
    var allAnswered = ynQuestions.every(function (q) {
      return evalState.answers[q.id] && evalState.answers[q.id].type === "yn";
    });

    c.innerHTML = stepperHtml +
      '<div class="progress-summary">Paso 3 de 3 · Preguntas</div>' +
      '<button class="btn btn-secondary btn-sm" data-action="eval-back" style="margin-bottom:10px;">← Atrás</button>' +
      qHtml +
      '<button class="btn btn-primary btn-block" data-action="eval-submit"' + (allAnswered ? "" : " disabled") + ">Finalizar evaluación</button>" +
      (ynQuestions.length === 0
        ? '<div class="field-hint" style="text-align:center;margin-top:8px;">No hay preguntas Sí / No: esta evaluación no tendrá puntaje numérico.</div>'
        : "");
  }

  /* ---------- historial ---------- */

  function renderHistorial() {
    var selEmp = document.getElementById("hist-filter-emp");
    var selDrink = document.getElementById("hist-filter-drink");
    selEmp.innerHTML = '<option value="">Todos los empleados</option>' +
      DB.employees.map(function (e) {
        return '<option value="' + e.id + '"' + (histFilters.empId === e.id ? " selected" : "") + ">" + esc(e.name) + "</option>";
      }).join("");
    selDrink.innerHTML = '<option value="">Todas las bebidas</option>' +
      DB.drinks.map(function (d) {
        return '<option value="' + d.id + '"' + (histFilters.drinkId === d.id ? " selected" : "") + ">" + esc(d.name) + "</option>";
      }).join("");

    var list = DB.evaluations.filter(function (e) {
      return (!histFilters.empId || e.employeeId === histFilters.empId) &&
        (!histFilters.drinkId || e.drinkId === histFilters.drinkId);
    }).slice().sort(function (a, b) { return b.createdAt - a.createdAt; });

    var c = document.getElementById("historial-content");
    if (!list.length) {
      c.innerHTML = emptyStateHtml("📜", "No hay evaluaciones que coincidan con el filtro.", null);
      return;
    }
    c.innerHTML = list.map(function (ev) {
      var scoreDisplay = ev.score == null ? "N/A" : ev.score + "%";
      return '<div class="list-row" data-action="hist-open:' + ev.id + '" style="cursor:pointer;">' +
        '<div class="info">' +
        '<div class="name">' + esc(ev.employeeName) + " · " + esc(ev.drinkName) + "</div>" +
        '<div class="meta">' + formatDateTime(ev.createdAt) + "</div>" +
        "</div>" +
        '<div class="row-actions">' +
        '<div class="val" style="font-weight:800;color:var(--green);margin-right:2px;">' + scoreDisplay + "</div>" +
        '<button class="icon-btn danger" data-action="hist-delete:' + ev.id + '" title="Eliminar">🗑️</button>' +
        "</div>" +
        "</div>";
    }).join("");
  }

  function openHistDetail(id) {
    var ev = DB.evaluations.find(function (e) { return e.id === id; });
    if (!ev) return;
    openModal(
      '<div class="modal-header"><h2>Detalle de evaluación</h2><button type="button" class="modal-close" data-action="close-modal">✕</button></div>' +
      evalResultHtml(ev, false)
    );
  }

  function deleteHistEval(id) {
    if (!confirm("¿Eliminar esta evaluación del historial? Esta acción no se puede deshacer.")) return;
    DB.evaluations = DB.evaluations.filter(function (e) { return e.id !== id; });
    saveDB(); renderAll(); toast("Evaluación eliminada");
  }

  /* ---------- datos: export / import / demo / clear ---------- */

  function csvEscape(v) {
    var s = String(v == null ? "" : v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  function exportJSON() {
    downloadBlob(JSON.stringify(DB, null, 2), "respaldo-qc-bebidas-" + todayStr() + ".json", "application/json");
    toast("Respaldo exportado");
  }

  function exportCSV() {
    var rows = [["Fecha", "Empleado", "Puesto", "Bebida", "Puntaje (%)", "Detalle de respuestas"]];
    DB.evaluations.slice().sort(function (a, b) { return b.createdAt - a.createdAt; }).forEach(function (ev) {
      var detail = ev.answers.map(function (a) {
        return a.text + ": " + (a.type === "yn" ? (a.value ? "Sí" : "No") : (a.value || ""));
      }).join(" | ");
      rows.push([
        formatDateTime(ev.createdAt), ev.employeeName, ev.employeeRole || "",
        ev.drinkName, ev.score == null ? "" : String(ev.score), detail
      ]);
    });
    var csv = "﻿" + rows.map(function (r) { return r.map(csvEscape).join(","); }).join("\r\n");
    downloadBlob(csv, "historial-qc-bebidas-" + todayStr() + ".csv", "text/csv;charset=utf-8;");
    toast("Historial exportado");
  }

  function handleImportFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed !== "object") throw new Error("formato inválido");
        if (!confirm("Esto reemplazará TODOS los datos actuales con el contenido del archivo importado. ¿Continuar?")) return;
        DB = {
          employees: Array.isArray(parsed.employees) ? parsed.employees : [],
          drinks: Array.isArray(parsed.drinks) ? parsed.drinks : [],
          questions: Array.isArray(parsed.questions) ? parsed.questions : [],
          evaluations: Array.isArray(parsed.evaluations) ? parsed.evaluations : []
        };
        saveDB(); renderAll(); toast("Datos importados correctamente");
      } catch (err) {
        toast("Archivo inválido, no se pudo importar");
      }
    };
    reader.readAsText(file);
  }

  function buildDemoDB() {
    var now = Date.now();
    var day = 24 * 60 * 60 * 1000;
    var employees = [
      { id: uid("emp"), name: "Ana Torres", role: "Barista", createdAt: now },
      { id: uid("emp"), name: "Luis Ramírez", role: "Barista", createdAt: now },
      { id: uid("emp"), name: "Sofía Guzmán", role: "Barista Trainer", createdAt: now },
      { id: uid("emp"), name: "Carlos Mendoza", role: "Shift Supervisor", createdAt: now }
    ];
    var drinks = [
      { id: uid("drk"), name: "Frapuccino de Caramelo", createdAt: now },
      { id: uid("drk"), name: "Latte Vainilla", createdAt: now },
      { id: uid("drk"), name: "Cold Brew", createdAt: now }
    ];
    var questions = [
      { id: uid("q"), text: "¿Se respetó la receta estándar?", type: "yn", createdAt: now },
      { id: uid("q"), text: "¿La temperatura fue la correcta?", type: "yn", createdAt: now },
      { id: uid("q"), text: "¿La presentación/decorado fue adecuada?", type: "yn", createdAt: now },
      { id: uid("q"), text: "¿El tiempo de preparación fue aceptable?", type: "yn", createdAt: now },
      { id: uid("q"), text: "Observaciones generales", type: "open", createdAt: now },
      { id: uid("q"), text: "¿Qué podría mejorar?", type: "open", createdAt: now }
    ];

    function makeEval(emp, drink, daysAgo, yesCount) {
      var answers = questions.map(function (q, idx) {
        if (q.type === "yn") {
          return { questionId: q.id, text: q.text, type: "yn", value: idx < yesCount };
        }
        return { questionId: q.id, text: q.text, type: "open", value: idx === 4 ? "Buen desempeño general." : "" };
      });
      return {
        id: uid("ev"), employeeId: emp.id, employeeName: emp.name, employeeRole: emp.role,
        drinkId: drink.id, drinkName: drink.name, answers: answers, score: computeScore(answers),
        createdAt: now - daysAgo * day
      };
    }

    var evaluations = [
      makeEval(employees[0], drinks[0], 10, 3),
      makeEval(employees[0], drinks[1], 3, 4),
      makeEval(employees[1], drinks[1], 9, 2),
      makeEval(employees[1], drinks[2], 2, 3),
      makeEval(employees[2], drinks[0], 8, 4),
      makeEval(employees[2], drinks[2], 1, 4),
      makeEval(employees[3], drinks[1], 7, 2),
      makeEval(employees[3], drinks[0], 1, 3)
    ];

    return { employees: employees, drinks: drinks, questions: questions, evaluations: evaluations };
  }

  function loadDemoData() {
    if (!confirm("Esto reemplazará todos los datos actuales con datos de ejemplo. ¿Continuar?")) return;
    DB = buildDemoDB();
    saveDB(); renderAll(); toast("Datos de ejemplo cargados");
  }

  function clearAllData() {
    if (!confirm("¿Borrar TODOS los datos (empleados, bebidas, preguntas y evaluaciones)? Esta acción no se puede deshacer.")) return;
    DB = emptyDB();
    saveDB(); renderAll(); toast("Datos borrados");
  }

  /* ---------- render all ---------- */

  function renderAll() {
    renderRanking();
    renderEvaluar();
    renderEmpleados();
    renderBebidas();
    renderPreguntas();
    renderHistorial();
  }

  /* ---------- event delegation ---------- */

  function handleGlobalClick(e) {
    var target = e.target.closest("[data-action]");
    if (!target) return;
    var parts = target.dataset.action.split(":");
    var action = parts[0], a1 = parts[1], a2 = parts[2];
    switch (action) {
      case "nav": showView(a1); break;
      case "open-datos": showView("datos"); break;
      case "close-modal": closeModal(); break;
      case "add-empleado": openEmpleadoForm(); break;
      case "edit-empleado": openEmpleadoForm(a1); break;
      case "delete-empleado": deleteEmpleado(a1); break;
      case "add-bebida": openBebidaForm(); break;
      case "edit-bebida": openBebidaForm(a1); break;
      case "delete-bebida": deleteBebida(a1); break;
      case "add-pregunta": openPreguntaForm(); break;
      case "edit-pregunta": openPreguntaForm(a1); break;
      case "delete-pregunta": deletePregunta(a1); break;
      case "eval-pick-employee": evalPickEmployee(a1); break;
      case "eval-pick-drink": evalPickDrink(a1); break;
      case "eval-back": evalBack(); break;
      case "eval-answer-yn": evalAnswerYN(a1, a2); break;
      case "eval-submit": evalSubmit(); break;
      case "eval-restart": evalRestart(); break;
      case "hist-open": openHistDetail(a1); break;
      case "hist-delete": deleteHistEval(a1); break;
      case "export-json": exportJSON(); break;
      case "export-csv": exportCSV(); break;
      case "load-demo": loadDemoData(); break;
      case "clear-all": clearAllData(); break;
      default: break;
    }
  }

  function handleGlobalSubmit(e) {
    if (e.target.id === "form-empleado") { e.preventDefault(); saveEmpleadoFromForm(e.target); }
    else if (e.target.id === "form-bebida") { e.preventDefault(); saveBebidaFromForm(e.target); }
    else if (e.target.id === "form-pregunta") { e.preventDefault(); savePreguntaFromForm(e.target); }
  }

  function handleGlobalChange(e) {
    if (e.target.id === "hist-filter-emp") { histFilters.empId = e.target.value; renderHistorial(); }
    else if (e.target.id === "hist-filter-drink") { histFilters.drinkId = e.target.value; renderHistorial(); }
    else if (e.target.id === "import-file-input") { handleImportFile(e.target.files[0]); e.target.value = ""; }
  }

  function handleGlobalInput(e) {
    if (e.target.dataset && e.target.dataset.role === "open-answer") {
      evalOpenInput(e.target.dataset.qid, e.target.value);
    }
  }

  /* ---------- init ---------- */

  function init() {
    DB = loadDB();

    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("submit", handleGlobalSubmit);
    document.addEventListener("change", handleGlobalChange);
    document.addEventListener("input", handleGlobalInput);

    document.getElementById("modal-overlay").addEventListener("click", function (e) {
      if (e.target.id === "modal-overlay") closeModal();
    });

    renderAll();

    if ("serviceWorker" in navigator && (location.protocol === "http:" || location.protocol === "https:")) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
