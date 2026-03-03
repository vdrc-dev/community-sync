import { motion } from 'framer-motion';
import logoVdrc from '@/assets/logo-vdrc.png';
import { G11Shell, useG11Motion, G11BrainDecor, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import { useGeneration } from '@/contexts/GenerationContext';

export function G11S1Slide01Cover() {
  const m = useG11Motion();
  const { config } = useGeneration();

  return (
    <G11Shell footerLabel="HIGIENE DIGITAL · GEN 11" className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Subtle bg radial */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 80% at 28% 50%, rgba(61,153,112,0.06), transparent 70%)'
      }} />

      {/* LEFT content */}
      <div className="relative z-10 flex flex-col justify-between w-full sm:w-[54%] px-12 sm:px-20 py-14 sm:py-16">
        {/* Logo + meta */}
        <motion.div {...m(0)} className="flex items-center justify-between">
          <img src={logoVdrc} alt="VDRC" className="h-9 sm:h-11 w-auto" />
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{ borderColor: G11.emerald.border, background: G11.emerald.bg }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: VDRC_GREEN }} />
            <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: G11.emerald.text }}>
              Gen 11 · Sesión 1
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-center py-8">
          <motion.div {...m(0.05)}>
            <p className="text-white/35 text-[11px] sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              Taller Intensivo de
            </p>
          </motion.div>

          <motion.div {...m(0.1)}>
            <h1 className="text-[3.6rem] sm:text-[6rem] font-black text-white tracking-tight leading-[0.88] uppercase">
              Productividad
            </h1>
            <h1 className="text-[3.6rem] sm:text-[6rem] font-black text-white tracking-tight leading-[0.88] uppercase mb-8">
              Digital
            </h1>
          </motion.div>

          <motion.div {...m(0.2)}>
            <G11GreenLine className="mb-6 max-w-[260px]" />
            <div className="space-y-1">
              <h2 className="text-base sm:text-xl font-black text-white tracking-tight uppercase">
                Sesión 1 — Higiene Digital
              </h2>
              <h2 className="text-base sm:text-xl font-black uppercase" style={{ color: VDRC_GREEN }}>
                Los Cimientos Antes de la IA
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Bottom info strip */}
        <motion.div {...m(0.38)} className="space-y-3">
          <div className="h-px w-28 mb-3" style={{ background: `linear-gradient(90deg, ${VDRC_GREEN}70, transparent)` }} />
          <div className="flex items-center gap-6">
            <div>
              <p className="text-white/35 text-[10px] uppercase tracking-widest">Presenta</p>
              <p className="text-white font-bold text-sm">{config.instructor || 'Vicente Donoso'}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-white/35 text-[10px] uppercase tracking-widest">Fecha</p>
              <p className="text-white/70 text-sm">{config.date || 'Marzo 2026'}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-white/35 text-[10px] uppercase tracking-widest">Duración</p>
              <p className="text-white/70 text-sm">90 min</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — brain visual */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[50%] overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: 'linear-gradient(90deg, #181c1b, transparent)' }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <G11BrainDecor className="w-[95%] h-[95%]" />
        </motion.div>
      </div>
    </G11Shell>
  );
}
