import { motion } from 'framer-motion';
import { Cpu, Server, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import bgMCP from '@/assets/gen10-s3/bg-mcp-vs-api.jpg';

const ROWS = [
  { cat: 'Para', mcp: 'Agentes ↔ Apps', api: 'App ↔ App' },
  { cat: 'Ideal', mcp: 'Contexto, poco volumen', api: 'Flujos directos, volumen' },
  { cat: 'Ejemplo', mcp: 'Consultar CRM desde Claude', api: 'Webhook Stripe → Slack' },
  { cat: 'Setup', mcp: '~2 min, plug & play', api: '30 min+, código necesario' },
  { cat: 'Ecosistema', mcp: '200+ servidores (Docker)', api: 'Miles de APIs públicas' },
];

const FLOATING_PILLS = [
  { label: 'plug & play', left: '10%', top: '20%', delay: 0 },
  { label: 'REST', left: '85%', top: '24%', delay: 0.4 },
  { label: 'agents', left: '82%', top: '62%', delay: 0.8 },
];

export function S3Slide10MCPvsAPI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgMCP} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_30%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_65%,_hsl(38_80%_55%_/_0.07),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={38} tertiaryHue={185} />
      </div>

      {/* Floating decorative pills */}
      {!isExporting && FLOATING_PILLS.map((pill, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider pointer-events-none"
          style={{
            borderColor: i === 0 ? 'hsl(263 60% 55% / 0.25)' : i === 1 ? 'hsl(38 90% 55% / 0.25)' : 'hsl(263 60% 55% / 0.2)',
            background: i === 0 ? 'hsl(263 60% 55% / 0.06)' : i === 1 ? 'hsl(38 90% 55% / 0.06)' : 'hsl(263 60% 55% / 0.05)',
            color: i === 1 ? 'hsl(38 85% 65%)' : 'hsl(263 60% 75%)',
            left: pill.left,
            top: pill.top,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: pill.delay }}
        >
          {pill.label}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Cpu className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Conexiones y Datos</span>
          </div>
        </motion.div>

        <motion.div {...m(0.08)}>
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
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
          <motion.div
            className="h-0.5 rounded-full mx-auto mt-1 max-w-[200px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.8), hsl(38 90% 65% / 0.8), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
          />
        </motion.div>
        <motion.p {...m(0.15)} className="text-white/45 text-lg mb-14 max-w-md mx-auto">
          Dos formas de conectar — una para agentes, otra para sistemas
        </motion.p>

        {/* Visual VS: Two large nodes with orbital rings */}
        <motion.div {...m(0.2)} className="flex items-center justify-center gap-12 mb-10">
          {/* MCP */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {!isExporting && (
                <motion.div
                  className="absolute inset-[-6px] rounded-3xl border-2"
                  style={{ borderColor: 'hsl(263 70% 72% / 0.35)' }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                />
              )}
              {!isExporting && (
                <motion.div
                  className="absolute inset-[-12px] rounded-3xl border"
                  style={{ borderColor: 'hsl(263 60% 60% / 0.2)' }}
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <div className="w-24 h-24 rounded-3xl border-2 flex items-center justify-center relative z-10"
                style={{ borderColor: S3_ACCENT.violet.dot, background: S3_ACCENT.violet.bg }}>
                <Cpu className="w-10 h-10" style={{ color: S3_ACCENT.violet.text }} />
              </div>
            </div>
            <div>
              <p className="text-lg font-black" style={{ color: S3_ACCENT.violet.text }}>MCP</p>
              <p className="text-[10px] text-white/40">Model Context Protocol</p>
            </div>
          </div>

          {/* VS divider — subtle scale pulse */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.1), transparent)' }} />
            <motion.span
              className="text-xs font-black text-white/30"
              {...(isExporting ? {} : { animate: { scale: [1, 1.08, 1] }, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } })}
            >
              VS
            </motion.span>
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.1), transparent)' }} />
          </div>

          {/* API */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {!isExporting && (
                <motion.div
                  className="absolute inset-[-6px] rounded-3xl border-2"
                  style={{ borderColor: 'hsl(38 90% 65% / 0.35)' }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                />
              )}
              {!isExporting && (
                <motion.div
                  className="absolute inset-[-12px] rounded-3xl border"
                  style={{ borderColor: 'hsl(38 80% 55% / 0.2)' }}
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <div className="w-24 h-24 rounded-3xl border-2 flex items-center justify-center relative z-10"
                style={{ borderColor: S3_ACCENT.amber.dot, background: S3_ACCENT.amber.bg }}>
                <Server className="w-10 h-10" style={{ color: S3_ACCENT.amber.text }} />
              </div>
            </div>
            <div>
              <p className="text-lg font-black" style={{ color: S3_ACCENT.amber.text }}>API</p>
              <p className="text-[10px] text-white/40">Application Interface</p>
            </div>
          </div>
        </motion.div>

        {/* Comparison rows with shimmer on hover */}
        <div className="space-y-2 max-w-3xl mx-auto">
          {ROWS.map((row, i) => (
            <motion.div key={i} {...m(0.3 + i * 0.06)}
              className="grid grid-cols-[140px_1fr_1fr] gap-2 group">
              <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{row.cat}</span>
              </div>
              <div className="p-3 rounded-lg border transition-colors group-hover:border-violet-500/20 group-hover:bg-violet-500/[0.03] border-white/[0.08] bg-white/[0.02] relative overflow-hidden">
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(105deg, transparent 35%, hsl(263 60% 60% / 0.08) 50%, transparent 65%)',
                    }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                  />
                )}
                <span className="text-sm text-white/55 relative z-10">{row.mcp}</span>
              </div>
              <div className="p-3 rounded-lg border transition-colors group-hover:border-amber-500/20 group-hover:bg-amber-500/[0.03] border-white/[0.08] bg-white/[0.02] relative overflow-hidden">
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(105deg, transparent 35%, hsl(38 60% 60% / 0.08) 50%, transparent 65%)',
                    }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                  />
                )}
                <span className="text-sm text-white/55 relative z-10">{row.api}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...m(0.6)} className="mt-10 inline-flex items-center gap-2 text-xs text-white/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agente necesita datos → <span style={{ color: S3_ACCENT.violet.text }} className="font-semibold">MCP</span> · Sistema envía datos → <span style={{ color: S3_ACCENT.amber.text }} className="font-semibold">API</span></span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} contextHint="cuándo usar MCP vs API" />
    </div>
  );
}
