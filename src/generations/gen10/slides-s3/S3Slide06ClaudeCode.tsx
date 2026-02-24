import { motion } from 'framer-motion';
import { useState } from 'react';
import { Monitor, Globe, Terminal, FolderOpen, Plug, Sparkles, Check, X, Download, LogIn, FileUp, Cable } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

/* ── Desktop superpowers ── */
const DESKTOP_POWERS = [
  { icon: FolderOpen, label: 'Archivos locales', detail: 'Lee tu disco completo', pct: 100 },
  { icon: Plug, label: 'Conectores MCP', detail: '200+ integraciones', pct: 85 },
  { icon: Terminal, label: 'Skills reutilizables', detail: 'Flujos PDF/PPTX/Theme listos', pct: 95 },
];

/* ── Web limitations ── */
const WEB_LIMITS = [
  { label: 'Sin archivos locales' },
  { label: 'Sin MCP' },
  { label: 'Sin terminal' },
];

/* ── Setup flow ── */
const SETUP_STEPS = [
  { step: '1', text: 'Descarga Claude Desktop', icon: Download, href: 'https://claude.ai/download' },
  { step: '2', text: 'Login con tu cuenta', icon: LogIn },
  { step: '3', text: 'Arrastra archivos al chat', icon: FileUp },
  { step: '4', text: 'Instala anthropics/skills', icon: Cable, href: 'https://github.com/anthropics/skills' },
];

