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

      {/* Left content */}
      <div className="relative z-10 flex flex-col justify-between w-full sm:w-[58%] px-12 sm:px-16 py-12 sm:py-14">
        {/* Logo */}
        <motion.div {...m(0)} className="flex items-center gap-3">
          <img src={logoVdrc} alt="VDRC" className="h-10 sm:h-12 w-auto" />
        </motion.div>

        {/* Main title block */}
        <div className="flex-1 flex flex-col justify-center py-8">
          <motion.div {...m(0.1)}>
            <p className="text-white/50 text-sm sm:text-base font-medium tracking-wider uppercase mb-3">
              Taller Intensivo de
            </p>
            <h1 className="text-[3.2rem] sm:text-[5rem] font-black text-white tracking-tight leading-none uppercase mb-2">
              Productividad
            </h1>
            <h1 className="text-[3.2rem] sm:text-[5rem] font-black text-white tracking-tight leading-none uppercase mb-8">
              Digital
            </h1>
          </motion.div>

          <motion.div {...m(0.25)}>
            <G11GreenLine className="mb-6 max-w-xs" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase mb-1">
              Generación 11 | Sesión 1:
            </h2>
            <h2 className="text-xl sm:text-2xl font-bold uppercase" style={{ color: VDRC_GREEN }}>
              Higiene Digital &amp; Fundamentos
            </h2>
          </motion.div>
        </div>

        {/* Bottom info */}
        <motion.div {...m(0.4)} className="space-y-1">
          <p className="text-white/50 text-sm">
            Presenta: <span className="text-white font-semibold">{config.instructor || 'Vicente Donoso'}</span>
          </p>
          <p className="text-white/40 text-sm">{config.date || 'Marzo 2026'}</p>
        </motion.div>
      </div>

      {/* Right brain visual */}
      <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-[45%] items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 80% at 60% 50%, rgba(61,153,112,0.12), transparent 70%)' }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16,1,0.3,1] }}
          className="w-[85%] aspect-square"
        >
          <G11BrainDecor className="w-full h-full" />
        </motion.div>
      </div>
    </G11Shell>
  );
}
