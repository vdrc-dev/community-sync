/**
 * Slide 05 — Mi Misión
 * 4 pillars: Cuestionen / Valoren / Deleguen / Concentren
 */
import { motion } from 'framer-motion';
import { HelpCircle, Timer, Cpu, Zap } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import missionHero from '@/assets/gen11-mission-hero.jpg';

const PILLARS = [
  {
    verb: 'Cuestionen',
    desc: 'Los paradigmas operativos tradicionales que les come el tiempo.',
    icon: HelpCircle, accent: G11.blue,
  },
  {
    verb: 'Valoren',
    desc: 'Su tiempo como el recurso más escaso e irrecuperable.',
    icon: Timer, accent: G11.amber,
  },
  {
    verb: 'Deleguen',
    desc: 'A la tecnología las tareas mecánicas y repetitivas.',
    icon: Cpu, accent: G11.emerald,
  },
  {
    verb: 'Concentren',
    desc: 'Su energía en resolver desafíos de alto impacto.',
    icon: Zap, accent: G11.purple,
  },
];

export function G11S1Slide05Mission() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={missionHero}
          alt=""
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(24,28,27,0.55)' }} />
        {/* Left fade for content readability */}
        <div className="absolute inset-y-0 left-0 w-[55%]"
          style={{ background: 'linear-gradient(90deg, #181c1b 40%, transparent 100%)' }} />
      </div>

      <div className="relative z-10 w-full flex gap-10 px-12 sm:px-20 py-10 items-center">

        {/* LEFT: title */}
        <div className="flex-shrink-0 w-[220px] hidden sm:flex flex-col justify-center">
          <motion.div {...m(0)}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: VDRC_GREEN }}>
              Módulo 01
            </p>
            <h2 className="text-5xl font-black text-white uppercase leading-none">Mi</h2>
            <h2 className="text-5xl font-black uppercase leading-none mb-5" style={{ color: VDRC_GREEN }}>Misión</h2>
            <G11GreenLine className="mb-5 max-w-[140px]" />
            <p className="text-white/30 text-xs leading-relaxed">
              La tecnología no es el fin,<br />sino el medio.
            </p>
          </motion.div>

          {/* Bottom quote */}
          <motion.div {...m(0.5)} className="mt-8 p-4 rounded-xl border"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-white/25 text-[10px] italic leading-relaxed">
              "Automatizar lo trivial libera el potencial para crear, innovar y generar valor."
            </p>
          </motion.div>
        </div>

        {/* RIGHT: 2x2 pillar grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.verb} {...m(0.08 + i * 0.08)}
                className="p-6 rounded-2xl border relative overflow-hidden"
                style={{ borderColor: p.accent.border, background: `linear-gradient(145deg, ${p.accent.bg}, rgba(0,0,0,0.3))` }}>
                {/* Watermark */}
                <div className="absolute -right-3 -bottom-4 text-8xl font-black leading-none select-none pointer-events-none"
                  style={{ color: p.accent.text, opacity: 0.05 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{ borderColor: p.accent.border, background: 'rgba(0,0,0,0.4)' }}>
                    <Icon className="w-5 h-5" style={{ color: p.accent.text }} />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mb-3 leading-none">
                  {p.verb}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </G11Shell>
  );
}
