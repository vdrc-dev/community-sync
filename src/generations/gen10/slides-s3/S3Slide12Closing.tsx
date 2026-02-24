import { motion } from 'framer-motion';
import { Rocket, BarChart3, Terminal, Database, Code2, BookOpen, Video, Presentation, ArrowRight, Palette, Zap, Star, TrendingUp, Trophy } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientTextMulti } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS_LEARNED = [
  { icon: Palette, name: 'Canva', what: 'Diseño visual', accent: S3_ACCENT.cyan },
  { icon: BookOpen, name: 'NotebookLM', what: 'PDFs → Audio', accent: S3_ACCENT.cyan },
  { icon: Terminal, name: 'Claude Code', what: 'Desktop AI', accent: S3_ACCENT.violet },
  { icon: Terminal, name: 'Skills', what: 'PDF/PPTX/Theme', accent: S3_ACCENT.violet },
  { icon: Presentation, name: 'Gamma', what: 'Texto → Slides', accent: S3_ACCENT.violet },
  { icon: Video, name: 'Krea.ai', what: 'Img → Video', accent: S3_ACCENT.violet },
  { icon: Zap, name: 'Automatización', what: 'Manual → Auto', accent: S3_ACCENT.violet },
  { icon: Database, name: 'CRM+MCP', what: 'Datos live', accent: S3_ACCENT.amber },
  { icon: Code2, name: 'Cursor', what: 'IDE + AI', accent: S3_ACCENT.amber },
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
    detail: 'Instala PDF Skill + PPTX Skill',
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
  { num: '10+', label: 'herramientas', hue: 185 },
  { num: '5', label: 'workflows', hue: 160 },
  { num: '3', label: 'frameworks', hue: 263 },
];

