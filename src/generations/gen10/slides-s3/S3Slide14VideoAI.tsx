import { motion } from 'framer-motion';
import { Video, Film, Mic, Wand2, Play, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import toolKreaMockup from '@/assets/slides/tool-krea-mockup.jpg';

const POWERS = [
  { title: '4K 60fps Nativo', icon: Play, accent: S3_ACCENT.rose },
  { title: 'Audio + Video', icon: Film, accent: S3_ACCENT.violet },
  { title: 'Img → Video', icon: Wand2, accent: S3_ACCENT.cyan },
  { title: 'Lip-sync IA', icon: Mic, accent: S3_ACCENT.amber },
];

const ENGINES = [
  { name: 'Sora 2', provider: 'OpenAI', detail: 'Audio nativo · Multi-shot', accent: S3_ACCENT.rose },
  { name: 'Veo 3.1', provider: 'Google', detail: '4K · Audio integrado', accent: S3_ACCENT.violet },
  { name: 'Kling 3.0', provider: 'Kuaishou', detail: '4K 60fps · Lip-sync · Multi-cam', accent: S3_ACCENT.cyan },
];

export function S3Slide14VideoAI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(330_65%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(263_60%_55%_/_0.07),_transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Video className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Video Generativo</span>
          </div>
        </motion.div>

        <motion.h1 {...(s3MotionEpic(0.08, isExporting))} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
          <a
            href="https://www.krea.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-300/90 transition-colors underline-offset-4 hover:underline"
          >
            Krea.ai
          </a>
          :{' '}
          <span style={s3GradientText('hsl(330 85% 68%)', 'hsl(263 60% 70%)', 330)}>
            Centro de Mando
          </span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[100px] origin-center mt-1.5"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 60% / 0.6), hsl(263 60% 65% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
        />
        <motion.p {...m(0.1)} className="text-white/50 text-sm mt-2 mb-8 max-w-lg mx-auto">
          Orquesta Sora 2, Veo 3.1 y Kling 3.0 desde una interfaz
        </motion.p>

        {/* Hero: Krea.ai reference + power cards */}
        <div className="grid grid-cols-12 gap-5 mb-8">
          {/* Reference screenshot */}
          <motion.div {...m(0.2)} className="col-span-7">
            <div className="relative rounded-2xl border overflow-hidden" style={{ borderColor: 'hsl(330 65% 55% / 0.15)', background: 'hsl(330 65% 55% / 0.03)' }}>
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
              <img src={toolKreaMockup} alt="Krea.ai" className="w-full h-auto object-cover" style={{ maxHeight: '240px' }} />
            </div>
          </motion.div>

          {/* 4 power cards */}
          <div className="col-span-5 grid grid-cols-2 gap-3">
            {POWERS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} {...m(0.25 + i * 0.08)}
                  className="relative group rounded-xl border overflow-hidden"
                  style={{ borderColor: p.accent.border, background: p.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.05, y: -2 } })}>
                  {!isExporting && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(330 85% 68% / 0.08) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.5 }} />
                  )}
                  <div className="relative p-4 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ borderColor: `${p.accent.text}25`, background: `${p.accent.text}08` }}>
                      <Icon className="w-5 h-5" style={{ color: p.accent.text }} />
                    </div>
                    <p className="text-xs font-black text-white">{p.title}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Engine pills */}
        <motion.div {...m(0.5)} className="flex items-center justify-center gap-3">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mr-2">Motores:</p>
          {ENGINES.map((e, i) => (
            <motion.div key={i} {...m(0.55 + i * 0.06)}
              className="relative px-4 py-2.5 rounded-xl border overflow-hidden"
              style={{ borderColor: e.accent.border, background: e.accent.bg }}
              {...(isExporting ? {} : { whileHover: { scale: 1.04, y: -2 } })}>
              {!isExporting && (
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(105deg, transparent 35%, ${e.accent.text}10 50%, transparent 65%)` }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.5 }} />
              )}
              <div className="relative flex items-center gap-2">
                <span className="text-sm font-bold text-white">{e.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md" style={{ color: `${e.accent.text}90`, background: `${e.accent.text}10` }}>{e.provider}</span>
              </div>
              <p className="relative text-[10px] text-white/40 mt-0.5">{e.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Cinematic timeline strip */}
        <motion.div
          {...m(0.62)}
          className="mt-6 mx-auto max-w-2xl rounded-xl border px-4 py-3 relative overflow-hidden"
          style={{ borderColor: 'hsl(330 65% 60% / 0.2)', background: 'hsl(330 65% 55% / 0.05)' }}
        >
          <div className="h-1.5 rounded-full bg-white/10 relative">
            {!isExporting && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                style={{ background: 'hsl(330 90% 72%)', boxShadow: '0 0 18px hsl(330 90% 72% / 0.8)' }}
                animate={{ left: ['0%', '100%', '0%'] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <div className="absolute inset-y-0 left-0 w-2/3 rounded-full" style={{ background: 'linear-gradient(90deg, hsl(330 85% 65% / 0.55), hsl(263 60% 65% / 0.45))' }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40 font-semibold">
            <span>Storyboard</span>
            <span>Render</span>
            <span>Publish</span>
          </div>
        </motion.div>

        {/* Pro tips */}
        <motion.div {...m(0.65)} className="mt-6 max-w-2xl mx-auto grid grid-cols-2 gap-3 text-left">
          {[
            { icon: Wand2, tip: 'Img → Video', detail: 'Krea anima fotos en clips de 5-15s con audio nativo', accent: S3_ACCENT.rose },
            { icon: Film, tip: 'Lip-sync + Multi-cam', detail: 'Kling 3.0: hasta 6 cortes de cámara en un solo clip', accent: S3_ACCENT.violet },
          ].map((t, i) => {
            const TipIcon = t.icon;
            return (
              <motion.div key={i} {...m(0.68 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] relative overflow-hidden group"
                {...(isExporting ? {} : { whileHover: { borderColor: t.accent.border, scale: 1.02 } })}>
                {!isExporting && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 35%, ${t.accent.text}08 50%, transparent 65%)` }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
                )}
                <div className="relative flex items-start gap-2.5">
                  <TipIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: t.accent.text }} />
                  <div>
                    <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
                    <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div {...m(0.75)} className="mt-5 inline-flex items-center gap-2 text-xs text-white/45">
          <Sparkles className="w-3.5 h-3.5 text-rose-400/60" />
          <span>De clips aleatorios a <span className="text-rose-400/70 font-semibold">narrativas visuales</span> con control total</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="VIDEO GENERATIVO" hue={330} contextHint="narrativas visuales con control" />
    </div>
  );
}
