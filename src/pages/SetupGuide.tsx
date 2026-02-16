import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, ExternalLink, ChevronDown, CheckCircle2, Copy, Check,
  Sparkles, Lightbulb, Zap, Shield, Star, Globe, Wrench,
  Code2, Palette, Brain, Lock, CreditCard, Gift, Filter,
  Monitor, Smartphone, BookOpen, ArrowRight, X, Layers, Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════
   GUIA DE INSTALACION — Paso a paso para crear cuentas y 
   configurar todas las herramientas del taller VDRC
   ═══════════════════════════════════════════════════════════════ */

type ToolCategory = 'esencial' | 'ia' | 'presentaciones' | 'desarrollo' | 'productividad' | 'diseno';
type PricingType = 'gratis' | 'freemium' | 'pago';
type SessionTag = 'S1' | 'S2' | 'S3' | 'S4';
type Priority = 'critica' | 'importante' | 'opcional';

interface SetupStep {
  action: string;
  detail: string;
}

interface ToolGuide {
  name: string;
  logo: string;
  url: string;
  category: ToolCategory;
  sessions: SessionTag[];
  pricing: PricingType;
  pricingDetail: string;
  priority: Priority;
  description: string;
  whyYouNeedIt: string;
  steps: SetupStep[];
  proTip: string;
  timeToSetup: string;
  platforms: string[];
}

