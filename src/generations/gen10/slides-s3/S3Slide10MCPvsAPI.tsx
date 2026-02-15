import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, ArrowLeftRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const COMPARISON = [
  { category: 'Diseñado para', mcp: 'Agentes ↔ Aplicaciones', api: 'Aplicación ↔ Aplicación' },
  { category: 'Ideal para', mcp: 'Contexto, pequeños volúmenes', api: 'Flujos directos, grandes volúmenes' },
  { category: 'Ejemplo', mcp: 'Consultar tu CRM desde Claude', api: 'Migración masiva de datos' },
  { category: 'Complejidad', mcp: 'Baja — plug and play', api: 'Media/Alta — requiere desarrollo' },
  { category: 'Volumen de datos', mcp: 'Pequeño a mediano', api: 'Ilimitado' },
];

export function S3Slide10MCPvsAPI() {
  const { isExporting } = useExportContext();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_30%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_65%,_hsl(38_80%_55%_/_0.07),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={38} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3"
            style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>
              Conexiones y Datos
            </span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            <span className="text-violet-400">MCP</span> vs <span className="text-amber-400">API</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Dos formas de conectar. Una para agentes, otra para sistemas.</p>
        </motion.div>

        {/* Headers */}
        <motion.div {...m(0.1)} className="grid grid-cols-[200px_1fr_1fr] gap-3 mb-3">
          <div />
          <div className="p-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.04] text-center">
            <div className="flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-bold text-violet-300">MCP</span>
            </div>
            <p className="text-[10px] text-violet-300/50 mt-0.5">Model Context Protocol</p>
          </div>
          <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] text-center">
            <div className="flex items-center justify-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-300">API</span>
            </div>
            <p className="text-[10px] text-amber-300/50 mt-0.5">Application Programming Interface</p>
          </div>
        </motion.div>

        {/* Rows */}
        <div className="space-y-2">
          {COMPARISON.map((row, i) => (
            <motion.div
              key={i}
              {...m(0.2 + i * 0.1)}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`grid grid-cols-[200px_1fr_1fr] gap-3 transition-all duration-200 ${
                hoveredRow === i ? 'scale-[1.02]' : ''
              }`}
              style={
                hoveredRow === i
                  ? { boxShadow: '0 0 40px -8px hsl(263 60% 55% / 0.15), 0 0 40px -8px hsl(38 90% 55% / 0.12)' }
                  : undefined
              }
            >
              <div className="p-3 rounded-lg border border-white/[0.04] bg-white/[0.02] flex items-center">
                <span className="text-xs font-bold text-white/50 uppercase tracking-wider">{row.category}</span>
              </div>
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  hoveredRow === i ? 'border-violet-500/20 bg-violet-500/[0.04]' : 'border-white/[0.04] bg-white/[0.02]'
                }`}
              >
                <span className="text-sm text-white/60">{row.mcp}</span>
              </div>
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  hoveredRow === i ? 'border-amber-500/20 bg-amber-500/[0.04]' : 'border-white/[0.04] bg-white/[0.02]'
                }`}
              >
                <span className="text-sm text-white/60">{row.api}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom insight — visual diagram */}
        <motion.div {...m(0.6)} className="mt-6 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] max-w-2xl mx-auto">
          <p className="text-[10px] text-white/25 uppercase tracking-[0.15em] font-bold text-center mb-4">Regla simple</p>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: S3_ACCENT.violet.bg, border: `1px solid ${S3_ACCENT.violet.border}` }}
              >
                <Cpu className="w-5 h-5" style={{ color: S3_ACCENT.violet.text }} />
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: `${S3_ACCENT.violet.text}cc` }}>Agente necesita datos</p>
                <p className="text-[10px] font-bold" style={{ color: S3_ACCENT.violet.text }}>→ MCP</p>
              </div>
            </div>
            <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, hsl(263 50% 50% / 0.15), hsl(38 80% 55% / 0.15))' }} />
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: S3_ACCENT.amber.bg, border: `1px solid ${S3_ACCENT.amber.border}` }}
              >
                <Server className="w-5 h-5" style={{ color: S3_ACCENT.amber.text }} />
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: `${S3_ACCENT.amber.text}cc` }}>Sistema envía datos</p>
                <p className="text-[10px] font-bold" style={{ color: S3_ACCENT.amber.text }}>→ API</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CONEXIONES Y DATOS" hue={38} />
    </div>
  );
}
