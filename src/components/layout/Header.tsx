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

// Navigation item with active indicator and hover effects
function NavItem({ 
  to, 
  label, 
  icon: Icon,
  isActive 
}: { 
  to: string; 
  label: string; 
  icon?: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}) {
  const { onMouseEnter, onFocus } = useLinkPrefetch(to);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={to}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        className={`
          relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group
          ${isActive 
            ? 'text-primary bg-primary/10' 
            : 'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        {/* Hover background highlight */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          layoutId={`nav-bg-${to}`}
        />
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 blur-sm -z-10" />
        
        <span className="relative flex items-center gap-2">
          {Icon && (
            <Icon className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
          )}
          <span className="relative">
            {label}
            {/* Underline animation */}
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: isActive ? 1 : 0, 
                opacity: isActive ? 1 : 0 
              }}
              whileHover={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </span>
        </span>
        
        {/* Active indicator dot */}
        {isActive && (
          <motion.div
            layoutId="nav-active-dot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow-primary/50"
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export function Header() {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Scroll-based blur effect
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 24]);
  const headerBorder = useTransform(scrollY, [0, 100], ['rgba(255,255,255,0.05)', 'rgba(34,197,94,0.2)']);

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
    { href: '/bookmarks', label: 'Favoritos', icon: Bookmark },
    { href: '/my-tools', label: 'Mi Stack IA', icon: Wrench },
    { href: '/quick-notes', label: 'Notas Rápidas', icon: PenLine },
  ], []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: headerBg,
        backdropFilter: `blur(${headerBlur}px) saturate(180%)`,
        borderColor: headerBorder,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent p-[1px] group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
            >
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <span className="font-mono font-bold text-primary text-lg">VD</span>
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <motion.span 
                className="font-mono font-bold text-foreground"
                whileHover={{ color: 'hsl(var(--primary))' }}
              >
                VDRC
              </motion.span>
              <span className="text-muted-foreground text-sm ml-2 hidden lg:inline">Workshop Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation with Active Indicator */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-muted/30 border border-border/30">
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                to={link.href}
                label={link.label}
                icon={link.icon}
                isActive={location.pathname.startsWith(link.href)}
              />
            ))}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center gap-2">
            {/* Ecosystem Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex items-center gap-1.5 text-muted-foreground hover:text-foreground border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 h-8 px-2.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-mono tracking-wider">VDRC</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-strong p-2">
                <DropdownMenuLabel className="text-[10px] font-mono tracking-[0.2em] text-primary/70 uppercase px-2">
                  Ecosistema VDRC
                </DropdownMenuLabel>
                <DropdownMenuItem className="rounded-lg bg-primary/5 border border-primary/20 mb-1">
                  <Users className="w-4 h-4 text-primary mr-2" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Comunidad</span>
                    <span className="text-[10px] text-primary ml-2">AQUI</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg hover:bg-muted/50 transition-colors">
                  <a href="https://vdrc.cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm flex-1">vdrc.cl</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg hover:bg-muted/50 transition-colors">
                  <a href="https://vdrc.cl/talleres" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm flex-1">Talleres</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg hover:bg-purple-500/10 transition-colors">
                  <a href="https://vdrc.lovable.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                    <Presentation className="w-4 h-4 text-purple-400" />
                    <span className="text-sm flex-1">Presentaciones</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CMD+K hint */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-foreground border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              >
                <Command className="w-3 h-3" />
                <span className="text-xs">Buscar</span>
                <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-background/50 rounded border border-border/50">⌘K</kbd>
              </Button>
            </motion.div>

            {user ? (
              <>
                {/* Streak display - compact */}
                <div className="hidden sm:block">
                  <StreakDisplay size="sm" showMultiplier={false} />
                </div>

                {/* Points display (compact) */}
                <div className="hidden sm:block">
                  <PointsDisplay compact />
                </div>

                {/* Online users */}
                <div className="hidden lg:block">
                  <OnlineUsers showCount={false} maxAvatars={3} />
                </div>

                {/* Notifications */}
                <NotificationBell />

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button variant="ghost" className="relative h-9 px-2 gap-2 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                        <Avatar className="h-7 w-7 ring-2 ring-transparent hover:ring-primary/30 transition-all">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-primary/10 text-primary font-mono text-xs">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 glass-strong p-2">
                    {/* User Info Header */}
                    <div className="px-3 py-3 mb-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/30">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-primary/20 text-primary font-mono">
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
                          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary text-xs">
                            <Shield className="w-3 h-3 mr-1" /> Admin
                          </Badge>
                        )}
                      </div>
                    </div>

                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-muted-foreground px-2">
                        Herramientas personales
                      </DropdownMenuLabel>
                      {quickLinks.map((link) => (
                        <DropdownMenuItem key={link.href} asChild className="rounded-lg hover:bg-primary/10 transition-colors">
                          <PrefetchLink to={link.href} className="flex items-center gap-2 w-full">
                            <link.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{link.label}</span>
                          </PrefetchLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>

                    {/* Admin Link */}
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-xs text-yellow-500 px-2 flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Administración
                          </DropdownMenuLabel>
                          <DropdownMenuItem asChild className="rounded-lg hover:bg-yellow-500/10 transition-colors">
                            <PrefetchLink to="/admin/presentations" className="flex items-center gap-2 w-full">
                              <Presentation className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">Diseño Presentaciones</span>
                            </PrefetchLink>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </>
                    )}

                    <DropdownMenuSeparator className="my-2" />
                    
                    <DropdownMenuItem 
                      onClick={handleSignOut} 
                      className="text-destructive focus:text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300">
                    <Link to="/auth">Iniciar sesión</Link>
                  </Button>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                    <Link to="/auth?mode=signup">Registrarse</Link>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </motion.div>
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
                          ? 'text-primary bg-primary/10 shadow-lg shadow-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }
                      `}
                    >
                      <link.icon className={`w-5 h-5 ${location.pathname.startsWith(link.href) ? 'text-primary' : ''}`} />
                      {link.label}
                      {location.pathname.startsWith(link.href) && (
                        <motion.div
                          layoutId="mobile-active"
                          className="ml-auto w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
                        />
                      )}
                    </PrefetchLink>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
