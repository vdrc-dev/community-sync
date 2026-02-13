import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, Calendar, Wrench, ChevronRight, Workflow,
  Calculator, Sparkles, Gamepad2, MessageSquare
} from 'lucide-react';

const features = [
  { icon: Workflow, title: 'Workflows Interactivos', description: 'Ejecuta prompts en tiempo real con variables personalizables y guarda tu historial.', href: '/workflows', featured: true },
  { icon: MessageSquare, title: 'Comunidad', description: 'Espacios de discusión, posts, likes y comentarios para conectar con participantes.', href: '/community' },
  { icon: BookOpen, title: 'Biblioteca de Recursos', description: 'Grabaciones, presentaciones y materiales organizados por generación.', href: '/generations' },
  { icon: Wrench, title: 'Catálogo de Herramientas', description: '30+ herramientas IA categorizadas con tracking personal de uso.', href: '/tools' },
  { icon: Calculator, title: 'Calculadora ROI', description: 'Mide el tiempo y dinero que ahorras con tus automatizaciones.', href: '/roi-calculator' },
  { icon: Sparkles, title: 'Playground IA', description: 'Experimenta con prompts y genera contenido con diferentes modelos.', href: '/playground' },
  { icon: Gamepad2, title: 'Gamificación', description: 'Gana puntos, desbloquea badges y compite en el leaderboard.', href: '/leaderboard' },
  { icon: Calendar, title: 'Calendario', description: 'Mantente al día con próximas sesiones y eventos del taller.', href: '/calendar' },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* No colored background radials — clean */}

      <div className="container mx-auto px-4 relative">
        {/* /// INTERVENCIÓN label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">/// INTERVENCIÓN</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Todo en <span className="text-gradient">un lugar</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg mt-2">
            Un ecosistema completo para dominar la productividad con inteligencia artificial
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
