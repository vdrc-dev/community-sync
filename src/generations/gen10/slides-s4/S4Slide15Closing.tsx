import { motion } from 'framer-motion';
import { Rocket, Sparkles, Code2, Database, GitBranch, Shield, Brain, MessageSquare, Globe, Trophy, Zap, Target, ArrowRight, Star, Heart, Mail, Phone } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const JOURNEY = [
  { week: 1, title: 'Higiene Digital', icon: Shield, color: 'hsl(185 70% 50%)', hue: 185, tools: 'Inbox Zero · Bitwarden · Perfiles' },
  { week: 2, title: 'Era Agéntica', icon: Brain, color: 'hsl(280 70% 60%)', hue: 280, tools: 'C.R.O.P. · Modelos · Agentes' },
  { week: 3, title: 'Creación Digital', icon: MessageSquare, color: 'hsl(330 70% 60%)', hue: 330, tools: 'Canvas · Claude Code · CRM' },
  { week: 4, title: 'VibeCoding', icon: Code2, color: 'hsl(150 60% 50%)', hue: 150, tools: 'Lovable · Supabase · GitHub' },
];

const TOOLKIT = [
  { name: 'Gemini Canvas', icon: Sparkles, color: 'hsl(38 90% 55%)', hue: 38 },
  { name: 'Lovable', icon: Rocket, color: 'hsl(330 70% 60%)', hue: 330 },
  { name: 'Supabase', icon: Database, color: 'hsl(150 60% 50%)', hue: 150 },
  { name: 'GitHub', icon: GitBranch, color: 'hsl(280 70% 60%)', hue: 280 },
  { name: 'Cursor', icon: Code2, color: 'hsl(185 70% 50%)', hue: 185 },
  { name: 'Claude Code', icon: Zap, color: 'hsl(25 85% 55%)', hue: 25 },
];

const NEXT_STEPS = [
  { step: 1, action: 'Crea 1 app por semana', desc: 'La repetición es la madre del aprendizaje. Un proyecto pequeño es infinitamente mejor que ninguno.', icon: Rocket },
  { step: 2, action: 'Documenta tu proceso', desc: 'Tu portafolio se construye con cada proyecto. Comparte lo que construyes.', icon: Globe },
  { step: 3, action: 'Enseña a alguien', desc: 'Enseñar es la forma más potente de aprender y consolidar lo que sabes.', icon: Heart },
];

