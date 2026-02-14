import { motion } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { User, Brain, Bot, Lightbulb, Zap, ChevronRight } from 'lucide-react';
import metapromptBg from '@/assets/clase02/slide06-metaprompt-bg.png';
import { S2_THEME } from './theme';

/* ── Pipeline node config ──────────────────────── */

const NODES = [
  {
    num: 1,
    label: 'Idea Vaga',
    actor: 'Humano',
    icon: User,
    subtitle: 'Tu idea, sin estructura',
    example: '"Necesito lanzar mi producto en Chile"',
    exLabel: 'LO QUE ESCRIBES',
    border: 'border-slate-400/25',
    bg: 'from-slate-500/15 via-slate-600/8 to-transparent',
    text: 'text-slate-300',
    accent: '#94a3b8',
    iconBg: 'bg-slate-500/15 border-slate-400/30',
  },
  {
    num: 2,
    label: 'Thinking Model',
    actor: 'Claude 4.6 · o3',
    icon: Brain,
    subtitle: 'Estructura el Prompt Perfecto',
    example: '"Actúa como consultor go-to-market B2B LATAM. Plan 90 días, métricas, presupuesto $5K/mes…"',
    exLabel: 'LO QUE GENERA',
    border: 'border-amber-500/30',
    bg: 'from-amber-500/12 via-orange-600/6 to-transparent',
    text: 'text-amber-400',
    accent: '#f59e0b',
    iconBg: 'bg-amber-500/15 border-amber-500/30',
  },
  {
    num: 3,
    label: 'Agente Ejecutor',
    actor: 'Manus · Operator',
    icon: Bot,
    subtitle: 'Ejecuta y Entrega',
    example: '"Analiza 50 competidores, crea pitch deck 15 slides, redacta 3 emails de outreach personalizados"',
    exLabel: 'LO QUE EJECUTA',
    border: 'border-violet-500/30',
    bg: 'from-violet-500/12 via-purple-600/6 to-transparent',
    text: 'text-violet-400',
    accent: '#8b5cf6',
    iconBg: 'bg-violet-500/15 border-violet-500/30',
  },
] as const;

/* ── Animated SVG Arrow ────────────────────────── */

function FlowArrow({ color, delay, isExporting }: { color: string; delay: number; isExporting: boolean }) {
  return (
    <div className="flex items-center justify-center w-16 shrink-0 relative">
      <svg width="64" height="40" viewBox="0 0 64 40" fill="none" className="overflow-visible">
        {/* Glow line */}
        <motion.line
          x1="4" y1="20" x2="48" y2="20"
          stroke={color}
          strokeWidth="2"
          strokeOpacity="0.4"
          {...(isExporting ? {} : {
            initial: { pathLength: 0 },
            animate: { pathLength: 1 },
            transition: { delay: delay + 0.3, duration: 0.6 },
          })}
        />
        {/* Arrow head */}
        <motion.polygon
          points="46,12 60,20 46,28"
          fill={color}
          fillOpacity="0.5"
          {...(isExporting ? {} : {
            initial: { opacity: 0, x: -8 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: delay + 0.6, duration: 0.3 },
          })}
        />
        {/* Pulse dot traveling */}
        {!isExporting && (
          <motion.circle
            r="3"
            fill={color}
            fillOpacity="0.8"
            animate={{ cx: [4, 52], cy: [20, 20], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: delay + 1, ease: 'easeInOut' }}
          />
        )}
      </svg>
    </div>
  );
}

/* ── Main Component ────────────────────────────── */

