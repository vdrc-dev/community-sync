import { motion } from 'framer-motion';
import { Zap, Palette, Globe, Upload, Layers, ChevronRight, Check, Briefcase } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const SKILL_COMPONENTS = [
  { label: 'Colores', detail: 'HEX oficiales + usos (logo, títulos, fondos)', icon: Palette, accent: S3_ACCENT.rose },
  { label: 'Tipografía', detail: 'Familias + jerarquía (H1, body, datos)', icon: '🔤', accent: S3_ACCENT.violet },
  { label: 'Assets', detail: 'Logo SVG, iconos, patrones de marca', icon: Layers, accent: S3_ACCENT.cyan },
  { label: 'Reglas', detail: 'Espaciado, contrastes, do/don\'t', icon: '📐', accent: S3_ACCENT.amber },
];

const FLOW_STEPS = [
  { num: '1', label: 'Analiza sitio web', detail: 'Cloud extrae colores y tipografía automáticamente' },
  { num: '2', label: 'Genera skill ZIP', detail: 'Archivo con paleta, assets y reglas de marca' },
  { num: '3', label: 'Sube a Cloud', detail: 'Sincronizado en todo el ecosistema' },
];

export function S3Slide07Skills() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_35%_30%,_hsl(330_65%_55%_/_0.09),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_70%_65%,_hsl(263_55%_50%_/_0.06),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1680px] mx-auto w-full py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div {...m(0)} className="mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
              <Briefcase className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Skills de Marca</span>
            </div>
          </motion.div>

          <motion.h1 {...me(0.08)} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-1">
            Tu Marca como <span style={s3GradientText('hsl(330 85% 68%)', 'hsl(280 70% 65%)', 330)}>Skill</span>
          </motion.h1>
          <motion.div
            className="h-0.5 rounded-full mt-1.5 mx-auto max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.8), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: S3_EASE }}
          />
          <motion.p {...m(0.12)} className="text-white/50 text-sm mt-2 max-w-lg mx-auto">
            Un skill gráfico = la IA <strong className="text-white/70">siempre</strong> usa tus colores, tipografía y reglas de marca
          </motion.p>
        </div>

        {/* Main grid: Example left + Components right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 mb-6">

          {/* LEFT: Live demo mockup — BTG Pactual skill */}
          <motion.div {...me(0.15)} className="relative rounded-2xl border overflow-hidden"
            style={{ borderColor: S3_ACCENT.rose.border, background: 'hsl(330 55% 50% / 0.04)' }}>
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${S3_ACCENT.rose.dot}, hsl(330 50% 55%), transparent)` }} />

            <div className="p-5 lg:p-6">
              {/* Demo header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                  style={{ borderColor: `${S3_ACCENT.rose.text}40`, background: S3_ACCENT.rose.bg }}>
                  <Globe className="w-5 h-5" style={{ color: S3_ACCENT.rose.text }} />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Ejemplo: BTG Pactual</p>
                  <p className="text-[10px] text-white/40">Skill generado desde sitio web en vivo</p>
                </div>
              </div>

              {/* Extracted palette mockup */}
              <motion.div {...m(0.25)} className="rounded-xl border p-4 mb-3"
                style={{ borderColor: 'hsl(330 50% 50% / 0.12)', background: 'hsl(330 50% 50% / 0.03)' }}>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-bold mb-3">Paleta Extraída</p>
                <div className="flex gap-2 mb-3">
                  {[
                    { hex: '#0A1F44', name: 'BTG Navy' },
                    { hex: '#1A3A6B', name: 'Primary' },
                    { hex: '#E8ECF1', name: 'Light' },
                    { hex: '#F5A623', name: 'Accent' },
                    { hex: '#FFFFFF', name: 'White' },
                  ].map((c, i) => (
                    <motion.div key={i} {...m(0.3 + i * 0.03)} className="flex flex-col items-center gap-1 flex-1">
                      <div className="w-full aspect-square rounded-lg border border-white/10"
                        style={{ background: c.hex, boxShadow: `0 4px 12px ${c.hex}40` }} />
                      <span className="text-[8px] font-mono text-white/45">{c.hex}</span>
                      <span className="text-[8px] text-white/30">{c.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'hsl(0 0% 100% / 0.03)', border: '1px solid hsl(0 0% 100% / 0.06)' }}>
                  <span className="text-[10px] text-white/35 font-mono">font-family:</span>
                  <span className="text-[10px] text-white/60 font-semibold">Helvetica Neue, sans-serif</span>
                </div>
              </motion.div>

              {/* Result */}
              <motion.div {...m(0.4)} className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                style={{ borderColor: S3_ACCENT.emerald.border, background: S3_ACCENT.emerald.bg }}>
                <Check className="w-3.5 h-3.5" style={{ color: S3_ACCENT.emerald.text }} />
                <span className="text-[10px] text-white/60">Skill sincronizado → presentaciones, PDFs y apps usan <strong className="text-white/80">mismos colores</strong></span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Skill anatomy + multi-brand */}
          <div className="flex flex-col gap-4">
            {/* What's inside a skill */}
            <motion.div {...me(0.2)} className="rounded-2xl border overflow-hidden"
              style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <div className="p-5">
                <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-bold mb-3">Anatomía de un Skill</p>
                <div className="grid grid-cols-2 gap-2">
                  {SKILL_COMPONENTS.map((comp, i) => {
                    const IconComp = typeof comp.icon === 'string' ? null : comp.icon;
                    return (
                      <motion.div key={i} {...m(0.25 + i * 0.05)}
                        className="flex items-start gap-2.5 p-3 rounded-xl border"
                        style={{ borderColor: comp.accent.border, background: comp.accent.bg }}>
                        <div className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0"
                          style={{ borderColor: `${comp.accent.text}30`, background: `${comp.accent.text}10` }}>
                          {IconComp ? (
                            <IconComp className="w-4 h-4" style={{ color: comp.accent.text }} />
                          ) : (
                            <span className="text-sm">{comp.icon as string}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white/70">{comp.label}</p>
                          <p className="text-[9px] text-white/40 leading-relaxed">{comp.detail}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Multi-brand tip */}
            <motion.div {...m(0.45)} className="rounded-xl border p-4"
              style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 mt-0.5 shrink-0" style={{ color: S3_ACCENT.amber.text }} />
                <div>
                  <p className="text-[11px] font-bold" style={{ color: S3_ACCENT.amber.text }}>Multi-marca</p>
                  <p className="text-[10px] text-white/50 leading-relaxed">
                    1 skill por marca → cárgalo una vez → Cloud lo aplica automáticamente cuando lo activas.
                    Cada empresa debería tener su skill gráfico.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Flow: 3 steps */}
        <motion.div {...m(0.5)} className="flex items-center justify-center gap-3 flex-wrap">
          <Upload className="w-4 h-4" style={{ color: S3_ACCENT.rose.text }} />
          {FLOW_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black"
                  style={{ background: `${S3_ACCENT.rose.text}15`, color: S3_ACCENT.rose.text, border: `1px solid ${S3_ACCENT.rose.text}20` }}>
                  {s.num}
                </span>
                <span className="text-[10px] text-white/55 font-medium">{s.label}</span>
              </div>
              {i < FLOW_STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-white/25" />}
            </div>
          ))}
        </motion.div>
      </div>

      <S3Footer sectionLabel="SKILLS DE MARCA" hue={330} contextHint="tu marca como sistema de diseño reutilizable" />
    </div>
  );
}
