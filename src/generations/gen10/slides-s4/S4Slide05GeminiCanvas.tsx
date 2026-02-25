import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, Layers, Type, MousePointer, Code2, Eye } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const PROMPTS = [
  {
    id: 'campus',
    label: 'Campus Kind',
    desc: 'Sistema de gestión de colegios',
    prompt: 'Crea un dashboard para gestión de colegios, colores naranjos, elegante, con sidebar...',
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
    label: 'CRM de Ventas',
    desc: 'Pipeline y kanban de oportunidades',
    prompt: 'Necesito un CRM minimalista con pipeline visual, kanban board y métricas de revenue...',
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
    label: 'Portafolio Personal',
    desc: 'Dark mode con animaciones premium',
    prompt: 'Diseña un portafolio personal dark con animaciones suaves, gradientes violetas y tipografía serif...',
    preview: {
      bg: 'linear-gradient(135deg, hsl(280 40% 6%), hsl(260 30% 4%))',
      accent: 'hsl(280 70% 65%)',
      font: "'Playfair Display', serif",
      name: 'Mi Portafolio',
      cards: [
        { label: 'Proyectos', value: '12', delta: '' },
        { label: 'Tecnologías', value: '8+', delta: '' },
        { label: 'Años Exp.', value: '3+', delta: '' },
      ],
      nav: ['Inicio', 'Proyectos', 'Skills', 'Contacto'],
    },
  },
];

const FEATURES = [
  { icon: Layers, label: 'Canvas separa chat del código', sub: 'Edita sin perder el contexto' },
  { icon: Type, label: 'HTML/Tailwind listo para copiar', sub: 'Pégalo directo en Lovable' },
  { icon: MousePointer, label: 'Itera con chat natural', sub: 'Cambia colores, layout, fuentes' },
];

