import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, BookOpen, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MODULE_COLORS = [
  { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20' },
];

export function GenerationsQuickGrid() {
  const { data: generations } = useQuery({
    queryKey: ['generations-quick'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('id, code, name, start_date, is_active')
        .order('code', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const getGenNumber = (code: string) => parseInt(code.replace('GEN-', ''), 10);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">
              /// 10_GENERACIONES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
              Cada generación,{' '}
              <span className="text-gradient">una comunidad</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg mt-2">
              +200 profesionales en 10 generaciones. Explora los recursos, presentaciones y compañeros de cada una.
            </p>
          </div>
          <Link
            to="/generations"
            className="hidden sm:flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Generations Grid - 5 columns on lg, 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {generations?.map((gen, index) => {
            const genNum = getGenNumber(gen.code);
            const colors = MODULE_COLORS[index % 4];
            
            return (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  to={`/generations/${gen.code}`}
                  className="group block"
                >
                  <div className="glass glass-specular relative p-4 rounded-2xl transition-all duration-500 hover:scale-[1.04] h-full">
                    {/* Active indicator */}
                    {gen.is_active && (
                      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full bg-green-500" />
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                        <span className="font-mono font-bold text-sm ${colors.text}">
                          {String(genNum).padStart(2, '0')}
                        </span>
                      </div>
                      {gen.is_active && (
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[9px] font-mono text-green-400">ACTIVO</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors mb-1">
                      Gen {String(genNum).padStart(2, '0')}
                    </h3>

                    {gen.start_date && (
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {new Date(gen.start_date).toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })}
                      </p>
                    )}

                    {/* Hover arrow */}
                    <ChevronRight className="absolute bottom-3 right-3 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sm:hidden mt-6 text-center"
        >
          <Link
            to="/generations"
            className="inline-flex items-center gap-2 text-sm font-mono text-primary"
          >
            Ver todas las generaciones
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
