import React from 'react';
import { motion } from 'framer-motion';
import { Lock, KeyRound, HelpCircle, Cog, Vault, Cloud, Shield, Flame, Smile, Grid3X3, AlertTriangle, CheckCircle } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const COLUMNS = [
  {
    title: 'PROBLEMA',
    color: 'rose' as const,
    items: [
      { icon: Lock, label: 'Acceso Vulnerable' },
      { icon: KeyRound, label: 'Contraseñas Repetidas' },
      { icon: HelpCircle, label: 'Olvido y Frustración' },
    ]
  },
  {
    title: 'SOLUCIÓN',
    color: 'amber' as const,
    items: [
      { icon: Cog, label: 'Generador Complejo' },
      { icon: Vault, label: 'Almacenamiento Seguro' },
      { icon: Cloud, label: 'Sincronización en la Nube' },
    ]
  },
  {
    title: 'BENEFICIO',
    color: 'emerald' as const,
    items: [
      { icon: Shield, label: 'Seguridad Robusta' },
      { icon: Flame, label: 'Protección Contra Amenazas' },
      { icon: Smile, label: 'Acceso Fluido y Rápido' },
    ]
  }
];

const COLOR_MAP = {
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', accent: 'bg-rose-500', glow: 'shadow-rose-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', accent: 'bg-amber-500', glow: 'shadow-amber-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', accent: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
} as const;

export function Slide18SecurityMatrix() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(18);
  
  // Database-driven myth/reality content
  const myth = content.myth as { title: string; belief: string } | undefined;
  const reality = content.reality as { title: string; consequence?: string; desc?: string } | undefined;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex flex-col font-sans selection:bg-rose-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-rose-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-emerald-500/[0.06] rounded-full blur-[150px]" />
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
            <div className="flex items-center gap-2.5 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full backdrop-blur-sm">
              <Grid3X3 className="w-4 h-4 text-rose-400" />
              <span className="text-rose-400 text-sm font-semibold tracking-wide uppercase">Matriz</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Problema → Solución →{' '}
            <span className="text-emerald-400">Beneficio</span>
          </h1>
        </motion.header>

        {/* Myth vs Reality Cards */}
        {(myth || reality) && (
          <motion.div {...getMotionProps(0.15)} className="mb-6">
            <div className="grid grid-cols-2 gap-5">
              {myth && (
                <div className="bg-rose-500/[0.06] border border-rose-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span className="text-rose-400 font-bold text-sm uppercase">Mito</span>
                  </div>
                  <p className="text-white font-semibold">"{myth.title}"</p>
                  <p className="text-white/50 text-sm">{myth.belief}</p>
                </div>
              )}
              {reality && (
                <div className="bg-emerald-500/[0.06] border border-emerald-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm uppercase">Realidad</span>
                  </div>
                  <p className="text-white font-semibold">{reality.title}</p>
                  <p className="text-amber-400 text-sm font-bold">{reality.consequence || reality.desc}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Three Column Matrix */}
        <div className="flex-1 grid grid-cols-3 gap-5 mb-4">
          {COLUMNS.map((column, colIdx) => {
            const colors = COLOR_MAP[column.color];
            return (
              <motion.div 
                key={column.title} 
                {...getMotionProps(0.15 + colIdx * 0.1)}
                className="flex flex-col"
              >
                {/* Header */}
                <div className={`${colors.bg} rounded-t-2xl p-4 border ${colors.border} border-b-0`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-7 ${colors.accent} rounded-full`} />
                    <h2 className={`text-xl font-black ${colors.text} tracking-wider`}>{column.title}</h2>
                  </div>
                </div>
                
                {/* Items */}
                <div className={`flex-1 bg-white/[0.02] rounded-b-2xl p-4 border ${colors.border} border-t-0 space-y-3`}>
                  {column.items.map((item, i) => (
                    <motion.div
                      key={i}
                      {...getMotionProps(0.25 + colIdx * 0.1 + i * 0.05)}
                      className={`flex items-center gap-3 p-3 ${colors.bg} rounded-xl border ${colors.border} shadow-lg ${colors.glow}`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-6 h-6 ${colors.text}`} strokeWidth={1.5} />
                      </div>
                      <p className="text-white font-bold text-sm">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recommendations Bar */}
        <motion.div {...getMotionProps(0.5)}>
          <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">Opciones Recomendadas</span>
            </div>
            
            <div className="flex items-center justify-center gap-10">
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-600/30 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">Bitwarden</span>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path fill="white" d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                <span className="text-white/80 font-medium text-sm">Apple Passwords</span>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">1Password</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        18 / 29
      </div>
    </div>
  );
}
