import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggeredListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

const container = {
  hidden: { opacity: 0 },
  show: (custom: { staggerDelay: number; initialDelay: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.initialDelay,
    },
  }),
};

export function StaggeredList({
  children,
  className,
  staggerDelay = 0.06,
  initialDelay = 0.1,
}: StaggeredListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      custom={{ staggerDelay, initialDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(2px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: [0.2, 0, 0, 1],
    },
  },
};

export function StaggeredItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
