import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Calendar, Wrench, ChevronRight, Workflow,
  Calculator, Sparkles, MessageSquare, Code2, Library
} from 'lucide-react';

const features = [
  { icon: Workflow, title: 'Workflows con IA', description: 'PRD → MVP → Deploy. CROP, metaprompting, chunking, auditoría cruzada, GPTs personalizados — flujos probados en vivo con casos reales de participantes desde Gen 004.', href: '/workflows', featured: true, hue: 160 },
  { icon: MessageSquare, title: 'Comunidad Activa', description: 'Arquitectos, enólogos, retail, family offices, pasteleros, fundaciones educativas, consultoras de energía — 150+ profesionales de 20+ industrias aprendiendo juntos.', href: '/community', hue: 200 },
  { icon: BookOpen, title: 'Clases por Generación', description: 'Grabaciones, slides y transcripciones de +44 sesiones. Cada generación es distinta — el contenido se actualiza cada semana porque la tecnología cambia demasiado rápido.', href: '/generations', hue: 263 },
  { icon: Wrench, title: 'Stack de +35 Herramientas', description: 'ChatGPT para estrategia, Claude para Excel, Perplexity reemplazando Google, Cursor como profesor particular, Gamma para slides, Make para automatizar. Cada una tiene su rol.', href: '/tools', hue: 45 },
  { icon: Library, title: 'Diccionario Digital', description: '73+ términos, herramientas y conceptos explicados. Desde CROP hasta MCP, de Vibe Coding a RAG — todo el vocabulario del taller en un glosario vivo.', href: '/dictionary', hue: 195 },
  { icon: Sparkles, title: 'Playground IA', description: 'Experimenta con Canvas, Operator, modelos O3 vs Auto, y genera contenido profesional. Siempre audita: "como validar el trabajo de un practicante."', href: '/playground', hue: 340 },
  { icon: Code2, title: 'Vibe Coding', description: 'PRD en GPT personalizado → Lovable → Supabase → GitHub → Deploy. El Wall Street Journal dice que construir software propio es más barato que pagar SaaS.', href: '/workflows', hue: 280 },
  { icon: Calendar, title: 'Calendario de Sesiones', description: 'Gen 11 arranca el 3 de marzo 2026. Jaime ya lleva 5 repeticiones — "va cambiando tanto que me interesa mucho estar al día." Cada martes a las 19h.', href: '/calendar', hue: 185 },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* /// INTERVENCIÓN label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">/// ECOSISTEMA</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Todo lo que necesitas para <span className="text-gradient">dominar la IA</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg mt-2">
            Desde la higiene digital hasta crear ERPs con IA — un ecosistema forjado en 11 generaciones de casos reales
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: 'spring', stiffness: 80 }}
              className={feature.featured ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <Link to={feature.href} className="group relative flex flex-col h-full">
                {/* Glow border on hover — accent-colored */}
                <div
                  className="absolute -inset-px rounded-2xl blur-md transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, hsl(${feature.hue} 70% 55% / 0.15), hsl(${feature.hue} 70% 55% / 0.05))` }}
                />

                <motion.div
                  className="glass glass-specular relative flex flex-col h-full p-6 rounded-2xl group-hover:border-white/[0.1] transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {/* Accent top stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, hsl(${feature.hue} 70% 55%), transparent)` }}
                  />

                  {/* MODULE label */}
                  <span className="font-mono text-xs tracking-widest mb-3" style={{ color: `hsl(${feature.hue} 70% 55% / 0.4)` }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `hsl(${feature.hue} 70% 55% / 0.08)`,
                      border: `1px solid hsl(${feature.hue} 70% 55% / 0.15)`,
                    }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: `hsl(${feature.hue} 70% 55%)` }} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 transition-colors duration-300" style={{ ['--hover-color' as string]: `hsl(${feature.hue} 70% 55%)` }}>
                    <span className="group-hover:text-primary">{feature.title}</span>
                  </h3>

                  <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>

                  <div className="flex items-center mt-4 text-sm font-medium opacity-60 group-hover:opacity-100 transition-all duration-300" style={{ color: `hsl(${feature.hue} 70% 55%)` }}>
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
