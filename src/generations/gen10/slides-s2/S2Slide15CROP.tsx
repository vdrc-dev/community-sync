import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { FileText, User, Target, Settings, Lightbulb, ArrowRight, Eye } from 'lucide-react';
import { S2Shell, useS2Motion } from './shared';

const DEFAULT_FRAMEWORK = [
  { letter: 'C', label: 'CONTEXTO', sublabel: 'El Escenario', desc: '¿Qué información de fondo necesita saber la IA? (industria, audiencia, datos relevantes)', color: 'cyan' },
  { letter: 'R', label: 'ROL', sublabel: 'El Experto', desc: '¿A qué profesional le pedirías esta tarea? (abogado, diseñador, analista)', color: 'pink' },
  { letter: 'O', label: 'OUTPUT', sublabel: 'El Entregable', desc: '¿Qué producto final esperas? (no "objetivo" — la O es de Output, el resultado concreto)', color: 'amber' },
  { letter: 'P', label: 'PARÁMETROS', sublabel: 'Las Reglas', desc: '¿Qué restricciones tiene? (longitud, formato, tono, idioma)', color: 'violet' },
];

const ICONS: React.ElementType[] = [FileText, User, Target, Settings];
const COLOR_MAP: Record<string, { text: string; bg: string; border: string; glow: string; gradient: string; dot: string }> = {
  cyan:    { text: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',   glow: 'rgba(6,182,212,0.25)',   gradient: 'from-cyan-400 to-cyan-300',   dot: 'hsl(185 65% 55%)' },
  pink:    { text: 'text-pink-400',    bg: 'bg-pink-500/10',    border: 'border-pink-500/30',   glow: 'rgba(236,72,153,0.25)',  gradient: 'from-pink-400 to-pink-300',   dot: 'hsl(330 65% 60%)' },
  amber:   { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',  glow: 'rgba(245,158,11,0.25)',  gradient: 'from-amber-400 to-amber-300', dot: 'hsl(38 90% 58%)' },
  violet:  { text: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/30', glow: 'rgba(139,92,246,0.25)', gradient: 'from-violet-400 to-violet-300', dot: 'hsl(263 60% 60%)' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30',glow: 'rgba(16,185,129,0.25)', gradient: 'from-emerald-400 to-emerald-300', dot: 'hsl(160 65% 50%)' },
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = { FileText, User, Target, Settings };

/* CROP Builder example fragments */
const CROP_FRAGMENTS: Record<string, string> = {
  C: 'Soy fundador de una fintech B2B en Chile, con 500 clientes activos.',
  R: 'Actúa como un CMO con 15 años en startups SaaS LATAM.',
  O: 'Crea un plan de marketing Q1 con 3 campañas, presupuesto y KPIs.',
  P: 'Formato: tabla con columnas (Campaña, Canal, Budget, KPI). Tono ejecutivo. Máx 400 palabras.',
};

export function S2Slide15CROP() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(14);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [builtLetters, setBuiltLetters] = useState<Set<string>>(new Set());

  const insight = content.insight || 'No memorices fórmulas complejas, solo recuerda estas 4 letras antes de enviar tu instrucción.';

  const dbFramework = content.framework;
  const framework = dbFramework
    ? dbFramework.map((item) => ({
        letter: item.letter,
        label: item.name.toUpperCase(),
        sublabel: item.question.split('?')[0] + '?',
        desc: item.question,
        color: item.color,
      }))
    : DEFAULT_FRAMEWORK;

  const toggleLetter = (letter: string) => {
    setBuiltLetters(prev => {
      const next = new Set(prev);
      if (next.has(letter)) next.delete(letter); else next.add(letter);
      return next;
    });
  };

  const m = useS2Motion();

  const activeColor = activeCard !== null ? (COLOR_MAP[framework[activeCard]?.color] || COLOR_MAP.violet) : null;

  return (
    <S2Shell
      footerLabel="FRAMEWORK C.R.O.P."
      className="flex flex-col justify-center px-16 2xl:px-20"
      radials={
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(263_70%_45%_/_0.2),_transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(185_55%_45%_/_0.1),_transparent_65%)]" />
        </>
      }
    >
      {!isExporting && (
        <>
          {activeColor && (
            <motion.div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full -translate-x-1/2 -translate-y-1/2"
              key={activeCard} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.5, scale: [1, 1.1, 1] }}
              transition={{ opacity: { duration: 0.4 }, scale: { duration: 6, repeat: Infinity } }}
              style={{ background: `radial-gradient(circle, ${activeColor.glow}, transparent 70%)` }} />
          )}
          <motion.div
            className="absolute bottom-[15%] right-[8%] w-[400px] h-[400px] rounded-full blur-[160px]"
            style={{ background: 'hsl(330 65% 55% / 0.09)' }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full justify-center items-center max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-6">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-400 via-pink-400 to-violet-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Framework de Prompting</span>
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-400 via-amber-400 to-cyan-400" />
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight mb-2">Juntándolo Todo: El Marco</h1>
          <motion.div {...m(0.15)} className="text-7xl 2xl:text-8xl font-black tracking-tight"
            style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 35%, #f59e0b 65%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            C.R.O.P!
          </motion.div>
        </motion.div>

        {/* Cards row */}
        <div className="grid grid-cols-4 gap-4 mb-5 w-full max-w-5xl">
          {framework.map((item, i) => {
            const color = COLOR_MAP[item.color] || COLOR_MAP.violet;
            const Icon = ICON_MAP[['FileText', 'User', 'Target', 'Settings'][i]] || ICONS[i] || FileText;
            const isActive = activeCard === i;
            const isBuilt = builtLetters.has(item.letter);

            return (
              <motion.div key={item.letter} {...m(0.25 + i * 0.08)}
                className="relative"
                onMouseEnter={() => setActiveCard(i)} onMouseLeave={() => setActiveCard(null)}>
                {i < framework.length - 1 && (
                  <motion.div className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-20"
                    {...(isExporting ? {} : { animate: { x: [0, 4, 0] }, transition: { duration: 1.5, repeat: Infinity, delay: i * 0.2 } })}>
                    <ArrowRight className="w-3.5 h-3.5 text-white/20" />
                  </motion.div>
                )}
                <motion.button onClick={() => toggleLetter(item.letter)}
                  animate={isExporting ? {} : { y: isActive ? -4 : 0, scale: isActive ? 1.02 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`relative w-full p-5 rounded-2xl border backdrop-blur-sm flex flex-col items-center text-center transition-colors duration-300 overflow-hidden ${isActive || isBuilt ? `${color.bg} ${color.border}` : 'bg-white/[0.02] border-white/[0.06]'}`}>
                  {/* Top accent */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-b-full transition-opacity duration-300 ${isActive || isBuilt ? 'opacity-100' : 'opacity-30'}`}
                    style={{ background: `linear-gradient(90deg, transparent, ${color.glow.replace('0.25', '0.8')}, transparent)` }} />

                  {/* Built checkmark */}
                  {isBuilt && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <span className="text-emerald-400 text-[10px]">✓</span>
                    </motion.div>
                  )}

                  <span className={`relative text-4xl 2xl:text-5xl font-black mb-2 ${color.text}`}
                    style={isActive ? { textShadow: `0 0 30px ${color.glow}` } : {}}>
                    {item.letter}
                  </span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 border transition-all duration-300 ${isActive || isBuilt ? `${color.bg} ${color.border}` : 'bg-white/5 border-white/[0.06]'}`}>
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive || isBuilt ? color.text : 'text-white/30'}`} />
                  </div>
                  <p className={`text-[10px] font-bold tracking-wider mb-0.5 transition-colors duration-300 ${isActive || isBuilt ? color.text : 'text-white/50'}`}>{item.label}</p>
                  <p className="text-white/30 text-[9px] mb-1 font-medium">{item.sublabel}</p>
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.p key={`desc-${i}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }} className="text-white/50 text-[10px] leading-relaxed">
                        {item.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* CROP Builder Panel */}
        <motion.div {...m(0.6)} className="w-full max-w-5xl">
          <div className="rounded-xl border overflow-hidden"
            style={{ background: 'hsl(0 0% 4% / 0.9)', borderColor: 'hsl(0 0% 100% / 0.06)' }}>
            <div className="px-5 py-2.5 border-b flex items-center gap-2" style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
              <Eye className="w-3.5 h-3.5 text-violet-400/60" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Constructor CROP — Haz clic en las letras</span>
              <span className="ml-auto text-[10px] font-mono text-white/20">{builtLetters.size}/4</span>
            </div>
            <div className="px-5 py-3 min-h-[60px]">
              {builtLetters.size === 0 ? (
                <p className="text-white/20 text-xs italic">Haz clic en C, R, O o P para construir un prompt completo…</p>
              ) : (
                <div className="space-y-1.5">
                  {['C', 'R', 'O', 'P'].filter(l => builtLetters.has(l)).map(l => {
                    const fw = framework.find(f => f.letter === l);
                    const c = COLOR_MAP[fw?.color || 'violet'];
                    return (
                      <AnimatePresence key={l}>
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                          <span className={`text-xs font-black w-5 ${c.text}`}>{l}</span>
                          <span className="text-xs font-mono" style={{ color: c.dot }}>{CROP_FRAGMENTS[l]}</span>
                        </motion.div>
                      </AnimatePresence>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Insight */}
        <motion.div {...m(0.7)} className="max-w-2xl w-full mt-4">
          <div className="p-3 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.06))' }}>
            <div className="absolute inset-0 rounded-xl border border-violet-500/20" />
            <div className="relative flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <p className="text-violet-300/80 text-xs leading-relaxed">{insight}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </S2Shell>
  );
}
