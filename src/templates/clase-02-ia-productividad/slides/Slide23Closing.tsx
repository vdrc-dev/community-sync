import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';

export function Slide23Closing() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.6 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsl(35 50% 8% / 0.5), transparent 70%)' }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-16 text-center">
        <motion.h1 {...m(0.1)} className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">
          <EditableText defaultValue="Deja de chatear." tag="span" />
          <br />
          <span className="text-amber-300 italic">
            <EditableText defaultValue="Ponte a dirigir la pega." tag="span" />
          </span>
        </motion.h1>

        <motion.p {...m(0.3)} className="text-xl text-white/50 max-w-2xl">
          <EditableText defaultValue="El futuro es de quienes diseñan los sistemas, no de quienes ejecutan las tareas a mano." tag="span" />
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(35 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">PRODUCTIVIDAD AGÉNTICA</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">23 / 23</span>
        </div>
      </div>
    </div>
  );
}
