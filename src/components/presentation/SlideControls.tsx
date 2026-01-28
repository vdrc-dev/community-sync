import { 
  ChevronLeft, 
  ChevronRight, 
  Grid3X3, 
  Maximize, 
  Minimize, 
  Monitor, 
  Download,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SlideControlsProps {
  currentIndex: number;
  totalSlides: number;
  isFullscreen: boolean;
  isGridView: boolean;
  isSpeakerView: boolean;
  title?: string;
  generationCode?: string;
  onPrev: () => void;
  onNext: () => void;
  onToggleGrid: () => void;
  onToggleSpeaker: () => void;
  onToggleFullscreen: () => void;
  onExport?: () => void;
  onExit?: () => void;
  className?: string;
}

export function SlideControls({
  currentIndex,
  totalSlides,
  isFullscreen,
  isGridView,
  isSpeakerView,
  title,
  generationCode,
  onPrev,
  onNext,
  onToggleGrid,
  onToggleSpeaker,
  onToggleFullscreen,
  onExport,
  onExit,
  className,
}: SlideControlsProps) {
  return (
    <div className={cn(
      "flex items-center justify-between px-4 py-2 bg-background/80 backdrop-blur-sm border-b border-border/50",
      className
    )}>
      {/* Left: Generation Badge & Title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {generationCode && (
          <Badge variant="outline" className="text-primary border-primary shrink-0">
            {generationCode}
          </Badge>
        )}
        {title && (
          <span className="text-sm font-medium text-muted-foreground truncate max-w-[200px] hidden sm:block">
            {title}
          </span>
        )}
      </div>

      {/* Center: Navigation */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onPrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Anterior (←)</TooltipContent>
        </Tooltip>

        <span className="text-sm font-medium min-w-[80px] text-center">
          {currentIndex + 1} / {totalSlides}
        </span>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onNext}
              disabled={currentIndex === totalSlides - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Siguiente (→)</TooltipContent>
        </Tooltip>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={isGridView ? "secondary" : "ghost"} 
              size="icon"
              onClick={onToggleGrid}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Vista cuadrícula (G)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={isSpeakerView ? "secondary" : "ghost"} 
              size="icon"
              onClick={onToggleSpeaker}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Modo presentador (S)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onToggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Pantalla completa (F)</TooltipContent>
        </Tooltip>

        {onExport && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onExport}
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Exportar (PPTX/PDF)</TooltipContent>
          </Tooltip>
        )}

        {onExit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onExit}
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Salir (Esc)</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
