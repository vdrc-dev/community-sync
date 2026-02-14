import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Sparkles, Signal, Laptop, Radio, CloudCog, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { useSlideContent, ParticipantItem, StatusItem } from '@/hooks/useSlideContent';

// Icon map for dynamic rendering
const ICON_MAP: Record<string, LucideIcon> = {
  Signal, Laptop, Radio, CloudCog,
};

// Default fallback data
const DEFAULT_PARTICIPANTS: ParticipantItem[] = [
  { name: 'BENJAMÍN RODRÍGUEZ', emoji: '🚀', role: 'Explorer' },
  { name: 'CRISTOBAL RISSO', emoji: '💡', role: 'Innovator' },
  { name: 'DIEGO MEZA', emoji: '⚡', role: 'Catalyst' },
  { name: 'JOSÉ PELLEGRINI', emoji: '🎯', role: 'Strategist' },
  { name: 'NICOLAS NAZAR', emoji: '🔥', role: 'Pioneer' },
  { name: 'PABLO AGUIRRE', emoji: '💎', role: 'Architect' },
  { name: 'VICTOR VILLALOBOS', emoji: '🌟', role: 'Visionary' },
];

const DEFAULT_STATUS_ITEMS: StatusItem[] = [
  { icon: 'Signal', label: 'Conexión', status: 'Estable' },
  { icon: 'Laptop', label: 'Equipos', status: 'Ready' },
  { icon: 'Radio', label: 'Stream', status: 'Live' },
  { icon: 'CloudCog', label: 'Cloud', status: 'Sync' },
];

export function Slide03Participants() {
  const { isExporting } = useExportContext();
  const { config } = useGeneration();
  const content = useSlideContent(2);

  // Use data from DB or fallback to defaults
  const participants = content.participants || DEFAULT_PARTICIPANTS;
  const statusItems = content.statusItems || DEFAULT_STATUS_ITEMS;
  const welcomeMessage = content.welcomeMessage || 'Bienvenidos al programa de productividad digital';

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex flex-col font-sans selection:bg-teal-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0">
        {/* Primary glow */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-teal-500/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-cyan-500/6 rounded-full blur-[150px]" />
        
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Subtle noise */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating orbs */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-32 left-16 w-3 h-3 rounded-full bg-teal-400/60"
            animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-48 right-32 w-2 h-2 rounded-full bg-cyan-400/50"
            animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-40 left-1/3 w-2.5 h-2.5 rounded-full bg-emerald-400/40"
            animate={{ y: [0, -25, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-10">
        
        {/* Header */}
        <motion.header {...getMotionProps(0.1)} className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            {/* Badge */}
            <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-teal-500/15 to-cyan-500/10 border border-teal-500/30 rounded-full">
              <Users className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-sm font-semibold tracking-wide uppercase">Equipo</span>
            </div>
            
            {/* Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-white/50 text-sm font-medium">{participants.length} participantes</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            GENERACIÓN{' '}
            <span className="relative">
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 40%, #0891b2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {config.generation}
              </span>
              {!isExporting && (
                <motion.span 
                  className="absolute -right-8 -top-1 text-2xl"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.span>
              )}
            </span>
          </h1>
          <p className="text-white/40 text-lg mt-3 font-light">{welcomeMessage}</p>
        </motion.header>

        {/* Main Grid */}
        <div className="flex-1 flex gap-10">
          
          {/* Participants List */}
          <div className="flex-1 grid grid-cols-2 gap-4 content-start">
            {participants.map((participant, i) => (
              <motion.div
                key={participant.name}
                {...getMotionProps(0.15 + i * 0.06)}
                className="group relative"
              >
                {/* Hover glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-teal-500/0 via-teal-500/30 to-cyan-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                
                <div className="relative flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl group-hover:border-teal-500/30 group-hover:bg-white/[0.04] transition-all duration-300">
                  
                  {/* Index number */}
                  <span className="text-white/[0.08] font-mono text-xs font-bold w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Check indicator */}
                  <div className="relative w-9 h-9 shrink-0">
                    <div className="absolute inset-0 bg-teal-500/10 border border-teal-500/30 rounded-xl group-hover:bg-teal-500/20 group-hover:border-teal-400/50 transition-all" />
                    <CheckCircle2 className="absolute inset-0 m-auto w-5 h-5 text-teal-400/30 group-hover:text-teal-400 transition-colors" />
                  </div>
                  
                  {/* Name & Role */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-lg font-bold tracking-wide truncate">{participant.name}</p>
                    <p className="text-white/30 text-xs font-medium uppercase tracking-widest">{participant.role}</p>
                  </div>
                  
                  {/* Emoji */}
                  <motion.span 
                    className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity shrink-0"
                    whileHover={isExporting ? {} : { scale: 1.3, rotate: 15 }}
                  >
                    {participant.emoji}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status Panel */}
          <motion.aside 
            {...getMotionProps(0.5)} 
            className="w-52 flex flex-col gap-4"
          >
            {/* Panel Header */}
            <div className="flex items-center gap-2 px-1">
              <Sparkles className="w-4 h-4 text-teal-400/70" />
              <span className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">Sistema</span>
            </div>
            
            {/* Status Items */}
            <div className="space-y-3">
              {statusItems.map((item, i) => {
                const Icon = ICON_MAP[item.icon] || Signal;
                return (
                  <motion.div
                    key={item.label}
                    {...getMotionProps(0.55 + i * 0.08)}
                    className="group flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/25 hover:bg-teal-500/[0.03] transition-all"
                  >
                    <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 group-hover:bg-teal-500/15 group-hover:border-teal-500/30 transition-colors">
                      <Icon className="w-4 h-4 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/70 text-sm font-medium">{item.label}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <motion.div 
                          className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                          animate={isExporting ? {} : { opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-emerald-400/70 text-xs font-medium">{item.status}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Ready Badge */}
            <motion.div 
              {...getMotionProps(0.9)}
              className="mt-auto p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/5 border border-teal-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full" />
                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">Ready</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Todos los sistemas operativos para iniciar la sesión
              </p>
            </motion.div>
          </motion.aside>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/15 tabular-nums tracking-wide">
        2 / 29
      </div>
    </div>
  );
}
