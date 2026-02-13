-- =============================================
-- MODULE PRESENTATIONS: Standalone presentations per module
-- =============================================

CREATE TABLE public.module_presentations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_number INTEGER NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    slides JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.module_presentations ENABLE ROW LEVEL SECURITY;

-- Everyone can view published presentations
CREATE POLICY "Anyone can view published module presentations"
    ON public.module_presentations FOR SELECT
    USING (status = 'published');

-- Admins can manage all module presentations
CREATE POLICY "Admins can manage module presentations"
    ON public.module_presentations FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- SEED: 4 Module Presentations with real content
-- =============================================

-- Module 1: Higiene Digital
INSERT INTO public.module_presentations (module_number, title, description, slides) VALUES (
  1,
  'Higiene Digital',
  'Inbox Zero, gestores de contraseñas, perfiles de navegador y rutinas digitales productivas.',
  '[
    {
      "id": "m1-01",
      "type": "title",
      "title": "Higiene Digital",
      "subtitle": "Organiza tu vida digital antes de automatizarla",
      "tags": ["Inbox Zero", "Bitwarden", "Perfiles", "Granola"]
    },
    {
      "id": "m1-02",
      "type": "bullets",
      "title": "¿Por qué higiene digital?",
      "bullets": [
        "\"Afilar la sierra es invertir tiempo en mejorar las propias herramientas.\" — Steven Covey",
        "El 80% de los problemas de seguridad vienen de contraseñas vulneradas",
        "La habilidad más importante hoy es la capacidad de aprender nuevas herramientas",
        "Si tu base digital es un desorden, la IA no te va a salvar"
      ],
      "speakerNotes": "Filosofía central del taller: parar para mejorar procesos antes de seguir corriendo."
    },
    {
      "id": "m1-03",
      "type": "split",
      "title": "Inbox Zero",
      "content": "No es tener 0 emails — es tener 0 pendientes sin procesar. Archivar = sacar de pendientes, no borrar. Cada email que lees se convierte en acción, archivo o delegación.",
      "bullets": [
        "Gmail: filtros + etiquetas + posponer",
        "Outlook: reglas + carpetas + categorías",
        "Regla de los 2 minutos: si toma menos, hazlo ahora",
        "Nunca usar \"no leído\" como sistema de pendientes",
        "Clean My Mail para limpiar suscripciones masivas"
      ],
      "speakerNotes": "Demo en vivo: crear filtro en Gmail y regla en Outlook."
    },
    {
      "id": "m1-04",
      "type": "split",
      "title": "Gestión de Contraseñas",
      "content": "Un gestor de contraseñas es tu llavero digital. Genera, almacena y autocompleta contraseñas únicas para cada sitio. Es la inversión de seguridad más importante que puedes hacer.",
      "bullets": [
        "Apple Passwords: para ecosistema 100% Apple",
        "Bitwarden: multiplataforma, gratuito, open source",
        "1Password: alternativa premium (iPhone + Windows)",
        "Exportar de Chrome → CSV → importar en Bitwarden",
        "Nunca reutilizar contraseñas entre servicios"
      ],
      "speakerNotes": "Demo: exportar contraseñas de Chrome e importarlas en Bitwarden."
    },
    {
      "id": "m1-05",
      "type": "bullets",
      "title": "Perfiles de Navegador",
      "bullets": [
        "Separar vida personal de laboral con perfiles distintos",
        "Cada perfil tiene sus propios marcadores, extensiones y sesiones",
        "Chrome y Edge soportan múltiples perfiles nativamente",
        "Carpeta \"Inicio del Día\" en favoritos: abrir todos con scroll central",
        "Cambiar página de inicio de Edge (quitar contenido promocionado)",
        "Windows: 4 dedos en trackpad para múltiples escritorios"
      ],
      "speakerNotes": "Mostrar cómo crear perfil separado en Chrome y Edge."
    },
    {
      "id": "m1-06",
      "type": "content",
      "title": "Granola: Notas de Reunión Automáticas",
      "content": "Granola transcribe tus reuniones sin meter un bot visible en la llamada. Funciona en Mac, Windows y iPhone (no Android). 25 reuniones gratis al mes.\n\nA diferencia de Read.ai u Otter, Granola no aparece como participante — nadie sabe que estás grabando. Ideal para reuniones con clientes donde un bot sería incómodo.\n\nDespués de la reunión, editas la transcripción y extraes action items con IA.",
      "speakerNotes": "Mencionar que Granola se usa durante el taller para que los participantes tengan sus propias notas."
    },
    {
      "id": "m1-07",
      "type": "bullets",
      "title": "Tu Rutina Digital Productiva",
      "bullets": [
        "1. Abrir carpeta \"Inicio del Día\" (todos los tabs de un click)",
        "2. Inbox Zero: procesar email en máximo 15 minutos",
        "3. Revisar calendario y preparar reuniones",
        "4. Activar Granola antes de la primera reunión",
        "5. Usar perfiles separados para cada contexto de trabajo",
        "6. Al final del día: archivar todo, dejar inbox en cero"
      ],
      "speakerNotes": "Resumen práctico del módulo. Esto debería tomar 15-20 minutos al día."
    },
    {
      "id": "m1-08",
      "type": "title",
      "title": "Recuerda",
      "subtitle": "\"La diferencia entre quienes usan las herramientas y quienes no, es la acción.\"",
      "tags": ["Practica", "Constancia", "Acción"]
    }
  ]'::jsonb
);

