import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { Bot, Globe, Monitor, Sparkles, Star, TrendingUp, Search, Code, LucideIcon } from 'lucide-react';
import { useSlideContent, AgentItem } from '@/hooks/useSlideContent';
import protagonistsImg from '@/assets/gen10-s2/page-19-protagonists.jpg';
import { S2Shell, useS2Motion } from './shared';

const ICON_MAP: Record<string, LucideIcon> = { Bot, Globe, Monitor };

const DEFAULT_AGENTS: AgentItem[] = [
  { name: 'Manus AI', icon: 'Bot', capability: 'Le das una tarea compleja y la resuelve solo: investiga, programa, escribe y entrega el resultado final sin que tengas que intervenir', useCase: 'Líder en agentes autónomos', color: 'violet' },
  { name: 'OpenAI Operator', icon: 'Globe', capability: 'Navega páginas web por ti: llena formularios, compara precios, agenda reuniones y extrae datos de cualquier sitio automáticamente', useCase: 'Lanzamiento 2025', color: 'cyan' },
  { name: 'Claude Computer Use', icon: 'Monitor', capability: 'Usa tu computador como lo harías tú: mueve el mouse, escribe, abre programas y completa tareas en cualquier aplicación de escritorio', useCase: 'API disponible', color: 'pink' },
];

