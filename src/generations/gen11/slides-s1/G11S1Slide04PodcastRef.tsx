import { motion } from 'framer-motion';
import { Play, ExternalLink, Clock, Mic, BookOpen } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { VDRC_GREEN } from './theme';
import podcastIllustration from '@/assets/gen11-podcast-illustration.png';

const CHAPTERS = [
  { time: '03:05', label: '¿La IA: imprenta o bomba atómica?' },
  { time: '17:22', label: 'Entrenar tu IA personal' },
  { time: '19:16', label: 'Instrucciones personalizadas en ChatGPT' },
  { time: '39:46', label: 'Las herramientas no negociables' },
  { time: '51:40', label: 'Hábitos y mentalidad para no quedarse atrás' },
];

const PODCAST_URL = 'https://www.youtube.com/watch?v=X-gsNORRJa8';
const PODCAST_ORANGE = '#E8602C';

export function G11S1Slide04PodcastRef() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      {/* Left green bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Subtle orange glow from right */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 55% 70% at 85% 50%, ${PODCAST_ORANGE}18, transparent 70%)`
      }} />

      {/* Left content */}
      <div className="relative z-10 flex flex-col justify-center w-full sm:w-[56%] px-12 sm:px-20 py-12">
        <motion.div {...m(0)} className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
            style={{ borderColor: `${PODCAST_ORANGE}50`, background: `${PODCAST_ORANGE}15` }}>
            <Mic className="w-3 h-3" style={{ color: PODCAST_ORANGE }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: PODCAST_ORANGE }}>
              Material de Referencia
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none mb-2">
            Una conversación
          </h2>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none mb-1" style={{ color: PODCAST_ORANGE }}>
            necesaria
          </h2>
          <h2 className="text-xl sm:text-2xl font-black text-white/60 tracking-tight uppercase leading-none mb-5">
            sobre IA y transformación digital
          </h2>

          <G11GreenLine className="max-w-xs mb-4" />

          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/40 text-xs">Nación Emprendedora Podcast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/40 text-xs font-mono">53 min</span>
            </div>
          </div>
          <p className="text-white/40 text-xs max-w-sm leading-relaxed">
            Vicente Donoso — experto en transformación digital, estrategia empresarial y automatización de procesos.
          </p>
        </motion.div>

        {/* Chapter highlights */}
        <motion.div {...m(0.2)} className="mb-7">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-3 text-white/30">Capítulos clave</p>
          <div className="space-y-2">
            {CHAPTERS.map((ch, i) => (
              <motion.div key={ch.time} {...m(0.25 + i * 0.06)}
                className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold w-10 flex-shrink-0" style={{ color: PODCAST_ORANGE }}>
                  {ch.time}
                </span>
                <div className="h-px w-3 flex-shrink-0" style={{ background: `${PODCAST_ORANGE}40` }} />
                <span className="text-white/55 text-xs">{ch.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...m(0.6)}>
          <a
            href={PODCAST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-black text-white text-sm tracking-wide uppercase transition-all hover:scale-[1.02] hover:brightness-110 group"
            style={{ background: PODCAST_ORANGE, boxShadow: `0 8px 32px ${PODCAST_ORANGE}50` }}
          >
            <Play className="w-4 h-4 fill-white" />
            Ver en YouTube
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
          </a>
        </motion.div>
      </div>

      {/* Right — podcast illustration */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[46%] overflow-hidden">
        {/* Fade on left edge */}
        <div className="absolute inset-y-0 left-0 w-28 z-10"
          style={{ background: 'linear-gradient(90deg, #181c1b, transparent)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10"
          style={{ background: 'linear-gradient(0deg, #181c1b, transparent)' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={podcastIllustration}
            alt="Podcast illustration"
            className="w-full h-full object-cover"
            style={{
              filter: 'saturate(1.1) contrast(1.05)',
              mixBlendMode: 'normal',
            }}
          />
        </motion.div>

        {/* Orange tint overlay top */}
        <div className="absolute top-0 right-0 left-0 h-1 z-10" style={{ background: PODCAST_ORANGE }} />
      </div>
    </G11Shell>
  );
}
