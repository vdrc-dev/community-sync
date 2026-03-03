/**
 * Slide 10b — Beneficios de la Higiene Digital
 * Página 11 del PPTX de Vicente: métricas -40%, +3h, 0 brechas
 */
import { motion } from 'framer-motion';
import { Clock, Shield, Brain, Cpu } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const METRICS = [
  {
    icon: Clock,
    value: '-40%',
    label: 'Tiempo perdido',
    desc: 'Dejas de perder 30 min diarios buscando correos y archivos.',
    accent: G11.rose,
  },
  {
    icon: Brain,
    value: '+3h',
    label: 'Deep Work',
    desc: 'Una bandeja limpia te da espacio mental para pensar y crear.',
    accent: G11.blue,
  },
  {
    icon: Shield,
    value: '0',
    label: 'Brechas de seguridad',
    desc: 'Contraseñas únicas y robustas protegen tu identidad digital.',
    accent: G11.emerald,
  },
  {
    icon: Cpu,
    value: '∞',
    label: 'Ready for AI',
    desc: 'Un sistema limpio es el prerequisito para aprovechar la IA al máximo.',
    accent: G11.purple,
  },
];

export function G11S1Slide10bBenefits() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(61,153,112,0.05), transparent 80%)'
      }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">

        <motion.div {...m(0)} className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: VDRC_GREEN }}>
            Módulo 02 — Inbox Zero
          </p>
          <h2 className="text-5xl sm:text-7xl font-black text-white uppercase leading-none">
            Beneficios de la
          </h2>
          <h2 className="text-5xl sm:text-7xl font-black uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>
            Higiene Digital
          </h2>
          <G11GreenLine className="max-w-[280px] mb-3" />
          <p className="text-white/35 text-sm">
            No es solo ordenar — es liberar tiempo y energía para lo que importa de verdad.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl">
          {METRICS.map((m2, i) => {
            const Icon = m2.icon;
            return (
              <motion.div key={m2.label} {...m(0.1 + i * 0.08)}
                className="p-6 rounded-2xl border flex flex-col items-start gap-3 relative overflow-hidden"
                style={{
                  borderColor: m2.accent.border,
                  background: `linear-gradient(145deg, ${m2.accent.bg}, rgba(0,0,0,0.35))`,
                }}>
                {/* Huge value watermark */}
                <div className="absolute -right-3 -bottom-2 font-black leading-none select-none pointer-events-none"
                  style={{ color: m2.accent.text, opacity: 0.07, fontSize: '5rem' }}>
                  {m2.value}
                </div>

                <div className="w-11 h-11 rounded-xl border flex items-center justify-center"
                  style={{ borderColor: m2.accent.border, background: 'rgba(0,0,0,0.4)' }}>
                  <Icon className="w-5 h-5" style={{ color: m2.accent.text }} />
                </div>

                <div className="text-4xl sm:text-5xl font-black tracking-tight leading-none"
                  style={{ color: m2.accent.text }}>
                  {m2.value}
                </div>

                <div>
                  <p className="text-white font-black text-sm uppercase leading-tight mb-1.5">{m2.label}</p>
                  <p className="text-white/40 text-[11px] leading-relaxed">{m2.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.5)} className="mt-6 flex items-center gap-3 max-w-2xl">
          <div className="px-4 py-3 rounded-xl border flex-1"
            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-white/30 text-xs italic">
              📊 Dato: el <strong className="text-white/50">60% de la jornada laboral</strong> se va en tareas que no generan valor. Podemos mejorar eso.
            </p>
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
