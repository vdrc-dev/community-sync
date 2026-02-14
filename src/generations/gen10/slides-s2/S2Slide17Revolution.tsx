import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { Sparkles, Bot, ArrowRight, TrendingUp, Lightbulb, MessageSquare, Cpu, Workflow } from 'lucide-react';
import { S2_THEME } from './theme';

/* ── HSL Color System ── */
const ERA_STYLES = {
  blue: {
    border: 'hsl(217 70% 55% / 0.35)', bg: 'hsl(217 70% 55% / 0.08)',
    text: 'hsl(217 70% 70%)', glow: 'hsl(217 70% 55% / 0.22)',
    dot: 'hsl(217 70% 60%)', gradient: 'hsl(217 70% 55%)',
  },
  amber: {
    border: 'hsl(38 90% 55% / 0.35)', bg: 'hsl(38 90% 55% / 0.08)',
    text: 'hsl(38 85% 65%)', glow: 'hsl(38 90% 55% / 0.22)',
    dot: 'hsl(38 90% 58%)', gradient: 'hsl(38 90% 55%)',
  },
  violet: {
    border: 'hsl(263 60% 55% / 0.45)', bg: 'hsl(263 60% 55% / 0.1)',
    text: 'hsl(263 60% 75%)', glow: 'hsl(263 60% 55% / 0.28)',
    dot: 'hsl(263 60% 60%)', gradient: 'hsl(263 60% 55%)',
  },
} as const;

type EraKey = keyof typeof ERA_STYLES;

const ERAS = [
  {
    year: '2023–24', label: 'Generativa', icon: Sparkles,
    verb: '"Ayúdame a escribir"',
    desc: 'La IA crea contenido bajo tu dirección constante. Cada paso requiere tu intervención.',
    examples: ['Redactar emails', 'Resumir textos', 'Generar imágenes'],
    color: 'blue' as EraKey, autonomy: 30,
  },
  {
    year: '2025', label: 'Razonamiento', icon: Cpu,
    verb: '"Ayúdame a pensar"',
    desc: 'La IA analiza, compara y recomienda. Tú sigues tomando la decisión final.',
    examples: ['Analizar contratos', 'Comparar estrategias', 'Debugging complejo'],
    color: 'amber' as EraKey, autonomy: 60,
  },
  {
    year: '2026', label: 'Agéntica', icon: Bot,
    verb: '"Resuélvelo y avísame"',
    desc: 'La IA planifica, ejecuta y entrega de forma autónoma. Tú supervisas el resultado.',
    examples: ['Investigar 200 fuentes', 'Ejecutar campañas', 'Generar reportes completos'],
    color: 'violet' as EraKey, autonomy: 95,
  },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  y: `${5 + Math.random() * 90}%`,
  size: 1 + Math.random() * 2.5,
  dur: 6 + Math.random() * 8,
  delay: Math.random() * 5,
  opacity: 0.08 + Math.random() * 0.2,
}));

