import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideContent } from '@/hooks/useSlideContent';
import { User, Briefcase, Crown, Scale, BarChart3, Code2, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { S2Shell, useS2Motion } from './shared';

const ROLE_ICONS: Record<string, React.ElementType> = {
  'Abogado Tributarista': Scale,
  'UX Designer Senior': Sparkles,
  'CFO con 20 años': BarChart3,
  'Data Analyst': Code2,
};

const ROLE_COLORS = ['violet', 'amber', 'cyan', 'emerald'] as const;
const COLOR_MAP: Record<string, { text: string; bg: string; border: string; glow: string; dot: string }> = {
  violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', glow: 'rgba(139,92,246,0.15)', dot: 'hsl(263 60% 60%)' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', glow: 'rgba(245,158,11,0.15)', dot: 'hsl(38 90% 58%)' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', glow: 'rgba(6,182,212,0.15)', dot: 'hsl(185 65% 55%)' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'rgba(16,185,129,0.15)', dot: 'hsl(160 65% 50%)' },
};

/* Simulated prompt preview for each role */
const ROLE_PREVIEWS: Record<string, { prompt: string; response: string; quality: number }> = {
  'Abogado Tributarista': {
    prompt: '"Eres un abogado tributarista con 15 años de experiencia en Chile. Revisa este contrato de SaaS B2B y marca cláusulas de riesgo fiscal."',
    response: 'Cláusula 4.2: Retención de IVA no aplica en servicios digitales cross-border desde 2024. Cláusula 7.1: Riesgo de doble tributación…',
    quality: 94,
  },
  'UX Designer Senior': {
    prompt: '"Eres un UX Designer Senior de Google con expertise en SaaS B2B. Evalúa este flujo de onboarding y sugiere mejoras de conversión."',
    response: 'Paso 3 tiene 67% de abandono — el formulario de 8 campos debe reducirse a 3. Implementar progressive disclosure…',
    quality: 91,
  },
  'CFO con 20 años': {
    prompt: '"Eres un CFO con 20 años en startups fintech LATAM. Analiza este P&L trimestral y proyecta runway con 3 escenarios."',
    response: 'Escenario base: 14 meses de runway. Burn rate $45K/mes vs MRR $28K. Recomiendo cortar CAC en 30% y renegociar hosting…',
    quality: 96,
  },
  'Data Analyst': {
    prompt: '"Eres un Data Analyst senior especializado en Python y SQL. Estructura este CSV de 50K filas, limpia outliers y crea dashboard."',
    response: 'Detecté 847 duplicados y 2,100 valores nulos en columna "revenue". Pipeline: Pandas → cleaning → Plotly dashboard con 4 KPIs…',
    quality: 89,
  },
};

export function S2Slide13Role() {
  const { isExporting } = useExportContext();
  const content = useSlideContent(12);
  const [activeRole, setActiveRole] = useState(0);

  const question = content.question || '¿Quién es el experto que necesitas?';
  const examples = content.examples || [
    { role: 'Abogado Tributarista', context: 'Revisar contratos y compliance fiscal con visión estratégica' },
    { role: 'UX Designer Senior', context: 'Evaluar flujos de usuario y optimizar conversión' },
    { role: 'CFO con 20 años', context: 'Análisis financiero estratégico y proyecciones' },
    { role: 'Data Analyst', context: 'Estructurar, limpiar y visualizar datos complejos' },
  ];
  const insight = content.insight || 'El rol activa conocimiento especializado latente en el modelo';

  const m = useS2Motion();

  const activeColor = COLOR_MAP[ROLE_COLORS[activeRole]] || COLOR_MAP.violet;
  const currentRole = examples[activeRole]?.role || 'Abogado Tributarista';
  const preview = ROLE_PREVIEWS[currentRole] || ROLE_PREVIEWS['Abogado Tributarista'];

  return (
    <S2Shell
      footerLabel="ARQUITECTURA DE ROLES"
      className="flex flex-col justify-center px-16 2xl:px-20"
      radials={
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(263_70%_45%_/_0.18),_transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,_hsl(38_55%_45%_/_0.1),_transparent_65%)]" />
        </>
      }
    >
      {!isExporting && (
        <>
          <motion.div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            key={activeRole}
            initial={{ opacity: 0 }} animate={{ opacity: 0.35, scale: [1, 1.1, 1] }}
            transition={{ opacity: { duration: 0.3 }, scale: { duration: 8, repeat: Infinity } }}
            style={{ background: `radial-gradient(circle, ${activeColor.glow}, transparent 70%)` }} />
          <motion.div
            className="absolute bottom-[20%] right-[12%] w-[380px] h-[380px] rounded-full blur-[150px]"
            style={{ background: 'hsl(38 90% 55% / 0.10)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.10, 0.20, 0.10] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full justify-center max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-400 to-amber-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Herramienta Clave #1</span>
          </div>
          <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">
            Asignar un <span className="bg-gradient-to-r from-violet-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">"ROL"</span>
          </h1>
          <p className="text-base text-white/55 mt-3 leading-relaxed max-w-[600px]">{question}</p>
        </motion.div>

        {/* Main: 2 columns */}
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          {/* LEFT: Before/After + Role selector */}
          <div>
            {/* Compact before/after */}
            <motion.div {...m(0.1)} className="grid grid-cols-2 gap-3 mb-5">
              {/* Sin Rol */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-3.5 h-3.5 text-red-400/60" />
                  <span className="text-red-400/70 text-[9px] font-bold tracking-wider uppercase">Sin Rol</span>
                </div>
                <p className="text-white/40 text-xs italic mb-2">"Dime cómo mejorar mi web."</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full bg-white/5">
                    <div className="h-full w-[25%] rounded-full bg-red-500/40" />
                  </div>
                  <span className="text-red-400/50 text-[9px] font-mono">25%</span>
                </div>
              </div>
              {/* Con Rol */}
              <div className="p-4 rounded-xl bg-violet-500/[0.04] border border-violet-500/20 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-3.5 h-3.5 text-violet-400/60" />
                  <span className="text-violet-400/70 text-[9px] font-bold tracking-wider uppercase">Con Rol</span>
                </div>
                <p className="text-violet-300/60 text-xs italic mb-2">"Eres un experto UX de Google…"</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full bg-white/5">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-500 to-violet-400" />
                  </div>
                  <span className="text-violet-400/70 text-[9px] font-mono">92%</span>
                </div>
              </div>
            </motion.div>

            {/* Role selector */}
            <motion.div {...m(0.2)} className="space-y-2.5">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-2">Selecciona un rol</p>
              {examples.map((ex, i) => {
                const color = COLOR_MAP[ROLE_COLORS[i]] || COLOR_MAP.violet;
                const Icon = ROLE_ICONS[ex.role] || Crown;
                const isActive = activeRole === i;
                return (
                  <motion.button key={i} onClick={() => setActiveRole(i)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden ${isActive ? `${color.bg} ${color.border}` : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'}`}
                    whileHover={isExporting ? undefined : { scale: 1.01 }} whileTap={isExporting ? undefined : { scale: 0.99 }}>
                    {isActive && !isExporting && (
                      <motion.div layoutId="role-glow" className="absolute inset-0 rounded-xl"
                        style={{ background: `radial-gradient(ellipse at 20% 50%, ${color.glow}, transparent 70%)` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                    )}
                    <div className="relative flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isActive ? `${color.bg} border ${color.border}` : 'bg-white/5 border border-white/[0.06]'}`}>
                        <Icon className={`w-4 h-4 ${isActive ? color.text : 'text-white/30'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm ${isActive ? color.text : 'text-white/60'}`}>{ex.role}</p>
                        <p className={`text-xs mt-0.5 ${isActive ? 'text-white/40' : 'text-white/20'}`}>{ex.context}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? `bg-current ${color.text}` : 'bg-white/10'}`} />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT: Live Preview Panel */}
          <motion.div {...m(0.3)}>
            <AnimatePresence mode="wait">
              <motion.div key={activeRole}
                initial={isExporting ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={isExporting ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border overflow-hidden"
                style={{ background: 'hsl(0 0% 4% / 0.9)', borderColor: 'hsl(0 0% 100% / 0.06)' }}>

                {/* Header */}
                <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: 'hsl(0 0% 100% / 0.06)', background: 'hsl(0 0% 100% / 0.02)' }}>
                  <Briefcase className="w-4 h-4" style={{ color: activeColor.dot }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Vista Previa del Prompt</span>
                  <span className={`text-[9px] ml-auto px-2 py-0.5 rounded-full ${activeColor.bg} ${activeColor.text}`}>
                    {currentRole}
                  </span>
                </div>

                {/* Generated prompt */}
                <div className="px-5 py-4 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.04)' }}>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/25 mb-2 block">Prompt generado</span>
                  <p className="text-sm font-mono leading-relaxed" style={{ color: activeColor.dot }}>
                    {preview.prompt}
                  </p>
                </div>

                {/* AI Response */}
                <div className="px-5 py-4 border-b" style={{ borderColor: 'hsl(0 0% 100% / 0.04)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-3 h-3 text-white/20" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/25">Respuesta de la IA</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(0 0% 100% / 0.6)' }}>
                    {preview.response}
                  </p>
                </div>

                {/* Quality */}
                <div className="px-5 py-3 flex items-center gap-3" style={{ background: `linear-gradient(90deg, ${activeColor.glow}, transparent)` }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'hsl(0 0% 100% / 0.3)' }}>Calidad</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: 'hsl(0 0% 100% / 0.04)' }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: activeColor.dot }}
                      {...(isExporting
                        ? { style: { background: activeColor.dot, width: `${preview.quality}%` } }
                        : { key: `q-${activeRole}`, initial: { width: '0%' }, animate: { width: `${preview.quality}%` },
                            transition: { delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }, style: { background: activeColor.dot } }
                      )} />
                  </div>
                  <span className="text-sm font-bold font-mono" style={{ color: activeColor.dot }}>{preview.quality}%</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Insight */}
            <motion.div {...m(0.5)} className="mt-4 p-4 rounded-xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(245,158,11,0.06))' }}>
              <div className="absolute inset-0 rounded-xl border border-violet-500/20" />
              <div className="relative flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-violet-300/80 text-sm leading-relaxed">{insight}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </S2Shell>
  );
}
