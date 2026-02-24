import { motion } from 'framer-motion';
import { Zap, Palette, FileSpreadsheet, FileText, Search, Download, Terminal, ChevronRight, Check } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion, s3MotionEpic, s3GradientText } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const SKILLS = [
  { name: 'Brand Theme', tip: 'Tu identidad visual precargada', example: '"Aplica mi marca a este PDF"', icon: Palette, accent: S3_ACCENT.rose },
  { name: 'Excel Controller', tip: 'Lee y edita hojas de cálculo', example: '"Analiza ventas Q3 de este xlsx"', icon: FileSpreadsheet, accent: S3_ACCENT.emerald },
  { name: 'PDF Editor', tip: 'Extrae y transforma documentos', example: '"Resume este contrato en 5 puntos"', icon: FileText, accent: S3_ACCENT.amber },
  { name: 'Web Researcher', tip: 'Busca info pública actualizada', example: '"Investiga tendencias IA 2026"', icon: Search, accent: S3_ACCENT.cyan },
];

const INSTALL_STEPS = [
  { step: '1', label: 'Abre Claude Desktop' },
  { step: '2', label: 'Pide instalar Skills' },
  { step: '3', label: 'Usa en cualquier chat' },
];

export function S3Slide07Skills() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);
  const me = (d: number, overrides?: object) => s3MotionEpic(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_35%_30%,_hsl(263_60%_55%_/_0.09),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_70%_65%,_hsl(280_55%_50%_/_0.06),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/50 via-transparent to-[#04030a]/60" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={263} secondaryHue={280} tertiaryHue={185} showAurora />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div {...m(0)} className="mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
              <Zap className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Claude Code</span>
            </div>
          </motion.div>

          <motion.h1 {...me(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-1">
            Skills: <span style={s3GradientText('hsl(263 70% 72%)', 'hsl(330 65% 70%)', 263)}>Superpoderes</span>
          </motion.h1>
          <motion.div
            className="h-0.5 rounded-full mt-1.5 mx-auto max-w-[100px] origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.8), transparent)' }}
            initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: S3_EASE }}
          />
          <motion.p {...m(0.15)} className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            Paquetes de instrucciones que multiplican a Claude
          </motion.p>
        </div>

        {/* Main layout: Terminal mockup left + Skills cards right */}
        <div className="grid grid-cols-12 gap-5 mb-6">

          {/* LEFT: Claude Desktop terminal mockup */}
          <motion.div {...me(0.2)} className="col-span-5 relative">
            <div className="absolute -inset-10 rounded-full blur-[100px] opacity-30"
              style={{ background: `radial-gradient(circle, hsl(263 60% 50% / 0.3), transparent 70%)` }} />

            <div className="relative p-[1.5px] rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(145deg, hsl(263 70% 60% / 0.4), hsl(280 50% 50% / 0.2))' }}>
              <div className="rounded-[calc(1rem-1.5px)] overflow-hidden relative"
                style={{ background: 'hsl(263 40% 5%)', boxShadow: '0 40px 100px hsl(263 50% 25% / 0.35)' }}>

                {/* Shimmer sweep */}
                {!isExporting && (
                  <motion.div className="absolute inset-0 z-20 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, hsl(263 70% 72% / 0.08) 50%, transparent 65%)', width: '45%' }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'linear' }} />
                )}

                {/* Browser chrome */}
                <div className="relative px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'hsl(263 60% 50% / 0.1)' }}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono ml-2">Claude Desktop — Skills</span>
                </div>

                {/* Fake terminal content */}
                <div className="p-4 space-y-3">
                  {/* Command line */}
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3" style={{ color: S3_ACCENT.violet.text }} />
                    <motion.span
                      className="text-[11px] font-mono"
                      style={{ color: S3_ACCENT.violet.text }}
                      {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8, duration: 0.5 } })}
                    >
                      &gt; instala los skills de Anthropic
                    </motion.span>
                  </div>

                  {/* Loading skills animation */}
                  {SKILLS.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg border"
                        style={{ borderColor: `${skill.accent.text}15`, background: `${skill.accent.text}06` }}
                        {...(isExporting ? {} : {
                          initial: { opacity: 0, x: -20 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: 1.0 + i * 0.2, duration: 0.5, ease: S3_EASE },
                        })}
                      >
                        <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                          style={{ background: `${skill.accent.text}12`, border: `1px solid ${skill.accent.text}20` }}>
                          <Icon className="w-3 h-3" style={{ color: skill.accent.text }} />
                        </div>
                        <span className="text-[10px] font-mono text-white/55 flex-1">{skill.name}</span>
                        <motion.div
                          {...(isExporting ? {} : {
                            initial: { scale: 0 },
                            animate: { scale: 1 },
                            transition: { delay: 1.3 + i * 0.2, type: 'spring', stiffness: 300 },
                          })}
                        >
                          <Check className="w-3 h-3" style={{ color: S3_ACCENT.emerald.text }} />
                        </motion.div>
                      </motion.div>
                    );
                  })}

                  {/* Status bar */}
                  <motion.div
                    className="pt-2 border-t flex items-center justify-between"
                    style={{ borderColor: 'hsl(263 40% 50% / 0.1)' }}
                    {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 2, duration: 0.5 } })}
                  >
                    <span className="text-[10px] text-white/35 font-mono">4 skills instalados</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: S3_ACCENT.emerald.dot }} />
                      <span className="text-[10px] font-mono" style={{ color: S3_ACCENT.emerald.text }}>Ready</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: 4 skill cards in 2x2 grid */}
          <div className="col-span-7 grid grid-cols-2 gap-3">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div key={i} {...m(0.2 + i * 0.08)}
                  className="relative group rounded-2xl border overflow-hidden"
                  style={{ borderColor: skill.accent.border, background: skill.accent.bg }}
                  {...(isExporting ? {} : { whileHover: { scale: 1.04, y: -2 } })}>
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${skill.accent.dot}, transparent)` }}
                  />
                  {!isExporting && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(105deg, transparent 35%, ${skill.accent.glow} 50%, transparent 65%)` }}
                      animate={{ x: ['-150%', '250%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.4 }}
                    />
                  )}
                  <div className="relative p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                        style={{ borderColor: `${skill.accent.text}25`, background: `${skill.accent.text}08` }}>
                        <Icon className="w-5 h-5" style={{ color: skill.accent.text }} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">{skill.name}</p>
                        <p className="text-[10px] text-white/40">{skill.tip}</p>
                      </div>
                    </div>
                    {/* Example prompt */}
                    <div className="px-3 py-2 rounded-lg border" style={{ borderColor: `${skill.accent.text}12`, background: `${skill.accent.text}06` }}>
                      <p className="text-[10px] text-white/50 font-mono italic leading-relaxed">{skill.example}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Install flow */}
        <motion.div {...m(0.55)} className="flex items-center justify-center gap-3">
          <Download className="w-4 h-4" style={{ color: S3_ACCENT.violet.text }} />
          {INSTALL_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black"
                  style={{ background: `${S3_ACCENT.violet.text}15`, color: S3_ACCENT.violet.text, border: `1px solid ${S3_ACCENT.violet.text}20` }}>
                  {s.step}
                </span>
                <span className="text-[10px] text-white/55 font-medium">{s.label}</span>
              </div>
              {i < INSTALL_STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-white/25" />}
            </div>
          ))}
        </motion.div>
      </div>

      <S3Footer sectionLabel="CLAUDE CODE" hue={263} contextHint="skills reutilizables por tarea" />
    </div>
  );
}
