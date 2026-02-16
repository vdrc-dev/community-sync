import type { Workflow } from '@/hooks/useWorkflows';

/**
 * Client-side workflow data that supplements Supabase.
 * These are shown alongside any workflows stored in the database.
 * When a matching title exists in Supabase, the DB version takes precedence.
 */
export const SEED_WORKFLOWS: Workflow[] = [
  // ═══ HIGIENE DIGITAL ═══
  {
    id: 'seed-inbox-zero',
    title: 'Inbox Zero en 30 Minutos',
    description: 'Limpia tu bandeja de entrada, desuscribete de newsletters innecesarios, y configura reglas automaticas para mantener el Inbox Zero de por vida',
    difficulty: 'beginner',
    category: 'Higiene Digital',
    icon_emoji: '📧',
    time_to_setup_minutes: 30,
    time_saved_per_use_minutes: 60,
    mermaid_diagram: `graph LR
    A[📧 Bandeja llena] --> B[Clean Email]
    B --> C[Desuscribir masivo]
    B --> D[Auto Clean rules]
    C --> E[📋 Inbox limpio]
    D --> E
    E --> F[⏰ Revision mensual]`,
    steps: [
      { step: 1, title: 'Audita tu bandeja actual', description: 'Antes de limpiar, necesitas saber cuanto desorden tienes. Abre tu email y anota: total de emails sin leer, cantidad de newsletters, y emails de mas de 3 meses.', prompt: null },
      { step: 2, title: 'Configura Clean Email', description: 'Ve a clean.email, conecta tu cuenta de Gmail/Outlook. Deja que escanee tu bandeja (toma 1-2 minutos).', prompt: null },
      { step: 3, title: 'Desuscribete masivamente', description: 'En Clean Email > Unsubscriber, revisa la lista de newsletters. Desuscribete de todo lo que no hayas leido en los ultimos 30 dias. Se brutal.', prompt: null },
      { step: 4, title: 'Configura Auto Clean', description: 'Crea reglas automaticas: emails de LinkedIn > 7 dias = archivar. Notificaciones de redes > 3 dias = borrar. Promociones > 1 dia = borrar.', prompt: null },
      { step: 5, title: 'Procesa lo que queda con IA', description: 'Para los emails que necesitan respuesta, usa este prompt para procesarlos rapido', prompt: 'Tengo estos {{CANTIDAD}} emails pendientes de responder. Para cada uno, dame:\n1. Prioridad (Alta/Media/Baja)\n2. Un borrador de respuesta de maximo 3 lineas\n3. Si necesita accion, cual es el siguiente paso\n\nEmails:\n{{EMAILS_PENDIENTES}}' },
      { step: 6, title: 'Programa revision semanal', description: 'Bloquea 15 minutos cada viernes para revisar y limpiar. Agenda un recordatorio. El Inbox Zero es un habito, no un evento.', prompt: null },
    ],
    tools_used: ['Clean Email', 'Gmail', 'Outlook', 'ChatGPT'],
    tags: ['inbox-zero', 'productividad', 'email', 'higiene-digital'],
    is_featured: true,
    created_at: '2026-02-16T00:00:00Z',
  },
  {
    id: 'seed-password-manager',
    title: 'Configurar Gestor de Contraseñas',
    description: 'Migra todas tus contraseñas a Bitwarden, activa 2FA en tus cuentas criticas, y nunca mas reutilices una password',
    difficulty: 'beginner',
    category: 'Higiene Digital',
    icon_emoji: '🔐',
    time_to_setup_minutes: 20,
    time_saved_per_use_minutes: 15,
    mermaid_diagram: `graph TD
    A[🔑 Passwords sueltas] --> B[Bitwarden]
    B --> C[Importar de Chrome]
    B --> D[Extension navegador]
    B --> E[App movil]
    C --> F[Cambiar passwords debiles]
    F --> G[Activar 2FA]
    G --> H[🛡️ Seguridad total]`,
    steps: [
      { step: 1, title: 'Crea tu cuenta de Bitwarden', description: 'Ve a bitwarden.com > Get Started. Crea tu Master Password: debe ser larga y memorable. Ejemplo: MiGatoTiene3PatasYMedia! Guardala en un lugar fisico seguro.', prompt: null },
      { step: 2, title: 'Instala las extensiones', description: 'Instala Bitwarden en: 1) Extension de Chrome/Firefox, 2) App de celular, 3) App de escritorio (opcional). Activa biometrico en el celular.', prompt: null },
      { step: 3, title: 'Importa passwords existentes', description: 'En Bitwarden > Tools > Import Data > selecciona Chrome/Firefox. Esto importa todas las passwords que tu navegador tenia guardadas.', prompt: null },
      { step: 4, title: 'Identifica passwords debiles', description: 'En Bitwarden > Reports > Reused Passwords y Weak Passwords. Haz una lista de las cuentas que necesitan password nueva.', prompt: null },
      { step: 5, title: 'Cambia passwords criticas', description: 'Empieza por las mas importantes: email, banco, redes sociales, cuentas de IA. Usa el generador de Bitwarden para cada una (16+ caracteres).', prompt: 'Dame una lista priorizada de las cuentas mas criticas que deberia proteger primero con contraseñas fuertes y 2FA. Mis cuentas incluyen: {{LISTA_CUENTAS}}. Ordenalas de mayor a menor riesgo y explica por que.' },
      { step: 6, title: 'Activa 2FA en cuentas criticas', description: 'Para cada cuenta critica, activa autenticacion de 2 factores. Usa Google Authenticator o la app de Bitwarden. Guarda los codigos de respaldo en Bitwarden.', prompt: null },
    ],
    tools_used: ['Bitwarden', 'Google Authenticator', 'Chrome'],
    tags: ['seguridad', 'passwords', '2fa', 'higiene-digital'],
    is_featured: false,
    created_at: '2026-02-16T00:01:00Z',
  },
  {
    id: 'seed-browser-profiles',
    title: 'Perfiles de Navegador Profesional',
    description: 'Separa tu vida digital creando perfiles de Chrome para trabajo, personal, y proyectos. Cero distracciones, maximo foco.',
    difficulty: 'beginner',
    category: 'Higiene Digital',
    icon_emoji: '🌐',
    time_to_setup_minutes: 15,
    time_saved_per_use_minutes: 30,
    mermaid_diagram: `graph LR
    A[1 perfil desordenado] --> B[Perfil Trabajo]
    A --> C[Perfil Personal]
    A --> D[Perfil Proyectos]
    B --> E[Bookmarks trabajo]
    C --> F[Redes y personal]
    D --> G[Dev tools y AI]`,
    steps: [
      { step: 1, title: 'Crea perfiles en Chrome', description: 'Abre Chrome > clic en tu avatar (esquina superior derecha) > Agregar perfil. Crea 3 perfiles: Trabajo, Personal, Proyectos IA.', prompt: null },
      { step: 2, title: 'Configura el perfil de Trabajo', description: 'En el perfil Trabajo: inicia sesion con tu email corporativo, instala solo extensiones de trabajo (Slack, Google Workspace, etc.), organiza bookmarks por proyecto.', prompt: null },
      { step: 3, title: 'Configura el perfil Personal', description: 'En el perfil Personal: tu email personal, redes sociales, streaming, compras. Todo lo que NO es trabajo va aqui.', prompt: null },
      { step: 4, title: 'Configura el perfil de Proyectos IA', description: 'Este es tu perfil de aprendizaje: ChatGPT, Claude, Perplexity, Lovable, Supabase, GitHub. Instala Bitwarden en todos los perfiles.', prompt: null },
      { step: 5, title: 'Planifica con IA tu organizacion', description: 'Usa IA para ayudarte a decidir que va en cada perfil', prompt: 'Soy {{TU_ROL}} y uso estas herramientas/sitios regularmente: {{LISTA_SITIOS}}. Organiza estos sitios en 3 perfiles de navegador (Trabajo, Personal, Proyectos IA). Para cada perfil, sugiere:\n1. Bookmarks principales\n2. Extensiones recomendadas\n3. Pagina de inicio ideal' },
    ],
    tools_used: ['Chrome', 'Bitwarden'],
    tags: ['navegador', 'productividad', 'organizacion', 'higiene-digital'],
    is_featured: false,
    created_at: '2026-02-16T00:02:00Z',
  },

  // ═══ IA & PRODUCTIVIDAD ═══
  {
    id: 'seed-chatgpt-personalization',
    title: 'Personalizar ChatGPT en 10 Minutos',
    description: 'Configura las 5 capas de personalizacion de ChatGPT: Custom Instructions, Memory, y tu primer GPT personalizado',
    difficulty: 'beginner',
    category: 'IA & Productividad',
    icon_emoji: '🤖',
    time_to_setup_minutes: 10,
    time_saved_per_use_minutes: 30,
    mermaid_diagram: `graph TD
    A[ChatGPT generico] --> B[Custom Instructions]
    B --> C[Memory activada]
    C --> D[Primer GPT]
    D --> E[🎯 ChatGPT personalizado]`,
    steps: [
      { step: 1, title: 'Configura Custom Instructions', description: 'Ve a ChatGPT > Settings > Personalization > Custom Instructions. Completa ambos campos usando la plantilla.', prompt: 'Genera mis Custom Instructions para ChatGPT basado en lo siguiente:\n- Mi rol: {{TU_ROL}}\n- Mi industria: {{TU_INDUSTRIA}}\n- Herramientas que uso: {{TUS_HERRAMIENTAS}}\n- Mis objetivos: {{TUS_OBJETIVOS}}\n\nGenera dos secciones:\n1. "Que quieres que ChatGPT sepa de ti" (maximo 1500 caracteres)\n2. "Como quieres que responda" (maximo 1500 caracteres)\n\nSe especifico y practico.' },
      { step: 2, title: 'Activa Memory', description: 'Ve a Settings > Personalization > Memory y activalo. Luego dile a ChatGPT datos clave que quieres que recuerde.', prompt: 'Quiero que recuerdes lo siguiente para todas nuestras conversaciones futuras:\n- Mi nombre: {{TU_NOMBRE}}\n- Mi empresa/proyecto: {{TU_EMPRESA}}\n- Mi equipo: {{TU_EQUIPO}}\n- Mis KPIs principales: {{TUS_KPIS}}\n- Herramientas favoritas: {{TUS_TOOLS}}\n- Prefiero respuestas en español, formato {{FORMATO_PREFERIDO}}' },
      { step: 3, title: 'Crea tu primer GPT', description: 'Ve a Explore GPTs > Create. Define un GPT para tu tarea mas repetitiva.', prompt: 'Ayudame a diseñar un GPT personalizado para la siguiente tarea repetitiva:\n- Tarea: {{TAREA_REPETITIVA}}\n- Frecuencia: {{FRECUENCIA}}\n- Input tipico: {{INPUT}}\n- Output deseado: {{OUTPUT}}\n\nGenera:\n1. Nombre del GPT\n2. Descripcion (1 linea)\n3. System prompt completo\n4. Conversation starters (4 ejemplos)' },
      { step: 4, title: 'Prueba tu setup', description: 'Abre un nuevo chat y prueba una tarea real. Nota como las respuestas ya estan calibradas a tu contexto. Si algo no esta bien, ajusta tus Custom Instructions.', prompt: null },
    ],
    tools_used: ['ChatGPT'],
    tags: ['chatgpt', 'personalizacion', 'custom-instructions', 'ia'],
    is_featured: true,
    created_at: '2026-02-16T00:03:00Z',
  },
  {
    id: 'seed-crop-framework',
    title: 'CROP: Framework de Prompting Profesional',
    description: 'Domina la metodologia CROP (Contexto, Rol, Objetivo, Pasos) para obtener respuestas de nivel experto de cualquier modelo de IA',
    difficulty: 'beginner',
    category: 'IA & Productividad',
    icon_emoji: '🎯',
    time_to_setup_minutes: 10,
    time_saved_per_use_minutes: 45,
    mermaid_diagram: `graph LR
    A[Prompt vago] --> B[C: Contexto]
    B --> C[R: Rol]
    C --> D[O: Objetivo]
    D --> E[P: Pasos]
    E --> F[🎯 Respuesta precisa]`,
    steps: [
      { step: 1, title: 'Entiende CROP', description: 'CROP es un framework para estructurar prompts: Contexto (quien eres, que haces), Rol (quien quieres que sea la IA), Objetivo (que necesitas), Pasos (como lo quieres). Nunca mas hagas prompts vagos.', prompt: null },
      { step: 2, title: 'Practica con un caso real', description: 'Toma una tarea que necesites hacer hoy y estructurala con CROP', prompt: 'Voy a practicar el framework CROP. Mi tarea es: {{TU_TAREA}}\n\nAyudame a construir el prompt perfecto estructurandolo asi:\n- **Contexto**: [genera el contexto basado en mi tarea]\n- **Rol**: [sugiere el rol mas adecuado]\n- **Objetivo**: [define el objetivo claro]\n- **Pasos**: [lista los pasos que debe seguir]\n\nLuego ejecuta el prompt y muestrame el resultado.' },
      { step: 3, title: 'Compara resultados', description: 'Toma el mismo pedido y hazlo de dos formas: sin CROP (prompt comun) y con CROP. Compara la calidad de ambas respuestas.', prompt: 'Voy a hacer un experimento. Primero responde a este pedido de forma directa:\n"{{PEDIDO_SIMPLE}}"\n\nAhora responde al mismo pedido pero con CROP:\nContexto: {{CONTEXTO}}\nRol: {{ROL}}\nObjetivo: {{OBJETIVO}}\nPasos: {{PASOS}}\n\nAl final, compara ambas respuestas y explica que mejoro con CROP.' },
      { step: 4, title: 'Crea tu biblioteca de prompts CROP', description: 'Identifica tus 5 tareas mas frecuentes y crea un prompt CROP para cada una. Guardalas en Notion o en la seccion de Prompts de esta plataforma.', prompt: 'Mis 5 tareas mas frecuentes con IA son:\n1. {{TAREA_1}}\n2. {{TAREA_2}}\n3. {{TAREA_3}}\n4. {{TAREA_4}}\n5. {{TAREA_5}}\n\nPara cada una, genera un prompt profesional usando el framework CROP. Formatea cada uno para que pueda copiarlo y pegarlo directamente.' },
    ],
    tools_used: ['ChatGPT', 'Claude', 'Perplexity'],
    tags: ['crop', 'prompting', 'metodologia', 'ia'],
    is_featured: true,
    created_at: '2026-02-16T00:04:00Z',
  },
  {
    id: 'seed-metaprompting',
    title: 'Metaprompting: Auditar y Mejorar tus Prompts',
    description: 'Aprende a usar la tecnica de metaprompting: pedirle a la IA que diseñe el mejor prompt ANTES de ejecutarlo',
    difficulty: 'intermediate',
    category: 'IA & Productividad',
    icon_emoji: '🧠',
    time_to_setup_minutes: 10,
    time_saved_per_use_minutes: 40,
    mermaid_diagram: `graph LR
    A[Tu idea] --> B[Meta-prompt]
    B --> C[IA diseña prompt]
    C --> D[Revisas y ajustas]
    D --> E[Ejecutas prompt final]
    E --> F[🎯 Resultado superior]`,
    steps: [
      { step: 1, title: 'Que es metaprompting', description: 'Metaprompting es pedirle a la IA que diseñe el prompt optimo ANTES de ejecutarlo. En vez de escribir tu el prompt, dejas que la IA lo construya con su conocimiento de que funciona mejor.', prompt: null },
      { step: 2, title: 'Tu primer meta-prompt', description: 'Prueba la tecnica con una tarea real', prompt: 'Antes de responder, quiero que diseñes el prompt mas efectivo para lograr lo siguiente: {{TU_OBJETIVO}}\n\nConsideraciones:\n- Mi contexto: {{TU_CONTEXTO}}\n- Audiencia: {{AUDIENCIA}}\n- Formato deseado: {{FORMATO}}\n\nMuestra:\n1. El prompt que diseñaste (para que yo aprenda)\n2. Por que elegiste esa estructura\n3. Ejecuta el prompt y muestrame el resultado' },
      { step: 3, title: 'Audita un prompt existente', description: 'Toma un prompt que ya uses y pidele a la IA que lo mejore', prompt: 'Analiza este prompt y mejoralo aplicando las mejores practicas de prompting (CROP, especificidad, formato, restricciones):\n\nPrompt original:\n{{TU_PROMPT_ACTUAL}}\n\nEntrega:\n1. Version mejorada del prompt\n2. Lista de cambios con justificacion\n3. Resultado de ejecutar la version mejorada' },
      { step: 4, title: 'Crea tu meta-prompt universal', description: 'Diseña un meta-prompt que puedas reutilizar para cualquier tarea', prompt: 'Crea un meta-prompt universal que yo pueda usar antes de cualquier tarea para obtener el mejor prompt posible. Debe:\n1. Ser generico (funcionar para cualquier tipo de tarea)\n2. Incluir campos que yo complete: [TAREA], [CONTEXTO], [OUTPUT ESPERADO]\n3. Instruir a la IA a diseñar el prompt optimo y luego ejecutarlo\n4. Pedir justificacion de las decisiones de diseño\n\nFormatea el meta-prompt listo para copiar y pegar.' },
    ],
    tools_used: ['ChatGPT', 'Claude'],
    tags: ['metaprompting', 'prompts', 'ia-avanzada'],
    is_featured: false,
    created_at: '2026-02-16T00:05:00Z',
  },
  {
    id: 'seed-research-deep',
    title: 'Research Profundo con Perplexity + NotebookLM',
    description: 'Investiga cualquier tema como un profesional: busca con Perplexity, analiza con NotebookLM, sintetiza con ChatGPT',
    difficulty: 'intermediate',
    category: 'IA & Productividad',
    icon_emoji: '🔬',
    time_to_setup_minutes: 15,
    time_saved_per_use_minutes: 90,
    mermaid_diagram: `graph LR
    A[Tema a investigar] --> B[Perplexity]
    B --> C[Fuentes verificadas]
    C --> D[NotebookLM]
    D --> E[Analisis profundo]
    E --> F[ChatGPT/Claude]
    F --> G[📄 Reporte final]`,
    steps: [
      { step: 1, title: 'Define tu pregunta de investigacion', description: 'Antes de buscar, define exactamente que necesitas saber. Una buena pregunta de investigacion es especifica y accionable.', prompt: 'Necesito investigar sobre: {{TEMA}}\nMi objetivo es: {{OBJETIVO}}\nMi audiencia es: {{AUDIENCIA}}\n\nAyudame a:\n1. Refinar mi pregunta de investigacion (hazla mas especifica)\n2. Listar 5 sub-preguntas que debo responder\n3. Sugerir fuentes o tipos de fuentes ideales\n4. Definir el formato del deliverable final' },
      { step: 2, title: 'Investiga con Perplexity', description: 'Abre Perplexity y busca cada sub-pregunta. Guarda las respuestas y fuentes. Usa el modo Focus (Academic para papers, Writing para articulos).', prompt: null },
      { step: 3, title: 'Analiza en profundidad con NotebookLM', description: 'Ve a notebooklm.google.com, crea un notebook, y sube las fuentes de Perplexity (URLs, PDFs, textos). Hazle preguntas al notebook para cruzar informacion.', prompt: null },
      { step: 4, title: 'Sintetiza el reporte final', description: 'Con toda la investigacion lista, usa IA para crear el documento final', prompt: 'Basandote en la siguiente investigacion, crea un reporte profesional:\n\nTema: {{TEMA}}\nHallazgos principales:\n{{HALLAZGOS}}\n\nFormato del reporte:\n1. Resumen ejecutivo (5 lineas max)\n2. Contexto y antecedentes\n3. Hallazgos clave (con fuentes citadas)\n4. Analisis e implicaciones\n5. Recomendaciones accionables\n6. Fuentes y referencias\n\nTono: profesional pero accesible. Maximo 2 paginas.' },
      { step: 5, title: 'Genera el podcast (bonus)', description: 'En NotebookLM, haz clic en Audio Overview para generar un podcast que resume toda tu investigacion. Ideal para compartir con tu equipo.', prompt: null },
    ],
    tools_used: ['Perplexity', 'NotebookLM', 'ChatGPT', 'Claude'],
    tags: ['investigacion', 'research', 'analisis', 'ia'],
    is_featured: false,
    created_at: '2026-02-16T00:06:00Z',
  },
  {
    id: 'seed-delegation-framework',
    title: 'Delegar Tareas a la IA: Framework de Decision',
    description: 'Aprende a identificar que tareas delegar a la IA, cuales hacer tu, y como estructurar la delegacion para resultados consistentes',
    difficulty: 'beginner',
    category: 'IA & Productividad',
    icon_emoji: '🤝',
    time_to_setup_minutes: 10,
    time_saved_per_use_minutes: 60,
    mermaid_diagram: `graph TD
    A[Tu lista de tareas] --> B{Repetitiva?}
    B -->|Si| C{Requiere juicio?}
    B -->|No| D[Hazla tu]
    C -->|No| E[Delega 100%]
    C -->|Si| F[Delega + revisa]
    D --> G[🎯 Productividad maxima]
    E --> G
    F --> G`,
    steps: [
      { step: 1, title: 'Audita tus tareas semanales', description: 'Lista todas las tareas que haces en una semana tipica', prompt: 'Voy a auditar mis tareas para identificar cuales puedo delegar a la IA. Mi rol es {{TU_ROL}} y estas son mis tareas semanales:\n\n{{LISTA_TAREAS}}\n\nPara cada tarea, clasifica:\n1. ⚡ DELEGAR 100%: la IA puede hacerla sola\n2. 🤝 DELEGAR + REVISAR: la IA hace el 80%, tu revisas\n3. 🧠 HACER TU: requiere tu juicio unico, creatividad o relaciones\n\nEstima el tiempo ahorrado por semana si delego las categorias 1 y 2.' },
      { step: 2, title: 'Crea prompts para cada tarea delegable', description: 'Para cada tarea que vas a delegar, crea un prompt reutilizable con CROP', prompt: 'Para esta tarea que quiero delegar a la IA:\nTarea: {{TAREA}}\nFrecuencia: {{FRECUENCIA}}\nInput tipico: {{INPUT}}\nOutput esperado: {{OUTPUT}}\nCalidad requerida: {{CALIDAD}}\n\nCrea un prompt CROP profesional que yo pueda reutilizar cada vez. Incluye:\n1. El prompt completo con variables entre llaves\n2. Ejemplo de uso con datos reales\n3. Checklist de revision rapida (que verificar antes de usar el output)' },
      { step: 3, title: 'Implementa tu sistema de delegacion', description: 'Guarda tus prompts en un lugar accesible (Notion, Bookmarks, esta plataforma) y empieza a usarlos esta semana. Mide cuanto tiempo ahorras.', prompt: null },
      { step: 4, title: 'Itera y optimiza', description: 'Despues de 1 semana, revisa: que funciono? que prompts necesitan ajuste? hay nuevas tareas que agregar?', prompt: null },
    ],
    tools_used: ['ChatGPT', 'Claude', 'Notion'],
    tags: ['delegacion', 'productividad', 'framework', 'ia'],
    is_featured: true,
    created_at: '2026-02-16T00:07:00Z',
  },

  // ═══ PRESENTACIONES ═══
  {
    id: 'seed-gamma-presentation',
    title: 'Crear Presentacion Profesional con Gamma',
    description: 'De idea a presentacion profesional en 15 minutos: ChatGPT diseña el contenido, Gamma lo presenta, Napkin agrega infografias',
    difficulty: 'beginner',
    category: 'Presentaciones',
    icon_emoji: '📊',
    time_to_setup_minutes: 15,
    time_saved_per_use_minutes: 120,
    mermaid_diagram: `graph LR
    A[💡 Idea/tema] --> B[ChatGPT: guion]
    B --> C[Gamma: slides]
    C --> D[Napkin: infografias]
    D --> E[📊 Presentacion pro]`,
    steps: [
      { step: 1, title: 'Crea el guion con IA', description: 'Antes de abrir Gamma, necesitas un guion estructurado. ChatGPT es tu director creativo.', prompt: 'Crea un guion para una presentacion sobre: {{TEMA}}\nAudiencia: {{AUDIENCIA}}\nDuracion: {{DURACION}} minutos\nObjetivo: {{OBJETIVO}}\n\nPara cada slide genera:\n- Titulo (maximo 6 palabras)\n- 3-4 bullets clave\n- Nota del presentador (que decir)\n- Sugerencia visual (que imagen o grafico usar)\n\nIncluye: slide de titulo, agenda, desarrollo (5-8 slides), conclusiones, y CTA final.' },
      { step: 2, title: 'Genera la presentacion en Gamma', description: 'Ve a gamma.app > Create new > Presentation. Pega el guion completo de ChatGPT. Gamma genera los slides con diseño profesional automatico.', prompt: null },
      { step: 3, title: 'Personaliza el diseño', description: 'En Gamma: 1) Cambia el tema de colores a uno que represente tu marca. 2) Ajusta las imagenes si alguna no es adecuada. 3) Revisa el flujo narrativo.', prompt: null },
      { step: 4, title: 'Agrega infografias con Napkin', description: 'Para slides con datos o procesos, usa Napkin para crear infografias. Copia el texto del slide, pegalo en napkin.ai, selecciona el estilo de visualizacion, y exporta como imagen.', prompt: null },
      { step: 5, title: 'Revision final con IA', description: 'Antes de presentar, haz una revision final', prompt: 'Revisa esta presentacion y dame feedback honesto:\n\nContenido por slide:\n{{CONTENIDO_SLIDES}}\n\nEvalua:\n1. Claridad del mensaje (1-10)\n2. Flujo narrativo (1-10)\n3. Balance texto/visual (1-10)\n4. Impacto del cierre (1-10)\n5. 3 mejoras concretas que harian esta presentacion un 10/10' },
    ],
    tools_used: ['ChatGPT', 'Gamma', 'Napkin'],
    tags: ['presentaciones', 'gamma', 'slides', 'diseño'],
    is_featured: true,
    created_at: '2026-02-16T00:08:00Z',
  },
  {
    id: 'seed-brand-kit',
    title: 'Diseñar Kit de Marca con IA',
    description: 'Crea tu identidad visual completa: paleta de colores, tipografia, logo, y templates — usando Canva, Coolors, y IA',
    difficulty: 'intermediate',
    category: 'Presentaciones',
    icon_emoji: '🎨',
    time_to_setup_minutes: 30,
    time_saved_per_use_minutes: 60,
    mermaid_diagram: `graph TD
    A[Tu marca/proyecto] --> B[ChatGPT: estrategia]
    B --> C[Coolors: paleta]
    B --> D[FontJoy: tipografia]
    C --> E[Canva: Brand Kit]
    D --> E
    E --> F[Templates listos]`,
    steps: [
      { step: 1, title: 'Define tu identidad de marca con IA', description: 'Antes de elegir colores, necesitas claridad sobre tu marca', prompt: 'Ayudame a definir la identidad visual de mi marca/proyecto:\n- Nombre: {{NOMBRE}}\n- Que hace: {{DESCRIPCION}}\n- Audiencia: {{AUDIENCIA}}\n- Valores: {{VALORES}}\n- Competidores: {{COMPETIDORES}}\n\nGenera:\n1. Personalidad de marca (3 adjetivos)\n2. Tono de comunicacion\n3. Recomendacion de estilo visual (moderno/clasico/minimalista/audaz)\n4. 3 paletas de colores sugeridas (con codigos hex)\n5. 3 combinaciones de tipografias sugeridas' },
      { step: 2, title: 'Crea tu paleta en Coolors', description: 'Ve a coolors.co y usa los colores sugeridos por IA como punto de partida. Genera variaciones hasta encontrar la paleta perfecta. Exporta los codigos hex.', prompt: null },
      { step: 3, title: 'Elige tipografias en Font Joy', description: 'Ve a fontjoy.com y genera combinaciones. Necesitas: 1 fuente para titulos (con personalidad), 1 para texto (legible), 1 para acentos (opcional).', prompt: null },
      { step: 4, title: 'Configura Brand Kit en Canva', description: 'En Canva > Brand > Brand Kit: sube tu logo, configura tu paleta de colores, agrega tus tipografias. Ahora todos tus diseños usaran tu identidad.', prompt: null },
      { step: 5, title: 'Crea templates base', description: 'Crea templates reutilizables: 1) Post de Instagram, 2) Historia, 3) Banner de LinkedIn, 4) Portada de presentacion, 5) Tarjeta de firma de email.', prompt: null },
    ],
    tools_used: ['ChatGPT', 'Canva', 'Coolors', 'FontJoy'],
    tags: ['branding', 'diseño', 'canva', 'identidad-visual'],
    is_featured: false,
    created_at: '2026-02-16T00:09:00Z',
  },

  // ═══ VIBE CODING ═══
  {
    id: 'seed-first-app-lovable',
    title: 'Tu Primera App con Lovable + Supabase',
    description: 'Construye una aplicacion web completa con login, base de datos, y deploy — desde cero, sin saber programar',
    difficulty: 'intermediate',
    category: 'Vibe Coding',
    icon_emoji: '💜',
    time_to_setup_minutes: 45,
    time_saved_per_use_minutes: 180,
    mermaid_diagram: `graph LR
    A[💡 Idea] --> B[PRD con ChatGPT]
    B --> C[Lovable genera app]
    C --> D[Conectar Supabase]
    D --> E[Crear tablas]
    E --> F[Testing]
    F --> G[🚀 Deploy]`,
    steps: [
      { step: 1, title: 'Escribe tu PRD con ChatGPT', description: 'El PRD (Product Requirements Document) es la clave. Mientras mas detallado, mejor resultado en Lovable.', prompt: 'Actua como Product Manager senior. Necesito un PRD para la siguiente aplicacion:\n\nIdea: {{TU_IDEA}}\nUsuarios: {{USUARIOS}}\nProblema que resuelve: {{PROBLEMA}}\n\nGenera un PRD completo con:\n1. Vision del producto (2 lineas)\n2. Usuarios objetivo y personas\n3. Funcionalidades core (MVP)\n4. Funcionalidades futuras (v2)\n5. Modelo de datos (tablas y relaciones)\n6. Flujos de usuario principales\n7. Diseño: estilo visual, paleta de colores, referencias\n8. Stack tecnico recomendado\n\nFormato: listo para copiar a Lovable.' },
      { step: 2, title: 'Crea tu proyecto de Supabase', description: 'Ve a supabase.com > New Project. Nombre descriptivo, region cercana (sa-east-1 para Latam), password fuerte (guardala en Bitwarden). Copia tu Project URL y anon key.', prompt: null },
      { step: 3, title: 'Genera la app en Lovable', description: 'Ve a lovable.dev > New Project. Pega tu PRD completo como primer prompt. Lovable genera el frontend en React + TypeScript + Tailwind. Revisa el preview.', prompt: null },
      { step: 4, title: 'Conecta Supabase a Lovable', description: 'En Lovable, ve a Settings > Supabase. Pega tu Project URL y anon key. Esto conecta tu frontend con el backend.', prompt: null },
      { step: 5, title: 'Crea las tablas en Supabase', description: 'Usa IA para generar el SQL de tus tablas basado en el modelo de datos del PRD', prompt: 'Basandote en este modelo de datos para mi aplicacion:\n{{MODELO_DATOS}}\n\nGenera el SQL completo para Supabase (PostgreSQL) incluyendo:\n1. CREATE TABLE con tipos de datos correctos\n2. Foreign keys y relaciones\n3. Row Level Security (RLS) policies\n4. Indices para queries comunes\n5. Datos de ejemplo (INSERT INTO) para testing\n\nUsa uuid como primary key y timestamptz para fechas.' },
      { step: 6, title: 'Itera y refina', description: 'Prueba la app, identifica bugs o mejoras, y sigue iterando en Lovable con prompts especificos. Cada cambio se guarda automaticamente en GitHub.', prompt: null },
      { step: 7, title: 'Deploy', description: 'Lovable tiene deploy automatico, pero para un dominio custom puedes usar Vercel: conecta el repo de GitHub, configura variables de entorno (Supabase URL y key), y despliega.', prompt: null },
    ],
    tools_used: ['Lovable', 'Supabase', 'ChatGPT', 'GitHub', 'Vercel'],
    tags: ['vibe-coding', 'lovable', 'supabase', 'full-stack', 'app'],
    is_featured: true,
    created_at: '2026-02-16T00:10:00Z',
  },
  {
    id: 'seed-prd-professional',
    title: 'PRD Profesional: De Idea a Documento Tecnico',
    description: 'Aprende a escribir un Product Requirements Document que maximice la calidad del output de Lovable y cualquier herramienta de vibe coding',
    difficulty: 'intermediate',
    category: 'Vibe Coding',
    icon_emoji: '📄',
    time_to_setup_minutes: 20,
    time_saved_per_use_minutes: 60,
    mermaid_diagram: `graph LR
    A[Idea vaga] --> B[Framework PRD]
    B --> C[ChatGPT refina]
    C --> D[Modelo de datos]
    D --> E[Flujos de usuario]
    E --> F[📄 PRD listo]`,
    steps: [
      { step: 1, title: 'De idea a concepto', description: 'Empieza con lo basico: que hace tu app, para quien, y por que', prompt: 'Tengo una idea de app: {{TU_IDEA}}\n\nAyudame a refinarla respondiendo:\n1. Que problema especifico resuelve?\n2. Quien es el usuario principal? (describe una persona)\n3. Que existe hoy? (alternativas actuales)\n4. Cual es tu ventaja diferencial?\n5. Cual seria el MVP minimo (3-5 features core)?' },
      { step: 2, title: 'Define el modelo de datos', description: 'El modelo de datos es la columna vertebral. Define que informacion guarda tu app y como se relaciona', prompt: 'Para mi app que hace: {{DESCRIPCION_APP}}\nCon estas funcionalidades: {{FEATURES}}\n\nDiseña el modelo de datos completo:\n1. Lista todas las entidades (tablas)\n2. Para cada tabla: campos, tipos de datos, relaciones\n3. Diagrama entidad-relacion en formato mermaid\n4. Campos obligatorios vs opcionales\n5. Indices recomendados\n\nUsa convenciones de Supabase (uuid, timestamptz, snake_case).' },
      { step: 3, title: 'Diseña los flujos de usuario', description: 'Mapea como el usuario navega tu app, desde el registro hasta la tarea principal', prompt: 'Para mi app con estas features: {{FEATURES}}\n\nDiseña los flujos de usuario principales:\n1. Flujo de onboarding (primer uso)\n2. Flujo core (tarea principal)\n3. Flujo de configuracion\n4. Flujo de error/edge cases\n\nPara cada flujo: pantalla por pantalla, que ve el usuario, que acciones puede tomar, y a donde lleva cada accion.' },
      { step: 4, title: 'Genera el PRD completo', description: 'Combina todo en un documento listo para Lovable', prompt: 'Con toda esta informacion, genera un PRD profesional completo y listo para pegar en Lovable:\n\nConcepto: {{CONCEPTO}}\nModelo de datos: {{MODELO}}\nFlujos: {{FLUJOS}}\n\nEl PRD debe incluir:\n1. Vision (2 lineas)\n2. Descripcion tecnica\n3. Stack: React + TypeScript + Tailwind + Supabase\n4. Modelo de datos completo\n5. Paginas y componentes principales\n6. Diseño: estilo dark mode, colores {{COLORES}}, minimalista\n7. Autenticacion: email + Google\n8. Responsive: mobile-first\n\nFormato: texto corrido optimizado para que Lovable lo interprete correctamente.' },
    ],
    tools_used: ['ChatGPT', 'Claude', 'Lovable'],
    tags: ['prd', 'vibe-coding', 'producto', 'documentacion'],
    is_featured: false,
    created_at: '2026-02-16T00:11:00Z',
  },
  {
    id: 'seed-claude-code',
    title: 'Claude Code: Agente IA en tu Terminal',
    description: 'Configura Claude Code como tu agente de desarrollo que ejecuta comandos, crea archivos, y automatiza tareas directamente en tu terminal',
    difficulty: 'advanced',
    category: 'Vibe Coding',
    icon_emoji: '🧑‍💻',
    time_to_setup_minutes: 20,
    time_saved_per_use_minutes: 120,
    mermaid_diagram: `graph LR
    A[Terminal] --> B[Claude Code]
    B --> C[Lee tu codigo]
    B --> D[Ejecuta comandos]
    B --> E[Crea archivos]
    C --> F[Sugiere mejoras]
    D --> G[Automatiza tareas]
    E --> H[Genera features]`,
    steps: [
      { step: 1, title: 'Instala Claude Code', description: 'Necesitas Node.js instalado. Abre tu terminal y ejecuta: npm install -g @anthropic-ai/claude-code. Configura tu API key de Anthropic.', prompt: null },
      { step: 2, title: 'Tu primera sesion', description: 'Navega a un proyecto en tu terminal (cd mi-proyecto) y ejecuta: claude. Claude Code lee tu codebase completo y esta listo para ayudarte.', prompt: null },
      { step: 3, title: 'Aprende los comandos basicos', description: 'En Claude Code puedes: describir cambios en español y Claude los implementa, pedir que cree archivos nuevos, ejecutar tests, hacer refactoring. Todo desde la terminal.', prompt: null },
      { step: 4, title: 'Automatiza una tarea real', description: 'Prueba con algo concreto: pide a Claude Code que agregue una feature a tu proyecto', prompt: 'Quiero que me ayudes a usar Claude Code para esta tarea:\n\nProyecto: {{TIPO_PROYECTO}} en {{STACK}}\nTarea: {{TAREA}}\nArchivos relevantes: {{ARCHIVOS}}\n\nGenera los comandos exactos que debo ejecutar en Claude Code para completar esta tarea, paso a paso. Incluye:\n1. Como describir la tarea a Claude Code\n2. Que archivos crear/modificar\n3. Como verificar que funciona\n4. Como hacer commit del cambio' },
    ],
    tools_used: ['Claude Code', 'Node.js', 'GitHub', 'Terminal'],
    tags: ['claude-code', 'agente', 'terminal', 'vibe-coding', 'avanzado'],
    is_featured: false,
    created_at: '2026-02-16T00:12:00Z',
  },

  // ═══ AUTOMATIZACION ═══
  {
    id: 'seed-weekly-reports',
    title: 'Automatizar Reportes Semanales con IA',
    description: 'Genera reportes ejecutivos automaticos cada semana: recopila datos, analiza tendencias, y entrega el reporte listo para enviar',
    difficulty: 'intermediate',
    category: 'Automatizacion',
    icon_emoji: '📈',
    time_to_setup_minutes: 25,
    time_saved_per_use_minutes: 90,
    mermaid_diagram: `graph LR
    A[📊 Datos semanales] --> B[ChatGPT analiza]
    B --> C[Tendencias]
    B --> D[KPIs]
    C --> E[Reporte ejecutivo]
    D --> E
    E --> F[📧 Enviar]`,
    steps: [
      { step: 1, title: 'Define la estructura de tu reporte', description: 'Antes de automatizar, necesitas saber que incluye tu reporte ideal', prompt: 'Soy {{TU_ROL}} en {{TU_EMPRESA}}. Necesito crear un template de reporte semanal para {{AUDIENCIA}}.\n\nMis KPIs principales son: {{KPIS}}\nDatos que tengo disponibles: {{DATOS}}\n\nDiseña un template de reporte semanal que incluya:\n1. Resumen ejecutivo (3 lineas)\n2. KPIs principales con comparacion vs semana anterior\n3. Highlights y logros\n4. Alertas o riesgos\n5. Plan de accion para proxima semana\n6. Formato visual (tablas, emojis para tendencias)' },
      { step: 2, title: 'Crea el prompt de generacion', description: 'Diseña el prompt que usaras cada semana para generar el reporte automaticamente', prompt: 'Crea un prompt reutilizable que yo pueda usar cada semana para generar mi reporte. El prompt debe:\n1. Tener campos que yo complete con datos frescos: {{VENTAS}}, {{USUARIOS}}, {{INCIDENTES}}, etc.\n2. Comparar automaticamente con la semana anterior\n3. Detectar tendencias (subida/bajada/estable)\n4. Generar insights accionables\n5. Producir el reporte en formato listo para enviar por email\n\nTemplate base:\n{{TEMPLATE_REPORTE}}' },
      { step: 3, title: 'Recopila datos', description: 'Cada viernes, recopila los datos de la semana. Si usas Google Sheets, puedes exportar como CSV. Si usas un dashboard, toma screenshots o exporta los numeros.', prompt: null },
      { step: 4, title: 'Genera y envia', description: 'Pega los datos en tu prompt, genera el reporte con ChatGPT/Claude, revisalo 2 minutos, y envialo. Total: 10 minutos vs 1+ hora haciendolo manual.', prompt: null },
    ],
    tools_used: ['ChatGPT', 'Claude', 'Google Sheets', 'Email'],
    tags: ['reportes', 'automatizacion', 'kpis', 'productividad'],
    is_featured: false,
    created_at: '2026-02-16T00:13:00Z',
  },
];
