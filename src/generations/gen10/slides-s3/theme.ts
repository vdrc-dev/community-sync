/**
 * Gen10 S3 — Epic visual theme.
 * Background, grid, noise, accent palette, motion helpers, and gradient utilities.
 * Identity: rose/magenta primary with cinematic dark UI.
 */

export const S3_THEME = {
  background: '#04030a',
  selection: 'selection:bg-rose-500/30',
  grid: {
    size: '44px',
    opacity: 0.028,
    dotColor: 'hsl(330 62% 70%)',
  },
  noise: {
    opacity: 0.016,
    svg: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  },
} as const;

/** Accent palette in HSL — use for badges, borders, highlighted text */
export const S3_ACCENT = {
  rose:    { border: 'hsl(330 65% 55% / 0.35)', bg: 'hsl(330 65% 55% / 0.08)', text: 'hsl(330 65% 70%)', glow: 'hsl(330 65% 55% / 0.25)', dot: 'hsl(330 65% 58%)' },
  violet:  { border: 'hsl(263 60% 55% / 0.35)', bg: 'hsl(263 60% 55% / 0.08)', text: 'hsl(263 60% 75%)', glow: 'hsl(263 60% 55% / 0.25)', dot: 'hsl(263 60% 60%)' },
  cyan:    { border: 'hsl(185 70% 50% / 0.35)', bg: 'hsl(185 70% 50% / 0.08)', text: 'hsl(185 70% 65%)', glow: 'hsl(185 70% 50% / 0.2)', dot: 'hsl(185 70% 55%)' },
  amber:   { border: 'hsl(38 90% 55% / 0.35)', bg: 'hsl(38 90% 55% / 0.08)', text: 'hsl(38 85% 65%)', glow: 'hsl(38 90% 55% / 0.25)', dot: 'hsl(38 90% 58%)' },
  emerald: { border: 'hsl(160 65% 45% / 0.35)', bg: 'hsl(160 65% 45% / 0.08)', text: 'hsl(160 65% 60%)', glow: 'hsl(160 65% 45% / 0.2)', dot: 'hsl(160 65% 50%)' },
  blue:    { border: 'hsl(210 70% 55% / 0.35)', bg: 'hsl(210 70% 55% / 0.08)', text: 'hsl(210 70% 70%)', glow: 'hsl(210 70% 55% / 0.2)', dot: 'hsl(210 70% 58%)' },
} as const;

/** Root class for every slide container */
export const S3_ROOT_CLASS =
  'h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-rose-500/30';

/** Standard content padding */
export const S3_CONTENT_PADDING = 'px-16 2xl:px-20';

/** Premium cubic easing for animations */
export const S3_EASE = [0.16, 1, 0.3, 1] as const;

/** Snappier ease for micro-interactions */
export const S3_EASE_SNAP = [0.34, 1.56, 0.64, 1] as const;

/** Staggered entry motion helper */
export const s3Motion = (delay: number, isExporting: boolean, overrides?: object) =>
  isExporting ? {} : {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.9, ease: S3_EASE },
    ...overrides,
  };

/** Epic entry: larger Y offset with scale for dramatic reveals */
export const s3MotionEpic = (delay: number, isExporting: boolean, overrides?: object) =>
  isExporting ? {} : {
    initial: { opacity: 0, y: 50, scale: 0.95, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    transition: { delay, duration: 1.1, ease: S3_EASE },
    ...overrides,
  };

/** Particle hues — cyclic rotation */
export const S3_PARTICLE_HUES = [330, 263, 185, 38] as const;

/** Gradient text style generator */
export const s3GradientText = (from: string, to: string, glowHue = 330) => ({
  background: `linear-gradient(135deg, ${from}, ${to})`,
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
  filter: `drop-shadow(0 0 30px hsl(${glowHue} 80% 60% / 0.45))`,
});

/** Multi-stop gradient text for ultra-epic titles */
export const s3GradientTextMulti = (hues: number[], glowHue?: number) => {
  const stops = hues.map((h, i) => `hsl(${h} 80% 65%) ${Math.round((i / (hues.length - 1)) * 100)}%`).join(', ');
  return {
    background: `linear-gradient(135deg, ${stops})`,
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
    filter: `drop-shadow(0 0 35px hsl(${glowHue ?? hues[0]} 80% 60% / 0.5))`,
  };
};

/** Shimmer sweep animation props for Framer Motion */
export const s3Shimmer = (isExporting: boolean, delay = 0) =>
  isExporting ? {} : {
    animate: { x: ['-150%', '250%'] },
    transition: { duration: 3, repeat: Infinity, ease: 'linear' as const, repeatDelay: 4, delay },
  };

/** Accent line style for section dividers */
export const s3AccentLine = (hue1: number, hue2: number) => ({
  background: `linear-gradient(90deg, transparent, hsl(${hue1} 80% 60% / 0.6), hsl(${hue2} 70% 58% / 0.6), transparent)`,
});
