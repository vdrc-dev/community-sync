import { useState, useCallback, useEffect, useRef, useMemo, ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Grid3X3, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UnifiedSidebarNav } from './UnifiedSidebarNav';
import { ThumbnailsView } from './ThumbnailsView';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { ExportDropdown } from './ExportDropdown';
import { ExportProgressModal } from './ExportProgressModal';
import { SlideWrapper } from './SlideWrapper';
import { ExportSlideWrapper } from './ExportSlideWrapper';
import { ExportProvider } from '@/contexts/ExportContext';
import { SlideNumberProvider } from '@/contexts/SlideNumberContext';
import { useExportStandalone } from '@/hooks/useExportStandalone';
import { WeekNavigator } from './WeekNavigator';
import type { 
  PresentationLayoutProps, 
  PresentationFeatures,
} from './types';
import { DEFAULT_FEATURES } from './types';

/* ── Premium easing curves ──────────────────────────────────────── */
const premiumEase = [0.16, 1, 0.3, 1];

/* ── Slide transition variants — snappy feel ───────────────────── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0,
  }),
};

/* ── Controls fade animation ────────────────────────────────────── */
const CONTROLS_HIDE_DELAY = 3000;

/**
 * Unified Presentation Layout — Premium Edition
 * 
 * The master orchestrator for the VDRC presentation system.
 * Features auto-hiding controls, directional transitions,
 * gradient progress bar, and glass morphism UI.
 */
