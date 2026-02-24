import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Presentation, Palette, BarChart3, Layers, Sparkles, Zap, ChevronRight } from 'lucide-react';
const logoVdrc = '/logos/vdrc-white.png';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_EASE, s3MotionEpic, s3GradientTextMulti } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS = [
  { name: 'Canva', icon: Palette, color: 'hsl(263 70% 60%)', hue: 263 },
  { name: 'Krea.ai', icon: Layers, color: 'hsl(185 70% 50%)', hue: 185 },
  { name: 'Cursor', icon: BarChart3, color: 'hsl(38 90% 55%)', hue: 38 },
  { name: 'Claude', icon: Presentation, color: 'hsl(330 60% 55%)', hue: 330 },
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
  const [showCursor, setShowCursor] = useState(true);

  const subtitle = 'Diseña, automatiza y conecta con herramientas IA';

  useEffect(() => {
    if (isExporting) { setTypedCount(subtitle.length); return; }
    const t = setTimeout(() => {
      if (typedCount < subtitle.length) setTypedCount(c => c + 1);
    }, 45);
    return () => clearTimeout(t);
  }, [typedCount, isExporting]);

  useEffect(() => {
    if (isExporting) { setShowCursor(false); return; }
    if (typedCount < subtitle.length) { setShowCursor(true); return; }
    const hideCursorTimer = setTimeout(() => setShowCursor(false), 2000);
    return () => clearTimeout(hideCursorTimer);
  }, [typedCount, isExporting, subtitle.length]);

  const me = (delay: number, overrides?: object) => s3MotionEpic(delay, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex items-center'} style={{ background: S3_THEME.background }}>

      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,_hsl(330_65%_55%_/_0.14),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(263_60%_55%_/_0.1),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_30%,_hsl(185_70%_50%_/_0.08),_transparent_50%)]" />
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
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-6"
      >
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl scale-[2.5]" style={{ background: 'hsl(330 60% 50% / 0.18)' }} />
            <img src={logoVdrc} alt="VDRC" className="relative h-7 sm:h-9 w-auto" />
          </div>
          <div className="flex flex-col">
            <span className="text-white/90 font-bold tracking-wider text-xs sm:text-sm">
              VDRC <span style={{ color: 'hsl(330 60% 55% / 0.3)' }}>·</span> GEN {gen?.generationNumber ? String(gen.generationNumber).padStart(2, '0') : '10'}
            </span>
            <span className="text-white/40 text-[10px] font-mono tracking-[0.3em] uppercase hidden sm:block">Vibe Development & Research</span>
          </div>
        </div>
        <div className="flex items-center gap-2 hidden sm:flex">
          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'hsl(330 50% 60% / 0.6)' }}>
            {gen?.config?.date || '24 de febrero de 2026'}
          </span>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center w-full h-full px-5 sm:px-8 lg:px-20 gap-6 lg:gap-16 pt-20 sm:pt-0">

        {/* ── LEFT: Text block ── */}
        <div className="flex flex-col justify-center flex-1 min-w-0 max-w-full lg:max-w-[55%]">

          {/* Session pill */}
          <motion.div {...me(0.1)} className="mb-4 sm:mb-10">
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
              <Sparkles className="w-3.5 h-3.5 relative" style={{ color: 'hsl(330 60% 60% / 0.7)' }} />
              <span className="font-semibold uppercase tracking-[0.2em] text-[10px] relative" style={{ color: 'hsl(330 60% 72% / 0.8)' }}>Sesión 3 de 4</span>
              <div className="flex gap-1.5 ml-2 relative">
                {[false, false, true, false].map((active, i) => (
                  <div key={i} className="relative">
                    <div className="w-1.5 h-1.5 rounded-full"
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

          {/* ── Title ── */}
          <motion.div
            {...me(0.25, { initial: { opacity: 0, x: -80, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } })}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
          >
            <h1
              className="text-[2.8rem] sm:text-[4.5rem] lg:text-[7rem] 2xl:text-[9rem] font-black tracking-[-0.06em] leading-[0.85] relative"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(330 55% 88%) 50%, hsl(310 50% 80%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 ${isHovered ? '80' : '25'}px hsl(330 70% 50% / 0.3))`,
                transition: 'filter 0.7s ease',
              }}
            >
              PRESENTACIONES
            </h1>
            <h1
              className="text-[2.8rem] sm:text-[4.5rem] lg:text-[7rem] 2xl:text-[9rem] font-black tracking-[-0.06em] leading-[0.85] relative"
              style={{
                ...s3GradientTextMulti([330, 280, 185, 38], 330),
                filter: `drop-shadow(0 0 ${isHovered ? '80' : '35'}px hsl(330 70% 50% / 0.5))`,
                transition: 'filter 0.7s ease',
              }}
            >
              CON IA
            </h1>

            {/* Accent line */}
            <motion.div
              className="h-[2px] sm:h-[3px] rounded-full mt-4 sm:mt-8 origin-left relative"
              style={{ background: 'linear-gradient(90deg, hsl(330 80% 65%), hsl(280 60% 55%) 55%, hsl(185 50% 50% / 0.3) 80%, transparent)' }}
              initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: S3_EASE }}
            >
              {!isExporting && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-[3px] rounded-full"
                  style={{ background: 'hsl(330 90% 75%)', boxShadow: '0 0 16px hsl(330 90% 75% / 0.8)' }}
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ delay: 2, duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
                />
              )}
            </motion.div>
          </motion.div>

          {/* ── Typewriter subtitle ── */}
          <motion.div {...me(0.45)} className="mt-4 sm:mt-8 h-auto sm:h-10 flex items-center">
            <p className="text-sm sm:text-[1.4rem] lg:text-[1.6rem] font-light tracking-wide text-white/40 leading-relaxed">
              {subtitle.slice(0, typedCount)}
              {!isExporting && showCursor && (
                <motion.span
                  className="inline-block w-[2px] h-[1.3em] ml-0.5 align-middle"
                  style={{ background: 'hsl(330 60% 60%)' }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </p>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div {...me(0.75)} className="mt-6 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <motion.button
              className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-sm overflow-hidden border"
              style={{
                background: 'linear-gradient(135deg, hsl(330 60% 50% / 0.2), hsl(330 60% 50% / 0.08))',
                borderColor: 'hsl(330 60% 50% / 0.35)',
                boxShadow: '0 0 40px hsl(330 60% 50% / 0.15), inset 0 1px 0 hsl(330 60% 70% / 0.1)',
              }}
              whileHover={isExporting ? {} : { scale: 1.06, borderColor: 'hsl(330 60% 50% / 0.7)', boxShadow: '0 0 60px hsl(330 60% 50% / 0.3)' }}
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
              <Zap className="w-4 h-4 relative z-10" style={{ color: 'hsl(330 60% 60%)' }} />
              <span className="text-white/90 relative z-10">Comenzar</span>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 relative z-10" />
            </motion.button>

            <span className="text-white/30 text-xs font-medium uppercase tracking-[0.15em]">
              {gen?.config?.instructor || 'Vicente Donoso R.'}
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT: Hero visual ── */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, scale: 0.82, x: 100, filter: 'blur(12px)' },
            animate: { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' },
            transition: { duration: 1.6, delay: 0.15, ease: S3_EASE },
          })}
          className="relative flex-shrink-0 w-full sm:w-[60%] lg:w-[42%] max-w-[540px] hidden sm:block"
        >
          {/* Deep glow */}
          <div className="absolute -inset-24 rounded-full blur-[180px] opacity-50"
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
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_25%_20%,_hsl(330_70%_60%_/_0.2),_transparent_65%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_75%,_hsl(263_65%_58%_/_0.18),_transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_55%_45%,_hsl(185_65%_55%_/_0.1),_transparent_65%)]" />
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

              {/* Tool icons */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-5 p-8">
                  {TOOLS.map((tool, i) => {
                    const Icon = tool.icon;
                    return (
                      <motion.div key={i}
                        className="w-20 h-20 rounded-2xl border flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
                        style={{ borderColor: `${tool.color}30`, background: `${tool.color}08` }}
                        {...(isExporting ? {} : { animate: { scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4], y: [0, -3, 0] }, transition: { duration: 3 + i, repeat: Infinity, delay: i * 0.5 } })}>
                        {!isExporting && (
                          <motion.div className="absolute inset-0 pointer-events-none"
                            style={{ background: `linear-gradient(105deg, transparent 35%, ${tool.color}18 50%, transparent 65%)` }}
                            animate={{ x: ['-150%', '250%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.8 }} />
                        )}
                        <Icon className="w-7 h-7 relative" style={{ color: tool.color }} />
                        <span className="text-[9px] font-mono text-white/30 relative tracking-wider">{tool.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Slide count badge */}
          <motion.div {...me(0.85)}
            className="absolute -bottom-4 -left-5 px-4 py-2.5 rounded-xl border backdrop-blur-xl"
            style={{
              background: 'hsl(0 0% 4% / 0.92)',
              borderColor: 'hsl(330 50% 50% / 0.2)',
              boxShadow: '0 20px 60px hsl(0 0% 0% / 0.7)',
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
              <span className="text-[11px] font-mono text-white/40 tracking-wider">{slideNum?.total ?? 15} slides</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <S3Footer
        sectionLabel="PORTADA"
        hue={330}
        contextHint="sesión 3 · creación digital con IA"
      />
    </div>
  );
}
