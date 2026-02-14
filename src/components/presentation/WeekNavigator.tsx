import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface GenerationNavInfo {
  generationNumber: number;
  currentWeek: number;
  totalWeeks: number;
  availableWeeks?: number[]; // weeks that have slides
}

interface WeekNavigatorProps {
  generationInfo: GenerationNavInfo;
  backUrl: string;
}

export function WeekNavigator({ generationInfo, backUrl }: WeekNavigatorProps) {
  const navigate = useNavigate();
  const { generationNumber, currentWeek, totalWeeks, availableWeeks } = generationInfo;

  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      {/* Back to materials */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(backUrl)}
        className="bg-background/80 backdrop-blur-sm border border-border gap-1 text-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Materiales
      </Button>

      {/* Week chips */}
      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
        {weeks.map((week) => {
          const isActive = week === currentWeek;
          const isAvailable = !availableWeeks || availableWeeks.includes(week);

          return (
            <motion.button
              key={week}
              onClick={() => {
                if (isAvailable && !isActive) {
                  navigate(`/slides/gen${generationNumber}s${week}`);
                }
              }}
              disabled={!isAvailable}
              className={`
                relative px-2.5 py-1 rounded-md text-xs font-medium transition-all
                ${isActive
                  ? 'text-primary-foreground'
                  : isAvailable
                    ? 'text-muted-foreground hover:text-foreground hover:bg-accent/50 cursor-pointer'
                    : 'text-muted-foreground/40 cursor-not-allowed'
                }
              `}
              whileHover={isAvailable && !isActive ? { scale: 1.05 } : {}}
              whileTap={isAvailable && !isActive ? { scale: 0.95 } : {}}
            >
              {isActive && (
                <motion.div
                  layoutId="activeWeek"
                  className="absolute inset-0 rounded-md bg-primary"
                  transition={{ type: 'spring', duration: 0.4 }}
                />
              )}
              <span className="relative z-10">S{week}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
