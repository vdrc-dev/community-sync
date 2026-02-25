import { motion } from 'framer-motion';
import { Code2, Database, GitBranch, Cpu, Sparkles, Rocket, Zap, ArrowRight } from 'lucide-react';
import bgCover from '@/assets/gen10-s4/bg-cover-vibecoding.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const TOOLS = [
  { name: 'Gemini', role: 'DISEÑO', icon: Sparkles, color: 'hsl(38 90% 55%)', hue: 38 },
  { name: 'Lovable', role: 'BUILD', icon: Rocket, color: 'hsl(330 70% 60%)', hue: 330 },
  { name: 'Supabase', role: 'BACKEND', icon: Database, color: 'hsl(150 60% 50%)', hue: 150 },
  { name: 'GitHub', role: 'CONTROL', icon: GitBranch, color: 'hsl(280 70% 60%)', hue: 280 },
  { name: 'Cursor', role: 'EDICIÓN', icon: Code2, color: 'hsl(185 70% 50%)', hue: 185 },
];

export function S4Slide01Cover() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.8, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans" style={{ background: '#04030a' }}>
      {/* Background layers */}
      <div className="absolute inset-0">
        <img src={bgCover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/80 via-[#04030a]/40 to-[#04030a]/90" />
        {/* Multi-color radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_140%_70%_at_50%_-15%,_hsl(185_70%_40%_/_0.14),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_80%,_hsl(330_60%_40%_/_0.07),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_80%,_hsl(150_60%_40%_/_0.07),_transparent_55%)]" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, hsl(185 60% 65%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
      </div>

      {/* Animated orbs */}
      {!isExporting && (
        <>
          <motion.div className="absolute top-[10%] right-[8%] w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
            style={{ background: 'hsl(185 70% 45% / 0.08)' }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none"
            style={{ background: 'hsl(330 60% 50% / 0.07)' }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
          <motion.div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[200px] pointer-events-none"
            style={{ background: 'hsl(150 50% 40% / 0.04)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
        </>
      )}

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-[1300px] px-16 w-full">
        {/* Badge */}
        <motion.div {...m(0)} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] backdrop-blur-sm mb-10">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            {...(isExporting ? {} : { animate: { opacity: [1, 0.3, 1] }, transition: { duration: 2, repeat: Infinity } })}
          />
          <span className="text-xs font-black tracking-[0.25em] uppercase text-cyan-400/90">Semana 4 · Generación 10 · VibeCoding</span>
        </motion.div>

        {/* Giant title */}
        <motion.div {...m(0.1)} className="mb-4">
          {/* Oversized watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[28vw] font-black text-white/[0.015] tracking-tighter leading-none" style={{ fontVariant: 'small-caps' }}>VC</span>
          </div>
          <h1 className="relative text-[9vw] 2xl:text-[130px] font-black tracking-tight leading-[0.92] mb-4">
            <span style={{ background: 'linear-gradient(135deg, hsl(185 70% 65%) 0%, hsl(150 60% 60%) 35%, hsl(38 90% 60%) 70%, hsl(330 70% 65%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              VibeCoding
            </span>
          </h1>
        </motion.div>

        <motion.p {...m(0.2)} className="text-3xl 2xl:text-4xl font-bold text-white/55 mb-3 tracking-tight">
          De <span className="text-white font-black">Consumidor</span> a <span className="text-white font-black">Creador</span>
        </motion.p>

        <motion.p {...m(0.3)} className="text-base text-white/25 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
          En 90 minutos, tu primera app funcionando con datos reales. Hoy conectamos las 3 semanas anteriores.
        </motion.p>

        {/* Tool pipeline — premium cards */}
        <motion.div {...m(0.4)} className="flex items-center justify-center gap-2">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className="flex items-center gap-2">
                <motion.div
                  {...(isExporting ? {} : { initial: { opacity: 0, y: 20, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay: 0.55 + i * 0.09, type: 'spring', stiffness: 180, damping: 14 } })}
                  className="flex flex-col items-center gap-2.5">
                  {/* Card */}
                  <div className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-md overflow-hidden">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${tool.color.replace(')', ' / 0.5)')}, transparent)` }} />
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `hsl(${tool.hue} 60% 45% / 0.12)`, border: `1px solid hsl(${tool.hue} 60% 50% / 0.3)`, boxShadow: `0 0 20px hsl(${tool.hue} 60% 50% / 0.12)` }}>
                      <Icon className="w-5 h-5" style={{ color: tool.color }} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-white/80 leading-tight">{tool.name}</p>
                      <p className="text-[9px] font-bold tracking-[0.18em] uppercase" style={{ color: `hsl(${tool.hue} 60% 60% / 0.6)` }}>{tool.role}</p>
                    </div>
                  </div>
                </motion.div>
                {i < TOOLS.length - 1 && (
                  <motion.div
                    {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.7 + i * 0.09 } })}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white/10" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(185 50% 50% / 0.4), hsl(330 50% 50% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Vicente Donoso R.</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/50">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.9)' }} />
    </div>
  );
}
