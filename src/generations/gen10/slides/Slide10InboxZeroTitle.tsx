import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, Mail, CheckCircle2, Zap } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-inbox-title.png';

export function Slide10InboxZeroTitle() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(10);
  const inboxImage = (content.imageUrl as string) || CLOUD_URL;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.6, ease: 'easeOut' },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#020609] flex font-sans selection:bg-amber-500/30">
      
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/6 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500/4 rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Left - Visual */}
      <motion.div 
        {...getMotionProps(0.1)}
        className="w-[45%] flex items-center justify-center p-8 relative"
      >
        {/* Glowing ring behind image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-[380px] h-[380px] rounded-full border border-amber-500/20"
            animate={isExporting ? {} : { 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-[320px] h-[320px] rounded-full border border-orange-500/15"
            animate={isExporting ? {} : { 
              scale: [1.05, 1, 1.05],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Image container */}
        <div className="relative z-10">
          <div className="absolute -inset-8 bg-gradient-to-br from-amber-500/25 to-orange-500/15 blur-3xl rounded-full" />
          <div className="relative p-2 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
            <img 
              src={inboxImage} 
              alt="Inbox Zero Illustration" 
              className="relative w-full max-w-[320px] h-auto object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Floating icons */}
        <motion.div 
          className="absolute top-20 left-20 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl backdrop-blur-sm"
          animate={isExporting ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Mail className="w-5 h-5 text-amber-400" />
        </motion.div>
        <motion.div 
          className="absolute bottom-32 left-16 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm"
          animate={isExporting ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </motion.div>
        <motion.div 
          className="absolute top-32 right-20 p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl backdrop-blur-sm"
          animate={isExporting ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
        >
          <Zap className="w-5 h-5 text-orange-400" />
        </motion.div>
      </motion.div>

      {/* Right - Content */}
      <div className="w-[55%] flex flex-col justify-center pr-16 pl-8">
        
        {/* Section badge */}
        <motion.div {...getMotionProps(0.15)} className="mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30 rounded-full">
            <Inbox className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Tema 1 de 5</span>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div {...getMotionProps(0.25)}>
          <h1 className="text-[7rem] md:text-[9rem] font-black text-white tracking-tight leading-[0.85] mb-2">
            INBOX
          </h1>
          <h1 
            className="text-[7rem] md:text-[9rem] font-black tracking-tight leading-[0.85]"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ZERO
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div {...getMotionProps(0.35)} className="mt-8">
          <p className="text-xl text-white/50 font-medium max-w-md">
            Tu bandeja de entrada es un lugar de <span className="text-amber-400 font-semibold">tránsito</span>, no de almacenamiento
          </p>
        </motion.div>

        {/* Stats preview */}
        <motion.div {...getMotionProps(0.45)} className="mt-10 flex gap-6">
          {[
            { value: '3', label: 'Decisiones', color: 'amber' },
            { value: '0', label: 'Dudas', color: 'orange' },
            { value: '∞', label: 'Productividad', color: 'emerald' },
          ].map((stat, i) => (
            <div 
              key={i}
              className={`flex flex-col items-center px-5 py-3 rounded-xl border ${
                stat.color === 'amber' ? 'bg-amber-500/5 border-amber-500/20' :
                stat.color === 'orange' ? 'bg-orange-500/5 border-orange-500/20' :
                'bg-emerald-500/5 border-emerald-500/20'
              }`}
            >
              <span className={`text-3xl font-black ${
                stat.color === 'amber' ? 'text-amber-400' :
                stat.color === 'orange' ? 'text-orange-400' :
                'text-emerald-400'
              }`}>
                {stat.value}
              </span>
              <span className="text-xs text-white/40 font-medium uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/15 tabular-nums tracking-wide">
        10 / 29
      </div>
    </div>
  );
}
