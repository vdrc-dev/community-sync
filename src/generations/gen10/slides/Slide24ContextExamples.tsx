import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Lightbulb, Package, Brain, User, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, ContextExampleItem } from '@/hooks/useSlideContent';

// Icon map for dynamic rendering
const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp, Lightbulb, Package,
};

// Color map for dynamic styling
const COLOR_MAP = {
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', accent: 'bg-violet-500', glow: 'shadow-violet-500/20' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', accent: 'bg-purple-500', glow: 'shadow-purple-500/20' },
  fuchsia: { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', accent: 'bg-fuchsia-500', glow: 'shadow-fuchsia-500/20' },
} as const;

// Default fallback data
const DEFAULT_EXAMPLES: ContextExampleItem[] = [
  { title: 'FINANCIERO', icon: 'TrendingUp', desc: 'Soy Gerente de Finanzas. Trabajo con balances en Excel. Uso términos como EBITDA, Margen Operacional y UF. Necesito análisis de riesgo y proyecciones conservadoras.', label: 'A', color: 'violet' },
  { title: 'ESTRATEGIA', icon: 'Lightbulb', desc: 'Soy consultor de transformación digital. Me enfoco en optimización de procesos y "Vibe Coding". Busco ideas disruptivas y esquemas paso a paso.', label: 'B', color: 'purple' },
  { title: 'OPERACIONES', icon: 'Package', desc: 'Gestiono logística y grandes volúmenes de datos. Necesito procesar correos, extraer fechas y organizar tablas de inventario.', label: 'C', color: 'fuchsia' },
];

export function Slide24ContextExamples() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(24);

  // Use data from DB or fallback to defaults
  const examples = content.contextExamples || DEFAULT_EXAMPLES;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex flex-col font-sans selection:bg-violet-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-violet-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] bg-purple-500/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-fuchsia-500/[0.05] rounded-full blur-[150px]" />
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
        <motion.div {...getMotionProps(0.1)} className="mb-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
              <User className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                ¿QUIÉN ERES? <span className="text-violet-400">(TU CONTEXTO)</span>
              </h1>
              <p className="text-white/50 text-lg mt-1">
                Dale "memoria" al modelo antes de empezar. Define tu perfil para que actúe como tu <span className="text-violet-400/80">socio, no como un buscador</span>.
              </p>
            </div>
          </div>
          {/* AI/Brain decoration */}
          <div className="absolute top-8 right-12 flex items-center gap-2 opacity-30">
            <Brain className="w-12 h-12 text-violet-400" strokeWidth={1} />
          </div>
        </motion.div>

        {/* Three Examples */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          {examples.map((example, i) => {
            const colors = COLOR_MAP[example.color as keyof typeof COLOR_MAP] || COLOR_MAP.violet;
            const Icon = ICON_MAP[example.icon] || TrendingUp;
            return (
              <motion.div
                key={example.title}
                {...getMotionProps(0.2 + i * 0.1)}
                className={`relative ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 flex flex-col shadow-xl ${colors.glow}`}
              >
                {/* Label badge */}
                <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full ${colors.accent} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-black text-lg">{example.label}</span>
                </div>
                
                {/* Icon area */}
                <div className="mb-5 flex justify-center">
                  <div className={`w-16 h-16 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className={`${colors.text} font-black text-lg mb-4 text-center tracking-wide`}>
                  EJEMPLO {example.label} — {example.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/70 text-center text-sm leading-relaxed flex-1">
                  "{example.desc}"
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        24 / 29
      </div>
    </div>
  );
}
