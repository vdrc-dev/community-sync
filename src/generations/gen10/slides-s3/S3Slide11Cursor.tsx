import { motion } from 'framer-motion';
import { Code2, Eye, FolderTree, Layers, Terminal, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const POWERS = [
  { icon: FolderTree, label: 'Multi-archivo', accent: S3_ACCENT.amber },
  { icon: Eye, label: 'Preview en vivo', accent: S3_ACCENT.cyan },
  { icon: Layers, label: 'Contexto total', accent: S3_ACCENT.violet },
  { icon: Terminal, label: 'Terminal integrada', accent: S3_ACCENT.emerald },
];

export function S3Slide11Cursor() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_25%_25%,_hsl(38_80%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(263_60%_55%_/_0.06),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={38} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Code2 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Desarrollo</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Cursor: <span style={{ color: S3_ACCENT.amber.text }}>IDE con IA</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-14 max-w-md mx-auto">
          Tu estudio de desarrollo para proyectos largos y consistentes
        </motion.p>

        <div className="grid grid-cols-12 gap-6">
          {/* IDE Mockup */}
          <motion.div {...m(0.2)} className="col-span-7 rounded-2xl border overflow-hidden" style={{ borderColor: 'hsl(38 80% 55% / 0.12)', background: 'hsl(38 80% 55% / 0.02)' }}>
            {/* Chrome */}
            <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(38 80% 55% / 0.08)' }}>
              <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" /></div>
              <span className="text-[9px] text-white/20 font-mono ml-2">cursor — dashboard/</span>
            </div>
            <div className="flex">
              {/* File tree */}
              <div className="w-[120px] border-r p-3 space-y-0.5" style={{ borderColor: 'hsl(0 0% 100% / 0.03)' }}>
                {['├── src/', '│ ├── App.tsx', '│ ├── Dashboard.tsx', '│ └── Charts.tsx', '├── data/', '│ └── sales.csv', '└── styles.css'].map((f, i) => (
                  <p key={i} className={`text-[9px] font-mono ${i === 2 ? 'text-amber-400/60' : 'text-white/20'}`}>{f}</p>
                ))}
              </div>
              {/* Code editor */}
              <div className="flex-1 p-3 font-mono text-[10px] space-y-0.5">
                <p><span className="text-violet-400/50">import</span> <span className="text-white/25">{'{ useState }'}</span> <span className="text-violet-400/50">from</span> <span className="text-emerald-300/60">'react'</span></p>
                <p><span className="text-violet-400/50">import</span> <span className="text-white/25">{'{ BarChart }'}</span> <span className="text-violet-400/50">from</span> <span className="text-emerald-300/60">'recharts'</span></p>
                <p className="text-white/10">&nbsp;</p>
                <p><span className="text-violet-400/50">export function </span><span className="text-amber-300/70">Dashboard</span><span className="text-white/25">{'() {'}</span></p>
                <p className="ml-3"><span className="text-white/25">const data = </span><span className="text-amber-300/70">useCSV</span><span className="text-white/25">{'("sales.csv")'}</span></p>
                <motion.p className="ml-3" {...(isExporting ? {} : { animate: { opacity: [1, 0.3, 1] }, transition: { duration: 1.5, repeat: Infinity } })}>
                  <span className="text-emerald-400/50">{'  return <BarChart data={data} />'}</span>
                </motion.p>
                <p><span className="text-white/25">{'}'}</span></p>
              </div>
            </div>
            {/* Terminal */}
            <div className="border-t px-3 py-2" style={{ borderColor: 'hsl(0 0% 100% / 0.03)' }}>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-emerald-400/40">$ npm run dev</span>
                <span className="text-[9px] font-mono text-white/15">→</span>
                <span className="text-[9px] font-mono text-emerald-400/60">localhost:3000 ✓</span>
                {!isExporting && <motion.span className="w-[5px] h-3 bg-emerald-400/40 ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />}
              </div>
            </div>
          </motion.div>

          {/* Powers grid */}
          <div className="col-span-5 grid grid-cols-2 gap-3">
            {POWERS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} {...m(0.25 + i * 0.08)}
                  className="relative group rounded-2xl border p-4 flex flex-col items-center justify-center gap-3"
                  style={{ borderColor: p.accent.border, background: p.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.06, y: -2 } })}>
                  {!isExporting && (
                    <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: p.accent.glow }} />
                  )}
                  <Icon className="w-7 h-7 relative" style={{ color: p.accent.text }} />
                  <span className="text-xs font-bold text-white/60 relative">{p.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div {...m(0.6)} className="mt-10 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Empieza gratis — <span className="text-amber-400/80 font-semibold">cursor.com</span></span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="DESARROLLO" hue={38} />
    </div>
  );
}
