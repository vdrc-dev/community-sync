import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, Database, GitBranch, Code2, ArrowRight, Clock, CheckCircle2, Play, ChevronRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S4Atmosphere } from './S4Atmosphere';
import { S4Footer } from './S4Footer';
import { S4TeachingRibbon } from './S4TeachingRibbon';

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
    detail: 'Pega tu diseño de Canvas o describe desde cero. Lovable genera React + Tailwind automáticamente. Usa Plan antes de lanzar — Lovable se "auto-promptea". 80% del tiempo trabaja con plan prendido.',
    output: 'App funcional con URL pública',
    tips: ['Usa botón Plan siempre', 'Visual Edits: más contexto', 'Empieza siempre aquí'],
  },
  {
    tool: 'Supabase', time: '~15 min', icon: Database, color: 'hsl(150 60% 50%)',
    action: 'Conecta datos reales',
    detail: 'Crea tablas, activa RLS, configura auth. Pídele: "Documenta tablas y columnas con lenguaje natural." Cualquier IA futura entenderá tu base sin que le expliques nada.',
    output: 'Base de datos PostgreSQL documentada',
    tips: ['RLS protege los datos', 'Documenta siempre las tablas', 'API automática'],
  },
  {
    tool: 'GitHub', time: '~5 min', icon: GitBranch, color: 'hsl(280 70% 60%)',
    action: 'Versiona tu código',
    detail: 'Lovable sincroniza automáticamente. El código le pertenece a la empresa, no a la persona. Si alguien se va, el código queda. README genérico → pídele "Actualiza el README con lenguaje claro."',
    output: 'Repositorio org con historial completo',
    tips: ['Código de la empresa', 'README con IA', 'Restaurar versiones'],
  },
  {
    tool: 'Vercel', time: '~10 min', icon: Code2, color: 'hsl(185 70% 50%)',
    action: 'Deploy con dominio propio',
    detail: 'La URL de Lovable es temporal. Conecta tu dominio real via Vercel. El flujo real de clase fue: Lovable → Supabase → GitHub → Vercel → madcharlies.cl. Deploy automático en cada commit.',
    output: 'App en tu dominio propio · madcharlies.cl',
    tips: ['Dominio real (ej: madcharlies.cl)', 'Deploy en cada commit', 'URL Lovable es temporal'],
  },
  {
    tool: 'Cursor', time: 'Opcional', icon: Code2, color: 'hsl(38 80% 55%)',
    action: 'Ajustes de precisión',
    detail: 'Solo si Lovable no alcanza el 100%. Edita el código con IA directamente en tu máquina. "Better done than perfect. Láncense y rompan cosas. Lo peligroso es solo cuando ya lo usa todo el equipo." — Pablo',
    output: 'Código refinado al 100%',
    tips: ['Solo el último 20%', 'Multi-archivo', 'Better done than perfect'],
  },
];

export function S4Slide11CompleteFlow() {
  const { isExporting } = useExportContext();
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];
  const Icon = step.icon;
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.06, duration: 0.75 } };

  // Calculate cumulative time
  const times = [10, 40, 55, 60, 70, 75];
  const progress = ((activeStep + 1) / STEPS.length) * 100;

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <S4Atmosphere isExporting={isExporting} particleCount={14} primaryHue={185} secondaryHue={330} tertiaryHue={38} showAurora showPlasma intensity={1.05} />
      <S4TeachingRibbon
        isExporting={isExporting}
        hue={185}
        objective="Dominar el flujo operativo de idea a despliegue en una sola linea de trabajo."
        deliverable="Checklist accionable de 5 pasos con tiempos y outputs concretos."
        qualityGate="Cada paso debe terminar con una evidencia verificable antes de avanzar."
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-6">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80">Aplicación</span>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight mt-2">El Flujo Completo</h1>
          <p className="text-white/75 text-sm mt-2">Haz clic en cada paso. De idea a app con dominio propio en ~75 minutos.</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div {...m(0.1)} className="max-w-3xl mx-auto mb-6">
          <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${STEPS[0].color}, ${step.color})` }}
              animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-white/80">Inicio</span>
            <span className="text-[11px] font-bold" style={{ color: step.color }}>~{times[activeStep]} min</span>
            <span className="text-[11px] text-white/80">App publicada</span>
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
                  <span className={`text-[11px] font-bold ${isActive ? 'text-white' : 'text-white/85'}`}>{s.tool}</span>
                  <span className="text-[11px] text-white/75">{s.time}</span>
                </motion.button>
                {i < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-white/85" />}
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
              <p className="mb-4 text-sm leading-relaxed text-white/85">{step.detail}</p>
              <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01] flex items-center gap-3">
                <Play className="h-4 w-4 text-white/85" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/80">Output</p>
                  <p className="text-xs text-white/90">{step.output}</p>
                </div>
              </div>
            </div>

            {/* Right: Tips */}
            <div className="col-span-2 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-white/80">Tips del Paso {activeStep + 1}</p>
              <div className="space-y-3">
                {step.tips.map((tip, i) => (
                  <motion.div key={i}
                    initial={isExporting ? {} : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.08] bg-white/[0.02]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: step.color }} />
                    <span className="text-xs text-white/75">{tip}</span>
                  </motion.div>
                ))}
              </div>

              {activeStep < STEPS.length - 1 && (
                <button onClick={() => setActiveStep(p => p + 1)}
                  className="mt-4 w-full p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center gap-2 hover:bg-white/[0.04] transition-colors">
                  <span className="text-xs font-bold text-white/85">Siguiente paso</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/75" />
                </button>
              )}

              {activeStep === STEPS.length - 1 && (
                <div className="mt-4 p-3 rounded-lg border bg-emerald-500/[0.05] border-emerald-500/15 text-center">
                  <p className="text-xs font-bold text-emerald-400">App en dominio propio — flujo completo</p>
                  <p className="text-[11px] text-white/70 mt-1">Tiempo estimado: 75-90 minutos totales</p>
                  <p className="text-[11px] text-white/50 mt-0.5 italic">"Better done than perfect." — Pablo</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <S4Footer
        sectionLabel="Aplicacion"
        contextHint="Flujo operacional de extremo a extremo"
        hue={185}
        session="S4"
      />
    </div>
  );
}
