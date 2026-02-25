import { motion } from 'framer-motion';
import { BookOpen, FileAudio, FileText, Presentation, ArrowRight, Type, Headphones } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
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
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  const cyanHsl = 'hsl(185 70% 50%)';
  const serif = 'Georgia, "Times New Roman", serif';

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,_hsl(185_70%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_60%,_hsl(263_60%_55%_/_0.08),_transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-transparent to-[#04030a]/70" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={185} secondaryHue={263} tertiaryHue={330} showAurora />
      </div>

      <div className="relative z-10 max-w-[1680px] mx-auto w-full">

        {/* ── EDITORIAL MASTHEAD ── */}
        <div className="grid grid-cols-12 gap-6 mb-5">
          <motion.div {...me(0)} className="col-span-3 flex flex-col justify-end">
            <p className="text-[9px] tracking-[0.35em] uppercase font-semibold" style={{ color: 'hsl(185 70% 50% / 0.5)' }}>HERRAMIENTAS</p>
            <p style={{
              fontSize: '120px',
              fontWeight: 400,
              color: cyanHsl,
              lineHeight: '0.8',
              fontFamily: serif,
              letterSpacing: '-6px',
              filter: 'drop-shadow(0 0 35px hsl(185 70% 50% / 0.3))',
            }}>NB</p>
          </motion.div>

          <motion.div {...me(0.06)} className="col-span-9 flex flex-col justify-end">
            <h1 style={{ fontSize: '46px', fontWeight: 400, color: 'white', fontFamily: serif, lineHeight: 1.05, letterSpacing: '-1px' }}>
              NotebookLM:{' '}
              <span style={{ fontWeight: 700, fontStyle: 'italic' }}>El Sintetizador</span>
            </h1>
            <motion.div
              className="h-[3px] rounded-full max-w-[180px] mt-3 origin-left"
              style={{ background: `linear-gradient(90deg, ${cyanHsl}, transparent)` }}
              initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: S3_EASE }}
            />
          </motion.div>
        </div>

        {/* ── PULL QUOTE ── */}
        <motion.div {...m(0.1)} className="mb-6">
          <div className="flex">
            <div className="w-[3px] rounded-full shrink-0" style={{ background: cyanHsl }} />
            <p className="pl-5 text-lg leading-relaxed" style={{ fontFamily: serif, fontStyle: 'italic', color: 'hsl(0 0% 90%)' }}>
              "Tu asistente de investigación que <span style={{ color: cyanHsl, fontStyle: 'normal', fontWeight: 700 }}>lee, resume y habla.</span>"
            </p>
          </div>
        </motion.div>

        {/* ── MAIN FLOW: INPUTS → ENGINE → OUTPUTS ── */}
        <div className="grid grid-cols-12 gap-4 mb-5">

          {/* Inputs */}
          <motion.div {...m(0.15)} className="col-span-2 flex flex-col gap-2">
            <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1" style={{ color: cyanHsl }}>SUBE</p>
            {INPUTS.map((input, i) => {
              const Icon = input.icon;
              return (
                <motion.div key={i} {...m(0.2 + i * 0.04)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg border relative overflow-hidden"
                  style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.04, x: 3 } })}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 65% / 0.08) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.3 }} />
                  )}
                  <Icon className="w-3.5 h-3.5 relative" style={{ color: S3_ACCENT.cyan.text }} />
                  <span className="text-xs text-white/60 font-medium relative">{input.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Arrow */}
          <motion.div {...m(0.3)} className="col-span-1 flex items-center justify-center"
            {...(isExporting ? {} : { animate: { x: [0, 5, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } })}>
            <ArrowRight className="w-5 h-5 text-white/25" />
          </motion.div>

          {/* Central engine — reference image */}
          <motion.div {...me(0.25)} className="col-span-4 relative rounded-2xl border overflow-hidden"
            style={{ borderColor: 'hsl(185 70% 50% / 0.2)', background: 'hsl(185 70% 50% / 0.04)' }}>
            {!isExporting && (
              <motion.div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 65% / 0.1) 50%, transparent 65%)', width: '45%' }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />
            )}
            <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(185 70% 50% / 0.1)' }}>
              <BookOpen className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
              <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/60 font-bold hover:text-white transition-colors">NotebookLM</a>
            </div>
            <OptimizedImage src={toolNotebookLM} alt="NotebookLM" className="w-full" style={{ maxHeight: '200px' }} />
          </motion.div>

          {/* Arrow */}
          <motion.div {...m(0.35)} className="col-span-1 flex items-center justify-center"
            {...(isExporting ? {} : { animate: { x: [0, 5, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 } })}>
            <ArrowRight className="w-5 h-5 text-white/25" />
          </motion.div>

          {/* Outputs */}
          <motion.div {...m(0.3)} className="col-span-4 flex flex-col gap-2">
            <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1" style={{ color: S3_ACCENT.violet.text }}>GENERA</p>
            {OUTPUTS.map((output, i) => {
              const Icon = output.icon;
              return (
                <motion.div key={i} {...m(0.35 + i * 0.04)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border relative overflow-hidden group"
                  style={{ borderColor: output.color.border, background: output.color.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.04, x: -3 } })}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${output.color.text}10 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.4 }} />
                  )}
                  <Icon className="w-4 h-4 relative shrink-0" style={{ color: output.color.text }} />
                  <div className="text-left relative">
                    <span className="text-xs text-white/65 font-semibold block leading-tight">{output.label}</span>
                    <span className="text-[10px] text-white/35">{output.detail}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── METRICS STRIP (editorial big numbers) ── */}
        <motion.div {...m(0.5)} className="rounded-xl overflow-hidden mb-4" style={{ background: 'hsl(0 0% 7%)' }}>
          <div className="flex">
            {[
              { num: '50', label: 'Fuentes por notebook' },
              { num: '100', label: 'Notebooks gratis' },
              { num: '∞', label: 'Audio overviews/día' },
            ].map((metric, i) => (
              <div key={i} className="flex-1 text-center py-5" style={{ borderRight: i < 2 ? '1px solid hsl(0 0% 100% / 0.06)' : 'none' }}>
                <motion.p
                  style={{
                    fontSize: metric.num === '∞' ? '48px' : '40px',
                    fontWeight: 400,
                    color: cyanHsl,
                    fontFamily: serif,
                    letterSpacing: '-2px',
                    lineHeight: 1,
                  }}
                  {...(isExporting ? {} : {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.6 + i * 0.08, duration: 0.5, ease: S3_EASE },
                  })}
                >{metric.num}</motion.p>
                <p className="text-[8px] tracking-[0.15em] uppercase text-white/30 font-semibold mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── TL;DR INVERTED BLOCK ── */}
        <motion.div {...me(0.6)} className="rounded-xl overflow-hidden" style={{ background: cyanHsl }}>
          <div className="px-6 py-4">
            <p className="text-[9px] tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>EN 30 SEGUNDOS</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                'Sube PDFs, slides o audio — resume con citas exactas de cada fuente',
                'Genera Audio Overviews: 2 voces discutiendo tu contenido, customizable',
                'Exporta resúmenes como input para Skills de PDF/PPTX en Claude',
              ].map((item, i) => (
                <p key={i} className="text-xs leading-relaxed text-white" style={{ fontFamily: serif }}>{item}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="HERRAMIENTAS" hue={185} contextHint="investigación con NotebookLM" />
    </div>
  );
}
