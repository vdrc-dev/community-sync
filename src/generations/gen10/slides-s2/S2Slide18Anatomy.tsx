import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, ComponentItem } from '@/hooks/useSlideContent';
import { Eye, Brain, Database, Wrench, RefreshCw, LucideIcon } from 'lucide-react';
import anatomyImg from '@/assets/gen10-s2/page-17-anatomia-agent.jpg';
import { S2Shell, useS2Motion } from './shared';

const ICON_MAP: Record<string, LucideIcon> = { Eye, Brain, Database, Wrench };

const DEFAULT_PARTS: ComponentItem[] = [
  { name: 'Percepción', icon: 'Eye', desc: 'Ve y entiende el entorno digital — captura pantallas, lee la estructura de páginas web (DOM) y recibe datos de servicios externos', examples: ['Screenshots', 'Lectura de páginas', 'Datos de APIs'], color: 'cyan' },
  { name: 'Cerebro (LLM)', icon: 'Brain', desc: 'Planifica, razona y decide el siguiente paso usando "cadena de pensamiento" — un proceso donde la IA descompone problemas complejos paso a paso', examples: ['Razonamiento paso a paso', 'Decisiones', 'Priorización'], color: 'pink' },
  { name: 'Memoria', icon: 'Database', desc: 'Recuerda contexto entre pasos para no repetir trabajo — como una libreta que conserva resultados parciales', examples: ['Estado previo', 'Resultados parciales', 'Instrucciones'], color: 'amber' },
  { name: 'Herramientas', icon: 'Wrench', desc: 'Ejecuta acciones en el mundo real: navegar sitios web, escribir archivos y conectarse a servicios externos mediante APIs', examples: ['Navegador', 'Terminal', 'Servicios externos'], color: 'violet' },
];

