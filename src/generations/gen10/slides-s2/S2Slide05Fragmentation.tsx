import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { Code2, Brain, Search, Zap, Sparkles, Crown, Puzzle, ArrowRight } from 'lucide-react';
import { S2_ACCENT } from './theme';
import { S2Shell, useS2Motion } from './shared';

/* ── Accent palette ── */
const ACCENT = { violet: S2_ACCENT.violet, pink: S2_ACCENT.pink, cyan: S2_ACCENT.cyan, amber: S2_ACCENT.amber };

type AccentKey = keyof typeof ACCENT;

const SPEC_META: Record<string, { icon: React.ElementType; label: string }> = {
  violet: { icon: Code2, label: 'Código' },
  pink:   { icon: Brain, label: 'Razonamiento' },
  cyan:   { icon: Search, label: 'Investigación' },
  amber:  { icon: Zap, label: 'Agentes' },
};

/* ── Particles ── */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: `${8 + Math.random() * 84}%`,
  y: `${8 + Math.random() * 84}%`,
  size: 1 + Math.random() * 1.5,
  hue: [263, 330, 185, 38][i % 4],
  dur: 7 + Math.random() * 6,
  delay: Math.random() * 4,
  travel: 10 + Math.random() * 18,
}));

export function S2Slide05Fragmentation() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(5);
  const [activeSpec, setActiveSpec] = useState(0);

  const title = (content.title as string) || 'Fragmentación del Monopolio';
  const subtitle = (content.subtitle as string) || 'Ya no hay una sola herramienta — cada tarea tiene su campeón';

  const specializations = (content.specializations as Array<{ task: string; model: string; color: string; desc?: string; price?: string }>) || [
    {
      task: 'Programación',
      model: 'Claude Code',
      color: 'violet',
      desc: 'La IA instalada en la raíz de tu computador. Integra herramientas, prueba en el navegador con Playwright y corrige en loop continuo.',
      price: 'Claude Pro $20/mes',
    },
    {
      task: 'Razonamiento',
      model: 'GPT-5.2 Thinking',
      color: 'pink',
      desc: 'Cadena de pensamiento (chain of thought) para resolver problemas complejos. Se pregunta y responde a sí mismo antes de darte la respuesta final.',
      price: 'ChatGPT Plus $20/mes',
    },
    {
      task: 'Investigación',
      model: 'ChatGPT + Gemini Deep Research',
      color: 'cyan',
      desc: 'ChatGPT Deep Research navega internet recopilando fuentes. Gemini 3.0 Deep Research maneja el mayor volumen de contexto. Notebook LM sintetiza hasta 100 docs.',
      price: 'ChatGPT Plus + Gemini Advanced',
    },
    {
      task: 'Agentes Autónomos',
      model: 'Manus + Claude Code',
      color: 'amber',
      desc: 'Manus navega la web y automatiza tareas recurrentes. Claude Code opera en tu computador: integra herramientas, prueba y corrige en loop continuo.',
      price: 'manus.im + Claude Pro',
    },
  ];

  const m = useS2Motion();

  const activeData = specializations[activeSpec];
  const activeAccent = activeData ? ACCENT[activeData.color as AccentKey] || ACCENT.violet : ACCENT.violet;

  return (
    <S2Shell
      footerLabel="FRAGMENTACIÓN"
      className="flex items-center"
      radials={<>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 15%, hsl(263 50% 40% / 0.12), transparent 60%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 85% 80%, hsl(330 55% 40% / 0.06), transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 30% at 60% 50%, hsl(185 60% 35% / 0.04), transparent 50%)' }} />
      </>}
    >

      {/* ── Breathing orbs ── */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute w-[600px] h-[450px] rounded-full blur-[200px]"
            style={{ top: '0%', left: '10%', background: 'hsl(263 55% 45% / 0.08)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.18, 0.06] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[350px] rounded-full blur-[180px]"
            style={{ bottom: '5%', right: '10%' }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.14, 0.04], background: [activeAccent.glow, activeAccent.glow] }}
            transition={{ scale: { duration: 8, repeat: Infinity }, opacity: { duration: 8, repeat: Infinity } }}
          />
        </>
      )}

      {/* ── Particles ── */}
      {!isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map(p => (
            <motion.div key={p.id} className="absolute rounded-full"
              style={{ left: p.x, top: p.y, width: p.size, height: p.size,
                background: `hsl(${p.hue} 55% 60% / 0.3)`,
                boxShadow: `0 0 ${p.size * 3}px hsl(${p.hue} 55% 60% / 0.35)`,
              }}
              animate={{ y: [0, -p.travel, 0], opacity: [0.05, 0.35, 0.05] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            />
          ))}
        </div>
      )}

      {/* ── Light sweep ── */}
      {!isExporting && (
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, hsl(263 60% 55% / 0.025) 48%, hsl(330 55% 50% / 0.015) 52%, transparent 60%)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 9 }}
        />
      )}

      {/* ════════════════════════════════════════════ */}
      {/* ── CONTENT ──────────────────────────────── */}
      {/* ════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-16 2xl:px-20">

        {/* ── Header ── */}
        <div className="mb-10">
          {/* Section pill */}
          <motion.div {...m(0)} className="mb-5">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border backdrop-blur-sm"
              style={{ background: ACCENT.violet.bg, borderColor: ACCENT.violet.border }}>
              <Puzzle className="w-3.5 h-3.5" style={{ color: ACCENT.violet.text }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT.violet.text }}>
                Ecosistema Febrero 2026
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div {...m(0.08)}>
            <h1 className="text-4xl 2xl:text-5xl font-black tracking-tight leading-[1]">
              <span className="text-white/95">{title.split(' ').slice(0, -1).join(' ')}{' '}</span>
              <span style={{
                background: 'linear-gradient(135deg, hsl(263 65% 72%), hsl(330 60% 68%))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{title.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-base text-white/40 mt-2 font-light">{subtitle}</p>
            <motion.div className="h-[2px] rounded-full mt-4"
              style={{ background: `linear-gradient(90deg, ${ACCENT.violet.dot}, ${ACCENT.pink.dot}, ${ACCENT.cyan.dot}, transparent)` }}
              initial={isExporting ? {} : { width: 0 }}
              animate={{ width: '140px' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </div>

        {/* ── Section divider ── */}
        <motion.div {...m(0.2)} className="flex items-center gap-4 mb-7">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${ACCENT.violet.border}, transparent)` }} />
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border"
            style={{ background: 'hsl(263 60% 55% / 0.04)', borderColor: 'hsl(263 60% 55% / 0.12)' }}>
            <Crown className="w-3 h-3" style={{ color: ACCENT.violet.text }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
              ¿Quién Lidera Cada Tarea?
            </span>
          </div>
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT.pink.border})` }} />
        </motion.div>

        {/* ── Specialization cards ── */}
        <motion.div {...m(0.25)} className="grid grid-cols-4 gap-5">
          {specializations.map((spec, i) => {
            const c = spec.color as AccentKey;
            const s = ACCENT[c] || ACCENT.violet;
            const meta = SPEC_META[c] || SPEC_META.violet;
            const Icon = meta.icon;
            const isActive = activeSpec === i;

            return (
              <motion.button
                key={i}
                onClick={() => setActiveSpec(i)}
                onHoverStart={() => setActiveSpec(i)}
                className="text-left relative group"
                whileHover={isExporting ? {} : { y: -5 }}
                transition={{ duration: 0.25 }}
              >
                {/* Hover glow */}
                {!isExporting && isActive && (
                  <motion.div
                    layoutId="spec-glow"
                    className="absolute -inset-2 rounded-3xl blur-2xl"
                    style={{ background: s.glow }}
                    transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  />
                )}

                <div className="relative rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{
                    background: isActive ? s.bg : 'hsl(0 0% 100% / 0.012)',
                    borderColor: isActive ? s.border : 'hsl(0 0% 100% / 0.04)',
                    boxShadow: isActive
                      ? `0 8px 32px ${s.glow}, inset 0 1px 0 hsl(0 0% 100% / 0.04)`
                      : 'inset 0 1px 0 hsl(0 0% 100% / 0.02)',
                  }}>

                  {/* Active top bar */}
                  <div className="h-[2px] transition-all duration-300"
                    style={{
                      background: isActive ? `linear-gradient(90deg, transparent 5%, ${s.dot} 50%, transparent 95%)` : 'transparent',
                      boxShadow: isActive ? `0 0 12px ${s.glow}` : 'none',
                    }} />

                  <div className="p-5">
                    {/* Icon */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isActive ? `${s.dot}15` : 'hsl(0 0% 100% / 0.02)',
                          border: `1.5px solid ${isActive ? s.border : 'hsl(0 0% 100% / 0.05)'}`,
                          boxShadow: isActive ? `0 0 20px ${s.glow}` : 'none',
                        }}>
                        <Icon className="w-5.5 h-5.5 transition-colors" style={{ color: isActive ? s.text : 'hsl(0 0% 100% / 0.18)' }} />
                      </div>
                      <ArrowRight className="w-4 h-4 mt-2 transition-all duration-300"
                        style={{ color: isActive ? s.text : 'transparent', transform: isActive ? 'translateX(2px)' : 'none' }} />
                    </div>

                    {/* Task */}
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5 transition-colors"
                      style={{ color: isActive ? s.text : 'hsl(0 0% 100% / 0.25)' }}>
                      {spec.task}
                    </p>

                    {/* Model name */}
                    <p className="text-lg font-black tracking-tight leading-tight transition-colors"
                      style={{ color: isActive ? 'hsl(0 0% 95%)' : 'hsl(0 0% 100% / 0.45)' }}>
                      {spec.model}
                    </p>

                    {/* Description — animated */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={isExporting ? {} : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={isExporting ? {} : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-[12px] leading-relaxed mt-3 text-white/60">
                            {spec.desc}
                          </p>

                          {/* Price tag */}
                          {spec.price && (
                            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                              style={{ background: `${s.dot}08`, border: `1px solid ${s.border}` }}>
                              <Sparkles className="w-3 h-3" style={{ color: s.text }} />
                              <span className="text-[9px] font-bold tracking-wide" style={{ color: s.text }}>
                                {spec.price}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Takeaway ── */}
        <motion.div {...m(0.45)} className="mt-8 flex items-center gap-5">
          <div className="w-[3px] h-7 rounded-full flex-shrink-0"
            style={{ background: `linear-gradient(to bottom, ${ACCENT.violet.dot}, ${ACCENT.pink.dot})` }} />
          <p className="text-[13px] font-light italic leading-relaxed text-white/55">
            "ChatGPT es tu copiloto diario. Notebook LM para investigar a fondo. Claude es tu asistente de trabajo: Excel, PowerPoint y código."
          </p>
          <div className="ml-auto flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full border"
            style={{ background: 'hsl(263 60% 55% / 0.04)', borderColor: 'hsl(263 60% 55% / 0.1)' }}>
            <Sparkles className="w-3 h-3" style={{ color: ACCENT.violet.text }} />
            <span className="text-[9px] font-semibold text-white/35">La elección depende de la tarea</span>
          </div>
        </motion.div>
      </div>

    </S2Shell>
  );
}
