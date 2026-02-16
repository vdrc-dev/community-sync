import { motion } from 'framer-motion';
import { BarChart3, FileSpreadsheet, ArrowRight, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import bgCanvas from '@/assets/gen10-s3/bg-canvas-dashboard.jpg';

export function S3Slide03Canvas() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgCanvas} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.04]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,_hsl(185_70%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(263_60%_55%_/_0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_transparent_35%,_hsl(185_70%_60%_/_0.08)_50%,_transparent_65%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={12} primaryHue={185} secondaryHue={263} tertiaryHue={330} showAurora />
      </div>

      {!isExporting && (
        <>
          <motion.div
            className="absolute left-[16%] top-[34%] px-3 py-1 rounded-full border text-[10px] font-bold text-cyan-200/80 bg-cyan-400/10 border-cyan-300/20"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            live
          </motion.div>
          <motion.div
            className="absolute right-[19%] top-[30%] px-3 py-1 rounded-full border text-[10px] font-bold text-emerald-200/80 bg-emerald-400/10 border-emerald-300/20"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            +12%
          </motion.div>
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
            <BarChart3 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.cyan.text }}>Fundamentos Visuales</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
          Canvas: <span
            style={{
              background: 'linear-gradient(135deg, hsl(185 70% 65%), hsl(263 60% 70%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(185 70% 65% / 0.4))',
            }}>Datos → Dashboard</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[128px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(185 70% 65% / 0.8), hsl(263 60% 70% / 0.8), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.p {...m(0.15)} className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
          Transforma cualquier dataset en visualizaciones interactivas sin código
        </motion.p>

        {/* Stats bar */}
        <motion.div {...m(0.18)} className="flex items-center justify-center gap-6 mb-12">
          {[
            { stat: '30 seg', desc: 'CSV → gráfico' },
            { stat: '12+', desc: 'tipos de chart' },
            { stat: '$0', desc: 'gratis en Gemini' },
          ].map((s, i) => (
            <div key={i} className="text-center px-4">
              <p className="text-xl font-black" style={{ color: S3_ACCENT.cyan.text }}>{s.stat}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{s.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Visual flow: CSV → Canvas → Dashboard */}
        <div className="flex items-center justify-center gap-6">
          {/* Input: CSV */}
          <motion.div {...m(0.2)} className="w-44 relative">
            {!isExporting && (
              <motion.div className="absolute -inset-4 rounded-full border-2 border-dashed pointer-events-none" style={{ borderColor: `${S3_ACCENT.cyan.dot}40`, opacity: 0.25 }}
                animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} />
            )}
            <div className="relative p-5 rounded-2xl border flex flex-col items-center gap-3" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
              <FileSpreadsheet className="w-10 h-10" style={{ color: S3_ACCENT.cyan.text }} />
              <div>
                <p className="text-sm font-black text-white">Tu Dataset</p>
                <p className="text-[10px] text-white/35 mt-0.5">CSV · Captura · Texto</p>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div {...m(0.3)} className="flex items-center gap-1">
            {[0, 1, 2].map(j => (
              <motion.div key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: S3_ACCENT.cyan.dot }}
                {...(isExporting ? {} : { animate: { x: [0, 8, 16], opacity: [0, 1, 0] }, transition: { duration: 1.2, repeat: Infinity, delay: j * 0.25 } })} />
            ))}
            <ArrowRight className="w-5 h-5 ml-1" style={{ color: `${S3_ACCENT.cyan.text}60` }} />
          </motion.div>

          {/* Output: Dashboard mockup — shimmer + pulsing glow */}
          <motion.div {...m(0.35)} className="flex-1 max-w-[420px] relative" {...(isExporting ? {} : { whileHover: { scale: 1.03, y: -3 } })}>
            {!isExporting && (
              <motion.div className="absolute -inset-4 rounded-3xl pointer-events-none z-0"
                style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${S3_ACCENT.cyan.glow}, transparent 70%)`, opacity: 0.5 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
            )}
            {!isExporting && (
              <motion.div
                className="absolute -inset-6 rounded-[28px] border border-dashed pointer-events-none"
                style={{ borderColor: `${S3_ACCENT.cyan.dot}26` }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
              />
            )}
            <div className="relative rounded-2xl border overflow-hidden" style={{ borderColor: 'hsl(185 70% 50% / 0.15)', background: 'hsl(185 70% 50% / 0.03)' }}>
              {!isExporting && (
                <motion.div className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%, transparent 100%)', width: '45%' }}
                  animate={{ x: ['-150%', '250%'] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.5, ease: 'linear' }} />
              )}
              {/* Browser chrome (shimmer layer is above this) */}
              <div className="relative px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(185 70% 50% / 0.1)' }}>
                <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" /></div>
                <span className="text-[10px] text-white/40 font-mono ml-2">dashboard.html</span>
              </div>
              {/* Metrics row */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[{ v: '$2.4M', d: '+12%' }, { v: '1,847', d: '+8%' }, { v: '$1.3K', d: '+3%' }].map((mt, i) => (
                    <div key={i} className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-center">
                      <p className="text-sm font-black text-white">{mt.v}</p>
                      <p className="text-[10px] text-emerald-400/70 font-bold">{mt.d}</p>
                    </div>
                  ))}
                </div>
                {/* Bar chart */}
                <div className="flex items-end gap-1 h-20 px-1">
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
        <motion.div {...m(0.55)} className="mt-10 max-w-2xl mx-auto grid grid-cols-3 gap-3 text-left">
          {[
            { tip: 'Pide "hazme un dashboard interactivo"', detail: 'Canvas genera HTML+JS que puedes exportar' },
            { tip: 'Itera en tiempo real', detail: '"Cambia a barras horizontales y agrega tooltip"' },
            { tip: 'Copia el código', detail: 'Pega el HTML en tu sitio o comparte como link' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.58 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...m(0.7)} className="mt-6 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Disponible en <span className="text-amber-400/80 font-semibold">ChatGPT Canvas</span> y <span className="text-amber-400/80 font-semibold">Gemini</span> — gratis</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" hue={185} contextHint="Canvas para análisis visual" />
    </div>
  );
}
