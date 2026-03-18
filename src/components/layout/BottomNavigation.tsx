import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, BookOpen, Users, MessageCircle, MoreHorizontal,
  Wrench, Workflow, Sparkles, Presentation, Trophy,
  Calendar, PenLine, Calculator, MessageSquare, Layers, Download,
  Search, History, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useChatUnread } from '@/hooks/useChatNotifications';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { useRecentlyVisited } from '@/hooks/useRecentlyVisited';

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

import React from 'react';
export const BottomNavigation = React.forwardRef<HTMLElement>((_, ref) => {
  const location = useLocation();
  const { user } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);
  const { recentPages } = useRecentlyVisited();
  const totalUnread = useChatUnread((s) => s.totalUnread);

  if (!user) return null;

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const openSearch = () => {
    setSheetOpen(false);
    setTimeout(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
    }, 200);
  };

  return (
    <nav ref={ref} className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom">
      <div className="glass-strong border-t border-white/[0.06] shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-around h-14 px-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 h-full min-h-[48px] relative transition-all duration-200 active:scale-90 touch-target',
                  active ? 'text-primary' : 'text-muted-foreground active:text-foreground'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="relative"
                >
                  <item.icon className={cn('w-5 h-5 mx-auto', active && 'text-primary')} />
                  {item.href === '/chat' && totalUnread > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold px-1 shadow-lg shadow-red-500/30 ring-2 ring-background"
                    >
                      {totalUnread > 99 ? '99+' : totalUnread}
                    </motion.span>
                  )}
                </motion.div>
                <span className={cn("text-[10px] mt-0.5 font-medium", active && "font-semibold text-primary")}>{item.label}</span>
              </Link>
            );
          })}

          {/* More — organized sheet */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center flex-1 h-full min-h-[48px] text-muted-foreground active:text-foreground active:scale-90 transition-all duration-200 touch-target">
                <motion.div whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  <MoreHorizontal className="w-5 h-5 mx-auto" />
                </motion.div>
                <span className="text-[10px] mt-0.5 font-medium">Mas</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="glass-strong border-t border-white/[0.06] rounded-t-3xl max-h-[75vh]">
              <SheetHeader className="pb-3">
                <SheetTitle className="text-base font-semibold">Explorar</SheetTitle>
              </SheetHeader>
              <div className="space-y-5 pb-6 overflow-y-auto">
                {/* Quick Search */}
                <button
                  onClick={openSearch}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-white/[0.06] text-sm text-muted-foreground active:scale-[0.98] transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Buscar en el portal...</span>
                  <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 border border-white/[0.06]">⌘K</kbd>
                </button>

                {/* Recently Visited */}
                {recentPages.length > 0 && (
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-2 px-1 flex items-center gap-1.5">
                      <History className="w-3 h-3" />
                      Recientes
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {recentPages.slice(0, 4).map((page) => (
                        <Link
                          key={page.path}
                          to={page.path}
                          onClick={() => setSheetOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/30 text-xs font-medium text-foreground/80 active:scale-95 transition-all border border-white/[0.04]"
                        >
                          {page.title}
                          <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

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
                            'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors active:scale-[0.97]',
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
});
BottomNavigation.displayName = 'BottomNavigation';
