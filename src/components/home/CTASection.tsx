import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, Rocket, BookOpen, Brain, Code2, Shield, Layers, Download } from 'lucide-react';

interface CTASectionProps {
  isAuthenticated: boolean;
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200 },
  }),
};

export function CTASection({ isAuthenticated }: CTASectionProps) {
  if (isAuthenticated) {
    return (
      <section className="py-14 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="relative p-8 sm:p-10 rounded-3xl overflow-hidden text-center">
              <div className="absolute inset-0 glass glass-specular rounded-3xl" />
              <div className="absolute inset-0 border-glow-animated rounded-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] rounded-3xl" />
              <div className="relative z-10">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50">/// SIGUE AFILANDO</span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display tracking-tight mt-3 mb-6">
                  Sigue <span className="text-gradient-live">explorando</span>
                </h3>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {[
                    { icon: Zap, text: 'Workflows', to: '/workflows', hue: 160 },
                    { icon: Layers, text: 'Personalizar IA', to: '/personalizacion-ia', hue: 263 },
                    { icon: Download, text: 'Instalacion', to: '/guia-instalacion', hue: 200 },
                    { icon: BookOpen, text: 'Diccionario', to: '/dictionary', hue: 45 },
                    { icon: Brain, text: 'Lab IA', to: '/playground', hue: 340 },
                    { icon: Users, text: 'Comunidad', to: '/community', hue: 174 },
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
                        className="group inline-flex items-center gap-2 text-sm font-mono px-4 py-2.5 rounded-xl glass-pill hover:border-white/[0.12] transition-all duration-300 text-foreground/70 hover:text-foreground hover:shadow-[0_0_20px_-5px_var(--glow)]"
                        style={{ ['--glow' as string]: `hsl(${item.hue} 70% 55% / 0.25)` }}
                      >
                        <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color: `hsl(${item.hue} 70% 55%)` }} />
                        {item.text}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Epic aurora background */}
      <div className="aurora-bg opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto"
        >
            <div className="relative p-6 sm:p-10 md:p-14 lg:p-20 rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Glass background */}
            <div className="absolute inset-0 glass glass-specular rounded-3xl" />
            <div className="absolute inset-0 border-glow-animated rounded-3xl" />
            <div className="absolute inset-0 noise-overlay rounded-3xl" />

            {/* Mesh gradient inside card */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -inset-[50%]"
                style={{
                  background: 'radial-gradient(circle at 30% 40%, hsl(152 70% 40% / 0.06) 0%, transparent 40%), radial-gradient(circle at 70% 60%, hsl(263 60% 50% / 0.04) 0%, transparent 40%)',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary/70"
              >
                /// BIENVENIDO A TUS ANOS MAS PRODUCTIVOS
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mt-4 sm:mt-6 mb-6 sm:mb-8 leading-[0.9]"
              >
                Afila tu<br />
                <span className="text-gradient-live text-glow-epic">sierra digital</span>
              </motion.h2>

              {/* Accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] w-40 mx-auto mb-8 rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(152 70% 45%), hsl(174 60% 45%), transparent)' }}
              />

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-5 leading-relaxed"
              >
                4 sesiones intensivas. +35 herramientas. Desde Inbox Zero hasta crear software con IA.
                El taller que ya transformo a +150 profesionales en 11 generaciones.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-sm text-foreground/45 max-w-xl mx-auto mb-10 italic leading-relaxed"
              >
                "El Wall Street Journal dice que las empresas se estan dando cuenta que desarrollar software propio es mas rapido y mas barato que pagar suscripciones. Ustedes se estan subiendo al carro ahora." — Vicente, Gen 004
              </motion.p>

              {/* Session badges */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 font-mono">
                {[
                  { icon: Shield, text: 'S1: Higiene digital', hue: 200 },
                  { icon: Brain, text: 'S2: IA avanzada', hue: 263 },
                  { icon: BookOpen, text: 'S3: Presentaciones', hue: 340 },
                  { icon: Code2, text: 'S4: Vibe coding', hue: 160 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={badgeVariants}
                    className="flex items-center gap-2 text-sm text-foreground/70 px-4 py-2.5 rounded-xl glass-pill hover:border-white/[0.12] transition-all duration-300 hover:shadow-[0_0_20px_-8px_var(--glow)]"
                    style={{ ['--glow' as string]: `hsl(${item.hue} 70% 55% / 0.3)` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: `hsl(${item.hue} 70% 55%)` }} />
                    {item.text}
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons — EPIC */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button asChild size="lg" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-base sm:text-lg bg-primary hover:bg-primary/90 font-mono group transition-all duration-300 hover:scale-[1.03] rounded-2xl shadow-[0_0_40px_-8px_hsl(152_70%_40%_/_0.35)] hover:shadow-[0_0_60px_-8px_hsl(152_70%_40%_/_0.5)] btn-shine">
                  <Link to="/auth">
                    <span className="flex items-center">
                      INICIAR SESION
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 font-mono border-white/[0.1] bg-white/[0.04] backdrop-blur-xl hover:border-accent/30 hover:bg-accent/5 group rounded-2xl hover:shadow-[0_0_30px_-10px_hsl(174_60%_45%_/_0.2)]">
                  <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer">
                    <Rocket className="w-4 h-4 mr-2 text-accent" />
                    GEN 11 — MARZO 2026
                    <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="text-xs text-foreground/40 mt-6 font-mono"
              >
                Acceso exclusivo para participantes del taller
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
