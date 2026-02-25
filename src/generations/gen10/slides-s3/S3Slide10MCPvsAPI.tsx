import { motion } from 'framer-motion';
import { Cpu, Server, Sparkles, MessageSquare, Zap, Clock, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText, S3_SERIF, s3SerifAnchor } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

export function S3Slide10MCPvsAPI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,_hsl(263_60%_55%_/_0.12),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_65%,_hsl(38_80%_55%_/_0.1),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={20} primaryHue={263} secondaryHue={38} tertiaryHue={185} showAurora showConstellation showPlasma showLightRays showHolographic showChromatic intensity={1.2} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1680px] mx-auto w-full py-8">

        {/* ── HEADER ── */}
        <motion.div {...m(0)} className="text-center mb-6">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 block mb-1.5">Fundamentos Visuales</span>
          {/* Editorial serif anchor */}
          <div className="absolute top-[-10%] left-[-4%] z-[0] pointer-events-none select-none">
            <span style={s3SerifAnchor('↔', 263, 0.02)}>↔</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-[3.5rem] font-black text-white tracking-tight leading-none">
            <span style={{ ...s3GradientText('hsl(263 70% 72%)', 'hsl(263 50% 55%)', 263), fontFamily: S3_SERIF, fontStyle: 'italic' }}>MCP</span>
            <span className="text-white/30 mx-3 font-light" style={{ fontFamily: S3_SERIF, fontStyle: 'italic' }}>vs</span>
            <span style={{ ...s3GradientText('hsl(38 90% 65%)', 'hsl(38 70% 50%)', 38), fontFamily: S3_SERIF, fontStyle: 'italic' }}>API</span>
          </h1>
          <motion.div
            className="h-[2px] rounded-full mx-auto max-w-[120px] mt-2 origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 65% 60% / 0.6), hsl(38 85% 60% / 0.6), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: S3_EASE }}
          />
          <motion.p {...m(0.05)} className="text-white/45 text-sm mt-2 max-w-lg mx-auto">
            Dos formas de conectar — una para <strong className="text-white/65">agentes</strong>, otra para <strong className="text-white/65">sistemas</strong>
          </motion.p>
        </motion.div>

        {/* ── MAIN INFOGRAPHIC: Two columns with visual diagrams ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 mb-6">

          {/* ═══ MCP COLUMN ═══ */}
          <motion.div {...me(0.1)} className="relative rounded-2xl border overflow-hidden"
            style={{ borderColor: S3_ACCENT.violet.border, background: 'hsl(263 55% 50% / 0.04)' }}>
            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${S3_ACCENT.violet.dot}, hsl(263 50% 55%), transparent)` }} />

            <div className="p-5 lg:p-6">
              {/* Title row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: `${S3_ACCENT.violet.text}50`, background: S3_ACCENT.violet.bg }}>
                  <Cpu className="w-6 h-6" style={{ color: S3_ACCENT.violet.text }} />
                </div>
                <div>
                  <h2 className="text-2xl font-black" style={{ color: S3_ACCENT.violet.text }}>MCP</h2>
                  <p className="text-[11px] text-white/40 -mt-0.5">Model Context Protocol</p>
                </div>
                <div className="ml-auto px-3 py-1 rounded-full border text-[10px] font-black"
                  style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg, color: S3_ACCENT.violet.text }}>
                  AGENTES
                </div>
              </div>

              {/* ── VISUAL DIAGRAM: Agent pulling data ── */}
              <motion.div {...m(0.2)} className="rounded-xl border p-4 mb-4"
                style={{ borderColor: 'hsl(263 50% 50% / 0.12)', background: 'hsl(263 50% 50% / 0.03)' }}>
                <div className="flex items-center justify-center gap-3 sm:gap-5">
                  {/* Agent */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl border flex items-center justify-center relative"
                      style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
                      <MessageSquare className="w-6 h-6" style={{ color: S3_ACCENT.violet.text }} />
                      {!isExporting && (
                        <motion.div className="absolute -inset-1 rounded-xl border border-dashed"
                          style={{ borderColor: 'hsl(263 60% 60% / 0.2)' }}
                          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-white/50">Claude</span>
                  </div>

                  {/* Animated arrow with "pide datos" */}
                  <div className="flex flex-col items-center gap-1 flex-1 max-w-[140px]">
                    <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: S3_ACCENT.violet.text }}>pide datos</span>
                    <div className="relative w-full h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, ${S3_ACCENT.violet.dot}, transparent)` }}>
                      {!isExporting && (
                        <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] rounded-full"
                          style={{ background: S3_ACCENT.violet.text, boxShadow: `0 0 8px ${S3_ACCENT.violet.glow}` }}
                          animate={{ left: ['0%', '90%', '0%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
                      )}
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-white/30">responde</span>
                    <div className="relative w-full h-[2px] rounded-full" style={{ background: `linear-gradient(270deg, ${S3_ACCENT.violet.dot}, transparent)` }} />
                  </div>

                  {/* App */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl border flex items-center justify-center"
                      style={{ borderColor: S3_ACCENT.emerald.border, background: S3_ACCENT.emerald.bg }}>
                      <span className="text-lg">📊</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/50">HubSpot</span>
                  </div>
                </div>
              </motion.div>

              {/* Key traits */}
              <div className="space-y-2">
                {[
                  { icon: Zap, text: 'Plug & Play — sin código necesario', highlight: true },
                  { icon: Clock, text: 'Setup en ~2 minutos' },
                  { icon: ArrowLeftRight, text: 'Bidireccional: el agente lee Y escribe' },
                ].map((trait, i) => (
                  <motion.div key={i} {...m(0.3 + i * 0.05)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg border"
                    style={{
                      borderColor: trait.highlight ? 'hsl(263 60% 55% / 0.25)' : 'hsl(0 0% 100% / 0.06)',
                      background: trait.highlight ? 'hsl(263 60% 55% / 0.06)' : 'hsl(0 0% 100% / 0.02)',
                    }}>
                    <trait.icon className="w-3.5 h-3.5 shrink-0" style={{ color: S3_ACCENT.violet.text }} />
                    <span className="text-xs text-white/65">{trait.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══ API COLUMN ═══ */}
          <motion.div {...me(0.15)} className="relative rounded-2xl border overflow-hidden"
            style={{ borderColor: S3_ACCENT.amber.border, background: 'hsl(38 80% 50% / 0.04)' }}>
            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${S3_ACCENT.amber.dot}, hsl(38 70% 50%), transparent)` }} />

            <div className="p-5 lg:p-6">
              {/* Title row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: `${S3_ACCENT.amber.text}50`, background: S3_ACCENT.amber.bg }}>
                  <Server className="w-6 h-6" style={{ color: S3_ACCENT.amber.text }} />
                </div>
                <div>
                  <h2 className="text-2xl font-black" style={{ color: S3_ACCENT.amber.text }}>API</h2>
                  <p className="text-[11px] text-white/40 -mt-0.5">Application Programming Interface</p>
                </div>
                <div className="ml-auto px-3 py-1 rounded-full border text-[10px] font-black"
                  style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg, color: S3_ACCENT.amber.text }}>
                  SISTEMAS
                </div>
              </div>

              {/* ── VISUAL DIAGRAM: System to system ── */}
              <motion.div {...m(0.25)} className="rounded-xl border p-4 mb-4"
                style={{ borderColor: 'hsl(38 70% 50% / 0.12)', background: 'hsl(38 70% 50% / 0.03)' }}>
                <div className="flex items-center justify-center gap-3 sm:gap-5">
                  {/* System A */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl border flex items-center justify-center"
                      style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
                      <span className="text-lg">💳</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/50">Stripe</span>
                  </div>

                  {/* Arrow with "webhook" */}
                  <div className="flex flex-col items-center gap-1 flex-1 max-w-[140px]">
                    <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: S3_ACCENT.amber.text }}>webhook</span>
                    <div className="relative w-full h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, ${S3_ACCENT.amber.dot}, transparent)` }}>
                      {!isExporting && (
                        <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] rounded-full"
                          style={{ background: S3_ACCENT.amber.text, boxShadow: `0 0 8px ${S3_ACCENT.amber.glow}` }}
                          animate={{ left: ['0%', '90%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }} />
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[8px] text-white/25 font-mono">{'{ JSON }'}</span>
                    </div>
                  </div>

                  {/* System B */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl border flex items-center justify-center"
                      style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
                      <span className="text-lg">💬</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/50">Slack</span>
                  </div>
                </div>
              </motion.div>

              {/* Key traits */}
              <div className="space-y-2">
                {[
                  { icon: Server, text: 'Requiere código — endpoints, auth, parsing', highlight: true },
                  { icon: Clock, text: 'Setup en 30 min+ (a veces horas)' },
                  { icon: ArrowRight, text: 'Unidireccional: sistema A → sistema B' },
                ].map((trait, i) => (
                  <motion.div key={i} {...m(0.35 + i * 0.05)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg border"
                    style={{
                      borderColor: trait.highlight ? 'hsl(38 80% 55% / 0.25)' : 'hsl(0 0% 100% / 0.06)',
                      background: trait.highlight ? 'hsl(38 80% 55% / 0.06)' : 'hsl(0 0% 100% / 0.02)',
                    }}>
                    <trait.icon className="w-3.5 h-3.5 shrink-0" style={{ color: S3_ACCENT.amber.text }} />
                    <span className="text-xs text-white/65">{trait.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── COMPARISON TABLE — Compact & visual ── */}
        <motion.div {...m(0.5)} className="max-w-4xl mx-auto w-full">
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.015)' }}>
            {/* Header row */}
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.06)' }}>
              <div className="px-4 py-2.5" />
              <div className="px-4 py-2.5 border-l flex items-center gap-2" style={{ borderColor: 'hsl(0 0% 100% / 0.06)' }}>
                <Cpu className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
                <span className="text-xs font-black" style={{ color: S3_ACCENT.violet.text }}>MCP</span>
              </div>
              <div className="px-4 py-2.5 border-l flex items-center gap-2" style={{ borderColor: 'hsl(0 0% 100% / 0.06)' }}>
                <Server className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
                <span className="text-xs font-black" style={{ color: S3_ACCENT.amber.text }}>API</span>
              </div>
            </div>
            {/* Data rows */}
            {[
              { cat: '¿Para quién?', mcp: 'Agentes ↔ Apps', api: 'App ↔ App' },
              { cat: 'Ejemplo', mcp: 'Claude consulta HubSpot', api: 'Webhook Stripe → Slack' },
              { cat: 'Tiempo setup', mcp: '~2 min ⚡', api: '30 min+ 🔧', highlight: true },
              { cat: 'Dirección', mcp: 'Bidireccional ↔', api: 'Unidireccional →' },
            ].map((row, i) => (
              <motion.div key={i} {...m(0.55 + i * 0.04)}
                className="grid grid-cols-[1fr_1fr_1fr] border-b last:border-b-0"
                style={{ borderColor: 'hsl(0 0% 100% / 0.04)' }}>
                <div className="px-4 py-2.5 flex items-center">
                  <span className="text-[11px] font-bold text-white/45 uppercase tracking-wider">{row.cat}</span>
                </div>
                <div className="px-4 py-2.5 border-l" style={{
                  borderColor: 'hsl(0 0% 100% / 0.06)',
                  background: row.highlight ? 'hsl(263 60% 55% / 0.06)' : 'transparent',
                }}>
                  <span className={`text-[12px] font-medium ${row.highlight ? 'font-bold' : ''}`}
                    style={{ color: row.highlight ? S3_ACCENT.violet.text : 'hsl(0 0% 100% / 0.6)' }}>{row.mcp}</span>
                </div>
                <div className="px-4 py-2.5 border-l" style={{
                  borderColor: 'hsl(0 0% 100% / 0.06)',
                  background: row.highlight ? 'hsl(38 80% 55% / 0.06)' : 'transparent',
                }}>
                  <span className={`text-[12px] font-medium ${row.highlight ? 'font-bold' : ''}`}
                    style={{ color: row.highlight ? S3_ACCENT.amber.text : 'hsl(0 0% 100% / 0.6)' }}>{row.api}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── TAKEAWAY ── */}
        <motion.div {...m(0.75)} className="text-center mt-5">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border"
            style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
            <Sparkles className="w-4 h-4 text-amber-400/60" />
            <span className="text-xs text-white/55">
              Agente necesita datos →{' '}
              <span className="font-black" style={{ color: S3_ACCENT.violet.text }}>MCP</span>
              <span className="text-white/25 mx-2">·</span>
              Sistema envía datos →{' '}
              <span className="font-black" style={{ color: S3_ACCENT.amber.text }}>API</span>
            </span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" hue={263} contextHint="cuándo usar MCP vs API" />
    </div>
  );
}
