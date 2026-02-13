import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, Calendar, Wrench, ChevronRight, Workflow,
  Calculator, Sparkles, Gamepad2, MessageSquare, Shield, Code2
} from 'lucide-react';

const features = [
  { icon: Workflow, title: 'Workflows con IA', description: 'Ejecuta metaprompts, investigaciones a fondo y automatizaciones paso a paso con variables personalizables.', href: '/workflows', featured: true },
  { icon: MessageSquare, title: 'Comunidad Activa', description: 'Conecta con +122 profesionales, comparte casos reales y aprende del ecosistema VDRC.', href: '/community' },
  { icon: BookOpen, title: 'Clases por Generación', description: 'Grabaciones, presentaciones y notas de +50 sesiones desde la Gen 1 hasta la Gen 11.', href: '/generations' },
  { icon: Wrench, title: 'Stack de Herramientas IA', description: 'ChatGPT, Claude, Perplexity, Gemini, Manus, Cursor, Lovable y +20 herramientas catalogadas.', href: '/tools' },
  { icon: Calculator, title: 'Calculadora de ROI', description: 'Mide las horas y dinero que ahorras delegando tareas repetitivas a la IA.', href: '/roi-calculator' },
  { icon: Sparkles, title: 'Playground IA', description: 'Experimenta con prompts, compara modelos y genera contenido profesional en tiempo real.', href: '/playground' },
  { icon: Code2, title: 'Vibe Coding', description: 'Crea software real con Lovable + Supabase + GitHub sin escribir una sola línea de código.', href: '/workflows' },
  { icon: Calendar, title: 'Calendario de Sesiones', description: 'Próximas clases, eventos de la comunidad y fechas clave de cada generación.', href: '/calendar' },
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
            Desde higiene digital hasta vibe coding — un ecosistema completo de productividad con inteligencia artificial
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
                {/* Glow border */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/40 group-hover:to-accent/40 blur-sm transition-all duration-500" />

                <motion.div
                  className="relative flex flex-col h-full p-6 rounded-xl bg-card/90 backdrop-blur-sm border border-border/40 group-hover:border-primary/30 transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {/* MODULE label */}
                  <span className="font-mono text-xs tracking-widest text-primary/30 mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>

                  <div className="flex items-center mt-4 text-sm text-primary font-medium opacity-60 group-hover:opacity-100 transition-all duration-300">
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
