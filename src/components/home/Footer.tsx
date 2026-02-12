import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, ArrowUpRight, Mail } from 'lucide-react';

const footerLinks = {
  recursos: [
    { label: 'Generaciones', href: '/generations' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'Herramientas', href: '/tools' },
    { label: 'Playground', href: '/playground' },
  ],
  comunidad: [
    { label: 'Espacios', href: '/community' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Calendario', href: '/calendar' },
    { label: 'Prompts', href: '/prompts' },
  ],
  herramientas: [
    { label: 'ROI Calculator', href: '/roi-calculator' },
    { label: 'Mi Stack IA', href: '/my-tools' },
    { label: 'Notas Rápidas', href: '/quick-notes' },
    { label: 'Bookmarks', href: '/bookmarks' },
  ],
  vdrc: [
    { label: 'vdrc.cl', href: 'https://vdrc.cl', external: true },
    { label: 'Talleres', href: 'https://vdrc.cl/talleres', external: true },
    { label: 'Presentaciones', href: 'https://vdrc.lovable.app', external: true },
    { label: 'Contacto', href: 'mailto:contacto@vdrc.cl', external: true },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.05),transparent_70%)]" />

      <div className="container relative mx-auto px-4 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="font-mono font-bold text-lg text-gradient">VD</span>
              </div>
              <div>
                <span className="font-mono font-bold text-xl block">VDRC</span>
                <span className="text-xs text-muted-foreground font-mono">Community Portal</span>
              </div>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Tu hub central para dominar la productividad digital con IA. 
              Aprende, practica y conecta con la comunidad de innovadores.
            </p>

            {/* Cross-site navigation - vdrc ecosystem */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60">/// ECOSISTEMA</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { label: 'vdrc.cl', href: 'https://vdrc.cl' },
                  { label: 'Talleres', href: 'https://vdrc.cl/talleres' },
                  { label: 'Presentaciones', href: 'https://vdrc.lovable.app' },
                ].map(site => (
                  <a
                    key={site.label}
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                  >
                    {site.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIdx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIdx * 0.1 }}
              className="lg:col-span-2"
            >
              <h4 className="font-mono font-semibold text-[10px] tracking-[0.2em] uppercase mb-6 text-foreground">
                {title}
                <span className="block h-0.5 w-8 bg-gradient-to-r from-primary to-transparent mt-2 rounded-full" />
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
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
        <div className="relative h-px w-full mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} <span className="text-foreground">VDRC</span> · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>en</span>
            <span className="font-medium text-foreground">Chile 🇨🇱</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