-- Module 2: IA & Productividad
INSERT INTO public.module_presentations (module_number, title, description, slides) VALUES (
  2,
  'IA & Productividad',
  'ChatGPT, Claude, Gemini, Perplexity, Manus. Metaprompts, agentes, automatización y análisis de datos.',
  '[
    {
      "id": "m2-01",
      "type": "title",
      "title": "IA & Productividad",
      "subtitle": "Domina las herramientas que están transformando el trabajo profesional",
      "tags": ["ChatGPT", "Claude", "Gemini", "Perplexity", "Manus"]
    },
    {
      "id": "m2-02",
      "type": "bullets",
      "title": "El Ecosistema de IA en 2026",
      "bullets": [
        "ChatGPT: el más versátil — O3 para análisis, GPT-4 para tareas rápidas, Canvas para dashboards",
        "Claude: el mejor para finanzas, documentos largos y razonamiento profundo",
        "Gemini: ideal para documentos grandes y diseño visual exagerado",
        "Perplexity: búsqueda con fuentes verificables en tiempo real",
        "Manus: agente autónomo que navega la web por ti"
      ],
      "speakerNotes": "La interfaz es más importante que el modelo. Cada herramienta tiene su especialidad."
    },
    {
      "id": "m2-03",
      "type": "split",
      "title": "Cuenta Personal vs Empresarial",
      "content": "Tu cuenta personal de ChatGPT es crucial porque se convierte en un asistente que aprende de ti. Si esa capacidad está ligada a una cuenta empresarial, pierdes todo al cambiar de trabajo.",
      "bullets": [
        "Suscripción personal: ~US$20/mes (obligatoria)",
        "Memoria: ChatGPT recuerda tus preferencias",
        "Instrucciones personalizadas: quién eres, cómo respondes",
        "Proyectos: organizar chats por área de trabajo",
        "GPTs personalizados: bots para tareas repetitivas"
      ],
      "speakerNotes": "No pagar suscripción hasta después de la clase 2 para que sepan qué necesitan."
    },
    {
      "id": "m2-04",
      "type": "split",
      "title": "Metaprompting",
      "content": "No escribas el prompt tú — pide a la IA que lo escriba por ti. Un metaprompt es un prompt que genera el prompt perfecto para tu tarea.",
      "bullets": [
        "\"Necesito que hagas un prompt de alta calidad sobre [tema]...\"",
        "4 componentes: seniority, especialidad, objetivo, estilo",
        "Separar investigación de generación de informe",
        "Primero investigar a fondo → luego en chat nuevo generar estrategia",
        "\"El contexto es más importante que el prompt\""
      ],
      "speakerNotes": "Demo: crear metaprompt para investigación de mercado."
    },
    {
      "id": "m2-05",
      "type": "bullets",
      "title": "O3 vs GPT-4: Cuándo Usar Cada Uno",
      "bullets": [
        "GPT-4: respuestas rápidas, tareas sencillas, conversación fluida",
        "O3: análisis complejos, investigación profunda, razonamiento paso a paso",
        "\"O3 es el empleado caro que te cobra por palabra — no lo quemes con preguntas fáciles\"",
        "O3 es más agéntico: busca herramientas y recursos para lograr el objetivo",
        "Canvas: carga un CSV y pide un dashboard tipo Power BI",
        "Búsqueda en línea: activar para información reciente"
      ],
      "speakerNotes": "Demo: análisis de tabla CSV de ventas con O3 vs GPT-4."
    },
    {
      "id": "m2-06",
      "type": "split",
      "title": "Automatización: Zapier & App Script",
      "content": "Zapier conecta apps sin código: trigger → acción. App Script automatiza Google Workspace con código generado por ChatGPT. Juntos eliminan las tareas repetitivas de tu día.",
      "bullets": [
        "Zapier: nueva fila en Sheets → enviar email automático",
        "App Script: automatizar Gmail, Calendar, Drive, Sheets",
        "ChatGPT genera el código de App Script por ti",
        "Notebook LM: chatear con tus documentos y generar podcasts",
        "Claude Code: tareas recurrentes desde la terminal"
      ],
      "speakerNotes": "Demo: crear Zap automático y código App Script con ChatGPT."
    },
    {
      "id": "m2-07",
      "type": "content",
      "title": "Notebook LM: Tu Segundo Cerebro",
      "content": "Notebook LM de Google tiene dos bloques: síntesis (chatear con tu data) y entregables (visuales, auditivos, interactivos).\n\nSube PDFs, documentos, páginas web — y pregúntale cualquier cosa. Genera resúmenes, podcasts de audio, guías de estudio y FAQs automáticas.\n\nIdeal para preparar reuniones, estudiar documentos largos o crear contenido a partir de investigaciones previas.",
      "speakerNotes": "Demo: subir transcripción de clase y generar resumen + podcast."
    },
    {
      "id": "m2-08",
      "type": "title",
      "title": "Recuerda",
      "subtitle": "\"La IA generativa no crea — adivina la siguiente palabra más probable. Tu trabajo es darle el contexto correcto.\"",
      "tags": ["Contexto", "Metaprompts", "Práctica"]
    }
  ]'::jsonb
);

