import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { CheckSquare, Lightbulb, Users, Building2, Clock, FileText, Crown, Eye } from 'lucide-react';
import { S2_THEME } from './theme';

const CHECKLIST_ICONS: React.ElementType[] = [Users, Building2, Clock, FileText];
const CHECKLIST_COLORS = ['violet', 'amber', 'cyan', 'emerald'] as const;
const COLOR_MAP: Record<string, { text: string; bg: string; border: string; glow: string; dot: string }> = {
  violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', glow: 'rgba(139,92,246,0.15)', dot: 'hsl(263 60% 60%)' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', glow: 'rgba(245,158,11,0.15)', dot: 'hsl(38 90% 58%)' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', glow: 'rgba(6,182,212,0.15)', dot: 'hsl(185 65% 55%)' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'rgba(16,185,129,0.15)', dot: 'hsl(160 65% 50%)' },
};

/* Progressive prompt builder */
const CONTEXT_ADDITIONS = [
  'para CTOs de bancos regionales en Chile',
  'en la industria fintech B2B',
  'con presupuesto de $5K/mes y plazo de 90 días',
  'formato: plan ejecutivo con métricas y timeline',
];

const QUALITY_LEVELS = [18, 42, 68, 88, 96]; // quality at 0,1,2,3,4 items checked

