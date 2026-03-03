import { motion } from 'framer-motion';
import logoVdrc from '@/assets/logo-vdrc.png';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN, VDRC_GREEN_DIM } from './theme';
import { useGeneration } from '@/contexts/GenerationContext';

const MODULES = [
  { num: '01', label: 'Fundamentos' },
  { num: '02', label: 'Inbox Zero' },
  { num: '03', label: 'Navegadores' },
  { num: '04', label: 'Seguridad' },
  { num: '05', label: 'Contexto IA' },
];

export function G11S1Slide01Cover() {
  const m = useG11Motion();
  const { config } = useGeneration();

  return (
    <G11Shell
      footerLabel="HIGIENE DIGITAL · GEN 11"
      className="flex items-stretch"
      radials={
        <>
          {/* Deep green atmospheric glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 90% at 22% 55%, rgba(61,153,112,0.10), transparent 65%)'
          }} />
          {/* Top corner accent */}
          <div className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none" style={{
            background: 'radial-gradient(ellipse at top right, rgba(61,153,112,0.06), transparent 70%)'
          }} />
        </>
      }
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Dot accent */}
      <motion.div {...m(0)}
        className="absolute top-6 left-7 w-2 h-2 rounded-full z-20"
        style={{ background: VDRC_GREEN, boxShadow: `0 0 8px ${VDRC_GREEN}` }} />

      {/* LEFT content */}
      <div className="relative z-10 flex flex-col justify-between w-full sm:w-[60%] px-12 sm:px-20 py-14 sm:py-16">

        {/* Meta label */}
        <motion.div {...m(0)} className="flex items-center gap-3">
          <span className="text-[11px] font-black tracking-[0.25em] uppercase" style={{ color: VDRC_GREEN }}>
            VDRC
          </span>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: VDRC_GREEN_DIM }} />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/35">
            SESIÓN 1 · 2026
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <motion.div {...m(0.08)}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 self-start"
              style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: VDRC_GREEN }} />
              <span className="text-[10px] font-black tracking-[0.22em] uppercase" style={{ color: VDRC_GREEN }}>
                Taller Intensivo · Gen 11
              </span>
            </div>
          </motion.div>

          <motion.div {...m(0.13)}>
            <h1 className="text-[3.6rem] sm:text-[5.4rem] font-black tracking-[-0.02em] leading-[0.88] mb-1"
              style={{ color: VDRC_GREEN }}>
              Higiene
            </h1>
            <h1 className="text-[3.6rem] sm:text-[5.4rem] font-black text-white tracking-[-0.02em] leading-[0.88] mb-2"
              style={{ fontStyle: 'italic' }}>
              Digital.
            </h1>
            <div className="h-[3px] w-24 rounded-full mb-5" style={{ background: `linear-gradient(90deg, ${VDRC_GREEN}, transparent)` }} />
            <h2 className="text-[1.6rem] sm:text-[2.4rem] font-black text-white/70 tracking-tight leading-tight">
              Productividad desde<br />los Cimientos
            </h2>
          </motion.div>

          <motion.div {...m(0.22)} className="mt-6">
            <div className="border-l-2 pl-5" style={{ borderColor: VDRC_GREEN }}>
              <p className="text-white/50 text-sm sm:text-[0.92rem] leading-relaxed max-w-[460px]">
                En un mundo donde el conocimiento cambia más rápido de lo que
                logramos dominarlo, tu habilidad más valiosa no es lo que sabes,
                sino cómo aprendes y cómo organizas lo que tienes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div {...m(0.38)} className="flex items-center gap-4">
          <img src={logoVdrc} alt="VDRC" className="h-6 w-auto opacity-50" />
          <div className="h-px flex-1 max-w-[80px]" style={{ background: VDRC_GREEN_DIM }} />
          <p className="text-white/20 text-[10px] tracking-widest font-mono uppercase">
            Productividad Digital · 2026
          </p>
        </motion.div>
      </div>

      {/* RIGHT — modules index */}
      <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-[40%] items-center justify-center pr-16">
        <motion.div {...m(0.15)} className="w-full max-w-[300px] flex flex-col gap-2">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-white/30">ÍNDICE</span>
            <div className="h-px flex-1" style={{ background: VDRC_GREEN_DIM }} />
          </div>

          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.num}
              {...m(0.22 + i * 0.06)}
              className="flex items-center gap-4 px-4 py-3 rounded-xl border"
              style={{
                borderColor: i === 0 ? G11.emerald.border : 'rgba(255,255,255,0.05)',
                background: i === 0 ? G11.emerald.bg : 'rgba(255,255,255,0.02)',
              }}
            >
              <span className="text-[11px] font-black font-mono tabular-nums"
                style={{ color: i === 0 ? VDRC_GREEN : 'rgba(255,255,255,0.2)' }}>
                {mod.num}
              </span>
              <span className="text-sm font-semibold"
                style={{ color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)' }}>
                {mod.label}
              </span>
              {i === 0 && (
                <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(61,153,112,0.15)', border: `1px solid ${VDRC_GREEN_DIM}` }}>
                  <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: VDRC_GREEN }} />
                  <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: VDRC_GREEN }}>HOY</span>
                </div>
              )}
            </motion.div>
          ))}

          {/* Bottom decoration */}
          <motion.div {...m(0.6)} className="mt-5 flex items-center justify-center gap-2 opacity-30">
            <div className="h-px w-8" style={{ background: VDRC_GREEN }} />
            <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">vdrc.cl</span>
            <div className="h-px w-8" style={{ background: VDRC_GREEN }} />
          </motion.div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