export function S2Slide16PromptEngineering() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const content = useSlideContent(15);

  const title = content.title || 'El Meta-Prompt: IA gestionando a la IA';
  const caseStudy = content.caseStudy || {
    before: 'Ayúdame a buscar trabajo',
    after: 'Analiza 200 ofertas en LinkedIn, filtra por mi perfil, genera 3 CVs personalizados y redacta emails de postulación',
  };
  const insight = content.insight || 'Ya no escribes prompts — escribes intenciones. Una IA las traduce en instrucciones perfectas para otra IA.';

  const m = (delay: number) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden font-sans selection:bg-violet-500/30"
      style={{ background: S2_THEME.background }}>

      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Reference image as atmospheric backdrop */}
        <img
          src={metapromptBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
        />
        {/* Dark overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a] via-[#04030a]/70 to-[#04030a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04030a]/80 via-transparent to-[#04030a]/80" />
        {/* HSL atmospheric gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(38_65%_45%_/_0.12),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(263_60%_45%_/_0.1),_transparent_65%)]" />
        {/* Ambient orbs */}
        {!isExporting && (
          <>
            <motion.div
              className="absolute top-[20%] left-[15%] w-[500px] h-[400px] rounded-full blur-[180px]"
              style={{ background: 'hsl(38 60% 45% / 0.06)' }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-[15%] right-[10%] w-[450px] h-[350px] rounded-full blur-[160px]"
              style={{ background: 'hsl(263 55% 45% / 0.07)' }}
              animate={{ scale: [1.08, 1, 1.08], opacity: [0.07, 0.14, 0.07] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
        {isExporting && (
          <>
            <div className="absolute top-[20%] left-[15%] w-[500px] h-[400px] rounded-full blur-[180px]" style={{ background: 'hsl(38 60% 45% / 0.06)' }} />
            <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[350px] rounded-full blur-[160px]" style={{ background: 'hsl(263 55% 45% / 0.07)' }} />
          </>
        )}
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
      </div>

      <div className="relative z-10 flex flex-col h-full min-h-screen px-16 py-10 justify-between max-w-[1600px] mx-auto w-full">

        {/* ── Header ── */}
        <motion.header {...m(0)} className="shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-9 rounded-full" style={{ background: 'linear-gradient(to bottom, #f59e0b, #8b5cf6)' }} />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40">Ingeniería de Prompts 2.0</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight leading-[1.08]">
            El <span style={{
              background: 'linear-gradient(135deg, hsl(38 85% 65%), hsl(263 60% 75%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Meta-Prompt</span>
          </h1>
          <p className="text-base text-white/55 mt-2 leading-relaxed max-w-[700px]">
            IA gestionando a la IA: delega la complejidad del prompting
          </p>
        </motion.header>

        {/* ── Visual Pipeline Diagram ── */}
        <motion.div {...m(0.1)} className="flex-1 flex items-center justify-center min-h-0">
          <div className="flex items-stretch w-full">
            {NODES.map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={node.num} className="flex items-stretch flex-1 min-w-0">
                  {/* Node Card */}
                  <motion.div
                    {...m(0.15 + i * 0.12)}
                    className={`flex-1 rounded-2xl border ${node.border} bg-gradient-to-b ${node.bg} backdrop-blur-sm relative overflow-hidden flex flex-col`}
                  >
                    {/* Top accent line */}
                    <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${node.accent}60, transparent)` }} />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Icon + Number hero */}
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className={`w-14 h-14 rounded-2xl ${node.iconBg} border flex items-center justify-center relative`}
                          {...(isExporting ? {} : {
                            animate: { boxShadow: [`0 0 0px ${node.accent}00`, `0 0 20px ${node.accent}25`, `0 0 0px ${node.accent}00`] },
                            transition: { duration: 3, repeat: Infinity, delay: i * 0.5 },
                          })}
                        >
                          <Icon className={`w-7 h-7 ${node.text}`} strokeWidth={1.5} />
                          {/* Number badge */}
                          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#0d0c18] border flex items-center justify-center"
                            style={{ borderColor: `${node.accent}50` }}
                          >
                            <span className={`text-[10px] font-black ${node.text}`}>{node.num}</span>
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight">{node.label}</h3>
                          <span className={`text-[11px] font-mono ${node.text}`}>{node.actor}</span>
                        </div>
                      </div>

                      {/* Subtitle */}
                      {node.subtitle && (
                        <p className="text-white/50 text-sm leading-relaxed mb-3">{node.subtitle}</p>
                      )}

                      {/* Example block */}
                      <div className={`mt-auto p-3.5 rounded-xl bg-black/30 border ${node.border} relative`}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.accent }} />
                          <span className={`text-[9px] font-bold tracking-[0.15em] ${node.text}`}>{node.exLabel}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${i === 0 ? 'text-white/55 italic' : `${node.text}`}`}>
                          {node.example}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Animated Arrow */}
                  {i < NODES.length - 1 && (
                    <FlowArrow color={NODES[i + 1].accent} delay={i * 0.3} isExporting={isExporting} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Bottom: Case Study + Insight ── */}
        <motion.div {...m(0.5)} className="grid grid-cols-[1.5fr_1fr] gap-4 shrink-0">
          {/* Before → After */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.07] p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.02] via-transparent to-emerald-500/[0.02]" />
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-red-400 to-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">Caso Real — Resultado Final</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 p-3 rounded-lg bg-white/[0.02] border border-red-500/15">
                  <span className="text-[9px] text-red-400/70 font-bold uppercase tracking-wider">❌ Input humano</span>
                  <p className="text-white/45 text-xs mt-1 leading-relaxed">"{caseStudy.before}"</p>
                </div>
                <motion.div
                  className="shrink-0"
                  {...(isExporting ? {} : { animate: { x: [0, 4, 0] }, transition: { duration: 1.8, repeat: Infinity } })}
                >
                  <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-amber-400/50" />
                  </div>
                </motion.div>
                <div className="flex-[1.8] p-3 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/15">
                  <span className="text-[9px] text-emerald-400/70 font-bold uppercase tracking-wider">✓ Output agéntico</span>
                  <p className="text-emerald-300/80 text-xs mt-1 leading-relaxed line-clamp-2">"{caseStudy.after}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="rounded-xl relative overflow-hidden p-4 flex flex-col justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.04), rgba(139,92,246,0.06))' }}
          >
            <div className="absolute inset-0 rounded-xl border border-amber-500/10" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 text-amber-400/80" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/70">La Nueva Realidad</span>
              </div>
              <p className="text-amber-200/70 text-sm leading-relaxed pl-10">{insight}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">META-PROMPTING</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '23 / 37'}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
