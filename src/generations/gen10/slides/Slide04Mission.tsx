import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Cog, Target, Rocket, Quote, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const ICON_MAP: Record<string, LucideIcon> = {
  brain: Brain,
  clock: Clock,
  cog: Cog,
  target: Target,
};

const DEFAULT_PILLARS = [
  {
    verb: 'CUESTIONEN',
    action: 'Los paradigmas operativos que les consume el tiempo',
    icon: 'brain',
    color: 'violet',
  },
  {
    verb: 'VALOREN',
    action: 'Su tiempo real vs. el costo de las herramientas',
    icon: 'clock',
    color: 'amber',
  },
  {
    verb: 'DELEGUEN',
    action: 'Primero en tecnología, después en personas',
    icon: 'cog',
    color: 'teal',
    highlight: true,
  },
  {
    verb: 'CONCENTREN',
    action: 'Su energía en resolver desafíos de alto impacto',
    icon: 'target',
    color: 'rose',
  },
];

const EMOJI_MAP: Record<string, string> = {
  brain: '🧠',
  clock: '⏳',
  cog: '⚙️',
  target: '🎯',
};

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  violet: { border: 'border-violet-500/40', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'violet-500' },
  amber: { border: 'border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'amber-500' },
  teal: { border: 'border-teal-500/50', bg: 'bg-teal-500/15', text: 'text-teal-400', glow: 'teal-500' },
  rose: { border: 'border-rose-500/40', bg: 'bg-rose-500/10', text: 'text-rose-400', glow: 'rose-500' },
};

const DEFAULT_QUOTE = 'La tecnología no es el fin, sino el medio. Cuando automatizamos lo trivial, liberamos el potencial humano para enfocarse en lo que verdaderamente importa.';

export function Slide04Mission() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(4);
  
  // Use database content with fallback to defaults
  const pillars = (content.pillars as Array<{ verb: string; action: string; icon?: string; color: string; highlight?: boolean }>) || DEFAULT_PILLARS;
  const mainQuote = (content.mainQuote as string) || DEFAULT_QUOTE;

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
        <div className="absolute top-0 left-1/3 w-[700px] h-[500px] bg-teal-500/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-violet-500/6 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
        
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating particles */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-24 right-24 w-2.5 h-2.5 rounded-full bg-teal-400/50"
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 left-20 w-2 h-2 rounded-full bg-violet-400/40"
            animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-10">
        
        {/* Header */}
        <motion.header {...getMotionProps(0.1)} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/10 border border-teal-500/30 rounded-full">
              <Rocket className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-sm font-semibold tracking-wide uppercase">Propósito</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            MI{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 40%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MISIÓN
            </span>
          </h1>
          <p className="text-white/40 text-lg mt-3 font-light max-w-3xl">
            Transformar la manera en que las personas operan mediante pensamiento sistémico y automatización inteligente.
          </p>
        </motion.header>

        {/* Central Quote */}
        <motion.div 
          {...getMotionProps(0.2)}
          className="mb-8 relative"
        >
          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 via-teal-400 to-transparent rounded-full" />
          
          <div className="pl-6 py-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm">
            <Quote className="w-6 h-6 text-teal-500/30 mb-2" />
            
            <p className="text-white/50 text-sm uppercase tracking-widest mb-2">
              Mi propósito es catalizar un cambio fundamental
            </p>
            <p className="text-white/80 text-base leading-relaxed mb-3">{mainQuote}</p>
            <p className="text-xl font-bold tracking-wide">
              <span className="text-teal-400">Crear</span>
              <span className="text-white/30 mx-2">•</span>
              <span className="text-emerald-400">Innovar</span>
              <span className="text-white/30 mx-2">•</span>
              <span className="text-cyan-400">Generar Valor Exponencial</span>
            </p>
          </div>
        </motion.div>

        {/* Four Pillars */}
        <div className="grid grid-cols-4 gap-5 flex-1">
          {pillars.map((pillar, i) => {
            const iconKey = pillar.icon || Object.keys(ICON_MAP)[i];
            const Icon = ICON_MAP[iconKey] || Brain;
            const colors = colorMap[pillar.color] || colorMap.violet;
            const isHighlight = pillar.highlight || pillar.color === 'teal';
            const emoji = EMOJI_MAP[iconKey] || '✨';
            
            return (
              <motion.div
                key={pillar.verb}
                {...getMotionProps(0.3 + i * 0.1)}
                className="group relative"
              >
                {/* Hover glow */}
                <div className={`absolute -inset-px bg-gradient-to-b from-${pillar.color}-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`} />
                
                <div className={`relative h-full bg-white/[0.02] border ${isHighlight ? 'border-teal-500/40 bg-teal-500/[0.03]' : 'border-white/[0.06]'} rounded-2xl p-5 flex flex-col group-hover:border-opacity-60 transition-all`}>
                  
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-4 right-4 h-0.5 rounded-full ${isHighlight ? 'bg-teal-400' : `bg-${pillar.color}-500/50`}`} />
                  
                  {/* Icon */}
                  <div className={`p-3 rounded-xl mb-4 w-fit ${colors.bg} border ${colors.border} group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} strokeWidth={1.5} />
                  </div>
                  
                  {/* Title with emoji */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-xl font-bold ${isHighlight ? 'text-teal-400' : 'text-white'}`}>
                      {pillar.verb}
                    </h3>
                    <motion.span 
                      className="text-lg opacity-60 group-hover:opacity-100 transition-opacity"
                      whileHover={isExporting ? {} : { scale: 1.2 }}
                    >
                      {emoji}
                    </motion.span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    {pillar.action}
                  </p>
                  
                  {/* Bottom indicator */}
                  <div className="mt-4 pt-3 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isHighlight ? 'bg-teal-400' : 'bg-white/20'}`} />
                      <span className={`text-xs font-medium ${isHighlight ? 'text-teal-400/70' : 'text-white/30'}`}>
                        {isHighlight ? 'Core Focus' : `Pilar ${i + 1}`}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/15 tabular-nums tracking-wide">
        4 / 29
      </div>
    </div>
  );
}
