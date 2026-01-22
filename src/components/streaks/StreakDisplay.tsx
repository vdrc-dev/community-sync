import { motion, AnimatePresence } from 'framer-motion';
import { useStreaks } from '@/hooks/useStreaks';
import { Flame, Snowflake, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StreakDisplayProps {
  size?: 'sm' | 'md' | 'lg';
  showMultiplier?: boolean;
  className?: string;
}

export function StreakDisplay({ 
  size = 'md', 
  showMultiplier = true,
  className 
}: StreakDisplayProps) {
  const { streak, isLoading, getStreakEmoji, getStreakColor, isAtRisk } = useStreaks();

  if (isLoading || !streak) return null;

  const sizeClasses = {
    sm: 'text-sm gap-1',
    md: 'text-base gap-2',
    lg: 'text-xl gap-3',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const atRisk = isAtRisk();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          className={cn(
            'flex items-center font-mono',
            sizeClasses[size],
            className
          )}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          {/* Fire Icon with Animation */}
          <motion.div
            className="relative"
            animate={streak.current_streak > 0 ? {
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <Flame 
              className={cn(
                iconSizes[size],
                getStreakColor(streak.current_streak),
                atRisk && 'animate-pulse'
              )} 
            />
            {/* Glow effect */}
            {streak.current_streak >= 7 && (
              <motion.div
                className="absolute inset-0 blur-md"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Flame className={cn(iconSizes[size], getStreakColor(streak.current_streak))} />
              </motion.div>
            )}
          </motion.div>

          {/* Streak Count */}
          <AnimatePresence mode="wait">
            <motion.span
              key={streak.current_streak}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className={cn(
                'font-bold',
                getStreakColor(streak.current_streak)
              )}
            >
              {streak.current_streak}
            </motion.span>
          </AnimatePresence>

          {/* At Risk Warning */}
          {atRisk && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1"
            >
              <AlertTriangle className="w-4 h-4 text-yellow-500 animate-pulse" />
            </motion.div>
          )}

          {/* Freeze Count */}
          {streak.streak_freezes > 0 && (
            <div className="flex items-center gap-0.5 text-blue-400">
              <Snowflake className="w-3 h-3" />
              <span className="text-xs">{streak.streak_freezes}</span>
            </div>
          )}

          {/* Multiplier Badge */}
          {showMultiplier && streak.multiplier > 1 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold"
            >
              x{streak.multiplier}
            </motion.span>
          )}
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-center">
        <div className="space-y-1">
          <p className="font-bold">
            {getStreakEmoji(streak.current_streak)} {streak.current_streak} días de racha
          </p>
          {streak.longest_streak > streak.current_streak && (
            <p className="text-xs text-muted-foreground">
              Récord: {streak.longest_streak} días
            </p>
          )}
          {streak.multiplier > 1 && (
            <p className="text-xs text-primary">
              Multiplicador activo: x{streak.multiplier}
            </p>
          )}
          {atRisk && (
            <p className="text-xs text-yellow-500 font-medium">
              ⚠️ ¡Visita hoy para no perder tu racha!
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
