import { motion } from 'framer-motion';
import { Mail, Chrome, Shield, Bot, Clock, Target } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const MODULES = [
  { num: '01', title: 'Inbox Zero', desc: 'Método de las 5 decisiones para email', icon: Mail, accent: G11.blue, time: '20 min' },
  { num: '02', title: 'Navegadores', desc: 'Perfiles separados por contexto + extensiones', icon: Chrome, accent: G11.amber, time: '15 min' },
  { num: '03', title: 'Seguridad Digital', desc: 'Bitwarden, 2FA y password hygiene', icon: Shield, accent: G11.emerald, time: '15 min' },
  { num: '04', title: 'Context Engineering', desc: 'Tu Manual Digital para que la IA te entienda', icon: Bot, accent: G11.purple, time: '20 min' },
];

export function G11S1Slide02Agenda() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,_rgba(16,185,129,0.15),_transparent_70%)]" />}>
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-12">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5" style={{ color: G11.emerald.text }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: G11.emerald.text }}>Agenda de Hoy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">4 Módulos, 90 Minutos</h2>
          <p className="text-white/40 mt-2 text-sm sm:text-base">Los cimientos digitales que necesitas antes de usar IA</p>
        </motion.div>

        {/* Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div key={mod.num} {...m(0.15 + i * 0.1)}
                className="relative p-[1px] rounded-2xl overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${mod.accent.border}, transparent 60%)` }}>
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl border flex items-center justify-center"
                    style={{ background: mod.accent.bg, borderColor: mod.accent.border, boxShadow: `0 0 20px ${mod.accent.glow}` }}>
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
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1">{mod.title}</h3>
                    <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <motion.div {...m(0.7)} className="mt-6 sm:mt-8 flex justify-center">
          <div className="flex items-center gap-4 px-6 py-3 rounded-full border bg-white/[0.02]" style={{ borderColor: 'hsl(160 40% 40% / 0.15)' }}>
            <Clock className="w-4 h-4 text-white/40" />
            <span className="text-white/50 text-sm">Total: <strong className="text-white/80">~90 min</strong></span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-white/50 text-sm">Nivel: <strong style={{ color: G11.emerald.text }}>Fundamentos</strong></span>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
