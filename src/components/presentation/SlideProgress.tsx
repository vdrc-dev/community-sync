import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlideProgressProps {
  current: number;
  total: number;
  onSlideClick?: (index: number) => void;
  className?: string;
}

export function SlideProgress({ current, total, onSlideClick, className }: SlideProgressProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1.5 p-2", className)}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSlideClick?.(i)}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-all duration-300",
            i === current 
              ? "bg-primary w-6" 
              : i < current 
                ? "bg-primary/50 hover:bg-primary/70" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
          aria-label={`Ir a slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

interface SlideProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function SlideProgressBar({ current, total, className }: SlideProgressBarProps) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className={cn("h-1 bg-muted/50 w-full", className)}>
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
