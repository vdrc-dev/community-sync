import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={scrollUp}
          className="fixed bottom-24 md:bottom-24 right-4 md:right-6 z-40 w-10 h-10 rounded-full bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-200 border border-primary/20"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
