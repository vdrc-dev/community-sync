import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { ArrowLeft } from 'lucide-react';

export function Slide12Mod03Divider() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a] font-sans selection:bg-violet-500/30">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsl(270 40% 10% / 0.5), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-16">
        <motion.span {...m(0)} className="text-sm font-bold tracking-[0.4em] text-purple-400/60 uppercase mb-6">
          03 /// MÓDULO 03
        </motion.span>
        <motion.h1 {...m(0.1)} className="text-6xl md:text-7xl font-serif text-white text-center mb-6">
          <EditableText defaultValue="La Suite Claude en Acción." tag="span" />
        </motion.h1>
        <motion.p {...m(0.2)} className="text-xl text-white/50 text-center max-w-2xl">
          <EditableText defaultValue="Claude Code, Claude in Excel y Claude in PowerPoint en acción directa." tag="span" />
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('goToSlide', { detail: { slide: 2 } }))}
            className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-white/40 uppercase hover:text-white/70 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            Agenda
          </button>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '12 / 23'}</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
