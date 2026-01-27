import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Terminal, Zap, Brain, Rocket } from 'lucide-react';

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const floatingIcons = [
  { icon: Brain, delay: 0, x: '10%', y: '20%' },
  { icon: Zap, delay: 0.5, x: '85%', y: '15%' },
  { icon: Rocket, delay: 1, x: '75%', y: '75%' },
  { icon: Terminal, delay: 1.5, x: '15%', y: '70%' },
];

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(180, 100%, 35%) 25%, hsl(270, 70%, 45%) 50%, hsl(180, 100%, 35%) 75%, hsl(142, 76%, 36%) 100%)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
      />

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full"
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1, delay }}
          className="absolute hidden md:block"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="w-12 h-12 text-primary/40" />
          </motion.div>
        </motion.div>
      ))}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Glassmorphism container */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-background/40 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/5"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 mb-8 border-primary/50 bg-primary/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 cursor-default"
            >
              <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">Taller Productividad Digital con IA</span>
            </Badge>
          </motion.div>

          {/* Main heading with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold mb-6 leading-[0.9] tracking-tight">
              <motion.span 
                className="block text-foreground drop-shadow-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Domina la
              </motion.span>
              <motion.span 
                className="block text-gradient glow-text mt-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
              >
                Productividad
              </motion.span>
              <motion.span 
                className="block text-foreground/90 text-4xl sm:text-5xl md:text-6xl mt-4 drop-shadow-md"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                con IA
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Tu hub exclusivo con 
            <span className="text-primary font-bold"> workflows interactivos</span>, 
            <span className="text-accent font-bold"> herramientas IA </span>
            y una comunidad de productividad digital.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {isAuthenticated ? (
              <>
                <Button 
                  asChild 
                  size="lg" 
                  className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 animate-[pulse-glow_2s_ease-in-out_infinite]"
                >
                  <Link to="/workflows">
                    <span className="relative z-10 flex items-center">
                      Explorar Workflows
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="h-14 px-8 text-lg border-foreground/20 bg-background/50 hover:border-primary hover:bg-primary/10 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 hover:brightness-110"
                >
                  <Link to="/generations">
                    Ver Recursos
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  asChild 
                  size="lg" 
                  className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 animate-[pulse-glow_2s_ease-in-out_infinite]"
                >
                  <Link to="/auth?mode=signup">
                    <span className="relative z-10 flex items-center">
                      Comenzar Ahora
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="h-14 px-8 text-lg border-foreground/20 bg-background/50 hover:border-primary hover:bg-primary/10 text-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 hover:brightness-110"
                >
                  <Link to="/auth">
                    Iniciar Sesión
                  </Link>
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Terminal-style typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 max-w-xl mx-auto"
        >
          <div className="glass-strong rounded-lg p-4 font-mono text-sm text-left border-primary/30 transition-all duration-500 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-muted-foreground text-xs ml-2">terminal</span>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> productividad --init
              </p>
              <p className="text-green-400">✓ Workflows cargados</p>
              <p className="text-green-400">✓ Herramientas IA listas</p>
              <p className="text-green-400">✓ Comunidad conectada</p>
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> <span className="cursor-blink">_</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-foreground/50">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
