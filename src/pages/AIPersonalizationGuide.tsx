import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Layers, Lock, Brain, Bot, Code2, Cpu, ChevronDown, ChevronRight,
  Sparkles, CheckCircle2, Copy, Check, ExternalLink, ArrowRight,
  Lightbulb, Zap, Shield, Star, Settings, MessageSquare, Database,
  User, Target, BookOpen, Rocket, Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════
   5 CAPAS DE PERSONALIZACION — Guia interactiva basada en el 
   contenido del taller VDRC (Sesion 2: IA & Productividad)
   ═══════════════════════════════════════════════════════════════ */

type LayerDifficulty = 'basico' | 'intermedio' | 'avanzado';

interface LayerStep {
  title: string;
  description: string;
}

interface LayerTemplate {
  label: string;
  text: string;
}

interface Layer {
  number: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  hue: number;
  difficulty: LayerDifficulty;
  description: string;
  whyItMatters: string;
  steps: LayerStep[];
  templates: LayerTemplate[];
  proTip: string;
  timeToSetup: string;
  impact: string;
  platforms: string[];
}

const LAYERS: Layer[] = [
  {
    number: 1,
    title: 'Custom Instructions',
    subtitle: 'Dile a la IA quien eres',
    icon: User,
    hue: 160,
    difficulty: 'basico',
    description: 'Las Custom Instructions son tu tarjeta de presentacion permanente para ChatGPT. Se aplican a TODAS las conversaciones futuras, sin necesidad de repetirte. Es como tener un asistente que ya sabe quien eres.',
    whyItMatters: 'Sin Custom Instructions, cada conversacion empieza de cero. Con ellas, ChatGPT ya sabe tu rol, industria, nivel tecnico y como quieres las respuestas.',
    steps: [
      { title: 'Abre ChatGPT', description: 'Ve a Settings > Personalization > Custom Instructions' },
      { title: 'Completa "Que quieres que ChatGPT sepa de ti"', description: 'Incluye: tu rol profesional, industria, experiencia, herramientas que usas, objetivos actuales' },
      { title: 'Completa "Como quieres que responda"', description: 'Define: tono (formal/casual), idioma, formato preferido (bullets, tablas, codigo), nivel de detalle' },
      { title: 'Guarda y prueba', description: 'Abre un nuevo chat y nota la diferencia: las respuestas ya estan calibradas a ti' },
    ],
    templates: [
      {
        label: 'Profesional de negocios',
        text: `¿Que quieres que sepa de ti?
Soy [tu cargo] en [tu empresa/industria]. Trabajo con equipos de [X personas]. Mis herramientas principales son [lista]. Mi objetivo actual es [meta]. Tengo experiencia [nivel] en tecnologia.

¿Como quieres que responda?
- Responde en espanol
- Usa formato ejecutivo: bullets, negritas, tablas cuando aplique
- Se directo, sin relleno
- Si pido codigo, incluye comentarios explicativos
- Cuando haya alternativas, presenta pros/contras
- Sugiere mejoras aunque no las pida`,
      },
      {
        label: 'Emprendedor / Freelance',
        text: `¿Que quieres que sepa de ti?
Soy emprendedor en [industria]. Mi negocio es [descripcion breve]. Trabajo solo / con equipo de [X]. Mis herramientas son [lista]. Mis clientes son [perfil]. Mi presupuesto es limitado.

¿Como quieres que responda?
- Responde en espanol, tono cercano pero profesional
- Prioriza soluciones rapidas y de bajo costo
- Incluye alternativas gratuitas cuando existan
- Formato practico: pasos numerados, links utiles
- Cuando sea posible, incluye estimaciones de tiempo
- Sugiere automatizaciones con herramientas que ya uso`,
      },
      {
        label: 'Profesional tecnico',
        text: `¿Que quieres que sepa de ti?
Soy [desarrollador/ingeniero/cientifico de datos] con [X] años de experiencia. Stack principal: [tecnologias]. Trabajo en [tipo de proyectos]. Nivel de IA: [basico/intermedio/avanzado].

¿Como quieres que responda?
- Responde en espanol tecnico (puedes usar terminos en ingles del stack)
- Codigo: siempre con tipos, comentarios, y manejo de errores
- Explica el "por que" detras de cada decision tecnica
- Sugiere mejores practicas y patrones de diseño
- Si pregunto algo simple, responde conciso
- Si pregunto algo complejo, estructura con secciones`,
      },
    ],
    proTip: 'Tu Custom Instruction es un documento vivo. Actualizalo cada mes cuando cambien tus prioridades. La version 1 nunca es la mejor — itera.',
    timeToSetup: '5 minutos',
    impact: 'Alto — mejora TODAS tus conversaciones futuras',
    platforms: ['ChatGPT'],
  },
  {
    number: 2,
    title: 'Memory',
    subtitle: 'La IA que aprende de ti',
    icon: Brain,
    hue: 263,
    difficulty: 'basico',
    description: 'Memory permite que ChatGPT recuerde informacion entre conversaciones. Va construyendo un perfil de ti con el tiempo: tus preferencias, proyectos, estilo de trabajo, y hasta nombres de tus colegas.',
    whyItMatters: 'Custom Instructions son estaticas. Memory es dinamica — ChatGPT aprende organicamente de cada interaccion. Es la diferencia entre un asistente nuevo y uno que ya te conoce.',
    steps: [
      { title: 'Activa Memory', description: 'Ve a Settings > Personalization > Memory y activalo' },
      { title: 'Entrena activamente', description: 'Dile cosas como: "Recuerda que mi equipo usa Notion para documentacion" o "Siempre prefiero Python sobre JavaScript"' },
      { title: 'Revisa lo que recuerda', description: 'En Settings > Personalization > Manage Memory puedes ver, editar y borrar memorias especificas' },
      { title: 'Complementa con Custom Instructions', description: 'Memory y Custom Instructions trabajan juntas. La memoria agrega contexto que va mas alla de lo estatico' },
    ],
    templates: [
      {
        label: 'Semilla de memoria inicial',
        text: `Quiero que recuerdes lo siguiente para futuras conversaciones:
- Mi nombre es [nombre]
- Trabajo en [empresa] como [cargo]
- Mi equipo: [nombres y roles clave]
- Herramientas del dia a dia: [lista]
- Proyecto actual: [descripcion breve]
- Mis KPIs: [metricas importantes]
- Prefiero respuestas en [idioma/formato]
- Mi zona horaria: [zona]`,
      },
      {
        label: 'Corregir memoria',
        text: `Corrige tu memoria sobre [tema]. Lo correcto es: [informacion actualizada]. Olvida la version anterior.`,
      },
    ],
    proTip: 'Revisa tu memoria cada 2 semanas. A veces ChatGPT guarda cosas irrelevantes o desactualizadas. Piensa en ello como limpiar tu escritorio digital.',
    timeToSetup: '2 minutos (activar) + continuo',
    impact: 'Medio-Alto — mejora incrementalmente con el uso',
    platforms: ['ChatGPT'],
  },
  {
    number: 3,
    title: 'GPTs Personalizados',
    subtitle: 'Bots especializados para tareas repetitivas',
    icon: Bot,
    hue: 340,
    difficulty: 'intermedio',
    description: 'Los GPTs son versiones personalizadas de ChatGPT diseñadas para una tarea especifica. Tienen sus propias instrucciones, conocimiento (archivos) y hasta acciones (APIs). Es como tener un equipo de asistentes especializados.',
    whyItMatters: 'En vez de re-explicar el contexto cada vez que necesitas hacer algo repetitivo, creas un GPT que ya sabe exactamente que hacer. Automatiza lo que repites.',
    steps: [
      { title: 'Ve al GPT Builder', description: 'En ChatGPT, ve a Explore GPTs > Create. Puedes usar el builder conversacional o configurar manualmente' },
      { title: 'Define el proposito', description: 'Se especifico: "Este GPT redacta correos de seguimiento a clientes B2B con tono profesional y urgencia calibrada"' },
      { title: 'Agrega conocimiento', description: 'Sube archivos de referencia: guias de estilo, templates, datos de tu empresa, SOPs, manuales' },
      { title: 'Configura las instrucciones', description: 'Escribe un system prompt detallado con: rol, formato de salida, restricciones, ejemplos de output ideal' },
      { title: 'Prueba e itera', description: 'Probalo con 5-10 casos reales. Ajusta las instrucciones hasta que el output sea consistente' },
    ],
    templates: [
      {
        label: 'GPT para emails profesionales',
        text: `Nombre: Email Pro [Tu Empresa]
Instrucciones: Eres un redactor de emails profesionales para [empresa]. 
- Tono: [formal pero cercano / corporativo / casual]
- Estructura: saludo breve, cuerpo con 2-3 parrafos cortos, CTA claro, cierre
- Firma: [formato de firma]
- Maximo: 200 palabras
- Siempre pregunta: ¿quien es el destinatario? ¿cual es el objetivo? ¿hay contexto previo?
Conocimiento: [sube guia de tono, emails exitosos previos]`,
      },
      {
        label: 'GPT para analisis de documentos',
        text: `Nombre: Analista de Docs
Instrucciones: Analizas documentos y entregas resúmenes ejecutivos.
- Formato de salida: 1) Resumen (3 lineas), 2) Puntos clave (5-7 bullets), 3) Riesgos o gaps, 4) Preguntas pendientes, 5) Recomendaciones
- Si el documento es tecnico, traduce a lenguaje ejecutivo
- Si encuentras datos numericos, presenta comparaciones y tendencias
- Siempre sugiere 3 preguntas de follow-up
Conocimiento: [sube documentos de referencia de tu industria]`,
      },
      {
        label: 'GPT para contenido de redes',
        text: `Nombre: Social Media [Tu Marca]
Instrucciones: Creas contenido para redes sociales de [marca].
- Plataformas: [LinkedIn / Instagram / Twitter / TikTok]
- Pilares de contenido: [educativo, entretenimiento, venta, comunidad]
- Tono de voz: [describe personalidad de la marca]
- Formatos: carrusel, post, story, reel script, thread
- Incluye: hashtags relevantes, CTA, hook en la primera linea
- Calendario: sugiere publicaciones para 1 semana
Conocimiento: [sube brand guidelines, posts exitosos previos]`,
      },
    ],
    proTip: 'Los mejores GPTs no son genericos — son ultra-especificos. "GPT de contenido" es malo. "GPT que escribe carruseles de LinkedIn sobre fintech en español con datos" es excelente.',
    timeToSetup: '15-30 minutos por GPT',
    impact: 'Muy Alto — elimina tareas repetitivas',
    platforms: ['ChatGPT Plus', 'ChatGPT Team', 'ChatGPT Enterprise'],
  },
  {
    number: 4,
    title: 'API + System Prompt',
    subtitle: 'Control total para desarrolladores',
    icon: Code2,
    hue: 200,
    difficulty: 'avanzado',
    description: 'La API de OpenAI te da acceso directo al modelo con un System Prompt que defines tu. Es la version sin limites: controlas temperatura, tokens, formato de respuesta, y puedes integrar IA en cualquier app o workflow.',
    whyItMatters: 'Las capas anteriores dependen de la interfaz de ChatGPT. Con la API, integras IA directamente en tu software, automatizaciones, dashboards, y procesos internos.',
    steps: [
      { title: 'Crea tu cuenta de API', description: 'Ve a platform.openai.com > Sign Up > Agrega metodo de pago (pay-as-you-go)' },
      { title: 'Genera una API Key', description: 'En API Keys, crea una nueva. Guardala en un lugar seguro (nunca en codigo publico)' },
      { title: 'Diseña tu System Prompt', description: 'El system prompt es la instruccion maestra. Define personalidad, restricciones, formato, y comportamiento del modelo' },
      { title: 'Configura parametros', description: 'Temperature (0-2): creatividad. Max tokens: largo de respuesta. Model: gpt-4o, gpt-4o-mini, etc.' },
      { title: 'Integra en tu stack', description: 'Usa la API desde Python, JavaScript, Make, Zapier, n8n, o cualquier herramienta que soporte HTTP requests' },
    ],
    templates: [
      {
        label: 'System Prompt para asistente interno',
        text: `{
  "model": "gpt-4o",
  "temperature": 0.3,
  "system": "Eres el asistente interno de [empresa]. Tu rol es ayudar al equipo con: 1) Responder preguntas sobre procesos internos, 2) Redactar documentos siguiendo la guia de estilo corporativa, 3) Analizar datos y generar reportes. Reglas: responde SIEMPRE en español, usa formato markdown, nunca inventes datos — si no sabes, dilo. Fuentes: [lista de documentos internos cargados como contexto]."
}`,
      },
      {
        label: 'System Prompt para chatbot de producto',
        text: `{
  "model": "gpt-4o-mini",
  "temperature": 0.5,
  "system": "Eres el asistente de soporte de [producto]. Responde preguntas sobre features, precios, y uso. Tono: amigable y conciso. Si la pregunta es sobre un bug, pide: 1) version, 2) pasos para reproducir, 3) screenshot. Si no puedes resolver, escala a soporte humano con el tag #ESCALACION. Nunca prometas features que no existen."
}`,
      },
    ],
    proTip: 'GPT-4o-mini es 10-20x mas barato que GPT-4o y excelente para el 80% de los casos. Usa GPT-4o solo cuando necesites razonamiento complejo o vision.',
    timeToSetup: '30-60 minutos (primera vez)',
    impact: 'Muy Alto — integra IA en cualquier proceso',
    platforms: ['OpenAI API', 'Azure OpenAI', 'Compatible con Make/Zapier/n8n'],
  },
  {
    number: 5,
    title: 'Fine-tuning',
    subtitle: 'Entrena tu propio modelo',
    icon: Cpu,
    hue: 45,
    difficulty: 'avanzado',
    description: 'Fine-tuning es entrenar el modelo con TUS datos para que responda exactamente como necesitas. El modelo aprende tu estilo, terminologia, formatos y criterios. Es la personalizacion maxima.',
    whyItMatters: 'Para empresas con alto volumen de consultas repetitivas, fine-tuning reduce costos (menos tokens en prompts), mejora consistencia, y es mas rapido que enviar contexto largo en cada request.',
    steps: [
      { title: 'Prepara tu dataset', description: 'Crea un archivo JSONL con pares de pregunta-respuesta ideales. Minimo 50-100 ejemplos, idealmente 500+' },
      { title: 'Formato correcto', description: 'Cada linea: {"messages": [{"role":"system","content":"..."}, {"role":"user","content":"..."}, {"role":"assistant","content":"..."}]}' },
      { title: 'Sube y entrena', description: 'Via API o Dashboard: sube el archivo, selecciona modelo base (gpt-4o-mini recomendado), configura epochs' },
      { title: 'Evalua resultados', description: 'Prueba con casos reales. Compara output del modelo fine-tuned vs el base. Mide: precision, consistencia, tono' },
      { title: 'Itera', description: 'Si no es perfecto, agrega mas ejemplos en las areas debiles y re-entrena. El fine-tuning es iterativo' },
    ],
    templates: [
      {
        label: 'Ejemplo de formato JSONL',
        text: `{"messages":[{"role":"system","content":"Eres un asistente de ventas de [empresa]. Respondes consultas sobre productos con precision y tono profesional."},{"role":"user","content":"¿Cual es el precio del plan premium?"},{"role":"assistant","content":"El plan Premium tiene un costo de $99/mes (facturado anualmente) o $129/mes (facturado mensualmente). Incluye: acceso ilimitado, soporte prioritario, y reportes avanzados. ¿Te gustaria agendar una demo?"}]}
{"messages":[{"role":"system","content":"Eres un asistente de ventas de [empresa]. Respondes consultas sobre productos con precision y tono profesional."},{"role":"user","content":"¿Tienen descuento para startups?"},{"role":"assistant","content":"Si, tenemos el programa Startup Growth: 50% de descuento el primer año para empresas con menos de 2 años y menos de $1M ARR. Requisitos: pitch deck + certificado de incorporacion. ¿Quieres que te envie el formulario de aplicacion?"}]}`,
      },
    ],
    proTip: 'Fine-tuning NO es para todos. Si puedes resolver el problema con un buen prompt + Custom Instructions + GPTs, no necesitas fine-tuning. Usalo solo cuando el volumen y la consistencia lo justifiquen.',
    timeToSetup: '2-8 horas (incluyendo preparacion de datos)',
    impact: 'Maximo — modelo entrenado especificamente para tu caso',
    platforms: ['OpenAI API', 'Azure OpenAI', 'Requiere plan de pago'],
  },
];

