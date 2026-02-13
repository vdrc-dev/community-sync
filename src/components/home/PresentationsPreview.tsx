import { motion } from 'framer-motion';
import { Presentation, ExternalLink, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

const modules = [
  {
    number: 1,
    title: 'Higiene Digital',
    description: 'Fundamentos de organizacion digital, seguridad y habitos tecnologicos saludables.',
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    textColor: 'text-blue-400',
    hoverTitle: 'group-hover:text-blue-400',
    icon: '🛡️',
  },
  {
    number: 2,
    title: 'IA & Productividad',
    description: 'Domina ChatGPT, Claude, Gemini y herramientas IA para multiplicar tu productividad.',
    color: 'from-primary/20 to-primary/5',
    borderColor: 'border-primary/20 hover:border-primary/40',
    textColor: 'text-primary',
    hoverTitle: 'group-hover:text-primary',
    icon: '🤖',
  },
  {
    number: 3,
    title: 'Comunicacion Digital',
    description: 'Estrategias de comunicacion efectiva con herramientas de IA y automatizacion.',
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/20 hover:border-purple-500/40',
    textColor: 'text-purple-400',
    hoverTitle: 'group-hover:text-purple-400',
    icon: '📡',
  },
  {
    number: 4,
    title: 'Desarrollo Personal',
    description: 'Productividad personal, workflows avanzados y construccion de tu sistema con IA.',
    color: 'from-accent/20 to-accent/5',
    borderColor: 'border-accent/20 hover:border-accent/40',
    textColor: 'text-accent',
    hoverTitle: 'group-hover:text-accent',
    icon: '🚀',
  },
];

export function PresentationsPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,hsl(270_70%_45%/0.06),transparent_55%)]" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">
            /// PRESENTACIONES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Material de{' '}
            <span className="text-gradient">cada clase</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg mt-2">
            Accede a las presentaciones interactivas de los 4 modulos del taller en nuestra plataforma de slides
          </p>
        </motion.div>

        {/* Module cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {modules.map((mod, index) => (
            <motion.a
              key={mod.number}
              href="https://vdrc.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative"
            >
              {/* Glow */}
              <div className={`absolute -inset-px rounded-xl bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`} />

              <div className={`relative h-full p-5 sm:p-6 rounded-xl bg-card/80 backdrop-blur-xl border ${mod.borderColor} transition-all duration-500 overflow-hidden`}>
                {/* Module number */}
                <span className="font-mono text-xs tracking-widest text-muted-foreground/40 mb-3 block">
                  Módulo {mod.number}
                </span>

                {/* Icon */}
                <div className="text-2xl sm:text-3xl mb-3">{mod.icon}</div>

                {/* Title */}
                <h3 className={`font-semibold text-sm sm:text-base mb-2 ${mod.hoverTitle} transition-colors`}>
                  {mod.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {mod.description}
                </p>

                {/* View link - always visible with lower opacity, brighter on hover */}
                <div className={`flex items-center gap-1.5 text-xs font-medium ${mod.textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                  <Presentation className="w-3.5 h-3.5" />
                  <span>Ver slides</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 px-6 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5 font-mono transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group"
          >
            <a href="https://vdrc.lovable.app" target="_blank" rel="noopener noreferrer">
              <Layers className="w-4 h-4 mr-2 text-purple-400" />
              VER TODAS LAS PRESENTACIONES
              <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
