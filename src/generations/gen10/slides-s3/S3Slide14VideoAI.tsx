import { motion } from 'framer-motion';
import { Video, Film, Mic, Wand2, Play, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import bgVideo from '@/assets/gen10-s3/bg-video-ai.jpg';

const POWERS = [
  { title: '4K 60fps Nativo', icon: Play, accent: S3_ACCENT.rose },
  { title: 'Audio + Video', icon: Film, accent: S3_ACCENT.violet },
  { title: 'Img → Video', icon: Wand2, accent: S3_ACCENT.cyan },
  { title: 'Multi-Cámara', icon: Mic, accent: S3_ACCENT.amber },
];

const ENGINES = [
  { name: 'Sora 2', provider: 'OpenAI', detail: 'Audio nativo · Multi-shot' },
  { name: 'Veo 3.1', provider: 'Google', detail: '4K · Audio integrado' },
  { name: 'Kling 3.0', provider: 'Kuaishou', detail: '4K 60fps · 15s · Multi-cam' },
];

const FLOATING_PILLS = [
  { label: '4K', left: '12%', top: '30%' },
  { label: 'Sora', left: '84%', top: '28%' },
  { label: 'lip-sync', left: '80%', top: '64%' },
];

export function S3Slide14VideoAI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgVideo} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(330_65%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(263_60%_55%_/_0.07),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      {/* Floating decorative pills */}
      {!isExporting && FLOATING_PILLS.map((pill, i) => (
        <motion.div
          key={pill.label}
          className="absolute z-0 px-3 py-1.5 rounded-full border text-[10px] font-bold pointer-events-none uppercase tracking-wider"
          style={{
            borderColor: 'hsl(330 85% 68% / 0.25)',
            background: 'hsl(330 85% 68% / 0.06)',
            color: 'hsl(330 85% 75% / 0.95)',
            left: pill.left,
            top: pill.top,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: S3_EASE }}
        >
          {pill.label}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Video className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Video Generativo</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Krea.ai:{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, hsl(330 85% 68%), hsl(263 60% 70%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 25px hsl(330 85% 60% / 0.4))',
            }}
          >
            Centro de Mando
          </span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[120px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 60% / 0.6), hsl(263 60% 65% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
        />
        <motion.p {...m(0.15)} className="text-white/35 text-lg mt-4 mb-14 max-w-lg mx-auto">
          Orquesta Sora 2, Veo 3.1 y Kling 3.0 desde una interfaz
        </motion.p>

        {/* Hero area with orbital ring + film frame around cards */}
        <div className="relative">
          {/* Orbital rotating ring around hero area */}
          {!isExporting && (
            <>
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-[640px] aspect-video rounded-3xl pointer-events-none"
                style={{
                  border: '1px solid hsl(330 85% 60% / 0.12)',
                  borderStyle: 'dashed',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] max-w-[680px] aspect-video rounded-3xl pointer-events-none"
                style={{
                  border: '1px solid hsl(263 60% 60% / 0.08)',
                  borderStyle: 'dashed',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          {/* Film frame: two horizontal lines at top and bottom of card area */}
          <div
            className="absolute left-0 right-0 pointer-events-none z-[1]"
            style={{
              top: -20,
              height: 12,
              background: 'linear-gradient(180deg, hsl(330 65% 40% / 0.35) 0%, transparent 100%)',
              borderBottom: '2px solid hsl(330 65% 55% / 0.25)',
            }}
          />
          <div
            className="absolute left-0 right-0 pointer-events-none z-[1]"
            style={{
              bottom: -20,
              height: 12,
              background: 'linear-gradient(0deg, hsl(263 60% 40% / 0.35) 0%, transparent 100%)',
              borderTop: '2px solid hsl(263 60% 55% / 0.25)',
            }}
          />

          {/* 4 power cards with shimmer inside each */}
          <div className="grid grid-cols-4 gap-4 mb-10 relative">
            {POWERS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} {...m(0.2 + i * 0.08)}
                  className="relative group rounded-2xl border overflow-hidden"
                  style={{ borderColor: p.accent.border, background: p.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.06, y: -4 } })}>
                  {/* Shimmer sweep inside each power card */}
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 35%, hsl(330 85% 68% / 0.1) 50%, transparent 65%)',
                      }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.5 }}
                    />
                  )}
                  {!isExporting && (
                    <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: p.accent.glow }} />
                  )}
                  <div className="relative p-6 flex flex-col items-center gap-4">
                    {i === 0 && !isExporting && (
                      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ border: `1px solid ${p.accent.dot}40` }}
                        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity }} />
                    )}
                    <div className="w-14 h-14 rounded-2xl border flex items-center justify-center"
                      style={{ borderColor: `${p.accent.text}25`, background: `${p.accent.text}08` }}>
                      <Icon className="w-7 h-7" style={{ color: p.accent.text }} />
                    </div>
                    <p className="text-sm font-black text-white">{p.title}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Engine pills */}
        <motion.div {...m(0.5)} className="flex items-center justify-center gap-3">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mr-2">Motores:</p>
          {ENGINES.map((e, i) => (
            <motion.div key={i} {...m(0.55 + i * 0.06)}
              className="px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.rose.border, scale: 1.04 } })}>
              <span className="text-sm font-bold text-white">{e.name}</span>
              <span className="text-[9px] text-white/20 font-mono ml-2">{e.provider}</span>
              <span className="text-[8px] text-white/15 ml-1">· {e.detail}</span>
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
          <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/35 font-semibold">
            <span>Storyboard</span>
            <span>Render</span>
            <span>Publish</span>
          </div>
        </motion.div>

        {/* Pro tips */}
        <motion.div {...m(0.65)} className="mt-6 max-w-2xl mx-auto grid grid-cols-2 gap-3 text-left">
          {[
            { tip: '🎬 Img → Video', detail: 'Krea anima fotos en clips de 5-15s con audio nativo' },
            { tip: '🗣️ Lip-sync + Multi-cam', detail: 'Kling 3.0: hasta 6 cortes de cámara en un solo clip' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.68 + i * 0.04)} className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/25 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...m(0.75)} className="mt-5 inline-flex items-center gap-2 text-xs text-rose-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>De clips aleatorios a <span className="text-rose-400/80 font-semibold">narrativas visuales</span> con control total</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="VIDEO GENERATIVO" hue={330} />
    </div>
  );
}
