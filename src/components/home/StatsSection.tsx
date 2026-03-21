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

function useDynamicStats() {
  const { data: genCount } = useQuery({
    queryKey: ['stats-gen-count'],
    queryFn: async () => {
      const { count } = await supabase.from('generations').select('*', { count: 'exact', head: true });
      return count || 11;
    },
    staleTime: 1000 * 60 * 30,
  });

  const { data: toolCount } = useQuery({
    queryKey: ['stats-tool-count'],
    queryFn: async () => {
      const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true });
      return count || 30;
    },
    staleTime: 1000 * 60 * 30,
  });

  const { data: workflowCount } = useQuery({
    queryKey: ['stats-workflow-count'],
    queryFn: async () => {
      const { count } = await supabase.from('automation_workflows').select('*', { count: 'exact', head: true });
      return count || 15;
    },
    staleTime: 1000 * 60 * 30,
  });

  return { generations: genCount || 11, tools: toolCount || 30, workflows: workflowCount || 15 };
}

export function StatsSection() {
  const dynamic = useDynamicStats();

  const stats = [
    { numericValue: 11, suffix: '', label: 'Generaciones', icon: Award, description: 'Desde abril 2025 — Gen 001 a Gen 011, una cada mes', hue: 160 },
    { numericValue: 44, suffix: '+', label: 'Clases', icon: BookOpen, description: '4 sesiones por generacion con grabacion y transcripcion', hue: 263 },
    { numericValue: dynamic.tools, suffix: '+', label: 'Herramientas', icon: Wrench, description: 'ChatGPT, Claude, Cursor, Lovable, Supabase, Gamma y mas', hue: 200 },
    { numericValue: dynamic.workflows, suffix: '+', label: 'Workflows', icon: Workflow, description: 'PRD, CROP, chunking, metaprompts, vibe coding', hue: 45 },
    { numericValue: 150, suffix: '+', label: 'Participantes', icon: Users, description: 'Retail, inmobiliario, finanzas, energia, educacion, enologia', hue: 340 },
    { numericValue: 5, suffix: '', label: 'In-Company', icon: Rocket, description: 'BTG Pactual, Epysa, Manuia, Grupo Amoble, SCM', hue: 174 },
    { numericValue: 3, suffix: '', label: 'Versiones', icon: TrendingUp, description: 'V1 Airtable → V2 IA avanzada → V3 Vibe Coding', hue: 120 },
    { numericValue: 5000, suffix: '+', label: 'Horas Ahorradas', icon: TrendingUp, description: '300 paginas en 20, 7 planillas en 0 — caso real', hue: 50 },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Epic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      <div className="mesh-gradient opacity-30" />

      <div className="container mx-auto px-4 relative">
        {/* Header — cinematic centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16 md:mb-20 text-center"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50 block mb-4">/// TRAYECTORIA</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight">
            Impacto <span className="text-gradient-live">real</span>
          </h2>
          <p className="text-muted-foreground/60 max-w-xl mx-auto text-base sm:text-lg mt-3 sm:mt-4 font-light">
            Desde abril 2025, profesionales de 20+ industrias transformando su productividad con IA
          </p>
          <div className="mt-8 max-w-[120px] mx-auto">
            <div className="separator-diamond"><span /></div>
          </div>
        </motion.div>

        {/* Stats grid — dramatic cinematic editorial cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-5 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, y: -8 }}
              className="group relative"
            >
              {/* Multi-layered glow on hover */}
              <div
                className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                style={{ background: `hsl(${stat.hue} 70% 55% / 0.12)` }}
              />

              <div className="glass-prismatic glass-specular card-light-leak relative p-6 rounded-2xl group-hover:border-white/[0.12] transition-all duration-500 text-center overflow-hidden h-full border border-white/[0.04]">
                {/* Accent top bar — holographic */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, hsl(${stat.hue} 70% 55%), hsl(${(stat.hue + 40) % 360} 60% 55% / 0.5), transparent)` }}
                />

                {/* Holographic shimmer sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <motion.div
                    style={{ background: `linear-gradient(105deg, transparent 30%, hsl(${stat.hue} 70% 60% / 0.08) 45%, transparent 60%)`, width: '40%', height: '100%' }}
                    animate={{ x: ['-100%', '350%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                  />
                </motion.div>

                {/* BIG value — EDITORIAL SERIF with glow */}
                <div
                  className="text-4xl sm:text-5xl stat-serif mb-3 transition-all duration-300"
                  style={{
                    background: `linear-gradient(180deg, hsl(${stat.hue} 70% 78%), hsl(${stat.hue} 70% 48%))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 22px hsl(${stat.hue} 70% 55% / 0.45))`,
                  }}
                >
                  <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} duration={2.5} delay={index * 0.15} />
                </div>

                {/* Icon — small and subtle */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-80 transition-opacity" style={{ color: `hsl(${stat.hue} 70% 55%)` }} />
                  <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                    {stat.label}
                  </div>
                </div>

                {/* Hover description with smooth reveal */}
                <div className="text-[10px] text-muted-foreground/40 mt-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 font-light leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gen 11 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10"
        >
          <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer" className="group block max-w-md mx-auto">
            <div className="glass-tinted relative p-5 rounded-2xl hover:border-primary/20 transition-all duration-500 text-center hover:shadow-[0_0_30px_-10px_hsl(152_70%_40%_/_0.15)]">
              <div className="flex items-center justify-center gap-3">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Rocket className="w-5 h-5 text-accent" />
                </motion.div>
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
