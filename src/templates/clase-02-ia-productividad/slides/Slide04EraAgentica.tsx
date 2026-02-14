import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { MessageSquare, Brain, Zap } from 'lucide-react';

const timeline = [
  { year: '2023', icon: MessageSquare, label: 'Chat', desc: 'El mundo conoce ChatGPT y se pone a jugar con prompts.', color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/30' },
  { year: '2025', icon: Brain, label: 'Razonamiento', desc: 'Modelos que piensan paso a paso y resuelven problemas de verdad.', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' },
  { year: '2026', icon: Zap, label: 'Agencia', desc: 'Se acabó la charla. Ahora la IA hace la pega por ti.', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
];

export function Slide04EraAgentica() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 40%, hsl(263 40% 10% / 0.5), transparent 70%)' }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-amber-400/60 uppercase mb-2">MÓDULO 01 | FUNDAMENTOS</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-4">
          <EditableText defaultValue="Era Agéntica" tag="span" />
        </motion.h1>
        <motion.p {...m(0.1)} className="text-lg text-white/60 max-w-3xl mb-10">
          <EditableText defaultValue='La IA pasó de ser una herramienta para "tirar textos" a un motor que ejecuta la pega por sí solo.' tag="span" />
        </motion.p>

        <div className="flex-1 flex items-center gap-8">
          {timeline.map((t, i) => (
            <motion.div key={t.year} {...m(0.2 + i * 0.15)} className={`flex-1 rounded-2xl ${t.bg} border ${t.border} p-8`}>
              <div className="flex items-center gap-3 mb-4">
                <t.icon className={`w-8 h-8 ${t.color}`} />
                <span className={`text-3xl font-bold ${t.color}`}>{t.year}</span>
              </div>
              <p className="text-xl text-white font-semibold mb-2">
                <EditableText defaultValue={t.label} tag="span" />
              </p>
              <p className="text-white/60">
                <EditableText defaultValue={t.desc} tag="span" />
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p {...m(0.7)} className="text-sm text-white/30 mt-6">Fuente: Gartner, Proyecciones IA Empresarial 2026</motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(35 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">FUNDAMENTOS</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">4 / 23</span>
        </div>
      </div>
    </div>
  );
}
