import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Shield, Menu, X, Trophy, Command, Bookmark, PenLine, Calculator, Wrench, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { PointsDisplay } from '@/components/gamification/PointsDisplay';
import { StreakDisplay } from '@/components/streaks/StreakDisplay';
import { OnlineUsers } from '@/components/presence/OnlineUsers';

export function Header() {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { href: '/generations', label: 'Generaciones' },
    { href: '/tools', label: 'Herramientas' },
    { href: '/prompts', label: 'Prompts' },
    { href: '/playground', label: 'Lab IA' },
    { href: '/forum', label: 'Comunidad' },
    { href: '/calendar', label: 'Calendario' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center glow-primary group-hover:bg-primary/20 transition-all">
              <span className="font-mono font-bold text-primary text-lg">VD</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-mono font-semibold text-foreground">VDRC</span>
              <span className="text-muted-foreground text-sm ml-2">Workshop Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center gap-2">
            {/* CMD+K hint */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground border-border"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            >
              <Command className="w-3 h-3" />
              <span className="text-xs">Buscar</span>
              <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-muted rounded">⌘K</kbd>
            </Button>

            {user ? (
              <>
                {/* Streak display */}
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-border hover:border-primary/50 transition-all">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary/10 text-primary font-mono text-sm">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{user.user_metadata?.full_name || 'Participante'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      {isAdmin && (
                        <span className="inline-flex items-center gap-1 mt-1 text-xs text-primary">
                          <Shield className="w-3 h-3" /> Admin
                        </span>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" /> Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/leaderboard" className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" /> Leaderboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/bookmarks" className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4" /> Mis Favoritos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/quick-notes" className="flex items-center gap-2">
                        <PenLine className="w-4 h-4" /> Notas Rápidas
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/roi-calculator" className="flex items-center gap-2">
                        <Calculator className="w-4 h-4" /> Calculadora ROI
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-tools" className="flex items-center gap-2">
                        <Wrench className="w-4 h-4" /> Mi Stack de IA
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/playground" className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Lab de IA
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
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
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
