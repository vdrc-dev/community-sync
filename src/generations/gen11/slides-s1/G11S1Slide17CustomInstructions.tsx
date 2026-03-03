/**
 * Slide 17 — IA Personalizada: Instrucciones Personalizadas
 * ChatGPT Custom Instructions
 */
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const SECTIONS = [
  {
    icon: '👤', title: '¿Quién eres?',
    desc: 'Profesión, área de trabajo, contexto y preferencias.',
    example: '"Soy arquitecto en Chile, prefiero respuestas directas con ejemplos prácticos"',
  },
  {
    icon: '🎯', title: '¿Cómo responder?',
    desc: 'Idioma, tono (formal/cercano), formato (listas/prosa), estructura.',
    example: '"Chile, formato europeo (1.234,56), fechas DD/MM/AAAA, monedas CLP/UF"',
  },
  {
    icon: '🧠', title: 'Memoria',
    desc: 'ChatGPT recuerda lo que le dices entre conversaciones. Úsalo a tu favor.',
    example: '"Recuerda siempre que prefiero bullets sobre párrafos"',
  },
];

const EXAMPLES = [
  {
    profile: 'Marketing Digital',
    config: 'Respuestas prácticas con métricas claras (CTR, ROI). Tono profesional y cercano.',
    accent: G11.blue,
  },
  {
    profile: 'Docente',
    config: 'Lenguaje pedagógico con fuentes confiables. Cuadros comparativos y ejemplos históricos.',
    accent: G11.amber,
  },
  {
    profile: 'Emprendedor',
    config: 'Ideas accionables, frameworks (Lean Canvas, SWOT). Directo y estratégico.',
    accent: G11.purple,
  },
];

const TOOLS = [
  { tool: 'ChatGPT', where: 'Configuración → Custom Instructions' },
  { tool: 'Claude', where: 'Configuración → Estilo de respuesta' },
  { tool: 'Gemini', where: 'Gems → Crear Gem personal' },
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

        <motion.div {...m(0)} className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.purple.text }}>
            Módulo 05 — Bonus IA Personalizada
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-none">Instrucciones</h2>
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-none" style={{ color: VDRC_GREEN }}>Personalizadas</h2>
          </div>
          <G11GreenLine className="max-w-[240px] mt-4 mb-3" />
          <p className="text-white/35 text-sm">ChatGPT responde mejor si le dices quién eres y cómo te gusta recibir la info.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Left: 3 config sections */}
          <div className="lg:col-span-5 space-y-3">
            {SECTIONS.map((s, i) => (
              <motion.div key={s.title} {...m(0.1 + i * 0.07)}
                className="p-4 rounded-xl border"
                style={{ borderColor: G11.purple.border, background: `linear-gradient(135deg, ${G11.purple.bg}, rgba(0,0,0,0.3))` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{s.icon}</span>
                  <h4 className="text-white font-black text-sm">{s.title}</h4>
                </div>
                <p className="text-white/40 text-xs leading-relaxed mb-2">{s.desc}</p>
                <p className="text-white/25 text-[10px] italic leading-relaxed">{s.example}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: examples + tools */}
          <div className="lg:col-span-7 space-y-3">

            {/* Profile examples */}
            <motion.div {...m(0.28)} className="p-4 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[9px] font-black tracking-widest uppercase text-white/30 mb-3">Ejemplos de Configuración</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {EXAMPLES.map((ex, i) => (
                  <motion.div key={ex.profile} {...m(0.32 + i * 0.06)}
                    className="p-3 rounded-xl border"
                    style={{ borderColor: ex.accent.border, background: `linear-gradient(135deg, ${ex.accent.bg}, rgba(0,0,0,0.3))` }}>
                    <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: ex.accent.text }}>
                      {ex.profile}
                    </p>
                    <p className="text-white/40 text-[10px] leading-relaxed">{ex.config}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Where to use */}
            <motion.div {...m(0.45)} className="p-4 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-[9px] font-black tracking-widest uppercase text-white/30 mb-3">📌 Dónde configurarlo</p>
              <ul className="space-y-2.5">
                {TOOLS.map(t => (
                  <li key={t.tool} className="flex items-center gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: G11.purple.text }} />
                    <span className="text-white/70 text-xs font-black">{t.tool}:</span>
                    <span className="text-white/35 text-xs">{t.where}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...m(0.55)} className="px-4 py-3 rounded-xl border"
              style={{ borderColor: G11.purple.border, background: G11.purple.bg }}>
              <p className="text-white/40 text-xs italic">
                💡 Revisa tus instrucciones después de una semana de uso para identificar brechas y refinar.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
