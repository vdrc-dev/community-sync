import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle2, Circle } from 'lucide-react';

interface GenerationProgressBarProps {
  classes: { id: string }[];
  showDetails?: boolean;
  className?: string;
}

export function GenerationProgressBar({ classes, showDetails = true, className }: GenerationProgressBarProps) {
  const { getGenerationProgress } = useProgress();
  const { completed, total, percentage } = getGenerationProgress(classes);

  if (!total) return null;

  const isComplete = completed === total;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle2 className="w-4 h-4 text-primary" />
          ) : (
            <Circle className="w-4 h-4 text-muted-foreground" />
          )}
          <span className={cn(isComplete ? 'text-primary font-medium' : 'text-muted-foreground')}>
            {showDetails ? (
              isComplete ? '¡Completado!' : `${completed} de ${total} clases`
            ) : (
              `${Math.round(percentage)}%`
            )}
          </span>
        </div>
        {showDetails && !isComplete && (
          <span className="text-xs text-muted-foreground">{Math.round(percentage)}%</span>
        )}
      </div>
      <Progress 
        value={percentage} 
        className={cn('h-2', isComplete && 'bg-primary/20')}
      />
    </div>
  );
}
