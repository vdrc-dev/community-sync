import { motion } from 'framer-motion';
import { Code2, Database, GitBranch, Cpu, Sparkles, Rocket } from 'lucide-react';
import bgCover from '@/assets/gen10-s4/bg-cover-vibecoding.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const TOOLS = [
  { name: 'Gemini', role: 'DISEÑO UI/UX', icon: Sparkles, color: 'hsl(38 90% 55%)' },
  { name: 'Lovable', role: 'CONSTRUCCIÓN', icon: Rocket, color: 'hsl(330 70% 60%)' },
  { name: 'Supabase', role: 'BACKEND', icon: Database, color: 'hsl(150 60% 50%)' },
  { name: 'GitHub', role: 'CONTROL', icon: GitBranch, color: 'hsl(280 70% 60%)' },
  { name: 'Cursor', role: 'EDICIÓN', icon: Code2, color: 'hsl(185 70% 50%)' },
];

export function S4Slide01Cover() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgCover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/50 to-[#04030a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,_hsl(185_70%_40%_/_0.12),_transparent_60%)]" />
      </div>

      {!isExporting && (
        <>
          <motion.div className="absolute top-[15%] right-[12%] w-[350px] h-[350px] rounded-full blur-[140px]"
            style={{ background: 'hsl(185 70% 45% / 0.1)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-[20%] left-[8%] w-[280px] h-[280px] rounded-full blur-[110px]"
            style={{ background: 'hsl(330 60% 50% / 0.08)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
        </>
      )}

      <div className="relative z-10 text-center max-w-[1200px] px-16">
        <motion.div {...m(0)} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/80">Semana 4 · Generación 10</span>
        </motion.div>

        <motion.h1 {...m(0.1)} className="text-7xl 2xl:text-8xl font-black text-white tracking-tight leading-[1.05] mb-3">
          <span style={{ background: 'linear-gradient(135deg, hsl(185 70% 55%), hsl(150 60% 55%), hsl(38 90% 55%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            VibeCoding
          </span>
        </motion.h1>

        <motion.p {...m(0.2)} className="text-2xl 2xl:text-3xl font-bold text-white/60 mb-3">
          De Consumidor a <span className="text-white">Creador</span>
        </motion.p>

        <motion.p {...m(0.3)} className="text-base text-white/30 max-w-xl mx-auto mb-14 leading-relaxed">
          En 90 minutos, tu primera app funcionando con datos reales. Hoy conectamos las 3 semanas anteriores y construimos.
        </motion.p>

        {/* Tool pipeline */}
        <motion.div {...m(0.4)} className="flex items-center justify-center gap-3">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.name}
                {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200 } })}
                className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${tool.color.replace(')', ' / 0.12)')}`, border: `1px solid ${tool.color.replace(')', ' / 0.25)')}` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: tool.color }} />
                  </div>
                  <span className="text-sm font-bold text-white/70">{tool.name}</span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: `${tool.color.replace(')', ' / 0.5)')}` }}>{tool.role}</span>
                {i < TOOLS.length - 1 && (
                  <div className="absolute" style={{ left: `calc(${(i + 1) * 20}% + 10px)` }} />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(185 50% 50% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">Vicente Donoso R.</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
