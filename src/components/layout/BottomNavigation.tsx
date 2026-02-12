import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Wrench, Workflow, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { icon: Home, label: 'Inicio', href: '/' },
  { icon: BookOpen, label: 'Recursos', href: '/generations' },
  { icon: Wrench, label: 'Tools', href: '/tools' },
  { icon: Workflow, label: 'Flows', href: '/workflows' },
];

const moreLinks = [
  { label: 'Playground IA', href: '/playground' },
  { label: 'Comunidad', href: '/community' },
  { label: 'Prompts', href: '/prompts' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Calendario', href: '/calendar' },
  { label: 'Mi Stack', href: '/my-tools' },
  { label: 'Calculadora ROI', href: '/roi-calculator' },
];

export function BottomNavigation() {
  const location = useLocation();
  const { user } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);

  if (!user) return null;

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom">
      <div className="glass-strong border-t border-border/50">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 h-full relative transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <item.icon className={cn('w-5 h-5', active && 'scale-110')} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* More button with Sheet */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center flex-1 h-full text-muted-foreground">
                <Menu className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium">Más</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="glass-strong border-t border-border/50 rounded-t-2xl">
              <SheetHeader className="pb-4">
                <SheetTitle className="font-mono text-lg">Más opciones</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-3 pb-6">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      isActive(link.href)
                        ? 'bg-primary/10 text-primary border border-primary/30'
                        : 'bg-muted/50 text-foreground hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
