import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export interface GenerationNavInfo {
  generationNumber: number;
  currentWeek: number;
  totalWeeks: number;
  availableWeeks?: number[];
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
      <motion.button
        onClick={() => navigate(backUrl)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          color: 'rgba(255, 255, 255, 0.6)',
        }}
        whileHover={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: 'rgba(255, 255, 255, 0.9)',
        }}
        whileTap={{ scale: 0.96 }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Materiales</span>
      </motion.button>

      {/* Week chips */}
      <div 
        className="flex items-center gap-0.5 px-1.5 py-1 rounded-xl border"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
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
              className="relative px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
              style={{
                color: isActive
                  ? 'white'
                  : isAvailable
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(255, 255, 255, 0.15)',
                cursor: isAvailable ? 'pointer' : 'not-allowed',
              }}
              whileHover={isAvailable && !isActive ? { 
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              } : {}}
              whileTap={isAvailable && !isActive ? { scale: 0.92 } : {}}
            >
              {isActive && (
                <motion.div
                  layoutId="activeWeek"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, hsl(263 55% 50%), hsl(263 55% 40%))',
                    boxShadow: '0 0 16px hsl(263 55% 50% / 0.4)',
                  }}
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
