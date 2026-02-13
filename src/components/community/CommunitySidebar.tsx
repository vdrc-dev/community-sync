import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSpaces } from '@/hooks/useSpaces';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { 
  Hash, Plus, Users, BookOpen, Wrench, 
  Workflow, Sparkles, Trophy, Calendar, Calculator,
  MessageCircle, ChevronDown, ChevronRight, Presentation
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { PointsDisplay } from '@/components/gamification/PointsDisplay';

interface NavSection {
  title: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[];
}

const platformSections: NavSection[] = [
  {
    title: 'Aprendizaje',
    items: [
      { href: '/generations', label: 'Generaciones', icon: BookOpen },
      { href: '/presentations', label: 'Presentaciones', icon: Presentation },
      { href: '/tools', label: 'Herramientas', icon: Wrench },
      { href: '/workflows', label: 'Workflows', icon: Workflow },
      { href: '/playground', label: 'Lab IA', icon: Sparkles },
    ],
  },
  {
    title: 'Interacción',
    items: [
      { href: '/chat', label: 'Chat en vivo', icon: MessageCircle, badge: 'LIVE' },
      { href: '/forum', label: 'Foro', icon: Hash },
      { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
      { href: '/calendar', label: 'Calendario', icon: Calendar },
      { href: '/roi-calculator', label: 'ROI Calculator', icon: Calculator },
    ],
  },
];

export function CommunitySidebar() {
  const { spaces, spacesLoading } = useSpaces();
  const { user } = useAuth();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Espacios', 'Interacción']);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  if (!user) return null;

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 border-r border-sidebar-border bg-sidebar overflow-y-auto hidden md:flex flex-col">
      {/* User card */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-primary/20">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-mono">
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user.user_metadata?.full_name || 'Participante'}
            </p>
            <div className="scale-75 origin-left">
              <PointsDisplay compact />
            </div>
          </div>
        </div>
      </div>

      {/* Spaces section */}
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarSection
          title="Espacios"
          expanded={expandedSections.includes('Espacios')}
          onToggle={() => toggleSection('Espacios')}
          action={
            <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-primary">
              <Plus className="h-3.5 w-3.5" />
            </Button>
          }
        >
          {spacesLoading ? (
            <div className="px-3 py-1 space-y-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg">
                  <div className="w-5 h-5 rounded skeleton-shimmer" />
                  <div className="h-3 flex-1 rounded skeleton-shimmer" />
                </div>
              ))}
            </div>
          ) : (
            spaces?.map(space => (
              <Link
                key={space.id}
                to={`/community/${space.slug}`}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm transition-all duration-200 group',
                  isActive(`/community/${space.slug}`)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <span className="text-base leading-none">{space.icon_emoji || '💬'}</span>
                <span className="truncate flex-1">{space.name}</span>
                {space.post_count > 0 && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {space.post_count}
                  </span>
                )}
              </Link>
            ))
          )}
        </SidebarSection>

        <Separator className="my-2 bg-sidebar-border" />

        {/* Platform sections */}
        {platformSections.map(section => (
          <SidebarSection
            key={section.title}
            title={section.title}
            expanded={expandedSections.includes(section.title)}
            onToggle={() => toggleSection(section.title)}
          >
            {section.items.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <item.icon className={cn(
                  'h-4 w-4 shrink-0',
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                )} />
                <span className="truncate flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </SidebarSection>
        ))}
      </div>

      {/* Bottom branding */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2">
          <div className="w-6 h-6 rounded-md overflow-hidden">
            <img src="/logos/vdrc-icon.png" alt="VDRC" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">VDRC Community</span>
        </div>
      </div>
    </aside>
  );
}

function SidebarSection({
  title,
  expanded,
  onToggle,
  children,
  action,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="py-1">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-sidebar-foreground transition-colors"
      >
        <div className="flex items-center gap-1.5">
          {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          {title}
        </div>
        {action}
      </button>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-0.5"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
