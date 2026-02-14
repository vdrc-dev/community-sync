import { motion } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';
import { useGeneration } from '@/contexts/GenerationContext';
import { Bot, Sparkles, ArrowRight, Calendar, BookOpen, Music, Wand2, Zap } from 'lucide-react';
import logoVdrc from '@/assets/logo-vdrc.png';
import { useSlideContent } from '@/hooks/useSlideContent';
import { S2_ACCENT, S2_THEME } from './theme';

/* ── HSL Accent System ── */
const ACCENT = { violet: S2_ACCENT.violet, pink: S2_ACCENT.pink, cyan: S2_ACCENT.cyan, emerald: S2_ACCENT.emerald };

const ICON_TRIO = [
  { icon: Bot, accent: ACCENT.violet },
  { icon: Zap, accent: ACCENT.cyan },
  { icon: Sparkles, accent: ACCENT.pink },
];

const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2.5,
  dur: 4 + Math.random() * 5,
  delay: Math.random() * 4,
  hue: [263, 330, 185][i % 3],
}));

export function S2Slide22Closing() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const { generationNumber, currentWeek } = useGeneration();
  const content = useSlideContent(21);

  const nextSession = content.nextSession || { title: 'Próxima Sesión', topic: 'Comunicación con IA' };
  const workflowSteps = content.workflowSteps;
  const closingData = content.closingContent || (content.closing as { paradigm?: string; role?: string; definition?: string; callToAction?: string } | undefined);

  const m = (delay: number, overrides?: object) =>
    isExporting ? {} : {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      ...overrides,
    };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-violet-500/30"
      style={{ background: S2_THEME.background }}>

      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(263_70%_45%_/_0.25),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(330_55%_45%_/_0.15),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_20%_50%,_hsl(185_60%_40%_/_0.06),_transparent_55%)]" />
        <div
          className="absolute inset-0"
          style={{
            opacity: S2_THEME.grid.opacity,
            backgroundImage: `radial-gradient(circle, ${S2_THEME.grid.dotColor} 0.5px, transparent 0.5px)`,
            backgroundSize: `${S2_THEME.grid.size} ${S2_THEME.grid.size}`,
          }}
        />
        <div className="absolute inset-0" style={{ opacity: S2_THEME.noise.opacity, backgroundImage: S2_THEME.noise.svg }} />
      </div>

      {/* ── Breathing orbs ── */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-[25%] left-[30%] w-[700px] h-[600px] rounded-full blur-[220px]"
            style={{ background: 'hsl(263 60% 45% / 0.12)' }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[25%] w-[550px] h-[500px] rounded-full blur-[180px]"
            style={{ background: 'hsl(330 55% 45% / 0.08)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          <motion.div
            className="absolute top-[10%] right-[40%] w-[400px] h-[350px] rounded-full blur-[160px]"
            style={{ background: 'hsl(185 60% 45% / 0.05)' }}
            animate={{ x: [0, 30, 0], opacity: [0.04, 0.1, 0.04] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
        </>
      )}

      {/* ── Floating particles ── */}
      {!isExporting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x, top: p.y, width: p.size, height: p.size,
                background: `hsl(${p.hue} 60% 65% / 0.5)`,
                boxShadow: `0 0 ${p.size * 4}px hsl(${p.hue} 60% 65% / 0.6)`,
              }}
              animate={{ y: [0, -(15 + Math.random() * 25), 0], opacity: [0.15, 0.6, 0.15], scale: [1, 1.3, 1] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* ── Light sweep ── */}
      {!isExporting && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, hsl(263 60% 55% / 0.03) 48%, hsl(330 55% 55% / 0.02) 52%, transparent 60%)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 8 }}
        />
      )}

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl px-16">

        {/* Logo */}
        <motion.div {...m(0)} className="mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full blur-3xl scale-[2.5]" style={{ background: 'hsl(263 60% 50% / 0.25)' }} />
            <img src={logoVdrc} alt="VDRC" className="relative h-16 w-auto" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div {...m(0.15)} className="text-center mb-10 relative">
          {!isExporting && (
            <div className="absolute -inset-x-40 -inset-y-10 rounded-full blur-[120px] pointer-events-none"
              style={{ background: 'hsl(263 55% 50% / 0.1)' }} />
          )}
          <h1 className="relative text-4xl 2xl:text-5xl font-black text-white mb-3">Bienvenidos a</h1>
          <h2 className="relative text-6xl 2xl:text-8xl font-black"
            style={{
              background: 'linear-gradient(135deg, hsl(263 65% 70%) 0%, hsl(330 60% 68%) 40%, hsl(185 65% 60%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 50px hsl(263 60% 50% / 0.5))',
            }}>
            la Era Agéntica
          </h2>
        </motion.div>

        {/* Icon trio */}
        <motion.div {...m(0.3)} className="flex items-center gap-4 mb-10">
          {ICON_TRIO.map(({ icon: Icon, accent }, i) => (
            <motion.div key={i}
              {...(isExporting ? {} : { initial: { scale: 0, rotate: -20 }, animate: { scale: 1, rotate: 0 }, transition: { delay: 0.5 + i * 0.12, type: 'spring', stiffness: 200 } })}
              className="w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-sm"
              style={{
                background: accent.bg,
                borderColor: accent.border,
                boxShadow: `0 0 24px ${accent.glow}`,
              }}>
              <Icon className="w-7 h-7" style={{ color: accent.text }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-2 gap-6 w-full">

          {/* Next session card */}
          <motion.div {...m(0.45)} className="relative">
            <div className="absolute -inset-1 rounded-2xl blur-xl"
              style={{ background: ACCENT.violet.glow }} />
            <div className="relative p-5 rounded-2xl border backdrop-blur-sm"
              style={{ background: 'hsl(0 0% 100% / 0.02)', borderColor: ACCENT.violet.border }}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4" style={{ color: ACCENT.violet.text }} />
                <span className="font-bold uppercase tracking-wider text-xs" style={{ color: ACCENT.violet.text }}>{nextSession.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                  style={{ background: ACCENT.violet.bg, borderColor: ACCENT.violet.border }}>
                  <BookOpen className="w-4 h-4" style={{ color: ACCENT.violet.text }} />
                  <span className="text-white/70 text-sm font-medium">{nextSession.topic}</span>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0" style={{ color: 'hsl(263 50% 55% / 0.4)' }} />
                <span className="text-white/35 text-xs">Gamma, Manus, Cursor</span>
              </div>

              {/* Workflow steps */}
              {workflowSteps && workflowSteps.length > 0 && (
                <div className="mt-4 pt-3" style={{ borderTop: '1px solid hsl(0 0% 100% / 0.05)' }}>
                  <span className="text-[10px] text-white/25 font-bold uppercase tracking-wider">Workflow</span>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {workflowSteps.map((step: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="px-2 py-1 rounded-lg text-[10px] border"
                          style={{ background: ACCENT.violet.bg, borderColor: ACCENT.violet.border, color: ACCENT.violet.text }}>
                          {step}
                        </span>
                        {i < workflowSteps.length - 1 && <ArrowRight className="w-3 h-3" style={{ color: 'hsl(263 50% 55% / 0.2)' }} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Closing paradigm card */}
          {closingData && typeof closingData === 'object' ? (
            <motion.div {...m(0.55)} className="relative">
              <div className="absolute -inset-1 rounded-2xl blur-xl" style={{ background: ACCENT.pink.glow }} />
              <div className="relative p-5 rounded-2xl border backdrop-blur-sm"
                style={{ background: 'hsl(0 0% 100% / 0.02)', borderColor: ACCENT.pink.border }}>
                <div className="flex items-center gap-2 mb-3">
                  <Music className="w-4 h-4" style={{ color: ACCENT.pink.text }} />
                  <span className="font-bold text-sm" style={{ color: ACCENT.pink.text }}>{closingData.role}</span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-3">{closingData.definition}</p>
                {closingData.paradigm && (
                  <p className="text-white/30 text-xs italic mb-3">"{closingData.paradigm}"</p>
                )}
                {closingData.callToAction && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl border"
                    style={{ background: ACCENT.emerald.bg, borderColor: ACCENT.emerald.border }}>
                    <Wand2 className="w-4 h-4 shrink-0" style={{ color: ACCENT.emerald.text }} />
                    <p className="text-xs font-medium" style={{ color: ACCENT.emerald.text }}>{closingData.callToAction}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div {...m(0.55)} className="relative">
              <div className="absolute -inset-1 rounded-2xl blur-xl" style={{ background: ACCENT.pink.glow }} />
              <div className="relative p-5 rounded-2xl border backdrop-blur-sm flex flex-col items-center justify-center text-center"
                style={{ background: 'hsl(0 0% 100% / 0.02)', borderColor: ACCENT.pink.border }}>
                <Music className="w-8 h-8 mb-3" style={{ color: ACCENT.pink.text }} />
                <p className="text-white/50 text-sm font-semibold">Tu rol es el director, no el músico</p>
                <p className="text-white/25 text-xs mt-2">La productividad ya no es hacer más rápido, sino delegar lo complejo</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Pulsing CTA */}
        <motion.div {...m(0.7)} className="mt-8">
          <motion.div
            className="px-8 py-3 rounded-full border"
            style={{
              background: 'linear-gradient(135deg, hsl(263 55% 50% / 0.12), hsl(330 50% 50% / 0.08), hsl(185 60% 50% / 0.06))',
              borderColor: 'hsl(263 55% 50% / 0.25)',
            }}
            {...(isExporting ? {} : {
              animate: { boxShadow: ['0 0 0 0 hsl(263 60% 55% / 0)', '0 0 35px 0 hsl(263 60% 55% / 0.3)', '0 0 0 0 hsl(263 60% 55% / 0)'] },
              transition: { duration: 2.8, repeat: Infinity },
            })}>
            <span className="text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg, hsl(263 65% 72%), hsl(330 60% 68%), hsl(185 65% 62%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              ✨ Nos vemos la próxima sesión
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer info */}
      <motion.div {...m(0.85)} className="absolute bottom-14 flex flex-col items-center gap-2 text-center z-10">
        <div className="h-px w-32" style={{ background: 'linear-gradient(90deg, transparent, hsl(263 55% 55% / 0.4), transparent)' }} />
        <p className="text-white/22 text-xs font-medium uppercase tracking-widest">
          Generación {generationNumber} • Sesión {currentWeek} de 4 • 2026
        </p>
      </motion.div>

      {/* ── Bottom bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{
          background: 'linear-gradient(90deg, transparent, hsl(263 55% 50% / 0.18), hsl(330 50% 50% / 0.12), transparent)',
        }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium text-white/08 tracking-wider">CIERRE</span>
          <span className="text-[11px] font-bold text-white/12 tabular-nums tracking-widest">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : '29 / 37'}</span>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
