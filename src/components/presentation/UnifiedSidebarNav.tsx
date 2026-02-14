import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PresentationSection, SlideMetadata } from './types';

interface UnifiedSidebarNavProps {
  // Core state
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onSlideClick: (slide: number) => void;
  
  // Configuration (passed via props, not context)
  presentationName: string;
  sections: PresentationSection[];
  totalSlides: number;
  
  // Optional customization
  slideMetadata?: SlideMetadata[];  // For custom slide labels
  badge?: string;                    // e.g., "Gen 10" or "Clase 02"
  badgeColor?: string;               // Badge background color
  footer?: string;                   // Footer text
}

/**
 * Unified Sidebar Navigation Component
 * 
 * Combines functionality from:
 * - SidebarNav (used in Generations)
 * - TemplateSidebarNav (used in Templates)
 * 
 * This component is "dumb" - it receives all data via props
 * and doesn't depend on any context providers.
 */
export function UnifiedSidebarNav({
  isOpen,
  onClose,
  currentSlide,
  onSlideClick,
  presentationName,
  sections,
  totalSlides,
  slideMetadata,
  badge,
  badgeColor = 'hsl(var(--primary))',
  footer = 'Vibe Coding 2026',
}: UnifiedSidebarNavProps) {
  
  // Helper to get slide label from metadata or fallback
  const getSlideLabel = (slideNum: number): string => {
    const metadata = slideMetadata?.find(s => s.id === slideNum);
    return metadata?.title || `Slide ${slideNum}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar Panel */}
          <motion.div
            className="fixed left-0 top-0 h-full w-80 z-50 bg-card border-r border-border"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Navegación</h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Cerrar navegación"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Presentation Badge & Name */}
              <div className="mb-6 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2">
                  {badge && (
                    <span 
                      className="text-xs font-medium px-2 py-0.5 rounded text-primary-foreground"
                      style={{ backgroundColor: badgeColor }}
                    >
                      {badge}
                    </span>
                  )}
                  <p className="text-sm font-medium text-primary truncate">
                    {presentationName}
                  </p>
                </div>
              </div>

              {/* Sections & Slides */}
              <div className="flex-1 overflow-y-auto space-y-6">
                {sections.map((section, sectionIndex) => (
                  <div key={section.id}>
                    {/* Section Header */}
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-primary text-xs">
                        {sectionIndex + 1}
                      </span>
                      {section.title}
                    </h3>
                    
                    {/* Section Slides */}
                    <div className="space-y-1">
                      {section.slides.map((slideNum) => {
                        const isActive = currentSlide === slideNum;
                        
                        return (
                          <motion.button
                            key={slideNum}
                            onClick={() => {
                              onSlideClick(slideNum);
                              onClose();
                            }}
                            className={cn(
                              'w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3',
                              isActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                            )}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Slide Number Badge */}
                            <span className={cn(
                              'w-6 h-6 rounded flex items-center justify-center text-xs font-medium shrink-0',
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-muted-foreground'
                            )}>
                              {slideNum}
                            </span>
                            
                            {/* Slide Label */}
                            <span className="flex-1 truncate text-xs">
                              {getSlideLabel(slideNum)}
                            </span>
                            
                            {/* Active Indicator */}
                            {isActive && (
                              <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-border/50 mt-6">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{footer}</span>
                  <span>
                    {currentSlide} / {totalSlides}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
