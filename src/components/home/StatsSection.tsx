import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Wrench, Workflow, Award } from 'lucide-react';
import { useMemo, useRef, useEffect, useState } from 'react';

const stats = [
  { 
    numericValue: 10,
    suffix: '+',
    label: 'Generaciones', 
    icon: Award,
    description: 'Grupos de taller',
    color: 'from-yellow-500 to-orange-500',
    glowColor: 'rgba(234, 179, 8, 0.4)'
  },
  { 
    numericValue: 50,
    suffix: '+',
    label: 'Clases', 
    icon: BookOpen,
    description: 'Sesiones grabadas',
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.4)'
  },
  { 
    numericValue: 30,
    suffix: '+',
    label: 'Herramientas', 
    icon: Wrench,
    description: 'Apps de IA',
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.4)'
  },
  { 
    numericValue: 15,
    suffix: '+',
    label: 'Workflows', 
    icon: Workflow,
    description: 'Automatizaciones',
    color: 'from-primary to-accent',
    glowColor: 'rgba(34, 197, 94, 0.4)'
  },
  { 
    numericValue: 200,
    suffix: '+',
    label: 'Participantes', 
    icon: Users,
    description: 'Comunidad activa',
    color: 'from-emerald-500 to-green-500',
    glowColor: 'rgba(16, 185, 129, 0.4)'
  },
  { 
    numericValue: 5000,
    suffix: '+',
    label: 'Horas Ahorradas', 
    icon: TrendingUp,
    description: 'Productividad real',
    color: 'from-rose-500 to-red-500',
    glowColor: 'rgba(244, 63, 94, 0.4)'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 12,
    }
  },
};

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = '', 
  duration = 2,
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0,
  });
  
  const display = useTransform(spring, (current) => {
    return Math.round(current);
  });
  
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, spring, delay, hasAnimated]);
  
  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [display]);
  
  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

// Animated icon with pulse effect
function PulsingIcon({ 
  Icon, 
  color, 
  glowColor,
  delay 
}: { 
  Icon: React.ComponentType<{ className?: string }>; 
  color: string;
  glowColor: string;
  delay: number;
}) {
  return (
    <motion.div 
      className={`relative w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${color} p-[2px] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
      animate={{
        boxShadow: [
          `0 0 20px ${glowColor}`,
          `0 0 40px ${glowColor}`,
          `0 0 20px ${glowColor}`,
        ],
      }}
      transition={{
        duration: 2,
        delay: delay * 0.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="w-full h-full rounded-xl bg-card flex items-center justify-center relative overflow-hidden">
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            delay: delay * 0.3 + 1,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            delay: delay * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon className="w-7 h-7 text-primary relative z-10" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Generate floating particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.35 + 0.15,
  }));
};

export function StatsSection() {
  const particles = useMemo(() => generateParticles(30), []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, hsl(142 76% 36% / 0.1) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.05, 1],
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
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, hsl(142, 76%, 60%) 0%, hsl(180, 100%, 50%) 100%)`,
              boxShadow: `0 0 ${particle.size * 4}px hsl(142, 76%, 50% / 0.5)`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
              scale: [1, 1.2, 1],
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
          style={{ perspective: '1200px' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.08, 
                rotateX: 8,
                rotateY: 8,
                z: 60,
              }}
              className="group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient border glow - always slightly visible, stronger on hover */}
              <motion.div 
                className={`absolute -inset-[2px] rounded-xl bg-gradient-to-br ${stat.color} blur-md`}
                initial={{ opacity: 0.2 }}
                whileHover={{ opacity: 1 }}
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <div className="relative h-full p-6 rounded-xl bg-card/90 backdrop-blur-xl border border-border/50 group-hover:border-transparent transition-all duration-500 group-hover:shadow-2xl text-center overflow-hidden">
                {/* Inner glow effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color}`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.15 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shine sweep effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.8 }}
                />
                
                <PulsingIcon 
                  Icon={stat.icon} 
                  color={stat.color} 
                  glowColor={stat.glowColor}
                  delay={index} 
                />
                
                <motion.div 
                  className="text-3xl sm:text-4xl font-mono font-bold text-primary mb-1 relative"
                  style={{
                    textShadow: `0 0 30px ${stat.glowColor}, 0 0 60px ${stat.glowColor}`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <AnimatedCounter 
                    value={stat.numericValue} 
                    suffix={stat.suffix} 
                    duration={2}
                    delay={index * 0.15}
                  />
                </motion.div>
                
                <motion.div 
                  className="text-sm font-semibold text-foreground mb-1 relative"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {stat.label}
                </motion.div>
                
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
