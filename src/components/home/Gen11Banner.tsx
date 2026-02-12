import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { ExternalLink, X, Rocket, Clock, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Gen 11 starts March 1, 2026
const GEN11_DATE = new Date('2026-03-01T00:00:00-03:00');

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
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
      return sessionStorage.getItem('gen11-banner-dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const countdown = useCountdown(GEN11_DATE);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('gen11-banner-dismissed', 'true');
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
        {/* Animated gradient border top */}
        <div className="absolute top-0 left-0 right-0 h-px">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ width: '200%' }}
          />
        </div>

        <div className="relative py-10 sm:py-14">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Glow orbs */}
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-[60px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-4 sm:top-4 sm:right-6 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all z-20"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
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
                    <span className="text-gradient glow-text">11</span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-foreground/80 max-w-lg"
                  >
                    El Taller de Productividad Digital con IA vuelve en{' '}
                    <span className="text-primary font-semibold">marzo 2026</span>.
                    Nuevos workflows, herramientas y comunidad te esperan.
                  </motion.p>

                  {/* Countdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-1 p-4 rounded-xl bg-card/60 backdrop-blur-xl border border-primary/20"
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
                      className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
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
                        Conocer mas
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
                  <div className="glass-strong rounded-xl p-5 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
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

          {/* Animated gradient border bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-accent to-transparent"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ width: '200%' }}
            />
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
