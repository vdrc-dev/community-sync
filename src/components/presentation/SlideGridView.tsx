import { motion } from 'framer-motion';
import type { Slide } from '@/types/presentation';
import { cn } from '@/lib/utils';

interface SlideGridViewProps {
  slides: Slide[];
  currentIndex: number;
  onSlideSelect: (index: number) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2 }
  },
};

export function SlideGridView({ slides, currentIndex, onSlideSelect }: SlideGridViewProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6 overflow-auto max-h-full"
    >
      {slides.map((slide, index) => (
        <motion.button
          key={slide.id}
          variants={itemVariants}
          onClick={() => onSlideSelect(index)}
          className={cn(
            "relative aspect-video rounded-lg overflow-hidden border-2 transition-all group",
            index === currentIndex
              ? "border-primary ring-2 ring-primary/30"
              : "border-border/50 hover:border-primary/50"
          )}
        >
          {/* Slide Preview */}
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted p-4 flex flex-col">
            <span className="text-xs font-bold text-primary mb-1">
              {index + 1}
            </span>
            {slide.title && (
              <span className="text-xs font-medium text-foreground line-clamp-2">
                {slide.title}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground mt-auto capitalize">
              {slide.type}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Current Indicator */}
          {index === currentIndex && (
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary" />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
