import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { ArrowRight, Sparkles, User, BriefcaseBusiness, Zap, Brain, Cpu } from 'lucide-react';
import { S2_THEME } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10-s2/page-03-transicion.jpg';

/* ── Color system ── */
const ERA_STYLES = {
  cyan: {
    border: 'hsl(185 70% 50% / 0.35)',
    bg: 'hsl(185 70% 50% / 0.08)',
    text: 'hsl(185 70% 65%)',
    glow: 'hsl(185 70% 50% / 0.2)',
    dot: 'hsl(185 70% 55%)',
    gradient: 'hsl(185 70% 50%)',
    icon: Zap,
  },
  amber: {
    border: 'hsl(38 90% 55% / 0.35)',
    bg: 'hsl(38 90% 55% / 0.08)',
    text: 'hsl(38 85% 65%)',
    glow: 'hsl(38 90% 55% / 0.2)',
    dot: 'hsl(38 90% 58%)',
    gradient: 'hsl(38 90% 55%)',
    icon: Brain,
  },
  violet: {
    border: 'hsl(263 60% 55% / 0.45)',
    bg: 'hsl(263 60% 55% / 0.1)',
    text: 'hsl(263 60% 75%)',
    glow: 'hsl(263 60% 55% / 0.25)',
    dot: 'hsl(263 60% 60%)',
    gradient: 'hsl(263 60% 55%)',
    icon: Cpu,
  },
} as const;

type EraKey = keyof typeof ERA_STYLES;

const DEFAULT_TIMELINE = [
  { year: '2023', era: 'Descubrimiento', quote: 'Ayúdame a escribir', color: 'cyan' as EraKey },
  { year: '2024-25', era: 'Razonamiento', quote: 'Ayúdame a pensar', color: 'amber' as EraKey },
  { year: '2026', era: 'Agencia', quote: 'Resuélvelo y avísame', color: 'violet' as EraKey },
];

const DEFAULT_ANALOGIES = {
  generativa: { role: 'El Pasante', behavior: 'Crea contenido bajo demanda, requiere instrucciones paso a paso, espera pasivamente' },
  agentica: { role: 'El Gerente', behavior: 'Ejecuta flujos de trabajo, conecta herramientas, toma decisiones autónomas' },
};

