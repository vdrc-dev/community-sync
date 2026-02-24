import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Sparkles, Signal, Laptop, Radio, CloudCog, LucideIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { useSlideContent, ParticipantItem, StatusItem } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

const ICON_MAP: Record<string, LucideIcon> = {
  signal: Signal,
  laptop: Laptop,
  radio: Radio,
  cloud: CloudCog,
};

const DEFAULT_PARTICIPANTS: ParticipantItem[] = [
  { name: 'Jane Cooper', role: 'Directora de Operaciones', emoji: '👩‍💼' },
  { name: 'Cody Fisher', role: 'Ingeniero de Producto', emoji: '👨‍💻' },
  { name: 'Eleanor Pena', role: 'Diseñadora UX', emoji: '🎨' },
  { name: 'Jenny Wilson', role: 'Estratega de Marketing', emoji: '👩‍ মার্কেটিং' },
  { name: 'Robert Fox', role: 'Desarrollador Frontend', emoji: '👨‍💻' },
  { name: 'Kristin Watson', role: 'Analista de Datos', emoji: '📊' },
];

const DEFAULT_STATUS_ITEMS: StatusItem[] = [
  { label: 'Conexión', status: 'Estable', icon: 'signal' },
  { label: 'Laptop', status: 'Optimizada', icon: 'laptop' },
  { label: 'Streaming', status: 'Activo', icon: 'radio' },
  { label: 'Cloud', status: 'Sincronizado', icon: 'cloud' },
];

export function Slide03Participants() {
  const { isExporting } = useExportContext();
  const { config } = useGeneration();
  const content = useSlideContent(2);
  const m = useS1Motion();

  const participants = content.participants || DEFAULT_PARTICIPANTS;
  const statusItems = content.statusItems || DEFAULT_STATUS_ITEMS;
  const welcomeMessage = content.welcomeMessage || 'Bienvenidos al programa de productividad digital';

  return (
    <S1Shell
      footerLabel="EQUIPO"
      className="flex flex-col"
      radials={<>
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] rounded-full blur-[180px]" style={{ background: 'hsl(160 65% 45% / 0.08)' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] rounded-full blur-[150px]" style={{ background: 'hsl(185 70% 50% / 0.06)' }} />
      </>}
    >
      {/* Floating orbs */}
      {!isExporting && (
        <>
          <motion.div className="absolute top-32 left-16 w-3 h-3 rounded-full" style={{ background: 'hsl(160 65% 55% / 0.6)' }}
            animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute top-48 right-32 w-2 h-2 rounded-full" style={{ background: 'hsl(185 70% 55% / 0.5)' }}
            animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full px-6 sm:px-12 py-8 sm:py-10">
        {/* Header */}
        <motion.header {...m(0.1)} className="mb-8 sm:mb-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Users className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: S1_ACCENT.emerald.text }}>Equipo</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: S1_ACCENT.emerald.dot }} />
              <span className="text-white/50 text-sm font-medium">{participants.length} participantes</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            GENERACIÓN{' '}
            <span style={{ background: `linear-gradient(135deg, ${S1_ACCENT.emerald.text}, ${S1_ACCENT.cyan.text})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {config.generation}
            </span>
            {!isExporting && (
              <motion.span className="inline-block ml-2 text-2xl" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>✨</motion.span>
            )}
          </h1>
          <p className="text-white/40 text-base sm:text-lg mt-3 font-light">{welcomeMessage}</p>
        </motion.header>

        {/* Main Grid */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 sm:gap-10">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 content-start">
            {participants.map((participant, i) => (
              <motion.div key={participant.name} {...m(0.15 + i * 0.06)} className="group relative">
                <div className="relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl group-hover:border-white/[0.12] transition-all duration-300">
                  <span className="text-white/[0.08] font-mono text-xs font-bold w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div className="relative w-9 h-9 shrink-0">
                    <div className="absolute inset-0 rounded-xl border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }} />
                    <CheckCircle2 className="absolute inset-0 m-auto w-5 h-5 opacity-30" style={{ color: S1_ACCENT.emerald.text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm sm:text-lg font-bold tracking-wide truncate">{participant.name}</p>
                    <p className="text-white/30 text-xs font-medium uppercase tracking-widest">{participant.role}</p>
                  </div>
                  <span className="text-2xl opacity-50 shrink-0">{participant.emoji}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status Panel */}
          <motion.aside {...m(0.5)} className="w-full lg:w-52 flex flex-row lg:flex-col gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 px-1">
              <Sparkles className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              <span className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">Sistema</span>
            </div>
            <div className="flex lg:flex-col gap-3 flex-1">
              {statusItems.map((item, i) => {
                const Icon = ICON_MAP[item.icon] || Signal;
                return (
                  <motion.div key={item.label} {...m(0.55 + i * 0.08)}
                    className="flex-1 lg:flex-none flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-all">
                    <div className="p-2 rounded-lg border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
                      <Icon className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/70 text-sm font-medium">{item.label}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: S1_ACCENT.emerald.dot }}
                          animate={isExporting ? {} : { opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                        <span className="text-xs font-medium" style={{ color: S1_ACCENT.emerald.text }}>{item.status}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.aside>
        </div>
      </div>
    </S1Shell>
  );
}
