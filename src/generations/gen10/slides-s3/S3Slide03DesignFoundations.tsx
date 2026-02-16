import { motion } from 'framer-motion';
import { Pipette, Sparkles, Target, CheckCircle2, Type } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import bgDesign from '@/assets/gen10-s3/bg-design-foundations.jpg';

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
      <div className="absolute inset-0">
        <img src={bgDesign} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_25%,_hsl(330_65%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_75%_65%,_hsl(280_60%_55%_/_0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_50%_55%,_hsl(263_60%_55%_/_0.04),_transparent_70%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={12} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora />
      </div>

      {/* Floating decorative pills */}
      {!isExporting && (
        <>
          <motion.div className="absolute left-[14%] top-[42%] text-[10px] font-mono font-bold tracking-wider text-white/40"
            animate={{ y: [0, -6, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}>HEX</motion.div>
          <motion.div className="absolute right-[16%] top-[45%] text-[10px] font-mono font-bold tracking-wider text-white/40"
            animate={{ y: [0, 5, 0], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}>RGB</motion.div>
          <motion.div className="absolute right-[20%] bottom-[28%] text-[10px] font-mono font-bold tracking-wider text-white/40"
            animate={{ y: [0, -4, 0], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>WOFF2</motion.div>
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Pipette className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Fundamentos Visuales</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
          Diseño con <span
            style={{
              background: 'linear-gradient(135deg, hsl(330 85% 68%), hsl(280 70% 65%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(330 85% 68% / 0.4))',
            }}>Propósito</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[112px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.8), hsl(280 70% 65% / 0.8), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.p {...m(0.15)} className="text-white/45 text-lg mb-14 max-w-md mx-auto">
          Colores + Tipografía = Comunicación visual profesional
        </motion.p>

        <div className="grid grid-cols-2 gap-10">
          {/* LEFT: Color palette visual */}
          <motion.div {...m(0.2)} className="text-left relative">
            {/* Animated color-mixing blurred circle */}
            {!isExporting && (
              <motion.div className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-60"
                animate={{ background: ['#E74C3C', '#2ECC71', '#3498DB', '#F1C40F', '#9B59B6', '#1ABC9C', '#E74C3C'] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
            )}
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-4">Paleta de Colores</p>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {PALETTE.map((c, i) => (
                <motion.div key={i} {...m(0.25 + i * 0.04)}
                  className="group flex flex-col items-center gap-2"
                  {...(isExporting ? {} : { whileHover: { scale: 1.1, y: -4 } })}>
                  <div className="w-full aspect-square rounded-xl transition-shadow duration-300"
                    style={{ background: c.hex, boxShadow: `0 8px 24px ${c.hex}44` }} />
                  <div>
                    <p className="text-[10px] font-mono font-bold text-white/50">{c.hex}</p>
                    <p className="text-[10px] text-white/40">{c.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Color rule — with shimmer */}
            <div className="relative overflow-hidden flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
              {!isExporting && (
                <motion.div className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%, transparent 100%)', width: '50%' }}
                  animate={{ x: ['-150%', '250%'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'linear' }} />
              )}
              <div className="flex gap-1 relative">
                <div className="w-6 h-6 rounded-lg" style={{ background: '#E74C3C' }} />
                <div className="w-6 h-6 rounded-lg" style={{ background: '#2ECC71' }} />
                <div className="w-6 h-6 rounded-lg" style={{ background: '#F5F5F5' }} />
              </div>
              <p className="text-xs text-white/40 relative">Primario + Acento + Neutro = <span className="text-white/70 font-semibold">máx 3-5</span></p>
            </div>
          </motion.div>

          {/* RIGHT: Typography visual */}
          <motion.div {...m(0.3)} className="text-left">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-4">Tipografía</p>
            <div className="space-y-3">
              {FONTS.map((f, i) => (
                <motion.div key={i} {...m(0.35 + i * 0.06)}
                  className="relative p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between overflow-hidden group"
                  {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.violet.border, scale: 1.02 } })}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 60% 65% / 0.08) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.6 }} />
                  )}
                  <div className="relative">
                    <p className={`text-2xl text-white/80 ${f.style}`}>{f.name}</p>
                    <p className="text-[10px] text-white/40 font-mono mt-0.5">{f.example}</p>
                  </div>
                  <span className="relative text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                    style={{ borderColor: S3_ACCENT.violet.border, color: S3_ACCENT.violet.text, background: S3_ACCENT.violet.bg }}>{f.use}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Design rules */}
        <motion.div {...m(0.55)} className="mt-8 max-w-3xl mx-auto grid grid-cols-3 gap-3 text-left">
          {[
            { icon: Target, rule: 'Regla 60-30-10', detail: '60% neutro, 30% primario, 10% acento. Jerarquía visual instantánea.', accent: S3_ACCENT.rose },
            { icon: CheckCircle2, rule: 'Contraste 4.5:1', detail: 'Mínimo para texto normal (WCAG AA). Verifica en webaim.org/contrast', accent: S3_ACCENT.emerald },
            { icon: Type, rule: 'Máx 2 fuentes', detail: 'Una display para títulos + una body para texto. Nunca más de 3.', accent: S3_ACCENT.violet },
          ].map((t, i) => {
            const RuleIcon = t.icon;
            return (
              <motion.div key={i} {...m(0.58 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] group relative overflow-hidden"
                {...(isExporting ? {} : { whileHover: { borderColor: t.accent.border, scale: 1.02 } })}>
                {!isExporting && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 35%, ${t.accent.text}08 50%, transparent 65%)` }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.6 }} />
                )}
                <div className="relative flex items-start gap-2.5">
                  <RuleIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: t.accent.text }} />
                  <div>
                    <p className="text-[11px] text-white/60 font-semibold mb-1">{t.rule}</p>
                    <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div {...m(0.7)} className="mt-6 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
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
