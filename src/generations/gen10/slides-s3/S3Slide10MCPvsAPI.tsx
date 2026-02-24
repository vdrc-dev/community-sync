import { motion } from 'framer-motion';
import { Cpu, Server, Sparkles, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const ROWS = [
  { cat: 'Para', mcp: 'Agentes ↔ Apps', api: 'App ↔ App' },
  { cat: 'Ejemplo', mcp: 'Claude consulta HubSpot', api: 'Webhook Stripe → Slack' },
  { cat: 'Setup', mcp: '~2 min, plug & play', api: '30 min+, código necesario', highlight: true },
];

export function S3Slide10MCPvsAPI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_25%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_65%,_hsl(38_80%_55%_/_0.08),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={38} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Cpu className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Conexiones y Datos</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div {...m(0.05)}>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
            <span style={{
              background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(263 50% 60%))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(263 70% 72% / 0.35))',
            }}>MCP</span>
            {' vs '}
            <span style={{
              background: 'linear-gradient(135deg, hsl(38 90% 65%), hsl(38 70% 55%))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(38 90% 65% / 0.35))',
            }}>API</span>
          </h1>
          <motion.div className="h-[2px] rounded-full mx-auto mt-1.5 max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.7), hsl(38 90% 65% / 0.7), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }} />
        </motion.div>
        <motion.p {...m(0.1)} className="text-white/50 text-sm mt-2 mb-8 mx-auto">
          Dos formas de conectar — una para agentes, otra para sistemas
        </motion.p>

        {/* Visual VS: Two large hero nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 max-w-3xl mx-auto">
          {/* MCP */}
          <motion.div {...me(0.15)} className="relative rounded-2xl border p-6 overflow-hidden"
            style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}
            {...(isExporting ? {} : { whileHover: { scale: 1.03, y: -3 } })}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${S3_ACCENT.violet.dot}, transparent)` }} />
            {!isExporting && (
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(105deg, transparent 35%, ${S3_ACCENT.violet.text}08 50%, transparent 65%)` }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }} />
            )}
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative">
                {!isExporting && (
                  <motion.div className="absolute -inset-2 rounded-2xl border border-dashed"
                    style={{ borderColor: 'hsl(263 70% 72% / 0.2)' }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
                )}
                <div className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center"
                  style={{ borderColor: `${S3_ACCENT.violet.text}40`, background: S3_ACCENT.violet.bg }}>
                  <Cpu className="w-9 h-9" style={{ color: S3_ACCENT.violet.text }} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black" style={{ color: S3_ACCENT.violet.text }}>MCP</p>
                <p className="text-xs text-white/50 mt-1">Model Context Protocol</p>
                <p className="text-[10px] text-white/35 mt-2 leading-relaxed max-w-[200px] mx-auto">
                  El agente pide datos cuando los necesita. Plug & play.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
                style={{ borderColor: `${S3_ACCENT.violet.text}20`, background: `${S3_ACCENT.violet.text}06` }}>
                <span className="text-xs font-black" style={{ color: S3_ACCENT.violet.text }}>~2 min</span>
                <span className="text-[10px] text-white/40">setup</span>
              </div>
            </div>
          </motion.div>

          {/* API */}
          <motion.div {...me(0.2)} className="relative rounded-2xl border p-6 overflow-hidden"
            style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}
            {...(isExporting ? {} : { whileHover: { scale: 1.03, y: -3 } })}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${S3_ACCENT.amber.dot}, transparent)` }} />
            {!isExporting && (
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(105deg, transparent 35%, ${S3_ACCENT.amber.text}08 50%, transparent 65%)` }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }} />
            )}
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative">
                {!isExporting && (
                  <motion.div className="absolute -inset-2 rounded-2xl border border-dashed"
                    style={{ borderColor: 'hsl(38 90% 65% / 0.2)' }}
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
                )}
                <div className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center"
                  style={{ borderColor: `${S3_ACCENT.amber.text}40`, background: S3_ACCENT.amber.bg }}>
                  <Server className="w-9 h-9" style={{ color: S3_ACCENT.amber.text }} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black" style={{ color: S3_ACCENT.amber.text }}>API</p>
                <p className="text-xs text-white/50 mt-1">Application Interface</p>
                <p className="text-[10px] text-white/35 mt-2 leading-relaxed max-w-[200px] mx-auto">
                  Sistema envía datos a otro sistema. Requiere código.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
                style={{ borderColor: `${S3_ACCENT.amber.text}20`, background: `${S3_ACCENT.amber.text}06` }}>
                <span className="text-xs font-black" style={{ color: S3_ACCENT.amber.text }}>30 min+</span>
                <span className="text-[10px] text-white/40">setup</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Simplified comparison — 3 rows only */}
        <div className="max-w-3xl mx-auto space-y-1.5 mb-6">
          {ROWS.map((row, i) => (
            <motion.div key={i} {...m(0.35 + i * 0.06)}
              className="grid grid-cols-[100px_1fr_1fr] gap-2 group">
              <div className="px-3 py-2.5 rounded-lg border flex items-center"
                style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{row.cat}</span>
              </div>
              <div className={`px-4 py-2.5 rounded-lg border text-left transition-colors`}
                style={{
                  borderColor: row.highlight ? 'hsl(263 70% 60% / 0.25)' : 'hsl(0 0% 100% / 0.08)',
                  background: row.highlight ? 'hsl(263 70% 60% / 0.07)' : 'hsl(0 0% 100% / 0.02)',
                }}>
                <span className="text-sm text-white/70 font-medium">{row.mcp}</span>
              </div>
              <div className={`px-4 py-2.5 rounded-lg border text-left transition-colors`}
                style={{
                  borderColor: row.highlight ? 'hsl(38 90% 60% / 0.25)' : 'hsl(0 0% 100% / 0.08)',
                  background: row.highlight ? 'hsl(38 90% 60% / 0.07)' : 'hsl(0 0% 100% / 0.02)',
                }}>
                <span className="text-sm text-white/70 font-medium">{row.api}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom takeaway */}
        <motion.div {...m(0.55)} className="inline-flex items-center gap-2 text-xs text-white/45">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
          <span>Agente necesita datos → <span style={{ color: S3_ACCENT.violet.text }} className="font-semibold">MCP</span> · Sistema envía datos → <span style={{ color: S3_ACCENT.amber.text }} className="font-semibold">API</span></span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" hue={330} contextHint="cuándo usar MCP vs API" />
    </div>
  );
}
