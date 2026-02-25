/**
 * SlideTransitionOverlay — Flash effect during rapid navigation.
 * Adds a subtle directional flash that reinforces the navigation direction.
 */
import { motion, AnimatePresence } from 'framer-motion';

interface SlideTransitionOverlayProps {
  direction: number;
  isTransitioning: boolean;
}

export function SlideTransitionOverlay({ direction, isTransitioning }: SlideTransitionOverlayProps) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key={`flash-${Date.now()}`}
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: direction > 0
              ? 'linear-gradient(90deg, transparent 60%, hsl(263 65% 50% / 0.06) 100%)'
              : 'linear-gradient(270deg, transparent 60%, hsl(263 65% 50% / 0.06) 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </AnimatePresence>
  );
}
