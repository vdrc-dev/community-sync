import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { Lightbulb, MessageSquare, Zap, ArrowRight, Star } from 'lucide-react';
import { S2_ACCENT } from './theme';
import { S2Shell, useS2Motion } from './shared';

/* ── 3 Prompt Levels ── */
const LEVELS = [
  {
    level: 1,
    label: 'Novato',
    prompt: '"Hazme un resumen de esto"',
    result: 'Texto genérico, sin formato, demasiado largo, sin foco.',
    quality: 25,
    color: 'red' as const,
    tip: 'No hay contexto, no hay restricciones',
  },
  {
    level: 2,
    label: 'Aprendiz',
    prompt: '"Resume en 5 puntos clave para un CEO, máximo 200 palabras"',
    result: 'Estructura clara, pero le falta el contexto de industria y tono.',
    quality: 68,
    color: 'amber' as const,
    tip: 'Tiene formato y restricciones, pero le falta ROL y CONTEXTO',
  },
  {
    level: 3,
    label: 'Experto',
    prompt: '"Eres un consultor McKinsey. Resume este reporte trimestral para el CEO de una fintech B2B en Chile. 5 bullets, tono ejecutivo, incluye métricas clave, máx 200 palabras."',
    result: 'Resumen hiperespecífico con métricas, tono perfecto y accionable.',
    quality: 96,
    color: 'emerald' as const,
    tip: 'ROL + CONTEXTO + OUTPUT + PARÁMETROS = C.R.O.P. completo',
  },
];

const ACCENT = { red: S2_ACCENT.red, amber: S2_ACCENT.amber, emerald: S2_ACCENT.emerald, violet: S2_ACCENT.violet };

const LEVEL_ICONS = [MessageSquare, Star, Zap];

