import { motion } from 'framer-motion';
import { ChallengeWithProgress } from '@/hooks/useChallenges';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Check, Clock, Zap } from 'lucide-react';

interface ChallengeCardProps {
  challenge: ChallengeWithProgress;
  timeRemaining: string;
}

export function ChallengeCard({ challenge, timeRemaining }: ChallengeCardProps) {
  const progress = challenge.progress?.current_count || 0;
  const target = challenge.target_count;
  const percentage = Math.min((progress / target) * 100, 100);
  const isCompleted = !!challenge.progress?.completed_at;

  return (
    <motion.div
      className={cn(
        'p-4 rounded-lg border transition-all duration-300',
        isCompleted 
          ? 'bg-primary/10 border-primary/30' 
          : 'bg-card/50 border-border/50 hover:border-primary/30'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.span 
            className="text-2xl"
            animate={isCompleted ? { 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0] 
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {isCompleted ? '✅' : challenge.icon_emoji}
          </motion.span>
          <div>
            <h4 className={cn(
              'font-semibold',
              isCompleted && 'text-primary'
            )}>
              {challenge.title}
            </h4>
            {challenge.description && (
              <p className="text-sm text-muted-foreground">
                {challenge.description}
              </p>
            )}
          </div>
        </div>

        {/* Reward Badge */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono">
          <Zap className="w-3 h-3" />
          +{challenge.points_reward}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Progreso: {progress}/{target}
          </span>
          {isCompleted ? (
            <span className="flex items-center gap-1 text-primary font-medium">
              <Check className="w-4 h-4" />
              Completado
            </span>
          ) : (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />
              {timeRemaining}
            </span>
          )}
        </div>

        <div className="relative">
          <Progress 
            value={percentage} 
            className={cn(
              'h-2',
              isCompleted && '[&>div]:bg-primary'
            )}
          />
          
          {/* Animated glow on progress */}
          {!isCompleted && progress > 0 && (
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full bg-primary/50 blur-sm"
              style={{ width: `${percentage}%` }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Badge Reward Preview */}
      {challenge.badge_reward && !isCompleted && (
        <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-yellow-400">🏆</span>
          <span>Desbloquea badge especial al completar</span>
        </div>
      )}
    </motion.div>
  );
}
