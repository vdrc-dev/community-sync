import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Sparkles, Rocket, Database, Code2, ArrowRight, CheckCircle2, Trophy } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const DECISIONS = [
  { q: '¿Quiero diseñar la UI visual primero?', answer: 'Gemini Canvas', icon: Sparkles, color: 'hsl(38 90% 55%)', hue: 38, tip: 'Prototipar UI en HTML/Tailwind gratis. Itera con chat hasta el diseño perfecto.' },
  { q: '¿Quiero construir o agregar funcionalidad?', answer: 'Lovable', icon: Rocket, color: 'hsl(330 70% 60%)', hue: 330, tip: 'Primera opción siempre. De prompt a app funcional con backend incluido en minutos.' },
  { q: '¿Necesito usuarios, login o datos persistentes?', answer: 'Supabase', icon: Database, color: 'hsl(150 60% 50%)', hue: 150, tip: 'Backend + auth + APIs automáticas. Lovable ya lo integra, solo configuras tablas.' },
  { q: '¿Lovable no logra ese cambio específico?', answer: 'Cursor', icon: Code2, color: 'hsl(185 70% 50%)', hue: 185, tip: 'Solo el último 20%. Precisión quirúrgica cuando el chat no alcanza.' },
];

const GOLDEN_RULES = [
  { rule: 'Empieza SIEMPRE con Lovable', detail: 'No con código, no con Canvas. Con Lovable.' },
  { rule: 'Supabase para datos que persisten', detail: 'Si el usuario cierra la tab y quiere ver sus datos de vuelta → Supabase.' },
  { rule: 'Cursor solo si es estrictamente necesario', detail: 'El 80% de las apps no necesitan bajar al código.' },
  { rule: 'No memorices. La práctica trae intuición', detail: 'Con 3-5 proyectos sabrás qué usar sin pensarlo.' },
];

export function S4Slide12DecisionGuide() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [active, setActive] = useState<number | null>(null);
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-15%,_hsl(38_80%_45%_/_0.1),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(38 80% 60%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
        <div className="absolute top-[5%] right-[3%] text-[16vw] font-black text-white/[0.022] leading-none select-none pointer-events-none">?</div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-amber-500" style={{ boxShadow: '0 0 12px hsl(38 90% 55% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/30">Aplicación · Toma de Decisiones</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Tu Guía de Decisión</h1>
            </div>
          </div>
          <p className="text-amber-400/60 text-sm ml-5 pl-1 font-medium">Cada herramienta tiene su momento exacto. Esta es la guía. Pasa el cursor por cada pregunta.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {/* Decision flow */}
          <div className="space-y-3">
            {DECISIONS.map((d, i) => {
              const Icon = d.icon;
              const isActive = active === i;
              return (
                <motion.button key={i} {...m(0.12 + i * 0.07)}
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 group overflow-hidden relative"
                  style={{
                    borderColor: isActive ? `hsl(${d.hue} 60% 50% / 0.35)` : 'hsl(0 0% 100% / 0.05)',
                    background: isActive ? `hsl(${d.hue} 60% 40% / 0.07)` : 'hsl(0 0% 100% / 0.01)',
                    boxShadow: isActive ? `0 0 30px hsl(${d.hue} 60% 40% / 0.08) inset` : 'none',
                  }}>
                  {isActive && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, hsl(${d.hue} 60% 55% / 0.6), transparent)` }} />}
                  <HelpCircle className="w-5 h-5 text-white/15 shrink-0" />
                  <span className="text-sm font-bold text-white/55 flex-1">{d.q}</span>
                  <ArrowRight className="w-4 h-4 text-white/10 shrink-0" />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl shrink-0" style={{ background: `hsl(${d.hue} 60% 45% / 0.12)`, border: `1px solid hsl(${d.hue} 60% 50% / 0.25)` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: d.color }} />
                    <span className="text-xs font-black" style={{ color: d.color }}>{d.answer}</span>
                  </div>
                </motion.button>
              );
            })}

            <AnimatePresence>
              {active !== null && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden">
                  <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.025]">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: DECISIONS[active].color }} />
                      <p className="text-xs text-white/50 leading-relaxed">{DECISIONS[active].tip}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Golden rules */}
          <motion.div {...m(0.45)} className="relative p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] overflow-hidden"
            style={{ boxShadow: '0 0 50px hsl(38 80% 40% / 0.07) inset' }}>
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 90% 55% / 0.5), transparent)' }} />
            <div className="absolute bottom-3 right-4 text-[60px] font-black leading-none select-none pointer-events-none text-amber-500/[0.04]">🏆</div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-lg font-black text-white">Reglas de Oro</p>
                <p className="text-xs text-amber-400/60">Destiladas de 100+ proyectos</p>
              </div>
            </div>

            <div className="space-y-3">
              {GOLDEN_RULES.map((rule, i) => (
                <motion.div key={i}
                  {...(isExporting ? {} : { initial: { opacity: 0, x: 15 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] } })}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-amber-500/12 bg-amber-500/[0.025]">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-black text-amber-400">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-white mb-0.5">{rule.rule}</p>
                    <p className="text-[10px] text-white/30 leading-relaxed">{rule.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-black/25 border border-white/[0.05]">
              <p className="text-[11px] text-white/30 italic leading-relaxed">"Lo importante no es qué herramienta. Es que empieces. La primera app es la más difícil."</p>
              <p className="text-[10px] text-white/15 mt-1">— Vicente Donoso R.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 50% 55% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Aplicación</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/50">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
