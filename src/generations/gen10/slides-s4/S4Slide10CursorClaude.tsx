import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, FileCode, FolderOpen, Wrench, Percent } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const TOOLS_COMPARE = [
  {
    name: 'Cursor', role: 'El Editor', icon: Code2, color: 'hsl(185 70% 50%)',
    features: ['Precisión quirúrgica', 'Multi-archivo simultáneo', 'Contexto de toda tu app', 'Edición visual'],
    quote: 'Es el bisturí. Entra al código que Lovable generó y cambia algo específico.',
  },
  {
    name: 'Claude Code', role: 'El Agente Terminal', icon: Terminal, color: 'hsl(280 70% 60%)',
    features: ['Ejecuta comandos', 'Instala, mueve, prueba', 'Autonomía total', 'Contexto masivo'],
    quote: 'Es un empleado al que le das órdenes por chat y él opera la máquina por ti.',
  },
];

export function S4Slide10CursorClaude() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_30%_-20%,_hsl(185_60%_40%_/_0.1),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_90%,_hsl(280_60%_40%_/_0.08),_transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-cyan-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Stack · Nivel Avanzado</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Cursor + Claude Code</h1>
            </div>
          </div>
          <p className="text-cyan-400/60 text-sm ml-5 pl-1">El bisturí. Para cuando necesitas el 20% extra de precisión.</p>
        </motion.div>

        {/* 80/20 Rule */}
        <motion.div {...m(0.1)} className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-rose-500/15 bg-rose-500/[0.03]">
            <div className="text-3xl font-black text-rose-400">80%</div>
            <div>
              <p className="text-xs font-bold text-white">Lovable</p>
              <p className="text-[10px] text-white/30">Empieza siempre aquí</p>
            </div>
          </div>
          <Percent className="w-5 h-5 text-white/15" />
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03]">
            <div className="text-3xl font-black text-cyan-400">20%</div>
            <div>
              <p className="text-xs font-bold text-white">Cursor / Claude Code</p>
              <p className="text-[10px] text-white/30">Solo si es necesario</p>
            </div>
          </div>
        </motion.div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-2 gap-6">
          {TOOLS_COMPARE.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.name} {...m(0.2 + i * 0.1)}
                className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${tool.color.replace(')', ' / 0.1)')}`, border: `1px solid ${tool.color.replace(')', ' / 0.2)')}` }}>
                    <Icon className="w-5 h-5" style={{ color: tool.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{tool.name}</p>
                    <p className="text-xs text-white/30">{tool.role}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {tool.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-white/45">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: tool.color }} />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-white/[0.04] bg-black/20">
                  <p className="text-[11px] text-white/35 italic">"{tool.quote}"</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.5)} className="mt-5 p-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] flex items-center gap-4 max-w-3xl mx-auto">
          <Wrench className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs text-white/50">
            <span className="text-amber-400/80 font-bold">Regla de Oro:</span>{' '}
            "Empieza siempre con Lovable. Solo baja al código (Cursor) para cerrar ese último 20%." — Vicente Donoso R.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(185 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">STACK</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
