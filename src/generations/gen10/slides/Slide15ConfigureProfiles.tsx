import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Puzzle, Bookmark, Settings, Check, Palette, Layers } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';

const TIPS = [
  { icon: Puzzle, text: 'Extensiones: Bitwarden (Trabajo)' },
  { icon: Bookmark, text: 'Marcadores: Organiza por perfil' },
  { icon: Settings, text: 'Sincronización: Activa en todos tus dispositivos' },
];

export function Slide15ConfigureProfiles() {
  const { isExporting } = useExportContext();

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-blue-500/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-8">
        
        {/* Header */}
        <motion.header {...getMotionProps(0.1)} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">Configuración</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Configura tus Perfiles en{' '}
            <span className="text-cyan-400">4 Pasos</span>
          </h1>
        </motion.header>

        {/* Flow Diagram */}
        <div className="flex-1 flex flex-col items-center justify-start pt-2">
          
          {/* Steps 1 & 2 */}
          <div className="flex items-start justify-center gap-12 mb-4">
            {/* Step 1 - Edge */}
            <motion.div {...getMotionProps(0.2)} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0078D4] to-[#00B294] flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 border border-cyan-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-cyan-400 font-black text-sm">1.</span>
                  <span className="text-cyan-400 font-bold text-sm">Crea Perfil</span>
                </div>
                <p className="text-white/60 text-sm">Trabajo en Edge</p>
                <div className="mt-2 px-3 py-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <span className="text-cyan-400 text-xs font-mono">TRABAJO - TUNOMBRE</span>
                </div>
              </div>
            </motion.div>

            {/* Step 2 - Chrome */}
            <motion.div {...getMotionProps(0.25)} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-green-500" />
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 border border-cyan-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-cyan-400 font-black text-sm">2.</span>
                  <span className="text-cyan-400 font-bold text-sm">Crea Perfil</span>
                </div>
                <p className="text-white/60 text-sm">Personal en Chrome</p>
                <div className="mt-2 px-3 py-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <span className="text-cyan-400 text-xs font-mono">PERSONAL TUNOMBRE</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-56 mb-3">
            <ArrowDown className="w-5 h-5 text-cyan-400/50" />
            <ArrowDown className="w-5 h-5 text-cyan-400/50" />
          </div>

          {/* Step 3 */}
          <motion.div {...getMotionProps(0.3)} className="flex items-center gap-4 mb-3">
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 shadow-lg shadow-blue-500/20" />
              <div className="w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500 shadow-lg shadow-orange-500/20" />
            </div>
            <div className="bg-white/[0.03] rounded-xl px-5 py-3 border border-cyan-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-black text-sm">3.</span>
                <Palette className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-sm">ASIGNA COLORES O ÍCONOS DISTINTOS</span>
              </div>
            </div>
          </motion.div>

          <ArrowDown className="w-5 h-5 text-cyan-400/50 mb-3" />

          {/* Step 4 */}
          <motion.div {...getMotionProps(0.35)} className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 p-2 bg-white/[0.03] rounded-xl border border-white/10">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0078D4] to-[#00B294] flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-green-500" />
              </div>
            </div>
            <div className="bg-white/[0.03] rounded-xl px-5 py-3 border border-cyan-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-black text-sm">4.</span>
                <span className="text-cyan-400 font-bold text-sm">ANCLA ACCESOS DIRECTOS Y DEFINE EL PERFIL POR DEFECTO</span>
              </div>
            </div>
          </motion.div>

          {/* Mini Tips */}
          <motion.div {...getMotionProps(0.4)} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/15 w-full max-w-2xl">
            <p className="text-cyan-400 font-bold text-center mb-4 uppercase tracking-widest text-xs">Mini Tips Adicionales</p>
            <div className="grid grid-cols-3 gap-4">
              {TIPS.map((tip, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        15 / 29
      </div>
    </div>
  );
}
