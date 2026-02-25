/**
 * Gen10 S4 — VibeCoding · Epic visual theme.
 * Identity: rose/violet primary with cinematic dark UI.
 * Mirrors S3 architecture for full visual coherence.
 */

export const S4_THEME = {
  background: '#04030a',
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

/** Accent palette for S4 — rose/violet/cyan/green */
export const S4_ACCENT = {
  rose:    { h: 330, border: 'hsl(330 70% 55% / 0.38)', bg: 'hsl(330 70% 55% / 0.1)',  text: 'hsl(330 85% 74%)', glow: 'hsl(330 70% 55% / 0.28)', dot: 'hsl(330 75% 60%)' },
  violet:  { h: 270, border: 'hsl(270 65% 58% / 0.38)', bg: 'hsl(270 65% 58% / 0.1)',  text: 'hsl(270 75% 76%)', glow: 'hsl(270 65% 58% / 0.28)', dot: 'hsl(270 68% 62%)' },
  cyan:    { h: 185, border: 'hsl(185 72% 50% / 0.35)', bg: 'hsl(185 72% 50% / 0.09)', text: 'hsl(185 72% 66%)', glow: 'hsl(185 72% 50% / 0.22)', dot: 'hsl(185 72% 55%)' },
  green:   { h: 152, border: 'hsl(152 68% 45% / 0.35)', bg: 'hsl(152 68% 45% / 0.09)', text: 'hsl(152 70% 62%)', glow: 'hsl(152 68% 45% / 0.22)', dot: 'hsl(152 68% 50%)' },
  amber:   { h: 38,  border: 'hsl(38 90% 58% / 0.35)',  bg: 'hsl(38 90% 58% / 0.09)',  text: 'hsl(38 88% 66%)',  glow: 'hsl(38 90% 58% / 0.25)',  dot: 'hsl(38 90% 60%)' },
} as const;

export const S4_ROOT_CLASS =
  'h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-rose-500/30';

export const S4_CONTENT_PADDING = 'px-8 sm:px-10 lg:px-14 2xl:px-16';

export const S4_EASE = [0.16, 1, 0.3, 1] as const;
export const S4_EASE_SNAP = [0.34, 1.56, 0.64, 1] as const;

/** Particle hues — cyclic rotation */
export const S4_PARTICLE_HUES = [330, 270, 185, 152] as const;

/** Staggered entry motion */
export const s4Motion = (delay: number, isExporting: boolean, overrides?: object) =>
  isExporting ? {} : {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delay * 0.7, duration: 0.55, ease: S4_EASE },
    ...overrides,
  };

/** Epic entry with blur + scale for dramatic reveals */
export const s4MotionEpic = (delay: number, isExporting: boolean, overrides?: object) =>
  isExporting ? {} : {
    initial: { opacity: 0, y: 28, scale: 0.97, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    transition: { delay: delay * 0.7, duration: 0.7, ease: S4_EASE },
    ...overrides,
  };

/** Gradient text helper */
export const s4GradientText = (from: string, to: string, glowHue = 330) => ({
  background: `linear-gradient(135deg, ${from}, ${to})`,
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
  filter: `drop-shadow(0 0 32px hsl(${glowHue} 80% 60% / 0.48))`,
});

/** Multi-stop gradient text */
export const s4GradientTextMulti = (hues: number[], glowHue?: number) => {
  const stops = hues.map((h, i) => `hsl(${h} 82% 68%) ${Math.round((i / (hues.length - 1)) * 100)}%`).join(', ');
  return {
    background: `linear-gradient(135deg, ${stops})`,
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
    filter: `drop-shadow(0 0 36px hsl(${glowHue ?? hues[0]} 80% 60% / 0.48))`,
  };
};

/** Shimmer sweep for interactive cards */
export const s4Shimmer = (isExporting: boolean, delay = 0) =>
  isExporting ? {} : {
    animate: { x: ['-150%', '250%'] },
    transition: { duration: 3, repeat: Infinity, ease: 'linear' as const, repeatDelay: 4, delay },
  };

/** Accent line for section dividers */
export const s4AccentLine = (hue1: number, hue2: number) => ({
  background: `linear-gradient(90deg, transparent, hsl(${hue1} 80% 60% / 0.6), hsl(${hue2} 70% 58% / 0.6), transparent)`,
});

export const S4_SERIF = "'Georgia', 'Times New Roman', serif";

/** Giant serif watermark anchor */
export const s4SerifAnchor = (text: string, hue: number, opacity = 0.04) => ({
  fontFamily: S4_SERIF,
  fontSize: 'clamp(180px, 22vw, 320px)',
  fontWeight: 900 as const,
  lineHeight: 0.85,
  color: `hsl(${hue} 60% 60% / ${opacity})`,
  letterSpacing: '-0.04em',
  userSelect: 'none' as const,
  pointerEvents: 'none' as const,
});

/** Serif metric number style for stats */
export const s4SerifMetric = (hue: number) => ({
  fontFamily: S4_SERIF,
  fontWeight: 900 as const,
  fontStyle: 'italic' as const,
  color: `hsl(${hue} 70% 68%)`,
  letterSpacing: '-0.03em',
  lineHeight: 1,
});
