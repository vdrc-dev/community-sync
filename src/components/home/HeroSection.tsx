import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Terminal, Zap, Brain, Rocket, ExternalLink, Clock } from 'lucide-react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

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
      <div className="absolute top-0 left-0 w-full h-px bg-border/40" />
      <div className="absolute top-0 left-0 w-px h-full bg-border/40" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-border/60" />
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

// Rotating text effect for features — now with actual class content
const rotatingWords = ['ChatGPT & Claude', 'vibe coding', 'metaprompts', 'Lovable + Supabase', 'Zapier & App Script', 'Gama & Beautiful.ai', 'Airtable & datos'];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-primary font-bold"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  const particles = useMemo(() => generateParticles(20), []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Clean dark background with subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />

      {/* Circuit corners */}
      <CircuitCorner position="tl" />
      <CircuitCorner position="br" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-foreground/10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [particle.opacity * 0.4, particle.opacity * 0.8, particle.opacity * 0.4],
            }}
            transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center p-8 md:p-12 rounded-3xl glass glass-specular relative"
        >
          {/* /// TRANSMISSION label */}
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

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
          >
            {!isAuthenticated && (
              <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer">
                <Badge
                  variant="outline"
                  className="px-4 py-2 border-white/[0.06] bg-white/[0.04] backdrop-blur-xl font-mono text-xs tracking-wider hover:bg-white/[0.08] hover:border-primary/20 transition-all cursor-pointer group rounded-xl"
                >
                  <Rocket className="w-3 h-3 mr-2 text-accent group-hover:animate-bounce" />
                  GEN 11 // MARZO 2026 — INSCRIPCIONES ABIERTAS
                </Badge>
              </a>
            )}
            <Badge 
              variant="outline" 
              className="px-4 py-2 border-white/[0.06] bg-white/[0.04] backdrop-blur-xl font-mono text-xs tracking-wider rounded-xl"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2 inline-block" />
              10 GENERACIONES // +122 PROFESIONALES
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
                AFILA TU
              </motion.span>
              <motion.span className="block text-gradient mt-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                SIERRA DIGITAL
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheading with rotating text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-3xl mx-auto mb-8 text-center"
          >
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed">
              Domina <RotatingText />,{' '}
              <span className="text-accent font-bold">delega en tecnología</span>{' '}
              y transforma tu productividad profesional con IA.
            </p>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex items-center justify-center gap-6 mb-10 font-mono"
          >
            <div className="text-center px-3">
              <div className="text-2xl md:text-3xl font-bold text-primary">+122</div>
              <div className="text-[11px] tracking-wider uppercase text-muted-foreground/80 mt-0.5">Profesionales</div>
            </div>
            <div className="w-px h-10 bg-primary/20" />
            <div className="text-center px-3">
              <div className="text-2xl md:text-3xl font-bold text-primary">10</div>
              <div className="text-[11px] tracking-wider uppercase text-muted-foreground/80 mt-0.5">Generaciones</div>
            </div>
            <div className="w-px h-10 bg-primary/20" />
            <div className="text-center px-3">
              <div className="text-2xl md:text-3xl font-bold text-primary">+50</div>
              <div className="text-[11px] tracking-wider uppercase text-muted-foreground/80 mt-0.5">Clases</div>
            </div>
            <div className="w-px h-10 bg-primary/20" />
            <div className="text-center px-3">
              <div className="text-2xl md:text-3xl font-bold text-primary">+30</div>
              <div className="text-[11px] tracking-wider uppercase text-muted-foreground/80 mt-0.5">Herramientas</div>
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
                <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  <Link to="/community">
                    <span className="relative z-10 flex items-center">
                      ENTRAR A COMUNIDAD
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-white/[0.08] bg-white/[0.04] backdrop-blur-xl hover:border-primary/20 hover:bg-primary/5 font-mono transition-all duration-300 rounded-2xl">
                  <Link to="/workflows">
                    EXPLORAR WORKFLOWS
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  <Link to="/auth">
                    <span className="relative z-10 flex items-center">
                      INICIAR SESIÓN
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-6 text-base border-accent/30 bg-transparent hover:border-accent/60 hover:bg-accent/10 font-mono transition-all duration-300 group text-muted-foreground hover:text-foreground">
                  <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center">
                      <Rocket className="w-4 h-4 mr-2 text-accent/70 group-hover:text-accent" />
                      Gen 11 — Marzo 2026
                      <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-40 group-hover:opacity-80" />
                    </span>
                  </a>
                </Button>
              </>
            )}
          </motion.div>

          {/* Cross-site links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground font-mono flex-wrap"
          >
            <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-primary/5">
              vdrc.cl <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-border">|</span>
            <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent/5">
              Talleres <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-border">|</span>
            <Link to="/presentations" className="hover:text-purple-400 transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-purple-500/5">
              Presentaciones
            </Link>
          </motion.div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 max-w-xl mx-auto hidden sm:block"
        >
          <div className="glass-strong rounded-2xl p-4 font-mono text-sm text-left transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-muted-foreground text-xs ml-2">vdrc://terminal</span>
              <span className="text-muted-foreground/50 text-xs ml-auto">bash</span>
            </div>
            <div className="space-y-1 min-h-[140px]">
              <TypingLine text=" vdrc --afila-sierra --gen=11" prefix="$ " delay={2000} isCommand className="text-muted-foreground" />
              <TypingLine text="Stack: ChatGPT + Claude + Perplexity + Gemini + 26 más..." delay={3500} className="text-accent" prefix="> " />
              <TypingLine text="Higiene digital (Inbox Zero, Bitwarden): OK" delay={4200} className="text-green-400" prefix="✓ " />
              <TypingLine text="IA avanzada (metaprompts, agentes, Canvas): OK" delay={4800} className="text-green-400" prefix="✓ " />
              <TypingLine text="Presentaciones (Gama, Beautiful.ai, Napkin): OK" delay={5300} className="text-green-400" prefix="✓ " />
              <TypingLine text="Vibe coding (Lovable + Supabase + GitHub): OK" delay={5800} className="text-green-400" prefix="✓ " />
              <TypingLine text="Bienvenido a tus años más productivos." delay={6800} className="text-primary font-bold" prefix="> " />
              <motion.p className="text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8.5 }}>
                <span className="text-primary">$</span> <span className="cursor-blink">_</span>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground/50">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