export function S4Slide05GeminiCanvas() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PROMPTS[activeIdx];
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } };

  useEffect(() => {
    if (isExporting) return;
    const timer = setInterval(() => setActiveIdx(p => (p + 1) % PROMPTS.length), 6000);
    return () => clearInterval(timer);
  }, [isExporting]);

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-15%,_hsl(38_80%_45%_/_0.12),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(38 80% 60%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
        <div className="absolute top-[5%] right-[3%] text-[18vw] font-black text-white/[0.022] leading-none select-none pointer-events-none tracking-tighter">GC</div>
      </div>

      {!isExporting && (
        <motion.div className="absolute top-[15%] right-[5%] w-[300px] h-[300px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'hsl(38 80% 50% / 0.07)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-amber-500" style={{ boxShadow: '0 0 12px hsl(38 90% 55% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/30">Stack · Diseño Visual</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Gemini Canvas: Diseña Gratis</h1>
            </div>
          </div>
          <p className="text-amber-400/60 text-sm ml-5 pl-1 font-medium">Describe tu app → Canvas genera el diseño. Cambia el prompt, cambia el resultado instantáneamente.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-5">
          {/* Left: Prompt selector */}
          <div className="col-span-2 flex flex-col gap-3">
            {PROMPTS.map((p, i) => (
              <motion.button key={p.id} {...m(0.1 + i * 0.07)} onClick={() => setActiveIdx(i)}
                className="relative w-full text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: activeIdx === i ? 'hsl(38 80% 50% / 0.35)' : 'hsl(0 0% 100% / 0.05)',
                  background: activeIdx === i ? 'hsl(38 80% 45% / 0.07)' : 'hsl(0 0% 100% / 0.01)',
                }}>
                {activeIdx === i && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 90% 55% / 0.6), transparent)' }} />}
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" style={{ opacity: activeIdx === i ? 1 : 0.4 }} />
                  <div>
                    <p className="text-xs font-black text-amber-400/90 mb-0.5">{p.label}</p>
                    <p className="text-[10px] text-white/30 mb-2">{p.desc}</p>
                    <p className="text-[10px] text-white/25 font-mono leading-relaxed line-clamp-2">"{p.prompt}"</p>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Warning */}
            <motion.div {...m(0.4)} className="p-3.5 rounded-xl border border-red-500/18 bg-red-500/[0.04] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-red-400/80 mb-0.5">Audita siempre el código</p>
                <p className="text-[10px] text-white/30 leading-relaxed">Canvas "alucina" con matemáticas y datos. Úsalo solo para el diseño visual.</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Live browser preview */}
          <motion.div {...m(0.15)} className="col-span-3 rounded-2xl border border-amber-500/18 overflow-hidden"
            style={{ background: 'hsl(38 20% 4%)', boxShadow: '0 0 40px hsl(38 80% 40% / 0.06) inset' }}>
            {/* Browser chrome */}
            <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-3" style={{ background: 'hsl(0 0% 5%)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <span className="text-[9px] text-white/20 font-mono">gemini.google.com/canvas → Preview</span>
              </div>
              <Eye className="w-3.5 h-3.5 text-white/15" />
            </div>

            {/* App preview */}
            <AnimatePresence mode="wait">
              <motion.div key={active.id}
                initial={isExporting ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-5" style={{ background: active.preview.bg, minHeight: '260px' }}>
                {/* Nav */}
                <div className="flex items-center gap-4 mb-5 pb-3 border-b" style={{ borderColor: `${active.preview.accent}25` }}>
                  <span className="text-sm font-black" style={{ color: active.preview.accent, fontFamily: active.preview.font }}>{active.preview.name}</span>
                  <div className="flex gap-4 ml-auto">
                    {active.preview.nav.map((item, i) => (
                      <span key={i} className="text-[10px] font-bold" style={{ color: i === 0 ? active.preview.accent : 'hsl(0 0% 100% / 0.3)' }}>{item}</span>
                    ))}
                  </div>
                </div>
                {/* Stats cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {active.preview.cards.map((card, i) => (
                    <motion.div key={i}
                      initial={isExporting ? {} : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="p-3 rounded-xl border" style={{ borderColor: `${active.preview.accent}18`, background: `${active.preview.accent}0a` }}>
                      <p className="text-[8px] text-white/30 uppercase tracking-wider font-bold">{card.label}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-black text-white" style={{ fontFamily: active.preview.font }}>{card.value}</span>
                        {card.delta && <span className="text-[9px] font-black" style={{ color: active.preview.accent }}>{card.delta}</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Mini table */}
                <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${active.preview.accent}12` }}>
                  <div className="grid grid-cols-4 gap-2 px-3 py-2 border-b" style={{ borderColor: `${active.preview.accent}08`, background: `${active.preview.accent}05` }}>
                    {['Nombre', 'Estado', 'Fecha', 'Acción'].map(h => (
                      <span key={h} className="text-[8px] font-black text-white/20 uppercase tracking-wider">{h}</span>
                    ))}
                  </div>
                  {[1, 2, 3].map(r => (
                    <div key={r} className="grid grid-cols-4 gap-2 px-3 py-1.5 border-b" style={{ borderColor: `${active.preview.accent}06` }}>
                      <span className="text-[9px] text-white/35">Registro {r}</span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full w-fit font-bold" style={{ background: `${active.preview.accent}15`, color: active.preview.accent }}>Activo</span>
                      <span className="text-[9px] text-white/20">2026-02-{10 + r}</span>
                      <span className="text-[9px] font-bold" style={{ color: `${active.preview.accent}80` }}>Editar →</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prompt bar */}
            <div className="px-5 py-3 border-t border-white/[0.05] flex items-center gap-3" style={{ background: 'hsl(0 0% 4%)' }}>
              <Code2 className="w-3.5 h-3.5 text-amber-400/40 shrink-0" />
              <p className="text-[10px] text-white/20 font-mono italic line-clamp-1">"{active.prompt}"</p>
            </div>
          </motion.div>
        </div>

        {/* Features row */}
        <motion.div {...m(0.55)} className="flex items-center justify-center gap-8 mt-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(38 80% 50% / 0.1)', border: '1px solid hsl(38 80% 50% / 0.2)' }}>
                <f.icon className="w-4 h-4 text-amber-400/70" />
              </div>
              <div>
                <p className="text-xs font-black text-white/60">{f.label}</p>
                <p className="text-[10px] text-white/25">{f.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 50% 55% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Stack</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/50">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
