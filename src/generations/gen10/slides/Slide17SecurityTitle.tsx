import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-security-bg.jpg';

export function Slide17SecurityTitle() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(17);
  const securityBg = (content.imageUrl as string) || CLOUD_URL;
  const m = useS1Motion();

  return (
    <S1Shell
      footerLabel="SEGURIDAD DIGITAL"
      className="flex"
      radials={<>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${securityBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/98 via-[#030303]/85 to-[#030303]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_30%,_hsl(350_60%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_80%_70%,_hsl(38_80%_50%_/_0.08),_transparent_55%)]" />
      </>}
    >

      {/* Floating security icons (desktop only) */}
      {!isExporting && (
        <div className="absolute right-16 lg:right-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-30">
          <motion.div animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}
            className="p-4 rounded-2xl border" style={{ background: S1_ACCENT.rose.bg, borderColor: S1_ACCENT.rose.border }}>
            <Shield className="w-16 h-16" style={{ color: S1_ACCENT.rose.text }} />
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="p-3 rounded-2xl border" style={{ background: S1_ACCENT.amber.bg, borderColor: S1_ACCENT.amber.border }}>
            <Lock className="w-12 h-12" style={{ color: S1_ACCENT.amber.text }} />
          </motion.div>
          <motion.div animate={{ x: [0, 8, 0], rotate: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="p-3 rounded-2xl border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
            <Key className="w-10 h-10" style={{ color: S1_ACCENT.emerald.text }} />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex items-center px-6 sm:px-10 lg:px-12 py-8">
        <div className="max-w-3xl">
          <motion.div {...m(0.1)} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-sm border"
              style={{ background: S1_ACCENT.rose.bg, borderColor: S1_ACCENT.rose.border }}>
              <Shield className="w-4 h-4" style={{ color: S1_ACCENT.rose.text }} />
              <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: S1_ACCENT.rose.text }}>Tema 3</span>
            </div>
          </motion.div>

          <motion.div {...m(0.2)}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-2"
              style={{
                background: 'linear-gradient(135deg, hsl(350 70% 60%) 0%, hsl(25 85% 55%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>CONTRASEÑAS</h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">Y SEGURIDAD</h1>
          </motion.div>
          
          <motion.p {...m(0.3)} className="text-lg sm:text-xl text-white/50 mt-6 sm:mt-8 max-w-xl">
            Protegiendo tu identidad digital con <span className="font-semibold" style={{ color: S1_ACCENT.rose.text }}>sistemas robustos</span>
          </motion.p>

          <motion.div {...m(0.4)} className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6">
            <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm">
              <span className="font-black text-xl sm:text-2xl" style={{ color: S1_ACCENT.rose.text }}>81%</span>
              <p className="text-white/40 text-[10px] sm:text-xs mt-1">de brechas por contraseñas débiles</p>
            </div>
            <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm">
              <span className="font-black text-xl sm:text-2xl" style={{ color: S1_ACCENT.amber.text }}>2FA</span>
              <p className="text-white/40 text-[10px] sm:text-xs mt-1">reduce 99% de ataques</p>
            </div>
          </motion.div>
        </div>
      </div>
    </S1Shell>
  );
}
