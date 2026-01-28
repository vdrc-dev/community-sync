import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Slide } from '@/types/presentation';
import { usePresentationState } from '@/hooks/usePresentationState';
import { usePresentationKeyboard } from '@/hooks/usePresentationKeyboard';
import { SlideRenderer } from './SlideRenderer';
import { SlideControls } from './SlideControls';
import { SlideProgress, SlideProgressBar } from './SlideProgress';
import { SlideGridView } from './SlideGridView';
import { SpeakerView } from './SpeakerView';
import { SlideParticles } from './SlideParticles';

interface PresentationViewerProps {
  slides: Slide[];
  title?: string;
  generationCode?: string;
  onExit?: () => void;
  onExportPDF?: () => void;
  showParticles?: boolean;
}

export function PresentationViewer({ 
  slides, 
  title,
  generationCode,
  onExit, 
  onExportPDF,
  showParticles = true,
}: PresentationViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1);

  const {
    currentIndex,
    currentSlide,
    nextSlide,
    totalSlides,
    isGridView,
    isSpeakerView,
    isFullscreen,
    goToSlide,
    goToNext,
    goToPrev,
    goToFirst,
    goToLast,
    toggleGridView,
    toggleSpeakerView,
    toggleFullscreen,
    exitAllModes,
  } = usePresentationState({ slides });

  // Track direction for animations
  const handleNext = () => {
    setDirection(1);
    goToNext();
  };

  const handlePrev = () => {
    setDirection(-1);
    goToPrev();
  };

  const handleGoToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    goToSlide(index);
  };

  const handleExit = () => {
    if (isGridView || isSpeakerView) {
      exitAllModes();
    } else if (onExit) {
      onExit();
    }
  };

  // Keyboard shortcuts
  usePresentationKeyboard({
    onNext: handleNext,
    onPrev: handlePrev,
    onFirst: goToFirst,
    onLast: goToLast,
    onToggleFullscreen: toggleFullscreen,
    onToggleGrid: toggleGridView,
    onToggleSpeaker: toggleSpeakerView,
    onExit: handleExit,
    enabled: true,
  });

  if (!currentSlide) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <p className="text-muted-foreground">No hay slides para mostrar</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-background overflow-hidden flex flex-col"
    >
      {/* Progress Bar (top) */}
      <SlideProgressBar current={currentIndex} total={totalSlides} />

      {/* Controls */}
      <SlideControls
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        isFullscreen={isFullscreen}
        isGridView={isGridView}
        isSpeakerView={isSpeakerView}
        title={title}
        generationCode={generationCode}
        onPrev={handlePrev}
        onNext={handleNext}
        onToggleGrid={toggleGridView}
        onToggleSpeaker={toggleSpeakerView}
        onToggleFullscreen={toggleFullscreen}
        onExportPDF={onExportPDF}
        onExit={onExit}
      />

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Particles Background */}
        {showParticles && !isGridView && !isSpeakerView && (
          <SlideParticles count={25} />
        )}

        <AnimatePresence mode="wait">
          {isGridView ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0"
            >
              <SlideGridView
                slides={slides}
                currentIndex={currentIndex}
                onSlideSelect={handleGoToSlide}
              />
            </motion.div>
          ) : isSpeakerView ? (
            <motion.div
              key="speaker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <SpeakerView
                currentSlide={currentSlide}
                nextSlide={nextSlide}
                currentIndex={currentIndex}
                totalSlides={totalSlides}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </motion.div>
          ) : (
            <motion.div
              key="slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <SlideRenderer slide={currentSlide} direction={direction} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Progress Dots */}
      {!isGridView && !isSpeakerView && (
        <SlideProgress
          current={currentIndex}
          total={totalSlides}
          onSlideClick={handleGoToSlide}
          className="border-t border-border/50 bg-background/80 backdrop-blur-sm"
        />
      )}

      {/* Touch Navigation Areas (for mobile) */}
      {!isGridView && !isSpeakerView && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-1/2 opacity-0 cursor-pointer"
            aria-label="Anterior"
          />
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-1/2 opacity-0 cursor-pointer"
            aria-label="Siguiente"
          />
        </>
      )}
    </div>
  );
}
