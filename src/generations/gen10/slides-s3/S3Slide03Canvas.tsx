import { motion } from 'framer-motion';
import { Palette, Layout, Wand2, Sparkles, ExternalLink, ChevronRight, Type, Image as ImageIcon } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, S3_SERIF, s3SerifAnchor } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import toolCanvaMockup from '@/assets/slides/tool-canva-mockup.jpg';

const ACCENT_HUE = 280;
const accent = {
  text: `hsl(${ACCENT_HUE} 60% 70%)`,
  border: `hsl(${ACCENT_HUE} 60% 60% / 0.3)`,
  bg: `hsl(${ACCENT_HUE} 60% 60% / 0.08)`,
  glow: `hsl(${ACCENT_HUE} 60% 60% / 0.25)`,
};

const USE_CASES = [
  { icon: Layout, tip: 'Presentaciones pro', detail: 'Templates + Brand Kit para crear decks consistentes en minutos' },
  { icon: Wand2, tip: 'Magic Studio (IA)', detail: 'Genera imágenes, reescribe textos y redimensiona en un clic' },
  { icon: Palette, tip: 'Social Media', detail: 'Posts, Reels, thumbnails — todo con la identidad de tu marca' },
];

const STATS = [
  { stat: '250M+', desc: 'usuarios activos' },
  { stat: 'IA', desc: 'Magic Studio' },
  { stat: '$0', desc: 'plan gratuito' },
];

