import { motion } from 'framer-motion';
import { Cpu, Server, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const ROWS = [
  { cat: 'Para', mcp: 'Agentes ↔ Apps', api: 'App ↔ App' },
  { cat: 'Ideal', mcp: 'Contexto, poco volumen', api: 'Flujos directos, volumen' },
  { cat: 'Ejemplo', mcp: 'Consultar CRM desde Claude', api: 'Webhook Stripe → Slack' },
  { cat: 'Setup', mcp: '~2 min, plug & play', api: '30 min+, código necesario' },
  { cat: 'Ecosistema', mcp: '200+ servidores (Docker)', api: 'Miles de APIs públicas' },
];

export function S3Slide10MCPvsAPI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Atmosphere — radial gradients only */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_25%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_65%,_hsl(38_80%_55%_/_0.08),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_15%,_hsl(263_50%_50%_/_0.05),_transparent_50%)]" />
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
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(263 50% 60%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px hsl(263 70% 72% / 0.35))',
              }}
            >
              MCP
            </span>
            {' vs '}
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(38 90% 65%), hsl(38 70% 55%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px hsl(38 90% 65% / 0.35))',
              }}
            >
              API
            </span>
          </h1>
          {/* Accent line */}
          <motion.div
            className="h-[2px] rounded-full mx-auto mt-1.5 max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.7), hsl(38 90% 65% / 0.7), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
          />
        </motion.div>
        <motion.p {...m(0.1)} className="text-white/50 text-sm mt-2 mb-6 mx-auto">
          Dos formas de conectar — una para agentes, otra para sistemas
        </motion.p>

        {/* Visual VS: Two nodes */}
        <motion.div {...m(0.15)} className="flex items-center justify-center gap-10 mb-7">
          {/* MCP node */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {!isExporting && (
                <motion.div
                  className="absolute inset-[-5px] rounded-2xl border border-dashed"
                  style={{ borderColor: 'hsl(263 70% 72% / 0.25)' }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <div className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center relative z-10"
                style={{ borderColor: `${S3_ACCENT.violet.text}40`, background: S3_ACCENT.violet.bg }}>
                <Cpu className="w-8 h-8" style={{ color: S3_ACCENT.violet.text }} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-base font-black" style={{ color: S3_ACCENT.violet.text }}>MCP</p>
              <p className="text-[10px] text-white/40">Model Context Protocol</p>
            </div>
          </div>

          {/* VS divider */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-px h-6" style={{ background: 'linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.1), transparent)' }} />
            <span className="text-[11px] font-black text-white/45 tracking-wider">VS</span>
            <div className="w-px h-6" style={{ background: 'linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.1), transparent)' }} />
          </div>

          {/* API node */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {!isExporting && (
                <motion.div
                  className="absolute inset-[-5px] rounded-2xl border border-dashed"
                  style={{ borderColor: 'hsl(38 90% 65% / 0.25)' }}
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <div className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center relative z-10"
                style={{ borderColor: `${S3_ACCENT.amber.text}40`, background: S3_ACCENT.amber.bg }}>
                <Server className="w-8 h-8" style={{ color: S3_ACCENT.amber.text }} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-base font-black" style={{ color: S3_ACCENT.amber.text }}>API</p>
              <p className="text-[10px] text-white/40">Application Interface</p>
            </div>
          </div>
        </motion.div>

        {/* Comparison table */}
        <div className="max-w-3xl mx-auto">
          {/* Column headers */}
          <motion.div {...m(0.22)} className="grid grid-cols-[120px_1fr_1fr] gap-2 mb-2">
            <div />
            <div className="flex items-center justify-center gap-1.5">
              <Cpu className="w-3 h-3" style={{ color: S3_ACCENT.violet.text }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: S3_ACCENT.violet.text }}>MCP</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Server className="w-3 h-3" style={{ color: S3_ACCENT.amber.text }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: S3_ACCENT.amber.text }}>API</span>
            </div>
          </motion.div>

          {/* Rows */}
          <div className="space-y-1.5">
            {ROWS.map((row, i) => (
              <motion.div key={i} {...m(0.25 + i * 0.05)}
                className="grid grid-cols-[120px_1fr_1fr] gap-2 group">
                <div className="px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{row.cat}</span>
                </div>
                <div className="px-4 py-3 rounded-lg border transition-colors group-hover:border-violet-500/20 group-hover:bg-violet-500/[0.03] border-white/[0.08] bg-white/[0.02] relative overflow-hidden">
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 60% 60% / 0.06) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                    />
                  )}
                  <span className="text-sm text-white/60 relative z-10">{row.mcp}</span>
                </div>
                <div className="px-4 py-3 rounded-lg border transition-colors group-hover:border-amber-500/20 group-hover:bg-amber-500/[0.03] border-white/[0.08] bg-white/[0.02] relative overflow-hidden">
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(38 60% 60% / 0.06) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                    />
                  )}
                  <span className="text-sm text-white/60 relative z-10">{row.api}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div {...m(0.55)} className="mt-6 inline-flex items-center gap-2 text-xs text-white/45">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
          <span>Agente necesita datos → <span style={{ color: S3_ACCENT.violet.text }} className="font-semibold">MCP</span> · Sistema envía datos → <span style={{ color: S3_ACCENT.amber.text }} className="font-semibold">API</span></span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} contextHint="cuándo usar MCP vs API" />
    </div>
  );
}
