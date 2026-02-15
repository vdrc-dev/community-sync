import { motion } from 'framer-motion';
import { Zap, Palette, FileSpreadsheet, FileText, Search, Download } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const SKILLS = [
  { name: 'Brand Theme', tip: 'Tu identidad visual precargada', example: '"Aplica mi marca a este PDF"', icon: Palette, accent: S3_ACCENT.rose },
  { name: 'Excel Controller', tip: 'Lee y edita hojas de cálculo', example: '"Analiza ventas Q3 de este xlsx"', icon: FileSpreadsheet, accent: S3_ACCENT.emerald },
  { name: 'PDF Editor', tip: 'Extrae y transforma documentos', example: '"Resume este contrato en 5 puntos"', icon: FileText, accent: S3_ACCENT.amber },
  { name: 'Web Researcher', tip: 'Busca info pública actualizada', example: '"Investiga tendencias IA 2026"', icon: Search, accent: S3_ACCENT.cyan },
];

const FLOATING_PILLS = [
  { label: 'Brand', left: '-8%', top: '5%' },
  { label: 'Excel', right: '-2%', top: '12%' },
  { label: 'PDF', right: '-2%', top: '75%' },
  { label: 'Web', left: '-6%', top: '78%' },
];

export function S3Slide07Skills() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_35%_30%,_hsl(263_60%_55%_/_0.09),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_70%_65%,_hsl(280_55%_50%_/_0.06),_transparent_55%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={8} primaryHue={263} secondaryHue={280} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
            <Zap className="w-3.5 h-3.5" style={{ color: S3_ACCENT.violet.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.violet.text }}>Claude Code</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Skills: <span
            style={{
              background: 'linear-gradient(135deg, hsl(263 70% 72%), hsl(330 65% 70%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px hsl(263 70% 72% / 0.4))',
            }}
          >Superpoderes</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mt-4 mx-auto max-w-[120px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(263 70% 72% / 0.8), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: S3_EASE }}
        />
        <motion.p {...m(0.15)} className="text-white/35 text-lg mb-14 max-w-md mx-auto">
          Paquetes de instrucciones que multiplican a Claude
        </motion.p>

        {/* Visual: 4 skill cards in a grid */}
        <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto relative">
          {/* Floating decorative pills around the grid */}
          {!isExporting && FLOATING_PILLS.map((pill, i) => (
            <motion.div
              key={pill.label}
              className="absolute px-2.5 py-1 rounded-full text-[9px] font-semibold border pointer-events-none"
              style={{
                borderColor: S3_ACCENT.violet.border,
                background: S3_ACCENT.violet.bg,
                color: S3_ACCENT.violet.text,
                left: 'left' in pill ? pill.left : undefined,
                right: 'right' in pill ? pill.right : undefined,
                top: pill.top,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
            >
              {pill.label}
            </motion.div>
          ))}
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div key={i} {...m(0.2 + i * 0.08)}
                className="relative group rounded-2xl border overflow-hidden"
                style={{ borderColor: skill.accent.border, background: skill.accent.bg }}
                {...(isExporting ? {} : { whileHover: { scale: 1.05, y: -4 } })}>
                {!isExporting && (
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: skill.accent.glow }} />
                )}
                {/* Shimmer sweep inside each card */}
                {!isExporting && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 35%, ${skill.accent.text.replace(')', ' / 0.1)')} 50%, transparent 65%)` }}
                    animate={{ x: ['-150%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                  />
                )}
                <div className="relative p-6 flex flex-col items-center gap-4">
                  {/* Orbital ring around each skill icon box */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    {!isExporting && (
                      <motion.div
                        className="absolute inset-[-6px] rounded-2xl border-2 border-dashed pointer-events-none"
                        style={{ borderColor: `${skill.accent.text}30`, opacity: 0.12 }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 65 + i * 5, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                    <div className="w-14 h-14 rounded-2xl border flex items-center justify-center relative z-10"
                      style={{ borderColor: `${skill.accent.text}25`, background: `${skill.accent.text}08` }}>
                      <Icon className="w-7 h-7" style={{ color: skill.accent.text }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-white mb-1">{skill.name}</p>
                    <p className="text-[11px] text-white/35 leading-relaxed">{skill.tip}</p>
                    <p className="text-[9px] text-white/20 font-mono mt-1 italic">{skill.example}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Install CTA */}
        <motion.div {...m(0.55)} className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-xl border"
          style={{ borderColor: S3_ACCENT.violet.border, background: S3_ACCENT.violet.bg }}>
          <Download className="w-4 h-4" style={{ color: S3_ACCENT.violet.text }} />
          <p className="text-xs text-white/50">Pídele a Claude Code: <span className="text-white/80 font-semibold font-mono">"instala los skills de Anthropic"</span></p>
        </motion.div>
      </div>

      <S3Footer sectionLabel="CLAUDE CODE" hue={263} />
    </div>
  );
}
