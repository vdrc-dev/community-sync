import { motion } from 'framer-motion';
import { Presentation, BarChart3, Layers, Sparkles, ChevronRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS = [
  {
    name: 'Gamma',
    tagline: 'Texto → Slides',
    icon: Presentation,
    hue: 263,
    accent: S3_ACCENT.violet,
    badge: 'TOP',
    speed: '30s',
    price: 'Free / $8',
    output: 'PPTX / PDF / Slides',
    highlight: 'Agente IA · API (Zapier/Make) · Diagramas inteligentes',
    href: 'https://gamma.app',
  },
  {
    name: 'Napkin AI',
    tagline: 'Texto → Infografías',
    icon: BarChart3,
    hue: 38,
    accent: S3_ACCENT.amber,
    badge: null,
    speed: '15s',
    price: 'Free / $9',
    output: 'SVG / PNG / PPT',
    highlight: 'Flowcharts + diagramas · Exporta SVG/PNG',
    href: 'https://napkin.ai',
  },
  {
    name: 'Beautiful.ai',
    tagline: 'Templates inteligentes',
    icon: Layers,
    hue: 185,
    accent: S3_ACCENT.cyan,
    badge: null,
    speed: '45s',
    price: '$12/mes',
    output: 'PPTX / PDF',
    highlight: 'Plantillas auto-ajustables · Brand kit integrado',
    href: 'https://beautiful.ai',
  },
];

const WORKFLOW = [
  { tool: 'Coolors', action: 'Paleta', accent: S3_ACCENT.rose, href: 'https://coolors.co' },
  { tool: 'Claude', action: 'Outline', accent: S3_ACCENT.emerald, href: 'https://claude.ai' },
  { tool: 'Napkin', action: 'Diagramas', accent: S3_ACCENT.amber, href: 'https://napkin.ai' },
  { tool: 'Gamma', action: 'Slides', accent: S3_ACCENT.violet, href: 'https://gamma.app' },
  { tool: 'Canva', action: 'Ajustes', accent: S3_ACCENT.cyan, href: 'https://canva.com' },
];

export function S3Slide07PresentationAI() {
  const { isExporting } = useExportContext();
  const m = (d: number) => s3Motion(d, isExporting);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Background — radial gradients only */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_25%,_hsl(263_55%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_75%_70%,_hsl(38_80%_50%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_85%_20%,_hsl(185_70%_45%_/_0.05),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={38} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full py-16">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/45 block mb-2">
            Herramientas de Creación
          </span>
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
            Presentaciones con{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(38 85% 65%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px hsl(263 65% 55% / 0.35))',
              }}
            >
              IA
            </span>
          </h1>
          <motion.div
            className="h-0.5 rounded-full mx-auto max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 65% 60% / 0.5), hsl(38 85% 60% / 0.5), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: S3_EASE }}
          />
          <motion.p {...m(0.1)} className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            De ideas a slides profesionales — sin tocar diseño
          </motion.p>
        </motion.div>

        {/* 3 Hero Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                {...m(0.15 + i * 0.08)}
                className="relative rounded-2xl border overflow-hidden group"
                style={{ borderColor: tool.accent.border, background: tool.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.02, y: -4 } })}
              >
                {/* Shimmer */}
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 40%, ${tool.accent.text}08 55%, transparent 70%)` }}
                    animate={{ x: ['-200%', '300%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
                  />
                )}

                <div className="relative p-5 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="relative mb-4">
                    <div
                      className="relative w-14 h-14 rounded-xl border-2 flex items-center justify-center"
                      style={{
                        borderColor: `${tool.accent.text}30`,
                        background: `${tool.accent.text}08`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tool.accent.text }} />
                    </div>
                  </div>

                  {/* Name + badge */}
                  <div className="flex items-center gap-2 mb-1">
                    <a href={tool.href} target="_blank" rel="noopener noreferrer"
                      className="text-xl font-black text-white hover:underline underline-offset-4 decoration-1 transition-colors"
                      style={{ textDecorationColor: tool.accent.text }}>{tool.name}</a>
                    {tool.badge && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-black"
                        style={{ background: tool.accent.dot, color: '#04030a' }}
                      >
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/45 mb-4">{tool.tagline}</p>

                  {/* Key stat row */}
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-base font-black" style={{ color: tool.accent.text }}>{tool.speed}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Genera</p>
                    </div>
                    <div className="w-px h-6" style={{ background: `${tool.accent.text}20` }} />
                    <div className="text-center">
                      <p className="text-base font-black" style={{ color: tool.accent.text }}>{tool.price}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Precio</p>
                    </div>
                  </div>

                  {/* Output format chip */}
                  <div
                    className="px-3 py-1.5 rounded-lg border text-[10px] font-semibold mb-2"
                    style={{ borderColor: `${tool.accent.text}20`, color: `${tool.accent.text}90`, background: `${tool.accent.text}06` }}
                  >
                    {tool.output}
                  </div>

                  {/* Highlight */}
                  <p className="text-[11px] text-white/40">{tool.highlight}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Workflow Pipeline */}
        <motion.div {...m(0.45)} className="flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/50 mr-1" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mr-3">Workflow</span>
          {WORKFLOW.map((step, i) => (
            <div key={step.tool} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl border"
                style={{ borderColor: step.accent.border, background: step.accent.bg }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                  style={{ background: `${step.accent.text}25`, color: step.accent.text }}
                >
                  {i + 1}
                </span>
                <div>
                  <a href={step.href} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-bold hover:underline underline-offset-2 transition-colors"
                    style={{ color: step.accent.text }}>{step.tool}</a>
                  <p className="text-[10px] text-white/40">{step.action}</p>
                </div>
              </div>
              {i < WORKFLOW.length - 1 && (
                <ChevronRight className="w-3 h-3 text-white/30" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <S3Footer sectionLabel="CREACIÓN DIGITAL" hue={263} contextHint="slides con Gamma y Beautiful.ai" />
    </div>
  );
}
