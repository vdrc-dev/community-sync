import { motion } from 'framer-motion';
import { Sparkles, Brain, Code2, Presentation, Database, Zap, Users, Lightbulb, TrendingUp } from 'lucide-react';

const CATEGORY_ACCENTS: Record<string, { hue: number; icon: typeof Sparkles }> = {
  'Filosofía': { hue: 160, icon: Sparkles },
  'Mentalidad': { hue: 263, icon: Brain },
  'Vibe Coding': { hue: 340, icon: Code2 },
  'Presentaciones': { hue: 45, icon: Presentation },
  'Software': { hue: 200, icon: Database },
  'Acción': { hue: 120, icon: Zap },
  'Participante': { hue: 180, icon: Users },
  'Descubrimiento': { hue: 300, icon: Lightbulb },
  'Productividad': { hue: 50, icon: TrendingUp },
};

const testimonials = [
  {
    quote: "Hay un tipo cortando un árbol con una sierra oxidada. Covey le dice: '¿Por qué no parás y afilás la sierra?' — 'No tengo tiempo.' Eso es lo que le pasa a toda la gente. Lo que ustedes están haciendo hoy es afilar la sierra.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC · Gen 002",
    generation: "Filosofía",
    rating: 5,
  },
  {
    quote: "Piénsenlo como un practicante con tres doctorados — brillante, pero sin contexto. No sabe cómo evaluar un proyecto inmobiliario ni cómo se financia en Chile. Esa aplicación se la tienen que dar ustedes. Eso es Context Engineering.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC · Gen 010",
    generation: "Mentalidad",
    rating: 5,
  },
  {
    quote: "Gente que no tenía idea cómo programar y que ocupaba ChatGPT para avivarse en los correos, ahora están haciendo software para visualizar proyectos georreferenciados. No tengo ninguna duda de que ustedes también lo van a poder hacer.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC · Gen 010",
    generation: "Vibe Coding",
    rating: 5,
  },
  {
    quote: "ChatGPT es el copiloto diario para conversaciones y estrategia. Notebook LM es para investigar en profundidad cualquier tema. Claude es el asistente de trabajo para Excel, PowerPoint y programación.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC · Gen 010",
    generation: "Software",
    rating: 5,
  },
  {
    quote: "Conozco demasiada gente que pasa de largo los domingos preparando un directorio, pero nunca pasarían de largo un domingo automatizando el PowerPoint. Tienen que aprender a delegar en tecnología antes que en personas.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC · Gen 010",
    generation: "Acción",
    rating: 5,
  },
  {
    quote: "El conocimiento que se enseñó hoy costaría unos 20 millones de pesos si contrataban a un profesional. Lo que ustedes pueden hacer ahora con Lovable, Supabase y Cloud Code es realmente épico.",
    author: "Vicente Donoso R.",
    role: "Instructor VDRC · Gen 009",
    generation: "Presentaciones",
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
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">/// DIRECTO_DEL_TALLER</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Frases que <span className="text-gradient">cambian cabezas</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg mt-2">
            Extractos reales de sesiones con generaciones 8, 9 y 10 — sin filtro, directo del taller
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
          {testimonials.map((testimonial, i) => {
            const accent = CATEGORY_ACCENTS[testimonial.generation] || { hue: 160, icon: Sparkles };
            const CategoryIcon = accent.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 80 }}
                className="group relative"
              >
                <div className="glass glass-specular relative h-full p-6 rounded-2xl group-hover:border-white/[0.1] transition-all duration-500 overflow-hidden">
                  {/* Subtle accent top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, hsl(${accent.hue} 70% 55%), transparent)` }}
                  />

                  {/* Hover shimmer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `linear-gradient(105deg, transparent 30%, hsl(${accent.hue} 70% 55% / 0.03) 50%, transparent 70%)` }}
                  />

                  {/* Category icon */}
                  <div className="mb-4 flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: `hsl(${accent.hue} 70% 55% / 0.1)`, border: `1px solid hsl(${accent.hue} 70% 55% / 0.15)` }}
                    >
                      <CategoryIcon className="w-4 h-4" style={{ color: `hsl(${accent.hue} 70% 55%)` }} />
                    </div>
                  </div>

                  <p className="text-foreground/85 text-sm mb-5 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        color: `hsl(${accent.hue} 70% 55%)`,
                        background: `hsl(${accent.hue} 70% 55% / 0.08)`,
                        border: `1px solid hsl(${accent.hue} 70% 55% / 0.15)`,
                      }}
                    >
                      {testimonial.generation}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Participant voices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent/60 mb-6 block">/// VOCES_PARTICIPANTES</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
            {[
              {
                quote: "Ayer tuve una comida con amigos y mi señora, para reírse, contó que me había transformado en un experto en inteligencia artificial. Hoy les hice un tutorial de cómo hacer carpetas en Chrome. Quedaron impactados.",
                author: "Jaime Ruiz-Tagle",
                role: "Ing. Civil, Inversiones · Gen 004",
                generation: "Productividad",
              },
              {
                quote: "Hice una investigación de la industria automotriz, generé un podcast con IA y se los mandé a los directores. Estaban felices. Me metí a Manus y estoy de muerte — es otra cosa.",
                author: "Ángeles Hevia",
                role: "Ing. Comercial · Gen 007",
                generation: "Descubrimiento",
              },
              {
                quote: "Hice un mini dashboard con Cursor para un archivo importante de la empresa. No era tan bonito como el de Vicente, pero funcionó bastante bien. Una aplicación que habría costado meses.",
                author: "Silvia Tupper",
                role: "Profesional Telecosms · Gen 006",
                generation: "Participante",
              },
              {
                quote: "La IA ya me ahorró mucho tiempo — transformó 300 páginas de informes financieros en 20. Eso antes lo hacía un equipo completo. Ahora quiero ver si también puede componer música.",
                author: "Luis Claro González",
                role: "Ing. Agrónomo, Family Office · Gen 005",
                generation: "Descubrimiento",
              },
              {
                quote: "Estuve trabajando el domingo con IA y avancé caleta. Le pedí que me formulara una cotización, me hizo el formulario y después conseguí que otro chat me la validara. Super productivo.",
                author: "Juan Lacassie",
                role: "Ex-gerente general Grupo Paneles · Gen 007",
                generation: "Productividad",
              },
              {
                quote: "Me metí a Cursor, en 20 minutos tenía resultados útiles. Es como tener un profesor particular que te guía paso a paso. Yo no sabía programar nada.",
                author: "Martín Irarrázabal",
                role: "Winteri Arquitectos · Gen 004",
                generation: "Participante",
              },
              {
                quote: "Estoy usando Claude para mis finanzas personales — le tiro la cartola, clasifica los gastos y me dice dónde se arranca el dinero. Es mi asistente personal ahora.",
                author: "Titi Alvarez",
                role: "Consultora Sostenibilidad · Gen 007",
                generation: "Descubrimiento",
              },
              {
                quote: "Apliqué lo que aprendí en clase con Gemini para identificar materiales reciclables en construcción. Le pedí un deep search y una infografía. Funcionó super bien a la primera.",
                author: "Gerardo Isla",
                role: "Consultor Construcción · Gen 007",
                generation: "Participante",
              },
              {
                quote: "Tengo siete planillas Excel y ahora lo cambié todo. Boté Excel. Las boletas, la facturación, los comités — todo migrado. Y la UF se calcula automática.",
                author: "Jaime Loayza",
                role: "Ing. Civil, Inversiones · Gen 004",
                generation: "Productividad",
              },
              {
                quote: "Actualicé Chat GPT, pagué Cloud y configuré mi correo. No me demoré nada y la reacción es la misma: qué agradable dominar el correo. Son esos pequeños hacks de la vida.",
                author: "Nicolás Nazar",
                role: "Enólogo, Gerente Comercial · Gen 010",
                generation: "Productividad",
              },
              {
                quote: "Hoy día el agente de Claude en Chrome me hizo una plantilla en HubSpot que hace un par de años pagué un millón de pesos para que alguien la hiciera. Impresionante.",
                author: "Vicente Donoso R.",
                role: "Instructor VDRC · Gen 009",
                generation: "Descubrimiento",
              },
              {
                quote: "Cargué un libro entero en Notebook LM y le pido cuestionarios sobre capítulos específicos. Es increíble para el aprendizaje — como tener un tutor privado.",
                author: "Jaime Loayza",
                role: "Ing. Civil, Inversiones · Gen 010",
                generation: "Descubrimiento",
              },
            ].map((t, i) => {
              const accent = CATEGORY_ACCENTS[t.generation] || { hue: 180, icon: Users };
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group"
                >
                  <div className="glass relative h-full p-5 rounded-2xl group-hover:border-white/[0.08] transition-all duration-500 overflow-hidden">
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-20 group-hover:opacity-50 transition-opacity"
                      style={{ background: `linear-gradient(90deg, transparent, hsl(${accent.hue} 70% 55%), transparent)` }}
                    />
                    <p className="text-foreground/75 text-xs mb-4 leading-relaxed italic">"{t.quote}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-xs">{t.author}</p>
                        <p className="text-[10px] text-muted-foreground/70">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
