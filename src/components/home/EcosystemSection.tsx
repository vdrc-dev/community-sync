import { motion } from 'framer-motion';
import { ExternalLink, Globe, Users, BookOpen, Zap, FolderOpen, Building2 } from 'lucide-react';

const ecosystemNodes = [
  {
    id: 'main',
    label: 'vdrc.cl',
    title: 'Sitio Principal',
    description: 'Información del taller, inscripciones para nuevas generaciones, blog con recursos y el manifiesto "Afila tu Sierra Digital."',
    href: 'https://vdrc.cl',
    icon: Globe,
    hue: 160,
    serifAnchor: 'V',
    badges: ['Inscripciones', 'Blog', 'Gen 11'],
  },
  {
    id: 'community',
    label: 'Comunidad',
    title: 'Portal Comunidad',
    description: '19 workflows interactivos, +35 herramientas, diccionario digital, guías de personalización e instalación, y recursos de las 11 generaciones.',
    href: '/',
    icon: Users,
    hue: 174,
    serifAnchor: 'C',
    badges: ['19 Workflows', '+35 Herramientas', 'Guías'],
    isCurrent: true,
  },
  {
    id: 'talleres',
    label: 'Talleres',
    title: 'Talleres & Cursos',
    description: '11 generaciones abiertas + 5 programas In-Company (BTG Pactual, Epysa, Manuia, Grupo Amoble, SCM). Programa detallado, FAQ y testimonios.',
    href: 'https://vdrc.cl/talleres',
    icon: BookOpen,
    hue: 263,
    serifAnchor: 'T',
    badges: ['Gen 11', 'In-Company', '5 Empresas'],
  },
  {
    id: 'materials',
    label: 'Materiales',
    title: 'Repositorio de Materiales',
    description: 'Presentaciones base, slides por generación, guías de instalación, y recursos de cada sesión. Acceso directo al Google Drive del programa.',
    href: 'https://drive.google.com/drive/folders/1f9E7O0O6y6oFiX7YTUYnyz6z9QTbV3VD?usp=sharing',
    icon: FolderOpen,
    hue: 45,
    serifAnchor: 'M',
    badges: ['11 Generaciones', 'Slides', 'PDFs'],
  },
];

function ConnectionLine({ hue1, hue2 }: { hue1: number; hue2: number }) {
  return (
    <div className="hidden lg:flex items-center justify-center relative">
      <motion.div
        className="w-16 h-px"
        style={{ background: `linear-gradient(90deg, hsl(${hue1} 70% 55% / 0.3), hsl(${hue2} 70% 55% / 0.3))` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: `hsl(${hue1} 70% 55% / 0.5)`, boxShadow: `0 0 10px hsl(${hue1} 70% 55% / 0.3)` }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

export function EcosystemSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="mesh-gradient opacity-15" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            Cuatro plataformas sincronizadas — inscripciones, comunidad, talleres corporativos y materiales de las 11 generaciones
          </p>
          <div className="mt-6 max-w-xs">
            <div className="separator-diamond"><span /></div>
          </div>
        </motion.div>

        {/* Ecosystem Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch max-w-6xl mx-auto">
          {ecosystemNodes.map((node, index) => (
            <>
              <motion.a
                key={node.id}
                href={node.isCurrent ? undefined : node.href}
                target={node.isCurrent ? undefined : '_blank'}
                rel={node.isCurrent ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03, y: -6 }}
                className={`group relative flex flex-col ${node.isCurrent ? 'cursor-default' : ''}`}
              >
                <div className="glass-prismatic glass-specular card-light-leak relative flex flex-col h-full p-6 sm:p-8 rounded-2xl transition-all duration-500 overflow-hidden border border-white/[0.04] group-hover:border-white/[0.12]">
                  {/* Holographic accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, hsl(${node.hue} 70% 55%), hsl(${(node.hue + 40) % 360} 60% 55% / 0.5), transparent)` }}
                  />

                  {/* Serif anchor */}
                  <div
                    className="absolute -bottom-4 -right-2 select-none pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500"
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: 'clamp(100px, 14vw, 160px)',
                      fontWeight: 900,
                      fontStyle: 'italic',
                      lineHeight: 0.85,
                      color: `hsl(${node.hue} 60% 55%)`,
                    }}
                  >
                    {node.serifAnchor}
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                    style={{ background: `hsl(${node.hue} 70% 55% / 0.08)` }}
                  />

                  {/* Current indicator */}
                  {node.isCurrent && (
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider"
                        style={{ background: `hsl(${node.hue} 70% 55% / 0.1)`, border: `1px solid hsl(${node.hue} 70% 55% / 0.3)`, color: `hsl(${node.hue} 70% 55%)` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `hsl(${node.hue} 70% 55%)` }} />
                        AQUÍ ESTÁS
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 relative"
                    style={{
                      background: `linear-gradient(135deg, hsl(${node.hue} 70% 55% / 0.12), hsl(${node.hue} 70% 55% / 0.04))`,
                      border: `1px solid hsl(${node.hue} 70% 55% / 0.2)`,
                    }}
                  >
                    <node.icon className="w-7 h-7" style={{ color: `hsl(${node.hue} 70% 55%)` }} />
                    <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" style={{ background: `hsl(${node.hue} 70% 55% / 0.2)` }} />
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: `hsl(${node.hue} 70% 55% / 0.5)` }}>
                    {node.label}
                  </span>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors">
                    {node.title}
                  </h3>

                  <p className="text-sm text-muted-foreground/70 leading-relaxed flex-grow mb-5 font-light">
                    {node.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {node.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] font-mono px-2 py-1 rounded-md"
                        style={{
                          background: `hsl(${node.hue} 70% 55% / 0.06)`,
                          border: `1px solid hsl(${node.hue} 70% 55% / 0.15)`,
                          color: `hsl(${node.hue} 70% 55% / 0.7)`,
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Link indicator */}
                  {!node.isCurrent && (
                    <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: `hsl(${node.hue} 70% 55%)` }}>
                      <span className="text-xs font-mono tracking-wider uppercase">Visitar</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </motion.a>

              {/* Connection lines removed for 4-column grid layout */}
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
          <p className="text-sm text-muted-foreground/50 font-mono">
            <Zap className="w-3.5 h-3.5 inline-block text-primary/60 mr-1.5" />
            Todas las plataformas comparten el mismo ecosistema VDRC
          </p>
        </motion.div>
      </div>
    </section>
  );
}
