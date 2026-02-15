import { useState } from 'react';
import { motion } from 'framer-motion';
import { Presentation, BarChart3, Layers, Sparkles, CheckCircle2, Clock, Zap, ChevronRight, ExternalLink, Image, FileText } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS = [
  {
    name: 'Gamma',
    tagline: 'Texto → Presentación',
    icon: Presentation,
    accent: S3_ACCENT.violet,
    badge: '⭐ Top',
    price: 'Gratis · 400 créditos',
    speed: '~30s',
    pros: ['Exporta PPTX/PDF', 'Diseño pro automático', 'Embeds interactivos', 'Importa docs existentes'],
    bestFor: 'Pitch decks, reportes, clases',
    prompt: '"Crea una presentación sobre X con 10 slides"',
  },
  {
    name: 'Napkin AI',
    tagline: 'Texto → Infografías',
    icon: BarChart3,
    accent: S3_ACCENT.amber,
    badge: null,
    price: 'Gratis · 100/mes',
    speed: '~15s',
    pros: ['Diagramas de flujo auto', 'Timelines inteligentes', 'Exporta SVG/PNG HD', 'Estilos personalizables'],
    bestFor: 'LinkedIn, docs, newsletters',
    prompt: '"Pega tu texto → selecciona visual → exporta"',
  },
  {
    name: 'Beautiful.ai',
    tagline: 'Templates inteligentes',
    icon: Layers,
    accent: S3_ACCENT.cyan,
    badge: null,
    price: '$12/mes Pro',
    speed: '~45s',
    pros: ['Auto-layout perfecto', 'Brand kit integrado', '100+ smart templates', 'Colaboración en equipo'],
    bestFor: 'Equipos corporativos',
    prompt: '"Selecciona template → llena datos → auto-ajusta"',
  },
];

const COMPARISON = [
  { feature: 'Precio', vals: ['✅ Gratis', '✅ Gratis', '💰 $12/mes'] },
  { feature: 'Output', vals: ['Slides', 'Infografías', 'Slides'] },
  { feature: 'Exportar', vals: ['PPTX/PDF', 'SVG/PNG', 'PPTX/PDF'] },
  { feature: 'AI Gen', vals: ['✅ Full', '✅ Full', '⚡ Parcial'] },
  { feature: 'Interactivo', vals: ['✅ Sí', '❌ No', '✅ Sí'] },
];

const WORKFLOW_STEPS = [
  { num: '1', tool: 'Claude', action: 'Genera outline', accent: S3_ACCENT.emerald },
  { num: '2', tool: 'Napkin', action: 'Diagramas', accent: S3_ACCENT.amber },
  { num: '3', tool: 'Gamma', action: 'Slides', accent: S3_ACCENT.violet },
  { num: '4', tool: 'Canva', action: 'Ajustes', accent: S3_ACCENT.cyan },
];

