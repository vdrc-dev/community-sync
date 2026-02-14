import { motion } from 'framer-motion';
import { Database, BookOpen, BarChart3, AlertTriangle, Plug } from 'lucide-react';
import bgCRM from '@/assets/gen10-s3/bg-crm-pipeline.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PIPELINE = [
  { label: 'CRM', sub: 'HubSpot / Salesforce', icon: Database, color: 'hsl(38 90% 55%)' },
  { label: 'Conector MCP', sub: 'Claude Desktop', icon: Plug, color: 'hsl(280 70% 60%)' },
  { label: 'Análisis', sub: 'NotebookLM / Canvas', icon: BarChart3, color: 'hsl(185 70% 50%)' },
];

export function S3Slide09CRM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgCRM} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/50 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={38} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3"
            style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}
          >
            <Database className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>
              Conexiones y Datos
            </span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Conecta tu <span className="text-amber-400">CRM</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Trae tus datos reales a la IA — clientes, acuerdos y métricas</p>
        </motion.div>

        {/* Pipeline */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {PIPELINE.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={i} className="flex items-center gap-4" {...m(0.15 + i * 0.1)}>
                <motion.div
                  className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center min-w-[180px]"
                  {...(isExporting ? {} : { whileHover: { scale: 1.05, boxShadow: `0 0 20px ${step.color.replace(')', ' / 0.3)')}` } })}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: `${step.color.replace(')', ' / 0.1)')}`,
                      border: `1px solid ${step.color.replace(')', ' / 0.25)')}`,
                      boxShadow: 'none',
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <p className="text-base font-bold text-white">{step.label}</p>
                  <p className="text-xs text-white/40 mt-1">{step.sub}</p>
                </motion.div>
                {i < PIPELINE.length - 1 && (
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: step.color.replace(')', ' / 0.4)') }}
                        {...(isExporting
                          ? {}
                          : {
                              animate: { x: [0, 12, 24], opacity: [0, 1, 0] },
                              transition: { duration: 1.5, repeat: Infinity, delay: dot * 0.3 + i * 0.5, ease: 'easeInOut' },
                            })}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Two-tier explanation */}
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            {...m(0.4)}
            className="p-5 rounded-xl border border-amber-500/15 bg-amber-500/[0.03]"
            {...(isExporting ? {} : { whileHover: { scale: 1.02, y: -2 } })}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-sm font-bold text-amber-300/80">Productividad Personal</p>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">Conecta tu CRM vía MCP para consultas rápidas. Trae clientes, busca acuerdos, genera reportes. Ideal para uso individual.</p>
          </motion.div>
          <motion.div
            {...m(0.45)}
            className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            {...(isExporting ? {} : { whileHover: { scale: 1.02, y: -2 } })}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <p className="text-sm font-bold text-white/50">Infraestructura Corporativa</p>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">Para equipos grandes: Data Warehouse + API directa. Más complejo pero escalable. No es el enfoque de este taller.</p>
          </motion.div>
        </div>

        <motion.div {...m(0.55)} className="mt-6 p-3 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-300/60">
              Si tu CRM no tiene conector MCP, busca si tiene API REST y usa un conector personalizado.
            </p>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} />
    </div>
  );
}