export function S2Slide11Prompt() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(10);
  const [activeLevel, setActiveLevel] = useState(0);

  const analogy = (content.analogy as string) || 'La Regla del Pasante Brillante';
  const goldenRule = (content.goldenRule as string) || 'Instrucción vaga = trabajo mediocre. Instrucción detallada = trabajo brillante.';

  const m = useS2Motion();

  const current = LEVELS[activeLevel];
  const accent = ACCENT[current.color];

  return (
    <S2Shell
      footerLabel="FUNDAMENTOS DEL PROMPT"
      className="flex items-center"
      radials={
        <>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 100% 60% at 50% -20%, ${S2_ACCENT.violet.glow}, transparent 65%)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 110%, ${S2_ACCENT.emerald.glow}, transparent 65%)` }} />
        </>
      }
    >
      {!isExporting && (
        <>
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            key={activeLevel}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: [1, 1.08, 1] }}
            transition={{ opacity: { duration: 0.4 }, scale: { duration: 6, repeat: Infinity } }}
            style={{ background: `radial-gradient(circle, ${accent.glow}, transparent 70%)` }} />
          <motion.div
            className="absolute top-[18%] right-[12%] w-[350px] h-[350px] rounded-full blur-[140px]"
            style={{ background: S2_ACCENT.emerald.glow }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div {...m(0)} className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-4"
              style={{ background: S2_ACCENT.violet.bg, borderColor: S2_ACCENT.violet.border, boxShadow: `0 4px 20px ${S2_ACCENT.violet.glow}` }}>
              <div className="w-1.5 h-5 rounded-full" style={{ background: `linear-gradient(to bottom, ${S2_ACCENT.violet.dot}, ${S2_ACCENT.amber.dot})` }} />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: S2_ACCENT.violet.text }}>Fundamento</span>
            </div>
            <h1 className="text-4xl 2xl:text-5xl font-black tracking-tight text-white leading-[1.05] drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
              ¿Qué es un <span style={{
                background: `linear-gradient(135deg, ${S2_ACCENT.violet.text}, ${S2_ACCENT.amber.text}, ${S2_ACCENT.emerald.text})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Prompt</span>?
            </h1>
            <p className="text-base mt-3 leading-relaxed text-white/60 max-w-[600px]">
              {analogy}
            </p>
          </motion.div>

          <div className="grid grid-cols-[1fr_1.2fr] gap-10 items-start">
            {/* LEFT: Level selector + Golden Rule */}
            <div>
              {/* 3-level selector */}
              <motion.div {...m(0.15)} className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1.5 h-5 rounded-full" style={{ background: `linear-gradient(to bottom, ${ACCENT.red.dot}, ${ACCENT.amber.dot}, ${ACCENT.emerald.dot})` }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Evolución del Prompt</p>
                </div>
                {LEVELS.map((lv, i) => {
                  const isActive = activeLevel === i;
                  const s = ACCENT[lv.color];
                  const Icon = LEVEL_ICONS[i];
                  return (
                    <motion.button key={i} onClick={() => setActiveLevel(i)}
                      className="w-full text-left group relative"
                      whileHover={isExporting ? {} : { x: 4 }} transition={{ duration: 0.2 }}>
                      {isActive && !isExporting && (
                        <motion.div layoutId="prompt-level-glow" className="absolute -inset-px rounded-2xl"
                          style={{ background: s.glow, filter: 'blur(10px)' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                      )}
                      <div className="relative flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition-all duration-300"
                        style={{
                          background: isActive ? s.bg : 'rgba(255,255,255,0.02)',
                          borderColor: isActive ? s.border : 'rgba(255,255,255,0.07)',
                          boxShadow: isActive ? `0 4px 24px ${s.glow}` : 'none',
                        }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                          style={{
                            background: isActive ? s.bg : 'rgba(255,255,255,0.04)',
                            border: `1.5px solid ${isActive ? s.border : 'rgba(255,255,255,0.08)'}`,
                          }}>
                          <Icon className="w-5 h-5" style={{ color: isActive ? s.text : 'rgba(255,255,255,0.35)' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono" style={{ color: isActive ? s.text : 'rgba(255,255,255,0.25)' }}>
                              Nivel {lv.level}
                            </span>
                            <span className="font-bold text-sm" style={{ color: isActive ? s.text : 'rgba(255,255,255,0.5)' }}>
                              {lv.label}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg"
                          style={{ background: isActive ? s.bg : 'transparent', color: isActive ? s.text : 'rgba(255,255,255,0.2)' }}>
                          {lv.quality}%
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Golden Rule Card */}
              <motion.div {...m(0.4)}>
                <div className="relative">
                  {!isExporting && (
                    <motion.div
                      className="absolute -inset-[3px] rounded-[22px]"
                      style={{ background: `linear-gradient(145deg, ${ACCENT.violet.glow}, ${ACCENT.amber.glow})`, filter: 'blur(12px)' }}
                      animate={{ opacity: [0.3, 0.55, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <div className="relative p-[2px] rounded-[20px] shadow-xl"
                    style={{ background: `linear-gradient(145deg, ${ACCENT.violet.border}, ${ACCENT.amber.border}, rgba(255,255,255,0.06))`, boxShadow: `0 8px 32px ${ACCENT.violet.glow}` }}>
                    <div className="p-5 rounded-[19px] relative overflow-hidden" style={{ background: 'rgba(8,6,14,0.96)' }}>
                      <div className="absolute -top-12 -right-12 w-[160px] h-[160px] rounded-full blur-[70px] opacity-30"
                        style={{ background: ACCENT.violet.dot }} />
                      <div className="flex items-center gap-3 mb-3 relative z-10">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: ACCENT.amber.bg, border: `2px solid ${ACCENT.amber.border}`, boxShadow: `0 0 20px ${ACCENT.amber.glow}` }}>
                          <Lightbulb className="w-5 h-5" style={{ color: ACCENT.amber.text }} />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT.amber.text }}>La Regla de Oro</p>
                      </div>
                      <p className="text-base font-bold leading-relaxed relative z-10 italic" style={{ color: ACCENT.violet.text }}>
                        "{goldenRule}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Active level detail */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div key={activeLevel}
                  initial={isExporting ? {} : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isExporting ? {} : { opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}>

                  {/* Prompt panel */}
                  <div className="p-6 rounded-2xl border relative overflow-hidden"
                    style={{ background: accent.bg, borderColor: accent.border, boxShadow: `0 4px 28px ${accent.glow}` }}>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent.dot, boxShadow: `0 0 10px ${accent.glow}` }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accent.text }}>
                        Nivel {current.level} — {current.label}
                      </span>
                    </div>

                    {/* Prompt text */}
                    <div className="p-4 rounded-xl mb-4 font-mono text-sm leading-relaxed"
                      style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${accent.border}`, color: 'rgba(255,255,255,0.75)' }}>
                      {current.prompt}
                    </div>

                    {/* Result */}
                    <div className="flex items-start gap-2.5 mb-4">
                      <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent.text }} />
                      <p className="text-sm leading-relaxed text-white/65">{current.result}</p>
                    </div>

                    {/* Quality bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider w-14 text-white/40">Calidad</span>
                      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: accent.dot, boxShadow: `0 0 12px ${accent.glow}` }}
                          {...(isExporting
                            ? { style: { background: accent.dot, width: `${current.quality}%` } }
                            : {
                              key: `bar-${activeLevel}`,
                              initial: { width: '0%' },
                              animate: { width: `${current.quality}%` },
                              transition: { delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                              style: { background: accent.dot, boxShadow: `0 0 12px ${accent.glow}` },
                            })}
                        />
                      </div>
                      <span className="text-sm font-bold font-mono tabular-nums" style={{ color: accent.text }}>{current.quality}%</span>
                    </div>
                  </div>

                  {/* What's different */}
                  <div className="mt-4 p-4 rounded-xl border"
                    style={{ background: ACCENT.violet.bg, borderColor: ACCENT.violet.border, boxShadow: `0 4px 20px ${ACCENT.violet.glow}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-3.5 h-3.5" style={{ color: ACCENT.violet.text }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: ACCENT.violet.text }}>
                        ¿Qué le falta?
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">
                      {current.tip}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </S2Shell>
  );
}
