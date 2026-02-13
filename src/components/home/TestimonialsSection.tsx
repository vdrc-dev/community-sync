import { motion } from 'framer-motion';
import { Quote, Star, Sparkles } from 'lucide-react';

const testimonials = [
  {
    quote: "Afilar la sierra es invertir tiempo en mejorar las propias herramientas. Si quieren ser más productivos, paren — y afilen.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC",
    generation: "Filosofía",
    rating: 5,
  },
  {
    quote: "La habilidad importante hoy no es Excel avanzado ni Power BI — es la capacidad de aprender nuevas herramientas y cambiar las viejas lo más rápido posible.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC",
    generation: "Mentalidad",
    rating: 5,
  },
  {
    quote: "Si ustedes se suben al carro ahora es como haber agarrado ChatGPT en noviembre del 2022. Las oportunidades están ahí para quien actúe.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC",
    generation: "Vibe Coding",
    rating: 5,
  },
  {
    quote: "Ustedes agregan valor en la estrategia, lo que quieren comunicar — no en el diagramito, la burbujita. Eso lo hace la IA.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC",
    generation: "Presentaciones",
    rating: 5,
  },
  {
    quote: "El SaaS está muerto: hoy se pueden crear bases de datos e interfaces sin programar. Lo que antes costaba millones, hoy se hace en una tarde.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC",
    generation: "Software",
    rating: 5,
  },
  {
    quote: "La diferencia entre quienes usan las herramientas y quienes no, es la acción. No es necesario ser un genio — es necesario practicar.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC",
    generation: "Acción",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* /// TESTIMONIOS label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">/// FILOSOFÍA_VDRC</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Principios del <span className="text-gradient">taller</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg mt-2">
            Frases clave que guían cada sesión del Taller de Productividad Digital con IA
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
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
                {/* Quote icon */}
                <div className="mb-4">
                  <Sparkles className="w-5 h-5 text-primary/60" />
                </div>

                <p className="text-foreground/85 text-sm mb-5 leading-relaxed italic">
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