-- Module 3: Presentaciones con IA
INSERT INTO public.module_presentations (module_number, title, description, slides) VALUES (
  3,
  'Presentaciones con IA',
  'Gama, Beautiful.ai, Napkin, Canva. Crea presentaciones y diseño visual profesional con IA.',
  '[
    {
      "id": "m3-01",
      "type": "title",
      "title": "Presentaciones con IA",
      "subtitle": "Tú pones la estrategia, la IA pone el diseño",
      "tags": ["Gama", "Beautiful.ai", "Napkin", "Canva", "Colors"]
    },
    {
      "id": "m3-02",
      "type": "bullets",
      "title": "¿Por qué NO usar ChatGPT para presentaciones?",
      "bullets": [
        "\"ChatGPT no está hecho para presentaciones; el resultado gráfico es malo\"",
        "ChatGPT sirve para la estrategia y el relato — no para el diseño",
        "Herramientas especializadas producen resultados 10x mejores",
        "\"Ustedes agregan valor en la estrategia, lo que quieren comunicar — no en el diagramito\"",
        "Flujo correcto: ChatGPT para contenido → herramienta especializada para diseño"
      ],
      "speakerNotes": "Punto clave: separar generación de contenido de diseño visual."
    },
    {
      "id": "m3-03",
      "type": "split",
      "title": "Gama: Slides en Minutos",
      "content": "Gama convierte texto en presentaciones profesionales con paletas corporativas. Busca \"gama.app\" en Google (evitar enlaces patrocinados). Pega un informe de IA y Gama genera slides con diseño coherente.",
      "bullets": [
        "Texto → presentación profesional en minutos",
        "Paletas de colores corporativas automáticas",
        "Múltiples estilos y layouts",
        "Exportar a PDF o presentar online",
        "Ideal para propuestas comerciales y reportes"
      ],
      "speakerNotes": "Demo: crear presentación de factoring desde informe de ChatGPT."
    },
    {
      "id": "m3-04",
      "type": "split",
      "title": "Beautiful.ai: Diagramas Paramétricos",
      "content": "Beautiful.ai crea diagramas y presentaciones que se auto-ordenan. Los elementos son paramétricos: al agregar o quitar datos, el layout se ajusta solo. Ideal para presentaciones corporativas con muchos datos.",
      "bullets": [
        "Diagramas que se ajustan automáticamente",
        "Líneas de tiempo, organigramas, flujos",
        "Datos paramétricos: cambias un número y todo se recalcula",
        "Templates corporativos profesionales",
        "Exportar a PowerPoint compatible"
      ],
      "speakerNotes": "Demo: crear diagrama paramétrico que se auto-ordena."
    },
    {
      "id": "m3-05",
      "type": "split",
      "title": "Napkin & Canva: Infografías y Marca",
      "content": "Napkin convierte texto en infografías visuales. Canva gestiona tu kit de marca completo: colores, tipografías, logos SVG, upscaler de imágenes y editor de PDFs con captura de texto.",
      "bullets": [
        "Napkin: pega resumen ejecutivo → infografía lista",
        "Canva: kit de marca con colores y tipografías",
        "Image upscaler para fotos de baja resolución",
        "Quitar fondo de imágenes con un click",
        "Editar PDFs generados por IA: subir → Editar → Captura de texto"
      ],
      "speakerNotes": "Demo: kit de marca en Canva + infografía en Napkin."
    },
    {
      "id": "m3-06",
      "type": "bullets",
      "title": "Colors + Font Joy: Identidad Visual",
      "bullets": [
        "colors.co: genera paletas de colores armónicas con un click",
        "Font Joy: combina tipografías que funcionan juntas",
        "Usar ambos para definir identidad visual antes de diseñar",
        "Exportar paleta y tipografías para usar en Gama, Canva y Lovable",
        "\"El diseño profesional no es talento — es usar las herramientas correctas\""
      ],
      "speakerNotes": "Demo: generar paleta en Colors y combinación tipográfica en Font Joy."
    },
    {
      "id": "m3-07",
      "type": "content",
      "title": "Flujo Completo: De Idea a Presentación",
      "content": "1. ChatGPT/Claude: genera el contenido, la estrategia, el relato\n2. Colors + Font Joy: define la identidad visual (paleta + tipografías)\n3. Gama: convierte el contenido en slides profesionales\n4. Canva: ajusta detalles, agrega logos, exporta kit de marca\n5. Napkin: genera infografías complementarias\n6. Beautiful.ai: crea diagramas de datos complejos\n\nResultado: presentación profesional en menos de 1 hora, sin diseñador.",
      "speakerNotes": "Resumen del flujo completo. Enfatizar que el valor está en la estrategia."
    },
    {
      "id": "m3-08",
      "type": "title",
      "title": "Recuerda",
      "subtitle": "\"Ustedes agregan valor en la estrategia, lo que quieren comunicar — no en el diagramito, la burbujita.\"",
      "tags": ["Estrategia", "Diseño", "Automatización"]
    }
  ]'::jsonb
);

