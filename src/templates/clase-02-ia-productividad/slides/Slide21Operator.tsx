import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { Shield, HandMetal } from 'lucide-react';

export function Slide21Operator() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(340 40% 8% / 0.4), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-rose-400/60 uppercase mb-2">MÓDULO 05 | AGENTES</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-4">
          <EditableText defaultValue="Supervisión: Operator" tag="span" />
        </motion.h1>

        <div className="flex-1 flex items-center justify-center">
          <motion.div {...m(0.2)} className="max-w-2xl w-full space-y-8">
            <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-8 text-center">
              <p className="text-2xl text-white/90 font-serif italic mb-4">
                <EditableText defaultValue="Autonomía sin supervisión es riesgo." tag="span" />
              </p>
              <p className="text-lg text-amber-300">
                <EditableText defaultValue="El humano siempre tiene que poder apretar el freno." tag="span" />
              </p>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                <HandMetal className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <p className="text-xl text-rose-200 font-semibold"><EditableText defaultValue="Función:" tag="span" /></p>
                <p className="text-white/60 text-lg mt-1">
                  <EditableText defaultValue='Navegación segura con "Takeover Mode" — tú tomas el control cuando quieras.' tag="span" />
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <p className="text-xl text-rose-200 font-semibold"><EditableText defaultValue="Seguridad:" tag="span" /></p>
                <p className="text-white/60 text-lg mt-1">
                  <EditableText defaultValue="Si el agente se desvía, le corriges el rumbo en tiempo real. Sin drama." tag="span" />
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="text-sm text-white/30 mt-4">Fuente: OpenAI Operator, 2025</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">AGENTES</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '21 / 23'}</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
