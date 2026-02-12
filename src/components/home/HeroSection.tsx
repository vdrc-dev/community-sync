import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Terminal, Zap, Brain, Rocket, ExternalLink } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

interface HeroSectionProps {
  isAuthenticated: boolean;
}

// Generate random particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.2,
  }));
};

// Circuit corner decoration (matching vdrc.cl)
function CircuitCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const posClass = {
    tl: 'top-4 left-4',
    tr: 'top-4 right-4 rotate-90',
    bl: 'bottom-4 left-4 -rotate-90',
    br: 'bottom-4 right-4 rotate-180',
  }[position];

  return (
    <div className={`absolute ${posClass} w-12 h-12 hidden md:block pointer-events-none`}>
      <div className="absolute top-0 left-0 w-full h-px bg-primary/30" />
      <div className="absolute top-0 left-0 w-px h-full bg-primary/30" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/60" />
    </div>
  );
}

// Typing effect component
function TypingLine({ 
  text, delay, isCommand = false, prefix = '', className = ''
}: { text: string; delay: number; isCommand?: boolean; prefix?: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShowCursor(true);
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setShowCursor(false);
          setIsComplete(true);
        }
      }, isCommand ? 80 : 30);
      return () => clearInterval(typeInterval);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [text, delay, isCommand]);

  return (
    <p className={className}>
      {prefix && <span className="text-primary">{prefix}</span>}
      {displayedText}
      {showCursor && <span className="animate-pulse">▊</span>}
      {isComplete && !isCommand && <span className="opacity-0">.</span>}
    </p>
  );
}

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  const particles = useMemo(() => generateParticles(50), []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(180, 100%, 35%) 25%, hsl(270, 70%, 45%) 50%, hsl(180, 100%, 35%) 75%, hsl(142, 76%, 36%) 100%)',
          backgroundSize: '400% 400%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" />

      {/* Circuit corners */}
      <CircuitCorner position="tl" />
      <CircuitCorner position="tr" />
      <CircuitCorner position="bl" />
      <CircuitCorner position="br" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, hsl(142, 76%, 50%) 0%, hsl(180, 100%, 45%) 50%, transparent 100%)`,
              boxShadow: `0 0 ${particle.size * 2}px hsl(142, 76%, 50% / 0.5)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-background/40 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/5 relative"
        >
          {/* /// TRANSMISSION label - vdrc.cl style */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-4 left-6 md:top-6 md:left-8"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary/70">
              /// PORTAL_COMUNIDAD
            </span>
          </motion.div>

          {/* System version badge - vdrc.cl/talleres style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 mb-8 border-primary/50 bg-primary/10 backdrop-blur-sm font-mono text-xs tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2 inline-block" />
              SYSTEM v2.0 // COMMUNITY EDITION
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold mb-6 leading-[0.9] tracking-tight">
              <motion.span className="block text-foreground" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                ACTUALIZA TU
              </motion.span>
              <motion.span className="block text-gradient glow-text mt-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                PRODUCTIVIDAD
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheading with green left bar - vdrc.cl style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-3xl mx-auto mb-8 flex items-start gap-4 text-left md:text-center md:block"
          >
            <div className="w-1 h-16 bg-primary rounded-full shrink-0 md:hidden" />
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
              Tu hub exclusivo con{' '}
              <span className="text-primary font-bold">workflows interactivos</span>,{' '}
              <span className="text-accent font-bold">herramientas IA</span>{' '}
              y una comunidad de productividad digital.
            </p>
          </motion.div>

          {/* Social proof - vdrc.cl/talleres style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex items-center justify-center gap-6 mb-10 font-mono"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">+122</div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground">[PROFESIONALES]</div>
            </div>
            <div className="w-px h-10 bg-primary/30" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">11</div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground">[GENERACIONES]</div>
            </div>
            <div className="w-px h-10 bg-primary/30" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">+50</div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground">[CLASES]</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {isAuthenticated ? (
              <>
                <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40">
                  <Link to="/community">
                    <span className="relative z-10 flex items-center">
                      ENTRAR A COMUNIDAD
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-foreground/20 bg-background/50 hover:border-primary hover:bg-primary/10 font-mono transition-all duration-300 hover:scale-105">
                  <Link to="/workflows">
                    EXPLORAR WORKFLOWS
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40">
                  <Link to="/auth">
                    <span className="relative z-10 flex items-center">
                      INICIAR SESIÓN
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
              </>
            )}
          </motion.div>

          {/* Cross-site link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground font-mono"
          >
            <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
              vdrc.cl <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 max-w-xl mx-auto hidden sm:block"
        >
          <div className="glass-strong rounded-lg p-4 font-mono text-sm text-left border-primary/30 transition-all duration-500 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-muted-foreground text-xs ml-2">vdrc://terminal</span>
              <span className="text-muted-foreground/50 text-xs ml-auto">bash</span>
            </div>
            <div className="space-y-1 min-h-[120px]">
              <TypingLine text=" vdrc --init community" prefix="$ " delay={2000} isCommand className="text-muted-foreground" />
              <TypingLine text="✓ Espacios cargados" delay={3500} className="text-green-400" />
              <TypingLine text="✓ Workflows activos" delay={4200} className="text-green-400" />
              <TypingLine text="✓ Comunidad conectada" delay={5000} className="text-green-400" />
              <motion.p className="text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6 }}>
                <span className="text-primary">$</span> <span className="cursor-blink">_</span>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - vdrc.cl style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-8 md:left-12"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary/70">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
