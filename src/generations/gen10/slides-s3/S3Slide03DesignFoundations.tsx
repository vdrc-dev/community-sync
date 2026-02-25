import { motion } from 'framer-motion';
import { Pipette, Sparkles, Target, CheckCircle2, Type, Eye, Contrast } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PALETTE = [
  { hex: '#E74C3C', name: 'Rojo' },
  { hex: '#2ECC71', name: 'Verde' },
  { hex: '#3498DB', name: 'Azul' },
  { hex: '#F1C40F', name: 'Amarillo' },
  { hex: '#9B59B6', name: 'Violeta' },
  { hex: '#1ABC9C', name: 'Teal' },
];

const FONTS = [
  { name: 'Sans Serif', example: 'Inter, Helvetica', style: 'font-sans', use: 'Moderno', tip: 'Interfaces web, dashboards, apps' },
  { name: 'Serif', example: 'Playfair, Georgia', style: 'font-serif', use: 'Elegante', tip: 'Presentaciones formales, documentos' },
  { name: 'Monospace', example: 'JetBrains Mono', style: 'font-mono', use: 'Datos', tip: 'Tablas, números alineados, código' },
];

/* 60-30-10 visual */
const RULE_SEGMENTS = [
  { pct: 60, label: '60%', sublabel: 'Neutro', color: '#1a1a2e', textColor: 'hsl(0 0% 75%)' },
  { pct: 30, label: '30%', sublabel: 'Primario', color: '#3498DB', textColor: 'white' },
  { pct: 10, label: '10%', sublabel: 'Acento', color: '#E74C3C', textColor: 'white' },
];

