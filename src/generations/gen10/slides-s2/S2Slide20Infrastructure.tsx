import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { Plug, Database, Lightbulb, ZoomIn, X, ArrowRight } from 'lucide-react';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S2Shell, useS2Motion } from './shared';

const MCP_CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10-s2/concept-mcp-protocol.jpg';
const CEAAS_CLOUD_URL = 'https://htobjuxqrzifdvofselb.supabase.co/storage/v1/object/public/presentation-assets/gen10-s2/concept-ceaas-service.jpg';

type InfraTab = 'mcp' | 'ceaas';

const TAB_COLORS: Record<InfraTab, { text: string; bg: string; border: string; glow: string; solid: string }> = {
  mcp:   { text: 'text-cyan-400',  bg: 'bg-cyan-500/10',  border: 'border-cyan-500/30',  glow: 'rgba(6,182,212,0.25)',  solid: '#06b6d4' },
  ceaas: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', glow: 'rgba(245,158,11,0.25)', solid: '#f59e0b' },
};

export function S2Slide20Infrastructure() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(19);
  const [activeTab, setActiveTab] = useState<InfraTab>('mcp');
  const [lightbox, setLightbox] = useState(false);

  const mcpImageUrl = (content.mcpImageUrl as string) || MCP_CLOUD_URL;
  const ceaasImageUrl = (content.ceaasImageUrl as string) || CEAAS_CLOUD_URL;

  const mcp = content.mcp || {
    name: 'MCP', fullName: 'Model Context Protocol', analogy: 'El USB-C para la IA',
    definition: 'Un estándar universal que permite a la IA conectarse directamente a tus herramientas de trabajo: tu correo, tu CRM, tus archivos en Drive, tu base de datos — todo desde un solo punto de acceso.',
    examples: ['CRM', 'Salesforce', 'HubSpot', 'PostgreSQL'],
  };

  const ceaas = content.ceaas || {
    name: 'CEaaS', fullName: 'Context Engine as a Service',
    definition: 'La memoria a largo plazo de la IA. Permite que tus agentes recuerden quién eres, qué hiciste antes y cómo te gusta trabajar, incluso entre conversaciones distintas.',
    examples: ['Claude Projects', 'Custom GPTs', 'Gemini Gems'],
  };

  const insight = content.insight || 'MCP convierte a la IA de consultor externo a empleado con acceso al sistema';

  const m = useS2Motion();

  const activeColor = TAB_COLORS[activeTab];
  const activeData = activeTab === 'mcp' ? mcp : ceaas;
  const activeAnalogy = activeTab === 'mcp' ? (mcp as any).analogy : undefined;
  const activeImg = activeTab === 'mcp' ? mcpImageUrl : ceaasImageUrl;
  const ActiveTabIcon = activeTab === 'mcp' ? Plug : Database;

  return (
    <S2Shell
      footerLabel="INFRAESTRUCTURA AGÉNTICA"
      className="flex flex-col justify-center px-16 2xl:px-20"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(263_70%_45%_/_0.18),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(185_55%_45%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_15%_50%,_hsl(38_60%_40%_/_0.06),_transparent_55%)]" />
        {!isExporting && (
          <>
            <motion.div className="absolute top-[25%] left-[35%] w-[600px] h-[500px] rounded-full blur-[200px]"
              key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 0.35, scale: [1, 1.15, 1] }}
              transition={{ opacity: { duration: 0.4 }, scale: { duration: 8, repeat: Infinity } }}
              style={{ background: `radial-gradient(circle, ${activeColor.glow}, transparent 70%)` }} />
            <motion.div className="absolute bottom-[20%] right-[25%] w-[450px] h-[400px] rounded-full blur-[160px]"
              style={{ background: 'hsl(38 55% 45% / 0.06)' }}
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.15, 0.06] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
          </>
        )}
      </>}
    >

      <div className="relative z-10 flex flex-col h-full justify-center max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-amber-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Capa de conexión</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Infraestructura <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">Agéntica</span>
          </h1>
          <p className="text-base text-white/55 mt-3 leading-relaxed max-w-[600px]">Los protocolos que conectan a los agentes con el mundo real</p>
        </motion.div>

        {/* Tab selector */}
        <motion.div {...m(0.1)} className="flex gap-3 mb-6">
          {(['mcp', 'ceaas'] as InfraTab[]).map((tab) => {
            const color = TAB_COLORS[tab];
            const isActive = activeTab === tab;
            const Icon = tab === 'mcp' ? Plug : Database;
            const label = tab === 'mcp' ? 'MCP' : 'CEaaS';
            const sub = tab === 'mcp' ? 'Model Context Protocol' : 'Context Engine as a Service';
            return (
              <motion.button key={tab} onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 ${isActive ? `${color.bg} ${color.border}` : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'}`}
                whileHover={isExporting ? undefined : { scale: 1.02 }}
                whileTap={isExporting ? undefined : { scale: 0.98 }}>
                {isActive && !isExporting && (
                  <motion.div layoutId="infra-glow" className="absolute inset-0 rounded-xl"
                    style={{ background: `radial-gradient(ellipse at 20% 50%, ${color.glow}, transparent 70%)` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
                <div className="relative flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isActive ? `${color.bg} ${color.border}` : 'bg-white/5 border-white/[0.06]'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? color.text : 'text-white/25'}`} />
                  </div>
                  <div className="text-left">
                    <p className={`font-bold text-sm ${isActive ? 'text-white' : 'text-white/50'}`}>{label}</p>
                    <p className={`text-[10px] ${isActive ? 'text-white/40' : 'text-white/20'}`}>{sub}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-[1.2fr_1fr] gap-8 items-start">
          {/* LEFT: Image */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}>
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] group cursor-pointer"
                style={{ boxShadow: `0 0 60px ${activeColor.glow}, 0 0 120px ${activeColor.glow.replace('0.25', '0.08')}` }}
                onClick={() => setLightbox(true)}>
                <img src={activeImg} alt={activeData.name} className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/20 to-transparent" />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
                    <ZoomIn className="w-4 h-4 text-white/80" />
                    <span className="text-white/80 text-xs font-medium">Click para ampliar</span>
                  </div>
                </div>
                {/* Bottom label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md bg-black/50 border ${activeColor.border}`}>
                    <ActiveTabIcon className={`w-4 h-4 ${activeColor.text}`} />
                    <span className={`text-xs font-bold ${activeColor.text}`}>{activeData.name}</span>
                    {activeTab === 'mcp' && activeAnalogy && (
                      <>
                        <span className="text-white/20">—</span>
                        <span className="text-white/50 text-xs">{activeAnalogy}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: Detail panel */}
          <motion.div {...m(0.25)} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`p-6 rounded-2xl border relative overflow-hidden ${activeColor.bg} ${activeColor.border}`}>
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 80% 20%, ${activeColor.glow}, transparent 70%)` }} />
                <div className="relative space-y-5">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeColor.bg} border ${activeColor.border}`}
                      style={{ boxShadow: `0 0 25px ${activeColor.glow}` }}>
                      <ActiveTabIcon className={`w-7 h-7 ${activeColor.text}`} />
                    </div>
                    <div>
                      <p className={`text-xl font-bold ${activeColor.text}`}>{activeData.name}</p>
                      <p className="text-white/40 text-xs">{activeData.fullName}</p>
                    </div>
                  </div>

                  {/* Definition */}
                  <div className="p-4 rounded-xl bg-black/20 border border-white/[0.05]">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${activeColor.text}`}>¿Qué es?</span>
                    <p className="text-white/60 text-sm mt-1.5 leading-relaxed">{activeData.definition}</p>
                  </div>

                  {/* Examples */}
                  <div>
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Implementaciones</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(activeData.examples || []).map((ex: string, j: number) => (
                        <span key={j} className={`px-3 py-1.5 rounded-lg text-xs border ${activeColor.bg} ${activeColor.border} ${activeColor.text}`}>
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Analogy for MCP */}
                  {activeTab === 'mcp' && activeAnalogy && (
                    <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Analogía</span>
                      <p className="text-white/50 text-sm mt-1 italic">"{activeAnalogy}"</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Connection insight */}
            <div className="p-3 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.06), rgba(245,158,11,0.08))' }}>
              <div className="absolute inset-0 rounded-xl border border-violet-500/20" />
              <div className="relative flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <p className="text-violet-300/70 text-xs leading-relaxed">{insight}</p>
              </div>
            </div>

            {/* How they connect */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Cómo se conectan</span>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Plug className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 text-xs font-bold">MCP</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20" />
                <div className="flex-1 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-center">
                  <span className="text-violet-400 text-xs font-bold">Agente IA</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Database className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 text-xs font-bold">CEaaS</span>
                </div>
              </div>
              <p className="text-white/30 text-[10px] mt-2 text-center">Acceso a datos + Memoria persistente = Agente completo</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && !isExporting && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(false)}>
          <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}
            src={activeImg} alt={activeData.name} className="max-w-full max-h-full rounded-2xl shadow-2xl" />
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(false)}>
            <X className="w-5 h-5 text-white/80" />
          </button>
        </motion.div>
      )}
    </S2Shell>
  );
}
