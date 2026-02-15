import { useState } from 'react';
import { motion } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { Crown, Cpu, Gauge, Leaf, HardDrive, Code2, Search, Brain, Zap, DollarSign, ArrowRight } from 'lucide-react';
import { S2Shell, useS2Motion } from './shared';

const ACCENT = {
  amber: { border: 'hsl(38 90% 55% / 0.4)', bg: 'hsl(38 90% 55% / 0.1)', text: 'hsl(38 85% 65%)', glow: 'hsl(38 90% 55% / 0.25)', dot: 'hsl(38 90% 58%)' },
  violet: { border: 'hsl(263 60% 55% / 0.4)', bg: 'hsl(263 60% 55% / 0.1)', text: 'hsl(263 60% 75%)', glow: 'hsl(263 60% 55% / 0.25)', dot: 'hsl(263 60% 60%)' },
  blue: { border: 'hsl(217 70% 55% / 0.35)', bg: 'hsl(217 70% 55% / 0.08)', text: 'hsl(217 70% 70%)', glow: 'hsl(217 70% 55% / 0.2)', dot: 'hsl(217 70% 60%)' },
  emerald: { border: 'hsl(160 65% 45% / 0.35)', bg: 'hsl(160 65% 45% / 0.08)', text: 'hsl(160 65% 60%)', glow: 'hsl(160 65% 45% / 0.2)', dot: 'hsl(160 65% 50%)' },
  gray: { border: 'hsl(220 10% 50% / 0.3)', bg: 'hsl(220 10% 50% / 0.06)', text: 'hsl(220 10% 65%)', glow: 'hsl(220 10% 50% / 0.15)', dot: 'hsl(220 10% 55%)' },
  cyan: { border: 'hsl(185 70% 50% / 0.35)', bg: 'hsl(185 70% 50% / 0.08)', text: 'hsl(185 70% 65%)', glow: 'hsl(185 70% 50% / 0.2)', dot: 'hsl(185 70% 55%)' },
  pink: { border: 'hsl(330 65% 55% / 0.35)', bg: 'hsl(330 65% 55% / 0.08)', text: 'hsl(330 65% 70%)', glow: 'hsl(330 65% 55% / 0.2)', dot: 'hsl(330 65% 58%)' },
} as const;

type AccentKey = keyof typeof ACCENT;

const TIER_ICONS: Record<string, React.ElementType> = { amber: Crown, violet: Cpu, blue: Gauge, emerald: Leaf, gray: HardDrive };
const MODEL_ICONS: Record<string, React.ElementType> = { violet: Code2, cyan: Search, emerald: Search, pink: Brain, amber: DollarSign };

const PYRAMID_WIDTHS = ['40%', '55%', '70%', '85%', '100%'];

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  y: `${5 + Math.random() * 90}%`,
  size: 1 + Math.random() * 2,
  dur: 6 + Math.random() * 8,
  delay: Math.random() * 4,
  opacity: 0.08 + Math.random() * 0.2,
}));

