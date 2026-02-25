import { motion } from 'framer-motion';
import { Shield, Brain, MessageSquare, Code2, ChevronRight, Lock, Check, Zap } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText, S3_SERIF, s3SerifAnchor } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const WEEKS = [
  { num: 1, title: 'Higiene Digital', icon: Shield, accent: S3_ACCENT.cyan, skills: ['Inbox Zero', 'Navegadores', 'Bitwarden', 'Context Eng.'], done: true, current: false },
  { num: 2, title: 'IA Avanzada', icon: Brain, accent: S3_ACCENT.violet, skills: ['C.R.O.P.', 'Modelos', 'Agentes', 'MCP'], done: true, current: false },
  { num: 3, title: 'UI, Skills & APIs', icon: MessageSquare, accent: S3_ACCENT.rose, skills: ['Diseño UI', 'Skills de Marca', 'API Keys', 'Plugins'], done: false, current: true },
  { num: 4, title: 'Vibe Coding', icon: Code2, accent: S3_ACCENT.emerald, skills: ['App en 90 min', 'Deploy', 'GitHub', 'Proyecto Final'], done: false, current: false },
];

export function S3Slide02Recap() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,_hsl(185_70%_50%_/_0.1),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,_hsl(280_60%_55%_/_0.08),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_50%,_hsl(330_65%_55%_/_0.06),_transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={14} primaryHue={330} secondaryHue={263} tertiaryHue={185} showAurora showConstellation />
      </div>

      {/* Editorial serif anchor */}
      <div className="absolute top-[-8%] left-[-3%] z-[1]">
        <span style={s3SerifAnchor('75', 330, 0.03)}>75</span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <ChevronRight className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Tu Progreso</span>
          </div>
        </motion.div>

        <motion.h1 {...me(0.08)} className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
          El Camino Hasta <span style={{ ...s3GradientText('hsl(330 85% 68%)', 'hsl(280 70% 65%)', 330), fontFamily: S3_SERIF, fontStyle: 'italic' }}>Aquí</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[96px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.8), hsl(280 70% 65% / 0.8), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Progress bar */}
        <motion.div {...m(0.1)} className="mt-3 mb-7 max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Progreso Global</span>
            <span className="text-[11px] font-black tabular-nums" style={{ color: S3_ACCENT.rose.text, fontFamily: S3_SERIF, fontStyle: 'italic', fontSize: '14px' }}>75%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden relative" style={{ background: 'hsl(0 0% 100% / 0.04)' }}>
            <motion.div className="h-full rounded-full relative"
              style={{
                background: 'linear-gradient(90deg, hsl(185 70% 55%), hsl(263 60% 60%), hsl(330 65% 58%))',
                boxShadow: '0 0 20px hsl(330 65% 55% / 0.4)',
              }}
              initial={isExporting ? { width: '75%' } : { width: '0%' }}
              animate={{ width: '75%' }}
              transition={{ delay: 0.5, duration: 1.8, ease: S3_EASE }}
            />
            {!isExporting && (
              <motion.div className="absolute top-0 right-0 bottom-0 w-6 rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(330 80% 75% / 0.6))' }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>
        </motion.div>

        {/* Visual journey: 4 stage nodes */}
        <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* Connecting line behind */}
          <div className="absolute top-1/2 left-[8%] right-[8%] h-px -translate-y-1/2 hidden sm:block" style={{ background: 'linear-gradient(90deg, hsl(185 70% 50% / 0.3), hsl(263 60% 55% / 0.3), hsl(330 65% 55% / 0.3), hsl(160 65% 45% / 0.15))' }} />
          {/* Progress fill */}
          <motion.div className="absolute top-1/2 left-[8%] h-[2px] -translate-y-1/2 rounded-full hidden sm:block"
            style={{ background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(263 60% 55%))' }}
            {...(isExporting ? { style: { width: '63%', background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(263 60% 55%))' } } : { initial: { width: '0%' }, animate: { width: '63%' }, transition: { delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] } })}
          />

          {WEEKS.map((week, i) => {
            const Icon = week.icon;
            const isCurrent = week.current;
            const isFuture = !week.done && !week.current;
            return (
              <motion.div key={i} {...m(0.2 + i * 0.1)} className={`relative flex flex-col items-center gap-3 z-10 ${isFuture ? 'opacity-40' : ''}`}>
                <div className="absolute -inset-4 rounded-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${week.accent.dot}${isFuture ? '0a' : '22'}, transparent 70%)`, filter: 'blur(24px)' }} />

                {/* Ring */}
                <div className="relative">
                  {isCurrent && !isExporting && (
                    <>
                      <motion.div className="absolute -inset-3 rounded-full" style={{ border: `2px solid ${week.accent.dot}`, opacity: 0.3 }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.div className="absolute -inset-5 rounded-full border-2 border-dashed" style={{ borderColor: `${week.accent.dot}40`, opacity: 0.25 }}
                        animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
                      <motion.div className="absolute -inset-6 rounded-full"
                        style={{ background: `radial-gradient(circle, ${week.accent.dot}30, transparent 70%)` }}
                        animate={{ scale: [0.8, 1.6, 0.8], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
                    </>
                  )}
                  <motion.div
                    className="w-20 h-20 rounded-full border-2 flex items-center justify-center relative overflow-hidden"
                    style={{
                      borderColor: isCurrent ? week.accent.dot : isFuture ? `${week.accent.dot}25` : `${week.accent.dot}60`,
                      background: isCurrent ? week.accent.bg : isFuture ? `${week.accent.bg}20` : `${week.accent.bg}40`,
                      borderStyle: isFuture ? 'dashed' : 'solid',
                      boxShadow: isCurrent ? `0 0 40px ${week.accent.glow}, inset 0 0 20px ${week.accent.glow}` : week.done ? `0 0 20px ${week.accent.glow}` : 'none',
                    }}
                    {...(isExporting ? {} : isCurrent ? { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2.5, repeat: Infinity } } : {})}
                  >
                    {week.done && !isExporting && (
                      <motion.div className="absolute inset-0 pointer-events-none"
                        style={{ background: `linear-gradient(105deg, transparent 35%, ${week.accent.text}15 50%, transparent 65%)` }}
                        animate={{ x: ['-150%', '250%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />
                    )}
                    {week.done && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center z-10"
                        style={{ background: week.accent.dot, color: '#04030a', boxShadow: `0 0 12px ${week.accent.glow}` }}>
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                    )}
                    {isFuture && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border z-10"
                        style={{ background: '#04030a', borderColor: `${week.accent.dot}30` }}>
                        <Lock className="w-3 h-3" style={{ color: `${week.accent.text}40` }} />
                      </div>
                    )}
                    <Icon className="w-7 h-7 relative z-10" style={{ color: isCurrent ? week.accent.text : isFuture ? `${week.accent.text}40` : `${week.accent.text}90` }} />
                  </motion.div>
                </div>

                {/* Label */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: isFuture ? `${week.accent.text}35` : `${week.accent.text}80` }}>Semana {week.num}</p>
                  <p className={`text-base font-black ${isFuture ? 'text-white/45' : 'text-white'}`}>{week.title}</p>
                  {isCurrent && (
                    <span className="inline-block mt-1.5 relative overflow-hidden rounded-full">
                      {!isExporting && (
                        <motion.div className="absolute inset-0 z-10 pointer-events-none"
                          style={{ background: 'linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%, transparent 100%)', width: '60%' }}
                          animate={{ x: ['-150%', '250%'] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }} />
                      )}
                      <motion.span className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider"
                        style={{ background: week.accent.bg, color: week.accent.text, border: `1px solid ${week.accent.border}`, boxShadow: `0 0 15px ${week.accent.glow}` }}
                        {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity } })}>
                        <Zap className="w-3 h-3" />
                        HOY
                      </motion.span>
                    </span>
                  )}
                  {isFuture && (
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border"
                      style={{ borderColor: `${week.accent.text}15`, color: `${week.accent.text}30`, background: `${week.accent.text}05` }}>
                      PRÓXIMA
                    </span>
                  )}
                </div>

                {/* Mini skill pills */}
                <div className="flex flex-wrap justify-center gap-1.5 max-w-[140px]">
                  {week.skills.map((s, j) => (
                    <motion.span key={j}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                      style={{
                        borderColor: isCurrent ? `${week.accent.text}30` : isFuture ? `${week.accent.text}08` : `${week.accent.text}15`,
                        color: isCurrent ? `${week.accent.text}95` : isFuture ? `${week.accent.text}30` : `${week.accent.text}60`,
                        background: isCurrent ? `${week.accent.text}12` : `${week.accent.text}05`,
                        boxShadow: isCurrent ? `0 0 12px ${week.accent.glow}` : undefined,
                      }}
                      {...(isExporting ? {} : {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { delay: 0.5 + i * 0.15 + j * 0.05, type: 'spring', stiffness: 200 },
                      })}
                    >{s}</motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <S3Footer sectionLabel="APERTURA" contextHint="de dónde venimos y hacia dónde vamos" />
    </div>
  );
}
