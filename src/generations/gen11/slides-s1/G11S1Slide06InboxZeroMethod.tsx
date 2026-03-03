import { motion } from 'framer-motion';
import { Trash2, Forward, CheckCircle, Archive, Clock, Inbox } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const ACTIONS = [
  { icon: Trash2, label: 'ELIMINAR', desc: '¿Spam? ¿No te importa? → Borrar inmediatamente', time: '1s', color: G11.rose },
  { icon: Forward, label: 'DELEGAR', desc: '¿Es para otra persona? → Reenviar + archivar', time: '30s', color: G11.blue },
  { icon: CheckCircle, label: 'ACTUAR', desc: '¿Toma < 2 minutos? → Hazlo ahora mismo', time: '2min', color: G11.emerald },
  { icon: Archive, label: 'ARCHIVAR', desc: '¿Es referencia futura? → Archivar con etiqueta', time: '1s', color: G11.amber },
  { icon: Clock, label: 'DIFERIR', desc: '¿Requiere tiempo? → Bloquear en calendario', time: '10s', color: G11.purple },
];

export function G11S1Slide06InboxZeroMethod() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-16 py-10">
        <motion.div {...m(0)} className="mb-7">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: G11.blue.text }}>Módulo 01 — Inbox Zero</p>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none mb-2">Las 5</h2>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>Decisiones</h2>
          <G11GreenLine className="max-w-xs mb-3" />
          <p className="text-white/40 text-sm">Cada email que llega pasa por UNA de estas puertas. Sin excepciones.</p>
        </motion.div>

        {/* Inbox → Arrows */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Inbox */}
          <motion.div {...m(0.1)} className="flex-shrink-0 flex sm:flex-col items-center gap-3 p-4 rounded-xl border text-center"
            style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
            <Inbox className="w-8 h-8 text-white/50" />
            <div>
              <div className="text-white/70 text-sm font-bold">INBOX</div>
              <div className="text-white/30 text-[10px] mt-0.5">Cada email</div>
            </div>
          </motion.div>

          <motion.div {...m(0.12)} className="text-white/25 text-2xl hidden sm:block">→</motion.div>

          {/* 5 Actions */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div key={action.label} {...m(0.18 + i * 0.07)}
                  className="p-4 rounded-xl border"
                  style={{ borderColor: action.color.border, background: action.color.bg }}>
                  <div className="w-9 h-9 rounded-lg border flex items-center justify-center mb-3"
                    style={{ borderColor: action.color.border, background: 'rgba(0,0,0,0.25)' }}>
                    <Icon className="w-4 h-4" style={{ color: action.color.text }} />
                  </div>
                  <h4 className="text-white font-bold text-xs mb-1">{action.label}</h4>
                  <p className="text-white/40 text-[10px] leading-snug mb-2">{action.desc}</p>
                  <span className="text-[9px] font-mono font-bold" style={{ color: action.color.text }}>{action.time}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <motion.div {...m(0.65)} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="px-4 py-3 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-white/65 text-xs">💡 <strong>Gmail:</strong> Activa "Enviar y Archivar" en Configuración → General</span>
          </div>
          <div className="px-4 py-3 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-white/65 text-xs">💡 <strong>Outlook:</strong> "Mover a carpeta" + reglas automáticas por remitente</span>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
