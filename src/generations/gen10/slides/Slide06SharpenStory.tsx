import React from 'react';
import { motion } from 'framer-motion';
import { Axe, Quote, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-sharpen-saw.jpg';

export function Slide06SharpenStory() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(6);
  const backgroundImage = (content.imageUrl as string) || CLOUD_URL;
  
  // Database-driven content with fallbacks
  const beforeAfter = content.beforeAfter as { 
    before: { quote: string; label: string }; 
    after: { quote: string; label: string } 
  } | undefined;
  const beforeQuote = beforeAfter?.before?.quote || '¡No tengo tiempo para afilar la sierra! ¡Estoy demasiado ocupado aserrando!';
  const beforeLabel = beforeAfter?.before?.label || 'El Problema';
  const afterQuote = beforeAfter?.after?.quote || 'Toma un descanso y afila la sierra.';
  const afterLabel = beforeAfter?.after?.label || 'La Solución';
  const bottomMessage = (content.bottomMessage as string) || 'Trabajar sin renovar capacidades conduce al agotamiento. Afilar la sierra es invertir en ti mismo.';
  const source = (content.source as string) || 'Stephen Covey — "Los 7 hábitos de la gente altamente efectiva"';

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col font-sans selection:bg-emerald-500/30">
      
      {/* Background Image with enhanced overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020609]/85 via-[#020609]/75 to-[#020609]/90" />
      
      {/* Ambient glows */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] bg-teal-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Floating particles */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-24 right-32 w-2.5 h-2.5 rounded-full bg-emerald-400/50"
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 left-20 w-2 h-2 rounded-full bg-teal-400/40"
            animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-16 w-1.5 h-1.5 rounded-full bg-emerald-400/30"
            animate={{ y: [0, -25, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 py-10">
        
        {/* Header */}
        <motion.header {...getMotionProps(0.1)} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-500/30 rounded-full">
              <Axe className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Filosofía</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            AFILAR LA SIERRA:{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 40%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LA HISTORIA
            </span>
            {!isExporting && (
              <motion.span 
                className="inline-block ml-3 text-4xl"
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🪓
              </motion.span>
            )}
            {isExporting && <span className="inline-block ml-3 text-4xl">🪓</span>}
          </h1>
        </motion.header>

        {/* Speech Bubbles */}
        <motion.div 
          {...getMotionProps(0.2)}
          className="flex-1 flex items-center justify-center gap-8"
        >
          {/* First Bubble - Problem */}
          <motion.div 
            {...getMotionProps(0.25)}
            className="group relative max-w-md"
          >
            <div className="absolute -inset-px bg-gradient-to-br from-rose-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative bg-white/[0.05] backdrop-blur-sm rounded-2xl p-6 border border-rose-500/30 group-hover:border-rose-500/50 transition-colors">
              <Quote className="w-5 h-5 text-rose-400/50 mb-2" />
              <p className="text-white/90 text-xl italic leading-relaxed">
                "{beforeQuote}"
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                <span className="text-rose-400/70 text-xs font-medium uppercase tracking-wider">{beforeLabel}</span>
              </div>
            </div>
            
            {/* Speech tail */}
            <div className="absolute -bottom-2.5 left-10 w-5 h-5 bg-white/[0.05] border-l border-b border-rose-500/30 transform rotate-45" />
          </motion.div>

          {/* Arrow */}
          <motion.div 
            {...getMotionProps(0.35)}
            className="flex flex-col items-center gap-2"
          >
            <ArrowRight className="w-10 h-10 text-emerald-400/70" />
            {!isExporting && (
              <motion.div
                className="w-2 h-2 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Second Bubble - Solution */}
          <motion.div 
            {...getMotionProps(0.3)}
            className="group relative max-w-md"
          >
            <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative bg-emerald-500/[0.08] backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/40 group-hover:border-emerald-500/60 transition-colors">
              <Sparkles className="w-5 h-5 text-emerald-400/70 mb-2" />
              <p className="text-emerald-300 text-xl font-medium leading-relaxed">
                "{afterQuote}"
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="text-emerald-400/70 text-xs font-medium uppercase tracking-wider">{afterLabel}</span>
              </div>
            </div>
            
            {/* Speech tail */}
            <div className="absolute -bottom-2.5 right-10 w-5 h-5 bg-emerald-500/[0.08] border-r border-b border-emerald-500/40 transform rotate-45" />
          </motion.div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.footer 
          {...getMotionProps(0.4)}
          className="mt-6"
        >
          <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-center">
            <p className="text-xl md:text-2xl font-bold tracking-wide uppercase">
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {bottomMessage}
              </span>
            </p>
            
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4 text-white/30" />
              <span className="text-white/40 text-sm">
                {source}
              </span>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/15 tabular-nums tracking-wide">
        6 / 29
      </div>
    </div>
  );
}
