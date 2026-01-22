import { cn } from '@/lib/utils';
import { useGamification, BADGES } from '@/hooks/useGamification';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock } from 'lucide-react';

interface BadgeGridProps {
  userId?: string;
  showLocked?: boolean;
  className?: string;
}

export function BadgeGrid({ showLocked = true, className }: BadgeGridProps) {
  const { userBadges, isLoading } = useGamification();

  const earnedBadgeTypes = new Set(userBadges?.map(b => b.badge_type) || []);

  const allBadges = Object.entries(BADGES).map(([type, info]) => ({
    type,
    ...info,
    earned: earnedBadgeTypes.has(type),
    earnedAt: userBadges?.find(b => b.badge_type === type)?.earned_at,
  }));

  const displayBadges = showLocked ? allBadges : allBadges.filter(b => b.earned);

  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-4 gap-3', className)}>
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-muted/50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className={cn('grid grid-cols-4 gap-3', className)}>
        {displayBadges.map((badge) => (
          <Tooltip key={badge.type}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'aspect-square rounded-xl flex items-center justify-center text-2xl',
                  'border transition-all cursor-help',
                  badge.earned
                    ? 'bg-primary/10 border-primary/30 hover:border-primary/50 hover:scale-105'
                    : 'bg-muted/30 border-border/50 opacity-40 grayscale'
                )}
              >
                {badge.earned ? (
                  badge.icon
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[200px]">
              <div className="text-center">
                <p className="font-semibold">{badge.icon} {badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
                {badge.earned && badge.earnedAt && (
                  <p className="text-xs text-primary mt-1">
                    Obtenido {new Date(badge.earnedAt).toLocaleDateString('es-CL')}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
