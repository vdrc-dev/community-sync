/**
 * S3Footer — Pie de página reutilizable para todas las slides de S3.
 */
import { useSlideNumber } from '@/contexts/SlideNumberContext';

interface S3FooterProps {
  /** Etiqueta de sección (ej. "APERTURA", "CREACIÓN DIGITAL") */
  sectionLabel?: string;
  /** Hue para la línea gradiente (default 330 = rose) */
  hue?: number;
}

export function S3Footer({ sectionLabel, hue = 330 }: S3FooterProps) {
  const slideNum = useSlideNumber();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
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
    </div>
  );
}