export function PresentationLayout({
  slides,
  sections,
  slideMetadata,
  config,
  features: featuresProp,
  exportConfig,
  galleryHeader,
  backUrl,
  generationInfo,
  initialSlide = 1,
  onSlideChange,
}: PresentationLayoutProps) {
  // Merge features with defaults
  const features: PresentationFeatures = {
    galleryMode: false,
    export: false,
    editableContent: false,
    sidebar: true,
    thumbnails: true,
    keyboardShortcuts: true,
    fullscreen: true,
    progressBar: true,
    ...featuresProp,
  };

  // ============================================
  // State Management
  // ============================================
  
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const [mode, setMode] = useState<'gallery' | 'presentation'>(
    features.galleryMode ? 'gallery' : 'presentation'
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimer = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;

  // ============================================
  // Auto-hide controls
  // ============================================

  const resetControlsTimer = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => {
      if (!showSidebar && !showThumbnails && !showShortcuts) {
        setControlsVisible(false);
      }
    }, CONTROLS_HIDE_DELAY);
  }, [showSidebar, showThumbnails, showShortcuts]);

  useEffect(() => {
    const handleMove = () => resetControlsTimer();
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchstart', handleMove);
    resetControlsTimer();
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleMove);
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
    };
  }, [resetControlsTimer]);

  // Always show controls when panels are open
  useEffect(() => {
    if (showSidebar || showThumbnails || showShortcuts) {
      setControlsVisible(true);
    }
  }, [showSidebar, showThumbnails, showShortcuts]);

  // ============================================
  // Export Hook (conditional)
  // ============================================
  
  const exportTools = features.export && exportConfig
    ? useExportStandalone({
        slides,
        exportConfig,
      })
    : null;

  // ============================================
  // Navigation Functions
  // ============================================
  
  const goToSlide = useCallback((slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      setDirection(slideNumber > currentSlide ? 1 : -1);
      setCurrentSlide(slideNumber);
      onSlideChange?.(slideNumber);
      resetControlsTimer();
    }
  }, [totalSlides, currentSlide, onSlideChange, resetControlsTimer]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
      onSlideChange?.(currentSlide + 1);
      resetControlsTimer();
    }
  }, [currentSlide, totalSlides, onSlideChange, resetControlsTimer]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
      onSlideChange?.(currentSlide - 1);
      resetControlsTimer();
    }
  }, [currentSlide, onSlideChange, resetControlsTimer]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const startPresentation = useCallback((fromSlide: number = 1) => {
    goToSlide(fromSlide);
    setMode('presentation');
  }, [goToSlide]);

  const exitToGallery = useCallback(() => {
    if (features.galleryMode) {
      setMode('gallery');
    }
  }, [features.galleryMode]);

  // ============================================
  // Keyboard Navigation
  // ============================================
  
  useEffect(() => {
    if (mode !== 'presentation') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or contenteditable
      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement || 
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides);
          break;
        case 'Escape':
          if (showThumbnails) {
            setShowThumbnails(false);
          } else if (showSidebar) {
            setShowSidebar(false);
          } else if (showShortcuts) {
            setShowShortcuts(false);
          } else if (features.galleryMode) {
            exitToGallery();
          }
          break;
        case 'f':
        case 'F':
          if (features.fullscreen) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
        case 'm':
        case 'M':
          if (features.sidebar) {
            e.preventDefault();
            setShowSidebar((prev) => !prev);
          }
          break;
        case 't':
        case 'T':
          if (features.thumbnails) {
            e.preventDefault();
            setShowThumbnails((prev) => !prev);
          }
          break;
        case '?':
          if (features.keyboardShortcuts) {
            e.preventDefault();
            setShowShortcuts((prev) => !prev);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, nextSlide, prevSlide, toggleFullscreen, goToSlide, totalSlides, showThumbnails, showSidebar, showShortcuts, features, exitToGallery]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Listen for custom goToSlide events from slide components
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ slide: number }>).detail;
      if (detail?.slide) goToSlide(detail.slide);
    };
    window.addEventListener('goToSlide', handler);
    return () => window.removeEventListener('goToSlide', handler);
  }, [goToSlide]);

  // ============================================
  // Touch / Swipe Support
  // ============================================
  
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (mode !== 'presentation') return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Only horizontal swipes > 50px, and horizontal > vertical
      if (absDx > 50 && absDx > absDy) {
        if (dx < 0) nextSlide();
        else prevSlide();
      }
      touchStart.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mode, nextSlide, prevSlide]);

  // ============================================
  // Prefetch adjacent slides (triggers lazy load)
  // ============================================
  
  // Immediate prefetch: ±3 slides around current
  useEffect(() => {
    const prefetchIndices = [
      currentSlide - 1, currentSlide, currentSlide + 1,
      currentSlide - 2, currentSlide + 2, currentSlide - 3,
    ].filter(i => i >= 0 && i < totalSlides);
    prefetchIndices.forEach(i => {
      const comp = slides[i] as any;
      if (comp && typeof comp === 'object' && 'preload' in comp) {
        comp.preload?.();
      }
    });
  }, [currentSlide, slides, totalSlides]);

  // Idle-time bulk prefetch: load all remaining slides when browser is idle
  const hasIdlePrefetched = useRef(false);
  useEffect(() => {
    if (hasIdlePrefetched.current) return;
    const idleCb = typeof requestIdleCallback !== 'undefined' ? requestIdleCallback : (cb: () => void) => setTimeout(cb, 200);
    const id = idleCb(() => {
      slides.forEach((comp: any) => {
        if (comp && typeof comp === 'object' && 'preload' in comp) {
          comp.preload?.();
        }
      });
      hasIdlePrefetched.current = true;
    });
    return () => {
      if (typeof cancelIdleCallback !== 'undefined' && typeof id === 'number') cancelIdleCallback(id);
    };
  }, [slides]);

  // ============================================
  // Helpers
  // ============================================
  
  const CurrentSlideComponent = slides[currentSlide - 1];
  const progress = (currentSlide / totalSlides) * 100;

  // Find which section the current slide belongs to — memoized
  const currentSection = useMemo(
    () => sections.find(s => s.slides.includes(currentSlide)),
    [sections, currentSlide]
  );

  // ============================================
  // Gallery Mode Render
  // ============================================
  
  if (mode === 'gallery' && features.galleryMode) {
    return (
      <div className="min-h-screen bg-background">
        {galleryHeader}

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, si) => (
              <div key={section.id} className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {si + 1}
                  </span>
                  {section.title}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {section.slides.map((slideNum) => (
                    <motion.button
                      key={slideNum}
                      onClick={() => startPresentation(slideNum)}
                      className="aspect-video rounded-lg bg-card border border-border hover:border-primary/50 transition-all p-2 text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xs text-muted-foreground">
                        Slide {slideNum}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => startPresentation(1)}
              className="gap-2"
            >
              Iniciar Presentación
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Presentation Mode Render
  // ============================================
  
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Main Slide Canvas */}
      <div className="relative w-full h-screen">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              duration: 0.15, 
              ease: premiumEase,
            }}
            className="w-full h-full"
          >
            <SlideWrapper>
              {CurrentSlideComponent && (
                <SlideNumberProvider current={currentSlide} total={totalSlides}>
                  <CurrentSlideComponent />
                </SlideNumberProvider>
              )}
            </SlideWrapper>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls Overlay (auto-hides) ──────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-30 no-print"
        initial={false}
        animate={{ 
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : -8,
        }}
        transition={{ duration: 0.35, ease: premiumEase }}
        style={{ pointerEvents: controlsVisible ? 'auto' : 'none' }}
      >
        <div className="flex items-center justify-between px-4 pt-4">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            {features.sidebar && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(true)}
                className="bg-black/40 backdrop-blur-xl border border-white/[0.08] hover:bg-black/60 hover:border-white/15 text-white/70 hover:text-white transition-all"
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}
            
            {backUrl && generationInfo && (
              <WeekNavigator
                generationInfo={generationInfo}
                backUrl={backUrl}
              />
            )}

            {features.galleryMode && !backUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={exitToGallery}
                className="bg-black/40 backdrop-blur-xl border border-white/[0.08] hover:bg-black/60 gap-1 text-white/70 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                Galería
              </Button>
            )}
          </div>

          {/* Center: Presentation Name Badge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/[0.08]">
            {config.badge && (
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white tracking-wider"
                style={{ backgroundColor: config.badgeColor || 'hsl(var(--primary))' }}
              >
                {config.badge}
              </span>
            )}
            <span className="text-xs font-medium text-white/60 hidden sm:block">
              {config.name}
            </span>
            {currentSection && (
              <>
                <div className="w-px h-3 bg-white/10 hidden sm:block" />
                <span className="text-[10px] text-white/30 hidden sm:block">
                  {currentSection.title}
                </span>
              </>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {features.thumbnails && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowThumbnails(true)}
                className="bg-black/40 backdrop-blur-xl border border-white/[0.08] hover:bg-black/60 hover:border-white/15 text-white/70 hover:text-white transition-all"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            )}

            {features.keyboardShortcuts && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShortcuts(true)}
                className="bg-black/40 backdrop-blur-xl border border-white/[0.08] hover:bg-black/60 hover:border-white/15 text-white/70 hover:text-white transition-all"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            )}

            {features.fullscreen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="bg-black/40 backdrop-blur-xl border border-white/[0.08] hover:bg-black/60 hover:border-white/15 text-white/70 hover:text-white transition-all"
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </Button>
            )}

            {features.export && exportTools && (
              <ExportDropdown
                onExportPDF={exportTools.exportToPDF}
                onExportPPTX={exportTools.exportToPPTX}
                isExporting={exportTools.isExporting}
                quality={exportTools.quality}
                onQualityChange={exportTools.setQuality}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Bottom Navigation (auto-hides) ─────────────────────── */}
      <motion.div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 no-print"
        initial={false}
        animate={{ 
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : 16,
        }}
        transition={{ duration: 0.35, ease: premiumEase }}
        style={{ pointerEvents: controlsVisible ? 'auto' : 'none' }}
      >
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.08]">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="w-8 h-8 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1.5 min-w-[80px] justify-center">
            <span className="text-sm font-bold text-white/80 tabular-nums">
              {String(currentSlide).padStart(2, '0')}
            </span>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-xs text-white/30 tabular-nums">
              {totalSlides}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="w-8 h-8 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* ── Premium Gradient Progress Bar ───────────────────────── */}
      {features.progressBar && (
        <div className="fixed bottom-0 left-0 right-0 z-20 no-print">
          <div className="h-[3px] bg-white/[0.03] relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{
                background: 'linear-gradient(90deg, hsl(263 65% 55%), hsl(330 60% 55%), hsl(185 65% 50%), hsl(45 85% 55%))',
                backgroundSize: '300% 100%',
              }}
              initial={false}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: `${progress}% 0%`,
              }}
              transition={{ duration: 0.4, ease: premiumEase }}
            />
            {/* Glow effect at tip */}
            <motion.div
              className="absolute top-[-2px] h-[7px] w-8 blur-sm"
              style={{
                background: 'hsl(263 65% 55% / 0.6)',
              }}
              initial={false}
              animate={{ left: `calc(${progress}% - 16px)` }}
              transition={{ duration: 0.4, ease: premiumEase }}
            />
          </div>
        </div>
      )}

      {/* Sidebar */}
      {features.sidebar && (
        <UnifiedSidebarNav
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          currentSlide={currentSlide}
          onSlideClick={goToSlide}
          presentationName={config.name}
          sections={sections}
          totalSlides={totalSlides}
          slideMetadata={slideMetadata}
          badge={config.badge}
          badgeColor={config.badgeColor}
          footer={config.footer}
        />
      )}

      {/* Thumbnails View */}
      {features.thumbnails && (
        <AnimatePresence>
          {showThumbnails && (
            <ThumbnailsView
              currentSlide={currentSlide}
              onSlideClick={goToSlide}
              onClose={() => setShowThumbnails(false)}
              sections={sections}
              slideMetadata={slideMetadata}
            />
          )}
        </AnimatePresence>
      )}

      {/* Keyboard Shortcuts Modal */}
      {features.keyboardShortcuts && (
        <KeyboardShortcuts 
          isOpen={showShortcuts} 
          onClose={() => setShowShortcuts(false)} 
        />
      )}

      {/* Hidden Export Container - renders all slides for capture */}
      {features.export && exportTools?.showExportSlides && (
        <div
          ref={exportTools.containerRef}
          style={{
            position: 'fixed',
            left: '-9999px',
            top: 0,
            width: '1920px',
            height: 'auto',
            overflow: 'visible',
            zIndex: -1,
          }}
        >
          <ExportProvider isExporting={true}>
            {slides.map((SlideComponent, index) => (
              <ExportSlideWrapper key={index}>
                <SlideNumberProvider current={index + 1} total={slides.length}>
                  <SlideComponent />
                </SlideNumberProvider>
              </ExportSlideWrapper>
            ))}
          </ExportProvider>
        </div>
      )}

      {/* Export Progress Modal */}
      {features.export && exportTools && (
        <ExportProgressModal
          isOpen={exportTools.showProgressModal}
          onClose={exportTools.closeProgressModal}
          onCancel={exportTools.cancelExport}
          format={exportTools.exportFormat}
          phase={exportTools.exportPhase}
          progress={exportTools.exportProgress}
          totalSlides={exportTools.totalSlides}
          currentCapture={exportTools.currentCapture}
          previewImages={exportTools.previewImages}
          quality={exportTools.quality}
          elapsedTime={exportTools.elapsedTime}
          estimatedTimeRemaining={exportTools.estimatedTimeRemaining}
          fileSizeEstimate={exportTools.fileSizeEstimate}
        />
      )}
    </div>
  );
}
