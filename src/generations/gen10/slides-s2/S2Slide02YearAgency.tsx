import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import {
  Calendar, TrendingUp, Zap, ChevronRight, Sparkles,
  Brain, Layers, GitBranch,
} from 'lucide-react';
import { S2_THEME } from './theme';

const DEFAULT_CLOUD_URL =
  'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10-s2/page-02-2026-agencia.jpg';

/* ── Timeline data ────────────────────────────── */
const DEFAULT_TIMELINE = [
  {
    period: '2023 – 2024',
    event: 'Dominio absoluto de OpenAI',
    detail: 'GPT-4 monopoliza; las empresas descubren el prompting.',
    stat: '1 jugador',
    icon: 'calendar',
    accent: 'slate',
  },
  {
    period: '2025',
    event: 'El Año del Razonamiento',
    detail: 'o1 y o3 demuestran que los LLMs pueden "pensar".',
    stat: '3 modelos',
    icon: 'trending',
    accent: 'blue',
  },
  {
    period: '2026',
    event: 'La Era Agéntica',
    detail: 'Los agentes ejecutan tareas reales; el mercado se fragmenta.',
    stat: '12+ agentes',
    icon: 'zap',
    accent: 'violet',
  },
];

const DEFAULT_COMPETITORS = ['Anthropic', 'OpenAI', 'Google', 'DeepSeek'];
const DEFAULT_INSIGHT =
  "Ya no existe 'una IA para todo'. La productividad requiere un ecosistema de modelos especializados.";

const ICON_MAP: Record<string, React.ElementType> = {
  calendar: Calendar,
  trending: TrendingUp,
  zap: Zap,
};

/* ── Accent palette per era ───────────────────── */
const ACCENT: Record<
  string,
  { border: string; bg: string; text: string; glow: string; dot: string; gradient: string }
> = {
  slate: {
    border: 'hsl(220 15% 40% / 0.3)',
    bg: 'hsl(220 15% 40% / 0.06)',
    text: 'hsl(220 15% 72%)',
    glow: 'hsl(220 15% 50% / 0.15)',
    dot: 'hsl(220 15% 55%)',
    gradient: 'hsl(220 20% 50%)',
  },
  blue: {
    border: 'hsl(217 70% 55% / 0.35)',
    bg: 'hsl(217 70% 55% / 0.08)',
    text: 'hsl(217 70% 72%)',
    glow: 'hsl(217 70% 55% / 0.2)',
    dot: 'hsl(217 70% 60%)',
    gradient: 'hsl(217 70% 60%)',
  },
  violet: {
    border: 'hsl(263 60% 55% / 0.45)',
    bg: 'hsl(263 60% 55% / 0.1)',
    text: 'hsl(263 60% 78%)',
    glow: 'hsl(263 60% 55% / 0.25)',
    dot: 'hsl(263 60% 60%)',
    gradient: 'hsl(263 65% 60%)',
  },
};

/* ── Brand colour map for competitor chips ────── */
const BRAND_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  anthropic: { bg: 'hsl(25 85% 55% / 0.08)', border: 'hsl(25 85% 55% / 0.25)', text: 'hsl(25 85% 65%)' },
  openai: { bg: 'hsl(145 55% 45% / 0.08)', border: 'hsl(145 55% 45% / 0.25)', text: 'hsl(145 55% 60%)' },
  google: { bg: 'hsl(215 75% 55% / 0.08)', border: 'hsl(215 75% 55% / 0.25)', text: 'hsl(215 75% 65%)' },
  deepseek: { bg: 'hsl(185 60% 50% / 0.08)', border: 'hsl(185 60% 50% / 0.25)', text: 'hsl(185 60% 65%)' },
};
const BRAND_DEFAULT = { bg: 'hsl(0 0% 100% / 0.025)', border: 'hsl(0 0% 100% / 0.07)', text: 'hsl(0 0% 100% / 0.50)' };

/* ── Particles (memoised outside render) ──────── */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2,
  hue: [263, 217, 45][i % 3],
  dur: 7 + Math.random() * 5,
  delay: Math.random() * 5,
  travel: 12 + Math.random() * 25,
}));

