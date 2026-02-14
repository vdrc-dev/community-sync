import { motion } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { Globe, TrendingUp, AlertTriangle, Trophy, BarChart3, Users, ArrowRight } from 'lucide-react';
import { S2_ACCENT, S2_THEME } from './theme';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10-s2/page-04-adopcion.jpg';

const ACCENT = { emerald: S2_ACCENT.emerald, amber: S2_ACCENT.amber, violet: S2_ACCENT.violet };

export function S2Slide04Adoption() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const content = useSlideContent(4);

  const imageUrl = (content.imageUrl as string) || CLOUD_URL;
  const sectionLabel = (content.sectionLabel as string) || 'Adopción Global · 2026';
  const title = (content.title as string) || 'La Brecha Digital';
  const subtitle = (content.subtitle as string) || 'se Profundiza en 2026';
  const source = (content.source as string) || 'Fuente: AI Diffusion Report H2 2025 — Microsoft Research';
  const goldenRule = (content.goldenRule as string) || 'En menos de tres años, más de 1.200 millones de personas han usado herramientas de IA — pero la adopción en el Norte Global crece al doble de velocidad que en el Sur.';
  const stats = (content.stats as Array<{ value: string; label: string; color: string; versus?: string; versusLabel?: string; versusColor?: string }>) || [];
  const globalStats = content.globalStats as {
    leaders?: Array<{ country: string; percentage: string }>;
    stagnation?: { country: string; rank: string };
  } | undefined;

  const m = (delay: number, overrides?: object) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      ...overrides,
    };

  // Extract the main comparison stat and secondary stats
  const mainStat = stats[0];
  const secondaryStats = stats.slice(1);

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-violet-500/30"
      style={{ background: S2_THEME.background }}>

      {/* ── Subtle atmospheric background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_0%,_hsl(38_70%_45%_/_0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_90%,_hsl(263_50%_40%_/_0.08),_transparent_50%)]" />
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
      </div>

      {/* ── Breathing orbs ── */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute w-[600px] h-[400px] rounded-full blur-[160px]"
            style={{ top: '5%', right: '15%', background: 'hsl(38 80% 50% / 0.08)' }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[400px] h-[350px] rounded-full blur-[140px]"
            style={{ bottom: '20%', left: '5%', background: 'hsl(263 60% 45% / 0.06)' }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      {/* ── Main content: 2-column layout ── */}
      <div className="relative z-10 flex h-full w-full">

        {/* ══════════ LEFT COLUMN (58%) ══════════ */}
        <div className="flex flex-col justify-center w-[58%] pl-16 pr-10 py-12">

          {/* Section badge */}
          <motion.div {...m(0.1)} className="mb-5">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md"
              style={{ background: ACCENT.amber.bg, borderColor: ACCENT.amber.border }}
            >
              <Globe className="w-3.5 h-3.5" style={{ color: ACCENT.amber.text }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT.amber.text }}>
                {sectionLabel}
              </span>
            </div>
          </motion.div>

          {/* Title block */}
          <motion.div {...m(0.15)}>
            <h1 className="text-4xl 2xl:text-5xl font-black tracking-tight leading-[0.92] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
              {title}
            </h1>
            <h1
              className="text-5xl 2xl:text-6xl font-black tracking-tight leading-[0.92] mt-2"
              style={{
                background: 'linear-gradient(135deg, hsl(38 92% 72%) 0%, hsl(38 88% 58%) 40%, hsl(263 60% 65%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 24px hsl(38 80% 50% / 0.15))',
              }}
            >
              {subtitle}
            </h1>
            <motion.div
              className="mt-4 h-[3px] w-28 rounded-full origin-left"
              style={{ background: `linear-gradient(90deg, ${ACCENT.amber.dot}, ${ACCENT.violet.dot})`, boxShadow: `0 0 12px ${ACCENT.amber.dot}40` }}
              initial={isExporting ? {} : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* ═══ HERO COMPARISON: The main data story ═══ */}
          {mainStat && (
            <motion.div {...m(0.3)} className="mt-8">
              <div className="flex items-stretch gap-4">

                {/* Left: Leaders */}
                <div
                  className="flex-1 rounded-2xl border p-5 relative overflow-hidden"
                  style={{
                    background: ACCENT.emerald.bg,
                    borderColor: ACCENT.emerald.border,
                    boxShadow: `inset 0 1px 0 hsl(0 0% 100% / 0.04), 0 8px 24px ${ACCENT.emerald.glow}15`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4" style={{ color: ACCENT.emerald.text }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: ACCENT.emerald.text }}>
                      {mainStat.label || 'Países Líderes'}
                    </span>
                  </div>
                  <span className="text-5xl font-black tracking-tight block" style={{ color: ACCENT.emerald.text, textShadow: `0 0 40px ${ACCENT.emerald.glow}30` }}>
                    {mainStat.value}
                  </span>
                  <p className="text-[11px] text-white/40 mt-1.5 font-medium">
                    Profesionales usan IA semanalmente
                  </p>
                </div>

                {/* Center: VS divider */}
                <div className="flex flex-col items-center justify-center gap-2 px-1">
                  <div className="w-px flex-1" style={{ background: 'hsl(0 0% 100% / 0.08)' }} />
                  <span className="text-[11px] font-black text-white/30 tracking-wider">VS</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/15" />
                  <div className="w-px flex-1" style={{ background: 'hsl(0 0% 100% / 0.08)' }} />
                </div>

                {/* Right: Global average */}
                <div
                  className="flex-1 rounded-2xl border p-5 relative overflow-hidden"
                  style={{
                    background: ACCENT.amber.bg,
                    borderColor: ACCENT.amber.border,
                    boxShadow: `inset 0 1px 0 hsl(0 0% 100% / 0.04), 0 8px 24px ${ACCENT.amber.glow}15`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" style={{ color: ACCENT.amber.text }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: ACCENT.amber.text }}>
                      {mainStat.versusLabel || 'Promedio Global'}
                    </span>
                  </div>
                  <span className="text-5xl font-black tracking-tight block" style={{ color: ACCENT.amber.text, textShadow: `0 0 40px ${ACCENT.amber.glow}30` }}>
                    {mainStat.versus || '16.3%'}
                  </span>
                  <p className="text-[11px] text-white/40 mt-1.5 font-medium">
                    Adopción promedio mundial
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ SECONDARY STATS ROW ═══ */}
          {secondaryStats.length > 0 && (
            <motion.div {...m(0.45)} className="mt-4 flex gap-4">
              {secondaryStats.map((stat, i) => {
                const c = ACCENT[stat.color as keyof typeof ACCENT] || ACCENT.violet;
                const icons = [BarChart3, Trophy];
                const Icon = icons[i] || BarChart3;
                return (
                  <div key={i} className="flex-1 rounded-xl border px-4 py-3.5 flex items-center gap-3"
                    style={{ background: c.bg, borderColor: c.border }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${c.dot}18`, border: `1px solid ${c.border}` }}>
                      <Icon className="w-4 h-4" style={{ color: c.text }} />
                    </div>
                    <div>
                      <span className="text-xl font-black tracking-tight block" style={{ color: c.text }}>
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-medium text-white/45 leading-tight block">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ═══ RANKING GLOBAL BAR ═══ */}
          {globalStats && (
            <motion.div {...m(0.55)} className="mt-5 rounded-xl border px-5 py-3.5 flex items-center justify-between"
              style={{ background: ACCENT.violet.bg, borderColor: ACCENT.violet.border }}>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" style={{ color: ACCENT.violet.text }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: ACCENT.violet.text }}>
                    Top Global
                  </span>
                </div>
                {globalStats.leaders?.map((l, i) => (
                  <span key={i} className="text-[11px] text-white/50 font-medium">
                    {l.country} <span className="font-black" style={{ color: ACCENT.emerald.text }}>{l.percentage}</span>
                  </span>
                ))}
              </div>
              {globalStats.stagnation && (
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" style={{ color: ACCENT.amber.text }} />
                  <span className="text-[11px] text-white/50 font-medium">
                    {globalStats.stagnation.country}:
                    <span className="font-black ml-1" style={{ color: ACCENT.amber.text }}>
                      {globalStats.stagnation.rank}
                    </span>
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* ═══ GOLDEN RULE + SOURCE ═══ */}
          <motion.div {...m(0.65)} className="mt-6 flex items-start gap-4 rounded-xl border border-white/5 pl-4 py-3 pr-4"
            style={{ background: 'hsl(0 0% 100% / 0.02)' }}>
            <div className="w-[3px] rounded-full self-stretch flex-shrink-0 min-h-[3rem]"
              style={{ background: `linear-gradient(to bottom, ${ACCENT.amber.dot}, ${ACCENT.violet.dot}60, transparent)` }} />
            <div>
              <p className="text-[14px] font-medium leading-[1.6] italic" style={{ color: 'hsl(0 0% 100% / 0.88)' }}>
                "{goldenRule}"
              </p>
              <p className="text-[10px] text-white/35 tracking-wider uppercase font-medium mt-2">
                {source}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ══════════ RIGHT COLUMN (42%) — Map ══════════ */}
        <div className="w-[42%] flex items-center justify-center pr-14">
          <motion.div
            {...(isExporting ? {} : {
              initial: { opacity: 0, scale: 0.92, x: 30 },
              animate: { opacity: 1, scale: 1, x: 0 },
              transition: { duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            })}
            className="relative w-full max-w-[500px]"
          >
            {/* Glow */}
            <div className="absolute inset-[-30px] rounded-full blur-[80px] opacity-30"
              style={{ background: 'radial-gradient(circle, hsl(38 80% 50% / 0.2) 0%, transparent 65%)' }} />

            {/* Image frame */}
            <div
              className="relative p-[3px] rounded-[24px]"
              style={{
                background: `linear-gradient(145deg, ${ACCENT.amber.dot}, ${ACCENT.amber.border} 30%, ${ACCENT.violet.border} 70%, ${ACCENT.violet.dot})`,
                boxShadow: `0 0 40px ${ACCENT.amber.glow}20, 0 20px 50px hsl(0 0% 0% / 0.4)`,
              }}
            >
              <div className="relative rounded-[21px] overflow-hidden" style={{ background: 'hsl(0 0% 0% / 0.5)' }}>
                <img
                  src={imageUrl}
                  alt="Mapa mundial mostrando adopción global de IA"
                  className="w-full h-auto block"
                  style={{ boxShadow: 'inset 0 0 60px hsl(0 0% 0% / 0.2), 0 20px 60px hsl(38 70% 30% / 0.25)' }}
                />
                {/* Mask baked-in text */}
                <div className="absolute" style={{
                  top: '35%', left: '30%', width: '40%', height: '30%',
                  background: 'radial-gradient(ellipse, hsl(220 30% 8% / 0.95) 25%, hsl(220 30% 8% / 0.6) 55%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <motion.div
              {...m(0.7)}
              className="absolute -bottom-3 -right-3 px-4 py-2.5 rounded-xl border backdrop-blur-xl"
              style={{
                background: 'hsl(260 25% 8% / 0.94)',
                borderColor: ACCENT.amber.border,
                boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.03), 0 12px 36px hsl(0 0% 0% / 0.5), 0 0 24px ${ACCENT.amber.glow}10`,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: ACCENT.amber.dot, boxShadow: `0 0 8px ${ACCENT.amber.dot}` }} />
                <Users className="w-3.5 h-3.5" style={{ color: ACCENT.amber.text }} />
                <span className="text-[11px] font-bold tracking-wider" style={{ color: ACCENT.amber.text }}>
                  1 de cada 6 personas usa IA
                </span>
              </div>
            </motion.div>

            {/* Top-left pill */}
            <motion.div {...m(0.8)}
              className="absolute -top-2.5 -left-3 px-3 py-1.5 rounded-lg border backdrop-blur-md"
              style={{ background: 'hsl(260 20% 6% / 0.85)', borderColor: 'hsl(0 0% 100% / 0.08)' }}>
              <span className="text-[9px] font-bold text-white/25 tracking-wider">AI DIFFUSION 2026</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16 2xl:mx-20" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-16 2xl:px-20 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">Adopción Global · 2026</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '06 / 37'}</span>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
