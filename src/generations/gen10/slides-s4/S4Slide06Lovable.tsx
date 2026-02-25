import { motion } from 'framer-motion';
import { Rocket, MessageSquare, Globe, ArrowRight, Code2, Database, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import bgLovable from '@/assets/gen10-s4/bg-lovable-magic.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const PROCESS = [
  { step: 1, title: 'Describe', desc: 'Tu idea en español natural', icon: MessageSquare, color: 'hsl(330 70% 60%)', hue: 330 },
  { step: 2, title: 'Genera', desc: 'Lovable construye la app', icon: Rocket, color: 'hsl(280 70% 60%)', hue: 280 },
  { step: 3, title: 'Itera', desc: 'Refina con chat natural', icon: Code2, color: 'hsl(185 70% 50%)', hue: 185 },
  { step: 4, title: 'Publica', desc: 'URL pública con HTTPS', icon: Globe, color: 'hsl(150 60% 50%)', hue: 150 },
];

const SUPERPOWERS = [
  { label: 'Código modular', desc: 'Componentes React profesionales, no monolitos frágiles', icon: Code2, hue: 185 },
  { label: 'Backend 1-click', desc: 'Supabase integrado automáticamente. Auth, DB, Storage.', icon: Database, hue: 150 },
  { label: 'Deploy instantáneo', desc: 'URL pública con HTTPS lista en segundos, cada vez.', icon: Zap, hue: 38 },
];

export function S4Slide06Lovable() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgLovable} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/45 to-[#04030a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-15%,_hsl(330_60%_40%_/_0.1),_transparent_60%)]" />
        <div className="absolute top-[5%] right-[3%] text-[20vw] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">LV</div>
      </div>

      {!isExporting && (
        <motion.div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'hsl(330 60% 50% / 0.07)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-rose-500" style={{ boxShadow: '0 0 12px hsl(330 70% 55% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/30">Stack · Herramienta Principal</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Lovable: La Magia</h1>
            </div>
          </div>
          <p className="text-rose-400/60 text-sm ml-5 pl-1 font-medium">De prompt a app React completa en minutos. Backend incluido.</p>
        </motion.div>

        {/* Process pipeline — premium */}
        <motion.div {...m(0.1)} className="flex items-center justify-center gap-4 mb-8">
          {PROCESS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="flex items-center gap-4">
                <motion.div
                  {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.8, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { delay: 0.25 + i * 0.1, type: 'spring', stiffness: 180 } })}
                  className="flex flex-col items-center gap-2.5">
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `hsl(${step.hue} 60% 45% / 0.12)`, border: `1px solid hsl(${step.hue} 60% 50% / 0.3)`, boxShadow: `0 0 30px hsl(${step.hue} 60% 50% / 0.12)` }}>
                    <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle at 30% 30%, hsl(${step.hue} 60% 70% / 0.08), transparent 60%)` }} />
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black" style={{ background: `hsl(${step.hue} 60% 45% / 0.9)`, color: 'white' }}>{step.step}</div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black text-white">{step.title}</p>
                    <p className="text-[10px] text-white/30 font-medium">{step.desc}</p>
                  </div>
                </motion.div>
                {i < PROCESS.length - 1 && (
                  <motion.div {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 + i * 0.1 } })}>
                    <ArrowRight className="w-5 h-5 text-white/12 mt-[-18px]" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Superpowers grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {SUPERPOWERS.map((sp, i) => {
            const Icon = sp.icon;
            return (
              <motion.div key={i} {...m(0.4 + i * 0.08)}
                className="relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] overflow-hidden group hover:border-white/[0.1] transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, hsl(${sp.hue} 60% 55% / 0.4), transparent)` }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `hsl(${sp.hue} 60% 45% / 0.1)`, border: `1px solid hsl(${sp.hue} 60% 50% / 0.2)` }}>
                  <Icon className="w-5 h-5" style={{ color: `hsl(${sp.hue} 65% 60%)` }} />
                </div>
                <p className="text-sm font-black text-white mb-1.5">{sp.label}</p>
                <p className="text-xs text-white/35 leading-relaxed">{sp.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mockup prompt */}
        <motion.div {...m(0.65)} className="max-w-3xl mx-auto p-4 rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] flex items-center gap-4">
          <Sparkles className="w-4 h-4 text-rose-400/60 shrink-0" />
          <div className="flex-1 p-3 rounded-xl bg-black/50 border border-white/[0.05]">
            <p className="text-xs text-white/30 font-mono leading-relaxed">
              <span className="text-rose-400/50">›</span>{' '}
              Crea un sistema de gestión para mi colegio con colores naranjos, login de profesores y tabla de alumnos...
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full bg-rose-400"
              {...(isExporting ? {} : { animate: { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }, transition: { duration: 1.5, repeat: Infinity } })} />
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-rose-400" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(330 50% 55% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Stack</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/50">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
