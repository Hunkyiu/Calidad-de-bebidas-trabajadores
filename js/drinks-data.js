// Built-in drink repertoire extracted from official recipe cards.
// category: 'caliente' | 'helada' | 'frappuccino'
window.DRINKS_DATA = [
  {
    "id": "drk_cafe-misto",
    "name": "Café Misto",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Una mezcla exclusiva de café Starbucks® recién colado y leche vaporizada a la perfección.",
    "steps": [
      "Vaporiza la leche — vierte leche hasta la línea correspondiente de la jarra (línea para vaso corto en Alto, línea para vaso alto en Grande y Venti) y airea de 1 a 3 segundos",
      "Agrega café filtrado — llena el vaso hasta la mitad con café filtrado",
      "Termina — llena el resto con leche vaporizada hasta 6mm debajo del borde del vaso",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_cajeta-latte",
    "name": "Cajeta Latte",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Bebida con leche vaporizada a la perfección, con un toque de cajeta y deliciosa crema batida con espiral de caramelo.",
    "steps": [
      "Vaporiza la leche EXTRA HOT de 1 a 3 segundos (arriba de 77°C/170°F) — línea para vaso alto en Alto, una línea por debajo del tamaño correspondiente en Grande y Venti",
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega salsa de cajeta (dosificador metal espresso) — Alto: 3, Grande: 4, Venti: 5",
      "Llena con leche al vapor hasta 12mm por debajo de borde del vaso",
      "Cubre con 2½ vueltas de crema batida y agrega 5 espirales de caramelo",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_cappuccino",
    "name": "Cappuccino",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Espresso con leche vaporizada a la perfección, cubierto con una capa profunda de espuma.",
    "steps": [
      "Vaporiza la leche — vierte la leche en la jarra vaporizadora 1 línea por debajo de la marca correspondiente al tamaño de la bebida y airea de 6 a 8 segundos",
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe saborizante, solo si el cliente lo solicita — Alto: 2, Grande: 3, Venti: 4",
      "Vierte libremente la leche con espuma en el vaso hasta llegar a 6mm por debajo del borde",
      "Coloca tapa, entrega y conecta",
      "Nota: para Dry cappuccino usa menos leche vaporizada y más espuma; para Wet cappuccino usa más leche vaporizada y menos espuma"
    ]
  },
  {
    "id": "drk_caramel-macchiato",
    "name": "Caramel Macchiato",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Nuestra tradicional bebida, preparada a base de vainilla y leche perfectamente vaporizada, acompañada de café espresso y una artesanal rejilla de caramelo.",
    "steps": [
      "Vaporiza la leche — vierte leche hasta la línea correspondiente de la jarra y airea de 1 a 3 segundos",
      "Agrega shots de espresso en fila — Corto: 1, Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe de vainilla — Corto: 1, Alto: 2, Grande: 3, Venti: 4 (se agrega un pump menos que en las bebidas estándar)",
      "Llena ¾ del vaso con leche vaporizada y cubre con espuma hasta llegar 12mm por debajo del borde del vaso",
      "Vierte los shots de café espresso sobre la parte central del vaso",
      "Cubre con caramelo de manera que se formen 7 líneas entre cruzadas y 2 círculos",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_cinnamon-dolce-latte",
    "name": "Cinnamon Dolce Latte",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Espresso con leche vaporizada a la perfección y jarabe de canela dulce. Cubierto con crema batida y topping de canela en polvo.",
    "steps": [
      "Vaporiza la leche EXTRA HOT de 1 a 3 segundos (arriba de 77°C/170°F) — vacía la leche correspondiente hasta la línea apropiada de la jarra vaporizadora",
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe de cinnamon dolce — Alto: 3, Grande: 4, Venti: 5",
      "Llena con leche al vapor hasta 12mm por debajo de borde del vaso y cubre con 2½ vueltas de crema batida",
      "Espolvorea 2 veces el salero de canela sobre la crema batida",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_espresso-americano",
    "name": "Espresso Americano",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Rico café espresso con mucho cuerpo, preparado con agua caliente al verdadero estilo europeo.",
    "steps": [
      "Agrega shots de espresso en fila — Corto: 1, Alto: 2, Grande: 3, Venti: 4",
      "Vierte los shots de espresso en el vaso",
      "Llena con agua caliente de la BUNN hasta llegar a 6mm por debajo del borde del vaso",
      "Coloca la tapa y conecta"
    ]
  },
  {
    "id": "drk_espresso-con-panna",
    "name": "Espresso con Panna",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Espresso cubierto con crema batida.",
    "steps": [
      "Agrega shots de espresso — Solo: 1, Doppio: 2 — vierte directo en un vaso short",
      "Cubre con 2½ vueltas de crema batida",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_espresso-macchiato",
    "name": "Espresso Macchiato",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Espresso cubierto con espuma.",
    "steps": [
      "Vaporiza la leche — vierte la leche hasta llegar hasta la línea para vaso corto en la jarra y airea de 6 a 8 segundos",
      "Agrega shots de espresso — Solo: 1, Doppio: 2 — vierte directo en un vaso short",
      "Cubre con una cuchara llena de espuma",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_espresso",
    "name": "Espresso",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Espresso sencillo o doppio.",
    "steps": [
      "Coloca el número de shots que solicita el cliente — Sencillo: 1, Doble: 2, Triple: 3, etc.",
      "Agrega shots de espresso — Solo: vierte directo en un vaso de 4oz, Doppio: vierte directo en un vaso short",
      "Para DT (drive thru) siempre servir en vaso de 8oz",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_flat-white",
    "name": "Flat White",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Bebida con shots de ristretto y un shot adicional en todos los tamaños. Preparada con leche vaporizada a la perfección para lograr una consistencia cremosa y terminada con un \"punto de espuma\" o arte latte.",
    "steps": [
      "Vaporiza la leche — vacía la leche correspondiente hasta la línea apropiada de la jarra vaporizadora y airea de 1 a 3 segundos",
      "Agrega shots de espresso ristretto directamente en el vaso — Corto: 2, Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche de manera lenta y constante sobre el centro del vaso colocado a 45° hasta llenar 2/3",
      "Inclina hacia delante la jarra para vaporizar la leche, mantenla cerca de la superficie y sigue vertiendo para crear un pequeño punto de espuma hasta llegar 6mm por debajo del borde del vaso",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_latte-macchiato",
    "name": "Latte Macchiato",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Leche vaporizada y mezclada con extra shot de espresso para obtener un sabor más intenso y acentuado.",
    "steps": [
      "Vaporiza la leche — vacía la leche correspondiente hasta la línea apropiada de la jarra vaporizadora y airea de 1 a 3 segundos",
      "Agrega shots de espresso en fila — Corto: 2, Alto: 2, Grande: 3, Venti: 3",
      "Llena con leche al vapor hasta 12mm por debajo de borde del vaso",
      "Vierte los shots de café espresso sobre la parte central del vaso",
      "Coloca la tapa y conecta"
    ]
  },
  {
    "id": "drk_latte",
    "name": "Latte",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Espresso con leche vaporizada a la perfección, ligeramente cubierto con espuma. También está disponible con la opción de agregar un jarabe saborizante.",
    "steps": [
      "Vaporiza la leche — vacía la leche correspondiente hasta la línea apropiada de la jarra vaporizadora y airea de 1 a 3 segundos",
      "Agrega shots de espresso en fila — Corto: 1, Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe saborizante, solo si el cliente lo solicita — Corto: 2, Alto: 3, Grande: 4, Venti: 5",
      "Llena el vaso con leche vaporizada a la perfección y espuma hasta llegar a 6mm debajo del borde del vaso",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_mocha",
    "name": "Mocha",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Nuestro delicioso espresso con leche vaporizada, combinada con mocha y cubierta de crema batida.",
    "steps": [
      "Vaporiza la leche EXTRA HOT de 1 a 3 segundos (arriba de 77°C/170°F) — línea del tamaño correspondiente en Corto/Alto, una línea por debajo del tamaño correspondiente en Grande/Venti",
      "Agrega shots de espresso en fila — Corto: 1, Alto: 1, Grande: 2, Venti: 2",
      "Agrega salsa de mocha — Corto: 2, Alto: 3, Grande: 4, Venti: 5",
      "Mezcla el espresso y el mocha",
      "Llena el resto con leche vaporizada hasta 12mm por debajo del borde y cubre con 2½ vueltas de crema batida",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_mocha-blanco",
    "name": "Mocha Blanco",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Nuestro delicioso espresso con leche vaporizada, combinada con mocha blanco y cubierta de crema batida.",
    "steps": [
      "Vaporiza la leche EXTRA HOT de 1 a 3 segundos (arriba de 77°C/170°F) — línea del tamaño correspondiente en Alto, una línea por debajo del tamaño correspondiente en Grande/Venti",
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega salsa de mocha blanco — Alto: 3, Grande: 4, Venti: 5",
      "Mezcla el espresso y el mocha blanco",
      "Llena el resto con leche vaporizada hasta 12mm por debajo del borde y agrega 2½ vueltas de crema batida",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_te-caliente-teavana",
    "name": "Té Caliente Teavana",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Surtido de tés de hoja entera.",
    "steps": [
      "Abre el sobre de la bolsita y sácala con pinzas; deja la etiqueta de las bolsitas dentro de la manga del vaso",
      "Incorpora las bolsitas — Alto: 1, Grande: 1, Venti: 2",
      "Llena con agua caliente hasta llegar a 6mm por debajo del borde del vaso",
      "Deja infusionar 5 minutos y retira las bolsitas",
      "Coloca tapa, entrega con manga y conecta"
    ]
  },
  {
    "id": "drk_cortado",
    "name": "Cortado",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Deliciosa bebida que resalta el sabor de nuestro café con shots de Ristretto combinado con un poco de leche al vapor.",
    "steps": [
      "Vaporiza la leche en la medida short — vierte leche hasta la línea correspondiente de la jarra y airea de 1 a 3 segundos",
      "Agrega shots ristretto en fila — Corto: 3",
      "Llena con leche al vapor hasta 6mm por debajo de borde del vaso",
      "Coloca tapa, entrega y conecta",
      "Esta bebida únicamente se encuentra disponible en tamaño short"
    ]
  },
  {
    "id": "drk_vainilla-protein-latte",
    "name": "Vainilla Protein Latte",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Café espresso mezclado con leche adicionada con proteína vaporizada a la perfección y un delicioso toque de vainilla.",
    "steps": [
      "Vaporiza la leche de proteína — vierte la leche con proteína hasta la línea Short y leche light hasta la línea del tamaño correspondiente (Alto, Grande o Venti)",
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe de vainilla — Alto: 3, Grande: 4, Venti: 5",
      "Llena el vaso con leche vaporizada hasta 6mm por debajo del borde del vaso",
      "Coloca tapa y conecta"
    ]
  },
  {
    "id": "drk_vainilla-sugar-free-protein-latte",
    "name": "Vainilla Sugar Free Protein Latte",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Café espresso mezclado con leche adicionada con proteína vaporizada a la perfección y un delicioso toque de vainilla sin azúcar.",
    "steps": [
      "Vaporiza la leche de proteína — vierte la leche con proteína hasta la línea Short y leche light hasta la línea del tamaño correspondiente (Alto, Grande o Venti)",
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe sugar free de vainilla — Alto: 3, Grande: 4, Venti: 5",
      "Llena el vaso con leche vaporizada hasta 6mm por debajo del borde del vaso",
      "Coloca tapa y conecta"
    ]
  },
  {
    "id": "drk_leche-con-proteina",
    "name": "Leche con Proteína",
    "category": "caliente",
    "subcategory": "con_cafe",
    "description": "Preparación base de leche adicionada con proteína, usada como insumo para las bebidas Protein Latte.",
    "steps": [
      "En tu jarra de 2L agrega leche light fría hasta la línea de .5L y vierte el contenido a la licuadora",
      "Agrega 1 bolsa completa de proteína en polvo a tu licuadora",
      "Licua en el botón #3 y licua nuevamente en el botón #1",
      "En tu jarra de 2L agrega leche light fría hasta la línea de 1L",
      "Vierte el contenido de la licuadora a la jarra",
      "Tapa tu jarra y etiqueta con 48 horas de vida útil y con el nombre \"Leche con Proteína\", guarda en el refrigerador",
      "Antes de usar deberás reposar la leche en refrigeración 1 hora",
      "Antes de usar por primera vez tendrás que mezclar bien con tu globo y mantener siempre en refrigeración"
    ]
  },
  {
    "id": "drk_chai-latte",
    "name": "Chai Latte",
    "category": "caliente",
    "subcategory": "sin_cafe",
    "description": "Mezcla de tés negros, pimienta negra, jengibre especiado con notas de cardamomo y vainilla, ligeramente endulzado. Cubierto con agua caliente, leche vaporizada a la perfección y espuma.",
    "steps": [
      "Vaporiza la leche — línea para vaso corto en Alto y Grande, línea para vaso alto en Venti",
      "Agrega concentrado de chai — Alto: 3, Grande: 4, Venti: 5",
      "Llena la mitad del vaso con agua caliente",
      "Llena el resto con leche vaporizada hasta 12mm por debajo del borde y agrega espuma hasta 6mm debajo del borde del vaso",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_chocolate",
    "name": "Chocolate",
    "category": "caliente",
    "subcategory": "sin_cafe",
    "description": "Leche vaporizada a la perfección con salsa de chocolate y jarabe de vainilla. Cubierta con crema batida y salsa de mocha.",
    "steps": [
      "Vaporiza la leche EXTRA HOT de 1 a 3 segundos (arriba de 77°C/170°F; para niños hasta 54°C/130°F) — línea del tamaño correspondiente en Alto, una línea por debajo del tamaño correspondiente en Grande/Venti",
      "Agrega salsa de mocha — Alto: 3, Grande: 4, Venti: 5",
      "Agrega jarabe de vainilla — Alto: 1, Grande: 1, Venti: 2",
      "Llena el vaso con leche vaporizada a la perfección hasta llegar a 12mm por debajo del vaso",
      "Agrega 2½ vueltas de crema batida y agrega 5 espirales de mocha",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_chocolate-blanco",
    "name": "Chocolate Blanco",
    "category": "caliente",
    "subcategory": "sin_cafe",
    "description": "Leche vaporizada a la perfección con salsa de chocolate blanco y cubierta con crema batida.",
    "steps": [
      "Vaporiza la leche EXTRA HOT de 1 a 3 segundos (arriba de 77°C/170°F; para niños hasta 54°C/130°F) — línea del tamaño correspondiente en Alto, una línea por debajo del tamaño correspondiente en Grande/Venti",
      "Agrega salsa de mocha blanco — Alto: 3, Grande: 4, Venti: 5",
      "Lleva el vaso con leche vaporizada a la perfección hasta llegar a 12mm por debajo del vaso",
      "Agrega 2½ vueltas de crema batida",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_chocolate-mexicano",
    "name": "Chocolate Mexicano",
    "category": "caliente",
    "subcategory": "sin_cafe",
    "description": "Deliciosa versión de chocolate con notas a canela y nuestra salsa de mocha.",
    "steps": [
      "Vaporiza la leche — vierte leche hasta la línea correspondiente de la jarra",
      "Agrega salsa de mocha directo en la jarra para vaporizar — Corto: 1, Alto: 1, Grande: 1, Venti: 2",
      "Agrega chocolate mexicano en polvo (medidas rasas) directo en la jarra para vaporizar — Corto: 2, Alto: 3, Grande: 4, Venti: 5",
      "Vaporiza la leche, mocha y chocolate mexicano al mismo tiempo y airea de 1 a 3 segundos",
      "Llena con leche vaporizada mezclada con mocha y chocolate mexicano hasta 6mm por debajo del borde del vaso",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_leche-al-vapor",
    "name": "Leche al Vapor",
    "category": "caliente",
    "subcategory": "sin_cafe",
    "description": "Leche vaporizada a la perfección con espuma aterciopelada.",
    "steps": [
      "Vaporiza la leche — vierte leche hasta la línea correspondiente de la jarra y airea de 1 a 3 segundos (si la bebida es para un niño, vaporiza la leche hasta 54°C/130°F)",
      "Llena el vaso con leche vaporizada hasta 12mm por debajo del borde y agrega espuma hasta 6mm por debajo del borde",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_matcha-green-tea-latte",
    "name": "Matcha Green Tea Latte",
    "category": "caliente",
    "subcategory": "sin_cafe",
    "description": "El té verde Matcha se vaporiza con leche, ligeramente endulzado con jarabe clásico.",
    "steps": [
      "Agrega leche en la jarra vaporizadora hasta la línea correspondiente",
      "Agrega té matcha en polvo (medidas rasas) directo en la jarra para vaporizar — Alto: 2, Grande: 3, Venti: 4",
      "Vaporiza la leche y el té en polvo al mismo tiempo, airea de 1 a 3 segundos",
      "Agrega jarabe clásico — Alto: 2, Grande: 3, Venti: 4",
      "Llena con leche vaporizada y mezcla de matcha hasta 12mm antes del borde y cubre con espuma hasta llegar 6mm por debajo del borde del vaso",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_matcha-protein-latte",
    "name": "Matcha Protein Latte",
    "category": "caliente",
    "subcategory": "sin_cafe",
    "description": "Té verde Matcha vaporizado con deliciosa leche con proteína y un toque de jarabe clásico.",
    "steps": [
      "Vaporiza la leche de proteína — vierte la leche con proteína hasta la línea Short y leche light hasta la línea del tamaño correspondiente (Alto, Grande o Venti)",
      "Agrega té matcha en polvo (medidas rasas) directo en la jarra para vaporizar — Alto: 2, Grande: 3, Venti: 4",
      "Vaporiza la leche y el té en polvo al mismo tiempo",
      "Agrega jarabe clásico — Alto: 2, Grande: 3, Venti: 4",
      "Llena con leche vaporizada y mezcla de matcha hasta 12mm antes del borde y cubre con espuma hasta llegar 6mm por debajo del borde del vaso",
      "Coloca tapa, entrega y conecta"
    ]
  },
  {
    "id": "drk_avellana-shaken-espresso-helado",
    "name": "Avellana Shaken Espresso Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Shots de Espresso con jarabe de avellana, shakeados juntos y cubiertos con leche de avena (con bebida de avena).",
    "steps": [
      "Pon en fila los shots de espresso — Alto: 2, Grande: 3, Venti: 4",
      "Agrega jarabe de avellana (pump plástico de CBS) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega el hielo en el shaker, hasta la línea del hielo",
      "Agrega los shots sobre el hielo, coloca la tapa en el shaker y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, agrega leche de avena alrededor de las paredes hasta ¼\" (6mm) por debajo del borde del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_brown-sugar-shaken-espresso-helado",
    "name": "Brown Sugar Shaken Espresso Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Shots de Espresso con jarabe Brown Sugar y canela en polvo, shakeados juntos y cubiertos con leche de avena (con bebida de avena).",
    "steps": [
      "Pon en fila los shots de espresso — Alto: 2, Grande: 3, Venti: 4",
      "Agrega jarabe Brown Sugar (pump plástico de CBS) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega el hielo en el shaker, hasta la línea del hielo",
      "Agrega canela en polvo, espolvoreada encima del hielo — Alto: 2, Grande: 2, Venti: 2",
      "Agrega los shots sobre el hielo, coloca la tapa en el shaker y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, agrega leche de avena alrededor de las paredes hasta ¼\" (6mm) por debajo del borde del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_caramel-macchiato-helado",
    "name": "Caramel Macchiato Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Delicioso toque de vainilla mezclado con leche y hielos, coronado con nuestro shot de espresso y decorado con una rejilla de caramelo.",
    "steps": [
      "Pon en fila los shots de espresso — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe de vainilla (pump plástico de espresso) — Alto: 2, Grande: 3, Venti: 4. Nota: se agrega un pump menos de jarabe de vainilla en cada tamaño, comparado con las bebidas estándar",
      "Agrega leche fría hasta llegar a la línea superior del vaso",
      "Agrega hielo hasta llegar a 12 mm por debajo del borde del vaso y vierte los shots de espresso sobre el hielo",
      "Cubre con caramelo formando 7 y 7 líneas entrecruzadas y 2 círculos, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_chocolate-cream-cold-brew",
    "name": "Chocolate Cream Cold Brew",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Cold Brew con un toque de vainilla y cubierto con un cold foam de vainilla sweet cream y chocolate.",
    "steps": [
      "Licua el cold foam: vierte vainilla sweet cream hasta la línea de 100 ml, agrega 2 cucharadas (1 TSPN) de malta de chocolate en polvo y licua presionando el botón n.º 3",
      "Agrega jarabe de vainilla (CBS pump) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega el concentrado de cold brew hasta llegar a la línea inferior del vaso",
      "Agrega agua hasta la línea superior del vaso",
      "Agrega hielo hasta 2cm por debajo del borde del vaso, agrega chocolate cream cold foam hasta 6mm por debajo del borde (el cold foam se debe servir 2 cm por debajo del borde), coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_cold-brew",
    "name": "Cold Brew",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Café preparado artesanalmente e infusionado durante 20 hrs. para extraer sabores excepcionales.",
    "steps": [
      "Agrega jarabe clásico (pump plástico de CBS) — Alto: 3, Grande: 4, Venti: 5",
      "Vierte el concentrado de cold brew hasta llegar a la línea inferior del vaso",
      "Agrega agua hasta la línea superior del vaso",
      "Agrega hielo hasta 6mm por debajo del borde del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_cold-foam-cappuccino-helado",
    "name": "Cold Foam Cappuccino Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Delicioso Cappuccino helado con espuma de leche fría preparada de manera artesanal, brindando un toque cremoso y fresco.",
    "steps": [
      "Licua el cold foam: vierte leche light fría hasta la línea de 100 ml y licua presionando el botón n.º 3",
      "Pon en fila los shots de espresso — Alto: 1, Grande: 2, Venti: 2",
      "Llena con hielo hasta 2 cm por debajo del borde del vaso",
      "Vierte los shots sobre el hielo",
      "Llena con leche fría por arriba de la línea superior del vaso",
      "Cubre con cold foam hasta el borde del vaso (se debe servir 2 cm por debajo del borde), coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_espresso-americano-helado",
    "name": "Espresso Americano Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Shots de espresso con agua y hielos.",
    "steps": [
      "Pon en fila los shots de espresso — Alto: 2, Grande: 3, Venti: 4",
      "Agrega agua fría hasta llegar a la línea superior del vaso (para solicitudes con \"poca agua\", llena hasta la línea inferior o intermedia)",
      "Llena el vaso con hielo hasta llegar a 6 mm por debajo del borde, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_latte-helado",
    "name": "Latte Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Café espresso mezclado con leche y hielos.",
    "steps": [
      "Agrega shots de espresso — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe saborizante, solo si el cliente lo solicita (pump plástico espresso) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega leche fría a la línea superior del vaso",
      "Llena con hielo hasta 6mm por debajo del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_latte-macchiato-helado",
    "name": "Latte Macchiato Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Leche mezclada con extra shot de Espresso y hielos; con un sabor más intenso y acentuado.",
    "steps": [
      "Agrega shots de espresso en fila, viértelos en una jarra de 148ml — Alto: 2, Grande: 3, Venti: 3",
      "Agrega leche fría a la línea superior del vaso",
      "Llena el vaso con hielo hasta llegar 1 cm por debajo del borde del vaso, vierte lentamente los shots de espresso sobre la parte central del vaso, coloca la tapa nitro, entrega al cliente y conecta"
    ]
  },
  {
    "id": "drk_mocha-blanco-helado",
    "name": "Mocha Blanco Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Irresistible combinación de chocolate blanco, shots de espresso, hielo y leche, coronado con crema batida.",
    "steps": [
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega salsa de mocha blanco (dosificador metal mocha blanco espresso) — Alto: 3, Grande: 4, Venti: 5, mezcla el espresso con la salsa",
      "Agrega leche fría a línea superior del vaso",
      "Llena con hielo hasta 1cm por debajo del borde del vaso",
      "Agrega 2½ vueltas de crema batida, cubre con una tapa domo, entrega con popote al cliente y conecta"
    ]
  },
  {
    "id": "drk_mocha-blanco-shaken-espresso-helado",
    "name": "Mocha Blanco Shaken Espresso Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Shots de Espresso con salsa de mocha blanco, shakeados juntos y cubiertos con leche de avena (con bebida de avena).",
    "steps": [
      "Agrega shots de espresso en fila — Alto: 2, Grande: 3, Venti: 4",
      "Agrega salsa de mocha blanco (dosificador metal CBS) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega el hielo en el shaker, hasta la línea del hielo",
      "Agrega los shots sobre el hielo, coloca la tapa en el shaker y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, agrega leche de avena alrededor de las paredes hasta ¼\" (6mm) por debajo del borde del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_mocha-helado",
    "name": "Mocha Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Irresistible combinación de chocolate, shots de espresso, hielo y leche, coronado con crema batida.",
    "steps": [
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega salsa de mocha (dosificador de metal espresso) — Alto: 3, Grande: 4, Venti: 5, mezcla el espresso con la salsa de mocha",
      "Agrega leche fría a línea superior del vaso",
      "Llena con hielo hasta 1cm por debajo del borde del vaso",
      "Agrega 2½ vueltas de crema batida, cubre con una tapa domo, entrega con popote al cliente y conecta"
    ]
  },
  {
    "id": "drk_mocha-shaken-espresso-helado",
    "name": "Mocha Shaken Espresso Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Shots de Espresso con salsa de mocha, shakeados juntos y cubiertos con leche de avena (con bebida de avena).",
    "steps": [
      "Agrega shots de espresso en fila — Alto: 2, Grande: 3, Venti: 4",
      "Agrega salsa de mocha (dosificador de metal espresso) — Alto: 1, Grande: 2, Venti: 2",
      "Agrega el hielo en el shaker, hasta la línea del hielo",
      "Agrega los shots sobre el hielo, coloca la tapa en el shaker y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, agrega leche de avena alrededor de las paredes hasta ¼\" (6mm) por debajo del borde del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_vainilla-sweet-cream-cold-brew",
    "name": "Vainilla Sweet Cream Cold Brew",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Bebida refrescante y re-energizante, preparada artesanalmente con un toque de vainilla.",
    "steps": [
      "Agrega jarabe de vainilla (pump plástico de CBS) — Alto: 1, Grande: 2, Venti: 2",
      "Vierte el concentrado de cold brew hasta llegar a la línea inferior del vaso",
      "Agrega agua hasta la línea superior del vaso",
      "Agrega hielo hasta 12mm por debajo del borde del vaso, agrega sweet cream hasta 6mm por debajo del borde del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_vainilla-protein-latte-helado",
    "name": "Vainilla Protein Latte Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Café espresso mezclado con leche adicionada con proteína, hielos y un delicioso toque de vainilla.",
    "steps": [
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe de vainilla (pump plástico espresso) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega tus shots de café y agrega leche de proteína fría hasta la línea superior del vaso",
      "Llena el vaso con hielo hasta 6mm por debajo del borde, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_vainilla-sugar-free-protein-latte-helado",
    "name": "Vainilla Sugar Free Protein Latte Helado",
    "category": "helada",
    "subcategory": "con_cafe",
    "description": "Café espresso mezclado con leche adicionada con proteína, hielos y un delicioso toque de vainilla sin azúcar.",
    "steps": [
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe sugar free de vainilla (pump plástico espresso) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega leche de proteína fría hasta la línea superior del vaso",
      "Llena el vaso con hielo hasta 6mm por debajo del borde, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_matcha-protein-latte-helado",
    "name": "Matcha Protein Latte Helado",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Té verde Matcha mezclado con hielos, deliciosa leche con proteína y un toque de jarabe clásico.",
    "steps": [
      "Agrega jarabe clásico (pump plástico espresso) — Alto: 2, Grande: 3, Venti: 4",
      "Agrega leche fría con proteína hasta la línea superior del vaso y vierte en la jarra de cold foam",
      "Agrega té matcha en polvo, medidas rasas directo en la jarra de cold foam — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo de acuerdo con la medida volumétrica correspondiente",
      "Licua el cold foam presionando el botón n.º 4",
      "Llena el vaso hasta 6 mm por debajo del borde, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_matcha-latte-helado-con-vainilla-cold-foam-de-proteina",
    "name": "Matcha Latte Helado con Vainilla Cold Foam de Proteína",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Té verde Matcha y delicioso cold foam adicionado con proteína.",
    "steps": [
      "Prepara el cold foam de proteína: vierte VSC hasta la línea de 100 ml en la jarra de cold foam, agrega 8 cucharadas rasas de proteína en polvo y licua en #3 (si solo cuentas con una jarra de Cold Foam, inicia en el paso 2 y al finalizar la bebida vierte en el vaso y realiza el cold foam)",
      "Vierte leche hasta la línea superior del vaso y vierte en la jarra de cold foam",
      "Agrega té matcha en polvo, medidas rasas directo en la jarra de cold foam — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo de acuerdo con la medida volumétrica correspondiente",
      "Licua presionando el botón n.º 4",
      "Llena el vaso hasta 2 cm por debajo del borde, cubre con cold foam de proteína, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_chai-latte-helado",
    "name": "Chai Latte Helado",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Mezcla concentrada de tés negros, pimienta negra, jengibre especiado con notas de cardamomo y vainilla, ligeramente endulzado. Combinado con leche y servida sobre hielo.",
    "steps": [
      "Agrega concentrado de chai (dosificador metal chai) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega leche fría hasta llegar a la línea superior del vaso (nota: para el chai latte helado no se agrega agua)",
      "Llena con hielo hasta 6mm por debajo del vaso, cubre con tapa nitro, entrega la bebida al cliente y conecta"
    ]
  },
  {
    "id": "drk_chocolate-helado",
    "name": "Chocolate Helado",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Clásico chocolate con leche fría, cubos de hielo y salsa de chocolate.",
    "steps": [
      "Agrega salsa de mocha (surtidor de metal espresso) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega jarabe de vainilla (pump plástico de espresso) — Alto: 1, Grande: 1, Venti: 2",
      "Agrega leche fría hasta la línea superior del vaso y revuelve",
      "Agrega hielo a 1 cm por debajo del borde del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_chocolate-mexicano-helado",
    "name": "Chocolate Mexicano Helado",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Una combinación perfecta de dos tipos de chocolate perfectamente incorporados con leche y hielos.",
    "steps": [
      "Vierte la leche hasta la última línea del vaso helado",
      "Vacía el contenido del vaso helado en el shaker",
      "Agrega salsa de mocha (surtidor de metal CBS) — Alto: 2, Grande: 2, Venti: 4",
      "Agrega scoops de CHMX, medidas rasas (cuchara CHMX) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega hielo a 1 cm por debajo del borde del vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_dragon-drink-refresher",
    "name": "Dragon Drink Refresher",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Nuestro exclusivo extracto de café verde mezclado con un refrescante concentrado de frutas, inclusiones de dragón fruit, mezclada con leche de coco y hielo.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con base de Mango Dragon Fruit Refresher, correspondiente a cada tamaño",
      "Agrega leche de coco fría hasta el número 3 de la línea naranja, correspondiente a cada tamaño",
      "Agrega inclusión de dragon fruit (scoop, cuchara 1 TSPN) — Alto: 1, Grande: 1, Venti: 1",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_mango-dragon-lemonade-refresher",
    "name": "Mango Dragon Lemonade Refresher",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Nuestro exclusivo extracto de café verde mezclado con un refrescante concentrado de frutas, con inclusiones de dragón fruit, mezclada con limonada y hielo.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con base de Mango Dragon Fruit Refresher, correspondiente a cada tamaño",
      "Llena el vaso shaker hasta el número 3 de la línea naranja con limonada, correspondiente a cada tamaño",
      "Agrega inclusión de dragon fruit (scoop, cuchara 1 TSPN) — Alto: 1, Grande: 1, Venti: 1",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_mango-dragon-refresher",
    "name": "Mango Dragon Refresher",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Nuestro exclusivo extracto de café verde mezclado con un refrescante concentrado de frutas, inclusiones de dragón fruit y hielo.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con base de Mango Dragon Fruit Refresher, correspondiente a cada tamaño",
      "Llena el vaso shaker hasta el número 3 de la línea naranja con agua, correspondiente a cada tamaño",
      "Agrega inclusión de dragón fruit (scoop, cuchara 1 TSPN) — Alto: 1, Grande: 1, Venti: 1",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_matcha-green-tea-helado",
    "name": "Matcha Green Tea Helado",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Té verde Matcha mezclado con jarabe clásico, agua, hielo, y cubierto con leche.",
    "steps": [
      "Para todos los tamaños, llena el vaso shaker con agua hasta la línea para té del vaso alto",
      "Agrega jarabe clásico (pump plástico de CBS) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega té matcha en polvo, medidas rasas — Alto: 2, Grande: 3, Venti: 4",
      "Llena con hielo hasta la línea para el hielo",
      "Coloca la tapa en el shaker y agita 10 veces, con fuerza y lentamente",
      "Llena el vaso con leche hasta llegar a 6 mm por debajo del borde, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_matcha-lemonade-helado",
    "name": "Matcha Lemonade Helado",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Té verde Matcha combinado con limonada, ligeramente endulzado y servido sobre hielo.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con agua, correspondiente a cada tamaño",
      "Llena el vaso shaker hasta el número 3 de la línea naranja con limonada, correspondiente a cada tamaño",
      "Agrega jarabe clásico (pump plástico de CBS) — Alto: 2, Grande: 3, Venti: 4",
      "Agrega té matcha en polvo, medidas rasas — Alto: 2, Grande: 3, Venti: 4",
      "Llena con hielo hasta la línea para el hielo",
      "Coloca la tapa en el shaker y agita 10 veces, con fuerza y lentamente",
      "Coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_pink-drink-refresher",
    "name": "Pink Drink Refresher",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Nuestro exclusivo extracto de café verde mezclado con un refrescante concentrado de frutas (fresa y acaí), con inclusiones de fresa, mezclada con leche de coco y hielo.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con base de Strawberry Acaí Refresher, correspondiente a cada tamaño",
      "Agrega leche de coco fría hasta el número 3 de la línea naranja, correspondiente a cada tamaño",
      "Agrega inclusión de fresa (scoop, cuchara 1 TSPN) — Alto: 1, Grande: 1, Venti: 1",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_shaken-lemon-black-tea",
    "name": "Shaken Lemon Black Tea",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Helada y deliciosa bebida a base de Té negro con limonada y ligeramente endulzado.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con el té negro, correspondiente a cada tamaño",
      "Agrega limonada hasta el número 3, correspondiente a cada tamaño de la línea naranja",
      "Agrega jarabe clásico (pump plástico de CBS) — Alto: 2, Grande: 3, Venti: 4",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_shaken-lemon-green-tea",
    "name": "Shaken Lemon Green Tea",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Helada y deliciosa bebida a base de Té verde con limonada y ligeramente endulzado.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con el té verde, correspondiente a cada tamaño",
      "Agrega limonada hasta el número 3, correspondiente a cada tamaño de la línea naranja",
      "Agrega jarabe clásico (pump plástico de CBS) — Alto: 2, Grande: 3, Venti: 4",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_shaken-lemon-hibiscus-tea",
    "name": "Shaken Lemon Hibiscus Tea",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Helada y deliciosa bebida a base de Té hibiscus con limonada y ligeramente endulzado.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con el té hibiscus, correspondiente a cada tamaño",
      "Agrega limonada hasta el número 3, correspondiente a cada tamaño de la línea naranja",
      "Agrega jarabe clásico (pump plástico de CBS) — Alto: 2, Grande: 3, Venti: 4",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_strawberry-acai-lemonade-refresher",
    "name": "Strawberry Acaí Lemonade Refresher",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Nuestro exclusivo extracto de café verde mezclado con un refrescante concentrado de frutas (fresa y acaí), con inclusiones de fresa, mezclada con limonada y hielo.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con base de Strawberry Acaí Refresher, correspondiente a cada tamaño",
      "Llena el vaso shaker hasta el número 3 de la línea naranja con limonada, correspondiente a cada tamaño",
      "Agrega inclusión de fresa (scoop, cuchara 1 TSPN) — Alto: 1, Grande: 1, Venti: 1",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_strawberry-acai-refresher",
    "name": "Strawberry Acaí Refresher",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Nuestro exclusivo extracto de café verde mezclado con un refrescante concentrado de frutas (fresa y acaí), con inclusiones de fresa y hielo.",
    "steps": [
      "Llena el vaso shaker hasta el número 1 de la línea naranja con base de Strawberry Acaí Refresher, correspondiente a cada tamaño",
      "Llena el vaso shaker hasta el número 3 de la línea naranja con agua fría, correspondiente a cada tamaño",
      "Agrega inclusión de fresa (scoop, cuchara 1 TSPN) — Alto: 1, Grande: 1, Venti: 1",
      "Llena con hielo hasta la línea apropiada del shaker, coloca la tapa y agita 10 veces, con fuerza y lentamente",
      "Vierte el contenido en el vaso, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_te-helado-teavana",
    "name": "Té Helado Teavana",
    "category": "helada",
    "subcategory": "sin_cafe",
    "description": "Refrescante té a elección de hoja entera servido sobre hielo.",
    "steps": [
      "Incorpora las bolsitas en una taza de servicio del tamaño adecuado — Alto: 1, Grande: 1, Venti: 2. Llénala a la mitad con agua caliente y deja infusionar: 3 minutos para tés blancos y verdes, 5 minutos para tés negros o herbales, luego retira las bolsitas",
      "Agrega jarabe clásico (pump plástico de CBS) — Alto: 2, Grande: 3, Venti: 4",
      "Llena el vaso con hielo, vierte el té caliente filtrado sobre hielo y jarabe en el vaso con hielo, coloca tapa nitro y conecta"
    ]
  },
  {
    "id": "drk_cafe-frappuccino",
    "name": "Café Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_coffee",
    "description": "Mezclamos el café con leche y hielo para crear una de nuestras bebidas más originales de Frappuccino.",
    "steps": [
      "Agrega Frappuccino Roast (dosificador metal) — Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte hasta 6mm por debajo del borde del vaso. Coloca tapa plana, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_cajeta-frappuccino",
    "name": "Cajeta Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_coffee",
    "description": "Dulce frappuccino con salsa de cajeta combinado con leche y mezclado con hielo. Cubierto con crema batida y caramelo.",
    "steps": [
      "Agrega Frappuccino Roast (omite este paso para versión cream) — Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega salsa de cajeta — Alto: 1, Grande: 2, Venti: 2",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee o cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida, agrega 5 vueltas de espiral de caramelo. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_caramel-frappuccino",
    "name": "Caramel Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_coffee",
    "description": "Frappuccino de café mezclado con leche y endulzado con caramelo. Cubierto con crema batida y caramelo.",
    "steps": [
      "Agrega Frappuccino Roast — Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega jarabe de caramelo — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida, agrega 5 vueltas de espiral de caramelo. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_cinnamon-dolce-frappuccino",
    "name": "Cinnamon Dolce Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_coffee",
    "description": "Frappuccino a base de café. Deliciosa mezcla que combina café, leche, jarabe de cinnamon dolce, batido con hielo, coronado con crema batida espolvoreada de canela en polvo.",
    "steps": [
      "Agrega Frappuccino Roast — Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche hasta línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega jarabe de cinnamon dolce — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida, espolvorea 2 veces el salero de canela sobre la crema batida. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_espresso-frappuccino",
    "name": "Espresso Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_coffee",
    "description": "Combinación de leche y hielo con shots de espresso, para darle intensidad sofisticada a tu Frappuccino.",
    "steps": [
      "Agrega Frappuccino Roast — Alto: 2, Grande: 3, Venti: 4",
      "Agrega shots de espresso — Alto: 1, Grande: 1, Venti: 1",
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte hasta 6mm por debajo del borde del vaso. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_frappuccino-chip",
    "name": "Frappuccino Chip",
    "category": "frappuccino",
    "subcategory": "base_coffee",
    "description": "Frappuccino a base de café. Deliciosa mezcla que combina café, leche y chips de chocolate, mocha, batido con hielo y coronado con crema batida y un espiral de mocha.",
    "steps": [
      "Agrega Frappuccino Roast — Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche hasta línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega salsa de mocha — Alto: 2, Grande: 3, Venti: 4",
      "Agrega scoops de Frappuccino chips (cuchara 1 TSPN) — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida, agrega 5 vueltas de espiral de mocha. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_mocha-blanco-frappuccino",
    "name": "Mocha Blanco Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_coffee",
    "description": "Frappuccino a base de café. Deliciosa mezcla que combina café, leche y chocolate blanco, batido con hielo y coronado con crema batida.",
    "steps": [
      "Agrega Frappuccino Roast — Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega salsa de mocha blanco — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_mocha-frappuccino",
    "name": "Mocha Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_coffee",
    "description": "Frappuccino a base de café. Deliciosa mezcla que combina café, leche y mocha, batido con hielo y coronado con crema batida.",
    "steps": [
      "Agrega Frappuccino Roast — Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega salsa de mocha — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_berry-yogurt-frappuccino",
    "name": "Berry Yogurt Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Fusionamos el yogurt natural con salsa de moras y hielos, ideal para cualquier momento del día.",
    "steps": [
      "Vierte el yogurt hasta la línea inferior del vaso.",
      "Vierte el concentrado de berry hasta la segunda línea.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte el contenido en el vaso. Coloca tapa plana, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_chai-cream-frappuccino",
    "name": "Chai Cream Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Mezcla concentrada de tés negros, pimienta negra, jengibre especiado con notas de cardamomo y vainilla, ligeramente endulzado. Mezclada con leche, hielo y cubierta con crema batida y polvo de canela.",
    "steps": [
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega concentrado de chai — Alto: 1, Grande: 2, Venti: 2",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Cubre con 2½ vueltas de crema batida, espolvorea 2 veces el salero de canela sobre la crema batida. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_chocolate-blanco-cream-frappuccino",
    "name": "Chocolate Blanco Cream Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Frappuccino a base de leche, mezclado con una deliciosa salsa de chocolate blanco, molido con hielo y cubierto con crema batida.",
    "steps": [
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega salsa de mocha blanco — Alto: 1, Grande: 2, Venti: 3",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_chocolate-cream-frappuccino",
    "name": "Chocolate Cream Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Frappuccino a base de leche, con una rica y cremosa mezcla de chocolate, molido con hielo, cubierta con crema batida y espiral de mocha.",
    "steps": [
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega salsa de mocha — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida y agrega 5 espirales de mocha. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_chocolate-mexicano-frappuccino",
    "name": "Chocolate Mexicano Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Frappuccino a base de leche, con una rica y cremosa mezcla de dos chocolates, y molido con hielo.",
    "steps": [
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega salsa de mocha — Alto: 2, Grande: 3, Venti: 4",
      "Agrega scoops de chocolate mexicano (medidas rasas) — Alto: 3, Grande: 4, Venti: 5",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_cookies-cream-frappuccino",
    "name": "Cookies & Cream Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Frappuccino a base de leche, con una rica y cremosa mezcla de chocolate blanco y chips de chocolate molidos con hielo, cubierta con crema batida y una deliciosa espolvoreada de galleta.",
    "steps": [
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega salsa de mocha blanco — Alto: 1, Grande: 2, Venti: 2",
      "Agrega scoop de Frappuccino chips (cuchara 1 TSPN) — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida y 1 scoop de galleta. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_fresa-cream-frappuccino",
    "name": "Fresa Cream Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Frappuccino a base de leche, con una rica y cremosa mezcla de fresa, molido con hielo y cubierta con crema batida.",
    "steps": [
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte la salsa de fresa hasta la segunda línea.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_matcha-green-tea-cream-frappuccino",
    "name": "Matcha Green Tea Cream Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Frappuccino base leche, mezclado con Té Matcha, un toque dulce y molido con hielo.",
    "steps": [
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega jarabe clásico — Alto: 1, Grande: 2, Venti: 2",
      "Agrega té verde matcha en polvo (medidas rasas) — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Cubre con 2½ vueltas de crema batida. Coloca tapa domo, entregue con popote y conecta."
    ]
  },
  {
    "id": "drk_pinacoco-yogurt-frappuccino",
    "name": "Piñacoco Yogurt Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Fusionamos el yogurt natural con salsa de piñacoco y hielos, ideal para cualquier momento del día.",
    "steps": [
      "Vierte el yogurt hasta la línea inferior del vaso.",
      "Vierte el concentrado de piñacoco hasta la segunda línea.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte el contenido en el vaso. Coloca tapa plana, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_vainilla-cream-frappuccino",
    "name": "Vainilla Cream Frappuccino",
    "category": "frappuccino",
    "subcategory": "base_cream",
    "description": "Frappuccino a base de leche, mezclado con jarabe de vainilla, molido con hielo y cubierto con crema batida.",
    "steps": [
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega jarabe de vainilla — Alto: 2, Grande: 3, Venti: 4",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Vierte 1 cm por debajo del borde del vaso, cubre con 2½ vueltas de crema batida. Coloca tapa domo, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_dragon-fruit-frozen-lemonade",
    "name": "Dragon Fruit Frozen Lemonade",
    "category": "frappuccino",
    "subcategory": "frozen",
    "description": "Deliciosa salsa de limón mezclada con inclusiones de fruta del dragón, hielo y vertido sobre salsa de fresa.",
    "steps": [
      "Agrega limonada, llenando el vaso hasta la segunda línea correspondiente a cada tamaño.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega inclusión de dragon fruit (scoop) — Alto: 1, Grande: 1, Venti: 1",
      "Agrega hielo hasta la línea apropiada del shaker.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Agrega salsa de fresa desde la mamila al fondo del vaso, solo hasta el ring inferior (primer borde del vaso).",
      "Vierte 1 cm por debajo del borde del vaso. Coloca tapa plana, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_mango-dragon-fruit-frozen-refresher",
    "name": "Mango Dragon Fruit Frozen Refresher",
    "category": "frappuccino",
    "subcategory": "frozen",
    "description": "Una mezcla de jugo de fruta con sabores de mango y fruta del dragón, extracto de café verde e inclusiones de fruta del dragón mezcladas con limonada y luego mezcladas con hielo.",
    "steps": [
      "Vierte base de Mango Dragon Fruit Refresher, llenando el vaso shaker hasta el número 1 de la línea naranja correspondiente a cada tamaño.",
      "Vierte limonada hasta el número 2 de la línea naranja correspondiente a cada tamaño.",
      "Vierte el contenido del shaker en el vaso de la licuadora.",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Prepara shakerato de limonada: vierte limonada hasta el número 1 de la línea naranja según el tamaño del shaker, agrega 1 cucharada de inclusión de dragon fruit, coloca la tapa y agita 10 veces con fuerza y lentamente.",
      "Vierte la bebida en el vaso a 1 cm por debajo del borde y llena con el shakerato de limonada. Coloca tapa plana, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_strawberry-acai-frozen-refresher",
    "name": "Strawberry Acaí Frozen Refresher",
    "category": "frappuccino",
    "subcategory": "frozen",
    "description": "Una mezcla de jugo de fruta real con sabores de fresa y fruta de acaí, extracto de café verde e inclusiones de fresa mezclado con limonada y luego con hielo.",
    "steps": [
      "Vierte base de Strawberry Acaí Refresher, llenando el vaso shaker hasta el número 1 de la línea naranja correspondiente a cada tamaño.",
      "Vierte limonada hasta el número 2 de la línea naranja correspondiente a cada tamaño.",
      "Vierte el contenido del shaker en el vaso de la licuadora.",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Prepara shakerato de limonada: vierte limonada hasta el número 1 de la línea naranja según el tamaño del shaker, agrega 1 cucharada de inclusión de fresas, coloca la tapa y agita 10 veces con fuerza y lentamente.",
      "Vierte la bebida en el vaso a 1 cm por debajo del borde y llena con el shakerato de limonada. Coloca tapa plana, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_strawberry-frozen-lemonade",
    "name": "Strawberry Frozen Lemonade",
    "category": "frappuccino",
    "subcategory": "frozen",
    "description": "Deliciosa salsa de limón mezclada con inclusiones de fresa, hielo y vertido sobre salsa de fresa.",
    "steps": [
      "Agrega limonada hasta la segunda línea correspondiente a cada tamaño.",
      "Vierte el contenido del vaso en el vaso de la licuadora.",
      "Agrega inclusión de fresa (scoop) — Alto: 1, Grande: 1, Venti: 1",
      "Agrega hielo hasta la línea apropiada del shaker.",
      "Agrega base cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Agrega salsa de fresa desde la mamila al fondo del vaso, solo hasta el ring inferior (primer borde del vaso).",
      "Vierte 1 cm por debajo del borde del vaso. Coloca tapa plana, entrega con popote y conecta."
    ]
  },
  {
    "id": "drk_ube-coco-latte",
    "name": "Ube Coco Latte",
    "category": "caliente",
    "subcategory": "especial",
    "description": "Espresso combinado con leche al vapor infusionada con jarabe de coco y polvo de Ube, creando una espuma morada y aterciopelada.",
    "steps": [
      "Agrega la leche — Vierte leche hasta la línea correspondiente de la jarra.",
      "Agrega scoop de polvo Ube en la jarra vaporizadora (cuchara matcha al ras) — Alto: 2, Grande: 3, Venti: 4",
      "Vaporiza la leche junto con el polvo Ube y airea de 1 a 3 segundos.",
      "Agrega shots de espresso en fila — Alto: 1, Grande: 2, Venti: 2",
      "Agrega jarabe de coco (pump plástico espresso) — Alto: 3, Grande: 4, Venti: 5",
      "Termina: mezcla el jarabe de coco y el espresso con movimientos circulares, llena el resto con leche vaporizada hasta 6 mm por debajo del borde, coloca tapa, entrega y conecta."
    ]
  },
  {
    "id": "drk_ube-coco-frappuccino",
    "name": "Ube Coco Frappuccino",
    "category": "frappuccino",
    "subcategory": "especial",
    "description": "El jarabe de coco se mezcla con leche y hielo, coronado con Cold Foam de Ube.",
    "steps": [
      "Prepara Cold Foam de Ube (jarra de cold foam): vierte VSC hasta la línea de 100 ml, agrega 2 cucharadas rasas (cuchara matcha) de polvo de Ube y licua en #3.",
      "Agrega Frappuccino Roast (pump frappuccino roast, omite para versión Cream) — Alto: 2, Grande: 3, Venti: 4",
      "Agrega jarabe de coco (pump plástico espresso) — Alto: 2, Grande: 3, Venti: 4",
      "Vierte la leche hasta la línea inferior del vaso.",
      "Vierte el contenido del vaso en el vaso de la licuadora para frappuccino.",
      "Agrega hielo usando la medida volumétrica apropiada.",
      "Agrega base coffee o cream para Frappuccino — Alto: 2, Grande: 3, Venti: 4",
      "Mezcla: presiona el botón n.º 1.",
      "Termina: vierte la bebida en el vaso 2 cm por debajo del borde, cubre con Cold Foam de Ube dejando 6 mm por debajo del borde, espolvorea 4 veces topping de coco tostado, coloca tapa nitro, entrega con popote y conecta."
    ]
  }
];
