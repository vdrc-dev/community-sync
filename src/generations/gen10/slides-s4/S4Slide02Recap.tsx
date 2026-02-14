import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, MessageSquare, Code2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const WEEKS = [
  { num: 1, title: 'Higiene Digital', icon: Shield, color: 'hsl(185 70% 50%)', skills: ['Inbox Zero', 'Perfiles de Navegador', 'Bitwarden', 'Context Engineering'], status: 'Completada' },
  { num: 2, title: 'La Era Agéntica', icon: Brain, color: 'hsl(280 70% 60%)', skills: ['Framework C.R.O.P.', 'Modelos Frontier', 'Agentes de IA', 'MCP'], status: 'Completada' },
  { num: 3, title: 'Comunicación', icon: MessageSquare, color: 'hsl(330 70% 60%)', skills: ['Canvas & Vibe Coding', 'Claude Code', 'CRM + MCP', 'Cursor & GitHub'], status: 'Completada' },
  { num: 4, title: 'Desarrollo', icon: Code2, color: 'hsl(150 60% 50%)', skills: ['Lovable', 'Supabase', 'Full Stack', 'Deploy'], status: 'HOY' },
];

export function S4Slide02Recap() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [activeWeek, setActiveWeek] = useState(3);
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(150_60%_40%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(150 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-10">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-400 via-violet-400 to-emerald-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Tu Progreso</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">3 Semanas Te Trajeron Hasta Aquí</h1>
          <p className="text-white/30 text-sm mt-2">Hoy encendemos los motores.</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-4">
          {WEEKS.map((week, i) => {
            const Icon = week.icon;
            const isActive = activeWeek === i;
            const isCurrent = week.status === 'HOY';
            return (
              <motion.button key={week.num} {...m(0.15 + i * 0.08)}
                onClick={() => setActiveWeek(i)}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${isActive ? 'bg-white/[0.04] border-white/[0.12]' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-b-full" style={{ background: week.color, opacity: isActive ? 0.8 : 0.2 }} />
                {isCurrent && (
                  <motion.div {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity } })}
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider"
                    style={{ background: `${week.color.replace(')', ' / 0.15)')}`, color: week.color, border: `1px solid ${week.color.replace(')', ' / 0.3)')}` }}>HOY</motion.div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${week.color.replace(')', ' / 0.1)')}`, border: `1px solid ${week.color.replace(')', ' / 0.25)')}` }}>
                    <Icon className="w-5 h-5" style={{ color: week.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-white/30 uppercase">Semana {week.num}</p>
                    <p className="text-base font-bold text-white">{week.title}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {week.skills.map((skill, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: isCurrent ? 'hsl(0 0% 100% / 0.15)' : week.color }} />
                      <span className={`text-xs ${isCurrent ? 'text-white/35' : 'text-white/55'}`}>{skill}</span>
                    </div>
                  ))}
                </div>
                {i < 3 && <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-20"><ChevronRight className="w-4 h-4 text-white/10" /></div>}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(150 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">APERTURA</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
