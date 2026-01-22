import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Wrench, Workflow, Award } from 'lucide-react';

const stats = [
  { 
    value: '10+', 
    label: 'Generaciones', 
    icon: Award,
    description: 'Grupos de taller'
  },
  { 
    value: '50+', 
    label: 'Clases', 
    icon: BookOpen,
    description: 'Sesiones grabadas'
  },
  { 
    value: '30+', 
    label: 'Herramientas', 
    icon: Wrench,
    description: 'Apps de IA'
  },
  { 
    value: '15+', 
    label: 'Workflows', 
    icon: Workflow,
    description: 'Automatizaciones'
  },
  { 
    value: '200+', 
    label: 'Participantes', 
    icon: Users,
    description: 'Comunidad activa'
  },
  { 
    value: '5000+', 
    label: 'Horas Ahorradas', 
    icon: TrendingUp,
    description: 'Productividad real'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StatsSection() {
  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4">
            Impacto <span className="text-gradient">real</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Números que demuestran el poder de la productividad con IA
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group relative"
            >
              <div className="h-full p-6 rounded-xl glass border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift text-center">
                <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-bold text-primary glow-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
