import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Calendar, Wrench, ChevronRight, Workflow,
  Sparkles, MessageSquare, Library,
  Layers, Download, Building2, Calculator
} from 'lucide-react';

const features = [
  { icon: Workflow, title: 'Workflows Interactivos', description: '19 guias paso a paso con prompts listos para ejecutar. CROP, metaprompting, Inbox Zero, PRD, vibe coding — flujos probados en vivo con casos reales.', href: '/workflows', featured: true, hue: 160 },
  { icon: MessageSquare, title: 'Comunidad Activa', description: 'Arquitectos, enologos, retail, family offices, pasteleros, fundaciones educativas, consultoras de energia — 150+ profesionales de 20+ industrias aprendiendo juntos.', href: '/community', hue: 200 },
  { icon: BookOpen, title: 'Clases por Generacion', description: 'Grabaciones, slides y transcripciones de +44 sesiones. Cada generacion es distinta — el contenido se actualiza cada semana. 3 versiones del curriculo.', href: '/generations', hue: 263 },
  { icon: Wrench, title: 'Stack de +35 Herramientas', description: 'ChatGPT para estrategia, Claude para Excel, Perplexity reemplazando Google, Cursor como profesor particular, Gamma para slides.', href: '/tools', hue: 45 },
  { icon: Library, title: 'Diccionario Digital', description: '73+ terminos y conceptos explicados. Desde CROP hasta MCP, de Vibe Coding a RAG — todo el vocabulario del taller en un glosario vivo.', href: '/dictionary', hue: 195 },
  { icon: Layers, title: 'Personalizacion IA', description: 'Las 5 capas para convertir ChatGPT en un asistente que te conoce: Custom Instructions, Memory, Projects, GPTs y API.', href: '/personalizacion-ia', hue: 340 },
  { icon: Download, title: 'Guia de Instalacion', description: '18 herramientas con instrucciones paso a paso: GitHub, Supabase, Lovable, Vercel, ChatGPT, Claude, Cursor, Gamma y mas.', href: '/guia-instalacion', hue: 280 },
  { icon: Calculator, title: 'Calculadora ROI', description: 'Mide cuanto tiempo y dinero ahorras con IA. Registra tus automatizaciones y visualiza el impacto real en tu productividad.', href: '/roi-calculator', hue: 120 },
  { icon: Calendar, title: 'Calendario de Sesiones', description: 'Gen 11 arranca el 3 de marzo 2026. Cada martes a las 19h Chile. Inscripciones abiertas.', href: '/calendar', hue: 185 },
  { icon: Building2, title: 'Talleres In-Company', description: 'Programas corporativos a medida para empresas. BTG Pactual, Epysa, Manuia, Grupo Amoble y SCM ya confiaron en VDRC.', href: 'mailto:contacto@vdrc.cl?subject=Consulta%20In-Company', hue: 174 },
];

export function FeaturesGrid() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 relative">
        {/* Header — cinematic left-aligned with accent */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16 md:mb-20"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50 block mb-4">/// ECOSISTEMA</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight">
            Todo lo que necesitas para{' '}
            <span className="text-gradient-live">dominar la IA</span>
          </h2>
          <p className="text-muted-foreground/70 max-w-2xl text-base sm:text-lg mt-3 sm:mt-4 font-light leading-relaxed">
            Desde la higiene digital hasta crear ERPs con IA — un ecosistema forjado en 11 generaciones, 5 programas corporativos y 3 versiones del currículo
          </p>
          {/* Accent line with diamond */}
          <div className="mt-8 max-w-xs">
            <div className="separator-diamond"><span /></div>
          </div>
        </motion.div>

        {/* Bento grid — asymmetric, cinematic */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 max-w-7xl mx-auto auto-rows-fr">
          {features.map((feature, index) => {
            const isLarge = feature.featured;
            const isAccent = index === 3 || index === 5;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={isLarge ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <Link to={feature.href} className="group relative flex flex-col h-full">
                  {/* Multi-layered glow border on hover */}
                  <div
                    className="absolute -inset-px rounded-2xl blur-lg transition-all duration-700 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, hsl(${feature.hue} 70% 55% / 0.25), hsl(${feature.hue} 70% 55% / 0.05))` }}
                  />
                  <div
                    className="absolute -inset-2 rounded-3xl blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-60 pointer-events-none"
                    style={{ background: `hsl(${feature.hue} 70% 55% / 0.06)` }}
                  />

                  <motion.div
                    className={`glass-prismatic glass-specular card-edge-highlight spotlight-card relative flex flex-col h-full ${isLarge ? 'p-5 sm:p-8 lg:p-10' : 'p-5 sm:p-7'} rounded-2xl group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    {/* Accent top stripe — holographic multi-color */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-25 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent 5%, hsl(${feature.hue} 70% 55%) 30%, hsl(${(feature.hue + 40) % 360} 60% 55% / 0.5) 70%, transparent 95%)` }}
                    />

                    {/* Light leak sweep on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: `linear-gradient(105deg, transparent 20%, hsl(${feature.hue} 70% 60% / 0.05) 45%, transparent 65%)` }}
                    />

                    {/* Number label — large decorative */}
                    <span
                      className="font-display text-[3.5rem] leading-none absolute top-4 right-5 select-none pointer-events-none transition-opacity duration-500 opacity-[0.03] group-hover:opacity-[0.07]"
                      style={{ color: `hsl(${feature.hue} 70% 55%)` }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Small number */}
                    <span className="font-mono text-[10px] tracking-[0.3em] mb-4" style={{ color: `hsl(${feature.hue} 70% 55% / 0.4)` }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Icon — with breathing glow */}
                    <div
                      className={`${isLarge ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110 group-hover:rotate-2 relative`}
                      style={{
                        background: `linear-gradient(135deg, hsl(${feature.hue} 70% 55% / 0.12), hsl(${feature.hue} 70% 55% / 0.04))`,
                        border: `1px solid hsl(${feature.hue} 70% 55% / 0.2)`,
                      }}
                    >
                      <feature.icon className={`${isLarge ? 'w-7 h-7' : 'w-6 h-6'} transition-all duration-300 group-hover:scale-110`} style={{ color: `hsl(${feature.hue} 70% 55%)` }} />
                      <div
                        className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `hsl(${feature.hue} 70% 55% / 0.25)` }}
                      />
                    </div>

                    <h3 className={`${isLarge ? 'text-xl' : 'text-lg'} font-semibold mb-2 transition-colors duration-300 group-hover:text-foreground`}>
                      {feature.title}
                    </h3>

                    <p className={`text-muted-foreground/70 ${isLarge ? 'text-sm' : 'text-[13px]'} flex-grow leading-relaxed font-light`}>{feature.description}</p>

                    <div className="flex items-center mt-6 text-sm font-medium opacity-40 group-hover:opacity-100 transition-all duration-300" style={{ color: `hsl(${feature.hue} 70% 55%)` }}>
                      <span className="text-xs font-mono tracking-wider uppercase">Explorar</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