const CATEGORIES: Record<ToolCategory, { label: string; color: string; icon: React.ElementType }> = {
  esencial: { label: 'Esencial', color: 'text-green-400 bg-green-500/10 border-green-500/20', icon: Shield },
  ia: { label: 'IA', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', icon: Brain },
  presentaciones: { label: 'Presentaciones', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20', icon: Palette },
  desarrollo: { label: 'Desarrollo', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: Code2 },
  productividad: { label: 'Productividad', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', icon: Zap },
  diseno: { label: 'Diseño', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', icon: Palette },
};

const PRICING_CONFIG: Record<PricingType, { label: string; color: string; icon: React.ElementType }> = {
  gratis: { label: 'Gratis', color: 'text-green-400 bg-green-500/10 border-green-500/20', icon: Gift },
  freemium: { label: 'Freemium', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', icon: Star },
  pago: { label: 'Pago', color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: CreditCard },
};

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; order: number }> = {
  critica: { label: 'Critica', color: 'text-red-400 bg-red-500/10 border-red-500/20', order: 0 },
  importante: { label: 'Importante', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', order: 1 },
  opcional: { label: 'Opcional', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', order: 2 },
};

const SESSION_CONFIG: Record<SessionTag, { label: string; hue: number }> = {
  S1: { label: 'S1 Higiene Digital', hue: 200 },
  S2: { label: 'S2 IA & Productividad', hue: 263 },
  S3: { label: 'S3 Presentaciones', hue: 340 },
  S4: { label: 'S4 Vibe Coding', hue: 160 },
};

const TOOLS: ToolGuide[] = [
  // ─── ESENCIALES ───
  {
    name: 'GitHub',
    logo: '🐙',
    url: 'https://github.com',
    category: 'desarrollo',
    sessions: ['S4'],
    pricing: 'gratis',
    pricingDetail: 'Gratis para repos publicos y privados ilimitados',
    priority: 'critica',
    description: 'Plataforma de control de versiones y colaboracion de codigo. Es donde vive tu codigo y donde Lovable, Vercel y Claude Code se conectan.',
    whyYouNeedIt: 'Sin GitHub, no puedes versionar tu codigo, hacer deploy automatico, ni conectar Lovable con Supabase. Es la columna vertebral del vibe coding.',
    steps: [
      { action: 'Ve a github.com', detail: 'Haz clic en "Sign up" (esquina superior derecha)' },
      { action: 'Crea tu cuenta', detail: 'Usa tu email personal (no el del trabajo). Username: algo profesional y corto' },
      { action: 'Verifica tu email', detail: 'Revisa tu bandeja de entrada y confirma' },
      { action: 'Configura tu perfil', detail: 'Agrega foto, bio, y tu ubicacion. Esto importa si compartes proyectos' },
      { action: 'Instala GitHub Desktop (opcional)', detail: 'Descarga en desktop.github.com — interfaz visual para quienes no usan terminal' },
      { action: 'Genera un Personal Access Token', detail: 'Settings > Developer settings > Personal access tokens > Generate new token. Guardalo en Bitwarden' },
    ],
    proTip: 'Activa 2FA (autenticacion de dos factores) desde el dia 1. Ve a Settings > Password and authentication. Usa una app como Google Authenticator.',
    timeToSetup: '5 minutos',
    platforms: ['Web', 'Desktop', 'Mobile'],
  },
  {
    name: 'Supabase',
    logo: '⚡',
    url: 'https://supabase.com',
    category: 'desarrollo',
    sessions: ['S4'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: 2 proyectos, 500MB DB, 1GB storage. Pro: $25/mes',
    priority: 'critica',
    description: 'Backend-as-a-Service con PostgreSQL, autenticacion, storage y funciones. Es tu base de datos y backend completo sin escribir servidor.',
    whyYouNeedIt: 'Lovable genera el frontend, pero necesitas un backend real. Supabase te da base de datos relacional, login de usuarios, y almacenamiento de archivos — todo conectado.',
    steps: [
      { action: 'Ve a supabase.com', detail: 'Haz clic en "Start your project"' },
      { action: 'Conecta con GitHub', detail: 'Usa "Sign in with GitHub" — asi queda todo vinculado' },
      { action: 'Crea tu primer proyecto', detail: 'Nombre del proyecto, region (us-east-1 o sa-east-1 para Latam), y crea una contraseña de base de datos FUERTE' },
      { action: 'Guarda tus credenciales', detail: 'Ve a Settings > API. Copia: Project URL y anon key. Guardalas en Bitwarden' },
      { action: 'Explora el Table Editor', detail: 'Es como Excel pero conectado a PostgreSQL. Aqui creas tus tablas' },
      { action: 'Activa Authentication', detail: 'En Authentication > Providers, activa Email y Google. Esto te da login gratis' },
    ],
    proTip: 'La contraseña de la base de datos NO se puede recuperar facilmente. Guardala en Bitwarden apenas la crees. Si la pierdes, toca resetear el proyecto.',
    timeToSetup: '10 minutos',
    platforms: ['Web'],
  },
  {
    name: 'Lovable',
    logo: '💜',
    url: 'https://lovable.dev',
    category: 'desarrollo',
    sessions: ['S4'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: proyectos limitados. Pro: desde $20/mes',
    priority: 'critica',
    description: 'Plataforma de vibe coding que genera aplicaciones web completas desde descripciones en texto natural. Frontend + backend + deploy en minutos.',
    whyYouNeedIt: 'Es la herramienta estrella del modulo 4. Describes lo que quieres en español, Lovable genera React + TypeScript + Tailwind + integra Supabase. De idea a app funcional.',
    steps: [
      { action: 'Ve a lovable.dev', detail: 'Haz clic en "Get Started" o "Sign Up"' },
      { action: 'Conecta con GitHub', detail: 'Usa tu cuenta de GitHub para registrarte — cada proyecto se sincroniza automaticamente como repositorio' },
      { action: 'Crea tu primer proyecto', detail: 'Describe en español lo que quieres construir. Se especifico: "Una app de gestion de tareas con login, dashboard, y calendario"' },
      { action: 'Conecta Supabase', detail: 'En Settings del proyecto, conecta tu proyecto de Supabase usando la URL y anon key que guardaste' },
      { action: 'Aprende el flujo basico', detail: 'Prompt → Preview → Edit → Deploy. Cada cambio se guarda en GitHub automaticamente' },
    ],
    proTip: 'La clave de Lovable es el PRD (Product Requirements Document). Antes de crear un proyecto, escribe un documento detallado con ChatGPT describiendo exactamente que quieres. Mientras mas contexto, mejor resultado.',
    timeToSetup: '5 minutos',
    platforms: ['Web'],
  },
  {
    name: 'Vercel',
    logo: '▲',
    url: 'https://vercel.com',
    category: 'desarrollo',
    sessions: ['S4'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: proyectos personales ilimitados. Pro: $20/mes',
    priority: 'importante',
    description: 'Plataforma de deploy y hosting para aplicaciones web. Conecta con GitHub y hace deploy automatico cada vez que haces push.',
    whyYouNeedIt: 'Lovable tiene su propio deploy, pero Vercel te da dominio personalizado, analytics, y control total. Es donde "vive" tu app para el mundo.',
    steps: [
      { action: 'Ve a vercel.com', detail: 'Haz clic en "Sign Up"' },
      { action: 'Conecta con GitHub', detail: 'Selecciona "Continue with GitHub" para vincular tus repositorios' },
      { action: 'Importa un proyecto', detail: 'Haz clic en "Add New Project" > Import Git Repository > selecciona el repo de Lovable' },
      { action: 'Configura variables de entorno', detail: 'En Settings > Environment Variables, agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY' },
      { action: 'Deploy', detail: 'Vercel detecta automaticamente que es un proyecto Vite/React. Haz clic en "Deploy"' },
      { action: 'Configura dominio (opcional)', detail: 'En Settings > Domains, agrega tu dominio personalizado si tienes uno' },
    ],
    proTip: 'Cada push a GitHub hace deploy automatico en Vercel. Usa ramas: main = produccion, develop = testing. Vercel crea "preview deployments" para cada rama.',
    timeToSetup: '10 minutos',
    platforms: ['Web'],
  },
  // ─── IA ───
  {
    name: 'ChatGPT',
    logo: '🤖',
    url: 'https://chat.openai.com',
    category: 'ia',
    sessions: ['S2', 'S3', 'S4'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: GPT-4o-mini. Plus: $20/mes (GPT-4o, DALL-E, GPTs)',
    priority: 'critica',
    description: 'El modelo de IA conversacional mas usado del mundo. GPT-4o es multimodal: texto, imagen, audio, codigo. Tiene Custom GPTs, memoria, y Canvas.',
    whyYouNeedIt: 'Es tu herramienta principal para todo: redaccion, analisis, codigo, brainstorming, estrategia. Con las 5 capas de personalizacion, se convierte en tu asistente personal.',
    steps: [
      { action: 'Ve a chat.openai.com', detail: 'Haz clic en "Sign up"' },
      { action: 'Crea tu cuenta PERSONAL', detail: 'Usa tu email personal, NO el del trabajo. Si cambias de empleo, pierdes acceso a la cuenta corporativa' },
      { action: 'Verifica tu email y telefono', detail: 'OpenAI requiere verificacion telefonica' },
      { action: 'Suscribete a Plus (recomendado)', detail: 'Settings > Subscription > Upgrade to Plus ($20/mes). Acceso a GPT-4o, DALL-E, GPTs custom, vision' },
      { action: 'Configura Custom Instructions', detail: 'Settings > Personalization > Custom Instructions. Dile quien eres y como quieres que responda' },
      { action: 'Activa Memory', detail: 'Settings > Personalization > Memory. Permite que ChatGPT recuerde entre conversaciones' },
    ],
    proTip: 'La cuenta debe ser PERSONAL. Si tu empresa te da ChatGPT Enterprise, usalo para trabajo, pero manten tu cuenta personal para proyectos propios y aprendizaje.',
    timeToSetup: '5 minutos',
    platforms: ['Web', 'iOS', 'Android', 'macOS', 'Windows'],
  },
  {
    name: 'Claude',
    logo: '🧠',
    url: 'https://claude.ai',
    category: 'ia',
    sessions: ['S2', 'S4'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: limite de mensajes. Pro: $20/mes',
    priority: 'importante',
    description: 'Modelo de IA de Anthropic. Excelente para codigo, analisis largo, Excel/datos, y razonamiento complejo. Tiene Projects y Artifacts.',
    whyYouNeedIt: 'Claude es superior a ChatGPT en analisis de documentos largos, modelos financieros en Excel, y generacion de codigo limpio. Projects te permite cargar contexto persistente.',
    steps: [
      { action: 'Ve a claude.ai', detail: 'Haz clic en "Sign up" o "Try Claude"' },
      { action: 'Crea tu cuenta', detail: 'Puedes usar Google o email. Verifica tu telefono' },
      { action: 'Explora Projects', detail: 'Crea un proyecto y sube documentos de referencia. Claude los usara como contexto en cada conversacion dentro de ese proyecto' },
      { action: 'Prueba Artifacts', detail: 'Pide algo visual: "crea un dashboard HTML con estos datos". Claude genera codigo ejecutable en tiempo real' },
      { action: 'Instala Claude Code (avanzado)', detail: 'npm install -g @anthropic-ai/claude-code — agente de IA que ejecuta comandos en tu terminal' },
    ],
    proTip: 'Usa Claude para Excel y modelos financieros. Sube tu archivo y pidele que analice, cree formulas, o arme proyecciones. Es significativamente mejor que ChatGPT en esto.',
    timeToSetup: '3 minutos',
    platforms: ['Web', 'iOS', 'Android'],
  },
  {
    name: 'Perplexity',
    logo: '🔍',
    url: 'https://perplexity.ai',
    category: 'ia',
    sessions: ['S2'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: busquedas ilimitadas. Pro: $20/mes (GPT-4, Claude)',
    priority: 'importante',
    description: 'Motor de busqueda potenciado con IA. Reemplaza a Google para investigacion — te da respuestas con fuentes citadas y verificables.',
    whyYouNeedIt: 'Google te da 10 links azules. Perplexity te da LA respuesta con las fuentes. Para investigacion rapida, analisis de mercado, y fact-checking, es imbatible.',
    steps: [
      { action: 'Ve a perplexity.ai', detail: 'Registrate con Google o email' },
      { action: 'Haz tu primera busqueda', detail: 'Pregunta algo que normalmente googlearías. Nota las fuentes citadas al final' },
      { action: 'Prueba el modo "Focus"', detail: 'Selecciona Academic, Writing, Math, etc. para filtrar resultados por tipo' },
      { action: 'Crea una Collection', detail: 'Organiza busquedas por proyecto o tema. El contexto persiste entre busquedas' },
    ],
    proTip: 'Usa Perplexity para investigar ANTES de pedirle algo a ChatGPT. Perplexity te da los datos reales con fuentes; ChatGPT los procesa y estructura.',
    timeToSetup: '2 minutos',
    platforms: ['Web', 'iOS', 'Android', 'Chrome extension'],
  },
  {
    name: 'Gemini',
    logo: '💎',
    url: 'https://gemini.google.com',
    category: 'ia',
    sessions: ['S2', 'S4'],
    pricing: 'freemium',
    pricingDetail: 'Gratis con cuenta Google. Advanced: $20/mes (Gemini Ultra)',
    priority: 'importante',
    description: 'IA de Google integrada con todo el ecosistema Google: Gmail, Docs, Sheets, Drive, Calendar. Tiene Gems (como GPTs) y es excelente para diseño de UI.',
    whyYouNeedIt: 'Si usas Google Workspace, Gemini es tu copiloto nativo. Analiza tu Gmail, resume documentos de Drive, y crea contenido en Docs. Para diseño de UI, Gemini genera mockups que puedes pasar a Lovable.',
    steps: [
      { action: 'Ve a gemini.google.com', detail: 'Inicia sesion con tu cuenta Google' },
      { action: 'Ya tienes acceso', detail: 'Si tienes Gmail, ya tienes Gemini. No necesitas crear cuenta nueva' },
      { action: 'Prueba Gems', detail: 'En el menu lateral, crea un Gem personalizado (equivalente a GPTs de ChatGPT)' },
      { action: 'Conecta con Google Workspace', detail: 'En Docs, Sheets o Gmail, busca el icono de Gemini para activar el asistente contextual' },
    ],
    proTip: 'Gemini es el mejor para diseñar interfaces. Pidele "diseña un mockup de una app de..." y luego copia ese diseño como prompt para Lovable.',
    timeToSetup: '1 minuto',
    platforms: ['Web', 'iOS', 'Android', 'Google Workspace'],
  },
  {
    name: 'NotebookLM',
    logo: '📓',
    url: 'https://notebooklm.google.com',
    category: 'ia',
    sessions: ['S2'],
    pricing: 'gratis',
    pricingDetail: 'Gratis con cuenta Google',
    priority: 'importante',
    description: 'Herramienta de Google para investigar cualquier tema. Subes documentos, PDFs, URLs, y NotebookLM los analiza, resume, y genera podcasts automaticos.',
    whyYouNeedIt: 'Perfecto para investigacion profunda. Sube un paper, un manual, o una transcripcion del taller y hazle preguntas. Genera resúmenes ejecutivos y hasta podcasts en audio.',
    steps: [
      { action: 'Ve a notebooklm.google.com', detail: 'Inicia sesion con tu cuenta Google' },
      { action: 'Crea un nuevo notebook', detail: 'Haz clic en "New Notebook"' },
      { action: 'Agrega fuentes', detail: 'Sube PDFs, links de web, Google Docs, YouTube videos, o texto. Maximo 50 fuentes por notebook' },
      { action: 'Haz preguntas', detail: 'Pregunta sobre el contenido. NotebookLM responde SOLO basandose en tus fuentes (no inventa)' },
      { action: 'Genera un podcast', detail: 'Haz clic en "Audio Overview" para generar un podcast de 5-10 min que resume todo el contenido' },
    ],
    proTip: 'Sube las transcripciones de las clases VDRC y las notas de cada sesion. NotebookLM se convierte en tu tutor personal del taller.',
    timeToSetup: '2 minutos',
    platforms: ['Web'],
  },
  // ─── SEGURIDAD ───
  {
    name: 'Bitwarden',
    logo: '🔐',
    url: 'https://bitwarden.com',
    category: 'esencial',
    sessions: ['S1'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: ilimitado. Premium: $10/año',
    priority: 'critica',
    description: 'Gestor de contraseñas open-source. Guarda todas tus contraseñas, API keys, y datos sensibles en una boveda cifrada.',
    whyYouNeedIt: 'Vas a crear 15+ cuentas en este taller. Sin un gestor de contraseñas, vas a reutilizar la misma clave o perderlas. Bitwarden es el primer paso de higiene digital.',
    steps: [
      { action: 'Ve a bitwarden.com', detail: 'Haz clic en "Get Started" o "Create Account"' },
      { action: 'Crea tu master password', detail: 'Esta es la UNICA contraseña que necesitas recordar. Hazla larga y memorable: "MiPerroLadra3VecesAlDia!"' },
      { action: 'Instala la extension del navegador', detail: 'Chrome Web Store > busca Bitwarden > instala. Esto auto-completa login en todos los sitios' },
      { action: 'Instala la app movil', detail: 'App Store / Play Store > Bitwarden. Activa biometrico (huella/Face ID)' },
      { action: 'Importa contraseñas existentes', detail: 'Si usas Chrome para guardar passwords: Bitwarden > Tools > Import > selecciona Chrome' },
      { action: 'Genera passwords fuertes', detail: 'Al crear una cuenta nueva, usa el generador de Bitwarden: icono en el campo de password' },
    ],
    proTip: 'Configura Bitwarden ANTES de crear todas las demas cuentas. Asi cada nueva contraseña se guarda automaticamente desde el inicio.',
    timeToSetup: '10 minutos',
    platforms: ['Web', 'Chrome', 'Firefox', 'Safari', 'iOS', 'Android', 'Desktop'],
  },
  // ─── PRODUCTIVIDAD ───
  {
    name: 'Clean Email',
    logo: '📧',
    url: 'https://clean.email',
    category: 'productividad',
    sessions: ['S1'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: limpieza basica. Premium: desde $10/mes',
    priority: 'importante',
    description: 'Herramienta para limpiar tu bandeja de entrada masivamente. Desuscribe newsletters, borra emails viejos, y organiza automaticamente.',
    whyYouNeedIt: 'El Inbox Zero empieza aqui. Si tienes 5,000+ emails sin leer, Clean Email los organiza y limpia en minutos. Es el primer paso de higiene digital.',
    steps: [
      { action: 'Ve a clean.email', detail: 'Haz clic en "Sign Up Free"' },
      { action: 'Conecta tu email', detail: 'Autoriza acceso a Gmail o Outlook. Clean Email lee tus correos para organizarlos' },
      { action: 'Ejecuta Smart Views', detail: 'Te agrupa emails por tipo: newsletters, notificaciones, suscripciones, etc.' },
      { action: 'Desuscribete masivamente', detail: 'En "Unsubscriber", selecciona todo lo que no lees y desuscribete con un clic' },
      { action: 'Configura reglas automaticas', detail: 'Auto Clean: define reglas como "emails de LinkedIn > 30 dias = borrar automatico"' },
    ],
    proTip: 'Hazlo una vez al mes. Programa 15 minutos el primer lunes de cada mes para revisar y limpiar. Inbox Zero no es un estado, es un habito.',
    timeToSetup: '5 minutos',
    platforms: ['Web'],
  },
  {
    name: 'Notion',
    logo: '📝',
    url: 'https://notion.so',
    category: 'productividad',
    sessions: ['S1', 'S2'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: uso personal. Plus: $10/mes',
    priority: 'opcional',
    description: 'Espacio de trabajo todo-en-uno: notas, documentos, bases de datos, wikis, y gestion de proyectos. Con IA integrada.',
    whyYouNeedIt: 'Ideal para organizar tus apuntes del taller, crear tu PRD (Product Requirements Document) para Lovable, y documentar tus workflows.',
    steps: [
      { action: 'Ve a notion.so', detail: 'Haz clic en "Get Notion free"' },
      { action: 'Crea tu cuenta', detail: 'Usa Google o email. Selecciona "For personal use"' },
      { action: 'Crea tu workspace', detail: 'Crea paginas para: Apuntes VDRC, Proyectos, PRDs, Recursos' },
      { action: 'Explora templates', detail: 'Notion tiene templates gratuitos para casi todo: project management, meeting notes, wikis' },
    ],
    proTip: 'Crea una pagina "PRD Template" en Notion. Cada vez que quieras crear algo en Lovable, primero escribe el PRD en Notion con ChatGPT.',
    timeToSetup: '5 minutos',
    platforms: ['Web', 'Desktop', 'iOS', 'Android'],
  },
  // ─── PRESENTACIONES ───
  {
    name: 'Gamma',
    logo: '📊',
    url: 'https://gamma.app',
    category: 'presentaciones',
    sessions: ['S3'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: 10 creditos. Pro: desde $10/mes',
    priority: 'critica',
    description: 'Genera presentaciones profesionales con IA. Describe tu tema y Gamma crea slides con diseño, contenido, y estructura automatica.',
    whyYouNeedIt: 'Olvida PowerPoint desde cero. Dale a Gamma tu contenido (o un documento) y genera una presentacion profesional en 2 minutos. ChatGPT arma la estrategia, Gamma pone el diseño.',
    steps: [
      { action: 'Ve a gamma.app', detail: 'Haz clic en "Sign up for free"' },
      { action: 'Crea tu cuenta', detail: 'Google o email. Recibes 10 creditos gratis' },
      { action: 'Crea tu primera presentacion', detail: 'Haz clic en "Create new" > "Presentation" > describe el tema o pega contenido' },
      { action: 'Personaliza el diseño', detail: 'Cambia tema, colores, y fuentes. Gamma adapta todo automaticamente' },
      { action: 'Exporta', detail: 'Puedes exportar a PDF, PowerPoint, o compartir un link interactivo' },
    ],
    proTip: 'Flujo pro: 1) Usa ChatGPT para crear el guion/contenido estructurado, 2) Pega en Gamma, 3) Gamma diseña. Nunca empieces directo en Gamma sin un guion.',
    timeToSetup: '3 minutos',
    platforms: ['Web'],
  },
  {
    name: 'Napkin',
    logo: '✏️',
    url: 'https://napkin.ai',
    category: 'presentaciones',
    sessions: ['S3'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: funcionalidad basica. Pro: desde $15/mes',
    priority: 'importante',
    description: 'Convierte texto en infografias y diagramas estilo McKinsey/BCG automaticamente. Pega tu contenido y genera visualizaciones profesionales.',
    whyYouNeedIt: 'Las mejores presentaciones tienen datos visuales. Napkin transforma bullets aburridos en infografias que parecen hechas por una consultora top.',
    steps: [
      { action: 'Ve a napkin.ai', detail: 'Registrate con Google o email' },
      { action: 'Pega tu contenido', detail: 'Escribe o pega texto, bullets, o datos. Napkin lo analiza' },
      { action: 'Selecciona visualizacion', detail: 'Elige entre timelines, flowcharts, comparaciones, matrices, y mas' },
      { action: 'Personaliza y exporta', detail: 'Ajusta colores, estilo, y descarga como PNG o SVG para tus slides' },
    ],
    proTip: 'Combina Napkin con Gamma: crea las infografias en Napkin, exporta como imagen, e insertalas en tu presentacion de Gamma para un resultado premium.',
    timeToSetup: '2 minutos',
    platforms: ['Web'],
  },
  {
    name: 'Beautiful.ai',
    logo: '🎨',
    url: 'https://beautiful.ai',
    category: 'presentaciones',
    sessions: ['S3'],
    pricing: 'pago',
    pricingDetail: 'Pro: $12/mes. Team: $40/mes',
    priority: 'opcional',
    description: 'Software de presentaciones con diseño inteligente. Los slides se auto-diseñan mientras agregas contenido — imposible hacer algo feo.',
    whyYouNeedIt: 'Si necesitas presentaciones corporativas recurrentes, Beautiful.ai mantiene consistencia de marca automaticamente. Ideal para reportes mensuales y pitch decks.',
    steps: [
      { action: 'Ve a beautiful.ai', detail: 'Haz clic en "Get started"' },
      { action: 'Registrate', detail: 'Email o Google. Puedes probar gratis por 14 dias' },
      { action: 'Selecciona un template', detail: 'Elige entre decenas de templates profesionales por industria' },
      { action: 'Agrega contenido', detail: 'El diseño se adapta automaticamente al contenido que agregas. Usa Smart Slides' },
    ],
    proTip: 'Beautiful.ai es excelente para pitch decks de startups. Tiene templates especificos para inversionistas con la estructura que esperan ver.',
    timeToSetup: '5 minutos',
    platforms: ['Web'],
  },
  {
    name: 'Canva',
    logo: '🎯',
    url: 'https://canva.com',
    category: 'diseno',
    sessions: ['S3'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: funcionalidad amplia. Pro: $13/mes',
    priority: 'importante',
    description: 'Plataforma de diseño grafico para todo: presentaciones, redes sociales, logos, kits de marca, videos, y mas. Con IA generativa integrada.',
    whyYouNeedIt: 'Para branding, kits de marca, y contenido visual para redes sociales. Canva complementa a Gamma — Gamma para presentaciones, Canva para todo lo demas.',
    steps: [
      { action: 'Ve a canva.com', detail: 'Haz clic en "Sign up" — gratis' },
      { action: 'Crea tu cuenta', detail: 'Google, email, o Apple. Plan gratis incluye miles de templates' },
      { action: 'Crea tu Brand Kit', detail: 'En "Brand" define tus colores, fuentes, y logo. Se aplican a todos tus diseños' },
      { action: 'Prueba Magic Design', detail: 'Sube una imagen o describe lo que quieres — Canva genera diseños con IA' },
    ],
    proTip: 'Usa Coolors (coolors.co) para generar tu paleta de colores y Font Joy (fontjoy.com) para elegir tipografias. Luego configura todo en el Brand Kit de Canva.',
    timeToSetup: '5 minutos',
    platforms: ['Web', 'Desktop', 'iOS', 'Android'],
  },
  // ─── DESARROLLO AVANZADO ───
  {
    name: 'Cursor',
    logo: '⌨️',
    url: 'https://cursor.com',
    category: 'desarrollo',
    sessions: ['S4'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: funcionalidad basica. Pro: $20/mes',
    priority: 'opcional',
    description: 'Editor de codigo con IA integrada. Es VS Code pero con superpoderes: autocomplete inteligente, chat con tu codebase, y agentes autonomos.',
    whyYouNeedIt: 'Si quieres ir mas alla de Lovable y editar codigo directamente, Cursor es el editor ideal. Entiende tu proyecto completo y te ayuda a programar con IA.',
    steps: [
      { action: 'Ve a cursor.com', detail: 'Descarga la app para tu sistema operativo' },
      { action: 'Instala', detail: 'Abre el instalador. Cursor importa automaticamente tu configuracion de VS Code si lo tienes' },
      { action: 'Conecta tu cuenta', detail: 'Registrate con email o GitHub' },
      { action: 'Abre un proyecto', detail: 'File > Open Folder > selecciona un repo clonado de GitHub' },
      { action: 'Prueba el chat (Cmd+L)', detail: 'Preguntale algo sobre tu codigo. Cursor lee todo el proyecto para responderte' },
    ],
    proTip: 'Clona tu proyecto de Lovable desde GitHub y abrelo en Cursor. Asi puedes hacer cambios finos que Lovable no logra, con la ayuda de la IA de Cursor.',
    timeToSetup: '5 minutos',
    platforms: ['macOS', 'Windows', 'Linux'],
  },
  {
    name: 'Figma',
    logo: '🎨',
    url: 'https://figma.com',
    category: 'diseno',
    sessions: ['S4'],
    pricing: 'freemium',
    pricingDetail: 'Gratis: 3 proyectos. Pro: $15/mes',
    priority: 'opcional',
    description: 'Herramienta de diseño de interfaces (UI/UX) colaborativa. Para diseñar mockups antes de construir en Lovable.',
    whyYouNeedIt: 'Si quieres diseñar la interfaz ANTES de construirla, Figma te da control pixel-perfect. Exporta el diseño y usalo como referencia visual en tu prompt de Lovable.',
    steps: [
      { action: 'Ve a figma.com', detail: 'Haz clic en "Get started for free"' },
      { action: 'Crea tu cuenta', detail: 'Google o email' },
      { action: 'Crea un proyecto', detail: 'New Design File. Usa frames de 1440x900 para desktop, 390x844 para mobile' },
      { action: 'Explora la comunidad', detail: 'Figma Community tiene miles de templates y UI kits gratuitos' },
    ],
    proTip: 'No necesitas ser diseñador. Usa Gemini para generar una descripcion de UI detallada, diseñala rapido en Figma con un template, y pasalo a Lovable.',
    timeToSetup: '3 minutos',
    platforms: ['Web', 'Desktop'],
  },
];

/* ─── Components ─── */

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all', copied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground', className)}
      aria-label="Copiar al portapapeles"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copiado' : 'Copiar URL'}
    </button>
  );
}

function ToolCard({ tool, isOpen, onToggle }: { tool: ToolGuide; isOpen: boolean; onToggle: () => void }) {
  const cat = CATEGORIES[tool.category];
  const price = PRICING_CONFIG[tool.pricing];
  const prio = PRIORITY_CONFIG[tool.priority];
  const PriceIcon = price.icon;

  return (
    <motion.div
      layout
      className={cn(
        'rounded-2xl border overflow-hidden transition-all duration-300',
        isOpen ? 'border-white/[0.12] bg-white/[0.03]' : 'border-white/[0.06] bg-white/[0.01] hover:border-white/[0.1]',
      )}
    >
      {/* Header */}
      <button onClick={onToggle} className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left group">
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center text-2xl transition-transform group-hover:scale-105">
          {tool.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="text-base sm:text-lg font-bold">{tool.name}</h3>
            <Badge variant="outline" className={cn('text-[10px] border', prio.color)}>{prio.label}</Badge>
            <Badge variant="outline" className={cn('text-[10px] border', price.color)}>
              <PriceIcon className="w-3 h-3 mr-1" />
              {price.label}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{tool.description}</p>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {tool.sessions.map((s) => (
              <span
                key={s}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded-md"
                style={{
                  background: `hsl(${SESSION_CONFIG[s].hue} 40% 50% / 0.1)`,
                  color: `hsl(${SESSION_CONFIG[s].hue} 60% 60%)`,
                }}
              >
                {s}
              </span>
            ))}
            <span className="text-[10px] text-muted-foreground/50 font-mono ml-1">~{tool.timeToSetup}</span>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expanded */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 sm:px-5 pb-5 space-y-5 border-t border-white/[0.04] pt-4">
              {/* Why */}
              <div className="rounded-xl p-4 bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">Por que lo necesitas</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.whyYouNeedIt}</p>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-2 text-xs">
                <PriceIcon className="w-4 h-4" style={{ color: price.color.split(' ')[0].replace('text-', '') }} />
                <span className="text-muted-foreground">{tool.pricingDetail}</span>
              </div>

              {/* Steps */}
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-accent" />
                  Paso a paso
                </h4>
                <div className="space-y-2.5">
                  {tool.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{step.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pro tip */}
              <div className="rounded-xl p-4 bg-accent/5 border border-accent/10">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-accent">PRO TIP</span>
                    <p className="text-sm text-foreground/80 mt-1">{tool.proTip}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {tool.platforms.map((p) => (
                    <Badge key={p} variant="outline" className="text-[10px] border-white/[0.06] text-muted-foreground">
                      {p === 'Web' ? <Globe className="w-3 h-3 mr-1" /> : p === 'Desktop' || p === 'macOS' || p === 'Windows' || p === 'Linux' ? <Monitor className="w-3 h-3 mr-1" /> : <Smartphone className="w-3 h-3 mr-1" />}
                      {p}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <CopyButton text={tool.url} />
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                  >
                    Abrir <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Page ─── */

export default function SetupGuide() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const [activeSession, setActiveSession] = useState<SessionTag | 'all'>('all');
  const [activePricing, setActivePricing] = useState<PricingType | 'all'>('all');
  const [openTools, setOpenTools] = useState<Set<string>>(new Set());

  const toggleTool = (name: string) => {
    setOpenTools((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const expandAll = () => setOpenTools(new Set(TOOLS.map((t) => t.name)));
  const collapseAll = () => setOpenTools(new Set());

  const filtered = useMemo(() => {
    return TOOLS
      .filter((t) => {
        if (activeCategory !== 'all' && t.category !== activeCategory) return false;
        if (activeSession !== 'all' && !t.sessions.includes(activeSession)) return false;
        if (activePricing !== 'all' && t.pricing !== activePricing) return false;
        if (search) {
          const q = search.toLowerCase();
          return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => PRIORITY_CONFIG[a.priority].order - PRIORITY_CONFIG[b.priority].order);
  }, [search, activeCategory, activeSession, activePricing]);

  const stats = useMemo(() => ({
    total: TOOLS.length,
    gratis: TOOLS.filter((t) => t.pricing === 'gratis').length,
    freemium: TOOLS.filter((t) => t.pricing === 'freemium').length,
    criticas: TOOLS.filter((t) => t.priority === 'critica').length,
  }), []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageHeader
          title="Guia de Instalacion"
          description="Todo lo que necesitas crear y configurar para el taller. Paso a paso, con links directos y tips de cada herramienta."
          breadcrumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Guia de Instalacion' },
          ]}
          showBack
          meta={
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~15 min de lectura</span>
              <span>18 herramientas</span>
            </div>
          }
        />

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: 'Herramientas', value: stats.total, icon: Wrench, hue: 160 },
            { label: 'Gratis', value: stats.gratis, icon: Gift, hue: 120 },
            { label: 'Freemium', value: stats.freemium, icon: Star, hue: 45 },
            { label: 'Criticas', value: stats.criticas, icon: Shield, hue: 0 },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center"
            >
              <s.icon className="w-4 h-4 mx-auto mb-1" style={{ color: `hsl(${s.hue} 60% 55%)` }} />
              <div className="text-xl font-bold font-mono" style={{ color: `hsl(${s.hue} 60% 60%)` }}>{s.value}</div>
              <div className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Recommended order banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 rounded-2xl border border-primary/10 bg-primary/5 p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold mb-1">Orden recomendado de instalacion</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">1.</strong> Bitwarden (gestor de contraseñas) →{' '}
                <strong className="text-foreground">2.</strong> ChatGPT + Claude + Perplexity (IA) →{' '}
                <strong className="text-foreground">3.</strong> GitHub (codigo) →{' '}
                <strong className="text-foreground">4.</strong> Supabase (backend) →{' '}
                <strong className="text-foreground">5.</strong> Lovable (vibe coding) →{' '}
                <strong className="text-foreground">6.</strong> Vercel (deploy) →{' '}
                <strong className="text-foreground">7.</strong> El resto segun tu sesion actual
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search + Filters */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar herramienta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/[0.03] border-white/[0.08]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Limpiar busqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-2">
            {/* Session filters */}
            <div className="flex gap-1 flex-wrap">
              <button
                onClick={() => setActiveSession('all')}
                className={cn('px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all border',
                  activeSession === 'all' ? 'bg-white/[0.08] border-white/[0.15] text-foreground' : 'border-white/[0.06] text-muted-foreground hover:bg-white/[0.04]',
                )}
              >
                Todas
              </button>
              {(Object.keys(SESSION_CONFIG) as SessionTag[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSession(activeSession === s ? 'all' : s)}
                  className={cn('px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all border',
                    activeSession === s ? 'border-white/[0.15] text-foreground' : 'border-white/[0.06] text-muted-foreground hover:bg-white/[0.04]',
                  )}
                  style={activeSession === s ? { background: `hsl(${SESSION_CONFIG[s].hue} 40% 50% / 0.15)`, color: `hsl(${SESSION_CONFIG[s].hue} 60% 65%)` } : undefined}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/[0.06] self-center hidden sm:block" />

            {/* Pricing filters */}
            <div className="flex gap-1 flex-wrap">
              {(Object.keys(PRICING_CONFIG) as PricingType[]).map((p) => {
                const cfg = PRICING_CONFIG[p];
                return (
                  <button
                    key={p}
                    onClick={() => setActivePricing(activePricing === p ? 'all' : p)}
                    className={cn('px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all border',
                      activePricing === p ? `${cfg.color}` : 'border-white/[0.06] text-muted-foreground hover:bg-white/[0.04]',
                    )}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>

            <div className="w-px h-6 bg-white/[0.06] self-center hidden sm:block" />

            {/* Expand/Collapse */}
            <div className="flex gap-1">
              <button onClick={expandAll} className="px-2.5 py-1 rounded-lg text-[10px] font-mono border border-white/[0.06] text-muted-foreground hover:bg-white/[0.04] transition-all">
                Expandir
              </button>
              <button onClick={collapseAll} className="px-2.5 py-1 rounded-lg text-[10px] font-mono border border-white/[0.06] text-muted-foreground hover:bg-white/[0.04] transition-all">
                Colapsar
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-xs text-muted-foreground font-mono">
          {filtered.length} herramienta{filtered.length !== 1 ? 's' : ''}
          {activeSession !== 'all' && ` en ${SESSION_CONFIG[activeSession].label}`}
          {activePricing !== 'all' && ` (${PRICING_CONFIG[activePricing].label})`}
        </div>

        {/* Tool cards */}
        <div className="space-y-3 mb-12">
          {filtered.map((tool) => (
            <ToolCard
              key={tool.name}
              tool={tool}
              isOpen={openTools.has(tool.name)}
              onToggle={() => toggleTool(tool.name)}
            />
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No se encontraron herramientas con esos filtros</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('all'); setActiveSession('all'); setActivePricing('all'); }}
                className="text-xs text-primary hover:underline mt-2"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/[0.06] bg-gradient-to-r from-primary/5 to-accent/5 p-6 sm:p-8 text-center"
        >
          <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Ya tienes todo instalado?</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Con las herramientas listas, el siguiente paso es <strong className="text-foreground">personalizar tu IA</strong> para que trabaje como TU quieres, 
            y explorar los <strong className="text-foreground">workflows interactivos</strong> para automatizar tareas reales.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link to="/personalizacion-ia">
                <Layers className="w-4 h-4 mr-2" />
                Personalizar IA
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/[0.08]">
              <Link to="/workflows">
                <Zap className="w-4 h-4 mr-2" />
                Workflows
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/[0.08]">
              <Link to="/tools">
                <Wrench className="w-4 h-4 mr-2" />
                Catalogo de herramientas
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
