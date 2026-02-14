import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Cloud, Network, Brain, Lightbulb, Settings, Upload } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-context-bg.jpg';

export function Slide21ContextEngineering() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(21);
  const contextBg = (content.imageUrl as string) || CLOUD_URL;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.7, ease: 'easeOut' },
    };

  const pillars = [
    { 
      num: '1', 
      title: 'INSTRUCCIONES\nDE SISTEMA', 
      desc: 'Define tu "Manual de Usuario" una sola vez. Tu identidad, preferencias y reglas claras.', 
      icon: BookOpen,
      secondaryIcon: Settings,
    },
    { 
      num: '2', 
      title: 'PORTABILIDAD', 
      desc: 'Crea un archivo maestro (PDF/TXT) que puedas cargar en la memoria de cualquier modelo.', 
      icon: Cloud,
      secondaryIcon: Upload,
    },
    { 
      num: '3', 
      title: 'CONSISTENCIA', 
      desc: 'Asegura que Claude, Gemini y ChatGPT entiendan quién eres sin repetirlo cada vez.', 
      icon: Brain,
      secondaryIcon: Network,
    },
  ];

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30 bg-[#0a1929]">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${contextBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929]/95 via-[#0d2137]/90 to-[#0a1929]/95" />

      {/* Network pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="rgba(6, 182, 212, 0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-grid)" />
        </svg>
      </div>

      {/* Ambient glows - teal/cyan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-cyan-500/[0.08] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-teal-500/[0.06] rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[150px]" />
      </div>

      {/* Decorative network lines */}
      <div className="absolute top-20 right-20 opacity-40">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <line x1="0" y1="100" x2="60" y2="60" stroke="rgb(6, 182, 212)" strokeWidth="1" />
          <line x1="60" y1="60" x2="140" y2="80" stroke="rgb(6, 182, 212)" strokeWidth="1" />
          <line x1="140" y1="80" x2="200" y2="40" stroke="rgb(6, 182, 212)" strokeWidth="1" />
          <circle cx="0" cy="100" r="4" fill="rgb(6, 182, 212)" />
          <circle cx="60" cy="60" r="5" fill="rgb(6, 182, 212)" />
          <circle cx="140" cy="80" r="4" fill="rgb(6, 182, 212)" />
          <circle cx="200" cy="40" r="3" fill="rgb(6, 182, 212)" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-16 opacity-30">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <line x1="20" y1="160" x2="80" y2="100" stroke="rgb(20, 184, 166)" strokeWidth="1" />
          <line x1="80" y1="100" x2="160" y2="120" stroke="rgb(20, 184, 166)" strokeWidth="1" />
          <circle cx="20" cy="160" r="3" fill="rgb(20, 184, 166)" />
          <circle cx="80" cy="100" r="5" fill="rgb(20, 184, 166)" />
          <circle cx="160" cy="120" r="4" fill="rgb(20, 184, 166)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-16 py-10">
        
        {/* Header Section */}
        <motion.div {...getMotionProps(0.1)} className="mb-8">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <div 
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full backdrop-blur-md"
              style={{
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
              }}
            >
              <Brain className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase">Tema Bonus</span>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-[5rem] md:text-[6rem] font-black tracking-tight leading-[0.95] mb-2">
            <span 
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 50%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CONTEXT ENGINEERING
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-white/50 max-w-lg font-medium">
            Optimizando tu experiencia con <span className="text-cyan-400 font-semibold">cualquier IA</span>
          </p>
        </motion.div>

        {/* Three Pillars - Horizontal Layout */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-8 max-w-5xl w-full">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.num}
                {...getMotionProps(0.25 + i * 0.12)}
                className="relative group flex flex-col items-center text-center"
              >
                {/* Icon container with glow */}
                <div className="relative mb-6">
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-full blur-2xl opacity-60"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
                      transform: 'scale(1.5)',
                    }}
                  />
                  
                  {/* Main icon box */}
                  <div 
                    className="relative w-28 h-28 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(145deg, rgba(6, 182, 212, 0.15), rgba(20, 184, 166, 0.08))',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      boxShadow: isExporting ? 'none' : '0 0 40px rgba(6, 182, 212, 0.2)',
                    }}
                  >
                    <pillar.icon className="w-14 h-14 text-cyan-400" strokeWidth={1.5} />
                    
                    {/* Secondary icon */}
                    <div 
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(6, 182, 212, 0.2)',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                      }}
                    >
                      <pillar.secondaryIcon className="w-5 h-5 text-cyan-300" strokeWidth={2} />
                    </div>
                  </div>
                </div>
                
                {/* Number badge */}
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mb-4"
                  style={{
                    background: 'rgba(6, 182, 212, 0.2)',
                    border: '2px solid rgba(6, 182, 212, 0.5)',
                    color: '#22d3ee',
                  }}
                >
                  {pillar.num}
                </div>
                
                {/* Title */}
                <h3 
                  className="font-bold text-lg mb-3 leading-tight whitespace-pre-line text-cyan-300"
                >
                  {pillar.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed max-w-[240px]">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Insight */}
        <motion.div {...getMotionProps(0.55)} className="mt-4">
          <div 
            className="h-px w-full mb-5"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.35) 20%, rgba(20, 184, 166, 0.35) 80%, transparent)',
            }}
          />
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
              }}
            >
              <Lightbulb className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-white/45 text-base">
              <span className="text-cyan-400 font-semibold">Regla de Oro:</span>{' '}
              Reinicia el contexto periódicamente para evitar la "amnesia" del modelo
            </p>
          </div>
        </motion.div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-6 right-10 text-sm font-semibold text-white/15 tabular-nums tracking-wider">
        21 / 29
      </div>
    </div>
  );
}
