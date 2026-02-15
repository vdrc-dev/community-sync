import { motion } from 'framer-motion';
import { Shield, Brain, MessageSquare, ChevronRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const WEEKS = [
  { num: 1, title: 'Higiene Digital', icon: Shield, accent: S3_ACCENT.cyan, skills: ['Inbox Zero', 'Navegadores', 'Bitwarden', 'Context Eng.'], done: true },
  { num: 2, title: 'Era Agéntica', icon: Brain, accent: S3_ACCENT.violet, skills: ['C.R.O.P.', 'Modelos', 'Agentes', 'MCP'], done: true },
  { num: 3, title: 'Comunicación', icon: MessageSquare, accent: S3_ACCENT.rose, skills: ['Canvas', 'Claude Code', 'CRM', 'Cursor'], done: false },
];

export function S3Slide02Recap() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,_hsl(185_70%_50%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,_hsl(280_60%_55%_/_0.06),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <ChevronRight className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Tu Progreso</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          El Camino Hasta <span style={{ color: S3_ACCENT.rose.text }}>Aquí</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-16 max-w-md mx-auto">
          Semana 3 de 4 — 75% completado
        </motion.p>

        {/* Visual journey: 3 large stage nodes connected by line */}
        <div className="relative flex items-center justify-center gap-8">
          {/* Connecting line behind */}
          <div className="absolute top-1/2 left-[15%] right-[15%] h-px -translate-y-1/2" style={{ background: 'linear-gradient(90deg, hsl(185 70% 50% / 0.3), hsl(263 60% 55% / 0.3), hsl(330 65% 55% / 0.3))' }} />
          {/* Progress fill */}
          <motion.div className="absolute top-1/2 left-[15%] h-[2px] -translate-y-1/2 rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(263 60% 55%))' }}
            {...(isExporting ? { style: { width: '52%', background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(263 60% 55%))' } } : { initial: { width: '0%' }, animate: { width: '52%' }, transition: { delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] } })}
          />

          {WEEKS.map((week, i) => {
            const Icon = week.icon;
            const isCurrent = !week.done;
            return (
              <motion.div key={i} {...m(0.2 + i * 0.12)} className="relative flex flex-col items-center gap-4 z-10">
                {/* Ring */}
                <div className="relative">
                  {isCurrent && !isExporting && (
                    <motion.div className="absolute -inset-3 rounded-full" style={{ border: `2px solid ${week.accent.dot}`, opacity: 0.3 }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} />
                  )}
                  <div className="w-28 h-28 rounded-full border-2 flex items-center justify-center relative"
                    style={{ borderColor: isCurrent ? week.accent.dot : `${week.accent.dot}60`, background: isCurrent ? week.accent.bg : `${week.accent.bg}40` }}>
                    {week.done && (
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black"
                        style={{ background: week.accent.dot, color: '#04030a' }}>✓</div>
                    )}
                    <Icon className="w-10 h-10" style={{ color: isCurrent ? week.accent.text : `${week.accent.text}90` }} />
                  </div>
                </div>

                {/* Label */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: `${week.accent.text}80` }}>Semana {week.num}</p>
                  <p className="text-lg font-black text-white">{week.title}</p>
                  {isCurrent && (
                    <motion.span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider"
                      style={{ background: week.accent.bg, color: week.accent.text, border: `1px solid ${week.accent.border}` }}
                      {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity } })}>
                      HOY
                    </motion.span>
                  )}
                </div>

                {/* Mini skill pills */}
                <div className="flex flex-wrap justify-center gap-1.5 max-w-[160px]">
                  {week.skills.map((s, j) => (
                    <span key={j} className="px-2 py-0.5 rounded-full text-[9px] font-semibold border"
                      style={{ borderColor: `${week.accent.text}15`, color: `${week.accent.text}60`, background: `${week.accent.text}05` }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <S3Footer sectionLabel="APERTURA" />
    </div>
  );
}
