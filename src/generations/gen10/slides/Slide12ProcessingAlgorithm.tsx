import React from 'react';
import { motion } from 'framer-motion';
import { FolderArchive, Trash2, Reply, ArrowRight, Lightbulb, Target, Workflow, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const DEFAULT_STEPS = [
  { 
    icon: FolderArchive, 
    title: 'ARCHIVAR', 
    desc: 'Si ya se leyó o es referencia', 
    detail: '(se va a "Todos")',
    color: 'amber'
  },
  { 
    icon: Trash2, 
    title: 'BORRAR', 
    desc: 'Si es basura o irrelevante',
    detail: '',
    color: 'rose'
  },
  { 
    icon: Reply, 
    title: 'RESPONDER', 
    desc: 'Si requiere acción inmediata',
    detail: '(luego archivar)',
    color: 'emerald'
  },
] as const;

const ICON_MAP: Record<string, LucideIcon> = {
  archive: FolderArchive,
  trash: Trash2,
  reply: Reply,
};

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', glow: 'shadow-rose-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
};

export function Slide12ProcessingAlgorithm() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(12);
  
  // Database-driven content with fallbacks
  const proTip = (content.proTip as string) || 'Habilitar el botón "Enviar y Archivar" en Gmail.';
  const goal = (content.goal as string) || 'Bandeja de entrada = 0 al final de la semana.';
  const dbSteps = content.steps as Array<{ title: string; desc: string; detail?: string; color: string }>;
  
  const STEPS = dbSteps ? dbSteps.map((s, i) => ({
    ...s,
    icon: DEFAULT_STEPS[i]?.icon || FolderArchive,
  })) : DEFAULT_STEPS;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex flex-col font-sans selection:bg-amber-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-emerald-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-rose-500/[0.04] rounded-full blur-[150px]" />
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
        <motion.header {...getMotionProps(0.1)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-amber-500/15 to-emerald-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm">
              <Workflow className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">Algoritmo</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Algoritmo de{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Procesamiento
            </span>
          </h1>
          <p className="text-white/40 text-lg mt-2">
            Tocar el correo <span className="text-amber-400/70 font-semibold">una sola vez</span>
          </p>
        </motion.header>

        {/* Three Steps Flow */}
        <motion.div {...getMotionProps(0.2)} className="flex-1 flex items-center justify-center">
          <div className="flex items-stretch gap-6">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.title}>
                <motion.div
                  {...(isExporting ? {} : {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 + i * 0.15, duration: 0.5 },
                  })}
                  className="flex flex-col items-center"
                >
                  {(() => {
                    const colors = COLOR_MAP[step.color] || COLOR_MAP.amber;
                    return (
                  <div className={`relative w-72 p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm shadow-xl ${colors.glow}`}>
                    
                    {/* Step number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-white/50 font-bold text-sm">{i + 1}</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      {/* Icon container */}
                      <div className={`w-20 h-20 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-5 shadow-lg ${colors.glow}`}>
                        <step.icon className={`w-10 h-10 ${colors.text}`} strokeWidth={1.5} />
                      </div>
                      
                      {/* Title */}
                      <h3 className={`font-black text-2xl tracking-wider mb-3 ${colors.text}`}>
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white/60 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                      {step.detail && (
                        <p className={`${colors.text} text-xs mt-1 font-medium`}>
                          {step.detail}
                        </p>
                      )}
                    </div>
                  </div>
                    );
                  })()}
                </motion.div>
                
                {i < STEPS.length - 1 && (
                  <div className="flex items-center">
                    <motion.div
                      {...(isExporting ? {} : {
                        animate: { x: [0, 8, 0] },
                        transition: { duration: 1.5, repeat: Infinity, delay: i * 0.3 }
                      })}
                    >
                      <ArrowRight className="w-8 h-8 text-white/20" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Bottom Tips */}
        <motion.div {...getMotionProps(0.5)} className="mt-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="relative rounded-2xl p-5 bg-gradient-to-br from-amber-500/[0.06] via-transparent to-transparent border border-amber-500/20 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">Pro Tip</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {proTip}
                </p>
              </div>
            </div>
            
            <div className="relative rounded-2xl p-5 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent border border-emerald-500/20 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <Target className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Meta</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {goal}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        12 / 29
      </div>
    </div>
  );
}
