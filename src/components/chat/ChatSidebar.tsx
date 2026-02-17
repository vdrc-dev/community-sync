import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChatChannel } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { Hash, MessageCircle, Plus, Search, Users, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatSidebarProps {
  activeChannelId?: string;
  onSelectChannel: (channelId: string) => void;
  groupChannels: ChatChannel[];
  dmChannels: ChatChannel[];
  allUsers?: { user_id: string; full_name: string | null; avatar_url: string | null }[];
  onCreateChannel: (data: { name: string; description?: string; iconEmoji?: string }) => void;
  onCreateDM: (userId: string) => void;
}

const EMOJI_OPTIONS = ['💬', '📚', '🙋', '☕', '🚀', '🎯', '💡', '🔧', '🎨', '📊', '🤖', '⚡'];

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
  const [newChannelEmoji, setNewChannelEmoji] = useState('💬');
  const [dmSearch, setDmSearch] = useState('');
  const [channelsOpen, setChannelsOpen] = useState(true);
  const [dmsOpen, setDmsOpen] = useState(true);

  const filteredUsers = allUsers?.filter(u =>
    u.user_id !== user?.id &&
    u.full_name?.toLowerCase().includes(dmSearch.toLowerCase())
  );

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    onCreateChannel({
      name: newChannelName.trim().toLowerCase().replace(/\s+/g, '-'),
      description: newChannelDesc.trim() || undefined,
      iconEmoji: newChannelEmoji,
    });
    setNewChannelName('');
    setNewChannelDesc('');
    setNewChannelEmoji('💬');
    setShowNewChannel(false);
  };

  const filteredGroupChannels = groupChannels.filter(
    c => !search || c.name?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredDmChannels = dmChannels.filter(
    c => !search || c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-mono font-bold text-sm tracking-wider text-sidebar-foreground flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            CHAT
          </h2>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-500 font-mono">LIVE</span>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar canales..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs bg-sidebar-accent border-sidebar-border rounded-lg"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              title="Limpiar búsqueda"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 space-y-1">
        {/* Group Channels Section */}
        <div className="px-3 py-1">
          <button
            onClick={() => setChannelsOpen(!channelsOpen)}
            className="flex items-center justify-between w-full group"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
              {channelsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              Canales
              <span className="text-muted-foreground/50 ml-1">{filteredGroupChannels.length}</span>
            </span>
            <Dialog open={showNewChannel} onOpenChange={setShowNewChannel}>
              <DialogTrigger asChild>
                <span
                  role="button"
                  title="Crear canal"
                  aria-label="Crear canal"
                  onClick={e => e.stopPropagation()}
                  className="h-5 w-5 flex items-center justify-center rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-mono">Crear Canal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  {/* Emoji picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground">Ícono</label>
                    <div className="flex flex-wrap gap-2">
                      {EMOJI_OPTIONS.map(em => (
                        <button
                          key={em}
                          onClick={() => setNewChannelEmoji(em)}
                          className={cn(
                            'w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all',
                            newChannelEmoji === em
                              ? 'bg-primary/15 border border-primary/30 scale-110'
                              : 'bg-muted/30 border border-transparent hover:bg-muted/50'
                          )}
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Input
                    placeholder="nombre-del-canal"
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
          </button>
        </div>

        <AnimatePresence>
          {channelsOpen && filteredGroupChannels.map((channel, i) => (
            <motion.button
              key={channel.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15, delay: i * 0.02 }}
              onClick={() => onSelectChannel(channel.id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg text-sm transition-all duration-200 group',
                activeChannelId === channel.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <span className="text-base shrink-0 w-5 text-center">
                {channel.icon_emoji || '💬'}
              </span>
              <div className="flex-1 min-w-0 text-left">
                <span className="truncate block">{channel.name || 'Sin nombre'}</span>
                {channel.description && activeChannelId !== channel.id && (
                  <span className="text-[10px] text-muted-foreground/50 truncate block">
                    {channel.description}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* DMs Section */}
        <div className="px-3 py-1 mt-2">
          <button
            onClick={() => setDmsOpen(!dmsOpen)}
            className="flex items-center justify-between w-full group"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
              {dmsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              Mensajes Directos
              {filteredDmChannels.length > 0 && (
                <span className="text-muted-foreground/50 ml-1">{filteredDmChannels.length}</span>
              )}
            </span>
            <Dialog open={showNewDM} onOpenChange={setShowNewDM}>
              <DialogTrigger asChild>
                <span
                  role="button"
                  title="Nuevo mensaje directo"
                  aria-label="Nuevo mensaje directo"
                  onClick={e => e.stopPropagation()}
                  className="h-5 w-5 flex items-center justify-center rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-mono">Nuevo Mensaje Directo</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <Input
                    placeholder="Buscar usuario..."
                    value={dmSearch}
                    onChange={e => setDmSearch(e.target.value)}
                    autoFocus
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
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={u.avatar_url || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-mono">
                            {u.full_name?.charAt(0)?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{u.full_name || 'Usuario'}</span>
                      </button>
                    ))}
                    {filteredUsers?.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-4">No se encontraron usuarios</p>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </button>
        </div>

        <AnimatePresence>
          {dmsOpen && filteredDmChannels.map((channel, i) => (
            <motion.button
              key={channel.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15, delay: i * 0.02 }}
              onClick={() => onSelectChannel(channel.id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg text-sm transition-all duration-200',
                activeChannelId === channel.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <div className="relative">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-accent/20 text-accent text-[10px] font-mono">
                    {(channel.name || 'DM').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="truncate flex-1 text-left">{channel.name || 'Mensaje Directo'}</span>
            </motion.button>
          ))}
        </AnimatePresence>

        {dmsOpen && filteredDmChannels.length === 0 && !search && (
          <p className="text-[10px] text-muted-foreground/40 px-4 py-2 text-center">
            Sin mensajes directos aún
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-sidebar-accent/50">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-mono">
              {user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{user?.email?.split('@')[0] || 'Usuario'}</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] text-muted-foreground">En línea</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
