import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Presentation, Code2, Cpu, GitBranch, Sparkles, Zap, ChevronRight, Wrench, Workflow } from 'lucide-react';
import bgCover from '@/assets/gen10-s3/bg-s3-cover.jpg';
import logoVdrc from '@/assets/logo-vdrc.png';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';

/* ── Tool badges ── */
const TOOLS = [
  { name: 'Canvas', icon: Presentation, color: 'hsl(185 70% 50%)' },
  { name: 'Claude Code', icon: Cpu, color: 'hsl(280 70% 60%)' },
  { name: 'Cursor', icon: Code2, color: 'hsl(38 90% 55%)' },
  { name: 'GitHub', icon: GitBranch, color: 'hsl(150 60% 50%)' },
];

/* ── Floating keyword chips ── */
const FLOATING_TAGS = [
  { label: 'Canvas', x: '78%', y: '15%', delay: 0 },
  { label: 'MCP', x: '88%', y: '40%', delay: 1.5 },
  { label: 'Cursor', x: '74%', y: '65%', delay: 3 },
  { label: 'Skills', x: '92%', y: '75%', delay: 2 },
];

/* ── Stat pills ── */
const STATS = [
  { icon: Wrench, value: '8+', label: 'herramientas', color: S3_ACCENT.cyan.text },
  { icon: Workflow, value: '5', label: 'workflows', color: S3_ACCENT.emerald.text },
];

