/**
 * Slide 10 — Inbox Zero: Antes vs Después
 * "El profesional promedio recibe 120 correos al día."
 */
import { motion } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const BEFORE = [
  'Bandeja desbordada, correos sin leer, ansiedad cada vez que abres el mail.',
  'Todo mezclado: trabajo, personal, suscripciones... un caos.',
  'Contraseñas duplicadas: riesgo de seguridad y tiempo perdido.',
];

const AFTER = [
  'Bandeja en cero, cada correo en su lugar. Tranquilidad real.',
  'Perfiles separados: trabajo y personal nunca se cruzan.',
  'Gestor de contraseñas: acceso seguro e inmediato.',
];

export function G11S1Slide10InboxProblems() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(96,165,250,0.04), transparent 80%)'
      }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">

        <motion.div {...m(0)} className="mb-7">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: G11.blue.text }}>
            Módulo 02 — Inbox Zero
          </p>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">
            ¿Te suena
          </h2>
          <h2 className="text-4xl sm:text-6xl font-black uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>
            familiar?
          </h2>
          <G11GreenLine className="max-w-[220px] mb-3" />
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: G11.blue.text }} />
            <p className="text-white/40 text-sm">El profesional promedio recibe <strong className="text-white/70">120 correos al día</strong>. Hay una forma mejor.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
          {/* BEFORE */}
          <motion.div {...m(0.12)} className="p-6 rounded-2xl border relative overflow-hidden"
            style={{ borderColor: G11.rose.border, background: `linear-gradient(145deg, ${G11.rose.bg}, rgba(0,0,0,0.35))` }}>
            <div className="absolute -right-4 -bottom-6 text-8xl font-black leading-none select-none pointer-events-none"
              style={{ color: G11.rose.text, opacity: 0.05 }}>✕</div>

            <div className="flex items-center gap-2 mb-5">
              <div className="px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase"
                style={{ background: 'rgba(251,113,133,0.15)', border: `1px solid ${G11.rose.border}`, color: G11.rose.text }}>
                ANTES · EL CAOS
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5 p-3 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(251,113,133,0.12)' }}>
              <div className="text-2xl font-black tabular-nums" style={{ color: G11.rose.text }}>3,412</div>
              <div className="text-white/40 text-xs">correos sin leer<br />en la bandeja</div>
            </div>

            <ul className="space-y-3">
              {BEFORE.map(b => (
                <li key={b} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(251,113,133,0.2)' }}>
                    <X className="w-3 h-3" style={{ color: G11.rose.text }} />
                  </div>
                  <span className="text-white/50 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AFTER */}
          <motion.div {...m(0.2)} className="p-6 rounded-2xl border relative overflow-hidden"
            style={{ borderColor: G11.emerald.border, background: `linear-gradient(145deg, rgba(61,153,112,0.12), rgba(0,0,0,0.35))` }}>
            <div className="absolute -right-4 -bottom-6 text-8xl font-black leading-none select-none pointer-events-none"
              style={{ color: G11.emerald.text, opacity: 0.05 }}>✓</div>

            <div className="flex items-center gap-2 mb-5">
              <div className="px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase"
                style={{ background: 'rgba(61,153,112,0.15)', border: `1px solid rgba(61,153,112,0.3)`, color: G11.emerald.text }}>
                DESPUÉS · EL ORDEN
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5 p-3 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(61,153,112,0.15)' }}>
              <div className="text-2xl font-black tabular-nums" style={{ color: VDRC_GREEN }}>0</div>
              <div>
                <div className="text-white/60 text-xs font-bold">INBOX ZERO</div>
                <div className="text-white/30 text-[10px]">achieved ✓</div>
              </div>
            </div>

            <ul className="space-y-3">
              {AFTER.map(a => (
                <li key={a} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(61,153,112,0.2)' }}>
                    <Check className="w-3 h-3" style={{ color: G11.emerald.text }} />
                  </div>
                  <span className="text-white/60 text-sm leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </G11Shell>
  );
}
