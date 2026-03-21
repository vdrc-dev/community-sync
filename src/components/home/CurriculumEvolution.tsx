import { motion } from 'framer-motion';
import { GitBranch, ArrowRight, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

const VERSIONS = [
  {
    version: 'V1',
    period: 'Abr — May 2025',
    gens: 'Gen 001 — 002',
    hue: 200,
    highlight: 'Fundamentos',
    sessions: [
      { n: 1, title: 'Organización Digital', tools: ['Gmail', 'Chrome', 'Passwords'] },
      { n: 2, title: 'IA para Productividad', tools: ['ChatGPT', 'Gemini'] },
      { n: 3, title: 'Bases Relacionales', tools: ['Airtable', 'Google Sheets'] },
      { n: 4, title: 'Automatización', tools: ['Zapier', 'Lovable (intro)'] },
    ],
  },
  {
    version: 'V2',
    period: 'Jun — Sep 2025',
    gens: 'Gen 003 — 006',
    hue: 263,
    highlight: 'IA Avanzada',
    sessions: [
      { n: 1, title: 'Eficiencia Digital', tools: ['Inbox Zero', 'Bitwarden', 'Perfiles Chrome'] },
      { n: 2, title: 'IA para Productividad', tools: ['ChatGPT', 'Gemini', 'Claude', 'Prompts CROP'] },
      { n: 3, title: 'Bases Relacionales', tools: ['Airtable', 'Interfaces', 'Automatizaciones'] },
      { n: 4, title: 'Automatización + Dev', tools: ['Zapier', 'Lovable', 'Supabase'] },
    ],
  },
  {
    version: 'V3',
    period: 'Oct 2025 — Hoy',
    gens: 'Gen 007 — 011',
    hue: 160,
    highlight: 'Vibe Coding',
    isCurrent: true,
    sessions: [
      { n: 1, title: 'Higiene Digital', tools: ['Inbox Zero', 'Bitwarden', 'Markdown', 'Granola'] },
      { n: 2, title: 'IA & Productividad', tools: ['CROP', 'Context Engineering', 'Metaprompting', 'Notebook LM'] },
      { n: 3, title: 'Presentaciones con IA', tools: ['Gamma', 'Napkin', 'Coolors', 'Fontjoy', 'Claude Code'] },
      { n: 4, title: 'Vibe Coding', tools: ['PRD', 'Lovable', 'Supabase', 'Cursor', 'GitHub', 'Deploy'] },
    ],
  },
] as const;

const KEY_CHANGES = [
  { from: 'Airtable + Zapier', to: 'Lovable + Supabase + Cursor', icon: '🔄' },
  { from: 'Bases relacionales teóricas', to: 'Apps full-stack funcionales', icon: '🚀' },
  { from: 'Automatización con Zapier', to: 'Vibe Coding + Deploy', icon: '💻' },
  { from: 'Presentaciones manuales', to: 'Gamma + Napkin + Claude Code', icon: '🎨' },
  { from: 'Prompts básicos', to: 'CROP + Context Engineering + Metaprompting', icon: '🧠' },
];

export function CurriculumEvolution() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="mesh-gradient opacity-10" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50">
            <GitBranch className="w-3.5 h-3.5 text-primary/40" />
            /// EVOLUCIÓN_CURRICULAR
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight mt-3">
            Un currículo que <span className="text-gradient-live">evoluciona</span>
          </h2>
          <p className="text-muted-foreground/60 max-w-2xl text-base sm:text-lg mt-3 font-light">
            3 versiones en 12 meses — de Airtable + Zapier a Lovable + Supabase + Cursor. El contenido se actualiza con cada generación.
          </p>
          <div className="mt-8 max-w-xs">
            <div className="separator-diamond"><span /></div>
          </div>
        </motion.div>

        {/* Version timeline */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-5 max-w-7xl mx-auto mb-16">
          {VERSIONS.map((v, vIdx) => (
            <motion.div
              key={v.version}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: vIdx * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div
                className="absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                style={{ background: `hsl(${v.hue} 70% 55% / 0.08)` }}
              />

              <div className="glass-prismatic glass-specular card-light-leak relative h-full p-6 sm:p-7 rounded-2xl group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden border border-white/[0.04]">
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-25 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, hsl(${v.hue} 70% 55%), transparent)` }}
                />

                {/* Serif anchor */}
                <div
                  className="absolute -bottom-4 -right-2 select-none pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500"
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: 'clamp(80px, 10vw, 120px)',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    lineHeight: 0.85,
                    color: `hsl(${v.hue} 60% 55%)`,
                  }}
                >
                  {v.version}
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="stat-serif text-2xl"
                        style={{
                          background: `linear-gradient(180deg, hsl(${v.hue} 70% 72%), hsl(${v.hue} 70% 45%))`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {v.version}
                      </span>
                      {v.isCurrent && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono"
                          style={{ background: `hsl(${v.hue} 70% 55% / 0.1)`, border: `1px solid hsl(${v.hue} 70% 55% / 0.3)`, color: `hsl(${v.hue} 70% 55%)` }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `hsl(${v.hue} 70% 55%)` }} />
                          ACTUAL
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground/40">{v.period}</p>
                    <p className="text-[10px] font-mono text-muted-foreground/30">{v.gens}</p>
                  </div>
                  <span
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
                    style={{
                      background: `hsl(${v.hue} 70% 55% / 0.06)`,
                      borderColor: `hsl(${v.hue} 70% 55% / 0.15)`,
                      color: `hsl(${v.hue} 70% 55%)`,
                    }}
                  >
                    {v.highlight}
                  </span>
                </div>

                {/* Sessions */}
                <div className="space-y-3">
                  {v.sessions.map((s) => (
                    <div key={s.n} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono font-bold"
                        style={{
                          background: `hsl(${v.hue} 70% 55% / 0.08)`,
                          color: `hsl(${v.hue} 70% 55%)`,
                          border: `1px solid hsl(${v.hue} 70% 55% / 0.15)`,
                        }}
                      >
                        S{s.n}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{s.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {s.tools.map((tool) => (
                            <span
                              key={tool}
                              className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                              style={{
                                background: `hsl(${v.hue} 70% 55% / 0.05)`,
                                color: `hsl(${v.hue} 70% 55% / 0.7)`,
                                border: `1px solid hsl(${v.hue} 70% 55% / 0.1)`,
                              }}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key changes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60">Cambios Clave V1 → V3</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {KEY_CHANGES.map((change, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-xl p-4 group hover:border-white/[0.08] transition-all duration-300"
              >
                <span className="text-lg mb-2 block">{change.icon}</span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-red-400/60 line-through font-light">{change.from}</span>
                </div>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <ArrowRight className="w-3 h-3 text-primary/50 shrink-0" />
                  <span className="text-primary font-medium">{change.to}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