export function S2Slide17Revolution() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const content = useSlideContent(16);
  const [activeEra, setActiveEra] = useState(2);

  const insight = content.insight || 'El cambio no es solo de capacidad — es de autonomía. Tú pasas de operador a director.';
  const gartnerStat = content.gartnerStat || 'Gartner proyecta que el 40% de las apps empresariales integrarán agentes para fines de 2026';

  const active = ERAS[activeEra];
  const style = ERA_STYLES[active.color];

  const m = (delay: number, overrides?: object) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      ...overrides,
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans selection:bg-violet-500/30"
      style={{ background: S2_THEME.background }}>

      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,_hsl(263_55%_40%_/_0.18),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_85%_80%,_hsl(217_60%_40%_/_0.08),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_15%_65%,_hsl(38_70%_45%_/_0.06),_transparent_50%)]" />
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
      </div>

      {/* Reactive breathing orb */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/2 w-[800px] h-[700px] rounded-full blur-[220px] -translate-x-1/2 -translate-y-1/2"
            key={activeEra}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4, scale: [1, 1.12, 1] }}
            transition={{ opacity: { duration: 0.5 }, scale: { duration: 8, repeat: Infinity } }}
            style={{ background: `radial-gradient(circle, ${style.glow}, transparent 65%)` }}
          />
          <motion.div
            className="absolute bottom-[-5%] right-[10%] w-[500px] h-[400px] rounded-full blur-[180px]"
            style={{ background: 'hsl(38 60% 45% / 0.06)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </>
      )}

      {/* Floating particles */}
      {!isExporting && PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y, width: p.size, height: p.size,
            background: style.dot,
            boxShadow: `0 0 ${p.size * 4}px ${style.dot}`,
          }}
          animate={{ y: [0, -25, 0], opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col h-full justify-center max-w-[1600px] mx-auto w-full">

        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full"
              style={{ background: `linear-gradient(to bottom, ${ERA_STYLES.blue.dot}, ${ERA_STYLES.amber.dot}, ${ERA_STYLES.violet.dot})` }} />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/35">La Revolución Agéntica</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            De la{' '}
            <span style={{ color: ERA_STYLES.blue.text }}>Generación</span>
            {' '}a la{' '}
            <span style={{ color: ERA_STYLES.violet.text }}>Ejecución Autónoma</span>
          </h1>
          <p className="text-base text-white/55 mt-3 leading-relaxed max-w-3xl">{gartnerStat}</p>
          <motion.div {...m(0.15)} className="mt-3 h-[3px] w-24 rounded-full"
            style={{ background: `linear-gradient(90deg, ${ERA_STYLES.blue.dot}, ${ERA_STYLES.amber.dot}, ${ERA_STYLES.violet.dot})` }} />
        </motion.div>

        <div className="grid grid-cols-[1fr_1.1fr] gap-10 items-start">

          {/* LEFT: Era selector */}
          <motion.div {...m(0.15)} className="space-y-3">
            {/* Timeline progress bar */}
            <div className="flex items-center gap-1 mb-3 px-2">
              {ERAS.map((era, i) => {
                const s = ERA_STYLES[era.color];
                return (
                  <div key={i} className="flex items-center flex-1">
                    <div className="h-1 flex-1 rounded-full transition-all duration-500"
                      style={{
                        background: activeEra >= i ? s.dot : 'hsl(0 0% 100% / 0.06)',
                        boxShadow: activeEra >= i ? `0 0 8px ${s.glow}` : 'none',
                      }} />
                    {i < ERAS.length - 1 && <ArrowRight className="w-3 h-3 text-white/12 mx-0.5 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {ERAS.map((era, i) => {
              const Icon = era.icon;
              const isActive = activeEra === i;
              const s = ERA_STYLES[era.color];

              return (
                <motion.button key={i} onClick={() => setActiveEra(i)}
                  className="w-full text-left relative"
                  whileHover={isExporting ? {} : { x: 5, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  {isActive && !isExporting && (
                    <motion.div layoutId="era-glow-v3" className="absolute -inset-[2px] rounded-2xl"
                      style={{ background: s.glow, filter: 'blur(14px)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                  )}
                  <div className="relative p-5 rounded-2xl border transition-all duration-300 overflow-hidden"
                    style={{
                      background: isActive ? s.bg : 'hsl(0 0% 100% / 0.015)',
                      borderColor: isActive ? s.border : 'hsl(0 0% 100% / 0.05)',
                      boxShadow: isActive ? `0 6px 28px ${s.glow}` : 'none',
                    }}>
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? `${s.dot}18` : 'hsl(0 0% 100% / 0.03)',
                          border: `1.5px solid ${isActive ? s.border : 'hsl(0 0% 100% / 0.06)'}`,
                          boxShadow: isActive ? `0 0 16px ${s.glow}` : 'none',
                        }}>
                        <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: isActive ? s.text : 'hsl(0 0% 100% / 0.22)' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono font-black transition-colors duration-300"
                            style={{ color: isActive ? s.text : 'hsl(0 0% 100% / 0.3)' }}>{era.year}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold transition-all duration-300"
                            style={{
                              background: isActive ? s.bg : 'hsl(0 0% 100% / 0.03)',
                              color: isActive ? s.text : 'hsl(0 0% 100% / 0.18)',
                              border: `1px solid ${isActive ? s.border : 'hsl(0 0% 100% / 0.06)'}`,
                            }}>
                            {era.label}
                          </span>
                        </div>
                        <p className="font-semibold text-sm transition-colors duration-300"
                          style={{ color: isActive ? 'hsl(0 0% 100% / 0.9)' : 'hsl(0 0% 100% / 0.4)' }}>
                          {era.verb}
                        </p>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? s.dot : 'hsl(0 0% 100% / 0.08)',
                          boxShadow: isActive ? `0 0 10px ${s.dot}` : 'none',
                        }} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* RIGHT: Detail panel */}
          <motion.div {...m(0.3)} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div key={`era-${activeEra}`}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl border relative overflow-hidden"
                style={{ background: style.bg, borderColor: style.border, boxShadow: `0 8px 40px ${style.glow}` }}>
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 80% 20%, ${style.glow}, transparent 70%)` }} />
                <div className="relative space-y-5">
                  {/* Era title */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black" style={{ color: style.dot }}>{active.year}</span>
                      <span className="text-sm font-bold uppercase tracking-wider" style={{ color: style.text }}>Era {active.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/18">{activeEra + 1} / 3</span>
                  </div>

                  {/* Big verb */}
                  <div className="p-4 rounded-xl border"
                    style={{ background: 'hsl(0 0% 0% / 0.25)', borderColor: 'hsl(0 0% 100% / 0.04)' }}>
                    <MessageSquare className="w-4 h-4 mb-2" style={{ color: style.text }} />
                    <p className="text-xl font-bold" style={{ color: style.text }}>{active.verb}</p>
                    <p className="text-white/45 text-sm mt-2 leading-relaxed">{active.desc}</p>
                  </div>

                  {/* Examples */}
                  <div>
                    <span className="text-[10px] text-white/25 font-bold uppercase tracking-wider">Ejemplos típicos</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {active.examples.map((ex, j) => (
                        <span key={j} className="px-3 py-1.5 rounded-lg text-xs border font-medium"
                          style={{ background: style.bg, borderColor: style.border, color: style.text }}>
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Autonomy bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/25 uppercase tracking-wider w-20 font-medium">Autonomía</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 100% / 0.04)' }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: style.dot }}
                        {...(isExporting
                          ? { style: { background: style.dot, width: `${active.autonomy}%` } }
                          : { initial: { width: 0 }, animate: { width: `${active.autonomy}%` }, transition: { delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        )} />
                    </div>
                    <span className="text-xs font-mono font-bold" style={{ color: style.text }}>{active.autonomy}%</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Insight */}
            <div className="p-4 rounded-xl relative overflow-hidden border"
              style={{
                background: 'linear-gradient(135deg, hsl(217 50% 45% / 0.04), hsl(263 50% 45% / 0.06))',
                borderColor: 'hsl(263 50% 50% / 0.15)',
              }}>
              <div className="relative flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'hsl(263 50% 50% / 0.08)', border: '1px solid hsl(263 50% 50% / 0.2)' }}>
                  <Lightbulb className="w-4 h-4" style={{ color: ERA_STYLES.violet.text }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(263 50% 75% / 0.8)' }}>{insight}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">REVOLUCIÓN AGÉNTICA</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '24 / 37'}</span>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
