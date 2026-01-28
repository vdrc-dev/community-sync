import { motion, AnimatePresence } from 'framer-motion';
import type { Slide } from '@/types/presentation';
import { TitleSlide } from './slides/TitleSlide';
import { ContentSlide } from './slides/ContentSlide';
import { BulletsSlide } from './slides/BulletsSlide';
import { SplitSlide } from './slides/SplitSlide';
import { ImageSlide } from './slides/ImageSlide';
import { CodeSlide } from './slides/CodeSlide';

interface SlideRendererProps {
  slide: Slide;
  direction?: number; // -1 for prev, 1 for next
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};

export function SlideRenderer({ slide, direction = 1 }: SlideRendererProps) {
  const renderSlideContent = () => {
    switch (slide.type) {
      case 'title':
        return <TitleSlide slide={slide} />;
      case 'content':
        return <ContentSlide slide={slide} />;
      case 'bullets':
        return <BulletsSlide slide={slide} />;
      case 'split':
        return <SplitSlide slide={slide} />;
      case 'image':
        return <ImageSlide slide={slide} />;
      case 'code':
        return <CodeSlide slide={slide} />;
      default:
        return <ContentSlide slide={slide} />;
    }
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={slide.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="w-full h-full"
      >
        {renderSlideContent()}
      </motion.div>
    </AnimatePresence>
  );
}

// Mini version for thumbnails
interface SlideThumbnailProps {
  slide: Slide;
  isActive?: boolean;
  onClick?: () => void;
}

export function SlideThumbnail({ slide, isActive, onClick }: SlideThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-video rounded-lg overflow-hidden border-2 transition-all
        ${isActive 
          ? 'border-primary ring-2 ring-primary/30' 
          : 'border-border/50 hover:border-primary/50'
        }
      `}
    >
      <div className="w-full h-full bg-background p-2 flex flex-col items-center justify-center text-center scale-[0.25] origin-center">
        {slide.title && (
          <span className="text-xs font-medium text-foreground line-clamp-2">
            {slide.title}
          </span>
        )}
      </div>
      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
        <span className="text-xs font-medium text-muted-foreground capitalize">
          {slide.type}
        </span>
      </div>
    </button>
  );
}
