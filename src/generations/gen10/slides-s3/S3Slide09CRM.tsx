import { motion } from 'framer-motion';
import { Database, Plug, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PIPELINE = [
  { label: 'CRM', sub: 'HubSpot · Salesforce', icon: Database, accent: S3_ACCENT.amber },
  { label: 'MCP', sub: 'Conector', icon: Plug, accent: S3_ACCENT.violet },
  { label: 'Análisis', sub: 'Canvas · NotebookLM', icon: BarChart3, accent: S3_ACCENT.cyan },
];

export function S3Slide09CRM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_30%,_hsl(38_80%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_65%,_hsl(263_60%_55%_/_0.06),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={38} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Database className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Conexiones y Datos</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Conecta tu <span style={{ color: S3_ACCENT.amber.text }}>CRM</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-16 max-w-md mx-auto">
          Trae tus datos reales a la IA — clientes, acuerdos y métricas
        </motion.p>

        {/* Visual pipeline flow: CRM → MCP → Analysis */}
        <div className="flex items-center justify-center gap-4">
          {PIPELINE.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={i} className="flex items-center gap-4" {...m(0.2 + i * 0.1)}>
                <motion.div
                  className="relative group w-52 p-6 rounded-2xl border flex flex-col items-center gap-3"
                  style={{ borderColor: step.accent.border, background: step.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.06, y: -4 } })}>
                  {!isExporting && (
                    <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: step.accent.glow }} />
                  )}
                  <div className="relative w-16 h-16 rounded-2xl border flex items-center justify-center"
                    style={{ borderColor: `${step.accent.text}25`, background: `${step.accent.text}08` }}>
                    <Icon className="w-8 h-8" style={{ color: step.accent.text }} />
                  </div>
                  <div className="relative">
                    <p className="text-lg font-black text-white">{step.label}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{step.sub}</p>
                  </div>
                </motion.div>

                {i < PIPELINE.length - 1 && (
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map(dot => (
                      <motion.div key={dot} className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent.dot }}
                        {...(isExporting ? {} : { animate: { x: [0, 10, 20], opacity: [0, 1, 0] }, transition: { duration: 1.2, repeat: Infinity, delay: dot * 0.25 + i * 0.3 } })} />
                    ))}
                    <ArrowRight className="w-4 h-4 ml-1" style={{ color: `${step.accent.text}50` }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.6)} className="mt-12 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sin conector MCP? Busca si tu CRM tiene <span className="text-amber-400/80 font-semibold">API REST</span></span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} />
    </div>
  );
}
