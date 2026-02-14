import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PresentationSection, SlideMetadata } from './types';

interface UnifiedSidebarNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onSlideClick: (slide: number) => void;
  presentationName: string;
  sections: PresentationSection[];
  totalSlides: number;
  slideMetadata?: SlideMetadata[];
  badge?: string;
  badgeColor?: string;
  footer?: string;
}

const premiumEase = [0.16, 1, 0.3, 1];

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
  
  const getSlideLabel = (slideNum: number): string => {
    const metadata = slideMetadata?.find(s => s.id === slideNum);
    return metadata?.title || `Slide ${slideNum}`;
  };

  // Calculate section progress
  const currentSectionIndex = sections.findIndex(s => s.slides.includes(currentSlide));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: premiumEase }}
            onClick={onClose}
          />

          {/* Sidebar Panel */}
          <motion.div
            className="fixed left-0 top-0 h-full w-80 z-50 border-r"
            style={{
              background: 'rgba(8, 8, 12, 0.95)',
              backdropFilter: 'blur(40px) saturate(1.3)',
              borderColor: 'rgba(255, 255, 255, 0.06)',
            }}
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
          >
            <div className="p-5 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(263 55% 50% / 0.15)', border: '1px solid hsl(263 55% 50% / 0.25)' }}>
                    <Layers className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-sm font-bold text-white/80">Navegación</span>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.06)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Cerrar navegación"
                >
                  <X className="w-4 h-4 text-white/50" />
                </motion.button>
              </div>

              {/* Presentation Badge */}
              <div className="mb-5 p-3 rounded-xl border"
                style={{
                  background: 'linear-gradient(135deg, hsl(263 55% 50% / 0.08), hsl(185 60% 50% / 0.04))',
                  borderColor: 'hsl(263 55% 50% / 0.15)',
                }}>
                <div className="flex items-center gap-2">
                  {badge && (
                    <span 
                      className="text-[10px] font-bold px-2 py-0.5 rounded text-white tracking-wider"
                      style={{ backgroundColor: badgeColor }}
                    >
                      {badge}
                    </span>
                  )}
                  <p className="text-xs font-medium text-white/60 truncate flex-1">
                    {presentationName}
                  </p>
                </div>
                {/* Mini progress bar */}
                <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, hsl(263 65% 55%), hsl(185 65% 50%))',
                    }}
                    initial={false}
                    animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
                    transition={{ duration: 0.3, ease: premiumEase }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-white/20 font-mono">{currentSlide} de {totalSlides}</span>
                  <span className="text-[10px] text-white/20 font-mono">{Math.round((currentSlide / totalSlides) * 100)}%</span>
                </div>
              </div>

              {/* Sections & Slides */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 -mr-1 custom-scrollbar">
                {sections.map((section, sectionIndex) => {
                  const isCurrent = sectionIndex === currentSectionIndex;
                  const isPast = sectionIndex < currentSectionIndex;
                  const slidesInSection = section.slides.length;
                  const completedInSection = section.slides.filter(s => s < currentSlide).length;
                  const sectionProgress = section.slides.includes(currentSlide)
                    ? (section.slides.indexOf(currentSlide) + 1) / slidesInSection
                    : isPast ? 1 : 0;

                  return (
                    <div key={section.id}>
                      {/* Section Header */}
                      <div className="flex items-center gap-2 mb-2 px-1">
                        <span 
                          className={cn(
                            'w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold transition-all',
                            isCurrent 
                              ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                              : isPast
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                : 'bg-white/5 text-white/25 border border-white/[0.06]'
                          )}
                        >
                          {isPast ? '✓' : sectionIndex + 1}
                        </span>
                        <span className={cn(
                          'text-[10px] uppercase tracking-wider font-semibold flex-1 truncate',
                          isCurrent ? 'text-white/60' : isPast ? 'text-white/35' : 'text-white/25'
                        )}>
                          {section.title}
                        </span>
                        <span className="text-[9px] text-white/15 tabular-nums">
                          {slidesInSection}
                        </span>
                      </div>

                      {/* Section progress bar */}
                      {isCurrent && (
                        <div className="mx-1 mb-2 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <motion.div
                            className="h-full rounded-full bg-violet-500/60"
                            initial={false}
                            animate={{ width: `${sectionProgress * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      )}
                      
                      {/* Section Slides */}
                      <div className="space-y-0.5">
                        {section.slides.map((slideNum) => {
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
                                'w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center gap-2.5 group relative',
                                isActive
                                  ? 'text-white'
                                  : isVisited
                                    ? 'text-white/35 hover:text-white/60'
                                    : 'text-white/25 hover:text-white/50'
                              )}
                              whileHover={{ x: 2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Active indicator line */}
                              {isActive && (
                                <motion.div
                                  layoutId="sidebarActive"
                                  className="absolute inset-0 rounded-lg"
                                  style={{
                                    background: 'linear-gradient(90deg, hsl(263 55% 50% / 0.12), transparent)',
                                    border: '1px solid hsl(263 55% 50% / 0.2)',
                                  }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                              )}

                              {/* Slide Number */}
                              <span className={cn(
                                'w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 relative z-10 transition-all',
                                isActive
                                  ? 'bg-violet-500 text-white shadow-[0_0_12px_hsl(263_55%_50%_/_0.5)]'
                                  : isVisited
                                    ? 'bg-white/5 text-white/30'
                                    : 'bg-white/[0.03] text-white/20'
                              )}>
                                {slideNum}
                              </span>
                              
                              {/* Slide Label */}
                              <span className="flex-1 truncate relative z-10 leading-tight">
                                {getSlideLabel(slideNum)}
                              </span>
                              
                              {/* Active arrow */}
                              {isActive && (
                                <ChevronRight className="w-3.5 h-3.5 text-violet-400 shrink-0 relative z-10" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/15 font-medium">{footer}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                    <span className="text-[10px] text-white/20 tabular-nums font-mono">
                      {currentSlide}/{totalSlides}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
