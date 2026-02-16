import { motion } from 'framer-motion';
import { Repeat, Presentation, FileSpreadsheet, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import bgAutomation from '@/assets/gen10-s3/bg-automation.jpg';

const CASES = [
  { title: 'Folleto Digital', icon: Presentation, time: '~5 min', detail: '"Hazme un folleto con estos datos de producto"', accent: S3_ACCENT.violet },
  { title: 'Modelo Excel', icon: FileSpreadsheet, time: '~3 min', detail: '"Crea un modelo financiero con proyección a 12 meses"', accent: S3_ACCENT.emerald },
  { title: 'Tarea Recurrente', icon: Repeat, time: 'Auto', detail: '"Cada lunes resume los emails de la semana"', accent: S3_ACCENT.amber },
];

const FLOATING_PILLS = [
  { label: '5min', left: '14%', top: '20%', delay: 0 },
  { label: 'auto', left: '82%', top: '62%', delay: 0.4 },
  { label: '24/7', left: '83%', top: '22%', delay: 0.8 },
];

export function S3Slide08Automatizacion() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgAutomation} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(263_60%_55%_/_0.09),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(38_80%_55%_/_0.06),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={280} tertiaryHue={38} />
      </div>

      {/* Floating decorative pills */}
      {!isExporting && FLOATING_PILLS.map((pill, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider pointer-events-none"
          style={{
            borderColor: 'hsl(263 60% 55% / 0.25)',
            background: 'hsl(263 60% 55% / 0.06)',
            color: 'hsl(263 60% 75%)',
            left: pill.left,
            top: pill.top,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: pill.delay }}
        >
          {pill.label}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Repeat className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Automatización</span>
          </div>
        </motion.div>

        <motion.div {...m(0.08)}>
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
            Del Manual al{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(185 70% 60%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px hsl(263 70% 72% / 0.4))',
              }}
            >
              Automático
            </span>
          </h1>
          <motion.div
            className="h-0.5 rounded-full mx-auto mt-1 max-w-[180px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.8), hsl(185 70% 60% / 0.8), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
          />
        </motion.div>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-10 max-w-md mx-auto">
          Horas de trabajo repetitivo → minutos de supervisión
        </motion.p>

        {/* Before → After visual */}
        <motion.div {...m(0.2)} className="flex items-center justify-center gap-5 mb-12">
          <div className="px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] relative overflow-hidden">
            {/* Strikethrough line that animates across "2h" */}
            <p className="text-3xl font-black text-white/25 relative inline-block">
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
            <p className="text-[10px] text-white/20 uppercase tracking-wider mt-1">manual</p>
          </div>
          <motion.div {...(isExporting ? {} : { animate: { x: [0, 6, 0] }, transition: { duration: 1.5, repeat: Infinity } })}>
            <ArrowRight className="w-6 h-6" style={{ color: S3_ACCENT.violet.text }} />
          </motion.div>
          <div className="px-6 py-3 rounded-xl border relative overflow-hidden" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            {/* 5m with subtle pulse glow */}
            <motion.p
              className="text-3xl font-black relative"
              style={{ color: S3_ACCENT.violet.text }}
              {...(isExporting ? {} : { animate: { filter: ['drop-shadow(0 0 8px hsl(263 60% 55% / 0.3))', 'drop-shadow(0 0 20px hsl(263 60% 55% / 0.5))', 'drop-shadow(0 0 8px hsl(263 60% 55% / 0.3))'] }, transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } })}
            >
              5m
            </motion.p>
            <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: `${S3_ACCENT.violet.text}80` }}>con Claude</p>
          </div>
        </motion.div>

        {/* 3 use case cards */}
        <div className="grid grid-cols-3 gap-5">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            const shimmerHue = c.accent === S3_ACCENT.violet ? 263 : c.accent === S3_ACCENT.emerald ? 160 : 38;
            return (
              <motion.div key={i} {...m(0.3 + i * 0.1)}
                className="relative group rounded-2xl border overflow-hidden"
                style={{ borderColor: c.accent.border, background: c.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.04, y: -4 } })}>
                {/* Shimmer sweep */}
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-[1]"
                    style={{
                      background: `linear-gradient(105deg, transparent 35%, hsl(${shimmerHue} 60% 60% / 0.1) 50%, transparent 65%)`,
                    }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                  />
                )}
                {!isExporting && (
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: c.accent.glow }} />
                )}
                <div className="relative p-6 flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl border flex items-center justify-center"
                    style={{ borderColor: `${c.accent.text}25`, background: `${c.accent.text}08` }}>
                    <Icon className="w-7 h-7" style={{ color: c.accent.text }} />
                  </div>
                  <p className="text-base font-black text-white">{c.title}</p>
                  <p className="text-[9px] text-white/25 font-mono italic mt-1 leading-relaxed">{c.detail}</p>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
                    style={{ borderColor: `${c.accent.text}15`, background: `${c.accent.text}05` }}>
                    <Clock className="w-3 h-3" style={{ color: c.accent.text }} />
                    <span className="text-xs font-bold" style={{ color: c.accent.text }}>{c.time}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: `${c.accent.text}10` }}>
                    <motion.div className="h-full rounded-full" style={{ background: c.accent.dot }}
                      {...(isExporting ? { style: { width: '100%', background: c.accent.dot } } : { initial: { width: '0%' }, animate: { width: '100%' }, transition: { delay: 0.6 + i * 0.2, duration: 1.2 } })} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.65)} className="mt-10 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Las tareas recurrentes consumen <span className="text-amber-400/80 font-semibold">tokens diarios</span> al ejecutarse</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="AUTOMATIZACIÓN" hue={263} contextHint="de tareas repetitivas a flujos automáticos" />
    </div>
  );
}
