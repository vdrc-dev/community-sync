import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Cog, Target, Rocket, Quote, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

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
  const m = useS1Motion();
  
  const pillars = (content.pillars as Array<{ verb: string; action: string; icon?: string; color: string; highlight?: boolean }>) || DEFAULT_PILLARS;
  const mainQuote = (content.mainQuote as string) || DEFAULT_QUOTE;

  const accentMap: Record<string, (typeof S1_ACCENT)[keyof typeof S1_ACCENT]> = {
    violet: S1_ACCENT.purple,
    amber: S1_ACCENT.amber,
    teal: S1_ACCENT.emerald,
    rose: S1_ACCENT.rose,
  };

  return (
    <S1Shell
      footerLabel="PROPÓSITO"
      className="flex flex-col"
      radials={<>
        <div className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full blur-[180px]" style={{ background: 'hsl(160 65% 45% / 0.08)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[150px]" style={{ background: 'hsl(263 60% 55% / 0.06)' }} />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'hsl(38 90% 55% / 0.05)' }} />
      </>}
    >
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-12 py-8 sm:py-10">
        {/* Header */}
        <motion.header {...m(0.1)} className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Rocket className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: S1_ACCENT.emerald.text }}>Propósito</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            MI{' '}
            <span style={{ background: `linear-gradient(135deg, ${S1_ACCENT.emerald.text}, ${S1_ACCENT.cyan.text})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MISIÓN</span>
          </h1>
          <p className="text-white/40 text-base sm:text-lg mt-3 font-light max-w-3xl">
            Transformar la manera en que las personas operan mediante pensamiento sistémico y automatización inteligente.
          </p>
        </motion.header>

        {/* Central Quote */}
        <motion.div {...m(0.2)} className="mb-6 sm:mb-8 relative">
          <div className="absolute -left-2 top-0 bottom-0 w-1 rounded-full" style={{ background: `linear-gradient(180deg, ${S1_ACCENT.emerald.dot}, transparent)` }} />
          <div className="pl-6 py-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm">
            <Quote className="w-6 h-6 mb-2" style={{ color: 'hsl(160 65% 45% / 0.3)' }} />
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-3">{mainQuote}</p>
            <p className="text-lg sm:text-xl font-bold tracking-wide">
              <span style={{ color: S1_ACCENT.emerald.text }}>Crear</span>
              <span className="text-white/30 mx-2">•</span>
              <span style={{ color: S1_ACCENT.cyan.text }}>Innovar</span>
              <span className="text-white/30 mx-2">•</span>
              <span style={{ color: S1_ACCENT.blue.text }}>Generar Valor</span>
            </p>
          </div>
        </motion.div>

        {/* Four Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 flex-1">
          {pillars.map((pillar, i) => {
            const iconKey = pillar.icon || Object.keys(ICON_MAP)[i];
            const Icon = ICON_MAP[iconKey] || Brain;
            const accent = accentMap[pillar.color] || S1_ACCENT.emerald;
            const isHighlight = pillar.highlight || pillar.color === 'teal';
            const emoji = EMOJI_MAP[iconKey] || '✨';
            
            return (
              <motion.div key={pillar.verb} {...m(0.3 + i * 0.1)} className="group relative">
                <div className={`relative h-full bg-white/[0.02] border rounded-2xl p-4 sm:p-5 flex flex-col transition-all`}
                  style={{ borderColor: isHighlight ? accent.border : 'hsl(0 0% 100% / 0.06)', background: isHighlight ? accent.bg : undefined }}>
                  <div className="absolute top-0 left-4 right-4 h-0.5 rounded-full" style={{ background: accent.dot }} />
                  <div className="p-3 rounded-xl mb-4 w-fit border" style={{ background: accent.bg, borderColor: accent.border }}>
                    <Icon className="w-6 sm:w-7 h-6 sm:h-7" style={{ color: accent.text }} strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold" style={{ color: isHighlight ? accent.text : 'white' }}>{pillar.verb}</h3>
                    <span className="text-lg opacity-60">{emoji}</span>
                  </div>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed flex-1">{pillar.action}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </S1Shell>
  );
}
