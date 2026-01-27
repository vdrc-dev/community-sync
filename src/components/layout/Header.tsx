import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Zap,
  BookOpen,
  Users,
  Calendar,
  Workflow,
  Presentation
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

// Navigation item with active indicator
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
    <Link
      to={to}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      className={`
        relative px-4 py-2 text-sm font-medium rounded-lg transition-all
        ${isActive 
          ? 'text-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }
      `}
    >
      <span className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
    { href: '/forum', label: 'Comunidad', icon: Users },
  ], []);

  const quickLinks = useMemo(() => [
    { href: '/profile', label: 'Mi Perfil', icon: User },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/bookmarks', label: 'Favoritos', icon: Bookmark },
    { href: '/quick-notes', label: 'Notas Rápidas', icon: PenLine },
    { href: '/roi-calculator', label: 'Calculadora ROI', icon: Calculator },
    { href: '/my-tools', label: 'Mi Stack IA', icon: Wrench },
    { href: '/calendar', label: 'Calendario', icon: Calendar },
  ], []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 flex items-center justify-center group-hover:glow-primary transition-all"
            >
              <span className="font-mono font-bold text-primary text-lg">VD</span>
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-mono font-bold text-foreground">VDRC</span>
              <span className="text-muted-foreground text-sm ml-2 hidden lg:inline">Workshop Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation with Active Indicator */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                to={link.href}
                label={link.label}
                isActive={location.pathname.startsWith(link.href)}
              />
            ))}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center gap-2">
            {/* CMD+K hint */}
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-foreground border-border/50 bg-muted/30"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            >
              <Command className="w-3 h-3" />
              <span className="text-xs">Buscar</span>
              <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-background/50 rounded border border-border/50">⌘K</kbd>
            </Button>

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
                    <Button variant="ghost" className="relative h-9 px-2 gap-2 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary/10 text-primary font-mono text-xs">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
                    </Button>
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
                        Accesos rápidos
                      </DropdownMenuLabel>
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        {quickLinks.slice(0, 4).map((link) => (
                          <DropdownMenuItem key={link.href} asChild className="rounded-lg">
                            <PrefetchLink to={link.href} className="flex items-center gap-2 w-full px-2 py-2">
                              <link.icon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs">{link.label}</span>
                            </PrefetchLink>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-2" />

                    <DropdownMenuGroup>
                      {quickLinks.slice(4).map((link) => (
                        <DropdownMenuItem key={link.href} asChild className="rounded-lg">
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
                          <DropdownMenuItem asChild className="rounded-lg">
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
                      className="text-destructive focus:text-destructive rounded-lg"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                  <Link to="/auth">Iniciar sesión</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">
                  <Link to="/auth?mode=signup">Registrarse</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
                {navLinks.map((link) => (
                  <PrefetchLink
                    key={link.href}
                    to={link.href}
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
                      ${location.pathname.startsWith(link.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </PrefetchLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
