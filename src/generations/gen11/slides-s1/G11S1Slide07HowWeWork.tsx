/**
 * Slide 07 — Cómo Funcionaremos
 * 4 pilares: Exposiciones, Ejercicios, Retroalimentación, Tareas
 */
import { motion } from 'framer-motion';
import { Presentation, Wrench, MessageSquare, ClipboardList } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const PILLARS = [
  {
    num: '01', icon: Presentation, label: 'EXPOSICIONES',
    desc: 'Demos prácticas y ejemplos en vivo.',
    accent: G11.blue,
  },
  {
    num: '02', icon: Wrench, label: 'EJERCICIOS',
    desc: 'Momentos para experimentar y aplicar conceptos aprendidos.',
    accent: G11.emerald,
  },
  {
    num: '03', icon: MessageSquare, label: 'RETROALIMENTACIÓN',
    desc: 'Espacio para resolver dudas en cada sesión. Feedback activo siempre.',
    accent: G11.amber,
  },
  {
    num: '04', icon: ClipboardList, label: 'TAREAS',
    desc: 'Pequeños desafíos semanales para poner en práctica lo aprendido.',
    accent: G11.purple,
  },
];

export function G11S1Slide07HowWeWork() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 70% at 20% 50%, rgba(61,153,112,0.05), transparent 70%)'
      }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">

        <motion.div {...m(0)} className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: VDRC_GREEN }}>
            Módulo 01
          </p>
          <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">
            Cómo
          </h2>
          <h2 className="text-5xl sm:text-7xl font-black uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>
            Funcionaremos
          </h2>
          <G11GreenLine className="max-w-[220px] mb-4" />
          <p className="text-white/35 text-sm">
            Esto es un taller: prueben, erren, vuelvan a probar. <span className="text-white/20">La tecnología cambia, el método permanece.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-5xl">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.num} {...m(0.1 + i * 0.08)}
                className="p-5 rounded-2xl border relative overflow-hidden flex flex-col"
                style={{
                  borderColor: p.accent.border,
                  background: `linear-gradient(160deg, ${p.accent.bg}, rgba(0,0,0,0.45))`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                }}>
                <div className="absolute -right-2 -bottom-3 text-7xl font-black leading-none select-none pointer-events-none"
                  style={{ color: p.accent.text, opacity: 0.05 }}>{p.num}</div>

                <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-4"
                  style={{ borderColor: p.accent.border, background: 'rgba(0,0,0,0.4)' }}>
                  <Icon className="w-5 h-5" style={{ color: p.accent.text }} />
                </div>

                <p className="text-[9px] font-black tracking-[0.2em] uppercase mb-2"
                  style={{ color: p.accent.text }}>{p.label}</p>
                <p className="text-white/45 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.55)} className="mt-6">
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-white/35 text-xs italic">
              "La tecnología cambia, el método permanece."
            </span>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
