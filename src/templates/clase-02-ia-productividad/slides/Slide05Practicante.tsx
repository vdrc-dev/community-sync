import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { GraduationCap, BrainCircuit, FileText, Settings, Sparkles, ArrowRight } from 'lucide-react';
import { S2_THEME, S2_ACCENT } from '@/generations/gen10/slides-s2/theme';

/* ── What the intern HAS vs what YOU give ── */
const HAS = [
  { icon: GraduationCap, text: '3 doctorados', detail: 'Entiende el mundo a nivel de la ciencia' },
  { icon: BrainCircuit, text: 'Conocimiento enciclopédico', detail: 'Pero no la ciencia aplicada' },
];

const NEEDS = [
  { icon: FileText, text: 'Contexto de tu empresa', detail: 'Normativa, plan de cuentas, competencia' },
  { icon: Settings, text: 'Instrucciones claras', detail: 'Quién eres, para dónde vas, qué hay que hacer' },
];

/* ── Particles (more, slightly larger for presence) ── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  y: `${5 + Math.random() * 90}%`,
  size: 1.2 + Math.random() * 2,
  hue: [263, 38, 45][i % 3],
  dur: 6 + Math.random() * 6,
  delay: Math.random() * 5,
  travel: 15 + Math.random() * 22,
}));

export function Slide05Practicante() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();

  const m = (delay: number, extra?: object) =>
    isExporting
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          ...extra,
        };

  const v = S2_ACCENT.violet;
  const a = S2_ACCENT.amber;

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden font-sans selection:bg-violet-500/30" style={{ background: S2_THEME.background }}>
      {/* ── Atmospheric background (richer layers) ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 70% at 25% 25%, ${v.bg}, transparent 65%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 50% at 85% 70%, ${a.bg}, transparent 55%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 40% 35% at 50% 50%, rgba(255,255,255,0.015), transparent 60%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`, backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`, opacity: S2_THEME.grid.opacity * 1.5 }} />
        <div className="absolute inset-0" style={{ backgroundImage: S2_THEME.noise.svg, opacity: S2_THEME.noise.opacity }} />
      </div>

      {/* ── Breathing orbs (more, larger) ── */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-[-8%] left-[15%] w-[700px] h-[500px] rounded-full blur-[220px]"
            style={{ background: v.glow }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-12%] right-[10%] w-[550px] h-[400px] rounded-full blur-[200px]"
            style={{ background: a.glow }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.16, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          <motion.div
            className="absolute top-[40%] right-[5%] w-[280px] h-[280px] rounded-full blur-[120px]"
            style={{ background: v.glow }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute bottom-[35%] left-[2%] w-[240px] h-[240px] rounded-full blur-[100px]"
            style={{ background: a.glow }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.04, 0.1, 0.04] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      {/* ── Particles ── */}
      {!isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map(p => (
            <motion.div key={p.id} className="absolute rounded-full"
              style={{
                left: p.x, top: p.y, width: p.size, height: p.size,
                background: `hsl(${p.hue} 55% 62% / 0.4)`,
                boxShadow: `0 0 ${p.size * 5}px hsl(${p.hue} 55% 60% / 0.4)`,
              }}
              animate={{ y: [0, -p.travel, 0], opacity: [0.08, 0.45, 0.08] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            />
          ))}
        </div>
      )}

      {/* ── Decorative corner labels (fill empty space) ── */}
      {!isExporting && (
        <>
          <div className="absolute top-24 left-12 opacity-[0.12] pointer-events-none" style={{ color: v.text }}>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">IA</span>
          </div>
          <div className="absolute top-24 right-12 opacity-[0.12] pointer-events-none" style={{ color: a.text }}>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Tú</span>
          </div>
        </>
      )}

      {/* ── Light sweep ── */}
      {!isExporting && (
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(105deg, transparent 40%, hsl(263 60% 55% / 0.025) 48%, hsl(38 90% 55% / 0.015) 52%, transparent 60%)` }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 9 }}
        />
      )}

      {/* ════════════════════════════════════════════ */}
      {/* ── CONTENT ──────────────────────────────── */}
      {/* ════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col px-14 2xl:px-20 py-10">
        {/* Section pill + hero glow */}
        <motion.div {...m(0)} className="mb-5 relative">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm shadow-lg"
            style={{ background: a.bg, borderColor: a.border, boxShadow: `0 4px 24px ${a.glow}` }}>
            <GraduationCap className="w-4 h-4" style={{ color: a.text }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: a.text }}>
              Context Engineering
            </span>
          </div>
        </motion.div>

        {/* Title block with soft glow behind */}
        <motion.div {...m(0.06)} className="relative">
          {!isExporting && (
            <div className="absolute -left-8 -top-4 w-[480px] h-[140px] rounded-3xl blur-[80px] opacity-30 pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${v.glow}, ${a.glow})` }} />
          )}
          <h1 className="relative text-4xl md:text-[3rem] 2xl:text-[3.25rem] font-black tracking-[-0.03em] leading-[1.08] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
            <span className="text-white">
              <EditableText defaultValue="El Practicante" tag="span" />
            </span>{' '}
            <span style={{
              background: `linear-gradient(135deg, ${a.text}, ${v.text})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.15))',
            }}>
              <EditableText defaultValue="Brillante" tag="span" />
            </span>
          </h1>
          <p className="relative text-base md:text-lg text-white/60 mt-4 font-light max-w-2xl leading-relaxed">
            <EditableText defaultValue="Llegó un practicante con 3 doctorados a tu empresa. Nadie sabe por qué está haciendo la práctica. Entiende el mundo, pero no tiene idea cómo funciona tu oficina." tag="span" />
          </p>
          <motion.div className="relative h-[4px] rounded-full mt-5 max-w-[160px] origin-left"
            style={{ background: `linear-gradient(90deg, ${a.dot}, ${v.dot}, transparent)` }}
            initial={isExporting ? {} : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* ── Two columns inside one glowing panel ── */}
        <motion.div {...m(0.12)} className="flex-1 flex items-stretch gap-0 mt-8 min-h-0 rounded-3xl border overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderColor: 'rgba(255,255,255,0.08)',
            boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)`,
          }}>
        <div className="flex-1 flex items-center gap-6 py-8 pl-8 pr-6">

          {/* LEFT: Lo que TIENE */}
          <motion.div {...m(0.15)} className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: v.dot, boxShadow: `0 0 14px ${v.glow}` }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: v.text }}>
                Lo que tiene la IA
              </span>
            </div>
            <div className="space-y-4">
              {HAS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={i} {...m(0.2 + i * 0.08)}
                    className="relative rounded-2xl border p-5 group overflow-hidden"
                    style={{ background: v.bg, borderColor: v.border, boxShadow: `0 4px 24px ${v.glow}, inset 0 1px 0 rgba(255,255,255,0.04)` }}>
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.06]" style={{ background: v.dot }} />
                    <div className="relative flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: v.bg, border: `1.5px solid ${v.border}` }}>
                        <Icon className="w-6 h-6" style={{ color: v.text }} />
                      </div>
                      <div>
                        <p className="text-[16px] text-white font-semibold">
                          <EditableText defaultValue={item.text} tag="span" />
                        </p>
                        <p className="text-[13px] text-white/55 mt-1 leading-snug">
                          <EditableText defaultValue={item.detail} tag="span" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CENTER: Bridge + Tú (focal point) */}
          <motion.div {...m(0.3)} className="flex flex-col items-center justify-center flex-shrink-0 px-1">
            <div className="w-0.5 h-12 rounded-full" style={{ background: `linear-gradient(to bottom, transparent, ${v.dot})` }} />
            <div className="relative my-2">
              {!isExporting && (
                <motion.div className="absolute inset-0 rounded-full blur-xl opacity-60"
                  style={{ background: a.glow }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <div className="relative w-14 h-14 rounded-full flex items-center justify-center border-2"
                style={{ background: a.bg, borderColor: a.border, boxShadow: `0 0 28px ${a.glow}, inset 0 0 20px ${a.glow}` }}>
                <ArrowRight className="w-6 h-6" style={{ color: a.text }} />
              </div>
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] mt-1" style={{ color: a.text }}>Tú</span>
            <div className="w-0.5 h-12 rounded-full" style={{ background: `linear-gradient(to bottom, ${a.dot}, transparent)` }} />
          </motion.div>

          {/* RIGHT: Lo que NECESITA de ti */}
          <motion.div {...m(0.2)} className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: a.dot, boxShadow: `0 0 14px ${a.glow}` }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: a.text }}>
                Lo que necesita de ti
              </span>
            </div>
            <div className="space-y-4">
              {NEEDS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={i} {...m(0.25 + i * 0.08)}
                    className="relative rounded-2xl border p-5 group overflow-hidden"
                    style={{ background: a.bg, borderColor: a.border, boxShadow: `0 4px 24px ${a.glow}, inset 0 1px 0 rgba(255,255,255,0.04)` }}>
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.06]" style={{ background: a.dot }} />
                    <div className="relative flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: a.bg, border: `1.5px solid ${a.border}` }}>
                        <Icon className="w-6 h-6" style={{ color: a.text }} />
                      </div>
                      <div>
                        <p className="text-[16px] text-white font-semibold">
                          <EditableText defaultValue={item.text} tag="span" />
                        </p>
                        <p className="text-[13px] text-white/55 mt-1 leading-snug">
                          <EditableText defaultValue={item.detail} tag="span" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
        </motion.div>

        {/* ── Quote bar (full-width, prominent) ── */}
        <motion.div {...m(0.5)} className="mt-8 -mx-2 2xl:-mx-4">
          <div className="rounded-2xl border overflow-hidden flex flex-wrap items-stretch gap-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              borderColor: 'rgba(255,255,255,0.1)',
              boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 16px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}>
            <div className="flex-1 min-w-[280px] flex items-center gap-5 py-5 pl-6 pr-6">
              <div className="w-1.5 min-h-[3rem] rounded-full flex-shrink-0"
                style={{ background: `linear-gradient(to bottom, ${a.dot}, ${v.dot})` }} />
              <p className="text-[15px] md:text-base font-light italic text-white/80 leading-relaxed">
                <EditableText defaultValue='"Entiende el mundo a nivel de la ciencia, pero no la ciencia aplicada. Esa aplicación se la tienen que dar ustedes."' tag="span" />
              </p>
            </div>
            <div className="flex items-center gap-3 px-6 py-5 border-l border-white/10 flex-shrink-0"
              style={{ background: a.bg, borderColor: a.border, boxShadow: `-8px 0 24px ${a.glow}` }}>
              <Sparkles className="w-5 h-5 shrink-0" style={{ color: a.text }} />
              <span className="text-sm font-bold" style={{ color: a.text }}>Sin contexto, su brillantez no sirve</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: `linear-gradient(90deg, transparent, ${v.border}, transparent)` }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/45 uppercase">FUNDAMENTOS</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/65">
            {slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '08 / 37'}
          </span>
        </div>
      </div>

      {/* Vignette (softer so orbs and particles stay visible) */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 140px 60px rgba(4,3,10,0.75)' }} />
    </div>
  );
}
