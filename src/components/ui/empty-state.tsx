import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline';
  };
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center relative overflow-hidden',
        className
      )}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Icon with glow */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5">
          <Icon className="w-7 h-7 text-primary/70" />
        </div>
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-mono font-semibold mb-2 relative">{title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground max-w-sm mb-6 relative">{description}</p>

      {/* Action */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <Button
            variant={action.variant || 'default'}
            onClick={action.onClick}
            className={cn(
              'font-mono transition-all duration-300 hover:scale-105',
              action.variant === 'outline'
                ? 'border-primary/30 hover:border-primary/60 hover:bg-primary/5'
                : 'bg-primary hover:bg-primary/90'
            )}
          >
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
