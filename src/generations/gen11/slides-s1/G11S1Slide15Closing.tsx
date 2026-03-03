import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Rocket, Mail, Chrome, Shield, Bot } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const TASKS = [
  { icon: Mail, text: 'Configurar Inbox Zero + 4 filtros básicos', accent: G11.blue },
  { icon: Chrome, text: 'Crear 2+ perfiles de navegador (Personal / Trabajo)', accent: G11.amber },
  { icon: Shield, text: 'Instalar Bitwarden + migrar 5 contraseñas', accent: G11.emerald },
  { icon: Bot, text: 'Escribir tu manual.md + configurar Custom Instructions', accent: G11.purple },
];

export function G11S1Slide15Closing() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,_rgba(16,185,129,0.15),_transparent_70%)]" />
      </>}>
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-4xl mx-auto">
        {/* Icon */}
        <motion.div {...m(0)} className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-2xl border flex items-center justify-center"
            style={{ background: G11.emerald.bg, borderColor: G11.emerald.border, boxShadow: `0 0 40px ${G11.emerald.glow}` }}>
            <Rocket className="w-10 h-10" style={{ color: G11.emerald.text }} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div {...m(0.1)}>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">Misión Semanal</h1>
          <p className="text-white/40 text-sm mb-8">Completa antes de la próxima clase — todo se puede hacer en una tarde</p>
        </motion.div>

        {/* Tasks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 text-left">
          {TASKS.map((task, i) => {
            const Icon = task.icon;
            return (
              <motion.div key={task.text} {...m(0.2 + i * 0.08)}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border bg-white/[0.02]"
                style={{ borderColor: task.accent.border }}>
                <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0"
                  style={{ background: task.accent.bg, borderColor: task.accent.border }}>
                  <Icon className="w-5 h-5" style={{ color: task.accent.text }} />
                </div>
                <span className="text-white/70 text-sm">{task.text}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar visual */}
        <motion.div {...m(0.6)} className="mb-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-2">
              <div className="w-12 h-2 rounded-full" style={{ background: G11.emerald.dot, boxShadow: `0 0 10px ${G11.emerald.glow}` }} />
              <div className="w-12 h-2 rounded-full bg-white/10" />
              <div className="w-12 h-2 rounded-full bg-white/10" />
              <div className="w-12 h-2 rounded-full bg-white/10" />
            </div>
            <span className="text-white/40 text-xs">25% del taller</span>
          </div>
        </motion.div>

        {/* Next week teaser */}
        <motion.div {...m(0.7)} className="flex items-center justify-center gap-3">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, hsl(160 65% 50% / 0.3))' }} />
          <span className="text-sm font-medium" style={{ color: G11.emerald.text }}>Próxima semana: IA & Productividad</span>
          <ArrowRight className="w-4 h-4" style={{ color: G11.emerald.text }} />
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, hsl(160 65% 50% / 0.3), transparent)' }} />
        </motion.div>

        {/* Quote */}
        <motion.div {...m(0.8)} className="mt-6">
          <p className="text-white/20 text-xs italic">"Si no tienes los cimientos, la IA amplifica el caos. Si los tienes, amplifica tu productividad."</p>
        </motion.div>
      </div>
    </G11Shell>
  );
}
