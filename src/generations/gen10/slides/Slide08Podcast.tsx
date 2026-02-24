import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Youtube, Mic } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, PodcastInfo } from '@/hooks/useSlideContent';
import { S1Shell, useS1Motion } from './shared';
import { S1_ACCENT } from './theme';

// Default fallback data
const DEFAULT_PODCAST_INFO: PodcastInfo = {
  videoId: 'X-gsNORRJa8',
  title: 'IA y Transformación Digital con Vicente Donoso',
  description: 'Una conversación necesaria sobre IA y transformación digital',
  ctaText: 'Ver en YouTube',
};

export function Slide08Podcast() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(8);
  const m = useS1Motion();

  const podcastInfo = content.podcastInfo || DEFAULT_PODCAST_INFO;

  return (
    <S1Shell
      footerLabel="MATERIAL COMPLEMENTARIO"
      className="flex flex-col"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_hsl(160_65%_45%_/_0.15),_transparent_70%)]" />
      </>}
    >
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-8 py-8">
        <motion.div {...m(0.1)} className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border mb-4"
            style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border }}>
            <Mic className="w-5 h-5" style={{ color: S1_ACCENT.emerald.text }} />
            <span className="font-bold uppercase tracking-wider" style={{ color: S1_ACCENT.emerald.text }}>Material Complementario</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
            {podcastInfo.description.split(' sobre ')[0]} sobre <span style={{ color: S1_ACCENT.emerald.text }}>{podcastInfo.description.split(' sobre ')[1]}</span>
          </h1>
          <p className="text-lg text-white/60">con Vicente Donoso</p>
        </motion.div>

        <motion.div {...m(0.2)} className="flex-1 flex items-center justify-center">
          <div className="relative max-w-4xl w-full">
            <div className="absolute -inset-2 blur-xl rounded-3xl" style={{ background: S1_ACCENT.emerald.glow }} />
            <div className="relative p-[3px] rounded-2xl" style={{ background: `linear-gradient(135deg, ${S1_ACCENT.emerald.dot}, ${S1_ACCENT.cyan.dot})` }}>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#030303]">
                <iframe src={`https://www.youtube.com/embed/${podcastInfo.videoId}?rel=0&modestbranding=1`} title={podcastInfo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...m(0.4)} className="mt-4 sm:mt-6 flex justify-center">
          <a href={`https://www.youtube.com/watch?v=${podcastInfo.videoId}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl border transition-colors"
            style={{ background: S1_ACCENT.emerald.bg, borderColor: S1_ACCENT.emerald.border, color: S1_ACCENT.emerald.text }}>
            <Youtube className="w-5 h-5" />
            <span className="font-medium">{podcastInfo.ctaText}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </S1Shell>
  );
}
