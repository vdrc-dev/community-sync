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
      <div
        className="h-px mx-16"
        style={{ background: `linear-gradient(90deg, transparent, hsl(${hue} 50% 50% / 0.2), transparent)` }}
      />
      <div className="flex items-center justify-between px-12 py-4">
        <span className="text-[10px] font-medium tracking-wider text-white/30 uppercase">
          {sectionLabel || 'Vicente Donoso R.'}
        </span>
        <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/15">
          {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}
        </span>
      </div>
    </div>
  );
}
