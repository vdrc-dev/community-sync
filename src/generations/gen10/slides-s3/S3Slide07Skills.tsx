import { motion } from 'framer-motion';
import { Palette, Globe, Upload, Layers, ChevronRight, Check, Briefcase, Zap, X, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

/* ── BTG Pactual palette (real case from class) ── */
const BTG_COLORS = [
  { hex: '#0A1F44', name: 'Navy', use: 'Logo / Fondos' },
  { hex: '#1A3A6B', name: 'Primary', use: 'Títulos' },
  { hex: '#F5A623', name: 'Accent', use: 'CTAs / Alertas' },
  { hex: '#E8ECF1', name: 'Light', use: 'Fondos claros' },
  { hex: '#2ECC71', name: 'Positivo', use: 'Semántico ✓' },
  { hex: '#E74C3C', name: 'Negativo', use: 'Semántico ✗' },
];

/* ── Before / After examples ── */
const BEFORE_ISSUES = [
  { icon: X, text: 'Colores distintos en cada presentación' },
  { icon: X, text: 'Tipografías aleatorias' },
  { icon: X, text: 'Logos pixelados o deformados' },
];
const AFTER_WINS = [
  { icon: Check, text: 'Paleta HEX consistente siempre' },
  { icon: Check, text: 'Jerarquía tipográfica definida' },
  { icon: Check, text: 'Assets vectoriales centralizados' },
];

/* ── Skill anatomy components ── */
const ANATOMY = [
  { emoji: '🎨', label: 'Colores', detail: 'HEX + usos específicos', accent: S3_ACCENT.rose },
  { emoji: '🔤', label: 'Tipografía', detail: 'Familias + jerarquía', accent: S3_ACCENT.violet },
  { emoji: '📦', label: 'Assets', detail: 'Logo SVG, iconos', accent: S3_ACCENT.cyan },
  { emoji: '📐', label: 'Reglas', detail: 'Spacing, contrastes', accent: S3_ACCENT.amber },
];

export function S3Slide07Skills() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_25%_25%,_hsl(330_65%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_75%_70%,_hsl(263_55%_50%_/_0.07),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_50%_50%,_hsl(38_80%_55%_/_0.04),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={6} primaryHue={330} secondaryHue={263} tertiaryHue={38} showAurora intensity={0.5} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1680px] mx-auto w-full py-6">

        {/* ── HEADER ── */}
        <motion.div {...m(0)} className="text-center mb-5">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 block mb-1.5">Herramientas de Creación</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            Tu Marca como{' '}
            <span style={s3GradientText('hsl(330 85% 68%)', 'hsl(280 70% 65%)', 330)}>Skill</span>
          </h1>
          <motion.div
            className="h-[2px] rounded-full mx-auto max-w-[100px] mt-2 origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.7), hsl(280 70% 65% / 0.7), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: S3_EASE }}
          />
          <motion.p {...m(0.05)} className="text-white/45 text-sm mt-2 max-w-lg mx-auto">
            Un archivo ZIP → la IA <strong className="text-white/70">siempre</strong> usa tus colores, tipografía y reglas
          </motion.p>
        </motion.div>

        {/* ── 3-COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-4 lg:gap-5 mb-5">

          {/* ═══ COL 1: BEFORE / AFTER ═══ */}
          <motion.div {...me(0.1)} className="flex flex-col gap-3">
            {/* BEFORE */}
            <div className="rounded-xl border p-4 relative overflow-hidden"
              style={{ borderColor: 'hsl(0 60% 50% / 0.2)', background: 'hsl(0 60% 50% / 0.03)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'hsl(0 60% 50% / 0.15)' }}>
                  <X className="w-3.5 h-3.5 text-red-400/80" />
                </div>
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-red-400/70">Sin Skill</span>
              </div>
              <div className="space-y-2">
                {BEFORE_ISSUES.map((item, i) => (
                  <motion.div key={i} {...m(0.15 + i * 0.04)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                    style={{ background: 'hsl(0 50% 50% / 0.05)' }}>
                    <X className="w-3 h-3 text-red-400/50 shrink-0" />
                    <span className="text-[10px] text-white/45 leading-tight">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              {/* Chaotic color dots */}
              <div className="flex gap-1.5 mt-3 justify-center">
                {['#e74c3c', '#3498db', '#ff6b35', '#9b59b6', '#1abc9c'].map((c, i) => (
                  <motion.div key={i} className="w-5 h-5 rounded"
                    style={{ background: c, opacity: 0.4, transform: `rotate(${i * 12 - 24}deg)` }}
                    {...(isExporting ? {} : {
                      animate: { rotate: [i * 12 - 24, i * 12 + 10, i * 12 - 24] },
                      transition: { duration: 3, repeat: Infinity, delay: i * 0.2 },
                    })}
                  />
                ))}
              </div>
            </div>

            {/* Animated arrow down */}
            <motion.div {...m(0.3)} className="flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-4" style={{ background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.1), hsl(160 65% 50% / 0.3))' }} />
                <motion.div
                  className="w-6 h-6 rounded-full border flex items-center justify-center"
                  style={{ borderColor: S3_ACCENT.emerald.border, background: S3_ACCENT.emerald.bg }}
                  {...(isExporting ? {} : { animate: { y: [0, 3, 0] }, transition: { duration: 1.5, repeat: Infinity } })}
                >
                  <ChevronRight className="w-3 h-3 rotate-90" style={{ color: S3_ACCENT.emerald.text }} />
                </motion.div>
                <div className="w-px h-4" style={{ background: 'linear-gradient(180deg, hsl(160 65% 50% / 0.3), hsl(0 0% 100% / 0.1))' }} />
              </div>
            </motion.div>

            {/* AFTER */}
            <div className="rounded-xl border p-4 relative overflow-hidden"
              style={{ borderColor: S3_ACCENT.emerald.border, background: S3_ACCENT.emerald.bg }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${S3_ACCENT.emerald.text}15` }}>
                  <Check className="w-3.5 h-3.5" style={{ color: S3_ACCENT.emerald.text }} />
                </div>
                <span className="text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: S3_ACCENT.emerald.text }}>Con Skill</span>
              </div>
              <div className="space-y-2">
                {AFTER_WINS.map((item, i) => (
                  <motion.div key={i} {...m(0.35 + i * 0.04)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                    style={{ background: `${S3_ACCENT.emerald.text}06` }}>
                    <Check className="w-3 h-3 shrink-0" style={{ color: S3_ACCENT.emerald.text }} />
                    <span className="text-[10px] text-white/55 leading-tight">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              {/* Ordered color dots */}
              <div className="flex gap-1.5 mt-3 justify-center">
                {BTG_COLORS.slice(0, 5).map((c, i) => (
                  <div key={i} className="w-5 h-5 rounded border border-white/10" style={{ background: c.hex }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══ COL 2: BTG PACTUAL LIVE DEMO ═══ */}
          <motion.div {...me(0.12)} className="relative rounded-2xl border overflow-hidden"
            style={{ borderColor: S3_ACCENT.rose.border, background: 'hsl(330 55% 50% / 0.03)' }}>
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${S3_ACCENT.rose.dot}, hsl(280 60% 55%), transparent)` }} />

            {/* Shimmer */}
            {!isExporting && (
              <motion.div className="absolute inset-0 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(330 70% 72% / 0.06) 50%, transparent 65%)', width: '45%' }}
                animate={{ x: ['-150%', '350%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'linear' }} />
            )}

            <div className="p-5 relative">
              {/* Demo header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: `${S3_ACCENT.rose.text}40`, background: S3_ACCENT.rose.bg }}>
                  <Globe className="w-5 h-5" style={{ color: S3_ACCENT.rose.text }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-white">Caso Real: BTG Pactual</p>
                  <p className="text-[10px] text-white/40">Skill generado desde <span className="font-mono text-white/50">btgpactual.cl</span></p>
                </div>
                <div className="px-2.5 py-1 rounded-full border text-[9px] font-black"
                  style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg, color: S3_ACCENT.rose.text }}>
                  EN VIVO
                </div>
              </div>

              {/* Palette grid */}
              <motion.div {...m(0.2)} className="rounded-xl border p-3 mb-3"
                style={{ borderColor: 'hsl(330 50% 50% / 0.1)', background: 'hsl(330 50% 50% / 0.02)' }}>
                <p className="text-[9px] text-white/35 uppercase tracking-[0.15em] font-bold mb-2.5">Paleta Extraída Automáticamente</p>
                <div className="grid grid-cols-6 gap-2">
                  {BTG_COLORS.map((c, i) => (
                    <motion.div key={i} {...m(0.25 + i * 0.03)}
                      className="flex flex-col items-center gap-1">
                      <div className="w-full aspect-square rounded-lg border border-white/10 relative overflow-hidden"
                        style={{ background: c.hex }}>
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 rounded-lg" style={{ boxShadow: `inset 0 -8px 16px ${c.hex}80` }} />
                      </div>
                      <span className="text-[7px] font-mono text-white/50 leading-none">{c.hex}</span>
                      <span className="text-[7px] text-white/30 leading-none text-center">{c.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Typography + Font family */}
              <motion.div {...m(0.35)} className="rounded-xl border p-3 mb-3"
                style={{ borderColor: 'hsl(263 50% 50% / 0.1)', background: 'hsl(263 50% 50% / 0.02)' }}>
                <p className="text-[9px] text-white/35 uppercase tracking-[0.15em] font-bold mb-2">Tipografía Detectada</p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-white/80 leading-none mb-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      Helvetica Neue
                    </p>
                    <p className="text-[10px] text-white/35">Heading: Bold · Body: Regular · Data: Light</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="px-2 py-0.5 rounded text-[8px] font-bold text-center"
                      style={{ background: '#0A1F44', color: '#E8ECF1' }}>H1 Bold</div>
                    <div className="px-2 py-0.5 rounded text-[8px] text-center"
                      style={{ background: '#E8ECF1', color: '#0A1F44' }}>Body</div>
                  </div>
                </div>
              </motion.div>

              {/* Anatomy: what's inside */}
              <motion.div {...m(0.4)}>
                <p className="text-[9px] text-white/35 uppercase tracking-[0.15em] font-bold mb-2">Contenido del Skill ZIP</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {ANATOMY.map((a, i) => (
                    <motion.div key={i} {...m(0.42 + i * 0.03)}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg border text-center"
                      style={{ borderColor: a.accent.border, background: a.accent.bg }}>
                      <span className="text-base leading-none">{a.emoji}</span>
                      <span className="text-[9px] font-bold text-white/65">{a.label}</span>
                      <span className="text-[7px] text-white/35 leading-tight">{a.detail}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ═══ COL 3: FLOW + MULTI-BRAND + TAKEAWAY ═══ */}
          <motion.div {...me(0.15)} className="flex flex-col gap-3">

            {/* 3-Step Flow */}
            <div className="rounded-xl border p-4"
              style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <p className="text-[9px] text-white/35 uppercase tracking-[0.15em] font-bold mb-3">Flujo en 3 Pasos</p>

              {[
                { num: '1', icon: Globe, label: 'Analiza sitio web', detail: 'Cloud extrae CSS, colores, fuentes automáticamente', accent: S3_ACCENT.rose },
                { num: '2', icon: Layers, label: 'Genera skill ZIP', detail: 'Paleta + assets + reglas empaquetados', accent: S3_ACCENT.violet },
                { num: '3', icon: Upload, label: 'Sube a Cloud', detail: 'Sincronizado en todo el ecosistema', accent: S3_ACCENT.emerald },
              ].map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <div key={i}>
                    <motion.div {...m(0.2 + i * 0.06)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border"
                      style={{ borderColor: step.accent.border, background: step.accent.bg }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${step.accent.text}15`, border: `1px solid ${step.accent.text}25` }}>
                        <span className="text-[11px] font-black" style={{ color: step.accent.text }}>{step.num}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <StepIcon className="w-3 h-3 shrink-0" style={{ color: step.accent.text }} />
                          <span className="text-[10px] font-bold text-white/70">{step.label}</span>
                        </div>
                        <span className="text-[9px] text-white/35">{step.detail}</span>
                      </div>
                    </motion.div>
                    {i < 2 && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-3" style={{ background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.1), hsl(0 0% 100% / 0.03))' }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Multi-brand tip */}
            <motion.div {...m(0.45)} className="rounded-xl border p-4"
              style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 mt-0.5 shrink-0" style={{ color: S3_ACCENT.amber.text }} />
                <div>
                  <p className="text-[10px] font-bold mb-1" style={{ color: S3_ACCENT.amber.text }}>Multi-marca</p>
                  <p className="text-[9px] text-white/45 leading-relaxed">
                    1 skill por marca. Cárgalo una vez, bórralo de tu escritorio. Cloud lo guarda y aplica cuando lo activas.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Plugin concept */}
            <motion.div {...m(0.5)} className="rounded-xl border p-4"
              style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 mt-0.5 shrink-0" style={{ color: S3_ACCENT.violet.text }} />
                <div>
                  <p className="text-[10px] font-bold mb-1" style={{ color: S3_ACCENT.violet.text }}>Skill → Plugin</p>
                  <p className="text-[9px] text-white/45 leading-relaxed">
                    Un plugin agrupa <strong className="text-white/60">múltiples skills + assets + conectores API</strong>. Ej: automatizar conciliación bancaria.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── BOTTOM TAKEAWAY ── */}
        <motion.div {...m(0.6)} className="text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border"
            style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
            <Sparkles className="w-4 h-4" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-xs text-white/55">
              Toda empresa debería tener un{' '}
              <span className="font-black" style={{ color: S3_ACCENT.rose.text }}>skill gráfico</span>
              <span className="text-white/25 mx-2">→</span>
              presentaciones, PDFs y apps{' '}
              <span className="font-black text-white/80">consistentes</span>
            </span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="SKILLS DE MARCA" hue={330} contextHint="tu marca como sistema de diseño reutilizable" />
    </div>
  );
}
