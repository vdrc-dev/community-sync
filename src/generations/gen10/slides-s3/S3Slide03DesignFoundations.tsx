import { motion } from 'framer-motion';
import { Pipette, Sparkles, Target, CheckCircle2, Type } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PALETTE = [
  { hex: '#E74C3C', name: 'Coral' },
  { hex: '#2ECC71', name: 'Esmeralda' },
  { hex: '#3498DB', name: 'Cielo' },
  { hex: '#F1C40F', name: 'Sol' },
  { hex: '#9B59B6', name: 'Púrpura' },
  { hex: '#1ABC9C', name: 'Turquesa' },
];

const FONTS = [
  { name: 'Sans Serif', example: 'Inter', style: 'font-sans', use: 'Pantalla' },
  { name: 'Serif', example: 'Playfair', style: 'font-serif', use: 'Títulos' },
  { name: 'Display', example: 'Bebas Neue', style: 'font-sans font-black uppercase', use: 'Impacto' },
];

export function S3Slide03DesignFoundations() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Background — radial glows only, no bg image (too noisy for this content-dense slide) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_20%,_hsl(330_65%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_75%,_hsl(263_60%_50%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_50%,_hsl(185_70%_45%_/_0.04),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Pipette className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Fundamentos Visuales</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...m(0.06)} className="text-4xl 2xl:text-5xl font-black text-white tracking-tight mb-1">
          Diseño con{' '}
          <span style={{
            background: 'linear-gradient(135deg, hsl(330 85% 68%), hsl(280 70% 65%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 25px hsl(330 85% 68% / 0.4))',
          }}>Propósito</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[80px] origin-center mb-1.5"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.7), hsl(280 70% 65% / 0.7), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.p {...m(0.12)} className="text-white/50 text-sm mb-6 mx-auto">
          Colores + Tipografía = Comunicación visual profesional
        </motion.p>

        {/* Main grid: palette left, typography right */}
        <div className="grid grid-cols-[1.1fr_1fr] gap-5 mb-5">

          {/* LEFT — Color Palette */}
          <motion.div {...m(0.18)} className="text-left p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] relative overflow-hidden">
            <p className="text-[10px] text-white/45 uppercase tracking-[0.2em] font-bold mb-3 relative">Paleta de Colores</p>

            {/* Swatches */}
            <div className="grid grid-cols-6 gap-3 mb-4 relative">
              {PALETTE.map((c, i) => (
                <motion.div key={i} {...m(0.22 + i * 0.03)}
                  className="group flex flex-col items-center gap-1"
                  {...(isExporting ? {} : { whileHover: { scale: 1.12, y: -3 } })}>
                  <div className="w-full aspect-square rounded-xl transition-shadow duration-300"
                    style={{ background: c.hex, boxShadow: `0 4px 16px ${c.hex}40` }} />
                  <p className="text-[10px] font-mono font-bold text-white/55 mt-1">{c.hex}</p>
                  <p className="text-[10px] text-white/40">{c.name}</p>
                </motion.div>
              ))}
            </div>

            {/* Color rule pill */}
            <motion.div {...m(0.42)} className="relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
              {!isExporting && (
                <motion.div className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(330 70% 72% / 0.1) 50%, transparent 65%)', width: '50%' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5, ease: 'linear' }} />
              )}
              <div className="flex gap-1.5 relative shrink-0">
                <div className="w-4 h-4 rounded" style={{ background: '#E74C3C' }} />
                <div className="w-4 h-4 rounded" style={{ background: '#2ECC71' }} />
                <div className="w-4 h-4 rounded" style={{ background: '#F5F5F5' }} />
              </div>
              <p className="text-[11px] text-white/50 relative">Primario + Acento + Neutro = <span className="text-white/80 font-semibold">máx 3-5</span></p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Typography */}
          <motion.div {...m(0.25)} className="text-left p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] relative overflow-hidden flex flex-col">
            <p className="text-[10px] text-white/45 uppercase tracking-[0.2em] font-bold mb-3 relative">Tipografía</p>

            <div className="space-y-2.5 relative flex-1 flex flex-col justify-between">
              {FONTS.map((f, i) => (
                <motion.div key={i} {...m(0.32 + i * 0.05)}
                  className="relative p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between overflow-hidden group flex-1"
                  {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.violet.border } })}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 60% 65% / 0.06) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 6, delay: i * 0.8 }} />
                  )}
                  <div className="relative">
                    <p className={`text-xl text-white/85 ${f.style} leading-tight`}>{f.name}</p>
                    <p className="text-[10px] text-white/40 font-mono mt-0.5">{f.example}</p>
                  </div>
                  <span className="relative text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border shrink-0"
                    style={{ borderColor: S3_ACCENT.violet.border, color: S3_ACCENT.violet.text, background: S3_ACCENT.violet.bg }}>{f.use}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Design rules — 3-col */}
        <motion.div {...m(0.5)} className="grid grid-cols-3 gap-3 max-w-3xl mx-auto text-left mb-3">
          {[
            { icon: Target, rule: 'Regla 60-30-10', detail: '60% neutro, 30% primario, 10% acento. Jerarquía visual instantánea.', accent: S3_ACCENT.rose },
            { icon: CheckCircle2, rule: 'Contraste 4.5:1', detail: 'Mínimo para texto normal (WCAG AA). Verifica en webaim.org/contrast', accent: S3_ACCENT.emerald },
            { icon: Type, rule: 'Máx 2 fuentes', detail: 'Una display para títulos + una body para texto. Nunca más de 3.', accent: S3_ACCENT.violet },
          ].map((t, i) => {
            const RuleIcon = t.icon;
            return (
              <motion.div key={i} {...m(0.54 + i * 0.04)}
                className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] group relative overflow-hidden"
                {...(isExporting ? {} : { whileHover: { borderColor: t.accent.border } })}>
                {!isExporting && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 35%, ${t.accent.text}06 50%, transparent 65%)` }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.7 }} />
                )}
                <div className="relative flex items-start gap-2.5">
                  <RuleIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: t.accent.text }} />
                  <div>
                    <p className="text-[11px] text-white/65 font-semibold mb-1">{t.rule}</p>
                    <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tool links */}
        <motion.div {...m(0.65)} className="inline-flex items-center gap-2 text-xs text-white/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/50" />
          <span>
            <a href="https://coolors.co" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Coolors.co</a>
            {' '}para paletas ·{' '}
            <a href="https://fontjoy.com" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Fontjoy</a>
            {' '}para pares ·{' '}
            <a href="https://realtimecolors.com" target="_blank" rel="noopener noreferrer" className="text-amber-400/80 font-semibold hover:text-amber-300 underline-offset-2 hover:underline">Realtime Colors</a>
            {' '}para preview
          </span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" contextHint="color, tipografía y jerarquía" />
    </div>
  );
}
