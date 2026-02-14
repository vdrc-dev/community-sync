import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { Target, Code, FileText, MessageSquare, Image, BarChart3, Wallet, Sparkles, Zap, ArrowRight, Lightbulb, Layers } from 'lucide-react';
import heroImg from '@/assets/gen10-s2/slide09-model-choice.jpg';
import { S2_THEME } from './theme';

/* ─── Color palette (matches slide 7/8) ─── */
const C = {
  violet:  { accent: 'hsl(263 60% 60%)', bg: 'hsl(263 60% 55% / 0.10)', border: 'hsl(263 60% 55% / 0.35)', text: 'hsl(263 60% 78%)', glow: 'hsl(263 60% 55% / 0.25)' },
  cyan:    { accent: 'hsl(185 70% 55%)', bg: 'hsl(185 70% 50% / 0.10)', border: 'hsl(185 70% 50% / 0.35)', text: 'hsl(185 70% 70%)', glow: 'hsl(185 70% 50% / 0.25)' },
  amber:   { accent: 'hsl(38 90% 58%)',  bg: 'hsl(38 90% 55% / 0.10)',  border: 'hsl(38 90% 55% / 0.35)',  text: 'hsl(38 85% 68%)',  glow: 'hsl(38 90% 55% / 0.25)' },
  emerald: { accent: 'hsl(160 65% 50%)', bg: 'hsl(160 65% 45% / 0.10)', border: 'hsl(160 65% 45% / 0.35)', text: 'hsl(160 65% 62%)', glow: 'hsl(160 65% 45% / 0.25)' },
} as const;

type CKey = keyof typeof C;

/* ─── Steps data — 3-step pipeline like slide 7 ─── */
const STEPS = [
  {
    num: 1, icon: Target, label: 'TAREA', colorKey: 'violet' as CKey,
    title: '¿Qué necesito hacer?',
    options: [
      { icon: Code,          label: 'Programar',    key: 'code' },
      { icon: FileText,      label: 'Investigar',   key: 'research' },
      { icon: MessageSquare, label: 'Redactar',     key: 'write' },
      { icon: Image,         label: 'Crear visual', key: 'image' },
      { icon: BarChart3,     label: 'Analizar',     key: 'data' },
    ],
  },
  {
    num: 2, icon: Layers, label: 'CONTEXTO', colorKey: 'cyan' as CKey,
    title: '¿Cuánto contexto tengo?',
    options: [
      { icon: null, label: 'Poco',  key: '0', desc: '< 5 páginas', emoji: '📄' },
      { icon: null, label: 'Medio', key: '1', desc: '5–50 páginas', emoji: '📚' },
      { icon: null, label: 'Mucho', key: '2', desc: '50+ páginas', emoji: '🏢' },
    ],
  },
  {
    num: 3, icon: Wallet, label: 'PRESUPUESTO', colorKey: 'amber' as CKey,
    title: '¿Cuánto puedo gastar?',
    options: [
      { icon: null, label: 'Gratis',     key: '0', desc: '$0/mes',   emoji: '🆓' },
      { icon: null, label: 'Bajo',       key: '1', desc: '$20/mes',  emoji: '💵' },
      { icon: null, label: 'Sin límite', key: '2', desc: '$200+/mes', emoji: '💎' },
    ],
  },
];

type Rec = { model: string; reason: string; color: CKey; speed: string };

