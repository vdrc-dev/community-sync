import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, BarChart3, Layers, Sparkles, ArrowRight, CheckCircle2, Clock, Zap, Star, ExternalLink, ChevronRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS = [
  {
    name: 'Gamma',
    tagline: 'Texto → Presentación completa',
    icon: Presentation,
    accent: S3_ACCENT.violet,
    badge: '⭐ Recomendado',
    price: 'Gratis (400 créditos)',
    speed: '~30 seg',
    pros: ['Exporta a PPTX/PDF', 'Diseño profesional auto', 'Embeds interactivos'],
    bestFor: 'Presentaciones de negocio, pitch decks, reportes',
    workflow: 'Pega tu outline → selecciona tema → genera → edita inline',
  },
  {
    name: 'Napkin AI',
    tagline: 'Texto → Infografías pro',
    icon: BarChart3,
    accent: S3_ACCENT.amber,
    badge: null,
    price: 'Gratis (100 visuals/mes)',
    speed: '~15 seg',
    pros: ['Diagramas de flujo', 'Timelines automáticos', 'Exporta SVG/PNG'],
    bestFor: 'LinkedIn, newsletters, documentación visual',
    workflow: 'Pega texto → elige estilo visual → exporta para redes',
  },
  {
    name: 'Beautiful.ai',
    tagline: 'Plantillas inteligentes',
    icon: Layers,
    accent: S3_ACCENT.cyan,
    badge: null,
    price: '$12/mes (Pro)',
    speed: '~45 seg',
    pros: ['Auto-layout perfecto', 'Brand kit integrado', '100+ smart templates'],
    bestFor: 'Equipos corporativos, presentaciones recurrentes',
    workflow: 'Selecciona template → llena datos → auto-ajusta layout',
  },
];

const COMPARISON = [
  { feature: 'Precio', gamma: '✅ Gratis', napkin: '✅ Gratis', beautiful: '💰 $12/mes' },
  { feature: 'Output', gamma: 'Slides', napkin: 'Infografías', beautiful: 'Slides' },
  { feature: 'Exportar', gamma: 'PPTX/PDF', napkin: 'SVG/PNG', beautiful: 'PPTX/PDF' },
  { feature: 'Interactivo', gamma: '✅ Sí', napkin: '❌ No', beautiful: '✅ Sí' },
  { feature: 'AI Gen', gamma: '✅ Full', napkin: '✅ Full', beautiful: '⚡ Parcial' },
];

const WORKFLOW_STEPS = [
  { num: '1', tool: 'ChatGPT/Claude', action: 'Genera el outline', accent: S3_ACCENT.emerald },
  { num: '2', tool: 'Napkin AI', action: 'Crea los diagramas', accent: S3_ACCENT.amber },
  { num: '3', tool: 'Gamma', action: 'Arma la presentación', accent: S3_ACCENT.violet },
  { num: '4', tool: 'Canva/PPTX', action: 'Ajustes finales', accent: S3_ACCENT.cyan },
];

