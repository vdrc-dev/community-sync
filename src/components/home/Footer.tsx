import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, ArrowUpRight, Globe, Users, Presentation, Rocket, ArrowRight } from 'lucide-react';

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
    { label: 'Notas Rapidas', href: '/quick-notes' },
    { label: 'Bookmarks', href: '/bookmarks' },
  ],
  vdrc: [
    { label: 'vdrc.cl', href: 'https://vdrc.cl', external: true },
    { label: 'Talleres', href: 'https://vdrc.cl/talleres', external: true },
    { label: 'Presentaciones', href: 'https://vdrc.lovable.app', external: true },
    { label: 'Contacto', href: 'mailto:contacto@vdrc.cl', external: true },
  ],
};

const ecosystemSites = [
  {
    label: 'vdrc.cl',
    description: 'Sitio principal e inscripciones',
    href: 'https://vdrc.cl',
    icon: Globe,
    color: 'text-primary',
    borderColor: 'border-primary/20 hover:border-primary/50',
    bgColor: 'bg-primary/5 hover:bg-primary/10',
  },
  {
    label: 'Comunidad',
    description: 'Estas aqui — portal de recursos',
    href: '/',
    icon: Users,
    color: 'text-accent',
    borderColor: 'border-accent/20',
    bgColor: 'bg-accent/5',
    isCurrent: true,
  },
  {
    label: 'Presentaciones',
    description: 'Slides interactivas del taller',
    href: 'https://vdrc.lovable.app',
    icon: Presentation,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20 hover:border-purple-500/50',
    bgColor: 'bg-purple-500/5 hover:bg-purple-500/10',
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.05),transparent_70%)]" />

      <div className="container relative mx-auto px-4 py-20">
        {/* Gen 11 Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <a
            href="https://vdrc.cl/talleres"
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 sm:p-8 rounded-2xl bg-card/60 backdrop-blur-xl border border-accent/20 group-hover:border-accent/50 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,200,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,200,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
              <div className="relative flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0"
                >
                  <Rocket className="w-6 h-6 text-accent" />
                </motion.div>
                <div>
                  <h3 className="font-mono font-bold text-lg sm:text-xl">
                    Generacion <span className="text-accent">11</span> — Marzo 2026
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Inscripciones abiertas. Cupos limitados para el proximo taller.
                  </p>
                </div>
              </div>
              <div className="relative flex items-center gap-2 text-accent font-mono font-semibold group-hover:gap-3 transition-all shrink-0">
                INSCRIBETE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand + Ecosystem Cards */}
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

            {/* Ecosystem visual cards */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60">/// ECOSISTEMA</span>
              <div className="space-y-2 mt-3">
                {ecosystemSites.map((site) => {
                  const content = (
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${site.bgColor} border ${site.borderColor} transition-all duration-300 ${site.isCurrent ? 'opacity-80' : 'group'}`}>
                      <site.icon className={`w-4 h-4 ${site.color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-foreground block">{site.label}</span>
                        <span className="text-[10px] text-muted-foreground">{site.description}</span>
                      </div>
                      {!site.isCurrent && <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />}
                      {site.isCurrent && <span className="text-[9px] font-mono text-accent/70 shrink-0">AQUI</span>}
                    </div>
                  );

                  if (site.isCurrent) {
                    return <div key={site.label}>{content}</div>;
                  }
                  return (
                    <a key={site.label} href={site.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  );
                })}
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
            &copy; {new Date().getFullYear()} <span className="text-foreground">VDRC</span> &middot; Todos los derechos reservados
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>en</span>
            <span className="font-medium text-foreground">Chile</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
