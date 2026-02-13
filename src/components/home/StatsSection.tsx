import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Wrench, Workflow, Award, Rocket, ExternalLink } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

// Fetch dynamic counts from Supabase
function useDynamicStats() {
  const { data: genCount } = useQuery({
    queryKey: ['stats-gen-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('generations')
        .select('*', { count: 'exact', head: true });
      return count || 11;
    },
    staleTime: 1000 * 60 * 30,
  });

  const { data: toolCount } = useQuery({
    queryKey: ['stats-tool-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('tools')
        .select('*', { count: 'exact', head: true });
      return count || 30;
    },
    staleTime: 1000 * 60 * 30,
  });

  const { data: workflowCount } = useQuery({
    queryKey: ['stats-workflow-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('automation_workflows')
        .select('*', { count: 'exact', head: true });
      return count || 15;
    },
    staleTime: 1000 * 60 * 30,
  });

  return {
    generations: genCount || 11,
    tools: toolCount || 30,
    workflows: workflowCount || 15,
  };
}

export function StatsSection() {
  const dynamic = useDynamicStats();

  const stats = [
    { numericValue: dynamic.generations, suffix: '', label: 'Generaciones', icon: Award, description: 'Grupos de taller completados' },
    { numericValue: 50, suffix: '+', label: 'Clases', icon: BookOpen, description: 'Sesiones grabadas disponibles' },
    { numericValue: dynamic.tools, suffix: '+', label: 'Herramientas', icon: Wrench, description: 'Apps de IA catalogadas' },
    { numericValue: dynamic.workflows, suffix: '+', label: 'Workflows', icon: Workflow, description: 'Automatizaciones listas' },
    { numericValue: 122, suffix: '+', label: 'Participantes', icon: Users, description: 'Profesionales activos' },
    { numericValue: 5000, suffix: '+', label: 'Horas Ahorradas', icon: TrendingUp, description: 'Estimado por la comunidad' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background — clean */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent" />

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
            Impacto <span className="text-gradient">real</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg mt-2">
            Numeros que demuestran el poder de la productividad con IA
          </p>
        </motion.div>

        {/* Stats grid — 6 items in a balanced grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
              {/* No neon glow on hover */}

              <div className="relative p-5 rounded-xl bg-card/80 backdrop-blur-xl border border-border/50 group-hover:border-primary/30 transition-all duration-500 text-center">
                {/* Icon */}
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Value */}
                <div className="text-2xl font-mono font-bold text-primary mb-1">
                  <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} duration={2} delay={index * 0.15} />
                </div>

                {/* Label */}
                <div className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </div>

                {/* Description tooltip on hover */}
                <div className="text-[10px] text-muted-foreground/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gen 11 CTA — separate from stats for visual clarity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <a
            href="https://vdrc.cl/talleres"
            target="_blank"
            rel="noopener noreferrer"
            className="group block max-w-md mx-auto"
          >
            <div className="relative p-5 rounded-xl bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 backdrop-blur-xl border border-accent/30 hover:border-accent/60 transition-all duration-500 text-center">
              <div className="flex items-center justify-center gap-3">
                <Rocket className="w-5 h-5 text-accent" />
                <span className="font-mono font-bold text-accent">Gen 11</span>
                <span className="text-muted-foreground">—</span>
                <span className="text-sm text-muted-foreground">Marzo 2026</span>
                <ExternalLink className="w-3.5 h-3.5 text-accent/50 group-hover:text-accent transition-colors" />
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
