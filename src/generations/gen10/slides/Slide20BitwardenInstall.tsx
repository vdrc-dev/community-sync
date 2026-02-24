import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, UserPlus, Lock, Smartphone, Puzzle, Database, Shield } from 'lucide-react';
import { S1Shell, useS1Motion } from './shared';

const YOUTUBE_VIDEO_ID = 'ndhLzMtBEJM';
const STEPS = [
  { icon: UserPlus, num: '1', text: 'Crear una cuenta en bitwarden.com', color: 'rose' as const },
  { icon: Lock, num: '2', text: 'Configurar una contraseña maestra segura', color: 'amber' as const },
  { icon: Smartphone, num: '3', text: 'Instalar la aplicación móvil', color: 'emerald' as const },
  { icon: Puzzle, num: '4', text: 'Instalar la extensión del navegador', color: 'cyan' as const },
  { icon: Database, num: '5', text: 'Importar contraseñas existentes', color: 'violet' as const },
];
const COLOR_MAP = {
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400' },
} as const;

export function Slide20BitwardenInstall() {
  const m = useS1Motion();

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col" radials={
      <>
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-blue-600/[0.08] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-cyan-500/[0.05] rounded-full blur-[120px]" />
      </>
    }>
      <div className="relative z-10 flex flex-col h-full px-5 sm:px-12 py-8">
        <motion.header {...m(0.1)} className="mb-6">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-blue-600/15 border border-blue-600/30 rounded-full backdrop-blur-sm w-fit mb-3">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">Tutorial</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Instalación de <span className="text-blue-400">Bitwarden</span>
          </h1>
        </motion.header>

        <div className="flex-1 flex flex-col lg:flex-row gap-8">
          <motion.div {...m(0.2)} className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Play className="w-4 h-4 text-white" fill="white" />
              </div>
              <p className="text-white font-bold uppercase tracking-wider text-sm">Tutorial Completo</p>
            </div>
            <div className="relative flex-1 min-h-[200px]">
              <div className="absolute -inset-1 bg-blue-600/20 blur-xl rounded-2xl" />
              <div className="relative h-full p-[2px] rounded-xl bg-gradient-to-br from-blue-600/60 to-cyan-500/40">
                <div className="relative h-full rounded-lg overflow-hidden bg-[#030303]">
                  <iframe src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`} title="Tutorial de Bitwarden" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
                </div>
              </div>
            </div>
            <motion.div {...m(0.5)} className="mt-4 flex justify-center">
              <a href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/30 rounded-lg text-blue-400 hover:bg-blue-600/20 transition-colors text-sm">
                <ExternalLink className="w-4 h-4" /><span className="font-medium">Ver en YouTube</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div {...m(0.3)} className="w-full lg:w-[380px] flex flex-col">
            <p className="text-white font-bold uppercase tracking-widest mb-4 text-xs">Pasos Clave:</p>
            <div className="space-y-3 flex-1">
              {STEPS.map((step, i) => {
                const colors = COLOR_MAP[step.color];
                return (
                  <motion.div key={step.num} {...m(0.35 + i * 0.06)} className={`flex items-center gap-3 p-3 ${colors.bg} border ${colors.border} rounded-xl backdrop-blur-sm`}>
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`w-5 h-5 ${colors.text}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`${colors.text} font-black text-lg`}>{step.num}.</span>
                      <span className="text-white/80 text-sm">{step.text}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div {...m(0.6)} className="mt-4 p-3 bg-white/[0.03] border border-white/10 rounded-xl">
              <p className="text-white/40 text-xs text-center">*La versión gratuita es suficiente para uso personal básico</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </S1Shell>
  );
}
