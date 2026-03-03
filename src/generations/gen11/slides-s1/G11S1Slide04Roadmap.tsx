import { motion } from 'framer-motion';
import { Sparkles, Brain, Palette, Code2, CheckCircle2 } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const WEEKS = [
  { num: 1, label: 'S1', title: 'Higiene Digital', desc: 'Email, navegadores, seguridad, contexto IA', icon: Sparkles, accent: G11.emerald, active: true },
  { num: 2, label: 'S2', title: 'IA & Productividad', desc: 'Prompt engineering, agentes, automatización', icon: Brain, accent: G11.blue, active: false },
  { num: 3, label: 'S3', title: 'Comunicación Visual', desc: 'Diseño, presentaciones, contenido con IA', icon: Palette, accent: G11.amber, active: false },
  { num: 4, label: 'S4', title: 'VibeCoding', desc: 'Desarrollo sin código, apps, deploy en vivo', icon: Code2, accent: G11.purple, active: false },
];

export function G11S1Slide04Roadmap() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(61,153,112,0.08), transparent 70%)'
        }} />
      }>
      <div className="relative z-10 w-full max-w-5xl px-8 sm:px-16">
        <motion.div {...m(0)} className="mb-10 sm:mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center" style={{ color: VDRC_GREEN }}>
            Programa General
          </p>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight text-center uppercase leading-none">
            4 Sesiones.
          </h2>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-center uppercase leading-none" style={{ color: VDRC_GREEN }}>
            De 0 a Productividad IA.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-[3.2rem] left-8 right-8 h-px hidden sm:block"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(61,153,112,0.3), rgba(61,153,112,0.3), transparent)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
            {WEEKS.map((week, i) => {
              const Icon = week.icon;
              return (
                <motion.div key={week.num} {...m(0.08 + i * 0.12)} className="relative">
                  <div className={`relative p-5 sm:p-6 rounded-2xl border ${week.active ? '' : 'opacity-60'}`}
                    style={{
                      borderColor: week.active ? week.accent.border : 'rgba(255,255,255,0.06)',
                      background: week.active
                        ? `linear-gradient(135deg, ${week.accent.bg}, rgba(0,0,0,0.3))`
                        : 'rgba(255,255,255,0.01)',
                      boxShadow: week.active ? `0 0 40px ${week.accent.glow}` : 'none',
                    }}>

                    {/* Active top bar */}
                    {week.active && (
                      <div className="absolute -top-px left-6 right-6 h-[2px] rounded-b-full" style={{ background: week.accent.dot }} />
                    )}

                    {/* Session label */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-black text-white/25 tracking-widest">{week.label}</span>
                      {week.active && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider"
                          style={{ background: week.accent.bg, color: week.accent.text, border: `1px solid ${week.accent.border}` }}>
                          AHORA
                        </div>
                      )}
                    </div>

                    <div className="w-11 h-11 rounded-xl border flex items-center justify-center mb-4"
                      style={{ background: 'rgba(0,0,0,0.4)', borderColor: week.accent.border }}>
                      <Icon className="w-5 h-5" style={{ color: week.accent.text }} />
                    </div>

                    <h3 className={`font-black text-base mb-2 leading-tight ${week.active ? 'text-white' : 'text-white/55'}`}>
                      {week.title}
                    </h3>
                    <p className="text-white/30 text-[11px] leading-relaxed">{week.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
