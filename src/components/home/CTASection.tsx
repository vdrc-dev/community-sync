import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Users } from 'lucide-react';
import { useMemo } from 'react';

interface CTASectionProps {
  isAuthenticated: boolean;
}

// Generate floating particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 12,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.2,
  }));
};

export function CTASection({ isAuthenticated }: CTASectionProps) {
  const particles = useMemo(() => generateParticles(35), []);

  if (isAuthenticated) return null;

  return (
    <section className="py-24 relative overflow-hidden">
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
          duration: 12,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[3px]" />

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
              background: `radial-gradient(circle, hsl(142, 76%, 60%) 0%, hsl(180, 100%, 50%) 50%, transparent 100%)`,
              boxShadow: `0 0 ${particle.size * 3}px hsl(142, 76%, 50% / 0.5)`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          {/* Glow background */}
          <motion.div 
            className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-2xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div 
            className="relative p-8 sm:p-12 lg:p-16 rounded-2xl bg-card/60 backdrop-blur-2xl border border-primary/30 overflow-hidden shadow-2xl shadow-primary/20"
            whileHover={{ 
              rotateX: 2,
              rotateY: -2,
              scale: 1.01,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent p-[2px]"
              >
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                ¿Listo para<br />
                <span className="text-gradient glow-text">transformar tu productividad?</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Únete a más de 200 profesionales que ya dominan las herramientas de IA 
                para trabajar de forma más inteligente, no más dura.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-6 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { icon: Zap, text: 'Workflows interactivos' },
                  { icon: Users, text: 'Comunidad activa' },
                  { icon: Sparkles, text: 'Recursos exclusivos' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-2 text-sm text-foreground/70 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20"
                    whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.text}
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Button asChild size="lg" className="h-14 px-10 text-lg relative overflow-hidden group bg-primary hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50">
                    <Link to="/auth?mode=signup">
                      <span className="relative z-10 flex items-center">
                        Crear mi cuenta gratis
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>
                </motion.div>
                <motion.p 
                  className="text-xs text-foreground/50"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  Sin tarjeta de crédito • Acceso inmediato
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
