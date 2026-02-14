import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { Target, Globe, Coins } from 'lucide-react';

const models = [
  { icon: Target, code: 'GPT-5.2', title: 'Estrategia', tag: 'FRONTERA', desc: '100% en pruebas matemáticas AIME. Razonamiento complejo y planificación estratégica de alto nivel.', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { icon: Globe, code: 'PPX', title: 'Perplexity', tag: 'DATOS', desc: 'Acceso web en tiempo real con verificación de fuentes. Sustituye la búsqueda tradicional por síntesis verificada.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: Coins, code: 'DS 3.2', title: 'DeepSeek V3.2', tag: 'EFICIENCIA', desc: 'Calidad frontier al 10% del costo. Procesamiento masivo de datos con presupuesto bajo sin sacrificar calidad.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
];

export function Slide17Modelos() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(200 40% 8% / 0.4), transparent 70%)' }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-sky-400/60 uppercase mb-2">MÓDULO 04 | MODELOS</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-10">
          <EditableText defaultValue="Un Modelo para Cada Encargo" tag="span" />
        </motion.h1>

        <div className="flex-1 grid grid-cols-3 gap-6">
          {models.map((mod, i) => (
            <motion.div key={mod.code} {...m(0.2 + i * 0.15)} className={`rounded-2xl ${mod.bg} border ${mod.border} p-8 flex flex-col`}>
              <mod.icon className={`w-10 h-10 ${mod.color} mb-4`} />
              <span className={`text-xs font-bold tracking-[0.3em] ${mod.color} uppercase mb-2`}>{mod.tag}</span>
              <p className="text-2xl text-white font-bold mb-1"><EditableText defaultValue={mod.code} tag="span" /></p>
              <p className="text-white/50 text-sm mb-4">{mod.title}</p>
              <p className="text-white/60 flex-1"><EditableText defaultValue={mod.desc} tag="span" /></p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(35 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">MODELOS</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">17 / 23</span>
        </div>
      </div>
    </div>
  );
}
