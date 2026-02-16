import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, ExternalLink, ChevronDown, ChevronRight, 
  Sparkles, Filter, Hash, Layers, X, Lightbulb, Zap, GraduationCap,
  Play, Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════
   DICTIONARY DATA — Concepts, tools, and methodology from 
   11 generations of the VDRC workshop
   ═══════════════════════════════════════════════════════════════ */

type Category =
  | 'metodologia'
  | 'herramienta'
  | 'concepto'
  | 'productividad'
  | 'desarrollo'
  | 'ia'
  | 'seguridad';

type Difficulty = 'basico' | 'intermedio' | 'avanzado';

interface DictEntry {
  term: string;
  definition: string;
  category: Category;
  related?: string[];
  url?: string;
  session?: string;
  difficulty?: Difficulty;
  tryIt?: string;
  proTip?: string;
}

const CATEGORIES: Record<Category, { label: string; color: string; border: string }> = {
  metodologia: { label: 'Metodologia', color: 'text-purple-400 bg-purple-500/10', border: 'border-purple-500/20' },
  herramienta: { label: 'Herramienta', color: 'text-primary bg-primary/10', border: 'border-primary/20' },
  concepto: { label: 'Concepto', color: 'text-accent bg-accent/10', border: 'border-accent/20' },
  productividad: { label: 'Productividad', color: 'text-yellow-400 bg-yellow-500/10', border: 'border-yellow-500/20' },
  desarrollo: { label: 'Desarrollo', color: 'text-blue-400 bg-blue-500/10', border: 'border-blue-500/20' },
  ia: { label: 'IA', color: 'text-rose-400 bg-rose-500/10', border: 'border-rose-500/20' },
  seguridad: { label: 'Seguridad', color: 'text-orange-400 bg-orange-500/10', border: 'border-orange-500/20' },
};

