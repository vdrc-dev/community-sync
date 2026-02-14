import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Chrome, Shield, Bot, Zap, ArrowRight, Sparkles, Play } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import logoVdrc from '@/assets/logo-vdrc.png';

const tools = [
  { name: 'Inbox Zero', role: 'Control', icon: Mail, color: 'blue', emoji: '📧', num: '01' },
  { name: 'Navegadores', role: 'Orden', icon: Chrome, color: 'amber', emoji: '🌐', num: '02' },
  { name: 'Bitwarden', role: 'Seguridad', icon: Shield, color: 'emerald', emoji: '🔐', num: '03' },
  { name: 'ChatGPT', role: 'Context', icon: Bot, color: 'purple', emoji: '🤖', num: '04' },
];

const colorMap: Record<string, { bg: string; bgLight: string; text: string; border: string; glow: string }> = {
  blue: { bg: 'bg-blue-500', bgLight: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/40', glow: '0 0 40px rgba(59,130,246,0.5)' },
  amber: { bg: 'bg-amber-500', bgLight: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/40', glow: '0 0 40px rgba(245,158,11,0.5)' },
  emerald: { bg: 'bg-emerald-500', bgLight: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/40', glow: '0 0 40px rgba(16,185,129,0.5)' },
  purple: { bg: 'bg-purple-500', bgLight: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/40', glow: '0 0 40px rgba(168,85,247,0.5)' },
};

// Floating particles component
function FloatingParticles({ count = 50, isExporting }: { count?: number; isExporting: boolean }) {
  if (isExporting) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
            background: i % 3 === 0 
              ? 'rgba(16,185,129,0.6)' 
              : i % 3 === 1 
                ? 'rgba(59,130,246,0.6)' 
                : 'rgba(168,85,247,0.6)',
            boxShadow: i % 3 === 0 
              ? '0 0 6px rgba(16,185,129,0.8)' 
              : i % 3 === 1 
                ? '0 0 6px rgba(59,130,246,0.8)' 
                : '0 0 6px rgba(168,85,247,0.8)',
          }}
          animate={{
            y: [0, -30 - Math.random() * 20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function Slide01Cover() {
  const { isExporting } = useExportContext();
  const { config, currentWeek, generationNumber } = useGeneration();
  const slideNum = useSlideNumber();

  const presentationUrl = `vdrc.lovable.app/gen${generationNumber}s${currentWeek}`;

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#030303] flex flex-col items-center justify-center font-sans selection:bg-emerald-500/30">
      
      {/* Multi-layer Atmospheric Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(16,185,129,0.3),_transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,_rgba(59,130,246,0.2),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_20%,_rgba(168,85,247,0.15),_transparent_60%)]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Particles */}
      <FloatingParticles count={80} isExporting={isExporting} />

      {/* Animated orbs */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-emerald-500/10 blur-[180px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </>
      )}

      {/* Header - Logo */}
      <motion.div 
        {...(isExporting ? {} : {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 }
        })}
        className="absolute top-8 left-8 flex items-center gap-4 z-30"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/40 blur-xl rounded-full scale-150" />
          <img src={logoVdrc} alt="VDRC" className="relative h-14 w-auto" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-wider text-xl">
            VDRC <span className="text-emerald-400">///</span> GEN {String(config.generation).padStart(2, '0')}
          </span>
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Vibe Development & Research</span>
        </div>
      </motion.div>

      {/* Header - URL Badge */}
      <motion.div 
        {...(isExporting ? {} : {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.5, duration: 0.6 }
        })}
        className="absolute top-8 right-8 z-30"
      >
        <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <div className="relative">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <motion.div 
              className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full"
              animate={isExporting ? {} : { scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-sm font-mono text-white/60 tracking-wide">{presentationUrl}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4">
        
        {/* Session Badge */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, y: 20, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.6, type: "spring" }
          })}
          className="mb-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/40 blur-2xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative flex items-center gap-4 px-8 py-4 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-full backdrop-blur-sm">
              <motion.div
                {...(isExporting ? {} : {
                  animate: { rotate: [0, 360] },
                  transition: { duration: 8, repeat: Infinity, ease: "linear" }
                })}
                className="relative"
              >
                <Zap className="w-6 h-6 text-emerald-400" />
              </motion.div>
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-lg">Sesión 1 de 4</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Title */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          })}
          className="relative text-center mb-10"
        >
          <div className="absolute -inset-x-40 -inset-y-20 bg-emerald-500/20 blur-[150px] rounded-full pointer-events-none" />
          
          <h1 
            className="relative text-[10rem] md:text-[12rem] font-black tracking-tighter text-white leading-none"
            style={{
              textShadow: '0 0 60px rgba(16,185,129,0.4), 0 0 120px rgba(16,185,129,0.2)'
            }}
          >
            HIGIENE
          </h1>
          <motion.h1 
            {...(isExporting ? {} : {
              initial: { opacity: 0, x: -50 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.3, duration: 0.8 }
            })}
            className="relative text-[8rem] md:text-[10rem] font-black tracking-tighter leading-none -mt-8"
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 30%, #14b8a6 70%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(16,185,129,0.6)) drop-shadow(0 0 80px rgba(16,185,129,0.3))'
            }}
          >
            DIGITAL
          </motion.h1>
        </motion.div>

        {/* Tools Pipeline */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4, duration: 0.8 }
          })}
          className="w-full max-w-5xl"
        >
          <div className="relative py-8">
            {/* Connection Line Background */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-white/5 -translate-y-1/2 rounded-full" />
            
            {/* Animated Energy Line */}
            <motion.div
              {...(isExporting ? { style: { width: '80%', left: '10%' } } : {
                initial: { width: '0%' },
                animate: { width: '80%' },
                transition: { delay: 1, duration: 1.8, ease: [0.16, 1, 0.3, 1] }
              })}
              className="absolute top-1/2 left-[10%] h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 -translate-y-1/2 rounded-full"
              style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3)' }}
            />

            {/* Pulse on line */}
            {!isExporting && (
              <motion.div
                className="absolute top-1/2 left-[10%] w-4 h-4 bg-emerald-400 rounded-full -translate-y-1/2"
                animate={{ x: [0, 800, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)' }}
              />
            )}

            {/* Tool Cards */}
            <div className="relative grid grid-cols-4 gap-4">
              {tools.map((tool, index) => {
                const colors = colorMap[tool.color];
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    {...(isExporting ? {} : {
                      initial: { opacity: 0, y: 40, scale: 0.8 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      transition: { delay: 0.6 + (index * 0.12), type: "spring", stiffness: 100 },
                      whileHover: { y: -8, scale: 1.03, transition: { duration: 0.2 } }
                    })}
                    className="group relative"
                  >
                    {/* Card glow on hover */}
                    <div 
                      className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle at center, ${colors.glow.replace('0 0 40px ', '')}, transparent 70%)`,
                        filter: 'blur(20px)'
                      }} 
                    />
                    
                    {/* Card */}
                    <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/20 to-white/5">
                      <div className="p-5 rounded-2xl bg-[#080808]/95 backdrop-blur-xl flex flex-col items-center text-center relative overflow-hidden">
                        {/* Top accent line */}
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 ${colors.bg} rounded-b-full opacity-80`} />
                        
                        {/* Number badge */}
                        <div className="absolute top-3 right-3 text-xs font-mono text-white/20 font-bold">
                          {tool.num}
                        </div>
                        
                        {/* Emoji */}
                        <motion.div 
                          className="text-4xl mb-3"
                          {...(isExporting ? {} : {
                            whileHover: { scale: 1.2, rotate: [0, -10, 10, 0] },
                            transition: { duration: 0.3 }
                          })}
                        >
                          {tool.emoji}
                        </motion.div>
                        
                        {/* Icon */}
                        <div 
                          className={`p-3.5 ${colors.bgLight} rounded-xl mb-3 border ${colors.border} group-hover:scale-105 transition-all duration-300`}
                          style={{ boxShadow: colors.glow }}
                        >
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        
                        {/* Text */}
                        <h3 className="text-white font-bold text-base mb-1">{tool.name}</h3>
                        <p className={`${colors.text} text-xs uppercase font-bold tracking-widest`}>{tool.role}</p>
                      </div>
                    </div>
                    
                    {/* Arrow connector */}
                    {index < tools.length - 1 && (
                      <motion.div 
                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden md:block"
                        {...(isExporting ? {} : {
                          animate: { x: [0, 4, 0] },
                          transition: { duration: 1.2, repeat: Infinity, delay: index * 0.15 }
                        })}
                      >
                        <ArrowRight className="w-4 h-4 text-white/30" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          {...(isExporting ? {} : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 1.4, duration: 0.8 }
          })}
          className="relative mt-6 max-w-3xl"
        >
          <div className="relative px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div className="absolute -top-3 left-8 text-4xl text-emerald-400/30 font-serif">"</div>
            <p className="text-lg md:text-xl text-white/50 font-light text-center leading-relaxed">
              Las barreras intelectuales están siendo reemplazadas por
              <span className="text-emerald-400 font-medium"> barreras de pago.</span>
              <br />
              <span className="text-white/70 font-normal">Delega en sistemas antes que en personas.</span>
            </p>
            <div className="absolute -bottom-3 right-8 text-4xl text-emerald-400/30 font-serif rotate-180">"</div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        {...(isExporting ? {} : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.8 }
        })}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-center"
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
          {config.date} • {config.instructor}
        </p>
      </motion.div>

      <div className="absolute bottom-8 right-8 text-base font-bold text-white/20 tabular-nums">
        {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '01'}
      </div>
    </div>
  );
}
