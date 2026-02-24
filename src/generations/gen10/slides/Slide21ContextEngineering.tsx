import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Cloud, Network, Brain, Lightbulb, Settings, Upload } from 'lucide-react';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10/canva-context-bg.jpg';

export function Slide21ContextEngineering() {
  const m = useS1Motion();
  const content = useSlideContent(21);
  const contextBg = (content.imageUrl as string) || CLOUD_URL;

  const pillars = [
    { num: '1', title: 'INSTRUCCIONES\nDE SISTEMA', desc: 'Define tu "Manual de Usuario" una sola vez. Tu identidad, preferencias y reglas claras.', icon: BookOpen, secondaryIcon: Settings },
    { num: '2', title: 'PORTABILIDAD', desc: 'Crea un archivo maestro (PDF/TXT) que puedas cargar en la memoria de cualquier modelo.', icon: Cloud, secondaryIcon: Upload },
    { num: '3', title: 'CONSISTENCIA', desc: 'Asegura que Claude, Gemini y ChatGPT entiendan quién eres sin repetirlo cada vez.', icon: Brain, secondaryIcon: Network },
  ];

  return (
    <S1Shell footerLabel="HIGIENE DIGITAL" className="flex flex-col" radials={
      <>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${contextBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030303]/95 via-[#030303]/90 to-[#030303]/95" />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-cyan-500/[0.08] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-teal-500/[0.06] rounded-full blur-[180px]" />
      </>
    }>
      <div className="relative z-10 flex-1 flex flex-col px-5 sm:px-16 py-10">
        <motion.div {...m(0.1)} className="mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full backdrop-blur-md mb-5" style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.35)' }}>
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase">Tema Bonus</span>
          </div>
          <h1 className="text-[3rem] sm:text-[5rem] md:text-[6rem] font-black tracking-tight leading-[0.95] mb-2">
            <span style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 50%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CONTEXT ENGINEERING</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 max-w-lg font-medium">
            Optimizando tu experiencia con <span className="text-cyan-400 font-semibold">cualquier IA</span>
          </p>
        </motion.div>

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full">
            {pillars.map((pillar, i) => (
              <motion.div key={pillar.num} {...m(0.25 + i * 0.12)} className="relative group flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-60" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)', transform: 'scale(1.5)' }} />
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 rounded-2xl flex items-center justify-center backdrop-blur-sm" style={{ background: 'linear-gradient(145deg, rgba(6, 182, 212, 0.15), rgba(20, 184, 166, 0.08))', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                    <pillar.icon className="w-12 sm:w-14 h-12 sm:h-14 text-cyan-400" strokeWidth={1.5} />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
                      <pillar.secondaryIcon className="w-5 h-5 text-cyan-300" strokeWidth={2} />
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mb-4" style={{ background: 'rgba(6, 182, 212, 0.2)', border: '2px solid rgba(6, 182, 212, 0.5)', color: '#22d3ee' }}>{pillar.num}</div>
                <h3 className="font-bold text-lg mb-3 leading-tight whitespace-pre-line text-cyan-300">{pillar.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-[240px]">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div {...m(0.55)} className="mt-4">
          <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.35) 20%, rgba(20, 184, 166, 0.35) 80%, transparent)' }} />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.35)' }}>
              <Lightbulb className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-white/45 text-base">
              <span className="text-cyan-400 font-semibold">Regla de Oro:</span>{' '}Reinicia el contexto periódicamente para evitar la "amnesia" del modelo
            </p>
          </div>
        </motion.div>
      </div>
    </S1Shell>
  );
}
