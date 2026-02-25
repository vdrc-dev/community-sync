import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Terminal, Zap, Brain, Rocket, ExternalLink, Clock, Users, BookOpen, Wrench } from 'lucide-react';
import { useEffect, useState, useMemo, useCallback } from 'react';

interface HeroSectionProps {
  isAuthenticated: boolean;
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

// Constellation SVG — breathing connected nodes
function ConstellationField() {
  const nodes = useMemo(() =>
    Array.from({ length: 14 }).map((_, i) => {
      const seed = (i + 1) * 47.3;
      return {
        cx: 5 + (seed * 7.1) % 90,
        cy: 5 + (seed * 11.3) % 90,
        hue: [152, 174, 263, 340][i % 4],
      };
    }), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[1]">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((n, i) =>
          nodes.slice(i + 1).filter((_, j) => (i + j) % 3 === 0).map((n2, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={n.cx} y1={n.cy} x2={n2.cx} y2={n2.cy}
              stroke={`hsl(${n.hue} 50% 55% / 0.06)`}
              strokeWidth="0.12"
              animate={{ opacity: [0.02, 0.12, 0.02] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            />
          ))
        )}
        {nodes.map((n, i) => (
          <motion.circle
            key={i} cx={n.cx} cy={n.cy} r="0.35"
            fill={`hsl(${n.hue} 65% 60% / 0.25)`}
            animate={{ r: [0.25, 0.6, 0.25], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}

// Holographic refraction bands
function HolographicBands() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[1]">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${-15 + i * 40}%`,
            top: `${20 + i * 18}%`,
            width: '50%',
            height: '2px',
            background: `linear-gradient(90deg, transparent 5%, hsl(152 80% 55% / 0.04) 20%, hsl(174 70% 50% / 0.07) 40%, hsl(263 65% 60% / 0.05) 60%, hsl(340 60% 55% / 0.04) 80%, transparent 95%)`,
            filter: 'blur(3px)',
            transform: `rotate(${-4 + i * 4}deg)`,
          }}
          animate={{
            x: ['-30%', '130%', '-30%'],
            opacity: [0, 0.7, 0],
          }}
          transition={{ duration: 14 + i * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 2.5 }}
        />
      ))}
    </div>
  );
}

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* ─── EPIC BACKGROUND LAYERS ─── */}

      {/* Base dark */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Aurora borealis animated gradient — enhanced */}
      <div className="aurora-bg -z-[5]" />

      {/* Mesh gradient — richer */}
      <div className="mesh-gradient -z-[4] opacity-70" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay -z-[3]" />

      {/* Grid pattern - refined */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] -z-[2]" />

      {/* Constellation field */}
      <ConstellationField />

      {/* Holographic refraction bands */}
      <HolographicBands />

      {/* Breathing orbs — enhanced with color mixing */}
      <motion.div
        className="absolute top-[10%] left-[8%] w-[500px] h-[500px] orb-breathe -z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(152 70% 40% / 0.14), transparent 65%)', ['--breathe-duration' as string]: '6s', ['--orb-blur' as string]: '100px' }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[3%] w-[450px] h-[450px] orb-breathe -z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(263 60% 50% / 0.1), transparent 65%)', ['--breathe-duration' as string]: '8s', ['--orb-blur' as string]: '120px' }}
      />
      <motion.div
        className="absolute top-[45%] right-[20%] w-[350px] h-[350px] orb-breathe -z-[1]"
        style={{ background: 'radial-gradient(circle, hsl(174 60% 45% / 0.08), transparent 65%)', ['--breathe-duration' as string]: '5s', ['--orb-blur' as string]: '80px' }}
      />
      <motion.div
        className="absolute top-[15%] right-[35%] w-[400px] h-[280px] rounded-full blur-[150px] -z-[1]"
        style={{ background: 'linear-gradient(135deg, hsl(340 55% 50% / 0.06), hsl(152 60% 45% / 0.04))' }}
        animate={{ x: [0, 25, -15, 0], y: [0, -15, 10, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles — enhanced with glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[1]">
        {Array.from({ length: 40 }, (_, i) => {
          const seed = (i + 1) * 37.91;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(seed * 13.7) % 100}%`,
                top: `${(seed * 29.1) % 100}%`,
                width: 1 + (seed % 3),
                height: 1 + (seed % 3),
                background: `hsl(${[152, 174, 263, 340][i % 4]} 70% 60% / 0.5)`,
                boxShadow: `0 0 ${4 + (seed % 8)}px hsl(${[152, 174, 263, 340][i % 4]} 70% 60% / 0.4)`,
              }}
              animate={{
                y: [0, -(15 + (seed % 30)), 0],
                x: [0, (seed % 2 === 0 ? 1 : -1) * (3 + seed % 10), 0],
                opacity: [0.05, 0.55, 0.05],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 6 + (seed % 8),
                delay: seed % 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none -z-[1] vignette-deep" />

      {/* Chromatic aberration edges */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-[1]"
        style={{
          boxShadow: 'inset 3px 0 25px hsl(152 70% 50% / 0.03), inset -3px 0 25px hsl(263 60% 55% / 0.03), inset 0 2px 15px hsl(174 60% 50% / 0.02)',
        }}
        animate={{
          boxShadow: [
            'inset 3px 0 25px hsl(152 70% 50% / 0.03), inset -3px 0 25px hsl(263 60% 55% / 0.03), inset 0 2px 15px hsl(174 60% 50% / 0.02)',
            'inset 5px 0 35px hsl(152 70% 50% / 0.06), inset -5px 0 35px hsl(263 60% 55% / 0.06), inset 0 4px 25px hsl(174 60% 50% / 0.04)',
            'inset 3px 0 25px hsl(152 70% 50% / 0.03), inset -3px 0 25px hsl(263 60% 55% / 0.03), inset 0 2px 15px hsl(174 60% 50% / 0.02)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center p-5 sm:p-8 md:p-14 rounded-2xl sm:rounded-3xl relative overflow-hidden"
        >
          {/* Card background with glass + holographic border */}
          <div className="absolute inset-0 glass-prismatic glass-specular rounded-3xl" />
          <div className="absolute inset-0 border-holographic rounded-3xl" />

          {/* Holographic shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(152 70% 60% / 0.06) 45%, hsl(174 60% 55% / 0.04) 50%, transparent 60%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
            />
          </motion.div>

          {/* Inner content */}
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
              className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-10"
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

            {/* Main heading — CINEMATIC with Syne display font */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display mb-6 sm:mb-8 leading-[0.85] tracking-tighter" style={{ fontSize: 'clamp(1.75rem, 8vw, 8rem)' }}>
                <div className="overflow-hidden">
                  <motion.span
                    className="block text-foreground"
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    AFILA TU
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    className="block text-gradient-live text-glow-epic mt-1"
                    initial={{ opacity: 0, y: '100%', scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  >
                    SIERRA DIGITAL
                  </motion.span>
                </div>
              </h1>
            </motion.div>

            {/* Accent line — holographic multi-gradient */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] w-48 mx-auto mb-8 rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(152 70% 50%), hsl(174 60% 50%), hsl(263 50% 55%), transparent)' }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.3), transparent)', width: '30%' }}
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
              />
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto mb-10 text-center"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/60 leading-relaxed font-light tracking-wide">
                Domina <RotatingText />,{' '}
                <span className="text-accent font-semibold">delega en tecnologia</span>{' '}
                y transforma tu productividad profesional con IA.
              </p>
            </motion.div>

            {/* Social proof — EPIC serif numbers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-3 sm:gap-6 md:gap-8 mb-10 sm:mb-12"
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
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: `hsl(${stat.hue} 70% 55% / 0.12)` }}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <stat.icon className="w-4 h-4 hidden sm:block" style={{ color: `hsl(${stat.hue} 70% 55% / 0.7)` }} />
                        <div
                          className="text-3xl sm:text-4xl md:text-5xl stat-serif"
                          style={{
                            background: `linear-gradient(180deg, hsl(${stat.hue} 70% 72%), hsl(${stat.hue} 70% 45%))`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: `drop-shadow(0 0 20px hsl(${stat.hue} 70% 55% / 0.35))`,
                          }}
                        >
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-muted-foreground/70 font-mono">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                  {idx < arr.length - 1 && (
                    <div className="hidden sm:block w-px h-10 sm:h-12 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
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
                  <Button asChild size="lg" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_-5px_hsl(152_70%_40%_/_0.3)] hover:shadow-[0_0_50px_-5px_hsl(152_70%_40%_/_0.5)] rounded-2xl btn-shine">
                    <Link to="/community">
                      <span className="relative z-10 flex items-center">
                        ENTRAR A COMUNIDAD
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg border-white/[0.1] bg-white/[0.04] backdrop-blur-xl hover:border-primary/30 hover:bg-primary/5 font-mono transition-all duration-300 rounded-2xl hover:shadow-[0_0_30px_-10px_hsl(152_70%_40%_/_0.2)]">
                    <Link to="/workflows">
                      EXPLORAR WORKFLOWS
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_-5px_hsl(152_70%_40%_/_0.3)] hover:shadow-[0_0_50px_-5px_hsl(152_70%_40%_/_0.5)] rounded-2xl btn-shine">
                    <Link to="/auth">
                      <span className="relative z-10 flex items-center">
                        INICIAR SESION
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base border-accent/30 bg-transparent hover:border-accent/60 hover:bg-accent/10 font-mono transition-all duration-300 group text-muted-foreground hover:text-foreground rounded-2xl">
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

            {/* VDRC ecosystem badge */}
            {!isAuthenticated && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-xs text-muted-foreground/40 mt-6 font-mono flex items-center justify-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                Acceso exclusivo para participantes del taller
                <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
