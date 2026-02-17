import { ChatMember } from '@/hooks/useChat';
import { PresenceUser } from '@/hooks/usePresence';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Users, Circle, Shield, Crown, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

interface ChatMembersPanelProps {
  members: ChatMember[];
  onlineUserIds: Set<string>;
  currentUserId?: string;
  onStartDM?: (userId: string) => void;
}

function getRoleBadge(role: string) {
  if (role === 'owner') return { icon: Crown, label: 'Dueño', color: 'text-amber-500' };
  if (role === 'admin') return { icon: Shield, label: 'Admin', color: 'text-blue-400' };
  return null;
}

export function ChatMembersPanel({
  members,
  onlineUserIds,
  currentUserId,
  onStartDM,
}: ChatMembersPanelProps) {
  const [search, setSearch] = useState('');

  const { onlineMembers, offlineMembers } = useMemo(() => {
    const filtered = members.filter(m =>
      !search || m.profile?.full_name?.toLowerCase().includes(search.toLowerCase())
    );

    const online: ChatMember[] = [];
    const offline: ChatMember[] = [];

    for (const m of filtered) {
      if (onlineUserIds.has(m.user_id) || m.user_id === currentUserId) {
        online.push(m);
      } else {
        offline.push(m);
      }
    }

    // Sort: current user first, then alphabetically
    const sortFn = (a: ChatMember, b: ChatMember) => {
      if (a.user_id === currentUserId) return -1;
      if (b.user_id === currentUserId) return 1;
      return (a.profile?.full_name || '').localeCompare(b.profile?.full_name || '');
    };

    online.sort(sortFn);
    offline.sort(sortFn);

    return { onlineMembers: online, offlineMembers: offline };
  }, [members, onlineUserIds, currentUserId, search]);

  return (
    <div className="w-60 h-full bg-sidebar border-l border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-2.5">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="font-mono font-bold text-xs tracking-wider text-sidebar-foreground uppercase">
            Miembros
          </h3>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">
            {members.length}
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-7 pl-7 text-[11px] bg-sidebar-accent border-sidebar-border rounded-md"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              title="Limpiar búsqueda"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          )}
        </div>
      </div>

      {/* Members list */}
      <div className="flex-1 overflow-y-auto py-2 space-y-3">
        {/* Online section */}
        <div>
          <div className="px-3 mb-1.5 flex items-center gap-1.5">
            <Circle className="w-2 h-2 fill-green-500 text-green-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-green-500/80">
              En línea — {onlineMembers.length}
            </span>
          </div>
          <AnimatePresence>
            {onlineMembers.map((member, i) => (
              <MemberRow
                key={member.user_id}
                member={member}
                isOnline
                isCurrentUser={member.user_id === currentUserId}
                index={i}
                onStartDM={onStartDM}
              />
            ))}
          </AnimatePresence>
          {onlineMembers.length === 0 && (
            <p className="text-[10px] text-muted-foreground/40 px-3 py-1">
              Nadie en línea
            </p>
          )}
        </div>

        {/* Offline section */}
        {offlineMembers.length > 0 && (
          <div>
            <div className="px-3 mb-1.5 flex items-center gap-1.5">
              <Circle className="w-2 h-2 fill-muted-foreground/30 text-muted-foreground/30" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                Desconectados — {offlineMembers.length}
              </span>
            </div>
            <AnimatePresence>
              {offlineMembers.map((member, i) => (
                <MemberRow
                  key={member.user_id}
                  member={member}
                  isOnline={false}
                  isCurrentUser={member.user_id === currentUserId}
                  index={i}
                  onStartDM={onStartDM}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div className="px-3 py-2.5 border-t border-sidebar-border">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground/50">
          <span className="flex items-center gap-1">
            <Circle className="w-1.5 h-1.5 fill-green-500 text-green-500" />
            {onlineMembers.length} en línea
          </span>
          <span>{members.length} total</span>
        </div>
      </div>
    </div>
  );
}

function MemberRow({
  member,
  isOnline,
  isCurrentUser,
  index,
  onStartDM,
}: {
  member: ChatMember;
  isOnline: boolean;
  isCurrentUser: boolean;
  index: number;
  onStartDM?: (userId: string) => void;
}) {
  const roleBadge = getRoleBadge(member.role);
  const name = member.profile?.full_name || 'Usuario';

  return (
    <motion.button
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.15, delay: index * 0.02 }}
      onClick={() => !isCurrentUser && onStartDM?.(member.user_id)}
      disabled={isCurrentUser}
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-1.5 text-left transition-colors group',
        !isCurrentUser && 'hover:bg-sidebar-accent cursor-pointer',
        isCurrentUser && 'cursor-default'
      )}
    >
      {/* Avatar with status dot */}
      <div className="relative shrink-0">
        <Avatar className={cn('h-7 w-7', !isOnline && 'opacity-50')}>
          <AvatarImage src={member.profile?.avatar_url || undefined} />
          <AvatarFallback className={cn(
            'text-[10px] font-mono',
            isOnline ? 'bg-primary/15 text-primary' : 'bg-muted/30 text-muted-foreground'
          )}>
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className={cn(
          'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-sidebar',
          isOnline ? 'bg-green-500' : 'bg-muted-foreground/30'
        )} />
      </div>

      {/* Name + role */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className={cn(
            'text-xs truncate',
            isOnline ? 'text-sidebar-foreground font-medium' : 'text-muted-foreground/60',
            isCurrentUser && 'text-primary'
          )}>
            {name}
            {isCurrentUser && <span className="text-[9px] text-muted-foreground ml-1">(tú)</span>}
          </span>
          {roleBadge && (
            <roleBadge.icon className={cn('w-3 h-3 shrink-0', roleBadge.color)} />
          )}
        </div>
      </div>
    </motion.button>
  );
}
