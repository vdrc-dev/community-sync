/**
 * Slide 11 — Inbox Zero: 3 Pasos + Principios Clave
 * Merlin Mann, 2006
 */
import { motion } from 'framer-motion';
import { FolderKanban, Clock3, Zap } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const STEPS = [
  {
    num: '01', icon: FolderKanban, label: 'CLASIFICAR',
    desc: 'Crea 3 carpetas simples: Responder hoy, Esperando respuesta y Archivo. Nada más.',
    tags: ['RESPONDER', 'ESPERANDO', 'ARCHIVO'],
    accent: G11.blue,
  },
  {
    num: '02', icon: Clock3, label: 'PROCESAR EN BLOQUES',
    desc: 'Revisa correos 2–3 veces al día en bloques de 30 min. Fuera de eso, cierra el mail.',
    tags: ['30 MIN', '2–3x AL DÍA'],
    accent: G11.amber,
  },
  {
    num: '03', icon: Zap, label: 'AUTOMATIZAR',
    desc: 'Crea filtros y etiquetas para lo repetitivo. Gmail y Outlook lo hacen fácil.',
    tags: ['FILTROS', 'ETIQUETAS'],
    accent: G11.emerald,
  },
];

const PRINCIPLES = [
  { rule: 'Regla de los 2 min', detail: 'Si se responde en < 2 min, hazlo ahora. Si no, clasifícalo.' },
  { rule: 'Elimina lo irrelevante', detail: 'Si no es relevante, fuera de tu vista. Tu bandeja es un punto de tránsito.' },
  { rule: 'Desactiva notificaciones push', detail: 'En serio. Tu cerebro te lo va a agradecer.' },
];

export function G11S1Slide11InboxMethod() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 70% at 20% 50%, rgba(96,165,250,0.04), transparent 70%)'
      }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-8">

        <motion.div {...m(0)} className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.blue.text }}>
            Módulo 02 — Inbox Zero
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="text-5xl sm:text-6xl font-black text-white uppercase leading-none">3 Pasos</h2>
            <h2 className="text-5xl sm:text-6xl font-black uppercase leading-none" style={{ color: VDRC_GREEN }}>para</h2>
            <h2 className="text-5xl sm:text-6xl font-black text-white uppercase leading-none">Inbox Zero</h2>
          </div>
          <G11GreenLine className="max-w-[280px] mt-4 mb-2" />
          <p className="text-white/30 text-xs">Fuente: Merlin Mann, Inbox Zero Methodology (2006)</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* 3 steps */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num} {...m(0.1 + i * 0.08)}
                  className="p-5 rounded-2xl border relative overflow-hidden"
                  style={{ borderColor: step.accent.border, background: `linear-gradient(145deg, ${step.accent.bg}, rgba(0,0,0,0.35))` }}>
                  <div className="absolute -right-2 -bottom-3 text-7xl font-black leading-none select-none pointer-events-none"
                    style={{ color: step.accent.text, opacity: 0.06 }}>{step.num}</div>

                  <div className="w-9 h-9 rounded-xl border flex items-center justify-center mb-4"
                    style={{ borderColor: step.accent.border, background: 'rgba(0,0,0,0.4)' }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: step.accent.text }} />
                  </div>

                  <p className="text-[9px] font-black tracking-[0.2em] uppercase mb-2" style={{ color: step.accent.text }}>
                    {step.label}
                  </p>
                  <p className="text-white/45 text-[11px] leading-relaxed mb-3">{step.desc}</p>

                  <div className="flex flex-wrap gap-1">
                    {step.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono font-black border"
                        style={{ color: step.accent.text, borderColor: step.accent.border, background: 'rgba(0,0,0,0.3)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Principles */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <motion.div {...m(0.3)} className="p-4 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[9px] font-black tracking-widest uppercase text-white/30 mb-3">Principios Clave</p>
              <ul className="space-y-3">
                {PRINCIPLES.map((p, i) => (
                  <motion.li key={p.rule} {...m(0.35 + i * 0.06)} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: VDRC_GREEN }} />
                    <div>
                      <p className="text-white/70 text-xs font-black">{p.rule}</p>
                      <p className="text-white/35 text-[10px] leading-relaxed">{p.detail}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...m(0.55)} className="flex items-center gap-3 px-4 py-3 rounded-xl border"
              style={{ borderColor: G11.blue.border, background: G11.blue.bg }}>
              <div className="text-2xl font-black" style={{ color: G11.blue.text }}>120</div>
              <div className="text-white/40 text-xs">correos/día en promedio<br />por profesional</div>
            </motion.div>

            <motion.div {...m(0.6)} className="px-4 py-3 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-white/30 text-[10px]">
                📹 Tutorial: <span className="font-mono" style={{ color: G11.blue.text }}>youtube.com/watch?v=X-gsNORRJa8</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
