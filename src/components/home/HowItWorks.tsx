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
    gradient: 'from-primary to-emerald-400',
    glowColor: 'hsl(142, 76%, 50%)',
    realExample: '"No me demoré nada y la reacción es la misma: qué agradable dominar el correo." — Nicolás N., Gen 010',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Productividad con IA',
    description: '5 capas de personalización en ChatGPT, metodología CROP para prompts, Context Engineering, chunking de contexto, metaprompting. ChatGPT para estrategia, Claude para Excel y modelos financieros, Perplexity como reemplazo de Google, Notebook LM para investigar cualquier tema.',
    gradient: 'from-accent to-blue-400',
    glowColor: 'hsl(180, 100%, 45%)',
    realExample: '"Un practicante con tres doctorados que no conoce tu empresa — eso es ChatGPT sin contexto." — Vicente, Gen 010',
  },
  {
    number: '03',
    icon: Presentation,
    title: 'Storytelling con IA',
    description: 'Gamma y Beautiful.ai para slides automáticas, Napkin para infografías McKinsey, Canva para kits de marca, Coolors para paletas. ChatGPT arma la estrategia → Gamma pone el diseño. PowerPoint full automatizable.',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'hsl(270, 70%, 50%)',
    realExample: '"Ustedes agregan valor en la estrategia, no en mover la burbujita del PowerPoint." — Vicente',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Vibe Coding',
    description: 'Gemini para diseñar la UI → Lovable para el full stack → Supabase para backend con Postgres → GitHub para versionar → Claude Code + Playwright como agente en Chrome. De una idea a software funcional con login, CRUD, y deploy.',
    gradient: 'from-orange-500 to-yellow-500',
    glowColor: 'hsl(30, 90%, 50%)',
    realExample: '"Claude Code me hizo una integración CRM + ERP que costó 100 lucas en tokens, pero habría costado millones." — Vicente, Gen 010',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/20 mb-6"
          >
            4 SESIONES INTENSIVAS // 100% PRACTICO
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4">
            De cero a <span className="text-gradient">productivo con IA</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cada generacion cubre 4 modulos progresivos. Sin teoria vacia — solo herramientas reales aplicadas a tu trabajo profesional.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px hidden lg:block -translate-y-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3), transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative group"
              >
                {/* Step card */}
                <div className="glass glass-specular relative p-7 rounded-2xl group-hover:border-white/[0.1] transition-all duration-500 text-center h-full">
                  {/* Hover glow */}
                  <motion.div
                    className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 blur-md transition-all duration-500`}
                    style={{ zIndex: -1 }}
                  />

                  {/* Step number */}
                  <motion.div
                    className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} p-[2px] mb-5`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </motion.div>

                  {/* Number badge */}
                  <div className="absolute top-3 right-4 font-mono text-xl font-bold text-muted-foreground/15 select-none">
                    {step.number}
                  </div>

                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  {step.realExample && (
                    <p className="text-xs italic text-primary/50 leading-relaxed border-t border-white/[0.04] pt-3">
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
          <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] transition-all duration-300">
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