const DICTIONARY: DictEntry[] = [
  // ─── Metodologias ───
  {
    term: 'CROP',
    definition: 'Framework de prompting estructurado: Contexto, Rol, Objetivo y Pasos. Permite obtener respuestas mas precisas de cualquier modelo de IA al entregar la informacion minima necesaria de forma ordenada.',
    category: 'metodologia',
    related: ['Metaprompting', 'Context Engineering', 'Prompt'],
    session: 'S2 — IA & Productividad',
    difficulty: 'basico',
    tryIt: 'Abre ChatGPT y prueba: "Contexto: soy gerente de ventas. Rol: actua como analista de datos. Objetivo: analizar mis ventas del Q4. Pasos: 1) resume tendencias, 2) identifica productos estrella, 3) sugiere acciones."',
    proTip: 'El paso mas olvidado es el Contexto. Mientras mas contexto le des, menos alucinaciones tendra el modelo.',
  },
  {
    term: 'Context Engineering',
    definition: 'Disciplina de diseñar y entregar la informacion correcta, en el formato correcto, al modelo correcto, en el momento correcto. Es lo que separa a un usuario promedio de uno avanzado de IA.',
    category: 'metodologia',
    related: ['CROP', 'Chunking', 'Metaprompting'],
    session: 'S2 — IA & Productividad',
    difficulty: 'avanzado',
    tryIt: 'Toma una tarea que le pediste a ChatGPT y reescribela agregando: tu rol, el formato de salida esperado, ejemplos de lo que quieres, y restricciones. Compara las respuestas.',
    proTip: 'Piensa en la IA como un practicante brillante pero nuevo: necesita contexto completo para hacer bien su trabajo.',
  },
  {
    term: 'Metaprompting',
    definition: 'Tecnica avanzada donde le pides a la IA que diseñe el prompt optimo antes de ejecutarlo. "Diseña el mejor prompt para lograr X" en vez de pedirle X directamente.',
    category: 'metodologia',
    related: ['CROP', 'Context Engineering', 'Prompt'],
    session: 'S2 — IA & Productividad',
    difficulty: 'intermedio',
    tryIt: 'En vez de pedirle algo directo a Claude, dile: "Diseña el prompt mas efectivo para [tu tarea]. Luego ejecutalo." Veras que el resultado es mucho mejor.',
    proTip: 'Combinalo con CROP: pide que diseñe un prompt CROP optimizado para tu caso especifico.',
  },
  {
    term: 'Chunking',
    definition: 'Estrategia de dividir tareas grandes en partes manejables para procesarlas con IA. En lugar de un prompt enorme, se descompone en pasos secuenciales donde cada output alimenta el siguiente.',
    category: 'metodologia',
    related: ['Context Engineering', 'CROP'],
    session: 'S2 — IA & Productividad',
    difficulty: 'intermedio',
    tryIt: 'Toma un documento largo y dividelo en secciones. Pide a la IA que procese cada seccion por separado, y luego que integre los resultados.',
    proTip: 'Los modelos tienen limite de contexto. Chunking no solo mejora calidad sino que evita que la IA "olvide" partes.',
  },
  {
    term: 'Vibe Coding',
    definition: 'Filosofia de desarrollo donde describes lo que quieres en lenguaje natural y la IA genera el codigo. No requiere saber programar — solo saber comunicar bien lo que necesitas.',
    category: 'metodologia',
    related: ['Lovable', 'Cursor', 'Claude Code', 'Supabase'],
    session: 'S4 — Apps con IA',
    difficulty: 'intermedio',
    tryIt: 'Ve a lovable.dev y describe una app simple: "Crea una lista de tareas con prioridades, colores por estado, y boton para marcar como completada." Veras tu app en 60 segundos.',
    proTip: 'La clave es el PRD (Product Requirements Document). Mientras mejor describas lo que quieres, mejor sera la app.',
  },
  {
    term: 'Afilar la Sierra',
    definition: 'Concepto del Habito 7 de Stephen Covey adaptado al contexto digital: invertir tiempo en aprender herramientas y flujos que despues te ahorran cientos de horas. Es la filosofia central del taller VDRC.',
    category: 'metodologia',
    related: ['Inbox Zero', 'Delegar en Tecnologia'],
    session: 'Filosofia del taller',
    difficulty: 'basico',
    proTip: 'Dedica 20 minutos al dia a explorar una herramienta nueva. En un mes habras transformado tu productividad.',
  },
  {
    term: 'Delegar en Tecnologia',
    definition: 'Principio de automatizar tareas repetitivas usando IA y herramientas digitales. Si una tarea se repite mas de 3 veces, deberia estar automatizada o delegada a una herramienta.',
    category: 'metodologia',
    related: ['Afilar la Sierra', 'Make', 'Zapier'],
    session: 'Filosofia del taller',
    difficulty: 'basico',
    tryIt: 'Haz una lista de 5 tareas que repites semanalmente. Busca cual puedes automatizar con Make, Zapier o un simple GPT personalizado.',
    proTip: 'Preguntate: "¿Haria un humano esto mejor que una maquina?" Si la respuesta es no, delega.',
  },
  {
    term: 'Inbox Zero',
    definition: 'Metodologia de gestion de correo donde la bandeja de entrada se vacia diariamente. Se combina con filtros automaticos, etiquetas y herramientas como Clean Email para mantener el control.',
    category: 'productividad',
    related: ['Clean Email', 'Higiene Digital'],
    session: 'S1 — Higiene Digital',
    difficulty: 'basico',
    tryIt: 'Instala Clean Email (clean.email) y usa la funcion "Unsubscriber" para borrar todas las suscripciones que no lees. Luego crea 3 filtros para lo que queda.',
    proTip: 'No es tener 0 correos, es que cada correo tenga una accion clara: responder, archivar, o delegar.',
  },
  {
    term: 'Higiene Digital',
    definition: 'Conjunto de practicas base para tener un entorno digital ordenado: Inbox Zero, contraseñas seguras con Bitwarden, perfiles de navegador separados, resolucion de pantalla correcta, Markdown en documentos.',
    category: 'productividad',
    related: ['Inbox Zero', 'Bitwarden', 'Perfiles de Navegador'],
    session: 'S1 — Higiene Digital',
    difficulty: 'basico',
    tryIt: 'Checklist rapido: 1) ¿Usas gestor de contraseñas? 2) ¿Tienes perfiles separados en Chrome? 3) ¿Tu pantalla esta en resolucion nativa? Si falta alguno, empieza hoy.',
    proTip: 'Es el modulo 1 por una razon: sin orden digital, todas las herramientas de IA pierden efectividad.',
  },
  {
    term: 'PRD (Product Requirements Document)',
    definition: 'Documento que describe exactamente que debe hacer un producto o feature antes de construirlo. En vibe coding, es el documento que le das a la IA para que genere la aplicacion correcta.',
    category: 'metodologia',
    related: ['Vibe Coding', 'Lovable', 'Cursor'],
    session: 'S4 — Apps con IA',
    difficulty: 'intermedio',
    tryIt: 'Usa ChatGPT para generar un PRD: "Actua como product manager. Genera un PRD completo para [tu idea de app]. Incluye: objetivo, usuarios, features principales, restricciones tecnicas, y criterios de exito."',
    proTip: 'Un buen PRD de 2 paginas le ahorra a Lovable el 80% de las iteraciones. Es la inversion con mayor ROI del vibe coding.',
  },

  // ─── Conceptos ───
  {
    term: 'Era Agentica',
    definition: 'Fase actual de la IA donde los modelos no solo responden preguntas sino que ejecutan acciones autonomas: navegan la web, escriben codigo, interactuan con APIs y completan tareas multi-paso.',
    category: 'concepto',
    related: ['Claude Code', 'MCP', 'Agente'],
    session: 'S2 — IA & Productividad',
    difficulty: 'intermedio',
    proTip: 'No es ciencia ficcion — ya esta pasando. Los agentes de IA pueden hacer en minutos lo que antes tomaba dias de trabajo manual.',
  },
  {
    term: 'Agente',
    definition: 'Sistema de IA que puede ejecutar tareas autonomamente, tomando decisiones y usando herramientas sin intervencion humana constante. Claude Code, Cursor Agent y Manus son ejemplos.',
    category: 'concepto',
    related: ['Era Agentica', 'MCP', 'Claude Code'],
    session: 'S2 — IA & Productividad',
    difficulty: 'intermedio',
    tryIt: 'Prueba Manus (manus.im): dale una tarea compleja como "investiga los 5 mejores CRM para pymes en Chile" y observa como navega la web autonomamente.',
    proTip: 'La diferencia clave entre chatbot y agente: el chatbot responde, el agente ejecuta.',
  },
  {
    term: 'MCP (Model Context Protocol)',
    definition: 'Protocolo abierto de Anthropic que permite a los modelos de IA conectarse directamente con herramientas externas (bases de datos, APIs, archivos). Es como un "USB universal" para la IA.',
    category: 'concepto',
    related: ['API', 'Claude Code', 'Cursor'],
    session: 'S3 — Presentaciones con IA',
    difficulty: 'avanzado',
    proTip: 'MCP sera tan importante para la IA como HTTP fue para la web. Permite que cualquier herramienta "hable" con cualquier modelo.',
  },
  {
    term: 'API (Application Programming Interface)',
    definition: 'Interfaz que permite a dos sistemas comunicarse entre si. Cuando usas ChatGPT desde una app, esa app se comunica con OpenAI a traves de su API.',
    category: 'concepto',
    related: ['MCP', 'REST', 'Supabase'],
    session: 'S2 — IA & Productividad',
  },
  {
    term: 'Token',
    definition: 'Unidad basica de texto que procesa un modelo de IA. Aproximadamente 1 token = 0.75 palabras en español. El costo de los modelos se mide en tokens procesados (input + output).',
    category: 'concepto',
    related: ['LLM', 'Prompt', 'Context Window'],
    session: 'S2 — IA & Productividad',
    difficulty: 'intermedio',
    proTip: 'Regla rapida: 1 pagina de texto ≈ 500 tokens. Un libro completo ≈ 100K tokens. Saber esto te ayuda a estimar costos y limites.',
  },
  {
    term: 'Context Window',
    definition: 'Cantidad maxima de tokens que un modelo puede procesar en una sola conversacion. Claude tiene 200K tokens, GPT-4o tiene 128K. Mas contexto = mejor comprension.',
    category: 'concepto',
    related: ['Token', 'Chunking', 'Context Engineering'],
    session: 'S2 — IA & Productividad',
    difficulty: 'intermedio',
    proTip: 'Si tu tarea requiere mucho contexto (documentos largos), usa Claude (200K tokens). Si es una pregunta rapida, cualquier modelo sirve.',
  },
  {
    term: 'LLM (Large Language Model)',
    definition: 'Modelo de lenguaje grande entrenado con billones de parametros. GPT-4, Claude, Gemini y Llama son LLMs. Son la base de toda la IA generativa actual.',
    category: 'concepto',
    related: ['Token', 'Context Window', 'Prompt'],
  },
  {
    term: 'Prompt',
    definition: 'Instruccion o texto que le das a un modelo de IA. La calidad del prompt determina directamente la calidad de la respuesta. El taller enseña CROP como framework para prompts efectivos.',
    category: 'concepto',
    related: ['CROP', 'Metaprompting', 'Context Engineering'],
    difficulty: 'basico',
    tryIt: 'Toma algo que le pediste a ChatGPT recientemente. Reescribelo con CROP (Contexto, Rol, Objetivo, Pasos). Compara las dos respuestas.',
    proTip: '"Garbage in, garbage out" aplica mas que nunca. Un prompt de 3 lineas bien estructurado supera a un parrafo de 20 lineas confuso.',
  },
  {
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: 'Tecnica donde la IA busca informacion relevante en una base de datos antes de responder. Notebook LM usa RAG para responder basandose en tus documentos.',
    category: 'concepto',
    related: ['Notebook LM', 'Vector Database', 'Embedding'],
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Embedding',
    definition: 'Representacion numerica del significado de un texto. Permite buscar por similitud semantica — encontrar textos similares aunque usen palabras diferentes.',
    category: 'concepto',
    related: ['RAG', 'Vector Database'],
  },
  {
    term: 'Fine-tuning',
    definition: 'Proceso de re-entrenar un modelo de IA con datos especificos para que se especialice en una tarea. Mas costoso y complejo que solo usar prompts, pero mas preciso para casos de uso repetitivos.',
    category: 'concepto',
    related: ['LLM', 'Token'],
  },
  {
    term: 'Hallucination',
    definition: 'Cuando un modelo de IA genera informacion falsa con total confianza. Es critico verificar datos, cifras y citas generadas por IA. CROP y Context Engineering reducen las alucinaciones.',
    category: 'concepto',
    related: ['LLM', 'CROP', 'Context Engineering'],
    difficulty: 'basico',
    tryIt: 'Pidele a ChatGPT que cite 5 papers academicos sobre un tema. Luego verifica si existen en Google Scholar. Probablemente varios seran inventados.',
    proTip: 'Regla de oro del taller: "Trata a la IA como un practicante brillante — siempre verifica su trabajo." Nunca confies ciegamente en cifras o citas.',
  },
  {
    term: 'Perfiles de Navegador',
    definition: 'Practica de crear perfiles separados en Chrome (personal, trabajo, proyecto) para mantener sesiones, favoritos y extensiones organizados. Base de la higiene digital.',
    category: 'productividad',
    related: ['Higiene Digital', 'Bitwarden'],
    session: 'S1 — Higiene Digital',
  },
  {
    term: '5 Capas de Personalizacion de ChatGPT',
    definition: 'Niveles para personalizar ChatGPT: 1) Custom Instructions, 2) Memory, 3) GPTs personalizados, 4) API con system prompt, 5) Fine-tuning. Cada capa agrega mas control.',
    category: 'concepto',
    related: ['ChatGPT', 'Prompt', 'Context Engineering'],
    session: 'S2 — IA & Productividad',
  },
  {
    term: 'Full Stack',
    definition: 'Desarrollo que cubre frontend (lo que ve el usuario) y backend (servidor, base de datos, logica). Con vibe coding, una persona puede construir apps full stack sin saber programar.',
    category: 'desarrollo',
    related: ['Vibe Coding', 'Lovable', 'Supabase'],
    session: 'S4 — Apps con IA',
  },
  {
    term: 'Deploy',
    definition: 'Proceso de publicar una aplicacion en internet para que sea accesible. Vercel permite deploy en un clic desde GitHub. Lovable despliega automaticamente.',
    category: 'desarrollo',
    related: ['Vercel', 'GitHub', 'Lovable'],
    session: 'S4 — Apps con IA',
  },
  {
    term: 'CRUD',
    definition: 'Las 4 operaciones basicas de cualquier aplicacion: Create (crear), Read (leer), Update (actualizar), Delete (eliminar). Toda app con datos necesita CRUD.',
    category: 'desarrollo',
    related: ['Supabase', 'Full Stack', 'SQL'],
    session: 'S4 — Apps con IA',
  },
  {
    term: 'Git / GitHub',
    definition: 'Sistema de control de versiones (Git) y plataforma para alojar codigo (GitHub). Permite versionar, colaborar y revertir cambios. Esencial para vibe coding.',
    category: 'desarrollo',
    related: ['Deploy', 'Vercel', 'Cursor'],
    url: 'https://github.com',
    session: 'S4 — Apps con IA',
  },
  {
    term: 'SQL',
    definition: 'Lenguaje para consultar y manipular bases de datos. Supabase usa PostgreSQL. Claude puede escribir queries SQL complejas si le das el esquema de tu base de datos.',
    category: 'desarrollo',
    related: ['Supabase', 'CRUD', 'Full Stack'],
  },
  {
    term: 'Markdown',
    definition: 'Formato de texto simple para crear documentos con estructura (titulos, listas, links, codigo). Usado en GitHub, Notion, y como formato ideal para comunicarse con IA.',
    category: 'productividad',
    related: ['GitHub', 'Notion', 'Context Engineering'],
    session: 'S1 — Higiene Digital',
  },

  // ─── Herramientas ───
  {
    term: 'ChatGPT',
    definition: 'Modelo de IA conversacional de OpenAI. GPT-4o es multimodal (texto, imagen, audio). Ideal para tareas generales, brainstorming, y analisis. Tiene Custom GPTs y memoria persistente.',
    category: 'herramienta',
    related: ['Claude', 'Gemini', 'CROP'],
    url: 'https://chat.openai.com',
    difficulty: 'basico',
    tryIt: 'Configura tus Custom Instructions: ve a Settings > Personalization y dile quien eres, que haces, y como quieres las respuestas. Transforma cada conversacion futura.',
    proTip: 'Las 5 capas de personalizacion: Custom Instructions → Memory → GPTs → API → Fine-tuning. La mayoria solo usa la primera.',
  },
  {
    term: 'Claude',
    definition: 'Modelo de IA de Anthropic. Destaca en razonamiento largo, codigo, y seguir instrucciones complejas. Claude 3.5 Sonnet es el modelo estrella. Tiene Projects y Artifacts.',
    category: 'herramienta',
    related: ['Claude Code', 'ChatGPT', 'Anthropic'],
    url: 'https://claude.ai',
    difficulty: 'basico',
    tryIt: 'Crea un Project en Claude: sube documentos relevantes de tu trabajo y dale instrucciones de como responder. Es como tener un asistente que conoce tu contexto.',
    proTip: 'Claude es mejor que ChatGPT para textos largos, codigo y seguir instrucciones complejas. ChatGPT es mejor para busqueda y tareas generales.',
  },
  {
    term: 'Claude Code',
    definition: 'Agente de programacion de Anthropic que opera desde la terminal. Puede leer, escribir y ejecutar codigo autonomamente. Es como tener un programador senior en tu computador.',
    category: 'herramienta',
    related: ['Claude', 'Cursor', 'Vibe Coding', 'Playwright'],
    url: 'https://docs.anthropic.com/en/docs/claude-code',
    session: 'S3 — Presentaciones con IA',
    difficulty: 'avanzado',
    tryIt: 'Instala Claude Code (npm install -g @anthropic-ai/claude-code), abre una carpeta de proyecto, y dile: "Analiza este proyecto y sugiere mejoras." Veras como navega archivos solo.',
    proTip: 'Es el agente mas autonomo del mercado. Puede ejecutar comandos, navegar la web con Playwright, y hacer cambios en multiples archivos en secuencia.',
  },
  {
    term: 'Gemini',
    definition: 'Modelo de IA de Google. Gemini 2.0 Flash es rapido y gratuito. Integrado con Google Workspace. Ideal para analizar documentos largos y generar contenido visual.',
    category: 'herramienta',
    related: ['ChatGPT', 'Claude', 'Notebook LM'],
    url: 'https://gemini.google.com',
  },
  {
    term: 'Cursor',
    definition: 'IDE (editor de codigo) con IA integrada. Fork de VS Code con autocompletado, chat, y agente que puede editar archivos completos. La herramienta principal de vibe coding avanzado.',
    category: 'herramienta',
    related: ['Claude Code', 'Vibe Coding', 'GitHub'],
    url: 'https://cursor.com',
    session: 'S3 — Presentaciones con IA',
    difficulty: 'intermedio',
    tryIt: 'Descarga Cursor, abre un proyecto, y presiona Cmd+K para editar codigo con IA. Describe los cambios en español y mira como los aplica automaticamente.',
    proTip: 'Usa Agent mode (Cmd+I) para tareas grandes. Puede crear archivos, instalar dependencias, y ejecutar el proyecto — todo desde una instruccion.',
  },
  {
    term: 'Lovable',
    definition: 'Plataforma de vibe coding que genera aplicaciones web completas desde una descripcion en lenguaje natural. Integra Supabase, autenticacion y deploy automatico.',
    category: 'herramienta',
    related: ['Vibe Coding', 'Supabase', 'Full Stack'],
    url: 'https://lovable.dev',
    session: 'S4 — Apps con IA',
    difficulty: 'basico',
    tryIt: 'Ve a lovable.dev, crea cuenta gratis, y describe: "Dashboard de finanzas personales con graficos, categorias de gastos, y filtro por mes." Tu app estara lista en 2 minutos.',
    proTip: 'Antes de escribir en Lovable, genera un PRD en ChatGPT. Pega el PRD completo como primer mensaje y tendras un resultado 10x mejor.',
  },
  {
    term: 'Supabase',
    definition: 'Alternativa open-source a Firebase. Provee base de datos PostgreSQL, autenticacion, storage y APIs instantaneas. El backend favorito del taller para vibe coding.',
    category: 'herramienta',
    related: ['Lovable', 'Full Stack', 'SQL', 'CRUD'],
    url: 'https://supabase.com',
    session: 'S4 — Apps con IA',
    difficulty: 'intermedio',
    tryIt: 'Crea un proyecto gratis en supabase.com. Ve a Table Editor y crea una tabla "ideas" con columnas: titulo (text), descripcion (text), prioridad (int). Ya tienes una API REST funcional.',
    proTip: 'Lovable se conecta directamente con Supabase. Cuando generes apps con datos persistentes, siempre conecta Supabase primero.',
  },
  {
    term: 'Vercel',
    definition: 'Plataforma de deploy para aplicaciones web. Conecta con GitHub y despliega automaticamente cada push. Hosting gratuito para proyectos personales.',
    category: 'herramienta',
    related: ['GitHub', 'Deploy', 'Lovable'],
    url: 'https://vercel.com',
    session: 'S4 — Apps con IA',
  },
  {
    term: 'Gamma',
    definition: 'Herramienta de IA para crear presentaciones, documentos y paginas web. Genera slides completos desde un tema o guion. Alternativa inteligente a PowerPoint.',
    category: 'herramienta',
    related: ['Beautiful.ai', 'Napkin', 'Canva'],
    url: 'https://gamma.app',
    session: 'S3 — Presentaciones con IA',
    difficulty: 'basico',
    tryIt: 'Ve a gamma.app, escribe un tema que domines, y selecciona "Generate". En 30 segundos tendras una presentacion profesional lista para editar.',
    proTip: 'Genera primero un guion detallado en ChatGPT con CROP, luego pega ese guion en Gamma. La calidad sube drasticamente.',
  },
  {
    term: 'Beautiful.ai',
    definition: 'Plataforma de presentaciones con diseño automatico. Ajusta layout, tipografia y colores inteligentemente. Ideal para presentaciones corporativas rapidas.',
    category: 'herramienta',
    related: ['Gamma', 'Canva', 'Napkin'],
    url: 'https://beautiful.ai',
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Napkin',
    definition: 'Herramienta que convierte texto en infografias y diagramas visuales automaticamente. Pega un parrafo y genera una visual lista para presentaciones.',
    category: 'herramienta',
    related: ['Gamma', 'Beautiful.ai'],
    url: 'https://napkin.ai',
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Notebook LM',
    definition: 'Herramienta de Google que permite cargar documentos (PDFs, articulos, libros) y conversar con ellos. Genera podcasts automaticos, resumenes y conexiones entre fuentes.',
    category: 'herramienta',
    related: ['RAG', 'Gemini', 'Google'],
    url: 'https://notebooklm.google.com',
    session: 'S3 — Presentaciones con IA',
    difficulty: 'basico',
    tryIt: 'Sube un PDF de un informe que necesites analizar a notebooklm.google.com. Preguntale: "Resume los 3 hallazgos principales." Luego pide que genere un podcast.',
    proTip: 'La funcion de generar podcasts es increible para "estudiar" documentos largos mientras haces otra cosa.',
  },
  {
    term: 'Perplexity',
    definition: 'Motor de busqueda con IA que entrega respuestas citadas con fuentes. Reemplaza a Google para investigacion seria. Perplexity Pro permite busquedas profundas.',
    category: 'herramienta',
    related: ['ChatGPT', 'Google'],
    url: 'https://perplexity.ai',
    difficulty: 'basico',
    tryIt: 'La proxima vez que vayas a buscar algo en Google, hazlo en perplexity.ai. Compara: respuesta directa con fuentes vs. 10 links para leer.',
    proTip: 'Usa Perplexity para investigar, ChatGPT para crear, y Claude para analizar. Cada herramienta tiene su superpoder.',
  },
  {
    term: 'Manus',
    definition: 'Agente de IA autonomo que puede navegar la web, interactuar con paginas, y completar tareas complejas como investigar mercados, comparar productos o llenar formularios.',
    category: 'herramienta',
    related: ['Agente', 'Era Agentica', 'Playwright'],
    url: 'https://manus.im',
    session: 'S2 — IA & Productividad',
  },
  {
    term: 'Make (ex Integromat)',
    definition: 'Plataforma de automatizacion visual que conecta aplicaciones entre si. Crea flujos donde un trigger en una app ejecuta acciones en otras. Similar a Zapier pero mas potente.',
    category: 'herramienta',
    related: ['Zapier', 'Automatizacion', 'Delegar en Tecnologia'],
    url: 'https://make.com',
    session: 'S3 — Presentaciones con IA',
    difficulty: 'intermedio',
    tryIt: 'Crea una automatizacion simple: "Cuando reciba un email con factura → extraer datos con IA → guardar en Google Sheets." Usa el plan gratuito de Make.',
    proTip: 'Empieza con 2 apps conectadas. Luego agrega pasos. Las mejores automatizaciones son simples pero se ejecutan miles de veces.',
  },
  {
    term: 'Playwright',
    definition: 'Framework de automatizacion de navegadores de Microsoft. Claude Code lo usa para navegar webs, hacer scraping y testing automatizado. Es el "brazo" del agente en el browser.',
    category: 'herramienta',
    related: ['Claude Code', 'Agente', 'Testing'],
    url: 'https://playwright.dev',
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Bitwarden',
    definition: 'Gestor de contraseñas open-source y gratuito. Genera contraseñas unicas de 20+ caracteres para cada servicio. Base de la seguridad digital personal.',
    category: 'seguridad',
    related: ['Higiene Digital', 'Perfiles de Navegador'],
    url: 'https://bitwarden.com',
    session: 'S1 — Higiene Digital',
    difficulty: 'basico',
    tryIt: 'Instala Bitwarden (gratis), importa tus contraseñas de Chrome, y cambia las 5 mas importantes por contraseñas generadas de 20+ caracteres. Toma 15 minutos.',
    proTip: 'Si solo haces UNA cosa del taller, que sea esta. Contraseñas unicas + Bitwarden = 90% de tu seguridad digital resuelta.',
  },
  {
    term: 'Clean Email',
    definition: 'Herramienta para limpiar y organizar la bandeja de entrada masivamente. Permite borrar miles de correos por remitente, desuscribirse y crear reglas automaticas.',
    category: 'herramienta',
    related: ['Inbox Zero', 'Higiene Digital'],
    url: 'https://clean.email',
    session: 'S1 — Higiene Digital',
  },
  {
    term: 'Notion',
    definition: 'Espacio de trabajo todo-en-uno: notas, bases de datos, wikis, proyectos. Notion AI permite generar, resumir y transformar contenido dentro de la plataforma.',
    category: 'herramienta',
    related: ['Airtable', 'Markdown', 'Productividad'],
    url: 'https://notion.so',
  },
  {
    term: 'Figma',
    definition: 'Herramienta de diseño UI/UX colaborativa en el navegador. Figma AI puede generar diseños. Se usa para prototipar antes de pasar a vibe coding.',
    category: 'herramienta',
    related: ['Lovable', 'Vibe Coding', 'UI/UX'],
    url: 'https://figma.com',
  },
  {
    term: 'Canva',
    definition: 'Plataforma de diseño grafico accesible. Canva AI genera imagenes, presenta contenido y adapta diseños. Ideal para redes sociales y documentos rapidos.',
    category: 'herramienta',
    related: ['Gamma', 'Napkin', 'Beautiful.ai'],
    url: 'https://canva.com',
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Krea.ai',
    definition: 'Plataforma de generacion de video e imagenes con IA. Permite crear contenido visual profesional desde texto o bocetos. Multiples motores de generacion.',
    category: 'herramienta',
    related: ['Opus Clip', 'Crea AI'],
    url: 'https://krea.ai',
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Opus Clip',
    definition: 'Herramienta que toma un video largo y genera clips cortos optimizados para redes sociales. Detecta los mejores momentos automaticamente.',
    category: 'herramienta',
    related: ['Krea.ai', 'Descript'],
    url: 'https://opus.pro',
  },
  {
    term: 'Coolors',
    definition: 'Generador de paletas de colores. Presiona la barra espaciadora para generar combinaciones infinitas. Esencial para diseño visual con IA.',
    category: 'herramienta',
    related: ['Fontjoy', 'Realtime Colors', 'Diseño'],
    url: 'https://coolors.co',
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Fontjoy',
    definition: 'Herramienta que genera combinaciones de tipografias armonicas usando machine learning. Ideal para elegir fuentes para presentaciones y sitios web.',
    category: 'herramienta',
    related: ['Coolors', 'Realtime Colors'],
    url: 'https://fontjoy.com',
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Realtime Colors',
    definition: 'Visualizador de paletas de colores en contexto real. Muestra como se ven tus colores en un sitio web real mientras los ajustas.',
    category: 'herramienta',
    related: ['Coolors', 'Fontjoy'],
    url: 'https://realtimecolors.com',
    session: 'S3 — Presentaciones con IA',
  },
  {
    term: 'Granola',
    definition: 'Herramienta de toma de notas con IA para reuniones. Graba, transcribe y genera resumenes estructurados automaticamente. Alternativa a Otter.ai.',
    category: 'herramienta',
    related: ['Notebook LM', 'Productividad'],
  },
  {
    term: 'Excel Labs / Claude en Excel',
    definition: 'Extension de Microsoft que permite usar modelos de IA directamente en celdas de Excel. Funcion LABS.TRANSLATE, LABS.GENERATE para modelos financieros y analisis de datos.',
    category: 'herramienta',
    related: ['Claude', 'ChatGPT', 'Productividad'],
    session: 'S2 — IA & Productividad',
  },
  {
    term: 'Bolt',
    definition: 'Plataforma de vibe coding similar a Lovable. Genera aplicaciones web desde descripciones en lenguaje natural con preview en tiempo real.',
    category: 'herramienta',
    related: ['Lovable', 'Vibe Coding'],
    url: 'https://bolt.new',
    session: 'S4 — Apps con IA',
  },
  {
    term: 'Miro',
    definition: 'Pizarra digital colaborativa infinita. Ideal para mapas mentales, diagramas de flujo, retrospectivas y brainstorming visual en equipo.',
    category: 'herramienta',
    related: ['Figma', 'Notion'],
    url: 'https://miro.com',
  },
  {
    term: 'Airtable',
    definition: 'Base de datos visual que combina la simplicidad de una hoja de calculo con el poder de una base de datos relacional. Se conecta facilmente con Make y Zapier.',
    category: 'herramienta',
    related: ['Notion', 'Make', 'Supabase'],
    url: 'https://airtable.com',
  },
  {
    term: 'Power Apps',
    definition: 'Plataforma low-code de Microsoft para crear aplicaciones empresariales sin programar. Integrada con el ecosistema Microsoft 365.',
    category: 'herramienta',
    related: ['Lovable', 'Vibe Coding'],
  },
  {
    term: 'Descript',
    definition: 'Editor de video y audio donde editas el contenido como si fuera un documento de texto. Elimina muletillas, genera subtitulos y clona voz.',
    category: 'herramienta',
    related: ['Opus Clip', 'Krea.ai'],
    url: 'https://descript.com',
  },
  {
    term: 'Mistral',
    definition: 'Empresa francesa de IA que desarrolla modelos open-source competitivos. Mistral Large compite con GPT-4 y Claude. Le Chat es su interfaz web gratuita.',
    category: 'herramienta',
    related: ['ChatGPT', 'Claude', 'LLM'],
    url: 'https://mistral.ai',
  },
  {
    term: 'Starlink',
    definition: 'Internet satelital de SpaceX. Mencionado en el taller como ejemplo de tecnologia que elimina barreras geograficas para acceder a herramientas de IA desde cualquier lugar.',
    category: 'concepto',
    related: ['Conectividad'],
  },
  {
    term: 'Zapier',
    definition: 'Plataforma de automatizacion que conecta +5000 apps entre si. Mas simple que Make pero menos flexible. Ideal para automatizaciones basicas.',
    category: 'herramienta',
    related: ['Make', 'Automatizacion'],
    url: 'https://zapier.com',
  },
  {
    term: 'Canvas (ChatGPT)',
    definition: 'Interfaz de edicion colaborativa dentro de ChatGPT. Permite iterar sobre documentos y codigo en un panel lateral, como un editor compartido con la IA.',
    category: 'herramienta',
    related: ['ChatGPT', 'Artifacts'],
    session: 'S2 — IA & Productividad',
  },
  {
    term: 'Artifacts (Claude)',
    definition: 'Panel de visualizacion en Claude que muestra codigo ejecutable, documentos, y aplicaciones interactivas generadas por la IA. Permite iterar visualmente.',
    category: 'herramienta',
    related: ['Claude', 'Canvas'],
    session: 'S2 — IA & Productividad',
  },
  {
    term: 'SaaS (Software as a Service)',
    definition: 'Modelo de negocio donde el software se entrega como servicio web por suscripcion. El taller debate si "SaaS is dead" porque la IA permite crear herramientas personalizadas.',
    category: 'concepto',
    related: ['Vibe Coding', 'Full Stack'],
    session: 'S4 — Apps con IA',
  },
  {
    term: 'Glass Morphism',
    definition: 'Tendencia de diseño UI que simula paneles de vidrio translucido con desenfoque de fondo. Popularizado por iOS. El portal VDRC usa este estilo.',
    category: 'concepto',
    related: ['UI/UX', 'Figma', 'Diseño'],
  },
  {
    term: 'Resend',
    definition: 'API moderna para enviar correos electronicos transaccionales. Simple, confiable y con buena developer experience. Alternativa a SendGrid.',
    category: 'herramienta',
    related: ['API', 'Full Stack'],
    url: 'https://resend.com',
  },
  {
    term: 'Plotly',
    definition: 'Libreria de visualizacion de datos interactiva. Genera graficos profesionales desde Python, R o JavaScript. Ideal para dashboards y reportes.',
    category: 'herramienta',
    related: ['Python', 'Datos'],
    url: 'https://plotly.com',
  },
  {
    term: 'Nivo',
    definition: 'Libreria de graficos para React basada en D3. Graficos interactivos con animaciones suaves. Usada en el portal VDRC para visualizaciones.',
    category: 'herramienta',
    related: ['React', 'Plotly'],
    url: 'https://nivo.rocks',
  },
];

