import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';

const footerLinks = {
  recursos: [
    { label: 'Generaciones', href: '/generations' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'Herramientas', href: '/tools' },
    { label: 'Playground', href: '/playground' },
  ],
  comunidad: [
    { label: 'Foro', href: '/forum' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Calendario', href: '/calendar' },
  ],
  herramientas: [
    { label: 'ROI Calculator', href: '/roi-calculator' },
    { label: 'Mis Herramientas', href: '/my-tools' },
    { label: 'Notas Rápidas', href: '/quick-notes' },
    { label: 'Bookmarks', href: '/bookmarks' },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-transparent to-background/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-mono font-bold text-primary">VD</span>
              </div>
              <span className="font-mono font-bold text-lg">VDRC Workshop</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-4">
              Portal de participantes del Taller de Productividad Digital con IA. 
              Tu hub para dominar las herramientas del futuro.
            </p>
            <a 
              href="https://vdrc.cl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Visitar vdrc.cl
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2">
              {footerLinks.comunidad.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Herramientas</h4>
            <ul className="space-y-2">
              {footerLinks.herramientas.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VDRC Workshop Portal. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Hecho con <Heart className="w-4 h-4 text-red-500 fill-red-500" /> en Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
