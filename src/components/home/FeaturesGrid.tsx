import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Wrench, 
  ChevronRight, 
  Workflow,
  Calculator,
  Sparkles,
  Gamepad2
} from 'lucide-react';

const features = [
  {
    icon: Workflow,
    title: 'Workflows Interactivos',
    description: 'Ejecuta prompts en tiempo real con variables personalizables y guarda tu historial.',
    href: '/workflows',
    gradient: 'from-primary/20 to-accent/10',
    iconBg: 'bg-primary/20',
    featured: true,
  },
  {
    icon: BookOpen,
    title: 'Biblioteca de Recursos',
    description: 'Grabaciones, presentaciones y materiales organizados por generación.',
    href: '/generations',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    iconBg: 'bg-blue-500/20',
  },
  {
    icon: Wrench,
    title: 'Catálogo de Herramientas',
    description: '30+ herramientas IA categorizadas con tracking personal de uso.',
    href: '/tools',
    gradient: 'from-purple-500/10 to-pink-500/10',
    iconBg: 'bg-purple-500/20',
  },
  {
    icon: Calculator,
    title: 'Calculadora ROI',
    description: 'Mide el tiempo y dinero que ahorras con tus automatizaciones.',
    href: '/roi-calculator',
    gradient: 'from-green-500/10 to-emerald-500/10',
    iconBg: 'bg-green-500/20',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Conecta, comparte proyectos y resuelve dudas con otros participantes.',
    href: '/forum',
    gradient: 'from-orange-500/10 to-amber-500/10',
    iconBg: 'bg-orange-500/20',
  },
  {
    icon: Gamepad2,
    title: 'Gamificación',
    description: 'Gana puntos, desbloquea badges y compite en el leaderboard.',
    href: '/leaderboard',
    gradient: 'from-yellow-500/10 to-orange-500/10',
    iconBg: 'bg-yellow-500/20',
  },
  {
    icon: Calendar,
    title: 'Calendario',
    description: 'Mantente al día con próximas sesiones y eventos del taller.',
    href: '/calendar',
    gradient: 'from-red-500/10 to-rose-500/10',
    iconBg: 'bg-red-500/20',
  },
  {
    icon: Sparkles,
    title: 'Playground IA',
    description: 'Experimenta con prompts y genera contenido con diferentes modelos.',
    href: '/playground',
    gradient: 'from-indigo-500/10 to-violet-500/10',
    iconBg: 'bg-indigo-500/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesGrid() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4">
            Todo en <span className="text-gradient">un lugar</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un ecosistema completo para dominar la productividad con inteligencia artificial
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Link
                to={feature.href}
                className={`
                  group relative flex flex-col h-full p-6 rounded-xl 
                  bg-gradient-to-br ${feature.gradient}
                  border border-border/50 hover:border-primary/40
                  transition-all duration-300 hover-lift
                  ${feature.featured ? 'sm:col-span-2 lg:col-span-2' : ''}
                `}
              >
                {feature.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
                      Popular
                    </span>
                  </div>
                )}
                
                <div className={`
                  w-12 h-12 rounded-xl ${feature.iconBg} 
                  border border-white/10 flex items-center justify-center mb-4
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm flex-grow">
                  {feature.description}
                </p>
                
                <div className="flex items-center mt-4 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorar
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
