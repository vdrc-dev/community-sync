/**
 * S4Atmosphere — Ultra-cinematic atmospheric background for S4 slides.
 * Identical feature set to S3Atmosphere with S4 hue defaults.
 */
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { S4_THEME, S4_PARTICLE_HUES } from './theme';

interface S4AtmosphereProps {
  isExporting: boolean;
  particleCount?: number;
  primaryHue?: number;
  secondaryHue?: number;
  tertiaryHue?: number;
  showOrbs?: boolean;
  showLightSweep?: boolean;
  showAurora?: boolean;
  showLightRays?: boolean;
  showConstellation?: boolean;
  showPlasma?: boolean;
  showHolographic?: boolean;
  showChromatic?: boolean;
  intensity?: number;
}

export function S4Atmosphere({
  isExporting,
  particleCount = 15,
  primaryHue = 330,
  secondaryHue = 270,
  tertiaryHue = 185,
  showOrbs = true,
  showLightSweep = false,
  showAurora = true,
  showLightRays = false,
  showConstellation = false,
  showPlasma = false,
  showHolographic = false,
  showChromatic = false,
  intensity = 1,
}: S4AtmosphereProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => {
        const seed = (i + 1) * 41.733;
        const size = 1 + (seed % 3);
        return {
          id: i,
          hue: S4_PARTICLE_HUES[i % S4_PARTICLE_HUES.length],
          left: `${(seed * 13.71) % 100}%`,
          top: `${(seed * 29.17) % 100}%`,
          size,
          rise: 18 + (seed % 35),
          drift: (seed % 2 === 0 ? 1 : -1) * (5 + (seed % 12)),
          duration: 6 + (seed % 8),
          delay: seed % 8,
        };
      }),
    [particleCount]
  );

  const constellationNodes = useMemo(() =>
    Array.from({ length: 10 }).map((_, i) => {
      const seed = (i + 1) * 53.29;
      return {
        cx: 5 + (seed * 7.3) % 90,
        cy: 5 + (seed * 11.7) % 90,
        hue: [primaryHue, secondaryHue, tertiaryHue][i % 3],
      };
    }),
    [primaryHue, secondaryHue, tertiaryHue]
  );

  const opMul = Math.min(intensity, 1.5);

  return (
    <>
      {/* ── Radial gradients ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 130% 70% at 55% -25%, hsl(${primaryHue} 85% 45% / ${0.24 * opMul}), transparent 60%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 55% at -5% 110%, hsl(${secondaryHue} 65% 38% / ${0.14 * opMul}), transparent 55%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 55% 55% at 105% 15%, hsl(${tertiaryHue} 75% 52% / ${0.09 * opMul}), transparent 50%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 75% 60% at 50% 120%, hsl(${primaryHue} 78% 58% / ${0.1 * opMul}), transparent 62%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 30% 50%, hsl(${secondaryHue} 50% 40% / ${0.06 * opMul}), transparent 55%)` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(250 45% 8% / 0.5) 0%, transparent 35%, transparent 70%, hsl(260 40% 6% / 0.55) 100%)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0" style={{ opacity: S4_THEME.grid.opacity, backgroundImage: `radial-gradient(circle, ${S4_THEME.grid.dotColor} 0.5px, transparent 0.5px)`, backgroundSize: `${S4_THEME.grid.size} ${S4_THEME.grid.size}` }} />
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(${primaryHue} 40% 50% / 0.3) 2px, hsl(${primaryHue} 40% 50% / 0.3) 3px)`, backgroundSize: '100% 6px' }} />
        {/* Vertical cinematic beams */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 180px, hsl(${tertiaryHue} 50% 60% / 0.18) 180px, hsl(${tertiaryHue} 50% 60% / 0.18) 182px)` }} />
        {/* Noise */}
        <div className="absolute inset-0" style={{ opacity: S4_THEME.noise.opacity, backgroundImage: S4_THEME.noise.svg }} />
      </div>

      {/* ── Holographic refraction bands ── */}
      {showHolographic && !isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`holo-${i}`}
              className="absolute"
              style={{
                left: `${-10 + i * 35}%`,
                top: `${15 + i * 20}%`,
                width: '60%',
                height: '3px',
                background: `linear-gradient(90deg, transparent 5%, hsl(${primaryHue} 90% 70% / ${0.06 * opMul}) 15%, hsl(${secondaryHue} 80% 65% / ${0.1 * opMul}) 35%, hsl(${tertiaryHue} 85% 60% / ${0.08 * opMul}) 55%, hsl(${(primaryHue + 60) % 360} 75% 65% / ${0.06 * opMul}) 75%, transparent 95%)`,
                filter: 'blur(4px)',
                transform: `rotate(${-5 + i * 5}deg)`,
              }}
              animate={{ x: ['-30%', '130%', '-30%'], opacity: [0, 0.8, 0] }}
              transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
            />
          ))}
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full"
            style={{
              left: '60%', top: '20%',
              background: `conic-gradient(from 0deg, hsl(${primaryHue} 80% 60% / ${0.04 * opMul}), hsl(${secondaryHue} 70% 55% / ${0.05 * opMul}), hsl(${tertiaryHue} 80% 60% / ${0.04 * opMul}), hsl(${primaryHue} 80% 60% / ${0.04 * opMul}))`,
              filter: 'blur(60px)',
            }}
            animate={{ rotate: [0, 360], scale: [0.8, 1.3, 0.8], opacity: [0.02, 0.12, 0.02] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* ── Chromatic aberration ── */}
      {showChromatic && !isExporting && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -inset-2"
            style={{ boxShadow: `inset 4px 0 30px hsl(${primaryHue} 90% 60% / ${0.04 * opMul}), inset -4px 0 30px hsl(${tertiaryHue} 85% 55% / ${0.04 * opMul}), inset 0 3px 20px hsl(${secondaryHue} 80% 60% / ${0.03 * opMul})` }}
            animate={{
              boxShadow: [
                `inset 4px 0 30px hsl(${primaryHue} 90% 60% / ${0.04 * opMul}), inset -4px 0 30px hsl(${tertiaryHue} 85% 55% / ${0.04 * opMul}), inset 0 3px 20px hsl(${secondaryHue} 80% 60% / ${0.03 * opMul})`,
                `inset 6px 0 40px hsl(${primaryHue} 90% 60% / ${0.07 * opMul}), inset -6px 0 40px hsl(${tertiaryHue} 85% 55% / ${0.07 * opMul}), inset 0 5px 30px hsl(${secondaryHue} 80% 60% / ${0.05 * opMul})`,
                `inset 4px 0 30px hsl(${primaryHue} 90% 60% / ${0.04 * opMul}), inset -4px 0 30px hsl(${tertiaryHue} 85% 55% / ${0.04 * opMul}), inset 0 3px 20px hsl(${secondaryHue} 80% 60% / ${0.03 * opMul})`,
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* ── Constellation ── */}
      {showConstellation && !isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {constellationNodes.map((n, i) =>
              constellationNodes.slice(i + 1).filter((_, j) => (i + j) % 3 === 0).map((n2, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  x1={n.cx} y1={n.cy} x2={n2.cx} y2={n2.cy}
                  stroke={`hsl(${n.hue} 50% 60% / 0.08)`}
                  strokeWidth="0.15"
                  animate={{ opacity: [0.03, 0.14, 0.03] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />
              ))
            )}
            {constellationNodes.map((n, i) => (
              <motion.circle
                key={i} cx={n.cx} cy={n.cy} r="0.4"
                fill={`hsl(${n.hue} 65% 65% / 0.3)`}
                animate={{ r: [0.3, 0.7, 0.3], opacity: [0.15, 0.45, 0.15] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* ── Plasma wave ── */}
      {showPlasma && !isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[250%] h-[60%] -left-[75%] top-[20%]"
            style={{
              background: `linear-gradient(90deg, transparent 5%, hsl(${primaryHue} 80% 55% / ${0.035 * opMul}) 15%, hsl(${secondaryHue} 65% 50% / ${0.055 * opMul}) 30%, hsl(${tertiaryHue} 75% 55% / ${0.045 * opMul}) 50%, hsl(${primaryHue} 60% 50% / ${0.035 * opMul}) 70%, transparent 90%)`,
              filter: 'blur(80px)', borderRadius: '40%',
            }}
            animate={{ x: ['-20%', '20%', '-20%'], scaleY: [0.8, 1.2, 0.8], rotate: [-2, 2, -2] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[200%] h-[40%] -left-[50%] bottom-[10%]"
            style={{
              background: `linear-gradient(90deg, transparent 10%, hsl(${tertiaryHue} 70% 55% / ${0.028 * opMul}) 25%, hsl(${primaryHue} 65% 50% / ${0.045 * opMul}) 45%, hsl(${secondaryHue} 60% 55% / ${0.035 * opMul}) 65%, transparent 85%)`,
              filter: 'blur(70px)', borderRadius: '45%',
            }}
            animate={{ x: ['15%', '-15%', '15%'], scaleY: [1.1, 0.85, 1.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
        </div>
      )}

      {/* ── Aurora ribbons ── */}
      {showAurora && !isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[200%] h-[45%] -left-[50%] top-[-8%]"
            style={{
              background: `linear-gradient(90deg, transparent 5%, hsl(${primaryHue} 75% 50% / ${0.045 * opMul}) 20%, hsl(${secondaryHue} 60% 50% / ${0.065 * opMul}) 40%, hsl(${tertiaryHue} 70% 55% / ${0.045 * opMul}) 60%, hsl(${primaryHue} 65% 45% / ${0.035 * opMul}) 80%, transparent 95%)`,
              filter: 'blur(60px)', borderRadius: '50%',
            }}
            animate={{ x: ['-15%', '15%', '-15%'], skewX: [-3, 3, -3], scaleY: [1, 1.15, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[180%] h-[35%] -left-[40%] top-[-2%]"
            style={{
              background: `linear-gradient(90deg, transparent 10%, hsl(${secondaryHue} 70% 55% / ${0.035 * opMul}) 30%, hsl(${primaryHue} 60% 50% / ${0.055 * opMul}) 50%, hsl(${tertiaryHue} 65% 50% / ${0.035 * opMul}) 70%, transparent 90%)`,
              filter: 'blur(50px)', borderRadius: '50%',
            }}
            animate={{ x: ['10%', '-10%', '10%'], skewX: [2, -2, 2], scaleY: [1.1, 0.9, 1.1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </div>
      )}

      {/* ── Cinematic light rays ── */}
      {showLightRays && !isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 22}%`,
                top: '-10%',
                width: '2px',
                height: '120%',
                background: `linear-gradient(180deg, hsl(${[primaryHue, secondaryHue, tertiaryHue, primaryHue][i]} 60% 60% / ${0.1 * opMul}), transparent 80%)`,
                filter: 'blur(6px)',
                transform: `rotate(${-10 + i * 7}deg)`,
              }}
              animate={{ opacity: [0.02, 0.15, 0.02] }}
              transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
            />
          ))}
        </div>
      )}

      {/* ── Breathing orbs ── */}
      {showOrbs && !isExporting && (
        <>
          <motion.div
            className="absolute top-[-5%] left-[20%] w-[850px] h-[650px] rounded-full blur-[260px]"
            style={{ background: `hsl(${primaryHue} 70% 45% / ${0.13 * opMul})` }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.26, 0.1], rotate: [0, 5, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[5%] w-[650px] h-[650px] rounded-full blur-[220px]"
            style={{ background: `hsl(${secondaryHue} 55% 48% / ${0.09 * opMul})` }}
            animate={{ scale: [1.1, 0.92, 1.1], opacity: [0.06, 0.2, 0.06], rotate: [0, -3, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          />
          <motion.div
            className="absolute top-[35%] right-[20%] w-[400px] h-[400px] rounded-full blur-[180px]"
            style={{ background: `hsl(${tertiaryHue} 55% 48% / ${0.08 * opMul})` }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.04, 0.16, 0.04] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute top-[8%] right-[28%] w-[560px] h-[320px] rounded-full blur-[190px]"
            style={{ background: `hsl(${secondaryHue} 72% 54% / ${0.11 * opMul})` }}
            animate={{ x: [0, -35, 0], y: [0, 22, 0], opacity: [0.06, 0.2, 0.06] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute bottom-[15%] left-[35%] w-[450px] h-[350px] rounded-full blur-[200px]"
            style={{ background: `linear-gradient(135deg, hsl(${primaryHue} 60% 45% / ${0.07 * opMul}), hsl(${tertiaryHue} 55% 50% / ${0.06 * opMul}))` }}
            animate={{ x: [0, 20, -15, 0], y: [0, -10, 15, 0], scale: [1, 1.1, 0.95, 1], opacity: [0.04, 0.14, 0.06, 0.04] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          />
        </>
      )}

      {/* ── Floating particles ── */}
      {!isExporting && particleCount > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left, top: p.top,
                width: p.size, height: p.size,
                background: `hsl(${p.hue} 70% 68% / 0.55)`,
                boxShadow: `0 0 ${p.size * 7}px hsl(${p.hue} 70% 68% / 0.55), 0 0 ${p.size * 14}px hsl(${p.hue} 60% 55% / 0.22)`,
              }}
              animate={{ x: [0, p.drift, -p.drift * 0.5, 0], y: [0, -p.rise, 0], scale: [0.8, 1.4, 0.8], opacity: [0.03, 0.5, 0.03] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* ── Light sweep ── */}
      {showLightSweep && !isExporting && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(105deg, transparent 38%, hsl(${primaryHue} 75% 62% / ${0.08 * opMul}) 46%, hsl(${tertiaryHue} 80% 65% / ${0.06 * opMul}) 54%, transparent 62%)` }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(265deg, transparent 38%, hsl(${secondaryHue} 70% 58% / ${0.07 * opMul}) 47%, transparent 58%)` }}
            animate={{ x: ['180%', '-120%'] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
          />
        </>
      )}

      {/* ── Vignette ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 3% / 0.88)' }} />
    </>
  );
}
