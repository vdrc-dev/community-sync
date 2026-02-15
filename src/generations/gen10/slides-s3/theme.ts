/**
 * Gen10 S3 — Tema visual unificado.
 * Fondo, grid, ruido y paleta de acentos para coherencia en todas las slides.
 * Identidad visual: rosa/magenta como color primario de sesión.
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

/** Paleta de acentos en HSL — usar en badges, bordes, texto destacado */
export const S3_ACCENT = {
  rose:    { border: 'hsl(330 65% 55% / 0.35)', bg: 'hsl(330 65% 55% / 0.08)', text: 'hsl(330 65% 70%)', glow: 'hsl(330 65% 55% / 0.25)', dot: 'hsl(330 65% 58%)' },
  violet:  { border: 'hsl(263 60% 55% / 0.35)', bg: 'hsl(263 60% 55% / 0.08)', text: 'hsl(263 60% 75%)', glow: 'hsl(263 60% 55% / 0.25)', dot: 'hsl(263 60% 60%)' },
  cyan:    { border: 'hsl(185 70% 50% / 0.35)', bg: 'hsl(185 70% 50% / 0.08)', text: 'hsl(185 70% 65%)', glow: 'hsl(185 70% 50% / 0.2)', dot: 'hsl(185 70% 55%)' },
  amber:   { border: 'hsl(38 90% 55% / 0.35)', bg: 'hsl(38 90% 55% / 0.08)', text: 'hsl(38 85% 65%)', glow: 'hsl(38 90% 55% / 0.25)', dot: 'hsl(38 90% 58%)' },
  emerald: { border: 'hsl(160 65% 45% / 0.35)', bg: 'hsl(160 65% 45% / 0.08)', text: 'hsl(160 65% 60%)', glow: 'hsl(160 65% 45% / 0.2)', dot: 'hsl(160 65% 50%)' },
  blue:    { border: 'hsl(210 70% 55% / 0.35)', bg: 'hsl(210 70% 55% / 0.08)', text: 'hsl(210 70% 70%)', glow: 'hsl(210 70% 55% / 0.2)', dot: 'hsl(210 70% 58%)' },
} as const;

/** Clase base del contenedor raíz de cada slide */
export const S3_ROOT_CLASS =
  'h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-rose-500/30';

/** Clase estándar del contenedor de contenido (padding horizontal) */
export const S3_CONTENT_PADDING = 'px-16 2xl:px-20';

/** Easing premium para animaciones (cúbica suave S2-style) */
export const S3_EASE = [0.16, 1, 0.3, 1] as const;

/** Helper: genera props de motion para entrada escalonada */
export const s3Motion = (delay: number, isExporting: boolean, overrides?: object) =>
  isExporting ? {} : {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.9, ease: S3_EASE },
    ...overrides,
  };

/** Hues para partículas — rotación cíclica */
export const S3_PARTICLE_HUES = [330, 263, 185, 38] as const;
