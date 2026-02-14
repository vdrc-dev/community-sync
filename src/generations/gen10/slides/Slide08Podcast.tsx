import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Youtube, Mic } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent, PodcastInfo } from '@/hooks/useSlideContent';

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

  // Use data from DB or fallback to defaults
  const podcastInfo = content.podcastInfo || DEFAULT_PODCAST_INFO;

  const getMotionProps = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5 },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden bg-[#0a1520] flex flex-col font-sans px-8 py-8 selection:bg-teal-500/30">
      
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(20,184,166,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <motion.div {...getMotionProps(0.1)} className="relative z-20 text-center mb-6">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-teal-500/10 border border-teal-500/30 rounded-full mb-4">
          <Mic className="w-5 h-5 text-teal-400" />
          <span className="text-teal-400 font-bold uppercase tracking-wider">Material Complementario</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          {podcastInfo.description.split(' sobre ')[0]} sobre <span className="text-teal-400">{podcastInfo.description.split(' sobre ')[1]}</span>
        </h1>
        <p className="text-lg text-white/60">
          con Vicente Donoso
        </p>
      </motion.div>

      {/* Video Embed */}
      <motion.div 
        {...getMotionProps(0.2)}
        className="flex-1 relative z-10 flex items-center justify-center"
      >
        <div className="relative max-w-4xl w-full">
          <div className="absolute -inset-2 bg-teal-500/20 blur-xl rounded-3xl" />
          <div className="relative p-[3px] rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.6), rgba(6,182,212,0.6))'
          }}>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0a1520]">
              <iframe
                src={`https://www.youtube.com/embed/${podcastInfo.videoId}?rel=0&modestbranding=1`}
                title={podcastInfo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Link */}
      <motion.div 
        {...getMotionProps(0.4)}
        className="relative z-20 mt-6 flex justify-center"
      >
        <a 
          href={`https://www.youtube.com/watch?v=${podcastInfo.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-400 hover:bg-teal-500/20 transition-colors"
        >
          <Youtube className="w-5 h-5" />
          <span className="font-medium">{podcastInfo.ctaText}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>

      <div className="absolute bottom-8 right-8 text-base font-bold text-gray-600 tabular-nums">
        8 / 29
      </div>
    </div>
  );
}
