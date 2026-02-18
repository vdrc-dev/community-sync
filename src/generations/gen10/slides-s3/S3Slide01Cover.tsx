import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Presentation, Palette, BarChart3, Layers, Sparkles, Zap, ChevronRight, Wrench, Workflow } from 'lucide-react';
const logoVdrc = '/logos/vdrc-white.png';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_EASE, s3Motion, s3MotionEpic, s3GradientTextMulti } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS = [
  { name: 'Gamma', icon: Presentation, color: 'hsl(263 70% 60%)', hue: 263, href: 'https://gamma.app' },
  { name: 'Coolors', icon: Palette, color: 'hsl(185 70% 50%)', hue: 185, href: 'https://coolors.co' },
  { name: 'Canvas', icon: BarChart3, color: 'hsl(38 90% 55%)', hue: 38, href: 'https://chatgpt.com' },
  { name: 'Napkin', icon: Layers, color: 'hsl(150 60% 50%)', hue: 150, href: 'https://napkin.ai' },
];

const STATS = [
  { icon: Wrench, value: '8+', label: 'herramientas', color: S3_ACCENT.cyan.text },
  { icon: Workflow, value: '5', label: 'workflows', color: S3_ACCENT.emerald.text },
];

const CONSTELLATION_LINES = [
  { x1: 22, y1: 28, x2: 52, y2: 40 },
  { x1: 52, y1: 40, x2: 68, y2: 62 },
  { x1: 36, y1: 68, x2: 68, y2: 62 },
  { x1: 22, y1: 28, x2: 36, y2: 68 },
  { x1: 22, y1: 28, x2: 68, y2: 62 },
];

