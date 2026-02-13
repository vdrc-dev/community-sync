import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Presentation, ArrowRight, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

const modules = [
  {
    number: 1,
    title: 'Higiene Digital',
    description: 'Inbox Zero en Gmail y Outlook, Bitwarden, perfiles de navegador, Granola para notas de reunión y carpeta "inicio día" para tu rutina digital.',
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    textColor: 'text-blue-400',
    hoverTitle: 'group-hover:text-blue-400',
    icon: '🛡️',
  },
  {
    number: 2,
    title: 'IA & Productividad',
    description: 'ChatGPT (O3, Canvas, GPTs), Claude, Gemini, Perplexity, Manus. Metaprompts, proyectos, memoria, App Script, Zapier y Notebook LM.',
    color: 'from-primary/20 to-primary/5',
    borderColor: 'border-primary/20 hover:border-primary/40',
    textColor: 'text-primary',
    hoverTitle: 'group-hover:text-primary',
    icon: '🤖',
  },
  {
    number: 3,
    title: 'Presentaciones con IA',
    description: 'Gama para slides rápidas, Beautiful.ai para diagramas paramétricos, Napkin para infografías, Canva para kits de marca y Colors + Font Joy.',
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/20 hover:border-purple-500/40',
    textColor: 'text-purple-400',
    hoverTitle: 'group-hover:text-purple-400',
    icon: '📊',
  },
  {
    number: 4,
    title: 'Vibe Coding',
    description: 'Lovable + Supabase + GitHub: la triada. Airtable para datos, Faces App para landing pages, Codex para mejoras automáticas y Cursor para proyectos locales.',
    color: 'from-accent/20 to-accent/5',
    borderColor: 'border-accent/20 hover:border-accent/40',
    textColor: 'text-accent',
    hoverTitle: 'group-hover:text-accent',
    icon: '💻',
  },
];

export function PresentationsPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary/70">
            /// PRESENTACIONES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Material de{' '}
            <span className="text-gradient">cada módulo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg mt-2">
            Slides interactivas de los 4 módulos del taller — accede desde nuestra plataforma de presentaciones
          </p>
        </motion.div>

        {/* Module cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative"
            >
              <Link to={`/presentations/module/${mod.number}`}>
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-100 blur-md transition-all duration-500`} />

                <div className={`glass glass-specular relative h-full p-5 sm:p-6 rounded-2xl group-hover:border-white/[0.1] transition-all duration-500 overflow-hidden`}>
                  <span className="font-mono text-xs tracking-widest text-muted-foreground/40 mb-3 block">
                    Módulo {mod.number}
                  </span>

                  <div className="text-2xl sm:text-3xl mb-3">{mod.icon}</div>

                  <h3 className={`font-semibold text-sm sm:text-base mb-2 ${mod.hoverTitle} transition-colors`}>
                    {mod.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {mod.description}
                  </p>

                  <div className={`flex items-center gap-1.5 text-xs font-medium ${mod.textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                    <Presentation className="w-3.5 h-3.5" />
                    <span>Ver slides</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 px-6 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5 font-mono transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group"
          >
            <Link to="/presentations">
              <Layers className="w-4 h-4 mr-2 text-purple-400" />
              VER TODAS LAS PRESENTACIONES
              <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
