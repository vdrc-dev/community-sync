import { motion } from 'framer-motion';
import { Presentation, BarChart3, Layers, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS = [
  { name: 'Gamma', tagline: 'Texto → Presentación', icon: Presentation, accent: S3_ACCENT.violet, badge: 'Recomendado' },
  { name: 'Napkin AI', tagline: 'Texto → Infografías', icon: BarChart3, accent: S3_ACCENT.amber, badge: null },
  { name: 'Beautiful.ai', tagline: 'Plantillas inteligentes', icon: Layers, accent: S3_ACCENT.cyan, badge: null },
];

const FLOATING_PILLS = [
  { label: 'Gamma', left: '-5%', top: '18%' },
  { label: 'Napkin', right: '-4%', top: '22%' },
  { label: 'pptx', left: '-3%', top: '72%' },
];

export function S3Slide07PresentationAI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_30%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_65%,_hsl(280_55%_50%_/_0.07),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={280} tertiaryHue={38} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Presentation className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Creación Digital</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Presentaciones con <span
            style={{
              background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(38 80% 65%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(263 70% 72% / 0.4))',
            }}
          >IA</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mt-4 mx-auto max-w-[120px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.8), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: S3_EASE }}
        />
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-14 max-w-md mx-auto">
          De ideas a entregables visuales en minutos
        </motion.p>

        {/* Visual: 3 tool cards */}
        <div className="grid grid-cols-3 gap-5 relative">
          {/* Floating decorative pills */}
          {!isExporting && FLOATING_PILLS.map((pill, i) => (
            <motion.div
              key={pill.label}
              className="absolute px-2.5 py-1 rounded-full text-[9px] font-semibold border pointer-events-none"
              style={{
                borderColor: S3_ACCENT.violet.border,
                background: S3_ACCENT.violet.bg,
                color: S3_ACCENT.violet.text,
                left: 'left' in pill ? pill.left : undefined,
                right: 'right' in pill ? pill.right : undefined,
                top: pill.top,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.6 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            >
              {pill.label}
            </motion.div>
          ))}
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div key={i} {...m(0.2 + i * 0.1)}
                className="relative group rounded-2xl border overflow-hidden"
                style={{ borderColor: tool.accent.border, background: tool.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.04, y: -4 } })}>
                {!isExporting && (
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: tool.accent.glow }} />
                )}
                {/* Shimmer sweep inside each tool card */}
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 35%, ${tool.accent.text.replace(')', ' / 0.1)')} 50%, transparent 65%)` }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                  />
                )}
                <div className="relative p-7 flex flex-col items-center gap-5">
                  {tool.badge && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[8px] font-black tracking-wider z-10"
                      style={{ background: tool.accent.dot, color: '#04030a' }}>{tool.badge}</div>
                  )}
                  <div className="w-16 h-16 rounded-2xl border flex items-center justify-center"
                    style={{ borderColor: `${tool.accent.text}25`, background: `${tool.accent.text}08` }}>
                    <Icon className="w-8 h-8" style={{ color: tool.accent.text }} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-white mb-1">{tool.name}</p>
                    <p className="text-sm text-white/35">{tool.tagline}</p>
                  </div>

                  {/* Mini mockup: slide preview with animated bars */}
                  <div className="w-full h-20 rounded-xl overflow-hidden border" style={{ borderColor: `${tool.accent.text}12` }}>
                    <div className="h-full flex flex-col">
                      <div className="h-4 flex items-center px-2 gap-1" style={{ background: `${tool.accent.text}06` }}>
                        <div className="w-1 h-1 rounded-full" style={{ background: `${tool.accent.text}30` }} />
                        <div className="w-1 h-1 rounded-full" style={{ background: `${tool.accent.text}20` }} />
                        <div className="w-1 h-1 rounded-full" style={{ background: `${tool.accent.text}10` }} />
                      </div>
                      <div className="flex-1 flex items-center justify-center gap-2 px-3">
                        <div className="w-8 h-3 rounded" style={{ background: `${tool.accent.text}20` }} />
                        <div className="flex-1 space-y-1 min-w-0">
                          <motion.div
                            className="h-1.5 rounded-full"
                            style={{ background: `${tool.accent.text}15` }}
                            {...(isExporting ? { style: { width: '80%', background: `${tool.accent.text}15` } } : {
                              animate: { width: ['40%', '90%', '65%', '80%'] },
                              transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 },
                            })}
                          />
                          <motion.div
                            className="h-1 rounded-full"
                            style={{ background: `${tool.accent.text}08` }}
                            {...(isExporting ? { style: { width: '60%', background: `${tool.accent.text}08` } } : {
                              animate: { width: ['30%', '70%', '50%', '60%'] },
                              transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8, delay: 0.2 },
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Workflow tip */}
        <motion.div {...m(0.6)} className="mt-10 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Workflow: <span className="text-amber-400/80 font-semibold">Napkin</span> para diagramas →
            <span className="text-amber-400/80 font-semibold"> Gamma</span> para la presentación</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CREACIÓN DIGITAL" hue={263} />
    </div>
  );
}
