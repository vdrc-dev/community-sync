import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Los workflows interactivos cambiaron completamente mi forma de trabajar. Ahorro mínimo 2 horas diarias.",
    author: "María G.",
    role: "Product Manager",
    rating: 5,
  },
  {
    quote: "Por fin entiendo cómo usar ChatGPT de manera productiva. Los prompts del taller son oro puro.",
    author: "Carlos R.",
    role: "Desarrollador",
    rating: 5,
  },
  {
    quote: "La calculadora de ROI me ayudó a justificar la inversión en herramientas IA con datos concretos.",
    author: "Ana L.",
    role: "CEO Startup",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(142_76%_36%/0.06),transparent_50%)]" />

      <div className="container mx-auto px-4 relative">
        {/* /// TESTIMONIOS label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">/// TESTIMONIOS</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Lo que dicen los <span className="text-gradient glow-text">participantes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg mt-2">
            Historias reales de productividad transformada
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/30 group-hover:to-accent/30 blur-sm transition-all duration-500" />

              <div className="relative h-full p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 group-hover:border-primary/30 transition-all duration-500">
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-primary/60" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-foreground/90 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div>
                  <p className="font-semibold text-foreground font-mono text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
