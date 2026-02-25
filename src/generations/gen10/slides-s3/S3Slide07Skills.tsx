import { motion } from 'framer-motion';
import { Globe, Upload, Check, X, Sparkles, ArrowDown, Package } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

/* ── BTG Pactual palette ── */
const BTG = [
  { hex: '#0A1F44', name: 'Navy',     use: 'Fondos' },
  { hex: '#1A3A6B', name: 'Primary',  use: 'Títulos' },
  { hex: '#F5A623', name: 'Accent',   use: 'CTAs' },
  { hex: '#E8ECF1', name: 'Light',    use: 'Claros' },
  { hex: '#2ECC71', name: 'OK',       use: 'Positivo' },
  { hex: '#E74C3C', name: 'Alert',    use: 'Negativo' },
];

/* ── Chaotic "bad brand" colors ── */
const CHAOS = ['#e74c3c', '#3498db', '#ff6b35', '#9b59b6', '#1abc9c', '#f39c12', '#e91e63'];

export function S3Slide07Skills() {
  const { isExporting } = useExportContext();
  const m = (d: number, o?: object) => s3Motion(d, isExporting, o);
  const me = (d: number, o?: object) => s3MotionEpic(d, isExporting, o);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* ── Atmosphere ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_20%_20%,_hsl(330_70%_55%_/_0.14),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_80%_75%,_hsl(263_60%_50%_/_0.1),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_45%,_hsl(38_85%_55%_/_0.06),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/40 via-transparent to-[#04030a]/70" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={330} secondaryHue={263} tertiaryHue={38} showAurora showLightRays intensity={0.6} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1780px] mx-auto w-full py-4">

        {/* ── HEADER ── */}
        <motion.div {...m(0)} className="text-center mb-4">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/35 block mb-1">Herramientas de Creación</span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.05]">
            Tu Marca como{' '}
            <span style={s3GradientText('hsl(330 90% 70%)', 'hsl(280 75% 68%)', 330)}>Skill</span>
          </h1>
          <motion.div
            className="h-[3px] rounded-full mx-auto max-w-[140px] mt-2.5 origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(330 90% 70% / 0.8), hsl(280 75% 68% / 0.8), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: S3_EASE }}
          />
        </motion.div>

        {/* ── MAIN 2-ROW LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-5 mb-3">

          {/* ═══ LEFT: BEFORE → AFTER VISUAL ═══ */}
          <motion.div {...me(0.08)} className="flex flex-col gap-2">

            {/* BEFORE — chaotic visual */}
            <div className="rounded-2xl border p-5 relative overflow-hidden"
              style={{ borderColor: 'hsl(0 60% 50% / 0.25)', background: 'hsl(0 60% 50% / 0.04)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 60% 50% / 0.2)' }}>
                  <X className="w-4 h-4 text-red-400/90" />
                </div>
                <span className="text-xs font-black tracking-[0.12em] uppercase text-red-400/80">Sin Skill</span>
              </div>

              {/* Chaotic scattered swatches — the VISUAL hero */}
              <div className="relative h-[90px] mb-2">
                {CHAOS.map((c, i) => (
                  <motion.div key={i}
                    className="absolute rounded-lg border border-white/5"
                    style={{
                      background: c,
                      width: `${28 + (i % 3) * 8}px`,
                      height: `${28 + (i % 3) * 8}px`,
                      left: `${8 + i * 13}%`,
                      top: `${10 + (i % 3) * 22}px`,
                      opacity: 0.55,
                      boxShadow: `0 0 20px ${c}40`,
                    }}
                    {...(isExporting ? {} : {
                      animate: {
                        rotate: [i * 15 - 45, i * 15 + 15, i * 15 - 45],
                        y: [0, -4, 0],
                      },
                      transition: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
                    })}
                  />
                ))}
                {/* Overlay X lines */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-full h-px bg-red-400/50 absolute rotate-12" />
                  <div className="w-full h-px bg-red-400/50 absolute -rotate-12" />
                </div>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {['Colores random', 'Fonts mezcladas', 'Logos pixelados'].map((t, i) => (
                  <span key={i} className="text-[8px] px-2 py-0.5 rounded-full border text-red-400/60"
                    style={{ borderColor: 'hsl(0 50% 50% / 0.15)', background: 'hsl(0 50% 50% / 0.06)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <motion.div {...m(0.25)} className="flex justify-center py-0.5">
              <motion.div
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: S3_ACCENT.emerald.text + '40',
                  background: S3_ACCENT.emerald.bg,
                  boxShadow: `0 0 20px ${S3_ACCENT.emerald.text}20`,
                }}
                {...(isExporting ? {} : { animate: { y: [0, 4, 0] }, transition: { duration: 1.2, repeat: Infinity } })}
              >
                <ArrowDown className="w-4 h-4" style={{ color: S3_ACCENT.emerald.text }} />
              </motion.div>
            </motion.div>

            {/* AFTER — clean ordered palette */}
            <div className="rounded-2xl border p-5 relative overflow-hidden"
              style={{ borderColor: S3_ACCENT.emerald.border, background: S3_ACCENT.emerald.bg }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${S3_ACCENT.emerald.text}18` }}>
                  <Check className="w-4 h-4" style={{ color: S3_ACCENT.emerald.text }} />
                </div>
                <span className="text-xs font-black tracking-[0.12em] uppercase" style={{ color: S3_ACCENT.emerald.text }}>Con Skill</span>
              </div>

              {/* Clean palette — large swatches */}
              <div className="grid grid-cols-6 gap-2 mb-2">
                {BTG.map((c, i) => (
                  <motion.div key={i} {...m(0.35 + i * 0.03)} className="flex flex-col items-center gap-1">
                    <div className="w-full aspect-square rounded-xl border border-white/15 relative overflow-hidden"
                      style={{ background: c.hex, boxShadow: `0 4px 20px ${c.hex}50` }}>
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 100%)' }} />
                    </div>
                    <span className="text-[7px] font-mono text-white/55 leading-none">{c.hex}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {['Paleta HEX fija', 'Tipografía unificada', 'Assets SVG'].map((t, i) => (
                  <span key={i} className="text-[8px] px-2 py-0.5 rounded-full border"
                    style={{ borderColor: `${S3_ACCENT.emerald.text}30`, background: `${S3_ACCENT.emerald.text}08`, color: S3_ACCENT.emerald.text }}>
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══ RIGHT: BROWSER MOCKUP — BTG PACTUAL ═══ */}
          <motion.div {...me(0.1)} className="relative rounded-2xl border overflow-hidden"
            style={{ borderColor: S3_ACCENT.rose.border, background: 'hsl(330 40% 8% / 0.6)' }}>

            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 mx-3">
                <div className="bg-white/5 rounded-md px-3 py-1 text-[9px] font-mono text-white/35 flex items-center gap-2">
                  <Globe className="w-3 h-3 text-white/25" />
                  btgpactual.cl → Skill Generator
                </div>
              </div>
              <motion.div
                className="px-2.5 py-1 rounded-full text-[8px] font-black flex items-center gap-1"
                style={{ background: S3_ACCENT.rose.bg, color: S3_ACCENT.rose.text, border: `1px solid ${S3_ACCENT.rose.border}` }}
                {...(isExporting ? {} : { animate: { opacity: [1, 0.5, 1] }, transition: { duration: 2, repeat: Infinity } })}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" /> EN VIVO
              </motion.div>
            </div>

            {/* Shimmer */}
            {!isExporting && (
              <motion.div className="absolute inset-0 z-30 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 30%, hsl(330 80% 75% / 0.08) 50%, transparent 70%)', width: '40%' }}
                animate={{ x: ['-200%', '400%'] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: 'linear' }} />
            )}

            {/* Content area */}
            <div className="p-5 relative grid grid-cols-2 gap-4">

              {/* Left panel: Palette extraction */}
              <div className="space-y-3">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Paleta Extraída</p>

                {/* Giant swatches */}
                <div className="grid grid-cols-3 gap-2">
                  {BTG.map((c, i) => (
                    <motion.div key={i} {...m(0.18 + i * 0.04)}
                      className="rounded-xl border border-white/10 relative overflow-hidden group"
                      style={{ boxShadow: `0 8px 30px ${c.hex}35` }}>
                      <div className="aspect-[4/3] relative" style={{ background: c.hex }}>
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%)' }} />
                        <div className="absolute bottom-1.5 left-2 right-2">
                          <p className="text-[7px] font-mono text-white/80 leading-none">{c.hex}</p>
                        </div>
                      </div>
                      <div className="px-2 py-1.5" style={{ background: 'hsl(0 0% 100% / 0.02)' }}>
                        <p className="text-[8px] font-bold text-white/60">{c.name}</p>
                        <p className="text-[7px] text-white/30">{c.use}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Typography block */}
                <motion.div {...m(0.4)} className="rounded-xl border p-3"
                  style={{ borderColor: 'hsl(263 50% 50% / 0.15)', background: 'hsl(263 50% 50% / 0.03)' }}>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.15em] font-bold mb-2">Tipografía</p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black text-white/80 leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Aa</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white/60 leading-none mb-0.5">Helvetica Neue</p>
                      <div className="flex gap-1">
                        <span className="text-[7px] px-1.5 py-0.5 rounded" style={{ background: '#0A1F44', color: '#E8ECF1' }}>Bold</span>
                        <span className="text-[7px] px-1.5 py-0.5 rounded" style={{ background: '#E8ECF1', color: '#0A1F44' }}>Regular</span>
                        <span className="text-[7px] px-1.5 py-0.5 rounded border border-white/10 text-white/40">Light</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right panel: Skill ZIP anatomy + flow */}
              <div className="space-y-3">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Skill ZIP Output</p>

                {/* ZIP file visual */}
                <motion.div {...me(0.2)} className="rounded-2xl border p-4 relative"
                  style={{
                    borderColor: S3_ACCENT.rose.border,
                    background: 'linear-gradient(135deg, hsl(330 50% 12% / 0.5), hsl(280 40% 10% / 0.5))',
                    boxShadow: `0 0 40px hsl(330 60% 50% / 0.08)`,
                  }}>
                  {/* File icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                      style={{
                        background: 'linear-gradient(135deg, hsl(330 70% 55%), hsl(280 60% 50%))',
                        boxShadow: '0 4px 20px hsl(330 70% 55% / 0.4)',
                      }}
                      {...(isExporting ? {} : {
                        animate: { scale: [1, 1.05, 1] },
                        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                      })}
                    >
                      <Package className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-black text-white">btg-pactual.skill</p>
                      <p className="text-[9px] text-white/35">Generado automáticamente</p>
                    </div>
                  </div>

                  {/* Contents list */}
                  <div className="space-y-1.5">
                    {[
                      { emoji: '🎨', label: 'colors.json', detail: '6 HEX + semántica', accent: S3_ACCENT.rose },
                      { emoji: '🔤', label: 'typography.json', detail: 'Familias + jerarquía', accent: S3_ACCENT.violet },
                      { emoji: '📦', label: 'assets/', detail: 'Logo SVG, iconos', accent: S3_ACCENT.cyan },
                      { emoji: '📐', label: 'rules.yaml', detail: 'Espaciado, contrastes', accent: S3_ACCENT.amber },
                    ].map((item, i) => (
                      <motion.div key={i} {...m(0.3 + i * 0.04)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg border"
                        style={{ borderColor: item.accent.border, background: item.accent.bg }}>
                        <span className="text-sm leading-none">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono font-bold text-white/65">{item.label}</span>
                          <span className="text-[8px] text-white/30 ml-1.5">{item.detail}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 3-step flow — compact */}
                <motion.div {...m(0.45)} className="rounded-xl border p-3"
                  style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.15em] font-bold mb-2">Flujo</p>
                  <div className="flex items-center gap-1">
                    {[
                      { num: '1', label: 'Analizar', icon: Globe, accent: S3_ACCENT.rose },
                      { num: '2', label: 'Generar', icon: Package, accent: S3_ACCENT.violet },
                      { num: '3', label: 'Subir', icon: Upload, accent: S3_ACCENT.emerald },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <div key={i} className="flex items-center gap-1 flex-1">
                          <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border flex-1"
                            style={{ borderColor: s.accent.border, background: s.accent.bg }}>
                            <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                              style={{ background: `${s.accent.text}18` }}>
                              <span className="text-[9px] font-black" style={{ color: s.accent.text }}>{s.num}</span>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1">
                                <Icon className="w-2.5 h-2.5" style={{ color: s.accent.text }} />
                                <span className="text-[8px] font-bold text-white/60">{s.label}</span>
                              </div>
                            </div>
                          </div>
                          {i < 2 && <span className="text-white/15 text-[10px]">→</span>}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM TAKEAWAY ── */}
        <motion.div {...m(0.55)} className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border relative overflow-hidden"
            style={{
              borderColor: 'hsl(330 60% 50% / 0.15)',
              background: 'linear-gradient(135deg, hsl(330 50% 50% / 0.04), hsl(280 40% 50% / 0.04))',
            }}>
            <Sparkles className="w-5 h-5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-sm text-white/60">
              1 archivo ZIP → la IA{' '}
              <span className="font-black text-white/90">siempre</span>{' '}
              usa tus colores, fonts y reglas
            </span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="SKILLS DE MARCA" hue={330} contextHint="tu marca como sistema de diseño reutilizable" />
    </div>
  );
}
