import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { usePresence } from '@/hooks/usePresence';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatMessageThread } from '@/components/chat/ChatMessageThread';
import { ChatMembersPanel } from '@/components/chat/ChatMembersPanel';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { MessageSquare, Hash, ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Chat() {
  const { user, loading: authLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const channelIdFromUrl = searchParams.get('channel');
  const [activeChannelId, setActiveChannelId] = useState<string | undefined>(channelIdFromUrl || undefined);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMembers, setShowMembers] = useState(false);
  const { onlineUsers } = usePresence('chat');

  const onlineUserIds = useMemo(
    () => new Set(onlineUsers.map(u => u.id)),
    [onlineUsers]
  );

  const onlineChannelMemberCount = useMemo(() => {
    if (!members) return 0;
    return members.filter(m => onlineUserIds.has(m.user_id) || m.user_id === user?.id).length;
  }, [members, onlineUserIds, user?.id]);

  const {
    channels,
    channelsLoading,
    messages,
    messagesLoading,
    members,
    allUsers,
    sendMessage,
    createChannel,
    createDM,
    markAsRead,
    groupChannels,
    dmChannels,
  } = useChat(activeChannelId);

  // Set active channel from URL or first available
  useEffect(() => {
    if (channelIdFromUrl) {
      setActiveChannelId(channelIdFromUrl);
    } else if (!activeChannelId && channels && channels.length > 0) {
      const firstGroup = channels.find(c => c.channel_type === 'group');
      setActiveChannelId(firstGroup?.id || channels[0].id);
    }
  }, [channelIdFromUrl, channels, activeChannelId]);

  // Mark as read when channel changes
  useEffect(() => {
    if (activeChannelId) markAsRead();
  }, [activeChannelId, markAsRead]);

  const selectChannel = (id: string) => {
    setActiveChannelId(id);
    setSearchParams({ channel: id });
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const activeChannel = channels?.find(c => c.id === activeChannelId);

  const handleCreateChannel = async (data: { name: string; description?: string; iconEmoji?: string }) => {
    const result = await createChannel.mutateAsync(data);
    selectChannel(result.id);
  };

  const handleCreateDM = async (userId: string) => {
    const result = await createDM.mutateAsync(userId);
    selectChannel(result.id);
  };

  if (authLoading) return <LoadingSpinner fullScreen />;

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
              <MessageSquare className="h-8 w-8 text-primary/60" />
            </div>
            <h2 className="text-xl font-mono font-bold">Inicia sesión para chatear</h2>
            <p className="text-sm text-muted-foreground">Conecta con otros participantes del taller en tiempo real</p>
            <Button asChild className="font-mono">
              <Link to="/auth">Iniciar Sesión</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16 overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Chat Sidebar */}
        <div className={cn(
          'transition-all duration-200',
          showSidebar ? 'block' : 'hidden md:block'
        )}>
          <ChatSidebar
            activeChannelId={activeChannelId}
            onSelectChannel={selectChannel}
            groupChannels={groupChannels}
            dmChannels={dmChannels}
            allUsers={allUsers || undefined}
            onCreateChannel={handleCreateChannel}
            onCreateDM={handleCreateDM}
          />
        </div>

        {/* Message Area */}
        <div className={cn(
          'flex-1 flex flex-col min-w-0',
          !showSidebar ? 'block' : 'hidden md:flex'
        )}>
          {/* Mobile back button */}
          <div className="md:hidden">
            {!showSidebar && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(true)}
                className="m-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Canales
              </Button>
            )}
          </div>

          {activeChannel ? (
            <div className="flex flex-1 min-w-0 h-full">
              <div className="flex-1 flex flex-col min-w-0">
                <ChatMessageThread
                  channelName={activeChannel.name || 'DM'}
                  channelType={activeChannel.channel_type as 'group' | 'dm'}
                  channelEmoji={activeChannel.icon_emoji || undefined}
                  channelDescription={activeChannel.description || undefined}
                  messages={messages || []}
                  isLoading={messagesLoading}
                  memberCount={members?.length}
                  onlineCount={onlineChannelMemberCount}
                  showMembersPanel={showMembers}
                  onToggleMembersPanel={() => setShowMembers(!showMembers)}
                  onSendMessage={(content) => sendMessage.mutate({ content })}
                />
              </div>
              {showMembers && activeChannel.channel_type === 'group' && members && (
                <ChatMembersPanel
                  members={members}
                  onlineUserIds={onlineUserIds}
                  currentUserId={user?.id}
                  onStartDM={(userId) => handleCreateDM(userId)}
                />
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                  <Sparkles className="h-10 w-10 text-primary/40" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-foreground">
                    {channelsLoading ? 'Cargando canales...' : 'Selecciona un canal'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Elige un canal del sidebar o inicia una conversación directa
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