export function S3Slide07PresentationAI() {
  const { isExporting } = useExportContext();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_65%,_hsl(280_55%_50%_/_0.07),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={280} tertiaryHue={38} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <motion.div {...m(0)} className="flex items-center gap-3">
            <div className="w-1.5 h-10 rounded-full" style={{ background: `linear-gradient(180deg, ${S3_ACCENT.violet.text}, ${S3_ACCENT.amber.text})` }} />
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">Creación Digital</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight leading-none">
                Presentaciones con{' '}
                <span style={{
                  background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(38 80% 65%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>IA</span>
              </h1>
            </div>
          </motion.div>
          <motion.p {...m(0.05)} className="text-white/25 text-sm max-w-xs text-right mt-2">
            De ideas a entregables visuales en minutos — sin tocar diseño
          </motion.p>
        </div>

        {/* Main: 3 tool cards */}
        <div className="grid grid-cols-3 gap-4 mb-4 flex-1 min-h-0">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            const isActive = activeCard === i;
            return (
              <motion.div
                key={i}
                {...m(0.1 + i * 0.08)}
                className="relative rounded-2xl border overflow-hidden flex flex-col cursor-pointer"
                style={{
                  borderColor: isActive ? tool.accent.text + '40' : tool.accent.border,
                  background: tool.accent.bg,
                  boxShadow: isActive && !isExporting ? `0 0 30px ${tool.accent.glow}` : undefined,
                }}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Shimmer */}
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 35%, ${tool.accent.text}12 50%, transparent 65%)` }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
                  />
                )}

                <div className="relative p-5 flex flex-col flex-1">
                  {/* Top: icon + name + badge */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0"
                      style={{ borderColor: `${tool.accent.text}25`, background: `${tool.accent.text}08` }}>
                      <Icon className="w-6 h-6" style={{ color: tool.accent.text }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-black text-white">{tool.name}</p>
                        {tool.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[7px] font-black tracking-wider"
                            style={{ background: tool.accent.dot, color: '#04030a' }}>{tool.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-white/35">{tool.tagline}</p>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1.5 text-[9px]">
                      <Clock className="w-3 h-3 text-white/20" />
                      <span className="text-white/30 font-medium">{tool.speed}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px]">
                      <Zap className="w-3 h-3 text-white/20" />
                      <span className="text-white/30 font-medium">{tool.price}</span>
                    </div>
                  </div>

                  {/* Pros */}
                  <div className="space-y-1.5 mb-3">
                    {tool.pros.map((pro, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: `${tool.accent.text}70` }} />
                        <span className="text-[10px] text-white/40">{pro}</span>
                      </div>
                    ))}
                  </div>

                  {/* Best for */}
                  <div className="mt-auto pt-3 border-t" style={{ borderColor: `${tool.accent.text}10` }}>
                    <p className="text-[8px] text-white/20 uppercase tracking-wider font-bold mb-1">Ideal para</p>
                    <p className="text-[10px] text-white/35 leading-relaxed">{tool.bestFor}</p>
                  </div>

                  {/* Expandable workflow on hover */}
                  <AnimatePresence>
                    {isActive && !isExporting && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3 pt-3 border-t"
                        style={{ borderColor: `${tool.accent.text}10` }}
                      >
                        <p className="text-[8px] text-white/20 uppercase tracking-wider font-bold mb-1.5">Workflow</p>
                        <p className="text-[10px] font-mono leading-relaxed" style={{ color: `${tool.accent.text}80` }}>
                          {tool.workflow}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom: Comparison table + Workflow pipeline */}
        <div className="grid grid-cols-2 gap-4">
          {/* Mini comparison */}
          <motion.div {...m(0.4)} className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
            <p className="text-[9px] text-white/25 uppercase tracking-wider font-bold mb-2.5">Comparativa rápida</p>
            <div className="space-y-0">
              {/* Header row */}
              <div className="grid grid-cols-4 gap-2 pb-1.5 border-b border-white/[0.06]">
                <span className="text-[8px] text-white/15 font-bold"></span>
                {['Gamma', 'Napkin', 'Beautiful'].map(name => (
                  <span key={name} className="text-[8px] text-white/30 font-bold text-center">{name}</span>
                ))}
              </div>
              {COMPARISON.map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 py-1.5 border-b border-white/[0.03]">
                  <span className="text-[8px] text-white/25 font-semibold">{row.feature}</span>
                  <span className="text-[8px] text-white/35 text-center">{row.gamma}</span>
                  <span className="text-[8px] text-white/35 text-center">{row.napkin}</span>
                  <span className="text-[8px] text-white/35 text-center">{row.beautiful}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Workflow pipeline */}
          <motion.div {...m(0.45)} className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400/50" />
              <p className="text-[9px] text-white/25 uppercase tracking-wider font-bold">Workflow Recomendado</p>
            </div>
            <div className="flex items-center gap-2">
              {WORKFLOW_STEPS.map((step, i) => (
                <motion.div key={i} {...m(0.5 + i * 0.05)} className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border flex-1 min-w-0"
                    style={{ borderColor: step.accent.border, background: step.accent.bg }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                      style={{ background: `${step.accent.text}20`, color: step.accent.text }}>
                      {step.num}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[8px] font-bold truncate" style={{ color: step.accent.text }}>{step.tool}</p>
                      <p className="text-[7px] text-white/25 truncate">{step.action}</p>
                    </div>
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-white/10 shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
            <motion.p {...m(0.7)} className="text-[9px] text-white/15 mt-3 italic text-center">
              💡 Tip: Usa Claude para generar el outline con estructura de consultoría (situación → complicación → resolución)
            </motion.p>
          </motion.div>
        </div>
      </div>

      <S3Footer sectionLabel="CREACIÓN DIGITAL" hue={263} />
    </div>
  );
}
