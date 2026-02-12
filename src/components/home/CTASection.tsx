import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Users } from 'lucide-react';

interface CTASectionProps {
  isAuthenticated: boolean;
}

export function CTASection({ isAuthenticated }: CTASectionProps) {
  if (isAuthenticated) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(180, 100%, 35%) 50%, hsl(142, 76%, 36%) 100%)',
          backgroundSize: '400% 400%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[3px]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-2xl" />

          <div className="relative p-8 sm:p-12 lg:p-16 rounded-2xl bg-card/60 backdrop-blur-2xl border border-primary/30 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.06)_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="relative z-10 text-center">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70">/// ACCESO</span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-4 mb-6">
                Accede a tu<br />
                <span className="text-gradient glow-text">portal de productividad</span>
              </h2>

              <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                Inicia sesión para acceder a todos los recursos, workflows y la comunidad.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10 font-mono">
                {[
                  { icon: Zap, text: 'Workflows interactivos' },
                  { icon: Users, text: 'Comunidad activa' },
                  { icon: Sparkles, text: 'Recursos exclusivos' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground/70 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 font-mono group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
                  <Link to="/auth">
                    <span className="flex items-center">
                      INICIAR SESIÓN
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-foreground/50 mt-4 font-mono">
                Acceso exclusivo para participantes del taller
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
