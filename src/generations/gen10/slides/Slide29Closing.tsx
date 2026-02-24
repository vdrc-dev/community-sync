import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Sparkles, CheckCircle } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-closing-bg.png';

const DEFAULT_CHECKLIST = [
  { item: 'Inbox Zero', example: 'Procesar y archivar diariamente' },
  { item: 'Navegadores separados', example: 'Trabajo en Edge, Personal en Chrome' },
  { item: 'Gestor de contraseñas', example: 'Bitwarden instalado y configurado' },
  { item: 'Manual IA', example: 'Contexto persistente en Claude/ChatGPT' },
  { item: 'Formato regional', example: 'Números y fórmulas configurados para Chile' },
];

export function Slide29Closing() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(29);
  const closingBg = (content.imageUrl as string) || CLOUD_URL;
  const m = useS1Motion();

  const checklist = (content.checklist as Array<{ item: string; example: string }>) || DEFAULT_CHECKLIST;
  const closingQuote = (content.closingQuote as string) || 'La higiene digital es aburrida, pero necesaria';
  const finalMessage = (content.finalMessage as { paradigm: string; impact: string }) || {
    paradigm: 'LA TECNOLOGÍA NO ES EL FIN, SINO EL MEDIO',
    impact: 'CUANDO AUTOMATIZAMOS LO TRIVIAL, LIBERAMOS EL POTENCIAL HUMANO'
  };

  return (
    <S1Shell
      footerLabel="CIERRE"
      className="flex flex-col items-center justify-center"
      radials={<>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${closingBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-[#030303]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_30%,_hsl(160_65%_45%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_70%_70%,_hsl(185_70%_50%_/_0.06),_transparent_55%)]" />
      </>}
    >

      {/* Main Quote */}
      <motion.div {...m(0.1)} className="relative z-10 text-center max-w-5xl mb-6 sm:mb-8 px-6 sm:px-8">
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <Sparkles className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: 'hsl(160 65% 50% / 0.6)' }} />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase" style={{ color: 'hsl(160 65% 50% / 0.6)' }}>Reflexión Final</span>
          <Sparkles className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: 'hsl(160 65% 50% / 0.6)' }} />
        </div>
        <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-black leading-relaxed tracking-wide">{finalMessage.paradigm}</p>
        <p className="text-xl sm:text-2xl lg:text-3xl font-black leading-relaxed tracking-wide mt-3 sm:mt-4"
          style={{
            background: 'linear-gradient(135deg, hsl(160 70% 55%) 0%, hsl(185 75% 55%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>{finalMessage.impact}</p>
      </motion.div>

      {/* Checklist */}
      <motion.div {...m(0.3)} className="relative z-10 w-full max-w-2xl px-6 sm:px-8 mb-6 sm:mb-8">
        <div className="bg-white/[0.03] backdrop-blur-sm border rounded-2xl p-4 sm:p-5"
          style={{ borderColor: S1_ACCENT.emerald.border }}>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" style={{ color: S1_ACCENT.emerald.text }} />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wider" style={{ color: S1_ACCENT.emerald.text }}>Checklist de Hoy</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: S1_ACCENT.emerald.dot }} />
                <div>
                  <span className="text-white font-semibold text-xs sm:text-sm">{item.item}</span>
                  <p className="text-white/40 text-[10px] sm:text-xs">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3 sm:mt-4 text-center italic" style={{ color: S1_ACCENT.amber.text }}>"{closingQuote}"</p>
        </div>
      </motion.div>

      {/* Contact Card */}
      <motion.div {...m(0.5)} className="relative z-10 w-full max-w-md px-6 sm:px-8">
        <div className="h-px mb-4 sm:mb-6" style={{ background: 'linear-gradient(90deg, transparent, hsl(160 65% 50% / 0.5), transparent)' }} />
        <p className="text-white font-black text-xl sm:text-2xl mb-3 sm:mb-4 text-center tracking-wide">Vicente Donoso</p>
        <div className="bg-white/[0.03] backdrop-blur-sm border rounded-2xl overflow-hidden"
          style={{ borderColor: S1_ACCENT.emerald.border }}>
          <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5">
            <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-xl flex items-center justify-center border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Mail className="w-4 sm:w-5 h-4 sm:h-5" style={{ color: S1_ACCENT.emerald.text }} />
            </div>
            <span className="text-white font-bold text-sm sm:text-lg">VICENTE@VDRC.CL</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
            <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-xl flex items-center justify-center border"
              style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
              <Phone className="w-4 sm:w-5 h-4 sm:h-5" style={{ color: S1_ACCENT.emerald.text }} />
            </div>
            <div>
              <span className="text-white font-bold text-sm sm:text-lg">+56 9 7699 8520</span>
              <p className="text-white/40 text-[10px] sm:text-sm">WhatsApp para dudas puntuales</p>
            </div>
          </div>
        </div>
      </motion.div>
    </S1Shell>
  );
}
