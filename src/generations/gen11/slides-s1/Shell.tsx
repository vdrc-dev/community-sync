/**
 * Gen11 S1 — Shell, motion helper, section divider.
 * Visual style: VDRC Canva replication — charcoal bg, white bold, green accent.
 */
import { ReactNode, memo } from 'react';
import { motion } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { G11_THEME, G11_EASE, G11, VDRC_GREEN, VDRC_GREEN_DIM } from './theme';
import type { LucideIcon } from 'lucide-react';

/* ── Motion helper ─────────────────────────── */
export function useG11Motion() {
  const { isExporting } = useExportContext();
  return (delay: number, overrides?: object) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: delay * 0.7, duration: 0.5, ease: G11_EASE },
          ...overrides,
        };
}

/* ── Background grid ─────────────────────── */
const G11Background = memo(function G11Background() {
  return (
    <>
      <div className="absolute inset-0" style={{
        opacity: G11_THEME.grid.opacity,
        backgroundImage: `linear-gradient(${G11_THEME.grid.lineColor} 1px, transparent 1px), linear-gradient(90deg, ${G11_THEME.grid.lineColor} 1px, transparent 1px)`,
        backgroundSize: `${G11_THEME.grid.size} ${G11_THEME.grid.size}`,
      }} />
    </>
  );
});

/* ── Footer ──────────────────────────────── */
function G11Footer({ label }: { label: string }) {
  const slideNum = useSlideNumber();
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="h-px mx-8 sm:mx-16" style={{ background: `linear-gradient(90deg, transparent, ${VDRC_GREEN_DIM}, transparent)` }} />
      <div className="flex items-center justify-between px-8 sm:px-14 py-3">
        <span className="text-[10px] font-semibold tracking-widest text-white/35 uppercase">{label}</span>
        <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/50">
          {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}
        </span>
      </div>
    </div>
  );
}

/* ── Shell ────────────────────────────────── */
interface ShellProps { children: ReactNode; footerLabel?: string; className?: string; radials?: ReactNode; }

export function G11Shell({ children, footerLabel = 'HIGIENE DIGITAL · GEN 11', className = '', radials }: ShellProps) {
  return (
    <div
      className={`h-full w-full min-h-screen relative overflow-hidden font-sans ${className}`}
      style={{ background: G11_THEME.background }}
    >
      <div className="absolute inset-0">
        {radials}
        <G11Background />
      </div>
      {children}
      <G11Footer label={footerLabel} />
    </div>
  );
}

/* ── Decorative brain/circuit SVG ────────── */
export function G11BrainDecor({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
        {/* Simplified brain circuit illustration */}
        <ellipse cx="250" cy="230" rx="155" ry="175" stroke={VDRC_GREEN} strokeWidth="1.5" strokeDasharray="6 4" />
        <ellipse cx="250" cy="230" rx="110" ry="130" stroke={VDRC_GREEN} strokeWidth="1" strokeDasharray="4 6" />
        {/* Circuit lines horizontal */}
        <line x1="95" y1="160" x2="160" y2="160" stroke={VDRC_GREEN} strokeWidth="1.2" />
        <line x1="340" y1="160" x2="405" y2="160" stroke={VDRC_GREEN} strokeWidth="1.2" />
        <line x1="80" y1="230" x2="140" y2="230" stroke={VDRC_GREEN} strokeWidth="1.2" />
        <line x1="360" y1="230" x2="420" y2="230" stroke={VDRC_GREEN} strokeWidth="1.2" />
        <line x1="95" y1="300" x2="160" y2="300" stroke={VDRC_GREEN} strokeWidth="1.2" />
        <line x1="340" y1="300" x2="405" y2="300" stroke={VDRC_GREEN} strokeWidth="1.2" />
        {/* Vertical connectors */}
        <line x1="160" y1="120" x2="160" y2="380" stroke={VDRC_GREEN} strokeWidth="0.8" strokeDasharray="3 5" />
        <line x1="340" y1="120" x2="340" y2="380" stroke={VDRC_GREEN} strokeWidth="0.8" strokeDasharray="3 5" />
        <line x1="250" y1="55" x2="250" y2="405" stroke={VDRC_GREEN} strokeWidth="0.8" strokeDasharray="3 5" />
        {/* Nodes */}
        {[
          [160,160],[340,160],[80,230],[420,230],[160,300],[340,300],
          [250,55],[250,405],[95,160],[405,160],[250,180],[250,280],
          [200,200],[300,200],[200,260],[300,260],
        ].map(([cx,cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={VDRC_GREEN} opacity="0.7" />
        ))}
        {/* Inner details */}
        <path d="M200 200 Q250 170 300 200 Q330 230 300 260 Q250 290 200 260 Q170 230 200 200Z"
          stroke={VDRC_GREEN} strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="250" cy="230" r="18" stroke={VDRC_GREEN} strokeWidth="1.5" fill={VDRC_GREEN} fillOpacity="0.08" />
        <circle cx="250" cy="230" r="6" fill={VDRC_GREEN} opacity="0.6" />
      </svg>
    </div>
  );
}

/* ── Green divider line (Canva style) ─────── */
export function G11GreenLine({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-px ${className}`} style={{ background: VDRC_GREEN_DIM }} />
  );
}

/* ── Section Divider ─────────────────────── */
interface DividerProps {
  moduleNumber: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  accent: { border: string; bg: string; text: string; glow: string; dot: string };
}

export function G11SectionDivider({ moduleNumber, title, subtitle, icon: Icon, accent }: DividerProps) {
  const m = useG11Motion();
  return (
    <G11Shell
      className="flex items-center justify-center"
      radials={
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${accent.glow}, transparent 80%)`
        }} />
      }
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: accent.dot }} />

      <div className="relative z-10 w-full max-w-5xl px-14 sm:px-20 flex items-center gap-12">
        {/* Left content */}
        <div className="flex-1">
          <motion.div {...m(0)}>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border mb-6"
              style={{ background: accent.bg, borderColor: accent.border }}>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent.text }}>
                Módulo {moduleNumber}
              </span>
            </div>
          </motion.div>

          <motion.div {...m(0.1)}>
            <h1 className="text-6xl sm:text-8xl font-black text-white tracking-tight leading-none uppercase mb-4"
              style={{ textShadow: `0 0 80px ${accent.glow}` }}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-white/50 font-light mt-4">{subtitle}</p>
            )}
          </motion.div>
        </div>

        {/* Right icon */}
        <motion.div {...m(0.2)} className="flex-shrink-0">
          <div className="w-28 h-28 rounded-3xl border flex items-center justify-center"
            style={{ background: accent.bg, borderColor: accent.border, boxShadow: `0 0 60px ${accent.glow}` }}>
            <Icon className="w-14 h-14" style={{ color: accent.text }} />
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
