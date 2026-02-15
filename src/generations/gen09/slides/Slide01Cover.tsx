import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Database, GitBranch, Terminal, Zap } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';
import logoVdrc from '@/assets/logo-vdrc.png';

const tools = [
  { name: 'Gemini', role: 'Diseño UI/UX', icon: Sparkles, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { name: 'Lovable', role: 'Construcción', icon: Code2, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  { name: 'Supabase', role: 'Backend', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { name: 'GitHub', role: 'Control', icon: GitBranch, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { name: 'Cursor', role: 'Edición', icon: Terminal, color: 'text-gray-200', bg: 'bg-gray-500/10', border: 'border-gray-500/30' },
];

export function Slide01Cover() {
  const { isExporting } = useExportContext();
  const { config, currentWeek, generationNumber } = useGeneration();

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#050505] flex flex-col items-center justify-center font-sans selection:bg-emerald-500/30">
      
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#050505] to-[#050505]" />
      {!isExporting && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
      )}

      {/* Header - Logo */}
      <motion.div 
        {...(isExporting ? {} : {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 }
        })}
        className="absolute top-8 left-8 flex items-center gap-3 z-30"
      >
        <img src={logoVdrc} alt="VDRC" className="h-10 w-auto opacity-90" />
        <span className="text-white/80 font-mono tracking-widest text-lg font-bold">
          VDRC <span className="text-emerald-500">///</span> GEN {String(config.generation).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Header - URL */}
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-4">
        
        {/* Title */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.8, ease: "circOut" }
          })}
          className="relative text-center mb-16"
        >
          {!isExporting && (
            <div className="absolute -inset-x-20 -inset-y-10 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
          )}
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-emerald-950 filter drop-shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            VIBECODING
          </h1>
          <p className="text-2xl md:text-4xl text-emerald-500 font-mono mt-6 tracking-[0.3em] uppercase opacity-90">
            Semana {currentWeek}: {config.name}
          </p>
        </motion.div>

        {/* Tools Pipeline */}
        <div className="relative w-full flex justify-center items-center mt-8">
          
          {/* Animated connection line */}
          <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-white/5 -translate-y-1/2 z-0 rounded-full overflow-hidden">
            {!isExporting && (
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70 blur-[2px]"
              />
            )}
          </div>

          {/* Tool Cards */}
          <div className="grid grid-cols-5 gap-4 md:gap-8 w-full max-w-5xl z-10">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  {...(isExporting ? {} : {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 + (index * 0.15), type: "spring", stiffness: 50 },
                    whileHover: { y: -10, scale: 1.05, transition: { duration: 0.2 } }
                  })}
                  className="group relative flex flex-col items-center"
                >
                  {/* Glow on hover */}
                  {!isExporting && (
                    <div className={`absolute inset-0 ${tool.bg} blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  )}
                  
                  {/* Glass Card */}
                  <div className={`
                    relative w-full aspect-[4/5] flex flex-col items-center justify-center p-4 
                    rounded-2xl border ${tool.border} bg-[#0a0a0a]/80 backdrop-blur-xl 
                    shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]
                    transition-all duration-300
                  `}>
                    {/* Icon */}
                    <div className={`p-5 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300 ${tool.color}`}>
                      <Icon size={40} strokeWidth={1.5} />
                    </div>
                    
                    {/* Texts */}
                    <h3 className="text-white font-bold text-xl mb-1 tracking-tight">{tool.name}</h3>
                    <p className="text-white/40 text-xs uppercase font-mono tracking-widest">{tool.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        {...(isExporting ? {} : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.5 }
        })}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-center"
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
        <p className="text-white/40 text-base font-mono uppercase tracking-widest">
          {config.date} • {config.instructor}
        </p>
      </motion.div>

      {/* Slide number */}
      <div className="absolute bottom-8 right-8 text-sm font-bold text-gray-500 tabular-nums">
        1 / 12
      </div>
    </div>
  );
}
