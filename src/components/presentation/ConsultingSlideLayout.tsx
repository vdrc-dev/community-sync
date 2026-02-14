import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGeneration } from '@/contexts/GenerationContext';
import { useExportContext } from '@/contexts/ExportContext';
import logoVdrc from '@/assets/logo-vdrc.png';

interface ConsultingSlideLayoutProps {
  children: ReactNode;
  slideNumber: number;
  sectionNumber: number;
  sectionTitle: string;
  title: string;
  storyline: string;
  className?: string;
}

const premiumEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: premiumEase,
      staggerChildren: 0.03,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { 
      duration: 0.2,
      ease: premiumEase,
    },
  },
};

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
};

export const ConsultingSlideLayout = forwardRef<HTMLDivElement, ConsultingSlideLayoutProps>(
  function ConsultingSlideLayout({
    children,
    slideNumber,
    sectionNumber,
    sectionTitle,
    title,
    storyline,
    className,
  }, ref) {
  const { config, currentWeek, generationNumber } = useGeneration();
  const { isExporting } = useExportContext();

  const motionProps = isExporting
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden',
        animate: 'visible',
        exit: 'exit',
      };

  const itemMotionProps = isExporting ? {} : { variants: itemVariants };

  // URL for export footer
  const presentationUrl = `vdrc.lovable.app/gen${generationNumber}s${currentWeek}`;

  return (
    <motion.div
      ref={ref}
      className={cn(
        'slide-16-9 w-full flex flex-col bg-background relative overflow-hidden',
        className
      )}
      {...motionProps}
    >
      {/* Subtle background gradient - visible in export */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isExporting 
            ? 'linear-gradient(180deg, hsl(222 20% 5%) 0%, hsl(222 20% 3%) 100%)'
            : 'radial-gradient(ellipse 100% 70% at 50% -25%, hsl(160 84% 42% / 0.08) 0%, transparent 55%), linear-gradient(180deg, hsl(222 20% 4%) 0%, hsl(222 20% 2.5%) 100%)',
        }}
      />
      
      {/* Ambient orbs - hidden during export */}
      {!isExporting && (
        <>
          <div className="absolute top-0 right-0 w-[500px] h-[350px] ambient-orb ambient-orb-primary" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[250px] ambient-orb ambient-orb-accent" />
        </>
      )}

      {/* Header - Clean & Professional */}
      <motion.header 
        className="relative z-10 px-6 md:px-10 lg:px-14 pt-5 md:pt-6 pb-3"
        {...itemMotionProps}
      >
        <div className="max-w-[1600px] mx-auto">
          {/* Top row: Logo + Section Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img 
                src={logoVdrc} 
                alt="VDRC" 
                className="h-10 md:h-12 w-auto opacity-90"
              />
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <span className="text-sm font-semibold text-muted-foreground/50 tracking-wider hidden sm:block">
                GEN {String(generationNumber).padStart(2, '0')} • SEMANA {currentWeek}
              </span>
            </div>
            
            <span 
              className="px-4 py-2 rounded-lg text-sm font-bold tracking-wide"
              style={{
                background: 'hsl(222 15% 8%)',
                border: '1px solid hsl(0 0% 100% / 0.08)',
                color: 'hsl(0 0% 70%)',
              }}
            >
              {sectionTitle.toUpperCase()}
            </span>
          </div>
          
          {/* Title + Storyline */}
          <div className="flex items-start gap-5">
            <div 
              className="w-1.5 min-h-[64px] md:min-h-[80px] rounded-full shrink-0"
              style={{
                backgroundColor: '#10B981',
                boxShadow: '0 0 20px hsl(160 84% 42% / 0.4)',
              }}
            />
            
            <div className="flex-1 min-w-0">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
                style={{ 
                  color: '#fafafa',
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h1>
              <p 
                className="text-lg md:text-xl mt-3 font-semibold leading-relaxed line-clamp-2"
                style={{ color: '#10B981' }}
              >
                {storyline}
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Divider */}
      <div className="px-6 md:px-10 lg:px-14">
        <div className="max-w-[1600px] mx-auto">
          <div 
            className="h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.08) 20%, hsl(0 0% 100% / 0.08) 80%, transparent 100%)'
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.main 
        className="relative z-10 flex-1 px-6 md:px-10 lg:px-14 pt-3 pb-2 overflow-hidden"
        {...itemMotionProps}
      >
        <div className="max-w-[1600px] mx-auto w-full h-full">
          {children}
        </div>
      </motion.main>

      {/* Footer - Minimal & Clean */}
      <motion.footer 
        className="relative z-10 px-6 md:px-10 lg:px-14 py-3 border-t border-white/5"
        {...itemMotionProps}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* URL visible only during export */}
          {isExporting ? (
            <span 
              className="text-sm font-mono font-medium"
              style={{ color: '#10B981' }}
            >
              {presentationUrl}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground/40 tracking-wide truncate max-w-[200px]">
              {config.name}
            </span>
          )}
          
          <span className="text-base font-bold text-muted-foreground/50 tabular-nums">
            {slideNumber} / 12
          </span>
        </div>
      </motion.footer>
    </motion.div>
  );
});
