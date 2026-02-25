/**
 * S4Footer — Premium footer with holographic progress bar and slide counter.
 * Mirrors S3Footer architecture.
 */
import { motion } from 'framer-motion';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useExportContext } from '@/contexts/ExportContext';
import { S4_EASE, S4_SERIF } from './theme';

interface S4FooterProps {
  sectionLabel?: string;
  hue?: number;
  showProgress?: boolean;
  contextHint?: string;
  session?: string;
}

export function S4Footer({ sectionLabel, hue = 330, showProgress = true, contextHint, session = 'S4' }: S4FooterProps) {
  const slideNum = useSlideNumber();
  const { isExporting } = useExportContext();
  const progress = slideNum
    ? Math.min(100, Math.max(0, (slideNum.current / Math.max(slideNum.total, 1)) * 100))
    : 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="px-4 sm:px-8 lg:px-12 py-3 sm:py-4 backdrop-blur-[3px]">
        {showProgress && (
          <div className="mb-3 h-[2px] w-full overflow-hidden rounded-full relative" style={{ background: 'hsl(0 0% 100% / 0.03)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, hsl(${hue} 75% 62% / 0.85), hsl(${(hue + 30) % 360} 80% 62% / 0.7), hsl(${(hue + 60) % 360} 70% 58% / 0.5))`,
                boxShadow: `0 0 24px hsl(${hue} 70% 55% / 0.45), 0 0 8px hsl(${hue} 80% 60% / 0.35)`,
              }}
              initial={isExporting ? undefined : { width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: S4_EASE }}
            />
            {!isExporting && progress > 5 && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] rounded-full"
                style={{
                  background: `hsl(${hue} 90% 78%)`,
                  boxShadow: `0 0 12px hsl(${hue} 90% 78% / 0.95), 0 0 24px hsl(${hue} 85% 70% / 0.4)`,
                  left: `${progress}%`,
                  transform: 'translate(-100%, -50%)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-white/40 uppercase">
              {sectionLabel || 'VDRC · Gen 10 · VibeCoding'}
            </span>
            {contextHint && (
              <>
                <div className="w-px h-2.5 bg-white/10 hidden sm:block" />
                <span className="text-[11px] tracking-[0.18em] uppercase text-white/30 hidden sm:inline" style={{ fontFamily: S4_SERIF, fontStyle: 'italic' }}>{contextHint}</span>
              </>
            )}
            {sectionLabel && (
              <>
                <div className="w-px h-2.5" style={{ background: `hsl(${hue} 40% 50% / 0.15)` }} />
                <span
                  className="text-[11px] tracking-[0.2em] px-2.5 py-0.5 rounded-full border relative overflow-hidden"
                  style={{
                    color: `hsl(${hue} 75% 72% / 0.85)`,
                    borderColor: `hsl(${hue} 70% 58% / 0.3)`,
                    background: `linear-gradient(135deg, hsl(${hue} 65% 55% / 0.1), hsl(${(hue + 40) % 360} 55% 50% / 0.05))`,
                    boxShadow: `0 0 22px hsl(${hue} 70% 55% / 0.2)`,
                  }}
                >
                  {session}
                </span>
              </>
            )}
          </div>
          <div
            className="relative overflow-hidden text-[11px] font-bold tabular-nums tracking-wider px-3.5 py-1.5 rounded-lg border"
            style={{
              color: `hsl(${hue} 80% 76% / 0.9)`,
              borderColor: `hsl(${hue} 70% 55% / 0.28)`,
              background: `linear-gradient(135deg, hsl(${hue} 65% 50% / 0.12), hsl(${(hue + 40) % 360} 55% 48% / 0.06))`,
              boxShadow: `0 0 30px hsl(${hue} 75% 52% / 0.22)`,
            }}
          >
            {!isExporting && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(105deg, transparent 35%, hsl(${hue} 80% 70% / 0.1) 50%, transparent 65%)` }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
              />
            )}
            <span className="relative z-10" style={{ fontFamily: S4_SERIF, fontStyle: 'italic' }}>
              {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
