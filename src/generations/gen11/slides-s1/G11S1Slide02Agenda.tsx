import { motion } from 'framer-motion';
import { Mail, Chrome, Shield, Bot, Clock } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import inboxImg from '@/assets/gen11-inbox-icon.png';

const MODULES = [
  { num: '01', title: 'Inbox Zero', desc: 'Método de las 5 decisiones para email sin ansiedad', icon: Mail, accent: G11.blue, time: '20 min' },
  { num: '02', title: 'Navegadores', desc: 'Perfiles separados por contexto + extensiones clave', icon: Chrome, accent: G11.amber, time: '15 min' },
  { num: '03', title: 'Seguridad Digital', desc: 'Bitwarden, 2FA y password hygiene definitiva', icon: Shield, accent: G11.emerald, time: '15 min' },
  { num: '04', title: 'Context Engineering', desc: 'Tu Manual Digital para que la IA te entienda', icon: Bot, accent: G11.purple, time: '20 min' },
];

export function G11S1Slide02Agenda() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Subtle bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 70% at 20% 50%, rgba(61,153,112,0.05), transparent 70%)' }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-12">
        <motion.div {...m(0)} className="mb-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: VDRC_GREEN }}>Agenda de Hoy</p>
          <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">
            4 Módulos
          </h2>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight uppercase leading-none mb-5" style={{ color: VDRC_GREEN }}>
            90 Minutos
          </h2>
          <G11GreenLine className="max-w-sm mb-3" />
          <p className="text-white/40 text-sm mt-2">Los cimientos digitales antes de usar IA en serio</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div key={mod.num} {...m(0.12 + i * 0.08)}
                className="flex items-start gap-4 p-5 rounded-xl border relative overflow-hidden"
                style={{ borderColor: mod.accent.border, background: `linear-gradient(135deg, ${mod.accent.bg}, rgba(0,0,0,0.2))` }}>
                {/* Number watermark */}
                <div className="absolute right-4 bottom-2 text-6xl font-black tabular-nums leading-none select-none pointer-events-none"
                  style={{ color: mod.accent.text, opacity: 0.06 }}>{mod.num}</div>

                <div className="w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: mod.accent.border, background: 'rgba(0,0,0,0.35)' }}>
                  <Icon className="w-6 h-6" style={{ color: mod.accent.text }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-white/25 font-bold tracking-widest">{mod.num}</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border"
                      style={{ borderColor: mod.accent.border, background: 'rgba(0,0,0,0.25)' }}>
                      <Clock className="w-2.5 h-2.5" style={{ color: mod.accent.text }} />
                      <span className="text-[9px] font-mono font-bold" style={{ color: mod.accent.text }}>{mod.time}</span>
                    </div>
                  </div>
                  <h3 className="text-white font-black text-base mb-1">{mod.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{mod.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </G11Shell>
  );
}
