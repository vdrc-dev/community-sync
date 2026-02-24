import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Cog, Bot, Dumbbell, Brain, Heart, Users, Compass, Lightbulb } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

const dimensions = [
  { name: 'Física', icon: Dumbbell, color: 'emerald', emoji: '💪' },
  { name: 'Mental', icon: Brain, color: 'cyan', emoji: '🧠' },
  { name: 'Espiritual', icon: Heart, color: 'rose', emoji: '💫' },
  { name: 'Social', icon: Users, color: 'amber', emoji: '🤝' },
];

export function Slide07SharpenPhilosophy() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(7);
  const m = useS1Motion();
  
  const philosophyQuote = (content.philosophyQuote as string) || 'Delegar primero en tecnología, después en personas';
  const paradigm = content.paradigm as { old: string; new: string } | undefined;
  
  const insights = [
    { icon: Hammer, label: 'El Problema', text: '"No tengo tiempo para afilar la sierra porque estoy muy ocupado aserrando."', accent: S1_ACCENT.rose },
    { icon: Cog, label: 'La Solución', text: paradigm?.new || 'Delegar en tecnología (automatización, IA, sistemas).', accent: S1_ACCENT.emerald },
    { icon: Bot, label: 'El Insight', text: philosophyQuote, accent: S1_ACCENT.cyan },
  ];

  const dimAccents = [S1_ACCENT.emerald, S1_ACCENT.cyan, S1_ACCENT.rose, S1_ACCENT.amber];

  return (
    <S1Shell
      footerLabel="MODELO"
      className="flex"
      radials={<>
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full blur-[180px]" style={{ background: 'hsl(160 65% 45% / 0.08)' }} />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[400px] rounded-full blur-[150px]" style={{ background: 'hsl(185 70% 50% / 0.06)' }} />
      </>}
    >
      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-8 sm:py-10 relative z-10">
        <motion.div {...m(0.1)} className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Compass className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: S1_ACCENT.emerald.text }}>Modelo</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-2">
            AFILAR LA{' '}
            <span style={{ background: `linear-gradient(135deg, ${S1_ACCENT.emerald.text}, ${S1_ACCENT.cyan.text})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SIERRA</span>
          </h1>
          <p className="text-white/40 text-sm">Stephen Covey — Hábito #7</p>
        </motion.div>

        <motion.div {...m(0.2)} className="space-y-4">
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <motion.div key={i} {...(isExporting ? {} : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 + i * 0.12 } })}
                className="group relative">
                <div className="relative flex items-start gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] transition-colors">
                  <div className="p-2.5 rounded-lg border shrink-0" style={{ background: insight.accent.bg, borderColor: insight.accent.border }}>
                    <Icon className="w-5 h-5" style={{ color: insight.accent.text }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm mb-1" style={{ color: insight.accent.text }}>{insight.label}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{insight.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right Panel - Circular Diagram (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center py-10 pr-12 relative z-10">
        <motion.div {...m(0.3)} className="relative">
          <div className="relative w-[300px] h-[300px]">
            <motion.div {...(isExporting ? {} : { animate: { rotate: 360 }, transition: { duration: 40, repeat: Infinity, ease: 'linear' } })}
              className="absolute -inset-8 rounded-full border border-dashed" style={{ borderColor: S1_ACCENT.emerald.border }} />
            <motion.div {...(isExporting ? {} : { animate: { rotate: -360 }, transition: { duration: 30, repeat: Infinity, ease: 'linear' } })}
              className="absolute inset-0 rounded-full p-[2px]"
              style={{ background: `conic-gradient(from 0deg, ${S1_ACCENT.emerald.dot}, ${S1_ACCENT.cyan.dot}, ${S1_ACCENT.amber.dot}, ${S1_ACCENT.rose.dot}, ${S1_ACCENT.emerald.dot})` }}>
              <div className="w-full h-full rounded-full" style={{ background: '#030303' }} />
            </motion.div>
            <div className="absolute inset-6 rounded-full border" style={{ borderColor: 'hsl(160 65% 45% / 0.15)' }} />
            <div className="absolute inset-12 rounded-full border" style={{ borderColor: 'hsl(160 65% 45% / 0.1)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } })}
                className="p-4 rounded-xl border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                <Lightbulb className="w-8 h-8" style={{ color: S1_ACCENT.emerald.text }} />
              </motion.div>
            </div>
            {dimensions.map((dim, i) => {
              const Icon = dim.icon;
              const accent = dimAccents[i];
              const positions = [
                { top: '-60px', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', right: '-70px', transform: 'translateY(-50%)' },
                { bottom: '-60px', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', left: '-70px', transform: 'translateY(-50%)' },
              ];
              return (
                <motion.div key={dim.name} {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.5 + i * 0.1, type: 'spring' } })}
                  className="absolute flex flex-col items-center gap-1.5 group" style={positions[i]}>
                  <div className="p-3 bg-[#080808] rounded-xl border" style={{ borderColor: accent.border, boxShadow: `0 0 20px ${accent.glow}` }}>
                    <Icon className="w-5 h-5" style={{ color: accent.text }} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-semibold text-xs">{dim.name}</span>
                    <span className="text-sm">{dim.emoji}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </S1Shell>
  );
}
