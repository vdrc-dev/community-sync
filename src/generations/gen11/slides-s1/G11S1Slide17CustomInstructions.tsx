/**
 * Slide 17 — IA Personalizada: Memoria & Personalización en Claude
 * Migración de ChatGPT → Claude como sistema central
 */
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const MIGRATION_STEPS = [
  {
    step: '01',
    title: 'Exportar memoria de ChatGPT',
    desc: 'Settings → Data Controls → Export data → descarga el ZIP → abre memory.json',
    icon: '📦',
    accent: G11.rose,
  },
  {
    step: '02',
    title: 'Resumir con Claude',
    desc: 'Pégale el memory.json y pídele: "Resume esto en un bloque de contexto conciso para usar como mi perfil"',
    icon: '🤖',
    accent: G11.amber,
  },
  {
    step: '03',
    title: 'Configurar perfil en Claude',
    desc: 'Claude → Settings → Profile → Personal Preferences → pega el resumen',
    icon: '⚙️',
    accent: G11.purple,
  },
];

const CLAUDE_PREFS = [
  { label: 'Idioma & formato', example: '"Español, bullets, sin introducción genérica, máx 400 palabras"' },
  { label: 'Rol & contexto', example: '"Soy arquitecto en Santiago, proyectos residenciales medianos"' },
  { label: 'Anti-patrones', example: '"No repitas lo que dije, no uses frases como \'claro que sí\'"' },
  { label: 'Proyectos activos', example: '"Actualmente trabajando en licitación municipalidad Lo Barnechea"' },
];

export function G11S1Slide17CustomInstructions() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 70% at 20% 50%, rgba(167,139,250,0.04), transparent 70%)'
      }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-8">

        <motion.div {...m(0)} className="mb-5">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.purple.text }}>
            Módulo 05 — Bonus IA Personalizada
          </p>
          <div className="flex items-end gap-3 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-none">De ChatGPT</h2>
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-none" style={{ color: VDRC_GREEN }}>a Claude</h2>
          </div>
          <G11GreenLine className="max-w-[240px] mt-3 mb-2" />
          <p className="text-white/35 text-sm">Tu memoria no se pierde — se transfiere. Claude es el nuevo centro de operaciones.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Left: Migration steps */}
          <div className="lg:col-span-6 space-y-2.5">
            <p className="text-[9px] font-black tracking-widest uppercase mb-2" style={{ color: G11.amber.text }}>🔄 Cómo migrar tu memoria</p>
            {MIGRATION_STEPS.map((s, i) => (
              <motion.div key={s.step} {...m(0.08 + i * 0.08)}
                className="p-3.5 rounded-xl border flex gap-3"
                style={{ borderColor: s.accent.border, background: `linear-gradient(135deg, ${s.accent.bg}, rgba(0,0,0,0.3))` }}>
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-[9px] font-black" style={{ color: s.accent.text }}>{s.step}</span>
                </div>
                <div>
                  <h4 className="text-white font-black text-xs mb-1">{s.title}</h4>
                  <p className="text-white/40 text-[10px] leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
            <motion.div {...m(0.32)} className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(61,153,112,0.08)', border: '1px solid rgba(61,153,112,0.2)' }}>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: VDRC_GREEN }} />
              <p className="text-white/50 text-[10px] italic">Tip: pídele a Claude que resuma tu memory.json en un bloque de máx. 300 palabras antes de pegarlo.</p>
            </motion.div>
          </div>

          {/* Right: Claude preferences + tip */}
          <div className="lg:col-span-6 space-y-3">
            <motion.div {...m(0.35)} className="p-4 rounded-xl border"
              style={{ borderColor: G11.purple.border, background: `linear-gradient(135deg, ${G11.purple.bg}, rgba(0,0,0,0.3))` }}>
              <p className="text-[9px] font-black tracking-widest uppercase mb-3" style={{ color: G11.purple.text }}>⚙️ Claude → Personal Preferences</p>
              <div className="space-y-2.5">
                {CLAUDE_PREFS.map((p, i) => (
                  <motion.div key={p.label} {...m(0.38 + i * 0.05)} className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black tracking-wider uppercase text-white/50">{p.label}</span>
                    <span className="text-white/30 text-[10px] italic leading-snug">{p.example}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...m(0.55)} className="p-4 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[9px] font-black tracking-widest uppercase text-white/30 mb-3">📌 Dónde configurar en cada herramienta</p>
              <ul className="space-y-2">
                {[
                  { tool: 'Claude', where: 'Settings → Profile → Personal Preferences', main: true },
                  { tool: 'ChatGPT', where: 'Settings → Custom Instructions' },
                  { tool: 'Gemini', where: 'Gems → Crear Gem personal' },
                ].map(t => (
                  <li key={t.tool} className="flex items-center gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: t.main ? VDRC_GREEN : G11.purple.text }} />
                    <span className="text-xs font-black" style={{ color: t.main ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)' }}>{t.tool}:</span>
                    <span className="text-white/35 text-xs">{t.where}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...m(0.65)} className="px-4 py-3 rounded-xl border"
              style={{ borderColor: G11.purple.border, background: G11.purple.bg }}>
              <p className="text-white/40 text-xs italic">
                💡 Claude no tiene "memoria automática" como ChatGPT — pero sus Personal Preferences son más potentes porque tú controlas exactamente qué recuerda.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
