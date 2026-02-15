import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { Brain, Hand, FileText, Lightbulb, CheckCircle, ZoomIn, X, LucideIcon } from 'lucide-react';
import { useSlideContent, getColorClasses } from '@/hooks/useSlideContent';
import { S2Shell, useS2Motion } from './shared';

const CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10-s2/concept-stack-2026.jpg';

const ICON_MAP: Record<string, LucideIcon> = { Brain, Hand, FileText };

const COLOR_MAP: Record<string, { text: string; bg: string; border: string; glow: string; solid: string }> = {
  violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', glow: 'rgba(139,92,246,0.25)', solid: '#8b5cf6' },
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30',   glow: 'rgba(6,182,212,0.25)',   solid: '#06b6d4' },
  amber:  { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  glow: 'rgba(245,158,11,0.25)', solid: '#f59e0b' },
};

const DEFAULT_STRUCTURE = [
  { layer: 'CEREBRO', icon: 'Brain', tools: ['o3 Thinking', 'GPT-5.2', 'Claude 4.6'], purpose: 'Estrategia y razonamiento profundo', color: 'violet' },
  { layer: 'MANOS', icon: 'Hand', tools: ['Manus.im', 'Claude Code', 'Operator'], purpose: 'Ejecución autónoma de tareas', color: 'cyan' },
  { layer: 'CONTEXTO', icon: 'FileText', tools: ['NotebookLM', 'Skills de Claude', 'Projects'], purpose: 'Tu memoria: recuerda quién eres y cómo trabajas', color: 'amber' },
];

export function S2Slide21Kit() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(20);
  const [activeLayer, setActiveLayer] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const stackImageUrl = (content.stackImageUrl as string) || CLOUD_URL;
  const structure = content.structure || DEFAULT_STRUCTURE;
  const actionItems = content.actionItems || ['Instala Claude Code en tu terminal', 'Configura tus primeros MCPs', 'Crea tu primer Skill'];
  const insight = content.insight || 'Cerebro para pensar, Manos para ejecutar, Contexto para recordar';

  const m = useS2Motion();

  const active = structure[activeLayer];
  const activeColor = COLOR_MAP[active?.color] || COLOR_MAP.violet;
  const ActiveIcon = ICON_MAP[active?.icon] || Brain;

  return (
    <S2Shell
      footerLabel="STACK ESENCIAL 2026"
      className="flex flex-col justify-center px-16 2xl:px-20"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(263_70%_45%_/_0.18),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(185_55%_45%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_80%_30%,_hsl(38_60%_40%_/_0.06),_transparent_55%)]" />
      </>}
    >
      {/* Breathing orbs */}
      {!isExporting && (
        <>
          <motion.div className="absolute top-[25%] left-[35%] w-[600px] h-[500px] rounded-full blur-[200px]"
            key={activeLayer} initial={{ opacity: 0 }} animate={{ opacity: 0.35, scale: [1, 1.15, 1] }}
            transition={{ opacity: { duration: 0.4 }, scale: { duration: 8, repeat: Infinity } }}
            style={{ background: `radial-gradient(circle, ${activeColor.glow}, transparent 70%)` }} />
          <motion.div className="absolute bottom-[20%] right-[25%] w-[450px] h-[400px] rounded-full blur-[160px]"
            style={{ background: 'hsl(185 55% 45% / 0.06)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.15, 0.06] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full justify-center max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-400 via-cyan-400 to-amber-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Stack Personal</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            El Kit <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">2026</span>
          </h1>
          <p className="text-base text-white/55 mt-3 leading-relaxed max-w-[600px]">Las 3 capas de tu stack personal de IA</p>
        </motion.div>

        <div className="grid grid-cols-[1.2fr_1fr] gap-8 items-start">
          {/* LEFT: Image + layer selectors */}
          <motion.div {...m(0.1)} className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] group cursor-pointer"
              style={{ boxShadow: `0 0 60px ${activeColor.glow}, 0 0 120px ${activeColor.glow.replace('0.25', '0.08')}` }}
              onClick={() => setLightbox(true)}>
              <img src={stackImageUrl} alt="Essential Stack 2026" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/20 to-transparent" />
              {/* Hover zoom */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
                  <ZoomIn className="w-4 h-4 text-white/80" />
                  <span className="text-white/80 text-xs font-medium">Click para ampliar</span>
                </div>
              </div>
              {/* Bottom layer tabs */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex gap-3">
                  {structure.map((item: any, i: number) => {
                    const color = COLOR_MAP[item.color] || COLOR_MAP.violet;
                    const Icon = ICON_MAP[item.icon] || Brain;
                    const isActive = activeLayer === i;
                    return (
                      <motion.button key={i}
                        onClick={(e) => { e.stopPropagation(); setActiveLayer(i); }}
                        className={`flex-1 relative p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${isActive ? `bg-black/70 border ${color.border}` : 'bg-black/40 border border-white/[0.06] hover:bg-black/60'}`}
                        whileHover={isExporting ? undefined : { scale: 1.02 }}
                        whileTap={isExporting ? undefined : { scale: 0.98 }}>
                        {isActive && !isExporting && (
                          <motion.div layoutId="kit-glow" className="absolute inset-0 rounded-xl"
                            style={{ background: `radial-gradient(ellipse at 50% 100%, ${color.glow}, transparent 70%)` }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                        )}
                        <div className="relative flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? color.bg : 'bg-white/5'} border ${isActive ? color.border : 'border-white/[0.06]'}`}>
                            <Icon className={`w-4 h-4 ${isActive ? color.text : 'text-white/30'}`} />
                          </div>
                          <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-white/50'}`}>{item.layer}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Detail panel */}
          <motion.div {...m(0.25)} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div key={`layer-${activeLayer}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`p-6 rounded-2xl border relative overflow-hidden ${activeColor.bg} ${activeColor.border}`}>
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 80% 20%, ${activeColor.glow}, transparent 70%)` }} />
                <div className="relative space-y-5">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeColor.bg} border ${activeColor.border}`}
                      style={{ boxShadow: `0 0 25px ${activeColor.glow}` }}>
                      <ActiveIcon className={`w-7 h-7 ${activeColor.text}`} />
                    </div>
                    <div>
                      <p className={`text-xl font-bold ${activeColor.text}`}>{active?.layer}</p>
                      <p className="text-white/40 text-xs">Capa {activeLayer + 1} de {structure.length}</p>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="p-4 rounded-xl bg-black/20 border border-white/[0.05]">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${activeColor.text}`}>Propósito</span>
                    <p className="text-white/60 text-sm mt-1.5 leading-relaxed">{active?.purpose}</p>
                  </div>

                  {/* Tools */}
                  <div>
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Herramientas</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(active?.tools || []).map((tool: string, j: number) => (
                        <span key={j} className={`px-3 py-1.5 rounded-lg text-xs border ${activeColor.bg} ${activeColor.border} ${activeColor.text}`}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action items */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Acciones inmediatas</span>
              <div className="space-y-2 mt-3">
                {actionItems.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-white/60 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight */}
            <div className="p-3 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(245,158,11,0.08))' }}>
              <div className="absolute inset-0 rounded-xl border border-violet-500/20" />
              <div className="relative flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-violet-400 shrink-0" />
                <p className="text-violet-300/70 text-xs">{insight}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && !isExporting && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(false)}>
          <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}
            src={stackImageUrl} alt="Essential Stack 2026" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(false)}>
            <X className="w-5 h-5 text-white/80" />
          </button>
        </motion.div>
      )}
    </S2Shell>
  );
}
