import { motion } from 'framer-motion';
import { Rocket, BarChart3, Terminal, Database, Code2, BookOpen, Video, Presentation, ArrowRight, Palette, Zap, CheckCircle2, Sparkles, Star, TrendingUp, Trophy } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';
import bgClosing from '@/assets/gen10-s3/bg-closing-mission.jpg';

const TOOLS_LEARNED = [
  { icon: BarChart3, name: 'Canvas', what: 'Datos → Visual', accent: S3_ACCENT.cyan },
  { icon: BookOpen, name: 'NotebookLM', what: 'PDFs → Audio', accent: S3_ACCENT.cyan },
  { icon: Presentation, name: 'Gamma', what: 'Texto → Slides', accent: S3_ACCENT.violet },
  { icon: Terminal, name: 'Claude Code', what: 'Desktop AI', accent: S3_ACCENT.violet },
  { icon: Database, name: 'CRM+MCP', what: 'Datos live', accent: S3_ACCENT.amber },
  { icon: Code2, name: 'Cursor', what: 'IDE + AI', accent: S3_ACCENT.amber },
  { icon: Video, name: 'Krea.ai', what: 'Img → Video', accent: S3_ACCENT.rose },
  { icon: Palette, name: 'Coolors', what: 'Paletas', accent: S3_ACCENT.rose },
];

const MISSIONS = [
  {
    task: 'Dashboard con datos reales',
    detail: 'Sube tu CSV a Canvas → exporta HTML',
    icon: BarChart3,
    accent: S3_ACCENT.cyan,
    difficulty: 'Fácil',
    time: '~15 min',
  },
  {
    task: 'Claude Desktop + 2 Skills',
    detail: 'Instala Brand Theme + Excel Controller',
    icon: Terminal,
    accent: S3_ACCENT.violet,
    difficulty: 'Medio',
    time: '~20 min',
  },
  {
    task: 'MCP en acción o Video AI',
    detail: 'Conecta tu CRM vía MCP o genera un clip en Krea',
    icon: Zap,
    accent: S3_ACCENT.amber,
    difficulty: 'Desafío',
    time: '~30 min',
  },
];

const WEEK_STATS = [
  { num: '8+', label: 'herramientas' },
  { num: '5', label: 'workflows' },
  { num: '3', label: 'frameworks' },
];

