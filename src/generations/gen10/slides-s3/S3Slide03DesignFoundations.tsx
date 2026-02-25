import { motion } from 'framer-motion';
import { Pipette, CheckCircle2, Eye, Contrast } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const PILLARS = [
  { num: '01', name: 'Colores', desc: 'Paleta hex con contrastes validados y tokens reutilizables.' },
  { num: '02', name: 'Tipografía', desc: 'Serif + Sans + Mono. Tamaños por jerarquía: H1, H2, body.' },
  { num: '03', name: 'Espaciado', desc: 'Padding consistente. Grids de 4px alineados.' },
  { num: '04', name: 'Componentes', desc: 'Módulos reutilizables: navs, tarjetas, botones, tablas.' },
];

const ANTIPATTERNS = [
  { bad: 'Tipografía Inter en todo', fix: 'Serif + Sans para jerarquía' },
  { bad: 'Gradientes morados genéricos', fix: 'Paleta corporativa definida' },
  { bad: 'border-radius: 12px en todo', fix: 'Border-radius en Design System' },
  { bad: '"10,000 empresas confían…"', fix: 'Copy auténtico, datos reales' },
  { bad: 'Layouts simétricos repetidos', fix: 'Composición editorial asimétrica' },
];

const RULE_SEGMENTS = [
  { pct: 60, label: '60%', sublabel: 'Neutro', color: '#1a1a2e', textColor: 'hsl(0 0% 75%)' },
  { pct: 30, label: '30%', sublabel: 'Primario', color: '#3498DB', textColor: 'white' },
  { pct: 10, label: '10%', sublabel: 'Acento', color: '#E74C3C', textColor: 'white' },
];

