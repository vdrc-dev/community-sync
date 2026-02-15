import { motion } from 'framer-motion';
import { Pipette, Sparkles } from 'lucide-react';
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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_25%,_hsl(330_65%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_75%_65%,_hsl(280_60%_55%_/_0.06),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Pipette className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Fundamentos Visuales</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Diseño con <span style={{ color: S3_ACCENT.rose.text }}>Propósito</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-14 max-w-md mx-auto">
          Colores + Tipografía = Comunicación visual profesional
        </motion.p>

        <div className="grid grid-cols-2 gap-10">
          {/* LEFT: Color palette visual */}
          <motion.div {...m(0.2)} className="text-left">
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-4">Paleta de Colores</p>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {PALETTE.map((c, i) => (
                <motion.div key={i} {...m(0.25 + i * 0.04)}
                  className="group flex flex-col items-center gap-2"
                  {...(isExporting ? {} : { whileHover: { scale: 1.1, y: -4 } })}>
                  <div className="w-full aspect-square rounded-xl transition-shadow duration-300"
                    style={{ background: c.hex, boxShadow: `0 8px 24px ${c.hex}44` }} />
                  <div>
                    <p className="text-[9px] font-mono font-bold text-white/50">{c.hex}</p>
                    <p className="text-[8px] text-white/25">{c.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Color rule */}
            <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
              <div className="flex gap-1">
                <div className="w-6 h-6 rounded-lg" style={{ background: '#E74C3C' }} />
                <div className="w-6 h-6 rounded-lg" style={{ background: '#2ECC71' }} />
                <div className="w-6 h-6 rounded-lg" style={{ background: '#F5F5F5' }} />
              </div>
              <p className="text-xs text-white/40">Primario + Acento + Neutro = <span className="text-white/70 font-semibold">máx 3-5</span></p>
            </div>
          </motion.div>

          {/* RIGHT: Typography visual */}
          <motion.div {...m(0.3)} className="text-left">
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-4">Tipografía</p>
            <div className="space-y-3">
              {FONTS.map((f, i) => (
                <motion.div key={i} {...m(0.35 + i * 0.06)}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between"
                  {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.violet.border, scale: 1.02 } })}>
                  <div>
                    <p className={`text-2xl text-white/80 ${f.style}`}>{f.name}</p>
                    <p className="text-[10px] text-white/25 font-mono mt-0.5">{f.example}</p>
                  </div>
                  <span className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                    style={{ borderColor: S3_ACCENT.violet.border, color: S3_ACCENT.violet.text, background: S3_ACCENT.violet.bg }}>{f.use}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...m(0.6)} className="mt-10 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span><span className="text-amber-400/80 font-semibold">Coolors.co</span> para paletas · <span className="text-amber-400/80 font-semibold">Fontjoy</span> para pares tipográficos</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" />
    </div>
  );
}
