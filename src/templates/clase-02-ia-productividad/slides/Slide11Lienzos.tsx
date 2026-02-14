import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { PenTool, RefreshCw } from 'lucide-react';

export function Slide11Lienzos() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 40%, hsl(170 40% 8% / 0.4), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-teal-400/60 uppercase mb-2">MÓDULO 02 | ORQUESTADOR</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-4">
          <EditableText defaultValue="Lienzos Digitales" tag="span" />
        </motion.h1>
        <motion.p {...m(0.1)} className="text-lg text-white/60 max-w-3xl mb-12">
          <EditableText defaultValue="Olvida el chat de ida y vuelta; ahora trabajamos con la IA sobre un lienzo compartido en tiempo real." tag="span" />
        </motion.p>

        <div className="flex-1 flex items-center gap-8">
          <motion.div {...m(0.2)} className="flex-1 rounded-2xl bg-teal-500/10 border border-teal-500/20 p-8">
            <PenTool className="w-10 h-10 text-teal-400 mb-4" />
            <p className="text-xl text-teal-200 font-semibold mb-3"><EditableText defaultValue="Co-creación" tag="span" /></p>
            <p className="text-white/60 text-lg">
              <EditableText defaultValue="Espacios como Canvas o Artifacts donde editas el informe o el código junto a la IA, en vivo." tag="span" />
            </p>
          </motion.div>
          <motion.div {...m(0.3)} className="flex-1 rounded-2xl bg-teal-500/10 border border-teal-500/20 p-8">
            <RefreshCw className="w-10 h-10 text-teal-400 mb-4" />
            <p className="text-xl text-teal-200 font-semibold mb-3"><EditableText defaultValue="Iteración" tag="span" /></p>
            <p className="text-white/60 text-lg">
              <EditableText defaultValue='No más "escríbelo de nuevo". Marcas el párrafo y lo corriges ahí mismo.' tag="span" />
            </p>
          </motion.div>
        </div>

        <motion.div {...m(0.5)} className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-white/70 italic text-lg">
            <EditableText defaultValue='Del chat de ida y vuelta al workspace compartido: la IA ya no "responde", co-crea contigo.' tag="span" />
          </p>
        </motion.div>

        <p className="text-sm text-white/30 mt-4">Fuente: OpenAI Canvas, Anthropic Artifacts, 2025-2026</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">ORQUESTADOR</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '11 / 23'}</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