export function S3Slide12Closing() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Layered background */}
      <div className="absolute inset-0">
        <img src={bgClosing} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(150_60%_50%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(185_70%_50%_/_0.06),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_10%,_hsl(263_60%_55%_/_0.05),_transparent_50%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={20} primaryHue={150} secondaryHue={185} tertiaryHue={263} />
      </div>

      {/* Animated corner accents */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
            style={{ background: 'conic-gradient(from 180deg at 0% 0%, hsl(160 65% 50% / 0.08), transparent 25%)' }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
            style={{ background: 'conic-gradient(from 0deg at 100% 100%, hsl(263 60% 55% / 0.06), transparent 25%)' }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <motion.div {...m(0)} className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-10 rounded-full" style={{ background: `linear-gradient(180deg, ${S3_ACCENT.emerald.text}, ${S3_ACCENT.cyan.text})` }} />
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/35">Cierre · Semana 3</span>
                <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight leading-none">
                  La diferencia es la{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, hsl(160 65% 55%), hsl(185 70% 60%), hsl(263 60% 65%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    acción
                  </span>
                </h1>
              </div>
            </motion.div>
          </div>

          {/* Achievement badge + Stats pills */}
          <motion.div {...m(0.1)} className="flex items-center gap-3">
            {/* Achievement badge */}
            <motion.div
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border overflow-hidden"
              style={{ borderColor: 'hsl(160 65% 45% / 0.3)', background: 'hsl(160 65% 45% / 0.08)' }}
              {...(isExporting ? {} : { whileHover: { scale: 1.04 } })}
            >
              {!isExporting && (
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(160 65% 60% / 0.1) 50%, transparent 65%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />
              )}
              <Trophy className="w-4 h-4 relative" style={{ color: S3_ACCENT.emerald.text }} />
              <span className="text-[10px] font-bold tracking-wider uppercase relative" style={{ color: S3_ACCENT.emerald.text }}>75% completado</span>
            </motion.div>
            <div className="w-px h-6" style={{ background: 'hsl(0 0% 100% / 0.06)' }} />
            {WEEK_STATS.map((s, i) => (
              <motion.div key={i} {...m(0.12 + i * 0.04)} className="text-center px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <p className="text-xl font-black" style={{ color: S3_ACCENT.emerald.text }}>{s.num}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Main content: 2 columns */}
        <div className="grid grid-cols-5 gap-6">
          {/* Left: Tools mastered - 2 cols */}
          <motion.div {...m(0.15)} className="col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-400/60" />
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Tu Arsenal</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TOOLS_LEARNED.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={i}
                    {...(isExporting ? {} : {
                      initial: { opacity: 0, scale: 0.8 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: 0.2 + i * 0.04, type: 'spring', stiffness: 200 },
                    })}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border group"
                    style={{ borderColor: tool.accent.border, background: tool.accent.bg }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${tool.accent.text}15`, border: `1px solid ${tool.accent.text}20` }}>
                      <Icon className="w-4 h-4" style={{ color: tool.accent.text }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white/70 leading-tight">{tool.name}</p>
                      <p className="text-[10px] text-white/40 leading-tight">{tool.what}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Missions + CTA - 3 cols */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Missions */}
            <motion.div {...m(0.25)} className="flex-1 rounded-2xl border p-5"
              style={{ borderColor: 'hsl(160 40% 25% / 0.3)', background: 'hsl(160 30% 8% / 0.5)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-4 h-4" style={{ color: S3_ACCENT.emerald.text }} />
                <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Misiones esta semana</span>
                <span className="ml-auto text-[10px] text-white/35 font-medium">Elige al menos 1</span>
              </div>

              <div className="space-y-2.5">
                {MISSIONS.map((mission, i) => {
                  const Icon = mission.icon;
                  return (
                    <motion.div
                      key={i}
                      {...m(0.3 + i * 0.06)}
                      className="relative flex items-center gap-4 px-4 py-3.5 rounded-xl border overflow-hidden"
                      style={{ borderColor: mission.accent.border, background: mission.accent.bg }}
                    >
                      {/* Shimmer */}
                      {!isExporting && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 70% 60% / 0.08) 50%, transparent 65%)' }}
                          animate={{ x: ['-150%', '250%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.8 }}
                        />
                      )}

                      {/* Number */}
                      <div className="relative w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${mission.accent.text}15`, border: `1px solid ${mission.accent.text}25` }}>
                        <span className="text-sm font-black" style={{ color: mission.accent.text }}>{i + 1}</span>
                      </div>

                      <div className="relative flex-1 min-w-0">
                        <p className="text-sm font-bold text-white/70">{mission.task}</p>
                        <p className="text-[10px] text-white/35 mt-0.5">{mission.detail}</p>
                      </div>

                      <div className="relative flex items-center gap-2 shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded-full border font-bold"
                          style={{ borderColor: `${mission.accent.text}25`, color: `${mission.accent.text}90`, background: `${mission.accent.text}08` }}>
                          {mission.difficulty}
                        </span>
                        <span className="text-[10px] text-white/35 font-mono">{mission.time}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bottom row: CTA + Tip */}
            <div className="grid grid-cols-2 gap-4">
              {/* Next week CTA */}
              <motion.div
                {...m(0.5)}
                className="relative overflow-hidden flex items-center gap-3 px-5 py-4 rounded-xl border"
                style={{
                  borderColor: S3_ACCENT.cyan.border,
                  background: S3_ACCENT.cyan.bg,
                  boxShadow: isExporting ? undefined : `0 0 40px ${S3_ACCENT.cyan.glow}, 0 0 60px hsl(185 70% 50% / 0.1)`,
                }}
              >
                {!isExporting && (
                  <>
                    <motion.div
                      className="absolute -inset-4 rounded-2xl pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at center, hsl(185 70% 60% / 0.15), transparent 72%)', filter: 'blur(15px)' }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 60% 70% / 0.08) 50%, transparent 65%)' }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                    />
                  </>
                )}
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Próxima Semana</p>
                  <p className="text-sm font-bold text-white leading-tight mt-0.5">
                    S4: <span style={{ color: S3_ACCENT.cyan.text }}>VibeCoding</span>
                  </p>
                  <p className="text-[10px] text-white/35 mt-0.5">Tu primera app en 90 min</p>
                </div>
                <motion.div className="relative z-10" {...(isExporting ? {} : { animate: { x: [0, 5, 0] }, transition: { duration: 1.5, repeat: Infinity } })}>
                  <ArrowRight className="w-5 h-5" style={{ color: `${S3_ACCENT.cyan.text}70` }} />
                </motion.div>
              </motion.div>

              {/* Key takeaway */}
              <motion.div {...m(0.55)} className="relative overflow-hidden flex items-start gap-3 px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02]"
                {...(isExporting ? {} : { whileHover: { borderColor: 'hsl(160 65% 45% / 0.2)', scale: 1.01 } })}>
                {!isExporting && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(160 65% 60% / 0.06) 50%, transparent 65%)' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }} />
                )}
                <TrendingUp className="w-5 h-5 text-emerald-400/50 shrink-0 mt-0.5 relative" />
                <div className="relative">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Key Takeaway</p>
                  <p className="text-xs text-white/45 leading-relaxed">
                    No necesitas dominar <span className="text-white/70 font-semibold">todas</span> las herramientas.
                    Domina <span style={{ color: S3_ACCENT.emerald.text }} className="font-bold">2-3</span> que resuelvan <span className="text-white/70 font-semibold">tu</span> problema.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <S3Footer sectionLabel="CIERRE" hue={150} contextHint="próximos pasos accionables" />
    </div>
  );
}