export function S3Slide12Closing() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      {/* Layered background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(150_60%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(185_70%_50%_/_0.08),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_10%,_hsl(263_60%_55%_/_0.06),_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere
          isExporting={isExporting}
          particleCount={12}
          primaryHue={150}
          secondaryHue={185}
          tertiaryHue={263}
          showAurora
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header with epic gradient title */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <motion.div {...me(0)} className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-12 rounded-full" style={{ background: `linear-gradient(180deg, ${S3_ACCENT.emerald.text}, ${S3_ACCENT.cyan.text})` }} />
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Cierre · Semana 3</span>
                <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight leading-none">
                  La diferencia es la{' '}
                  <span style={s3GradientTextMulti([160, 185, 263], 160)}>
                    acción
                  </span>
                </h1>
              </div>
            </motion.div>
          </div>

          {/* Achievement badge + Stats pills */}
          <motion.div {...me(0.08)} className="flex items-center gap-3">
            {/* Achievement badge with celebration glow */}
            <motion.div
              className="relative flex items-center gap-2.5 px-5 py-3 rounded-xl border overflow-hidden"
              style={{ borderColor: 'hsl(330 70% 60% / 0.25)', background: 'linear-gradient(135deg, hsl(185 70% 55% / 0.12), hsl(263 60% 60% / 0.1), hsl(330 70% 60% / 0.1))' }}
              {...(isExporting ? {} : { whileHover: { scale: 1.04, boxShadow: '0 0 30px hsl(160 65% 50% / 0.2)' } })}
            >
              {!isExporting && (
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(330 70% 65% / 0.12) 50%, transparent 65%)' }}
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />
              )}
              <Trophy className="w-5 h-5 relative" style={{ color: S3_ACCENT.emerald.text }} />
              <span className="text-xs font-bold tracking-wider uppercase relative" style={{ color: S3_ACCENT.emerald.text }}>75% completado</span>
            </motion.div>
            <div className="w-px h-6" style={{ background: 'hsl(0 0% 100% / 0.08)' }} />
            {WEEK_STATS.map((s, i) => (
              <motion.div key={i} {...me(0.1 + i * 0.04)} className="text-center px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] relative overflow-hidden">
                {!isExporting && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 35%, hsl(${s.hue} 60% 55% / 0.06) 50%, transparent 65%)` }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.5 }} />
                )}
                <p className="text-2xl font-black relative" style={{
                  background: `linear-gradient(135deg, hsl(${s.hue} 65% 60%), hsl(${s.hue + 30} 60% 55%))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{s.num}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold relative">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Main content: 2 columns */}
        <div className="grid grid-cols-5 gap-6">
          {/* Left: Tools mastered */}
          <motion.div {...me(0.15)} className="col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-5 relative overflow-hidden">
            {!isExporting && (
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(150 50% 55% / 0.04) 50%, transparent 65%)' }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 6 }} />
            )}
            <div className="flex items-center gap-2 mb-4 relative">
              <Star className="w-4 h-4 text-amber-400/60" />
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Tu Arsenal</span>
            </div>
            <div className="grid grid-cols-2 gap-2 relative">
              {TOOLS_LEARNED.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={i}
                    {...(isExporting ? {} : {
                      initial: { opacity: 0, scale: 0.8, y: 10 },
                      animate: { opacity: 1, scale: 1, y: 0 },
                      transition: { delay: 0.2 + i * 0.05, type: 'spring', stiffness: 200 },
                    })}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border group relative overflow-hidden"
                    style={{ borderColor: tool.accent.border, background: tool.accent.bg }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative"
                      style={{ background: `${tool.accent.text}15`, border: `1px solid ${tool.accent.text}20` }}>
                      <Icon className="w-4 h-4" style={{ color: tool.accent.text }} />
                    </div>
                    <div className="min-w-0 relative">
                      <p className="text-xs font-bold text-white/70 leading-tight">{tool.name}</p>
                      <p className="text-[10px] text-white/40 leading-tight">{tool.what}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Missions + CTA */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Missions */}
            <motion.div {...me(0.2)} className="flex-1 rounded-2xl border p-5 relative overflow-hidden"
              style={{ borderColor: 'hsl(160 40% 25% / 0.35)', background: 'hsl(160 30% 8% / 0.5)' }}>
              <div className="flex items-center gap-2 mb-4 relative">
                <Rocket className="w-4 h-4" style={{ color: S3_ACCENT.emerald.text }} />
                <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Misiones esta semana</span>
                <span className="ml-auto text-[10px] text-white/40 font-medium">Elige al menos 1</span>
              </div>

              <div className="space-y-2.5 relative">
                {MISSIONS.map((mission, i) => {
                  const Icon = mission.icon;
                  return (
                    <motion.div
                      key={i}
                      {...me(0.25 + i * 0.06)}
                      className="relative flex items-center gap-4 px-4 py-3.5 rounded-xl border overflow-hidden group"
                      style={{ borderColor: mission.accent.border, background: mission.accent.bg }}
                    >
                      {/* Shimmer */}
                      {!isExporting && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(105deg, transparent 35%, ${mission.accent.text}12 50%, transparent 65%)` }}
                          animate={{ x: ['-150%', '250%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: i * 0.8 }}
                        />
                      )}
                      {/* Number badge */}
                      <div className="relative w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${mission.accent.text}15`, border: `1px solid ${mission.accent.text}25` }}>
                        <span className="text-sm font-black" style={{ color: mission.accent.text }}>{i + 1}</span>
                      </div>

                      <div className="relative flex-1 min-w-0">
                        <p className="text-sm font-bold text-white/70">{mission.task}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{mission.detail}</p>
                      </div>

                      <div className="relative flex items-center gap-2 shrink-0">
                        <span className="text-[10px] px-2.5 py-1 rounded-full border font-bold"
                          style={{ borderColor: `${mission.accent.text}25`, color: `${mission.accent.text}90`, background: `${mission.accent.text}08` }}>
                          {mission.difficulty}
                        </span>
                        {mission.difficulty === 'Desafío' && <Star className="w-3.5 h-3.5" style={{ color: S3_ACCENT.amber.text }} />}
                        <span className="text-[10px] text-white/40 font-mono">{mission.time}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bottom row: CTA + Tip */}
            <div className="grid grid-cols-2 gap-4">
              {/* Next week CTA with dramatic glow */}
              <motion.div
                {...me(0.45)}
                className="relative overflow-hidden flex items-center gap-3 px-5 py-4 rounded-xl border"
                style={{
                  borderColor: S3_ACCENT.cyan.border,
                  background: S3_ACCENT.cyan.bg,
                  boxShadow: isExporting ? undefined : `0 0 30px ${S3_ACCENT.cyan.glow}`,
                }}
              >
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 60% 70% / 0.08) 50%, transparent 65%)' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                  />
                )}
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Próxima Semana</p>
                  <p className="text-sm font-bold text-white leading-tight mt-0.5">
                    S4: <span style={{ color: S3_ACCENT.cyan.text }}>VibeCoding</span>
                  </p>
                  <p className="text-[10px] text-white/40 mt-0.5">Tu primera app en 90 min</p>
                </div>
                <motion.div className="relative z-10" {...(isExporting ? {} : { animate: { x: [0, 6, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: S3_EASE } })}>
                  <ArrowRight className="w-5 h-5" style={{ color: `${S3_ACCENT.cyan.text}80` }} />
                </motion.div>
              </motion.div>

              {/* Key takeaway with enhanced treatment */}
              <motion.div {...me(0.5)} className="relative overflow-hidden flex items-start gap-3 px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] group"
                {...(isExporting ? {} : { whileHover: { borderColor: 'hsl(160 65% 45% / 0.25)', scale: 1.01 } })}>
                {!isExporting && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(160 65% 60% / 0.07) 50%, transparent 65%)' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }} />
                )}
                <TrendingUp className="w-5 h-5 text-emerald-400/60 shrink-0 mt-0.5" />
                <div className="relative">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">Key Takeaway</p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    No necesitas dominar <span className="text-white/80 font-semibold">todas</span> las herramientas.
                    Domina <span style={{ color: S3_ACCENT.emerald.text }} className="font-bold">2-3</span> que resuelvan <span className="text-white/80 font-semibold">tu</span> problema real.
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