/* ═══════════════════════════════════════════════════════════════ */

export default function Dictionary() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | 'all'>('all');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [showOnlyExercises, setShowOnlyExercises] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return DICTIONARY
      .filter(entry => {
        if (activeCategory !== 'all' && entry.category !== activeCategory) return false;
        if (activeDifficulty !== 'all' && entry.difficulty !== activeDifficulty) return false;
        if (showOnlyExercises && !entry.tryIt) return false;
        if (!q) return true;
        return (
          entry.term.toLowerCase().includes(q) ||
          entry.definition.toLowerCase().includes(q) ||
          entry.related?.some(r => r.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeCategory, activeDifficulty, showOnlyExercises]);

  const letters = useMemo(() => {
    const map = new Map<string, DictEntry[]>();
    filtered.forEach(e => {
      const letter = e.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(e);
    });
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const toggleTerm = (term: string) => {
    setExpandedTerm(prev => (prev === term ? null : term));
  };

  const jumpToRelated = (term: string) => {
    setSearch(term);
    setActiveCategory('all');
    setExpandedTerm(null);
  };

  return (
    <Layout>
      <div className="page-container section-py max-w-4xl mx-auto">
        <PageHeader
          title={<>Diccionario <span className="text-gradient">Digital</span></>}
          description={`${DICTIONARY.length} terminos, herramientas y conceptos del taller. Tu glosario personal de productividad digital con IA.`}
          badge={{
            label: `${DICTIONARY.length} terminos`,
            icon: <BookOpen className="w-3 h-3" />,
          }}
          breadcrumbs={[{ label: 'Diccionario' }]}
          showBack
        />

        {/* ─── Concept of the Day ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          {(() => {
            const tipsEntries = DICTIONARY.filter(e => e.proTip || e.tryIt);
            const todayIndex = new Date().getDate() % tipsEntries.length;
            const tip = tipsEntries[todayIndex];
            const tipCat = CATEGORIES[tip.category];
            return (
              <div
                onClick={() => { setSearch(tip.term); setExpandedTerm(tip.term); }}
                className="glass glass-specular p-5 rounded-2xl cursor-pointer hover:border-primary/15 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-yellow-400/70 uppercase tracking-wider">Concepto del dia</span>
                      <Badge variant="outline" className={cn('text-[9px] py-0 px-1.5', tipCat.color, tipCat.border)}>
                        {tipCat.label}
                      </Badge>
                    </div>
                    <h3 className="font-mono font-semibold text-base group-hover:text-primary transition-colors">{tip.term}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{tip.definition}</p>
                    {tip.proTip && (
                      <p className="text-xs text-yellow-400/60 mt-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        {tip.proTip.slice(0, 100)}...
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-3" />
                </div>
              </div>
            );
          })()}
        </motion.div>

        {/* ─── Learning Stats ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8"
        >
          {[
            { value: DICTIONARY.filter(e => e.difficulty === 'basico').length, label: 'Basico', icon: GraduationCap, color: 'text-green-400', bg: 'bg-green-500/5', border: 'border-green-500/10' },
            { value: DICTIONARY.filter(e => e.difficulty === 'intermedio').length, label: 'Intermedio', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/5', border: 'border-yellow-500/10' },
            { value: DICTIONARY.filter(e => e.difficulty === 'avanzado').length, label: 'Avanzado', icon: Target, color: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/10' },
            { value: DICTIONARY.filter(e => e.tryIt).length, label: 'Con ejercicio', icon: Play, color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/10' },
          ].map(s => (
            <div key={s.label} className={cn('flex items-center gap-2.5 p-3 rounded-xl border', s.bg, s.border)}>
              <s.icon className={cn('w-4 h-4', s.color)} />
              <div>
                <span className={cn('text-lg font-mono font-bold', s.color)}>{s.value}</span>
                <span className="text-[10px] text-muted-foreground block">{s.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ─── Search + Filters ─── */}
        <div className="space-y-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar termino, herramienta o concepto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-16 h-12 text-base rounded-2xl"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Limpiar busqueda"
                title="Limpiar busqueda"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono px-2 py-1 rounded-lg bg-muted/50 border border-border/30 hover:border-primary/30"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all',
                activeCategory === 'all'
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'glass-pill text-muted-foreground hover:text-foreground hover:border-primary/15'
              )}
            >
              <Layers className="w-3 h-3" />
              Todos ({DICTIONARY.length})
            </button>
            {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(([key, cat]) => {
              const count = DICTIONARY.filter(e => e.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(activeCategory === key ? 'all' : key)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all',
                    activeCategory === key
                      ? `${cat.color} border ${cat.border}`
                      : 'glass-pill text-muted-foreground hover:text-foreground hover:border-primary/15'
                  )}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </motion.div>

          {/* Difficulty + Exercise filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider self-center mr-1">Nivel:</span>
            {([
              { key: 'all' as const, label: 'Todos', color: 'text-foreground bg-foreground/5 border-foreground/10' },
              { key: 'basico' as const, label: 'Basico', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
              { key: 'intermedio' as const, label: 'Intermedio', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
              { key: 'avanzado' as const, label: 'Avanzado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
            ]).map(d => (
              <button
                key={d.key}
                onClick={() => setActiveDifficulty(activeDifficulty === d.key ? 'all' : d.key)}
                className={cn(
                  'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border',
                  activeDifficulty === d.key ? d.color : 'text-muted-foreground bg-transparent border-transparent hover:border-border/30'
                )}
              >
                <Target className="w-2.5 h-2.5" />
                {d.label}
              </button>
            ))}
            <div className="w-px h-4 bg-border/30 self-center mx-1" />
            <button
              onClick={() => setShowOnlyExercises(!showOnlyExercises)}
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border',
                showOnlyExercises
                  ? 'text-primary bg-primary/10 border-primary/20'
                  : 'text-muted-foreground bg-transparent border-transparent hover:border-border/30'
              )}
            >
              <Play className="w-2.5 h-2.5" />
              Solo con ejercicio
            </button>
          </motion.div>
        </div>

        {/* ─── Results counter ─── */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground font-mono">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            {search && ` para "${search}"`}
          </span>
          {/* Quick letter nav */}
          <div className="hidden sm:flex items-center gap-0.5 flex-wrap">
            {letters.map(([letter]) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-6 h-6 rounded-md text-[10px] font-mono flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>

        {/* ─── Dictionary entries ─── */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass glass-specular p-12 rounded-2xl text-center"
          >
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
            <h3 className="font-mono font-semibold text-lg mb-2">Sin resultados</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              No se encontraron terminos para "{search}". Prueba con otra palabra o limpia los filtros.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); }}
              className="mt-4 text-sm text-primary font-medium hover:underline"
            >
              Limpiar busqueda
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {letters.map(([letter, entries]) => (
              <div key={letter} id={`letter-${letter}`}>
                {/* Letter header */}
                <div className="flex items-center gap-3 mb-3 sticky top-16 z-10 py-2 bg-background/80 backdrop-blur-sm">
                  <span className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-mono font-bold text-primary text-lg">
                    {letter}
                  </span>
                  <div className="h-px flex-1 bg-border/40" />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {entries.length}
                  </span>
                </div>

                {/* Entries */}
                <div className="space-y-2 ml-1">
                  {entries.map((entry, i) => {
                    const isExpanded = expandedTerm === entry.term;
                    const cat = CATEGORIES[entry.category];

                    return (
                      <motion.div
                        key={entry.term}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.02, 0.2) }}
                      >
                        <div
                          onClick={() => toggleTerm(entry.term)}
                          className={cn(
                            'glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-200',
                            isExpanded ? 'border-primary/20' : 'hover:border-primary/10'
                          )}
                        >
                          {/* Term row */}
                          <div className="flex items-center gap-3 p-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-mono font-semibold text-sm">{entry.term}</h3>
                                <Badge
                                  variant="outline"
                                  className={cn('text-[10px] py-0 px-1.5', cat.color, cat.border)}
                                >
                                  {cat.label}
                                </Badge>
                              </div>
                              {!isExpanded && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                  {entry.definition}
                                </p>
                              )}
                            </div>
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.15 }}
                              className="shrink-0"
                            >
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                          </div>

                          {/* Expanded detail */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-1 border-t border-border/30 space-y-3">
                                  <p className="text-sm text-foreground/80 leading-relaxed">
                                    {entry.definition}
                                  </p>

                                  {/* Meta row: session + difficulty */}
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {entry.session && (
                                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Hash className="w-3 h-3" />
                                        <span>{entry.session}</span>
                                      </div>
                                    )}
                                    {entry.difficulty && (
                                      <span className={cn(
                                        'inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-lg border',
                                        entry.difficulty === 'basico' && 'bg-green-500/10 text-green-400 border-green-500/20',
                                        entry.difficulty === 'intermedio' && 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
                                        entry.difficulty === 'avanzado' && 'bg-red-500/10 text-red-400 border-red-500/20',
                                      )}>
                                        <Target className="w-2.5 h-2.5" />
                                        {entry.difficulty}
                                      </span>
                                    )}
                                  </div>

                                  {/* Pro Tip */}
                                  {entry.proTip && (
                                    <div className="flex gap-2.5 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                                      <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                                      <div>
                                        <span className="text-[10px] font-mono text-yellow-400/70 uppercase tracking-wider">Pro Tip</span>
                                        <p className="text-xs text-foreground/70 leading-relaxed mt-0.5">{entry.proTip}</p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Try It */}
                                  {entry.tryIt && (
                                    <div className="flex gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/10">
                                      <Play className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                      <div>
                                        <span className="text-[10px] font-mono text-primary/70 uppercase tracking-wider">Pruebalo ahora</span>
                                        <p className="text-xs text-foreground/70 leading-relaxed mt-0.5">{entry.tryIt}</p>
                                      </div>
                                    </div>
                                  )}

                                  {entry.url && (
                                    <a
                                      href={entry.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      {entry.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                    </a>
                                  )}

                                  {entry.related && entry.related.length > 0 && (
                                    <div>
                                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                        Relacionados
                                      </span>
                                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                                        {entry.related.map(rel => {
                                          const exists = DICTIONARY.some(e => e.term === rel);
                                          return (
                                            <button
                                              key={rel}
                                              onClick={e => {
                                                e.stopPropagation();
                                                if (exists) jumpToRelated(rel);
                                              }}
                                              className={cn(
                                                'text-[11px] px-2 py-0.5 rounded-lg border transition-colors',
                                                exists
                                                  ? 'border-primary/20 text-primary hover:bg-primary/10 cursor-pointer'
                                                  : 'border-border/30 text-muted-foreground cursor-default'
                                              )}
                                            >
                                              {rel}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
