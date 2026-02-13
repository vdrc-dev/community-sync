import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, ArrowUpRight, Globe, Presentation, ChevronUp } from 'lucide-react';

const footerLinks = {
  aprendizaje: [
    { label: 'Generaciones', href: '/generations' },
    { label: 'Presentaciones', href: '/presentations' },
    { label: 'Herramientas', href: '/tools' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'Lab IA', href: '/playground' },
    { label: 'Prompts', href: '/prompts' },
  ],
  comunidad: [
    { label: 'Espacios', href: '/community' },
    { label: 'Chat', href: '/chat' },
    { label: 'Foro', href: '/forum' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Calendario', href: '/calendar' },
  ],
  ecosistema: [
    { label: 'vdrc.cl', href: 'https://vdrc.cl', external: true },
    { label: 'Talleres', href: 'https://vdrc.cl/talleres', external: true },
    { label: 'Gen 11 — Inscríbete', href: 'https://vdrc.cl/talleres', external: true },
    { label: 'Contacto', href: 'mailto:contacto@vdrc.cl', external: true },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.04] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container relative mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4"
          >
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg overflow-hidden">
                <img src="/logos/vdrc-icon.png" alt="VDRC" className="w-full h-full object-cover" />
              </div>
              <div>
                <img src="/logos/vdrc-green.png" alt="VDRC" className="h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] text-muted-foreground font-mono tracking-wider block mt-0.5">COMMUNITY PORTAL</span>
              </div>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              10 generaciones. +200 participantes. Tu hub para dominar la productividad digital con IA.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2.5 py-1.5 rounded-xl glass-pill hover:border-primary/15">
                <Globe className="w-3 h-3" />
                vdrc.cl
              </a>
              <Link to="/presentations" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-purple-400 transition-colors px-2.5 py-1.5 rounded-xl glass-pill hover:border-purple-500/15">
                <Presentation className="w-3 h-3" />
                Presentaciones
              </Link>
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], sectionIdx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIdx * 0.08 }}
              className="lg:col-span-3"
            >
              <h4 className="font-mono font-semibold text-[10px] tracking-[0.2em] uppercase mb-5 text-foreground">
                {title}
                <span className="block h-0.5 w-8 bg-gradient-to-r from-primary to-transparent mt-2 rounded-full" />
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div className="relative h-px w-full mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} <span className="text-foreground">VDRC</span> &middot; Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Hecho con</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>en Chile</span>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-md hover:bg-primary/5 min-h-[36px]"
              aria-label="Volver arriba"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              Arriba
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