function getRec(task: string, ctx: number, budget: number): Rec {
  if (task === 'code') {
    if (budget === 0) return { model: 'DeepSeek V3.2', reason: 'Gratis y sorprendentemente bueno para código', color: 'emerald', speed: '⚡ Rápido' };
    return { model: 'Claude 4.6', reason: 'El mejor del mundo para programación', color: 'violet', speed: '🎯 Preciso' };
  }
  if (task === 'research') {
    if (ctx >= 2) return { model: 'Gemini 3 Pro', reason: 'Lee libros enteros con 2M tokens de contexto', color: 'cyan', speed: '📖 Profundo' };
    if (budget === 0) return { model: 'Perplexity Free', reason: 'Busca en internet en vivo con fuentes', color: 'emerald', speed: '⚡ Rápido' };
    return { model: 'Perplexity Pro', reason: 'Investigación con acceso a papers académicos', color: 'cyan', speed: '🔍 Verificado' };
  }
  if (task === 'write') {
    if (budget === 0) return { model: 'ChatGPT Free', reason: 'Excelente para redacción y edición de textos', color: 'emerald', speed: '⚡ Rápido' };
    return { model: 'Claude 4.6', reason: 'El más natural para textos largos y profesionales', color: 'violet', speed: '✍️ Natural' };
  }
  if (task === 'image') {
    if (budget === 0) return { model: 'Gemini Gratis', reason: 'Genera imágenes sin costo con Gemini', color: 'emerald', speed: '🎨 Creativo' };
    return { model: 'GPT-5.2 + DALL-E', reason: 'La mejor calidad en generación de imágenes', color: 'amber', speed: '🎨 Premium' };
  }
  if (task === 'data') {
    if (ctx >= 2) return { model: 'Gemini 3 Pro', reason: 'Procesa hojas de cálculo masivas', color: 'cyan', speed: '📊 Masivo' };
    if (budget === 0) return { model: 'DeepSeek V3.2', reason: 'Fuerte en análisis numérico, gratis', color: 'emerald', speed: '⚡ Rápido' };
    return { model: 'o3 / GPT-5.2', reason: 'Razonamiento matemático avanzado', color: 'amber', speed: '🧠 Profundo' };
  }
  return { model: 'GPT-5.2-mini', reason: 'Equilibrio general para cualquier tarea', color: 'violet', speed: '⚡ Versátil' };
}

