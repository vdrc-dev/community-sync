import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MetricCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  color?: 'primary' | 'accent' | 'emerald' | 'blue' | 'pink' | 'orange';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animateValue?: boolean;
}

const colorClasses = {
  primary: {
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    text: 'text-primary',
    iconBg: 'bg-primary/15',
    glow: 'shadow-[0_0_20px_hsl(158_55%_42%/0.15)]',
  },
  accent: {
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    text: 'text-accent',
    iconBg: 'bg-accent/15',
    glow: 'shadow-[0_0_20px_hsl(185_80%_48%/0.15)]',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
    glow: 'shadow-[0_0_20px_hsl(160_60%_45%/0.15)]',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
    glow: 'shadow-[0_0_20px_hsl(217_91%_60%/0.15)]',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    text: 'text-pink-400',
    iconBg: 'bg-pink-500/15',
    glow: 'shadow-[0_0_20px_hsl(330_80%_60%/0.15)]',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
    iconBg: 'bg-orange-500/15',
    glow: 'shadow-[0_0_20px_hsl(25_95%_53%/0.15)]',
  },
};

// Animated number component
function AnimatedNumber({ value }: { value: string }) {
  const numericPart = value.replace(/[^0-9.]/g, '');
  const suffix = value.replace(/[0-9.]/g, '');
  const numericValue = parseFloat(numericPart) || 0;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (numericPart.includes('.')) {
      return v.toFixed(1);
    }
    return Math.round(v).toString();
  });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const controls = animate(count, numericValue, { 
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
    
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [numericValue]);

  return <>{displayValue}{suffix}</>;
}

export function MetricCard({ 
  value, 
  label, 
  icon: Icon, 
  color = 'primary',
  className,
  size = 'md',
  animateValue = false,
}: MetricCardProps) {
  const colors = colorClasses[color];
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };
  
  const valueClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div 
      className={cn(
        'rounded-xl border flex items-center gap-4 transition-all duration-300',
        colors.bg,
        colors.border,
        colors.glow,
        sizeClasses[size],
        'hover:scale-[1.02]',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {Icon && (
        <div className={cn(
          'rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300',
          iconSizes[size],
          colors.iconBg
        )}>
          <Icon className={cn('w-5 h-5', colors.text)} />
        </div>
      )}
      <div>
        <p className={cn('font-black tracking-tight', valueClasses[size], colors.text)}>
          {animateValue ? <AnimatedNumber value={value} /> : value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}
