import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Sparkles, CheckCircle } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

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
  
  // Database-driven content with fallbacks
  const checklist = (content.checklist as Array<{ item: string; example: string }>) || DEFAULT_CHECKLIST;
  const closingQuote = (content.closingQuote as string) || 'La higiene digital es aburrida, pero necesaria';
  const finalMessage = (content.finalMessage as { paradigm: string; impact: string }) || {
    paradigm: 'LA TECNOLOGÍA NO ES EL FIN, SINO EL MEDIO',
    impact: 'CUANDO AUTOMATIZAMOS LO TRIVIAL, LIBERAMOS EL POTENCIAL HUMANO'
  };

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.7, ease: 'easeOut' },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex flex-col items-center justify-center font-sans selection:bg-emerald-500/30">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${closingBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020609] via-[#020609]/70 to-[#020609]/50" />
      
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] bg-emerald-500/[0.08] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Decorative circuit lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-10 left-10 w-48 h-48 opacity-10">
          <path d="M0,80 L40,80 L40,40 L80,40" stroke="rgb(16,185,129)" strokeWidth="2" fill="none" />
          <circle cx="80" cy="40" r="4" fill="rgb(16,185,129)" />
          <path d="M0,120 L60,120 L60,60 L100,60" stroke="rgb(16,185,129)" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-10 right-10 w-48 h-48 opacity-10 transform scale-x-[-1]">
          <path d="M0,80 L40,80 L40,40 L80,40" stroke="rgb(16,185,129)" strokeWidth="2" fill="none" />
          <circle cx="80" cy="40" r="4" fill="rgb(16,185,129)" />
        </svg>
        <svg className="absolute bottom-10 left-10 w-48 h-48 opacity-10 transform scale-y-[-1]">
          <path d="M0,80 L40,80 L40,40 L80,40" stroke="rgb(16,185,129)" strokeWidth="2" fill="none" />
          <circle cx="80" cy="40" r="4" fill="rgb(16,185,129)" />
        </svg>
        <svg className="absolute bottom-10 right-10 w-48 h-48 opacity-10 transform scale-[-1]">
          <path d="M0,80 L40,80 L40,40 L80,40" stroke="rgb(16,185,129)" strokeWidth="2" fill="none" />
          <circle cx="80" cy="40" r="4" fill="rgb(16,185,129)" />
        </svg>
      </div>

      {/* Main Quote */}
      <motion.div {...getMotionProps(0.1)} className="relative z-10 text-center max-w-5xl mb-8 px-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-emerald-400/60" />
          <span className="text-emerald-400/60 text-sm font-semibold tracking-widest uppercase">Reflexión Final</span>
          <Sparkles className="w-6 h-6 text-emerald-400/60" />
        </div>
        <p className="text-3xl md:text-4xl text-white font-black leading-relaxed tracking-wide">{finalMessage.paradigm}</p>
        <p 
          className="text-2xl md:text-3xl font-black leading-relaxed tracking-wide mt-4"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {finalMessage.impact}
        </p>
      </motion.div>

      {/* Checklist */}
      <motion.div {...getMotionProps(0.25)} className="relative z-10 w-full max-w-2xl px-8 mb-8">
        <div className="bg-white/[0.03] backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Checklist de Hoy</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div>
                  <span className="text-white font-semibold text-sm">{item.item}</span>
                  <p className="text-white/40 text-xs">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-amber-400/80 text-xs mt-4 text-center italic">"{closingQuote}"</p>
        </div>
      </motion.div>

      {/* Contact Card */}
      <motion.div {...getMotionProps(0.4)} className="relative z-10 w-full max-w-md px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mb-6" />
        <p className="text-white font-black text-2xl mb-4 text-center tracking-wide">Vicente Donoso</p>
        <div className="bg-white/[0.03] backdrop-blur-sm border border-emerald-500/20 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-white font-bold text-lg">VICENTE@VDRC.CL</span>
          </div>
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Phone className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-white font-bold text-lg">+56 9 7699 8520</span>
              <p className="text-white/40 text-sm">WhatsApp para dudas puntuales</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/20 tabular-nums tracking-wider">
        29 / 29
      </div>
    </div>
  );
}
