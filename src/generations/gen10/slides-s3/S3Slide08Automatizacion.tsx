import { motion } from 'framer-motion';
import { Repeat, Presentation, FileSpreadsheet, ArrowRight, Clock, Sparkles, Mail, ChevronRight, Zap } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const CASES = [
  { title: 'Deck desde PDF', icon: Presentation, time: '~5 min', detail: '"Usa PDF Skill y arma un deck ejecutivo"', accent: S3_ACCENT.violet },
  { title: 'Modelo Excel', icon: FileSpreadsheet, time: '~3 min', detail: '"Con Excel Skill genera proyección a 12 meses"', accent: S3_ACCENT.emerald },
  { title: 'Tarea Recurrente', icon: Repeat, time: 'Auto', detail: '"Cada lunes resume los emails de la semana"', accent: S3_ACCENT.amber },
];

const FLOW_STEPS = [
  { label: 'Trigger', sub: 'Email / Calendario', icon: Mail, accent: S3_ACCENT.cyan },
  { label: 'Claude + Skills', sub: 'Procesa + Decide', icon: Zap, accent: S3_ACCENT.violet },
  { label: 'Output', sub: 'Doc / Email / Slack', icon: Presentation, accent: S3_ACCENT.emerald },
];

export function S3Slide08Automatizacion() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(38_80%_55%_/_0.07),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_15%,_hsl(160_65%_45%_/_0.06),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={280} tertiaryHue={38} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Repeat className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Automatización</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div {...me(0.05)}>
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
            Del Manual al{' '}
            <span style={s3GradientText('hsl(263 70% 72%)', 'hsl(185 70% 60%)', 263)}>Automático</span>
          </h1>
          <motion.div
            className="h-[2px] rounded-full mx-auto mt-1.5 max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.7), hsl(185 70% 60% / 0.7), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
          />
        </motion.div>
        <motion.p {...m(0.1)} className="text-white/50 text-sm mt-2 mb-6 mx-auto">
          Tareas repetitivas → flujos automáticos supervisados
        </motion.p>

        {/* Visual flow diagram: Trigger → Claude → Output */}
        <motion.div {...me(0.15)} className="mb-7 relative">
          <div className="flex items-center justify-center gap-3">
            {FLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <motion.div
                    {...m(0.2 + i * 0.1)}
                    className="relative group w-44 p-4 rounded-2xl border flex flex-col items-center gap-2 overflow-hidden"
                    style={{ borderColor: step.accent.border, background: step.accent.bg }}
                    {...(isExporting ? {} : { whileHover: { scale: 1.05, y: -3 } })}
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${step.accent.dot}, transparent)` }} />
                    {/* Shimmer */}
                    {!isExporting && (
                      <motion.div className="absolute inset-0 pointer-events-none z-[1]"
                        style={{ background: `linear-gradient(105deg, transparent 35%, ${step.accent.text}10 50%, transparent 65%)` }}
                        animate={{ x: ['-150%', '250%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
                    )}
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center relative"
                      style={{ borderColor: `${step.accent.text}25`, background: `${step.accent.text}08` }}>
                      <Icon className="w-6 h-6" style={{ color: step.accent.text }} />
                    </div>
                    <div className="relative text-center">
                      <p className="text-sm font-black text-white">{step.label}</p>
                      <p className="text-[10px] text-white/40 mt-0.5">{step.sub}</p>
                    </div>
                  </motion.div>

                  {i < FLOW_STEPS.length - 1 && (
                    <div className="flex items-center gap-1 relative">
                      {/* Glowing connection */}
                      <div className="absolute -left-2 -right-2 top-1/2 -translate-y-1/2 h-2 overflow-hidden rounded-full opacity-60">
                        {!isExporting && (
                          <motion.div className="absolute inset-0 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${step.accent.dot}, ${FLOW_STEPS[i + 1].accent.dot})`, filter: 'blur(2px)' }}
                            animate={{ opacity: [0.25, 0.5, 0.25] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
                        )}
                      </div>
                      <div className="relative flex items-center gap-1">
                        {[0, 1, 2].map(dot => (
                          <motion.div key={dot} className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent.dot }}
                            {...(isExporting ? {} : { animate: { x: [0, 8, 16], opacity: [0, 1, 0] }, transition: { duration: 1.5, repeat: Infinity, delay: dot * 0.2 + i * 0.3 } })} />
                        ))}
                        <ArrowRight className="w-4 h-4 ml-1" style={{ color: `${step.accent.text}50` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Before → After comparison */}
        <motion.div {...m(0.35)} className="flex items-center justify-center gap-5 mb-6">
          <div className="px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] relative overflow-hidden">
            <p className="text-2xl font-black text-white/40 relative inline-block">
              2h
              {!isExporting && (
                <motion.span
                  className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full"
                  style={{ background: 'hsl(0 0% 100% / 0.4)', transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: S3_EASE }}
                />
              )}
            </p>
            <p className="text-[10px] text-white/45 uppercase tracking-wider mt-1">Manual</p>
          </div>

          <motion.div {...(isExporting ? {} : { animate: { x: [0, 6, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } })}>
            <ArrowRight className="w-5 h-5" style={{ color: S3_ACCENT.violet.text }} />
          </motion.div>

          <div className="px-5 py-3 rounded-xl border relative overflow-hidden" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg, boxShadow: `0 0 26px ${S3_ACCENT.emerald.glow}` }}>
            <motion.p
              className="text-2xl font-black relative"
              style={{ color: S3_ACCENT.violet.text }}
              {...(isExporting ? {} : { animate: { filter: ['drop-shadow(0 0 8px hsl(263 60% 55% / 0.3))', 'drop-shadow(0 0 18px hsl(263 60% 55% / 0.5))', 'drop-shadow(0 0 8px hsl(263 60% 55% / 0.3))'] }, transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } })}
            >
              5m
            </motion.p>
            <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: `${S3_ACCENT.violet.text}80` }}>con Claude</p>
          </div>
        </motion.div>

        {/* 3 use-case cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={i} {...m(0.4 + i * 0.08)}
                className="relative group rounded-2xl border overflow-hidden"
                style={{ borderColor: c.accent.border, background: c.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.03, y: -3 } })}>
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.accent.dot}, transparent)` }} />
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-[1]"
                    style={{ background: `linear-gradient(105deg, transparent 35%, ${c.accent.glow} 50%, transparent 65%)` }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }}
                  />
                )}
                <div className="relative p-4 flex flex-col items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center"
                    style={{ borderColor: `${c.accent.text}20`, background: `${c.accent.text}08` }}>
                    <Icon className="w-5 h-5" style={{ color: c.accent.text }} />
                  </div>
                  <p className="text-sm font-black text-white">{c.title}</p>
                  <p className="text-[10px] text-white/45 font-mono italic leading-relaxed text-center">{c.detail}</p>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
                    style={{ borderColor: `${c.accent.text}15`, background: `${c.accent.text}06` }}>
                    <Clock className="w-3 h-3" style={{ color: c.accent.text }} />
                    <span className="text-xs font-bold" style={{ color: c.accent.text }}>{c.time}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div {...m(0.65)} className="inline-flex items-center gap-2 text-xs text-white/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
          <span>Las tareas recurrentes consumen <span className="text-amber-400/70 font-semibold">tokens diarios</span> al ejecutarse</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="AUTOMATIZACIÓN" hue={263} contextHint="de tareas repetitivas a flujos automáticos" />
    </div>
  );
}
