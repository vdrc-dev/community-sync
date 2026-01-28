import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import type { Slide } from '@/types/presentation';
import { SlideRenderer } from './SlideRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SpeakerViewProps {
  currentSlide: Slide;
  nextSlide: Slide | null;
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
}

export function SpeakerView({
  currentSlide,
  nextSlide,
  currentIndex,
  totalSlides,
}: SpeakerViewProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full grid grid-cols-3 gap-4 p-4 bg-background">
      {/* Left: Current Slide */}
      <div className="col-span-2 flex flex-col gap-4">
        {/* Current Slide Preview */}
        <Card className="flex-1 overflow-hidden">
          <div className="h-full bg-zinc-950 rounded-lg overflow-hidden">
            <SlideRenderer slide={currentSlide} />
          </div>
        </Card>

        {/* Timer and Progress */}
        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-2xl font-mono font-bold">
                {formatTime(elapsedTime)}
              </span>
            </div>
            <span className="text-lg text-muted-foreground">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <div className="text-xl font-bold">
            <span className="text-primary">{currentIndex + 1}</span>
            <span className="text-muted-foreground"> / {totalSlides}</span>
          </div>
        </div>
      </div>

      {/* Right: Next Slide + Notes */}
      <div className="flex flex-col gap-4">
        {/* Next Slide Preview */}
        <Card className="h-48">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              Siguiente
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {nextSlide ? (
              <div className="h-full bg-zinc-950 rounded-lg overflow-hidden opacity-70">
                <div className="scale-50 origin-top-left w-[200%] h-[200%]">
                  <SlideRenderer slide={nextSlide} />
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Fin de la presentación
              </div>
            )}
          </CardContent>
        </Card>

        {/* Speaker Notes */}
        <Card className="flex-1">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm">Notas del Presentador</CardTitle>
          </CardHeader>
          <CardContent className="p-3 h-full">
            <ScrollArea className="h-full">
              {currentSlide.speakerNotes ? (
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {currentSlide.speakerNotes}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Sin notas para esta slide
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
