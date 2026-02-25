import { motion } from 'framer-motion';
import { Code2, Terminal, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const TOOLS_COMPARE = [
  {
    name: 'Cursor',
    role: 'El Editor Visual con IA',
    icon: Code2,
    color: 'hsl(185 70% 50%)',
    hue: 185,
    percent: 20,
    tag: 'IDE + IA',
    features: [
      'Precisión quirúrgica a nivel de línea',
      'Multi-archivo en contexto simultáneo',
      'Ve toda la estructura de tu app',
      'Tab autocompletion inteligente',
    ],
    quote: 'Es el bisturí. Entra al código que Lovable generó y cambia exactamente lo que necesitas.',
    useWhen: 'Cuando Lovable no logra el cambio específico que necesitas',
  },
  {
    name: 'Claude Code',
    role: 'El Agente Autónomo de Terminal',
    icon: Terminal,
    color: 'hsl(280 70% 60%)',
    hue: 280,
    percent: 5,
    tag: 'Agente',
    features: [
      'Ejecuta comandos del sistema',
      'Instala paquetes, mueve archivos, prueba',
      'Autonomía total: él opera la máquina',
      'Contexto de proyecto masivo (200K tokens)',
    ],
    quote: 'Es un empleado al que le das órdenes por chat y él opera la línea de comandos por ti.',
    useWhen: 'Para refactoring masivo, migración de código, o tareas de DevOps',
  },
];

export function S4Slide10CursorClaude() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_30%_-15%,_hsl(185_60%_40%_/_0.1),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_90%,_hsl(280_60%_40%_/_0.08),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(185 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
        <div className="absolute top-[5%] right-[2%] text-[16vw] font-black text-white/[0.022] leading-none select-none pointer-events-none tracking-tighter">20%</div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-cyan-500" style={{ boxShadow: '0 0 12px hsl(185 70% 50% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/30">Stack · Nivel Avanzado</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Cursor + Claude Code</h1>
            </div>
          </div>
          <p className="text-cyan-400/60 text-sm ml-5 pl-1 font-medium">El bisturí para el último 20%. Para cuando Lovable no alcanza la precisión que necesitas.</p>
        </motion.div>

        {/* 80/20 visual rule */}
        <motion.div {...m(0.1)} className="flex items-center gap-4 mb-7 max-w-3xl">
          <div className="flex-1 h-8 rounded-xl overflow-hidden flex">
            <div className="flex items-center justify-center gap-2 bg-rose-500/15 border border-rose-500/20" style={{ width: '80%' }}>
              <span className="text-sm font-black text-rose-400">80%</span>
              <span className="text-xs text-rose-400/70">Lovable</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-cyan-500/15 border border-cyan-500/20" style={{ width: '20%' }}>
              <span className="text-sm font-black text-cyan-400">20%</span>
            </div>
          </div>
          <div className="text-xs text-white/25 font-medium italic">La Regla de Oro</div>
        </motion.div>

        {/* Side-by-side */}
        <div className="grid grid-cols-2 gap-5">
          {TOOLS_COMPARE.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.name} {...m(0.2 + i * 0.1)}
                className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.025] overflow-hidden hover:border-white/[0.1] transition-all duration-300">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${tool.color.replace(')', ' / 0.6)')}, transparent)` }} />
                {/* Background % */}
                <div className="absolute bottom-3 right-4 text-[80px] font-black leading-none select-none pointer-events-none" style={{ color: `hsl(${tool.hue} 50% 50% / 0.035)` }}>{tool.percent}%</div>

                {/* Tool header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-13 h-13 rounded-2xl flex items-center justify-center" style={{ background: `hsl(${tool.hue} 60% 45% / 0.14)`, border: `1px solid hsl(${tool.hue} 60% 50% / 0.3)`, boxShadow: `0 0 25px hsl(${tool.hue} 60% 50% / 0.12)`, width: '52px', height: '52px' }}>
                    <Icon className="w-6 h-6" style={{ color: tool.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-black text-white">{tool.name}</p>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md" style={{ background: `hsl(${tool.hue} 60% 45% / 0.12)`, color: tool.color, border: `1px solid hsl(${tool.hue} 60% 50% / 0.2)` }}>{tool.tag}</span>
                    </div>
                    <p className="text-xs font-medium mt-0.5" style={{ color: `hsl(${tool.hue} 55% 65% / 0.7)` }}>{tool.role}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-5">
                  {tool.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tool.color }} />
                      <span className="text-xs text-white/50 font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="p-3.5 rounded-xl border border-white/[0.05] bg-black/30 mb-4">
                  <p className="text-[11px] text-white/35 italic leading-relaxed">"{tool.quote}"</p>
                </div>

                {/* When to use */}
                <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: `hsl(${tool.hue} 60% 45% / 0.06)`, border: `1px solid hsl(${tool.hue} 60% 50% / 0.15)` }}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: tool.color }} />
                  <p className="text-[10px] leading-relaxed" style={{ color: `hsl(${tool.hue} 55% 65% / 0.7)` }}>
                    <span className="font-black">Úsalo cuando: </span>{tool.useWhen}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Golden rule */}
        <motion.div {...m(0.55)} className="mt-5 p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex items-center gap-4 max-w-4xl mx-auto">
          <Wrench className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs text-white/50 leading-relaxed">
            <span className="text-amber-400/90 font-black">Regla de Oro: </span>
            "Empieza SIEMPRE con Lovable. Solo baja al código (Cursor/Claude Code) para cerrar ese último 20% de precisión." — Vicente Donoso R.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(185 50% 55% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Stack</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/50">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