const COLOR_MAP: Record<string, { text: string; bg: string; border: string; glow: string; solid: string }> = {
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30',   glow: 'rgba(6,182,212,0.25)',   solid: '#06b6d4' },
  pink:   { text: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/30',   glow: 'rgba(236,72,153,0.25)',  solid: '#ec4899' },
  amber:  { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  glow: 'rgba(245,158,11,0.25)', solid: '#f59e0b' },
  violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', glow: 'rgba(139,92,246,0.25)', solid: '#8b5cf6' },
};

const ANALOGIES = [
  '"Los ojos y oídos — observa antes de actuar"',
  '"El cerebro — piensa paso a paso antes de decidir"',
  '"La libreta de notas — recuerda lo que ya hizo"',
  '"Las manos — ejecuta acciones en el mundo real"',
];

export function S2Slide18Anatomy() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(17);
  const [activePart, setActivePart] = useState(0);

  const parts = content.components || DEFAULT_PARTS;

  const m = useS2Motion();

  const active = parts[activePart];
  const activeColor = COLOR_MAP[active?.color] || COLOR_MAP.cyan;
  const ActiveIcon = ICON_MAP[active?.icon] || Eye;

  return (
    <S2Shell
      footerLabel="ANATOMÍA AGENTE"
      className="flex flex-col justify-center px-16 2xl:px-20"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(263_70%_45%_/_0.18),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(185_55%_45%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_80%_40%,_hsl(330_60%_40%_/_0.06),_transparent_55%)]" />
      </>}
    >
      {/* Breathing orbs */}
      {!isExporting && (
        <>
          <motion.div className="absolute top-[25%] left-[30%] w-[600px] h-[500px] rounded-full blur-[200px]"
            key={activePart} initial={{ opacity: 0 }} animate={{ opacity: 0.35, scale: [1, 1.15, 1] }}
            transition={{ opacity: { duration: 0.4 }, scale: { duration: 8, repeat: Infinity } }}
            style={{ background: `radial-gradient(circle, ${activeColor.glow}, transparent 70%)` }} />
          <motion.div className="absolute bottom-[20%] right-[25%] w-[450px] h-[400px] rounded-full blur-[160px]"
            style={{ background: 'hsl(330 55% 45% / 0.06)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.15, 0.06] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full justify-center max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-cyan-400 via-pink-400 to-violet-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Arquitectura Agente</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Anatomía de un <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">Agente</span>
          </h1>
          <p className="text-base text-white/55 mt-3 leading-relaxed max-w-[600px]">
            Los 4 componentes que permiten a un agente percibir, pensar, recordar y actuar.
          </p>
        </motion.div>

        <div className="grid grid-cols-[1fr_1.2fr] gap-8 items-start">
          {/* LEFT: Image + selector */}
          <motion.div {...m(0.1)} className="space-y-4">
            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
              style={{ boxShadow: `0 0 60px ${activeColor.glow}, 0 0 120px ${activeColor.glow.replace('0.25', '0.08')}` }}>
              <img src={anatomyImg} alt="Anatomía de un Agente IA" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
              {/* Overlay indicators on image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 p-4">
                  {parts.map((part, i) => {
                    const color = COLOR_MAP[part.color] || COLOR_MAP.cyan;
                    const Icon = ICON_MAP[part.icon] || Eye;
                    const isActive = activePart === i;
                    return (
                      <motion.button key={i} onClick={() => setActivePart(i)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md transition-all duration-300 ${isActive ? 'bg-black/60 border border-white/20 scale-105' : 'bg-black/30 border border-white/[0.06] hover:bg-black/50'}`}
                        whileHover={isExporting ? undefined : { scale: 1.05 }}
                        whileTap={isExporting ? undefined : { scale: 0.97 }}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? color.bg : 'bg-white/5'} border ${isActive ? color.border : 'border-white/[0.06]'}`}>
                          <Icon className={`w-4 h-4 ${isActive ? color.text : 'text-white/30'}`} />
                        </div>
                        <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-white/50'}`}>{part.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cycle progress bar */}
            <div className="flex items-center gap-1 px-1">
              {parts.map((p, i) => {
                const c = COLOR_MAP[p.color] || COLOR_MAP.cyan;
                return (
                  <div key={i} className="flex items-center flex-1">
                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${activePart >= i ? 'opacity-100' : 'opacity-15'}`}
                      style={{ background: c.solid }} />
                    {i < parts.length - 1 && (
                      <svg className="w-3 h-3 mx-0.5 shrink-0 text-white/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
                    )}
                  </div>
                );
              })}
              <motion.div className="ml-1" {...(isExporting ? {} : { animate: { rotate: 360 }, transition: { duration: 8, repeat: Infinity, ease: 'linear' } })}>
                <RefreshCw className="w-3.5 h-3.5 text-white/20" />
              </motion.div>
            </div>

            {/* Loop note */}
            <div className="p-3 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.06), rgba(139,92,246,0.08))' }}>
              <div className="absolute inset-0 rounded-xl border border-violet-500/20" />
              <div className="relative flex items-start gap-2">
                <RefreshCw className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <p className="text-violet-300/70 text-xs leading-relaxed">El ciclo Percibir → Pensar → Recordar → Actuar se repite N veces hasta completar la tarea.</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Detail panel */}
          <motion.div {...m(0.25)} className="space-y-3">
            {/* Component cards list */}
            {parts.map((part, i) => {
              const color = COLOR_MAP[part.color] || COLOR_MAP.cyan;
              const Icon = ICON_MAP[part.icon] || Eye;
              const isActive = activePart === i;
              return (
                <motion.button key={i} onClick={() => setActivePart(i)}
                  className={`w-full text-left rounded-2xl border transition-all duration-300 relative overflow-hidden ${isActive ? `${color.bg} ${color.border} p-5` : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10 p-4'}`}
                  whileHover={isExporting ? undefined : { scale: 1.01 }}
                  whileTap={isExporting ? undefined : { scale: 0.99 }}
                  layout>
                  {isActive && !isExporting && (
                    <motion.div layoutId="anatomy-glow" className="absolute inset-0 rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 10% 50%, ${color.glow}, transparent 70%)` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                  )}
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${isActive ? `${color.bg} ${color.border}` : 'bg-white/5 border-white/[0.06]'}`}
                        style={isActive ? { boxShadow: `0 0 20px ${color.glow}` } : {}}>
                        <Icon className={`w-5 h-5 ${isActive ? color.text : 'text-white/25'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold ${isActive ? color.text : 'text-white/20'}`}>0{i + 1}</span>
                          <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-white/50'}`}>{part.name}</p>
                        </div>
                        {!isActive && <p className="text-white/30 text-xs mt-0.5 truncate">{part.desc}</p>}
                      </div>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? `bg-current ${color.text}` : 'bg-white/10'}`} />
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden">
                          <div className="mt-4 space-y-3">
                            <div className="p-3 rounded-xl bg-black/20 border border-white/[0.05]">
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${color.text}`}>¿Qué hace?</span>
                              <p className="text-white/60 text-sm mt-1 leading-relaxed">{part.desc}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(part.examples || []).map((ex, j) => (
                                <span key={j} className={`px-3 py-1.5 rounded-lg text-xs border ${color.bg} ${color.border} ${color.text}`}>
                                  {ex}
                                </span>
                              ))}
                            </div>
                            <div className="p-2.5 rounded-xl bg-black/30 border border-white/[0.06]">
                              <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Analogía humana</span>
                              <p className="text-white/50 text-xs mt-1 italic">{ANALOGIES[i]}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </S2Shell>
  );
}
