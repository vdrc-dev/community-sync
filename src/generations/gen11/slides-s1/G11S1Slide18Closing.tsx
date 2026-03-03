/**
 * Slide 18 — Cierre: Trayecto + Misión Semanal
 */
import { motion } from 'framer-motion';
import { Mail, Globe, Shield, Bot, ArrowRight } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine, G11BrainDecor } from './Shell';
import { G11, VDRC_GREEN, VDRC_GREEN_DIM } from './theme';

const TASKS = [
  { icon: Mail, text: 'Mantener Inbox Zero por 3 días', accent: G11.blue },
  { icon: Globe, text: 'Configurar perfiles de navegador (Personal / Trabajo)', accent: G11.amber },
  { icon: Shield, text: 'Instalar Bitwarden + migrar al menos 5 contraseñas', accent: G11.emerald },
  { icon: Bot, text: 'Configurar instrucciones personalizadas en ChatGPT o Claude', accent: G11.purple },
];

export function G11S1Slide18Closing() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* LEFT */}
      <div className="relative z-10 flex flex-col justify-center w-full sm:w-[55%] px-12 sm:px-20 py-12">

        <motion.div {...m(0)} className="mb-7">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: VDRC_GREEN }}>
            Cierre de Sesión 1
          </p>
          <h2 className="text-5xl sm:text-7xl font-black text-white uppercase leading-none">Misión</h2>
          <h2 className="text-5xl sm:text-7xl font-black uppercase leading-none mb-5" style={{ color: VDRC_GREEN }}>Semanal</h2>
          <G11GreenLine className="max-w-[200px] mb-3" />
          <p className="text-white/35 text-sm">
            No busques la perfección. Busca consistencia.<br />Con 3 días de práctica ya se nota el cambio.
          </p>
        </motion.div>

        {/* Task checklist */}
        <div className="space-y-2.5 mb-7">
          {TASKS.map((task, i) => {
            const Icon = task.icon;
            return (
              <motion.div key={task.text} {...m(0.12 + i * 0.07)}
                className="flex items-center gap-4 p-4 rounded-xl border relative overflow-hidden"
                style={{ borderColor: task.accent.border, background: `linear-gradient(135deg, ${task.accent.bg}, rgba(0,0,0,0.2))` }}>
                <div className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: task.accent.border, background: 'rgba(0,0,0,0.35)' }}>
                  <Icon className="w-4 h-4" style={{ color: task.accent.text }} />
                </div>
                <span className="text-white/65 text-sm flex-1 leading-snug">{task.text}</span>
                {/* Empty checkbox */}
                <div className="w-5 h-5 rounded border-2 flex-shrink-0" style={{ borderColor: task.accent.border }} />
              </motion.div>
            );
          })}
        </div>

        {/* Session progress */}
        <motion.div {...m(0.6)} className="mb-5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-12 h-1.5 rounded-full" style={{ background: VDRC_GREEN }} />
              {[1,2,3].map(i => <div key={i} className="w-12 h-1.5 rounded-full bg-white/10" />)}
            </div>
            <span className="text-white/30 text-xs font-mono">Sesión 1 / 4 · 25%</span>
          </div>
        </motion.div>

        {/* Next session */}
        <motion.div {...m(0.72)} className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${VDRC_GREEN})` }} />
          <span className="text-sm font-black" style={{ color: VDRC_GREEN }}>
            S2: IA &amp; Productividad
          </span>
          <ArrowRight className="w-4 h-4" style={{ color: VDRC_GREEN }} />
        </motion.div>

        <motion.div {...m(0.82)}>
          <p className="text-white/18 text-xs italic max-w-md leading-relaxed">
            "Tu escritorio digital merece el mismo orden que tu escritorio físico. El objetivo no es la perfección inmediata, sino comenzar a desarrollar hábitos consistentes."
          </p>
        </motion.div>
      </div>

      {/* RIGHT — brain */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[47%] overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-28 z-10"
          style={{ background: 'linear-gradient(90deg, #181c1b, transparent)' }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 80% at 60% 50%, rgba(61,153,112,0.08), transparent 70%)'
        }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <G11BrainDecor className="w-[90%] h-[90%]" />
        </motion.div>
      </div>
    </G11Shell>
  );
}
