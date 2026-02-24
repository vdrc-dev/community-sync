import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Presentation, Rocket, MapPin, CheckCircle } from 'lucide-react';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { useExportContext } from '@/contexts/ExportContext';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-roadmap-bg.jpg';

const sessions = [
  { num: 1, title: 'HIGIENE DIGITAL', desc: 'Inbox Cero, Bitwarden y navegación limpia.', icon: Shield, current: true, color: 'emerald' as const },
  { num: 2, title: 'DATOS Y PRODUCTIVIDAD', desc: 'Claude, Perplexity y Canvas.', icon: BarChart3, current: false, color: 'cyan' as const },
  { num: 3, title: 'PRESENTACIONES', desc: 'Gamma, NotebookLM y Manus.', icon: Presentation, current: false, color: 'violet' as const },
  { num: 4, title: 'VIBE CODING', desc: 'Lovable, Supabase y Cursor.', icon: Rocket, current: false, color: 'amber' as const },
];

const COLOR_MAP = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', dot: 'bg-white/30' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', dot: 'bg-white/30' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-white/30' },
} as const;

export function Slide27RoadmapVertical() {
  const m = useS1Motion();
  const { isExporting } = useExportContext();
  const content = useSlideContent(27);
  const roadmapBg = (content.imageUrl as string) || CLOUD_URL;

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col" radials={
      <>
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${roadmapBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]/60" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-emerald-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[150px]" />
      </>
    }>
      <div className="relative z-10 flex flex-col h-full px-5 sm:px-12 py-8">
        <motion.div {...m(0.1)} className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm mb-3">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            TU ROADMAP: DE LA <span className="text-emerald-400">HIGIENE</span> AL <span className="text-amber-400">VIBE CODING</span>
          </h1>
          <p className="text-white/50 text-lg mt-2">Estás aquí: construyendo los cimientos</p>
        </motion.div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-6xl">
            <div className="absolute top-[52px] left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500/50 via-violet-500/30 to-amber-500/20 rounded-full hidden sm:block" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {sessions.map((session, i) => {
                const colors = COLOR_MAP[session.color];
                return (
                  <motion.div key={session.num} {...m(0.2 + i * 0.1)} className="relative flex flex-col items-center">
                    <div className={`relative z-10 mb-4 ${session.current ? 'scale-110' : ''} hidden sm:block`}>
                      <div className={`w-7 h-7 rounded-full ${session.current ? colors.dot : 'bg-white/20'} ${session.current ? 'ring-4 ring-emerald-400/30' : ''}`} />
                      {session.current && !isExporting && (
                        <motion.div className="absolute inset-0 rounded-full bg-emerald-400" animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
                      )}
                    </div>
                    <div className={`w-full p-4 sm:p-5 rounded-2xl ${colors.bg} border ${colors.border} backdrop-blur-sm ${session.current ? 'shadow-xl shadow-emerald-500/10' : ''}`}>
                      {session.current && <div className="flex items-center gap-2 mb-3"><CheckCircle className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">HOY</span></div>}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}><session.icon className={`w-5 h-5 ${colors.text}`} strokeWidth={1.5} /></div>
                        <span className={`text-3xl font-black ${colors.text}`}>{session.num}</span>
                      </div>
                      <h3 className={`font-bold ${session.current ? 'text-white' : 'text-white/80'} text-sm mb-2 leading-tight`}>SESIÓN {session.num}: {session.title}</h3>
                      <p className="text-white/50 text-xs leading-relaxed">{session.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </S1Shell>
  );
}
