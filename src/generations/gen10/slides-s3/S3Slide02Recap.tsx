import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, MessageSquare, CheckCircle2, TrendingUp, Check } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const WEEKS = [
  {
    num: 1, title: 'Higiene Digital', icon: Shield, color: 'hsl(185 70% 50%)',
    skills: ['Inbox Zero', 'Perfiles de Navegador', 'Bitwarden', 'Context Engineering'],
    status: 'Completada',
    impact: 'Eliminaste el 80% del ruido digital',
    metric: { label: 'Reducción de fricción', value: '80%' },
  },
  {
    num: 2, title: 'La Era Agéntica', icon: Brain, color: 'hsl(280 70% 60%)',
    skills: ['Framework C.R.O.P.', 'Modelos Frontier', 'Agentes de IA', 'MCP'],
    status: 'Completada',
    impact: 'Aprendiste a dirigir la IA',
    metric: { label: 'Frameworks dominados', value: '4' },
  },
  {
    num: 3, title: 'Comunicación Digital', icon: MessageSquare, color: 'hsl(330 70% 60%)',
    skills: ['Canvas & Dashboards', 'Claude Code', 'CRM + MCP', 'Cursor & Video IA'],
    status: 'HOY',
    impact: 'De consumidor a creador',
    metric: { label: 'Herramientas nuevas', value: '8+' },
  },
];

export function S3Slide02Recap() {
  const { isExporting } = useExportContext();
  const [activeWeek, setActiveWeek] = useState(2);
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,_hsl(185_70%_50%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,_hsl(280_60%_55%_/_0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_80%,_hsl(330_65%_55%_/_0.07),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={12} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-cyan-400 via-violet-400 to-rose-400" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Tu Progreso</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">El Camino Hasta Aquí</h1>
            </div>
          </div>
          {/* Progress bar */}
          <div className="ml-5 pl-1 mt-2 flex items-center gap-3">
            <div className="flex-1 max-w-xs h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(280 70% 60%), hsl(330 70% 60%))' }}
                {...(isExporting ? { style: { width: '75%', background: 'linear-gradient(90deg, hsl(185 70% 50%), hsl(280 70% 60%), hsl(330 70% 60%))' } } : { initial: { width: '0%' }, animate: { width: '75%' }, transition: { delay: 0.3, duration: 1.2, ease: 'easeOut' } })} />
            </div>
            <span className="text-xs font-bold text-white/30 tabular-nums">Semana 3 de 4</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-5">
          {WEEKS.map((week, i) => {
            const Icon = week.icon;
            const isActive = activeWeek === i;
            const isCurrent = week.status === 'HOY';
            const isCompleted = week.status === 'Completada';
            return (
              <motion.button key={week.num} {...m(0.15 + i * 0.1)}
                onClick={() => setActiveWeek(i)}
                {...(isExporting ? {} : { whileHover: { borderColor: week.color.replace(')', ' / 0.3)'), scale: 1.02 } })}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${isActive ? 'bg-white/[0.04] border-white/[0.12]' : 'bg-white/[0.01] border-white/[0.04]'}`}
                style={isCurrent && isActive ? { boxShadow: `0 0 40px ${week.color.replace(')', ' / 0.08)')}` } : undefined}>
                {/* Top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-b-full transition-all duration-300" style={{ background: week.color, opacity: isActive ? 0.8 : 0.15, width: isActive ? '5rem' : '3rem' }} />

                {/* Status badge */}
                {isCurrent ? (
                  <motion.div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider"
                    style={{ background: `${week.color.replace(')', ' / 0.15)')}`, color: week.color, border: `1px solid ${week.color.replace(')', ' / 0.3)')}` }}
                    {...(isExporting ? {} : { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity } })}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: week.color, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: week.color }} />
                    </span>
                    HOY
                  </motion.div>
                ) : isCompleted ? (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider border" style={{ background: `${week.color.replace(')', ' / 0.08)')}`, color: `${week.color.replace(')', ' / 0.7)')}`, borderColor: `${week.color.replace(')', ' / 0.15)')}` }}>
                    <Check className="w-3 h-3" />
                    OK
                  </div>
                ) : null}

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                    background: `${week.color.replace(')', ' / 0.1)')}`,
                    border: `1px solid ${week.color.replace(')', isActive ? ' / 0.4)' : ' / 0.25)')}`,
                    boxShadow: isActive ? `0 0 15px ${week.color.replace(')', ' / 0.15)')}` : 'none',
                  }}>
                    <Icon className="w-5 h-5" style={{ color: week.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-white/30 uppercase">Semana {week.num}</p>
                    <p className="text-lg font-bold text-white">{week.title}</p>
                  </div>
                </div>

                {/* Metric pill */}
                <div className="mb-3 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] inline-flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" style={{ color: week.color }} />
                  <span className="text-[10px] text-white/40">{week.metric.label}:</span>
                  <span className="text-xs font-black tabular-nums" style={{ color: week.color }}>{week.metric.value}</span>
                </div>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: S3_EASE }} className="space-y-1.5">
                      {week.skills.map((skill, j) => (
                          <div key={j} className="flex items-center gap-2 p-2 rounded-lg border border-white/[0.03] bg-white/[0.01]">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: isCurrent ? 'hsl(0 0% 100% / 0.2)' : week.color }} />
                            <span className={`text-xs font-semibold ${isCurrent ? 'text-white/40' : 'text-white/60'}`}>{skill}</span>
                          </div>
                      ))}
                      <div className="mt-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <p className="text-[10px] text-white/30 italic leading-relaxed">"{week.impact}"</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {i < 2 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.div key={dot} className="w-1 h-1 rounded-full bg-white/20"
                        {...(isExporting ? {} : { animate: { opacity: [0.2, 0.8, 0.2] }, transition: { duration: 1.5, repeat: Infinity, delay: dot * 0.2 + i * 0.3 } })}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <S3Footer sectionLabel="APERTURA" />
    </div>
  );
}
