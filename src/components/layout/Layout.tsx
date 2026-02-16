import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { PageTransition } from './PageTransition';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-mono focus:text-sm"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main-content" className="pt-16 pb-20 md:pb-0" aria-label="Contenido principal">
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomNavigation />
    </div>
  );
}