const DIFFICULTY_CONFIG: Record<LayerDifficulty, { label: string; color: string; icon: React.ElementType }> = {
  basico: { label: 'Basico', color: 'text-green-400 bg-green-500/10 border-green-500/20', icon: CheckCircle2 },
  intermedio: { label: 'Intermedio', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', icon: Zap },
  avanzado: { label: 'Avanzado', color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: Rocket },
};

const PLATFORMS_COMPARISON = [
  { name: 'ChatGPT', icon: '🤖', layers: [true, true, true, true, true], note: 'Mas completo en personalizacion' },
  { name: 'Claude', icon: '🧠', layers: [true, false, true, true, false], note: 'Projects + System Prompts' },
  { name: 'Gemini', icon: '💎', layers: [true, true, true, true, false], note: 'Gems = GPTs de Google' },
  { name: 'Perplexity', icon: '🔍', layers: [true, false, false, true, false], note: 'Enfocado en busqueda' },
  { name: 'Copilot', icon: '✈️', layers: [true, true, false, true, false], note: 'Integrado a Microsoft 365' },
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
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  );
}

function LayerCard({ layer, isOpen, onToggle }: { layer: Layer; isOpen: boolean; onToggle: () => void }) {
  const diff = DIFFICULTY_CONFIG[layer.difficulty];
  const DiffIcon = diff.icon;

  return (
    <motion.div
      layout
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/[0.12]"
      style={{ boxShadow: isOpen ? `0 0 40px hsl(${layer.hue} 60% 40% / 0.08)` : 'none' }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-5 sm:p-6 flex items-center gap-4 text-left group"
      >
        {/* Layer number */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-mono font-bold transition-transform group-hover:scale-105"
          style={{ background: `hsl(${layer.hue} 50% 50% / 0.12)`, color: `hsl(${layer.hue} 70% 60%)` }}
        >
          <layer.icon className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-mono text-xs tracking-wider text-muted-foreground">CAPA {layer.number}</span>
            <Badge variant="outline" className={cn('text-[10px] border', diff.color)}>
              <DiffIcon className="w-3 h-3 mr-1" />
              {diff.label}
            </Badge>
            <span className="text-[10px] text-muted-foreground/60 font-mono">{layer.timeToSetup}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground truncate">{layer.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{layer.subtitle}</p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 sm:px-6 pb-6 space-y-6 border-t border-white/[0.04] pt-5">
              {/* Description */}
              <div>
                <p className="text-sm text-foreground/80 leading-relaxed">{layer.description}</p>
              </div>

              {/* Why it matters */}
              <div className="rounded-xl p-4 border border-white/[0.06]" style={{ background: `hsl(${layer.hue} 40% 50% / 0.06)` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4" style={{ color: `hsl(${layer.hue} 70% 60%)` }} />
                  <span className="text-sm font-semibold">Por que importa</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{layer.whyItMatters}</p>
              </div>

              {/* Steps */}
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  Como configurar
                </h4>
                <div className="space-y-3">
                  {layer.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3"
                    >
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold mt-0.5"
                        style={{ background: `hsl(${layer.hue} 50% 50% / 0.15)`, color: `hsl(${layer.hue} 70% 60%)` }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{step.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Templates */}
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-accent" />
                  Plantillas listas para usar
                </h4>
                <div className="space-y-3">
                  {layer.templates.map((tmpl, i) => (
                    <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{tmpl.label}</span>
                        <CopyButton text={tmpl.text} />
                      </div>
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-40 overflow-y-auto no-scrollbar">
                        {tmpl.text}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro tip */}
              <div className="rounded-xl p-4 bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-semibold text-primary">PRO TIP</span>
                    <p className="text-sm text-foreground/80 mt-1">{layer.proTip}</p>
                  </div>
                </div>
              </div>

              {/* Impact & platforms */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-xs border-white/[0.08] bg-white/[0.03]">
                  <Target className="w-3 h-3 mr-1 text-accent" />
                  Impacto: {layer.impact}
                </Badge>
                {layer.platforms.map((p) => (
                  <Badge key={p} variant="outline" className="text-xs border-white/[0.06] text-muted-foreground">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Page ─── */

export default function AIPersonalizationGuide() {
  const [openLayers, setOpenLayers] = useState<Set<number>>(new Set([1]));
  const [showComparison, setShowComparison] = useState(false);

  const toggleLayer = (n: number) => {
    setOpenLayers((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  const expandAll = () => setOpenLayers(new Set(LAYERS.map((l) => l.number)));
  const collapseAll = () => setOpenLayers(new Set());

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageHeader
          title="Guia de Personalizacion IA"
          description="Las 5 capas para convertir ChatGPT en un asistente que realmente te conoce. De lo basico a lo avanzado — con plantillas listas para copiar y pegar."
          breadcrumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Personalizacion IA' },
          ]}
          showBack
          meta={
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~12 min de lectura</span>
              <span>5 capas interactivas</span>
            </div>
          }
        />

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Layer pyramid */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              {LAYERS.slice().reverse().map((l) => (
                <motion.div
                  key={l.number}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (5 - l.number) * 0.1 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all hover:scale-105"
                  style={{
                    width: `${80 + l.number * 24}px`,
                    background: `hsl(${l.hue} 40% 50% / ${openLayers.has(l.number) ? 0.2 : 0.08})`,
                    color: `hsl(${l.hue} 70% 65%)`,
                    border: `1px solid hsl(${l.hue} 50% 50% / ${openLayers.has(l.number) ? 0.3 : 0.1})`,
                  }}
                  onClick={() => toggleLayer(l.number)}
                >
                  <l.icon className="w-3.5 h-3.5" />
                  <span className="truncate">{l.title}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex-1">
              <Badge variant="outline" className="mb-3 text-xs font-mono border-primary/20 text-primary bg-primary/5">
                <Layers className="w-3 h-3 mr-1.5" />
                SESION 2 — IA & PRODUCTIVIDAD
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">5 Capas de Personalizacion</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                La mayoria de las personas solo usa ChatGPT "de fabrica". Cada capa que activas es un salto en calidad de respuestas. 
                Empieza por la Capa 1 (5 minutos) y ve subiendo a tu ritmo.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Button variant="outline" size="sm" onClick={expandAll} className="text-xs border-white/[0.08] hover:bg-white/[0.05]">
                  Expandir todas
                </Button>
                <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs border-white/[0.08] hover:bg-white/[0.05]">
                  Colapsar
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowComparison(!showComparison)} className="text-xs border-white/[0.08] hover:bg-white/[0.05]">
                  {showComparison ? 'Ocultar' : 'Ver'} comparacion plataformas
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform comparison table */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  Comparacion de plataformas
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left py-2 pr-3 font-mono text-muted-foreground">Plataforma</th>
                        {LAYERS.map((l) => (
                          <th key={l.number} className="text-center py-2 px-2 font-mono text-muted-foreground whitespace-nowrap">
                            C{l.number}
                          </th>
                        ))}
                        <th className="text-left py-2 pl-3 font-mono text-muted-foreground">Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PLATFORMS_COMPARISON.map((p) => (
                        <tr key={p.name} className="border-b border-white/[0.03]">
                          <td className="py-2.5 pr-3 font-medium whitespace-nowrap">
                            {p.icon} {p.name}
                          </td>
                          {p.layers.map((has, i) => (
                            <td key={i} className="text-center py-2.5 px-2">
                              {has ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                              ) : (
                                <span className="text-muted-foreground/30">—</span>
                              )}
                            </td>
                          ))}
                          <td className="py-2.5 pl-3 text-muted-foreground">{p.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="mb-6 flex items-center gap-2">
          {LAYERS.map((l) => (
            <button
              key={l.number}
              onClick={() => toggleLayer(l.number)}
              className="flex-1 h-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: openLayers.has(l.number)
                  ? `hsl(${l.hue} 60% 50%)`
                  : 'hsl(0 0% 100% / 0.06)',
              }}
              aria-label={`Capa ${l.number}: ${l.title}`}
            />
          ))}
        </div>

        {/* Layer cards */}
        <div className="space-y-4 mb-12">
          {LAYERS.map((layer) => (
            <LayerCard
              key={layer.number}
              layer={layer}
              isOpen={openLayers.has(layer.number)}
              onToggle={() => toggleLayer(layer.number)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/[0.06] bg-gradient-to-r from-primary/5 to-accent/5 p-6 sm:p-8 text-center"
        >
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Tu proximos pasos</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Si no has configurado nada, empieza por la <strong className="text-foreground">Capa 1 (Custom Instructions)</strong> — son 5 minutos que transforman todas tus conversaciones con IA. 
            Despues, activa la <strong className="text-foreground">Capa 2 (Memory)</strong> y dejalo trabajar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link to="/playground">
                <Sparkles className="w-4 h-4 mr-2" />
                Probar en Lab IA
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/[0.08]">
              <Link to="/dictionary">
                <BookOpen className="w-4 h-4 mr-2" />
                Diccionario IA
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/[0.08]">
              <Link to="/tools">
                <Zap className="w-4 h-4 mr-2" />
                Herramientas IA
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
