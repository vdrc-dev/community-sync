import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Sparkles, Rocket, Database, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const DECISIONS = [
  { question: '¿Diseñar UI?', answer: 'Gemini Canvas', icon: Sparkles, color: 'hsl(38 90% 55%)', tip: 'Prototipar interfaces rápido y gratis' },
  { question: '¿Construir app?', answer: 'Lovable', icon: Rocket, color: 'hsl(330 70% 60%)', tip: 'De prompt a app en 30 segundos' },
  { question: '¿Guardar datos?', answer: 'Supabase', icon: Database, color: 'hsl(150 60% 50%)', tip: 'Backend + auth + APIs automáticas' },
  { question: '¿Editar código?', answer: 'Cursor', icon: Code2, color: 'hsl(185 70% 50%)', tip: 'Solo si Lovable no alcanza' },
];

const GOLDEN_RULES = [
  'Empieza siempre con Lovable',
  'Supabase para usuarios y datos persistentes',
  'Cursor solo si es estrictamente necesario',
  'No memorices. Con práctica, sabrás intuitivamente qué usar',
];

export function S4Slide12DecisionGuide() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [active, setActive] = useState<number | null>(null);
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(38_80%_45%_/_0.08),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-amber-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Aplicación</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Tu Guía de Decisión</h1>
            </div>
          </div>
          <p className="text-amber-400/60 text-sm ml-5 pl-1">Cada herramienta tiene su momento. Esta es la guía.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {/* Decision cards */}
          <div className="space-y-3">
            {DECISIONS.map((d, i) => {
              const Icon = d.icon;
              const isActive = active === i;
              return (
                <motion.button key={i} {...m(0.15 + i * 0.08)}
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${isActive ? 'bg-white/[0.04] border-white/[0.12]' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                  <HelpCircle className="w-5 h-5 text-white/20 shrink-0" />
                  <span className="text-sm font-semibold text-white/50 flex-1">{d.question}</span>
                  <ArrowRight className="w-4 h-4 text-white/10" />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: `${d.color.replace(')', ' / 0.1)')}`, border: `1px solid ${d.color.replace(')', ' / 0.2)')}` }}>
                    <Icon className="w-4 h-4" style={{ color: d.color }} />
                    <span className="text-xs font-bold" style={{ color: d.color }}>{d.answer}</span>
                  </div>
                </motion.button>
              );
            })}

            <AnimatePresence>
              {active !== null && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                  <p className="text-xs text-white/40">💡 {DECISIONS[active].tip}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Golden rules */}
          <motion.div {...m(0.5)} className="p-6 rounded-2xl border border-amber-500/15 bg-amber-500/[0.03]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <span className="text-sm">🏆</span>
              </div>
              <span className="text-lg font-bold text-white">Reglas de Oro</span>
            </div>
            <div className="space-y-3">
              {GOLDEN_RULES.map((rule, i) => (
                <motion.div key={i} {...(isExporting ? {} : { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.6 + i * 0.1 } })}
                  className="flex items-start gap-3 p-3 rounded-lg border border-amber-500/10 bg-amber-500/[0.02]">
                  <CheckCircle2 className="w-4 h-4 text-amber-400/60 shrink-0 mt-0.5" />
                  <span className="text-xs text-white/50">{rule}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-black/20 border border-white/[0.04]">
              <p className="text-[11px] text-white/30 italic">"Lo importante: empieza con Lovable. El resto fluye."</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">APLICACIÓN</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
