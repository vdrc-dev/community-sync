import { cn } from '@/lib/utils';
import { Check, Zap } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Step {
  label: string;
  icon?: LucideIcon;
  completed?: boolean;
  current?: boolean;
}

interface ProgressTrackProps {
  steps: Step[];
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

export function ProgressTrack({ 
  steps, 
  className,
  variant = 'horizontal' 
}: ProgressTrackProps) {
  if (variant === 'vertical') {
    return (
      <div className={cn('space-y-2', className)}>
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border',
              step.current 
                ? 'bg-primary/15 border-primary/30 text-primary' 
                : step.completed 
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-secondary/30 border-border/30 text-muted-foreground/50'
            )}>
              {step.completed ? (
                <Check className="w-4 h-4" />
              ) : step.current ? (
                <Zap className="w-4 h-4" />
              ) : step.icon ? (
                <step.icon className="w-4 h-4" />
              ) : (
                <span className="text-xs font-bold">{i + 1}</span>
              )}
            </div>
            <span className={cn(
              'text-sm',
              step.current ? 'font-semibold text-primary' : 
              step.completed ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg border transition-all',
            step.current 
              ? 'bg-primary/15 border-primary/30' 
              : step.completed 
                ? 'bg-emerald-500/10 border-emerald-500/20'
                : 'bg-secondary/20 border-border/30'
          )}>
            <div className={cn(
              'w-5 h-5 rounded-md flex items-center justify-center',
              step.current 
                ? 'bg-primary/20 text-primary' 
                : step.completed 
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-muted/20 text-muted-foreground/50'
            )}>
              {step.completed ? (
                <Check className="w-3 h-3" />
              ) : step.icon ? (
                <step.icon className="w-3 h-3" />
              ) : (
                <span className="text-xs font-bold">{i + 1}</span>
              )}
            </div>
            <span className={cn(
              'text-xs font-medium',
              step.current ? 'text-primary' : 
              step.completed ? 'text-emerald-400' : 'text-muted-foreground/70'
            )}>
              {step.label}
            </span>
          </div>
          
          {i < steps.length - 1 && (
            <div className={cn(
              'w-4 h-0.5 rounded-full',
              step.completed ? 'bg-emerald-500/40' : 'bg-border/50'
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
