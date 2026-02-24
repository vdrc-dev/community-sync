import { ReactNode, memo } from 'react';
import { cn } from '@/lib/utils';
import { useExportContext } from '@/contexts/ExportContext';

interface SlideWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * SlideWrapper — lightweight container for slides.
 * No extra animations here; transitions are handled by PresentationLayout.
 * Particles removed for faster rendering and smoother transitions.
 */
export const SlideWrapper = memo(function SlideWrapper({ children, className }: SlideWrapperProps) {
  return (
    <div className={cn('w-full h-full relative', className)}>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
});

// Keep these exports for backward compatibility (slides may import them)
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
    },
  },
};
