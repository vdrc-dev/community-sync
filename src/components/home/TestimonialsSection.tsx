import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useMemo } from 'react';

const testimonials = [
  {
    quote: "Los workflows interactivos cambiaron completamente mi forma de trabajar. Ahorro mínimo 2 horas diarias.",
    author: "María G.",
    role: "Product Manager",
    rating: 5,
    gradient: 'from-primary to-accent',
  },
  {
    quote: "Por fin entiendo cómo usar ChatGPT de manera productiva. Los prompts del taller son oro puro.",
    author: "Carlos R.",
    role: "Desarrollador",
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    quote: "La calculadora de ROI me ayudó a justificar la inversión en herramientas IA con datos concretos.",
    author: "Ana L.",
    role: "CEO Startup",
    rating: 5,
    gradient: 'from-purple-500 to-pink-500',
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
  hidden: { opacity: 0, y: 60, rotateX: -15, scale: 0.9 },
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

// Generate floating particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.25 + 0.1,
  }));
};

export function TestimonialsSection() {
  const particles = useMemo(() => generateParticles(20), []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(270 70% 45% / 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, hsl(142 76% 36% / 0.08) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 10,
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
              background: `radial-gradient(circle, hsl(270, 70%, 60%) 0%, hsl(180, 100%, 50%) 100%)`,
              boxShadow: `0 0 ${particle.size * 2}px hsl(270, 70%, 50% / 0.4)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
              scale: [1, 1.3, 1],
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
            Lo que dicen los <span className="text-gradient glow-text">participantes</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Historias reales de productividad transformada
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                rotateX: 5,
                rotateY: i === 0 ? 5 : i === 2 ? -5 : 0,
                z: 50,
              }}
              className="group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient border glow */}
              <motion.div 
                className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`}
              />
              
              <div className="relative h-full p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 group-hover:border-transparent transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 overflow-hidden">
                {/* Inner glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <motion.div
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} p-[1px]`}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <Quote className="w-5 h-5 text-primary/60" />
                  </div>
                </motion.div>
                
                <div className="flex gap-1 mb-4 relative">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + j * 0.1, type: 'spring' }}
                    >
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="relative text-foreground/90 mb-6 leading-relaxed text-lg">
                  "{testimonial.quote}"
                </p>
                
                <div className="relative">
                  <motion.p 
                    className="font-semibold text-foreground"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {testimonial.author}
                  </motion.p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
