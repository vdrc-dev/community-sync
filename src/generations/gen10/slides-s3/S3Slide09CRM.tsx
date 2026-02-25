import { motion } from 'framer-motion';
import { Database, Plug, BarChart3, ArrowRight, Sparkles, TrendingUp, Users, DollarSign, MessageSquare } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText, S3_SERIF, s3SerifAnchor } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PIPELINE = [
  { label: 'CRM', sub: 'HubSpot · Salesforce · Notion', icon: Database, accent: S3_ACCENT.amber },
  { label: 'MCP', sub: '200+ servidores · Plug & Play', icon: Plug, accent: S3_ACCENT.violet },
  { label: 'Análisis', sub: 'Dashboard + Insights', icon: BarChart3, accent: S3_ACCENT.cyan },
];

/* ── Dashboard mock data ── */
const DEALS = [
  { name: 'Proyecto Alpha', stage: 'Propuesta', value: '$45K', pct: 75, accent: S3_ACCENT.amber },
  { name: 'Migración Cloud', stage: 'Negociación', value: '$120K', pct: 60, accent: S3_ACCENT.violet },
  { name: 'App Interna', stage: 'Cierre', value: '$28K', pct: 90, accent: S3_ACCENT.emerald },
  { name: 'Consultoría IA', stage: 'Calificado', value: '$65K', pct: 40, accent: S3_ACCENT.cyan },
];

const KPI = [
  { icon: DollarSign, value: '$258K', label: 'Pipeline', trend: '+18%', hue: 38 },
  { icon: Users, value: '47', label: 'Contactos', trend: '+12', hue: 263 },
  { icon: TrendingUp, value: '68%', label: 'Win Rate', trend: '+5%', hue: 160 },
];

