import { motion } from 'framer-motion';
import { Mail, Globe, Shield, Bot } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const MODULES = [
  {
    num: '01', title: 'Contexto y Fundamentos',
    desc: 'Quién soy, misión, afilar la sierra y metodología',
    icon: Bot, accent: G11.emerald, time: '15 min',
  },
  {
    num: '02', title: 'Inbox Zero',
    desc: 'Libera tu bandeja de entrada y tu mente',
    icon: Mail, accent: G11.blue, time: '20 min',
  },
  {
    num: '03', title: 'Navegadores y Perfiles',
    desc: 'Separa tu vida digital en espacios definidos',
    icon: Globe, accent: G11.amber, time: '15 min',
  },
  {
    num: '04', title: 'Contraseñas y Seguridad',
    desc: 'Protege tu identidad digital con Bitwarden',
    icon: Shield, accent: G11.purple, time: '15 min',
  },
];

export function G11S1Slide02Agenda() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 70% at 18% 50%, rgba(61,153,112,0.05), transparent 70%)' }} />

      <div className="relative z-10 w-full flex gap-12 items-center px-12 sm:px-20 py-12">

        {/* Left: header */}
        <div className="flex-shrink-0 w-[240px] hidden sm:flex flex-col justify-center">
          <motion.div {...m(0)}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: VDRC_GREEN }}>
              Sesión 1 · 2026
            </p>
            <h2 className="text-6xl font-black text-white tracking-tight uppercase leading-none">
              AGENDA
            </h2>
            <h3 className="text-3xl font-black uppercase leading-none mb-5" style={{ color: VDRC_GREEN }}>
              de Hoy
            </h3>
            <G11GreenLine className="mb-5 max-w-[160px]" />
            <p className="text-white/35 text-xs leading-relaxed">
              Productividad desde<br />los cimientos.
            </p>
          </motion.div>

          <motion.div {...m(0.15)} className="mt-8">
            <div className="inline-flex flex-col items-center px-5 py-4 rounded-2xl border"
              style={{ borderColor: G11.emerald.border, background: 'rgba(61,153,112,0.06)' }}>
              <span className="text-4xl font-black tabular-nums" style={{ color: VDRC_GREEN }}>90</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-white/35 mt-0.5">Minutos</span>
            </div>
          </motion.div>
        </div>

        {/* Right: module cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div key={mod.num} {...m(0.1 + i * 0.08)}
                className="flex items-start gap-4 p-5 rounded-xl border relative overflow-hidden"
                style={{ borderColor: mod.accent.border, background: `linear-gradient(135deg, ${mod.accent.bg}, rgba(0,0,0,0.2))` }}>
                {/* Number watermark */}
                <div className="absolute right-3 bottom-1 text-7xl font-black tabular-nums leading-none select-none pointer-events-none"
                  style={{ color: mod.accent.text, opacity: 0.06 }}>{mod.num}</div>

                <div className="w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: mod.accent.border, background: 'rgba(0,0,0,0.35)' }}>
                  <Icon className="w-5 h-5" style={{ color: mod.accent.text }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono text-white/25 font-bold tracking-widest">MOD {mod.num}</span>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border"
                      style={{ color: mod.accent.text, borderColor: mod.accent.border, background: 'rgba(0,0,0,0.3)' }}>
                      {mod.time}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-sm leading-tight mb-1.5">{mod.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{mod.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </G11Shell>
  );
}
