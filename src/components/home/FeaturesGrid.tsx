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
import { useMemo } from 'react';

const features = [
  {
    icon: Workflow,
    title: 'Workflows Interactivos',
    description: 'Ejecuta prompts en tiempo real con variables personalizables y guarda tu historial.',
    href: '/workflows',
    gradient: 'from-primary to-accent',
    iconBg: 'bg-primary/20',
    featured: true,
  },
  {
    icon: BookOpen,
    title: 'Biblioteca de Recursos',
    description: 'Grabaciones, presentaciones y materiales organizados por generación.',
    href: '/generations',
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/20',
  },
  {
    icon: Wrench,
    title: 'Catálogo de Herramientas',
    description: '30+ herramientas IA categorizadas con tracking personal de uso.',
    href: '/tools',
    gradient: 'from-purple-500 to-pink-500',
    iconBg: 'bg-purple-500/20',
  },
  {
    icon: Calculator,
    title: 'Calculadora ROI',
    description: 'Mide el tiempo y dinero que ahorras con tus automatizaciones.',
    href: '/roi-calculator',
    gradient: 'from-green-500 to-emerald-500',
    iconBg: 'bg-green-500/20',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Conecta, comparte proyectos y resuelve dudas con otros participantes.',
    href: '/forum',
    gradient: 'from-orange-500 to-amber-500',
    iconBg: 'bg-orange-500/20',
  },
  {
    icon: Gamepad2,
    title: 'Gamificación',
    description: 'Gana puntos, desbloquea badges y compite en el leaderboard.',
    href: '/leaderboard',
    gradient: 'from-yellow-500 to-orange-500',
    iconBg: 'bg-yellow-500/20',
  },
  {
    icon: Calendar,
    title: 'Calendario',
    description: 'Mantente al día con próximas sesiones y eventos del taller.',
    href: '/calendar',
    gradient: 'from-red-500 to-rose-500',
    iconBg: 'bg-red-500/20',
  },
  {
    icon: Sparkles,
    title: 'Playground IA',
    description: 'Experimenta con prompts y genera contenido con diferentes modelos.',
    href: '/playground',
    gradient: 'from-indigo-500 to-violet-500',
    iconBg: 'bg-indigo-500/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { 
      type: 'spring' as const,
      stiffness: 80,
      damping: 12,
    } 
  },
};

// Generate floating particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.2 + 0.1,
  }));
};

export function FeaturesGrid() {
  const particles = useMemo(() => generateParticles(30), []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, hsl(180 100% 45% / 0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(270 70% 45% / 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, hsl(180, 100%, 50%) 0%, hsl(142, 76%, 50%) 100%)`,
              boxShadow: `0 0 ${particle.size * 2}px hsl(180, 100%, 50% / 0.3)`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [particle.opacity, particle.opacity * 1.8, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Todo en <span className="text-gradient glow-text">un lugar</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Un ecosistema completo para dominar la productividad con inteligencia artificial
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ perspective: '1200px' }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title} 
              variants={itemVariants}
              className={feature.featured ? 'sm:col-span-2 lg:col-span-2' : ''}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link
                to={feature.href}
                className="group relative flex flex-col h-full"
              >
                {/* Gradient border glow */}
                <motion.div 
                  className={`absolute -inset-[1px] rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`}
                  whileHover={{ opacity: 1 }}
                />
                
                <motion.div
                  className="relative flex flex-col h-full p-6 rounded-xl bg-card/80 backdrop-blur-xl border border-border/50 group-hover:border-transparent transition-all duration-500 overflow-hidden"
                  whileHover={{ 
                    scale: 1.02, 
                    rotateX: 3,
                    rotateY: -3,
                    boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {/* Inner gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {feature.featured && (
                    <motion.div 
                      className="absolute top-3 right-3"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30 animate-pulse">
                        Popular
                      </span>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-4`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-foreground" />
                    </div>
                  </motion.div>
                  
                  <h3 className="relative text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="relative text-muted-foreground text-sm flex-grow">
                    {feature.description}
                  </p>
                  
                  <motion.div 
                    className="relative flex items-center mt-4 text-sm text-primary font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explorar</span>
                    <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
