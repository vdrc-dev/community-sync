import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { MessageCircle, Clock, ArrowRight, Lightbulb } from 'lucide-react';
import heroImg from '@/assets/gen10-s2/slide08-context-window.jpg';
import { S2_ACCENT } from './theme';
import { S2Shell, useS2Motion } from './shared';

/* ─── Colors: cyan/red for context degradation, amber for rule ─── */
const C = {
  cyan:  { ...S2_ACCENT.cyan, accent: S2_ACCENT.cyan.dot },
  red:   { ...S2_ACCENT.red, accent: S2_ACCENT.red.dot },
  amber: { ...S2_ACCENT.amber, accent: S2_ACCENT.amber.dot },
} as const;

type CKey = keyof typeof C;

/* ─── Scenarios — same structure as slide 7 STEPS ─── */
const SCENARIOS = [
  {
    num: 1, icon: MessageCircle, label: 'INICIO', colorKey: 'cyan' as CKey,
    title: 'Conversación corta',
    body: 'En los primeros minutos, la IA tiene toda su memoria disponible. Responde con precisión, cita fuentes y mantiene coherencia total.',
    demo: {
      question: '¿Cuál fue el PIB de Chile en 2025?',
      answer: '"El PIB de Chile en 2025 fue de $340 mil millones USD, con un crecimiento del 2.1% respecto al año anterior."',
      verdict: '✅ Datos precisos, verificables.',
    },
    fill: 12, quality: 98,
    takeaway: 'Memoria saludable — respuestas confiables',
    emoji: '🟢',
  },
  {
    num: 2, icon: Clock, label: 'DESPUÉS', colorKey: 'red' as CKey,
    title: 'Conversación de 3 horas',
    body: 'Después de 200+ mensajes, la IA ha llenado su ventana de contexto. Empieza a "olvidar" el inicio y genera información inventada con total confianza.',
    demo: {
      question: '(misma pregunta, 200 mensajes después)',
      answer: '"El PIB de Chile en 2025 fue de $890 mil millones USD, superando a Brasil como la mayor economía..."',
      verdict: '❌ Datos inventados con total confianza.',
    },
    fill: 92, quality: 34,
    takeaway: 'Zona de peligro — la IA inventa sin avisar',
    emoji: '🔴',
  },
];

/* ─── Context Memory Bar ─── */
function MemoryBar({ fill, isExporting }: { fill: number; isExporting: boolean }) {
  const blocks = 24;
  const filled = Math.round((fill / 100) * blocks);
  const dangerStart = Math.round(blocks * 0.7);

  return (
    <div className="flex gap-1 items-end h-[44px]">
      {Array.from({ length: blocks }).map((_, i) => {
        const isFilled = i < filled;
        const isDanger = isFilled && i >= dangerStart;
        const height = 16 + (isFilled ? (i / blocks) * 28 : 4);
        const hue = isDanger ? Math.max(0, 185 - (i - dangerStart) * 25) : 185;
        return (
          <motion.div key={i}
            initial={isExporting ? {} : { scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: isExporting ? 0 : 0.015 * i, duration: 0.25 }}
            className="flex-1 rounded-t-sm origin-bottom"
            style={{
              height: `${height}px`,
              background: isFilled
                ? `hsl(${hue} ${55 + i * 1.5}% ${45 + (i / blocks) * 12}% / ${0.35 + (i / blocks) * 0.5})`
                : 'hsl(0 0% 100% / 0.025)',
              border: `1px solid ${isFilled
                ? `hsl(${hue} ${55 + i * 1.5}% ${50 + (i / blocks) * 12}% / 0.45)`
                : 'hsl(0 0% 100% / 0.035)'}`,
            }}
          />
        );
      })}
    </div>
  );
}

