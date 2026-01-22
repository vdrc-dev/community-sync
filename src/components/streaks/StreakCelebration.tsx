import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStreaks } from '@/hooks/useStreaks';
import confetti from 'canvas-confetti';
import { Flame, Trophy, Star, Zap } from 'lucide-react';

interface StreakCelebrationProps {
  show: boolean;
  streakCount: number;
  onComplete?: () => void;
}

export function StreakCelebration({ show, streakCount, onComplete }: StreakCelebrationProps) {
  const [isVisible, setIsVisible] = useState(show);
  const { getStreakEmoji, STREAK_MILESTONES } = useStreaks();
  
  const isMilestone = STREAK_MILESTONES.includes(streakCount);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      if (isMilestone) {
        // Big celebration for milestones
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            clearInterval(interval);
            return;
          }

          const particleCount = 50 * (timeLeft / duration);
          
          confetti({
            ...defaults,
            particleCount,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#22c55e', '#fbbf24', '#f97316', '#ef4444'],
          });
        }, 250);
      } else {
        // Simple celebration
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#22c55e', '#06b6d4'],
        });
      }

      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, isMilestone ? 4000 : 2000);

      return () => clearTimeout(timer);
    }
  }, [show, isMilestone, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="flex flex-col items-center gap-4 p-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {/* Main Fire Animation */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: isMilestone ? 5 : 2,
            }}
          >
            <Flame className="w-24 h-24 text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
            
            {/* Glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-orange-400/50"
              animate={{
                scale: [1, 2, 2.5],
                opacity: [0.8, 0.3, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Streak Count */}
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-6xl font-mono font-bold text-gradient mb-2">
              {streakCount}
            </div>
            <div className="text-xl text-foreground/80">
              {isMilestone ? '¡HITO ALCANZADO!' : '¡Días seguidos!'}
            </div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: Math.cos(i * 45 * Math.PI / 180) * 100,
                y: Math.sin(i * 45 * Math.PI / 180) * 100 - 50,
              }}
              transition={{
                duration: 1.5,
                delay: 0.1 * i,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              {i % 4 === 0 && <Star className="w-6 h-6 text-yellow-400" />}
              {i % 4 === 1 && <Zap className="w-6 h-6 text-primary" />}
              {i % 4 === 2 && <Flame className="w-5 h-5 text-orange-400" />}
              {i % 4 === 3 && <Trophy className="w-5 h-5 text-yellow-500" />}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
