import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Cog, Bot, Dumbbell, Brain, Heart, Users, Compass, Lightbulb } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const dimensions = [
  { name: 'Física', icon: Dumbbell, color: 'emerald', emoji: '💪' },
  { name: 'Mental', icon: Brain, color: 'cyan', emoji: '🧠' },
  { name: 'Espiritual', icon: Heart, color: 'rose', emoji: '💫' },
  { name: 'Social', icon: Users, color: 'amber', emoji: '🤝' },
];

const DEFAULT_INSIGHTS = [
  {
    icon: Hammer,
    label: 'El Problema',
    text: '"No tengo tiempo para afilar la sierra porque estoy muy ocupado aserrando."',
    color: 'rose',
  },
  {
    icon: Cog,
    label: 'La Solución',
    text: 'Dedicar tiempo a optimizar el sistema (Higiene) para que el trabajo fluya sin fricción.',
    color: 'emerald',
  },
  {
    icon: Bot,
    label: 'El Insight',
    text: 'Delegar en sistemas tecnológicos antes que en personas.',
    color: 'cyan',
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  emerald: { border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  cyan: { border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  rose: { border: 'border-rose-500/40', bg: 'bg-rose-500/10', text: 'text-rose-400' },
  amber: { border: 'border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-400' },
};

export function Slide07SharpenPhilosophy() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(7);
  
  // Database-driven content with fallbacks
  const philosophyQuote = (content.philosophyQuote as string) || 'Delegar primero en tecnología, después en personas';
  const mantra = (content.mantra as string) || 'Cuando automatizamos liberamos el potencial humano';
  const paradigm = content.paradigm as { old: string; new: string } | undefined;
  
  // Build insights array from database content
  const insights = [
    {
      icon: Hammer,
      label: 'El Problema',
      text: '"No tengo tiempo para afilar la sierra porque estoy muy ocupado aserrando."',
      color: 'rose',
    },
    {
      icon: Cog,
      label: 'La Solución',
      text: paradigm?.new || 'Delegar en tecnología (automatización, IA, sistemas).',
      color: 'emerald',
    },
    {
      icon: Bot,
      label: 'El Insight',
      text: philosophyQuote,
      color: 'cyan',
    },
  ];

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex font-sans selection:bg-emerald-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-emerald-500/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[400px] bg-cyan-500/6 rounded-full blur-[150px]" />
        
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating particles */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-24 left-16 w-2.5 h-2.5 rounded-full bg-emerald-400/50"
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 right-1/3 w-2 h-2 rounded-full bg-cyan-400/40"
            animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}

      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-center px-12 py-10 relative z-10">
        
        {/* Header */}
        <motion.div {...getMotionProps(0.1)} className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-500/30 rounded-full">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Modelo</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-2">
            AFILAR LA{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 40%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SIERRA
            </span>
          </h1>
          <p className="text-white/40 text-sm">Stephen Covey — Hábito #7</p>
        </motion.div>

        {/* Insights */}
        <motion.div 
          {...getMotionProps(0.2)}
          className="space-y-4"
        >
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            const colors = colorMap[insight.color];
            return (
              <motion.div
                key={i}
                {...(isExporting ? {} : {
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.3 + i * 0.12 }
                })}
                className="group relative"
              >
                <div className={`absolute -inset-px bg-gradient-to-r from-${insight.color}-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`} />
                
                <div className={`relative flex items-start gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] group-hover:border-${insight.color}-500/30 transition-colors`}>
                  <div className={`p-2.5 ${colors.bg} rounded-lg border ${colors.border} shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`${colors.text} font-bold text-sm`}>{insight.label}</p>
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{insight.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right Panel - Circular Diagram */}
      <div className="flex-1 flex items-center justify-center py-10 pr-12 relative z-10">
        <motion.div 
          {...getMotionProps(0.3)}
          className="relative"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-[320px] h-[320px] -m-[10px] rounded-full bg-emerald-500/5 blur-xl" />
          
          {/* Main Circle Container */}
          <div className="relative w-[300px] h-[300px]">
            
            {/* Rotating dashed ring */}
            <motion.div
              {...(isExporting ? {} : {
                animate: { rotate: 360 },
                transition: { duration: 40, repeat: Infinity, ease: 'linear' }
              })}
              className="absolute -inset-8 rounded-full border border-dashed border-emerald-500/20"
            />
            
            {/* Outer gradient ring */}
            <motion.div
              {...(isExporting ? {} : {
                animate: { rotate: -360 },
                transition: { duration: 30, repeat: Infinity, ease: 'linear' }
              })}
              className="absolute inset-0 rounded-full p-[2px]"
              style={{
                background: 'conic-gradient(from 0deg, rgba(16,185,129,0.4), rgba(6,182,212,0.4), rgba(251,191,36,0.3), rgba(244,63,94,0.3), rgba(16,185,129,0.4))',
              }}
            >
              <div className="w-full h-full rounded-full bg-[#020609]" />
            </motion.div>
            
            {/* Inner circles */}
            <div className="absolute inset-6 rounded-full border border-emerald-500/15" />
            <div className="absolute inset-12 rounded-full border border-emerald-500/10" />
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                {...(isExporting ? {} : {
                  animate: { scale: [1, 1.05, 1] },
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                })}
                className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl"
              >
                <Lightbulb className="w-8 h-8 text-emerald-400" />
              </motion.div>
            </div>

            {/* Dimension Labels - positioned around the circle */}
            {dimensions.map((dim, i) => {
              const Icon = dim.icon;
              const colors = colorMap[dim.color];
              const positions = [
                { top: '-60px', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', right: '-70px', transform: 'translateY(-50%)' },
                { bottom: '-60px', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', left: '-70px', transform: 'translateY(-50%)' },
              ];
              
              return (
                <motion.div
                  key={dim.name}
                  {...(isExporting ? {} : {
                    initial: { opacity: 0, scale: 0.5 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 0.5 + i * 0.1, type: 'spring' }
                  })}
                  className="absolute flex flex-col items-center gap-1.5 group"
                  style={positions[i]}
                >
                  <div className={`p-3 bg-[#0a0f14] rounded-xl border ${colors.border} group-hover:bg-${dim.color}-500/10 transition-colors`}
                    style={{ boxShadow: `0 0 20px rgba(16,185,129,0.2)` }}
                  >
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-semibold text-xs">{dim.name}</span>
                    <span className="text-sm">{dim.emoji}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom label */}
          <motion.div
            {...getMotionProps(0.8)}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-white/50 text-xs font-medium">Ciclo de Renovación Activo</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/15 tabular-nums tracking-wide">
        7 / 29
      </div>
    </div>
  );
}
