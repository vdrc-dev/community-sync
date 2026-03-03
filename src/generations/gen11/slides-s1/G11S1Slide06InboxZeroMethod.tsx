import { motion } from 'framer-motion';
import { Trash2, Forward, CheckCircle, Archive, Clock, Inbox } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import inboxImg from '@/assets/gen11-inbox-icon.png';

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

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">
        <div className="flex items-start gap-10">
          {/* Left: title + inbox visual */}
          <div className="flex-shrink-0 w-[220px] hidden sm:flex flex-col gap-5">
            <motion.div {...m(0)}>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.blue.text }}>Módulo 01</p>
              <h2 className="text-4xl font-black text-white uppercase leading-none mb-1">Las 5</h2>
              <h2 className="text-4xl font-black uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>Decisiones</h2>
              <G11GreenLine className="mb-3" />
              <p className="text-white/35 text-xs leading-relaxed">Cada email pasa por UNA puerta. Sin excepciones.</p>
            </motion.div>

            <motion.div {...m(0.1)}
              className="relative overflow-hidden rounded-xl border p-4"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
              <img src={inboxImg} alt="Inbox" className="w-full aspect-square object-contain rounded-lg mb-3 opacity-80" />
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-white/40" />
                <div>
                  <div className="text-white/60 text-xs font-bold">INBOX</div>
                  <div className="text-white/25 text-[10px]">Cada email</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: 5 Actions */}
          <div className="flex-1">
            <motion.div {...m(0.05)} className="sm:hidden mb-6">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.blue.text }}>Módulo 01</p>
              <h2 className="text-4xl font-black text-white uppercase leading-none">Las 5 <span style={{ color: VDRC_GREEN }}>Decisiones</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {ACTIONS.map((action, i) => {
                const Icon = action.icon;
                return (
                  <motion.div key={action.label} {...m(0.12 + i * 0.07)}
                    className="p-4 rounded-xl border relative overflow-hidden"
                    style={{ borderColor: action.color.border, background: `linear-gradient(160deg, ${action.color.bg}, rgba(0,0,0,0.25))` }}>
                    {/* Watermark */}
                    <div className="absolute -right-2 -bottom-3 text-5xl font-black select-none pointer-events-none leading-none"
                      style={{ color: action.color.text, opacity: 0.06 }}>{String(i + 1)}</div>

                    <div className="w-9 h-9 rounded-lg border flex items-center justify-center mb-3"
                      style={{ borderColor: action.color.border, background: 'rgba(0,0,0,0.3)' }}>
                      <Icon className="w-4 h-4" style={{ color: action.color.text }} />
                    </div>
                    <h4 className="text-white font-black text-xs mb-1.5 tracking-wide">{action.label}</h4>
                    <p className="text-white/40 text-[10px] leading-snug mb-3">{action.desc}</p>
                    <div className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-mono font-bold"
                      style={{ color: action.color.text, background: 'rgba(0,0,0,0.3)', border: `1px solid ${action.color.border}` }}>
                      {action.time}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div {...m(0.65)} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <span className="text-white/55 text-xs">💡 <strong className="text-white/75">Gmail:</strong> Activa "Enviar y Archivar" en Configuración → General</span>
              </div>
              <div className="px-4 py-3 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <span className="text-white/55 text-xs">💡 <strong className="text-white/75">Outlook:</strong> "Mover a carpeta" + reglas automáticas por remitente</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
