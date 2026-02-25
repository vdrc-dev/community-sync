import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Brain,
  Presentation,
  Code2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MODULES = [
  {
    number: '01',
    title: 'S1 Higiene Digital',
    icon: Shield,
    hue: 200,
    serifAnchor: 'HD',
    concepts: ['Inbox Zero', 'Bitwarden', 'Perfiles de navegador', 'Clean Email', 'Markdown'],
    tip: '💡 Empieza aqui — sin orden digital, la IA no sirve de nada',
    href: '/generations',
  },
  {
    number: '02',
    title: 'S2 IA & Productividad',
    icon: Brain,
    hue: 263,
    serifAnchor: 'IA',
    concepts: ['CROP', 'Context Engineering', 'Metaprompting', 'ChatGPT', 'Claude', 'Manus'],
    tip: '💡 El 80% del valor del taller esta en dominar prompts con CROP',
    href: '/generations',
  },
  {
    number: '03',
    title: 'S3 Presentaciones con IA',
    icon: Presentation,
    hue: 340,
    serifAnchor: 'ST',
    concepts: ['Gamma', 'Napkin', 'Beautiful.ai', 'Coolors', 'Fontjoy', 'Claude Code', 'MCP'],
    tip: '💡 Aqui aprendes a crear presentaciones en minutos, no horas',
    href: '/generations',
  },
  {
    number: '04',
    title: 'S4 Vibe Coding',
    icon: Code2,
    hue: 160,
    serifAnchor: 'VC',
    concepts: ['PRD', 'Lovable', 'Supabase', 'Cursor', 'GitHub', 'Vercel', 'Deploy'],
    tip: '💡 Construye tu propia app sin saber programar',
    href: '/generations',
  },
] as const;

export function LearningRoadmap() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="mesh-gradient opacity-15" />

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50">
            <Sparkles className="w-3.5 h-3.5 text-primary/40" />
            /// RUTA_APRENDIZAJE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight mt-3">
            Tu camino hacia la <span className="text-gradient-live">productividad digital</span>
          </h2>
          <p className="text-muted-foreground/60 max-w-2xl text-base sm:text-lg mt-3 font-light">
            4 módulos progresivos — cada uno construye sobre el anterior
          </p>
          <div className="mt-8 max-w-xs">
            <div className="separator-diamond"><span /></div>
          </div>
        </motion.div>

        {/* Timeline + cards */}
        <div className="relative flex flex-col lg:flex-row gap-0 lg:gap-8">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-[11px] top-0 bottom-0 w-[2px] hidden sm:block origin-top"
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(180deg,
                hsl(${MODULES[0].hue} 70% 55% / 0.6) 0%,
                hsl(${MODULES[1].hue} 70% 55% / 0.6) 33%,
                hsl(${MODULES[2].hue} 70% 55% / 0.6) 66%,
                hsl(${MODULES[3].hue} 70% 55% / 0.6) 100%
              )`,
              borderRadius: 9999,
            }}
          />

          {/* Cards grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative sm:pl-10 lg:pl-0">
            {MODULES.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.number}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn('relative', index % 2 === 0 ? 'lg:pr-4' : 'lg:pl-4')}
                >
                  {/* Timeline node */}
                  <div
                    className="absolute left-0 top-8 w-6 h-6 rounded-full border-2 border-background hidden sm:flex items-center justify-center z-10 -translate-x-[calc(2.5rem+1px)]"
                    style={{
                      background: `hsl(${module.hue} 70% 55%)`,
                      boxShadow: `0 0 16px hsl(${module.hue} 70% 55% / 0.5), 0 0 40px hsl(${module.hue} 70% 55% / 0.2)`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-background" />
                  </div>

                  <Link to={module.href} className="block group">
                    <motion.article
                      className="glass-prismatic glass-specular card-light-leak relative p-6 rounded-2xl transition-all duration-500 overflow-hidden border border-white/[0.04] group-hover:border-white/[0.12] active:scale-[0.98]"
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      {/* Accent top stripe */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, transparent, hsl(${module.hue} 70% 55%), hsl(${(module.hue + 40) % 360} 60% 55% / 0.5), transparent)` }}
                      />

                      {/* Giant serif anchor */}
                      <div
                        className="absolute -bottom-2 -right-1 select-none pointer-events-none transition-opacity duration-500 opacity-[0.03] group-hover:opacity-[0.07]"
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontSize: 'clamp(70px, 9vw, 110px)',
                          fontWeight: 900,
                          fontStyle: 'italic',
                          lineHeight: 0.85,
                          color: `hsl(${module.hue} 60% 55%)`,
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {module.serifAnchor}
                      </div>

                      {/* Hover glow */}
                      <div
                        className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                        style={{ background: `hsl(${module.hue} 70% 55% / 0.08)` }}
                      />

                      {/* Module number badge — serif */}
                      <div
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg stat-serif text-base mb-4"
                        style={{
                          background: `hsl(${module.hue} 70% 55% / 0.12)`,
                          color: `hsl(${module.hue} 70% 55%)`,
                          border: `1px solid hsl(${module.hue} 70% 55% / 0.2)`,
                        }}
                      >
                        {module.number}
                      </div>

                      {/* Title + icon */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative group-hover:scale-110 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, hsl(${module.hue} 70% 55% / 0.12), hsl(${module.hue} 70% 55% / 0.04))`,
                            border: `1px solid hsl(${module.hue} 70% 55% / 0.2)`,
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: `hsl(${module.hue} 70% 55%)` }} />
                          <div
                            className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                            style={{ background: `hsl(${module.hue} 70% 55% / 0.25)` }}
                          />
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-foreground transition-colors">
                          {module.title}
                        </h3>
                      </div>

                      {/* Concepts pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.concepts.map((concept) => (
                          <span
                            key={concept}
                            className="text-xs px-2.5 py-1 rounded-md font-medium transition-all duration-300 group-hover:scale-[1.03]"
                            style={{
                              background: `hsl(${module.hue} 70% 55% / 0.08)`,
                              color: `hsl(${module.hue} 70% 55% / 0.95)`,
                              border: `1px solid hsl(${module.hue} 70% 55% / 0.15)`,
                            }}
                          >
                            {concept}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground/70 mb-5 leading-relaxed font-light">
                        {module.tip}
                      </p>

                      {/* Link CTA */}
                      <div
                        className="flex items-center text-sm font-medium opacity-50 group-hover:opacity-100 transition-all duration-300"
                        style={{ color: `hsl(${module.hue} 70% 55%)` }}
                      >
                        <span className="text-xs font-mono tracking-wider uppercase">Ver sesiones</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
