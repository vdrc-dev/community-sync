import { motion } from 'framer-motion';
import { Repeat, Presentation, FileSpreadsheet, ArrowRight, ArrowDown, Clock, Sparkles, Mail, Zap, Terminal, Check } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText, S3_SERIF, s3SerifAnchor } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const CASES = [
  { title: 'Deck desde PDF', icon: Presentation, time: '~5 min', detail: '"Usa PDF Skill y arma un deck ejecutivo"', accent: S3_ACCENT.violet },
  { title: 'Modelo Excel', icon: FileSpreadsheet, time: '~3 min', detail: '"Con Excel Skill genera proyección a 12 meses"', accent: S3_ACCENT.emerald },
  { title: 'Tarea Recurrente', icon: Repeat, time: 'Auto', detail: '"Cada lunes resume los emails de la semana"', accent: S3_ACCENT.amber },
];

const FLOW_STEPS = [
  { label: 'Trigger', sub: 'Email / Calendario', icon: Mail, accent: S3_ACCENT.cyan },
  { label: 'Claude + Skills', sub: 'Procesa + Decide', icon: Zap, accent: S3_ACCENT.violet },
  { label: 'Output', sub: 'Doc / Email / Slack', icon: Presentation, accent: S3_ACCENT.emerald },
];

/* Terminal mock lines */
const TERMINAL_LINES = [
  { prefix: '$', text: 'claude --skill pdf-to-deck informe-Q1.pdf', accent: S3_ACCENT.cyan },
  { prefix: '→', text: 'Procesando 47 páginas...', accent: S3_ACCENT.violet },
  { prefix: '→', text: 'Extrayendo insights clave (5 encontrados)', accent: S3_ACCENT.violet },
  { prefix: '→', text: 'Generando deck ejecutivo...', accent: S3_ACCENT.violet },
  { prefix: '✓', text: 'deck-Q1-ejecutivo.pptx generado (12 slides)', accent: S3_ACCENT.emerald },
  { prefix: '⏱', text: 'Tiempo total: 4m 23s (vs ~2h manual)', accent: S3_ACCENT.amber },
];

