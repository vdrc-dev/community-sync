import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Monitor } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-browsers-bg.jpg';

export function Slide13BrowsersTitle() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(13);
  const browsersBg = (content.imageUrl as string) || CLOUD_URL;
  const m = useS1Motion();

  return (
    <S1Shell
      footerLabel="NAVEGADORES"
      className="flex"
      radials={<>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${browsersBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/98 via-[#030303]/85 to-[#030303]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_30%,_hsl(185_70%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_80%_70%,_hsl(217_70%_55%_/_0.08),_transparent_55%)]" />
      </>}
    >

      {/* Floating icons (desktop only) */}
      {!isExporting && (
        <div className="absolute right-16 lg:right-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-10 opacity-30">
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="p-4 rounded-2xl border" style={{ background: S1_ACCENT.cyan.bg, borderColor: S1_ACCENT.cyan.border }}>
            <Globe className="w-16 h-16" style={{ color: S1_ACCENT.cyan.text }} />
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="p-4 rounded-2xl border" style={{ background: S1_ACCENT.blue.bg, borderColor: S1_ACCENT.blue.border }}>
            <Monitor className="w-14 h-14" style={{ color: S1_ACCENT.blue.text }} />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex items-center px-6 sm:px-10 lg:px-12 py-8">
        <div className="max-w-3xl">
          <motion.div {...m(0.1)} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-sm border"
              style={{ background: S1_ACCENT.cyan.bg, borderColor: S1_ACCENT.cyan.border }}>
              <Globe className="w-4 h-4" style={{ color: S1_ACCENT.cyan.text }} />
              <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: S1_ACCENT.cyan.text }}>Tema 2</span>
            </div>
          </motion.div>

          <motion.div {...m(0.2)}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-2">NAVEGADORES</h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-2"
              style={{
                background: 'linear-gradient(135deg, hsl(185 75% 60%) 0%, hsl(217 70% 60%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Y PERFILES</h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">SEPARADOS</h1>
          </motion.div>
          
          <motion.p {...m(0.3)} className="text-lg sm:text-xl text-white/50 mt-6 sm:mt-8 max-w-xl">
            Organizando tu vida digital en <span className="font-semibold" style={{ color: S1_ACCENT.cyan.text }}>espacios definidos</span>
          </motion.p>

          <motion.div {...m(0.4)} className="mt-6 sm:mt-8">
            <div className="inline-flex items-center gap-4 px-5 sm:px-6 py-3 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center border"
                style={{ background: S1_ACCENT.cyan.bg, borderColor: S1_ACCENT.cyan.border }}>
                <span className="font-black text-base sm:text-lg" style={{ color: S1_ACCENT.cyan.text }}>1</span>
              </div>
              <div>
                <span className="text-white/60 text-sm">CONTEXTO</span>
                <span className="text-white/30 mx-3">=</span>
                <span className="font-bold" style={{ color: S1_ACCENT.cyan.text }}>1 PERFIL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </S1Shell>
  );
}
