import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { Brain, Eye, Database, Wrench } from 'lucide-react';

const parts = [
  { icon: Brain, label: 'Cerebro:', desc: 'Planifica y descompone el encargo en pasos concretos.', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { icon: Eye, label: 'Percepción:', desc: 'Ve la pantalla, lee archivos, navega la web. Cacha lo que pasa.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: Database, label: 'Memoria:', desc: 'Mantiene el hilo de la tarea y recuerda lo que ya hizo.', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { icon: Wrench, label: 'Herramientas:', desc: 'Las "manos" del agente: navegador, terminal, APIs.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
];

export function Slide19AnatomiaAgentica() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 40% 40%, hsl(340 40% 8% / 0.4), transparent 70%)' }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-rose-400/60 uppercase mb-2">MÓDULO 05 | AGENTES</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-4">
          <EditableText defaultValue="Anatomía Agéntica" tag="span" />
        </motion.h1>
        <motion.p {...m(0.1)} className="text-lg text-white/60 max-w-3xl mb-10">
          <EditableText defaultValue="Un agente no es un chatbot con esteroides. Es una entidad que planifica, actúa y verifica sola." tag="span" />
        </motion.p>

        <div className="flex-1 grid grid-cols-2 gap-6">
          {parts.map((p, i) => (
            <motion.div key={i} {...m(0.2 + i * 0.12)} className={`rounded-2xl ${p.bg} border ${p.border} p-6 flex items-start gap-4`}>
              <div className={`w-12 h-12 rounded-xl ${p.bg} border ${p.border} flex items-center justify-center flex-shrink-0`}>
                <p.icon className={`w-6 h-6 ${p.color}`} />
              </div>
              <div>
                <p className={`text-xl font-semibold ${p.color}`}><EditableText defaultValue={p.label} tag="span" /></p>
                <p className="text-white/60 text-lg mt-1"><EditableText defaultValue={p.desc} tag="span" /></p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...m(0.7)} className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs tracking-[0.3em] text-rose-400/60 uppercase mb-1">LA DIFERENCIA</p>
          <p className="text-lg text-white/80">
            <EditableText defaultValue="Un chatbot responde. Un agente planifica, ejecuta la pega y te entrega resultados listos." tag="span" />
          </p>
        </motion.div>

        <p className="text-sm text-white/30 mt-4">Fuente: Anthropic, Building Effective Agents 2025</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(35 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">AGENTES</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">19 / 23</span>
        </div>
      </div>
    </div>
  );
}
