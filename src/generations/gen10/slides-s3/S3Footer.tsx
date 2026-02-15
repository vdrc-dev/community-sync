/**
 * S3Footer — Pie de página reutilizable para todas las slides de S3.
 */
import { motion } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

interface S3FooterProps {
  /** Etiqueta de sección (ej. "APERTURA", "CREACIÓN DIGITAL") */
  sectionLabel?: string;
  /** Hue para la línea gradiente (default 330 = rose) */
  hue?: number;
}

export function S3Footer({ sectionLabel, hue = 330 }: S3FooterProps) {
  const slideNum = useSlideNumber();
  const { isExporting } = useExportContext();
  const progress = slideNum && slideNum.total > 0 ? slideNum.current / slideNum.total : 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="relative h-px mx-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(90deg, transparent, hsl(${hue} 65% 58% / 0.3), transparent)` }}
        />
        {!isExporting && (
          <motion.div
            className="absolute inset-y-0 w-40"
            style={{ background: `linear-gradient(90deg, transparent, hsl(${hue} 85% 70% / 0.55), transparent)` }}
            animate={{ x: ['-25%', '105%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
        )}
      </div>
      <div className="flex items-center justify-between px-12 py-4 backdrop-blur-[2px]">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">
            {sectionLabel || 'VDRC · Gen 10'}
          </span>
          {sectionLabel && (
            <>
              <div className="w-px h-2.5" style={{ background: `hsl(${hue} 40% 50% / 0.15)` }} />
              <span
                className="text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-full border"
                style={{
                  color: `hsl(${hue} 75% 72% / 0.85)`,
                  borderColor: `hsl(${hue} 70% 58% / 0.3)`,
                  background: `hsl(${hue} 65% 55% / 0.08)`,
                  boxShadow: `0 0 20px hsl(${hue} 70% 55% / 0.2)`,
                }}
              >
                S3
              </span>
            </>
          )}
        </div>
        <div
          className="text-[11px] font-bold tabular-nums tracking-wider px-3 py-1 rounded-lg border"
          style={{
            color: `hsl(${hue} 80% 76% / 0.88)`,
            borderColor: `hsl(${hue} 70% 55% / 0.22)`,
            background: `linear-gradient(135deg, hsl(${hue} 65% 50% / 0.08), hsl(${hue} 65% 50% / 0.03))`,
            boxShadow: `0 0 26px hsl(${hue} 75% 52% / 0.18)`,
          }}
        >
          {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}
        </div>
      </div>
      <div className="px-12 pb-2">
        <div className="relative h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, hsl(${hue} 75% 62%), hsl(${hue} 85% 72%))` }}
            initial={isExporting ? false : { width: 0 }}
            animate={{ width: `${Math.max(4, Math.round(progress * 100))}%` }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          {!isExporting && progress > 0 && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                left: `calc(${Math.max(4, Math.round(progress * 100))}% - 4px)`,
                background: `hsl(${hue} 90% 78%)`,
                boxShadow: `0 0 16px hsl(${hue} 90% 70% / 0.9)`,
              }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
