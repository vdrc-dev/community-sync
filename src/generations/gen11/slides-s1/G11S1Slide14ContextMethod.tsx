import { motion } from 'framer-motion';
import { Bot, FileText, Brain, Zap, Copy, ArrowRight, CheckCircle } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const MANUAL_SECTIONS = [
  { title: 'Rol Profesional', example: '"Soy gerente de marketing en empresa B2B SaaS, 15 personas a cargo"', icon: '👤' },
  { title: 'Estilo de Comunicación', example: '"Directo, sin rodeos. Prefiero bullets sobre párrafos"', icon: '💬' },
  { title: 'Herramientas que Uso', example: '"Notion, Slack, Figma, Google Workspace, HubSpot"', icon: '🛠️' },
  { title: 'Contexto de Empresa', example: '"Startup chilena, mercado LATAM, ARR $2M, 50 clientes"', icon: '🏢' },
  { title: 'Preferencias de Output', example: '"Respuestas en español, formato Markdown, máximo 500 palabras"', icon: '📋' },
  { title: 'Anti-patrones', example: '"No uses emojis excesivos, no seas genérico, no repitas lo que dije"', icon: '🚫' },
];

const BEFORE_AFTER = {
  before: { prompt: '"Dame ideas para marketing"', response: '10 tips genéricos que aplican para cualquier empresa...', quality: 'Genérico' },
  after: { prompt: '"Dame ideas para marketing" (con manual.md)', response: '5 estrategias específicas para tu B2B SaaS en LATAM con $2M ARR...', quality: 'Específico' },
};

export function G11S1Slide14ContextMethod() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,_rgba(139,92,246,0.12),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_70%,_rgba(16,185,129,0.08),_transparent_60%)]" />
      </>}>
      <div className="relative z-10 w-full max-w-6xl px-6 sm:px-10">
        <motion.div {...m(0)} className="mb-5 sm:mb-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">El Manual Digital</h2>
          <p className="text-white/40 mt-1 text-sm">Un archivo <code className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded text-xs">manual.md</code> que le dice a la IA quién eres</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Manual sections */}
          <div className="lg:col-span-7">
            <motion.div {...m(0.1)} className="p-5 rounded-2xl border bg-white/[0.02]" style={{ borderColor: G11.purple.border }}>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4" style={{ color: G11.purple.text }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: G11.purple.text }}>manual.md — Secciones</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MANUAL_SECTIONS.map((s, i) => (
                  <motion.div key={s.title} {...m(0.15 + i * 0.05)}
                    className="p-3 rounded-xl border bg-white/[0.01]" style={{ borderColor: 'hsl(0 0% 100% / 0.05)' }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">{s.icon}</span>
                      <h4 className="text-white font-bold text-xs">{s.title}</h4>
                    </div>
                    <p className="text-white/30 text-[10px] italic leading-snug">{s.example}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Before/After + Tips */}
          <div className="lg:col-span-5 space-y-3">
            {/* Before */}
            <motion.div {...m(0.3)} className="p-4 rounded-xl border" style={{ borderColor: G11.rose.border, background: G11.rose.bg }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold" style={{ color: G11.rose.text }}>❌ Sin Contexto</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/30 mb-2">
                <p className="text-white/50 text-[11px] font-mono">{BEFORE_AFTER.before.prompt}</p>
              </div>
              <p className="text-white/40 text-[11px]">→ {BEFORE_AFTER.before.response}</p>
            </motion.div>

            {/* After */}
            <motion.div {...m(0.4)} className="p-4 rounded-xl border" style={{ borderColor: G11.emerald.border, background: G11.emerald.bg }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold" style={{ color: G11.emerald.text }}>✅ Con manual.md</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/30 mb-2">
                <p className="text-white/50 text-[11px] font-mono">{BEFORE_AFTER.after.prompt}</p>
              </div>
              <p className="text-white/40 text-[11px]">→ {BEFORE_AFTER.after.response}</p>
            </motion.div>

            {/* Where to put it */}
            <motion.div {...m(0.5)} className="p-4 rounded-xl border bg-white/[0.02]" style={{ borderColor: 'hsl(0 0% 100% / 0.08)' }}>
              <h4 className="text-xs font-bold text-white/50 mb-3">📌 Dónde usar tu Manual</h4>
              <ul className="space-y-2">
                {[
                  { tool: 'ChatGPT', where: 'Configuración → Custom Instructions' },
                  { tool: 'Claude', where: 'Configuración → Estilo' },
                  { tool: 'Gemini', where: 'Gems → crear gem personal' },
                ].map(t => (
                  <li key={t.tool} className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3" style={{ color: G11.purple.text }} />
                    <strong className="text-white/70">{t.tool}:</strong>
                    <span className="text-white/40">{t.where}</span>
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
