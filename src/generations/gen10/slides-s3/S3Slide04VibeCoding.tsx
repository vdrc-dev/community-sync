import { motion } from 'framer-motion';
import { Wand2, Sparkles, ArrowRight, Code2, Palette, Type, Layout } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText, S3_SERIF, s3SerifAnchor } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PROMPTS = [
  {
    prompt: '"Agencia boutique SF, $1M feel"',
    style: 'Glassmorphism + Editorial',
    accent: S3_ACCENT.violet,
    mockup: {
      colors: ['hsl(263 60% 55%)', 'hsl(263 40% 30%)', 'hsl(0 0% 95%)'],
      layout: 'cards',
    },
  },
  {
    prompt: '"Mi paleta #2B5EA7, tech"',
    style: 'Branded + Minimal',
    accent: S3_ACCENT.cyan,
    mockup: {
      colors: ['#2B5EA7', '#79A7D3', '#F3B562', '#2A2E35', '#F5F7FA'],
      layout: 'palette',
    },
  },
  {
    prompt: '"Solo datos, sin decoración"',
    style: 'Data-first Dashboard',
    accent: S3_ACCENT.amber,
    mockup: {
      colors: ['hsl(38 85% 55%)', 'hsl(38 60% 40%)', 'hsl(38 90% 70%)'],
      layout: 'chart',
    },
  },
];

