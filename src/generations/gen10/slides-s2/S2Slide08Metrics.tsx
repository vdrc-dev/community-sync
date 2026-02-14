import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { MessageSquare, Cpu, PenLine, ArrowRight, Lightbulb } from 'lucide-react';
import heroImg from '@/assets/gen10-s2/slide07-tokens-brain.jpg';
import { S2_THEME } from './theme';

/* ─── Color palette ─── */
const C = {
  cyan:   { accent: 'hsl(185 70% 55%)', bg: 'hsl(185 70% 50% / 0.10)', border: 'hsl(185 70% 50% / 0.35)', text: 'hsl(185 70% 70%)', glow: 'hsl(185 70% 50% / 0.25)' },
  violet: { accent: 'hsl(263 60% 60%)', bg: 'hsl(263 60% 55% / 0.10)', border: 'hsl(263 60% 55% / 0.35)', text: 'hsl(263 60% 78%)', glow: 'hsl(263 60% 55% / 0.25)' },
  amber:  { accent: 'hsl(38 90% 58%)',  bg: 'hsl(38 90% 55% / 0.10)',  border: 'hsl(38 90% 55% / 0.35)',  text: 'hsl(38 85% 68%)',  glow: 'hsl(38 90% 55% / 0.25)' },
} as const;

type CKey = keyof typeof C;

const STEPS = [
  {
    num: 1, icon: MessageSquare, label: 'ENTRADA', colorKey: 'cyan' as CKey,
    title: 'Tú escribes un mensaje',
    body: 'La IA no lee palabras completas. Corta tu texto en pedazos pequeños llamados «tokens» — como piezas de rompecabezas.',
    demo: {
      before: 'Explícame qué es la inflación',
      after: [
        { t: 'Explíca', alt: false }, { t: 'me', alt: true }, { t: ' qué', alt: false },
        { t: ' es', alt: true }, { t: ' la', alt: false }, { t: ' infla', alt: true }, { t: 'ción', alt: false },
      ],
    },
    takeaway: '1 token ≈ ¾ de una palabra',
    emoji: '📝',
  },
  {
    num: 2, icon: Cpu, label: 'PROCESAMIENTO', colorKey: 'violet' as CKey,
    title: 'Predice la siguiente palabra',
    body: 'El modelo evalúa billones de patrones y calcula: ¿cuál es la palabra más probable que viene después? No «entiende» — calcula probabilidades.',
    demo: {
      before: 'La inflación es...',
      after: [
        { t: 'un aumento  →  92%', alt: false }, { t: 'una subida  →  6%', alt: true }, { t: 'algo malo  →  2%', alt: false },
      ],
    },
    takeaway: 'Siempre elige la opción más probable',
    emoji: '🧠',
  },
  {
    num: 3, icon: PenLine, label: 'SALIDA', colorKey: 'amber' as CKey,
    title: 'Genera palabra por palabra',
    body: 'Escribe un token a la vez, a miles por segundo. Como una máquina de escribir ultrarrápida. A veces inventa — no verifica, solo predice.',
    demo: {
      before: 'Respuesta generada:',
      after: [
        { t: 'La', alt: false }, { t: ' inflación', alt: true }, { t: ' es', alt: false },
        { t: ' un', alt: true }, { t: ' aumento', alt: false }, { t: ' general', alt: true },
        { t: ' de', alt: false }, { t: ' precios', alt: true }, { t: '...', alt: false },
      ],
    },
    takeaway: '~100 tokens generados por segundo',
    emoji: '⚡',
  },
];

