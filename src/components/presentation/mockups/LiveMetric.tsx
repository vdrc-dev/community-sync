import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface LiveMetricProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: LucideIcon;
  color?: 'primary' | 'emerald' | 'blue' | 'pink' | 'amber' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  decimals?: number;
  className?: string;
  delay?: number;
}

const colorStyles = {
  primary: {
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    text: 'text-primary',
    glow: 'shadow-[0_0_20px_hsl(158_55%_42%/0.2)]',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_20px_hsl(142_76%_36%/0.2)]',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    glow: 'shadow-[0_0_20px_hsl(217_91%_60%/0.2)]',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    text: 'text-pink-400',
    glow: 'shadow-[0_0_20px_hsl(330_81%_60%/0.2)]',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_20px_hsl(38_92%_50%/0.2)]',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
    glow: 'shadow-[0_0_20px_hsl(25_95%_53%/0.2)]',
  },
};

const sizeStyles = {
  sm: {
    container: 'p-3',
    value: 'text-2xl',
    label: 'text-xs',
    icon: 'w-4 h-4',
    iconBox: 'w-8 h-8',
  },
  md: {
    container: 'p-4',
    value: 'text-3xl',
    label: 'text-sm',
    icon: 'w-5 h-5',
    iconBox: 'w-10 h-10',
  },
  lg: {
    container: 'p-5',
    value: 'text-4xl',
    label: 'text-base',
    icon: 'w-6 h-6',
    iconBox: 'w-12 h-12',
  },
};

export function LiveMetric({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  label,
  icon: Icon,
  color = 'primary',
  size = 'md',
  decimals = 0,
  className,
  delay = 0,
}: LiveMetricProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayValue, setDisplayValue] = useState(from);
  const hasAnimated = useRef(false);

  const styles = colorStyles[color];
  const sizes = sizeStyles[size];

  useEffect(() => {
    if (hasAnimated.current) return;
    
    const timeout = setTimeout(() => {
      hasAnimated.current = true;
      setIsAnimating(true);
      
      const controls = animate(from, to, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (value) => {
          setDisplayValue(Number(value.toFixed(decimals)));
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [from, to, duration, decimals, delay]);

  const formattedValue = `${prefix}${displayValue.toLocaleString()}${suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay }}
      className={cn(
        'rounded-xl border transition-shadow duration-500',
        styles.bg,
        styles.border,
        isAnimating && styles.glow,
        sizes.container,
        className
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={cn('rounded-lg flex items-center justify-center', styles.bg, styles.border, sizes.iconBox)}>
            <Icon className={cn(sizes.icon, styles.text)} />
          </div>
        )}
        <div>
          <motion.p
            className={cn('font-black tracking-tight', styles.text, sizes.value)}
            animate={isAnimating ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            {formattedValue}
          </motion.p>
          <p className={cn('text-muted-foreground', sizes.label)}>{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
