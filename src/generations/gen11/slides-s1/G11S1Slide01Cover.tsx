import { motion } from 'framer-motion';
import logoVdrc from '@/assets/logo-vdrc.png';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN, VDRC_GREEN_DIM } from './theme';
import { useGeneration } from '@/contexts/GenerationContext';

const STATS = [
  { label: 'MÓDULOS', value: '5' },
  { label: 'SLIDES', value: '18' },
  { label: 'HERRAMIENTAS', value: '+5' },
];

export function G11S1Slide01Cover() {
  const m = useG11Motion();
  const { config } = useGeneration();

  return (
    <G11Shell footerLabel="HIGIENE DIGITAL · GEN 11" className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Dot accent top-left */}
      <motion.div {...m(0)}
        className="absolute top-6 left-7 w-2.5 h-2.5 rounded-full z-20"
        style={{ background: VDRC_GREEN }} />

      {/* Subtle bg radial */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 80% at 28% 50%, rgba(61,153,112,0.06), transparent 70%)'
      }} />

      {/* LEFT content */}
      <div className="relative z-10 flex flex-col justify-between w-full sm:w-[58%] px-12 sm:px-20 py-14 sm:py-16">

        {/* Meta label */}
        <motion.div {...m(0)}>
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: VDRC_GREEN }}>
            /// &nbsp; TALLER &nbsp;|&nbsp; SESIÓN 1 &nbsp;|&nbsp; 2026
          </p>
        </motion.div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-center py-6">
          <motion.div {...m(0.1)}>
            <h1 className="text-[3.8rem] sm:text-[5.6rem] font-black text-white tracking-tight leading-[0.92] mb-2">
              Higiene <span style={{ color: VDRC_GREEN, fontStyle: 'italic' }}>Digital.</span>
            </h1>
            <h1 className="text-[3.8rem] sm:text-[5.6rem] font-black text-white tracking-tight leading-[0.92] mb-8">
              Productividad<br />desde los<br />Cimientos
            </h1>
          </motion.div>

          <motion.div {...m(0.22)}>
            <div className="border-l-4 pl-5" style={{ borderColor: VDRC_GREEN }}>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-[480px]">
                En un mundo donde el conocimiento cambia más rápido de lo que
                logramos dominarlo, tu habilidad más valiosa no es lo que sabes, sino
                cómo aprendes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom info strip */}
        <motion.div {...m(0.38)} className="space-y-3">
          <p className="text-white/25 text-[10px] tracking-widest font-mono uppercase">
            Taller Intensivo de Productividad Digital &nbsp;|&nbsp; 2026 &nbsp;|&nbsp; VDRC
          </p>
        </motion.div>
      </div>

      {/* RIGHT — stats panel */}
      <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-[40%] items-center justify-center pr-20">
        <motion.div
          {...m(0.15)}
          className="w-full max-w-[320px] rounded-2xl border p-8 flex flex-col gap-6"
          style={{ borderColor: G11.emerald.border, background: 'rgba(61,153,112,0.04)' }}
        >
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: VDRC_GREEN }}>
            AGENDA
          </p>
          {STATS.map((s, i) => (
            <motion.div key={s.label} {...m(0.2 + i * 0.08)}>
              <p className="text-white/35 text-[10px] font-bold tracking-[0.18em] uppercase mb-1">{s.label}</p>
              <p className="text-5xl font-black tabular-nums leading-none" style={{ color: VDRC_GREEN }}>{s.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Rocket emoji bottom-right */}
        <motion.div
          {...m(0.5)}
          className="absolute bottom-14 right-16 text-6xl"
        >
          🚀
        </motion.div>
      </div>

      {/* Logo bottom-right */}
      <motion.div {...m(0.45)} className="absolute bottom-7 right-8 z-20">
        <img src={logoVdrc} alt="VDRC" className="h-7 w-auto opacity-60" />
      </motion.div>
    </G11Shell>
  );
}
