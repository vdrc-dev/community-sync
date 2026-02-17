import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Terminal, Zap, Brain, Rocket, ExternalLink, Clock, Users, BookOpen, Wrench } from 'lucide-react';
import { useEffect, useState, useMemo, useCallback } from 'react';

interface HeroSectionProps {
  isAuthenticated: boolean;
}

// Orbiting orb component
function OrbitingOrb({ hue, size, radius, duration, delay, blur }: {
  hue: number; size: number; radius: number; duration: number; delay: number; blur: number;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, hsl(${hue} 70% 55% / 0.4), hsl(${hue} 70% 55% / 0.05))`,
        filter: `blur(${blur}px)`,
        ['--orbit-radius' as string]: `${radius}px`,
        ['--orbit-duration' as string]: `${duration}s`,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      initial={{ x: radius }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: duration / 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
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

// Rotating text effect
const rotatingWords = ['context engineering', 'metaprompts CROP', 'vibe coding', 'Lovable + Supabase', 'inbox zero', 'Gamma + Napkin', 'bases de datos', 'agentes en Chrome', 'afilar la sierra', 'PRD a MVP a deploy', 'Claude Code', 'Notebook LM', 'chunking de contexto', 'Claude en Excel', 'delegar en tecnologia'];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-primary font-bold"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* ─── EPIC BACKGROUND LAYERS ─── */}

      {/* Base dark */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Aurora borealis animated gradient */}
      <div className="aurora-bg -z-[5]" />

      {/* Mesh gradient */}
      <div className="mesh-gradient -z-[4] opacity-60" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay -z-[3]" />

      {/* Grid pattern - refined */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] -z-[2]" />

      {/* Breathing orbs */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-[400px] h-[400px] orb-breathe -z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(152 70% 40% / 0.12), transparent 70%)', ['--breathe-duration' as string]: '6s', ['--orb-blur' as string]: '80px' }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] orb-breathe -z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(263 60% 50% / 0.08), transparent 70%)', ['--breathe-duration' as string]: '8s', ['--orb-blur' as string]: '100px' }}
      />
      <motion.div
        className="absolute top-[50%] right-[25%] w-[250px] h-[250px] orb-breathe -z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(174 60% 45% / 0.06), transparent 70%)', ['--breathe-duration' as string]: '5s', ['--orb-blur' as string]: '70px' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[1]">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: `hsl(${[152, 174, 263][i % 3]} 70% 60% / ${0.15 + Math.random() * 0.3})`,
            }}
            animate={{
              y: [0, -(20 + Math.random() * 30), 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center p-8 md:p-14 rounded-3xl relative overflow-hidden"
        >
          {/* Card background with glass + glow border */}
          <div className="absolute inset-0 glass glass-specular rounded-3xl" />
          <div className="absolute inset-0 border-glow-animated rounded-3xl" />

          {/* Inner content - relative z */}
          <div className="relative z-10">
            {/* /// TRANSMISSION label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-2 mb-10"
            >
              {!isAuthenticated && (
                <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer">
                  <Badge
                    variant="outline"
                    className="px-4 py-2 border-white/[0.08] bg-white/[0.04] backdrop-blur-xl font-mono text-xs tracking-wider hover:bg-white/[0.08] hover:border-primary/30 transition-all cursor-pointer group rounded-xl"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Rocket className="w-3 h-3 mr-2 text-accent" />
                    </motion.div>
                    GEN 11 // MARZO 2026 — INSCRIPCIONES ABIERTAS
                  </Badge>
                </a>
              )}
              <Badge
                variant="outline"
                className="px-4 py-2 border-white/[0.08] bg-white/[0.04] backdrop-blur-xl font-mono text-xs tracking-wider rounded-xl"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2 inline-block shadow-[0_0_8px_hsl(152_70%_40%_/_0.5)]" />
                11 GENERACIONES // +150 PROFESIONALES
              </Badge>
            </motion.div>

            {/* Main heading — EPIC size */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-mono font-bold mb-8 leading-[0.85] tracking-tighter">
                <motion.span
                  className="block text-foreground"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  AFILA TU
                </motion.span>
                <motion.span
                  className="block text-shimmer text-glow-epic mt-2"
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  SIERRA DIGITAL
                </motion.span>
              </h1>
            </motion.div>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] w-48 mx-auto mb-8 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(152 70% 45%), hsl(174 60% 45%), transparent)' }}
            />

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto mb-10 text-center"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 leading-relaxed">
                Domina <RotatingText />,{' '}
                <span className="text-accent font-bold">delega en tecnologia</span>{' '}
                y transforma tu productividad profesional con IA.
              </p>
            </motion.div>

            {/* Social proof — EPIC numbers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-12 font-mono"
            >
              {[
                { value: '+150', label: 'Profesionales', icon: Users, hue: 160 },
                { value: '11', label: 'Generaciones', icon: Sparkles, hue: 263 },
                { value: '+44', label: 'Clases', icon: BookOpen, hue: 200 },
                { value: '+35', label: 'Herramientas', icon: Wrench, hue: 340 },
              ].map((stat, idx, arr) => (
                <motion.div key={stat.label} className="flex items-center gap-3 sm:gap-6 md:gap-8">
                  <motion.div
                    className="text-center px-2 sm:px-4 py-3 rounded-2xl transition-all duration-300 cursor-default group/stat relative"
                    whileHover={{ scale: 1.08, y: -4 }}
                  >
                    {/* Glow behind number on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: `hsl(${stat.hue} 70% 55% / 0.1)` }}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <stat.icon className="w-4 h-4 hidden sm:block" style={{ color: `hsl(${stat.hue} 70% 55% / 0.7)` }} />
                        <div
                          className="text-3xl md:text-4xl font-bold"
                          style={{
                            background: `linear-gradient(180deg, hsl(${stat.hue} 70% 65%), hsl(${stat.hue} 70% 45%))`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-muted-foreground/70">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                  {idx < arr.length - 1 && (
                    <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons — EPIC */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_-5px_hsl(152_70%_40%_/_0.3)] hover:shadow-[0_0_50px_-5px_hsl(152_70%_40%_/_0.5)] rounded-2xl btn-shine">
                    <Link to="/community">
                      <span className="relative z-10 flex items-center">
                        ENTRAR A COMUNIDAD
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg border-white/[0.1] bg-white/[0.04] backdrop-blur-xl hover:border-primary/30 hover:bg-primary/5 font-mono transition-all duration-300 rounded-2xl hover:shadow-[0_0_30px_-10px_hsl(152_70%_40%_/_0.2)]">
                    <Link to="/workflows">
                      EXPLORAR WORKFLOWS
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_-5px_hsl(152_70%_40%_/_0.3)] hover:shadow-[0_0_50px_-5px_hsl(152_70%_40%_/_0.5)] rounded-2xl btn-shine">
                    <Link to="/auth">
                      <span className="relative z-10 flex items-center">
                        INICIAR SESION
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base border-accent/30 bg-transparent hover:border-accent/60 hover:bg-accent/10 font-mono transition-all duration-300 group text-muted-foreground hover:text-foreground rounded-2xl">
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

            {/* Quick value props — enhanced */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
            >
              {[
                { label: 'Gratuito', desc: 'Contenido abierto', icon: Sparkles, hue: 160 },
                { label: '100% Práctico', desc: 'Casos reales', icon: Zap, hue: 45 },
                { label: 'En Español', desc: 'Hecho en Chile', icon: Users, hue: 200 },
                { label: 'Actualizado', desc: 'Cada semana', icon: Clock, hue: 263 },
              ].map((prop, i) => (
                <motion.div
                  key={prop.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center p-3 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 group/prop"
                >
                  <prop.icon className="w-4 h-4 mx-auto mb-1.5 transition-transform duration-300 group-hover/prop:scale-110" style={{ color: `hsl(${prop.hue} 70% 55% / 0.6)` }} />
                  <p className="text-[11px] font-mono font-semibold text-foreground/80">{prop.label}</p>
                  <p className="text-[10px] text-muted-foreground/60">{prop.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Cross-site link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground font-mono"
            >
              <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-primary/5">
                vdrc.cl <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Terminal — EPIC */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-xl mx-auto hidden sm:block"
        >
          <div className="relative">
            {/* Glow behind terminal */}
            <div className="absolute -inset-4 rounded-3xl blur-2xl bg-primary/[0.05] pointer-events-none" />

            <div className="glass-strong rounded-2xl p-6 font-mono text-sm text-left transition-all duration-500 hover:border-white/[0.12] glow-hover card-edge-highlight relative overflow-hidden">
              {/* Scanline effect */}
              <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />

              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                <span className="text-muted-foreground text-xs ml-2">vdrc://terminal</span>
                <span className="text-muted-foreground/50 text-xs ml-auto">bash</span>
              </div>
              <div className="space-y-1.5 min-h-[150px] relative">
                <TypingLine text=" vdrc --afila-sierra --gen=11" prefix="$ " delay={2200} isCommand className="text-muted-foreground" />
                <TypingLine text="11 generaciones, 150+ profesionales, 30+ herramientas" delay={3800} className="text-accent" prefix="> " />
                <TypingLine text="S1: Higiene digital — Inbox Zero, Bitwarden, perfiles" delay={4500} className="text-green-400" prefix="✓ " />
                <TypingLine text="S2: IA avanzada — CROP, context engineering, Canvas" delay={5100} className="text-green-400" prefix="✓ " />
                <TypingLine text="S3: Presentaciones — Gamma, Napkin, Beautiful.ai, Canva" delay={5600} className="text-green-400" prefix="✓ " />
                <TypingLine text="S4: Apps con IA — Lovable + Supabase + GitHub + Claude Code" delay={6100} className="text-green-400" prefix="✓ " />
                <TypingLine text="Delega en tecnologia. Afila tu sierra." delay={7200} className="text-primary font-bold" prefix="> " />
                <motion.p className="text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 9 }}>
                  <span className="text-primary">$</span> <span className="cursor-blink">_</span>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — EPIC */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-8 md:left-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground/40">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/30 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
