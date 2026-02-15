/**
 * S3SlideDivider — Reusable section divider for S3 presentations.
 * Shows a large module number, title, subtitle, and tool preview.
 */
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ROOT_CLASS, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';

interface S3SlideDividerProps {
  moduleNum: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentHue: number;
  accentSat?: number;
  accentLight?: number;
  tools?: string[];
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

  const accent = `hsl(${accentHue} ${accentSat}% ${accentLight}%)`;
  const accentDim = `hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.12)`;
  const accentBorder = `hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.3)`;
  const accentText = `hsl(${accentHue} ${accentSat}% ${accentLight + 15}%)`;
  const accentGlow = `hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.25)`;

  return (
    <div className={S3_ROOT_CLASS + ' flex items-center justify-center'} style={{ background: S3_THEME.background }}>
      {/* Atmospheric layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.15), transparent 65%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 40% at 80% 70%, hsl(${accentHue + 40} 50% 50% / 0.06), transparent 55%)` }} />
        <S3Atmosphere isExporting={isExporting} particleCount={12} primaryHue={accentHue} secondaryHue={(accentHue + 60) % 360} tertiaryHue={(accentHue + 120) % 360} showOrbs showLightSweep />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-12">
        {/* Large module number */}
        <motion.div {...m(0)} className="mb-6">
          <span
            className="text-[12rem] font-black leading-none select-none"
            style={{
              background: `linear-gradient(180deg, hsl(${accentHue} ${accentSat}% ${accentLight + 10}% / 0.15), hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.03))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0 0 60px hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.2))`,
            }}
          >
            {moduleNum}
          </span>
        </motion.div>

        {/* Module badge */}
        <motion.div {...m(0.1)} className="mb-5 -mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: accentBorder, background: accentDim }}>
            <Icon className="w-3.5 h-3.5" style={{ color: accentText }} />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: accentText }}>MÓDULO {moduleNum}</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...m(0.15, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } })}
          className="text-6xl 2xl:text-7xl font-black text-white tracking-tight mb-4"
          style={{
            textShadow: `0 0 80px hsl(${accentHue} ${accentSat}% ${accentLight}% / 0.3)`,
          }}
        >
          {title}
        </motion.h1>

        {/* Accent line */}
        <motion.div
          className="h-[3px] rounded-full mx-auto max-w-[160px] origin-center"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: S3_EASE }}
        />

        {/* Subtitle */}
        <motion.p {...m(0.25)} className="text-white/35 text-xl mt-5 mb-8 font-light">
          {subtitle}
        </motion.p>

        {/* Tool pills */}
        {tools.length > 0 && (
          <motion.div {...m(0.35)} className="flex items-center justify-center gap-3 flex-wrap">
            {tools.map((tool, i) => (
              <motion.div
                key={tool}
                className="px-4 py-2 rounded-xl border backdrop-blur-sm"
                style={{ borderColor: accentBorder, background: accentDim }}
                {...(isExporting ? {} : {
                  whileHover: { scale: 1.06, borderColor: accent },
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.4 + i * 0.08, duration: 0.6, ease: S3_EASE },
                })}
              >
                <span className="text-sm font-bold" style={{ color: accentText }}>{tool}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Orbital decorative ring */}
        {!isExporting && (
          <>
            <motion.div
              className="absolute left-1/2 top-[35%] -translate-x-1/2 w-[500px] h-[500px] rounded-full border pointer-events-none"
              style={{ borderColor: `${accent}12`, borderStyle: 'dashed' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute left-1/2 top-[35%] -translate-x-1/2 w-[600px] h-[600px] rounded-full border pointer-events-none"
              style={{ borderColor: `hsl(${(accentHue + 60) % 360} 50% 50% / 0.06)` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            />
          </>
        )}
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          {...m(0.5)}
          className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase"
          style={{ color: `${accentText}50` }}
        >
          <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentBorder})` }} />
          <span>Siguiente →</span>
          <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, ${accentBorder}, transparent)` }} />
        </motion.div>
      </div>
    </div>
  );
}
