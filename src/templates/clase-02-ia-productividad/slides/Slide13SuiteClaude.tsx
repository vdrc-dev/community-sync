import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { Terminal, FileSpreadsheet, Presentation } from 'lucide-react';

const tools = [
  { num: '01', icon: Terminal, title: 'Claude Code', desc: 'Asistente y editor de código autónomo. Entiende la arquitectura completa del proyecto, no solo fragmentos.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { num: '02', icon: FileSpreadsheet, title: 'Claude in Excel', desc: 'Análisis de datos avanzados integrados en la hoja de cálculo. Insights y visualizaciones brutalmente efectivas.', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { num: '03', icon: Presentation, title: 'Claude in PPT', desc: 'Ingesta de reportes densos, salida de slides estructuradas con jerarquía visual. Reducción drástica del formato mecánico.', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
];

export function Slide13SuiteClaude() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(270 40% 10% / 0.4), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-purple-400/60 uppercase mb-2">MÓDULO 03 | LA SUITE CLAUDE</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-10">
          <EditableText defaultValue="Tres Herramientas, Un Ecosistema" tag="span" />
        </motion.h1>

        <div className="flex-1 grid grid-cols-3 gap-6">
          {tools.map((t, i) => (
            <motion.div key={t.num} {...m(0.2 + i * 0.15)} className={`rounded-2xl ${t.bg} border ${t.border} p-8 flex flex-col`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-black text-white/20">{t.num}</span>
                <t.icon className={`w-8 h-8 ${t.color}`} />
              </div>
              <p className="text-xl text-white font-semibold mb-3"><EditableText defaultValue={t.title} tag="span" /></p>
              <p className="text-white/60 flex-1"><EditableText defaultValue={t.desc} tag="span" /></p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">LA SUITE CLAUDE</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '13 / 23'}</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