export function S4Slide15Closing() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_140%_70%_at_50%_-10%,_hsl(150_60%_40%_/_0.14),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_115%,_hsl(330_60%_40%_/_0.08),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(150 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
        <div className="absolute top-[5%] left-[3%] text-[16vw] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">GEN10</div>
      </div>

      {!isExporting && (
        <>
          <motion.div className="absolute top-[10%] left-[8%] w-[350px] h-[350px] rounded-full blur-[140px] pointer-events-none"
            style={{ background: 'hsl(150 60% 50% / 0.07)' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-[15%] right-[8%] w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: 'hsl(330 60% 50% / 0.06)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
        </>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-7">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] backdrop-blur-sm mb-4">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-emerald-400/90">Misión Cumplida · Generación 10</span>
            <Trophy className="w-4 h-4 text-emerald-400" />
          </div>
          <h1 className="text-6xl 2xl:text-7xl font-black text-white tracking-tight mb-3 leading-tight">
            De Consumidor a{' '}
            <span style={{ background: 'linear-gradient(135deg, hsl(150 60% 60%) 0%, hsl(185 70% 60%) 40%, hsl(38 90% 60%) 80%, hsl(330 70% 65%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Creador
            </span>
          </h1>
          <p className="text-white/25 text-sm font-medium tracking-wide">4 semanas. 15+ herramientas. Un nuevo superpoder profesional que nadie te puede quitar.</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-5">
          {/* Journey timeline */}
          <motion.div {...m(0.1)} className="col-span-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Tu Viaje · 4 Semanas</p>
            <div className="space-y-2.5">
              {JOURNEY.map((w, i) => {
                const Icon = w.icon;
                return (
                  <motion.div key={w.week}
                    {...(isExporting ? {} : { initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] } })}
                    className="relative flex items-center gap-3 p-3 rounded-xl border border-white/[0.05] bg-white/[0.015] overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: w.color }} />
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ml-1" style={{ background: `hsl(${w.hue} 60% 45% / 0.12)` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: w.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black tracking-wider" style={{ color: `hsl(${w.hue} 55% 60% / 0.6)` }}>S{w.week}</span>
                        <span className="text-xs font-black text-white">{w.title}</span>
                      </div>
                      <p className="text-[10px] text-white/25 truncate">{w.tools}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-emerald-500/12 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="text-[8px] text-emerald-400 font-black">✓</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {/* Progress */}
            <div className="mt-4">
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(280 70% 60%), hsl(330 70% 60%), hsl(150 60% 50%))' }}
                  {...(isExporting ? { style: { width: '100%', background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(280 70% 60%), hsl(330 70% 60%), hsl(150 60% 50%))' } } : { initial: { width: '0%' }, animate: { width: '100%' }, transition: { duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] } })} />
              </div>
              <p className="text-[9px] text-emerald-400/50 font-black mt-1.5 text-center tracking-widest">100% COMPLETADO</p>
            </div>
          </motion.div>

          {/* Center: toolkit + next steps */}
          <div className="col-span-5 space-y-4">
            {/* Toolkit */}
            <motion.div {...m(0.2)} className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">Tu Kit Profesional 2026</p>
              <div className="flex flex-wrap gap-2">
                {TOOLKIT.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div key={tool.name}
                      {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.4 + i * 0.07, type: 'spring', stiffness: 200 } })}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] transition-all duration-300">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `hsl(${tool.hue} 60% 45% / 0.1)` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: tool.color }} />
                      </div>
                      <span className="text-[11px] font-black text-white/55">{tool.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Next steps */}
            <motion.div {...m(0.3)} className="p-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.025]">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-emerald-400" />
                <p className="text-[10px] font-black text-emerald-400/80 uppercase tracking-widest">¿Y Ahora? Próximos Pasos</p>
              </div>
              <div className="space-y-2.5">
                {NEXT_STEPS.map((ns, i) => {
                  const Icon = ns.icon;
                  return (
                    <motion.div key={i}
                      {...(isExporting ? {} : { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.5 + i * 0.1 } })}
                      className="flex items-start gap-3 p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02]">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-black text-emerald-400">{ns.step}</span>
                      </div>
                      <div>
                        <p className="text-xs font-black text-white mb-0.5">{ns.action}</p>
                        <p className="text-[10px] text-white/25 leading-relaxed">{ns.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: contact + final message */}
          <div className="col-span-3 space-y-4">
            {/* Final celebration */}
            <motion.div {...m(0.35)} className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_hsl(150_60%_50%_/_0.07),_transparent_60%)]" />
              <motion.div
                {...(isExporting ? {} : { animate: { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } })}
                className="text-3xl mb-2">🎓</motion.div>
              <p className="text-lg font-black text-white mb-1">¡Gracias Gen 10!</p>
              <p className="text-xs text-white/30 leading-relaxed">Todo el material vive en el Portal VDRC. Acceso de por vida.</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05]">
                <Star className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] font-black text-emerald-400/80 tracking-wider">PORTAL VDRC</span>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div {...m(0.45)} className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">Contacto</p>
              <p className="text-base font-black text-white mb-3">Vicente Donoso R.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                  <Mail className="w-4 h-4 text-emerald-400/70 shrink-0" />
                  <span className="text-xs font-bold text-white/55 font-mono">vicente@vdrc.cl</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                  <Phone className="w-4 h-4 text-emerald-400/70 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white/55">+56 9 7699 8520</span>
                    <p className="text-[9px] text-white/20">WhatsApp para dudas</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-center italic text-white/15 mt-3">— Vicente Donoso R.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(185 50% 50% / 0.3), hsl(330 50% 50% / 0.25), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Cierre</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/50">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
