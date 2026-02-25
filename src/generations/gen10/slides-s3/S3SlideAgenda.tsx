import { motion } from 'framer-motion';
import { Map, Palette, Wrench, Plug, Rocket, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const MODULES = [
  {
    num: '01', title: 'Fundamentos Visuales',
    desc: 'Color, tipografía, VibeCoding y protocolos',
    tools: ['Coolors', 'Fontjoy', 'VibeCoding', 'MCP vs API'],
    icon: Palette, accent: S3_ACCENT.rose, time: '~25 min', timePercent: 26,
  },
  {
    num: '02', title: 'Herramientas de Creación',
    desc: 'Diseña, presenta, graba y automatiza con IA',
    tools: ['Canva', 'NotebookLM', 'Claude Code', 'Skills', 'Gamma', 'Krea.ai', 'Automatización'],
    icon: Wrench, accent: S3_ACCENT.violet, time: '~50 min', timePercent: 53,
  },
  {
    num: '03', title: 'Conexiones y Aplicación',
    desc: 'Datos reales, CRM y Cursor',
    tools: ['CRM + MCP', 'Cursor'],
    icon: Plug, accent: S3_ACCENT.amber, time: '~10 min', timePercent: 11,
  },
  {
    num: '04', title: 'Cierre Aplicado',
    desc: 'Arsenal, misiones y próximos pasos',
    tools: ['Misiones', 'Q&A'],
    icon: Rocket, accent: S3_ACCENT.emerald, time: '~5 min', timePercent: 10,
  },
];

export function S3SlideAgenda() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(330_65%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(263_60%_55%_/_0.06),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={16} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora showPlasma />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Map className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Hoja de Ruta</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...me(0.06)} className="text-3xl sm:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
          Recorrido de{' '}
          <span style={{
            background: 'linear-gradient(135deg, hsl(330 85% 68%), hsl(280 70% 65%), hsl(185 70% 60%))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 25px hsl(330 85% 68% / 0.4))',
          }}>Hoy</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[100px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.6), hsl(280 70% 65% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
        />

        {/* Total time badge */}
        <motion.div {...m(0.12)} className="mt-3 mb-6 sm:mb-10 flex items-center justify-center gap-3">
          <span className="text-white/45 text-sm sm:text-base">4 módulos</span>
          <div className="w-px h-4 bg-white/15" />
          <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'hsl(185 60% 50% / 0.25)', background: 'hsl(185 60% 50% / 0.06)' }}
            {...(isExporting ? {} : { animate: { boxShadow: ['0 0 0px hsl(185 60% 50% / 0)', '0 0 25px hsl(185 60% 50% / 0.15)', '0 0 0px hsl(185 60% 50% / 0)'] }, transition: { duration: 3, repeat: Infinity } })}>
            <Clock className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
            <span className="text-sm font-bold" style={{ color: S3_ACCENT.cyan.text }}>90 min</span>
          </motion.div>
          <div className="w-px h-4 bg-white/15" />
          <span className="text-white/45 text-sm sm:text-base">herramientas en acción</span>
        </motion.div>

        {/* Module cards */}
        <div className="grid grid-cols-2 sm:flex sm:items-stretch gap-3 sm:gap-4">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div key={i}
                {...(isExporting ? {} : {
                  initial: { opacity: 0, y: 40, scale: 0.9, filter: 'blur(8px)' },
                  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
                  transition: { delay: 0.2 + i * 0.12, duration: 0.7, ease: S3_EASE },
                })}
                className="sm:flex-1 flex flex-col items-center gap-0 min-w-0"
              >
                <motion.div
                  className="relative group w-full rounded-2xl border overflow-hidden flex-1 flex flex-col"
                  style={{ borderColor: mod.accent.border, background: mod.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.05, y: -5, boxShadow: `0 20px 60px ${mod.accent.glow}` } })}
                >
                  {/* Top glow bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${mod.accent.dot}, transparent)` }} />

                  {/* Shimmer */}
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${mod.accent.glow} 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.5 }} />
                  )}

                  <div className="relative p-5 flex flex-col items-center flex-1">
                    {/* Number + Icon header */}
                    <div className="flex items-center gap-3 mb-3 w-full">
                      <motion.div className="w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 relative overflow-hidden"
                        style={{ borderColor: mod.accent.dot, background: `${mod.accent.dot}15` }}
                        {...(isExporting ? {} : { whileHover: { rotate: [0, -5, 5, 0] } })}>
                        <span className="text-sm font-black relative z-10" style={{ color: mod.accent.text }}>{mod.num}</span>
                      </motion.div>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${mod.accent.text}08`, border: `1px solid ${mod.accent.text}15` }}>
                        <Icon className="w-[18px] h-[18px]" style={{ color: mod.accent.text }} />
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-sm font-black text-white leading-tight">{mod.title}</p>
                        <p className="text-[10px] text-white/35 leading-tight mt-0.5">{mod.desc}</p>
                      </div>
                    </div>

                    {/* Tool pills */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-auto">
                      {mod.tools.map((tool, j) => (
                        <motion.span key={j}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                          style={{ borderColor: `${mod.accent.text}18`, color: `${mod.accent.text}80`, background: `${mod.accent.text}06` }}
                          {...(isExporting ? {} : {
                            initial: { opacity: 0, scale: 0.7 },
                            animate: { opacity: 1, scale: 1 },
                            transition: { delay: 0.5 + i * 0.12 + j * 0.04, type: 'spring', stiffness: 250 },
                          })}
                        >{tool}</motion.span>
                      ))}
                    </div>

                    {/* Time bar */}
                    <div className="w-full mt-4 pt-3 border-t" style={{ borderColor: `${mod.accent.text}10` }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" style={{ color: `${mod.accent.text}60` }} />
                          <span className="text-[10px] font-bold" style={{ color: `${mod.accent.text}60` }}>{mod.time}</span>
                        </div>
                        <span className="text-[10px] font-black tabular-nums" style={{ color: mod.accent.text }}>{mod.timePercent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: `${mod.accent.text}10` }}>
                        <motion.div className="h-full rounded-full relative overflow-hidden"
                          style={{ background: `linear-gradient(90deg, ${mod.accent.dot}, ${mod.accent.text})` }}
                          {...(isExporting
                            ? { style: { width: `${mod.timePercent}%`, background: `linear-gradient(90deg, ${mod.accent.dot}, ${mod.accent.text})` } }
                            : { initial: { width: '0%' }, animate: { width: `${mod.timePercent}%` }, transition: { delay: 0.6 + i * 0.15, duration: 0.8, ease: S3_EASE } }
                          )}>
                          {!isExporting && (
                            <motion.div className="absolute inset-0"
                              style={{ background: `linear-gradient(90deg, transparent 60%, ${mod.accent.text}60 100%)` }}
                              animate={{ opacity: [0.3, 0.7, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity }} />
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom flow indicator */}
        <motion.div {...m(0.6)} className="mt-4 sm:mt-6 hidden sm:flex items-center justify-center gap-3">
          {MODULES.map((mod, i) => (
            <div key={i} className="flex items-center gap-3">
              <motion.div className="flex flex-col items-center gap-1"
                {...(isExporting ? {} : { whileHover: { scale: 1.3 } })}>
                <div className="w-3 h-3 rounded-full relative" style={{ background: mod.accent.dot, boxShadow: `0 0 14px ${mod.accent.glow}` }}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 rounded-full" style={{ background: mod.accent.dot }}
                      animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }} />
                  )}
                </div>
                <span className="text-[9px] uppercase tracking-wider text-white/35">{mod.num}</span>
              </motion.div>
              {i < MODULES.length - 1 && (
                <div className="flex items-center gap-1">
                  <motion.div className="w-8 h-px rounded-full"
                    style={{ background: `linear-gradient(90deg, ${mod.accent.dot}60, ${MODULES[i+1].accent.dot}60)` }}
                    {...(isExporting ? {} : { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { delay: 0.8 + i * 0.15, duration: 0.6 } })} />
                  <motion.div {...(isExporting ? {} : { animate: { x: [0, 3, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 } })}>
                    <ChevronRight className="w-3 h-3 text-white/20" />
                  </motion.div>
                </div>
              )}
            </div>
          ))}

          <div className="ml-3 flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
            <Sparkles className="w-3 h-3 text-amber-400/50" />
            <span className="text-[9px] text-white/35 uppercase tracking-wider font-bold">Interactivo</span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="AGENDA" contextHint="ruta de la sesión de hoy" />
    </div>
  );
}
