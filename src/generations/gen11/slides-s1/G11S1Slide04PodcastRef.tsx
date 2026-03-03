import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
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
const DARK_BG = '#181c1b';

export function G11S1Slide04PodcastRef() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch overflow-hidden">
      {/* Left VDRC green accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-2 z-30" style={{ background: VDRC_GREEN }} />

      {/* ── RIGHT PANEL — full orange illustration ── */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[45%] z-0">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={podcastIllustration}
            alt="Podcast — Nación Emprendedora"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Left edge hard fade to dark bg */}
        <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${DARK_BG} 0%, ${DARK_BG}00 100%)` }} />
        {/* Top orange stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-20" style={{ background: PODCAST_ORANGE }} />
      </div>

      {/* ── CENTER DIVIDER — big vertical orange block ── */}
      <motion.div
        {...m(0.05)}
        className="hidden sm:block absolute z-10"
        style={{
          left: '52%',
          top: '12%',
          width: '3px',
          height: '76%',
          background: `linear-gradient(180deg, transparent, ${PODCAST_ORANGE}, transparent)`,
        }}
      />

      {/* ── LEFT PANEL — content ── */}
      <div className="relative z-20 flex flex-col justify-center w-full sm:w-[55%] pl-14 pr-8 sm:pl-20 sm:pr-12 py-10">

        {/* Eyebrow tag */}
        <motion.div {...m(0)}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6"
            style={{
              background: PODCAST_ORANGE,
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
            }}
          >
            <span className="text-white font-black text-[10px] tracking-[0.25em] uppercase">
              Material de Referencia
            </span>
          </div>
        </motion.div>

        {/* Giant headline — Canva style: huge stacked type */}
        <motion.div {...m(0.08)}>
          <div className="leading-none mb-1">
            <span
              className="font-black uppercase tracking-tighter"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
                color: 'white',
                display: 'block',
              }}
            >
              Una conversación
            </span>
            <span
              className="font-black uppercase tracking-tighter"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
                color: PODCAST_ORANGE,
                display: 'block',
              }}
            >
              necesaria
            </span>
          </div>
          {/* Subtitle reversed block */}
          <div
            className="inline-block px-3 py-1 mt-3 mb-6"
            style={{ background: 'rgba(255,255,255,0.07)', borderLeft: `3px solid ${PODCAST_ORANGE}` }}
          >
            <span className="text-white/60 font-bold text-sm uppercase tracking-widest">
              sobre IA y transformación digital
            </span>
          </div>
        </motion.div>

        {/* Meta info — compact */}
        <motion.div {...m(0.15)} className="flex items-center gap-6 mb-7">
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-0.5">Podcast</p>
            <p className="text-white font-bold text-xs">Nación Emprendedora</p>
          </div>
          <div className="w-px h-8" style={{ background: `${PODCAST_ORANGE}50` }} />
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-0.5">Duración</p>
            <p className="text-white font-bold text-xs font-mono">53 min</p>
          </div>
          <div className="w-px h-8" style={{ background: `${PODCAST_ORANGE}50` }} />
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-0.5">Conductor</p>
            <p className="text-white font-bold text-xs">Vicente Donoso</p>
          </div>
        </motion.div>

        {/* Chapter list — clean grid */}
        <motion.div {...m(0.2)} className="mb-8">
          <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: VDRC_GREEN }}>
            ── Capítulos clave
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {CHAPTERS.map((ch, i) => (
              <motion.div
                key={ch.time}
                {...m(0.22 + i * 0.05)}
                className="flex items-center gap-3 group"
              >
                {/* Time badge */}
                <div
                  className="flex-shrink-0 px-2 py-0.5 font-mono font-black text-[10px]"
                  style={{
                    background: `${PODCAST_ORANGE}20`,
                    color: PODCAST_ORANGE,
                    border: `1px solid ${PODCAST_ORANGE}40`,
                  }}
                >
                  {ch.time}
                </div>
                <div className="h-px flex-1 max-w-3" style={{ background: `${PODCAST_ORANGE}30` }} />
                <span className="text-white/65 text-xs leading-tight flex-1">{ch.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA — full-bleed orange Canva-style button */}
        <motion.div {...m(0.6)}>
          <a
            href={PODCAST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 font-black text-white text-sm tracking-widest uppercase transition-all hover:brightness-110 hover:scale-[1.02] group"
            style={{
              background: PODCAST_ORANGE,
              boxShadow: `0 0 0 1px ${PODCAST_ORANGE}, 0 12px 40px ${PODCAST_ORANGE}60`,
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)',
            }}
          >
            <Play className="w-4 h-4 fill-white flex-shrink-0" />
            Ver en YouTube
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 flex-shrink-0" />
          </a>
        </motion.div>
      </div>
    </G11Shell>
  );
}

