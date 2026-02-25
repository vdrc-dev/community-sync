/**
 * SlideLoadingScreen — Epic entrance animation when the presentation first loads.
 * Shows a cinematic reveal with the presentation name, then fades out.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SlideLoadingScreenProps {
  name: string;
  badge?: string;
  badgeColor?: string;
  onComplete: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function SlideLoadingScreen({ name, badge, badgeColor, onComplete }: SlideLoadingScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate fast progressive load
    const steps = [15, 35, 55, 72, 88, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
        setTimeout(tick, i < 4 ? 80 : 120);
      } else {
        // Brief pause at 100%, then reveal
        setTimeout(() => setPhase('reveal'), 200);
        setTimeout(() => setPhase('exit'), 1100);
        setTimeout(() => onComplete(), 1500);
      }
    };
    setTimeout(tick, 100);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#04030a' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.03 }}
          transition={{ duration: 0.45, ease }}
        >
          {/* Ambient orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(263 65% 50% / 0.12), transparent 70%)',
              top: '10%', left: '20%', transform: 'translate(-50%, -50%)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(185 70% 50% / 0.08), transparent 70%)',
              bottom: '15%', right: '20%', transform: 'translate(50%, 50%)',
            }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.025,
              backgroundImage: 'radial-gradient(hsl(263 60% 70%) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 text-center px-8">
            {/* Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: phase === 'reveal' ? 1 : 0.6, y: 0, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease }}
              >
                <span
                  className="text-xs font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase text-white"
                  style={{ background: badgeColor || 'hsl(263 65% 55%)' }}
                >
                  {badge}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              className="text-3xl sm:text-5xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, hsl(263 80% 75%), hsl(185 75% 60%), hsl(330 70% 68%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px hsl(263 80% 60% / 0.5))',
              }}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px) drop-shadow(0 0 0px transparent)' }}
              animate={{
                opacity: 1, y: 0,
                filter: 'blur(0px) drop-shadow(0 0 40px hsl(263 80% 60% / 0.5))',
              }}
              transition={{ delay: 0.25, duration: 0.8, ease }}
            >
              {name}
            </motion.h1>

            {/* Progress bar */}
            <motion.div
              className="w-64 h-[2px] rounded-full overflow-hidden"
              style={{ background: 'hsl(263 40% 40% / 0.2)' }}
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: phase === 'reveal' ? 0 : 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, hsl(263 65% 55%), hsl(185 70% 55%), hsl(330 65% 60%))',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  width: `${progress}%`,
                  backgroundPosition: `${progress}% 0%`,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Loading label */}
            <motion.p
              className="text-[11px] font-medium tracking-[0.25em] uppercase"
              style={{ color: 'hsl(263 40% 60% / 0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'reveal' ? 0 : 0.7 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Cargando slides
            </motion.p>

            {/* Ready checkmark on reveal */}
            <AnimatePresence>
              {phase === 'reveal' && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(160 65% 45% / 0.15)', border: '1px solid hsl(160 65% 45% / 0.4)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                  >
                    <motion.svg
                      width="14" height="14" viewBox="0 0 14 14"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                    >
                      <motion.path
                        d="M2 7L5.5 10.5L12 4"
                        stroke="hsl(160 65% 55%)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                      />
                    </motion.svg>
                  </motion.div>
                  <span className="text-xs font-semibold" style={{ color: 'hsl(160 65% 60%)' }}>
                    Listo
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(263 40% 50% / 0.008) 2px, hsl(263 40% 50% / 0.008) 4px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
