/**
 * Gen10 S1 — Shared components.
 * Base layout, atmospheric background, footer, and motion helpers for all Higiene Digital slides.
 */

import { ReactNode, memo } from 'react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { S1_THEME, S1_EASE } from './theme';

/* ══════════════════════════════════════════════════════════════════
   useS1Motion — generates motion props respecting export mode
   Usage:  <motion.div {...m(0.3)}>
   ══════════════════════════════════════════════════════════════════ */
export function useS1Motion() {
  const { isExporting } = useExportContext();
  return (delay: number, overrides?: object) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: delay * 0.7, duration: 0.55, ease: S1_EASE },
          ...overrides,
        };
}

/* ══════════════════════════════════════════════════════════════════
   S1Background — grid + noise (radials go in each slide)
   ══════════════════════════════════════════════════════════════════ */
export const S1Background = memo(function S1Background() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          opacity: S1_THEME.grid.opacity,
          backgroundImage: `linear-gradient(${S1_THEME.grid.lineColor} 1px, transparent 1px), linear-gradient(90deg, ${S1_THEME.grid.lineColor} 1px, transparent 1px)`,
          backgroundSize: `${S1_THEME.grid.size} ${S1_THEME.grid.size}`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ opacity: S1_THEME.noise.opacity, backgroundImage: S1_THEME.noise.svg }}
      />
    </>
  );
});

/* ══════════════════════════════════════════════════════════════════
   S1Footer — line + label + page number
   ══════════════════════════════════════════════════════════════════ */
interface S1FooterProps {
  label: string;
}

export function S1Footer({ label }: S1FooterProps) {
  const slideNum = useSlideNumber();
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div
        className="h-px mx-8 sm:mx-16"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(160 50% 50% / 0.2), transparent)' }}
      />
      <div className="flex items-center justify-between px-6 sm:px-12 py-4">
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
   S1Vignette — cinematic border
   ══════════════════════════════════════════════════════════════════ */
export const S1Vignette = memo(function S1Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ boxShadow: 'inset 0 0 180px 80px hsl(160 20% 2% / 0.85)' }}
    />
  );
});

/* ══════════════════════════════════════════════════════════════════
   S1Shell — wraps each slide with base background + footer + vignette
   ══════════════════════════════════════════════════════════════════ */
interface S1ShellProps {
  children: ReactNode;
  /** Footer text (e.g. "HIGIENE DIGITAL") */
  footerLabel: string;
  /** Extra classes for root div (e.g. "flex items-center") */
  className?: string;
  /** Custom radials — rendered inside the background container */
  radials?: ReactNode;
}

export function S1Shell({ children, footerLabel, className = '', radials }: S1ShellProps) {
  return (
    <div
      className={`h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-emerald-500/30 ${className}`}
      style={{ background: S1_THEME.background }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        {radials}
        <S1Background />
      </div>

      {/* Slide content */}
      {children}

      {/* Footer + vignette */}
      <S1Footer label={footerLabel} />
      <S1Vignette />
    </div>
  );
}
