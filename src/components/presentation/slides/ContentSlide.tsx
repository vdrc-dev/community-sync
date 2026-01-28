import { motion } from 'framer-motion';
import type { Slide } from '@/types/presentation';

interface ContentSlideProps {
  slide: Slide;
}

export function ContentSlide({ slide }: ContentSlideProps) {
  return (
    <div className="flex flex-col h-full px-12 py-10">
      {slide.title && (
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-primary"
        >
          {slide.title}
        </motion.h2>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 overflow-auto"
      >
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {slide.content}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
