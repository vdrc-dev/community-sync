import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, BookOpen, Users, MessageCircle, MoreHorizontal,
  Wrench, Workflow, Sparkles, Presentation, Trophy,
  Calendar, PenLine, Calculator, MessageSquare, Layers, Download
} from 'lucide-react';
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
  { icon: BookOpen, label: 'Generaciones', href: '/generations' },
  { icon: Users, label: 'Comunidad', href: '/community' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
];

const moreCategories = [
  {
    title: 'Aprendizaje',
    links: [
      { label: 'Herramientas', href: '/tools', icon: Wrench },
      { label: 'Workflows', href: '/workflows', icon: Workflow },
      { label: 'Diccionario', href: '/dictionary', icon: BookOpen },
      { label: 'Guia Instalacion', href: '/guia-instalacion', icon: Download },
    ],
  },
  {
    title: 'IA & Productividad',
    links: [
      { label: 'Lab IA', href: '/playground', icon: Sparkles },
      { label: 'Personalizar IA', href: '/personalizacion-ia', icon: Layers },
      { label: 'Prompts', href: '/prompts', icon: MessageSquare },
      { label: 'Mi Stack', href: '/my-tools', icon: Wrench },
      { label: 'Calculadora ROI', href: '/roi-calculator', icon: Calculator },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Foro', href: '/forum', icon: MessageSquare },
      { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
      { label: 'Calendario', href: '/calendar', icon: Calendar },
      { label: 'Notas Rapidas', href: '/quick-notes', icon: PenLine },
    ],
  },
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
      <div className="glass-strong border-t border-white/[0.06]">
        <div className="flex items-center justify-around h-14 px-1">
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
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <item.icon className={cn('w-5 h-5', active && 'text-primary')} />
                <span className={cn("text-[10px] mt-0.5 font-medium", active && "font-semibold text-primary")}>{item.label}</span>
              </Link>
            );
          })}

          {/* More — organized sheet */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center flex-1 h-full text-muted-foreground active:text-foreground transition-colors">
                <MoreHorizontal className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 font-medium">Mas</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="glass-strong border-t border-white/[0.06] rounded-t-3xl max-h-[70vh]">
              <SheetHeader className="pb-3">
                <SheetTitle className="text-base font-semibold">Explorar</SheetTitle>
              </SheetHeader>
              <div className="space-y-5 pb-6 overflow-y-auto">
                {moreCategories.map((category) => (
                  <div key={category.title}>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-2 px-1">
                      {category.title}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {category.links.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setSheetOpen(false)}
                          className={cn(
                            'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                            isActive(link.href)
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'bg-muted/40 text-foreground hover:bg-muted/60'
                          )}
                        >
                          <link.icon className={cn('w-4 h-4 shrink-0', isActive(link.href) ? 'text-primary' : 'text-muted-foreground')} />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
