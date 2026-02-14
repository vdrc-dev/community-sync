import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { AlertCircle, CheckCircle2, Lightbulb, Crosshair, ArrowRight, Bot } from 'lucide-react';
import { S2_ACCENT, S2_THEME } from './theme';

const ACCENT = { red: S2_ACCENT.red, emerald: S2_ACCENT.emerald, violet: S2_ACCENT.violet, amber: S2_ACCENT.amber };

/* AI response simulation */
const AI_RESPONSES = {
  vague: {
    thinking: ['Asumiendo industria genérica…', 'Sin audiencia definida…', 'Formato: ¿email? ¿doc? ¿slides?'],
    response: 'El marketing digital es importante para su negocio. Considere usar redes sociales, SEO y email marketing. Establezca objetivos claros y mida resultados...',
    verdict: 'Genérico. Aplica a cualquier negocio del mundo.',
  },
  specific: {
    thinking: ['Industria: Fintech B2B ✓', 'Audiencia: CTOs bancos regionales ✓', 'Budget: $5K/mes ✓', 'Formato: plan 90 días ✓'],
    response: 'Semana 1-4: LinkedIn Ads segmentados a CTOs sector bancario LATAM ($2K). Semana 5-8: Webinar "Open Banking para Bancos Regionales" con case study. Semana 9-12: Outreach personalizado vía Apollo.io ($500/mes)...',
    verdict: 'Hiperespecífico. Solo funciona para TU negocio.',
  },
};

