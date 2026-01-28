import { useState, useCallback } from 'react';
import type { Slide } from '@/types/presentation';

interface UsePresentationStateOptions {
  slides: Slide[];
  initialSlide?: number;
}

export function usePresentationState({ slides, initialSlide = 0 }: UsePresentationStateOptions) {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [isGridView, setIsGridView] = useState(false);
  const [isSpeakerView, setIsSpeakerView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];
  const nextSlide = slides[currentIndex + 1] || null;
  const prevSlide = slides[currentIndex - 1] || null;

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
      setIsGridView(false);
    }
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, totalSlides]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const goToFirst = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const goToLast = useCallback(() => {
    setCurrentIndex(totalSlides - 1);
  }, [totalSlides]);

  const toggleGridView = useCallback(() => {
    setIsGridView(prev => !prev);
  }, []);

  const toggleSpeakerView = useCallback(() => {
    setIsSpeakerView(prev => !prev);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, []);

  const exitAllModes = useCallback(() => {
    setIsGridView(false);
    setIsSpeakerView(false);
  }, []);

  return {
    currentIndex,
    currentSlide,
    nextSlide,
    prevSlide,
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
  };
}
