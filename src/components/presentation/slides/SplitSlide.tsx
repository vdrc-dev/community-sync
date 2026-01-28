import { motion } from 'framer-motion';
import type { Slide } from '@/types/presentation';

interface SplitSlideProps {
  slide: Slide;
}

export function SplitSlide({ slide }: SplitSlideProps) {
  return (
    <div className="flex h-full">
      {/* Left: Content */}
      <div className="flex-1 flex flex-col justify-center px-12 py-10">
        {slide.title && (
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-primary"
          >
            {slide.title}
          </motion.h2>
        )}
        
        {slide.content && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/90 leading-relaxed whitespace-pre-wrap"
          >
            {slide.content}
          </motion.p>
        )}

        {slide.bullets && slide.bullets.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 space-y-3"
          >
            {slide.bullets.map((bullet, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 text-lg text-foreground/80"
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                {bullet}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Right: Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 relative overflow-hidden"
      >
        {slide.image ? (
          <img
            src={slide.image}
            alt={slide.title || 'Slide image'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Imagen</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