export function S3Slide09CRM() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_30%,_hsl(38_80%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_65%,_hsl(263_60%_55%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_15%,_hsl(185_70%_45%_/_0.05),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={18} primaryHue={38} secondaryHue={263} tertiaryHue={185} showAurora showPlasma showConstellation showHolographic showChromatic intensity={1.1} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1680px] mx-auto w-full py-6">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-2" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Database className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Conexiones y Datos</span>
          </div>
          {/* Editorial serif anchor */}
          <div className="absolute top-[-10%] right-[-4%] z-[0] pointer-events-none select-none">
            <span style={s3SerifAnchor('$', 38, 0.025)}>$</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-1">
            Conecta tu{' '}
            <span style={{ ...s3GradientText('hsl(38 90% 65%)', 'hsl(280 60% 60%)', 38), fontFamily: S3_SERIF, fontStyle: 'italic' }}>CRM</span>
          </h1>
          <motion.div
            className="h-[2px] rounded-full mx-auto mt-1.5 max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(38 90% 65% / 0.8), hsl(280 60% 60% / 0.8), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
          />
          <motion.p {...m(0.05)} className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            Trae clientes, deals y métricas a la IA — en tiempo real
          </motion.p>
        </motion.div>

        {/* Main content: Pipeline + Dashboard mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5 mb-5">

          {/* LEFT: Pipeline flow + Prompts */}
          <div className="flex flex-col gap-4">
            {/* Pipeline flow — vertical */}
            <motion.div {...me(0.1)} className="rounded-2xl border p-5 relative overflow-hidden"
              style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.015)' }}>
              <p className="text-[10px] text-white/35 uppercase tracking-[0.2em] font-bold mb-4">Pipeline de Datos</p>
              <div className="flex flex-col gap-3">
                {PIPELINE.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <motion.div {...m(0.15 + i * 0.08)}
                        className="relative w-full p-4 rounded-xl border flex items-center gap-3 overflow-hidden group"
                        style={{ borderColor: step.accent.border, background: step.accent.bg }}
                        {...(isExporting ? {} : { whileHover: { scale: 1.02, x: 4 } })}>
                        {!isExporting && (
                          <motion.div className="absolute inset-0 pointer-events-none z-[1]"
                            style={{ background: `linear-gradient(105deg, transparent 35%, ${step.accent.text}10 50%, transparent 65%)` }}
                            animate={{ x: ['-150%', '250%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
                        )}
                        <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                          style={{ borderColor: `${step.accent.text}25`, background: `${step.accent.text}08` }}>
                          <Icon className="w-5 h-5" style={{ color: step.accent.text }} />
                        </div>
                        <div className="relative">
                          <p className="text-sm font-black text-white">{step.label}</p>
                          <p className="text-[10px] text-white/40">{step.sub}</p>
                        </div>
                      </motion.div>
                      {i < PIPELINE.length - 1 && (
                        <div className="flex items-center gap-1">
                          {[0, 1, 2].map(dot => (
                            <motion.div key={dot} className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent.dot }}
                              {...(isExporting ? {} : { animate: { y: [0, 6, 12], opacity: [0, 1, 0] }, transition: { duration: 1.2, repeat: Infinity, delay: dot * 0.2 } })} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Example prompts */}
            <motion.div {...m(0.45)} className="space-y-2">
              {[
                { prompt: '"¿Cuántos deals cerré este mes?"', icon: MessageSquare },
                { prompt: '"Hazme un pipeline visual de Q1"', icon: BarChart3 },
              ].map((p, i) => (
                <motion.div key={i} {...m(0.48 + i * 0.04)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border relative overflow-hidden"
                  style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${S3_ACCENT.violet.text}08 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
                  )}
                  <p.icon className="w-3.5 h-3.5 shrink-0 relative" style={{ color: S3_ACCENT.violet.text }} />
                  <p className="text-[11px] font-mono text-white/60 relative italic">{p.prompt}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Dashboard mockup */}
          <motion.div {...me(0.12)} className="rounded-2xl border overflow-hidden relative"
            style={{ borderColor: S3_ACCENT.amber.border, background: 'hsl(38 40% 6% / 0.6)' }}>

            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 mx-3">
                <div className="bg-white/5 rounded-md px-3 py-1 text-[9px] font-mono text-white/35">
                  Claude Desktop → HubSpot vía MCP
                </div>
              </div>
              <motion.div
                className="px-2 py-0.5 rounded-full text-[8px] font-black flex items-center gap-1"
                style={{ background: S3_ACCENT.emerald.bg, color: S3_ACCENT.emerald.text, border: `1px solid ${S3_ACCENT.emerald.border}` }}
                {...(isExporting ? {} : { animate: { opacity: [1, 0.5, 1] }, transition: { duration: 2, repeat: Infinity } })}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" /> LIVE
              </motion.div>
            </div>

            {/* Shimmer */}
            {!isExporting && (
              <motion.div className="absolute inset-0 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 30%, hsl(38 80% 65% / 0.06) 50%, transparent 70%)', width: '40%' }}
                animate={{ x: ['-200%', '400%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 4, ease: 'linear' }} />
            )}

            <div className="p-5 relative">
              {/* KPI row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {KPI.map((kpi, i) => {
                  const Icon = kpi.icon;
                  return (
                    <motion.div key={i} {...m(0.2 + i * 0.05)}
                      className="rounded-xl border p-3 relative overflow-hidden"
                      style={{ borderColor: `hsl(${kpi.hue} 60% 50% / 0.15)`, background: `hsl(${kpi.hue} 60% 50% / 0.04)` }}>
                      <div className="flex items-center justify-between mb-1">
                        <Icon className="w-3.5 h-3.5" style={{ color: `hsl(${kpi.hue} 65% 65%)` }} />
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ color: `hsl(${kpi.hue} 65% 65%)`, background: `hsl(${kpi.hue} 60% 50% / 0.1)` }}>
                          {kpi.trend}
                        </span>
                      </div>
                      <motion.p className="text-xl font-black tabular-nums" style={{ color: `hsl(${kpi.hue} 70% 68%)` }}
                        {...(isExporting ? {} : {
                          initial: { opacity: 0, y: 8 },
                          animate: { opacity: 1, y: 0 },
                          transition: { delay: 0.5 + i * 0.1, duration: 0.5 },
                        })}>
                        {kpi.value}
                      </motion.p>
                      <p className="text-[9px] text-white/35 uppercase tracking-wider font-bold">{kpi.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Deals table */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'hsl(0 0% 100% / 0.06)' }}>
                <div className="grid grid-cols-[1.2fr_0.8fr_0.6fr_1fr] px-3 py-2 border-b text-[9px] font-bold text-white/35 uppercase tracking-wider"
                  style={{ borderColor: 'hsl(0 0% 100% / 0.04)', background: 'hsl(0 0% 100% / 0.015)' }}>
                  <span>Deal</span>
                  <span>Etapa</span>
                  <span>Valor</span>
                  <span>Probabilidad</span>
                </div>
                {DEALS.map((deal, i) => (
                  <motion.div key={i} {...m(0.35 + i * 0.04)}
                    className="grid grid-cols-[1.2fr_0.8fr_0.6fr_1fr] px-3 py-2.5 border-b last:border-b-0 items-center"
                    style={{ borderColor: 'hsl(0 0% 100% / 0.03)' }}>
                    <span className="text-[11px] text-white/65 font-medium">{deal.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border w-fit"
                      style={{ borderColor: deal.accent.border, color: deal.accent.text, background: deal.accent.bg }}>
                      {deal.stage}
                    </span>
                    <span className="text-[11px] text-white/55 font-bold tabular-nums">{deal.value}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 100% / 0.06)' }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: deal.accent.dot }}
                          {...(isExporting
                            ? { style: { width: `${deal.pct}%`, background: deal.accent.dot } }
                            : { initial: { width: '0%' }, animate: { width: `${deal.pct}%` }, transition: { delay: 0.6 + i * 0.1, duration: 0.8, ease: S3_EASE } }
                          )} />
                      </div>
                      <span className="text-[10px] font-bold tabular-nums" style={{ color: deal.accent.text }}>{deal.pct}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mini chart mockup */}
              <motion.div {...m(0.55)} className="mt-3 rounded-xl border p-3"
                style={{ borderColor: 'hsl(38 60% 50% / 0.1)', background: 'hsl(38 60% 50% / 0.03)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] text-white/30 uppercase tracking-wider font-bold">Revenue Trend</span>
                  <span className="text-[9px] font-bold" style={{ color: S3_ACCENT.amber.text }}>Q1 2026</span>
                </div>
                <div className="flex items-end gap-1 h-[40px]">
                  {[25, 38, 32, 45, 52, 48, 60, 55, 72, 68, 78, 85].map((h, j) => (
                    <motion.div key={j} className="flex-1 rounded-t"
                      style={{ background: `linear-gradient(180deg, ${S3_ACCENT.amber.dot}, ${S3_ACCENT.amber.dot}40)` }}
                      {...(isExporting
                        ? { style: { height: `${h}%`, background: `linear-gradient(180deg, ${S3_ACCENT.amber.dot}, ${S3_ACCENT.amber.dot}40)` } }
                        : { initial: { height: 0 }, animate: { height: `${h}%` }, transition: { delay: 0.7 + j * 0.04, duration: 0.5, ease: S3_EASE } }
                      )} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div {...m(0.65)} className="text-center">
          <div className="inline-flex items-center gap-2 text-xs text-white/45">
            <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
            <span>¿Sin conector MCP? Busca si tu CRM tiene <span className="text-amber-400/80 font-semibold">API REST</span> — úsala como alternativa</span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} contextHint="CRM conectado por MCP/API" />
    </div>
  );
}
