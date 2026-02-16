import { motion } from 'framer-motion';
import { Shield, Brain, MessageSquare, Code2, ChevronRight, Lock } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const WEEKS = [
  { num: 1, title: 'Higiene Digital', icon: Shield, accent: S3_ACCENT.cyan, skills: ['Inbox Zero', 'Navegadores', 'Bitwarden', 'Context Eng.'], done: true, current: false },
  { num: 2, title: 'IA Avanzada', icon: Brain, accent: S3_ACCENT.violet, skills: ['C.R.O.P.', 'Modelos', 'Agentes', 'MCP'], done: true, current: false },
  { num: 3, title: 'Presentaciones con IA', icon: MessageSquare, accent: S3_ACCENT.rose, skills: ['Canvas', 'Claude Code', 'CRM', 'Cursor'], done: false, current: true },
  { num: 4, title: 'Vibe Coding', icon: Code2, accent: S3_ACCENT.emerald, skills: ['App en 90 min', 'Deploy', 'GitHub', 'Proyecto Final'], done: false, current: false },
];

export function S3Slide02Recap() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,_hsl(185_70%_50%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,_hsl(280_60%_55%_/_0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_50%,_hsl(330_65%_55%_/_0.04),_transparent_70%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      {/* Floating decorative pills */}
      {!isExporting && (
        <>
          <motion.div className="absolute left-[12%] top-[38%] text-[10px] font-bold tracking-wider text-white/40"
            animate={{ y: [0, -8, 0], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>75%</motion.div>
          <motion.div className="absolute right-[18%] top-[35%] text-[10px] font-bold tracking-wider text-white/35"
            animate={{ y: [0, 6, 0], opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>S3</motion.div>
          <motion.div className="absolute left-[22%] bottom-[32%] text-[10px] font-semibold tracking-widest text-white/35 uppercase"
            animate={{ y: [0, -5, 0], opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>4 semanas</motion.div>
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <ChevronRight className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Tu Progreso</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
          El Camino Hasta <span
            style={{
              background: 'linear-gradient(135deg, hsl(330 85% 68%), hsl(280 70% 65%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(330 85% 68% / 0.4))',
            }}>Aquí</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[96px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.8), hsl(280 70% 65% / 0.8), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.p {...m(0.15)} className="text-white/45 text-lg mb-9 max-w-lg mx-auto">
          Semana 3 de 4 - 75% del programa completado
        </motion.p>
        <motion.div
          {...m(0.18)}
          className="mb-8 inline-flex items-center gap-4 px-5 py-2.5 rounded-xl border backdrop-blur-md"
          style={{
            borderColor: 'hsl(330 70% 60% / 0.2)',
            background: 'linear-gradient(135deg, hsl(330 70% 55% / 0.08), hsl(263 60% 55% / 0.04))',
            boxShadow: '0 0 35px hsl(330 70% 55% / 0.15)',
          }}
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">Momentum</span>
          <div className="w-24 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(185 70% 55%), hsl(263 60% 60%), hsl(330 70% 60%))' }}
              {...(isExporting ? { style: { width: '75%' } } : { initial: { width: 0 }, animate: { width: '75%' }, transition: { duration: 1.2, delay: 0.5 } })}
            />
          </div>
          <span className="text-xs font-bold text-white/70">75%</span>
        </motion.div>

        {/* Visual journey: 4 stage nodes connected by line */}
        <div className="relative flex items-center justify-center gap-6">
          {/* Connecting line behind */}
          <div className="absolute top-1/2 left-[8%] right-[8%] h-px -translate-y-1/2" style={{ background: 'linear-gradient(90deg, hsl(185 70% 50% / 0.3), hsl(263 60% 55% / 0.3), hsl(330 65% 55% / 0.3), hsl(160 65% 45% / 0.15))' }} />
          {/* Progress fill */}
          <motion.div className="absolute top-1/2 left-[8%] h-[2px] -translate-y-1/2 rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(263 60% 55%))' }}
            {...(isExporting ? { style: { width: '63%', background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(263 60% 55%))' } } : { initial: { width: '0%' }, animate: { width: '63%' }, transition: { delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] } })}
          />

          {WEEKS.map((week, i) => {
            const Icon = week.icon;
            const isCurrent = week.current;
            const isFuture = !week.done && !week.current;
            return (
              <motion.div key={i} {...m(0.2 + i * 0.1)} className={`relative flex flex-col items-center gap-3 z-10 ${isFuture ? 'opacity-40' : ''}`}>
                <div
                  className="absolute -inset-4 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${week.accent.dot}${isFuture ? '0a' : '22'}, transparent 70%)`,
                    filter: 'blur(24px)',
                  }}
                />
                {/* Ring */}
                <div className="relative">
                  {isCurrent && !isExporting && (
                    <>
                      <motion.div className="absolute -inset-3 rounded-full" style={{ border: `2px solid ${week.accent.dot}`, opacity: 0.3 }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} />
                      <motion.div className="absolute -inset-5 rounded-full border-2 border-dashed" style={{ borderColor: `${week.accent.dot}40`, opacity: 0.25 }}
                        animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
                    </>
                  )}
                  <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center relative`}
                    style={{
                      borderColor: isCurrent ? week.accent.dot : isFuture ? `${week.accent.dot}25` : `${week.accent.dot}60`,
                      background: isCurrent ? week.accent.bg : isFuture ? `${week.accent.bg}20` : `${week.accent.bg}40`,
                      borderStyle: isFuture ? 'dashed' : 'solid',
                    }}>
                    {week.done && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                        style={{ background: week.accent.dot, color: '#04030a' }}>✓</div>
                    )}
                    {isFuture && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border"
                        style={{ background: '#04030a', borderColor: `${week.accent.dot}30` }}>
                        <Lock className="w-3 h-3" style={{ color: `${week.accent.text}40` }} />
                      </div>
                    )}
                    <Icon className={`w-8 h-8`} style={{ color: isCurrent ? week.accent.text : isFuture ? `${week.accent.text}40` : `${week.accent.text}90` }} />
                  </div>
                </div>

                {/* Label */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: isFuture ? `${week.accent.text}35` : `${week.accent.text}80` }}>Semana {week.num}</p>
                  <p className={`text-base font-black ${isFuture ? 'text-white/30' : 'text-white'}`}>{week.title}</p>
                  {isCurrent && (
                    <span className="inline-block mt-1.5 relative overflow-hidden rounded-full">
                      {!isExporting && (
                        <motion.div className="absolute inset-0 z-10 pointer-events-none"
                          style={{ background: 'linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%, transparent 100%)', width: '60%' }}
                          animate={{ x: ['-150%', '250%'] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }} />
                      )}
                      <motion.span className="relative inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider"
                        style={{ background: week.accent.bg, color: week.accent.text, border: `1px solid ${week.accent.border}` }}
                        {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity } })}>
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
                    <span key={j} className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                      style={{ borderColor: `${week.accent.text}${isFuture ? '08' : '15'}`, color: `${week.accent.text}${isFuture ? '30' : '60'}`, background: `${week.accent.text}05` }}>{s}</span>
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
