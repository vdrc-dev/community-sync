/**
 * Slide 06 — Afilar la Sierra (Stephen Covey Hábito #7)
 * 3 dimensiones: Física, Mental, Social
 */
import { motion } from 'framer-motion';
import { Dumbbell, BookOpen, Heart } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const DIMS = [
  {
    icon: Dumbbell,
    label: 'FÍSICA',
    sublabel: 'Cuerpo',
    desc: 'Ejercicio, nutrición y descanso.',
    accent: G11.rose,
  },
  {
    icon: BookOpen,
    label: 'MENTAL',
    sublabel: 'Mente',
    desc: 'Lectura, reflexión, planificación.\n\nEl foco de estos talleres.',
    accent: G11.blue,
    highlight: true,
  },
  {
    icon: Heart,
    label: 'SOCIAL',
    sublabel: 'Conexión',
    desc: 'Relaciones significativas, meditación, conexión con valores personales.',
    accent: G11.amber,
  },
];

export function G11S1Slide06SharpenSaw() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 65% 70% at 50% 50%, rgba(61,153,112,0.04), transparent 80%)'
      }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">

        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: VDRC_GREEN }}>
            Módulo 01 — Fundamentos
          </p>
          <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">
            Afilar
          </h2>
          <h2 className="text-5xl sm:text-7xl font-black uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>
            la Sierra
          </h2>
          <G11GreenLine className="max-w-[220px] mb-4" />
          <p className="text-white/35 text-sm max-w-lg">
            Stephen Covey — Hábito #7. Invertir en ti mismo es la inversión más estratégica.
          </p>
        </motion.div>

        {/* 3 dimension cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl">
          {DIMS.map((dim, i) => {
            const Icon = dim.icon;
            return (
              <motion.div key={dim.label} {...m(0.1 + i * 0.1)}
                className="p-6 rounded-2xl border relative overflow-hidden"
                style={{
                  borderColor: dim.highlight ? VDRC_GREEN : dim.accent.border,
                  background: dim.highlight
                    ? `linear-gradient(145deg, rgba(61,153,112,0.12), rgba(0,0,0,0.4))`
                    : `linear-gradient(145deg, ${dim.accent.bg}, rgba(0,0,0,0.3))`,
                  boxShadow: dim.highlight ? `0 0 40px rgba(61,153,112,0.12)` : undefined,
                }}>
                {/* watermark number */}
                <div className="absolute -right-2 -bottom-3 text-8xl font-black leading-none select-none pointer-events-none"
                  style={{ color: dim.accent.text, opacity: 0.05 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-5"
                  style={{
                    borderColor: dim.highlight ? VDRC_GREEN : dim.accent.border,
                    background: 'rgba(0,0,0,0.4)',
                  }}>
                  <Icon className="w-6 h-6" style={{ color: dim.highlight ? VDRC_GREEN : dim.accent.text }} />
                </div>

                <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-1"
                  style={{ color: dim.highlight ? VDRC_GREEN : dim.accent.text }}>
                  {dim.label}
                </p>
                <h3 className="text-2xl font-black text-white mb-3 uppercase">{dim.sublabel}</h3>
                <p className="text-white/45 text-sm leading-relaxed whitespace-pre-line">{dim.desc}</p>

                {dim.highlight && (
                  <div className="mt-4 px-3 py-2 rounded-lg inline-flex items-center gap-2"
                    style={{ background: 'rgba(61,153,112,0.12)', border: `1px solid rgba(61,153,112,0.3)` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: VDRC_GREEN }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: VDRC_GREEN }}>
                      Foco de este taller
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom insight */}
        <motion.div {...m(0.55)} className="mt-6 flex items-center gap-3">
          <div className="h-px w-8" style={{ background: VDRC_GREEN }} />
          <p className="text-white/30 text-xs italic">
            Afilar la sierra no es ocio. Es la inversión más estratégica: invertir en ti mismo.
          </p>
        </motion.div>
      </div>
    </G11Shell>
  );
}
