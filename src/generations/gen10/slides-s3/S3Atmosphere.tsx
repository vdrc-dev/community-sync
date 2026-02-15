/**
 * S3Atmosphere — Capas atmosféricas reutilizables para todas las slides de S3.
 * Incluye: radiales, grid de puntos, scanlines, ruido, orbes respirantes y partículas.
 */
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { S3_THEME, S3_PARTICLE_HUES } from './theme';

interface S3AtmosphereProps {
  isExporting: boolean;
  /** Número de partículas flotantes (default 15) */
  particleCount?: number;
  /** Hue primario para el radial principal (default 330 = rose) */
  primaryHue?: number;
  /** Hue secundario para el radial inferior (default 263 = violet) */
  secondaryHue?: number;
  /** Hue terciario para radial esquina derecha (default 185 = cyan) */
  tertiaryHue?: number;
  /** Mostrar orbes respirantes (default true) */
  showOrbs?: boolean;
  /** Mostrar light sweep animado (default false, solo cover) */
  showLightSweep?: boolean;
}

export function S3Atmosphere({
  isExporting,
  particleCount = 15,
  primaryHue = 330,
  secondaryHue = 263,
  tertiaryHue = 185,
  showOrbs = true,
  showLightSweep = true,
}: S3AtmosphereProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => {
        const seed = (i + 1) * 37.917;
        const size = 1 + (seed % 2.6);
        return {
          id: i,
          hue: S3_PARTICLE_HUES[i % S3_PARTICLE_HUES.length],
          left: `${(seed * 13.71) % 100}%`,
          top: `${(seed * 29.17) % 100}%`,
          size,
          rise: 16 + (seed % 30),
          duration: 7 + (seed % 7),
          delay: seed % 8,
        };
      }),
    [particleCount]
  );

  return (
    <>
      {/* ── Radial gradients ── */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 130% 70% at 55% -25%, hsl(${primaryHue} 80% 42% / 0.22), transparent 60%)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 90% 55% at -5% 110%, hsl(${secondaryHue} 60% 35% / 0.12), transparent 55%)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 55% at 105% 15%, hsl(${tertiaryHue} 70% 50% / 0.07), transparent 50%)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 75% 60% at 50% 120%, hsl(${primaryHue} 75% 55% / 0.08), transparent 62%)` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsl(250 45% 8% / 0.45) 0%, transparent 35%, transparent 70%, hsl(260 40% 6% / 0.5) 100%)',
          }}
        />

        {/* Fine dot grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: S3_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S3_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S3_THEME.grid.size} ${S3_THEME.grid.size}`,
          }}
        />

        {/* Horizontal scanlines */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(${primaryHue} 40% 50% / 0.3) 2px, hsl(${primaryHue} 40% 50% / 0.3) 3px)`,
            backgroundSize: '100% 6px',
          }}
        />

        {/* Vertical cinematic beams */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 180px, hsl(${tertiaryHue} 50% 60% / 0.18) 180px, hsl(${tertiaryHue} 50% 60% / 0.18) 182px)`,
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0"
          style={{ opacity: S3_THEME.noise.opacity, backgroundImage: S3_THEME.noise.svg }}
        />
      </div>

      {/* ── Breathing orbs ── */}
      {showOrbs && !isExporting && (
        <>
          <motion.div
            className="absolute top-[-5%] left-[20%] w-[800px] h-[600px] rounded-full blur-[240px]"
            style={{ background: `hsl(${primaryHue} 65% 42% / 0.1)` }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] rounded-full blur-[200px]"
            style={{ background: `hsl(${secondaryHue} 50% 45% / 0.07)` }}
            animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.06, 0.15, 0.06] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          />
          <motion.div
            className="absolute top-[35%] right-[20%] w-[350px] h-[350px] rounded-full blur-[160px]"
            style={{ background: `hsl(${tertiaryHue} 50% 45% / 0.06)` }}
            animate={{ x: [0, 25, 0], y: [0, -15, 0], opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute top-[8%] right-[28%] w-[520px] h-[300px] rounded-full blur-[170px]"
            style={{ background: `hsl(${secondaryHue} 70% 52% / 0.09)` }}
            animate={{ x: [0, -30, 0], y: [0, 18, 0], opacity: [0.06, 0.16, 0.06] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
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
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                background: `hsl(${p.hue} 60% 65% / 0.4)`,
                boxShadow: `0 0 ${p.size * 5}px hsl(${p.hue} 60% 65% / 0.45)`,
              }}
              animate={{
                x: [0, p.id % 2 === 0 ? 8 : -8, 0],
                y: [0, -p.rise, 0],
                scale: [0.85, 1.2, 0.85],
                opacity: [0.05, 0.5, 0.05],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Animated light sweep ── */}
      {showLightSweep && !isExporting && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, hsl(${primaryHue} 70% 60% / 0.06) 48%, hsl(${tertiaryHue} 80% 65% / 0.04) 52%, transparent 60%)`,
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(265deg, transparent 40%, hsl(${secondaryHue} 70% 58% / 0.05) 49%, transparent 58%)`,
            }}
            animate={{ x: ['180%', '-120%'] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
          />
        </>
      )}

      {/* ── Cinematic vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }}
      />
    </>
  );
}
