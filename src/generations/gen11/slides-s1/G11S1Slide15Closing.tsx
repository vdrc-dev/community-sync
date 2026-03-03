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
      <div className="relative z-10 flex flex-col justify-center w-full sm:w-[58%] px-12 sm:px-16 py-12">
        <motion.div {...m(0)} className="mb-7">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: VDRC_GREEN }}>Cierre de Sesión 1</p>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none mb-2">Misión</h2>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>Semanal</h2>
          <G11GreenLine className="max-w-xs mb-3" />
          <p className="text-white/40 text-sm">Completa antes de la próxima clase — todo se hace en una tarde</p>
        </motion.div>

        {/* Tasks */}
        <div className="space-y-3 mb-7">
          {TASKS.map((task, i) => {
            const Icon = task.icon;
            return (
              <motion.div key={task.text} {...m(0.15 + i * 0.08)}
                className="flex items-center gap-4 p-4 rounded-xl border"
                style={{ borderColor: task.accent.border, background: task.accent.bg }}>
                <div className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: task.accent.border, background: 'rgba(0,0,0,0.3)' }}>
                  <Icon className="w-4 h-4" style={{ color: task.accent.text }} />
                </div>
                <span className="text-white/70 text-sm flex-1">{task.text}</span>
                <CheckCircle className="w-4 h-4 text-white/15 flex-shrink-0" />
              </motion.div>
            );
          })}
        </div>

        {/* Progress */}
        <motion.div {...m(0.6)} className="mb-5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-10 h-1.5 rounded-full" style={{ background: VDRC_GREEN }} />
              {[1,2,3].map(i => <div key={i} className="w-10 h-1.5 rounded-full bg-white/10" />)}
            </div>
            <span className="text-white/40 text-xs">Sesión 1 de 4 — 25% completado</span>
          </div>
        </motion.div>

        {/* Next class */}
        <motion.div {...m(0.7)} className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${VDRC_GREEN})` }} />
          <span className="text-sm font-semibold" style={{ color: VDRC_GREEN }}>Próxima sesión: IA & Productividad</span>
          <ArrowRight className="w-4 h-4" style={{ color: VDRC_GREEN }} />
        </motion.div>

        <motion.div {...m(0.8)} className="mt-5">
          <p className="text-white/20 text-xs italic max-w-md">
            "Si no tienes los cimientos, la IA amplifica el caos. Si los tienes, amplifica tu productividad."
          </p>
        </motion.div>
      </div>

      {/* Right decor */}
      <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-[44%] items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 60% 50%, rgba(61,153,112,0.10), transparent 70%)' }} />
        <G11BrainDecor className="w-[80%] aspect-square" />
      </div>
    </G11Shell>
  );
}
