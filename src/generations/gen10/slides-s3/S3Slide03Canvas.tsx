import { motion } from 'framer-motion';
import { BarChart3, FileSpreadsheet, ArrowRight, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

export function S3Slide03Canvas() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Background — radial glows only */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_20%,_hsl(185_70%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_75%,_hsl(263_60%_50%_/_0.07),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_50%,_hsl(185_70%_55%_/_0.04),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={185} secondaryHue={263} tertiaryHue={330} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
            <BarChart3 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.cyan.text }}>Fundamentos Visuales</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...m(0.06)} className="text-4xl 2xl:text-5xl font-black text-white tracking-tight mb-1">
          Canvas:{' '}
          <span style={{
            background: 'linear-gradient(135deg, hsl(185 70% 65%), hsl(263 60% 70%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 25px hsl(185 70% 65% / 0.4))',
          }}>Datos → Dashboard</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[100px] origin-center mb-1.5"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(185 70% 65% / 0.7), hsl(263 60% 70% / 0.7), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.p {...m(0.12)} className="text-white/50 text-sm mb-6 mx-auto">
          Transforma cualquier dataset en visualizaciones interactivas sin código
        </motion.p>

        {/* Stats row */}
        <motion.div {...m(0.16)} className="flex items-center justify-center gap-8 mb-6">
          {[
            { stat: '30 seg', desc: 'CSV → gráfico' },
            { stat: '12+', desc: 'tipos de chart' },
            { stat: '$0', desc: 'gratis en Gemini' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-lg font-black" style={{ color: S3_ACCENT.cyan.text }}>{s.stat}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{s.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Main visual: CSV → Dashboard flow */}
        <div className="flex items-center justify-center gap-5 mb-6">

          {/* Input: CSV card */}
          <motion.div {...m(0.2)} className="w-40 shrink-0">
            <div className="relative p-5 rounded-2xl border flex flex-col items-center gap-2" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
              <FileSpreadsheet className="w-9 h-9 relative" style={{ color: S3_ACCENT.cyan.text }} />
              <div className="relative text-center">
                <p className="text-sm font-black text-white">Tu Dataset</p>
                <p className="text-[10px] text-white/40 mt-0.5">CSV · Captura · Texto</p>
              </div>
            </div>
          </motion.div>

          {/* Animated arrow */}
          <motion.div {...m(0.28)} className="flex items-center gap-1 shrink-0">
            {[0, 1, 2].map(j => (
              <motion.div key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: S3_ACCENT.cyan.dot }}
                {...(isExporting ? {} : { animate: { x: [0, 8, 16], opacity: [0, 1, 0] }, transition: { duration: 1.2, repeat: Infinity, delay: j * 0.25 } })} />
            ))}
            <ArrowRight className="w-5 h-5 ml-1" style={{ color: S3_ACCENT.cyan.text + '60' }} />
          </motion.div>

          {/* Output: Dashboard mockup */}
          <motion.div {...m(0.32)} className="flex-1 max-w-[400px]" {...(isExporting ? {} : { whileHover: { scale: 1.02 } })}>
            <div className="relative rounded-2xl border overflow-hidden" style={{ borderColor: 'hsl(185 70% 50% / 0.15)', background: 'hsl(185 70% 50% / 0.03)' }}>
              {!isExporting && (
                <motion.div className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 72% / 0.1) 50%, transparent 65%)', width: '45%' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4, ease: 'linear' }} />
              )}
              {/* Browser chrome */}
              <div className="relative px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(185 70% 50% / 0.1)' }}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] text-white/40 font-mono ml-2">dashboard.html</span>
              </div>
              {/* Metrics + chart */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[{ v: '$2.4M', d: '+12%' }, { v: '1,847', d: '+8%' }, { v: '$1.3K', d: '+3%' }].map((mt, i) => (
                    <div key={i} className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-center">
                      <p className="text-sm font-black text-white">{mt.v}</p>
                      <p className="text-[10px] text-emerald-400/70 font-bold">{mt.d}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-1 h-16 px-1">
                  {[65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95, 72].map((h, i) => (
                    <motion.div key={i} className="flex-1 rounded-t"
                      style={{ height: `${h}%`, background: `hsl(185 70% 50% / ${0.2 + (h / 100) * 0.5})` }}
                      {...(isExporting ? {} : { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { delay: 0.5 + i * 0.04, duration: 0.4 } })} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pro tips */}
        <motion.div {...m(0.5)} className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-left mb-4">
          {[
            { tip: 'Pide "hazme un dashboard interactivo"', detail: 'Canvas genera HTML+JS que puedes exportar' },
            { tip: 'Itera en tiempo real', detail: '"Cambia a barras horizontales y agrega tooltip"' },
            { tip: 'Copia el código', detail: 'Pega el HTML en tu sitio o comparte como link' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.54 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]"
              {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.cyan.border } })}>
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tool link */}
        <motion.div {...m(0.65)} className="inline-flex items-center gap-2 text-xs text-white/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/50" />
          <span>
            Disponible en{' '}
            <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">ChatGPT Canvas</a>
            {' '}y{' '}
            <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Gemini</a>
            {' '}— gratis
          </span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" hue={185} contextHint="Canvas para análisis visual" />
    </div>
  );
}
