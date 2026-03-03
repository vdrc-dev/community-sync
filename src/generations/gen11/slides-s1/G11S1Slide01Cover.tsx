import { motion } from 'framer-motion';
import logoVdrc from '@/assets/logo-vdrc.png';
import { G11Shell, useG11Motion, G11BrainDecor, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import { useGeneration } from '@/contexts/GenerationContext';

export function G11S1Slide01Cover() {
  const m = useG11Motion();
  const { config } = useGeneration();

  return (
    <G11Shell
      footerLabel="HIGIENE DIGITAL · GEN 11"
      className="flex items-stretch"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Subtle background radial */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 80% at 30% 50%, rgba(61,153,112,0.06), transparent 70%)'
      }} />

      {/* Left content */}
      <div className="relative z-10 flex flex-col justify-between w-full sm:w-[55%] px-12 sm:px-20 py-12 sm:py-16">
        {/* Logo */}
        <motion.div {...m(0)} className="flex items-center gap-3">
          <img src={logoVdrc} alt="VDRC" className="h-10 sm:h-12 w-auto" />
        </motion.div>

        {/* Main title block */}
        <div className="flex-1 flex flex-col justify-center py-8">
          <motion.div {...m(0.05)}>
            <p className="text-white/40 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              Taller Intensivo de
            </p>
          </motion.div>

          <motion.div {...m(0.1)}>
            <h1 className="text-[3.4rem] sm:text-[5.5rem] font-black text-white tracking-tight leading-[0.9] uppercase mb-1">
              Productividad
            </h1>
            <h1 className="text-[3.4rem] sm:text-[5.5rem] font-black text-white tracking-tight leading-[0.9] uppercase mb-10">
              Digital
            </h1>
          </motion.div>

          <motion.div {...m(0.22)}>
            <G11GreenLine className="mb-7 max-w-xs" />
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight uppercase mb-2">
              Generación 11 | Sesión 1:
            </h2>
            <h2 className="text-lg sm:text-2xl font-bold uppercase" style={{ color: VDRC_GREEN }}>
              Higiene Digital &amp; Fundamentos
            </h2>
          </motion.div>
        </div>

        {/* Bottom info */}
        <motion.div {...m(0.4)} className="space-y-1.5">
          <div className="h-px w-32 mb-4" style={{ background: `linear-gradient(90deg, ${VDRC_GREEN}60, transparent)` }} />
          <p className="text-white/50 text-sm">
            Presenta: <span className="text-white font-semibold">{config.instructor || 'Vicente Donoso'}</span>
          </p>
          <p className="text-white/35 text-sm">{config.date || 'Marzo 2026'}</p>
        </motion.div>
      </div>

      {/* Right brain visual — full bleed, large, matches Canva */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[50%] overflow-hidden">
        {/* Fade on left edge to blend into bg */}
        <div className="absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: 'linear-gradient(90deg, #181c1b, transparent)' }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <G11BrainDecor className="w-[95%] h-[95%]" />
        </motion.div>
      </div>
    </G11Shell>
  );
}
