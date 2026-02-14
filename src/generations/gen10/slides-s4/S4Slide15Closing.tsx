import { motion } from 'framer-motion';
import { Rocket, Sparkles, Code2, Database, GitBranch, Shield, Brain, MessageSquare, Globe, Trophy, Zap, Target, ArrowRight, ExternalLink } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const JOURNEY = [
  { week: 1, title: 'Higiene Digital', icon: Shield, color: 'hsl(185 70% 50%)', tools: 'Inbox Zero · Bitwarden · Perfiles' },
  { week: 2, title: 'Era Agéntica', icon: Brain, color: 'hsl(280 70% 60%)', tools: 'C.R.O.P. · Modelos · Agentes' },
  { week: 3, title: 'Creación Digital', icon: MessageSquare, color: 'hsl(330 70% 60%)', tools: 'Canvas · Claude Code · CRM' },
  { week: 4, title: 'VibeCoding', icon: Code2, color: 'hsl(150 60% 50%)', tools: 'Lovable · Supabase · GitHub' },
];

const TOOLKIT = [
  { name: 'Gemini Canvas', icon: Sparkles, color: 'hsl(38 90% 55%)' },
  { name: 'Lovable', icon: Rocket, color: 'hsl(330 70% 60%)' },
  { name: 'Supabase', icon: Database, color: 'hsl(150 60% 50%)' },
  { name: 'GitHub', icon: GitBranch, color: 'hsl(280 70% 60%)' },
  { name: 'Cursor', icon: Code2, color: 'hsl(185 70% 50%)' },
  { name: 'Claude Code', icon: Zap, color: 'hsl(25 85% 55%)' },
];

const NEXT_STEPS = [
  { step: 1, action: 'Crea 1 app por semana', desc: 'La repetición es la madre del aprendizaje' },
  { step: 2, action: 'Documenta tu proceso', desc: 'Tu portafolio se construye con cada proyecto' },
  { step: 3, action: 'Enseña a alguien', desc: 'Enseñar es la forma más potente de aprender' },
];

export function S4Slide15Closing() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,_hsl(150_60%_40%_/_0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_110%,_hsl(330_60%_40%_/_0.08),_transparent_60%)]" />
      </div>

      {!isExporting && (
        <>
          <motion.div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full blur-[120px]"
            style={{ background: 'hsl(150 60% 50% / 0.06)' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-[20%] right-[12%] w-[250px] h-[250px] rounded-full blur-[100px]"
            style={{ background: 'hsl(330 60% 50% / 0.06)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
        </>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-3">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400/80">Misión Cumplida</span>
          </div>
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
            De Consumidor a{' '}
            <span style={{ background: 'linear-gradient(135deg, hsl(150 60% 55%), hsl(185 70% 55%), hsl(38 90% 55%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Creador
            </span>
          </h1>
          <p className="text-white/30 text-sm max-w-lg mx-auto">4 semanas. 15+ herramientas. Un nuevo superpoder profesional.</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-4">
          {/* Journey timeline (compact) */}
          <motion.div {...m(0.1)} className="col-span-5 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">Tu Viaje</p>
            <div className="space-y-2">
              {JOURNEY.map((w, i) => {
                const Icon = w.icon;
                return (
                  <motion.div key={w.week} {...(isExporting ? {} : { initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + i * 0.1 } })}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${w.color.replace(')', ' / 0.1)')}` }}>
                      <Icon className="w-4 h-4" style={{ color: w.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold" style={{ color: `${w.color.replace(')', ' / 0.5)')}` }}>S{w.week}</span>
                        <span className="text-xs font-bold text-white">{w.title}</span>
                      </div>
                      <p className="text-[10px] text-white/25 truncate">{w.tools}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="text-[8px] text-emerald-400">✓</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(280 70% 60%), hsl(330 70% 60%), hsl(150 60% 50%))' }}
                  {...(isExporting ? { style: { width: '100%', background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(280 70% 60%), hsl(330 70% 60%), hsl(150 60% 50%))' } } : { initial: { width: '0%' }, animate: { width: '100%' }, transition: { duration: 2, delay: 0.5, ease: 'easeOut' } })} />
              </div>
              <p className="text-[9px] text-emerald-400/50 font-bold mt-1 text-center">100% COMPLETADO</p>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="col-span-7 space-y-4">
            {/* Toolkit */}
            <motion.div {...m(0.2)} className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">Tu Kit 2026</p>
              <div className="flex flex-wrap gap-2">
                {TOOLKIT.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div key={tool.name}
                      {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.4 + i * 0.06, type: 'spring', stiffness: 200 } })}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: `${tool.color.replace(')', ' / 0.1)')}` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: tool.color }} />
                      </div>
                      <span className="text-[11px] font-bold text-white/50">{tool.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Next steps */}
            <motion.div {...m(0.3)} className="p-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03]">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-emerald-400" />
                <p className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-wider">Próximos Pasos</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {NEXT_STEPS.map((ns, i) => (
                  <motion.div key={i} {...(isExporting ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 + i * 0.1 } })}
                    className="p-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.02]">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-2">
                      <span className="text-[10px] font-black text-emerald-400">{ns.step}</span>
                    </div>
                    <p className="text-xs font-bold text-white">{ns.action}</p>
                    <p className="text-[10px] text-white/25 mt-1">{ns.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Final message */}
            <motion.div {...m(0.5)} className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-center">
              <p className="text-lg font-black text-white mb-1">¡Gracias Generación 10! 🎓</p>
              <p className="text-xs text-white/30">Todo el material está en <span className="text-emerald-400/60 font-mono font-bold">vdrc.lovable.app</span></p>
              <p className="text-[11px] text-white/20 mt-2 italic">— Vicente Donoso R.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(150 50% 50% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">CIERRE</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
