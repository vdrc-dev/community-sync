import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight, ChevronRight } from 'lucide-react';

interface FlowStep {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  time?: string;
  color: 'blue' | 'pink' | 'emerald' | 'gray' | 'orange' | 'primary';
}

interface FlowArrowProps {
  steps: FlowStep[];
  className?: string;
  variant?: 'compact' | 'detailed';
}

const colorMap = {
  blue: {
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/25',
    text: 'text-blue-400',
  },
  pink: {
    bg: 'bg-pink-500/15',
    border: 'border-pink-500/25',
    text: 'text-pink-400',
  },
  emerald: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/25',
    text: 'text-emerald-400',
  },
  gray: {
    bg: 'bg-gray-500/15',
    border: 'border-gray-500/25',
    text: 'text-gray-400',
  },
  orange: {
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/25',
    text: 'text-orange-400',
  },
  primary: {
    bg: 'bg-primary/15',
    border: 'border-primary/25',
    text: 'text-primary',
  },
};

export function FlowArrow({ steps, className, variant = 'compact' }: FlowArrowProps) {
  if (variant === 'detailed') {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-3', className)}>
        {steps.map((step, i) => {
          const colors = colorMap[step.color];
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="text-center">
                <div className={cn(
                  'w-14 h-14 mx-auto mb-2 rounded-xl border flex items-center justify-center',
                  colors.bg,
                  colors.border
                )}>
                  <step.icon className={cn('w-6 h-6', colors.text)} />
                </div>
                <p className="font-semibold text-xs">{step.label}</p>
                {step.sublabel && (
                  <p className="text-xs text-muted-foreground/60">{step.sublabel}</p>
                )}
                {step.time && (
                  <p className={cn('text-xs mt-0.5', colors.text)}>{step.time}</p>
                )}
              </div>
              
              {i < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-muted-foreground/30" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, i) => {
        const colors = colorMap[step.color];
        return (
          <div key={i} className="flex items-center gap-2">
            <div className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border',
              colors.bg,
              colors.border
            )}>
              <step.icon className={cn('w-4 h-4', colors.text)} />
              <span className={cn('text-sm font-medium', colors.text)}>{step.label}</span>
            </div>
            
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
            )}
          </div>
        );
      })}
    </div>
  );
}
