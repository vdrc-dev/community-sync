/**
 * S3SlideDivider — Epic section divider for S3 presentations.
 * Features: light burst, pulsing module number, dramatic entrance, tool pills with shimmer.
 */
import { motion } from 'framer-motion';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ROOT_CLASS, S3_EASE, s3Motion, s3MotionEpic } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

interface S3SlideDividerProps {
  moduleNum: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentHue: number;
  accentSat?: number;
  accentLight?: number;
  tools?: Array<string | { label: string; href?: string }>;
}

export function S3SlideDivider({
  moduleNum,
  title,
  subtitle,
  icon: Icon,
  accentHue,
  accentSat = 65,
  accentLight = 55,
  tools = [],
}: S3SlideDividerProps) {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  const accent = `hsl(${accentHue} ${accentSat}% ${accentLight}%)`;
  const accentDim = `hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.12)`;
  const accentBorder = `hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.3)`;
  const accentText = `hsl(${accentHue} ${accentSat}% ${accentLight + 15}%)`;

  return (
    <div className={S3_ROOT_CLASS + ' flex items-center justify-center'} style={{ background: S3_THEME.background }}>
      {/* Atmospheric layers with aurora and light sweep */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.18), transparent 65%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 40% at 80% 70%, hsl(${(accentHue + 40) % 360} 50% 50% / 0.08), transparent 55%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 40% 35% at 20% 30%, hsl(${(accentHue + 80) % 360} 45% 45% / 0.06), transparent 50%)` }} />
        <S3Atmosphere
          isExporting={isExporting}
          particleCount={12}
          primaryHue={accentHue}
          secondaryHue={(accentHue + 60) % 360}
          tertiaryHue={(accentHue + 120) % 360}
          showOrbs
          showLightSweep
          showAurora
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-12">
        {/* Large module number with pulsing glow */}
        <motion.div {...me(0)} className="mb-6 relative">
          {!isExporting && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none"
              style={{ background: `hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.12)` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <span
            className="text-[14rem] font-black leading-none select-none relative"
            style={{
              background: `linear-gradient(180deg, hsl(${accentHue} ${accentSat}% ${accentLight + 10}% / 0.18), hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.04))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 80px hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.25))`,
            }}
          >
            {moduleNum}
          </span>
        </motion.div>

        {/* Module badge with breathing glow */}
        <motion.div {...me(0.08)} className="mb-5 -mt-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border" style={{ borderColor: accentBorder, background: accentDim }}>
            <Icon className="w-4 h-4" style={{ color: accentText }} />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: accentText }}>MÓDULO {moduleNum}</span>
          </div>
        </motion.div>

        {/* Title with text glow */}
        <motion.h1
          {...me(0.15, { initial: { opacity: 0, scale: 0.88, filter: 'blur(8px)' }, animate: { opacity: 1, scale: 1, filter: 'blur(0px)' } })}
          className="text-6xl 2xl:text-7xl font-black tracking-tight mb-4"
          style={{
            background: `linear-gradient(135deg, hsl(0 0% 100%) 20%, hsl(${accentHue} ${accentSat}% ${accentLight + 15}%) 70%, hsl(${(accentHue + 40) % 360} ${accentSat}% ${accentLight + 10}%) 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 50px hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.35))`,
          }}
        >
          {title}
        </motion.h1>

        {/* Accent line with traveling light */}
        <motion.div
          className="h-[2px] rounded-full mx-auto max-w-[180px] origin-center relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: S3_EASE }}
        >
          {!isExporting && (
            <motion.div
              className="absolute top-0 h-full w-8 rounded-full"
              style={{ background: `hsl(${accentHue} 85% 72%)`, boxShadow: `0 0 10px hsl(${accentHue} 85% 72% / 0.8)` }}
              animate={{ left: ['-10%', '110%'] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
            />
          )}
        </motion.div>

        {/* Subtitle */}
        <motion.p {...m(0.25)} className="text-white/40 text-xl mt-5 mb-10 font-light max-w-lg mx-auto">
          {subtitle}
        </motion.p>

        {/* Tool pills with shimmer */}
        {tools.length > 0 && (
          <motion.div {...m(0.35)} className="flex items-center justify-center gap-3 flex-wrap">
            {tools.map((tool, i) => {
              const label = typeof tool === 'string' ? tool : tool.label;
              const href = typeof tool === 'string' ? undefined : tool.href;
              return (
                <motion.div
                  key={label}
                  className="px-5 py-2.5 rounded-xl border backdrop-blur-sm relative overflow-hidden group"
                  style={{ borderColor: accentBorder, background: accentDim }}
                  {...(isExporting
                    ? {}
                    : {
                        whileHover: { scale: 1.08, borderColor: accent, boxShadow: `0 0 25px hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.2)` },
                        initial: { opacity: 0, y: 20, scale: 0.95 },
                        animate: { opacity: 1, y: 0, scale: 1 },
                        transition: { delay: 0.4 + i * 0.08, duration: 0.7, ease: S3_EASE },
                      })}
                >
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, hsl(${accentHue} ${accentSat}% ${accentLight + 10}% / 0.1) 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.5 }}
                    />
                  )}
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold hover:underline underline-offset-2 relative"
                      style={{ color: accentText }}
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm font-bold relative" style={{ color: accentText }}>
                      {label}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Navigation cue with animated arrow */}
      <motion.div
        {...m(0.5)}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase"
        style={{ color: `${accentText}60` }}
      >
        <div className="w-10 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentBorder})` }} />
        <span>Siguiente</span>
        {!isExporting && (
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        )}
        <div className="w-10 h-px" style={{ background: `linear-gradient(90deg, ${accentBorder}, transparent)` }} />
      </motion.div>

      <S3Footer sectionLabel={`Módulo ${moduleNum}`} hue={accentHue} contextHint={title} />
    </div>
  );
}
