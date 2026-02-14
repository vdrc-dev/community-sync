import React from 'react';
import { motion } from 'framer-motion';
import { Puzzle, Pin, Settings, ArrowDown, Anchor, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, ExtensionStep } from '@/hooks/useSlideContent';

// Icon map for dynamic rendering
const ICON_MAP: Record<string, LucideIcon> = {
  Puzzle, Pin, Settings,
};

// Color map for dynamic styling
const COLOR_MAP = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
} as const;

// Default fallback data
const DEFAULT_STEPS: ExtensionStep[] = [
  { num: '1', title: 'ENCUENTRA EL ÍCONO DE EXTENSIONES', desc: 'Busca el ícono con forma de pieza de puzle en la parte superior de tu navegador.', icon: 'Puzzle', color: 'cyan' },
  { num: '2', title: 'ANCLA TU GESTOR DE CONTRASEÑAS', desc: "Dentro del menú, 'ancla' tu gestor de contraseñas favorito. Solo una vez por sesión.", icon: 'Pin', color: 'emerald' },
  { num: '3', title: 'CONFIGURACIONES PERSONALIZADAS', desc: 'Cada sesión de navegador guarda su propia configuración. No repetirás ajustes o inicios de sesión.', icon: 'Settings', color: 'amber' },
];

export function Slide16ExtensionAnchoring() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(16);

  // Use data from DB or fallback to defaults
  const steps = content.extensionSteps || DEFAULT_STEPS;

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
        <div className="absolute top-1/4 left-0 w-[500px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-emerald-500/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/[0.04] rounded-full blur-[100px]" />
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
            <div className="flex items-center gap-2.5 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <Anchor className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">Extensiones</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Anclaje de{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Extensiones
            </span>
          </h1>
        </motion.header>

        {/* Steps */}
        <div className="flex-1 flex flex-col gap-4 max-w-5xl mx-auto w-full">
          {steps.map((step, i) => {
            const colors = COLOR_MAP[step.color as keyof typeof COLOR_MAP] || COLOR_MAP.cyan;
            const Icon = ICON_MAP[step.icon] || Puzzle;
            return (
              <React.Fragment key={step.num}>
                <motion.div
                  {...getMotionProps(0.2 + i * 0.1)}
                  className="flex items-center gap-6"
                >
                  {/* Number */}
                  <div className={`w-20 h-20 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-xl ${colors.glow}`}>
                    <span className={`text-5xl font-black ${colors.text}`}>{step.num}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 bg-white/[0.02] rounded-2xl p-5 border ${colors.border} backdrop-blur-sm`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${colors.bg} rounded-xl border ${colors.border} flex-shrink-0`}>
                        <Icon className={`w-7 h-7 ${colors.text}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold ${colors.text} mb-1`}>{step.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {i < steps.length - 1 && (
                  <div className="flex justify-start pl-9">
                    <motion.div
                      {...(isExporting ? {} : {
                        animate: { y: [0, 4, 0] },
                        transition: { duration: 1.5, repeat: Infinity, delay: i * 0.2 }
                      })}
                    >
                      <ArrowDown className={`w-5 h-5 ${colors.text} opacity-50`} />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        16 / 29
      </div>
    </div>
  );
}