export function S3Slide06ClaudeCode() {
  const { isExporting } = useExportContext();
  const [hoveredCard, setHoveredCard] = useState<'desktop' | 'web' | null>(null);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>

      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_25%_20%,_hsl(263_65%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_75%,_hsl(280_55%_50%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,_hsl(263_50%_45%_/_0.05),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={280} tertiaryHue={185} showAurora />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">

        {/* Badge */}
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
            style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Terminal className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Claude Desktop</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
          Claude{' '}
          <span style={{
            background: 'linear-gradient(135deg, hsl(263 75% 72%), hsl(280 65% 68%), hsl(310 55% 65%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px hsl(263 70% 65% / 0.45))',
          }}>Desktop</span>
        </motion.h1>

        {/* Accent line */}
        <motion.div
          className="h-[2px] rounded-full mt-3 mx-auto max-w-[100px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 68% / 0.9), hsl(280 60% 65% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: S3_EASE }}
        />

        {/* Subtitle */}
        <motion.p {...m(0.15)} className="text-white/50 text-sm mt-2 mb-7 max-w-md mx-auto">
          La IA que vive en tu computador — con archivos, MCP y Skills de Anthropic
        </motion.p>

        {/* ═══════════════════════════════════ */}
        {/* ── VS Comparison Grid ──────────── */}
        {/* ═══════════════════════════════════ */}
        <div className="relative grid grid-cols-[1.15fr_1fr] gap-5 max-w-3xl mx-auto">

          {/* ── VS divider badge ── */}
          {!isExporting && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-lg" style={{ background: S3_ACCENT.violet.glow }} />
                <div className="relative w-10 h-10 rounded-full border-2 flex items-center justify-center backdrop-blur-xl"
                  style={{ borderColor: S3_ACCENT.violet.border, background: 'hsl(263 50% 12% / 0.95)', boxShadow: '0 8px 32px hsl(263 60% 30% / 0.5)' }}>
                  <span className="text-[10px] font-black tracking-wider" style={{ color: S3_ACCENT.violet.text }}>VS</span>
                </div>
              </div>
            </motion.div>
          )}
          {isExporting && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: S3_ACCENT.violet.border, background: 'hsl(263 50% 12% / 0.95)' }}>
                <span className="text-[10px] font-black tracking-wider" style={{ color: S3_ACCENT.violet.text }}>VS</span>
              </div>
            </div>
          )}

          {/* ── LEFT: Claude Desktop (Hero) ── */}
          <motion.div {...m(0.2)} className="relative group"
            onMouseEnter={() => setHoveredCard('desktop')}
            onMouseLeave={() => setHoveredCard(null)}>

            {/* Deep glow */}
            {!isExporting && (
              <motion.div
                className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none"
                style={{ background: S3_ACCENT.violet.glow }}
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Holographic border */}
            <div className="relative p-[1.5px] rounded-2xl overflow-hidden"
              style={{
                background: hoveredCard === 'desktop'
                  ? 'linear-gradient(145deg, hsl(263 80% 65% / 0.6), hsl(280 60% 60% / 0.4), hsl(185 50% 50% / 0.3))'
                  : 'linear-gradient(145deg, hsl(263 70% 55% / 0.4), hsl(280 50% 50% / 0.2))',
                transition: 'background 0.5s ease',
              }}>
              <div className="relative p-6 rounded-[calc(1rem-1.5px)] overflow-hidden"
                style={{ background: 'hsl(263 40% 6% / 0.92)', boxShadow: '0 30px 80px hsl(263 50% 20% / 0.35), inset 0 1px 0 hsl(263 40% 70% / 0.05)' }}>

                {/* Shimmer */}
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 70% 72% / 0.08) 50%, transparent 65%)' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
                  />
                )}

                {/* Recommended badge */}
                <motion.div
                  className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-1 rounded-b-lg text-[10px] font-black tracking-[0.15em] z-10"
                  style={{ background: `linear-gradient(180deg, ${S3_ACCENT.violet.dot}, hsl(263 65% 50%))`, color: '#04030a' }}
                  {...(isExporting ? {} : { animate: { y: [0, 1, 0] }, transition: { duration: 2, repeat: Infinity } })}>
                  RECOMENDADO
                </motion.div>

                {/* Icon with orbital ring */}
                <div className="relative flex justify-center mt-4 mb-4">
                  {!isExporting && (
                    <motion.div
                      className="absolute w-[72px] h-[72px] rounded-full border border-dashed pointer-events-none"
                      style={{ borderColor: `hsl(263 60% 65% / 0.15)` }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
                    style={{ background: 'linear-gradient(135deg, hsl(263 60% 55% / 0.15), hsl(263 50% 45% / 0.05))', border: '1px solid hsl(263 60% 65% / 0.15)' }}>
                    <Monitor className="w-7 h-7" style={{ color: S3_ACCENT.violet.text }} />
                  </div>
                </div>

                <p className="text-lg font-black text-white mb-4 tracking-tight">Claude Desktop</p>

                {/* Power items */}
                <div className="space-y-2">
                  {DESKTOP_POWERS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <motion.div key={i} {...m(0.3 + i * 0.05)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-colors duration-300"
                        style={{ borderColor: `hsl(263 60% 65% / 0.12)`, background: `hsl(263 55% 55% / 0.04)` }}
                        {...(isExporting ? {} : { whileHover: { borderColor: `hsl(263 60% 65% / 0.3)` } })}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `hsl(263 55% 55% / 0.1)`, border: '1px solid hsl(263 60% 65% / 0.1)' }}>
                          <Icon className="w-4 h-4" style={{ color: S3_ACCENT.violet.text }} />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <span className="text-sm text-white/70 font-semibold block leading-tight">{p.label}</span>
                          <span className="text-[10px] text-white/40 leading-tight">{p.detail}</span>
                        </div>
                        <Check className="w-4 h-4 shrink-0" style={{ color: S3_ACCENT.emerald.text }} />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Capacity bar */}
                <div className="mt-4 pt-3 border-t" style={{ borderColor: 'hsl(263 40% 50% / 0.1)' }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-white/40 font-semibold tracking-wider uppercase">Capacidad</span>
                    <span className="text-[11px] font-black tabular-nums" style={{ color: S3_ACCENT.violet.text }}>100%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(263 40% 50% / 0.1)' }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${S3_ACCENT.violet.dot}, hsl(280 60% 65%))`, boxShadow: `0 0 12px ${S3_ACCENT.violet.glow}` }}
                      {...(isExporting ? { style: { width: '100%', background: `linear-gradient(90deg, ${S3_ACCENT.violet.dot}, hsl(280 60% 65%))` } } : { initial: { width: '0%' }, animate: { width: '100%' }, transition: { delay: 0.6, duration: 1.4, ease: S3_EASE } })}
                    />
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* ── RIGHT: Claude Web (dimmed) ── */}
          <motion.div {...m(0.25)} className="relative"
            onMouseEnter={() => setHoveredCard('web')}
            onMouseLeave={() => setHoveredCard(null)}>

            <div className="h-full p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col"
              style={{ opacity: hoveredCard === 'web' ? 0.8 : 0.65, transition: 'opacity 0.4s ease' }}>

              {/* Icon */}
              <div className="flex justify-center mb-4 mt-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'hsl(0 0% 100% / 0.02)', border: '1px solid hsl(0 0% 100% / 0.08)' }}>
                  <Globe className="w-7 h-7 text-white/45" />
                </div>
              </div>

              <p className="text-lg font-black text-white/45 mb-4 tracking-tight">Claude Web</p>

              {/* Missing features */}
              <div className="space-y-2 flex-1">
                {WEB_LIMITS.map((l, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.08]">
                      <X className="w-3.5 h-3.5 text-white/45" />
                    </div>
                    <div className="relative">
                      <span className="text-sm text-white/40">{l.label}</span>
                      <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/30" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Capacity bar */}
              <div className="mt-4 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-white/40 font-semibold tracking-wider uppercase">Capacidad</span>
                  <span className="text-[11px] font-black text-white/40 tabular-nums">30%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-white/[0.04]">
                  <motion.div className="h-full rounded-full bg-white/10"
                    {...(isExporting ? { style: { width: '30%' } } : { initial: { width: '0%' }, animate: { width: '30%' }, transition: { delay: 0.8, duration: 0.8 } })}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════ */}
        {/* ── Setup Steps ─────────────────── */}
        {/* ═══════════════════════════════════ */}
        <motion.div {...m(0.55)} className="mt-8 max-w-3xl mx-auto">
          <div className="mb-2 flex items-center justify-end">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
              style={{ borderColor: `${S3_ACCENT.violet.text}30`, color: `${S3_ACCENT.violet.text}85`, background: `${S3_ACCENT.violet.text}0d` }}>
              ~2 min setup
            </span>
          </div>
          <div className="relative flex items-center justify-center gap-2.5">
            {/* Connecting line behind steps */}
            <motion.div
              className="absolute top-1/2 left-[12%] right-[12%] h-px -translate-y-1/2"
              style={{ background: `linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), hsl(263 50% 50% / 0.2), transparent)` }}
              initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: S3_EASE }}
            />

            {SETUP_STEPS.map((s, i) => {
              const StepIcon = s.icon;
              return (
                <motion.div key={i} {...m(0.6 + i * 0.05)}
                  className="relative flex items-center gap-2 px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300"
                  style={{
                    borderColor: 'hsl(263 50% 55% / 0.12)',
                    background: 'hsl(263 40% 8% / 0.5)',
                  }}
                  {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.violet.border, scale: 1.03, y: -2 } })}>
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0"
                    style={{ background: S3_ACCENT.violet.bg, color: S3_ACCENT.violet.text, border: `1px solid ${S3_ACCENT.violet.border}` }}>
                    {s.step}
                  </span>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-white/60 font-medium hover:text-white underline-offset-2 hover:underline transition-colors">
                      {s.text}
                    </a>
                  ) : (
                    <span className="text-[10px] text-white/50 font-medium">{s.text}</span>
                  )}
                  <StepIcon className="w-3 h-3 shrink-0 text-white/40" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Pricing hint ── */}
        <motion.div {...m(0.75)} className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border"
          style={{ borderColor: 'hsl(38 60% 50% / 0.2)', background: 'hsl(38 50% 50% / 0.06)' }}>
          <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
          <span className="text-xs text-white/50">
            Free disponible · <span className="text-amber-400/80 font-semibold">Pro $20/mes</span> · Max $100/mes para uso intensivo
          </span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CLAUDE DESKTOP" hue={263} contextHint="archivos, MCP y skills reutilizables" />
    </div>
  );
}
