import { motion } from 'framer-motion';
import { Map, Palette, Wrench, Plug, Rocket } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { S3_THEME, S3_ACCENT, S3_ROOT_CLASS, S3_CONTENT_PADDING, S3_EASE, s3Motion } from './theme';
import { S3Atmosphere } from './S3Atmosphere';
import { S3Footer } from './S3Footer';

const MODULES = [
  {
    num: '01',
    title: 'Fundamentos Visuales',
    tools: ['Coolors', 'Fontjoy', 'Canvas'],
    icon: Palette,
    accent: S3_ACCENT.rose,
    time: '~20 min',
  },
  {
    num: '02',
    title: 'Herramientas de Creación',
    tools: ['NotebookLM', 'Claude Code', 'Gamma'],
    icon: Wrench,
    accent: S3_ACCENT.violet,
    time: '~35 min',
  },
  {
    num: '03',
    title: 'Conexiones y Aplicación',
    tools: ['CRM + MCP', 'Cursor', 'Krea.ai'],
    icon: Plug,
    accent: S3_ACCENT.amber,
    time: '~30 min',
  },
  {
    num: '04',
    title: 'Cierre y Misiones',
    tools: ['Resumen', 'Próximos pasos'],
    icon: Rocket,
    accent: S3_ACCENT.emerald,
    time: '~10 min',
  },
];

export function S3SlideAgenda() {
  const { isExporting } = useExportContext();
  const m = (d: number, overrides?: object) => s3Motion(d, isExporting, overrides);

  return (
    <div className={S3_ROOT_CLASS + ' flex flex-col items-center justify-center ' + S3_CONTENT_PADDING} style={{ background: S3_THEME.background }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_25%,_hsl(330_65%_55%_/_0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,_hsl(263_60%_55%_/_0.06),_transparent_60%)]" />
        <S3Atmosphere isExporting={isExporting} particleCount={10} primaryHue={330} secondaryHue={263} tertiaryHue={185} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div {...m(0)} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ borderColor: S3_ACCENT.rose.border, background: S3_ACCENT.rose.bg }}>
            <Map className="w-3.5 h-3.5" style={{ color: S3_ACCENT.rose.text }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: S3_ACCENT.rose.text }}>Hoja de Ruta</span>
          </div>
        </motion.div>

        <motion.h1 {...m(0.08)} className="text-5xl 2xl:text-6xl font-black text-white tracking-tight mb-3">
          Recorrido de{' '}
          <span style={{
            background: 'linear-gradient(135deg, hsl(330 85% 68%), hsl(280 70% 65%), hsl(185 70% 60%))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 25px hsl(330 85% 68% / 0.4))',
          }}>Hoy</span>
        </motion.h1>
        <motion.div
          className="h-0.5 rounded-full mx-auto max-w-[120px] origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 85% 68% / 0.6), hsl(280 70% 65% / 0.6), transparent)' }}
          initial={isExporting ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: S3_EASE }}
        />
        <motion.p {...m(0.15)} className="text-white/35 text-lg mt-4 mb-14 max-w-md mx-auto">
          4 módulos · ~95 minutos · De la teoría a la práctica
        </motion.p>

        {/* Module cards with connecting line */}
        <div className="relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-[60px] left-[10%] right-[10%] h-px" style={{ background: 'linear-gradient(90deg, hsl(330 65% 55% / 0.3), hsl(263 60% 55% / 0.3), hsl(38 80% 55% / 0.3), hsl(160 65% 50% / 0.3))' }} />
          
          {/* Animated progress on line */}
          {!isExporting && (
            <motion.div
              className="absolute top-[59.5px] left-[10%] h-[2px] rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(330 65% 55%), hsl(263 60% 55%), hsl(38 80% 55%), hsl(160 65% 50%))' }}
              initial={{ width: '0%' }}
              animate={{ width: '80%' }}
              transition={{ delay: 0.6, duration: 2.5, ease: S3_EASE }}
            />
          )}

          <div className="grid grid-cols-4 gap-5">
            {MODULES.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div key={i} {...m(0.2 + i * 0.12)} className="flex flex-col items-center">
                  {/* Number node */}
                  <div className="relative mb-5">
                    {!isExporting && (
                      <motion.div
                        className="absolute -inset-2 rounded-full"
                        style={{ border: `1.5px solid ${mod.accent.dot}`, opacity: 0.15 }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0, 0.15] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    )}
                    <div className="w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center relative z-10"
                      style={{ borderColor: mod.accent.dot, background: mod.accent.bg }}>
                      <span className="text-2xl font-black" style={{ color: mod.accent.text }}>{mod.num}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    className="relative group w-full rounded-2xl border overflow-hidden flex-1"
                    style={{ borderColor: mod.accent.border, background: mod.accent.bg }}
                    {...(isExporting ? {} : { whileHover: { scale: 1.04, y: -4 } })}
                  >
                    {!isExporting && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: `linear-gradient(105deg, transparent 35%, ${mod.accent.text.replace(')', ' / 0.1)')} 50%, transparent 65%)` }}
                        animate={{ x: ['-150%', '250%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4, delay: i * 0.5 }}
                      />
                    )}
                    <div className="relative p-5 flex flex-col items-center gap-3">
                      <Icon className="w-6 h-6" style={{ color: mod.accent.text }} />
                      <p className="text-sm font-black text-white">{mod.title}</p>
                      
                      {/* Tool pills */}
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {mod.tools.map((tool, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-full text-[9px] font-semibold border"
                            style={{ borderColor: `${mod.accent.text}20`, color: `${mod.accent.text}70`, background: `${mod.accent.text}05` }}>
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Time */}
                      <span className="text-[10px] font-bold mt-1" style={{ color: `${mod.accent.text}50` }}>{mod.time}</span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <S3Footer sectionLabel="AGENDA" />
    </div>
  );
}
