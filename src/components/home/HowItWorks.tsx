import { motion } from 'framer-motion';
import { Shield, Brain, Rocket, ArrowRight, Presentation, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    icon: Shield,
    title: 'Higiene Digital',
    description: 'Inbox Zero: tu bandeja de entrada es tu gestor de trabajo. Perfiles de navegador separados por cuenta, Bitwarden para contraseñas, Granola para transcripciones, resolución de pantalla en Windows, Markdown en Google Docs. La clase "fome" que te cambia la vida digital.',
    hue: 200,
    serifAnchor: 'HD',
    realExample: '"No me demoré nada y la reacción es la misma: qué agradable dominar el correo." — Nicolás N., Gen 010',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Productividad con IA',
    description: '5 capas de personalización en ChatGPT, metodología CROP para prompts, Context Engineering, chunking de contexto, metaprompting. ChatGPT para estrategia, Claude para Excel y modelos financieros, Perplexity como reemplazo de Google, Notebook LM para investigar cualquier tema.',
    hue: 263,
    serifAnchor: 'IA',
    realExample: '"Un practicante con tres doctorados que no conoce tu empresa — eso es ChatGPT sin contexto." — Vicente, Gen 010',
  },
  {
    number: '03',
    icon: Presentation,
    title: 'Storytelling con IA',
    description: 'Gamma y Beautiful.ai para slides automáticas, Napkin para infografías McKinsey, Canva para kits de marca, Coolors para paletas. ChatGPT arma la estrategia → Gamma pone el diseño. PowerPoint full automatizable.',
    hue: 340,
    serifAnchor: 'ST',
    realExample: '"Ustedes agregan valor en la estrategia, no en mover la burbujita del PowerPoint." — Vicente',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Vibe Coding',
    description: 'Gemini para diseñar la UI → Lovable para el full stack → Supabase para backend con Postgres → GitHub para versionar → Claude Code + Playwright como agente en Chrome. De una idea a software funcional con login, CRUD, y deploy.',
    hue: 160,
    serifAnchor: 'VC',
    realExample: '"Claude Code me hizo una integración CRM + ERP que costó 100 lucas en tokens, pero habría costado millones." — Vicente, Gen 010',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Atmospheric layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      <div className="mesh-gradient opacity-20" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/20 mb-6"
          >
            4 SESIONES INTENSIVAS // 100% PRACTICO
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display tracking-tight mb-4">
            De cero a <span className="text-gradient-live">productivo con IA</span>
          </h2>
          <p className="text-muted-foreground/60 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Cada generacion cubre 4 modulos progresivos. Sin teoria vacia — solo herramientas reales aplicadas a tu trabajo profesional.
          </p>
          <div className="mt-8 max-w-[120px] mx-auto">
            <div className="separator-diamond"><span /></div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px hidden lg:block -translate-y-1/2"
            style={{
              background: `linear-gradient(90deg, transparent, hsl(200 70% 55% / 0.2), hsl(263 60% 55% / 0.2), hsl(340 60% 55% / 0.2), hsl(160 65% 45% / 0.2), transparent)`,
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                <div className="glass-prismatic glass-specular card-light-leak relative p-6 sm:p-7 rounded-2xl group-hover:border-white/[0.12] transition-all duration-500 text-center h-full overflow-hidden border border-white/[0.04]">
                  {/* Holographic accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, hsl(${step.hue} 70% 55%), hsl(${(step.hue + 40) % 360} 60% 55% / 0.5), transparent)` }}
                  />

                  {/* Giant serif anchor — editorial depth */}
                  <div
                    className="absolute -bottom-4 -right-2 font-serif select-none pointer-events-none transition-opacity duration-500 opacity-[0.03] group-hover:opacity-[0.07]"
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: 'clamp(80px, 10vw, 120px)',
                      fontWeight: 900,
                      fontStyle: 'italic',
                      lineHeight: 0.85,
                      color: `hsl(${step.hue} 60% 55%)`,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {step.serifAnchor}
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                    style={{ background: `hsl(${step.hue} 70% 55% / 0.08)` }}
                  />

                  {/* Step icon */}
                  <motion.div
                    className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl p-[2px] mb-5"
                    style={{
                      background: `linear-gradient(135deg, hsl(${step.hue} 70% 55% / 0.2), hsl(${step.hue} 70% 55% / 0.05))`,
                      border: `1px solid hsl(${step.hue} 70% 55% / 0.2)`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: `hsl(${step.hue} 70% 55%)` }} />
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `hsl(${step.hue} 70% 55% / 0.25)` }}
                    />
                  </motion.div>

                  {/* Step number — serif editorial */}
                  <div
                    className="absolute top-3 right-4 stat-serif text-2xl select-none"
                    style={{ color: `hsl(${step.hue} 70% 55% / 0.12)` }}
                  >
                    {step.number}
                  </div>

                  <h3 className="text-lg font-bold mb-3 group-hover:text-foreground transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground/70 text-sm leading-relaxed mb-3 font-light">
                    {step.description}
                  </p>
                  {step.realExample && (
                    <p className="text-xs italic leading-relaxed border-t border-white/[0.04] pt-3 font-light"
                      style={{ color: `hsl(${step.hue} 70% 55% / 0.45)` }}
                    >
                      {step.realExample}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] transition-all duration-300 btn-shine">
            <Link to="/auth">
              Quiero dominar la IA
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
