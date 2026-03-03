import { motion } from 'framer-motion';
import { Trash2, Forward, CheckCircle, Archive, Clock, Inbox } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const ACTIONS = [
  { icon: Trash2, label: 'ELIMINAR', desc: '¿Spam? ¿No te importa? → Borrar', time: '1s', color: G11.rose },
  { icon: Forward, label: 'DELEGAR', desc: '¿Es para otro? → Reenviar', time: '30s', color: G11.blue },
  { icon: CheckCircle, label: 'ACTUAR', desc: '¿< 2 minutos? → Hazlo ya', time: '2min', color: G11.emerald },
  { icon: Archive, label: 'ARCHIVAR', desc: '¿Referencia futura? → Archivar', time: '1s', color: G11.amber },
  { icon: Clock, label: 'DIFERIR', desc: '¿Requiere tiempo? → Calendar', time: '10s', color: G11.purple },
];

export function G11S1Slide06InboxZeroMethod() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_30%,_rgba(59,130,246,0.12),_transparent_70%)]" />}>
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-12">
        <motion.div {...m(0)} className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Inbox className="w-5 h-5" style={{ color: G11.blue.text }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: G11.blue.text }}>Módulo 01</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Las 5 Decisiones</h2>
          <p className="text-white/40 mt-2 text-sm">Cada email que llega pasa por UNA de estas 5 puertas. Sin excepciones.</p>
        </motion.div>

        {/* Flow: Inbox → 5 Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3">
          {/* Inbox Box */}
          <motion.div {...m(0.1)} className="flex-shrink-0 w-full sm:w-32 p-4 rounded-xl border text-center" style={{ borderColor: 'hsl(0 0% 100% / 0.1)', background: 'hsl(0 0% 100% / 0.02)' }}>
            <Inbox className="w-8 h-8 mx-auto mb-2 text-white/60" />
            <span className="text-white/70 text-sm font-bold">INBOX</span>
            <div className="text-white/30 text-[10px] mt-1">Cada email</div>
          </motion.div>

          {/* Arrow */}
          <motion.div {...m(0.15)} className="text-white/20 text-2xl hidden sm:block">→</motion.div>

          {/* 5 Actions */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-3">
            {ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div key={action.label} {...m(0.2 + i * 0.08)}
                  className="relative p-4 rounded-xl border backdrop-blur-sm"
                  style={{ borderColor: action.color.border, background: action.color.bg }}>
                  <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 sm:text-center">
                    <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: action.color.border, background: action.color.bg }}>
                      <Icon className="w-5 h-5" style={{ color: action.color.text }} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs">{action.label}</h4>
                      <p className="text-white/40 text-[10px] leading-snug mt-0.5">{action.desc}</p>
                      <span className="text-[9px] font-mono mt-1 block" style={{ color: action.color.text }}>{action.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <motion.div {...m(0.7)} className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="px-4 py-3 rounded-xl border bg-white/[0.02]" style={{ borderColor: 'hsl(0 0% 100% / 0.06)' }}>
            <span className="text-white/70 text-xs">💡 <strong>Gmail:</strong> Usa "Enviar y Archivar" — botón azul con ícono de carpeta</span>
          </div>
          <div className="px-4 py-3 rounded-xl border bg-white/[0.02]" style={{ borderColor: 'hsl(0 0% 100% / 0.06)' }}>
            <span className="text-white/70 text-xs">💡 <strong>Outlook:</strong> "Mover a carpeta" + reglas automáticas por remitente</span>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
