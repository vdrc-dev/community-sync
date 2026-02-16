import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { ExternalLink, X, Rocket, Clock, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Gen 11 starts March 3, 2026
const GEN11_DATE = new Date('2026-03-03T00:00:00-03:00');

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    // Update every 30 seconds to reduce visual noise
    setTimeLeft(calculateTimeLeft(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 30000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isLive: false,
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-primary tabular-nums"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );
}

function TerminalTyping() {
  const [step, setStep] = useState(0);
  const lines = useMemo(() => [
    { prefix: '$ ', text: 'vdrc --next-gen 11', isCommand: true },
    { prefix: '> ', text: 'GENERACION 11: MARZO 2026', className: 'text-primary' },
    { prefix: '> ', text: 'INSCRIPCIONES: ABIERTAS', className: 'text-accent' },
    { prefix: '> ', text: 'CUPOS LIMITADOS', className: 'text-yellow-400' },
  ], []);

  useEffect(() => {
    if (step < lines.length) {
      const timer = setTimeout(() => setStep(s => s + 1), step === 0 ? 800 : 600);
      return () => clearTimeout(timer);
    }
  }, [step, lines.length]);

  return (
    <div className="font-mono text-xs sm:text-sm space-y-1 text-left">
      {lines.slice(0, step).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={line.className || 'text-muted-foreground'}
        >
          <span className="text-primary/60">{line.prefix}</span>
          {line.text}
        </motion.div>
      ))}
      {step >= lines.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground"
        >
          <span className="text-primary/60">$ </span>
          <span className="animate-pulse">▊</span>
        </motion.div>
      )}
    </div>
  );
}

export function Gen11Banner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('gen11-banner-dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const countdown = useCountdown(GEN11_DATE);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem('gen11-banner-dismissed', 'true');
    } catch {}
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative overflow-hidden"
      >
        {/* Subtle top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        <div className="relative py-10 sm:py-14">
          {/* Clean background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 sm:top-4 sm:right-6 p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all z-20 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Cerrar banner"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-5xl mx-auto">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary/70">
                  /// PROXIMA_GENERACION
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket className="w-4 h-4 text-primary" />
                </motion.div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left: Info */}
                <div className="space-y-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold leading-tight"
                  >
                    Generacion{' '}
                    <span className="text-gradient">11</span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-foreground/80 max-w-lg"
                  >
                    De Inbox Zero a crear apps con IA en 4 sesiones. Higiene Digital, Productividad con IA, Presentaciones Automatizadas y Apps y Webs con IA. 11 generaciones, +150 profesionales y cada clase es distinta.
                    Arranca el <span className="text-primary font-semibold">3 de marzo 2026</span>.
                  </motion.p>

                  {/* Countdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-1 p-4 rounded-2xl glass"
                  >
                    <Clock className="w-4 h-4 text-primary mr-2 shrink-0" />
                    {countdown.isLive ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-primary font-mono font-bold text-lg"
                      >
                        EN VIVO AHORA
                      </motion.span>
                    ) : (
                      <div className="flex items-center gap-3 sm:gap-4">
                        <CountdownUnit value={countdown.days} label="Dias" />
                        <span className="text-primary/40 text-xl font-mono">:</span>
                        <CountdownUnit value={countdown.hours} label="Hrs" />
                        <span className="text-primary/40 text-xl font-mono">:</span>
                        <CountdownUnit value={countdown.minutes} label="Min" />
                        <span className="text-primary/40 text-xl font-mono">:</span>
                        <CountdownUnit value={countdown.seconds} label="Seg" />
                      </div>
                    )}
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-3"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group transition-all duration-300 hover:scale-[1.02]"
                    >
                      <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer">
                        <Zap className="w-4 h-4 mr-2" />
                        INSCRIBETE AHORA
                        <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 font-mono transition-all duration-300"
                    >
                      <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer">
                        CONOCER MAS
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </motion.div>
                </div>

                {/* Right: Terminal */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="hidden lg:block"
                >
                  <div className="glass-strong rounded-2xl p-5 hover:border-white/[0.1] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                      <span className="text-muted-foreground/60 text-xs ml-2 font-mono">vdrc://gen-11</span>
                    </div>
                    <TerminalTyping />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Subtle bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
