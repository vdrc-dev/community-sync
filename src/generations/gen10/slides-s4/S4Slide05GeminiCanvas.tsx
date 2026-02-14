import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette, Eye, AlertTriangle, ArrowRight, Type, Layers, MousePointer } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const PROMPTS = [
  {
    id: 'campus',
    label: 'Campus Kind',
    prompt: 'Crea un dashboard para gestión de colegios, colores naranjos, elegante...',
    preview: {
      bg: 'linear-gradient(135deg, hsl(25 80% 8%), hsl(20 60% 5%))',
      accent: 'hsl(25 90% 55%)',
      font: "'Georgia', serif",
      name: 'Campus Kind',
      cards: [
        { label: 'Colegios', value: '847', delta: '+12' },
        { label: 'Evaluaciones', value: '19,234', delta: '+342' },
        { label: 'Regiones', value: '16', delta: '' },
      ],
      nav: ['Dashboard', 'Colegios', 'Evaluaciones', 'Usuarios'],
    },
  },
  {
    id: 'crm',
    label: 'CRM Ventas',
    prompt: 'Necesito un CRM minimalista con pipeline visual y kanban board...',
    preview: {
      bg: 'linear-gradient(135deg, hsl(215 60% 8%), hsl(220 50% 5%))',
      accent: 'hsl(215 80% 60%)',
      font: "'Inter', sans-serif",
      name: 'SalesFlow CRM',
      cards: [
        { label: 'Deals Activos', value: '34', delta: '+5' },
        { label: 'Revenue', value: '$42K', delta: '+18%' },
        { label: 'Pipeline', value: '89%', delta: '' },
      ],
      nav: ['Pipeline', 'Contactos', 'Deals', 'Analytics'],
    },
  },
  {
    id: 'portfolio',
    label: 'Portafolio',
    prompt: 'Diseña un portafolio personal dark con animaciones suaves y gradientes...',
    preview: {
      bg: 'linear-gradient(135deg, hsl(280 40% 6%), hsl(260 30% 4%))',
      accent: 'hsl(280 70% 65%)',
      font: "'Playfair Display', serif",
      name: 'Mi Portafolio',
      cards: [
        { label: 'Proyectos', value: '12', delta: '' },
        { label: 'Tecnologías', value: '8', delta: '' },
        { label: 'Años', value: '3+', delta: '' },
      ],
      nav: ['Inicio', 'Proyectos', 'Skills', 'Contacto'],
    },
  },
];

export function S4Slide05GeminiCanvas() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PROMPTS[activeIdx];
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  // Auto-rotate in presentation mode
  useEffect(() => {
    if (isExporting) return;
    const timer = setInterval(() => setActiveIdx(p => (p + 1) % PROMPTS.length), 6000);
    return () => clearInterval(timer);
  }, [isExporting]);

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(38_80%_45%_/_0.12),_transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, hsl(38 80% 60%) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-amber-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Stack · Diseño</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Gemini Canvas: Diseña Gratis</h1>
            </div>
          </div>
          <p className="text-amber-400/60 text-sm ml-5 pl-1">Describe tu app → Canvas genera el diseño. Cambia el prompt, cambia el resultado.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-5">
          {/* Left: Prompt selector */}
          <div className="col-span-2 space-y-3">
            {PROMPTS.map((p, i) => (
              <motion.button key={p.id} {...m(0.1 + i * 0.08)} onClick={() => setActiveIdx(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${activeIdx === i ? 'bg-amber-500/[0.06] border-amber-500/20' : 'bg-white/[0.01] border-white/[0.04] opacity-50 hover:opacity-70'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400/80 uppercase tracking-wider">{p.label}</span>
                </div>
                <p className="text-[11px] text-white/40 font-mono leading-relaxed line-clamp-2">{p.prompt}</p>
              </motion.button>
            ))}

            {/* Warning */}
            <motion.div {...m(0.4)} className="p-3 rounded-xl border border-red-500/15 bg-red-500/[0.03] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-red-400/70">Datos vs. Visual</p>
                <p className="text-[10px] text-white/30 mt-0.5">Canvas "alucina" con matemáticas. Siempre audita el código.</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Live preview */}
          <motion.div {...m(0.2)} className="col-span-3 rounded-2xl border border-amber-500/15 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2" style={{ background: 'hsl(0 0% 6%)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              </div>
              <div className="flex-1 mx-6 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                <span className="text-[9px] text-white/20 font-mono">gemini.google.com/canvas</span>
              </div>
              <Eye className="w-3.5 h-3.5 text-white/15" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active.id}
                initial={isExporting ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-5" style={{ background: active.preview.bg }}>
                
                {/* Nav bar mockup */}
                <div className="flex items-center gap-4 mb-5 pb-3 border-b" style={{ borderColor: `${active.preview.accent}20` }}>
                  <span className="text-sm font-bold" style={{ color: active.preview.accent, fontFamily: active.preview.font }}>{active.preview.name}</span>
                  <div className="flex gap-3 ml-auto">
                    {active.preview.nav.map((item, i) => (
                      <span key={i} className={`text-[10px] ${i === 0 ? 'font-bold' : 'opacity-40'}`} style={{ color: i === 0 ? active.preview.accent : 'white' }}>{item}</span>
                    ))}
                  </div>
                </div>

                {/* Cards mockup */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {active.preview.cards.map((card, i) => (
                    <motion.div key={i}
                      initial={isExporting ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="p-3 rounded-lg border" style={{ borderColor: `${active.preview.accent}15`, background: `${active.preview.accent}08` }}>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider">{card.label}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-black text-white" style={{ fontFamily: active.preview.font }}>{card.value}</span>
                        {card.delta && <span className="text-[9px] font-bold" style={{ color: active.preview.accent }}>{card.delta}</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Table mockup */}
                <div className="rounded-lg border overflow-hidden" style={{ borderColor: `${active.preview.accent}10` }}>
                  <div className="grid grid-cols-4 gap-2 px-3 py-2 border-b" style={{ borderColor: `${active.preview.accent}08` }}>
                    {['Nombre', 'Estado', 'Fecha', 'Acción'].map(h => (
                      <span key={h} className="text-[8px] font-bold text-white/20 uppercase tracking-wider">{h}</span>
                    ))}
                  </div>
                  {[1, 2].map(r => (
                    <div key={r} className="grid grid-cols-4 gap-2 px-3 py-2 border-b" style={{ borderColor: `${active.preview.accent}05` }}>
                      <span className="text-[9px] text-white/35">Registro {r}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full w-fit" style={{ background: `${active.preview.accent}15`, color: active.preview.accent, fontSize: '8px' }}>Activo</span>
                      <span className="text-[9px] text-white/20">2026-02-12</span>
                      <span className="text-[9px]" style={{ color: `${active.preview.accent}80` }}>Editar</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Features row */}
        <motion.div {...m(0.5)} className="flex items-center justify-center gap-6 mt-5">
          {[
            { icon: Layers, label: 'Canvas separa chat de código' },
            { icon: Type, label: 'HTML/Tailwind listo para copiar' },
            { icon: MousePointer, label: 'Itera con chat natural' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-white/30">
              <f.icon className="w-3.5 h-3.5 text-amber-400/50" />
              <span>{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">STACK</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
