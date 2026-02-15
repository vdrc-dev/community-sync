/**
 * Gen10 S2 — Componentes compartidos.
 * Layout base, fondo atmosférico, footer y helpers de motion para todas las slides.
 */

import { ReactNode, memo } from 'react';
import { motion } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { S2_THEME } from './theme';

/* ── Premium easing ── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ══════════════════════════════════════════════════════════════════
   useS2Motion — genera props de motion respetando export mode
   Uso:  <motion.div {...m(0.3)}>
   ══════════════════════════════════════════════════════════════════ */
export function useS2Motion() {
  const { isExporting } = useExportContext();
  return (delay: number, overrides?: object) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.6, ease: EASE },
          ...overrides,
        };
}

/* ══════════════════════════════════════════════════════════════════
   S2Background — grid + noise (los radiales van en cada slide)
   ══════════════════════════════════════════════════════════════════ */
export const S2Background = memo(function S2Background() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          opacity: S2_THEME.grid.opacity,
          backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
          backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }}
      />
    </>
  );
});

/* ══════════════════════════════════════════════════════════════════
   S2Footer — línea + label + numeración
   ══════════════════════════════════════════════════════════════════ */
interface S2FooterProps {
  label: string;
}

export function S2Footer({ label }: S2FooterProps) {
  const slideNum = useSlideNumber();
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div
        className="h-px mx-16"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }}
      />
      <div className="flex items-center justify-between px-12 py-4">
        <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">
          {label}
        </span>
        <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">
          {slideNum
            ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}`
            : ''}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   S2Vignette — borde cinematográfico
   ══════════════════════════════════════════════════════════════════ */
export const S2Vignette = memo(function S2Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }}
    />
  );
});

/* ══════════════════════════════════════════════════════════════════
   S2Shell — envuelve cada slide con fondo base + footer + vignette
   ══════════════════════════════════════════════════════════════════ */
interface S2ShellProps {
  children: ReactNode;
  /** Texto del footer (ej. "LA ERA AGÉNTICA") */
  footerLabel: string;
  /** Clases extra para el root div (ej. "flex items-center") */
  className?: string;
  /** Radiales custom — se renderizan dentro del <div.absolute.inset-0> del fondo */
  radials?: ReactNode;
}

export function S2Shell({ children, footerLabel, className = '', radials }: S2ShellProps) {
  return (
    <div
      className={`h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-violet-500/30 ${className}`}
      style={{ background: S2_THEME.background }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        {radials}
        <S2Background />
      </div>

      {/* Contenido de la slide */}
      {children}

      {/* Footer + vignette */}
      <S2Footer label={footerLabel} />
      <S2Vignette />
    </div>
  );
}