export function S3Slide04VibeCoding() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_25%,_hsl(185_70%_50%_/_0.12),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(280_70%_60%_/_0.08),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_20%_65%,_hsl(38_80%_55%_/_0.05),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={185} secondaryHue={280} tertiaryHue={38} showAurora />
      </div>

      {/* Editorial serif anchor */}
      <div className="absolute top-[-3%] right-[-2%] z-[1]">
        <span style={s3SerifAnchor('VC', 185, 0.025)}>VC</span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Top: header row */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 mb-8">
          {/* Left: title area */}
          <div className="flex-1 min-w-0 text-left">
            <motion.div {...m(0)} className="mb-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
                <Wand2 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.cyan.text }}>Vibe Coding</span>
              </div>
            </motion.div>

            <motion.h1 {...me(0.06)} className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1 leading-[1.05]">
              Diseña con{' '}
              <span style={{ ...s3GradientText('hsl(185 70% 65%)', 'hsl(280 60% 65%)', 185), fontFamily: S3_SERIF, fontStyle: 'italic' }}>Palabras</span>
            </motion.h1>
            <motion.div
              className="h-[2px] rounded-full max-w-[100px] origin-left mb-3"
              style={{ background: 'linear-gradient(90deg, hsl(185 70% 55% / 0.7), hsl(280 60% 60% / 0.5), transparent)' }}
              initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.8, ease: S3_EASE }}
            />

            {/* Editorial pull-quote */}
            <motion.div {...m(0.12)} className="mb-5 pl-4 border-l-[3px]" style={{ borderColor: S3_ACCENT.cyan.dot }}>
              <p className="text-white/55 text-sm max-w-sm" style={{ fontFamily: S3_SERIF, fontStyle: 'italic' }}>
                "Un prompt transforma toda la estética — colores, tipografía, layout, interacciones."
              </p>
            </motion.div>

            {/* Quick stats — serif metrics */}
            <motion.div {...m(0.18)} className="inline-flex items-center gap-6">
              {[
                { num: '3', label: 'prompts' },
                { num: '3', label: 'estéticas' },
                { num: '<1', label: 'minuto' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-start">
                  <span style={{ fontFamily: S3_SERIF, fontSize: '24px', fontWeight: 900, fontStyle: 'italic', color: S3_ACCENT.cyan.text, lineHeight: 1 }}>{s.num}</span>
                  <span className="text-[8px] text-white/35 uppercase tracking-[0.2em] font-bold mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero visual */}
          <motion.div {...me(0.15)} className="relative flex-shrink-0 w-full lg:w-[48%] max-w-[520px] hidden sm:block">
            <div className="absolute -inset-12 rounded-full blur-[120px] opacity-40"
              style={{ background: 'radial-gradient(circle, hsl(185 60% 50% / 0.3), transparent 70%)' }} />

            <div className="relative p-[1.5px] rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(145deg, hsl(185 70% 60% / 0.4), hsl(280 50% 50% / 0.2))' }}>
              <div className="rounded-[calc(1rem-1.5px)] overflow-hidden relative"
                style={{ background: 'hsl(220 20% 6%)', boxShadow: '0 40px 100px hsl(185 50% 25% / 0.35)' }}>

                {/* Shimmer */}
                {!isExporting && (
                  <motion.div className="absolute inset-0 z-20 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 72% / 0.08) 50%, transparent 65%)', width: '45%' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'linear' }} />
                )}

                {/* Browser chrome */}
                <div className="relative px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(185 60% 50% / 0.1)' }}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono ml-2">lovable.dev — prompt</span>
                </div>

                {/* Prompt input area */}
                <div className="px-4 py-3 border-b" style={{ borderColor: 'hsl(185 40% 50% / 0.08)' }}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ borderColor: 'hsl(185 60% 50% / 0.15)', background: 'hsl(185 60% 50% / 0.04)' }}>
                    <Wand2 className="w-3 h-3 shrink-0" style={{ color: S3_ACCENT.cyan.text }} />
                    <motion.span
                      className="text-[11px] font-mono"
                      style={{ color: S3_ACCENT.cyan.text }}
                      {...(isExporting ? {} : {
                        initial: { opacity: 0 },
                        animate: { opacity: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1] },
                        transition: { duration: 12, repeat: Infinity, times: [0, 0.05, 0.3, 0.33, 0.36, 0.39, 0.65, 0.68, 0.71, 0.74] },
                      })}
                    >
                      "Hazlo premium, glassmorphism oscuro"
                    </motion.span>
                  </div>
                </div>

                {/* Generated UI mockup */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div className="w-5 h-5 rounded-md"
                        style={{ background: 'hsl(185 70% 55%)' }}
                        {...(isExporting ? {} : { animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 3, repeat: Infinity } })} />
                      <div className="h-1.5 w-12 rounded-full bg-white/15" />
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map(n => (
                        <div key={n} className="h-1.5 w-8 rounded-full bg-white/10" />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl p-4 border" style={{
                    borderColor: 'hsl(185 60% 50% / 0.12)',
                    background: 'linear-gradient(135deg, hsl(185 40% 15% / 0.5), hsl(263 30% 12% / 0.3))',
                  }}>
                    <div className="h-2 w-24 rounded-full mb-2" style={{ background: 'hsl(185 70% 65% / 0.6)' }} />
                    <div className="h-1.5 w-36 rounded-full mb-3 bg-white/15" />
                    <div className="flex gap-2">
                      <motion.div className="h-6 w-16 rounded-md"
                        style={{ background: 'linear-gradient(135deg, hsl(185 70% 55%), hsl(263 60% 55%))' }}
                        {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity } })} />
                      <div className="h-6 w-16 rounded-md border border-white/15" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 hidden sm:grid">
                    {[S3_ACCENT.violet, S3_ACCENT.cyan, S3_ACCENT.amber].map((a, i) => (
                      <motion.div key={i} className="rounded-lg p-2.5 border"
                        style={{ borderColor: `${a.text}15`, background: `${a.text}06` }}
                        {...(isExporting ? {} : {
                          initial: { opacity: 0, y: 10 },
                          animate: { opacity: 1, y: 0 },
                          transition: { delay: 0.8 + i * 0.15, duration: 0.5, ease: S3_EASE },
                        })}>
                        <div className="w-4 h-4 rounded-md mb-1.5" style={{ background: `${a.text}25` }} />
                        <div className="h-1 w-full rounded-full mb-1" style={{ background: `${a.text}30` }} />
                        <div className="h-1 w-2/3 rounded-full" style={{ background: `${a.text}18` }} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 prompt → result cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {PROMPTS.map((ex, i) => (
            <motion.div
              key={i}
              {...m(0.3 + i * 0.08)}
              className="relative group rounded-2xl border overflow-hidden"
              style={{ borderColor: ex.accent.border, background: ex.accent.bg }}
              {...(isExporting ? {} : { whileHover: { scale: 1.03, y: -3 } })}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${ex.accent.dot}, transparent)` }} />
              {!isExporting && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[1]"
                  style={{ background: `linear-gradient(105deg, transparent 35%, ${ex.accent.glow} 50%, transparent 65%)` }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }}
                />
              )}
              <div className="relative p-4 flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${ex.accent.text}15`, border: `1px solid ${ex.accent.text}25` }}>
                    <Code2 className="w-3 h-3" style={{ color: ex.accent.text }} />
                  </div>
                  <p className="text-[11px] font-mono leading-relaxed" style={{ color: ex.accent.text }}>{ex.prompt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px" style={{ background: `${ex.accent.text}20` }} />
                  <ArrowRight className="w-3 h-3" style={{ color: `${ex.accent.text}60` }} />
                  <div className="flex-1 h-px" style={{ background: `${ex.accent.text}20` }} />
                </div>
                <div className="rounded-lg border overflow-hidden h-14" style={{ borderColor: `${ex.accent.text}15` }}>
                  {ex.mockup.layout === 'cards' && (
                    <div className="h-full flex gap-1 p-1.5">
                      {[0, 1, 2].map(c => (
                        <div key={c} className="flex-1 rounded-md" style={{
                          background: `linear-gradient(135deg, ${ex.accent.text}${c === 0 ? '22' : '10'}, ${ex.accent.text}06)`,
                          border: `1px solid ${ex.accent.text}12`,
                        }} />
                      ))}
                    </div>
                  )}
                  {ex.mockup.layout === 'palette' && (
                    <div className="h-full flex items-center justify-center gap-1.5 px-3">
                      {ex.mockup.colors.map((c, j) => (
                        <motion.div key={j} className="w-6 h-6 rounded-md border border-white/10"
                          style={{ background: c }}
                          {...(isExporting ? {} : {
                            initial: { scale: 0 },
                            animate: { scale: 1 },
                            transition: { delay: 0.6 + j * 0.08, type: 'spring', stiffness: 300 },
                          })} />
                      ))}
                    </div>
                  )}
                  {ex.mockup.layout === 'chart' && (
                    <div className="h-full flex items-end gap-1 px-3 pb-1.5">
                      {[35, 55, 70, 48, 78, 60].map((h, j) => (
                        <motion.div key={j} className="flex-1 rounded-t"
                          style={{ height: `${h}%`, background: ex.accent.text, opacity: 0.2 + (h / 100) * 0.5 }}
                          {...(isExporting ? {} : { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { delay: 0.5 + j * 0.05, duration: 0.4 } })} />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-black tracking-wider text-center" style={{ color: `${ex.accent.text}90` }}>{ex.style}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tips */}
        <motion.div {...m(0.55)} className="flex items-center justify-center gap-4 flex-wrap">
          {[
            { tip: 'Sé específico con adjetivos', icon: Type },
            { tip: 'Pega tu HEX principal', icon: Palette },
            { tip: 'Itera en <1 minuto', icon: Layout },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <t.icon className="w-3 h-3" style={{ color: S3_ACCENT.cyan.text }} />
              <span className="text-[10px] text-white/50 font-medium">{t.tip}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ borderColor: 'hsl(38 85% 55% / 0.2)', background: 'hsl(38 85% 55% / 0.05)' }}>
            <Sparkles className="w-3 h-3 text-amber-400/60" />
            <span className="text-[10px] text-white/45">
              <a href="https://coolors.co" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Coolors</a>
              {' · '}
              <a href="https://fontjoy.com" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Fontjoy</a>
            </span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" hue={185} contextHint="diseñar interfaces desde prompts" />
    </div>
  );
}
