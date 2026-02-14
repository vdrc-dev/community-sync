import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-security-bg.jpg';

export function Slide17SecurityTitle() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(17);
  const securityBg = (content.imageUrl as string) || CLOUD_URL;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { delay, duration: 0.6, ease: 'easeOut' },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex font-sans selection:bg-rose-500/30">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${securityBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020609]/98 via-[#020609]/80 to-[#020609]/40" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[400px] bg-rose-500/[0.08] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-amber-500/[0.06] rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating security icons */}
      {!isExporting && (
        <div className="absolute right-24 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-30">
          <motion.div
            animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20"
          >
            <Shield className="w-16 h-16 text-rose-400" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20"
          >
            <Lock className="w-12 h-12 text-amber-400" />
          </motion.div>
          <motion.div
            animate={{ x: [0, 8, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <Key className="w-10 h-10 text-emerald-400" />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex items-center px-12 py-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div {...getMotionProps(0.1)} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full backdrop-blur-sm">
              <Shield className="w-4 h-4 text-rose-400" />
              <span className="text-rose-400 text-sm font-semibold tracking-wide uppercase">Tema 3</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div {...getMotionProps(0.2)}>
            <h1 
              className="text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-2"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CONTRASEÑAS
            </h1>
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Y SEGURIDAD
            </h1>
          </motion.div>
          
          <motion.p 
            {...getMotionProps(0.3)}
            className="text-xl text-white/50 mt-8 max-w-xl"
          >
            Protegiendo tu identidad digital con <span className="text-rose-400/80 font-semibold">sistemas robustos</span>
          </motion.p>

          {/* Key stats */}
          <motion.div {...getMotionProps(0.4)} className="mt-8 flex gap-6">
            <div className="px-5 py-3 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm">
              <span className="text-rose-400 font-black text-2xl">81%</span>
              <p className="text-white/40 text-xs mt-1">de brechas por contraseñas débiles</p>
            </div>
            <div className="px-5 py-3 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm">
              <span className="text-amber-400 font-black text-2xl">2FA</span>
              <p className="text-white/40 text-xs mt-1">reduce 99% de ataques</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        17 / 29
      </div>
    </div>
  );
}
