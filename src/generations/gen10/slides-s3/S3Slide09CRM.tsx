import { motion } from 'framer-motion';
import { Database, Plug, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PIPELINE = [
  { label: 'CRM', sub: 'HubSpot · Salesforce · Notion', icon: Database, accent: S3_ACCENT.amber },
  { label: 'MCP', sub: '200+ servidores · Plug & Play', icon: Plug, accent: S3_ACCENT.violet },
  { label: 'Análisis', sub: 'Dashboard + Insights', icon: BarChart3, accent: S3_ACCENT.cyan },
];

export function S3Slide09CRM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_30%,_hsl(38_80%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_65%,_hsl(263_60%_55%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_15%,_hsl(185_70%_45%_/_0.05),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={38} secondaryHue={263} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Database className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Conexiones y Datos</span>
          </div>
        </motion.div>

        <motion.div {...m(0.08)}>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
            Conecta tu{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(38 90% 65%), hsl(280 60% 60%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px hsl(38 90% 65% / 0.4))',
              }}
            >
              CRM
            </span>
          </h1>
          <motion.div
            className="h-[2px] rounded-full mx-auto mt-1.5 max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(38 90% 65% / 0.8), hsl(280 60% 60% / 0.8), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
          />
        </motion.div>
        <motion.p {...m(0.15)} className="text-white/50 text-sm mt-2 mb-8 max-w-md mx-auto">
          Trae clientes, deals y métricas a la IA — en tiempo real
        </motion.p>

        {/* Visual pipeline flow: CRM → MCP → Analysis */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
          {PIPELINE.map((step, i) => {
            const Icon = step.icon;
            const shimmerHue = step.accent === S3_ACCENT.amber ? 38 : step.accent === S3_ACCENT.violet ? 263 : 185;
            return (
              <motion.div key={i} className="flex items-center gap-4" {...m(0.2 + i * 0.1)}>
                <motion.div
                  className="relative group w-48 p-5 rounded-2xl border flex flex-col items-center gap-2 overflow-hidden"
                  style={{ borderColor: step.accent.border, background: step.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.06, y: -4 } })}>
                  {/* Shimmer */}
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-[1]"
                      style={{
                        background: `linear-gradient(105deg, transparent 35%, hsl(${shimmerHue} 60% 60% / 0.08) 50%, transparent 65%)`,
                      }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
                    />
                  )}
                  <div className="relative flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-xl border flex items-center justify-center"
                      style={{ borderColor: `${step.accent.text}25`, background: `${step.accent.text}08` }}>
                      <Icon className="w-7 h-7" style={{ color: step.accent.text }} />
                    </div>
                  </div>
                  <div className="relative">
                    <p className="text-base font-black text-white tracking-tight">{step.label}</p>
                    <p className="text-[10px] text-white/40 mt-0.5 leading-snug">{step.sub}</p>
                  </div>
                </motion.div>

                {i < PIPELINE.length - 1 && (
                  <div className="flex items-center gap-1 relative">
                    {/* Glowing connection line between nodes */}
                    <div className="absolute -left-2 -right-2 top-1/2 -translate-y-1/2 h-2 overflow-hidden rounded-full opacity-60">
                      {!isExporting && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${step.accent.dot}, ${PIPELINE[i + 1].accent.dot})`,
                            filter: 'blur(2px)',
                          }}
                          animate={{ opacity: [0.25, 0.45, 0.25] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                      {isExporting && (
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${step.accent.dot}, ${PIPELINE[i + 1].accent.dot})`,
                            opacity: 0.7,
                          }}
                        />
                      )}
                    </div>
                    <div className="relative flex items-center gap-1">
                      {[0, 1, 2].map(dot => (
                        <motion.div key={dot} className="w-2 h-2 rounded-full" style={{ background: step.accent.dot }}
                          {...(isExporting ? {} : { animate: { x: [0, 10, 20], opacity: [0, 1, 0] }, transition: { duration: 1.8, repeat: Infinity, delay: dot * 0.25 + i * 0.3 } })} />
                      ))}
                      <ArrowRight className="w-4 h-4 ml-1" style={{ color: `${step.accent.text}50` }} />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Example prompts */}
        <motion.div {...m(0.55)} className="mt-6 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left relative pt-5">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-56 border-t border-dashed"
            style={{ borderColor: 'hsl(0 0% 100% / 0.15)' }}
          />
          {[
            { tip: '"¿Cuántos deals cerré este mes?"', detail: 'Claude consulta HubSpot vía MCP y te da el número exacto' },
            { tip: '"Hazme un pipeline visual"', detail: 'Combina datos del CRM con Canvas para un dashboard' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.58 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...m(0.7)} className="mt-5 inline-flex items-center gap-2 text-xs text-white/45">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
          <span>¿Sin conector MCP? Busca si tu CRM tiene <span className="text-amber-400/80 font-semibold">API REST</span> — úsala como alternativa</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} contextHint="CRM conectado por MCP/API" />
    </div>
  );
}
