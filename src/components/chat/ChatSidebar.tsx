import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChatChannel, useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { Hash, MessageCircle, Plus, Search, Users, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ChatSidebarProps {
  activeChannelId?: string;
  onSelectChannel: (channelId: string) => void;
  groupChannels: ChatChannel[];
  dmChannels: ChatChannel[];
  allUsers?: { user_id: string; full_name: string | null; avatar_url: string | null }[];
  onCreateChannel: (data: { name: string; description?: string; iconEmoji?: string }) => void;
  onCreateDM: (userId: string) => void;
}

export function ChatSidebar({
  activeChannelId,
  onSelectChannel,
  groupChannels,
  dmChannels,
  allUsers,
  onCreateChannel,
  onCreateDM,
}: ChatSidebarProps) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [showNewDM, setShowNewDM] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelDesc, setNewChannelDesc] = useState('');
  const [dmSearch, setDmSearch] = useState('');

  const filteredUsers = allUsers?.filter(u =>
    u.full_name?.toLowerCase().includes(dmSearch.toLowerCase())
  );

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    onCreateChannel({ name: newChannelName.trim(), description: newChannelDesc.trim() || undefined });
    setNewChannelName('');
    setNewChannelDesc('');
    setShowNewChannel(false);
  };

  return (
    <div className="w-72 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-mono font-bold text-sm tracking-wider text-sidebar-foreground">
            /// CHAT
          </h2>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs bg-sidebar-accent border-sidebar-border"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {/* Group Channels */}
        <div className="px-3 py-1.5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Canales
          </span>
          <Dialog open={showNewChannel} onOpenChange={setShowNewChannel}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-primary">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-mono">Crear Canal</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <Input
                  placeholder="Nombre del canal"
                  value={newChannelName}
                  onChange={e => setNewChannelName(e.target.value)}
                  className="font-mono"
                />
                <Input
                  placeholder="Descripción (opcional)"
                  value={newChannelDesc}
                  onChange={e => setNewChannelDesc(e.target.value)}
                />
                <Button onClick={handleCreateChannel} disabled={!newChannelName.trim()} className="w-full font-mono">
                  Crear Canal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {groupChannels
          .filter(c => !search || c.name?.toLowerCase().includes(search.toLowerCase()))
          .map(channel => (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg text-sm transition-all duration-200',
                activeChannelId === channel.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <Hash className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate flex-1 text-left">{channel.name || 'Sin nombre'}</span>
            </button>
          ))}

        {/* DMs */}
        <div className="px-3 py-1.5 mt-3 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Mensajes Directos
          </span>
          <Dialog open={showNewDM} onOpenChange={setShowNewDM}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-primary">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-mono">Nuevo Mensaje</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <Input
                  placeholder="Buscar usuario..."
                  value={dmSearch}
                  onChange={e => setDmSearch(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {filteredUsers?.map(u => (
                    <button
                      key={u.user_id}
                      onClick={() => {
                        onCreateDM(u.user_id);
                        setShowNewDM(false);
                        setDmSearch('');
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={u.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-mono">
                          {u.full_name?.charAt(0)?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{u.full_name || 'Usuario'}</span>
                    </button>
                  ))}
                  {filteredUsers?.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No se encontraron usuarios</p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {dmChannels
          .filter(c => !search || c.name?.toLowerCase().includes(search.toLowerCase()))
          .map(channel => (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg text-sm transition-all duration-200',
                activeChannelId === channel.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate flex-1 text-left">{channel.name || 'DM'}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
