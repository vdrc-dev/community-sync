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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4">
            Lo que dicen los <span className="text-gradient">participantes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Historias reales de productividad transformada
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 rounded-xl glass border-border/50"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
