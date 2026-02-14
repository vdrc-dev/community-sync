import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useExportContext } from '@/contexts/ExportContext';

interface SlideWrapperProps {
  children: ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

/* ── Floating ambient particles ─────────────────────────────────── */
const PARTICLE_COUNT = 24;
const PARTICLE_HUES = [263, 185, 330, 160, 45]; // violet, cyan, pink, emerald, amber

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 1.5 + Math.random() * 2.5,
  hue: PARTICLE_HUES[i % PARTICLE_HUES.length],
  duration: 6 + Math.random() * 6,
  delay: Math.random() * 5,
  yDrift: -(15 + Math.random() * 30),
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue} 60% 65% / 0.35)`,
            boxShadow: `0 0 ${p.size * 4}px hsl(${p.hue} 60% 65% / 0.4)`,
          }}
          animate={{
            y: [0, p.yDrift, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function SlideWrapper({ children, className }: SlideWrapperProps) {
  let isExporting = false;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ctx = useExportContext();
    isExporting = ctx.isExporting;
  } catch {
    // ExportContext not available — not exporting
  }

  return (
    <motion.div
      className={cn('w-full h-full relative', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Ambient floating particles — hidden during export */}
      {!isExporting && <FloatingParticles />}

      {/* Content - slides control their own layout and background */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

// Export item variants for use in slides
export { itemVariants, containerVariants };
