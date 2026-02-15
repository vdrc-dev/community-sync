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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,_hsl(185_70%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(263_60%_55%_/_0.06),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={185} secondaryHue={263} tertiaryHue={330} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
            <BarChart3 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.cyan.text }}>Comunicación Visual</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Canvas: <span style={{ color: S3_ACCENT.cyan.text }}>Datos → Dashboard</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-16 max-w-lg mx-auto">
          Transforma cualquier dataset en visualizaciones interactivas sin código
        </motion.p>

        {/* Visual flow: CSV → Canvas → Dashboard */}
        <div className="flex items-center justify-center gap-6">
          {/* Input: CSV */}
          <motion.div {...m(0.2)} className="w-44">
            <div className="p-5 rounded-2xl border flex flex-col items-center gap-3" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
              <FileSpreadsheet className="w-10 h-10" style={{ color: S3_ACCENT.cyan.text }} />
              <div>
                <p className="text-sm font-black text-white">Tu Dataset</p>
                <p className="text-[10px] text-white/30 mt-0.5">CSV · Captura · Texto</p>
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

          {/* Output: Dashboard mockup */}
          <motion.div {...m(0.35)} className="flex-1 max-w-[420px]">
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'hsl(185 70% 50% / 0.15)', background: 'hsl(185 70% 50% / 0.03)' }}>
              {/* Browser chrome */}
              <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(185 70% 50% / 0.1)' }}>
                <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" /></div>
                <span className="text-[9px] text-white/20 font-mono ml-2">dashboard.html</span>
              </div>
              {/* Metrics row */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[{ v: '$2.4M', d: '+12%' }, { v: '1,847', d: '+8%' }, { v: '$1.3K', d: '+3%' }].map((mt, i) => (
                    <div key={i} className="p-2 rounded-lg border border-white/[0.04] bg-white/[0.02] text-center">
                      <p className="text-sm font-black text-white">{mt.v}</p>
                      <p className="text-[9px] text-emerald-400/70 font-bold">{mt.d}</p>
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

        <motion.div {...m(0.6)} className="mt-12 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Funciona en <span className="text-amber-400/80 font-semibold">Gemini</span> y <span className="text-amber-400/80 font-semibold">ChatGPT</span> — Canvas incluido</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="COMUNICACIÓN VISUAL" hue={185} />
    </div>
  );
}
