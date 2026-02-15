import { motion } from 'framer-motion';
import { BookOpen, FileAudio, FileText, Presentation, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const INPUTS = ['PDFs', 'Slides', 'Texto', 'Audio'];

const OUTPUTS = [
  { label: 'Podcasts', icon: FileAudio, color: S3_ACCENT.violet },
  { label: 'Resúmenes', icon: FileText, color: S3_ACCENT.cyan },
  { label: 'Guías', icon: BookOpen, color: S3_ACCENT.amber },
  { label: 'Presentaciones', icon: Presentation, color: S3_ACCENT.rose },
];

export function S3Slide05NotebookLM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,_hsl(185_70%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_60%,_hsl(263_60%_55%_/_0.08),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={185} secondaryHue={263} tertiaryHue={330} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
            <BookOpen className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.cyan.text }}>Comunicación Visual</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          NotebookLM: <span style={{ color: S3_ACCENT.cyan.text }}>El Sintetizador</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-16 max-w-md mx-auto">
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
                className="px-5 py-3 rounded-xl border text-sm text-white/60 font-medium"
                style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}
              >
                {input}
              </motion.div>
            ))}
          </motion.div>

          {/* Arrow */}
          <motion.div {...m(0.35)} className="flex flex-col items-center gap-3">
            <ArrowRight className="w-5 h-5 text-white/15" />
          </motion.div>

          {/* Central engine */}
          <motion.div
            {...m(0.3)}
            className="relative w-44 h-44 rounded-3xl border flex flex-col items-center justify-center"
            style={{ borderColor: 'hsl(185 70% 50% / 0.2)', background: 'hsl(185 70% 50% / 0.04)' }}
          >
            {/* Pulsing glow */}
            {!isExporting && (
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{ background: 'hsl(185 70% 50% / 0.06)' }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
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
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border"
                  style={{ borderColor: output.color.border, background: output.color.bg }}
                >
                  <Icon className="w-4 h-4" style={{ color: output.color.text }} />
                  <span className="text-sm text-white/60 font-medium">{output.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Limitation note - minimal */}
        <motion.p {...m(0.6)} className="mt-12 text-[11px] text-white/20">
          No procesa CSV/Excel — para datos usa <span className="text-white/35 font-semibold">Canvas</span>
        </motion.p>
      </div>

      <S3Footer sectionLabel="COMUNICACIÓN VISUAL" hue={185} />
    </div>
  );
}
