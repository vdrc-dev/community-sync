import { motion } from 'framer-motion';
import { Repeat, FileSpreadsheet, Presentation, TrendingUp, Clock, ArrowRight, Sparkles } from 'lucide-react';
import bgAutomation from '@/assets/gen10-s3/bg-automation.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const EXAMPLES = [
  { title: 'Folleto Digital Automático', desc: 'De un anuncio de Airbnb a una presentación profesional con métricas financieras, cap rates y proyecciones a 10 años.', icon: Presentation, time: '~5 min', color: 'hsl(280 70% 60%)' },
  { title: 'Modelo Excel de Evaluación', desc: 'Claude Code analiza datos y genera modelos financieros con fórmulas, gráficos y análisis de rating.', icon: FileSpreadsheet, time: '~3 min', color: 'hsl(150 60% 50%)' },
  { title: 'Tareas Recurrentes', desc: 'Búsqueda y actualización automática de información (ej: plano regulador). Se ejecuta periódicamente.', icon: Repeat, time: 'Automático', color: 'hsl(38 90% 55%)' },
];

export function S3Slide08Automatizacion() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgAutomation} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/40 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={280} tertiaryHue={38} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white/[0.02] mb-3" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Repeat className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Claude Code</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Del Manual al <span style={{ color: S3_ACCENT.violet.text }}>Automático</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Claude Code transforma horas de trabajo repetitivo en minutos de supervisión</p>
        </motion.div>

        {/* Before/After flow */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div {...m(0.1)} className="px-5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <p className="text-xs text-white/30 uppercase tracking-wider font-bold mb-1">Antes</p>
            <p className="text-sm text-white/50">2 horas diseñando manualmente</p>
          </motion.div>
          <motion.div
            {...m(0.15)}
            {...(isExporting ? {} : { animate: { x: [0, 8, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } })}
          >
            <ArrowRight className="w-5 h-5" style={{ color: S3_ACCENT.violet.text }} />
          </motion.div>
          <motion.div {...m(0.2)} className="px-5 py-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.04]">
            <p className="text-xs text-violet-400/60 uppercase tracking-wider font-bold mb-1">Después</p>
            <p className="text-sm text-violet-300/80 font-semibold">5 minutos con Claude Code</p>
          </motion.div>
        </div>

        {/* Example cards */}
        <div className="grid grid-cols-3 gap-5">
          {EXAMPLES.map((ex, i) => {
            const Icon = ex.icon;
            return (
              <motion.div
                key={i}
                {...m(0.25 + i * 0.1)}
                className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                {...(isExporting ? {} : { whileHover: { borderColor: ex.color.replace(')', ' / 0.3)'), scale: 1.02, y: -2 } })}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${ex.color.replace(')', ' / 0.1)')}`, border: `1px solid ${ex.color.replace(')', ' / 0.25)')}` }}>
                    <Icon className="w-5 h-5" style={{ color: ex.color }} />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span className="text-[10px] font-bold text-white/40">{ex.time}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{ex.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{ex.desc}</p>
                <div className="mt-3 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: ex.color }}
                    {...(isExporting ? { style: { width: '100%', background: ex.color } } : { initial: { width: '0%' }, animate: { width: '100%' }, transition: { delay: 0.5 + i * 0.3, duration: 1.5, ease: S3_EASE } })}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.6)} className="mt-6 p-3 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-300/60">
              <span className="font-bold text-amber-300/80">Advertencia:</span> Las tareas recurrentes consumen tu uso diario de tokens al ejecutarse.
            </p>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CLAUDE CODE" hue={263} />
    </div>
  );
}