export function S2Slide06Landscape() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(6);
  const [activeTier, setActiveTier] = useState(0);

  const sectionLabel = (content.sectionLabel as string) || '2. El Paisaje de Modelos en 2026';
  const title = (content.title as string) || 'No todos los modelos sirven para todo';
  const footnote = (content.footnote as string) || 'La clave no es elegir el más potente, sino el más adecuado para cada tarea.';

  const defaultTiers = [
    { name: 'Frontier', desc: 'Claude 4.6 Opus · GPT-5.2 · Gemini 3 Ultra', color: 'amber', oneLiner: 'Los más potentes y costosos. Para tareas donde necesitas la máxima calidad posible: código complejo, investigación profunda, razonamiento científico.' },
    { name: 'Reasoning', desc: 'o3 · o4-mini · DeepSeek-R2', color: 'violet', oneLiner: 'Especializados en pensar paso a paso. Ideales para matemáticas, lógica y problemas que requieren razonamiento encadenado.' },
    { name: 'General', desc: 'Claude 4.6 Sonnet · GPT-5.2-mini · Gemini 3 Pro', color: 'blue', oneLiner: 'El 80% de tu día a día. Buen equilibrio entre calidad y precio. Gemini 3 Pro: 1M de contexto a $2 por millón de tokens.' },
    { name: 'Efficiency', desc: 'GPT-5.2-nano · Claude 4.6 Haiku · Gemini 3 Flash', color: 'emerald', oneLiner: 'Rápidos y económicos. Perfectos para clasificar correos, resumir textos o procesar grandes volúmenes de datos.' },
    { name: 'Edge / Local', desc: 'Phi-4 · Llama 4 · Mistral Small 3.2', color: 'gray', oneLiner: 'Funcionan sin internet, directamente en tu computador. Máxima privacidad para datos sensibles.' },
  ];

  const defaultCheatSheet = [
    { need: 'Programar o automatizar', use: 'Claude 4.6 Opus', why: 'El mejor del mundo para escribir código', color: 'violet' },
    { need: 'Investigar un tema a fondo', use: 'Claude 4.6 Opus + Deep Research', why: 'Lee y sintetiza múltiples fuentes automáticamente', color: 'cyan' },
    { need: 'Buscar algo rápido con fuentes', use: 'Perplexity Sonar', why: 'Como Google, pero te da la respuesta con citas', color: 'emerald' },
    { need: 'Resolver un problema complejo', use: 'GPT-5.2 / o3', why: 'Los más inteligentes para lógica y ciencia', color: 'pink' },
    { need: 'Procesar mucho a bajo costo', use: 'Gemini 3 Flash', why: '1M de contexto por solo $0.50', color: 'amber' },
  ];

  const tiers = (content.tiers as Array<{ name: string; desc: string; color: string; oneLiner?: string }>) || defaultTiers;
  const cheatSheet = (content.cheatSheet as Array<{ need: string; use: string; why: string; color: string }>) || defaultCheatSheet;

  const m = useS2Motion();

  return (
    <S2Shell
      footerLabel="PAISAJE DE MODELOS"
      className="flex items-center"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_30%,_hsl(38_50%_35%_/_0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_70%,_hsl(263_45%_35%_/_0.08),_transparent_55%)]" />
      </>}
    >

      {/* Breathing orb */}
      {!isExporting && (
        <motion.div
          className="absolute w-[500px] h-[400px] rounded-full blur-[160px]"
          style={{ left: '15%', top: '25%', background: 'hsl(38 60% 45% / 0.1)' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Particles */}
      {!isExporting && PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: ACCENT.amber.dot }}
          animate={{ y: [0, -20, 0], opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* ── Content: 2 columns ── */}
      <div className="relative z-10 flex items-stretch w-full h-full px-14 lg:px-20 gap-14 py-14">

        {/* ── LEFT: Title + Pyramid ── */}
        <div className="flex flex-col justify-center w-[48%] flex-shrink-0">

          {/* Badge */}
          <motion.div {...m(0.1)} className="mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md"
              style={{ background: ACCENT.amber.bg, borderColor: ACCENT.amber.border }}>
              <Crown className="w-3.5 h-3.5" style={{ color: ACCENT.amber.text }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: ACCENT.amber.text }}>
                {sectionLabel}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div {...m(0.2)}>
            <h1 className="text-4xl 2xl:text-5xl font-black tracking-tight leading-[0.95]"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 95%) 0%, hsl(38 80% 72%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              {title}
            </h1>
            <motion.div {...m(0.3)} className="mt-3 h-[3px] w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, ${ACCENT.amber.dot}, ${ACCENT.violet.dot})` }} />
          </motion.div>

          {/* Pyramid */}
          <motion.div {...m(0.35)} className="mt-8 flex flex-col items-center gap-[7px]">
            {tiers.map((tier, i) => {
              const isActive = i === activeTier;
              const c = tier.color as AccentKey;
              const s = ACCENT[c] || ACCENT.amber;
              const Icon = TIER_ICONS[c] || Crown;

              return (
                <motion.button
                  key={tier.name}
                  onClick={() => setActiveTier(i)}
                  className="relative cursor-pointer text-left"
                  style={{ width: PYRAMID_WIDTHS[i] }}
                  whileHover={isExporting ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="relative flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-300"
                    style={{
                      background: isActive ? s.bg : 'hsl(0 0% 100% / 0.02)',
                      borderColor: isActive ? s.border : 'hsl(0 0% 100% / 0.08)',
                      boxShadow: isActive ? `0 4px 20px ${s.glow}` : 'none',
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isActive ? `${s.dot}18` : 'hsl(0 0% 100% / 0.04)',
                        border: `1.5px solid ${isActive ? s.border : 'hsl(0 0% 100% / 0.1)'}`,
                      }}>
                      <Icon className="w-4 h-4" style={{ color: isActive ? s.text : 'hsl(0 0% 100% / 0.4)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black tracking-tight" style={{ color: isActive ? s.text : 'hsl(0 0% 100% / 0.6)' }}>
                          {tier.name}
                        </span>
                        <span className="text-[10px] font-medium truncate" style={{ color: 'hsl(0 0% 100% / 0.4)' }}>{tier.desc}</span>
                      </div>
                      {isActive && (
                        <motion.p
                          initial={isExporting ? {} : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs mt-1.5 leading-relaxed"
                          style={{ color: 'hsl(0 0% 100% / 0.7)' }}
                        >
                          {(tier as any).oneLiner || tier.desc}
                        </motion.p>
                      )}
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot, boxShadow: `0 0 8px ${s.dot}` }} />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Footnote */}
          <motion.div {...m(0.6)} className="mt-6">
            <div className="flex items-start gap-3">
              <div className="w-[3px] h-8 rounded-full flex-shrink-0 mt-0.5" style={{ background: `linear-gradient(to bottom, ${ACCENT.amber.dot}, transparent)` }} />
              <p className="text-xs italic leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.45)' }}>{footnote}</p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Cheat Sheet ── */}
        <motion.div {...m(0.4)} className="flex flex-col justify-center flex-1 min-w-0">

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4" style={{ color: ACCENT.amber.text }} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: ACCENT.amber.text }}>Guía rápida</span>
            </div>
            <h2 className="text-2xl font-black" style={{ color: 'hsl(0 0% 94%)' }}>
              ¿Qué necesitas hacer?
            </h2>
            <p className="text-xs mt-1" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>Selecciona el modelo según la tarea, no por su nombre.</p>
          </div>

          <div className="space-y-3">
            {cheatSheet.map((row, i) => {
              const c = row.color as AccentKey;
              const s = ACCENT[c] || ACCENT.violet;
              const Icon = MODEL_ICONS[c] || Zap;

              return (
                <motion.div
                  key={i}
                  {...m(0.45 + i * 0.06)}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-300 group"
                  style={{
                    background: 'hsl(0 0% 100% / 0.025)',
                    borderColor: 'hsl(0 0% 100% / 0.08)',
                  }}
                  whileHover={isExporting ? {} : {
                    borderColor: s.border,
                    boxShadow: `0 4px 20px ${s.glow}`,
                  }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.dot}12`, border: `1.5px solid ${s.border}` }}>
                    <Icon className="w-5 h-5" style={{ color: s.text }} />
                  </div>

                  {/* Need */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold" style={{ color: 'hsl(0 0% 92%)' }}>{row.need}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'hsl(0 0% 100% / 0.5)' }}>{row.why}</p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(0 0% 100% / 0.3)' }} />

                  {/* Model recommendation */}
                  <div className="flex-shrink-0 px-4 py-2 rounded-lg border"
                    style={{ background: s.bg, borderColor: s.border }}>
                    <span className="text-sm font-black" style={{ color: s.text }}>{row.use}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

    </S2Shell>
  );
}
