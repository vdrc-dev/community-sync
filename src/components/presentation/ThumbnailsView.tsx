import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PresentationSection, SlideMetadata } from './types';

interface ThumbnailsViewProps {
  currentSlide: number;
  onSlideClick: (slide: number) => void;
  onClose: () => void;
  sections: PresentationSection[];
  slideMetadata?: SlideMetadata[];
}

const premiumEase = [0.16, 1, 0.3, 1];

export function ThumbnailsView({ 
  currentSlide, 
  onSlideClick, 
  onClose,
  sections,
  slideMetadata,
}: ThumbnailsViewProps) {
  
  const getSlideLabel = (slideNum: number): string => {
    const metadata = slideMetadata?.find(s => s.id === slideNum);
    return metadata?.title || `Slide ${slideNum}`;
  };

  const totalSlides = sections.reduce((acc, s) => acc + s.slides.length, 0);

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-auto no-print"
      style={{
        background: 'rgba(4, 3, 10, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: premiumEase }}
    >
      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="fixed top-4 right-4 z-10 w-10 h-10 rounded-xl flex items-center justify-center border transition-all"
        style={{ 
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
        whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.08)' }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5 text-white/60" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: premiumEase }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'hsl(263 55% 50% / 0.15)', border: '1px solid hsl(263 55% 50% / 0.25)' }}>
            <Layers className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Vista de Diapositivas
            </h2>
            <p className="text-xs text-white/30 mt-0.5">
              {totalSlides} slides · {sections.length} secciones
            </p>
          </div>
        </motion.div>

        {sections.map((section, sectionIndex) => (
          <motion.div 
            key={section.id} 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + sectionIndex * 0.08, ease: premiumEase }}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'hsl(263 55% 50% / 0.12)',
                  border: '1px solid hsl(263 55% 50% / 0.2)',
                  color: 'hsl(263 65% 70%)',
                }}
              >
                {sectionIndex + 1}
              </span>
              <span className="text-sm font-semibold text-white/50">
                {section.title}
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), transparent)' }} />
              <span className="text-[10px] text-white/20 tabular-nums">
                {section.slides.length} slides
              </span>
            </div>
            
            {/* Slide grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {section.slides.map((slideNum, slideIndex) => {
                const isActive = currentSlide === slideNum;
                const isVisited = slideNum < currentSlide;

                return (
                  <motion.button
                    key={slideNum}
                    onClick={() => {
                      onSlideClick(slideNum);
                      onClose();
                    }}
                    className={cn(
                      'relative aspect-video rounded-xl border-2 transition-all p-3 flex flex-col items-start justify-between text-left overflow-hidden group',
                      isActive
                        ? 'border-violet-500/60 ring-2 ring-violet-500/20'
                        : 'border-white/[0.06] hover:border-white/15'
                    )}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, hsl(263 55% 50% / 0.12), hsl(263 55% 50% / 0.04))'
                        : 'rgba(255, 255, 255, 0.02)',
                    }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + sectionIndex * 0.08 + slideIndex * 0.03, ease: premiumEase }}
                    whileHover={{ scale: 1.03, borderColor: isActive ? undefined : 'rgba(139, 92, 246, 0.3)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'radial-gradient(ellipse at center, hsl(263 55% 50% / 0.08), transparent 70%)' }} />

                    <div className="relative z-10">
                      <span className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded-md tabular-nums',
                        isActive 
                          ? 'bg-violet-500 text-white' 
                          : isVisited
                            ? 'bg-white/8 text-white/35'
                            : 'bg-white/5 text-white/25'
                      )}>
                        {String(slideNum).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="relative z-10 w-full">
                      <p className={cn(
                        'text-xs font-medium line-clamp-2 leading-tight',
                        isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                      )}>
                        {getSlideLabel(slideNum)}
                      </p>
                      {isActive && (
                        <motion.span 
                          className="inline-flex items-center gap-1 mt-1 text-[9px] font-bold text-violet-400 uppercase tracking-wider"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span className="w-1 h-1 rounded-full bg-violet-400" />
                          Actual
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
