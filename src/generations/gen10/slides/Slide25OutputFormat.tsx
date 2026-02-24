import React from 'react';
import { motion } from 'framer-motion';
import { Table, FileCode, MessageSquare, Shield, Workflow, User, Settings, LucideIcon } from 'lucide-react';
import { useSlideContent, OutputQuadrant } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';

const ICON_MAP: Record<string, LucideIcon> = { Table, FileCode, MessageSquare, Shield, Workflow, User };
const COLOR_MAP = {
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', glow: 'shadow-violet-500/20' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', glow: 'shadow-rose-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
} as const;

const DEFAULT_QUADRANTS: OutputQuadrant[] = [
  { title: 'FORMATO', icons: ['Table', 'FileCode'], desc: 'Usa siempre tablas para comparar datos, responde en formato Markdown y crea bloques de código para copiar fácil.', color: 'violet' },
  { title: 'TONO', icons: ['User', 'MessageSquare'], desc: 'Profesional pero directo. Sin introducciones innecesarias. Actúa como un experto Senior.', color: 'purple' },
  { title: 'SEGURIDAD', icons: ['Shield'], desc: "Si no sabes la respuesta, dime 'no sé'. No inventes datos.", color: 'rose' },
  { title: 'METODOLOGÍA', icons: ['Workflow'], desc: "Antes de responder, usa 'Chain of Thought' (piensa paso a paso).", color: 'emerald' },
];

export function Slide25OutputFormat() {
  const m = useS1Motion();
  const content = useSlideContent(25);
  const quadrants = content.outputQuadrants || DEFAULT_QUADRANTS;

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col" radials={
      <>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/[0.05] rounded-full blur-[150px]" />
      </>
    }>
      <div className="relative z-10 flex flex-col h-full px-5 sm:px-12 py-8">
        <motion.div {...m(0.1)} className="mb-6">
          <div className="flex items-center gap-5">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
              <Settings className="w-6 sm:w-7 h-6 sm:h-7 text-violet-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">¿CÓMO QUIERES LA <span className="text-violet-400">RESPUESTA</span>?</h1>
              <p className="text-white/50 text-base sm:text-lg mt-1">Define el formato de salida (OUTPUT). Controla la personalidad y la estructura de la IA.</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {quadrants.map((quad, i) => {
            const colors = COLOR_MAP[quad.color as keyof typeof COLOR_MAP] || COLOR_MAP.violet;
            return (
              <motion.div key={quad.title} {...m(0.2 + i * 0.08)} className={`${colors.bg} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 shadow-xl ${colors.glow}`}>
                <div className="flex gap-3 mb-4 justify-center">
                  {quad.icons.map((iconName, j) => {
                    const Icon = ICON_MAP[iconName] || Table;
                    return <div key={j} className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}><Icon className={`w-6 h-6 ${colors.text}`} strokeWidth={1.5} /></div>;
                  })}
                </div>
                <h3 className={`${colors.text} font-black text-xl mb-3 text-center tracking-wider`}>{quad.title}</h3>
                <p className="text-white/60 text-center text-sm leading-relaxed">{quad.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </S1Shell>
  );
}