/* ═══════════════════════════════════════════════ */
export function S2Slide02YearAgency() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const content = useSlideContent(2);
  const [activeIdx, setActiveIdx] = useState(2);

  /* ── Content resolution ── */
  const evo = content.competitorsEvolution as {
    timeline?: Array<{ period: string; event: string; detail?: string; stat?: string; icon?: string; accent?: string }>;
    competitors?: string[];
    insight?: string;
  } | undefined;

  const timeline = (evo?.timeline || DEFAULT_TIMELINE).map((t, i) => ({
    ...DEFAULT_TIMELINE[i],
    ...t,
    icon: t.icon || DEFAULT_TIMELINE[i]?.icon || 'calendar',
    accent: t.accent || DEFAULT_TIMELINE[i]?.accent || 'slate',
  }));
  const competitors = evo?.competitors || DEFAULT_COMPETITORS;
  const insight = evo?.insight || DEFAULT_INSIGHT;
  const imageUrl = (content.imageUrl as string) || DEFAULT_CLOUD_URL;

  const active = timeline[activeIdx] || timeline[2];
  const ac = ACCENT[active.accent] || ACCENT.violet;

  /* ── Motion helper ── */
  const m = (delay: number, extra?: object) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          ...extra,
        };

  /* ═════════════════════════════════════════════ */
  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex items-center font-sans selection:bg-violet-500/30" style={{ background: S2_THEME.background }}>
      {/* ── Atmospheric layers ──────────────── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_55%_at_50%_-15%,_hsl(263_70%_45%_/_0.2),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_95%_85%,_hsl(217_65%_45%_/_0.1),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_5%_75%,_hsl(45_70%_50%_/_0.05),_transparent_50%)]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        {/* Noise */}
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
      </div>

      {/* ── Breathing orbs ── */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-[8%] right-[15%] w-[750px] h-[600px] rounded-full blur-[220px]"
            style={{ background: 'hsl(263 60% 45% / 0.09)' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.26, 0.12] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-5%] left-[10%] w-[500px] h-[500px] rounded-full blur-[180px]"
            style={{ background: 'hsl(217 60% 45% / 0.07)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </>
      )}

      {/* ── Floating particles ── */}
      {!isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                background: `hsl(${p.hue} 55% 60% / 0.4)`,
                boxShadow: `0 0 ${p.size * 4}px hsl(${p.hue} 55% 60% / 0.5)`,
              }}
              animate={{
                y: [0, -p.travel, 0],
                opacity: [0.08, 0.5, 0.08],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Light sweep ── */}
      {!isExporting && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, hsl(263 60% 55% / 0.03) 48%, hsl(217 70% 55% / 0.02) 52%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 8 }}
        />
      )}

      {/* ════════════════════════════════════════ */}
      {/* ── MAIN CONTENT ─────────────────────── */}
      {/* ════════════════════════════════════════ */}
      <div className="relative z-10 flex items-center w-full h-full px-12 lg:px-20 gap-14">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col justify-center flex-1 min-w-0 max-w-[54%]">
          {/* Section pill */}
          <motion.div {...m(0.1)} className="mb-7">
            <div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm"
              style={{
                background: 'hsl(263 55% 50% / 0.06)',
                borderColor: 'hsl(263 55% 50% / 0.22)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'hsl(263 60% 70%)' }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: 'hsl(263 60% 72%)' }}
              >
                Evolución del Ecosistema
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div {...m(0.2, { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } })}>
            <h1
              className="text-[3.4rem] lg:text-[4.3rem] font-black tracking-[-0.04em] text-white leading-[0.95]"
              style={{ textShadow: '0 0 50px hsl(263 60% 50% / 0.12)' }}
            >
              2026 se define como
            </h1>
            <h1
              className="text-[3.8rem] lg:text-[5rem] font-black tracking-[-0.04em] leading-[0.95] mt-1"
              style={{
                background:
                  'linear-gradient(135deg, hsl(45 90% 70%) 0%, hsl(38 85% 62%) 30%, hsl(263 60% 68%) 65%, hsl(280 50% 55%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 35px hsl(263 65% 50% / 0.45))',
              }}
            >
              El Año de la Agencia
            </h1>

            {/* Accent line */}
            <motion.div
              className="h-[3px] rounded-full mt-5"
              style={{
                background:
                  'linear-gradient(90deg, hsl(45 90% 68%), hsl(263 60% 58%) 60%, transparent)',
              }}
              initial={isExporting ? {} : { width: 0 }}
              animate={{ width: '140px' }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* ── Interactive Timeline ── */}
          <motion.div {...m(0.35)} className="mt-9 relative">
            {/* Vertical connector: center of 2px line at 46px (icon center = 20px padding + 52/2) */}
            <div
              className="absolute top-[42px] bottom-[42px] w-[2px] rounded-full"
              style={{
                left: '45px',
                background:
                  'linear-gradient(to bottom, hsl(220 15% 40% / 0.15), hsl(217 70% 55% / 0.2), hsl(263 60% 55% / 0.3))',
              }}
            />

            {/* Animated progress — same position so it overlays the rail */}
            {!isExporting && (
              <motion.div
                className="absolute top-[42px] bottom-[42px] w-[2px] rounded-full origin-top"
                style={{ left: '45px', background: `linear-gradient(to bottom, ${ACCENT.slate.dot}, ${ac.dot})` }}
                animate={{ scaleY: (activeIdx + 1) / timeline.length }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            )}

            <div className="space-y-2.5">
              {timeline.map((item, i) => {
                const isActive = i === activeIdx;
                const isPast = i < activeIdx;
                const style = ACCENT[item.accent] || ACCENT.slate;
                const Icon = ICON_MAP[item.icon] || Calendar;

                return (
                  <motion.button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className="w-full text-left group relative"
                    whileHover={isExporting ? {} : { x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Active glow backdrop */}
                    {isActive && !isExporting && (
                      <motion.div
                        layoutId="timeline-glow"
                        className="absolute -inset-1 rounded-2xl"
                        style={{ background: style.glow, filter: 'blur(18px)' }}
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                      />
                    )}

                    <div
                      className="relative flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300"
                      style={{
                        background: isActive
                          ? style.bg
                          : 'hsl(0 0% 100% / 0.015)',
                        borderColor: isActive
                          ? style.border
                          : isPast
                            ? 'hsl(0 0% 100% / 0.07)'
                            : 'hsl(0 0% 100% / 0.04)',
                      }}
                    >
                      {/* Timeline dot / icon — fixed size so line aligns with center */}
                      <div
                        className="w-[52px] h-[52px] min-w-[52px] min-h-[52px] rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 relative"
                        style={{
                          background: isActive ? style.bg : 'hsl(0 0% 100% / 0.025)',
                          border: `1.5px solid ${isActive ? style.border : isPast ? 'hsl(0 0% 100% / 0.08)' : 'hsl(0 0% 100% / 0.05)'}`,
                          boxShadow: isActive ? `0 0 24px ${style.glow}` : 'none',
                        }}
                      >
                        <span className="flex items-center justify-center w-5 h-5" aria-hidden>
                          <Icon
                            className="w-5 h-5 shrink-0 transition-colors duration-300 block"
                            style={{ color: isActive ? style.text : isPast ? 'hsl(0 0% 100% / 0.35)' : 'hsl(0 0% 100% / 0.2)' }}
                          />
                        </span>
                        {/* Active ring pulse */}
                        {isActive && !isExporting && (
                          <motion.div
                            className="absolute inset-0 rounded-xl border pointer-events-none"
                            style={{ borderColor: style.dot }}
                            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                        )}
                      </div>

                      {/* Text + detail */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-0.5">
                          <span
                            className="text-[15px] font-bold tracking-wide transition-colors duration-300"
                            style={{ color: isActive ? style.text : isPast ? 'hsl(0 0% 100% / 0.5)' : 'hsl(0 0% 100% / 0.35)' }}
                          >
                            {item.period}
                          </span>
                          {i === timeline.length - 1 && (
                            <span
                              className="text-[8px] font-bold uppercase tracking-[0.22em] px-2 py-0.5 rounded-full"
                              style={{
                                background: 'hsl(263 55% 50% / 0.18)',
                                color: 'hsl(263 60% 72%)',
                                border: '1px solid hsl(263 55% 50% / 0.3)',
                              }}
                            >
                              Ahora
                            </span>
                          )}
                        </div>
                        <p
                          className="text-[14px] font-semibold transition-colors duration-300 leading-snug"
                          style={{ color: isActive ? 'hsl(0 0% 100% / 0.88)' : 'hsl(0 0% 100% / 0.55)' }}
                        >
                          {item.event}
                        </p>

                        {/* Detail line — visible when active */}
                        <AnimatePresence>
                          {isActive && (item as { detail?: string }).detail && (
                            <motion.p
                              initial={isExporting ? {} : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={isExporting ? {} : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-[12px] mt-1.5 leading-relaxed"
                              style={{ color: 'hsl(0 0% 100% / 0.4)' }}
                            >
                              {(item as { detail?: string }).detail}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Stat badge */}
                      {(item as { stat?: string }).stat && (
                        <div
                          className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold tabular-nums tracking-wider transition-all duration-300"
                          style={{
                            background: isActive ? style.bg : 'hsl(0 0% 100% / 0.02)',
                            border: `1px solid ${isActive ? style.border : 'hsl(0 0% 100% / 0.05)'}`,
                            color: isActive ? style.text : 'hsl(0 0% 100% / 0.25)',
                          }}
                        >
                          {(item as { stat?: string }).stat}
                        </div>
                      )}

                      <ChevronRight
                        className="w-4 h-4 flex-shrink-0 transition-all duration-300"
                        style={{
                          color: isActive ? style.text : 'hsl(0 0% 100% / 0.1)',
                          transform: isActive ? 'translateX(2px)' : 'none',
                        }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ── Insight ── */}
          <motion.div {...m(0.55)} className="mt-7 relative max-w-lg">
            <div
              className="absolute -left-0 top-0 bottom-0 w-[3px] rounded-full"
              style={{ background: `linear-gradient(to bottom, ${ac.dot}, transparent)` }}
            />
            <div className="pl-5 py-1">
              <p className="text-[14px] text-white/40 font-light leading-relaxed italic">
                "{insight}"
              </p>
            </div>
          </motion.div>

          {/* ── Competitor ecosystem chips ── */}
          <motion.div {...m(0.65)} className="mt-6 flex items-center gap-2.5 flex-wrap">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20 mr-1">
              Ecosistema:
            </span>
            {competitors.map((name, i) => {
              const brand = BRAND_COLORS[name.toLowerCase()] || BRAND_DEFAULT;
              return (
                <motion.span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold border backdrop-blur-sm"
                  style={{
                    background: brand.bg,
                    borderColor: brand.border,
                    color: brand.text,
                  }}
                  {...(isExporting
                    ? {}
                    : {
                        whileHover: { scale: 1.06, borderColor: brand.text },
                        transition: { duration: 0.2 },
                      })}
                >
                  {name}
                </motion.span>
              );
            })}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════ */}
        {/* ── RIGHT COLUMN: Hero Image ─────────── */}
        {/* ════════════════════════════════════════ */}
        <motion.div
          {...(isExporting
            ? {}
            : {
                initial: { opacity: 0, scale: 0.88, x: 50 },
                animate: { opacity: 1, scale: 1, x: 0 },
                transition: { duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
              })}
          className="relative flex-shrink-0 w-[42%] max-w-[540px]"
        >
          {/* Deep reactive glow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.accent}
              className="absolute -inset-14 rounded-full blur-[130px] opacity-50"
              initial={isExporting ? {} : { opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={isExporting ? {} : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ background: `radial-gradient(circle, ${ac.glow} 0%, transparent 70%)` }}
            />
          </AnimatePresence>

          {/* Orbital rings */}
          {!isExporting && (
            <>
              <motion.div
                className="absolute -inset-5 rounded-[32px] border opacity-[0.12]"
                style={{ borderColor: ac.border, borderStyle: 'dashed' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-10 rounded-[40px] border opacity-[0.04]"
                style={{ borderColor: 'hsl(45 70% 60% / 0.3)' }}
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          {/* Image frame */}
          <div
            className="relative p-[2px] rounded-[26px] transition-all duration-700"
            style={{
              background: `linear-gradient(145deg, hsl(45 80% 65% / 0.4), ${ac.border}, hsl(280 50% 45% / 0.2))`,
            }}
          >
            <div className="p-[1px] rounded-[25px]" style={{ background: 'hsl(0 0% 0% / 0.5)' }}>
              <motion.img
                src={imageUrl}
                alt="AI Evolution: Discovery → Reasoning → Agency"
                className="w-full h-auto rounded-[24px]"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px hsl(0 0% 100% / 0.03), 0 35px 90px hsl(263 55% 35% / 0.35)',
                }}
                {...(isExporting
                  ? {}
                  : { whileHover: { scale: 1.015 }, transition: { duration: 0.5 } })}
              />
            </div>
          </div>

          {/* ── Floating info cards around image ── */}

          {/* Active period badge — bottom right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={isExporting ? {} : { opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={isExporting ? {} : { opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-4 -right-4 px-5 py-3 rounded-xl border backdrop-blur-xl"
              style={{
                background: 'hsl(0 0% 4% / 0.92)',
                borderColor: ac.border,
                boxShadow: `0 16px 50px hsl(0 0% 0% / 0.6), 0 0 24px ${ac.glow}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: ac.dot, boxShadow: `0 0 10px ${ac.dot}` }}
                  />
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 w-2.5 h-2.5 rounded-full"
                      style={{ background: ac.dot }}
                      animate={{ scale: [1, 2.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    />
                  )}
                </div>
                <span className="text-xs font-bold tracking-wider" style={{ color: ac.text }}>
                  {active.period}
                </span>
                <div className="w-px h-3.5" style={{ background: 'hsl(0 0% 100% / 0.1)' }} />
                <span className="text-[10px] font-mono text-white/30 tracking-wide">
                  {activeIdx + 1}/{timeline.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Top-left mini cards */}
          <motion.div
            {...m(0.85)}
            className="absolute -top-3 -left-4 flex flex-col gap-2"
          >
            <div
              className="px-3 py-2 rounded-lg border backdrop-blur-xl"
              style={{
                background: 'hsl(0 0% 5% / 0.88)',
                borderColor: 'hsl(45 70% 55% / 0.18)',
                boxShadow: '0 10px 35px hsl(0 0% 0% / 0.5)',
              }}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3 h-3 text-amber-400/65" />
                <span className="text-[10px] font-mono text-amber-400/65 tracking-wider uppercase">
                  Evolución
                </span>
              </div>
            </div>
            <div
              className="px-3 py-2 rounded-lg border backdrop-blur-xl"
              style={{
                background: 'hsl(0 0% 5% / 0.85)',
                borderColor: 'hsl(263 55% 50% / 0.15)',
                boxShadow: '0 8px 28px hsl(0 0% 0% / 0.4)',
              }}
            >
              <div className="flex items-center gap-2">
                <GitBranch className="w-3 h-3" style={{ color: ac.text }} />
                <span className="text-[10px] font-mono tracking-wider" style={{ color: 'hsl(0 0% 100% / 0.3)' }}>
                  {competitors.length} competidores
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top-right small stat */}
          {(active as { stat?: string }).stat && (
            <motion.div
              {...m(0.95)}
              className="absolute -top-2 -right-2 px-3 py-2 rounded-lg border backdrop-blur-xl"
              style={{
                background: 'hsl(0 0% 4% / 0.9)',
                borderColor: ac.border,
                boxShadow: `0 8px 25px hsl(0 0% 0% / 0.5), 0 0 15px ${ac.glow}`,
              }}
            >
              <div className="flex items-center gap-2">
                <Brain className="w-3 h-3" style={{ color: ac.text }} />
                <span className="text-[11px] font-bold tabular-nums" style={{ color: ac.text }}>
                  {(active as { stat?: string }).stat}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* ── FOOTER ─────────────────────────────  */}
      {/* ════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div
          className="h-px mx-16"
          style={{
            background:
              'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)',
          }}
        />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">
            EVOLUCIÓN 2023 – 2026
          </span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">
            {slideNum
              ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}`
              : '04 / 37'}
          </span>
        </div>
      </div>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }}
      />
    </div>
  );
}