export function S3Slide03DesignFoundations() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_20%,_hsl(330_65%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_75%,_hsl(263_60%_50%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_50%,_hsl(185_70%_45%_/_0.04),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1680px] mx-auto w-full py-6">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-2" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Pipette className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Fundamentos Visuales</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-1">
            Diseño con{' '}
            <span style={{
              background: 'linear-gradient(135deg, hsl(330 85% 68%), hsl(280 70% 65%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(330 85% 68% / 0.4))',
            }}>Propósito</span>
          </h1>
          <motion.div
            className="h-0.5 rounded-full mx-auto max-w-[80px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.7), hsl(280 70% 65% / 0.7), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: S3_EASE }}
          />
        </motion.div>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* COL 1: Color Palette */}
          <motion.div {...me(0.08)} className="rounded-2xl border p-5 relative overflow-hidden"
            style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">Paleta de Colores</p>

            {/* Swatches with names */}
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {PALETTE.map((c, i) => (
                <motion.div key={i} {...m(0.12 + i * 0.03)}
                  className="flex flex-col items-center gap-1.5"
                  {...(isExporting ? {} : { whileHover: { scale: 1.1, y: -3 } })}>
                  <div className="w-full aspect-square rounded-xl relative overflow-hidden"
                    style={{ background: c.hex, boxShadow: `0 6px 20px ${c.hex}50` }}>
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.18) 100%)' }} />
                  </div>
                  <p className="text-[9px] font-mono font-bold text-white/50">{c.hex}</p>
                </motion.div>
              ))}
            </div>

            {/* HEX explanation */}
            <motion.div {...m(0.35)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border"
              style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
              <div className="flex gap-1.5 shrink-0">
                <div className="w-4 h-4 rounded" style={{ background: '#E74C3C' }} />
                <div className="w-4 h-4 rounded" style={{ background: '#2ECC71' }} />
                <div className="w-4 h-4 rounded" style={{ background: '#F5F5F5' }} />
              </div>
              <p className="text-[10px] text-white/50">HEX = receta exacta del color. Máx <span className="text-white/80 font-semibold">3-5 colores</span></p>
            </motion.div>
          </motion.div>

          {/* COL 2: Typography */}
          <motion.div {...me(0.12)} className="rounded-2xl border p-5 relative overflow-hidden flex flex-col"
            style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">Tipografía — 3 Familias</p>

            <div className="space-y-2.5 flex-1">
              {FONTS.map((f, i) => (
                <motion.div key={i} {...m(0.2 + i * 0.05)}
                  className="relative p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
                  {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.violet.border } })}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 60% 65% / 0.06) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 6, delay: i * 0.8 }} />
                  )}
                  <div className="relative flex items-center justify-between mb-1">
                    <p className={`text-lg text-white/85 ${f.style} leading-tight`}>{f.name}</p>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border shrink-0"
                      style={{ borderColor: S3_ACCENT.violet.border, color: S3_ACCENT.violet.text, background: S3_ACCENT.violet.bg }}>{f.use}</span>
                  </div>
                  <div className="relative flex items-center justify-between">
                    <p className="text-[10px] text-white/40 font-mono">{f.example}</p>
                    <p className="text-[10px] text-white/35 italic">{f.tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fontjoy CTA */}
            <motion.div {...m(0.42)} className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg border border-violet-500/20 bg-violet-500/5">
              <Type className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <p className="text-[10px] text-white/50">
                <a href="https://fontjoy.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 font-semibold hover:text-violet-300 underline-offset-2 hover:underline">Fontjoy.com</a>
                {' '}— genera pares de fuentes con IA
              </p>
            </motion.div>
          </motion.div>

          {/* COL 3: Rules — visual 60-30-10 + Contrast */}
          <div className="flex flex-col gap-4">
            {/* 60-30-10 Visual Rule */}
            <motion.div {...me(0.16)} className="rounded-2xl border p-5 relative overflow-hidden"
              style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Regla 60-30-10</p>
              </div>

              {/* Visual bar */}
              <div className="flex rounded-xl overflow-hidden h-14 mb-3">
                {RULE_SEGMENTS.map((seg, i) => (
                  <motion.div key={i}
                    className="flex items-center justify-center relative overflow-hidden"
                    style={{ width: `${seg.pct}%`, background: seg.color }}
                    {...(isExporting ? {} : {
                      initial: { width: 0 },
                      animate: { width: `${seg.pct}%` },
                      transition: { delay: 0.5 + i * 0.15, duration: 0.7, ease: S3_EASE },
                    })}>
                    <div className="text-center">
                      <p className="text-sm font-black" style={{ color: seg.textColor }}>{seg.label}</p>
                      <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: seg.textColor, opacity: 0.7 }}>{seg.sublabel}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-[10px] text-white/40 leading-relaxed">
                60% neutro, 30% primario, 10% acento = <span className="text-white/65 font-semibold">jerarquía instantánea</span>
              </p>
            </motion.div>

            {/* Contrast checker visual */}
            <motion.div {...me(0.22)} className="rounded-2xl border p-5 relative overflow-hidden"
              style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Contrast className="w-3.5 h-3.5" style={{ color: S3_ACCENT.emerald.text }} />
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Contraste WCAG</p>
              </div>

              {/* Good vs Bad contrast examples */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg p-3 relative" style={{ background: '#1a1a2e' }}>
                  <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>Aa</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" style={{ color: S3_ACCENT.emerald.text }} />
                    <span className="text-[8px] font-bold" style={{ color: S3_ACCENT.emerald.text }}>14:1 ✓</span>
                  </div>
                </div>
                <div className="rounded-lg p-3 relative" style={{ background: '#888888' }}>
                  <p className="text-sm font-bold" style={{ color: '#aaaaaa' }}>Aa</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Eye className="w-3 h-3 text-red-400/80" />
                    <span className="text-[8px] font-bold text-red-400/80">1.5:1 ✗</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-white/40">
                Mín <span className="text-white/65 font-semibold">4.5:1</span> para texto normal ·{' '}
                <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer"
                  className="text-emerald-400/80 font-semibold hover:text-emerald-300 underline-offset-2 hover:underline">WebAIM</a>
              </p>
            </motion.div>

            {/* Max 2 fonts rule */}
            <motion.div {...m(0.3)} className="rounded-xl border p-4 relative overflow-hidden"
              style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
              <div className="flex items-start gap-2.5">
                <Type className="w-4 h-4 mt-0.5 shrink-0" style={{ color: S3_ACCENT.violet.text }} />
                <div>
                  <p className="text-[11px] text-white/65 font-semibold mb-0.5">Máx 2 fuentes</p>
                  <p className="text-[10px] text-white/40 leading-relaxed">Display + Body. Nunca más de 3.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tool links */}
        <motion.div {...m(0.55)} className="text-center">
          <div className="inline-flex items-center gap-4 text-xs text-white/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400/50 shrink-0" />
            <span>
              <a href="https://coolors.co" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Coolors.co</a>
              {' '}paletas ·{' '}
              <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">WebAIM</a>
              {' '}contraste ·{' '}
              <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Google Fonts</a>
              {' '}1500+ gratis
            </span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" contextHint="color, tipografía y jerarquía" />
    </div>
  );
}
