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
    { label: 'Prompts', href: '/prompts' },
  ],
  guias: [
    { label: 'Personalizacion IA', href: '/personalizacion-ia' },
    { label: 'Guia de Instalacion', href: '/guia-instalacion' },
    { label: 'Comunidad', href: '/community' },
    { label: 'Calendario', href: '/calendar' },
    { label: 'Calculadora ROI', href: '/roi-calculator' },
  ],
  ecosistema: [
    { label: 'vdrc.cl', href: 'https://vdrc.cl', external: true },
    { label: 'Gen 11 — Inscribete', href: 'https://vdrc.cl/talleres', external: true },
    { label: 'In-Company', href: 'mailto:contacto@vdrc.cl?subject=Consulta%20In-Company', external: true },
    { label: 'Materiales (Drive)', href: 'https://drive.google.com/drive/folders/1f9E7O0O6y6oFiX7YTUYnyz6z9QTbV3VD?usp=sharing', external: true },
    { label: 'Contacto', href: 'mailto:contacto@vdrc.cl', external: true },
  ],
};

const COLUMN_HUES = [160, 263, 340];

import React from 'react';

export const Footer = React.forwardRef<HTMLElement>((_, ref) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Top holographic border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(152 70% 55% / 0.2), hsl(263 60% 55% / 0.15), hsl(340 60% 55% / 0.12), hsl(45 80% 55% / 0.08), transparent)' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-background to-background" />
      <div className="absolute inset-0 constellation-dots opacity-20" />

      <div className="container relative mx-auto px-4 py-16 sm:py-20">
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
                <span className="text-[10px] text-muted-foreground/50 font-mono tracking-wider block mt-0.5">COMMUNITY PORTAL</span>
              </div>
            </Link>

            <p className="text-muted-foreground/50 text-sm leading-relaxed max-w-sm font-light">
              11 generaciones. 5 programas In-Company. +150 profesionales. Tu hub para dominar la productividad digital con IA.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors px-2.5 py-1.5 rounded-xl glass-pill hover:border-primary/15">
                <Globe className="w-3 h-3" />
                vdrc.cl
              </a>
            </div>

            {/* Serif watermark */}
            <div
              className="select-none pointer-events-none opacity-[0.03] mt-4"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: '64px',
                fontWeight: 900,
                fontStyle: 'italic',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              VDRC
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
                <span
                  className="block h-[1px] w-10 mt-2.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, hsl(${COLUMN_HUES[sectionIdx]} 70% 55% / 0.5), transparent)` }}
                />
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-1.5 text-sm text-muted-foreground/60 hover:text-foreground transition-all duration-300 py-1 px-2 -mx-2 rounded-lg hover:bg-white/[0.03]"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all duration-300" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="group/link flex items-center gap-1.5 text-sm text-muted-foreground/60 hover:text-foreground transition-all duration-300 py-1 px-2 -mx-2 rounded-lg hover:bg-white/[0.03]"
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

        {/* Separator — multi-hue holographic sweep */}
        <div className="relative h-px w-full mb-8 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(160 70% 55% / 0.3) 20%, hsl(263 70% 55% / 0.3) 40%, hsl(340 70% 55% / 0.3) 60%, hsl(45 80% 55% / 0.2) 80%, transparent 100%)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/50 font-mono">
            &copy; {new Date().getFullYear()} <span className="text-foreground/70 font-semibold">VDRC</span> &middot; Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50 group/heart cursor-default">
              <span>Hecho con</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 group-hover/heart:scale-125 transition-transform duration-300" />
              <span>en Chile</span>
            </div>
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-primary transition-all px-3 py-2 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 min-h-[36px]"
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
});
Footer.displayName = 'Footer';
