import { motion } from 'framer-motion';
import { Rocket, BarChart3, Terminal, Database, Code2, BookOpen, Video, Presentation, ArrowRight, Palette, Zap } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS = [
  { icon: BarChart3, name: 'Canvas', accent: S3_ACCENT.cyan },
  { icon: BookOpen, name: 'NotebookLM', accent: S3_ACCENT.cyan },
  { icon: Presentation, name: 'Gamma', accent: S3_ACCENT.violet },
  { icon: Terminal, name: 'Claude Code', accent: S3_ACCENT.violet },
  { icon: Database, name: 'CRM+MCP', accent: S3_ACCENT.amber },
  { icon: Code2, name: 'Cursor', accent: S3_ACCENT.amber },
  { icon: Video, name: 'Krea.ai', accent: S3_ACCENT.rose },
  { icon: Palette, name: 'Coolors', accent: S3_ACCENT.rose },
];

const MISSIONS = [
  { task: 'Dashboard con datos reales', icon: BarChart3, accent: S3_ACCENT.cyan },
  { task: 'Claude Code + 2 skills', icon: Terminal, accent: S3_ACCENT.violet },
  { task: 'Conecta MCP o genera video', icon: Zap, accent: S3_ACCENT.amber },
];

export function S3Slide12Closing() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(150_60%_50%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_70%,_hsl(185_70%_50%_/_0.06),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={15} primaryHue={150} secondaryHue={185} tertiaryHue={330} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.emerald.border, background: S3_ACCENT.emerald.bg }}>
            <Rocket className="w-3.5 h-3.5" style={{ color: S3_ACCENT.emerald.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.emerald.text }}>Cierre · Semana 3</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-7xl font-black text-white tracking-tight mb-3">
          La diferencia es la{' '}
          <span style={{
            background: 'linear-gradient(135deg, hsl(150 60% 55%), hsl(185 70% 55%))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px hsl(150 60% 50% / 0.3))',
          }}>acción</span>
        </motion.h1>
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-12 max-w-md mx-auto">
          8+ herramientas · 5 workflows · 3 frameworks
        </motion.p>

        {/* Tool icon grid */}
        <motion.div {...m(0.2)} className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div key={i}
                {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.7 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.25 + i * 0.04, type: 'spring', stiffness: 200 } })}
                className="group w-14 h-14 rounded-2xl border flex items-center justify-center relative"
                style={{ borderColor: tool.accent.border, background: tool.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.15, y: -3 } })}>
                <Icon className="w-6 h-6" style={{ color: tool.accent.text }} />
                {/* Tooltip on hover */}
                <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-[8px] font-bold text-white/40 whitespace-nowrap">{tool.name}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Missions */}
        <motion.p {...m(0.35)} className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold mb-4">Misiones esta semana</motion.p>
        <div className="flex items-center justify-center gap-4 mb-10">
          {MISSIONS.map((mission, i) => {
            const Icon = mission.icon;
            return (
              <motion.div key={i} {...m(0.4 + i * 0.08)}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border"
                style={{ borderColor: mission.accent.border, background: mission.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.04 } })}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${mission.accent.text}12`, border: `1px solid ${mission.accent.text}20` }}>
                  <Icon className="w-4 h-4" style={{ color: mission.accent.text }} />
                </div>
                <span className="text-sm text-white/55 font-medium">{mission.task}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Next week CTA */}
        <motion.div {...m(0.6)} className="relative overflow-hidden inline-flex items-center gap-4 px-6 py-4 rounded-xl border"
          style={{ borderColor: S3_ACCENT.cyan.border, background: S3_ACCENT.cyan.bg }}
          {...(isExporting ? {} : { whileHover: { scale: 1.03 } })}>
          {!isExporting && (
            <motion.div className="absolute inset-0"
              style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 60% 70% / 0.08) 50%, transparent 65%)' }}
              animate={{ x: ['-150%', '250%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />
          )}
          <div className="relative z-10">
            <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold">Próxima Semana</p>
            <p className="text-base font-bold text-white">S4: <span style={{ color: S3_ACCENT.cyan.text }}>VibeCoding</span> — Tu primera app en 90 min</p>
          </div>
          <motion.div className="relative z-10" {...(isExporting ? {} : { animate: { x: [0, 5, 0] }, transition: { duration: 1.5, repeat: Infinity } })}>
            <ArrowRight className="w-5 h-5" style={{ color: `${S3_ACCENT.cyan.text}70` }} />
          </motion.div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CIERRE" hue={150} />
    </div>
  );
}