export function S3Slide01Cover() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const gen = useGeneration();
  const [isHovered, setIsHovered] = useState(false);
  const [typedCount, setTypedCount] = useState(0);

  const subtitle = 'De consumir contenido a crear soluciones';

  /* Typewriter effect */
  useEffect(() => {
    if (isExporting) { setTypedCount(subtitle.length); return; }
    const t = setTimeout(() => {
      if (typedCount < subtitle.length) setTypedCount(c => c + 1);
    }, 40);
    return () => clearTimeout(t);
  }, [typedCount, isExporting]);

  const m = (delay: number, overrides?: object) => s3Motion(delay, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex items-center'} style={{ background: S3_THEME.background }}>

      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0">
        <img src={bgCover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/50 to-[#04030a]/85" />
        <S3Atmosphere
          isExporting={isExporting}
          particleCount={40}
          primaryHue={330}
          secondaryHue={263}
          tertiaryHue={185}
          showOrbs
          showLightSweep
        />
      </div>

      {/* ═══════════════════════════════════ */}
      {/* ── TOP BAR ────────────────────── */}
      {/* ═══════════════════════════════════ */}
      <motion.div
        {...(isExporting ? {} : { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } })}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-12 py-6"
      >
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl scale-[2.5]" style={{ background: 'hsl(330 60% 50% / 0.15)' }} />
            <img src={logoVdrc} alt="VDRC" className="relative h-9 w-auto" />
          </div>
          <div className="flex flex-col">
            <span className="text-white/90 font-bold tracking-wider text-sm">
              VDRC <span className="text-rose-400/30">·</span> GEN {gen?.generationNumber ? String(gen.generationNumber).padStart(2, '0') : '10'}
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
          <span className="text-[11px] font-mono text-white/30 tracking-wide">vdrc.lovable.app/gen10s3</span>
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
              style={{ background: S3_ACCENT.rose.bg, borderColor: S3_ACCENT.rose.border }}>
              <Sparkles className="w-3.5 h-3.5 text-rose-400/70" />
              <span className="text-rose-300/80 font-semibold uppercase tracking-[0.2em] text-[10px]">Sesión 3 · Comunicación Digital</span>
              <div className="flex gap-1.5 ml-2">
                {[false, false, true, false].map((active, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      background: active ? 'hsl(330 70% 60%)' : 'hsl(0 0% 100% / 0.1)',
                      boxShadow: active ? '0 0 12px hsl(330 70% 60% / 0.9)' : 'none',
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
              className="text-[6.5rem] lg:text-[8.5rem] font-black tracking-[-0.055em] text-white leading-[0.82] transition-all duration-700"
              style={{ textShadow: isHovered ? '0 0 120px hsl(330 70% 55% / 0.5)' : '0 0 60px hsl(330 70% 55% / 0.06)' }}
            >
              COMUNI
            </h1>
            <h1
              className="text-[6.5rem] lg:text-[8.5rem] font-black tracking-[-0.055em] leading-[0.82] mt-1"
              style={{
                background: 'linear-gradient(135deg, hsl(330 85% 68%) 0%, hsl(280 70% 60%) 40%, hsl(185 70% 55%) 75%, hsl(38 80% 60%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 ${isHovered ? '80' : '35'}px hsl(330 70% 50% / 0.55))`,
                transition: 'filter 0.7s ease',
              }}
            >
              CACIÓN
            </h1>

            {/* Animated accent line */}
            <motion.div
              className="h-[3px] rounded-full mt-7 origin-left"
              style={{ background: 'linear-gradient(90deg, hsl(330 80% 65%), hsl(280 60% 55%) 55%, hsl(185 50% 50% / 0.3) 80%, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: S3_EASE }}
            />
          </motion.div>

          {/* ── Typewriter subtitle ── */}
          <motion.div {...m(0.5)} className="mt-8 h-10 flex items-center">
            <p className="text-[1.4rem] lg:text-[1.65rem] font-light tracking-wide text-white/45 leading-relaxed">
              {subtitle.slice(0, typedCount)}
              {!isExporting && typedCount < subtitle.length && (
                <motion.span
                  className="inline-block w-[2px] h-[1.3em] ml-0.5 align-middle"
                  style={{ background: 'hsl(330 60% 60%)' }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </p>
          </motion.div>

          {/* ── Quote ── */}
          <motion.div {...m(0.65)} className="mt-8 max-w-lg relative">
            <div className="absolute -left-0 top-0 bottom-0 w-[3px] rounded-full"
              style={{ background: 'linear-gradient(to bottom, hsl(330 55% 55%), hsl(280 50% 50% / 0.3), transparent)' }} />
            <div className="pl-5 py-2">
              <p className="text-[14px] text-white/35 font-light leading-relaxed italic">
                "De <span className="text-rose-400/80 font-medium not-italic">consumir contenido</span> a crear soluciones — Canvas, Claude Code, Cursor y GitHub convierten ideas en productos."
              </p>
            </div>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div {...m(0.8)} className="mt-10 flex items-center gap-5">
            <motion.div
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-sm"
              style={{ background: 'hsl(0 0% 100% / 0.02)', borderColor: 'hsl(0 0% 100% / 0.06)' }}
              {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.rose.text, scale: 1.04 } })}
            >
              <Sparkles className="w-4 h-4" style={{ color: S3_ACCENT.rose.text }} />
              <span className="text-white/90 font-bold text-sm tabular-nums">{slideNum?.total ?? 15}</span>
              <span className="text-white/30 text-xs uppercase tracking-wider">slides</span>
            </motion.div>
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-sm"
                  style={{ background: 'hsl(0 0% 100% / 0.02)', borderColor: 'hsl(0 0% 100% / 0.06)' }}
                  {...(isExporting ? {} : { whileHover: { borderColor: stat.color, scale: 1.04 } })}
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
                background: 'linear-gradient(135deg, hsl(330 60% 50% / 0.18), hsl(330 60% 50% / 0.06))',
                borderColor: 'hsl(330 60% 50% / 0.3)',
              }}
              whileHover={isExporting ? {} : { scale: 1.05, borderColor: 'hsl(330 60% 50% / 0.65)' }}
              whileTap={isExporting ? {} : { scale: 0.97 }}
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
            >
              {!isExporting && (
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(330 60% 70% / 0.12) 50%, transparent 65%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                />
              )}
              <Zap className="w-4 h-4 text-rose-400 relative z-10" />
              <span className="text-white/90 relative z-10">Iniciar Recorrido</span>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 relative z-10" />
            </motion.button>

            <div className="flex items-center gap-4">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, hsl(330 50% 50% / 0.3), transparent)' }} />
              <p className="text-white/20 text-xs font-medium uppercase tracking-[0.2em]">
                {gen?.config?.date || '24 de febrero de 2026'} · {gen?.config?.instructor || 'Vicente Donoso R.'}
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
            transition: { duration: 1.4, delay: 0.2, ease: S3_EASE },
          })}
          className="relative flex-shrink-0 w-[42%] max-w-[540px]"
        >
          {/* Deep glow */}
          <div className="absolute -inset-20 rounded-full blur-[160px] opacity-50"
            style={{ background: 'radial-gradient(circle, hsl(330 65% 48% / 0.35), hsl(280 50% 40% / 0.12) 50%, transparent 70%)' }} />

          {/* Rotating orbital rings */}
          {!isExporting && (
            <>
              <motion.div
                className="absolute -inset-8 rounded-[36px] border opacity-15"
                style={{ borderColor: 'hsl(330 50% 55% / 0.4)', borderStyle: 'dashed' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-14 rounded-[44px] border opacity-[0.06]"
                style={{ borderColor: 'hsl(185 60% 55% / 0.4)' }}
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          {/* Holographic frame */}
          <div className="relative p-[2px] rounded-[28px]"
            style={{
              background: isHovered
                ? 'linear-gradient(145deg, hsl(330 85% 65% / 0.55), hsl(280 65% 60% / 0.45), hsl(185 55% 50% / 0.35), hsl(38 85% 65% / 0.3))'
                : 'linear-gradient(145deg, hsl(330 80% 60% / 0.4), hsl(280 60% 55% / 0.3), hsl(185 50% 45% / 0.2))',
              transition: 'background 0.6s ease',
            }}>
            <div className="p-[1px] rounded-[27px]" style={{ background: 'hsl(0 0% 0% / 0.65)' }}>
              <img
                src={bgCover}
                alt="Comunicación y Creación Digital"
                className="w-full h-auto rounded-[26px]"
                style={{ boxShadow: '0 50px 120px hsl(330 60% 30% / 0.4), 0 0 0 1px hsl(0 0% 100% / 0.03)' }}
              />
            </div>
          </div>

          {/* Floating keyword chips */}
          {!isExporting && FLOATING_TAGS.map((tag) => (
            <motion.div
              key={tag.label}
              className="absolute px-3 py-1.5 rounded-full border backdrop-blur-md text-[9px] font-mono uppercase tracking-wider"
              style={{
                left: tag.x,
                top: tag.y,
                background: 'hsl(0 0% 5% / 0.7)',
                borderColor: 'hsl(330 50% 55% / 0.15)',
                color: 'hsl(330 50% 75% / 0.6)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.7, 0.7, 0], y: [0, -8, -8, 0], scale: [0.8, 1, 1, 0.8] }}
              transition={{ duration: 8, repeat: Infinity, delay: tag.delay, ease: 'easeInOut' }}
            >
              {tag.label}
            </motion.div>
          ))}

          {/* Bottom-left badge — slide count */}
          <motion.div {...m(0.85)}
            className="absolute -bottom-4 -left-5 px-4 py-2.5 rounded-xl border backdrop-blur-xl"
            style={{
              background: 'hsl(0 0% 4% / 0.92)',
              borderColor: 'hsl(330 50% 50% / 0.2)',
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
              <span className="text-[11px] font-mono text-white/45 tracking-wider">{slideNum?.total ?? 15} slides · interactive</span>
            </div>
          </motion.div>

          {/* Top-right badge — year / session */}
          <motion.div {...m(1)}
            className="absolute -top-3 -right-5 px-3.5 py-2 rounded-lg border backdrop-blur-xl"
            style={{
              background: 'hsl(0 0% 4% / 0.88)',
              borderColor: 'hsl(330 70% 55% / 0.18)',
              boxShadow: '0 14px 45px hsl(0 0% 0% / 0.55)',
            }}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-rose-400/65 tracking-wider uppercase">2026</span>
              <div className="w-px h-3" style={{ background: 'hsl(0 0% 100% / 0.08)' }} />
              <span className="text-[10px] font-mono text-white/30">S3</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* ── BOTTOM BAR ─────────────────── */}
      {/* ═══════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-12 py-5">
        <div className="h-px flex-1 max-w-[200px]"
          style={{ background: 'linear-gradient(90deg, hsl(330 50% 50% / 0.18), transparent)' }} />
        <span className="text-[11px] font-bold text-white/10 tabular-nums tracking-widest">
          {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '01 / 15'}
        </span>
      </div>

      {/* Cinematic vignette provided by S3Atmosphere */}
    </div>
  );
}
