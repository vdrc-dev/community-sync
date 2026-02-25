import { motion } from 'framer-motion';
import { Video, Film, Mic, Wand2, Play } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import toolKreaMockup from '@/assets/slides/tool-krea-mockup.jpg';

const ENGINES = [
  { name: 'Sora 2', provider: 'OpenAI', detail: 'Audio nativo · Multi-shot', accent: S3_ACCENT.rose },
  { name: 'Veo 3.1', provider: 'Google', detail: '4K · Audio integrado', accent: S3_ACCENT.violet },
  { name: 'Kling 3.0', provider: 'Kuaishou', detail: '4K 60fps · Lip-sync · Multi-cam', accent: S3_ACCENT.cyan, isNew: true },
];

export function S3Slide14VideoAI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  const roseHsl = 'hsl(330 85% 55%)';
  const serif = 'Georgia, "Times New Roman", serif';

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(330_65%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(263_60%_55%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={20} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora showPlasma showConstellation showLightRays showHolographic showChromatic intensity={1.2} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1680px] mx-auto w-full py-6">

        {/* ── EDITORIAL MASTHEAD ── */}
        <div className="grid grid-cols-12 gap-6 mb-5">
          <motion.div {...me(0)} className="col-span-3 flex flex-col justify-end">
            <p className="text-[9px] tracking-[0.35em] uppercase font-semibold" style={{ color: 'hsl(330 85% 55% / 0.5)' }}>VIDEO GENERATIVO</p>
            <p style={{
              fontSize: '110px',
              fontWeight: 400,
              color: roseHsl,
              lineHeight: '0.8',
              fontFamily: serif,
              letterSpacing: '-5px',
              filter: 'drop-shadow(0 0 40px hsl(330 85% 55% / 0.35))',
            }}>4K</p>
          </motion.div>

          <motion.div {...me(0.06)} className="col-span-9 flex flex-col justify-end">
            <h1 style={{ fontSize: '46px', fontWeight: 400, color: 'white', fontFamily: serif, lineHeight: 1.05, letterSpacing: '-1px' }}>
              <a href="https://www.krea.ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">Krea.ai</a>:{' '}
              <span style={{ fontWeight: 700, fontStyle: 'italic' }}>Centro de Mando</span>
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
        <motion.div {...m(0.1)} className="mb-5">
          <div className="flex">
            <div className="w-[3px] rounded-full shrink-0" style={{ background: roseHsl }} />
            <p className="pl-5 text-lg leading-relaxed" style={{ fontFamily: serif, fontStyle: 'italic', color: 'hsl(0 0% 90%)' }}>
              "De clips aleatorios a <span style={{ color: roseHsl, fontStyle: 'normal', fontWeight: 700 }}>narrativas visuales</span> con control total."
            </p>
          </div>
        </motion.div>

        {/* ── MAIN: Screenshot + Powers + Engines ── */}
        <div className="grid grid-cols-12 gap-5 mb-5">

          {/* Reference screenshot */}
          <motion.div {...me(0.15)} className="col-span-7 relative rounded-2xl border overflow-hidden"
            style={{ borderColor: 'hsl(330 65% 55% / 0.15)', background: 'hsl(330 65% 55% / 0.03)' }}>
            {!isExporting && (
              <motion.div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(330 85% 68% / 0.1) 50%, transparent 65%)', width: '45%' }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />
            )}
            <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(330 65% 55% / 0.1)' }}>
              <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" /></div>
              <span className="text-[10px] text-white/40 font-mono ml-2">krea.ai</span>
            </div>
            <OptimizedImage src={toolKreaMockup} alt="Krea.ai" className="w-full" style={{ maxHeight: '260px' }} />
          </motion.div>

          {/* Right: Power specs + Engines */}
          <div className="col-span-5 flex flex-col gap-4">
            {/* 4 power specs as editorial numbers */}
            <motion.div {...me(0.2)} className="rounded-xl overflow-hidden" style={{ background: 'hsl(0 0% 7%)' }}>
              <div className="grid grid-cols-2">
                {[
                  { num: '4K', label: '60fps Nativo', icon: Play },
                  { num: 'A+V', label: 'Audio integrado', icon: Film },
                  { num: 'I→V', label: 'Imagen a Video', icon: Wand2 },
                  { num: 'Sync', label: 'Lip-sync IA', icon: Mic },
                ].map((p, i) => (
                  <div key={i} className="text-center py-4 px-3"
                    style={{
                      borderBottom: i < 2 ? '1px solid hsl(0 0% 100% / 0.06)' : 'none',
                      borderRight: i % 2 === 0 ? '1px solid hsl(0 0% 100% / 0.06)' : 'none',
                    }}>
                    <motion.p style={{
                      fontSize: '28px', fontWeight: 400, color: roseHsl, fontFamily: serif,
                      letterSpacing: '-1px', lineHeight: 1,
                    }}
                    {...(isExporting ? {} : {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.4 + i * 0.08, duration: 0.4, ease: S3_EASE },
                    })}>{p.num}</motion.p>
                    <p className="text-[8px] tracking-[0.12em] uppercase text-white/35 font-semibold mt-1">{p.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Engine cards — editorial listing */}
            <motion.div {...m(0.35)}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: roseHsl }}>MOTORES</p>
              <div className="space-y-0">
                {ENGINES.map((e, i) => (
                  <motion.div key={i} {...m(0.4 + i * 0.05)}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderTop: '1px solid hsl(0 0% 100% / 0.06)' }}>
                    <span className="text-sm font-bold" style={{ fontFamily: serif, color: e.accent.text }}>{e.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ color: `${e.accent.text}`, background: `${e.accent.text}12` }}>{e.provider}</span>
                    {e.isNew && (
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded tracking-wide" style={{ color: '#04030a', background: e.accent.dot }}>NEW</span>
                    )}
                    <span className="text-[10px] text-white/35 ml-auto">{e.detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── CINEMATIC TIMELINE + INVERTED TL;DR ── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Timeline */}
          <motion.div {...m(0.55)} className="col-span-7 rounded-xl border px-5 py-3 relative overflow-hidden"
            style={{ borderColor: 'hsl(330 65% 60% / 0.15)', background: 'hsl(330 65% 55% / 0.04)' }}>
            <div className="h-2 rounded-full bg-white/10 relative overflow-hidden">
              {!isExporting && (
                <motion.div className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: `linear-gradient(90deg, hsl(330 85% 65% / 0.6), hsl(263 60% 65% / 0.5))` }}
                  animate={{ width: ['8%', '75%', '45%', '90%', '20%'] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} />
              )}
              {isExporting && (
                <div className="absolute inset-y-0 left-0 w-2/3 rounded-full" style={{ background: 'linear-gradient(90deg, hsl(330 85% 65% / 0.6), hsl(263 60% 65% / 0.5))' }} />
              )}
              {!isExporting && (
                <motion.div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{ background: 'hsl(330 90% 72%)', boxShadow: '0 0 18px hsl(330 90% 72% / 0.8)' }}
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} />
              )}
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-wider text-white/35 font-semibold">
              <span>Storyboard</span>
              <span>Render</span>
              <span>Publish</span>
            </div>
          </motion.div>

          {/* TL;DR inverted */}
          <motion.div {...me(0.6)} className="col-span-5 rounded-xl overflow-hidden" style={{ background: roseHsl }}>
            <div className="px-5 py-3.5">
              <p className="text-[8px] tracking-[0.3em] uppercase font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>EN 15 SEGUNDOS</p>
              <p className="text-xs text-white leading-relaxed" style={{ fontFamily: serif }}>
                Krea unifica Sora 2, Veo 3.1 y Kling 3.0 en una sola interfaz. Genera en <strong>4K 60fps</strong> con audio nativo y lip-sync.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <S3Footer sectionLabel="VIDEO GENERATIVO" hue={330} contextHint="narrativas visuales con control" />
    </div>
  );
}
