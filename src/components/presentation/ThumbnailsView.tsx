import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PresentationSection, SlideMetadata } from './types';

interface ThumbnailsViewProps {
  currentSlide: number;
  onSlideClick: (slide: number) => void;
  onClose: () => void;
  // New props - no longer from context
  sections: PresentationSection[];
  slideMetadata?: SlideMetadata[];
}

/**
 * Unified Thumbnails View Component
 * 
 * Now receives all data via props instead of useGeneration() context.
 * This makes it reusable across Generations and Templates.
 */
export function ThumbnailsView({ 
  currentSlide, 
  onSlideClick, 
  onClose,
  sections,
  slideMetadata,
}: ThumbnailsViewProps) {
  
  // Helper to get slide label from metadata or fallback
  const getSlideLabel = (slideNum: number): string => {
    const metadata = slideMetadata?.find(s => s.id === slideNum);
    return metadata?.title || `Slide ${slideNum}`;
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-auto p-8 no-print"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        onClick={onClose}
        className="fixed top-4 right-4 p-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Vista de Diapositivas
        </motion.h2>

        {sections.map((section, sectionIndex) => (
          <motion.div 
            key={section.id} 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h3 className="text-lg font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                {sectionIndex + 1}
              </span>
              {section.title}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {section.slides.map((slideNum, slideIndex) => (
                <motion.button
                  key={slideNum}
                  onClick={() => {
                    onSlideClick(slideNum);
                    onClose();
                  }}
                  className={cn(
                    'aspect-video rounded-xl border-2 transition-all p-4 flex flex-col items-start justify-between text-left',
                    'bg-card/50',
                    currentSlide === slideNum
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border/50 hover:border-primary/50'
                  )}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: sectionIndex * 0.1 + slideIndex * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <span className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded',
                      currentSlide === slideNum ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                    )}>
                      {slideNum}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-2">
                      {getSlideLabel(slideNum)}
                    </p>
                    {currentSlide === slideNum && (
                      <span className="text-xs text-primary font-medium">Actual</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
