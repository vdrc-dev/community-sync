import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, FileAudio, FileText, Presentation, ArrowDown, Sparkles } from 'lucide-react';
import bgNotebook from '@/assets/gen10-s3/bg-notebooklm.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const BLOCK1_FEATURES = [
  { text: 'Chat referenciado con tus documentos', icon: MessageSquare },
  { text: 'Respuestas con citas exactas', icon: FileText },
  { text: 'Procesa PDFs, slides, texto e imágenes', icon: BookOpen },
];

const BLOCK2_OUTPUTS = [
  { text: 'Podcasts de audio', icon: FileAudio, color: 'hsl(280 70% 60%)' },
  { text: 'Resúmenes ejecutivos', icon: FileText, color: 'hsl(185 70% 50%)' },
  { text: 'Guías de estudio', icon: BookOpen, color: 'hsl(38 90% 55%)' },
  { text: 'Presentaciones', icon: Presentation, color: 'hsl(330 70% 60%)' },
];

export function S3Slide05NotebookLM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgNotebook} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/50 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={185} secondaryHue={263} tertiaryHue={330} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3"
            style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.cyan.text }}>
              Comunicación Visual
            </span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            NotebookLM: <span style={{ color: S3_ACCENT.cyan.text }}>El Sintetizador</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Dos superpoderes en una sola herramienta</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 relative">
          {/* Block 1: Synthesis */}
          <motion.div
            {...m(0.15)}
            {...(isExporting ? {} : { whileHover: { scale: 1.01 } })}
            className="p-6 rounded-2xl border"
            style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: S3_ACCENT.cyan.bg, borderColor: S3_ACCENT.cyan.border, borderWidth: 1 }}
              >
                <span className="text-lg font-black" style={{ color: S3_ACCENT.cyan.text }}>1</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: S3_ACCENT.cyan.text }}>Bloque 1</p>
                <p className="text-lg font-bold text-white">Sintetizador de Información</p>
              </div>
            </div>
            <div className="space-y-3">
              {BLOCK1_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    {...m(0.25 + i * 0.08)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.04] bg-white/[0.02]"
                  >
                    <Icon className="w-4 h-4 shrink-0" style={{ color: S3_ACCENT.cyan.text }} />
                    <span className="text-sm text-white/60">{f.text}</span>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold mb-1">Limitación</p>
              <p className="text-xs text-white/40">No procesa CSV ni Excel para análisis de datos. Para eso, usa Canvas.</p>
            </div>
          </motion.div>

          {/* Connection flow */}
          {!isExporting && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1">
              <motion.div
                className="w-6 h-6 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-3 h-3 text-white/30" />
              </motion.div>
            </div>
          )}

          {/* Block 2: Deliverables */}
          <motion.div
            {...m(0.2)}
            {...(isExporting ? {} : { whileHover: { scale: 1.01 } })}
            className="p-6 rounded-2xl border"
            style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: S3_ACCENT.violet.bg, borderColor: S3_ACCENT.violet.border, borderWidth: 1 }}>
                <span className="text-lg font-black" style={{ color: S3_ACCENT.violet.text }}>2</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: `${S3_ACCENT.violet.text}99` }}>Bloque 2</p>
                <p className="text-lg font-bold text-white">Generador de Entregables</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BLOCK2_OUTPUTS.map((o, i) => {
                const Icon = o.icon;
                return (
                  <motion.div
                    key={i}
                    {...m(0.3 + i * 0.08)}
                    className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center gap-3 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${o.color.replace(')', ' / 0.1)')}`, border: `1px solid ${o.color.replace(')', ' / 0.25)')}` }}>
                      <Icon className="w-4 h-4" style={{ color: o.color }} />
                    </div>
                    <span className="text-sm text-white/60">{o.text}</span>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-lg border" style={{ background: `${S3_ACCENT.violet.bg}`, borderColor: `${S3_ACCENT.violet.border}` }}>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: S3_ACCENT.violet.text }} />
                <p className="text-xs leading-relaxed" style={{ color: `${S3_ACCENT.violet.text}99` }}>Conecta NotebookLM con Gémini personal para consultar cuadernos directamente desde tu email.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <S3Footer sectionLabel="COMUNICACIÓN VISUAL" hue={185} />
    </div>
  );
}
