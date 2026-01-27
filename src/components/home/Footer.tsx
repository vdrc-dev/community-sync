import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, Twitter, Linkedin, Instagram, Youtube, Mail, ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';

const footerLinks = {
  recursos: [
    { label: 'Generaciones', href: '/generations', description: 'Explora todas las generaciones' },
    { label: 'Workflows', href: '/workflows', description: 'Automatiza tus procesos' },
    { label: 'Herramientas', href: '/tools', description: 'Descubre herramientas IA' },
    { label: 'Playground', href: '/playground', description: 'Experimenta con prompts' },
  ],
  comunidad: [
    { label: 'Foro', href: '/forum', description: 'Únete a la conversación' },
    { label: 'Leaderboard', href: '/leaderboard', description: 'Compite y gana' },
    { label: 'Calendario', href: '/calendar', description: 'Próximos eventos' },
  ],
  herramientas: [
    { label: 'ROI Calculator', href: '/roi-calculator', description: 'Calcula tu ahorro' },
    { label: 'Mis Herramientas', href: '/my-tools', description: 'Tu stack personal' },
    { label: 'Notas Rápidas', href: '/quick-notes', description: 'Captura ideas al vuelo' },
    { label: 'Bookmarks', href: '/bookmarks', description: 'Tus favoritos' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/vdrc_cl', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
  { icon: Linkedin, href: 'https://linkedin.com/company/vdrc', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
  { icon: Instagram, href: 'https://instagram.com/vdrc.cl', label: 'Instagram', color: 'hover:text-[#E4405F]' },
  { icon: Youtube, href: 'https://youtube.com/@vdrc', label: 'YouTube', color: 'hover:text-[#FF0000]' },
  { icon: Mail, href: 'mailto:contacto@vdrc.cl', label: 'Email', color: 'hover:text-primary' },
];

const FooterLink = ({ to, children, description }: { to: string; children: React.ReactNode; description?: string }) => (
  <motion.div
    whileHover={{ x: 4 }}
    className="group"
  >
    <Link 
      to={to}
      className="relative flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
      </span>
      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
    </Link>
    {description && (
      <p className="text-xs text-muted-foreground/50 mt-0.5 opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        {description}
      </p>
    )}
  </motion.div>
);

const SocialIcon = ({ icon: Icon, href, label, color }: { icon: any; href: string; label: string; color: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.15, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className={`relative p-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 ${color} group`}
  >
    {/* Glow effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-sm" />
    <Icon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
  </motion.a>
);

const GradientSeparator = ({ className = '' }: { className?: string }) => (
  <div className={`relative h-px w-full overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      animate={{ 
        x: ['-100%', '100%'],
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: 'linear' 
      }}
    />
  </div>
);

export function Footer() {
  // Floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    },
  };

  return (
    <footer className="relative border-t border-border/30 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.05),transparent_70%)]" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="container relative mx-auto px-4 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <span className="font-mono font-bold text-lg text-gradient">VD</span>
              </motion.div>
              <div>
                <span className="font-mono font-bold text-xl block">VDRC Workshop</span>
                <span className="text-xs text-muted-foreground">Portal de Participantes</span>
              </div>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Tu hub central para dominar la productividad digital con IA. 
              Aprende, practica y conecta con la comunidad de innovadores.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>

            {/* External link */}
            <motion.a 
              href="https://vdrc.cl" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
            >
              <span className="relative">
                Visitar vdrc.cl
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary/50" />
              </span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </motion.div>
          
          {/* Links Sections */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-mono font-semibold text-sm uppercase tracking-wider mb-6 text-foreground">
              Recursos
              <span className="block h-0.5 w-8 bg-gradient-to-r from-primary to-transparent mt-2 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <FooterLink to={link.href} description={link.description}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-mono font-semibold text-sm uppercase tracking-wider mb-6 text-foreground">
              Comunidad
              <span className="block h-0.5 w-8 bg-gradient-to-r from-accent to-transparent mt-2 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.comunidad.map((link) => (
                <li key={link.href}>
                  <FooterLink to={link.href} description={link.description}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-mono font-semibold text-sm uppercase tracking-wider mb-6 text-foreground">
              Herramientas
              <span className="block h-0.5 w-8 bg-gradient-to-r from-primary via-accent to-transparent mt-2 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.herramientas.map((link) => (
                <li key={link.href}>
                  <FooterLink to={link.href} description={link.description}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Gradient Separator */}
        <GradientSeparator className="mb-8" />
        
        {/* Bottom Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-foreground font-medium">VDRC Workshop Portal</span>. Todos los derechos reservados.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span>Hecho con</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>en</span>
            <span className="font-medium text-foreground">Chile</span>
            <span className="text-xl ml-1">🇨🇱</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
