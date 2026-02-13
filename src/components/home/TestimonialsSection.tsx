import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Los workflows interactivos cambiaron completamente mi forma de trabajar. Ahorro mínimo 2 horas diarias en tareas repetitivas.",
    author: "María G.",
    role: "Product Manager",
    generation: "Gen 9",
    rating: 5,
  },
  {
    quote: "Por fin entiendo cómo usar ChatGPT de manera productiva. Los prompts del taller son oro puro.",
    author: "Carlos R.",
    role: "Desarrollador Full-Stack",
    generation: "Gen 10",
    rating: 5,
  },
  {
    quote: "La calculadora de ROI me ayudó a justificar la inversión en herramientas IA ante mi equipo con datos concretos.",
    author: "Ana L.",
    role: "Fundadora, Startup Tech",
    generation: "Gen 8",
    rating: 4,
  },
  {
    quote: "Llegué sin saber nada de IA y ahora automatizo reportes que antes me tomaban medio día. Increíble la comunidad.",
    author: "Diego M.",
    role: "Analista de Datos",
    generation: "Gen 10",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Clean background */}

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
            Lo que dicen los <span className="text-gradient">participantes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg mt-2">
            Historias reales de productividad transformada
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 80 }}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-2xl bg-card/90 border border-border/40 group-hover:border-primary/25 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-3.5 h-3.5 ${j < testimonial.rating ? 'fill-primary text-primary' : 'text-muted-foreground/20'}`} />
                  ))}
                </div>

                <p className="text-foreground/85 text-sm mb-5 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <span className="text-[10px] font-mono text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
                    {testimonial.generation}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
