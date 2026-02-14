import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, MessageSquare, Rocket, Check, Zap, Code2, Database, GitBranch, Terminal } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';

export function Slide02Context() {
  const { isExporting } = useExportContext();
  const { config, currentWeek } = useGeneration();

  const milestones = [
    { id: 1, title: 'Higiene Digital', icon: Shield, delay: 0.2 },
    { id: 2, title: 'IA & Productividad', icon: Brain, delay: 0.4 },
    { id: 3, title: 'Comunicación', icon: MessageSquare, delay: 0.6 },
  ];

  const tools = [
    { name: 'Lovable', icon: Code2, color: 'text-red-400', bg: 'bg-red-500/20' },
    { name: 'Supabase', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { name: 'GitHub', icon: GitBranch, color: 'text-purple-400', bg: 'bg-purple-500/20' },
    { name: 'Cursor', icon: Terminal, color: 'text-gray-200', bg: 'bg-gray-500/20' },
  ];

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#050505] flex flex-col font-sans px-6 py-6 md:px-12 md:py-8 selection:bg-emerald-500/30">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#050505] to-[#050505]" />
      
      {/* Header */}
      <motion.div 
        {...(isExporting ? {} : {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 }
        })}
        className="relative z-20 mb-4"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-wider uppercase">
            Semana {currentWeek}
          </div>
          <span className="text-white/50 text-sm font-mono uppercase tracking-widest">Gen {String(config.generation).padStart(2, '0')} • Progreso</span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">
          Conectando Todo
        </h2>
        
        <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl leading-relaxed">
          3 semanas de preparación te trajeron hasta aquí. <span className="text-emerald-400 font-bold">Hoy encendemos los motores.</span>
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="flex-1 relative flex items-center justify-center w-full z-10 min-h-0">
        
        {/* Base Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full z-0" />
        
        {/* Energy Ray */}
        <motion.div 
          {...(isExporting ? { style: { width: '100%' } } : {
            initial: { width: '0%' },
            animate: { width: '100%' },
            transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 }
          })}
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-emerald-900 via-emerald-500 to-emerald-200 -translate-y-1/2 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)] z-0"
        />

        <div className="grid grid-cols-4 gap-4 w-full relative z-10">
          
          {/* Past Milestones */}
          {milestones.map((step) => (
            <motion.div
              key={step.id}
              {...(isExporting ? {} : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: step.delay }
              })}
              className="relative flex flex-col items-center group"
            >
              {/* Node on line */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#050505] border-2 border-emerald-500 rounded-full z-20 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              </div>

              {/* Card (Above) */}
              <div className="mb-12 p-4 rounded-xl bg-[#0a0a0a] border border-white/10 flex flex-col items-center gap-3 w-full shadow-lg relative z-30 group-hover:border-emerald-500/30 transition-colors">
                <div className="p-3 bg-white/5 rounded-lg text-white/60 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                  <step.icon size={28} strokeWidth={1.5} />
                </div>
                <span className="text-white text-base font-bold text-center leading-tight">{step.title}</span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded-md">
                  <Check size={14} strokeWidth={3} /> Completado
                </div>
              </div>
            </motion.div>
          ))}

          {/* Current: DESARROLLO */}
          <motion.div
            {...(isExporting ? {} : {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 1.5, type: "spring", bounce: 0.4 }
            })}
            className="relative flex flex-col items-center"
          >
            {/* Central Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative flex items-center justify-center">
                {!isExporting && (
                  <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-50 animate-pulse scale-125" />
                )}
                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.8)] border-2 border-white z-30">
                  <Rocket className="text-black fill-current" size={28} />
                </div>
              </div>
            </div>

            {/* Main Card "DESARROLLO" */}
            <div className="mt-20 w-full relative z-30"> 
              <div className="bg-[#0f0f0f] border-2 border-emerald-500/50 rounded-xl p-4 shadow-xl relative overflow-hidden">
                
                {/* Card Header */}
                <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase">Desarrollo</h3>
                    <p className="text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mt-0.5">Módulo Actual</p>
                  </div>
                  <Zap 
                    className={`text-emerald-500 fill-current ${isExporting ? '' : 'animate-pulse'}`} 
                    size={24} 
                  />
                </div>

                {/* Tools List - 2x2 grid for compact display */}
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <div 
                      key={tool.name} 
                      className="flex items-center gap-2 p-2 rounded-lg border border-white/5 bg-[#1a1a1a]"
                    >
                      <div className={`p-1.5 rounded ${tool.bg} ${tool.color}`}>
                        <tool.icon size={16} />
                      </div>
                      <span className="text-white text-sm font-bold">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer: Session Objective */}
      <motion.div 
        {...(isExporting ? {} : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 2 }
        })}
        className="mt-4 relative z-20 bg-[#0a0a0a] border border-emerald-500/30 rounded-xl p-4 flex items-center gap-4 shadow-lg"
      >
        <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <Rocket className="text-black fill-current" size={24} />
        </div>
        <div>
          <span className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest mb-1 block">
            Objetivo de la Sesión
          </span>
          <h4 className="text-xl md:text-2xl text-white font-bold leading-tight">
            Crear tu primera app web <span className="text-emerald-400">desde cero</span>.
          </h4>
        </div>
      </motion.div>
    </div>
  );
}