-- Module 4: Vibe Coding
INSERT INTO public.module_presentations (module_number, title, description, slides) VALUES (
  4,
  'Vibe Coding',
  'Lovable + Supabase + GitHub: crea software real sin escribir código. ERPs, portales, dashboards y landing pages.',
  '[
    {
      "id": "m4-01",
      "type": "title",
      "title": "Vibe Coding",
      "subtitle": "Escribir código por onda — de la idea al software funcional",
      "tags": ["Lovable", "Supabase", "GitHub", "Airtable", "Faces App"]
    },
    {
      "id": "m4-02",
      "type": "bullets",
      "title": "¿Qué es Vibe Coding?",
      "bullets": [
        "\"Si ustedes se suben al carro ahora es como haber agarrado ChatGPT en noviembre del 2022\"",
        "Crear software funcional describiendo lo que quieres en lenguaje natural",
        "No necesitas saber programar — necesitas saber qué quieres construir",
        "\"El SaaS está muerto: hoy se pueden crear bases de datos e interfaces sin programar\"",
        "Lo que antes costaba millones y meses, hoy se hace en una tarde"
      ],
      "speakerNotes": "Contexto: la revolución del no-code/low-code con IA."
    },
    {
      "id": "m4-03",
      "type": "split",
      "title": "La Triada: Lovable + Supabase + GitHub",
      "content": "Lovable es el front-end (lo que se ve), Supabase es el back-end (datos y lógica), y GitHub es el control de versiones (historial y respaldo). Juntos son todo lo que necesitas para crear software profesional.",
      "bullets": [
        "Lovable: prompt → interfaz visual completa",
        "Supabase: PostgreSQL, autenticación, storage, edge functions",
        "GitHub: versionar código, colaborar, deshacer cambios",
        "\"Construyan la interfaz primero, cuando se ve rica, conecten la base\"",
        "Sincronizar con GitHub con frecuencia para no perder trabajo"
      ],
      "speakerNotes": "Demo: crear proyecto en Lovable y conectar con Supabase."
    },
    {
      "id": "m4-04",
      "type": "bullets",
      "title": "Flujo de Trabajo Paso a Paso",
      "bullets": [
        "1. ChatGPT → genera el prompt optimizado para Lovable",
        "2. Lovable → crea el prototipo visual desde el prompt",
        "3. Si no gusta: cambiar prompt o empezar de nuevo (es rápido)",
        "4. Supabase → crear proyecto, cargar CSV, conectar tablas",
        "5. Conectar Lovable con Supabase: botones reales, datos reales",
        "6. GitHub → versionar y respaldar todo el código",
        "7. Módulos mínimos viables — no toda la interfaz de una vez"
      ],
      "speakerNotes": "Importante: evitar datos hardcodeados. Conectar siempre con datos reales."
    },
    {
      "id": "m4-05",
      "type": "split",
      "title": "Airtable: Bases de Datos para Humanos",
      "content": "Airtable es la puerta de entrada a las bases de datos relacionales. Parece una hoja de cálculo pero funciona como una base de datos real con relaciones, formularios y automatizaciones.",
      "bullets": [
        "Tablas → relaciones → formularios → automatizaciones",
        "Omni: IA dentro de Airtable para crear tablas con lenguaje natural",
        "Llaves primarias y única fuente de verdad",
        "Importación masiva de datos desde CSV",
        "\"Excel no está pensado para relaciones complejas; se termina pegando tablas con chicle\""
      ],
      "speakerNotes": "Demo: crear estructura de tablas con Omni en Airtable."
    },
    {
      "id": "m4-06",
      "type": "split",
      "title": "Faces App + Landing Pages",
      "content": "Faces App extrae tu marca desde una URL o PDF y genera landing pages profesionales automáticamente. Ideal para crear páginas de ventas, propuestas y micrositios sin diseñar desde cero.",
      "bullets": [
        "URL o PDF → extrae marca → genera landing page",
        "Personalizar con CSS y tipografías via prompts",
        "Ideal para propuestas comerciales y proyectos rápidos",
        "Complementar con Lovable para funcionalidad completa",
        "Zapier para automatizar captura de leads"
      ],
      "speakerNotes": "Demo: landing page para BTG Pactual con Faces App."
    },
    {
      "id": "m4-07",
      "type": "bullets",
      "title": "Herramientas Avanzadas",
      "bullets": [
        "Cursor: IDE con IA para proyectos de software locales",
        "Claude Code: tareas recurrentes y folletos digitales desde terminal",
        "Codex (OpenAI): mejoras automáticas vía pull requests",
        "Vercel / Bolt: alternativas a Lovable para deploy rápido",
        "\"Supabase es más seguro que Excel o Google Sheets\"",
        "\"La conectividad es infinita; 100% posible\""
      ],
      "speakerNotes": "Cursor para proyectos largos, Claude Code para tareas rápidas."
    },
    {
      "id": "m4-08",
      "type": "content",
      "title": "Casos Reales del Taller",
      "content": "- ERP para oficina de arquitectos con Lovable + Supabase\n- Dashboard de BI con datos de Wintery conectado a Shopify en tiempo real\n- Landing page para Cinta Azul con Faces App\n- Portal con login restringido por dominio de correo\n- Página de inventario con botones funcionales\n- Investigación de mercado para Faucon Bikes\n- App para comparar presupuestos de construcción\n\n\"No subestimar estas herramientas: sirven, funcionan y escalan.\"",
      "speakerNotes": "Mencionar que estos son proyectos reales de participantes del taller."
    },
    {
      "id": "m4-09",
      "type": "title",
      "title": "Recuerda",
      "subtitle": "\"Si ustedes se suben al carro ahora es como haber agarrado ChatGPT en noviembre del 2022.\"",
      "tags": ["Acción", "Oportunidad", "Vibe Coding"]
    }
  ]'::jsonb
);
