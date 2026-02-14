import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { User, Crown } from 'lucide-react';

export function Slide22Director() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(35 50% 8% / 0.4), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(263 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...m(0)} className="text-sm tracking-wider text-rose-400/60 uppercase mb-2">MÓDULO 05 | AGENTES</motion.p>
        <motion.h1 {...m(0.05)} className="text-5xl font-serif text-white mb-4">
          <EditableText defaultValue="De Orquestador a Director" tag="span" />
        </motion.h1>
        <motion.p {...m(0.1)} className="text-lg text-white/60 max-w-3xl mb-8">
          <EditableText defaultValue='El que gana en 2026 no es el que más sabe de IA, sino el que mejor diseña los sistemas para que la pega salga sola.' tag="span" />
        </motion.p>

        <div className="flex-1 grid grid-cols-2 gap-8">
          {/* Etapa 1 */}
          <motion.div {...m(0.2)} className="rounded-2xl bg-slate-800/30 border border-slate-600/30 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-8 h-8 text-slate-400" />
              <span className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">ETAPA 1: EL USUARIO DE IA</span>
            </div>
            <ul className="space-y-3 flex-1">
              <li className="text-white/50">• <EditableText defaultValue="Ayuda con correos, tareas simples" tag="span" /></li>
              <li className="text-white/50">• <EditableText defaultValue="Reactivo, herramienta única, alcance limitado" tag="span" /></li>
            </ul>
          </motion.div>

          {/* Etapa 2 */}
          <motion.div {...m(0.3)} className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-amber-400" />
              <span className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">ETAPA 2: EL ORQUESTADOR DE IA</span>
            </div>
            <ul className="space-y-3 flex-1">
              <li className="text-white/70">• <EditableText defaultValue="Estratégico, multi-herramienta" tag="span" /></li>
              <li className="text-white/70">• <EditableText defaultValue="Flujos de trabajo complejos, automatización" tag="span" /></li>
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {['Claude Code', 'Manus AI', 'NotebookLM'].map(t => (
                <span key={t} className="text-xs text-center text-amber-300/80 bg-amber-500/10 rounded-lg py-1.5 border border-amber-500/20">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...m(0.5)} className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-lg text-amber-200 font-semibold"><EditableText defaultValue="Meta final:" tag="span" /></p>
          </div>
          <p className="text-white/60">
            <EditableText defaultValue='De "hacer la pega" a "asegurar que el sistema haga la pega correcta."' tag="span" />
          </p>
        </motion.div>

        <motion.p {...m(0.6)} className="mt-4 text-center text-xl text-amber-300 font-semibold tracking-wider">
          <EditableText defaultValue="DOMINA LAS HERRAMIENTAS. SÉ EL DIRECTOR." tag="span" />
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">AGENTES</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '22 / 23'}</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
