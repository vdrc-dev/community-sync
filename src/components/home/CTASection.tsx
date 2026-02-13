import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Users, Rocket, BarChart3, BookOpen } from 'lucide-react';

interface CTASectionProps {
  isAuthenticated: boolean;
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200 },
  }),
};

export function CTASection({ isAuthenticated }: CTASectionProps) {
  if (isAuthenticated) {
    // Authenticated users: ecosystem exploration CTA
    return (
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="relative p-8 sm:p-10 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 overflow-hidden text-center">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
              <div className="relative z-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70">/// EXPLORA MAS</span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold mt-3 mb-4">
                  Sigue <span className="text-gradient">explorando</span>
                </h3>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {[
                    { icon: BookOpen, text: 'Workflows', to: '/workflows' },
                    { icon: BarChart3, text: 'ROI Calculator', to: '/roi-calculator' },
                    { icon: Users, text: 'Comunidad', to: '/community' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={badgeVariants}
                    >
                      <Link
                        to={item.to}
                        className="inline-flex items-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 text-foreground/70 hover:text-foreground"
                      >
                        <item.icon className="w-4 h-4 text-primary" />
                        {item.text}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <a
                  href="https://vdrc.lovable.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  Ver presentaciones en vdrc.lovable.app
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative p-8 sm:p-12 lg:p-16 rounded-2xl bg-card/80 border border-border/40 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="relative z-10 text-center">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70">/// ACCESO</span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-4 mb-6">
                Accede a tu<br />
                <span className="text-gradient">portal de productividad</span>
              </h2>

              <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                Inicia sesion para acceder a todos los recursos, workflows y la comunidad.
              </p>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 font-mono">
                {[
                  { icon: Zap, text: 'Workflows interactivos' },
                  { icon: Users, text: 'Comunidad activa' },
                  { icon: Sparkles, text: 'Recursos exclusivos' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={badgeVariants}
                    className="flex items-center gap-2 text-sm text-foreground/70 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.text}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 font-mono group transition-all duration-300 hover:scale-[1.02]">
                  <Link to="/auth">
                    <span className="flex items-center">
                      INICIAR SESION
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 font-mono border-accent/30 hover:border-accent/50 hover:bg-accent/5 group">
                  <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer">
                    <Rocket className="w-4 h-4 mr-2 text-accent" />
                    GEN 11 — MARZO 2026
                    <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
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