export function S2Slide09ContextWindow() {
  const { isExporting } = useExportContext();
  const [active, setActive] = useState(0);

  const m = useS2Motion();

  const step = SCENARIOS[active];
  const sc = C[step.colorKey];

  return (
    <S2Shell
      footerLabel="MEMORIA Y LIMITACIONES"
      radials={
        <>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 50% at 40% 25%, ${C.cyan.glow}, transparent)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 40% at 70% 75%, ${C.red.glow}, transparent)` }} />
        </>
      }
    >
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-[20%] left-[40%] w-[600px] h-[500px] rounded-full blur-[200px]"
            style={{ background: S2_ACCENT.violet.glow }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[12%] right-[8%] w-[280px] h-[280px] rounded-full blur-[120px]"
            style={{ background: C.cyan.glow }}
            animate={{ y: [0, 18, 0], opacity: [0.14, 0.28, 0.14] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div className="relative z-10 flex flex-col h-full min-h-screen px-16 py-10 justify-between">

        {/* ━━━ TOP: Title + Image ━━━ */}
        <div className="flex items-center gap-10">
          <motion.div {...m(0.1)} className="flex-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-4"
              style={{ background: C.cyan.bg, borderColor: C.cyan.border, boxShadow: `0 4px 20px ${C.cyan.glow}` }}>
              <div className="w-1.5 h-5 rounded-full" style={{ background: `linear-gradient(to bottom, ${C.cyan.dot}, ${C.red.dot})` }} />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: C.cyan.text }}>Concepto Clave</span>
            </div>
            <h1 className="text-4xl 2xl:text-5xl font-black leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
              Ventana de{' '}
              <span style={{
                background: `linear-gradient(135deg, ${C.cyan.text}, ${C.red.text})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Contexto</span>
            </h1>
            <p className="text-base mt-3 leading-relaxed max-w-[520px] text-white/60">
              La IA tiene una «memoria» limitada — como la RAM de un computador. Si la conversación es muy larga, empieza a olvidar y a inventar.
            </p>
          </motion.div>

          <motion.div {...m(0.2)} className="flex-shrink-0 w-[380px] rounded-2xl overflow-hidden border shadow-xl"
            style={{ borderColor: 'rgba(255,255,255,0.1)', boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)` }}>
            <img src={heroImg} alt="Reloj de arena: contexto degradándose de cyan a rojo"
              className="w-full h-[160px] object-cover" />
          </motion.div>
        </div>

        {/* ━━━ PIPELINE BAR: 2 clickable scenarios ━━━ */}
        <motion.div {...m(0.25)} className="flex items-center gap-0 mt-6">
          {SCENARIOS.map((s, i) => {
            const isActive = active === i;
            const color = C[s.colorKey];
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center flex-1">
                <button onClick={() => setActive(i)}
                  className="flex-1 relative transition-all duration-300">
                  {isActive && !isExporting && (
                    <motion.div layoutId="ctx-pipe-glow"
                      className="absolute -inset-[1px] rounded-2xl"
                      style={{ background: color.glow, filter: 'blur(12px)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                  <div className="relative flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all"
                    style={{
                      background: isActive ? color.bg : 'rgba(255,255,255,0.02)',
                      borderColor: isActive ? color.border : 'rgba(255,255,255,0.07)',
                      boxShadow: isActive ? `0 4px 24px ${color.glow}` : 'none',
                    }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0 transition-all"
                      style={{
                        background: isActive ? color.bg : 'rgba(255,255,255,0.04)',
                        border: `2px solid ${isActive ? color.border : 'rgba(255,255,255,0.08)'}`,
                        color: isActive ? color.text : 'rgba(255,255,255,0.3)',
                        boxShadow: isActive ? `0 0 16px ${color.glow}` : 'none',
                      }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] transition-colors"
                        style={{ color: isActive ? color.text : 'hsl(0 0% 100% / 0.25)' }}>
                        {s.label}
                      </p>
                      <p className="text-sm font-bold transition-colors"
                        style={{ color: isActive ? 'hsl(0 0% 100% / 0.9)' : 'hsl(0 0% 100% / 0.4)' }}>
                        {s.title}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-3xl font-black tabular-nums" style={{ color: isActive ? color.text : 'hsl(0 0% 100% / 0.15)' }}>
                        {s.quality}%
                      </p>
                      <p className="text-[9px] font-bold" style={{ color: isActive ? 'hsl(0 0% 100% / 0.4)' : 'hsl(0 0% 100% / 0.12)' }}>calidad</p>
                    </div>
                  </div>
                </button>
                {i < 1 && (
                  <div className="px-2 flex-shrink-0">
                    <ArrowRight className="w-5 h-5" style={{ color: active > 0 ? C.red.accent : 'hsl(0 0% 100% / 0.12)' }} />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ━━━ MEMORY BAR ━━━ */}
        <motion.div {...m(0.3)} className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={isExporting ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoryBar fill={step.fill} isExporting={isExporting} />
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-2 text-[10px]">
            <span className="font-medium text-white/40">0 tokens</span>
            <span className="font-bold" style={{ color: sc.text }}>{step.takeaway}</span>
            <span className="font-medium text-white/40">2M tokens</span>
          </div>
        </motion.div>

        {/* ━━━ DETAIL PANEL ━━━ */}
        <div className="flex-1 mt-5 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={isExporting ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isExporting ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <div className="p-[1.5px] rounded-2xl h-full shadow-xl"
                style={{ background: `linear-gradient(145deg, ${sc.border}, rgba(255,255,255,0.04))`, boxShadow: `0 8px 40px ${sc.glow}` }}>
                <div className="p-8 rounded-[15px] relative overflow-hidden h-full flex gap-10"
                  style={{ background: 'rgba(8,6,14,0.96)' }}>

                  {/* Glow */}
                  <div className="absolute -top-24 -right-24 w-[250px] h-[250px] rounded-full blur-[100px] opacity-20"
                    style={{ background: sc.dot }} />

                  {/* Left: Explanation */}
                  <div className="flex-1 relative z-10 flex flex-col justify-center">
                    <div className="flex items-start gap-4 mb-6">
                      <span className="text-3xl flex-shrink-0 mt-0.5">{step.emoji}</span>
                      <p className="text-lg leading-relaxed font-medium" style={{ color: 'hsl(0 0% 100% / 0.85)' }}>
                        {step.body}
                      </p>
                    </div>

                    {/* Quality meter */}
                    <div className="mb-5">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'hsl(0 0% 100% / 0.3)' }}>Calidad de respuesta</span>
                        <span className="text-4xl font-black tabular-nums" style={{ color: sc.text }}>{step.quality}%</span>
                      </div>
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div key={step.quality}
                          initial={isExporting ? {} : { width: '0%' }}
                          animate={{ width: `${step.quality}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full rounded-full"
                          style={{ background: sc.dot, boxShadow: `0 0 14px ${sc.glow}` }}
                        />
                      </div>
                    </div>

                    {/* Golden rule */}
                    <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl w-fit"
                      style={{ background: C.amber.bg, border: `1.5px solid ${C.amber.border}`, boxShadow: `0 4px 16px ${C.amber.glow}` }}>
                      <Lightbulb className="w-4 h-4" style={{ color: C.amber.dot }} />
                      <span className="text-sm font-bold" style={{ color: C.amber.text }}>
                        Regla: +30 mensajes → conversación nueva
                      </span>
                    </div>
                  </div>

                  {/* Right: Q&A Demo */}
                  <div className="w-[420px] flex-shrink-0 relative z-10 flex flex-col justify-center">
                    <div className="p-6 rounded-xl border"
                      style={{ background: 'rgba(0,0,0,0.35)', borderColor: sc.border, boxShadow: `0 4px 24px ${sc.glow}` }}>

                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: sc.text }}>
                        {active === 0 ? 'Le preguntas al inicio:' : 'Misma pregunta, 200 msgs después:'}
                      </p>
                      <p className="text-sm font-mono mb-4 px-3 py-2.5 rounded-lg"
                        style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)' }}>
                        {step.demo.question}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-px flex-1" style={{ background: sc.border }} />
                        <ArrowRight className="w-4 h-4" style={{ color: sc.dot }} />
                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: sc.text }}>La IA responde</span>
                        <div className="h-px flex-1" style={{ background: sc.border }} />
                      </div>

                      <div className="p-4 rounded-xl border mb-3" style={{ background: sc.bg, borderColor: sc.border }}>
                        <p className="text-sm font-medium italic leading-relaxed" style={{ color: sc.text }}>
                          {step.demo.answer}
                        </p>
                      </div>

                      <p className="text-xs font-bold text-right" style={{ color: sc.text }}>
                        {step.demo.verdict}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ━━━ Insight ━━━ */}
        <motion.div {...m(0.5)} className="mt-4 flex justify-center">
          <p className="text-xs text-center px-4 py-2 rounded-xl max-w-2xl" style={{ background: C.red.bg, color: 'rgba(255,255,255,0.7)', border: `1px solid ${C.red.border}` }}>
            💡 La IA no te avisa cuando empieza a inventar. <strong style={{ color: C.red.text }}>Tú eres el control de calidad.</strong>
          </p>
        </motion.div>
      </div>
    </S2Shell>
  );
}
