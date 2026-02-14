import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { 
  Code, Bot, AlertTriangle, 
  Scissors, Brain, FolderTree, 
  Zap, Shield, Terminal,
  Award
} from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { SLIDES_DATA } from '../config';

const slideData = SLIDES_DATA[7];
const premiumEase = [0.22, 1, 0.36, 1];

const tools = [
  {
    name: 'Cursor',
    role: 'El Editor',
    icon: Code,
    metaphor: 'Es el bisturí. Entra al código que Lovable generó y cambia algo específico.',
    accentColor: 'hsl(270 60% 55%)',
    bgColor: 'hsl(270 40% 12%)',
    borderColor: 'hsl(270 50% 25% / 0.5)',
    features: [
      { 
        icon: Scissors, 
        title: 'Precisión quirúrgica', 
        desc: 'Para editar algo puntual sin romper nada' 
      },
      { 
        icon: Brain, 
        title: 'Tiene contexto', 
        desc: 'Sabe cómo está hecha tu app completa' 
      },
      { 
        icon: FolderTree, 
        title: 'Multi-archivo', 
        desc: 'Edita varios archivos a la vez' 
      },
    ],
  },
  {
    name: 'Claude Code',
    role: 'El Agente',
    subtitle: 'Agente terminal',
    icon: Terminal,
    metaphor: 'Es un empleado al que le das órdenes por chat y él opera la máquina por ti.',
    accentColor: 'hsl(200 70% 55%)',
    bgColor: 'hsl(200 40% 10%)',
    borderColor: 'hsl(200 50% 25% / 0.5)',
    features: [
      { 
        icon: Zap, 
        title: 'Ejecuta comandos', 
        desc: 'No solo escribe, hace cosas (instala, mueve, prueba)' 
      },
      { 
        icon: Shield, 
        title: 'Refactoriza + Tests', 
        desc: 'Mejora estructura, crea tests automáticos' 
      },
      { 
        icon: Bot, 
        title: 'Terminal Humana', 
        desc: 'Traduce lenguaje natural a comandos de sistema' 
      },
    ],
  },
];

export function Slide08CursorClaude() {
  const { isExporting } = useExportContext();
  const { config } = useGeneration();

  const getMotionProps = (delay: number) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.4, ease: premiumEase },
        };

  return (
    <ConsultingSlideLayout
      slideNumber={slideData.id}
      sectionNumber={slideData.sectionNumber}
      sectionTitle={slideData.section}
      title="El Stack de Precisión"
      storyline="Herramientas para el 'ajuste fino' donde Lovable no llega."
    >
      <div className="h-full flex flex-col gap-4 min-h-0">
        {/* Warning Badge with 20% indicator */}
        <motion.div
          className="p-4 rounded-2xl shrink-0 flex items-center justify-between"
          style={{
            backgroundColor: 'hsl(40 40% 8%)',
            border: '2px solid hsl(40 50% 30% / 0.5)',
          }}
          {...getMotionProps(0.1)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <p className="text-xl font-black text-foreground">
                NIVEL: AVANZADO — <span className="text-amber-400">Opcional</span>
              </p>
              <p className="text-base text-muted-foreground">
                Solo cuando Lovable no es suficiente.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black text-amber-400">20%</span>
            <p className="text-sm text-muted-foreground">El tramo final</p>
          </div>
        </motion.div>

        {/* Tools grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="p-5 rounded-2xl flex flex-col overflow-hidden relative"
              style={{
                backgroundColor: tool.bgColor,
                border: `2px solid ${tool.borderColor}`,
              }}
              {...getMotionProps(0.15 + i * 0.08)}
            >
              {/* Accent top bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: tool.accentColor }}
              />

              {/* Header */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${tool.accentColor}20` }}
                >
                  <tool.icon className="w-8 h-8" style={{ color: tool.accentColor }} />
                </div>
                <div>
                  <h4 className="font-black text-2xl text-foreground">{tool.name}</h4>
                  <p className="text-base text-muted-foreground">
                    {tool.role}
                    {tool.subtitle && <span className="text-slate-500"> — {tool.subtitle}</span>}
                  </p>
                </div>
              </div>

              {/* Metaphor Quote */}
              <div 
                className="mb-4 pl-4 py-2"
                style={{ borderLeft: `3px solid ${tool.accentColor}40` }}
              >
                <p className="text-base italic text-muted-foreground leading-relaxed">
                  "{tool.metaphor}"
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 flex-1">
                {tool.features.map((f, j) => (
                  <div 
                    key={j} 
                    className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${tool.accentColor}15` }}
                    >
                      <f.icon className="w-4 h-4" style={{ color: tool.accentColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-foreground">{f.title}</p>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Golden Rule Section */}
        <motion.div
          className="p-4 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(45 30% 6%)',
            border: '1px solid hsl(45 50% 25% / 0.5)',
          }}
          {...getMotionProps(0.35)}
        >
          {/* Rule Title */}
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-6 h-6 text-amber-400" />
            <h3 className="font-black text-lg text-foreground">
              La Regla de Oro (Ley del 80/20)
            </h3>
          </div>
          
          {/* Rule Body */}
          <p className="text-base text-muted-foreground mb-3">
            <span className="text-pink-400 font-bold">Lovable</span> te resuelve el 
            <span className="text-foreground font-bold"> 80%</span> (Estructura y Diseño).
            <span className="text-purple-400 font-bold"> Cursor + Claude</span> son para el 
            <span className="text-foreground font-bold"> 20%</span> restante (Detalles y Lógica compleja).
          </p>
          
          {/* Quote */}
          <div 
            className="p-3 rounded-xl bg-amber-500/5"
            style={{ borderLeft: '4px solid hsl(45 80% 50%)' }}
          >
            <p className="italic text-base text-muted-foreground">
              "Empieza siempre con Lovable. Solo baja al código (Cursor) para cerrar ese último 20%."
            </p>
            <p className="mt-2 font-semibold text-amber-400 text-sm">— {config.instructor}</p>
          </div>
        </motion.div>
      </div>
    </ConsultingSlideLayout>
  );
}
