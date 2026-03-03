import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Mail, Chrome, Shield, Bot } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine, G11BrainDecor } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const TASKS = [
  { icon: Mail, text: 'Configurar Inbox Zero + 4 filtros básicos en Gmail/Outlook', accent: G11.blue },
  { icon: Chrome, text: 'Crear 2+ perfiles de navegador (Personal / Trabajo)', accent: G11.amber },
  { icon: Shield, text: 'Instalar Bitwarden + migrar 5 contraseñas clave', accent: G11.emerald },
  { icon: Bot, text: 'Escribir tu manual.md + configurar Custom Instructions', accent: G11.purple },
];

export function G11S1Slide15Closing() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Left content */}
      <div className="relative z-10 flex flex-col justify-center w-full sm:w-[56%] px-12 sm:px-20 py-12">
        <motion.div {...m(0)} className="mb-7">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: VDRC_GREEN }}>Cierre de Sesión 1</p>
          <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">Misión</h2>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight uppercase leading-none mb-5" style={{ color: VDRC_GREEN }}>Semanal</h2>
          <G11GreenLine className="max-w-xs mb-3" />
          <p className="text-white/40 text-sm">Completa antes de la próxima clase — todo se hace en una tarde</p>
        </motion.div>

        {/* Tasks */}
        <div className="space-y-2.5 mb-7">
          {TASKS.map((task, i) => {
            const Icon = task.icon;
            return (
              <motion.div key={task.text} {...m(0.12 + i * 0.08)}
                className="flex items-center gap-4 p-4 rounded-xl border relative overflow-hidden"
                style={{ borderColor: task.accent.border, background: `linear-gradient(135deg, ${task.accent.bg}, rgba(0,0,0,0.2))` }}>
                <div className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: task.accent.border, background: 'rgba(0,0,0,0.35)' }}>
                  <Icon className="w-4 h-4" style={{ color: task.accent.text }} />
                </div>
                <span className="text-white/70 text-sm flex-1">{task.text}</span>
                <div className="w-5 h-5 rounded-full border-2 flex-shrink-0" style={{ borderColor: task.accent.border }} />
              </motion.div>
            );
          })}
        </div>

        {/* Progress */}
        <motion.div {...m(0.6)} className="mb-5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-12 h-1.5 rounded-full" style={{ background: VDRC_GREEN }} />
              {[1,2,3].map(i => <div key={i} className="w-12 h-1.5 rounded-full bg-white/10" />)}
            </div>
            <span className="text-white/35 text-xs font-mono">Sesión 1 / 4 · 25%</span>
          </div>
        </motion.div>

        {/* Next class */}
        <motion.div {...m(0.72)} className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${VDRC_GREEN})` }} />
          <span className="text-sm font-bold" style={{ color: VDRC_GREEN }}>Próxima sesión: IA &amp; Productividad</span>
          <ArrowRight className="w-4 h-4" style={{ color: VDRC_GREEN }} />
        </motion.div>

        <motion.div {...m(0.82)}>
          <p className="text-white/20 text-xs italic max-w-md leading-relaxed">
            "Si no tienes los cimientos, la IA amplifica el caos. Si los tienes, amplifica tu productividad."
          </p>
        </motion.div>
      </div>

      {/* Right brain visual */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[46%] overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-28 z-10"
          style={{ background: 'linear-gradient(90deg, #181c1b, transparent)' }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 80% at 60% 50%, rgba(61,153,112,0.10), transparent 70%)'
        }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <G11BrainDecor className="w-[90%] h-[90%]" />
        </motion.div>
      </div>
    </G11Shell>
  );
}
