import { motion } from 'framer-motion';
import { ExternalLink, Globe, Users, BookOpen, Zap } from 'lucide-react';

const ecosystemNodes = [
  {
    id: 'main',
    label: 'vdrc.cl',
    title: 'Sitio Principal',
    description: 'Información del taller, inscripciones para nuevas generaciones, blog con recursos y el manifiesto "Afila tu Sierra Digital."',
    href: 'https://vdrc.cl',
    icon: Globe,
    color: 'primary',
    gradient: 'from-primary/20 to-primary/5',
    borderColor: 'border-primary/30 hover:border-primary/60',
    glowColor: 'shadow-primary/20',
    badges: ['Inscripciones', 'Blog', 'Gen 11'],
  },
  {
    id: 'community',
    label: 'Comunidad',
    title: 'Portal Comunidad',
    description: '19 workflows interactivos, +35 herramientas, diccionario digital, guias de personalizacion e instalacion, y recursos de las 11 generaciones.',
    href: '/',
    icon: Users,
    color: 'accent',
    gradient: 'from-accent/20 to-accent/5',
    borderColor: 'border-accent/30 hover:border-accent/60',
    glowColor: 'shadow-accent/20',
    badges: ['19 Workflows', '+35 Herramientas', 'Guias'],
    isCurrent: true,
  },
  {
    id: 'talleres',
    label: 'Talleres',
    title: 'Sitio de Talleres',
    description: 'Inscripciones, programa detallado de los 4 módulos, preguntas frecuentes y testimonios de participantes de las 11 generaciones.',
    href: 'https://vdrc.cl/talleres',
    icon: BookOpen,
    color: 'purple',
    gradient: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30 hover:border-purple-500/60',
    glowColor: 'shadow-purple-500/20',
    badges: ['Inscripciones', 'Programa', 'Gen 11'],
  },
];

function ConnectionLine({ delay = 0 }: { delay?: number }) {
  return (
    <div className="hidden lg:flex items-center justify-center relative">
      <div className="w-16 h-px bg-border/30" />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-border/50" />
    </div>
  );
}

export function EcosystemSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50">
            /// ECOSISTEMA_VDRC
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight mt-3">
            Un ecosistema{' '}
            <span className="text-gradient-live">conectado</span>
          </h2>
          <p className="text-muted-foreground/60 max-w-2xl text-base sm:text-lg mt-3 font-light">
            Dos plataformas sincronizadas — el sitio principal para inscripciones y este portal para aprender, practicar y conectar
          </p>
        </motion.div>

        {/* Ecosystem Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 lg:gap-0 items-stretch max-w-6xl mx-auto">
          {ecosystemNodes.map((node, index) => (
            <>
              <motion.a
                key={node.id}
                href={node.isCurrent ? undefined : node.href}
                target={node.isCurrent ? undefined : '_blank'}
                rel={node.isCurrent ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 80 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className={`group relative flex flex-col ${node.isCurrent ? 'cursor-default' : ''}`}
              >
                <div className={`glass glass-specular relative flex flex-col h-full p-6 sm:p-8 rounded-2xl transition-all duration-500 overflow-hidden`}>
                  {/* Current indicator */}
                  {node.isCurrent && (
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-[10px] font-mono tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        AQUÍ ESTÁS
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${node.gradient} border border-white/[0.06] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <node.icon className={`w-7 h-7 ${node.color === 'primary' ? 'text-primary' : node.color === 'accent' ? 'text-accent' : 'text-purple-400'}`} />
                  </div>

                  {/* Label */}
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    {node.label}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors">
                    {node.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-5">
                    {node.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {node.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`text-[10px] font-mono px-2 py-1 rounded-md border ${
                          node.color === 'primary'
                            ? 'bg-primary/5 border-primary/20 text-primary/70'
                            : node.color === 'accent'
                            ? 'bg-accent/5 border-accent/20 text-accent/70'
                            : 'bg-purple-500/5 border-purple-500/20 text-purple-400/70'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Link indicator */}
                  {!node.isCurrent && (
                    <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className={node.color === 'primary' ? 'text-primary' : node.color === 'accent' ? 'text-accent' : 'text-purple-400'}>
                        Visitar
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </motion.a>

              {/* Connection lines between nodes */}
              {index < ecosystemNodes.length - 1 && (
                <ConnectionLine key={`line-${index}`} delay={index * 0.5} />
              )}
            </>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground font-mono">
            <Zap className="w-3.5 h-3.5 inline-block text-primary mr-1.5" />
            Todas las plataformas comparten el mismo ecosistema VDRC
          </p>
        </motion.div>
      </div>
    </section>
  );
}
