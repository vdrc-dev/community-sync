import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'glow' | 'dots' | 'gradient';
}

export function SectionDivider({ variant = 'glow' }: SectionDividerProps) {
  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary/40"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className="relative h-px w-full max-w-4xl mx-auto my-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  // Default: glow
  return (
    <div className="relative py-2">
      <div className="absolute left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/50"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