export function S3Slide03DesignFoundations() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  const roseHsl = 'hsl(330 65% 55%)';

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_20%,_hsl(330_65%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_75%,_hsl(263_60%_50%_/_0.08),_transparent_65%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={16} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora showPlasma showConstellation showHolographic intensity={1.1} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1680px] mx-auto w-full py-6">

        {/* ── MASTHEAD: Giant number + title (editorial) ── */}
        <div className="grid grid-cols-12 gap-6 mb-5">
          <motion.div {...me(0)} className="col-span-4 flex flex-col justify-end">
            <p className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-1" style={{ color: 'hsl(330 65% 55% / 0.5)' }}>SESIÓN 03 · FUNDAMENTOS</p>
            <p style={{
              fontSize: '140px',
              fontWeight: 400,
              color: roseHsl,
              lineHeight: '0.75',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '-7px',
              filter: `drop-shadow(0 0 40px hsl(330 70% 55% / 0.3))`,
            }}>03</p>
          </motion.div>

          <motion.div {...me(0.06)} className="col-span-8 flex flex-col justify-end">
            <h1 style={{
              fontSize: '52px',
              fontWeight: 400,
              color: 'white',
              fontFamily: 'Georgia, "Times New Roman", serif',
              lineHeight: 1.05,
              letterSpacing: '-1px',
            }}>
              UI, Diseño y{' '}
              <span style={{ fontWeight: 700, fontStyle: 'italic' }}>Design Systems</span>
            </h1>
            <motion.div
              className="h-[3px] rounded-full max-w-[200px] mt-3 origin-left"
              style={{ background: `linear-gradient(90deg, ${roseHsl}, transparent)` }}
              initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: S3_EASE }}
            />
          </motion.div>
        </div>

        {/* ── PULL QUOTE ── */}
        <motion.div {...m(0.12)} className="mb-5">
          <div className="flex">
            <div className="w-[3px] rounded-full shrink-0" style={{ background: roseHsl }} />
            <p className="pl-5 text-lg leading-relaxed" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', color: 'hsl(0 0% 90%)' }}>
              "La IA siempre toma el camino más rápido. Un <span style={{ color: roseHsl, fontStyle: 'normal', fontWeight: 700 }}>Design System</span> rompe ese patrón."
            </p>
          </div>
        </motion.div>

        {/* ── Main layout: 2 columns ── */}
        <div className="grid grid-cols-12 gap-5 mb-4">

          {/* LEFT: 4 Pillars + 60-30-10 */}
          <div className="col-span-7 flex flex-col gap-4">
            {/* Pillar heading */}
            <motion.div {...m(0.15)}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-semibold mb-1" style={{ color: roseHsl }}>CONCEPTO CENTRAL</p>
              <h2 style={{ fontSize: '26px', fontWeight: 400, color: 'white', fontFamily: 'Georgia, "Times New Roman", serif' }}>
                Los 4 pilares del <span style={{ fontStyle: 'italic', fontWeight: 700 }}>Design System</span>
              </h2>
            </motion.div>

            {/* Pillar items */}
            <div className="space-y-0">
              {PILLARS.map((p, i) => (
                <motion.div key={i} {...m(0.2 + i * 0.04)}
                  className="flex items-start gap-4 py-3"
                  style={{ borderTop: '1px solid hsl(0 0% 100% / 0.06)' }}>
                  <span className="text-sm font-bold shrink-0 mt-0.5" style={{ color: roseHsl, fontFamily: 'Georgia, "Times New Roman", serif' }}>{p.num}</span>
                  <div>
                    <p className="text-sm font-semibold text-white/80 mb-0.5">{p.name}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 60-30-10 Rule */}
            <motion.div {...me(0.4)} className="rounded-xl border p-4"
              style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Pipette className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
                <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/40">Regla 60-30-10</p>
              </div>
              <div className="flex rounded-lg overflow-hidden h-10 mb-2">
                {RULE_SEGMENTS.map((seg, i) => (
                  <motion.div key={i}
                    className="flex items-center justify-center"
                    style={{ width: `${seg.pct}%`, background: seg.color }}
                    {...(isExporting ? {} : {
                      initial: { width: 0 },
                      animate: { width: `${seg.pct}%` },
                      transition: { delay: 0.6 + i * 0.12, duration: 0.6, ease: S3_EASE },
                    })}>
                    <div className="text-center">
                      <p className="text-xs font-black" style={{ color: seg.textColor }}>{seg.label}</p>
                      <p className="text-[7px] font-bold uppercase tracking-wider" style={{ color: seg.textColor, opacity: 0.65 }}>{seg.sublabel}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] text-white/35">60% neutro · 30% primario · 10% acento = <span className="text-white/60 font-semibold">jerarquía instantánea</span></p>
            </motion.div>
          </div>

          {/* RIGHT: Antipatterns block (inverted editorial) + Contrast */}
          <div className="col-span-5 flex flex-col gap-4">
            {/* ANTIPATTERNS — inverted block */}
            <motion.div {...me(0.25)} className="rounded-xl overflow-hidden flex-1"
              style={{ background: 'hsl(330 65% 55%)' }}>
              <div className="p-5 h-full flex flex-col">
                <p className="text-[9px] tracking-[0.3em] uppercase font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>SEÑALES DE ALERTA</p>
                <h3 className="mb-3" style={{ fontSize: '22px', fontWeight: 400, color: 'white', fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  <span style={{ fontStyle: 'italic' }}>Antipatterns</span> de IA
                </h3>

                {/* Column headers */}
                <div className="flex gap-2 mb-1">
                  <span className="text-[8px] tracking-[0.2em] uppercase font-semibold flex-1" style={{ color: 'rgba(255,255,255,0.45)' }}>EVITA</span>
                  <span className="text-[8px] tracking-[0.2em] uppercase font-semibold flex-1" style={{ color: 'white' }}>HAZ ESTO</span>
                </div>

                <div className="space-y-0 flex-1">
                  {ANTIPATTERNS.map((ap, i) => (
                    <div key={i} className="flex gap-2 py-2" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                      <p className="flex-1 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through' }}>{ap.bad}</p>
                      <p className="flex-1 text-xs font-semibold leading-relaxed text-white">{ap.fix}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs mt-2" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>
                  Si lo ves en tu output → falta Design System.
                </p>
              </div>
            </motion.div>

            {/* Contrast checker */}
            <motion.div {...me(0.45)} className="rounded-xl border p-4"
              style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Contrast className="w-3.5 h-3.5" style={{ color: S3_ACCENT.emerald.text }} />
                <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/40">Contraste WCAG</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="rounded-lg p-3" style={{ background: '#1a1a2e' }}>
                  <p className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>Aa</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" style={{ color: S3_ACCENT.emerald.text }} />
                    <span className="text-[9px] font-bold" style={{ color: S3_ACCENT.emerald.text }}>14:1 ✓</span>
                  </div>
                </div>
                <div className="rounded-lg p-3" style={{ background: '#888888' }}>
                  <p className="text-lg font-bold" style={{ color: '#aaaaaa', fontFamily: 'Georgia, "Times New Roman", serif' }}>Aa</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Eye className="w-3 h-3 text-red-400/80" />
                    <span className="text-[9px] font-bold text-red-400/80">1.5:1 ✗</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40">
                Mín <span className="font-semibold text-white/60">4.5:1</span> · <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer" className="text-emerald-400/80 font-semibold hover:underline underline-offset-2">WebAIM</a>
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── METRICS STRIP (editorial, big serif numbers) ── */}
        <motion.div {...m(0.55)} className="rounded-xl overflow-hidden" style={{ background: 'hsl(0 0% 7%)' }}>
          <div className="flex">
            {[
              { num: '3', label: 'Familias tipográficas' },
              { num: '4', label: 'Pilares del DS' },
              { num: '74', label: 'Variables CSS' },
              { num: '4.5:1', label: 'Contraste mínimo' },
            ].map((metric, i) => (
              <div key={i} className="flex-1 text-center py-5"
                style={{ borderRight: i < 3 ? '1px solid hsl(0 0% 100% / 0.06)' : 'none' }}>
                <motion.p
                  style={{
                    fontSize: i === 2 ? '42px' : '36px',
                    fontWeight: 400,
                    color: roseHsl,
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    letterSpacing: '-2px',
                    lineHeight: 1,
                  }}
                  {...(isExporting ? {} : {
                    initial: { opacity: 0, y: 15 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.7 + i * 0.08, duration: 0.5, ease: S3_EASE },
                  })}
                >{metric.num}</motion.p>
                <p className="text-[8px] tracking-[0.15em] uppercase text-white/35 font-semibold mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="FUNDAMENTOS VISUALES" contextHint="color, tipografía y jerarquía" />
    </div>
  );
}