export function S3Slide08Automatizacion() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(38_80%_55%_/_0.07),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_15%,_hsl(160_65%_45%_/_0.06),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={280} tertiaryHue={38} showAurora />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1680px] mx-auto w-full py-6">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-2" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Repeat className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Automatización</span>
          </div>
          {/* Editorial serif anchor */}
          <div className="absolute top-[-10%] right-[-4%] z-[0] pointer-events-none select-none">
            <span style={s3SerifAnchor('Au', 263, 0.02)}>Au</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-1">
            Del Manual al{' '}
            <span style={{ ...s3GradientText('hsl(263 70% 72%)', 'hsl(185 70% 60%)', 263), fontFamily: S3_SERIF, fontStyle: 'italic' }}>Automático</span>
          </h1>
          <motion.div
            className="h-[2px] rounded-full mx-auto mt-1.5 max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.7), hsl(185 70% 60% / 0.7), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
          />
        </motion.div>

        {/* Main layout: Flow + Terminal left, Use cases + ROI right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 mb-5">

          {/* LEFT: Flow + Terminal */}
          <div className="flex flex-col gap-4">
            {/* Flow diagram */}
            <motion.div {...me(0.08)} className="rounded-2xl border p-5 relative overflow-hidden"
              style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.015)' }}>
              <p className="text-[10px] text-white/35 uppercase tracking-[0.2em] font-bold mb-4">Flujo de Automatización</p>
              <div className="flex items-center justify-center gap-3">
                {FLOW_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <motion.div {...m(0.12 + i * 0.08)}
                        className="relative w-40 p-4 rounded-xl border flex flex-col items-center gap-2 overflow-hidden"
                        style={{ borderColor: step.accent.border, background: step.accent.bg }}
                        {...(isExporting ? {} : { whileHover: { scale: 1.05, y: -3 } })}>
                        <div className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{ background: `linear-gradient(90deg, transparent, ${step.accent.dot}, transparent)` }} />
                        {!isExporting && (
                          <motion.div className="absolute inset-0 pointer-events-none z-[1]"
                            style={{ background: `linear-gradient(105deg, transparent 35%, ${step.accent.text}10 50%, transparent 65%)` }}
                            animate={{ x: ['-150%', '250%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
                        )}
                        <div className="w-10 h-10 rounded-xl border flex items-center justify-center relative"
                          style={{ borderColor: `${step.accent.text}25`, background: `${step.accent.text}08` }}>
                          <Icon className="w-5 h-5" style={{ color: step.accent.text }} />
                        </div>
                        <div className="relative text-center">
                          <p className="text-sm font-black text-white">{step.label}</p>
                          <p className="text-[10px] text-white/40 mt-0.5">{step.sub}</p>
                        </div>
                      </motion.div>
                      {i < FLOW_STEPS.length - 1 && (
                        <div className="flex items-center gap-1">
                          {[0, 1, 2].map(dot => (
                            <motion.div key={dot} className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent.dot }}
                              {...(isExporting ? {} : { animate: { x: [0, 8, 16], opacity: [0, 1, 0] }, transition: { duration: 1.5, repeat: Infinity, delay: dot * 0.2 + i * 0.3 } })} />
                          ))}
                          <ArrowRight className="w-4 h-4 ml-1" style={{ color: `${step.accent.text}50` }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Terminal mockup */}
            <motion.div {...me(0.2)} className="rounded-2xl border overflow-hidden relative"
              style={{ borderColor: 'hsl(263 50% 50% / 0.2)', background: 'hsl(263 30% 6% / 0.7)' }}>
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <Terminal className="w-3.5 h-3.5 text-white/30 ml-2" />
                <span className="text-[10px] font-mono text-white/35">claude-desktop</span>
              </div>

              {/* Lines */}
              <div className="p-4 font-mono text-[11px] space-y-1.5">
                {TERMINAL_LINES.map((line, i) => (
                  <motion.div key={i}
                    className="flex items-start gap-2"
                    {...(isExporting ? {} : {
                      initial: { opacity: 0, x: -10 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.5 + i * 0.15, duration: 0.3 },
                    })}>
                    <span className="shrink-0 w-4 text-center" style={{ color: line.accent.text }}>{line.prefix}</span>
                    <span style={{ color: line.prefix === '$' ? S3_ACCENT.cyan.text : line.prefix === '✓' ? S3_ACCENT.emerald.text : 'hsl(0 0% 100% / 0.5)' }}>
                      {line.text}
                    </span>
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                {!isExporting && (
                  <motion.span
                    className="inline-block w-2 h-[14px] ml-6"
                    style={{ background: S3_ACCENT.violet.text }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Use cases + ROI */}
          <div className="flex flex-col gap-4">
            {/* Before → After ROI */}
            <motion.div {...me(0.15)} className="rounded-2xl border p-5 relative overflow-hidden"
              style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.015)' }}>
              <p className="text-[10px] text-white/35 uppercase tracking-[0.2em] font-bold mb-4">ROI por Tarea</p>
              <div className="flex items-center gap-4">
                {/* Before */}
                <div className="flex-1 text-center px-4 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] relative">
                  <p className="text-3xl font-black text-white/40 relative inline-block">
                    2h
                    {!isExporting && (
                      <motion.span
                        className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full"
                        style={{ background: 'hsl(0 60% 55% / 0.5)', transformOrigin: 'left' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.5, ease: S3_EASE }}
                      />
                    )}
                  </p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Manual</p>
                </div>

                <motion.div {...(isExporting ? {} : { animate: { x: [0, 6, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } })}>
                  <ArrowRight className="w-5 h-5" style={{ color: S3_ACCENT.violet.text }} />
                </motion.div>

                {/* After */}
                <div className="flex-1 text-center px-4 py-4 rounded-xl border relative overflow-hidden"
                  style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg, boxShadow: `0 0 30px ${S3_ACCENT.violet.glow}` }}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${S3_ACCENT.violet.text}08 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />
                  )}
                  <motion.p
                    className="text-3xl font-black relative"
                    style={{ color: S3_ACCENT.violet.text }}
                    {...(isExporting ? {} : { animate: { filter: ['drop-shadow(0 0 8px hsl(263 60% 55% / 0.3))', 'drop-shadow(0 0 18px hsl(263 60% 55% / 0.5))', 'drop-shadow(0 0 8px hsl(263 60% 55% / 0.3))'] }, transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } })}>
                    5m
                  </motion.p>
                  <p className="text-[10px] uppercase tracking-wider mt-1 relative" style={{ color: `${S3_ACCENT.violet.text}80` }}>con Claude</p>
                </div>
              </div>

              {/* Savings calculation */}
              <motion.div {...m(0.4)} className="mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: S3_ACCENT.emerald.bg, border: `1px solid ${S3_ACCENT.emerald.border}` }}>
                <Check className="w-3.5 h-3.5" style={{ color: S3_ACCENT.emerald.text }} />
                <span className="text-[10px] font-bold" style={{ color: S3_ACCENT.emerald.text }}>
                  Ahorro: ~1h 55m por ejecución · 5x/semana = <span className="font-black">9.5h/semana</span>
                </span>
              </motion.div>
            </motion.div>

            {/* 3 use-case cards */}
            <div className="space-y-2.5">
              {CASES.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div key={i} {...m(0.3 + i * 0.06)}
                    className="relative group rounded-xl border overflow-hidden flex items-center gap-3 px-4 py-3"
                    style={{ borderColor: c.accent.border, background: c.accent.bg }}
                    {...(isExporting ? {} : { whileHover: { scale: 1.02, x: 4 } })}>
                    {!isExporting && (
                      <motion.div className="absolute inset-0 pointer-events-none z-[1]"
                        style={{ background: `linear-gradient(105deg, transparent 35%, ${c.accent.glow} 50%, transparent 65%)` }}
                        animate={{ x: ['-150%', '250%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
                    )}
                    <div className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 relative"
                      style={{ borderColor: `${c.accent.text}20`, background: `${c.accent.text}08` }}>
                      <Icon className="w-4 h-4" style={{ color: c.accent.text }} />
                    </div>
                    <div className="flex-1 min-w-0 relative">
                      <p className="text-sm font-bold text-white">{c.title}</p>
                      <p className="text-[10px] text-white/40 font-mono italic">{c.detail}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0 relative"
                      style={{ borderColor: `${c.accent.text}15`, background: `${c.accent.text}06` }}>
                      <Clock className="w-3 h-3" style={{ color: c.accent.text }} />
                      <span className="text-[10px] font-bold" style={{ color: c.accent.text }}>{c.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <motion.div {...m(0.65)} className="text-center">
          <div className="inline-flex items-center gap-2 text-xs text-white/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
            <span>Las tareas recurrentes consumen <span className="text-amber-400/70 font-semibold">tokens diarios</span> al ejecutarse</span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="AUTOMATIZACIÓN" hue={263} contextHint="de tareas repetitivas a flujos automáticos" />
    </div>
  );
}
