import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin progress bar fixed at the top of the viewport.
 * Shows how far the user has scrolled on the current page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, hsl(152 56% 42%), hsl(174 55% 42%))',
      }}
    />
  );
}
