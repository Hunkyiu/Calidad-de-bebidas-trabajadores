(function () {
  "use strict";

  var STORAGE_KEY = "sbux_qc_data_v2";
  var LAST_EVALUATOR_KEY = "sbux_qc_last_evaluator";
  var LIMITS = { employees: 20, questions: 20 };
  var PHOTO_SIZE = 200;
  var GREETING_NAME = "Partner";
  var ROUNDS_PER_SESSION = 5;

  var CATEGORIES = [
    { id: "caliente", label: "Caliente", icon: "local_fire_department" },
    { id: "helada", label: "Helada", icon: "ac_unit" },
    { id: "frappuccino", label: "Frappuccino", icon: "blender" }
  ];
  var SUBCAT_LABELS = {
    con_cafe: "Con café", sin_cafe: "Sin café",
    base_coffee: "Base coffee", base_cream: "Base cream", frozen: "Frozen",
    especial: "Especiales"
  };

  var DB = null;
  var evalState = { phase: "setup", employeeId: null, evaluatorName: "", rounds: [], roundIndex: 0, resultId: null };
  var histFilters = { empId: "" };
  var recetarioState = { category: "all", search: "" };
  var preguntasState = { category: "caliente" };
  var toastTimer = null;

  /* ---------- storage ---------- */

  function emptyDB() {
    return { employees: [], drinks: [], questionSets: { caliente: [], helada: [], frappuccino: [] }, evaluations: [] };
  }

  function loadDB() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyDB();
      var parsed = JSON.parse(raw);
      var qs = parsed.questionSets || {};
      return {
        employees: Array.isArray(parsed.employees) ? parsed.employees : [],
        drinks: Array.isArray(parsed.drinks) ? parsed.drinks : [],
        questionSets: {
          caliente: Array.isArray(qs.caliente) ? qs.caliente : [],
          helada: Array.isArray(qs.helada) ? qs.helada : [],
          frappuccino: Array.isArray(qs.frappuccino) ? qs.frappuccino : []
        },
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

  function defaultQuestions(category) {
    var byCat = {
      caliente: [
        ["¿Se respetó la receta estándar (shots, jarabe, medidas)?", "yn"],
        ["¿La leche se vaporizó a la temperatura y textura correctas?", "yn"],
        ["¿La bebida se sirvió a la temperatura adecuada?", "yn"],
        ["¿El acabado (crema batida, espirales, toppings) fue el correcto?", "yn"],
        ["Observaciones generales", "open"],
        ["¿Qué podría mejorar?", "open"]
      ],
      helada: [
        ["¿Se respetó la receta estándar (shots, jarabe, hielo)?", "yn"],
        ["¿Se usó la cantidad de hielo correcta?", "yn"],
        ["¿El shakeo o mezclado se hizo correctamente?", "yn"],
        ["¿La presentación y el nivel de llenado fueron correctos?", "yn"],
        ["Observaciones generales", "open"],
        ["¿Qué podría mejorar?", "open"]
      ],
      frappuccino: [
        ["¿Se respetó la receta estándar (base, jarabe, roast)?", "yn"],
        ["¿La consistencia del licuado fue la correcta?", "yn"],
        ["¿El topping y acabado final fueron los correctos?", "yn"],
        ["¿Se usó el botón de licuado y medida de hielo correctos?", "yn"],
        ["Observaciones generales", "open"],
        ["¿Qué podría mejorar?", "open"]
      ]
    };
    var now = Date.now();
    return (byCat[category] || []).map(function (pair) {
      return { id: uid("q"), text: pair[0], type: pair[1], createdAt: now };
    });
  }

  function buildRepertoire() {
    var data = (typeof window !== "undefined" && window.DRINKS_DATA) ? window.DRINKS_DATA : [];
    return data.map(function (d) {
      return {
        id: d.id, name: d.name, category: d.category, subcategory: d.subcategory || null,
        description: d.description || "", steps: Array.isArray(d.steps) ? d.steps : [],
        createdAt: Date.now()
      };
    });
  }

  function seedIfNeeded() {
    var changed = false;
    if (!DB.drinks.length) { DB.drinks = buildRepertoire(); changed = true; }
    CATEGORIES.forEach(function (c) {
      if (!DB.questionSets[c.id].length) { DB.questionSets[c.id] = defaultQuestions(c.id); changed = true; }
    });
    if (changed) saveDB();
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
    return '<div class="empty-state"><span class="msi" aria-hidden="true">' + icon + "</span>" + esc(msg) + btn + "</div>";
  }

  function getInitials(name) {
    var parts = String(name || "").trim().split(/\s+/).filter(Boolean).slice(0, 2);
    var initials = parts.map(function (w) { return w[0]; }).join("").toUpperCase();
    return initials || "?";
  }

  function avatarHtml(person, size) {
    size = size || 36;
    if (person && person.photo) {
      return '<img class="avatar" src="' + person.photo + '" style="width:' + size + 'px;height:' + size + 'px;" alt="">';
    }
    var fontSize = Math.round(size * 0.4);
    return '<div class="avatar avatar-fallback" style="width:' + size + 'px;height:' + size + 'px;font-size:' + fontSize + 'px;">' +
      esc(getInitials(person ? person.name : "")) + "</div>";
  }

  function categoryMeta(catId) {
    for (var i = 0; i < CATEGORIES.length; i++) { if (CATEGORIES[i].id === catId) return CATEGORIES[i]; }
    return { id: catId, label: catId, icon: "local_cafe" };
  }

  function catBadgeHtml(catId) {
    var meta = categoryMeta(catId);
    return '<span class="cat-badge cat-' + meta.id + '"><span class="msi" aria-hidden="true">' + meta.icon + '</span>' + esc(meta.label) + "</span>";
  }

  function resizeImageFile(file, maxSize, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var side = Math.min(img.width, img.height);
        var sx = (img.width - side) / 2;
        var sy = (img.height - side) / 2;
        var canvas = document.createElement("canvas");
        canvas.width = maxSize;
        canvas.height = maxSize;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, sx, sy, side, side, 0, 0, maxSize, maxSize);
        callback(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = function () { toast("No se pudo leer la imagen"); };
      img.src = e.target.result;
    };
    reader.onerror = function () { toast("No se pudo leer la imagen"); };
    reader.readAsDataURL(file);
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
    var sheet = document.getElementById("modal-sheet");
    sheet.innerHTML = html;
    document.getElementById("modal-overlay").classList.add("active");
    sheet.scrollTop = 0;
    var focusable = sheet.querySelector("input, textarea, select, button:not(.modal-close)");
    if (focusable) focusable.focus();
  }

  function closeModal() {
    document.getElementById("modal-overlay").classList.remove("active");
    document.getElementById("modal-sheet").innerHTML = "";
  }

  /* ---------- navigation ---------- */

  function enterApp() {
    document.getElementById("splash-screen").style.display = "none";
    document.getElementById("app-shell").style.display = "flex";
  }

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

  function scoreColorClass(score) {
    if (score == null) return "";
    if (score >= 80) return "score-green";
    if (score >= 60) return "score-yellow";
    return "score-red";
  }

  function computeScore(answers) {
    var yn = answers.filter(function (a) { return a.type === "yn"; });
    if (!yn.length) return null;
    var yes = yn.filter(function (a) { return a.value === true; }).length;
    return Math.round((yes / yn.length) * 100);
  }

  function findPreviousSession(session) {
    var list = DB.evaluations.filter(function (e) {
      return e.employeeId === session.employeeId && e.id !== session.id && e.createdAt < session.createdAt;
    });
    if (!list.length) return null;
    list.sort(function (a, b) { return b.createdAt - a.createdAt; });
    return list[0];
  }

  function findPreviousRound(employeeId, drinkId, beforeTs, excludeSessionId) {
    var best = null;
    DB.evaluations.forEach(function (session) {
      if (session.employeeId !== employeeId || session.id === excludeSessionId || session.createdAt >= beforeTs) return;
      (session.rounds || []).forEach(function (r) {
        if (r.drinkId !== drinkId) return;
        if (!best || session.createdAt > best.sessionCreatedAt) best = { score: r.score, sessionCreatedAt: session.createdAt };
      });
    });
    return best;
  }

  function compareLine(currentScore, previousScore, previousLabel) {
    if (previousScore == null || currentScore == null) return null;
    var delta = currentScore - previousScore;
    var cls = delta > 0 ? "trend-up" : delta < 0 ? "trend-down" : "trend-flat";
    var arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "●";
    var sign = delta > 0 ? "+" : "";
    return { cls: cls, text: arrow + " " + sign + delta + " pts vs. " + previousLabel + " (" + previousScore + "%)" };
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
      avatarHtml(item.emp, 44) +
      '<div class="p-name">' + esc(item.emp.name) + "</div>" +
      '<div class="p-score ' + scoreColorClass(item.avg) + '">' + (item.avg == null ? "—" : item.avg + "%") + "</div>" +
      "</div>";
  }

  function renderRanking() {
    var counterEl = document.getElementById("ranking-counter");
    if (counterEl) counterEl.textContent = DB.evaluations.length + (DB.evaluations.length === 1 ? " evaluación" : " evaluaciones");
    var c = document.getElementById("ranking-content");
    if (!DB.employees.length) {
      c.innerHTML = emptyStateHtml("trophy", "Agrega empleados para comenzar a construir el ranking.", "empleados");
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
        avatarHtml(item.emp, 38) +
        '<div class="rank-info">' +
        '<div class="name">' + esc(item.emp.name) + "</div>" +
        '<div class="role">' + esc(item.emp.role || "Sin puesto") + " · " + item.count + " evaluación(es)</div>" +
        "</div>" +
        '<div class="rank-score">' +
        '<div class="val ' + scoreColorClass(item.avg) + '">' + (item.avg == null ? "—" : item.avg + "%") + "</div>" +
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
      c.innerHTML = emptyStateHtml("group", 'Aún no hay empleados registrados. Toca "+" para agregar el primero.', null);
      return;
    }
    c.innerHTML = DB.employees.map(function (emp) {
      var evals = DB.evaluations.filter(function (e) { return e.employeeId === emp.id && e.score != null; });
      var avg = evals.length ? Math.round(evals.reduce(function (s, e) { return s + e.score; }, 0) / evals.length) : null;
      return '<div class="list-row">' +
        avatarHtml(emp, 40) +
        '<div class="info">' +
        '<div class="name">' + esc(emp.name) + "</div>" +
        '<div class="meta">' + esc(emp.role || "Sin puesto") + " · " + evals.length + " evaluación(es)" +
        (avg != null ? " · Prom. " + avg + "%" : "") + "</div>" +
        "</div>" +
        '<div class="row-actions">' +
        '<button class="icon-btn" data-action="edit-empleado:' + emp.id + '" title="Editar" aria-label="Editar ' + esc(emp.name) + '"><span class="msi" aria-hidden="true">edit</span></button>' +
        '<button class="icon-btn danger" data-action="delete-empleado:' + emp.id + '" title="Eliminar" aria-label="Eliminar ' + esc(emp.name) + '"><span class="msi" aria-hidden="true">delete</span></button>' +
        "</div>" +
        "</div>";
    }).join("");
  }

  function openEmpleadoForm(id) {
    var emp = id ? DB.employees.find(function (x) { return x.id === id; }) : null;
    var hasPhoto = !!(emp && emp.photo);
    openModal(
      '<div class="modal-header"><h2>' + (emp ? "Editar" : "Agregar") + ' empleado</h2><button type="button" class="modal-close" data-action="close-modal" title="Cerrar" aria-label="Cerrar"><span class="msi" aria-hidden="true">close</span></button></div>' +
      '<form id="form-empleado" data-id="' + (emp ? emp.id : "") + '">' +
      '<div class="field">' +
      '<label>Foto (opcional)</label>' +
      '<div class="photo-field">' +
      '<div class="photo-preview" id="photo-preview">' + (hasPhoto ? '<img src="' + emp.photo + '" alt="">' : '<span class="msi" aria-hidden="true">photo_camera</span>') + "</div>" +
      '<div class="photo-actions">' +
      '<button type="button" class="btn btn-secondary btn-sm" data-action="pick-photo">Elegir foto</button>' +
      '<button type="button" class="btn btn-danger btn-sm" id="remove-photo-btn" data-action="remove-photo" style="' + (hasPhoto ? "" : "display:none;") + '">Quitar foto</button>' +
      "</div>" +
      '<input type="file" accept="image/*" id="photo-input" style="display:none;">' +
      "</div>" +
      '<input type="hidden" name="photo" id="photo-data-hidden" value="' + (hasPhoto ? esc(emp.photo) : "") + '">' +
      "</div>" +
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
    var photo = form.photo.value || null;
    if (!name) { toast("El nombre es obligatorio"); return; }
    if (id) {
      var emp = DB.employees.find(function (x) { return x.id === id; });
      if (emp) { emp.name = name; emp.role = role; emp.photo = photo; }
    } else {
      if (DB.employees.length >= LIMITS.employees) { toast("Límite de 20 empleados alcanzado"); return; }
      DB.employees.push({ id: uid("emp"), name: name, role: role, photo: photo, createdAt: Date.now() });
    }
    saveDB(); closeModal(); renderAll(); toast("Empleado guardado");
  }

  function deleteEmpleado(id) {
    if (!confirm("¿Eliminar este empleado? Su historial de evaluaciones se conservará, pero ya no aparecerá en el ranking.")) return;
    DB.employees = DB.employees.filter(function (x) { return x.id !== id; });
    saveDB(); renderAll(); toast("Empleado eliminado");
  }

  /* ---------- render: recetario ---------- */

  function renderRecetarioTabs() {
    var el = document.getElementById("recetario-tabs");
    if (!el) return;
    var tabs = [{ id: "all", label: "Todas", icon: "apps" }].concat(CATEGORIES);
    el.innerHTML = tabs.map(function (t) {
      var active = recetarioState.category === t.id;
      var tone = t.id === "all" ? "gold" : t.id;
      return '<button type="button" class="seg' + (active ? " active tone-" + tone : "") + '" data-action="recetario-cat:' + t.id + '">' +
        '<span class="msi" aria-hidden="true">' + t.icon + "</span>" + esc(t.label) + "</button>";
    }).join("");
  }

  function renderRecetario() {
    renderRecetarioTabs();
    var search = recetarioState.search.trim().toLowerCase();
    var list = DB.drinks.filter(function (d) {
      if (recetarioState.category !== "all" && d.category !== recetarioState.category) return false;
      if (search && d.name.toLowerCase().indexOf(search) === -1) return false;
      return true;
    });
    var counterEl = document.getElementById("recetario-counter");
    if (counterEl) counterEl.textContent = list.length + (list.length === 1 ? " bebida" : " bebidas");

    var c = document.getElementById("recetario-content");
    if (!list.length) {
      c.innerHTML = emptyStateHtml("search_off", "No hay bebidas que coincidan con tu búsqueda.", null);
      return;
    }

    if (recetarioState.category === "all") {
      c.innerHTML = CATEGORIES.map(function (cat) {
        var items = list.filter(function (d) { return d.category === cat.id; });
        if (!items.length) return "";
        return '<div class="recipe-group-label">' + esc(cat.label) + " (" + items.length + ")</div>" + items.map(recipeRowHtml).join("");
      }).join("");
      return;
    }

    var groups = {};
    var order = [];
    list.forEach(function (d) {
      var key = d.subcategory || "otras";
      if (!groups[key]) { groups[key] = []; order.push(key); }
      groups[key].push(d);
    });
    c.innerHTML = order.map(function (key) {
      return '<div class="recipe-group-label">' + esc(SUBCAT_LABELS[key] || key) + "</div>" + groups[key].map(recipeRowHtml).join("");
    }).join("");
  }

  function recipeRowHtml(d) {
    var meta = categoryMeta(d.category);
    return '<div class="recipe-row" role="button" tabindex="0" data-action="recipe-open:' + d.id + '" aria-label="Ver receta de ' + esc(d.name) + '">' +
      '<div class="recipe-icon cat-' + meta.id + '"><span class="msi" aria-hidden="true">' + meta.icon + "</span></div>" +
      '<div class="info"><div class="name">' + esc(d.name) + '</div><div class="meta">' + esc(d.description) + "</div></div>" +
      '<span class="msi chevron" aria-hidden="true">chevron_right</span>' +
      "</div>";
  }

  function recipeDetailHtml(d) {
    return '<div class="recipe-detail-head">' + catBadgeHtml(d.category) +
      '<div class="desc">' + esc(d.description) + "</div></div>" +
      '<ol class="recipe-steps">' + d.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";
  }

  function openRecipeDetail(id) {
    var d = DB.drinks.find(function (x) { return x.id === id; });
    if (!d) return;
    openModal(
      '<div class="modal-header"><h2>' + esc(d.name) + '</h2><button type="button" class="modal-close" data-action="close-modal" title="Cerrar" aria-label="Cerrar"><span class="msi" aria-hidden="true">close</span></button></div>' +
      recipeDetailHtml(d)
    );
  }

  /* ---------- render: preguntas ---------- */

  function renderPreguntasTabs() {
    var el = document.getElementById("preguntas-tabs");
    if (!el) return;
    el.innerHTML = CATEGORIES.map(function (c) {
      var active = preguntasState.category === c.id;
      return '<button type="button" class="seg' + (active ? " active tone-" + c.id : "") + '" data-action="preguntas-cat:' + c.id + '">' +
        '<span class="msi" aria-hidden="true">' + c.icon + "</span>" + esc(c.label) + "</button>";
    }).join("");
  }

  function renderPreguntas() {
    renderPreguntasTabs();
    var list = DB.questionSets[preguntasState.category] || [];
    document.getElementById("q-counter").textContent = list.length + "/" + LIMITS.questions;
    document.getElementById("btn-add-pregunta").disabled = list.length >= LIMITS.questions;
    var c = document.getElementById("preguntas-content");
    if (!list.length) {
      c.innerHTML = emptyStateHtml("checklist", 'Aún no hay preguntas en esta categoría. Toca "+" para agregar la primera.', null);
      return;
    }
    c.innerHTML = list.map(function (q) {
      return '<div class="list-row">' +
        '<div class="info">' +
        '<div class="name">' + esc(q.text) + "</div>" +
        '<div class="meta">' + (q.type === "yn" ? "Pregunta Sí / No (cuenta para el puntaje)" : "Pregunta abierta (comentario)") + "</div>" +
        "</div>" +
        '<div class="row-actions">' +
        '<button class="icon-btn" data-action="edit-pregunta:' + q.id + '" title="Editar" aria-label="Editar pregunta"><span class="msi" aria-hidden="true">edit</span></button>' +
        '<button class="icon-btn danger" data-action="delete-pregunta:' + q.id + '" title="Eliminar" aria-label="Eliminar pregunta"><span class="msi" aria-hidden="true">delete</span></button>' +
        "</div>" +
        "</div>";
    }).join("");
  }

  function findQuestion(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      var cat = CATEGORIES[i].id;
      var q = DB.questionSets[cat].find(function (x) { return x.id === id; });
      if (q) return { q: q, cat: cat };
    }
    return null;
  }

  function openPreguntaForm(id) {
    var found = id ? findQuestion(id) : null;
    var q = found ? found.q : null;
    var type = q ? q.type : "yn";
    var cat = found ? found.cat : preguntasState.category;
    openModal(
      '<div class="modal-header"><h2>' + (q ? "Editar" : "Agregar") + " pregunta · " + esc(categoryMeta(cat).label) + '</h2><button type="button" class="modal-close" data-action="close-modal" title="Cerrar" aria-label="Cerrar"><span class="msi" aria-hidden="true">close</span></button></div>' +
      '<form id="form-pregunta" data-id="' + (q ? q.id : "") + '" data-cat="' + cat + '">' +
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
    var cat = form.dataset.cat;
    var text = form.text.value.trim();
    var type = form.type.value;
    if (!text) { toast("La pregunta no puede estar vacía"); return; }
    if (id) {
      var found = findQuestion(id);
      if (found) { found.q.text = text; found.q.type = type; }
    } else {
      if (DB.questionSets[cat].length >= LIMITS.questions) { toast("Límite de " + LIMITS.questions + " preguntas alcanzado"); return; }
      DB.questionSets[cat].push({ id: uid("q"), text: text, type: type, createdAt: Date.now() });
    }
    saveDB(); closeModal(); renderAll(); toast("Pregunta guardada");
  }

  function deletePregunta(id) {
    if (!confirm("¿Eliminar esta pregunta? Las evaluaciones ya guardadas conservarán su respuesta.")) return;
    var found = findQuestion(id);
    if (found) DB.questionSets[found.cat] = DB.questionSets[found.cat].filter(function (x) { return x.id !== id; });
    saveDB(); renderAll(); toast("Pregunta eliminada");
  }

  /* ---------- evaluar (wizard: 5 random drinks) ---------- */

  function pickRandomDrinks(n) {
    var pool = DB.drinks.slice();
    var picked = [];
    while (picked.length < n && pool.length) {
      var idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }

  function evalRestart() {
    var lastEvaluator = "";
    try { lastEvaluator = localStorage.getItem(LAST_EVALUATOR_KEY) || ""; } catch (err) {}
    evalState = { phase: "setup", employeeId: null, evaluatorName: lastEvaluator, rounds: [], roundIndex: 0, resultId: null };
    renderEvaluar();
  }

  function evalSetEvaluator(name) {
    evalState.evaluatorName = name;
    try { localStorage.setItem(LAST_EVALUATOR_KEY, name); } catch (err) {}
  }

  function evalPickEmployee(id) {
    evalState.employeeId = evalState.employeeId === id ? null : id;
    renderEvaluar();
  }

  function evalStart() {
    var evaluatorName = (evalState.evaluatorName || "").trim();
    if (!evaluatorName) { toast("Escribe el nombre de quien realiza la evaluación"); return; }
    if (!evalState.employeeId) { toast("Selecciona al empleado a evaluar"); return; }
    if (DB.drinks.length < 1) { toast("El repertorio de bebidas está vacío"); return; }
    var picked = pickRandomDrinks(Math.min(ROUNDS_PER_SESSION, DB.drinks.length));
    evalState.rounds = picked.map(function (d) {
      return { drinkId: d.id, drinkName: d.name, category: d.category, subcategory: d.subcategory, description: d.description, answers: {} };
    });
    evalState.roundIndex = 0;
    evalState.phase = "rounds";
    renderEvaluar();
  }

  function evalBack() {
    if (evalState.phase === "rounds" && evalState.roundIndex > 0) {
      evalState.roundIndex--;
      renderEvaluar();
    }
  }

  function evalAnswerYN(qid, val) {
    evalState.rounds[evalState.roundIndex].answers[qid] = { type: "yn", value: val === "yes" };
    renderEvaluar();
  }

  function evalOpenInput(qid, val) {
    evalState.rounds[evalState.roundIndex].answers[qid] = { type: "open", value: val };
  }

  function evalNext() {
    var round = evalState.rounds[evalState.roundIndex];
    var qList = DB.questionSets[round.category] || [];
    var ynQs = qList.filter(function (q) { return q.type === "yn"; });
    var allAnswered = ynQs.every(function (q) { return round.answers[q.id] && round.answers[q.id].type === "yn"; });
    if (!allAnswered) { toast("Responde todas las preguntas Sí / No"); return; }
    if (evalState.roundIndex < evalState.rounds.length - 1) {
      evalState.roundIndex++;
      renderEvaluar();
    } else {
      evalSubmitSession();
    }
  }

  function evalSubmitSession() {
    var emp = DB.employees.find(function (e) { return e.id === evalState.employeeId; });
    if (!emp) { toast("Selecciona un empleado válido"); evalState.phase = "setup"; renderEvaluar(); return; }
    var roundsOut = evalState.rounds.map(function (round) {
      var qList = DB.questionSets[round.category] || [];
      var answers = qList.map(function (q) {
        var a = round.answers[q.id];
        if (q.type === "yn") return { questionId: q.id, text: q.text, type: "yn", value: a ? a.value : null };
        return { questionId: q.id, text: q.text, type: "open", value: a ? (a.value || "") : "" };
      });
      return {
        drinkId: round.drinkId, drinkName: round.drinkName, category: round.category, subcategory: round.subcategory,
        answers: answers, score: computeScore(answers)
      };
    });
    var scored = roundsOut.filter(function (r) { return r.score != null; });
    var overall = scored.length ? Math.round(scored.reduce(function (s, r) { return s + r.score; }, 0) / scored.length) : null;
    var session = {
      id: uid("ev"),
      employeeId: emp.id, employeeName: emp.name, employeeRole: emp.role, employeePhoto: emp.photo || null,
      evaluatorName: (evalState.evaluatorName || "").trim(),
      rounds: roundsOut, score: overall,
      createdAt: Date.now()
    };
    DB.evaluations.push(session);
    saveDB();
    evalState.phase = "result";
    evalState.resultId = session.id;
    renderAll();
    toast("Evaluación guardada");
  }

  function roundQaHtml(round) {
    return round.answers.map(function (a) {
      var answerHtml = a.type === "yn"
        ? '<div class="qa-answer ' + (a.value ? "yes" : "no") + '">' + (a.value ? "Sí ✓" : "No ✗") + "</div>"
        : '<div class="qa-answer open">' + (a.value ? esc(a.value) : '<span class="field-hint">Sin comentario</span>') + "</div>";
      return '<div class="qa-item"><div class="q-text">' + esc(a.text) + "</div>" + answerHtml + "</div>";
    }).join("");
  }

  function sessionResultHtml(session, isWizardResult) {
    var prevSession = findPreviousSession(session);
    var cmp = prevSession ? compareLine(session.score, prevSession.score, "sesión anterior") : null;
    var scoreDisplay = session.score == null ? "N/A" : session.score + "%";
    var html = '<div class="score-hero">' +
      '<div class="hero-avatar-wrap">' + avatarHtml({ name: session.employeeName, photo: session.employeePhoto }, 56) + "</div>" +
      '<div class="score-num ' + scoreColorClass(session.score) + '">' + scoreDisplay + "</div>" +
      '<div class="score-label">' + esc(session.employeeName) + " · " + session.rounds.length + " bebidas</div>" +
      '<div class="score-label dim">' + formatDateTime(session.createdAt) + " · Evaluó: " + esc(session.evaluatorName || "—") + "</div>" +
      (cmp
        ? '<div class="compare ' + cmp.cls + '">' + cmp.text + "</div>"
        : '<div class="compare trend-flat">Primera evaluación registrada para este empleado</div>') +
      "</div>" +
      '<div class="subsection-title">Bebidas evaluadas</div>' +
      session.rounds.map(function (round, idx) {
        var prevRound = findPreviousRound(session.employeeId, round.drinkId, session.createdAt, session.id);
        var rc = compareLine(round.score, prevRound ? prevRound.score : null, "última vez");
        return '<div class="round-summary-row" role="button" tabindex="0" data-action="round-open:' + session.id + ":" + idx + '" aria-label="Ver detalle de ' + esc(round.drinkName) + '">' +
          '<div class="idx">' + (idx + 1) + "</div>" +
          '<div class="info"><div class="name">' + esc(round.drinkName) + "</div>" + catBadgeHtml(round.category) + "</div>" +
          '<div>' +
          '<div class="score ' + scoreColorClass(round.score) + '">' + (round.score == null ? "—" : round.score + "%") + "</div>" +
          (rc ? '<div class="trend ' + rc.cls + '">' + (rc.cls === "trend-up" ? "▲" : rc.cls === "trend-down" ? "▼" : "●") + "</div>" : "") +
          "</div>" +
          "</div>";
      }).join("");
    if (isWizardResult) {
      html += '<div class="btn-row">' +
        '<button class="btn btn-secondary" data-action="eval-restart">Nueva evaluación</button>' +
        '<button class="btn btn-primary" data-action="nav:ranking">Ver ranking</button>' +
        "</div>";
    }
    return html;
  }

  function roundDetailHtml(session, round, idx) {
    var prevRound = findPreviousRound(session.employeeId, round.drinkId, session.createdAt, session.id);
    var rc = compareLine(round.score, prevRound ? prevRound.score : null, "última vez con esta bebida");
    return '<div class="score-hero">' +
      '<div class="score-num ' + scoreColorClass(round.score) + '">' + (round.score == null ? "N/A" : round.score + "%") + "</div>" +
      '<div class="score-label">Bebida ' + (idx + 1) + " de " + session.rounds.length + " · " + esc(round.drinkName) + "</div>" +
      '<div class="score-label dim">' + esc(session.employeeName) + " · " + formatDateTime(session.createdAt) + "</div>" +
      '<div style="margin-top:10px;">' + catBadgeHtml(round.category) + "</div>" +
      (rc ? '<div class="compare ' + rc.cls + '">' + rc.text + "</div>" : "") +
      "</div>" +
      '<div class="subsection-title">Respuestas</div>' + roundQaHtml(round);
  }

  function openRoundDetail(sessionId, roundIdx) {
    var session = DB.evaluations.find(function (e) { return e.id === sessionId; });
    if (!session) return;
    var round = session.rounds[roundIdx];
    if (!round) return;
    openModal(
      '<div class="modal-header"><h2>Detalle de bebida</h2><button type="button" class="modal-close" data-action="close-modal" title="Cerrar" aria-label="Cerrar"><span class="msi" aria-hidden="true">close</span></button></div>' +
      roundDetailHtml(session, round, roundIdx)
    );
  }

  function renderEvaluar() {
    var c = document.getElementById("evaluar-content");
    if (!DB.employees.length) { c.innerHTML = emptyStateHtml("group", "Primero agrega al menos un empleado.", "empleados"); return; }
    if (!DB.drinks.length) { c.innerHTML = emptyStateHtml("local_cafe", "El repertorio de bebidas está vacío."); return; }

    if (evalState.phase === "result") {
      var session = DB.evaluations.find(function (e) { return e.id === evalState.resultId; });
      if (!session) { evalRestart(); return; }
      c.innerHTML = sessionResultHtml(session, true);
      return;
    }

    if (evalState.phase === "setup") {
      c.innerHTML =
        '<div class="field">' +
        '<label>¿Quién realiza la evaluación?</label>' +
        '<input type="text" data-role="evaluator-input" maxlength="60" value="' + esc(evalState.evaluatorName || "") + '" placeholder="Tu nombre">' +
        "</div>" +
        '<div class="progress-summary">Selecciona al empleado a evaluar. Se elegirán ' + ROUNDS_PER_SESSION + ' bebidas al azar del repertorio.</div>' +
        '<div class="chip-select">' +
        DB.employees.map(function (e) {
          return '<div class="chip chip-with-avatar' + (evalState.employeeId === e.id ? " selected" : "") + '" role="button" tabindex="0" data-action="eval-pick-employee:' + e.id + '" aria-pressed="' + (evalState.employeeId === e.id) + '">' +
            avatarHtml(e, 22) + "<span>" + esc(e.name) + "</span></div>";
        }).join("") +
        "</div>" +
        '<button class="btn btn-primary btn-block" style="margin-top:18px;" data-action="eval-start"' + (evalState.employeeId ? "" : " disabled") + ">Comenzar evaluación</button>";
      return;
    }

    // phase === "rounds"
    var round = evalState.rounds[evalState.roundIndex];
    var dots = '<div class="round-dots">' + evalState.rounds.map(function (r, i) {
      var cls = i < evalState.roundIndex ? "done" : i === evalState.roundIndex ? "current" : "";
      return '<div class="dot ' + cls + '"></div>';
    }).join("") + "</div>";

    var head = '<div class="round-head">' +
      '<div class="round-num">' + (evalState.roundIndex + 1) + "/" + evalState.rounds.length + "</div>" +
      '<div class="round-info"><div class="round-drink-name">' + esc(round.drinkName) + "</div>" +
      catBadgeHtml(round.category) +
      (round.description ? '<div class="round-desc" style="margin-top:6px;">' + esc(round.description) + "</div>" : "") +
      "</div></div>";

    var qList = DB.questionSets[round.category] || [];
    var qHtml = qList.map(function (q) {
      var a = round.answers[q.id];
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

    var ynQs = qList.filter(function (q) { return q.type === "yn"; });
    var allAnswered = ynQs.every(function (q) { return round.answers[q.id] && round.answers[q.id].type === "yn"; });
    var isLast = evalState.roundIndex === evalState.rounds.length - 1;

    c.innerHTML = dots + head +
      (evalState.roundIndex > 0 ? '<button class="btn btn-secondary btn-sm" data-action="eval-back" style="margin-bottom:10px;">← Bebida anterior</button>' : "") +
      qHtml +
      '<button class="btn btn-primary btn-block" data-action="eval-next"' + (allAnswered ? "" : " disabled") + ">" + (isLast ? "Finalizar evaluación" : "Siguiente bebida →") + "</button>" +
      (ynQs.length === 0 ? '<div class="field-hint" style="text-align:center;margin-top:8px;">Esta categoría no tiene preguntas Sí / No.</div>' : "");
  }

  /* ---------- historial ---------- */

  function renderHistorial() {
    var selEmp = document.getElementById("hist-filter-emp");
    selEmp.innerHTML = '<option value="">Todos los empleados</option>' +
      DB.employees.map(function (e) {
        return '<option value="' + e.id + '"' + (histFilters.empId === e.id ? " selected" : "") + ">" + esc(e.name) + "</option>";
      }).join("");

    var list = DB.evaluations.filter(function (e) {
      return !histFilters.empId || e.employeeId === histFilters.empId;
    }).slice().sort(function (a, b) { return b.createdAt - a.createdAt; });

    var c = document.getElementById("historial-content");
    if (!list.length) {
      c.innerHTML = emptyStateHtml("history", "No hay evaluaciones que coincidan con el filtro.", null);
      return;
    }
    c.innerHTML = list.map(function (session) {
      var scoreDisplay = session.score == null ? "N/A" : session.score + "%";
      return '<div class="list-row" role="button" tabindex="0" data-action="hist-open:' + session.id + '" style="cursor:pointer;" aria-label="Ver detalle de evaluación de ' + esc(session.employeeName) + '">' +
        avatarHtml({ name: session.employeeName, photo: session.employeePhoto }, 40) +
        '<div class="info">' +
        '<div class="name">' + esc(session.employeeName) + " · " + session.rounds.length + " bebidas</div>" +
        '<div class="meta">' + formatDateTime(session.createdAt) + " · Evaluó: " + esc(session.evaluatorName || "—") + "</div>" +
        "</div>" +
        '<div class="row-actions">' +
        '<div class="val ' + scoreColorClass(session.score) + '" style="font-weight:800;margin-right:2px;">' + scoreDisplay + "</div>" +
        '<button class="icon-btn danger" data-action="hist-delete:' + session.id + '" title="Eliminar" aria-label="Eliminar evaluación"><span class="msi" aria-hidden="true">delete</span></button>' +
        "</div>" +
        "</div>";
    }).join("");
  }

  function openHistDetail(id) {
    var session = DB.evaluations.find(function (e) { return e.id === id; });
    if (!session) return;
    openModal(
      '<div class="modal-header"><h2>Detalle de evaluación</h2><button type="button" class="modal-close" data-action="close-modal" title="Cerrar" aria-label="Cerrar"><span class="msi" aria-hidden="true">close</span></button></div>' +
      sessionResultHtml(session, false)
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
    var rows = [["Fecha", "Empleado", "Puesto", "Evaluó", "Bebida", "Categoría", "Puntaje bebida (%)", "Puntaje sesión (%)", "Detalle"]];
    DB.evaluations.slice().sort(function (a, b) { return b.createdAt - a.createdAt; }).forEach(function (session) {
      session.rounds.forEach(function (round) {
        var detail = round.answers.map(function (a) {
          return a.text + ": " + (a.type === "yn" ? (a.value ? "Sí" : "No") : (a.value || ""));
        }).join(" | ");
        rows.push([
          formatDateTime(session.createdAt), session.employeeName, session.employeeRole || "", session.evaluatorName || "",
          round.drinkName, categoryMeta(round.category).label,
          round.score == null ? "" : String(round.score), session.score == null ? "" : String(session.score), detail
        ]);
      });
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
        var qs = parsed.questionSets || {};
        DB = {
          employees: Array.isArray(parsed.employees) ? parsed.employees : [],
          drinks: Array.isArray(parsed.drinks) && parsed.drinks.length ? parsed.drinks : buildRepertoire(),
          questionSets: {
            caliente: Array.isArray(qs.caliente) ? qs.caliente : [],
            helada: Array.isArray(qs.helada) ? qs.helada : [],
            frappuccino: Array.isArray(qs.frappuccino) ? qs.frappuccino : []
          },
          evaluations: Array.isArray(parsed.evaluations) ? parsed.evaluations : []
        };
        seedIfNeeded();
        saveDB(); renderAll(); toast("Datos importados correctamente");
      } catch (err) {
        toast("Archivo inválido, no se pudo importar");
      }
    };
    reader.readAsText(file);
  }

  function buildDemoPeopleAndEvaluations() {
    var now = Date.now();
    var day = 24 * 60 * 60 * 1000;
    var employees = [
      { id: uid("emp"), name: "Ana Torres", role: "Barista", createdAt: now },
      { id: uid("emp"), name: "Luis Ramírez", role: "Barista", createdAt: now },
      { id: uid("emp"), name: "Sofía Guzmán", role: "Barista Trainer", createdAt: now },
      { id: uid("emp"), name: "Carlos Mendoza", role: "Shift Supervisor", createdAt: now }
    ];
    var evaluators = ["Carlos Mendoza", "Sofía Guzmán"];

    function makeSession(emp, daysAgo, evaluatorIdx, yesPattern) {
      var picked = pickRandomDrinks(Math.min(ROUNDS_PER_SESSION, DB.drinks.length));
      var rounds = picked.map(function (d, i) {
        var qList = DB.questionSets[d.category] || [];
        var yesCount = yesPattern[i % yesPattern.length];
        var answers = qList.map(function (q, idx) {
          if (q.type === "yn") return { questionId: q.id, text: q.text, type: "yn", value: idx < yesCount };
          return { questionId: q.id, text: q.text, type: "open", value: idx === qList.length - 2 ? "Buen desempeño general." : "" };
        });
        return { drinkId: d.id, drinkName: d.name, category: d.category, subcategory: d.subcategory, answers: answers, score: computeScore(answers) };
      });
      var scored = rounds.filter(function (r) { return r.score != null; });
      var overall = scored.length ? Math.round(scored.reduce(function (s, r) { return s + r.score; }, 0) / scored.length) : null;
      return {
        id: uid("ev"), employeeId: emp.id, employeeName: emp.name, employeeRole: emp.role, employeePhoto: emp.photo || null,
        evaluatorName: evaluators[evaluatorIdx % evaluators.length],
        rounds: rounds, score: overall, createdAt: now - daysAgo * day
      };
    }

    var evaluations = [
      makeSession(employees[0], 10, 0, [3, 2]),
      makeSession(employees[0], 3, 0, [4, 4]),
      makeSession(employees[1], 9, 1, [2, 3]),
      makeSession(employees[1], 2, 0, [3, 3]),
      makeSession(employees[2], 8, 1, [4, 4]),
      makeSession(employees[2], 1, 0, [4, 3]),
      makeSession(employees[3], 7, 1, [2, 2]),
      makeSession(employees[3], 1, 1, [3, 3])
    ];

    return { employees: employees, evaluations: evaluations };
  }

  function loadDemoData() {
    if (!confirm("Esto reemplazará empleados y evaluaciones con datos de ejemplo. El repertorio de bebidas y las preguntas no se modifican. ¿Continuar?")) return;
    var demo = buildDemoPeopleAndEvaluations();
    DB.employees = demo.employees;
    DB.evaluations = demo.evaluations;
    saveDB(); renderAll(); toast("Datos de ejemplo cargados");
  }

  function clearAllData() {
    if (!confirm("¿Borrar empleados y evaluaciones, y restablecer las preguntas a los valores predeterminados? El recetario de bebidas no se modifica. Esta acción no se puede deshacer.")) return;
    DB.employees = [];
    DB.evaluations = [];
    DB.questionSets = { caliente: [], helada: [], frappuccino: [] };
    seedIfNeeded();
    saveDB(); renderAll(); toast("Datos borrados");
  }

  /* ---------- render all ---------- */

  function renderAll() {
    renderRanking();
    renderEvaluar();
    renderEmpleados();
    renderRecetario();
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
      case "enter-app": enterApp(); break;
      case "nav": showView(a1); break;
      case "open-datos": showView("datos"); break;
      case "close-modal": closeModal(); break;
      case "add-empleado": openEmpleadoForm(); break;
      case "edit-empleado": openEmpleadoForm(a1); break;
      case "delete-empleado": deleteEmpleado(a1); break;
      case "pick-photo": {
        var photoInput = document.getElementById("photo-input");
        if (photoInput) photoInput.click();
        break;
      }
      case "remove-photo": {
        var hidden = document.getElementById("photo-data-hidden");
        var preview = document.getElementById("photo-preview");
        var removeBtn = document.getElementById("remove-photo-btn");
        if (hidden) hidden.value = "";
        if (preview) preview.innerHTML = '<span class="msi" aria-hidden="true">photo_camera</span>';
        if (removeBtn) removeBtn.style.display = "none";
        break;
      }
      case "recetario-cat": recetarioState.category = a1; renderRecetario(); break;
      case "recipe-open": openRecipeDetail(a1); break;
      case "preguntas-cat": preguntasState.category = a1; renderPreguntas(); break;
      case "add-pregunta": openPreguntaForm(); break;
      case "edit-pregunta": openPreguntaForm(a1); break;
      case "delete-pregunta": deletePregunta(a1); break;
      case "eval-pick-employee": evalPickEmployee(a1); break;
      case "eval-start": evalStart(); break;
      case "eval-back": evalBack(); break;
      case "eval-answer-yn": evalAnswerYN(a1, a2); break;
      case "eval-next": evalNext(); break;
      case "eval-restart": evalRestart(); break;
      case "round-open": openRoundDetail(a1, parseInt(a2, 10)); break;
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
    else if (e.target.id === "form-pregunta") { e.preventDefault(); savePreguntaFromForm(e.target); }
  }

  function handleGlobalChange(e) {
    if (e.target.id === "hist-filter-emp") { histFilters.empId = e.target.value; renderHistorial(); }
    else if (e.target.id === "import-file-input") { handleImportFile(e.target.files[0]); e.target.value = ""; }
    else if (e.target.id === "photo-input") {
      var file = e.target.files[0];
      if (!file) return;
      if (!file.type || file.type.indexOf("image/") !== 0) { toast("Selecciona un archivo de imagen"); return; }
      resizeImageFile(file, PHOTO_SIZE, function (dataUrl) {
        var hidden = document.getElementById("photo-data-hidden");
        var preview = document.getElementById("photo-preview");
        var removeBtn = document.getElementById("remove-photo-btn");
        if (hidden) hidden.value = dataUrl;
        if (preview) preview.innerHTML = '<img src="' + dataUrl + '" alt="">';
        if (removeBtn) removeBtn.style.display = "";
      });
    }
  }

  function handleGlobalInput(e) {
    if (!e.target.dataset) return;
    if (e.target.dataset.role === "open-answer") {
      evalOpenInput(e.target.dataset.qid, e.target.value);
    } else if (e.target.dataset.role === "evaluator-input") {
      evalSetEvaluator(e.target.value);
    } else if (e.target.id === "recetario-search") {
      recetarioState.search = e.target.value;
      renderRecetario();
    }
  }

  /* ---------- init ---------- */

  function init() {
    DB = loadDB();
    seedIfNeeded();
    try { evalState.evaluatorName = localStorage.getItem(LAST_EVALUATOR_KEY) || ""; } catch (err) {}

    var greetingText = "Hola " + GREETING_NAME;
    var splashGreetingEl = document.getElementById("splash-greeting");
    var headerGreetingEl = document.getElementById("header-greeting");
    if (splashGreetingEl) splashGreetingEl.innerHTML = esc(greetingText) + ' <span style="font-size:30px">☕</span>';
    if (headerGreetingEl) headerGreetingEl.textContent = greetingText + " ☕";

    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("submit", handleGlobalSubmit);
    document.addEventListener("change", handleGlobalChange);
    document.addEventListener("input", handleGlobalInput);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.getElementById("modal-overlay").classList.contains("active")) {
        closeModal();
        return;
      }
      if ((e.key === "Enter" || e.key === " ") && e.target && e.target.matches && e.target.matches('[role="button"][data-action]')) {
        e.preventDefault();
        e.target.click();
      }
    });

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