/* ── Floating particles ── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  y: `${5 + Math.random() * 90}%`,
  size: 1.5 + Math.random() * 2.5,
  dur: 5 + Math.random() * 8,
  delay: Math.random() * 4,
  opacity: 0.15 + Math.random() * 0.3,
}));

export function S2Slide03Transition() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const content = useSlideContent(3);
  const [activeEra, setActiveEra] = useState(2);

  const timeline = (content.timeline as typeof DEFAULT_TIMELINE) || DEFAULT_TIMELINE;
  const insight = (content.insight as string) || 'Ya no se trata de conversar. Se trata de dirigir sistemas que toman decisiones autónomas.';
  const analogies = (content.analogies as typeof DEFAULT_ANALOGIES) || DEFAULT_ANALOGIES;
  const imageUrl = (content.imageUrl as string) || CLOUD_URL;

  const active = timeline[activeEra] || timeline[2];
  const style = ERA_STYLES[active.color] || ERA_STYLES.violet;

  const m = (delay: number, overrides?: object) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      ...overrides,
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex items-center font-sans selection:bg-violet-500/30"
      style={{ background: S2_THEME.background }}>

      {/* ── Deep atmospheric background ── */}
      <div className="absolute inset-0">
        {/* Primary radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,_hsl(263_50%_40%_/_0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_80%,_hsl(185_60%_35%_/_0.1),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,_hsl(38_80%_40%_/_0.05),_transparent_50%)]" />

        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
      </div>

      {/* ── Reactive breathing orbs ── */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute w-[700px] h-[500px] rounded-full blur-[180px]"
            style={{ top: '15%', left: '25%', background: style.glow }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[400px] h-[350px] rounded-full blur-[140px]"
            style={{ bottom: '10%', right: '15%', background: 'hsl(38 80% 50% / 0.08)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </>
      )}

      {/* ── Floating particles ── */}
      {!isExporting && PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: style.dot,
          }}
          animate={{ y: [0, -30, 0], opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 flex items-center w-full h-full px-14 lg:px-20 gap-14">

        {/* ── Left column ── */}
        <div className="flex flex-col justify-center flex-1 min-w-0 max-w-[55%]">

          {/* Badge */}
          <motion.div {...m(0.1)} className="mb-6">
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-md"
              style={{
                background: 'hsl(263 55% 50% / 0.1)',
                borderColor: 'hsl(263 55% 50% / 0.3)',
                boxShadow: '0 4px 20px hsl(263 55% 50% / 0.1)',
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'hsl(263 60% 72%)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'hsl(263 60% 72%)' }}>
                Transición Fundamental
              </span>
            </div>
          </motion.div>

          {/* Title — cinematic scale */}
          <motion.div {...m(0.2, { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } })}>
            <h1 className="text-4xl 2xl:text-5xl font-black tracking-tight leading-[0.92] text-white">
              De IA Generativa
            </h1>
            <h1
              className="text-5xl 2xl:text-6xl font-black tracking-tight leading-[0.92] mt-2"
              style={{
                background: `linear-gradient(135deg, ${ERA_STYLES.cyan.gradient} 0%, ${ERA_STYLES.amber.gradient} 40%, ${ERA_STYLES.violet.gradient} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px hsl(263 60% 50% / 0.4))',
              }}
            >
              a IA Agéntica
            </h1>

            {/* Accent line */}
            <motion.div
              {...m(0.35)}
              className="mt-4 h-[3px] w-28 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ERA_STYLES.cyan.gradient}, ${ERA_STYLES.amber.gradient}, ${ERA_STYLES.violet.gradient})`,
                boxShadow: `0 0 20px ${style.glow}`,
              }}
            />
          </motion.div>

          {/* ── Timeline selector ── */}
          <motion.div {...m(0.4)} className="mt-10 flex items-stretch gap-3">
            {timeline.map((item, i) => {
              const isActive = i === activeEra;
              const s = ERA_STYLES[item.color] || ERA_STYLES.violet;
              const EraIcon = s.icon;
              const isLast = i === timeline.length - 1;

              return (
                <div key={i} className="flex items-stretch gap-3">
                  <motion.button
                    onClick={() => setActiveEra(i)}
                    className="relative text-left group"
                    whileHover={isExporting ? {} : { y: -4, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isActive && !isExporting && (
                      <motion.div
                        layoutId="era-glow-v2"
                        className="absolute -inset-[2px] rounded-2xl"
                        style={{ background: s.glow, filter: 'blur(14px)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div
                      className="relative px-5 py-5 rounded-2xl border transition-all duration-400 min-w-[160px]"
                      style={{
                        background: isActive ? s.bg : 'hsl(0 0% 100% / 0.015)',
                        borderColor: isActive ? s.border : 'hsl(0 0% 100% / 0.05)',
                        boxShadow: isActive ? `0 8px 32px ${s.glow}, inset 0 1px 0 hsl(0 0% 100% / 0.05)` : 'none',
                      }}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isActive ? `${s.dot}22` : 'hsl(0 0% 100% / 0.04)',
                            border: `1px solid ${isActive ? s.border : 'hsl(0 0% 100% / 0.08)'}`,
                          }}
                        >
                          <EraIcon className="w-3.5 h-3.5 transition-colors" style={{ color: isActive ? s.dot : 'hsl(0 0% 100% / 0.2)' }} />
                        </div>
                        <span
                          className="text-sm font-black tracking-wide transition-colors duration-300"
                          style={{ color: isActive ? s.text : 'hsl(0 0% 100% / 0.55)' }}
                        >
                          {item.year}
                        </span>
                      </div>
                      <p
                        className="text-xs font-semibold transition-colors duration-300 mb-1"
                        style={{ color: isActive ? 'hsl(0 0% 100% / 0.8)' : 'hsl(0 0% 100% / 0.50)' }}
                      >
                        {item.era}
                      </p>
                      <p
                        className="text-[11px] italic transition-colors duration-300"
                        style={{ color: isActive ? s.text : 'hsl(0 0% 100% / 0.40)' }}
                      >
                        "{item.quote}"
                      </p>

                      {/* Active indicator bar */}
                      <div
                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-400"
                        style={{
                          background: isActive ? `linear-gradient(90deg, transparent, ${s.dot}, transparent)` : 'transparent',
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                    </div>
                  </motion.button>

                  {/* Animated arrow connector */}
                  {!isLast && (
                    <div className="flex items-center">
                      <motion.div
                        animate={isExporting ? {} : { x: [0, 4, 0], opacity: [0.15, 0.35, 0.15] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowRight className="w-4 h-4" style={{ color: 'hsl(0 0% 100% / 0.15)' }} />
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* ── Analogy: Pasante vs Gerente ── */}
          <motion.div {...m(0.55)} className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
            {/* Generativa */}
            <div
              className="px-5 py-5 rounded-2xl border relative overflow-hidden group"
              style={{
                background: 'hsl(0 0% 100% / 0.03)',
                borderColor: 'hsl(0 0% 100% / 0.12)',
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 50%, hsl(0 0% 100% / 0.02), transparent 70%)' }} />
              <div className="relative flex items-center gap-2.5 mb-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'hsl(0 0% 100% / 0.05)', border: '1px solid hsl(0 0% 100% / 0.12)' }}
                >
                  <User className="w-4 h-4" style={{ color: 'hsl(0 0% 100% / 0.50)' }} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.12em] text-white/55">{analogies.generativa.role}</span>
              </div>
              <p className="relative text-[11px] text-white/45 leading-relaxed">{analogies.generativa.behavior}</p>
            </div>

            {/* Agéntica — highlighted */}
            <div
              className="px-5 py-5 rounded-2xl border relative overflow-hidden"
              style={{
                background: ERA_STYLES.violet.bg,
                borderColor: ERA_STYLES.violet.border,
                boxShadow: `0 8px 32px hsl(263 60% 40% / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.04)`,
              }}
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[50px]"
                style={{ background: 'hsl(263 60% 55% / 0.15)' }} />
              <div className="relative flex items-center gap-2.5 mb-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'hsl(263 60% 55% / 0.18)', border: `1px solid ${ERA_STYLES.violet.border}` }}
                >
                  <BriefcaseBusiness className="w-4 h-4" style={{ color: ERA_STYLES.violet.text }} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.12em]" style={{ color: ERA_STYLES.violet.text }}>
                  {analogies.agentica.role}
                </span>
              </div>
              <p className="relative text-[11px] leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.55)' }}>
                {analogies.agentica.behavior}
              </p>
            </div>
          </motion.div>

          {/* Insight quote */}
          <motion.div {...m(0.7)} className="mt-8 relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
              style={{ background: `linear-gradient(to bottom, ${style.dot}, transparent)` }}
            />
            <div className="pl-6">
              <p className="text-[14px] text-white/70 font-medium leading-relaxed italic">"{insight}"</p>
            </div>
          </motion.div>
        </div>

        {/* ── Right column: Image with orbital ── */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, scale: 0.9, x: 40 },
            animate: { opacity: 1, scale: 1, x: 0 },
            transition: { duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
          })}
          className="relative flex-shrink-0 w-[42%] max-w-[520px] flex items-center justify-center"
        >
          {/* Deep glow behind image */}
          <div
            className="absolute inset-[-40px] rounded-full blur-[100px] opacity-40 transition-all duration-700"
            style={{ background: `radial-gradient(circle, ${style.glow} 0%, transparent 65%)` }}
          />

          {/* Orbital ring */}
          {!isExporting && (
            <motion.div
              className="absolute inset-[-25px] rounded-full border"
              style={{ borderColor: `${style.dot}15` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full"
                style={{ background: style.dot, boxShadow: `0 0 12px ${style.dot}` }}
              />
            </motion.div>
          )}

          {/* Image frame */}
          <div
            className="relative p-[2px] rounded-[28px] transition-all duration-500"
            style={{
              background: `linear-gradient(145deg, ${ERA_STYLES.cyan.border}, ${ERA_STYLES.amber.border}, ${ERA_STYLES.violet.border})`,
            }}
          >
            <div className="p-[1px] rounded-[27px]" style={{ background: 'hsl(0 0% 0% / 0.5)' }}>
              <img
                src={imageUrl}
                alt="Transición IA Generativa a IA Agéntica"
                className="w-full h-auto rounded-[26px]"
                style={{
                  boxShadow: `0 30px 80px hsl(263 55% 30% / 0.35), 0 0 0 1px hsl(0 0% 100% / 0.04)`,
                }}
              />
            </div>
          </div>

          {/* Floating dynamic badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEra}
              initial={isExporting ? {} : { opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={isExporting ? {} : { opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="absolute -bottom-4 -left-6 px-5 py-3 rounded-2xl border backdrop-blur-xl"
              style={{
                background: 'hsl(260 20% 6% / 0.92)',
                borderColor: style.border,
                boxShadow: `0 16px 48px hsl(0 0% 0% / 0.6), 0 0 24px ${style.glow}`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: style.dot, boxShadow: `0 0 10px ${style.dot}` }}
                  animate={isExporting ? {} : { scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-bold tracking-wider" style={{ color: style.text }}>
                  {active.era}
                </span>
                <span className="text-[10px] font-mono text-white/25">{active.year}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Top-right floating pill */}
          <motion.div
            {...m(0.9)}
            className="absolute -top-3 -right-3 px-3.5 py-2 rounded-xl border backdrop-blur-md"
            style={{
              background: 'hsl(260 20% 6% / 0.85)',
              borderColor: 'hsl(0 0% 100% / 0.08)',
              boxShadow: '0 8px 24px hsl(0 0% 0% / 0.4)',
            }}
          >
            <span className="text-[10px] font-bold text-white/30 tracking-wider">PARADIGM SHIFT</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">TRANSICIÓN FUNDAMENTAL</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '05 / 37'}</span>
        </div>
      </div>

      {/* ── Cinematic vignette ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
