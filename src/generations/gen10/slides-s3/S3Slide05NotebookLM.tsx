import { motion } from 'framer-motion';
import { BookOpen, FileAudio, FileText, Presentation, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import bgNotebookLM from '@/assets/gen10-s3/bg-notebooklm.jpg';

const INPUTS = ['PDFs', 'Slides', 'Texto', 'Audio'];

const OUTPUTS = [
  { label: 'Audio Overviews', detail: '2 voces · customizable', icon: FileAudio, color: S3_ACCENT.violet },
  { label: 'Resúmenes', detail: 'Con citas exactas de fuentes', icon: FileText, color: S3_ACCENT.cyan },
  { label: 'Guías de estudio', detail: 'Flashcards + FAQ + Quiz', icon: BookOpen, color: S3_ACCENT.amber },
  { label: 'Briefings', detail: 'Puntos clave ejecutivos', icon: Presentation, color: S3_ACCENT.rose },
];

const FLOATING_PILLS = [
  { label: 'audio', left: '12%', top: '36%', delay: 0 },
  { label: 'PDF', left: '84%', top: '32%', delay: 0.4 },
  { label: 'podcast', left: '80%', top: '66%', delay: 0.8 },
];

export function S3Slide05NotebookLM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Atmosphere */}
      <div className="absolute inset-0">
        <img src={bgNotebookLM} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.15]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,_hsl(185_70%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_60%,_hsl(263_60%_55%_/_0.08),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_transparent_35%,_hsl(185_70%_58%_/_0.07)_50%,_transparent_65%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={185} secondaryHue={263} tertiaryHue={330} />
      </div>

      {/* Floating pills */}
      {!isExporting && FLOATING_PILLS.map((pill) => (
        <motion.div
          key={pill.label}
          className="absolute z-0 px-3 py-1.5 rounded-full border text-[10px] font-mono font-bold pointer-events-none"
          style={{
            borderColor: 'hsl(185 70% 50% / 0.25)',
            background: 'hsl(185 70% 50% / 0.06)',
            color: 'hsl(185 70% 70% / 0.9)',
            left: pill.left,
            top: pill.top,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + pill.delay, repeat: Infinity, ease: 'easeInOut', delay: pill.delay }}
        >
          {pill.label}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <BookOpen className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Herramientas de Creación</span>
          </div>
        </motion.div>

        {/* Title with gradient text */}
        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          NotebookLM:{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, hsl(185 70% 65%), hsl(263 60% 70%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(185 70% 55% / 0.4))',
            }}
          >
            El Sintetizador
          </span>
        </motion.h1>
        {/* Accent line */}
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[120px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(185 70% 55% / 0.6), hsl(263 60% 60% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
        />
        <motion.p {...m(0.15)} className="text-white/35 text-lg mt-4 mb-14 max-w-md mx-auto">
          Dos superpoderes en una sola herramienta
        </motion.p>

        {/* Visual flow: INPUTS → ENGINE → OUTPUTS */}
        <div className="flex items-center justify-center gap-6">
          {/* Inputs column */}
          <motion.div {...m(0.2)} className="flex flex-col gap-2.5">
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-2">Sube</p>
            {INPUTS.map((input, i) => (
              <motion.div
                key={input}
                {...m(0.25 + i * 0.06)}
                className="relative px-5 py-3 rounded-xl border text-sm text-white/60 font-medium overflow-hidden"
                style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.04, x: 4 } })}
              >
                {!isExporting && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 65% / 0.1) 50%, transparent 65%)' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.3 }} />
                )}
                <span className="relative">{input}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Arrow */}
          <motion.div {...m(0.35)} className="flex flex-col items-center gap-3">
            <ArrowRight className="w-5 h-5 text-white/15" />
          </motion.div>

          {/* Central engine with orbital ring + shimmer */}
          <motion.div
            {...m(0.3)}
            className="relative w-44 h-44 rounded-3xl border flex flex-col items-center justify-center overflow-hidden"
            style={{ borderColor: 'hsl(185 70% 50% / 0.2)', background: 'hsl(185 70% 50% / 0.04)' }}
          >
            {/* Orbital ring */}
            {!isExporting && (
              <motion.div
                className="absolute -inset-3 rounded-[28px] border border-dashed pointer-events-none"
                style={{ borderColor: 'hsl(185 70% 55% / 0.18)' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
            )}
            {/* Pulsing glow */}
            {!isExporting && (
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'hsl(185 70% 50% / 0.06)' }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}
            {/* Shimmer sweep */}
            {!isExporting && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 65% / 0.12) 50%, transparent 65%)' }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
              />
            )}
            <div className="relative">
              <BookOpen className="w-10 h-10 mb-3" style={{ color: S3_ACCENT.cyan.text }} />
              <p className="text-sm font-black text-white">NotebookLM</p>
              <p className="text-[10px] text-white/30 mt-1">Chat + Citas</p>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div {...m(0.4)} className="flex flex-col items-center gap-3">
            <ArrowRight className="w-5 h-5 text-white/15" />
          </motion.div>

          {/* Outputs column */}
          <motion.div {...m(0.35)} className="flex flex-col gap-2.5">
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-2">Genera</p>
            {OUTPUTS.map((output, i) => {
              const Icon = output.icon;
              return (
                <motion.div
                  key={output.label}
                  {...m(0.4 + i * 0.06)}
                  className="relative flex items-center gap-3 px-5 py-3 rounded-xl border overflow-hidden group"
                  style={{ borderColor: output.color.border, background: output.color.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.04, x: -4 } })}
                >
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${output.color.text}15 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.4 }} />
                  )}
                  <Icon className="w-4 h-4 relative" style={{ color: output.color.text }} />
                  <div className="text-left relative">
                    <span className="text-sm text-white/60 font-medium block">{output.label}</span>
                    <span className="text-[9px] text-white/25">{output.detail}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Pro tips + limitation */}
        <motion.div {...m(0.55)} className="mt-8 max-w-2xl mx-auto grid grid-cols-3 gap-3 text-left">
          {[
            { tip: '📚 50 fuentes (Free)', detail: 'Hasta 300 en Pro · 100 notebooks gratis' },
            { tip: '🎙️ 3 audio overviews/día', detail: 'Personaliza: "Enfócate en X" antes de generar' },
            { tip: '🆓 Incluido en Google', detail: 'Free con cuenta Google · Plus con AI Premium' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.58 + i * 0.04)} className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/25 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <S3Footer sectionLabel="HERRAMIENTAS" hue={263} />
    </div>
  );
}
