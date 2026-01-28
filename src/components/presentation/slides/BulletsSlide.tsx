import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { Slide } from '@/types/presentation';

interface BulletsSlideProps {
  slide: Slide;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const }
  },
};

export function BulletsSlide({ slide }: BulletsSlideProps) {
  return (
    <div className="flex flex-col h-full px-12 py-10">
      {slide.title && (
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-10 text-primary"
        >
          {slide.title}
        </motion.h2>
      )}
      
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 flex-1"
      >
        {slide.bullets?.map((bullet, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-4 text-xl md:text-2xl"
          >
            <CheckCircle2 className="h-7 w-7 text-primary mt-1 shrink-0" />
            <span className="text-foreground/90">{bullet}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
