/**
 * Gen11 S1 — Visual theme.
 * Style: Faithful replication of VDRC Canva deck.
 * Dark charcoal background, white bold sans-serif, VDRC green accent.
 */

export const G11_THEME = {
  background: '#181c1b',
  backgroundAlt: '#1f2421',
  grid: {
    size: '56px',
    opacity: 0.018,
    lineColor: 'rgba(61,153,112,0.10)',
  },
  noise: {
    opacity: 0.012,
    svg: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  },
} as const;

// VDRC brand green + accent palette
export const G11 = {
  // Primary VDRC green
  emerald: {
    border: 'rgba(61,153,112,0.45)',
    bg: 'rgba(61,153,112,0.10)',
    text: '#5ec99a',
    glow: 'rgba(61,153,112,0.30)',
    dot: '#3d9970',
    solid: '#3d9970',
  },
  cyan: {
    border: 'rgba(34,211,238,0.35)',
    bg: 'rgba(34,211,238,0.08)',
    text: '#67e8f9',
    glow: 'rgba(34,211,238,0.22)',
    dot: '#22d3ee',
    solid: '#22d3ee',
  },
  blue: {
    border: 'rgba(96,165,250,0.35)',
    bg: 'rgba(96,165,250,0.08)',
    text: '#93c5fd',
    glow: 'rgba(96,165,250,0.22)',
    dot: '#60a5fa',
    solid: '#60a5fa',
  },
  amber: {
    border: 'rgba(251,191,36,0.35)',
    bg: 'rgba(251,191,36,0.08)',
    text: '#fcd34d',
    glow: 'rgba(251,191,36,0.22)',
    dot: '#f59e0b',
    solid: '#f59e0b',
  },
  purple: {
    border: 'rgba(167,139,250,0.35)',
    bg: 'rgba(167,139,250,0.08)',
    text: '#c4b5fd',
    glow: 'rgba(167,139,250,0.22)',
    dot: '#a78bfa',
    solid: '#a78bfa',
  },
  rose: {
    border: 'rgba(251,113,133,0.35)',
    bg: 'rgba(251,113,133,0.08)',
    text: '#fda4af',
    glow: 'rgba(251,113,133,0.22)',
    dot: '#fb7185',
    solid: '#fb7185',
  },
  orange: {
    border: 'rgba(251,146,60,0.35)',
    bg: 'rgba(251,146,60,0.08)',
    text: '#fdba74',
    glow: 'rgba(251,146,60,0.22)',
    dot: '#fb923c',
    solid: '#fb923c',
  },
} as const;

export const G11_EASE = [0.16, 1, 0.3, 1] as const;

// VDRC Green divider line color
export const VDRC_GREEN = '#3d9970';
export const VDRC_GREEN_DIM = 'rgba(61,153,112,0.4)';
