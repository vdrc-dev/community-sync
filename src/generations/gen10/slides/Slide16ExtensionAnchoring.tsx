import React from 'react';
import { motion } from 'framer-motion';
import { Puzzle, Pin, Settings, ArrowDown, Anchor, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, ExtensionStep } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';

const ICON_MAP: Record<string, LucideIcon> = { Puzzle, Pin, Settings };
const COLOR_MAP = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
} as const;

const DEFAULT_STEPS: ExtensionStep[] = [
  { num: '1', title: 'ENCUENTRA EL ÍCONO DE EXTENSIONES', desc: 'Busca el ícono con forma de pieza de puzle en la parte superior de tu navegador.', icon: 'Puzzle', color: 'cyan' },
  { num: '2', title: 'ANCLA TU GESTOR DE CONTRASEÑAS', desc: "Dentro del menú, 'ancla' tu gestor de contraseñas favorito. Solo una vez por sesión.", icon: 'Pin', color: 'emerald' },
  { num: '3', title: 'CONFIGURACIONES PERSONALIZADAS', desc: 'Cada sesión de navegador guarda su propia configuración. No repetirás ajustes o inicios de sesión.', icon: 'Settings', color: 'amber' },
];

export function Slide16ExtensionAnchoring() {
  const m = useS1Motion();
  const { isExporting } = useExportContext();
  const content = useSlideContent(16);
  const steps = content.extensionSteps || DEFAULT_STEPS;

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col" radials={
      <>
        <div className="absolute top-1/4 left-0 w-[500px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-emerald-500/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/[0.04] rounded-full blur-[100px]" />
      </>
    }>
      <div className="relative z-10 flex flex-col h-full px-5 sm:px-12 py-8">
        <motion.header {...m(0.1)} className="mb-8">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm w-fit mb-3">
            <Anchor className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">Extensiones</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Anclaje de{' '}
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Extensiones</span>
          </h1>
        </motion.header>

        <div className="flex-1 flex flex-col gap-4 max-w-5xl mx-auto w-full">
          {steps.map((step, i) => {
            const colors = COLOR_MAP[step.color as keyof typeof COLOR_MAP] || COLOR_MAP.cyan;
            const Icon = ICON_MAP[step.icon] || Puzzle;
            return (
              <React.Fragment key={step.num}>
                <motion.div {...m(0.2 + i * 0.1)} className="flex items-center gap-4 sm:gap-6">
                  <div className={`w-16 sm:w-20 h-16 sm:h-20 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-xl ${colors.glow}`}>
                    <span className={`text-4xl sm:text-5xl font-black ${colors.text}`}>{step.num}</span>
                  </div>
                  <div className={`flex-1 bg-white/[0.02] rounded-2xl p-4 sm:p-5 border ${colors.border} backdrop-blur-sm`}>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`p-2 sm:p-3 ${colors.bg} rounded-xl border ${colors.border} flex-shrink-0`}>
                        <Icon className={`w-5 sm:w-7 h-5 sm:h-7 ${colors.text}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className={`text-base sm:text-lg font-bold ${colors.text} mb-1`}>{step.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="flex justify-start pl-7 sm:pl-9">
                    <motion.div {...(isExporting ? {} : { animate: { y: [0, 4, 0] }, transition: { duration: 1.5, repeat: Infinity, delay: i * 0.2 } })}>
                      <ArrowDown className={`w-5 h-5 ${colors.text} opacity-50`} />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </S1Shell>
  );
}
