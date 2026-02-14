import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGeneration } from '@/contexts/GenerationContext';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { Zap, ChevronRight, Sparkles, Brain, Bot, Workflow } from 'lucide-react';
import logoVdrc from '@/assets/logo-vdrc.png';
import { S2_THEME } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10-s2/page-01-cover.jpg';

/* ── Floating keyword chips ── */
const FLOATING_TAGS = [
  { label: 'Agentes', x: '78%', y: '18%', delay: 0 },
  { label: 'MCP', x: '85%', y: '42%', delay: 1.5 },
  { label: 'C.R.O.P.', x: '72%', y: '68%', delay: 3 },
  { label: 'Context', x: '90%', y: '78%', delay: 2 },
];

/* ── Stat pills ── */
const STATIC_STATS = [
  { icon: Bot, value: '6+', label: 'modelos', color: 'hsl(45 85% 65%)' },
  { icon: Workflow, value: '3', label: 'frameworks', color: 'hsl(170 60% 50%)' },
];

export function S2Slide01Cover() {
  const { config, generationNumber, currentWeek } = useGeneration();
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [isHovered, setIsHovered] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const presentationUrl = `vdrc.lovable.app/gen${generationNumber}s${currentWeek}`;

  /* Typewriter for subtitle */
  const subtitle = 'Del Razonamiento a la Ejecución';
  useEffect(() => {
    if (isExporting) { setTypedCount(subtitle.length); return; }
    const t = setTimeout(() => {
      if (typedCount < subtitle.length) setTypedCount(c => c + 1);
    }, 40);
    return () => clearTimeout(t);
  }, [typedCount, isExporting]);

  const m = (delay: number, overrides?: object) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      ...overrides,
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex items-center font-sans selection:bg-violet-500/30" style={{ background: S2_THEME.background }}>

      {/* ═══════════════════════════════════ */}
      {/* ── ATMOSPHERIC BACKGROUND ──────── */}
      {/* ═══════════════════════════════════ */}
      <div className="absolute inset-0">
        {/* Primary radials */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_70%_at_55%_-25%,_hsl(263_80%_42%_/_0.28),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_-5%_110%,_hsl(280_60%_35%_/_0.14),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_105%_15%,_hsl(45_80%_50%_/_0.07),_transparent_50%)]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: S2_THEME.grid.size + ' ' + S2_THEME.grid.size,
          }}
        />

        {/* Horizontal scanlines */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(263 40% 50% / 0.3) 2px, hsl(263 40% 50% / 0.3) 3px)',
            backgroundSize: '100% 6px',
          }}
        />
      </div>

      {/* ── Breathing orbs ── */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-[-5%] left-[20%] w-[1000px] h-[800px] rounded-full blur-[280px]"
            style={{ background: 'hsl(263 65% 42% / 0.12)' }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-15%] right-[0%] w-[700px] h-[700px] rounded-full blur-[220px]"
            style={{ background: 'hsl(45 70% 50% / 0.05)' }}
            animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
          {/* Accent orb center-right */}
          <motion.div
            className="absolute top-[30%] right-[25%] w-[400px] h-[400px] rounded-full blur-[180px]"
            style={{ background: 'hsl(280 50% 45% / 0.08)' }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      {/* ── Floating particles ── */}
      {!isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => {
            const s = 1 + Math.random() * 2.5;
            const hues = [263, 280, 45, 170];
            const h = hues[i % 4];
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: s, height: s,
                  background: `hsl(${h} 60% 65% / 0.45)`,
                  boxShadow: `0 0 ${s * 5}px hsl(${h} 60% 65% / 0.5)`,
                }}
                animate={{ y: [0, -(20 + Math.random() * 35), 0], opacity: [0.05, 0.55, 0.05] }}
                transition={{ duration: 7 + Math.random() * 7, repeat: Infinity, delay: Math.random() * 8, ease: 'easeInOut' }}
              />
            );
          })}
        </div>
      )}

      {/* ── Animated light sweep ── */}
      {!isExporting && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, hsl(263 70% 60% / 0.04) 48%, hsl(45 80% 65% / 0.03) 52%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
        />
      )}

      {/* ═══════════════════════════════════ */}
      {/* ── TOP BAR ────────────────────── */}
      {/* ═══════════════════════════════════ */}
      <motion.div
        {...(isExporting ? {} : { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } })}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-12 py-6"
      >
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl scale-[2.5]" style={{ background: 'hsl(263 60% 50% / 0.18)' }} />
            <img src={logoVdrc} alt="VDRC" className="relative h-9 w-auto" />
          </div>
          <div className="flex flex-col">
            <span className="text-white/90 font-bold tracking-wider text-sm">
              VDRC <span className="text-violet-400/30">·</span> GEN {String(config.generation).padStart(2, '0')}
            </span>
            <span className="text-white/15 text-[9px] font-mono tracking-[0.3em] uppercase">Vibe Development & Research</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md"
          style={{ background: 'hsl(0 0% 100% / 0.025)', borderColor: 'hsl(0 0% 100% / 0.06)' }}>
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(150 70% 50%)' }} />
            {!isExporting && (
              <motion.div className="absolute inset-0 w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(150 70% 50%)' }}
                animate={{ scale: [1, 2.8, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
            )}
          </div>
          <span className="text-[11px] font-mono text-white/30 tracking-wide">{presentationUrl}</span>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════ */}
      {/* ── MAIN CONTENT ───────────────── */}
      {/* ═══════════════════════════════════ */}
      <div className="relative z-10 flex items-center w-full h-full px-12 lg:px-20 gap-12">

        {/* ── LEFT: Text block ── */}
        <div className="flex flex-col justify-center flex-1 min-w-0 max-w-[55%]">

          {/* Session pill */}
          <motion.div {...m(0.15)} className="mb-8">
            <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm"
              style={{ background: 'hsl(263 60% 50% / 0.05)', borderColor: 'hsl(263 60% 50% / 0.2)' }}>
              <Sparkles className="w-3.5 h-3.5 text-violet-400/70" />
              <span className="text-violet-300/80 font-semibold uppercase tracking-[0.2em] text-[10px]">Sesión 2 · La Era Agéntica</span>
              <div className="flex gap-1.5 ml-2">
                {[false, true, false, false].map((active, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      background: active ? 'hsl(263 70% 60%)' : 'hsl(0 0% 100% / 0.1)',
                      boxShadow: active ? '0 0 12px hsl(263 70% 60% / 0.9)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Title ── */}
          <motion.div
            {...m(0.3, { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
          >
            <h1
              className="text-[7rem] lg:text-[9rem] font-black tracking-[-0.055em] text-white leading-[0.8] transition-all duration-700"
              style={{ textShadow: isHovered ? '0 0 120px hsl(263 70% 55% / 0.6)' : '0 0 60px hsl(263 70% 55% / 0.08)' }}
            >
              LA ERA
            </h1>
            <h1
              className="text-[7rem] lg:text-[9rem] font-black tracking-[-0.055em] leading-[0.8] mt-1"
              style={{
                background: 'linear-gradient(135deg, hsl(45 95% 74%) 0%, hsl(38 92% 60%) 25%, hsl(263 68% 70%) 55%, hsl(280 58% 58%) 85%, hsl(300 50% 50%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 ${isHovered ? '80' : '35'}px hsl(263 70% 50% / 0.6))`,
                transition: 'filter 0.7s ease',
              }}
            >
              AGÉNTICA
            </h1>

            {/* Animated accent line */}
            <motion.div
              className="h-[3px] rounded-full mt-7 origin-left"
              style={{ background: 'linear-gradient(90deg, hsl(45 92% 70%), hsl(263 65% 60%) 55%, hsl(280 50% 50% / 0.3) 80%, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* ── Typewriter subtitle ── */}
          <motion.div {...m(0.5)} className="mt-8 h-10 flex items-center">
            <p className="text-[1.5rem] lg:text-[1.75rem] font-light tracking-wide text-white/50 leading-relaxed">
              {subtitle.slice(0, typedCount)}
              {!isExporting && typedCount < subtitle.length && (
                <motion.span
                  className="inline-block w-[2px] h-[1.3em] ml-0.5 align-middle"
                  style={{ background: 'hsl(263 60% 60%)' }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </p>
          </motion.div>

          {/* ── Quote ── */}
          <motion.div {...m(0.65)} className="mt-8 max-w-lg relative">
            <div className="absolute -left-0 top-0 bottom-0 w-[3px] rounded-full"
              style={{ background: 'linear-gradient(to bottom, hsl(263 55% 55%), hsl(45 80% 60% / 0.3), transparent)' }} />
            <div className="pl-5 py-2">
              <p className="text-[14px] text-white/35 font-light leading-relaxed italic">
                "Los <span className="text-violet-400/80 font-medium not-italic">agentes de IA</span> pasan de demos a despliegue empresarial real — dirigir sistemas que toman decisiones."
              </p>
            </div>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div {...m(0.8)} className="mt-10 flex items-center gap-5">
            {/* Dynamic slide count stat */}
            <motion.div
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-sm"
              style={{
                background: 'hsl(0 0% 100% / 0.02)',
                borderColor: 'hsl(0 0% 100% / 0.06)',
              }}
              {...(isExporting ? {} : {
                whileHover: { borderColor: 'hsl(263 70% 60%)', scale: 1.04 },
              })}
            >
              <Brain className="w-4 h-4" style={{ color: 'hsl(263 70% 60%)' }} />
              <span className="text-white/90 font-bold text-sm tabular-nums">{slideNum?.total ?? 21}</span>
              <span className="text-white/30 text-xs uppercase tracking-wider">slides</span>
            </motion.div>
            {STATIC_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-sm"
                  style={{
                    background: 'hsl(0 0% 100% / 0.02)',
                    borderColor: 'hsl(0 0% 100% / 0.06)',
                  }}
                  {...(isExporting ? {} : {
                    whileHover: { borderColor: stat.color, scale: 1.04 },
                  })}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                  <span className="text-white/90 font-bold text-sm tabular-nums">{stat.value}</span>
                  <span className="text-white/30 text-xs uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div {...m(0.95)} className="mt-10 flex items-center gap-6">
            <motion.button
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-semibold text-sm overflow-hidden border transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(263 60% 50% / 0.18), hsl(263 60% 50% / 0.06))',
                borderColor: 'hsl(263 60% 50% / 0.3)',
              }}
              whileHover={isExporting ? {} : { scale: 1.05, borderColor: 'hsl(263 60% 50% / 0.65)' }}
              whileTap={isExporting ? {} : { scale: 0.97 }}
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
            >
              {/* Shimmer */}
              {!isExporting && (
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 60% 70% / 0.12) 50%, transparent 65%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                />
              )}
              <Zap className="w-4 h-4 text-violet-400 relative z-10" />
              <span className="text-white/90 relative z-10">Iniciar Recorrido</span>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 relative z-10" />
            </motion.button>

            <div className="flex items-center gap-4">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, hsl(263 50% 50% / 0.3), transparent)' }} />
              <p className="text-white/20 text-xs font-medium uppercase tracking-[0.2em]">
                {config.date} · {config.instructor}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════ */}
        {/* ── RIGHT: Hero image ──────────── */}
        {/* ═══════════════════════════════════ */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, scale: 0.85, x: 80 },
            animate: { opacity: 1, scale: 1, x: 0 },
            transition: { duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
          })}
          className="relative flex-shrink-0 w-[42%] max-w-[560px]"
        >
          {/* Deep glow */}
          <div className="absolute -inset-20 rounded-full blur-[160px] opacity-50"
            style={{ background: 'radial-gradient(circle, hsl(263 65% 48% / 0.4), hsl(280 50% 40% / 0.15) 50%, transparent 70%)' }} />

          {/* Rotating orbital rings */}
          {!isExporting && (
            <>
              <motion.div
                className="absolute -inset-8 rounded-[36px] border opacity-15"
                style={{ borderColor: 'hsl(263 50% 55% / 0.4)', borderStyle: 'dashed' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-14 rounded-[44px] border opacity-[0.06]"
                style={{ borderColor: 'hsl(45 70% 60% / 0.4)' }}
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          {/* Holographic frame */}
          <div className="relative p-[2px] rounded-[28px]"
            style={{
              background: isHovered
                ? 'linear-gradient(145deg, hsl(45 90% 70% / 0.55), hsl(263 65% 60% / 0.45), hsl(280 55% 50% / 0.35), hsl(45 85% 65% / 0.3))'
                : 'linear-gradient(145deg, hsl(45 85% 68% / 0.4), hsl(263 60% 55% / 0.3), hsl(280 50% 45% / 0.2))',
              transition: 'background 0.6s ease',
            }}>
            <div className="p-[1px] rounded-[27px]" style={{ background: 'hsl(0 0% 0% / 0.65)' }}>
              <motion.img
                src={CLOUD_URL}
                alt="AI Neural Brain — La Era Agéntica"
                className="w-full h-auto rounded-[26px]"
                style={{ boxShadow: '0 50px 120px hsl(263 60% 30% / 0.45), 0 0 0 1px hsl(0 0% 100% / 0.03)' }}
                {...(isExporting ? {} : {
                  whileHover: { scale: 1.03, transition: { duration: 0.6 } },
                })}
              />
            </div>
          </div>

          {/* Floating keyword chips */}
          {!isExporting && FLOATING_TAGS.map((tag, i) => (
            <motion.div
              key={tag.label}
              className="absolute px-3 py-1.5 rounded-full border backdrop-blur-md text-[9px] font-mono uppercase tracking-wider"
              style={{
                left: tag.x,
                top: tag.y,
                background: 'hsl(0 0% 5% / 0.7)',
                borderColor: 'hsl(263 50% 55% / 0.15)',
                color: 'hsl(263 50% 75% / 0.6)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.7, 0.7, 0], y: [0, -8, -8, 0], scale: [0.8, 1, 1, 0.8] }}
              transition={{ duration: 8, repeat: Infinity, delay: tag.delay, ease: 'easeInOut' }}
            >
              {tag.label}
            </motion.div>
          ))}

          {/* Bottom-left badge */}
          <motion.div {...m(0.85)}
            className="absolute -bottom-4 -left-5 px-4 py-2.5 rounded-xl border backdrop-blur-xl"
            style={{
              background: 'hsl(0 0% 4% / 0.92)',
              borderColor: 'hsl(263 50% 50% / 0.2)',
              boxShadow: '0 20px 60px hsl(0 0% 0% / 0.7)',
            }}>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(150 70% 50%)', boxShadow: '0 0 10px hsl(150 70% 50% / 0.8)' }} />
                {!isExporting && (
                  <motion.div className="absolute inset-0 w-2 h-2 rounded-full" style={{ background: 'hsl(150 70% 50%)' }}
                    animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                )}
              </div>
              <span className="text-[11px] font-mono text-white/45 tracking-wider">{slideNum?.total ?? 21} slides · interactive</span>
            </div>
          </motion.div>

          {/* Top-right year badge */}
          <motion.div {...m(1)}
            className="absolute -top-3 -right-5 px-3.5 py-2 rounded-lg border backdrop-blur-xl"
            style={{
              background: 'hsl(0 0% 4% / 0.88)',
              borderColor: 'hsl(45 70% 55% / 0.18)',
              boxShadow: '0 14px 45px hsl(0 0% 0% / 0.55)',
            }}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-amber-400/65 tracking-wider uppercase">2026</span>
              <div className="w-px h-3" style={{ background: 'hsl(0 0% 100% / 0.08)' }} />
              <span className="text-[10px] font-mono text-white/30">S2</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* ── BOTTOM BAR ─────────────────── */}
      {/* ═══════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-12 py-5">
        <div className="h-px flex-1 max-w-[200px]"
          style={{ background: 'linear-gradient(90deg, hsl(263 50% 50% / 0.18), transparent)' }} />
        <span className="text-[11px] font-bold text-white/10 tabular-nums tracking-widest">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '01 / 37'}</span>
      </div>

      {/* ── Cinematic vignette ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
