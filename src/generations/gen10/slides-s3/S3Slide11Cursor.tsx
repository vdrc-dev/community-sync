import { motion } from 'framer-motion';
import { Code2, Eye, FolderTree, Layers, Terminal, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import toolCursorMockup from '@/assets/slides/tool-cursor-mockup.jpg';

const POWERS = [
  { icon: FolderTree, label: 'Multi-archivo', detail: 'Refactors completos', accent: S3_ACCENT.amber },
  { icon: Eye, label: 'Preview en vivo', detail: 'Feedback inmediato', accent: S3_ACCENT.cyan },
  { icon: Layers, label: 'Contexto total', detail: 'Código + docs + history', accent: S3_ACCENT.violet },
  { icon: Terminal, label: 'Terminal integrada', detail: 'Comandos dentro del IDE', accent: S3_ACCENT.emerald },
];

export function S3Slide11Cursor() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_25%_25%,_hsl(38_80%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(263_60%_55%_/_0.06),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={38} secondaryHue={263} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.amber.border, background: S3_ACCENT.amber.bg }}>
            <Code2 className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.amber.text }}>Desarrollo</span>
          </div>
        </motion.div>

        <motion.h1 {...(s3MotionEpic(0.08, isExporting))} className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
          <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">Cursor</a>:{' '}
          <span style={s3GradientText('hsl(38 90% 65%)', 'hsl(185 70% 60%)', 38)}>
            IDE con IA
          </span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[100px] origin-center mt-1.5"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(38 90% 55% / 0.6), hsl(185 70% 55% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
        />
        <motion.p {...m(0.1)} className="text-white/50 text-sm mt-2 mb-8 max-w-md mx-auto">
          Tu estudio de desarrollo para proyectos largos y consistentes
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          {/* IDE Reference Screenshot */}
          <motion.div {...m(0.2)} className="col-span-1 sm:col-span-7 relative">
            <div className="relative rounded-2xl border overflow-hidden" style={{ borderColor: 'hsl(38 80% 55% / 0.12)', background: 'hsl(38 80% 55% / 0.02)' }}>
              {!isExporting && (
                <motion.div
                  className="absolute inset-0 z-[1] pointer-events-none rounded-2xl overflow-hidden"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(38 90% 65% / 0.08) 50%, transparent 65%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                />
              )}
              <div className="relative px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(38 80% 55% / 0.08)' }}>
                <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" /></div>
                <span className="text-[10px] text-white/40 font-mono ml-2">cursor — dashboard/</span>
              </div>
              <div className="relative">
                <img src={toolCursorMockup} alt="Cursor IDE" className="w-full h-auto object-cover" style={{ maxHeight: '280px', filter: 'brightness(0.85) saturate(0.9)' }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 55%, hsl(38 80% 12% / 0.45) 100%)' }} />
              </div>
            </div>
          </motion.div>

          {/* Powers grid */}
          <div className="col-span-1 sm:col-span-5 grid grid-cols-2 gap-3">
            {POWERS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} {...m(0.25 + i * 0.08)}
                  className="relative group rounded-xl border p-4 flex flex-col items-center justify-center gap-2.5 overflow-hidden"
                  style={{ borderColor: p.accent.border, background: p.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.05, y: -2 } })}>
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(38 90% 65% / 0.08) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.45 }}
                    />
                  )}
                  <Icon className="w-6 h-6 relative" style={{ color: p.accent.text }} />
                  <span className="text-xs font-bold text-white/60 relative">{p.label}</span>
                  <span className="text-[10px] text-white/40 relative text-center">{p.detail}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Workflow tip */}
        <motion.div {...m(0.55)} className="mt-6 max-w-3xl mx-auto grid grid-cols-3 gap-3 text-left">
          {[
            { tip: 'Cmd+K = Editar', detail: 'Selecciona código y pide cambios inline' },
            { tip: 'Chat = Planear', detail: 'Abre el chat lateral para cambios multi-archivo' },
            { tip: 'Agent = Crear', detail: 'Genera features completas con contexto del proyecto' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.58 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...m(0.7)} className="mt-5 inline-flex items-center gap-2 text-xs text-white/45">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
          <span>Hobby gratis · <span className="text-amber-400/70 font-semibold">Pro $20/mes</span> · Pro+ $60 · Ultra $200 (incluye créditos de modelo)</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="DESARROLLO" hue={38} contextHint="de idea a feature en Cursor" />
    </div>
  );
}
