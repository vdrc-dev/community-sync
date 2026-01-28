import { motion } from 'framer-motion';
import type { Slide } from '@/types/presentation';

interface ImageSlideProps {
  slide: Slide;
}

export function ImageSlide({ slide }: ImageSlideProps) {
  return (
    <div className="relative w-full h-full">
      {slide.image ? (
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={slide.image}
          alt={slide.title || 'Slide image'}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-muted-foreground text-xl">Sin imagen</span>
        </div>
      )}

      {/* Optional overlay title */}
      {slide.title && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-lg text-muted-foreground mt-2">{slide.subtitle}</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
