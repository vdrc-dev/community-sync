import { motion } from 'framer-motion';
import { UserPlus, Workflow, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Inicia sesión',
    description: 'Accede con tu cuenta de participante y entra a tu portal personalizado.',
    gradient: 'from-primary to-emerald-400',
    glowColor: 'hsl(142, 76%, 50%)',
  },
  {
    number: '02',
    icon: Workflow,
    title: 'Explora & Practica',
    description: 'Sigue workflows interactivos, prueba herramientas IA y ejecuta prompts en tiempo real.',
    gradient: 'from-accent to-blue-400',
    glowColor: 'hsl(180, 100%, 45%)',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Domina & Automatiza',
    description: 'Mide tu ROI, gana badges y transforma tu productividad con automatizaciones reales.',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'hsl(270, 70%, 50%)',
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
            CÓMO FUNCIONA
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4">
            Tres pasos para <span className="text-gradient glow-text">dominar la IA</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un camino claro desde principiante hasta experto en productividad con IA
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block -translate-y-1/2" />
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px hidden lg:block -translate-y-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.5), transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative group"
              >
                {/* Step card */}
                <div className="relative p-8 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 group-hover:border-primary/30 transition-all duration-500 text-center">
                  {/* Hover glow */}
                  <motion.div
                    className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 blur-md transition-all duration-500`}
                    style={{ zIndex: -1 }}
                  />

                  {/* Step number */}
                  <motion.div
                    className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} p-[2px] mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                  </motion.div>

                  {/* Number badge */}
                  <div className="absolute top-4 right-4 font-mono text-5xl font-black text-muted/30 select-none">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 lg:-right-8 -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-5 h-5 text-primary/50" />
                    </motion.div>
                  </div>
                )}
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
          <Button asChild size="lg" className="h-14 px-8 text-lg glow-primary">
            <Link to="/auth">
              Iniciar sesión
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
