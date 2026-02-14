import { motion } from 'framer-motion';
import { Rocket, BarChart3, Terminal, Database, Code2, GitBranch, BookOpen, Video, Presentation, ArrowRight, Sparkles, Palette, Zap, CheckCircle2 } from 'lucide-react';
import bgClosing from '@/assets/gen10-s3/bg-closing-mission.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, S3_PARTICLE_HUES } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const TOOLS_LEARNED = [
  { name: 'Canvas', icon: BarChart3, color: 'hsl(185 70% 50%)', category: 'Visualización' },
  { name: 'NotebookLM', icon: BookOpen, color: 'hsl(185 70% 50%)', category: 'Síntesis' },
  { name: 'Gamma', icon: Presentation, color: 'hsl(280 70% 60%)', category: 'Presentaciones' },
  { name: 'Claude Code', icon: Terminal, color: 'hsl(280 70% 60%)', category: 'Automatización' },
  { name: 'CRM + MCP', icon: Database, color: 'hsl(38 90% 55%)', category: 'Datos' },
  { name: 'Cursor', icon: Code2, color: 'hsl(38 90% 55%)', category: 'Desarrollo' },
  { name: 'Krea.ai', icon: Video, color: 'hsl(330 70% 60%)', category: 'Video' },
  { name: 'Coolors', icon: Palette, color: 'hsl(330 70% 60%)', category: 'Diseño' },
];

const MISSIONS = [
  { task: 'Crea un dashboard con Canvas usando datos reales de tu trabajo', tool: 'Canvas/Gemini', icon: BarChart3, color: 'hsl(185 70% 50%)' },
  { task: 'Instala Claude Code Desktop y configura al menos 2 skills', tool: 'Claude Code', icon: Terminal, color: 'hsl(280 70% 60%)' },
  { task: 'Conecta una fuente de datos vía MCP o genera un video con Krea', tool: 'MCP / Krea', icon: Zap, color: 'hsl(38 90% 55%)' },
];

const STATS = [
  { label: 'Herramientas', value: '8+' },
  { label: 'Workflows', value: '5' },
  { label: 'Frameworks', value: '3' },
];

export function S3Slide12Closing() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col justify-center items-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <img src={bgClosing} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-[#04030a]/40 to-[#04030a]/70" />
        <S3Atmosphere isExporting={isExporting} particleCount={20} primaryHue={150} secondaryHue={185} tertiaryHue={330} />
      </div>

      <div className="relative z-10 max-w-[1200px] w-full">
        {/* Header */}
        <motion.div {...m(0)} className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
            style={{ borderColor: S3_ACCENT.emerald.border, backgroundColor: S3_ACCENT.emerald.bg }}
          >
            <Rocket className="w-4 h-4" style={{ color: S3_ACCENT.emerald.text }} />
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.emerald.text }}>Cierre · Semana 3</span>
          </div>
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-2">
            La diferencia es la{' '}
            <span style={{ background: 'linear-gradient(135deg, hsl(150 60% 55%), hsl(185 70% 55%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>acción</span>
          </h1>
          <p className="text-white/40 text-sm max-w-lg mx-auto">No necesitas entender la sintaxis. Solo enfócate en para qué sirve y dónde aplicarlo.</p>
        </motion.div>

        {/* Session stats */}
        <motion.div {...m(0.1)} className="flex items-center justify-center gap-6 mb-6">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              {...m(0.1 + i * 0.08)}
              className="text-center px-5 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              {...(isExporting ? {} : { whileHover: { scale: 1.05, borderColor: S3_ACCENT.emerald.border } })}
            >
              <p className="text-2xl font-black text-emerald-400">{s.value}</p>
              <p className="text-[9px] text-white/30 uppercase tracking-wider font-bold">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools grid */}
        <motion.div {...m(0.15)} className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          {TOOLS_LEARNED.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.name}
                {...(isExporting ? {} : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.25 + i * 0.04, type: 'spring', stiffness: 200 } })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <Icon className="w-3.5 h-3.5" style={{ color: tool.color }} />
                <span className="text-xs font-semibold text-white/60">{tool.name}</span>
                <span className="text-[8px] text-white/20">{tool.category}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Missions */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {MISSIONS.map((mission, i) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={i}
                {...m(0.3 + i * 0.08)}
                className="p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]"
                {...(isExporting ? {} : { whileHover: { borderColor: mission.color.replace(')', ' / 0.3)'), scale: 1.02, y: -2 } })}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${mission.color.replace(')', ' / 0.1)')}`, border: `1px solid ${mission.color.replace(')', ' / 0.25)')}` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: mission.color }} />
                  </div>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">{mission.tool}</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{mission.task}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Next week CTA */}
        <motion.div {...m(0.6)} className="flex items-center justify-center">
          <motion.div
            className="relative overflow-hidden p-4 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03] inline-flex items-center gap-5"
            {...(isExporting ? {} : { whileHover: { borderColor: S3_ACCENT.cyan.border, scale: 1.02 } })}
          >
            {!isExporting && (
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(185 60% 70% / 0.08) 50%, transparent 65%)' }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
              />
            )}
            <div className="relative z-10">
              <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Próxima Semana</p>
              <p className="text-base font-bold text-white">S4: <span className="text-cyan-400">VibeCoding</span> — De Consumidor a Creador</p>
              <p className="text-xs text-white/30 mt-0.5">Tu primera app funcionando con datos reales en 90 minutos</p>
            </div>
            <motion.div className="relative z-10" {...(isExporting ? {} : { animate: { x: [0, 6, 0] }, transition: { duration: 1.5, repeat: Infinity } })}>
              <ArrowRight className="w-5 h-5 text-cyan-400/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CIERRE" hue={150} />
    </div>
  );
}
