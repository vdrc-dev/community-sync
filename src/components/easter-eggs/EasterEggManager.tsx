import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreferences } from '@/hooks/usePreferences';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

interface EasterEgg {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const EASTER_EGGS: EasterEgg[] = [
  { id: 'konami', name: 'Código Konami', description: '¡Desbloqueaste el código legendario!', icon: '🎮' },
  { id: 'night_owl', name: 'Noctámbulo', description: 'Activo después de medianoche', icon: '🦉' },
  { id: 'early_bird', name: 'Madrugador', description: 'Activo antes de las 6 AM', icon: '🐦' },
  { id: 'speed_reader', name: 'Lector Veloz', description: 'Usaste CMD+K 10 veces en un minuto', icon: '⚡' },
  { id: 'explorer', name: 'Explorador Total', description: 'Visitaste todas las páginas', icon: '🧭' },
  { id: 'matrix', name: 'Matrix Mode', description: 'Escribiste "matrix" en el command palette', icon: '💊' },
];

export function EasterEggManager() {
  const { discoverEasterEgg, hasDiscovered, playSound } = usePreferences();
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showMatrixEffect, setShowMatrixEffect] = useState(false);

  // Konami Code detector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);
        
        if (newIndex === KONAMI_CODE.length) {
          triggerEasterEgg('konami');
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  // Time-based easter eggs
  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 0 && hour < 5 && !hasDiscovered('night_owl')) {
      setTimeout(() => triggerEasterEgg('night_owl'), 5000);
    }
    
    if (hour >= 5 && hour < 6 && !hasDiscovered('early_bird')) {
      setTimeout(() => triggerEasterEgg('early_bird'), 5000);
    }
  }, [hasDiscovered]);

  const triggerEasterEgg = useCallback((eggId: string) => {
    if (hasDiscovered(eggId)) return;
    
    const egg = EASTER_EGGS.find(e => e.id === eggId);
    if (!egg) return;

    discoverEasterEgg(eggId);
    playSound('achievement');

    // Special effects based on egg
    if (eggId === 'konami') {
      // Rainbow confetti explosion
      const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
      confetti({
        particleCount: 200,
        spread: 180,
        origin: { y: 0.5 },
        colors,
      });
    } else if (eggId === 'matrix') {
      setShowMatrixEffect(true);
      setTimeout(() => setShowMatrixEffect(false), 5000);
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#06b6d4', '#fbbf24'],
      });
    }

    toast.success(`${egg.icon} Easter Egg: ${egg.name}`, {
      description: egg.description,
      duration: 5000,
    });
  }, [hasDiscovered, discoverEasterEgg, playSound]);

  // Expose trigger function globally for other components
  useEffect(() => {
    (window as any).__triggerEasterEgg = triggerEasterEgg;
    return () => {
      delete (window as any).__triggerEasterEgg;
    };
  }, [triggerEasterEgg]);

  return (
    <>
      {/* Matrix Effect Overlay */}
      <AnimatePresence>
        {showMatrixEffect && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none overflow-hidden bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Matrix rain effect component
function MatrixRain() {
  const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
  const columns = Math.floor(window.innerWidth / 20);

  return (
    <div className="relative w-full h-full font-mono text-sm text-green-500">
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 whitespace-nowrap"
          style={{ left: i * 20 }}
          initial={{ y: -100 }}
          animate={{ y: window.innerHeight + 100 }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {[...Array(30)].map((_, j) => (
            <div
              key={j}
              style={{ opacity: 1 - j * 0.03 }}
              className="text-center"
            >
              {characters[Math.floor(Math.random() * characters.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
