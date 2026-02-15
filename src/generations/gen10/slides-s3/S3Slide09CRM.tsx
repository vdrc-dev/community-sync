import { motion } from 'framer-motion';
import { Database, Plug, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PIPELINE = [
  { label: 'CRM', sub: 'HubSpot · Salesforce · Pipedrive', icon: Database, accent: S3_ACCENT.amber },
  { label: 'MCP', sub: 'Plug & Play en 2 min', icon: Plug, accent: S3_ACCENT.violet },
  { label: 'Análisis', sub: 'Dashboard + Insights', icon: BarChart3, accent: S3_ACCENT.cyan },
];

const FLOATING_PILLS = [
  { label: 'datos', left: '14%', top: '24%', delay: 0 },
  { label: 'MCP', left: '83%', top: '28%', delay: 0.35 },
  { label: 'insights', left: '80%', top: '64%', delay: 0.7 },
];

export function S3Slide09CRM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_30%,_hsl(38_80%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_65%,_hsl(263_60%_55%_/_0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_transparent_35%,_hsl(38_90%_60%_/_0.07)_50%,_transparent_65%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={38} secondaryHue={263} tertiaryHue={185} />
      </div>

      {/* Floating decorative pills */}
      {!isExporting && FLOATING_PILLS.map((pill, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider pointer-events-none"
          style={{
            borderColor: 'hsl(38 90% 55% / 0.25)',
            background: 'hsl(38 90% 55% / 0.06)',
            color: 'hsl(38 85% 65%)',
            left: pill.left,
            top: pill.top,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: pill.delay }}
        >
          {pill.label}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Database className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Conexiones y Datos</span>
          </div>
        </motion.div>

        <motion.div {...m(0.08)}>
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
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
          {/* Animated accent line under title */}
          {!isExporting && (
            <motion.div
              className="h-0.5 rounded-full mx-auto mt-1"
              style={{ width: '140px', background: 'linear-gradient(90deg, hsl(38 90% 65%), hsl(280 60% 60%))', opacity: 0.8, transformOrigin: 'center' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: S3_EASE }}
            />
          )}
          {isExporting && (
            <div className="h-0.5 rounded-full mx-auto mt-1 w-[140px]" style={{ background: 'linear-gradient(90deg, hsl(38 90% 65%), hsl(280 60% 60%))', opacity: 0.8 }} />
          )}
        </motion.div>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-14 max-w-md mx-auto">
          Trae tus datos reales a la IA — clientes, acuerdos y métricas
        </motion.p>

        {/* Visual pipeline flow: CRM → MCP → Analysis */}
        <div className="relative flex items-center justify-center gap-4">
          {!isExporting && (
            <motion.div
              className="absolute -inset-8 rounded-[32px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, hsl(38 90% 60% / 0.12), transparent 72%)', filter: 'blur(26px)' }}
              animate={{ opacity: [0.28, 0.55, 0.28] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {PIPELINE.map((step, i) => {
            const Icon = step.icon;
            const shimmerHue = step.accent === S3_ACCENT.amber ? 38 : step.accent === S3_ACCENT.violet ? 263 : 185;
            return (
              <motion.div key={i} className="flex items-center gap-4" {...m(0.2 + i * 0.1)}>
                <motion.div
                  className="relative group w-52 p-6 rounded-2xl border flex flex-col items-center gap-3 overflow-hidden"
                  style={{ borderColor: step.accent.border, background: step.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.06, y: -4 } })}>
                  {/* Shimmer sweep */}
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-[1]"
                      style={{
                        background: `linear-gradient(105deg, transparent 35%, hsl(${shimmerHue} 60% 60% / 0.1) 50%, transparent 65%)`,
                      }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                    />
                  )}
                  {!isExporting && (
                    <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: step.accent.glow }} />
                  )}
                  <div className="relative flex flex-col items-center gap-3">
                    {/* Orbital ring around icon */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      {!isExporting && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border"
                          style={{ borderColor: `${step.accent.text}20`, borderWidth: 1 }}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                      {!isExporting && (
                        <motion.div
                          className="absolute inset-[-4px] rounded-2xl border"
                          style={{ borderColor: `${step.accent.text}12`, borderWidth: 1 }}
                          animate={{ rotate: [360, 0] }}
                          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                      <div className="w-16 h-16 rounded-2xl border flex items-center justify-center relative z-10"
                        style={{ borderColor: `${step.accent.text}25`, background: `${step.accent.text}08` }}>
                        <Icon className="w-8 h-8" style={{ color: step.accent.text }} />
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <p className="text-lg font-black text-white">{step.label}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{step.sub}</p>
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
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
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
                        <motion.div key={dot} className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent.dot }}
                          {...(isExporting ? {} : { animate: { x: [0, 10, 20], opacity: [0, 1, 0] }, transition: { duration: 1.2, repeat: Infinity, delay: dot * 0.25 + i * 0.3 } })} />
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
        <motion.div {...m(0.55)} className="mt-8 max-w-2xl mx-auto grid grid-cols-2 gap-3 text-left">
          {[
            { tip: '💬 "¿Cuántos deals cerré este mes?"', detail: 'Claude consulta HubSpot vía MCP y te da el número exacto' },
            { tip: '📊 "Hazme un pipeline visual"', detail: 'Combina datos del CRM con Canvas para un dashboard' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.58 + i * 0.04)} className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/25 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...m(0.7)} className="mt-5 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sin conector MCP? Busca si tu CRM tiene <span className="text-amber-400/80 font-semibold">API REST</span> → usa como alternativa</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} />
    </div>
  );
}