export function S3Slide07PresentationAI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_65%,_hsl(280_55%_50%_/_0.07),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={6} primaryHue={263} secondaryHue={280} tertiaryHue={38} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 shrink-0">
          <motion.div {...m(0)} className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full" style={{ background: `linear-gradient(180deg, ${S3_ACCENT.violet.text}, ${S3_ACCENT.amber.text})` }} />
            <div>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/25">Creación Digital</span>
              <h1 className="text-3xl font-black text-white tracking-tight leading-none">
                Presentaciones con{' '}
                <span style={{
                  background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(38 80% 65%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>IA</span>
              </h1>
            </div>
          </motion.div>
          <motion.p {...m(0.05)} className="text-white/20 text-xs max-w-[220px] text-right">
            De ideas a slides profesionales — sin tocar diseño
          </motion.p>
        </div>

        {/* Main grid: 3 tool cards + comparison + workflow */}
        <div className="flex-1 flex flex-col gap-2 min-h-0">
          {/* Row 1: 3 Tool Cards */}
          <div className="grid grid-cols-3 gap-2">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              return (
              <motion.div
                  key={i}
                  {...m(0.08 + i * 0.06)}
                  className="relative rounded-xl border overflow-hidden group"
                  style={{ borderColor: tool.accent.border, background: tool.accent.bg }}
              >
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${tool.accent.text}10 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
                    />
                  )}
                  {/* Hover glow */}
                  {!isExporting && (
                    <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                      style={{ background: tool.accent.glow }} />
                  )}

                  <div className="relative p-4">
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0"
                        style={{ borderColor: `${tool.accent.text}25`, background: `${tool.accent.text}08` }}>
                        <Icon className="w-5 h-5" style={{ color: tool.accent.text }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-base font-black text-white">{tool.name}</p>
                          {tool.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[6px] font-black"
                              style={{ background: tool.accent.dot, color: '#04030a' }}>{tool.badge}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-white/30">{tool.tagline}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 text-[9px]">
                        <Clock className="w-3 h-3 text-white/15" />
                        <span className="text-white/25">{tool.speed}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px]">
                        <Zap className="w-3 h-3 text-white/15" />
                        <span className="text-white/25">{tool.price}</span>
                      </div>
                    </div>

                    {/* Pros */}
                    <div className="space-y-1">
                      {tool.pros.map((pro, j) => (
                        <div key={j} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: `${tool.accent.text}60` }} />
                          <span className="text-[10px] text-white/40">{pro}</span>
                        </div>
                      ))}
                    </div>

                    {/* Best for */}
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: `${tool.accent.text}10` }}>
                      <p className="text-[7px] text-white/15 uppercase tracking-wider font-bold mb-0.5">Ideal para</p>
                      <p className="text-[10px] text-white/30">{tool.bestFor}</p>
                    </div>

                    {/* Prompt example */}
                    <div className="mt-2 px-3 py-2 rounded-lg border" style={{ borderColor: `${tool.accent.text}10`, background: `${tool.accent.text}04` }}>
                      <p className="text-[8px] text-white/15 font-bold mb-0.5">PROMPT</p>
                      <p className="text-[9px] font-mono leading-relaxed" style={{ color: `${tool.accent.text}70` }}>{tool.prompt}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Row 2: Comparison + Workflow */}
          <div className="grid grid-cols-5 gap-3 shrink-0">
            {/* Comparison */}
            <motion.div {...m(0.35)} className="col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
              <p className="text-[8px] text-white/20 uppercase tracking-wider font-bold mb-2">Comparativa</p>
              <div className="grid grid-cols-4 gap-1 pb-1.5 border-b border-white/[0.06]">
                <span></span>
                {['Gamma', 'Napkin', 'Beautiful'].map(n => (
                  <span key={n} className="text-[7px] text-white/25 font-bold text-center">{n}</span>
                ))}
              </div>
              {COMPARISON.map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-1 py-1 border-b border-white/[0.02]">
                  <span className="text-[7px] text-white/20 font-semibold">{row.feature}</span>
                  {row.vals.map((v, j) => (
                    <span key={j} className="text-[7px] text-white/30 text-center">{v}</span>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* Workflow */}
            <motion.div {...m(0.4)} className="col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 flex flex-col">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3 h-3 text-amber-400/50" />
                <p className="text-[8px] text-white/20 uppercase tracking-wider font-bold">Workflow Recomendado</p>
              </div>
              <div className="flex items-center gap-1.5">
                {WORKFLOW_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border flex-1 min-w-0"
                      style={{ borderColor: step.accent.border, background: step.accent.bg }}>
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black shrink-0"
                        style={{ background: `${step.accent.text}20`, color: step.accent.text }}>
                        {step.num}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[8px] font-bold truncate" style={{ color: step.accent.text }}>{step.tool}</p>
                        <p className="text-[6px] text-white/20 truncate">{step.action}</p>
                      </div>
                    </div>
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <ChevronRight className="w-2.5 h-2.5 text-white/10 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-white/15 mt-2 italic">
                💡 Usa Claude para el outline: situación → complicación → resolución
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <S3Footer sectionLabel="CREACIÓN DIGITAL" hue={263} />
    </div>
  );
}