export function S3Slide01Cover() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const gen = useGeneration();
  const [isHovered, setIsHovered] = useState(false);
  const [typedCount, setTypedCount] = useState(0);

  const subtitle = 'De ideas a presentaciones profesionales con IA';

  useEffect(() => {
    if (isExporting) { setTypedCount(subtitle.length); return; }
    const t = setTimeout(() => {
      if (typedCount < subtitle.length) setTypedCount(c => c + 1);
    }, 50);
    return () => clearTimeout(t);
  }, [typedCount, isExporting]);

  const m = (delay: number, overrides?: object) => s3Motion(delay, isExporting, overrides);
  const me = (delay: number, overrides?: object) => s3MotionEpic(delay, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex items-center'} style={{ background: S3_THEME.background }}>

      {/* ── Epic Atmospheric Background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,_hsl(330_65%_55%_/_0.14),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(263_60%_55%_/_0.1),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_30%,_hsl(185_70%_50%_/_0.08),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,_transparent_35%,_hsl(330_70%_58%_/_0.1)_50%,_transparent_65%)]" />
        <S3Atmosphere
          isExporting={isExporting}
          particleCount={40}
          primaryHue={330}
          secondaryHue={263}
          tertiaryHue={185}
          showOrbs
          showLightSweep
          showAurora
        />
      </div>

      {/* ── TOP BAR ── */}
      <motion.div
        {...(isExporting ? {} : { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } })}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-12 py-6"
      >
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl scale-[2.5]" style={{ background: 'hsl(330 60% 50% / 0.18)' }} />
            <img src={logoVdrc} alt="VDRC" className="relative h-9 w-auto" />
          </div>
          <div className="flex flex-col">
            <span className="text-white/90 font-bold tracking-wider text-sm">
              VDRC <span className="text-rose-400/30">·</span> GEN {gen?.generationNumber ? String(gen.generationNumber).padStart(2, '0') : '10'}
            </span>
            <span className="text-white/45 text-[10px] font-mono tracking-[0.3em] uppercase">Vibe Development & Research</span>
          </div>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex items-center w-full h-full px-12 lg:px-20 gap-12">

        {/* ── LEFT: Text block ── */}
        <div className="flex flex-col justify-center flex-1 min-w-0 max-w-[55%]">

          {/* Session pill with breathing glow */}
          <motion.div {...me(0.1)} className="mb-8">
            <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm"
              style={{ background: S3_ACCENT.rose.bg, borderColor: S3_ACCENT.rose.border }}>
              {!isExporting && (
                <motion.div
                  className="absolute -inset-1 rounded-full blur-xl pointer-events-none"
                  style={{ background: S3_ACCENT.rose.glow }}
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <Sparkles className="w-3.5 h-3.5 text-rose-400/70 relative" />
              <span className="text-rose-300/80 font-semibold uppercase tracking-[0.2em] text-[10px] relative">Sesión 3 · Presentaciones con IA</span>
              <div className="flex gap-1.5 ml-2 relative">
                {[false, false, true, false].map((active, i) => (
                  <div key={i} className="relative">
                    <div className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{
                        background: active ? 'hsl(330 70% 60%)' : 'hsl(0 0% 100% / 0.1)',
                        boxShadow: active ? '0 0 14px hsl(330 70% 60% / 0.9)' : 'none',
                      }}
                    />
                    {active && !isExporting && (
                      <motion.div
                        className="absolute -inset-1 rounded-full"
                        style={{ background: 'hsl(330 70% 60%)' }}
                        animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Epic Title ── */}
          <motion.div
            {...me(0.25, { initial: { opacity: 0, x: -80, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
          >
            <h1
              className="text-[7rem] lg:text-[9rem] font-black tracking-[-0.055em] leading-[0.88] transition-all duration-700 relative"
              style={{
                ...s3GradientTextMulti([0, 330, 310], 330),
                filter: `drop-shadow(0 0 ${isHovered ? '90' : '30'}px hsl(330 70% 50% / 0.3))`,
                transition: 'filter 0.7s ease',
                background: `linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(330 60% 85%) 60%, hsl(310 55% 75%) 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PRESEN
            </h1>
            <h1
              className="text-[7rem] lg:text-[9rem] font-black tracking-[-0.055em] leading-[0.88] mt-1 relative"
              style={{
                ...s3GradientTextMulti([330, 280, 185, 38], 330),
                filter: `drop-shadow(0 0 ${isHovered ? '90' : '40'}px hsl(330 70% 50% / 0.6))`,
                transition: 'filter 0.7s ease',
              }}
            >
              TACIÓN
            </h1>

            {/* Animated accent line */}
            <motion.div
              className="h-[3px] rounded-full mt-7 origin-left relative"
              style={{ background: 'linear-gradient(90deg, hsl(330 80% 65%), hsl(280 60% 55%) 55%, hsl(185 50% 50% / 0.3) 80%, transparent)' }}
              initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: S3_EASE }}
            >
              {/* Traveling light dot on accent line */}
              {!isExporting && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-[3px] rounded-full"
                  style={{ background: 'hsl(330 90% 75%)', boxShadow: '0 0 12px hsl(330 90% 75% / 0.8)' }}
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ delay: 2, duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
                />
              )}
            </motion.div>
          </motion.div>

          {/* ── Typewriter subtitle ── */}
          <motion.div {...me(0.45)} className="mt-8 h-10 flex items-center">
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

          {/* ── Quote with glow border ── */}
          <motion.div {...me(0.6)} className="mt-8 max-w-lg relative">
            <div className="absolute -left-0 top-0 bottom-0 w-[3px] rounded-full overflow-hidden"
              style={{ background: 'linear-gradient(to bottom, hsl(330 55% 55%), hsl(280 50% 50% / 0.3), transparent)' }}>
              {!isExporting && (
                <motion.div
                  className="absolute w-full h-8 rounded-full"
                  style={{ background: 'hsl(330 80% 70%)' }}
                  animate={{ top: ['-20%', '120%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                />
              )}
            </div>
            <div className="pl-5 py-2">
              <p className="text-[15px] text-white/40 font-light leading-relaxed italic">
                "De <span className="text-rose-400/80 font-medium not-italic">diseño con propósito</span> a presentaciones profesionales — Gamma, Napkin, Canvas y Coolors convierten ideas en comunicación visual."
              </p>
            </div>
          </motion.div>

          {/* ── Stats row with shimmer ── */}
          <motion.div {...me(0.75)} className="mt-10 flex items-center gap-5">
            <motion.div
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-sm relative overflow-hidden"
              style={{ background: 'hsl(0 0% 100% / 0.02)', borderColor: 'hsl(0 0% 100% / 0.08)' }}
              {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.rose.text, scale: 1.04 } })}
            >
              {!isExporting && (
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(330 60% 60% / 0.08) 50%, transparent 65%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }} />
              )}
              <Sparkles className="w-4 h-4 relative" style={{ color: S3_ACCENT.rose.text }} />
              <span className="text-white/90 font-bold text-sm tabular-nums relative">{slideNum?.total ?? 15}</span>
              <span className="text-white/40 text-xs uppercase tracking-wider relative">slides</span>
            </motion.div>
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-sm relative overflow-hidden"
                  style={{ background: 'hsl(0 0% 100% / 0.02)', borderColor: 'hsl(0 0% 100% / 0.08)' }}
                  {...(isExporting ? {} : { whileHover: { borderColor: stat.color, scale: 1.04 } })}
                >
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${stat.color}15 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
                  )}
                  <Icon className="w-4 h-4 relative" style={{ color: stat.color }} />
                  <span className="text-white/90 font-bold text-sm tabular-nums relative">{stat.value}</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider relative">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── CTA with epic glow ── */}
          <motion.div {...me(0.9)} className="mt-10 flex items-center gap-6">
            <motion.button
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm overflow-hidden border transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(330 60% 50% / 0.2), hsl(330 60% 50% / 0.08))',
                borderColor: 'hsl(330 60% 50% / 0.35)',
                boxShadow: '0 0 40px hsl(330 60% 50% / 0.15), inset 0 1px 0 hsl(330 60% 70% / 0.1)',
              }}
              whileHover={isExporting ? {} : { scale: 1.06, borderColor: 'hsl(330 60% 50% / 0.7)', boxShadow: '0 0 60px hsl(330 60% 50% / 0.3), inset 0 1px 0 hsl(330 60% 70% / 0.15)' }}
              whileTap={isExporting ? {} : { scale: 0.97 }}
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
            >
              {!isExporting && (
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(330 60% 70% / 0.15) 50%, transparent 65%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                />
              )}
              <Zap className="w-4 h-4 text-rose-400 relative z-10" />
              <span className="text-white/90 relative z-10">Iniciar Recorrido</span>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 relative z-10" />
            </motion.button>

            <div className="flex items-center gap-4">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, hsl(330 50% 50% / 0.3), transparent)' }} />
              <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">
                {gen?.config?.date || '17 de febrero de 2026'} · {gen?.config?.instructor || 'Vicente Donoso R.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Hero visual ── */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, scale: 0.82, x: 100, filter: 'blur(12px)' },
            animate: { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' },
            transition: { duration: 1.6, delay: 0.15, ease: S3_EASE },
          })}
          className="relative flex-shrink-0 w-[42%] max-w-[540px]"
        >
          {/* Deep layered glow */}
          <div className="absolute -inset-24 rounded-full blur-[180px] opacity-55"
            style={{ background: 'radial-gradient(circle, hsl(330 70% 50% / 0.4), hsl(280 55% 42% / 0.15) 50%, transparent 70%)' }} />

          {/* Holographic frame */}
          <div className="relative p-[2px] rounded-[28px]"
            style={{
              background: isHovered
                ? 'linear-gradient(145deg, hsl(330 85% 65% / 0.6), hsl(280 65% 60% / 0.5), hsl(185 55% 50% / 0.4), hsl(38 85% 65% / 0.35))'
                : 'linear-gradient(145deg, hsl(330 80% 60% / 0.45), hsl(280 60% 55% / 0.35), hsl(185 50% 45% / 0.25))',
              transition: 'background 0.6s ease',
            }}>
            <div className="rounded-[27px] aspect-[4/3] overflow-hidden relative"
              style={{ background: 'hsl(0 0% 2%)', boxShadow: '0 50px 140px hsl(330 65% 32% / 0.45), 0 0 0 1px hsl(0 0% 100% / 0.08), 0 0 80px hsl(280 50% 40% / 0.2)' }}>
              {/* Internal glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_hsl(330_65%_55%_/_0.18),_transparent_70%)]" />
              {/* Constellation */}
              <div className="absolute inset-0">
                <svg className="w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {CONSTELLATION_LINES.map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                      stroke="hsl(330 75% 68% / 0.4)"
                      strokeWidth="0.4"
                      strokeDasharray="1.5 1.5"
                      {...(isExporting ? {} : { animate: { opacity: [0.15, 0.45, 0.15] }, transition: { duration: 3 + i * 0.8, repeat: Infinity, ease: 'easeInOut' } })}
                    />
                  ))}
                  {/* Pulsing nodes at constellation intersections */}
                  {[[22, 28], [52, 40], [68, 62], [36, 68]].map(([cx, cy], i) => (
                    <motion.circle
                      key={`node-${i}`}
                      cx={cx} cy={cy} r="1.5"
                      fill={`hsl(${[330, 263, 185, 38][i]} 70% 65%)`}
                      {...(isExporting ? {} : {
                        animate: { r: [1.5, 2.5, 1.5], opacity: [0.25, 0.45, 0.25] },
                        transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 },
                      })}
                    />
                  ))}
                </svg>
              </div>
              {/* Tool icons grid */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  {TOOLS.map((tool, i) => {
                    const Icon = tool.icon;
                    return (
                      <motion.a key={i} href={tool.href} target="_blank" rel="noopener noreferrer"
                        className="w-20 h-20 rounded-2xl border flex items-center justify-center relative overflow-hidden cursor-pointer hover:border-opacity-60 transition-colors"
                        style={{ borderColor: `${tool.color}35`, background: `${tool.color}0a` }}
                        {...(isExporting ? {} : { animate: { scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4], y: [0, -3, 0] }, transition: { duration: 3 + i, repeat: Infinity, delay: i * 0.5 } })}>
                        {!isExporting && (
                          <motion.div className="absolute inset-0 pointer-events-none"
                            style={{ background: `linear-gradient(105deg, transparent 35%, ${tool.color}18 50%, transparent 65%)` }}
                            animate={{ x: ['-150%', '250%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.8 }} />
                        )}
                        <Icon className="w-8 h-8 relative" style={{ color: tool.color }} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-left badge */}
          <motion.div {...m(0.85)}
            className="absolute -bottom-4 -left-5 px-4 py-2.5 rounded-xl border backdrop-blur-xl"
            style={{
              background: 'hsl(0 0% 4% / 0.92)',
              borderColor: 'hsl(330 50% 50% / 0.25)',
              boxShadow: '0 20px 60px hsl(0 0% 0% / 0.7), 0 0 30px hsl(330 50% 50% / 0.08)',
            }}>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(150 70% 50%)', boxShadow: '0 0 12px hsl(150 70% 50% / 0.8)' }} />
                {!isExporting && (
                  <motion.div className="absolute inset-0 w-2 h-2 rounded-full" style={{ background: 'hsl(150 70% 50%)' }}
                    animate={{ scale: [1, 2.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                )}
              </div>
              <span className="text-[11px] font-mono text-white/45 tracking-wider">{slideNum?.total ?? 15} slides · interactive</span>
            </div>
          </motion.div>

          {/* Top-right badge */}
          <motion.div {...m(1)}
            className="absolute -top-3 -right-5 px-3.5 py-2 rounded-lg border backdrop-blur-xl"
            style={{
              background: 'hsl(0 0% 4% / 0.88)',
              borderColor: 'hsl(330 70% 55% / 0.22)',
              boxShadow: '0 14px 45px hsl(0 0% 0% / 0.55), 0 0 20px hsl(330 60% 50% / 0.06)',
            }}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-rose-400/65 tracking-wider uppercase">2026</span>
              <div className="w-px h-3" style={{ background: 'hsl(0 0% 100% / 0.08)' }} />
              <span className="text-[10px] font-mono text-white/45">S3</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <S3Footer
        sectionLabel={`VDRC · Gen ${gen?.generationNumber ? String(gen.generationNumber).padStart(2, '0') : '10'}`}
        hue={330}
        contextHint="Apertura"
      />
    </div>
  );
}