export function S3Slide03Canvas() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_20%,_hsl(280_70%_50%_/_0.1),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_75%,_hsl(200_60%_50%_/_0.07),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_50%,_hsl(320_70%_55%_/_0.04),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={280} secondaryHue={200} tertiaryHue={320} showAurora />
      </div>

      {/* Editorial serif anchor */}
      <div className="absolute bottom-[-8%] left-[-3%] z-[1]">
        <span style={s3SerifAnchor('Cv', 280, 0.025)}>Cv</span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 mb-8">
          <div className="flex-1 min-w-0 text-left">
            <motion.div {...m(0)} className="mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: accent.border, background: accent.bg }}>
                <Palette className="w-3.5 h-3.5" style={{ color: accent.text }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: accent.text }}>Diseño Visual</span>
              </div>
            </motion.div>

            <motion.h1 {...me(0.06)} className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black tracking-tight mb-2 leading-[1.05]">
              <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" style={{ fontFamily: S3_SERIF, fontStyle: 'italic' }}>Canva</a>
              <span
                style={{
                  background: `linear-gradient(135deg, hsl(${ACCENT_HUE} 70% 65%), hsl(200 60% 70%))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 25px hsl(${ACCENT_HUE} 70% 65% / 0.4))`,
                }}
              >
                : Diseño para Todos
              </span>
            </motion.h1>

            <motion.div
              className="h-[2px] rounded-full max-w-[100px] origin-left mb-4"
              style={{ background: `linear-gradient(90deg, hsl(${ACCENT_HUE} 70% 65% / 0.7), hsl(200 60% 70% / 0.5), transparent)` }}
              initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.8, ease: S3_EASE }}
            />

            <motion.p {...m(0.15)} className="text-white/45 text-sm mb-6 max-w-sm">
              Presentaciones, posts, videos y más — sin ser diseñador
            </motion.p>

            {/* Stats — serif metrics */}
            <motion.div
              {...m(0.2)}
              className="inline-flex items-center gap-6 px-5 py-3 rounded-xl border"
              style={{ borderColor: accent.border, background: accent.bg }}
            >
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <p style={{ fontFamily: S3_SERIF, fontSize: '22px', fontWeight: 900, fontStyle: 'italic', color: accent.text, lineHeight: 1 }}>{s.stat}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{s.desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div {...m(0.26)} className="mt-4 flex items-center gap-2 flex-wrap">
              {['Idea', 'Template', 'Brand Kit', 'Export'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold border"
                    style={{ borderColor: `${accent.text}20`, color: `${accent.text}90`, background: `${accent.text}08` }}
                  >
                    {step}
                  </span>
                  {i < 3 && <ChevronRight className="w-3 h-3 text-white/25" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Canva mockup */}
          <motion.div {...me(0.15)} className="relative flex-shrink-0 w-full lg:w-[48%] max-w-[520px] hidden sm:block">
            <div className="absolute -inset-12 rounded-full blur-[120px] opacity-40"
              style={{ background: `radial-gradient(circle, hsl(${ACCENT_HUE} 60% 50% / 0.3), transparent 70%)` }} />
            <div className="relative p-[1.5px] rounded-2xl overflow-hidden"
              style={{ background: `linear-gradient(145deg, hsl(${ACCENT_HUE} 70% 60% / 0.4), hsl(200 50% 50% / 0.2))` }}>
              <div className="rounded-[calc(1rem-1.5px)] overflow-hidden relative flex flex-col"
                style={{ background: 'hsl(0 0% 4%)', boxShadow: `0 40px 100px hsl(${ACCENT_HUE} 50% 25% / 0.35)` }}>
                {!isExporting && (
                  <motion.div className="absolute inset-0 z-20 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 35%, hsl(${ACCENT_HUE} 70% 72% / 0.08) 50%, transparent 65%)`, width: '45%' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'linear' }} />
                )}
                <div className="relative px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: `hsl(${ACCENT_HUE} 60% 50% / 0.1)` }}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono ml-2">canva.com</span>
                  <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" className="ml-auto">
                    <ExternalLink className="w-3 h-3 text-white/25 hover:text-white/50 transition-colors" />
                  </a>
                </div>
                <div className="flex" style={{ height: '280px' }}>
                  <div className="w-[50px] border-r flex flex-col items-center py-3 gap-3 shrink-0"
                    style={{ borderColor: `hsl(${ACCENT_HUE} 40% 30% / 0.15)`, background: 'hsl(0 0% 6%)' }}>
                    {[Layout, Type, Wand2, Palette, ImageIcon].map((Icon, i) => (
                      <motion.div key={i}
                        className="w-8 h-8 rounded-lg flex items-center justify-center border"
                        style={{
                          borderColor: i === 2 ? `hsl(${ACCENT_HUE} 60% 60% / 0.35)` : 'hsl(0 0% 100% / 0.06)',
                          background: i === 2 ? `hsl(${ACCENT_HUE} 60% 60% / 0.12)` : 'transparent',
                        }}
                        {...(isExporting ? {} : (i === 2 ? {
                          animate: { borderColor: [`hsl(${ACCENT_HUE} 60% 60% / 0.35)`, `hsl(${ACCENT_HUE} 60% 60% / 0.6)`, `hsl(${ACCENT_HUE} 60% 60% / 0.35)`] },
                          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                        } : {}))}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: i === 2 ? accent.text : 'hsl(0 0% 100% / 0.3)' }} />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex-1 relative">
                    <OptimizedImage src={toolCanvaMockup} alt="Canva Design Platform" className="w-full h-full" style={{ filter: 'brightness(0.85) saturate(0.9)' }} />
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(180deg, transparent 50%, hsl(0 0% 4%) 100%)' }} />
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, hsl(${ACCENT_HUE} 50% 30% / 0.15), transparent 60%)` }} />
                    {!isExporting && (
                      <motion.div
                        className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 z-20"
                        style={{ background: `linear-gradient(135deg, hsl(${ACCENT_HUE} 70% 50%), hsl(200 60% 45%))`, boxShadow: `0 4px 15px hsl(${ACCENT_HUE} 70% 50% / 0.4)` }}
                        animate={{ opacity: [0.85, 1, 0.85] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Wand2 className="w-3 h-3 text-white" />
                        <span className="text-[9px] font-bold text-white uppercase tracking-wide">Magic Studio</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Use cases */}
        <motion.div {...m(0.35)} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-4">
          {USE_CASES.map((t, i) => (
            <motion.div key={i} {...m(0.38 + i * 0.04)}
              className="p-4 rounded-xl border overflow-hidden relative group"
              style={{ borderColor: 'hsl(0 0% 100% / 0.08)', background: 'hsl(0 0% 100% / 0.02)' }}
              {...(isExporting ? {} : { whileHover: { borderColor: accent.border, scale: 1.02 } })}>
              {!isExporting && (
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(105deg, transparent 35%, ${accent.glow} 50%, transparent 65%)` }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
              )}
              <t.icon className="w-4 h-4 mb-2 relative" style={{ color: accent.text }} />
              <p className="text-[11px] text-white/60 font-semibold mb-1 relative">{t.tip}</p>
              <p className="text-[10px] text-white/40 leading-relaxed relative">{t.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...m(0.55)} className="text-center">
          <div className="inline-flex items-center gap-2 text-xs text-white/40">
            <Sparkles className="w-3.5 h-3.5 text-purple-400/50" />
            <span>
              Explora en{' '}
              <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" className="text-purple-400/80 font-semibold hover:text-purple-300 underline-offset-2 hover:underline">canva.com</a>
              {' '}— plan gratuito disponible
            </span>
          </div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="HERRAMIENTAS" hue={ACCENT_HUE} contextHint="Canva para diseño y presentaciones" />
    </div>
  );
}
