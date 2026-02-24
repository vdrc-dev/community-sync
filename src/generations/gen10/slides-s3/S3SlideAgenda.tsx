import { motion } from 'framer-motion';
import { Map, Palette, Wrench, Plug, Rocket, Clock, ChevronRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const MODULES = [
  {
    num: '01',
    title: 'Fundamentos Visuales',
    desc: 'Colores, tipografía y jerarquía',
    tools: ['Coolors', 'Fontjoy', 'Canvas'],
    icon: Palette,
    accent: S3_ACCENT.rose,
    time: '~20 min',
    timePercent: 21,
  },
  {
    num: '02',
    title: 'Herramientas de Creación',
    desc: 'Sintetiza, presenta y automatiza',
    tools: ['NotebookLM', 'Claude Code', 'Gamma'],
    icon: Wrench,
    accent: S3_ACCENT.violet,
    time: '~35 min',
    timePercent: 37,
  },
  {
    num: '03',
    title: 'Conexiones y Aplicación',
    desc: 'Datos reales y productos de verdad',
    tools: ['CRM + MCP', 'Cursor', 'Krea.ai'],
    icon: Plug,
    accent: S3_ACCENT.amber,
    time: '~30 min',
    timePercent: 32,
  },
  {
    num: '04',
    title: 'Cierre y Misiones',
    desc: 'Acción para la próxima semana',
    tools: ['Resumen', 'Próximos pasos'],
    icon: Rocket,
    accent: S3_ACCENT.emerald,
    time: '~10 min',
    timePercent: 10,
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
        <S3Atmosphere isExporting={isExporting} particleCount={12} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora />
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
        <motion.h1 {...me(0.06)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
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
        <motion.p {...m(0.12)} className="text-white/45 text-base mt-3 mb-10 max-w-md mx-auto">
          4 módulos · ~95 minutos · de la idea a la acción
        </motion.p>

        {/* Module cards — clean horizontal layout, no overlapping lines */}
        <div className="flex items-stretch gap-4">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div key={i} {...m(0.18 + i * 0.1)} className="flex-1 flex flex-col items-center gap-0 min-w-0">
                {/* Card */}
                <motion.div
                  className="relative group w-full rounded-2xl border overflow-hidden flex-1 flex flex-col"
                  style={{ borderColor: mod.accent.border, background: mod.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.03, y: -3 } })}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${mod.accent.dot}, transparent)` }}
                  />
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${mod.accent.glow} 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.5 }}
                    />
                  )}

                  <div className="relative p-5 flex flex-col items-center flex-1">
                    {/* Number + Icon header */}
                    <div className="flex items-center gap-3 mb-3 w-full">
                      <div className="w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0"
                        style={{ borderColor: mod.accent.dot, background: `${mod.accent.dot}15` }}>
                        <span className="text-sm font-black" style={{ color: mod.accent.text }}>{mod.num}</span>
                      </div>
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
                        <span key={j} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                          style={{ borderColor: `${mod.accent.text}18`, color: `${mod.accent.text}80`, background: `${mod.accent.text}06` }}>
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Time bar — at bottom */}
                    <div className="w-full mt-4 pt-3 border-t" style={{ borderColor: `${mod.accent.text}10` }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" style={{ color: `${mod.accent.text}60` }} />
                          <span className="text-[10px] font-bold" style={{ color: `${mod.accent.text}60` }}>{mod.time}</span>
                        </div>
                        <span className="text-[10px] font-black tabular-nums" style={{ color: mod.accent.text }}>{mod.timePercent}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: `${mod.accent.text}10` }}>
                        <motion.div className="h-full rounded-full" style={{ background: mod.accent.dot }}
                          {...(isExporting
                            ? { style: { width: `${mod.timePercent}%`, background: mod.accent.dot } }
                            : { initial: { width: '0%' }, animate: { width: `${mod.timePercent}%` }, transition: { delay: 0.6 + i * 0.15, duration: 0.8, ease: S3_EASE } }
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom flow indicator */}
        <motion.div {...m(0.6)} className="mt-6 flex items-start justify-center gap-4">
          {MODULES.map((mod, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: mod.accent.dot, boxShadow: `0 0 10px ${mod.accent.glow}` }} />
                <span className="text-[9px] uppercase tracking-wider text-white/35">{mod.num}</span>
              </div>
              {i < MODULES.length - 1 && (
                <motion.div
                  {...(isExporting ? {} : { animate: { x: [0, 3, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 } })}
                >
                  <ChevronRight className="w-3 h-3 text-white/20" />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <S3Footer sectionLabel="AGENDA" contextHint="ruta de la sesión de hoy" />
    </div>
  );
}
