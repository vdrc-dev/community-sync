import { cn } from '@/lib/utils';
import { useGamification } from '@/hooks/useGamification';
import { Progress } from '@/components/ui/progress';
import { LevelBadge } from './LevelBadge';
import { Zap } from 'lucide-react';

interface PointsDisplayProps {
  compact?: boolean;
  className?: string;
}

export function PointsDisplay({ compact = false, className }: PointsDisplayProps) {
  const { userPoints, getLevelProgress, isLoading, LEVEL_NAMES } = useGamification();

  if (isLoading || !userPoints) {
    return null;
  }

  const { current, next, percentage } = getLevelProgress();

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="flex items-center gap-1 text-sm font-mono">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary font-bold">{userPoints.points}</span>
        </div>
        <LevelBadge level={userPoints.level} size="sm" showName={false} />
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <LevelBadge level={userPoints.level} />
        <div className="flex items-center gap-1 text-sm font-mono">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary font-bold">{userPoints.points}</span>
          <span className="text-muted-foreground">pts</span>
        </div>
      </div>

      {userPoints.level < 5 && (
        <div className="space-y-1">
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{current} pts</span>
            <span>{next} pts para {LEVEL_NAMES[userPoints.level]}</span>
          </div>
        </div>
      )}

      {userPoints.level === 5 && (
        <p className="text-xs text-primary text-center">
          🎉 ¡Nivel máximo alcanzado!
        </p>
      )}
    </div>
  );
}
