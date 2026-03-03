/**
 * Gen11 S1 — Visual theme.
 * Identity: emerald/cyan primary, ultra-dark atmosphere.
 * Differentiator vs Gen10: warmer highlights, more contrast, editorial serif touches.
 */

export const G11_THEME = {
  background: '#020808',
  grid: {
    size: '56px',
    opacity: 0.025,
    lineColor: 'rgba(16,185,129,0.12)',
  },
  noise: {
    opacity: 0.018,
    svg: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  },
} as const;

export const G11 = {
  emerald: { border: 'hsl(160 65% 45% / 0.38)', bg: 'hsl(160 65% 45% / 0.09)', text: 'hsl(160 75% 62%)', glow: 'hsl(160 65% 45% / 0.28)', dot: 'hsl(160 65% 52%)' },
  cyan:    { border: 'hsl(185 70% 50% / 0.35)', bg: 'hsl(185 70% 50% / 0.08)', text: 'hsl(185 70% 65%)', glow: 'hsl(185 70% 50% / 0.22)', dot: 'hsl(185 70% 55%)' },
  blue:    { border: 'hsl(217 70% 55% / 0.35)', bg: 'hsl(217 70% 55% / 0.08)', text: 'hsl(217 70% 68%)', glow: 'hsl(217 70% 55% / 0.25)', dot: 'hsl(217 70% 58%)' },
  amber:   { border: 'hsl(38 90% 55% / 0.35)', bg: 'hsl(38 90% 55% / 0.08)', text: 'hsl(38 85% 65%)', glow: 'hsl(38 90% 55% / 0.25)', dot: 'hsl(38 90% 58%)' },
  purple:  { border: 'hsl(263 60% 55% / 0.35)', bg: 'hsl(263 60% 55% / 0.08)', text: 'hsl(263 60% 72%)', glow: 'hsl(263 60% 55% / 0.25)', dot: 'hsl(263 60% 60%)' },
  rose:    { border: 'hsl(350 65% 55% / 0.35)', bg: 'hsl(350 65% 55% / 0.08)', text: 'hsl(350 65% 68%)', glow: 'hsl(350 65% 55% / 0.25)', dot: 'hsl(350 65% 58%)' },
  orange:  { border: 'hsl(25 90% 55% / 0.35)', bg: 'hsl(25 90% 55% / 0.08)', text: 'hsl(25 85% 65%)', glow: 'hsl(25 90% 55% / 0.25)', dot: 'hsl(25 90% 58%)' },
} as const;

export const G11_EASE = [0.16, 1, 0.3, 1] as const;
