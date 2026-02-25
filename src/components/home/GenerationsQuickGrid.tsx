import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, ChevronRight } from 'lucide-react';

const HUE_CYCLE = [160, 263, 340, 200, 45, 120, 280, 185, 50, 300];

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
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="mesh-gradient opacity-15" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-10 sm:mb-14"
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50">
              /// 10_GENERACIONES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight mt-3">
              Cada generación,{' '}
              <span className="text-gradient-live">una comunidad</span>
            </h2>
            <p className="text-muted-foreground/60 max-w-xl text-base sm:text-lg mt-3 font-light">
              +150 profesionales en 11 generaciones. Explora los recursos, presentaciones y compañeros de cada una.
            </p>
            <div className="mt-6 max-w-xs">
              <div className="separator-diamond"><span /></div>
            </div>
          </div>
          <Link
            to="/generations"
            className="hidden sm:flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {generations?.map((gen, index) => {
            const genNum = getGenNumber(gen.code);
            const hue = HUE_CYCLE[index % HUE_CYCLE.length];

            return (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/generations/${gen.code}`} className="group block">
                  <div className="glass-prismatic glass-specular relative p-4 sm:p-5 rounded-2xl transition-all duration-500 hover:scale-[1.04] h-full overflow-hidden border border-white/[0.04] group-hover:border-white/[0.1]">
                    {/* Holographic accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-15 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent, hsl(${hue} 70% 55%), transparent)` }}
                    />

                    {/* Serif anchor */}
                    <div
                      className="absolute -bottom-3 -right-1 select-none pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: '72px',
                        fontWeight: 900,
                        fontStyle: 'italic',
                        lineHeight: 0.85,
                        color: `hsl(${hue} 60% 55%)`,
                      }}
                    >
                      {String(genNum).padStart(2, '0')}
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                      style={{ background: `hsl(${hue} 70% 55% / 0.08)` }}
                    />

                    {/* Active indicator */}
                    {gen.is_active && (
                      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full"
                        style={{ background: `linear-gradient(90deg, transparent, hsl(${hue} 70% 55%), transparent)` }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative"
                        style={{
                          background: `linear-gradient(135deg, hsl(${hue} 70% 55% / 0.12), hsl(${hue} 70% 55% / 0.04))`,
                          border: `1px solid hsl(${hue} 70% 55% / 0.2)`,
                        }}
                      >
                        <span className="stat-serif text-sm" style={{ color: `hsl(${hue} 70% 55%)` }}>
                          {String(genNum).padStart(2, '0')}
                        </span>
                        <div
                          className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                          style={{ background: `hsl(${hue} 70% 55% / 0.2)` }}
                        />
                      </div>
                      {gen.is_active && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: `hsl(${hue} 70% 55% / 0.1)`, border: `1px solid hsl(${hue} 70% 55% / 0.2)` }}>
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `hsl(${hue} 70% 55%)` }} />
                          <span className="text-[9px] font-mono font-bold" style={{ color: `hsl(${hue} 70% 55%)` }}>ACTIVO</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold group-hover:text-foreground transition-colors mb-0.5">
                      Gen {String(genNum).padStart(2, '0')}
                    </h3>

                    {gen.name && (
                      <p className="text-[11px] text-muted-foreground/70 truncate mb-1">{gen.name}</p>
                    )}

                    {gen.start_date && (
                      <p className="text-[10px] text-muted-foreground/40 font-mono">
                        {new Date(gen.start_date).toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })}
                      </p>
                    )}

                    <ChevronRight className="absolute bottom-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" style={{ color: `hsl(${hue} 70% 55%)` }} />
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
          <Link to="/generations" className="inline-flex items-center gap-2 text-sm font-mono text-primary">
            Ver todas las generaciones <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
