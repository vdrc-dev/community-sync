import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, ArrowUpRight, Globe, ChevronUp } from 'lucide-react';

const footerLinks = {
  aprendizaje: [
    { label: 'Generaciones', href: '/generations' },
    { label: 'Herramientas', href: '/tools' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'Diccionario Digital', href: '/dictionary' },
    { label: 'Lab IA', href: '/playground' },
  ],
  guias: [
    { label: 'Personalizacion IA', href: '/personalizacion-ia' },
    { label: 'Guia de Instalacion', href: '/guia-instalacion' },
    { label: 'Comunidad', href: '/community' },
    { label: 'Calendario', href: '/calendar' },
  ],
  ecosistema: [
    { label: 'vdrc.cl', href: 'https://vdrc.cl', external: true },
    { label: 'Gen 11 — Inscribete', href: 'https://vdrc.cl/talleres', external: true },
    { label: 'Contacto', href: 'mailto:contacto@vdrc.cl', external: true },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.04] overflow-hidden section-glow">
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

            <p className="text-muted-foreground/60 text-sm leading-relaxed max-w-sm font-light">
              11 generaciones. +150 participantes. Tu hub para dominar la productividad digital con IA.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2.5 py-1.5 rounded-xl glass-pill hover:border-primary/15">
                <Globe className="w-3 h-3" />
                vdrc.cl
              </a>
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
              <h4 className="font-mono font-semibold text-[10px] tracking-[0.25em] uppercase mb-6 text-foreground/80">
                {title}
                <span className="block h-[1px] w-10 mt-2.5 rounded-full" style={{ background: 'linear-gradient(90deg, hsl(152 70% 55% / 0.4), transparent)' }} />
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 py-1 px-2 -mx-2 rounded-lg hover:bg-white/[0.03]"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all duration-300" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="group/link flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 py-1 px-2 -mx-2 rounded-lg hover:bg-white/[0.03]"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all duration-300 text-primary" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Separator — animated gradient */}
        <div className="relative h-px w-full mb-8 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(160 70% 55% / 0.25) 30%, hsl(263 70% 55% / 0.25) 50%, hsl(340 70% 55% / 0.25) 70%, transparent 100%)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} <span className="text-foreground font-semibold">VDRC</span> &middot; Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground group/heart cursor-default">
              <span>Hecho con</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 group-hover/heart:scale-125 transition-transform duration-300" />
              <span>en Chile</span>
            </div>
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-all px-3 py-2 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 min-h-[36px]"
              aria-label="Volver arriba"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronUp className="w-3.5 h-3.5" />
              Arriba
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
