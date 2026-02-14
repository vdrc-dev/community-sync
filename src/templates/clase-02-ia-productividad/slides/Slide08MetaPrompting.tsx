import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { Lightbulb, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

const points = [
  { icon: Lightbulb, label: 'El concepto:', desc: 'Usar un modelo "senior" (como GPT-5.2) para que diseñe los planos de la pega que ejecutará el agente.' },
  { icon: ArrowRight, label: 'El flujo:', desc: 'Intención vaga → Meta-Prompt → Instrucción C.R.O.P. → Resultado impecable.' },
  { icon: Sparkles, label: 'Ventaja:', desc: 'Se acabó la hoja en blanco. La IA arma la pauta y tú solo la validas.' },
  { icon: CheckCircle, label: 'En simple:', desc: 'Puedes partir con: "Haz un prompt de alta calidad sobre lo siguiente: [tu idea]"' },
];

export function Slide08MetaPrompting() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: d, duration: 0.4 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 40%, hsl(35 50% 8% / 0.5), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } })} className="text-sm tracking-wider text-amber-400/60 uppercase mb-2">MÓDULO 01 | FUNDAMENTOS</motion.p>
        <motion.h1 {...(isExporting ? {} : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } })} className="text-5xl font-serif text-white mb-4">
          <EditableText defaultValue="Meta-Prompting" tag="span" />
        </motion.h1>
        <motion.p {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.1 } })} className="text-lg text-white/60 max-w-3xl mb-10">
          <EditableText defaultValue="La forma más eficiente de trabajar es pedirle a la IA que ella misma redacte la pauta de trabajo." tag="span" />
        </motion.p>

        <div className="flex-1 flex flex-col justify-center gap-6">
          {points.map((p, i) => (
            <motion.div key={i} {...m(0.2 + i * 0.12)} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-xl text-amber-200 font-semibold"><EditableText defaultValue={p.label} tag="span" /></p>
                <p className="text-white/60 text-lg mt-1"><EditableText defaultValue={p.desc} tag="span" /></p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-white/30 mt-4">Fuente: Técnicas avanzadas de Prompt Engineering, 2026</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">FUNDAMENTOS</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '8 / 23'}</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
