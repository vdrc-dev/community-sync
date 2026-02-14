import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { Image, Eye, Palette, Sparkles } from 'lucide-react';

const features = [
  { icon: Image, label: 'NB Flash (Gemini 3):', desc: 'Edición fotográfica automatizada que jubila a Lightroom; ajusta luces, colores y composición detectando la intención de la toma en milisegundos.' },
  { icon: Sparkles, label: 'NB Pro (Gemini 3 Ultra):', desc: 'Renderizado fotorrealista desde cero que mantiene el contexto visual y tipográfico de tu empresa.' },
  { icon: Eye, label: 'Razonamiento espacial:', desc: 'Entiende profundidad e iluminación física para montajes que no parecen "pegados".' },
  { icon: Palette, label: 'Consistencia de marca:', desc: '"Aprende" tu manual de marca y aplica automáticamente tipografías y paletas en cada render nuevo.' },
];

export function Slide15NanoBanana() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: d, duration: 0.4 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 50%, hsl(270 40% 10% / 0.4), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } })} className="text-sm tracking-wider text-purple-400/60 uppercase mb-2">MÓDULO 03 | LA SUITE CLAUDE</motion.p>
        <motion.h1 {...(isExporting ? {} : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } })} className="text-5xl font-serif text-white mb-4">
          <EditableText defaultValue="Diseño y Renders: Nano Banana" tag="span" />
        </motion.h1>
        <motion.p {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.1 } })} className="text-lg text-white/60 max-w-3xl mb-10">
          <EditableText defaultValue="La integración de los nuevos modelos Gemini 2026 permite una edición visual con razonamiento espacial y consistencia de marca absoluta." tag="span" />
        </motion.p>

        <div className="flex-1 flex flex-col justify-center gap-5">
          {features.map((f, i) => (
            <motion.div key={i} {...m(0.2 + i * 0.1)} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-lg text-purple-200 font-semibold"><EditableText defaultValue={f.label} tag="span" /></p>
                <p className="text-white/60 mt-1"><EditableText defaultValue={f.desc} tag="span" /></p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-white/30 mt-4">Fuente: Nano Banana, Gemini 3 Integration 2026</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">LA SUITE CLAUDE</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '15 / 23'}</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
