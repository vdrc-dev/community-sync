import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const MANUAL_SECTIONS = [
  { title: 'Rol Profesional', example: '"Soy gerente de marketing en empresa B2B SaaS, 15 personas a cargo"', icon: '👤' },
  { title: 'Estilo de Comunicación', example: '"Directo, sin rodeos. Bullets sobre párrafos largos"', icon: '💬' },
  { title: 'Herramientas que Uso', example: '"Notion, Slack, Figma, Google Workspace, HubSpot"', icon: '🛠️' },
  { title: 'Contexto de Empresa', example: '"Startup chilena, mercado LATAM, ARR $2M, 50 clientes"', icon: '🏢' },
  { title: 'Preferencias de Output', example: '"Español, Markdown, máximo 500 palabras por respuesta"', icon: '📋' },
  { title: 'Anti-patrones', example: '"No uses emojis excesivos, no seas genérico, no repitas lo que dije"', icon: '🚫' },
];

const TOOLS_PLACEMENT = [
  { tool: 'Claude', where: 'Configuración → Profile → Personal Preferences' },
  { tool: 'ChatGPT', where: 'Configuración → Custom Instructions' },
  { tool: 'Gemini', where: 'Gems → Crear Gem personal' },
];

export function G11S1Slide14ContextMethod() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">
        <motion.div {...m(0)} className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.purple.text }}>Módulo 04 — Context Engineering</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">El Manual</h2>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>Digital</h2>
          <G11GreenLine className="max-w-xs mb-2" />
          <p className="text-white/40 text-sm">
            Un archivo <code className="px-2 py-0.5 rounded text-xs font-mono" style={{ color: G11.purple.text, background: G11.purple.bg }}>manual.md</code> que le dice a la IA exactamente quién eres
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Manual sections grid */}
          <div className="lg:col-span-7">
            <motion.div {...m(0.1)} className="p-5 rounded-xl border"
              style={{ borderColor: G11.purple.border, background: `linear-gradient(135deg, ${G11.purple.bg}, rgba(0,0,0,0.3))` }}>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4" style={{ color: G11.purple.text }} />
                <span className="text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: G11.purple.text }}>manual.md — Secciones Clave</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MANUAL_SECTIONS.map((s, i) => (
                  <motion.div key={s.title} {...m(0.15 + i * 0.05)}
                    className="p-3 rounded-xl border"
                    style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">{s.icon}</span>
                      <h4 className="text-white font-black text-xs">{s.title}</h4>
                    </div>
                    <p className="text-white/30 text-[10px] italic leading-snug">{s.example}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Before/After + Tools */}
          <div className="lg:col-span-5 space-y-3">
            <motion.div {...m(0.3)} className="p-4 rounded-xl border"
              style={{ borderColor: G11.rose.border, background: `linear-gradient(135deg, ${G11.rose.bg}, rgba(0,0,0,0.3))` }}>
              <div className="text-[10px] font-black tracking-wider uppercase mb-2" style={{ color: G11.rose.text }}>❌ Sin Contexto</div>
              <div className="p-2.5 rounded-lg mb-2" style={{ background: 'rgba(0,0,0,0.35)' }}>
                <p className="text-white/45 text-[11px] font-mono">"Dame ideas para marketing"</p>
              </div>
              <p className="text-white/40 text-[11px] leading-relaxed">→ 10 tips genéricos que aplican para cualquier empresa...</p>
            </motion.div>

            <motion.div {...m(0.4)} className="p-4 rounded-xl border"
              style={{ borderColor: G11.emerald.border, background: `linear-gradient(135deg, ${G11.emerald.bg}, rgba(0,0,0,0.3))` }}>
              <div className="text-[10px] font-black tracking-wider uppercase mb-2" style={{ color: G11.emerald.text }}>✅ Con manual.md activo</div>
              <div className="p-2.5 rounded-lg mb-2" style={{ background: 'rgba(0,0,0,0.35)' }}>
                <p className="text-white/45 text-[11px] font-mono">"Dame ideas para marketing"</p>
              </div>
              <p className="text-white/40 text-[11px] leading-relaxed">→ 5 estrategias específicas para tu B2B SaaS en LATAM con $2M ARR...</p>
            </motion.div>

            <motion.div {...m(0.5)} className="p-4 rounded-xl border"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <h4 className="text-[10px] font-black tracking-wider uppercase text-white/40 mb-3">📌 Dónde usar tu Manual</h4>
              <ul className="space-y-2.5">
                {TOOLS_PLACEMENT.map(t => (
                  <li key={t.tool} className="flex items-center gap-2.5 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: G11.purple.text }} />
                    <strong className="text-white/75 font-black">{t.tool}:</strong>
                    <span className="text-white/35">{t.where}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
