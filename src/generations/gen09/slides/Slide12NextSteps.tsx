import { motion } from 'framer-motion';
import { ConsultingSlideLayout } from '@/components/presentation/ConsultingSlideLayout';
import { Rocket, UserPlus, Sparkles, Target, BookOpen, Zap, CheckCircle2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { ProgressTrack } from '@/components/presentation/mockups';
import { SLIDES_DATA } from '../config';

const slideData = SLIDES_DATA[11];
const premiumEase = [0.22, 1, 0.36, 1];

const nextSteps = [
  { 
    number: '1', 
    title: 'Crear cuentas', 
    icon: UserPlus,
    items: ['Lovable.dev', 'Supabase.com', 'GitHub.com']
  },
  { 
    number: '2', 
    title: 'Primera app', 
    icon: Sparkles,
    items: ['Describe una idea', 'Itera con chat', 'Publica']
  },
  { 
    number: '3', 
    title: 'Practica', 
    icon: Target,
    items: ['Haz una app por semana', 'Itera sobre errores', 'Documenta aprendizajes']
  },
];

export function Slide12NextSteps() {
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

  const progressSteps = [
    { label: 'Crear cuentas', icon: UserPlus, completed: false, current: true },
    { label: 'Primera app', icon: Sparkles, completed: false, current: false },
    { label: 'Practica semanal', icon: Target, completed: false, current: false },
    { label: 'Portafolio', icon: Zap, completed: false, current: false },
  ];

  return (
    <ConsultingSlideLayout
      slideNumber={slideData.id}
      sectionNumber={slideData.sectionNumber}
      sectionTitle={slideData.section}
      title={slideData.title}
      storyline={slideData.storyline}
    >
      <div className="h-full flex flex-col gap-4 min-h-0">
        {/* Main task */}
        <motion.div
          className="p-5 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(160 30% 8%)',
            border: '2px solid hsl(160 40% 25% / 0.4)',
          }}
          {...getMotionProps(0.1)}
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Rocket className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-foreground mb-1">Tu tarea para hoy</h3>
              <p className="text-lg text-muted-foreground">
                Crea tu cuenta en <span className="text-foreground font-bold">Lovable</span> y construye tu primera app. 
                <span className="text-emerald-400 font-bold"> No importa si es simple.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Track Visual */}
        <motion.div
          className="p-5 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(220 15% 6%)',
            border: '2px solid hsl(0 0% 100% / 0.08)',
          }}
          {...getMotionProps(0.15)}
        >
          <p className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">Tu camino de aprendizaje</p>
          <ProgressTrack 
            steps={progressSteps}
            variant="horizontal"
          />
        </motion.div>

        {/* Three columns */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
          {nextSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="p-5 rounded-2xl flex flex-col"
              style={{
                backgroundColor: 'hsl(220 15% 7%)',
                border: '2px solid hsl(0 0% 100% / 0.08)',
              }}
              {...getMotionProps(0.2 + i * 0.06)}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'hsl(160 30% 15%)' }}
                >
                  <span className="text-xl font-black text-emerald-400">{step.number}</span>
                </div>
                <h4 className="font-black text-xl text-foreground">{step.title}</h4>
              </div>

              {/* Items */}
              <ul className="space-y-2 flex-1">
                {step.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-base text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          className="p-5 rounded-2xl text-center shrink-0"
          style={{
            backgroundColor: 'hsl(220 15% 6%)',
            border: '2px solid hsl(160 40% 25% / 0.3)',
          }}
          {...getMotionProps(0.4)}
        >
          <p className="text-2xl font-black text-foreground mb-1">
            ¡Gracias Generación {String(config.generation).padStart(2, '0')}!
          </p>
          <p className="text-lg text-muted-foreground">
            Es hora de <span className="text-emerald-400 font-bold">crear</span>. — {config.instructor}
          </p>
        </motion.div>

        {/* Note */}
        <motion.div
          className="p-4 rounded-2xl shrink-0"
          style={{
            backgroundColor: 'hsl(45 50% 10% / 0.5)',
            borderLeft: '4px solid hsl(45 70% 50%)',
          }}
          {...getMotionProps(0.45)}
        >
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-lg text-muted-foreground">
              Esta presentación está disponible en el <span className="text-foreground font-bold">Portal VDRC</span> para consultar después.
            </p>
          </div>
        </motion.div>
      </div>
    </ConsultingSlideLayout>
  );
}
