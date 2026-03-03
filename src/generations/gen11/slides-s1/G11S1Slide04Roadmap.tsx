import { motion } from 'framer-motion';
import { Sparkles, Brain, Palette, Code2, CheckCircle } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const WEEKS = [
  { num: 1, title: 'Higiene Digital', desc: 'Email, navegadores, seguridad, contexto IA', icon: Sparkles, accent: G11.emerald, active: true },
  { num: 2, title: 'IA & Productividad', desc: 'Prompt engineering, agentes, automatización', icon: Brain, accent: G11.blue, active: false },
  { num: 3, title: 'Comunicación Visual', desc: 'Diseño, presentaciones, contenido con IA', icon: Palette, accent: G11.amber, active: false },
  { num: 4, title: 'VibeCoding', desc: 'Desarrollo sin código, apps, deploy', icon: Code2, accent: G11.purple, active: false },
];

export function G11S1Slide04Roadmap() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(16,185,129,0.1),_transparent_70%)]" />}>
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-12">
        <motion.div {...m(0)} className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Roadmap de las 4 Semanas</h2>
          <p className="text-white/40 mt-2">De los fundamentos al desarrollo con IA</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 hidden sm:block" />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
            {WEEKS.map((week, i) => {
              const Icon = week.icon;
              return (
                <motion.div key={week.num} {...m(0.1 + i * 0.12)} className="relative">
                  <div className={`relative p-5 sm:p-6 rounded-2xl border backdrop-blur-sm ${week.active ? 'bg-white/[0.04]' : 'bg-white/[0.01]'}`}
                    style={{ borderColor: week.active ? week.accent.border : 'hsl(0 0% 100% / 0.06)', boxShadow: week.active ? `0 0 30px ${week.accent.glow}` : 'none' }}>

                    {/* Active indicator */}
                    {week.active && <div className="absolute -top-px left-4 right-4 h-[2px] rounded-b-full" style={{ background: week.accent.dot }} />}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${week.active ? '' : 'opacity-50'}`}
                        style={{ background: week.accent.bg, borderColor: week.accent.border }}>
                        <Icon className="w-5 h-5" style={{ color: week.accent.text }} />
                      </div>
                      <span className="text-xs font-mono font-bold text-white/30">S{week.num}</span>
                      {week.active && <CheckCircle className="w-4 h-4 ml-auto" style={{ color: week.accent.text }} />}
                    </div>

                    <h3 className={`font-bold text-base mb-1 ${week.active ? 'text-white' : 'text-white/60'}`}>{week.title}</h3>
                    <p className="text-white/30 text-xs leading-relaxed">{week.desc}</p>
                  </div>

                  {/* Connector dot */}
                  {i < WEEKS.length - 1 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom badge */}
        <motion.div {...m(0.7)} className="mt-8 flex justify-center">
          <div className="px-5 py-2 rounded-full border text-xs font-medium" style={{ color: G11.emerald.text, borderColor: G11.emerald.border, background: G11.emerald.bg }}>
            ✦ Estás aquí — Semana 1
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
