import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, Check } from 'lucide-react';

interface JourneyStep {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  time?: string;
  color: 'blue' | 'pink' | 'emerald' | 'gray' | 'orange' | 'amber';
  isOptional?: boolean;
}

interface JourneyMapProps {
  steps: JourneyStep[];
  activeStep?: number;
  variant?: 'horizontal' | 'metro';
  className?: string;
  showConnectors?: boolean;
  animated?: boolean;
}

const colorStyles = {
  blue: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    glow: 'shadow-[0_0_20px_hsl(217_91%_60%/0.3)]',
    line: 'bg-blue-500/50',
  },
  pink: {
    bg: 'bg-pink-500/20',
    border: 'border-pink-500/40',
    text: 'text-pink-400',
    glow: 'shadow-[0_0_20px_hsl(330_81%_60%/0.3)]',
    line: 'bg-pink-500/50',
  },
  emerald: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_20px_hsl(142_76%_36%/0.3)]',
    line: 'bg-emerald-500/50',
  },
  gray: {
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/40',
    text: 'text-gray-400',
    glow: 'shadow-[0_0_20px_hsl(0_0%_50%/0.2)]',
    line: 'bg-gray-500/50',
  },
  orange: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
    glow: 'shadow-[0_0_20px_hsl(25_95%_53%/0.3)]',
    line: 'bg-orange-500/50',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_20px_hsl(38_92%_50%/0.3)]',
    line: 'bg-amber-500/50',
  },
};

export function JourneyMap({
  steps,
  activeStep = -1,
  variant = 'horizontal',
  className,
  showConnectors = true,
  animated = true,
}: JourneyMapProps) {
  if (variant === 'metro') {
    return (
      <div className={cn('relative', className)}>
        {/* Metro line */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 via-pink-500/50 to-emerald-500/50 rounded-full" />
        
        <div className="space-y-4">
          {steps.map((step, index) => {
            const colors = colorStyles[step.color];
            const Icon = step.icon;
            const isActive = index <= activeStep;
            
            return (
              <motion.div
                key={index}
                initial={animated ? { opacity: 0, x: -20 } : undefined}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 relative"
              >
                {/* Station dot */}
                <motion.div
                  className={cn(
                    'relative z-10 w-12 h-12 rounded-xl flex items-center justify-center border-2',
                    colors.bg,
                    colors.border,
                    isActive && colors.glow,
                    step.isOptional && 'border-dashed'
                  )}
                  animate={animated && isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={animated ? { duration: 2, repeat: Infinity } : {}}
                >
                  <Icon className={cn('w-5 h-5', colors.text)} />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={cn('font-semibold', colors.text)}>{step.label}</h4>
                    {step.time && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary/50 text-[10px] text-muted-foreground">
                        {step.time}
                      </span>
                    )}
                    {step.isOptional && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[10px] text-amber-400">
                        Opcional
                      </span>
                    )}
                  </div>
                  {step.sublabel && (
                    <p className="text-xs text-muted-foreground">{step.sublabel}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      {steps.map((step, index) => {
        const colors = colorStyles[step.color];
        const Icon = step.icon;
        const isActive = index <= activeStep;
        const isLast = index === steps.length - 1;
        
        return (
          <div key={index} className="flex items-center flex-1">
            <motion.div
              initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <motion.div
                className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center border-2 mb-2',
                  colors.bg,
                  colors.border,
                  isActive && colors.glow,
                  step.isOptional && 'border-dashed opacity-70'
                )}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className={cn('w-6 h-6', colors.text)} />
              </motion.div>
              <span className={cn('text-xs font-semibold', colors.text)}>{step.label}</span>
              {step.time && (
                <span className="text-[10px] text-muted-foreground">{step.time}</span>
              )}
            </motion.div>
            
            {/* Connector */}
            {showConnectors && !isLast && (
              <motion.div
                initial={animated ? { scaleX: 0 } : undefined}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.15 + 0.1, duration: 0.3 }}
                className={cn(
                  'flex-1 h-0.5 mx-2 origin-left',
                  'bg-gradient-to-r',
                  colorStyles[step.color].line,
                  colorStyles[steps[index + 1]?.color || 'gray'].line
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
