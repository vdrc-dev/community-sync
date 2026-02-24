/**
 * S3Footer — Epic footer with progress bar, glow accents, and session badge.
 */
import { motion } from 'framer-motion';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_EASE } from './theme';

interface S3FooterProps {
  sectionLabel?: string;
  hue?: number;
  showProgress?: boolean;
  contextHint?: string;
}

export function S3Footer({ sectionLabel, hue = 330, showProgress = true, contextHint }: S3FooterProps) {
  const slideNum = useSlideNumber();
  const { isExporting } = useExportContext();
  const progress = slideNum
    ? Math.min(100, Math.max(0, (slideNum.current / Math.max(slideNum.total, 1)) * 100))
    : 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="px-4 sm:px-8 lg:px-12 py-3 sm:py-4 backdrop-blur-[3px]">
        {/* Progress bar — always visible */}
        {showProgress && (
          <div className="mb-3 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.04] relative">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, hsl(${hue} 75% 62% / 0.85), hsl(${(hue + 40) % 360} 80% 62% / 0.7))`,
                boxShadow: `0 0 24px hsl(${hue} 70% 55% / 0.4), 0 0 6px hsl(${hue} 80% 60% / 0.3)`,
              }}
              initial={isExporting ? undefined : { width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: S3_EASE }}
            />
            {/* Traveling glow dot on progress */}
            {!isExporting && progress > 5 && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-[2px] rounded-full"
                style={{
                  background: `hsl(${hue} 90% 75%)`,
                  boxShadow: `0 0 8px hsl(${hue} 90% 75% / 0.9)`,
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
            <span className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">
              {sectionLabel || 'VDRC · Gen 10'}
            </span>
            {contextHint && (
              <>
                <div className="w-px h-2.5 bg-white/10 hidden sm:block" />
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/35 hidden sm:inline">{contextHint}</span>
              </>
            )}
            {sectionLabel && (
              <>
                <div className="w-px h-2.5" style={{ background: `hsl(${hue} 40% 50% / 0.15)` }} />
                <span
                  className="text-[10px] tracking-[0.2em] px-2.5 py-0.5 rounded-full border relative"
                  style={{
                    color: `hsl(${hue} 75% 72% / 0.85)`,
                    borderColor: `hsl(${hue} 70% 58% / 0.3)`,
                    background: `hsl(${hue} 65% 55% / 0.08)`,
                    boxShadow: `0 0 22px hsl(${hue} 70% 55% / 0.2)`,
                  }}
                >
                  S3
                </span>
              </>
            )}
          </div>
          <div
            className="text-[11px] font-bold tabular-nums tracking-wider px-3.5 py-1.5 rounded-lg border relative overflow-hidden"
            style={{
              color: `hsl(${hue} 80% 76% / 0.88)`,
              borderColor: `hsl(${hue} 70% 55% / 0.25)`,
              background: `linear-gradient(135deg, hsl(${hue} 65% 50% / 0.1), hsl(${hue} 65% 50% / 0.04))`,
              boxShadow: `0 0 28px hsl(${hue} 75% 52% / 0.2)`,
            }}
          >
            {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
