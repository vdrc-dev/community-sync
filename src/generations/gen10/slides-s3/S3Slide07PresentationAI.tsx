import { motion } from 'framer-motion';
import { Presentation, BarChart3, Sparkles, ChevronRight, FileText, ExternalLink } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText, S3_SERIF, s3SerifAnchor } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import toolGammaMockup from '@/assets/slides/tool-gamma-mockup.jpg';
import toolNapkinMockup from '@/assets/slides/tool-napkin-mockup.jpg';
import exampleGeminiOutput from '@/assets/slides/example-gemini-output.jpg';
import exampleGeminiOutputP3 from '@/assets/slides/example-gemini-output-p3.jpg';

const WORKFLOW = [
  { tool: 'Apuntes', accent: S3_ACCENT.rose },
  { tool: 'Gamma', accent: S3_ACCENT.violet },
  { tool: 'Napkin', accent: S3_ACCENT.amber },
  { tool: 'Canva', accent: S3_ACCENT.cyan },
  { tool: 'PDF/PPTX', accent: S3_ACCENT.emerald },
];

export function S3Slide07PresentationAI() {
  const { isExporting } = useExportContext();
  const m = (d: number) => s3Motion(d, isExporting);
  const me = (d: number) => s3MotionEpic(d, isExporting);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_25%,_hsl(263_55%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_75%_70%,_hsl(38_80%_50%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={38} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full py-12">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-6">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/45 block mb-2">Herramientas de Creación</span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
            Presentaciones con{' '}
            <span style={{ ...s3GradientText('hsl(263 70% 72%)', 'hsl(38 85% 65%)', 263), fontFamily: S3_SERIF, fontStyle: 'italic' }}>IA</span>
          </h1>
          <motion.div
            className="h-0.5 rounded-full mx-auto max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 65% 60% / 0.5), hsl(38 85% 60% / 0.5), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: S3_EASE }}
          />
          <motion.p {...m(0.1)} className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            Copia tus apuntes → pega en Gamma → deck profesional en 30 segundos
          </motion.p>
        </motion.div>

        {/* Main: 2-column layout — Gamma hero left, Napkin + Example right */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 mb-6">

          {/* LEFT: Gamma hero card with big screenshot */}
          <motion.div {...me(0.15)} className="col-span-1 sm:col-span-7 relative rounded-2xl border overflow-hidden group"
            style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}
            {...(isExporting ? {} : { whileHover: { scale: 1.01, y: -2 } })}>
            {!isExporting && (
              <motion.div className="absolute inset-0 pointer-events-none z-[1]"
                style={{ background: `linear-gradient(105deg, transparent 40%, ${S3_ACCENT.violet.text}08 55%, transparent 70%)` }}
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 6 }} />
            )}

            {/* Screenshot area */}
            <div className="relative h-[200px] overflow-hidden">
              <OptimizedImage src={toolGammaMockup} alt="Gamma App" className="w-full h-full" style={{ filter: 'brightness(0.85) saturate(0.9)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, hsl(0 0% 4% / 0.95) 100%)' }} />
              {/* Browser chrome overlay */}
              <div className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] text-white/40 font-mono ml-2">gamma.app</span>
                <a href="https://gamma.app" target="_blank" rel="noopener noreferrer" className="ml-auto">
                  <ExternalLink className="w-3 h-3 text-white/25 hover:text-white/50 transition-colors" />
                </a>
              </div>
              {/* Badge */}
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black" style={{ background: S3_ACCENT.violet.dot, color: '#04030a' }}>TOP</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <a href="https://gamma.app" target="_blank" rel="noopener noreferrer"
                    className="text-xl font-black text-white hover:underline underline-offset-4 decoration-1"
                    style={{ textDecorationColor: S3_ACCENT.violet.text }}>Gamma</a>
                  <p className="text-xs text-white/45">Texto → Slides en 30 segundos</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-black" style={{ color: S3_ACCENT.violet.text }}>30s</p>
                    <p className="text-[9px] text-white/35 uppercase">Genera</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black" style={{ color: S3_ACCENT.violet.text }}>Free</p>
                    <p className="text-[9px] text-white/35 uppercase">Plan</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed">Agente IA · Diagramas inteligentes · Exporta PPTX/PDF</p>
            </div>
          </motion.div>

          {/* RIGHT: Napkin + Example real stacked */}
          <div className="col-span-1 sm:col-span-5 flex flex-col gap-4">
            {/* Napkin card */}
            <motion.div {...me(0.2)} className="relative rounded-2xl border overflow-hidden group flex-1"
              style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}
              {...(isExporting ? {} : { whileHover: { scale: 1.02, y: -2 } })}>
              {!isExporting && (
                <motion.div className="absolute inset-0 pointer-events-none z-[1]"
                  style={{ background: `linear-gradient(105deg, transparent 40%, ${S3_ACCENT.amber.text}08 55%, transparent 70%)` }}
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 6 }} />
              )}
              <div className="relative h-[100px] overflow-hidden">
                <OptimizedImage src={toolNapkinMockup} alt="Napkin AI" className="w-full h-full" style={{ filter: 'brightness(0.85) saturate(0.9)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, hsl(0 0% 4% / 0.95) 100%)' }} />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <a href="https://napkin.ai" target="_blank" rel="noopener noreferrer"
                      className="text-base font-black text-white hover:underline underline-offset-4 decoration-1"
                      style={{ textDecorationColor: S3_ACCENT.amber.text }}>Napkin AI</a>
                    <p className="text-[10px] text-white/40">Texto → Infografías y diagramas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black" style={{ color: S3_ACCENT.amber.text }}>15s</p>
                    <p className="text-[9px] text-white/35 uppercase">Genera</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Real example: Gen 09 output */}
            <motion.div {...m(0.3)} className="rounded-2xl border p-4 relative overflow-hidden"
              style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
              {!isExporting && (
                <motion.div className="absolute inset-0 pointer-events-none z-[1]"
                  style={{ background: `linear-gradient(105deg, transparent 35%, ${S3_ACCENT.rose.text}08 50%, transparent 65%)` }}
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 5 }} />
              )}
              <div className="flex items-center gap-2 mb-3 relative">
                <FileText className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Ejemplo Real — Gen 09</span>
              </div>
              <div className="grid grid-cols-2 gap-2 relative">
                {[
                  { img: exampleGeminiOutput, label: 'Cover generada' },
                  { img: exampleGeminiOutputP3, label: 'Tabla de datos' },
                ].map((ex, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border" style={{ borderColor: `${S3_ACCENT.rose.text}15` }}>
                    <OptimizedImage src={ex.img} alt={ex.label} className="w-full h-[65px]" style={{ filter: 'brightness(0.85)' }} />
                    <p className="text-[9px] text-white/45 px-2 py-1 font-medium">{ex.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Workflow Pipeline — compact */}
        <motion.div {...m(0.45)} className="flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/50 mr-1" />
          {WORKFLOW.map((step, i) => (
            <div key={step.tool} className="flex items-center gap-2">
              <span
                className="px-3 py-1.5 rounded-lg border text-[10px] font-bold"
                style={{ borderColor: step.accent.border, background: step.accent.bg, color: step.accent.text }}
              >
                {step.tool}
              </span>
              {i < WORKFLOW.length - 1 && <ChevronRight className="w-3 h-3 text-white/25" />}
            </div>
          ))}
        </motion.div>
      </div>

      <S3Footer sectionLabel="CREACIÓN DIGITAL" hue={263} contextHint="slides con Gamma y Napkin AI" />
    </div>
  );
}
