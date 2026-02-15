import { motion } from 'framer-motion';
import { Monitor, Globe, Terminal, FolderOpen, Plug, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const DESKTOP_POWERS = [
  { icon: FolderOpen, label: 'Archivos locales' },
  { icon: Plug, label: 'Conectores MCP' },
  { icon: Terminal, label: 'Terminal' },
];

const FLOATING_PILLS = ['MCP', 'Skills', 'Local'];

export function S3Slide06ClaudeCode() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(263_60%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(280_55%_50%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,_transparent_35%,_hsl(263_75%_65%_/_0.08)_50%,_transparent_65%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={280} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Terminal className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Claude Code</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Tu Agente de <span
            style={{
              background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(280 60% 65%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(263 70% 72% / 0.4))',
            }}
          >Escritorio</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mt-4 mx-auto max-w-[120px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.8), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: S3_EASE }}
        />
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-14 max-w-md mx-auto">
          La IA que vive en tu computador, no en la nube
        </motion.p>

        {/* Visual VS comparison */}
        <div className="relative grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          {!isExporting && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-3 py-1 rounded-full text-[10px] font-black tracking-wider border"
              style={{ color: S3_ACCENT.violet.text, borderColor: S3_ACCENT.violet.border, background: 'hsl(263 65% 50% / 0.12)' }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              VS
            </motion.div>
          )}
          {/* Desktop — HERO */}
          <motion.div {...m(0.2)} className="relative group">
            {/* Pulsing glow behind Desktop card */}
            {!isExporting && (
              <motion.div
                className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
                style={{ background: S3_ACCENT.violet.glow }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {!isExporting && (
              <motion.div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ background: S3_ACCENT.violet.glow }} />
            )}
            <div className="relative p-6 rounded-2xl border overflow-hidden" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
              {/* Shimmer sweep */}
              {!isExporting && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 70% 72% / 0.1) 50%, transparent 65%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                />
              )}
              {/* Recommended badge */}
              <motion.div className="absolute -top-3 right-4 px-3 py-1 rounded-full text-[9px] font-black tracking-wider z-10"
                style={{ background: S3_ACCENT.violet.dot, color: '#04030a' }}
                {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity } })}>
                RECOMENDADO
              </motion.div>

              {/* Orbital ring around Monitor icon */}
              <div className="relative flex justify-center mb-4">
                {!isExporting && (
                  <motion.div
                    className="absolute w-20 h-20 rounded-full border-2 border-dashed pointer-events-none"
                    style={{ borderColor: `${S3_ACCENT.violet.text}20`, opacity: 0.12 }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                <Monitor className="w-12 h-12 mx-auto relative z-10" style={{ color: S3_ACCENT.violet.text }} />
              </div>
              <p className="text-xl font-black text-white mb-5">Claude Desktop</p>

              <div className="space-y-2.5">
                {DESKTOP_POWERS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={i} {...m(0.3 + i * 0.06)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                      style={{ borderColor: `${S3_ACCENT.violet.text}15`, background: `${S3_ACCENT.violet.text}05` }}>
                      <Icon className="w-5 h-5" style={{ color: S3_ACCENT.violet.text }} />
                      <span className="text-sm text-white/60 font-medium">{p.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Power bar */}
              <div className="mt-5 h-1.5 rounded-full overflow-hidden" style={{ background: `${S3_ACCENT.violet.text}10` }}>
                <motion.div className="h-full rounded-full" style={{ background: S3_ACCENT.violet.dot }}
                  {...(isExporting ? { style: { width: '100%', background: S3_ACCENT.violet.dot } } : { initial: { width: '0%' }, animate: { width: '100%' }, transition: { delay: 0.6, duration: 1.2 } })} />
              </div>
              <p className="text-[10px] text-white/25 mt-1.5 text-right">100% capacidad</p>
            </div>

            {/* Floating decorative pills near Desktop card */}
            {!isExporting && FLOATING_PILLS.map((label, i) => (
              <motion.div
                key={label}
                className="absolute px-2.5 py-1 rounded-full text-[9px] font-semibold border pointer-events-none"
                style={{
                  borderColor: S3_ACCENT.violet.border,
                  background: S3_ACCENT.violet.bg,
                  color: S3_ACCENT.violet.text,
                  left: i === 0 ? '-12%' : i === 1 ? '105%' : undefined,
                  right: i === 1 ? undefined : i === 2 ? '-8%' : undefined,
                  top: i === 0 ? '15%' : i === 1 ? '8%' : '70%',
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>

          {/* Web — dimmed */}
          <motion.div {...m(0.25)} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] opacity-60">
            <Globe className="w-12 h-12 mb-4 mx-auto text-white/20" />
            <p className="text-xl font-black text-white/40 mb-5">Claude Web</p>

            <div className="space-y-2.5">
              {['Sin archivos locales', 'Sin MCP', 'Sin terminal'].map((l, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                  <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center">
                    <span className="text-[8px] text-white/15">✕</span>
                  </div>
                  <span className="text-sm text-white/25">{l}</span>
                </div>
              ))}
            </div>

            {/* Power bar */}
            <div className="mt-5 h-1.5 rounded-full overflow-hidden bg-white/[0.04]">
              <motion.div className="h-full rounded-full bg-white/10"
                {...(isExporting ? { style: { width: '30%' } } : { initial: { width: '0%' }, animate: { width: '30%' }, transition: { delay: 0.8, duration: 0.8 } })} />
            </div>
            <p className="text-[10px] text-white/15 mt-1.5 text-right">30% capacidad</p>
          </motion.div>
        </div>

        <motion.div {...m(0.6)} className="mt-10 inline-flex items-center gap-2 text-xs text-amber-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gratis para empezar — <span className="text-amber-400/80 font-semibold">claude.ai/download</span></span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CLAUDE CODE" hue={263} />
    </div>
  );
}
