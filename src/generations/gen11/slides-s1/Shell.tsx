/**
 * Gen11 S1 — Shell, motion helper, section divider.
 */
import { ReactNode, memo } from 'react';
import { motion } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { G11_THEME, G11_EASE, G11 } from './theme';
import type { LucideIcon } from 'lucide-react';

/* ── Motion helper ─────────────────────────── */
export function useG11Motion() {
  const { isExporting } = useExportContext();
  return (delay: number, overrides?: object) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: delay * 0.7, duration: 0.55, ease: G11_EASE },
          ...overrides,
        };
}

/* ── Background ──────────────────────────── */
const G11Background = memo(function G11Background() {
  return (
    <>
      <div className="absolute inset-0" style={{
        opacity: G11_THEME.grid.opacity,
        backgroundImage: `linear-gradient(${G11_THEME.grid.lineColor} 1px, transparent 1px), linear-gradient(90deg, ${G11_THEME.grid.lineColor} 1px, transparent 1px)`,
        backgroundSize: `${G11_THEME.grid.size} ${G11_THEME.grid.size}`,
      }} />
      <div className="absolute inset-0" style={{ opacity: G11_THEME.noise.opacity, backgroundImage: G11_THEME.noise.svg }} />
    </>
  );
});

/* ── Footer ──────────────────────────────── */
function G11Footer({ label }: { label: string }) {
  const slideNum = useSlideNumber();
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="h-px mx-8 sm:mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(160 50% 50% / 0.25), transparent)' }} />
      <div className="flex items-center justify-between px-6 sm:px-12 py-4">
        <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">{label}</span>
        <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">
          {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}
        </span>
      </div>
    </div>
  );
}

/* ── Vignette ────────────────────────────── */
const G11Vignette = memo(function G11Vignette() {
  return <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 90px hsl(160 20% 2% / 0.9)' }} />;
});

/* ── Shell ────────────────────────────────── */
interface ShellProps { children: ReactNode; footerLabel?: string; className?: string; radials?: ReactNode; }

export function G11Shell({ children, footerLabel = 'HIGIENE DIGITAL · GEN 11', className = '', radials }: ShellProps) {
  return (
    <div className={`h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-emerald-500/30 ${className}`} style={{ background: G11_THEME.background }}>
      <div className="absolute inset-0">{radials}<G11Background /></div>
      {children}
      <G11Footer label={footerLabel} />
      <G11Vignette />
    </div>
  );
}

/* ── Section Divider ─────────────────────── */
interface DividerProps { moduleNumber: string; title: string; subtitle?: string; icon: LucideIcon; accent: { border: string; bg: string; text: string; glow: string; dot: string }; }

export function G11SectionDivider({ moduleNumber, title, subtitle, icon: Icon, accent }: DividerProps) {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${accent.glow}, transparent 80%)` }} />}>
      <div className="relative z-10 text-center px-8">
        <motion.div {...m(0)}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-8" style={{ background: accent.bg, borderColor: accent.border }}>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent.text }}>Módulo {moduleNumber}</span>
          </div>
        </motion.div>
        <motion.div {...m(0.15)} className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-2xl border flex items-center justify-center mb-6" style={{ background: accent.bg, borderColor: accent.border, boxShadow: `0 0 40px ${accent.glow}` }}>
            <Icon className="w-10 h-10" style={{ color: accent.text }} />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight" style={{ textShadow: `0 0 60px ${accent.glow}` }}>{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-white/50">{subtitle}</p>}
        </motion.div>
      </div>
    </G11Shell>
  );
}