export function S2Slide14Context() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const content = useSlideContent(13);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const checklist = content.checklist || [
    { item: 'Audiencia', example: 'Ejecutivos C-level, técnicos, estudiantes' },
    { item: 'Industria', example: 'Fintech, retail, manufactura' },
    { item: 'Restricciones', example: 'Presupuesto, tiempo, recursos' },
    { item: 'Formato esperado', example: 'Email, presentación, código' },
  ];
  const insight = content.insight || 'El contexto es MÁS importante que el prompt mismo';
  const goldenRule = content.goldenRule || 'Sin contexto, la IA asume. Con contexto, la IA entiende.';

  const toggleItem = (i: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const quality = QUALITY_LEVELS[checkedItems.size] || QUALITY_LEVELS[0];
  const qualityColor = quality < 40 ? 'hsl(0 65% 55%)' : quality < 70 ? 'hsl(38 90% 58%)' : 'hsl(160 65% 50%)';

  const m = (delay: number, overrides?: Record<string, unknown>) =>
    isExporting ? {} : { initial: { opacity: 0, y: 20, ...overrides }, animate: { opacity: 1, y: 0, x: 0, scale: 1 }, transition: { delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans selection:bg-violet-500/30"
      style={{ background: S2_THEME.background }}>
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(263_70%_45%_/_0.18),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(185_55%_45%_/_0.1),_transparent_65%)]" />
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
        {!isExporting && (
          <>
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ background: `radial-gradient(circle, ${qualityColor.replace(')', ' / 0.2)')}, transparent 70%)` }} />
            <motion.div
              className="absolute top-[18%] right-[10%] w-[350px] h-[350px] rounded-full blur-[140px]"
              style={{ background: 'hsl(185 70% 50% / 0.11)' }}
              animate={{ y: [0, 20, 0], opacity: [0.11, 0.22, 0.11] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Herramienta Clave #2</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            El <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">Contexto</span> es el Rey
          </h1>
          <p className="text-base text-white/55 mt-3 leading-relaxed max-w-[600px]">{goldenRule}</p>
        </motion.div>

        {/* Main: 2 columns */}
        <div className="grid grid-cols-[1fr_1.1fr] gap-8 items-start">
          {/* LEFT: Interactive checklist */}
          <motion.div {...m(0.15)} className="space-y-2.5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="w-4 h-4 text-violet-400" />
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Checklist de Contexto</p>
              <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md"
                style={{ background: `${qualityColor.replace(')', ' / 0.1)')}`, color: qualityColor }}>
                {checkedItems.size}/4
              </span>
            </div>

            {checklist.map((ci, i) => {
              const color = COLOR_MAP[CHECKLIST_COLORS[i]] || COLOR_MAP.violet;
              const Icon = CHECKLIST_ICONS[i] || Crown;
              const isChecked = checkedItems.has(i);
              return (
                <motion.button key={i} onClick={() => toggleItem(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${isChecked ? `${color.bg} ${color.border}` : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'}`}
                  whileHover={isExporting ? undefined : { scale: 1.01 }} whileTap={isExporting ? undefined : { scale: 0.99 }}>
                  {isChecked && !isExporting && (
                    <motion.div layoutId={`ctx-glow-${i}`} className="absolute inset-0 rounded-xl"
                      style={{ background: `radial-gradient(ellipse at 15% 50%, ${color.glow}, transparent 70%)` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                  )}
                  <div className="relative flex items-center gap-4">
                    {/* Checkbox */}
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${isChecked ? `${color.bg} ${color.border}` : 'bg-white/5 border-white/[0.1]'}`}>
                      {isChecked && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                          <CheckSquare className={`w-4 h-4 ${color.text}`} />
                        </motion.div>
                      )}
                    </div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isChecked ? `${color.bg} border ${color.border}` : 'bg-white/5 border border-white/[0.06]'}`}>
                      <Icon className={`w-4 h-4 ${isChecked ? color.text : 'text-white/30'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono ${isChecked ? color.text : 'text-white/20'}`}>{String(i + 1).padStart(2, '0')}</span>
                        <p className={`font-semibold text-sm ${isChecked ? color.text : 'text-white/60'}`}>{ci.item}</p>
                      </div>
                      <p className={`text-xs mt-0.5 ${isChecked ? 'text-white/40' : 'text-white/20'}`}>{ci.example}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* Insight */}
            <motion.div {...m(0.5)} className="mt-4 p-4 rounded-xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.06))' }}>
              <div className="absolute inset-0 rounded-xl border border-violet-500/20" />
              <div className="relative flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-violet-300/80 text-sm leading-relaxed">{insight}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Live Prompt Builder */}
          <motion.div {...m(0.25)}>
            <div className="rounded-2xl border overflow-hidden"
              style={{ background: 'hsl(0 0% 4% / 0.9)', borderColor: 'hsl(0 0% 100% / 0.06)' }}>

              {/* Header */}
              <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
                <Eye className="w-4 h-4 text-cyan-400/60" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Constructor de Prompt en Vivo</span>
              </div>

              {/* Base prompt */}
              <div className="px-5 py-4 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.04)' }}>
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-2 block">Prompt base</span>
                <p className="text-sm font-mono text-white/50">"Hazme una estrategia de marketing"</p>
              </div>

              {/* Context additions */}
              <div className="px-5 py-4 border-b space-y-2" style={{ borderColor: 'hsl(0 0% 100% / 0.04)' }}>
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-1 block">Contexto añadido</span>
                <AnimatePresence>
                  {checkedItems.size === 0 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-white/20 text-xs italic">Marca elementos del checklist para construir tu prompt…</motion.p>
                  )}
                  {[0, 1, 2, 3].filter(i => checkedItems.has(i)).map((i) => {
                    const color = COLOR_MAP[CHECKLIST_COLORS[i]];
                    return (
                      <motion.div key={i}
                        initial={{ opacity: 0, height: 0, y: -5 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${color.bg} border ${color.border}`}>
                        <span className={`text-[9px] font-bold ${color.text}`}>+</span>
                        <span className="text-xs font-mono" style={{ color: color.dot }}>{CONTEXT_ADDITIONS[i]}</span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Full prompt preview */}
              <div className="px-5 py-4 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.04)' }}>
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-2 block">Prompt completo</span>
                <p className="text-sm font-mono leading-relaxed" style={{ color: checkedItems.size > 2 ? 'hsl(160 65% 60%)' : checkedItems.size > 0 ? 'hsl(38 85% 65%)' : 'hsl(0 0% 100% / 0.35)' }}>
                  "Hazme una estrategia de marketing
                  {[0, 1, 2, 3].filter(i => checkedItems.has(i)).map(i => ` ${CONTEXT_ADDITIONS[i]}`).join(',')}
                  {checkedItems.size > 0 ? '.' : ''}"
                </p>
              </div>

              {/* Quality meter */}
              <div className="px-5 py-3 flex items-center gap-3"
                style={{ background: `linear-gradient(90deg, ${qualityColor.replace(')', ' / 0.08)')}, transparent)` }}>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'hsl(0 0% 100% / 0.3)' }}>Precisión</span>
                <div className="flex-1 h-2.5 rounded-full" style={{ background: 'hsl(0 0% 100% / 0.04)' }}>
                  <motion.div className="h-full rounded-full"
                    animate={{ width: `${quality}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: qualityColor }} />
                </div>
                <motion.span className="text-sm font-bold font-mono tabular-nums min-w-[3ch]"
                  key={quality}
                  initial={isExporting ? {} : { scale: 1.3 }}
                  animate={{ scale: 1 }}
                  style={{ color: qualityColor }}>
                  {quality}%
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">INGENIERÍA DE CONTEXTO</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '21 / 37'}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
