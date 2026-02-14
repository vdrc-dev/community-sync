import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, Database, GitBranch, Code2, ArrowRight, Clock, CheckCircle2, Play, ChevronRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const STEPS = [
  {
    tool: 'Gemini Canvas', time: '~10 min', icon: Sparkles, color: 'hsl(38 90% 55%)',
    action: 'Diseña el prototipo visual',
    detail: 'Describe tu idea en español. Canvas genera HTML/Tailwind. Itera con chat hasta el diseño perfecto.',
    output: 'Código HTML listo para copiar',
    tips: ['No uses Inter', 'Describe colores y tipografías', 'Audita el código generado'],
  },
  {
    tool: 'Lovable', time: '~30 min', icon: Rocket, color: 'hsl(330 70% 60%)',
    action: 'Construye la app con IA',
    detail: 'Pega tu diseño de Canvas o describe desde cero. Lovable genera React + Tailwind + Supabase automáticamente.',
    output: 'App funcional con URL pública',
    tips: ['Empieza siempre aquí', 'Backend con 1 click', 'Deploy instantáneo'],
  },
  {
    tool: 'Supabase', time: '~15 min', icon: Database, color: 'hsl(150 60% 50%)',
    action: 'Conecta datos reales',
    detail: 'Crea tablas, activa RLS, configura auth. Tu Excel se convierte en un modelo relacional profesional.',
    output: 'Base de datos PostgreSQL en la nube',
    tips: ['RLS protege los datos', 'Auth por dominio', 'API automática'],
  },
  {
    tool: 'GitHub', time: '~5 min', icon: GitBranch, color: 'hsl(280 70% 60%)',
    action: 'Versiona tu código',
    detail: 'Lovable sincroniza automáticamente. Tu código vive en la nube con historial completo.',
    output: 'Repositorio con historial completo',
    tips: ['Sincronización automática', 'Restaurar versiones', 'Colaboración'],
  },
  {
    tool: 'Cursor', time: 'Opcional', icon: Code2, color: 'hsl(185 70% 50%)',
    action: 'Ajustes de precisión',
    detail: 'Solo si Lovable no alcanza. Edita el código con IA directamente en tu máquina.',
    output: 'Código refinado al 100%',
    tips: ['Solo el último 20%', 'Multi-archivo', 'Precisión quirúrgica'],
  },
];

export function S4Slide11CompleteFlow() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];
  const Icon = step.icon;
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  // Calculate cumulative time
  const times = [10, 40, 55, 60, 60];
  const progress = ((activeStep + 1) / STEPS.length) * 100;

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_50%_50%,_hsl(185_60%_40%_/_0.06),_transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-6">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Aplicación</span>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight mt-2">El Flujo Completo</h1>
          <p className="text-white/30 text-sm mt-2">Haz clic en cada paso. De idea a app publicada en ~60 minutos.</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div {...m(0.1)} className="max-w-3xl mx-auto mb-6">
          <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${STEPS[0].color}, ${step.color})` }}
              animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px] text-white/20">Inicio</span>
            <span className="text-[10px] font-bold" style={{ color: step.color }}>~{times[activeStep]} min</span>
            <span className="text-[9px] text-white/20">App publicada</span>
          </div>
        </motion.div>

        {/* Pipeline steps */}
        <motion.div {...m(0.15)} className="flex items-center justify-center gap-2 mb-6">
          {STEPS.map((s, i) => {
            const SIcon = s.icon;
            const isActive = activeStep === i;
            const isDone = i < activeStep;
            return (
              <div key={s.tool} className="flex items-center gap-2">
                <motion.button onClick={() => setActiveStep(i)}
                  whileHover={isExporting ? {} : { scale: 1.05 }}
                  whileTap={isExporting ? {} : { scale: 0.97 }}
                  className={`relative flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border transition-all duration-300 ${isActive ? 'bg-white/[0.06] border-white/[0.15] scale-[1.05]' : isDone ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-white/[0.01] border-white/[0.04] opacity-40'}`}>
                  {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-b-full" style={{ background: s.color }} />}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color.replace(')', ` / ${isActive ? '0.15' : '0.06'})`)}`}}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" style={{ color: s.color }} /> : <SIcon className="w-5 h-5" style={{ color: s.color }} />}
                  </div>
                  <span className={`text-[10px] font-bold ${isActive ? 'text-white' : 'text-white/40'}`}>{s.tool}</span>
                  <span className="text-[8px] text-white/20">{s.time}</span>
                </motion.button>
                {i < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-white/10" />}
              </div>
            );
          })}
        </motion.div>

        {/* Active step detail */}
        <AnimatePresence mode="wait">
          <motion.div key={activeStep}
            initial={isExporting ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-5 gap-5 max-w-[1200px] mx-auto">
            
            {/* Left: Detail */}
            <div className="col-span-3 p-6 rounded-2xl border bg-white/[0.02]" style={{ borderColor: `${step.color}20` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${step.color.replace(')', ' / 0.12)')}`, border: `1px solid ${step.color.replace(')', ' / 0.25)')}` }}>
                  <Icon className="w-6 h-6" style={{ color: step.color }} />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{step.tool}</p>
                  <p className="text-xs" style={{ color: `${step.color.replace(')', ' / 0.7)')}` }}>{step.action}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: `${step.color.replace(')', ' / 0.08)')}` }}>
                  <Clock className="w-3 h-3" style={{ color: step.color }} />
                  <span className="text-xs font-bold" style={{ color: step.color }}>{step.time}</span>
                </div>
              </div>
              <p className="text-sm text-white/45 leading-relaxed mb-4">{step.detail}</p>
              <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01] flex items-center gap-3">
                <Play className="w-4 h-4 text-white/20" />
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Output</p>
                  <p className="text-xs text-white/50">{step.output}</p>
                </div>
              </div>
            </div>

            {/* Right: Tips */}
            <div className="col-span-2 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-4">Tips del Paso {activeStep + 1}</p>
              <div className="space-y-3">
                {step.tips.map((tip, i) => (
                  <motion.div key={i}
                    initial={isExporting ? {} : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: step.color }} />
                    <span className="text-xs text-white/45">{tip}</span>
                  </motion.div>
                ))}
              </div>

              {activeStep < STEPS.length - 1 && (
                <button onClick={() => setActiveStep(p => p + 1)}
                  className="mt-4 w-full p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center gap-2 hover:bg-white/[0.04] transition-colors">
                  <span className="text-xs font-bold text-white/40">Siguiente paso</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30" />
                </button>
              )}

              {activeStep === STEPS.length - 1 && (
                <div className="mt-4 p-3 rounded-lg border bg-emerald-500/[0.05] border-emerald-500/15 text-center">
                  <p className="text-xs font-bold text-emerald-400">🎉 ¡App publicada!</p>
                  <p className="text-[10px] text-white/30 mt-1">~60-90 minutos totales</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(185 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">APLICACIÓN</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
