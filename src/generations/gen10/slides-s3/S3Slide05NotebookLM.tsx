import { motion } from 'framer-motion';
import { BookOpen, FileAudio, FileText, Presentation, ArrowRight, Type, Headphones } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import toolNotebookLM from '@/assets/slides/tool-notebooklm-mockup.jpg';

const INPUTS = [
  { label: 'PDFs', icon: FileText },
  { label: 'Slides', icon: Presentation },
  { label: 'Texto', icon: Type },
  { label: 'Audio', icon: Headphones },
];

const OUTPUTS = [
  { label: 'Audio Overviews', detail: '2 voces · customizable', icon: FileAudio, color: S3_ACCENT.violet },
  { label: 'Resúmenes', detail: 'Con citas exactas de fuentes', icon: FileText, color: S3_ACCENT.cyan },
  { label: 'Guías de estudio', detail: 'Flashcards + FAQ + Quiz', icon: BookOpen, color: S3_ACCENT.amber },
  { label: 'Briefings', detail: 'Puntos clave ejecutivos', icon: Presentation, color: S3_ACCENT.rose },
];

export function S3Slide05NotebookLM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Atmosphere — radial gradients only, no background image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,_hsl(185_70%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_60%,_hsl(263_60%_55%_/_0.08),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_20%,_hsl(185_70%_58%_/_0.06),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-transparent to-[#04030a]/70" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={185} secondaryHue={263} tertiaryHue={330} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <BookOpen className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Herramientas de Creación</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...m(0.05)} className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
          NotebookLM:{' '}
          <span style={s3GradientText('hsl(185 70% 65%)', 'hsl(263 60% 70%)', 185)}>
            El Sintetizador
          </span>
        </motion.h1>

        {/* Accent line */}
        <motion.div
          className="h-[2px] rounded-full mx-auto max-w-[100px] origin-center relative overflow-hidden"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(185 70% 55% / 0.6), hsl(263 60% 60% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
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
        <motion.p {...m(0.1)} className="text-white/50 text-sm mt-2 mb-8 mx-auto">
          Tu asistente de investigación que lee, resume y habla
        </motion.p>

        {/* Visual flow: INPUTS → ENGINE → OUTPUTS */}
        <div className="flex items-center justify-center gap-5">
          {/* Inputs column */}
          <motion.div {...m(0.15)} className="flex flex-col gap-2">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Sube</p>
            {INPUTS.map((input, i) => {
              const InputIcon = input.icon;
              return (
              <motion.div
                key={input.label}
                {...m(0.2 + i * 0.05)}
                className="relative px-5 py-2.5 rounded-xl border text-sm text-white/65 font-medium overflow-hidden flex items-center gap-2.5"
                style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.04, x: 4 } })}
              >
                {!isExporting && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 65% / 0.08) 50%, transparent 65%)' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.3 }} />
                )}
                <InputIcon className="w-3.5 h-3.5 relative" style={{ color: S3_ACCENT.cyan.text }} />
                <span className="relative">{input.label}</span>
              </motion.div>
            )})}
          </motion.div>

          {/* Arrow */}
          <motion.div
            {...m(0.3)}
            {...(isExporting ? {} : { animate: { x: [0, 5, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } })}
          >
            <ArrowRight className="w-5 h-5 text-white/35" />
          </motion.div>

          {/* Central engine — reference image */}
          <motion.div
            {...m(0.25)}
            className="relative w-64 rounded-2xl border overflow-hidden"
            style={{ borderColor: 'hsl(185 70% 50% / 0.2)', background: 'hsl(185 70% 50% / 0.04)' }}
          >
            {!isExporting && (
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 65% / 0.1) 50%, transparent 65%)', width: '45%' }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
              />
            )}
            <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(185 70% 50% / 0.1)' }}>
              <BookOpen className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
              <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/60 font-bold hover:text-white transition-colors">NotebookLM</a>
            </div>
            <img src={toolNotebookLM} alt="NotebookLM" className="w-full h-auto object-cover" style={{ maxHeight: '180px' }} />
          </motion.div>

          {/* Arrow */}
          <motion.div
            {...m(0.35)}
            {...(isExporting ? {} : { animate: { x: [0, 5, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 } })}
          >
            <ArrowRight className="w-5 h-5 text-white/35" />
          </motion.div>

          {/* Outputs column */}
          <motion.div {...m(0.3)} className="flex flex-col gap-2">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Genera</p>
            {OUTPUTS.map((output, i) => {
              const Icon = output.icon;
              return (
                <motion.div
                  key={output.label}
                  {...m(0.35 + i * 0.05)}
                  className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl border overflow-hidden group"
                  style={{ borderColor: output.color.border, background: output.color.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.04, x: -4 } })}
                >
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${output.color.text}10 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.4 }} />
                  )}
                  <Icon className="w-4 h-4 relative flex-shrink-0" style={{ color: output.color.text }} />
                  <div className="text-left relative">
                    <span className="text-sm text-white/65 font-medium block leading-tight">{output.label}</span>
                    <span className="text-[10px] text-white/40">{output.detail}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Pro tips */}
        <motion.div {...m(0.5)} className="mt-6 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { tip: '50 fuentes (Free)', detail: 'Hasta 300 en Pro · 100 notebooks gratis' },
            { tip: 'Varios audio overviews/día', detail: 'Personaliza: "Enfócate en X" antes de generar' },
            { tip: 'Puente a Skills', detail: 'Exporta resumen y úsalo como input para PDF/PPTX Skill' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.53 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <S3Footer sectionLabel="HERRAMIENTAS" hue={263} contextHint="investigación con NotebookLM" />
    </div>
  );
}
