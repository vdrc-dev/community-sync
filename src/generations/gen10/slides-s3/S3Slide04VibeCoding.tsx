import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, ArrowRight, Sparkles, Eye } from 'lucide-react';
import bgVibeCoding from '@/assets/gen10-s3/bg-vibe-coding.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PROMPTS = [
  {
    prompt: '"Usa una estética de agencia boutique de San Francisco"',
    effect: 'Tipografía serif elegante + espaciado generoso',
    color: 'hsl(280 70% 60%)',
    preview: { font: 'Playfair Display', bg: '#0a0a0a', accent: '#c4a265', spacing: '2.5rem', radius: '4px' },
  },
  {
    prompt: '"Cambia los colores a mi paleta corporativa: #1A1A2E, #16213E, #0F3460"',
    effect: 'Esquema de color profesional en 3 segundos',
    color: 'hsl(185 70% 50%)',
    preview: { font: 'Inter', bg: '#1A1A2E', accent: '#0F3460', spacing: '1.5rem', radius: '8px' },
  },
  {
    prompt: '"Hazlo más minimalista, con mucho espacio en blanco"',
    effect: 'Reducción visual + foco en datos clave',
    color: 'hsl(38 90% 55%)',
    preview: { font: 'Inter', bg: '#f8f9fa', accent: '#111827', spacing: '3rem', radius: '12px' },
  },
];

export function S3Slide04VibeCoding() {
  const { isExporting } = useExportContext();
  const [activePrompt, setActivePrompt] = useState(0);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  const active = PROMPTS[activePrompt];
  const isDark = active.preview.bg !== '#f8f9fa';

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgVibeCoding} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/40 to-[#04030a]/80" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={185} secondaryHue={280} tertiaryHue={38} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3" style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}>
            <Wand2 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.cyan.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.cyan.text }}>Comunicación Visual</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Vibe Coding: <span style={{ color: S3_ACCENT.cyan.text }}>Diseña con Palabras</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">Un prompt transforma toda la estética. Haz clic para ver el efecto en vivo.</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {/* Prompts */}
          <div className="col-span-4 space-y-3">
            <motion.p {...m(0.1)} className="text-xs text-white/30 uppercase tracking-wider font-bold mb-3 pl-1">Escribe → Transforma</motion.p>
            {PROMPTS.map((p, i) => (
              <motion.button key={i} {...m(0.15 + i * 0.08)}
                onClick={() => setActivePrompt(i)}
                {...(isExporting ? {} : { whileHover: { borderColor: 'hsl(185 70% 50% / 0.3)', scale: 1.02 } })}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${activePrompt === i ? 'bg-white/[0.04] border-white/[0.12]' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                <p className="text-sm font-mono mb-2 leading-snug" style={{ color: S3_ACCENT.cyan.text }}>{p.prompt}</p>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-white/20" />
                  <p className="text-xs text-white/40">{p.effect}</p>
                </div>
              </motion.button>
            ))}

            <motion.div {...m(0.5)} className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-400 mb-1">Pro Tip</p>
                  <p className="text-[11px] text-amber-300/60 leading-relaxed">
                    <span className="text-amber-300/80 font-semibold">Coolors.co</span> para paletas · <span className="text-amber-300/80 font-semibold">Fontjoy</span> para tipografías · <span className="text-amber-300/80 font-semibold">Canva</span> para editar PDFs
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Live preview mockup */}
          <motion.div {...m(0.25)} className="col-span-8">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/60" /></div>
                <span className="text-[10px] text-white/30 ml-2 font-mono">preview — dashboard</span>
                <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  <span className="text-[9px] text-emerald-400/70 font-bold">LIVE</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activePrompt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="p-6 transition-all duration-500" style={{ background: active.preview.bg }}>
                  {/* Mini dashboard */}
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold" style={{ color: isDark ? '#fff' : '#111', fontFamily: active.preview.font }}>Sales Dashboard</h3>
                    <div className="flex gap-2">
                      {['Q1', 'Q2', 'Q3'].map(q => (
                        <span key={q} className="text-[10px] px-2 py-1 rounded" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', borderRadius: active.preview.radius }}>{q}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[{ l: 'Revenue', v: '$2.4M', d: '+12%' }, { l: 'Clientes', v: '1,847', d: '+8%' }, { l: 'Ticket', v: '$1,298', d: '+3%' }].map((metric, i) => (
                      <div key={i} className="p-3" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderRadius: active.preview.radius, border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
                        <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)' }}>{metric.l}</p>
                        <p className="text-xl font-black" style={{ color: isDark ? '#fff' : '#111', fontFamily: active.preview.font }}>{metric.v}</p>
                        <span className="text-[10px] font-bold" style={{ color: active.preview.accent }}>{metric.d}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chart bars */}
                  <div className="flex items-end gap-1.5 h-[80px] p-3" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderRadius: active.preview.radius, border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                    {[65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95, 72].map((h, i) => (
                      <motion.div key={`${activePrompt}-${i}`} className="flex-1 rounded-t"
                        style={{ height: `${h}%`, background: active.preview.accent, opacity: 0.3 + (h / 100) * 0.5, borderRadius: `${active.preview.radius} ${active.preview.radius} 0 0` }}
                        {...(isExporting ? {} : { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { delay: 0.1 + i * 0.03, duration: 0.3 } })}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CSS output */}
            <motion.div {...m(0.4)} className="mt-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.02] font-mono text-[11px]">
              <span className="text-violet-400/50">/* Generated */</span>
              <span className="text-white/30 ml-2">--font:</span>
              <span className="text-amber-300/70 ml-1">{active.preview.font}</span>
              <span className="text-white/20 mx-2">·</span>
              <span className="text-white/30">--bg:</span>
              <span className="text-emerald-300/70 ml-1">{active.preview.bg}</span>
              <span className="text-white/20 mx-2">·</span>
              <span className="text-white/30">--accent:</span>
              <span className="text-emerald-300/70 ml-1">{active.preview.accent}</span>
              {!isExporting && <motion.span className="inline-block w-[2px] h-3 ml-1 align-middle bg-violet-400/50" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <S3Footer sectionLabel="COMUNICACIÓN VISUAL" hue={185} />
    </div>
  );
}
