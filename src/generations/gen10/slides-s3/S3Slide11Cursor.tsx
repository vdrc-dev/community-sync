import { motion } from 'framer-motion';
import { Code2, Eye, FolderTree, Layers, Terminal, Lightbulb } from 'lucide-react';
import bgCursor from '@/assets/gen10-s3/bg-cursor-ide.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const FEATURES = [
  { title: 'Gestión de Contexto', desc: 'Cursor entiende múltiples archivos y sus relaciones. Ideal para proyectos grandes.', icon: FolderTree, color: 'hsl(38 90% 55%)' },
  { title: 'Preview en Tiempo Real', desc: 'Ve los cambios mientras la IA escribe. Como ver construir tu casa en vivo.', icon: Eye, color: 'hsl(185 70% 50%)' },
  { title: 'Multi-Archivo', desc: 'Edita HTML, CSS, JavaScript y datos en paralelo. Cursor mantiene la coherencia.', icon: Layers, color: 'hsl(280 70% 60%)' },
  { title: 'Terminal Integrada', desc: 'Ejecuta comandos, instala dependencias y lanza tu app desde el mismo lugar.', icon: Terminal, color: 'hsl(150 60% 50%)' },
];

const FILE_TREE = [
  { name: '├── src/', indent: 0, active: false },
  { name: '│   ├── App.tsx', indent: 1, active: false },
  { name: '│   ├── Dashboard.tsx', indent: 1, active: true },
  { name: '│   └── Charts.tsx', indent: 1, active: false },
  { name: '├── data/', indent: 0, active: false },
  { name: '│   └── sales.csv', indent: 1, active: false },
  { name: '└── styles.css', indent: 0, active: false },
];

export function S3Slide11Cursor() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgCursor} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/50 to-[#04030a]/80" />
      </div>
      <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={38} secondaryHue={263} tertiaryHue={185} />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3"
            style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Code2 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Desarrollo</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Cursor: <span className="text-amber-400">IDE con IA</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Para proyectos largos y consistentes — tu estudio de desarrollo</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {/* IDE Mockup */}
          <motion.div {...m(0.15)} className="col-span-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
              <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/60" /></div>
              <span className="text-[10px] text-white/30 ml-2 font-mono">cursor — sales-dashboard/</span>
            </div>
            <div className="flex">
              {/* File tree */}
              <div className="w-[160px] border-r border-white/[0.04] p-3 space-y-0.5">
                {FILE_TREE.map((f, i) => (
                  <p key={i} className={`text-[10px] font-mono ${f.active ? 'text-amber-400/70' : 'text-white/25'}`}>{f.name}</p>
                ))}
              </div>
              {/* Editor with line numbers */}
              <div className="flex-1 p-4 font-mono text-[11px]">
                {[
                  { num: 1, content: <span className="text-violet-400/50">{'// Dashboard.tsx'}</span> },
                  { num: 2, content: <><span className="text-rose-400/50">import</span><span className="text-white/30">{' { useState } '}</span><span className="text-rose-400/50">from</span><span className="text-emerald-300/70">{" 'react'"}</span></> },
                  { num: 3, content: <><span className="text-rose-400/50">import</span><span className="text-white/30">{' { BarChart } '}</span><span className="text-rose-400/50">from</span><span className="text-emerald-300/70">{" 'recharts'"}</span></> },
                  { num: 4, content: <span className="text-white/10">{''}</span> },
                  { num: 5, content: <><span className="text-violet-400/50">{'export function '}</span><span className="text-amber-300/70">Dashboard</span><span className="text-white/30">{'() {'}</span></> },
                  { num: 6, content: <><span className="text-white/30 ml-4">{'const data = '}</span><span className="text-amber-300/70">useCSVData</span><span className="text-white/30">{'('}</span><span className="text-emerald-300/70">{'"sales.csv"'}</span><span className="text-white/30">{')'}</span></> },
                  { num: 7, content: <span className="text-white/10 ml-4">{' '}</span> },
                  { num: 8, content: 'generating' },
                  { num: 9, content: <span className="text-white/30">{'}'}</span> },
                ].map((line) => (
                  <div key={line.num} className="flex leading-5">
                    <span className="w-6 text-right mr-4 text-white/10 select-none">{line.num}</span>
                    {line.content === 'generating' ? (
                      <motion.span {...(isExporting ? {} : { animate: { opacity: [1, 0.3, 1] }, transition: { duration: 1.5, repeat: Infinity } })}>
                        <span className="text-emerald-400/50 ml-4">{'  return <BarChart data={data} />'}</span>
                      </motion.span>
                    ) : (
                      line.content
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Terminal with blinking cursor */}
            <div className="border-t border-white/[0.04] px-4 py-2.5 bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400/40">$ npm run dev</span>
                <span className="text-[10px] font-mono text-white/20">→</span>
                <span className="text-[10px] font-mono text-emerald-400/60">localhost:3000 ✓</span>
                {!isExporting && <motion.span className="w-[6px] h-3 bg-emerald-400/40 ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />}
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="col-span-5 space-y-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} {...m(0.2 + i * 0.08)}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  {...(isExporting ? {} : { whileHover: { borderColor: f.color.replace(')', ' / 0.3)'), scale: 1.02 } })}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${f.color.replace(')', ' / 0.1)')}`, border: `1px solid ${f.color.replace(')', ' / 0.25)')}` }}>
                      <Icon className="w-4 h-4" style={{ color: f.color }} />
                    </div>
                    <span className="text-sm font-bold text-white">{f.title}</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed pl-11">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div {...m(0.55)} className="mt-5 p-3 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-300/60">Empieza con la versión gratuita. Paga solo si el uso lo requiere.</p>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="DESARROLLO" hue={38} />
    </div>
  );
}
