import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Presentation, Rocket, Map, Building2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/roadmap-tower-clean.jpg';

const ICON_MAP: Record<number, React.ComponentType<{ className?: string }>> = { 1: Shield, 2: BarChart3, 3: Presentation, 4: Rocket };

const DEFAULT_SESSIONS = [
  { num: 1, title: 'Cimientos Digitales', desc: 'Inbox Zero, Navegadores, Bitwarden, Manual IA', color: 'teal', emoji: '🛡️' },
  { num: 2, title: 'Productividad Personal', desc: 'Workflow, Apps, Prompting, Hábitos', color: 'cyan', emoji: '📊' },
  { num: 3, title: 'Automatización No-Code', desc: 'Webhooks, Make, Integraciones, Agentes', color: 'violet', emoji: '🚀' },
  { num: 4, title: 'Inteligencia Artificial', desc: 'Modelos, Fine-tuning, API, Plugins', color: 'emerald', emoji: '🤖' },
];

export function Slide09Roadmap() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(9);
  const roadmapImage = (content.imageUrl as string) || CLOUD_URL;
  const m = useS1Motion();
  
  const dbSessions = content.sessions as Array<{ num: number; title: string; desc: string; color: string; emoji?: string; isActive?: boolean }>;
  const metaphor = (content.metaphor as string) || 'No puedes construir un rascacielos sobre cimientos de barro';
  const sessions = dbSessions ? [...dbSessions].sort((a, b) => b.num - a.num) : DEFAULT_SESSIONS;

  const colorStyles: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    teal: { bg: S1_ACCENT.emerald.bg, border: S1_ACCENT.emerald.border, text: S1_ACCENT.emerald.text, iconBg: S1_ACCENT.emerald.dot },
    cyan: { bg: S1_ACCENT.cyan.bg, border: S1_ACCENT.cyan.border, text: S1_ACCENT.cyan.text, iconBg: S1_ACCENT.cyan.bg },
    violet: { bg: S1_ACCENT.purple.bg, border: S1_ACCENT.purple.border, text: S1_ACCENT.purple.text, iconBg: S1_ACCENT.purple.bg },
    emerald: { bg: S1_ACCENT.emerald.bg, border: S1_ACCENT.emerald.border, text: S1_ACCENT.emerald.text, iconBg: S1_ACCENT.emerald.bg },
  };

  return (
    <S1Shell
      footerLabel="ROADMAP"
      className="flex flex-col"
      radials={<>
        <div className="absolute top-0 left-1/3 w-[700px] h-[600px] rounded-full blur-[200px]" style={{ background: 'hsl(160 65% 45% / 0.08)' }} />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[400px] rounded-full blur-[150px]" style={{ background: 'hsl(263 60% 55% / 0.05)' }} />
      </>}
    >
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-12 py-6 sm:py-8">
        <motion.header {...m(0.1)} className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Map className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: S1_ACCENT.emerald.text }}>Roadmap</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            CONSTRUYE TU{' '}
            <span style={{ background: `linear-gradient(135deg, ${S1_ACCENT.emerald.text}, ${S1_ACCENT.purple.text})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RASCACIELOS</span>
          </h1>
          <p className="text-white/40 text-sm sm:text-base mt-2">{metaphor}</p>
        </motion.header>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 sm:gap-10 items-center">
          <motion.div {...m(0.2)} className="hidden lg:block w-[280px] shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src={roadmapImage} alt="Torre en construcción" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg">
                <Building2 className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
                <span className="text-white/80 text-xs font-medium">Tu stack digital</span>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col gap-3 w-full">
            {sessions.map((session, i) => {
              const Icon = ICON_MAP[session.num] || Shield;
              const isActive = session.isActive || false;
              const colors = colorStyles[session.color] || colorStyles.teal;
              return (
                <motion.div key={session.num} {...m(0.25 + i * 0.1)} className="group relative">
                  {isActive && (
                    <motion.div className="absolute -inset-1 rounded-2xl blur-md"
                      style={{ background: `linear-gradient(90deg, ${S1_ACCENT.emerald.glow}, ${S1_ACCENT.cyan.glow})` }}
                      animate={isExporting ? {} : { opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                  )}
                  <div className={`relative flex items-center gap-4 p-3 sm:p-4 rounded-xl border transition-all`}
                    style={{ background: isActive ? colors.bg : 'hsl(0 0% 100% / 0.02)', borderColor: isActive ? colors.border : 'hsl(0 0% 100% / 0.06)' }}>
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: isActive ? colors.iconBg : colors.bg, border: isActive ? 'none' : `1px solid ${colors.border}`, boxShadow: isActive ? `0 0 20px ${S1_ACCENT.emerald.glow}` : 'none' }}>
                      <Icon className="w-5 h-5" style={{ color: isActive ? 'white' : colors.text }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold" style={{ color: isActive ? S1_ACCENT.emerald.text : 'hsl(0 0% 100% / 0.3)' }}>SESIÓN {session.num}</span>
                        {isActive && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase" style={{ background: S1_ACCENT.emerald.bg, color: S1_ACCENT.emerald.text }}>Hoy</span>}
                      </div>
                      <p className={`font-bold text-base sm:text-lg ${isActive ? 'text-white' : 'text-white/80'}`}>{session.title}</p>
                      <p className="text-sm text-white/40">{session.desc}</p>
                    </div>
                    <span className={`text-xl sm:text-2xl shrink-0 ${isActive ? 'opacity-100' : 'opacity-40'}`}>{session.emoji || '✨'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </S1Shell>
  );
}
