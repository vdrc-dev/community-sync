import { motion } from 'framer-motion';
import { Code2, ExternalLink, Play, Users, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export function VibeCodingFreeClass() {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-prismatic glass-specular relative rounded-2xl overflow-hidden border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 group">
            {/* Accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(160 70% 55%), hsl(263 60% 55% / 0.5), transparent)' }}
            />

            <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
                {/* Left: Icon + content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/50 block">
                        /// CLASE_GRATUITA
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold">
                        Clase Gratuita de Vibe Coding
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground/70 leading-relaxed font-light mb-4 max-w-2xl">
                    Sesión abierta donde construimos un ERP funcional en vivo usando Lovable + Supabase — de cero a deploy en 90 minutos. Sin saber programar. El mismo flujo que enseñamos en el módulo 4 del taller.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/50">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3 h-3" />
                      Jul 2025
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Users className="w-3 h-3" />
                      Abierta al público
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Sparkles className="w-3 h-3 text-primary/50" />
                      PRD → Lovable → Supabase → Deploy
                    </span>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="shrink-0">
                  <a
                    href="https://vdrc.cl/talleres"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(152_70%_40%_/_0.2)]"
                  >
                    <Play className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-sm font-mono font-semibold text-primary block">Ver más talleres</span>
                      <span className="text-[10px] text-muted-foreground/50">vdrc.cl/talleres</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary/50 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
