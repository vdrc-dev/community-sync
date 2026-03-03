import { motion } from 'framer-motion';
import { Mail, Chrome, Shield, Bot, Zap, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';
import logoVdrc from '@/assets/logo-vdrc.png';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const tools = [
  { name: 'Inbox Zero', role: 'Control', icon: Mail, accent: G11.blue, emoji: '📧', num: '01' },
  { name: 'Navegadores', role: 'Orden', icon: Chrome, accent: G11.amber, emoji: '🌐', num: '02' },
  { name: 'Bitwarden', role: 'Seguridad', icon: Shield, accent: G11.emerald, emoji: '🔐', num: '03' },
  { name: 'ChatGPT', role: 'Context', icon: Bot, accent: G11.purple, emoji: '🤖', num: '04' },
];

export function G11S1Slide01Cover() {
  const { isExporting } = useExportContext();
  const { config } = useGeneration();
  const m = useG11Motion();

  return (
    <G11Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col items-center justify-center"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(16,185,129,0.3),_transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,_rgba(59,130,246,0.2),_transparent_70%)]" />
      </>}>

      {/* Animated orbs */}
      {!isExporting && (
        <>
          <motion.div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-[180px]"
            style={{ background: 'hsl(160 65% 45% / 0.1)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
            style={{ background: 'hsl(217 70% 55% / 0.1)' }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
        </>
      )}

      {/* Logo */}
      <motion.div {...m(0, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } })}
        className="absolute top-6 sm:top-8 left-6 sm:left-8 flex items-center gap-3 sm:gap-4 z-30">
        <div className="relative">
          <div className="absolute inset-0 blur-xl rounded-full scale-150" style={{ background: 'hsl(160 65% 45% / 0.4)' }} />
          <img src={logoVdrc} alt="VDRC" className="relative h-10 sm:h-14 w-auto" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-wider text-base sm:text-xl">
            VDRC <span style={{ color: G11.emerald.text }}>///</span> GEN 11
          </span>
          <span className="text-white/40 text-[9px] sm:text-xs font-mono tracking-widest uppercase">Vibe Development & Research</span>
        </div>
      </motion.div>

      {/* Main */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4 sm:px-8">
        {/* Session Badge */}
        <motion.div {...m(0.1)} className="mb-4 sm:mb-6">
          <div className="relative group">
            <div className="absolute inset-0 blur-2xl rounded-full opacity-60" style={{ background: G11.emerald.glow }} />
            <div className="relative flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-2.5 sm:py-4 border-2 rounded-full backdrop-blur-sm"
              style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
              <Zap className="w-4 sm:w-6 h-4 sm:h-6" style={{ color: G11.emerald.text }} />
              <span className="font-bold uppercase tracking-wider text-sm sm:text-lg" style={{ color: G11.emerald.text }}>Sesión 1 de 4</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full shadow-lg" style={{ background: G11.emerald.dot, boxShadow: `0 0 8px ${G11.emerald.glow}` }} />
                {[1,2,3].map(i => <div key={i} className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-white/20" />)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div {...m(0.2, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } })} className="relative text-center mb-6 sm:mb-10">
          <h1 className="relative text-[4rem] sm:text-[7rem] lg:text-[10rem] font-black tracking-tighter text-white leading-none"
            style={{ textShadow: '0 0 60px hsl(160 65% 45% / 0.4)' }}>HIGIENE</h1>
          <motion.h1 {...m(0.35, { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } })}
            className="relative text-[3.5rem] sm:text-[6rem] lg:text-[8rem] font-black tracking-tighter leading-none -mt-2 sm:-mt-6"
            style={{
              background: 'linear-gradient(135deg, hsl(160 75% 65%) 0%, hsl(175 70% 50%) 50%, hsl(190 75% 55%) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px hsl(160 65% 45% / 0.6))',
            }}>DIGITAL</motion.h1>
        </motion.div>

        {/* Tools Pipeline */}
        <motion.div {...m(0.45)} className="w-full max-w-5xl">
          <div className="relative py-4 sm:py-8">
            <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-white/5 -translate-y-1/2 rounded-full hidden sm:block" />
            <motion.div className="absolute top-1/2 left-[10%] h-1 rounded-full -translate-y-1/2 hidden sm:block"
              style={{ background: 'linear-gradient(90deg, hsl(217 70% 55%), hsl(160 65% 50%), hsl(263 60% 55%))', boxShadow: '0 0 30px hsl(160 65% 45% / 0.6)' }}
              {...(isExporting ? { style: { width: '80%' } } : { initial: { width: '0%' }, animate: { width: '80%' }, transition: { delay: 0.7, duration: 1.8, ease: [0.16, 1, 0.3, 1] } })}
            />
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {tools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <motion.div key={tool.name} {...m(0.5 + i * 0.08)} className="group relative">
                    <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/20 to-white/5">
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#080808]/95 backdrop-blur-xl flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 rounded-b-full opacity-80" style={{ background: tool.accent.dot }} />
                        <div className="absolute top-2 right-2 text-[10px] font-mono text-white/20 font-bold">{tool.num}</div>
                        <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">{tool.emoji}</div>
                        <div className="p-2.5 sm:p-3.5 rounded-xl mb-2 sm:mb-3 border" style={{ background: tool.accent.bg, borderColor: tool.accent.border, boxShadow: `0 0 24px ${tool.accent.glow}` }}>
                          <Icon className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: tool.accent.text }} />
                        </div>
                        <h3 className="text-white font-bold text-sm sm:text-base mb-0.5">{tool.name}</h3>
                        <p className="text-xs uppercase font-bold tracking-widest" style={{ color: tool.accent.text }}>{tool.role}</p>
                      </div>
                    </div>
                    {i < tools.length - 1 && <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:block"><ArrowRight className="w-4 h-4 text-white/30" /></div>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div {...m(0.85)} className="relative mt-4 sm:mt-6 max-w-3xl">
          <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div className="absolute -top-3 left-6 text-3xl font-serif" style={{ color: 'hsl(160 65% 50% / 0.3)' }}>"</div>
            <p className="text-base sm:text-lg text-white/50 font-light text-center leading-relaxed">
              Las barreras intelectuales están siendo reemplazadas por
              <span className="font-medium" style={{ color: G11.emerald.text }}> barreras de pago.</span>
              <br className="hidden sm:block" />
              <span className="text-white/70 font-normal"> Delega en sistemas antes que en personas.</span>
            </p>
          </div>
        </motion.div>

        {/* Date */}
        <motion.div {...m(0.95)} className="mt-4 sm:mt-6 flex flex-col items-center gap-2">
          <div className="h-px w-32" style={{ background: 'linear-gradient(90deg, transparent, hsl(160 65% 50% / 0.5), transparent)' }} />
          <p className="text-white/40 text-xs sm:text-sm font-medium uppercase tracking-widest">{config.date} • {config.instructor}</p>
        </motion.div>
      </div>
    </G11Shell>
  );
}
