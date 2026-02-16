import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Calendar, Wrench, ChevronRight, Workflow,
  Sparkles, MessageSquare, Library,
  Layers, Download
} from 'lucide-react';

const features = [
  { icon: Workflow, title: 'Workflows Interactivos', description: '19 guias paso a paso con prompts listos para ejecutar. CROP, metaprompting, Inbox Zero, PRD, vibe coding — flujos probados en vivo con casos reales.', href: '/workflows', featured: true, hue: 160 },
  { icon: MessageSquare, title: 'Comunidad Activa', description: 'Arquitectos, enologos, retail, family offices, pasteleros, fundaciones educativas, consultoras de energia — 150+ profesionales de 20+ industrias aprendiendo juntos.', href: '/community', hue: 200 },
  { icon: BookOpen, title: 'Clases por Generacion', description: 'Grabaciones, slides y transcripciones de +44 sesiones. Cada generacion es distinta — el contenido se actualiza cada semana.', href: '/generations', hue: 263 },
  { icon: Wrench, title: 'Stack de +35 Herramientas', description: 'ChatGPT para estrategia, Claude para Excel, Perplexity reemplazando Google, Cursor como profesor particular, Gamma para slides.', href: '/tools', hue: 45 },
  { icon: Library, title: 'Diccionario Digital', description: '73+ terminos y conceptos explicados. Desde CROP hasta MCP, de Vibe Coding a RAG — todo el vocabulario del taller en un glosario vivo.', href: '/dictionary', hue: 195 },
  { icon: Layers, title: 'Personalizacion IA', description: 'Las 5 capas para convertir ChatGPT en un asistente que te conoce: Custom Instructions, Memory, Projects, GPTs y API.', href: '/personalizacion-ia', hue: 340 },
  { icon: Download, title: 'Guia de Instalacion', description: '18 herramientas con instrucciones paso a paso: GitHub, Supabase, Lovable, Vercel, ChatGPT, Claude, Cursor, Gamma y mas.', href: '/guia-instalacion', hue: 280 },
  { icon: Calendar, title: 'Calendario de Sesiones', description: 'Gen 11 arranca el 3 de marzo 2026. Cada martes a las 19h Chile. Inscripciones abiertas.', href: '/calendar', hue: 185 },
];

export function FeaturesGrid() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">/// ECOSISTEMA</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold mt-3">
            Todo lo que necesitas para{' '}
            <span className="text-shimmer">dominar la IA</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg mt-3">
            Desde la higiene digital hasta crear ERPs con IA — un ecosistema forjado en 11 generaciones de casos reales
          </p>
          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] w-40 mt-6 rounded-full origin-left"
            style={{ background: 'linear-gradient(90deg, hsl(152 70% 45%), hsl(174 60% 45%), transparent)' }}
          />
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={feature.featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''}
            >
              <Link to={feature.href} className="group relative flex flex-col h-full">
                {/* Glow border on hover */}
                <div
                  className="absolute -inset-px rounded-2xl blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, hsl(${feature.hue} 70% 55% / 0.2), hsl(${feature.hue} 70% 55% / 0.05))` }}
                />

                <motion.div
                  className="glass glass-specular card-edge-highlight relative flex flex-col h-full p-7 rounded-2xl group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {/* Accent top stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, hsl(${feature.hue} 70% 55%), transparent)` }}
                  />

                  {/* Shimmer sweep on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `linear-gradient(105deg, transparent 30%, hsl(${feature.hue} 70% 60% / 0.04) 50%, transparent 70%)` }}
                  />

                  {/* Number label */}
                  <span className="font-mono text-xs tracking-widest mb-3" style={{ color: `hsl(${feature.hue} 70% 55% / 0.35)` }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 relative"
                    style={{
                      background: `hsl(${feature.hue} 70% 55% / 0.1)`,
                      border: `1px solid hsl(${feature.hue} 70% 55% / 0.18)`,
                    }}
                  >
                    <feature.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: `hsl(${feature.hue} 70% 55%)` }} />
                    {/* Icon glow */}
                    <div
                      className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `hsl(${feature.hue} 70% 55% / 0.2)` }}
                    />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-sm flex-grow leading-relaxed">{feature.description}</p>

                  <div className="flex items-center mt-5 text-sm font-medium opacity-50 group-hover:opacity-100 transition-all duration-300" style={{ color: `hsl(${feature.hue} 70% 55%)` }}>
                    <span>Explorar</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
