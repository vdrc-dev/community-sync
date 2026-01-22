import { cn } from '@/lib/utils';
import { LEVEL_NAMES, LEVEL_COLORS } from '@/hooks/useGamification';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export function LevelBadge({ level, size = 'md', showName = true, className }: LevelBadgeProps) {
  const levelName = LEVEL_NAMES[level - 1] || LEVEL_NAMES[0];
  const levelColor = LEVEL_COLORS[level - 1] || LEVEL_COLORS[0];

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono font-medium',
        'bg-muted/50 border border-border',
        sizeClasses[size],
        levelColor,
        className
      )}
    >
      <span className={cn('inline-block', iconSizes[size])}>
        {level === 5 ? '👑' : level === 4 ? '⭐' : level === 3 ? '🔥' : level === 2 ? '🚀' : '🌱'}
      </span>
      {showName && <span>Lv.{level} {levelName}</span>}
      {!showName && <span>Lv.{level}</span>}
    </div>
  );
}
