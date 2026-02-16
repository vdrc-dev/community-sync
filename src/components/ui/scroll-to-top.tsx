import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 16;
  const dashOffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={scrollUp}
          className="fixed bottom-24 md:bottom-24 right-4 md:right-6 z-40 w-10 h-10 rounded-full bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 border border-white/[0.08] group"
          aria-label="Volver arriba"
          title={`${Math.round(progress * 100)}% leido`}
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="hsl(var(--primary) / 0.15)"
              strokeWidth="2"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>
          <ArrowUp className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
