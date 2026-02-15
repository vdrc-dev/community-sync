import { motion } from 'framer-motion';
import { Cpu, Server, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const ROWS = [
  { cat: 'Para', mcp: 'Agentes ↔ Apps', api: 'App ↔ App' },
  { cat: 'Ideal', mcp: 'Contexto, poco volumen', api: 'Flujos directos, volumen' },
  { cat: 'Ejemplo', mcp: 'Consultar CRM desde Claude', api: 'Migración masiva' },
  { cat: 'Complejidad', mcp: 'Baja — plug & play', api: 'Media/Alta' },
];

export function S3Slide10MCPvsAPI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_30%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_65%,_hsl(38_80%_55%_/_0.07),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={38} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Cpu className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Conexiones y Datos</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          <span style={{ color: S3_ACCENT.violet.text }}>MCP</span> vs <span style={{ color: S3_ACCENT.amber.text }}>API</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-12 max-w-md mx-auto">
          Dos formas de conectar — una para agentes, otra para sistemas
        </motion.p>

        {/* Visual VS: Two large nodes */}
        <motion.div {...m(0.2)} className="flex items-center justify-center gap-12 mb-10">
          {/* MCP */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-3xl border-2 flex items-center justify-center"
              style={{ borderColor: S3_ACCENT.violet.dot, background: S3_ACCENT.violet.bg }}>
              <Cpu className="w-10 h-10" style={{ color: S3_ACCENT.violet.text }} />
            </div>
            <div>
              <p className="text-lg font-black" style={{ color: S3_ACCENT.violet.text }}>MCP</p>
              <p className="text-[10px] text-white/25">Model Context Protocol</p>
            </div>
          </div>

          {/* VS divider */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.1), transparent)' }} />
            <span className="text-xs font-black text-white/15">VS</span>
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.1), transparent)' }} />
          </div>

          {/* API */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-3xl border-2 flex items-center justify-center"
              style={{ borderColor: S3_ACCENT.amber.dot, background: S3_ACCENT.amber.bg }}>
              <Server className="w-10 h-10" style={{ color: S3_ACCENT.amber.text }} />
            </div>
            <div>
              <p className="text-lg font-black" style={{ color: S3_ACCENT.amber.text }}>API</p>
              <p className="text-[10px] text-white/25">Application Interface</p>
            </div>
          </div>
        </motion.div>

        {/* Comparison rows */}
        <div className="space-y-2 max-w-3xl mx-auto">
          {ROWS.map((row, i) => (
            <motion.div key={i} {...m(0.3 + i * 0.06)}
              className="grid grid-cols-[140px_1fr_1fr] gap-2 group">
              <div className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.02] flex items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{row.cat}</span>
              </div>
              <div className="p-3 rounded-lg border transition-colors group-hover:border-violet-500/20 group-hover:bg-violet-500/[0.03] border-white/[0.04] bg-white/[0.02]">
                <span className="text-sm text-white/55">{row.mcp}</span>
              </div>
              <div className="p-3 rounded-lg border transition-colors group-hover:border-amber-500/20 group-hover:bg-amber-500/[0.03] border-white/[0.04] bg-white/[0.02]">
                <span className="text-sm text-white/55">{row.api}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...m(0.6)} className="mt-10 inline-flex items-center gap-2 text-xs text-white/25">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agente necesita datos → <span style={{ color: S3_ACCENT.violet.text }} className="font-semibold">MCP</span> · Sistema envía datos → <span style={{ color: S3_ACCENT.amber.text }} className="font-semibold">API</span></span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} />
    </div>
  );
}
