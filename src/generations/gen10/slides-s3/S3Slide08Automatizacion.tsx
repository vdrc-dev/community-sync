import { motion } from 'framer-motion';
import { Repeat, Presentation, FileSpreadsheet, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const CASES = [
  { title: 'Folleto Digital', icon: Presentation, time: '~5 min', accent: S3_ACCENT.violet },
  { title: 'Modelo Excel', icon: FileSpreadsheet, time: '~3 min', accent: S3_ACCENT.emerald },
  { title: 'Tarea Recurrente', icon: Repeat, time: 'Auto', accent: S3_ACCENT.amber },
];

export function S3Slide08Automatizacion() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(263_60%_55%_/_0.09),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(38_80%_55%_/_0.06),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={280} tertiaryHue={38} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Repeat className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Claude Code</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Del Manual al <span style={{ color: S3_ACCENT.violet.text }}>Automático</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-10 max-w-md mx-auto">
          Horas de trabajo repetitivo → minutos de supervisión
        </motion.p>

        {/* Before → After visual */}
        <motion.div {...m(0.2)} className="flex items-center justify-center gap-5 mb-12">
          <div className="px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <p className="text-3xl font-black text-white/25">2h</p>
            <p className="text-[10px] text-white/20 uppercase tracking-wider mt-1">manual</p>
          </div>
          <motion.div {...(isExporting ? {} : { animate: { x: [0, 6, 0] }, transition: { duration: 1.5, repeat: Infinity } })}>
            <ArrowRight className="w-6 h-6" style={{ color: S3_ACCENT.violet.text }} />
          </motion.div>
          <div className="px-6 py-3 rounded-xl border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <p className="text-3xl font-black" style={{ color: S3_ACCENT.violet.text }}>5m</p>
            <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: `${S3_ACCENT.violet.text}80` }}>con Claude</p>
          </div>
        </motion.div>

        {/* 3 use case cards */}
        <div className="grid grid-cols-3 gap-5">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={i} {...m(0.3 + i * 0.1)}
                className="relative group rounded-2xl border overflow-hidden"
                style={{ borderColor: c.accent.border, background: c.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.04, y: -4 } })}>
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

      <S3Footer sectionLabel="CLAUDE CODE" hue={263} />
    </div>
  );
}
