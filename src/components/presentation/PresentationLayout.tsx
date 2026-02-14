import { useState, useCallback, useEffect, ComponentType } from 'react';
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
import { Progress } from '@/components/ui/progress';
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

/**
 * Unified Presentation Layout Component
 * 
 * The master orchestrator that unifies the presentation systems
 * used by both /templates and /gen{N} routes.
 * 
 * Features:
 * - Manages slide navigation state
 * - Gallery mode for template preview
 * - Presentation mode for full-screen slides
 * - Optional export functionality (PDF/PPTX)
 * - Unified sidebar and thumbnails navigation
 * - Keyboard shortcuts
 * - Progress bar
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
  const [mode, setMode] = useState<'gallery' | 'presentation'>(
    features.galleryMode ? 'gallery' : 'presentation'
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const totalSlides = slides.length;

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
      setCurrentSlide(slideNumber);
      onSlideChange?.(slideNumber);
    }
  }, [totalSlides, onSlideChange]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

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
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
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
  }, [mode, nextSlide, prevSlide, toggleFullscreen, showThumbnails, showSidebar, showShortcuts, features, exitToGallery]);

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
  // Render Current Slide
  // ============================================
  
  const CurrentSlideComponent = slides[currentSlide - 1];
  const progress = (currentSlide / totalSlides) * 100;

  // ============================================
  // Gallery Mode Render
  // ============================================
  
  if (mode === 'gallery' && features.galleryMode) {
    return (
      <div className="min-h-screen bg-background">
        {/* Gallery Header (custom content from parent) */}
        {galleryHeader}

        {/* Slide Grid Preview */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div key={section.id} className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {sections.indexOf(section) + 1}
                  </span>
                  {section.title}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {section.slides.slice(0, 4).map((slideNum) => (
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

          {/* Start Presentation Button */}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
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

      {/* Controls Overlay */}
      <div className="fixed top-4 left-4 right-4 flex items-center justify-between z-30 no-print">
        {/* Left Controls */}
        <div className="flex items-center gap-2">
          {features.sidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(true)}
              className="bg-background/80 backdrop-blur-sm border border-border"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
          
          {/* Week Navigator (student materials flow) */}
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
              className="bg-background/80 backdrop-blur-sm border border-border gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Galería
            </Button>
          )}
        </div>

        {/* Center: Presentation Name Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border">
          {config.badge && (
            <span 
              className="text-xs font-medium px-2 py-0.5 rounded text-primary-foreground"
              style={{ backgroundColor: config.badgeColor || 'hsl(var(--primary))' }}
            >
              {config.badge}
            </span>
          )}
          <span className="text-sm font-medium text-foreground">
            {config.name}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {features.thumbnails && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThumbnails(true)}
              className="bg-background/80 backdrop-blur-sm border border-border"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          )}

          {features.keyboardShortcuts && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowShortcuts(true)}
              className="bg-background/80 backdrop-blur-sm border border-border"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          )}

          {features.fullscreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="bg-background/80 backdrop-blur-sm border border-border"
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 no-print">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 1}
          className="bg-background/80 backdrop-blur-sm border border-border disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border">
          <span className="text-sm font-medium text-muted-foreground">
            {currentSlide} / {totalSlides}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          className="bg-background/80 backdrop-blur-sm border border-border disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      {features.progressBar && (
        <div className="fixed bottom-0 left-0 right-0 z-20 no-print">
          <Progress 
            value={progress} 
            className="h-1 rounded-none bg-secondary/50"
          />
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