export function S2Slide10ModelChoice() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [activeStep, setActiveStep] = useState(0);
  const [task, setTask] = useState<string | null>(null);
  const [context, setContext] = useState('1');
  const [budget, setBudget] = useState('1');

  const selections = { task, context, budget };
  const setters = {
    0: (key: string) => setTask(key),
    1: (key: string) => setContext(key),
    2: (key: string) => setBudget(key),
  } as Record<number, (k: string) => void>;

  const getSelected = (stepIdx: number) => {
    if (stepIdx === 0) return task;
    if (stepIdx === 1) return context;
    return budget;
  };

  const m = (delay: number) =>
    isExporting ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.5 } };

  const currentStep = STEPS[activeStep];
  const sc = C[currentStep.colorKey];
  const rec = task ? getRec(task, parseInt(context), parseInt(budget)) : null;
  const recC = rec ? C[rec.color] : C.violet;

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-violet-500/30" style={{ background: S2_THEME.background }}>

      {/* Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,_hsl(263_50%_30%_/_0.12),_transparent)]" />
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
      </div>

      {!isExporting && (
        <>
          <motion.div
            className="absolute top-[20%] left-[40%] w-[600px] h-[500px] rounded-full blur-[200px]"
            style={{ background: 'hsl(263 55% 45% / 0.08)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[15%] right-[10%] w-[320px] h-[320px] rounded-full blur-[140px]"
            style={{ background: 'hsl(185 70% 50% / 0.09)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div className="relative z-10 flex flex-col h-full min-h-screen px-16 py-10 justify-between">

        {/* ━━━ TOP: Title + Image ━━━ */}
        <div className="flex items-center gap-10">
          <motion.div {...m(0.1)} className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, hsl(263 60% 60%), hsl(38 90% 58%))' }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Decisión Práctica</span>
            </div>
            <h1 className="text-4xl 2xl:text-5xl font-black leading-[0.92] tracking-tight text-white">
              ¿Qué IA{' '}
              <span style={{
                background: `linear-gradient(135deg, ${C.violet.text}, ${C.cyan.text}, ${C.amber.text})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>uso?</span>
            </h1>
            <p className="text-base mt-3 leading-relaxed max-w-[500px]" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
              No memorices modelos — aprende el proceso. Responde 3 preguntas y obtén la mejor recomendación para tu caso.
            </p>
          </motion.div>

          <motion.div {...m(0.2)} className="flex-shrink-0 w-[380px] rounded-2xl overflow-hidden border"
            style={{ borderColor: 'hsl(263 50% 50% / 0.2)' }}>
            <img src={heroImg} alt="Tres puertas: elige tu modelo de IA"
              className="w-full h-[160px] object-cover" />
          </motion.div>
        </div>

        {/* ━━━ PIPELINE BAR: 3 clickable steps ━━━ */}
        <motion.div {...m(0.25)} className="flex items-center gap-0 mt-6">
          {STEPS.map((s, i) => {
            const isActive = activeStep === i;
            const color = C[s.colorKey];
            const Icon = s.icon;
            const selected = getSelected(i);
            return (
              <div key={i} className="flex items-center flex-1">
                <button onClick={() => setActiveStep(i)}
                  className="flex-1 relative transition-all duration-300">
                  {isActive && !isExporting && (
                    <motion.div layoutId="model-pipe-glow"
                      className="absolute -inset-[1px] rounded-2xl"
                      style={{ background: color.glow, filter: 'blur(12px)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                  <div className="relative flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all"
                    style={{
                      background: isActive ? color.bg : 'hsl(0 0% 100% / 0.015)',
                      borderColor: isActive ? color.border : 'hsl(0 0% 100% / 0.06)',
                    }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0 transition-all"
                      style={{
                        background: isActive ? `${color.accent}20` : 'hsl(0 0% 100% / 0.03)',
                        border: `2.5px solid ${isActive ? color.accent : 'hsl(0 0% 100% / 0.08)'}`,
                        color: isActive ? color.accent : 'hsl(0 0% 100% / 0.25)',
                        boxShadow: isActive ? `0 0 20px ${color.glow}` : 'none',
                      }}>
                      {s.num}
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] transition-colors"
                        style={{ color: isActive ? color.text : 'hsl(0 0% 100% / 0.25)' }}>
                        {s.label}
                      </p>
                      <p className="text-sm font-bold transition-colors"
                        style={{ color: isActive ? 'hsl(0 0% 100% / 0.9)' : 'hsl(0 0% 100% / 0.4)' }}>
                        {s.title}
                      </p>
                    </div>
                    {/* Selected badge */}
                    {selected && !isActive && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}>
                        {i === 0 ? STEPS[0].options.find(o => o.key === selected)?.label :
                         STEPS[i].options.find(o => o.key === selected)?.label}
                      </span>
                    )}
                  </div>
                </button>
                {i < 2 && (
                  <div className="px-2 flex-shrink-0">
                    <ArrowRight className="w-5 h-5" style={{ color: activeStep > i ? C[STEPS[i + 1].colorKey].accent : 'hsl(0 0% 100% / 0.12)' }} />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ━━━ DETAIL PANEL ━━━ */}
        <div className="flex-1 mt-5 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeStep}
              initial={isExporting ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isExporting ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <div className="p-[1.5px] rounded-2xl h-full"
                style={{ background: `linear-gradient(145deg, ${sc.border}, hsl(0 0% 100% / 0.03))` }}>
                <div className="p-8 rounded-[15px] relative overflow-hidden h-full flex gap-10"
                  style={{ background: 'hsl(240 15% 4% / 0.95)' }}>

                  <div className="absolute -top-24 -right-24 w-[250px] h-[250px] rounded-full blur-[100px] opacity-15"
                    style={{ background: sc.accent }} />

                  {/* Left: Options grid */}
                  <div className="flex-1 relative z-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="w-1 h-6 rounded-full" style={{ background: sc.accent }} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: sc.text }}>
                        Selecciona una opción:
                      </p>
                    </div>

                    {activeStep === 0 ? (
                      /* Task: 5-column icon grid */
                      <div className="grid grid-cols-5 gap-3">
                        {currentStep.options.map(opt => {
                          const isSelected = task === opt.key;
                          const Icon = opt.icon!;
                          return (
                            <button key={opt.key} onClick={() => { setters[0](opt.key); setActiveStep(1); }} className="relative">
                              {isSelected && !isExporting && (
                                <motion.div layoutId="opt-glow"
                                  className="absolute -inset-[2px] rounded-xl"
                                  style={{ background: sc.glow, filter: 'blur(8px)' }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                                />
                              )}
                              <div className="relative px-3 py-5 rounded-xl border text-center transition-all"
                                style={{
                                  background: isSelected ? sc.bg : 'hsl(0 0% 100% / 0.015)',
                                  borderColor: isSelected ? sc.border : 'hsl(0 0% 100% / 0.05)',
                                }}>
                                <Icon className="w-7 h-7 mx-auto mb-2" style={{ color: isSelected ? sc.text : 'hsl(0 0% 100% / 0.2)' }} />
                                <p className="text-xs font-bold" style={{ color: isSelected ? sc.text : 'hsl(0 0% 100% / 0.3)' }}>{opt.label}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* Context / Budget: vertical list */
                      <div className="space-y-3 max-w-[400px]">
                        {currentStep.options.map(opt => {
                          const selected = getSelected(activeStep);
                          const isSelected = selected === opt.key;
                          return (
                            <button key={opt.key} onClick={() => { setters[activeStep](opt.key); if (activeStep < 2) setActiveStep(activeStep + 1); }}
                              className="w-full relative">
                              {isSelected && !isExporting && (
                                <motion.div layoutId="opt-glow"
                                  className="absolute -inset-[1px] rounded-xl"
                                  style={{ background: sc.glow, filter: 'blur(6px)' }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                                />
                              )}
                              <div className="relative flex items-center gap-4 px-5 py-4 rounded-xl border transition-all"
                                style={{
                                  background: isSelected ? sc.bg : 'hsl(0 0% 100% / 0.015)',
                                  borderColor: isSelected ? sc.border : 'hsl(0 0% 100% / 0.05)',
                                }}>
                                <span className="text-2xl">{(opt as any).emoji}</span>
                                <div className="text-left flex-1">
                                  <p className="text-sm font-bold" style={{ color: isSelected ? sc.text : 'hsl(0 0% 100% / 0.3)' }}>{opt.label}</p>
                                  <p className="text-[10px]" style={{ color: isSelected ? 'hsl(0 0% 100% / 0.4)' : 'hsl(0 0% 100% / 0.15)' }}>{(opt as any).desc}</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Right: Recommendation or placeholder */}
                  <div className="w-[420px] flex-shrink-0 relative z-10 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {rec ? (
                        <motion.div key={`${task}-${context}-${budget}`}
                          initial={isExporting ? {} : { opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35 }}
                        >
                          <div className="relative">
                            {!isExporting && (
                              <motion.div
                                className="absolute -inset-[2px] rounded-xl"
                                style={{ background: recC.glow, filter: 'blur(16px)' }}
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            )}
                            <div className="relative p-6 rounded-xl border"
                              style={{ background: 'hsl(0 0% 0% / 0.4)', borderColor: recC.border }}>

                              <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4" style={{ color: recC.text }} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: recC.text }}>Tu mejor opción</span>
                              </div>

                              <h2 className="text-3xl font-black mb-2" style={{ color: 'hsl(0 0% 95%)' }}>{rec.model}</h2>

                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
                                style={{ background: recC.bg, border: `1px solid ${recC.border}` }}>
                                <Zap className="w-3 h-3" style={{ color: recC.text }} />
                                <span className="text-[10px] font-bold" style={{ color: recC.text }}>{rec.speed}</span>
                              </div>

                              <div className="p-3.5 rounded-lg border mb-4" style={{ background: recC.bg, borderColor: recC.border }}>
                                <p className="text-sm font-medium leading-relaxed" style={{ color: recC.text }}>{rec.reason}</p>
                              </div>

                            {/* Summary badges */}
                            <div className="space-y-2">
                              {[
                                { label: 'Tarea', value: STEPS[0].options.find(o => o.key === task)?.label || '—', color: 'violet' as CKey },
                                { label: 'Contexto', value: STEPS[1].options.find(o => o.key === context)?.label || '—', color: 'cyan' as CKey },
                                { label: 'Costo', value: STEPS[2].options.find(o => o.key === budget)?.label || '—', color: 'amber' as CKey },
                              ].map(item => (
                                <div key={item.label} className="flex items-center justify-between">
                                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'hsl(0 0% 100% / 0.25)' }}>{item.label}</span>
                                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                                    style={{ background: C[item.color].bg, color: C[item.color].text, border: `1px solid ${C[item.color].border}` }}>
                                    {item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div key="empty"
                          initial={isExporting ? {} : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="p-6 rounded-xl border flex flex-col items-center justify-center text-center"
                            style={{ background: 'hsl(0 0% 100% / 0.015)', borderColor: 'hsl(0 0% 100% / 0.05)' }}>
                            <Target className="w-10 h-10 mb-3" style={{ color: 'hsl(0 0% 100% / 0.1)' }} />
                            <p className="text-sm font-bold mb-1" style={{ color: 'hsl(0 0% 100% / 0.3)' }}>👈 Elige una tarea</p>
                            <p className="text-xs" style={{ color: 'hsl(0 0% 100% / 0.18)' }}>Tu recomendación aparecerá aquí</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ━━━ Footer ━━━ */}
        {/* ━━━ Insight ━━━ */}
        <motion.div {...m(0.5)} className="mt-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1))' }} />
            <p className="text-xs text-center" style={{ color: 'hsl(0 0% 100% / 0.35)' }}>
              💡 No memorices modelos — <strong style={{ color: C.violet.text }}>aprende el proceso de decisión.</strong> Los modelos cambian cada 3 meses.
            </p>
            <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, hsl(0 0% 100% / 0.1), transparent)' }} />
          </div>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">CRITERIO DE SELECCIÓN</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '17 / 37'}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
