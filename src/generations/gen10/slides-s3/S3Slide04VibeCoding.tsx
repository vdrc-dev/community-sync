import { motion } from 'framer-motion';
import { Wand2, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const EXAMPLES = [
  { prompt: '"Agencia boutique de San Francisco, un millón de dólares"', result: 'Glassmorphism + editorial', detail: 'Cinzel + backdrop-blur + floating cards', color: S3_ACCENT.violet },
  { prompt: '"Mi paleta corporativa #2B5EA7"', result: 'Colores en 3s', detail: 'Genera 5 tonos armónicos', color: S3_ACCENT.cyan },
  { prompt: '"Más minimalista, solo datos"', result: 'Foco en datos', detail: 'Elimina decoración, agranda KPIs', color: S3_ACCENT.amber },
];

export function S3Slide04VibeCoding() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Background — radial glows only */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_25%,_hsl(185_70%_50%_/_0.12),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(280_70%_60%_/_0.08),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_20%_65%,_hsl(38_80%_55%_/_0.05),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={185} secondaryHue={280} tertiaryHue={38} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
            <Wand2 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.cyan.text }}>Fundamentos Visuales</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...m(0.06)} className="text-4xl 2xl:text-5xl font-black text-white tracking-tight mb-1">
          Diseña con{' '}
          <span style={s3GradientText('hsl(185 70% 65%)', 'hsl(280 60% 65%)', 185)}>Palabras</span>
        </motion.h1>
        <motion.div
          className="h-[2px] rounded-full mx-auto max-w-[100px] origin-center relative overflow-hidden mb-1.5"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(185 70% 55% / 0.6), hsl(280 60% 60% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: S3_EASE }}
        >
          {!isExporting && (
            <motion.div
              className="absolute top-0 h-full w-6 rounded-full"
              style={{ background: 'hsl(185 85% 72%)', boxShadow: '0 0 10px hsl(185 85% 72% / 0.8)' }}
              animate={{ left: ['-10%', '110%'] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
            />
          )}
        </motion.div>
        <motion.p {...m(0.12)} className="text-white/50 text-sm mb-7 mx-auto">
          Un prompt transforma toda la estética de tu app
        </motion.p>

        {/* 3 prompt → result cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {EXAMPLES.map((ex, i) => (
            <motion.div
              key={i}
              {...m(0.18 + i * 0.08)}
              className="relative group rounded-2xl border overflow-hidden"
              style={{ borderColor: ex.color.border, background: ex.color.bg }}
              {...(isExporting ? {} : { whileHover: { scale: 1.03, y: -3 } })}
            >
              {/* Shimmer */}
              {!isExporting && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(105deg, transparent 35%, ${ex.color.text}12 50%, transparent 65%)` }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.6 }}
                />
              )}

              <div className="relative p-5 flex flex-col items-center gap-4">
                {/* Prompt */}
                <p className="text-sm font-mono leading-relaxed" style={{ color: ex.color.text }}>{ex.prompt}</p>

                {/* Divider */}
                <div className="w-8 h-px" style={{ background: `${ex.color.text}30` }} />

                {/* Result mockup */}
                <div className="w-full h-20 rounded-xl overflow-hidden border" style={{ borderColor: `${ex.color.text}15` }}>
                  <div className="h-full flex flex-col">
                    <div className="h-5 flex items-center px-2.5 gap-1" style={{ background: `${ex.color.text}08` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${ex.color.text}40` }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${ex.color.text}25` }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${ex.color.text}15` }} />
                    </div>
                    <div className="flex-1 flex items-end gap-1 px-2.5 pb-1.5">
                      {[60, 80, 45, 90, 70, 55, 85].map((h, j) => (
                        <motion.div
                          key={j}
                          className="flex-1 rounded-t"
                          style={{ height: `${h}%`, background: ex.color.text, opacity: 0.2 + (h / 100) * 0.4 }}
                          {...(isExporting ? {} : { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { delay: 0.4 + i * 0.1 + j * 0.03, duration: 0.4 } })}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Result label */}
                <div className="text-center">
                  <p className="text-xs text-white/55 font-semibold">{ex.result}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{ex.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pro tips */}
        <motion.div {...m(0.5)} className="max-w-2xl mx-auto grid grid-cols-2 gap-3 text-left mb-4">
          {[
            { tip: 'Sé específico con adjetivos', detail: '"Elegante y tech" > "bonito". Los modelos entienden estética.' },
            { tip: 'Pega tu HEX principal', detail: 'Dale tu color base y pide variaciones complementarias.' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.54 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]"
              {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.cyan.border } })}>
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tool links */}
        <motion.div {...m(0.62)} className="inline-flex items-center gap-2 text-xs text-white/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/50" />
          <span>
            <a href="https://coolors.co" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Coolors.co</a>
            {' '}para paletas ·{' '}
            <a href="https://fontjoy.com" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Fontjoy</a>
            {' '}para tipografías
          </span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" hue={185} contextHint="diseñar interfaces desde prompts" />
    </div>
  );
}
