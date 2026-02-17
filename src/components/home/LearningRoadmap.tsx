import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Brain,
  Presentation,
  Code2,
  ChevronRight,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MODULES = [
  {
    number: '01',
    title: 'S1 Higiene Digital',
    icon: Shield,
    hue: 200,
    concepts: [
      'Inbox Zero',
      'Bitwarden',
      'Perfiles de navegador',
      'Clean Email',
      'Markdown',
    ],
    tip: '💡 Empieza aqui — sin orden digital, la IA no sirve de nada',
    href: '/generations',
  },
  {
    number: '02',
    title: 'S2 IA & Productividad',
    icon: Brain,
    hue: 263,
    concepts: [
      'CROP',
      'Context Engineering',
      'Metaprompting',
      'ChatGPT',
      'Claude',
      'Manus',
    ],
    tip: '💡 El 80% del valor del taller esta en dominar prompts con CROP',
    href: '/generations',
  },
  {
    number: '03',
    title: 'S3 Presentaciones con IA',
    icon: Presentation,
    hue: 340,
    concepts: [
      'Gamma',
      'Napkin',
      'Beautiful.ai',
      'Coolors',
      'Fontjoy',
      'Claude Code',
      'MCP',
    ],
    tip: '💡 Aqui aprendes a crear presentaciones en minutos, no horas',
    href: '/generations',
  },
  {
    number: '04',
    title: 'S4 Vibe Coding',
    icon: Code2,
    hue: 160,
    concepts: [
      'PRD',
      'Lovable',
      'Supabase',
      'Cursor',
      'GitHub',
      'Vercel',
      'Deploy',
    ],
    tip: '💡 Construye tu propia app sin saber programar',
    href: '/generations',
  },
] as const;

export function LearningRoadmap() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50">
            <Sparkles className="w-3.5 h-3.5 text-primary/40" />
            /// RUTA_APRENDIZAJE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight mt-3">
            Tu camino hacia la productividad digital
          </h2>
          <p className="text-muted-foreground/60 max-w-2xl text-base sm:text-lg mt-3 font-light">
            4 módulos progresivos — cada uno construye sobre el anterior
          </p>
        </motion.div>

        {/* Timeline + cards */}
        <div className="relative flex flex-col lg:flex-row gap-0 lg:gap-8">
          {/* Vertical timeline line - gradient from module to module */}
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

          {/* Cards grid: 1 col mobile, 2 cols lg */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative sm:pl-10 lg:pl-0">
            {MODULES.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                    type: 'spring',
                    stiffness: 80,
                    damping: 16,
                  }}
                  className={cn(
                    'relative',
                    index % 2 === 0 ? 'lg:pr-4' : 'lg:pl-4'
                  )}
                >
                  {/* Timeline node (dot) - visible on sm+ */}
                  <div
                    className="absolute left-0 top-8 w-6 h-6 rounded-full border-2 border-background hidden sm:flex items-center justify-center z-10 -translate-x-[calc(2.5rem+1px)]"
                    style={{
                      background: `hsl(${module.hue} 70% 55%)`,
                      boxShadow: `0 0 12px hsl(${module.hue} 70% 55% / 0.5)`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-background" />
                  </div>

                  <Link to={module.href} className="block group">
                    <motion.article
                      className={cn(
                        'glass glass-specular relative p-6 rounded-2xl transition-all duration-300 overflow-hidden',
                        'border border-white/[0.06] group-hover:border-white/[0.12]',
                        'active:scale-[0.98]'
                      )}
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {/* Accent top stripe on hover */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent, hsl(${module.hue} 70% 55%), transparent)`,
                        }}
                      />

                      {/* Module number badge */}
                      <div
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg font-mono text-sm font-bold mb-4"
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
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: `hsl(${module.hue} 70% 55% / 0.1)`,
                            border: `1px solid hsl(${module.hue} 70% 55% / 0.2)`,
                          }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: `hsl(${module.hue} 70% 55%)` }}
                          />
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {module.title}
                        </h3>
                      </div>

                      {/* Concepts pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.concepts.map((concept) => (
                          <span
                            key={concept}
                            className="text-xs px-2.5 py-1 rounded-md font-medium"
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

                      {/* Tip */}
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                        {module.tip}
                      </p>

                      {/* Link CTA */}
                      <div
                        className="flex items-center text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ color: `hsl(${module.hue} 70% 55%)` }}
                      >
                        <span>Ver sesiones</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
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
