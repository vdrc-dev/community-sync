import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  className?: string;
  message?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  fullScreen = false,
  className,
  message,
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: { ring: 'w-5 h-5', dot: 'w-1 h-1' },
    md: { ring: 'w-10 h-10', dot: 'w-1.5 h-1.5' },
    lg: { ring: 'w-14 h-14', dot: 'w-2 h-2' },
    xl: { ring: 'w-20 h-20', dot: 'w-2.5 h-2.5' },
  };

  const s = sizeMap[size];

  const spinner = (
    <div className={cn("relative", s.ring, className)}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      {/* Spinning arc */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {/* Glow pulse */}
      <motion.div
        className="absolute inset-1 rounded-full bg-primary/5"
        animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Center dot */}
      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary", s.dot)} />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex flex-col items-center gap-6"
        >
          {/* Logo mark */}
          <motion.div
            className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-primary font-bold text-lg font-mono">V</span>
          </motion.div>

          {spinner}

          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-mono text-primary/80 tracking-wider">
              {message || 'Preparando tu espacio'}
            </p>
            <motion.div
              className="w-32 h-[2px] rounded-full bg-primary/10 overflow-hidden"
            >
              <motion.div
                className="h-full bg-primary/50 rounded-full"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '40%' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return spinner;
}
