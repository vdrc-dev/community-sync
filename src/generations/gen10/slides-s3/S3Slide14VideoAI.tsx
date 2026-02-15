import { motion } from 'framer-motion';
import { Video, Film, Mic, Wand2, Play, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const POWERS = [
  { title: 'Videos Instantáneos', icon: Play, accent: S3_ACCENT.rose },
  { title: 'Calidad de Cine', icon: Film, accent: S3_ACCENT.violet },
  { title: 'Anima Imágenes', icon: Wand2, accent: S3_ACCENT.cyan },
  { title: 'Sincroniza Voces', icon: Mic, accent: S3_ACCENT.amber },
];

const ENGINES = [
  { name: 'Sora', provider: 'OpenAI' },
  { name: 'Veo 3', provider: 'Google' },
  { name: 'Kling', provider: 'Kuaishou' },
];

export function S3Slide14VideoAI() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(330_65%_55%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(263_60%_55%_/_0.07),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Video className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Video Generativo</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Krea.ai: <span style={{ color: S3_ACCENT.rose.text }}>Centro de Mando</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-14 max-w-lg mx-auto">
          Orquesta Sora, Veo 3 y Kling desde una sola interfaz
        </motion.p>

        {/* 4 power cards */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {POWERS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} {...m(0.2 + i * 0.08)}
                className="relative group rounded-2xl border overflow-hidden"
                style={{ borderColor: p.accent.border, background: p.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.06, y: -4 } })}>
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

        {/* Engine pills */}
        <motion.div {...m(0.5)} className="flex items-center justify-center gap-3">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mr-2">Motores:</p>
          {ENGINES.map((e, i) => (
            <motion.div key={i} {...m(0.55 + i * 0.06)}
              className="px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.rose.border, scale: 1.04 } })}>
              <span className="text-sm font-bold text-white">{e.name}</span>
              <span className="text-[9px] text-white/20 font-mono ml-2">{e.provider}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...m(0.7)} className="mt-8 inline-flex items-center gap-2 text-xs text-rose-400/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>De clips aleatorios a <span className="text-rose-400/80 font-semibold">narrativas visuales</span> con control total</span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="VIDEO GENERATIVO" hue={330} />
    </div>
  );
}
