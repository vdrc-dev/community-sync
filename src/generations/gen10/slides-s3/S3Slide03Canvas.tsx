import { motion } from 'framer-motion';
import { Palette, Layout, Wand2, Sparkles } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import toolCanvaMockup from '@/assets/slides/tool-canva-mockup.jpg';

export function S3Slide03Canvas() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Background — radial glows only */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_20%,_hsl(280_70%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_75%,_hsl(200_60%_50%_/_0.07),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_50%,_hsl(320_70%_55%_/_0.04),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={280} secondaryHue={200} tertiaryHue={320} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: 'hsl(280 60% 60% / 0.3)', background: 'hsl(280 60% 60% / 0.08)' }}>
            <Palette className="w-3.5 h-3.5" style={{ color: 'hsl(280 60% 70%)' }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'hsl(280 60% 70%)' }}>Diseño Visual</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 {...m(0.06)} className="text-4xl 2xl:text-5xl font-black text-white tracking-tight mb-1">
          Canva:{' '}
          <span style={{
            background: 'linear-gradient(135deg, hsl(280 70% 65%), hsl(200 60% 70%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 25px hsl(280 70% 65% / 0.4))',
          }}>Diseño para Todos</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[100px] origin-center mb-1.5"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(280 70% 65% / 0.7), hsl(200 60% 70% / 0.7), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.p {...m(0.12)} className="text-white/50 text-sm mb-6 mx-auto">
          Presentaciones, posts, videos y más — sin ser diseñador
        </motion.p>

        {/* Stats row */}
        <motion.div {...m(0.16)} className="flex items-center justify-center gap-8 mb-6">
          {[
            { stat: '250M+', desc: 'usuarios activos' },
            { stat: 'IA', desc: 'Magic Studio' },
            { stat: '$0', desc: 'plan gratuito' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-lg font-black" style={{ color: 'hsl(280 60% 70%)' }}>{s.stat}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{s.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Main visual: Canva mockup */}
        <motion.div {...m(0.24)} className="mb-6 max-w-[520px] mx-auto" {...(isExporting ? {} : { whileHover: { scale: 1.02 } })}>
          <div className="relative rounded-2xl border overflow-hidden" style={{ borderColor: 'hsl(280 60% 50% / 0.2)', background: 'hsl(280 60% 50% / 0.03)' }}>
            {!isExporting && (
              <motion.div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(280 70% 72% / 0.1) 50%, transparent 65%)', width: '45%' }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4, ease: 'linear' }} />
            )}
            {/* Browser chrome */}
            <div className="relative px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(280 60% 50% / 0.1)' }}>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] text-white/40 font-mono ml-2">canva.com</span>
            </div>
            <img src={toolCanvaMockup} alt="Canva Design Platform" className="w-full h-auto object-cover" style={{ maxHeight: '260px' }} />
          </div>
        </motion.div>

        {/* Use cases */}
        <motion.div {...m(0.4)} className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-left mb-4">
          {[
            { icon: Layout, tip: 'Presentaciones pro', detail: 'Templates + Brand Kit para crear decks consistentes en minutos' },
            { icon: Wand2, tip: 'Magic Studio (IA)', detail: 'Genera imágenes, reescribe textos y redimensiona en un clic' },
            { icon: Palette, tip: 'Social Media', detail: 'Posts, Reels, thumbnails — todo con la identidad de tu marca' },
          ].map((t, i) => (
            <motion.div key={i} {...m(0.44 + i * 0.04)} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]"
              {...(isExporting ? {} : { whileHover: { borderColor: 'hsl(280 60% 60% / 0.3)' } })}>
              <t.icon className="w-4 h-4 mb-2" style={{ color: 'hsl(280 60% 70%)' }} />
              <p className="text-[11px] text-white/60 font-semibold mb-1">{t.tip}</p>
              <p className="text-[10px] text-white/40 leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tool link */}
        <motion.div {...m(0.55)} className="inline-flex items-center gap-2 text-xs text-white/40">
          <Sparkles className="w-3.5 h-3.5 text-purple-400/50" />
          <span>
            Explora en{' '}
            <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" className="text-purple-400/80 font-semibold hover:text-purple-300 underline-offset-2 hover:underline">canva.com</a>
            {' '}— plan gratuito disponible
          </span>
        </motion.div>
      </div>

      <S3Footer sectionLabel="DISEÑO VISUAL" hue={280} contextHint="Canva para diseño y presentaciones" />
    </div>
  );
}
