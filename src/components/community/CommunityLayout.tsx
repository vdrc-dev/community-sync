import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { CommunitySidebar } from './CommunitySidebar';

interface CommunityLayoutProps {
  children: ReactNode;
}

export function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        <CommunitySidebar />
        <main className="flex-1 pb-20 md:pb-0 min-w-0">
          {children}
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