const COLOR_MAP: Record<string, { text: string; bg: string; border: string; glow: string; solid: string }> = {
  violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', glow: 'rgba(139,92,246,0.25)', solid: '#8b5cf6' },
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30',   glow: 'rgba(6,182,212,0.25)',   solid: '#06b6d4' },
  pink:   { text: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/30',   glow: 'rgba(236,72,153,0.25)',  solid: '#ec4899' },
};

const BADGE_MAP: Record<string, string> = { 'Manus AI': 'HOT', 'OpenAI Operator': 'NEW', 'Claude Computer Use': 'BETA' };
const SUBTITLE_MAP: Record<string, string> = { 'Manus AI': 'Butterfly Effect', 'OpenAI Operator': 'OpenAI', 'Claude Computer Use': 'Anthropic' };

export function S2Slide19Protagonists() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(18);
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = content.agents || DEFAULT_AGENTS;
  const deepResearch = content.deepResearch;
  const claudeCode = content.claudeCode;

  const m = useS2Motion();

  const active = agents[activeAgent];
  const activeColor = COLOR_MAP[active?.color] || COLOR_MAP.violet;

  return (
    <S2Shell
      footerLabel="AGENTES AUTÓNOMOS"
      className="flex flex-col justify-center px-16 2xl:px-20"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(263_70%_45%_/_0.2),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_90%,_hsl(185_55%_45%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_85%_40%,_hsl(330_60%_40%_/_0.06),_transparent_55%)]" />
      </>}
    >
      {/* Breathing orbs */}
      {!isExporting && (
        <>
          <motion.div className="absolute top-[25%] left-[35%] w-[600px] h-[500px] rounded-full blur-[200px]"
            key={activeAgent} initial={{ opacity: 0 }} animate={{ opacity: 0.35, scale: [1, 1.15, 1] }}
            transition={{ opacity: { duration: 0.4 }, scale: { duration: 8, repeat: Infinity } }}
            style={{ background: `radial-gradient(circle, ${activeColor.glow}, transparent 70%)` }} />
          <motion.div className="absolute bottom-[15%] right-[20%] w-[450px] h-[400px] rounded-full blur-[160px]"
            style={{ background: 'hsl(185 55% 45% / 0.06)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.15, 0.06] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full justify-center max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-400 via-cyan-400 to-pink-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Ecosistema 2026</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Los Protagonistas <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">Agénticos</span>
          </h1>
          <p className="text-base text-white/55 mt-3 leading-relaxed max-w-[600px]">Las empresas líderes en el desarrollo de agentes autónomos</p>
        </motion.div>

        <div className="grid grid-cols-[1.2fr_1fr] gap-8 items-start">
          {/* LEFT: Hero image + agent overlay */}
          <motion.div {...m(0.1)} className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
              style={{ boxShadow: `0 0 60px ${activeColor.glow}, 0 0 120px ${activeColor.glow.replace('0.25', '0.08')}` }}>
              <img src={protagonistsImg} alt="Protagonistas Agénticos" className="w-full aspect-[16/9] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/30 to-transparent" />

              {/* Agent selector tabs overlaid on image bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex gap-3">
                  {agents.map((agent, i) => {
                    const color = COLOR_MAP[agent.color] || COLOR_MAP.violet;
                    const Icon = ICON_MAP[agent.icon] || Bot;
                    const isActive = activeAgent === i;
                    const badge = BADGE_MAP[agent.name] || 'NEW';
                    return (
                      <motion.button key={i} onClick={() => setActiveAgent(i)}
                        className={`flex-1 relative p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${isActive ? `bg-black/70 border ${color.border}` : 'bg-black/40 border border-white/[0.06] hover:bg-black/60'}`}
                        whileHover={isExporting ? undefined : { scale: 1.02 }}
                        whileTap={isExporting ? undefined : { scale: 0.98 }}>
                        {isActive && !isExporting && (
                          <motion.div layoutId="agent-glow" className="absolute inset-0 rounded-xl"
                            style={{ background: `radial-gradient(ellipse at 50% 100%, ${color.glow}, transparent 70%)` }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                        )}
                        <div className="relative flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? color.bg : 'bg-white/5'} border ${isActive ? color.border : 'border-white/[0.06]'}`}>
                            <Icon className={`w-4 h-4 ${isActive ? color.text : 'text-white/30'}`} />
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-white/50'}`}>{agent.name}</p>
                            <p className={`text-[10px] ${isActive ? color.text : 'text-white/25'}`}>{SUBTITLE_MAP[agent.name]}</p>
                          </div>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isActive ? `${color.bg} ${color.text} border ${color.border}` : 'bg-white/5 text-white/20'}`}>{badge}</span>
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
              <motion.div key={`agent-${activeAgent}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`p-6 rounded-2xl border relative overflow-hidden ${activeColor.bg} ${activeColor.border}`}>
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 80% 20%, ${activeColor.glow}, transparent 70%)` }} />
                <div className="relative space-y-5">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeColor.bg} border ${activeColor.border}`}
                      style={{ boxShadow: `0 0 25px ${activeColor.glow}` }}>
                      {(() => { const Icon = ICON_MAP[active?.icon] || Bot; return <Icon className={`w-7 h-7 ${activeColor.text}`} />; })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-xl font-bold ${activeColor.text}`}>{active?.name}</p>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${activeColor.bg} ${activeColor.text} border ${activeColor.border}`}>
                          {BADGE_MAP[active?.name] || 'NEW'}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs">{SUBTITLE_MAP[active?.name] || ''}</p>
                    </div>
                  </div>

                  {/* Capability */}
                  <div className="p-4 rounded-xl bg-black/20 border border-white/[0.05]">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${activeColor.text}`}>Capacidad principal</span>
                    <p className="text-white/60 text-sm mt-1.5 leading-relaxed">{active?.capability}</p>
                  </div>

                  {/* Use case */}
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${activeColor.bg} border ${activeColor.border}`}>
                    <TrendingUp className={`w-5 h-5 ${activeColor.text} shrink-0`} />
                    <p className={`text-sm font-semibold ${activeColor.text}`}>{active?.useCase}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Deep Research & Claude Code from DB */}
            {deepResearch && (
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-cyan-400 font-bold text-xs">{deepResearch.name}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {deepResearch.capabilities?.map((cap, i) => (
                    <span key={i} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400/80 text-[10px] rounded border border-cyan-500/20">{cap}</span>
                  ))}
                </div>
                <p className="text-white/35 text-[11px] italic">{deepResearch.insight}</p>
              </div>
            )}

            {claudeCode && (
              <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-pink-400" />
                  <h4 className="text-pink-400 font-bold text-xs">{claudeCode.name}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {claudeCode.capabilities?.map((cap, i) => (
                    <span key={i} className="px-2 py-0.5 bg-pink-500/10 text-pink-400/80 text-[10px] rounded border border-pink-500/20">{cap}</span>
                  ))}
                </div>
                <p className="text-white/35 text-[11px] italic">{claudeCode.role}</p>
              </div>
            )}

            {/* Shared insight */}
            <div className="p-3 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(6,182,212,0.08))' }}>
              <div className="absolute inset-0 rounded-xl border border-violet-500/20" />
              <div className="relative flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                <p className="text-violet-300/70 text-xs">Todos comparten un objetivo: <span className="text-violet-400 font-semibold">automatizar flujos de trabajo completos</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </S2Shell>
  );
}