export function S2Slide08Metrics() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [active, setActive] = useState(0);

  const m = (delay: number) =>
    isExporting ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.5 } };

  const step = STEPS[active];
  const sc = C[step.colorKey];

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-violet-500/30" style={{ background: S2_THEME.background }}>

      {/* Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_35%,_hsl(263_40%_25%_/_0.12),_transparent)]" />
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
        <motion.div
          className="absolute top-[20%] left-[40%] w-[600px] h-[500px] rounded-full blur-[200px]"
          style={{ background: 'hsl(263 55% 45% / 0.08)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* ── MAIN LAYOUT ── */}
      <div className="relative z-10 flex flex-col h-full min-h-screen px-16 py-10 justify-between">

        {/* ━━━ TOP ROW: Title + Image ━━━ */}
        <div className="flex items-center gap-10">
          {/* Title block */}
          <motion.div {...m(0.1)} className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, hsl(185 70% 55%), hsl(263 60% 60%))' }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Fundamentos Técnicos</span>
            </div>
            <h1 className="text-4xl 2xl:text-5xl font-black leading-[0.92] tracking-tight text-white">
              Cómo Piensa{' '}
              <span style={{
                background: 'linear-gradient(135deg, hsl(185 70% 65%), hsl(263 60% 75%), hsl(38 85% 65%))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                una IA
              </span>
            </h1>
            <p className="text-base mt-3 leading-relaxed max-w-[500px]" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
              Cada mensaje que envías pasa por 3 pasos en milisegundos. Entenderlos te convierte en un mejor usuario.
            </p>
          </motion.div>

          {/* Hero image — compact */}
          <motion.div {...m(0.2)} className="flex-shrink-0 w-[380px] rounded-2xl overflow-hidden border"
            style={{ borderColor: 'hsl(263 50% 50% / 0.2)' }}>
            <img src={heroImg} alt="Tokens entrando a un cerebro de IA"
              className="w-full h-[160px] object-cover" />
          </motion.div>
        </div>

        {/* ━━━ PIPELINE BAR: 3 clickable steps ━━━ */}
        <motion.div {...m(0.25)} className="flex items-center gap-0 mt-6">
          {STEPS.map((s, i) => {
            const isActive = active === i;
            const color = C[s.colorKey];
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center flex-1">
                <button onClick={() => setActive(i)}
                  className="flex-1 relative group transition-all duration-300">
                  {/* Active glow */}
                  {isActive && !isExporting && (
                    <motion.div layoutId="pipe-glow"
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
                    {/* Number circle */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0 transition-all"
                      style={{
                        background: isActive ? `${color.accent}20` : 'hsl(0 0% 100% / 0.03)',
                        border: `2.5px solid ${isActive ? color.accent : 'hsl(0 0% 100% / 0.08)'}`,
                        color: isActive ? color.accent : 'hsl(0 0% 100% / 0.25)',
                        boxShadow: isActive ? `0 0 20px ${color.glow}` : 'none',
                      }}>
                      {s.num}
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] transition-colors"
                        style={{ color: isActive ? color.text : 'hsl(0 0% 100% / 0.25)' }}>
                        {s.label}
                      </p>
                      <p className="text-sm font-bold transition-colors"
                        style={{ color: isActive ? 'hsl(0 0% 100% / 0.9)' : 'hsl(0 0% 100% / 0.4)' }}>
                        {s.title}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Arrow connector */}
                {i < 2 && (
                  <div className="px-2 flex-shrink-0">
                    <ArrowRight className="w-5 h-5" style={{ color: active > i ? C[STEPS[i + 1].colorKey].accent : 'hsl(0 0% 100% / 0.12)' }} />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ━━━ DETAIL PANEL ━━━ */}
        <div className="flex-1 mt-5 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={active}
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

                  {/* Glow */}
                  <div className="absolute -top-24 -right-24 w-[250px] h-[250px] rounded-full blur-[100px] opacity-15"
                    style={{ background: sc.accent }} />

                  {/* Left: Explanation */}
                  <div className="flex-1 relative z-10 flex flex-col justify-center">
                    {/* Emoji + body */}
                    <div className="flex items-start gap-4 mb-6">
                      <span className="text-3xl flex-shrink-0 mt-0.5">{step.emoji}</span>
                      <p className="text-lg leading-relaxed font-medium" style={{ color: 'hsl(0 0% 100% / 0.85)' }}>
                        {step.body}
                      </p>
                    </div>

                    {/* Takeaway pill */}
                    <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl w-fit"
                      style={{ background: sc.bg, border: `1.5px solid ${sc.border}` }}>
                      <Lightbulb className="w-4 h-4" style={{ color: sc.accent }} />
                      <span className="text-sm font-bold" style={{ color: sc.text }}>
                        {step.takeaway}
                      </span>
                    </div>
                  </div>

                  {/* Right: Token Demo */}
                  <div className="w-[420px] flex-shrink-0 relative z-10 flex flex-col justify-center">
                    <div className="p-6 rounded-xl border"
                      style={{ background: 'hsl(0 0% 0% / 0.4)', borderColor: sc.border }}>

                      {/* Before */}
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
                        style={{ color: sc.text }}>
                        {active === 0 ? 'Tu mensaje:' : active === 1 ? 'La IA evalúa:' : 'La IA escribe:'}
                      </p>
                      <p className="text-sm font-mono mb-4 px-3 py-2 rounded-lg"
                        style={{ color: 'hsl(0 0% 100% / 0.6)', background: 'hsl(0 0% 100% / 0.03)' }}>
                        {step.demo.before}
                      </p>

                      {/* Arrow */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-px flex-1" style={{ background: sc.border }} />
                        <ArrowRight className="w-4 h-4" style={{ color: sc.accent }} />
                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: sc.text }}>
                          {active === 0 ? 'Se convierte en tokens' : active === 1 ? 'Probabilidades' : 'Token por token'}
                        </span>
                        <div className="h-px flex-1" style={{ background: sc.border }} />
                      </div>

                      {/* Token badges */}
                      <div className="flex flex-wrap gap-2">
                        {step.demo.after.map((token, i) => (
                          <motion.span key={`${active}-${i}`}
                            initial={isExporting ? {} : { opacity: 0, scale: 0.85, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: isExporting ? 0 : 0.04 * i, duration: 0.25 }}
                            className="px-3.5 py-2 rounded-lg text-sm font-mono font-bold border"
                            style={{
                              background: token.alt ? `${sc.accent}15` : sc.bg,
                              borderColor: sc.border,
                              color: sc.text,
                            }}>
                            {token.t}
                          </motion.span>
                        ))}
                      </div>

                      {/* Count */}
                      {active === 0 && (
                        <p className="text-xs mt-4 text-right" style={{ color: 'hsl(0 0% 100% / 0.4)' }}>
                          6 palabras → <strong style={{ color: sc.text }}>7 tokens</strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ━━━ BOTTOM: Insight + footer ━━━ */}
        {/* ━━━ BOTTOM: Insight ━━━ */}
        <motion.div {...m(0.5)} className="mt-4">
          <p className="text-xs text-center" style={{ color: 'hsl(0 0% 100% / 0.35)' }}>
            💡 La IA no piensa como tú. <strong style={{ color: 'hsl(38 85% 65%)' }}>Calcula probabilidades.</strong> Por eso puede ser brillante e inventar cosas al mismo tiempo.
          </p>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">MOTOR DE INFERENCIA</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '15 / 37'}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
