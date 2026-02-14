import { motion } from 'framer-motion';
import { Rocket, MessageSquare, Globe, ArrowRight, Code2, Database, Zap } from 'lucide-react';
import bgLovable from '@/assets/gen10-s4/bg-lovable-magic.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const PROCESS = [
  { step: 1, title: 'Describe', desc: 'Escribe tu idea en español', icon: MessageSquare, color: 'hsl(330 70% 60%)' },
  { step: 2, title: 'Genera', desc: 'Lovable construye la app', icon: Rocket, color: 'hsl(280 70% 60%)' },
  { step: 3, title: 'Itera', desc: 'Refina con chat natural', icon: Code2, color: 'hsl(185 70% 50%)' },
  { step: 4, title: 'Publica', desc: 'URL pública con HTTPS', icon: Globe, color: 'hsl(150 60% 50%)' },
];

const SUPERPOWERS = [
  { label: 'Código modular', desc: 'Componentes React profesionales, no monolitos', icon: Code2 },
  { label: 'Backend 1-click', desc: 'Supabase integrado automáticamente', icon: Database },
  { label: 'Deploy instantáneo', desc: 'URL pública lista en segundos', icon: Zap },
];

export function S4Slide06Lovable() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgLovable} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/40 to-[#04030a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(330_70%_45%_/_0.08),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-rose-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Stack · Herramienta Principal</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Lovable: La Magia</h1>
            </div>
          </div>
          <p className="text-rose-400/60 text-sm ml-5 pl-1">De prompt a app en minutos. Backend incluido.</p>
        </motion.div>

        {/* Process pipeline */}
        <motion.div {...m(0.15)} className="flex items-center justify-center gap-4 mb-8">
          {PROCESS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="flex items-center gap-4">
                <motion.div {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3 + i * 0.1, type: 'spring' } })}
                  className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ background: `${step.color.replace(')', ' / 0.08)')}`, borderColor: `${step.color.replace(')', ' / 0.2)')}` }}>
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-white">{step.title}</p>
                    <p className="text-[10px] text-white/30">{step.desc}</p>
                  </div>
                </motion.div>
                {i < PROCESS.length - 1 && <ArrowRight className="w-4 h-4 text-white/15 mt-[-20px]" />}
              </div>
            );
          })}
        </motion.div>

        {/* Superpowers */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {SUPERPOWERS.map((sp, i) => {
            const Icon = sp.icon;
            return (
              <motion.div key={i} {...m(0.4 + i * 0.08)}
                className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <Icon className="w-5 h-5 text-rose-400 mb-3" />
                <p className="text-sm font-bold text-white mb-1">{sp.label}</p>
                <p className="text-xs text-white/35">{sp.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mockup prompt bar */}
        <motion.div {...m(0.6)} className="max-w-2xl mx-auto p-4 rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] flex items-center gap-4">
          <div className="flex-1 p-3 rounded-xl bg-black/40 border border-white/[0.06]">
            <p className="text-xs text-white/30 font-mono">Crea un sistema de gestión de colegios con colores naranjos...</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-rose-400" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(330 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">STACK</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
