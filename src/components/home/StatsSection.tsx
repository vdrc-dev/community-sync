import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Wrench, Workflow, Award } from 'lucide-react';
import { useMemo, useRef, useEffect, useState } from 'react';

const stats = [
  { numericValue: 11, suffix: '', label: 'Generaciones', icon: Award, description: 'Grupos de taller' },
  { numericValue: 50, suffix: '+', label: 'Clases', icon: BookOpen, description: 'Sesiones grabadas' },
  { numericValue: 30, suffix: '+', label: 'Herramientas', icon: Wrench, description: 'Apps de IA' },
  { numericValue: 15, suffix: '+', label: 'Workflows', icon: Workflow, description: 'Automatizaciones' },
  { numericValue: 122, suffix: '+', label: 'Participantes', icon: Users, description: 'Comunidad activa' },
  { numericValue: 5000, suffix: '+', label: 'Horas Ahorradas', icon: TrendingUp, description: 'Productividad real' },
];

function AnimatedCounter({ value, suffix = '', duration = 2, delay = 0 }: { value: number; suffix?: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => { spring.set(value); setHasAnimated(true); }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, spring, delay, hasAnimated]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => setDisplayValue(latest));
    return unsubscribe;
  }, [display]);

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(142_76%_36%/0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 relative">
        {/* /// TRAYECTORIA label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">/// TRAYECTORIA</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Impacto <span className="text-gradient glow-text">real</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg mt-2">
            Números que demuestran el poder de la productividad con IA
          </p>
        </motion.div>

        {/* Stats grid - vdrc.cl trayectoria card style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group relative"
            >
              {/* Glow border on hover */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/50 group-hover:to-accent/50 blur-sm transition-all duration-500" />

              <div className="relative p-6 rounded-xl bg-card/80 backdrop-blur-xl border border-border/50 group-hover:border-primary/30 transition-all duration-500 text-center">
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Value */}
                <div className="text-3xl font-mono font-bold text-primary mb-1">
                  <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} duration={2} delay={index * 0.15} />
                </div>

                {/* Label */}
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                  [{stat.label}]
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
