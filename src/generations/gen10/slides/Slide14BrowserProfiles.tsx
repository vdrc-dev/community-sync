import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, ArrowRight, CheckCircle, Globe } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const DEFAULT_WORK = { browser: 'Edge', services: ['OUTLOOK', 'TEAMS', 'SHAREPOINT'] };
const DEFAULT_PERSONAL = { browser: 'Chrome', services: ['GMAIL', 'YOUTUBE', 'PERSONAL DRIVE'] };

export function Slide14BrowserProfiles() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(14);
  
  // Database-driven content with fallbacks
  const ecosystemRule = content.ecosystemRule as { 
    concept?: string; 
    work?: { browser: string; services: string[] }; 
    personal?: { browser: string; services: string[] } 
  } | undefined;
  const work = ecosystemRule?.work || DEFAULT_WORK;
  const personal = ecosystemRule?.personal || DEFAULT_PERSONAL;
  const benefit = (content.benefit as { title: string; desc: string }) || { title: 'Cero Fricción', desc: 'De la oficina a la casa con un clic' };
  const rule = (content.rule as string) || '1 CONTEXTO = 1 PERFIL';
  const warning = (content.warning as string) || '';

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
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-blue-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-rose-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[120px]" />
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
            <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-blue-500/15 to-rose-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">Perfiles</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Navegadores y{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Perfiles
            </span>
          </h1>
          <p className="text-white/40 text-lg mt-2">
            <span className="text-blue-400 font-bold">{rule.split('=')[0]?.trim() || '1 CONTEXTO'}</span>
            <span className="text-white/30 mx-3">=</span>
            <span className="text-rose-400 font-bold">{rule.split('=')[1]?.trim() || '1 PERFIL'}</span>
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-stretch gap-8">
            
            {/* TRABAJO - Edge */}
            <motion.div {...getMotionProps(0.2)}>
              <div className="w-80 h-full rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-transparent backdrop-blur-sm overflow-hidden shadow-xl shadow-blue-500/10">
                <div className="bg-blue-500/10 px-5 py-3 border-b border-blue-500/20">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">Trabajo</span>
                  </div>
                </div>
                
                <div className="p-8 flex justify-center">
                  <div className="w-24 h-24 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                      <defs>
                        <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0078D4" />
                          <stop offset="50%" stopColor="#00B294" />
                          <stop offset="100%" stopColor="#00D4AA" />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="45" fill="url(#edge-gradient)" />
                      <path d="M25,50 Q25,25 50,25 Q75,25 75,50 Q75,60 65,65 Q55,70 50,70 Q30,70 25,50" fill="white" opacity="0.9" />
                    </svg>
                  </div>
                </div>
                
                <div className="px-6 pb-6 space-y-1.5">
                  {work.services.map((service, i) => (
                    <p key={i} className="text-white/70 font-medium text-sm">{service}</p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Center - Benefits */}
            <motion.div {...getMotionProps(0.3)} className="flex flex-col items-center justify-center gap-5">
              <div className="flex items-center gap-3">
                <motion.div {...(isExporting ? {} : { animate: { x: [0, 6, 0] }, transition: { duration: 1.5, repeat: Infinity } })}>
                  <ArrowRight className="w-5 h-5 text-blue-400" />
                </motion.div>
                <motion.div {...(isExporting ? {} : { animate: { x: [0, -6, 0] }, transition: { duration: 1.5, repeat: Infinity } })} className="rotate-180">
                  <ArrowRight className="w-5 h-5 text-rose-400" />
                </motion.div>
              </div>
              
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20 max-w-[220px] text-center shadow-lg shadow-cyan-500/5">
                <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">
                  Beneficio
                </p>
                <p className="text-white font-black text-lg mb-2">{benefit.title}</p>
                <p className="text-white/50 text-xs leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-semibold">Sin conflictos de login</span>
              </div>
              
              <div className="flex items-center gap-3 mt-2">
                <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <ArrowRight className="w-4 h-4 text-white/30" />
                <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30">
                  <Home className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </motion.div>

            {/* PERSONAL - Chrome */}
            <motion.div {...getMotionProps(0.4)}>
              <div className="w-80 h-full rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/[0.08] via-transparent to-transparent backdrop-blur-sm overflow-hidden shadow-xl shadow-rose-500/10">
                <div className="bg-rose-500/10 px-5 py-3 border-b border-rose-500/20">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-400 font-bold uppercase tracking-wider text-sm">Personal</span>
                  </div>
                </div>
                
                <div className="p-8 flex justify-center">
                  <div className="w-24 h-24 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                      <circle cx="50" cy="50" r="45" fill="#4285F4" />
                      <path d="M50,5 L95,50 L50,50 Z" fill="#EA4335" />
                      <path d="M95,50 L50,95 L50,50 Z" fill="#FBBC04" />
                      <path d="M50,95 L5,50 L50,50 Z" fill="#34A853" />
                      <circle cx="50" cy="50" r="18" fill="white" />
                      <circle cx="50" cy="50" r="12" fill="#4285F4" />
                    </svg>
                  </div>
                </div>
                
                <div className="px-6 pb-6 space-y-1.5">
                  {personal.services.map((service, i) => (
                    <p key={i} className="text-white/70 font-medium text-sm">{service}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        14 / 29
      </div>
    </div>
  );
}
