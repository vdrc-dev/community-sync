import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { Slide } from '@/types/presentation';

interface TitleSlideProps {
  slide: Slide;
}

export function TitleSlide({ slide }: TitleSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        {slide.title}
      </motion.h1>
      
      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl"
        >
          {slide.subtitle}
        </motion.p>
      )}
      
      {slide.tags && slide.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {slide.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="text-sm px-4 py-1"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>
      )}
    </div>
  );
}
