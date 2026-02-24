import React from 'react';
import { motion } from 'framer-motion';
import { Axe, Quote, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-sharpen-saw.jpg';

export function Slide06SharpenStory() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(6);
  const backgroundImage = (content.imageUrl as string) || CLOUD_URL;
  const m = useS1Motion();
  
  const beforeAfter = content.beforeAfter as { before: { quote: string; label: string }; after: { quote: string; label: string } } | undefined;
  const beforeQuote = beforeAfter?.before?.quote || '¡No tengo tiempo para afilar la sierra! ¡Estoy demasiado ocupado aserrando!';
  const beforeLabel = beforeAfter?.before?.label || 'El Problema';
  const afterQuote = beforeAfter?.after?.quote || 'Toma un descanso y afila la sierra.';
  const afterLabel = beforeAfter?.after?.label || 'La Solución';
  const bottomMessage = (content.bottomMessage as string) || 'Trabajar sin renovar capacidades conduce al agotamiento. Afilar la sierra es invertir en ti mismo.';
  const source = (content.source as string) || 'Stephen Covey — "Los 7 hábitos de la gente altamente efectiva"';

  return (
    <S1Shell
      footerLabel="FILOSOFÍA"
      className="flex flex-col"
      radials={<>
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/85 via-[#030303]/75 to-[#030303]/90" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[150px]" style={{ background: 'hsl(160 65% 45% / 0.1)' }} />
      </>}
    >
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-12 py-8 sm:py-10">
        <motion.header {...m(0.1)} className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Axe className="w-4 h-4" style={{ color: S1_ACCENT.emerald.text }} />
              <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: S1_ACCENT.emerald.text }}>Filosofía</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            AFILAR LA SIERRA:{' '}
            <span style={{ background: `linear-gradient(135deg, ${S1_ACCENT.emerald.text}, ${S1_ACCENT.cyan.text})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LA HISTORIA</span>
            {!isExporting && <motion.span className="inline-block ml-3 text-3xl sm:text-4xl" animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>🪓</motion.span>}
            {isExporting && <span className="inline-block ml-3 text-4xl">🪓</span>}
          </h1>
        </motion.header>

        <motion.div {...m(0.2)} className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8">
          <motion.div {...m(0.25)} className="group relative max-w-md w-full">
            <div className="relative bg-white/[0.05] backdrop-blur-sm rounded-2xl p-5 sm:p-6 border" style={{ borderColor: S1_ACCENT.rose.border }}>
              <Quote className="w-5 h-5 mb-2" style={{ color: S1_ACCENT.rose.text }} />
              <p className="text-white/90 text-lg sm:text-xl italic leading-relaxed">"{beforeQuote}"</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: S1_ACCENT.rose.dot }} />
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: S1_ACCENT.rose.text }}>{beforeLabel}</span>
              </div>
            </div>
          </motion.div>

          <motion.div {...m(0.35)} className="flex flex-col items-center gap-2">
            <ArrowRight className="w-8 sm:w-10 h-8 sm:h-10" style={{ color: S1_ACCENT.emerald.text }} />
          </motion.div>

          <motion.div {...m(0.3)} className="group relative max-w-md w-full">
            <div className="relative backdrop-blur-sm rounded-2xl p-5 sm:p-6 border" style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Sparkles className="w-5 h-5 mb-2" style={{ color: S1_ACCENT.emerald.text }} />
              <p className="text-lg sm:text-xl font-medium leading-relaxed" style={{ color: S1_ACCENT.emerald.text }}>"{afterQuote}"</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: S1_ACCENT.emerald.dot }} />
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: S1_ACCENT.emerald.text }}>{afterLabel}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.footer {...m(0.4)} className="mt-6">
          <div className="p-5 sm:p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-center">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide uppercase"
              style={{ background: `linear-gradient(135deg, ${S1_ACCENT.emerald.text}, ${S1_ACCENT.cyan.text})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {bottomMessage}
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4 text-white/30" />
              <span className="text-white/40 text-sm">{source}</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </S1Shell>
  );
}
