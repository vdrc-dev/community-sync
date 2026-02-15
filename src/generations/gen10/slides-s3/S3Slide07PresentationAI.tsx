import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, BarChart3, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS = [
  {
    name: 'Gamma',
    tagline: 'De texto a presentación en segundos',
    desc: 'Copia y pega tu contenido → Gamma lo convierte en diapositivas organizadas automáticamente. Ajusta títulos e imágenes y listo.',
    features: ['Agente IA que genera presentaciones', 'Diagramas inteligentes', 'API para automatización (Zapier/Make)', 'Plantillas y temas personalizables'],
    color: 'hsl(280 70% 60%)',
    icon: Presentation,
    url: 'gamma.app',
    badge: 'Recomendado',
  },
  {
    name: 'Beautiful.ai',
    tagline: 'Plantillas inteligentes con auto-diseño',
    desc: 'Elige una plantilla, inserta tu contenido y la herramienta se encarga de la coherencia visual y el equilibrio de los elementos.',
    features: ['Auto-ajuste de layout', 'Coherencia de marca automática', 'Plantillas por industria', 'Colaboración en equipo'],
    color: 'hsl(185 70% 50%)',
    icon: Layers,
    url: 'beautiful.ai',
    badge: null,
  },
  {
    name: 'Napkin AI',
    tagline: 'Texto → infografías al instante',
    desc: 'Pega bullets o párrafos cortos y Napkin genera diagramas, infografías y flowcharts profesionales. Exporta como PNG, PDF o SVG.',
    features: ['Generación de diagramas automática', 'Personalización de colores e iconos', 'Exportación multi-formato', 'Integra con Gamma y Beautiful.ai'],
    color: 'hsl(38 90% 55%)',
    icon: BarChart3,
    url: 'napkin.ai',
    badge: null,
  },
];

export function S3Slide07PresentationAI() {
  const { isExporting } = useExportContext();
  const [activeTool, setActiveTool] = useState(0);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  const active = TOOLS[activeTool];
  const ActiveIcon = active.icon;

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_65%,_hsl(280_55%_50%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_85%,_hsl(38_80%_55%_/_0.05),_transparent_50%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={280} tertiaryHue={38} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 mb-3">
            <Presentation className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-violet-400/80">Creación Digital</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Presentaciones con <span className="text-violet-400">IA</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Tres herramientas que transforman ideas en entregables visuales profesionales</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {/* Tool selector */}
          <div className="col-span-4 space-y-3">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              const isActive = activeTool === i;
              return (
                <motion.button key={i} {...m(0.15 + i * 0.08)}
                  onClick={() => setActiveTool(i)}
                  {...(isExporting ? {} : { whileHover: { borderColor: tool.color.replace(')', ' / 0.3)'), scale: 1.02 } })}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${isActive ? 'bg-white/[0.04] border-white/[0.12]' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${tool.color.replace(')', ' / 0.1)')}`, border: `1px solid ${tool.color.replace(')', ' / 0.25)')}` }}>
                      <Icon className="w-4 h-4" style={{ color: tool.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-white/50'}`}>{tool.name}</span>
                        {tool.badge && <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full border" style={{ background: S3_ACCENT.violet.bg, color: S3_ACCENT.violet.text, borderColor: S3_ACCENT.violet.border }}>{tool.badge}</span>}
                      </div>
                      <p className="text-[10px] text-white/30 font-mono mt-0.5">{tool.url}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            <motion.div {...m(0.5)} className="p-3 rounded-xl border border-amber-500/15 bg-amber-500/[0.03]">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-300/60"><span className="font-bold text-amber-300/80">Workflow:</span> Napkin para diagramas → Gamma para la presentación → Beautiful.ai para el branding final.</p>
              </div>
            </motion.div>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTool} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="col-span-8 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${active.color.replace(')', ' / 0.12)')}`, border: `1px solid ${active.color.replace(')', ' / 0.3)')}` }}>
                  <ActiveIcon className="w-6 h-6" style={{ color: active.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{active.name}</h3>
                  <p className="text-sm text-white/40">{active.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-white/50 leading-relaxed mb-5">{active.desc}</p>

              <div className="grid grid-cols-2 gap-3">
                {active.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-white/[0.04] bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: active.color }} />
                    <span className="text-xs text-white/50">{f}</span>
                  </div>
                ))}
              </div>

              {/* Gamma-specific: 3-step process */}
              {activeTool === 0 && (
                <div className="mt-5 flex items-center gap-3">
                  {['Copia tu texto', 'Pega en Gamma', 'Ajusta y presenta'].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: `${active.color.replace(')', ' / 0.15)')}`, color: active.color }}>{i + 1}</div>
                      <span className="text-xs text-white/40">{step}</span>
                      {i < 2 && (
                        <motion.span
                          {...(isExporting ? {} : { animate: { x: [0, 4, 0] }, transition: { duration: 1.2, repeat: Infinity, delay: i * 0.2 } })}
                          className="inline-flex ml-1">
                          <ArrowRight className="w-3 h-3 text-white/15" />
                        </motion.span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <S3Footer sectionLabel="CREACIÓN DIGITAL" hue={263} />
    </div>
  );
}
