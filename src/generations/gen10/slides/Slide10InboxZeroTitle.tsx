import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, Mail, CheckCircle2, Zap } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-inbox-title.png';

export function Slide10InboxZeroTitle() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(10);
  const inboxImage = (content.imageUrl as string) || CLOUD_URL;
  const m = useS1Motion();

  return (
    <S1Shell
      footerLabel="INBOX ZERO"
      className="flex"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,_hsl(38_80%_50%_/_0.12),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(25_80%_50%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_10%,_hsl(45_80%_50%_/_0.06),_transparent_55%)]" />
      </>}
    >

      {/* Left - Visual (hidden on mobile) */}
      <motion.div 
        {...m(0.1)}
        className="hidden lg:flex w-[45%] items-center justify-center p-8 relative"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {!isExporting && (
            <>
              <motion.div 
                className="w-[380px] h-[380px] rounded-full border"
                style={{ borderColor: S1_ACCENT.amber.border }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute w-[320px] h-[320px] rounded-full border"
                style={{ borderColor: S1_ACCENT.orange.border }}
                animate={{ scale: [1.05, 1, 1.05], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </>
          )}
        </div>

        <div className="relative z-10">
          <div className="absolute -inset-8 blur-3xl rounded-full" style={{ background: 'linear-gradient(135deg, hsl(38 80% 50% / 0.25), hsl(25 80% 50% / 0.15))' }} />
          <div className="relative p-2 rounded-2xl border" style={{ background: S1_ACCENT.amber.bg, borderColor: S1_ACCENT.amber.border }}>
            <img src={inboxImage} alt="Inbox Zero" className="relative w-full max-w-[320px] h-auto object-contain rounded-xl" />
          </div>
        </div>

        {!isExporting && (
          <>
            <motion.div className="absolute top-20 left-20 p-3 rounded-xl backdrop-blur-sm border"
              style={{ background: S1_ACCENT.amber.bg, borderColor: S1_ACCENT.amber.border }}
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Mail className="w-5 h-5" style={{ color: S1_ACCENT.amber.text }} />
            </motion.div>
            <motion.div className="absolute bottom-32 left-16 p-3 rounded-xl backdrop-blur-sm border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}
              animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
              <CheckCircle2 className="w-5 h-5" style={{ color: S1_ACCENT.emerald.text }} />
            </motion.div>
            <motion.div className="absolute top-32 right-20 p-3 rounded-xl backdrop-blur-sm border"
              style={{ background: S1_ACCENT.orange.bg, borderColor: S1_ACCENT.orange.border }}
              animate={{ y: [0, -6, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}>
              <Zap className="w-5 h-5" style={{ color: S1_ACCENT.orange.text }} />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Right - Content */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:pr-16 lg:pl-8 relative z-10">
        <motion.div {...m(0.15)} className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border"
            style={{ background: 'linear-gradient(135deg, hsl(38 80% 50% / 0.12), hsl(25 80% 50% / 0.06))', borderColor: S1_ACCENT.amber.border }}>
            <Inbox className="w-5 h-5" style={{ color: S1_ACCENT.amber.text }} />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: S1_ACCENT.amber.text }}>Tema 1 de 5</span>
          </div>
        </motion.div>

        <motion.div {...m(0.25)}>
          <h1 className="text-[4rem] sm:text-[7rem] lg:text-[9rem] font-black text-white tracking-tight leading-[0.85] mb-2">INBOX</h1>
          <h1 className="text-[4rem] sm:text-[7rem] lg:text-[9rem] font-black tracking-tight leading-[0.85]"
            style={{
              background: 'linear-gradient(135deg, hsl(38 85% 65%) 0%, hsl(25 85% 55%) 50%, hsl(15 80% 50%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>ZERO</h1>
        </motion.div>

        <motion.div {...m(0.35)} className="mt-6 sm:mt-8">
          <p className="text-lg sm:text-xl text-white/50 font-medium max-w-md">
            Tu bandeja de entrada es un lugar de <span className="font-semibold" style={{ color: S1_ACCENT.amber.text }}>tránsito</span>, no de almacenamiento
          </p>
        </motion.div>

        <motion.div {...m(0.45)} className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-6">
          {[
            { value: '3', label: 'Decisiones', accent: S1_ACCENT.amber },
            { value: '0', label: 'Dudas', accent: S1_ACCENT.orange },
            { value: '∞', label: 'Productividad', accent: S1_ACCENT.emerald },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border"
              style={{ background: stat.accent.bg, borderColor: stat.accent.border }}>
              <span className="text-2xl sm:text-3xl font-black" style={{ color: stat.accent.text }}>{stat.value}</span>
              <span className="text-[10px] sm:text-xs text-white/40 font-medium uppercase tracking-wide">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </S1Shell>
  );
}
