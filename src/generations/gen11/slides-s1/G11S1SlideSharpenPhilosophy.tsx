import { motion } from 'framer-motion';
import { Hammer, Cog, Bot, Dumbbell, Brain, Heart, Users, Compass, Lightbulb } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import { useExportContext } from '@/contexts/ExportContext';

const INSIGHTS = [
  { icon: Hammer, label: 'El Problema', text: '"No tengo tiempo para afilar la sierra porque estoy muy ocupado aserrando."', accent: G11.rose },
  { icon: Cog, label: 'La Solución', text: 'Delegar en tecnología (automatización, IA, sistemas).', accent: G11.emerald },
  { icon: Bot, label: 'El Insight', text: 'Delegar primero en tecnología, después en personas.', accent: G11.cyan },
];

const DIMENSIONS = [
  { name: 'Física', icon: Dumbbell, emoji: '💪', accent: G11.emerald },
  { name: 'Mental', icon: Brain, emoji: '🧠', accent: G11.cyan },
  { name: 'Espiritual', icon: Heart, emoji: '💫', accent: G11.rose },
  { name: 'Social', icon: Users, emoji: '🤝', accent: G11.amber },
];

export function G11S1SlideSharpenPhilosophy() {
  const m = useG11Motion();
  const { isExporting } = useExportContext();
  return (
    <G11Shell className="flex items-stretch"
      radials={<>
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full blur-[180px]" style={{ background: 'rgba(61,153,112,0.08)' }} />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[400px] rounded-full blur-[150px]" style={{ background: 'rgba(34,211,238,0.06)' }} />
      </>}>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-10 relative z-10">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4"
            style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
            <Compass className="w-4 h-4" style={{ color: G11.emerald.text }} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: G11.emerald.text }}>Modelo</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">Afilar la</h2>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none mb-3" style={{ color: VDRC_GREEN }}>Sierra</h2>
          <p className="text-white/40 text-sm">Stephen Covey — Hábito #7</p>
        </motion.div>

        <div className="space-y-3">
          {INSIGHTS.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <motion.div key={i} {...m(0.12 + i * 0.1)}
                className="flex items-start gap-4 p-4 rounded-xl border"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="p-2.5 rounded-lg border flex-shrink-0"
                  style={{ background: insight.accent.bg, borderColor: insight.accent.border }}>
                  <Icon className="w-5 h-5" style={{ color: insight.accent.text }} />
                </div>
                <div>
                  <p className="font-black text-sm mb-1" style={{ color: insight.accent.text }}>{insight.label}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{insight.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Circular Diagram */}
      <div className="hidden lg:flex flex-1 items-center justify-center py-10 pr-12 relative z-10">
        <motion.div {...m(0.3)} className="relative">
          <div className="relative w-[280px] h-[280px]">
            {/* Outer rotating ring */}
            <motion.div
              {...(isExporting ? {} : { animate: { rotate: 360 }, transition: { duration: 40, repeat: Infinity, ease: 'linear' } })}
              className="absolute -inset-8 rounded-full border border-dashed"
              style={{ borderColor: G11.emerald.border }} />

            {/* Conic gradient ring */}
            <motion.div
              {...(isExporting ? {} : { animate: { rotate: -360 }, transition: { duration: 30, repeat: Infinity, ease: 'linear' } })}
              className="absolute inset-0 rounded-full p-[2px]"
              style={{ background: `conic-gradient(from 0deg, ${G11.emerald.dot}, ${G11.cyan.dot}, ${G11.amber.dot}, ${G11.rose.dot}, ${G11.emerald.dot})` }}>
              <div className="w-full h-full rounded-full" style={{ background: '#181c1b' }} />
            </motion.div>

            {/* Inner rings */}
            <div className="absolute inset-6 rounded-full border" style={{ borderColor: 'rgba(61,153,112,0.15)' }} />
            <div className="absolute inset-12 rounded-full border" style={{ borderColor: 'rgba(61,153,112,0.10)' }} />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } })}
                className="p-4 rounded-xl border"
                style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
                <Lightbulb className="w-8 h-8" style={{ color: G11.emerald.text }} />
              </motion.div>
            </div>

            {/* Dimension nodes */}
            {DIMENSIONS.map((dim, i) => {
              const Icon = dim.icon;
              const positions = [
                { top: '-55px', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', right: '-65px', transform: 'translateY(-50%)' },
                { bottom: '-55px', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', left: '-65px', transform: 'translateY(-50%)' },
              ] as const;
              return (
                <motion.div key={dim.name}
                  {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.5 + i * 0.1, type: 'spring' } })}
                  className="absolute flex flex-col items-center gap-1.5"
                  style={positions[i]}>
                  <div className="p-3 rounded-xl border"
                    style={{ background: '#181c1b', borderColor: dim.accent.border, boxShadow: `0 0 20px ${dim.accent.glow}` }}>
                    <Icon className="w-5 h-5" style={{ color: dim.accent.text }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-semibold text-xs">{dim.name}</span>
                    <span className="text-sm">{dim.emoji}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </G11Shell>
  );
}
