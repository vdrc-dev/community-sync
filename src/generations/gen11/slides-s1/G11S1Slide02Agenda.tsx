import { motion } from 'framer-motion';
import { Mail, Chrome, Shield, Bot, Clock } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const MODULES = [
  { num: '01', title: 'Inbox Zero', desc: 'Método de las 5 decisiones para email', icon: Mail, accent: G11.blue, time: '20 min' },
  { num: '02', title: 'Navegadores', desc: 'Perfiles separados por contexto + extensiones', icon: Chrome, accent: G11.amber, time: '15 min' },
  { num: '03', title: 'Seguridad Digital', desc: 'Bitwarden, 2FA y password hygiene', icon: Shield, accent: G11.emerald, time: '15 min' },
  { num: '04', title: 'Context Engineering', desc: 'Tu Manual Digital para que la IA te entienda', icon: Bot, accent: G11.purple, time: '20 min' },
];

export function G11S1Slide02Agenda() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-16 py-12">
        <motion.div {...m(0)} className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: VDRC_GREEN }}>Agenda de Hoy</p>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none mb-2">
            4 Módulos
          </h2>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>
            90 Minutos
          </h2>
          <G11GreenLine className="max-w-sm mb-2" />
          <p className="text-white/40 text-sm mt-3">Los cimientos digitales antes de usar IA en serio</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div key={mod.num} {...m(0.15 + i * 0.08)}
                className="flex items-start gap-4 p-5 rounded-xl border"
                style={{ borderColor: mod.accent.border, background: mod.accent.bg }}>
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: mod.accent.border, background: 'rgba(0,0,0,0.3)' }}>
                  <Icon className="w-6 h-6" style={{ color: mod.accent.text }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-white/30 font-bold">{mod.num}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/30" />
                      <span className="text-[10px] text-white/30 font-mono">{mod.time}</span>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-base mb-1">{mod.title}</h3>
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
