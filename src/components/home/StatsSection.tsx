import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Wrench, Workflow, Award } from 'lucide-react';
import { useMemo } from 'react';

const stats = [
  { 
    value: '10+', 
    label: 'Generaciones', 
    icon: Award,
    description: 'Grupos de taller',
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    value: '50+', 
    label: 'Clases', 
    icon: BookOpen,
    description: 'Sesiones grabadas',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    value: '30+', 
    label: 'Herramientas', 
    icon: Wrench,
    description: 'Apps de IA',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    value: '15+', 
    label: 'Workflows', 
    icon: Workflow,
    description: 'Automatizaciones',
    color: 'from-primary to-accent'
  },
  { 
    value: '200+', 
    label: 'Participantes', 
    icon: Users,
    description: 'Comunidad activa',
    color: 'from-emerald-500 to-green-500'
  },
  { 
    value: '5000+', 
    label: 'Horas Ahorradas', 
    icon: TrendingUp,
    description: 'Productividad real',
    color: 'from-rose-500 to-red-500'
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
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
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
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.3 + 0.1,
  }));
};

export function StatsSection() {
  const particles = useMemo(() => generateParticles(25), []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, hsl(142 76% 36% / 0.08) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              boxShadow: `0 0 ${particle.size * 3}px hsl(142, 76%, 50% / 0.4)`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
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
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Impacto <span className="text-gradient glow-text">real</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Números que demuestran el poder de la productividad con IA
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          style={{ perspective: '1000px' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 5,
                rotateY: 5,
                z: 50,
              }}
              className="group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient border glow */}
              <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`} />
              
              <div className="relative h-full p-6 rounded-xl bg-card/80 backdrop-blur-xl border border-border/50 group-hover:border-transparent transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 text-center overflow-hidden">
                {/* Inner glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className={`relative w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-[1px] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <motion.div 
                  className="text-3xl sm:text-4xl font-mono font-bold text-primary glow-text mb-1"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-sm font-medium text-foreground mb-1 relative">
                  {stat.label}
                </div>
                
                <div className="text-xs text-muted-foreground relative">
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