export function S2Slide12Ambiguity() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const content = useSlideContent(11);
  const [activeView, setActiveView] = useState<'vague' | 'specific'>('vague');

  const contrast = (content.contrast as {
    vague: { label: string; example: string; result: string };
    specific: { label: string; example: string; result: string };
  }) || {
    vague: { label: 'TU PRIMER INTENTO (VAGO)', example: 'Escribe un correo de ventas', result: 'Texto genérico. La IA promedia todo.' },
    specific: { label: 'LA CORRECCIÓN (ESPECÍFICO)', example: 'Correo de ventas para gerentes TI sobre ciberseguridad, tono urgente, 150 palabras', result: 'Texto afilado. Las restricciones enfocan.' },
  };
  const insight = (content.insight as string) || 'La IA necesita límites claros para liberar su potencial';
  const proTip = (content.proTip as string) || 'Pídele a la IA que redacte sus propias instrucciones (Metaprompt)';

  const isVague = activeView === 'vague';
  const activeData = isVague ? contrast.vague : contrast.specific;
  const activeAccent = isVague ? ACCENT.red : ACCENT.emerald;
  const aiData = AI_RESPONSES[activeView];

  const m = (delay: number, overrides?: object) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      ...overrides,
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex items-center font-sans selection:bg-violet-500/30"
      style={{ background: S2_THEME.background }}>

      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(0_60%_40%_/_0.12),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(160_55%_45%_/_0.1),_transparent_65%)]" />
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
        {!isExporting && (
          <>
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              key={activeView}
              initial={{ opacity: 0 }} animate={{ opacity: 0.4, scale: [1, 1.1, 1] }}
              transition={{ opacity: { duration: 0.4 }, scale: { duration: 8, repeat: Infinity } }}
              style={{ background: `radial-gradient(circle, ${activeAccent.glow}, transparent 70%)` }} />
            <motion.div
              className="absolute top-[15%] right-[15%] w-[320px] h-[320px] rounded-full blur-[140px]"
              style={{ background: 'hsl(263 60% 45% / 0.09)' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.09, 0.18, 0.09] }}
              transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div {...m(0)} className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-red-400 to-emerald-400" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">El Problema Central</span>
            </div>
            <h1 className="text-4xl 2xl:text-5xl font-black tracking-tight text-white leading-[1.05]">
              Ambigüedad vs.{' '}
              <span style={{
                background: 'linear-gradient(135deg, hsl(0 65% 60%), hsl(160 60% 55%))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Especificidad</span>
            </h1>
            <p className="text-base text-white/55 mt-3 leading-relaxed max-w-[600px]">
              La calidad de la respuesta depende 100% de qué tan específico seas.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div {...m(0.1)} className="flex gap-2 mb-6 w-fit">
            {(['vague', 'specific'] as const).map((view) => {
              const isSelected = activeView === view;
              const s = view === 'vague' ? ACCENT.red : ACCENT.emerald;
              const Icon = view === 'vague' ? AlertCircle : CheckCircle2;
              const label = view === 'vague' ? '😵 Vago' : '🎯 Específico';
              return (
                <button key={view} onClick={() => setActiveView(view)}
                  className="relative flex items-center gap-2.5 px-6 py-3 rounded-xl border transition-all duration-300"
                  style={{
                    background: isSelected ? s.bg : 'hsl(0 0% 100% / 0.02)',
                    borderColor: isSelected ? s.border : 'hsl(0 0% 100% / 0.06)',
                  }}>
                  {isSelected && !isExporting && (
                    <motion.div layoutId="ambiguity-toggle" className="absolute inset-0 rounded-xl"
                      style={{ background: s.glow, filter: 'blur(8px)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  <Icon className="w-4 h-4 relative z-10" style={{ color: isSelected ? s.text : 'hsl(0 0% 100% / 0.25)' }} />
                  <span className="text-sm font-bold relative z-10" style={{ color: isSelected ? s.text : 'hsl(0 0% 100% / 0.3)' }}>
                    {label}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Main: 2 columns */}
          <div className="grid grid-cols-[1fr_1.1fr] gap-8 items-start">
            {/* LEFT: Prompt + Result */}
            <AnimatePresence mode="wait">
              <motion.div key={activeView}
                initial={isExporting ? {} : { opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={isExporting ? {} : { opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}>

                {/* Prompt */}
                <div className="p-5 rounded-2xl border mb-4"
                  style={{ background: activeAccent.bg, borderColor: activeAccent.border }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Crosshair className="w-3.5 h-3.5" style={{ color: activeAccent.text }} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: activeAccent.text }}>
                      {activeData.label}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-xl font-mono text-sm leading-relaxed"
                    style={{ background: 'hsl(0 0% 0% / 0.4)', border: `1px solid ${activeAccent.border}`, color: 'hsl(0 0% 100% / 0.55)' }}>
                    "{activeData.example}"
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: activeAccent.text }} />
                    <span className="text-sm" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>{activeData.result}</span>
                  </div>
                  {/* Quality bar */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="h-1.5 flex-1 rounded-full" style={{ background: 'hsl(0 0% 100% / 0.04)' }}>
                      <motion.div className="h-full rounded-full" style={{ background: activeAccent.dot }}
                        {...(isExporting
                          ? { style: { background: activeAccent.dot, width: isVague ? '20%' : '92%' } }
                          : { key: activeView, initial: { width: '0%' }, animate: { width: isVague ? '20%' : '92%' },
                              transition: { delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }, style: { background: activeAccent.dot } }
                        )} />
                    </div>
                    <span className="text-[10px] font-bold tabular-nums" style={{ color: activeAccent.text }}>
                      {isVague ? '20%' : '92%'}
                    </span>
                  </div>
                </div>

                {/* Pro Tip + Insight */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="px-4 py-3 rounded-xl border"
                    style={{ background: ACCENT.violet.bg, borderColor: 'hsl(263 60% 55% / 0.15)' }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5" style={{ color: ACCENT.violet.text }} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: ACCENT.violet.text }}>Insight</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>{insight}</p>
                  </div>
                  <div className="px-4 py-3 rounded-xl border"
                    style={{ background: ACCENT.amber.bg, borderColor: ACCENT.amber.border }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5" style={{ color: ACCENT.amber.text }} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: ACCENT.amber.text }}>Pro Tip</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>{proTip}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* RIGHT: AI Response Simulation */}
            <AnimatePresence mode="wait">
              <motion.div key={`ai-${activeView}`}
                initial={isExporting ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={isExporting ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border overflow-hidden"
                style={{ background: 'hsl(0 0% 4% / 0.9)', borderColor: 'hsl(0 0% 100% / 0.06)' }}>

                {/* AI thinking header */}
                <div className="px-5 py-3 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-violet-400/60" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Cerebro de la IA</span>
                    <span className="text-[9px] ml-auto px-2 py-0.5 rounded-full" style={{ background: activeAccent.bg, color: activeAccent.text }}>
                      {isVague ? 'Adivinando…' : 'Datos claros ✓'}
                    </span>
                  </div>
                </div>

                {/* Thinking steps */}
                <div className="px-5 py-3 space-y-1.5 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.04)' }}>
                  {aiData.thinking.map((step, i) => (
                    <motion.div key={i}
                      {...(isExporting ? {} : {
                        initial: { opacity: 0, x: -10 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.1 + i * 0.12, duration: 0.3 },
                      })}
                      className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: activeAccent.dot }} />
                      <span className="text-xs font-mono" style={{ color: isVague ? 'hsl(0 0% 100% / 0.3)' : 'hsl(160 65% 60%)' }}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* AI Response */}
                <div className="px-5 py-4">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-2 block">Respuesta generada</span>
                  <p className="text-sm leading-relaxed" style={{ color: isVague ? 'hsl(0 0% 100% / 0.35)' : 'hsl(160 65% 60% / 0.9)' }}>
                    {aiData.response}
                  </p>
                </div>

                {/* Verdict */}
                <div className="px-5 py-3 border-t" style={{ borderColor: 'hsl(0 0% 100% / 0.04)', background: activeAccent.bg }}>
                  <p className="text-xs font-bold" style={{ color: activeAccent.text }}>
                    → {aiData.verdict}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom */}
      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">AMBIGÜEDAD VS ESPECIFICIDAD</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '19 / 37'}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
