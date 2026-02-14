import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { BookOpen, ShieldCheck, Play } from 'lucide-react';

const points = [
  { icon: BookOpen, label: 'Curaduría de fuentes:', desc: 'Procesa tus propios PDFs, grabaciones de reuniones y minutas de proyectos en un solo lugar para una síntesis de conocimiento real.' },
  { icon: ShieldCheck, label: 'Cero alucinaciones:', desc: 'Al limitarse a tus documentos cargados, la IA entrega respuestas basadas solo en hechos verificables de tu propia "pega".' },
  { icon: Play, label: 'En acción:', desc: 'Genera resúmenes ejecutivos, guías de estudio y "Audio Overviews" automáticos para dominar temas complejos en tiempo récord.' },
];

export function Slide14NotebookLM() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 40% 50%, hsl(270 40% 10% / 0.4), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-purple-400/60 uppercase mb-2">MÓDULO 03 | LA SUITE CLAUDE</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-4">
          <EditableText defaultValue="Síntesis Inteligente: NotebookLM" tag="span" />
        </motion.h1>
        <motion.p {...m(0.1)} className="text-lg text-white/60 max-w-3xl mb-10">
          <EditableText defaultValue='NotebookLM permite centralizar tus archivos dispersos para crear una base de conocimiento privada que elimina el "chamullo" de la IA.' tag="span" />
        </motion.p>

        <div className="flex-1 flex flex-col justify-center gap-6">
          {points.map((p, i) => (
            <motion.div key={i} {...m(0.2 + i * 0.15)} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-xl text-purple-200 font-semibold"><EditableText defaultValue={p.label} tag="span" /></p>
                <p className="text-white/60 text-lg mt-1"><EditableText defaultValue={p.desc} tag="span" /></p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-white/30 mt-4">Fuente: Google, NotebookLM 2025-2026</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">LA SUITE CLAUDE</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '14 / 23'}</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
