import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { Brain, AlertTriangle, Database } from 'lucide-react';

const cards = [
  { icon: Brain, title: 'QUÉ ES', desc: 'La "memoria de corto plazo" de la IA.', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { icon: AlertTriangle, title: 'RIESGO', desc: 'Si saturas la ventana, los datos antiguos se "caen" y la IA empieza a chamullar.', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { icon: Database, title: '1M TOKENS 2026', desc: 'De leer un PDF corto a procesar la biblioteca completa de la empresa.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
];

export function Slide06VentanaContexto() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 40% 50%, hsl(200 40% 8% / 0.5), transparent 70%)' }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-amber-400/60 uppercase mb-2">MÓDULO 01 | FUNDAMENTOS</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-10">
          <EditableText defaultValue="Ventana de Contexto" tag="span" />
        </motion.h1>

        <div className="flex-1 flex items-center gap-8">
          {cards.map((c, i) => (
            <motion.div key={i} {...m(0.2 + i * 0.15)} className={`flex-1 rounded-2xl ${c.bg} border ${c.border} p-8 h-full flex flex-col`}>
              <c.icon className={`w-10 h-10 ${c.color} mb-4`} />
              <p className={`text-lg font-bold tracking-wider ${c.color} mb-3`}>{c.title}</p>
              <p className="text-white/70 text-lg flex-1"><EditableText defaultValue={c.desc} tag="span" /></p>
            </motion.div>
          ))}
        </div>

        <motion.div {...m(0.6)} className="mt-8 text-center">
          <p className="text-xl text-white/80">
            → <EditableText defaultValue="Si no administras la ventana, la IA se pone a inventar. Así de simple." tag="span" />
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(35 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">FUNDAMENTOS</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">6 / 23</span>
        </div>
      </div>
    </div>
  );
}
