import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tiltEnabled?: boolean;
  hoverScale?: number;
}

export function AnimatedCard({
  children,
  className,
  glowColor = 'rgba(34, 197, 94, 0.3)',
  tiltEnabled = true,
  hoverScale = 1.02,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tiltEnabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: tiltEnabled ? rotateY : 0,
        rotateX: tiltEnabled ? rotateX : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ 
        scale: hoverScale,
        boxShadow: `0 20px 40px ${glowColor}`,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'relative rounded-xl border bg-card/50 backdrop-blur-sm transition-colors',
        'hover:border-primary/30',
        className
      )}
    >
      {/* Gradient border glow on hover */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, transparent 50%)`,
        }}
        whileHover={{ opacity: 1 }}
      />
      
      <div className="relative" style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

// Simpler version without 3D tilt
export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ 
        y: -4,
        boxShadow: '0 10px 40px rgba(34, 197, 94, 0.15)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'rounded-xl border bg-card/50 backdrop-blur-sm transition-colors',
        'hover:border-primary/30',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Glowing button
export function GlowButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative px-6 py-3 rounded-lg font-semibold text-primary-foreground bg-primary overflow-hidden',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ opacity: 0.3 }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.5), inset 0 0 30px rgba(34, 197, 94, 0.1)',
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
