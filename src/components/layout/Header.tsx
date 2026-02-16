import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { 
  LogOut, 
  User, 
  Shield, 
  Menu, 
  X, 
  Trophy, 
  Command, 
  Bookmark, 
  PenLine, 
  Calculator, 
  Wrench, 
  Sparkles,
  ChevronDown,
  BookOpen,
  Users,
  Calendar,
  Workflow,
  Presentation,
  Globe,
  ExternalLink
} from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { PointsDisplay } from '@/components/gamification/PointsDisplay';
import { StreakDisplay } from '@/components/streaks/StreakDisplay';
import { OnlineUsers } from '@/components/presence/OnlineUsers';
import { useLinkPrefetch } from '@/hooks/usePrefetcher';

// Optimized NavLink with prefetch on hover
function PrefetchLink({ 
  to, 
  children, 
  className,
  onClick 
}: { 
  to: string; 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  const { onMouseEnter, onFocus } = useLinkPrefetch(to);
  
  return (
    <Link
      to={to}
      className={className}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

// Clean navigation item — text-focused, minimal
function NavItem({ 
  to, 
  label, 
  isActive 
}: { 
  to: string; 
  label: string; 
  isActive: boolean;
}) {
  const { onMouseEnter, onFocus } = useLinkPrefetch(to);
  
  return (
    <Link
      to={to}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      className={`
        relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
        ${isActive 
          ? 'text-primary bg-primary/10' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
        }
      `}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
    </Link>
  );
}

export function Header() {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Scroll-based blur effect
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], ['rgba(10,11,16,0)', 'rgba(10,11,16,0.6)']);
  const headerBlur = useTransform(scrollY, [0, 80], [12, 60]);
  const headerBorder = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.07)']);
  const headerShadow = useTransform(scrollY, [0, 80], ['0 0 0 transparent', '0 8px 32px rgba(0,0,0,0.2)']);

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate('/');
  }, [signOut, navigate]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const navLinks = useMemo(() => [
    { href: '/generations', label: 'Generaciones', icon: BookOpen },
    { href: '/tools', label: 'Herramientas', icon: Wrench },
    { href: '/workflows', label: 'Workflows', icon: Workflow },
    { href: '/playground', label: 'Lab IA', icon: Sparkles },
    { href: '/community', label: 'Comunidad', icon: Users },
  ], []);

  const quickLinks = useMemo(() => [
    { href: '/profile', label: 'Mi Perfil', icon: User },
    { href: '/dictionary', label: 'Diccionario', icon: BookOpen },
    { href: '/bookmarks', label: 'Favoritos', icon: Bookmark },
    { href: '/my-tools', label: 'Mi Stack IA', icon: Wrench },
    { href: '/quick-notes', label: 'Notas Rápidas', icon: PenLine },
  ], []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      data-liquid-glass
      style={{
        backgroundColor: headerBg,
        backdropFilter: `blur(${headerBlur}px) saturate(200%)`,
        WebkitBackdropFilter: `blur(${headerBlur}px) saturate(200%)`,
        borderColor: headerBorder,
        boxShadow: headerShadow,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-9 h-9 rounded-lg overflow-hidden transition-all duration-300"
            >
              <img src="/logos/vdrc-icon.png" alt="VDRC" className="w-full h-full object-cover" />
            </motion.div>
            <div className="hidden sm:flex items-baseline gap-2">
              <img src="/logos/vdrc-green.png" alt="VDRC" className="h-5 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="text-muted-foreground text-xs hidden lg:inline font-mono">Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation — clean pill bar */}
          <nav className="hidden md:flex items-center gap-0.5 p-1 rounded-xl bg-muted/30 border border-border/20">
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                to={link.href}
                label={link.label}
                isActive={location.pathname.startsWith(link.href)}
              />
            ))}
          </nav>

          {/* Right side — clean & focused */}
          <div className="flex items-center gap-1.5">
            {/* Search — compact icon on smaller screens, full on lg */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all h-8 px-2.5 group"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              title="Buscar en todo el portal (⌘K)"
            >
              <Command className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs hidden lg:inline">Buscar</span>
              <kbd className="hidden lg:inline ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-muted/50 rounded border border-border/40 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-colors">⌘K</kbd>
            </Button>

            {user ? (
              <>
                {/* Points — compact pill */}
                <div className="hidden sm:block">
                  <PointsDisplay compact />
                </div>

                {/* Notifications */}
                <NotificationBell />

                {/* User Dropdown — contains profile, streak, ecosystem */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 px-2 gap-1.5 rounded-xl border border-border/30 hover:border-border/50 hover:bg-muted/40 transition-all duration-200">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary/10 text-primary font-mono text-xs">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 glass-strong p-2">
                    {/* User info + streak */}
                    <div className="px-3 py-3 mb-2 rounded-xl bg-gradient-to-br from-primary/8 to-accent/4 border border-primary/15">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-primary/15 text-primary font-mono">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">
                            {user.user_metadata?.full_name || 'Participante'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        {isAdmin && (
                          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary text-[10px]">
                            Admin
                          </Badge>
                        )}
                      </div>
                      {/* Inline streak */}
                      <div className="pt-2 border-t border-primary/10">
                        <StreakDisplay size="sm" showMultiplier={false} />
                      </div>
                    </div>

                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-[10px] text-muted-foreground/70 px-2 uppercase tracking-wider">
                        Tu espacio
                      </DropdownMenuLabel>
                      {quickLinks.map((link) => (
                        <DropdownMenuItem key={link.href} asChild className="rounded-lg hover:bg-primary/8 transition-colors">
                          <PrefetchLink to={link.href} className="flex items-center gap-2.5 w-full">
                            <link.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{link.label}</span>
                          </PrefetchLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-1.5" />
                    
                    {/* Ecosystem links — grouped cleanly */}
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-[10px] text-muted-foreground/70 px-2 uppercase tracking-wider">
                        Ecosistema VDRC
                      </DropdownMenuLabel>
                      <DropdownMenuItem asChild className="rounded-lg hover:bg-muted/50 transition-colors">
                        <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 w-full">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm flex-1">vdrc.cl</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground/50" />
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg hover:bg-muted/50 transition-colors">
                        <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 w-full">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm flex-1">Talleres</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground/50" />
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    {/* Admin */}
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator className="my-1.5" />
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-[10px] text-yellow-500/80 px-2 uppercase tracking-wider flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Admin
                          </DropdownMenuLabel>
                          <DropdownMenuItem asChild className="rounded-lg hover:bg-yellow-500/8 transition-colors">
                            <PrefetchLink to="/admin/presentations" className="flex items-center gap-2.5 w-full">
                              <Presentation className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">Presentaciones</span>
                            </PrefetchLink>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="rounded-lg hover:bg-yellow-500/8 transition-colors">
                            <PrefetchLink to="/admin/users" className="flex items-center gap-2.5 w-full">
                              <Users className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">Usuarios</span>
                            </PrefetchLink>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </>
                    )}

                    <DropdownMenuSeparator className="my-1.5" />
                    
                    <DropdownMenuItem 
                      onClick={handleSignOut} 
                      className="text-destructive focus:text-destructive rounded-lg hover:bg-destructive/8 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Cerrar sesion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all text-sm h-8">
                  <Link to="/auth">Iniciar sesion</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground h-8">
                  <Link to="/auth?mode=signup">Registrarse</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border/30 overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PrefetchLink
                      to={link.href}
                      onClick={closeMobileMenu}
                      className={`
                        flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300
                        ${location.pathname.startsWith(link.href)
                          ? 'text-primary bg-primary/10 border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }
                      `}
                    >
                      <link.icon className={`w-5 h-5 ${location.pathname.startsWith(link.href) ? 'text-primary' : ''}`} />
                      {link.label}
                      {location.pathname.startsWith(link.href) && (
                        <motion.div
                          layoutId="mobile-active"
                          className="ml-auto w-2 h-2 rounded-full bg-primary"
                        />
                      )}
                    </PrefetchLink>
                  </motion.div>
                ))}

                {/* Ecosystem links for mobile */}
                <div className="mt-3 pt-3 border-t border-border/30">
                  <span className="px-4 text-[10px] font-mono tracking-widest text-muted-foreground/50 uppercase">Ecosistema</span>
                  <div className="flex flex-col gap-1 mt-2">
                    <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all">
                      <Globe className="w-4 h-4" />
                      vdrc.cl
                      <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
                    </a>
                    <Link to="/presentations" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all">
                      <Presentation className="w-4 h-4" />
                      Presentaciones
                    </Link>
                  </div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
