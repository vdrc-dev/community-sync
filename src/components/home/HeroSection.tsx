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
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full"
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1, delay }}
          className="absolute hidden md:block"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="w-12 h-12 text-primary/30" />
          </motion.div>
        </motion.div>
      ))}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 mb-8 border-primary/50 bg-primary/5 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
              <span className="text-sm font-medium">Taller Productividad Digital con IA</span>
            </Badge>
          </motion.div>

          {/* Main heading with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold mb-6 leading-[0.9] tracking-tight">
              <span className="block text-foreground">Domina la</span>
              <span className="block text-gradient glow-text mt-2">Productividad</span>
              <span className="block text-foreground/80 text-4xl sm:text-5xl md:text-6xl mt-4">con IA</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Tu hub exclusivo con 
            <span className="text-primary font-semibold"> workflows interactivos</span>, 
            <span className="text-accent font-semibold"> herramientas IA </span>
            y una comunidad de productividad digital.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {isAuthenticated ? (
              <>
                <Button 
                  asChild 
                  size="lg" 
                  className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold group"
                >
                  <Link to="/workflows">
                    Explorar Workflows
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="h-14 px-8 text-lg border-border hover:border-primary/50 hover:bg-primary/5"
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
                  className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold group"
                >
                  <Link to="/auth?mode=signup">
                    Comenzar Ahora
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="h-14 px-8 text-lg border-border hover:border-primary/50 hover:bg-primary/5"
                >
                  <Link to="/auth">
                    Iniciar Sesión
                  </Link>
                </Button>
              </>
            )}
          </motion.div>

          {/* Terminal-style typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 max-w-xl mx-auto"
          >
            <div className="glass rounded-lg p-4 font-mono text-sm text-left border-primary/20">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-muted-foreground/50">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
