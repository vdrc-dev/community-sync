import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatMessageThread } from '@/components/chat/ChatMessageThread';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { MessageSquare, Hash, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Chat() {
  const { user, loading: authLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const channelIdFromUrl = searchParams.get('channel');
  const [activeChannelId, setActiveChannelId] = useState<string | undefined>(channelIdFromUrl || undefined);
  const [showSidebar, setShowSidebar] = useState(true);

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
      setActiveChannelId(channels[0].id);
    }
  }, [channelIdFromUrl, channels, activeChannelId]);

  // Mark as read when channel changes
  useEffect(() => {
    if (activeChannelId) markAsRead();
  }, [activeChannelId, markAsRead]);

  const selectChannel = (id: string) => {
    setActiveChannelId(id);
    setSearchParams({ channel: id });
    // On mobile, hide sidebar
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
      <div className="min-h-screen circuit-bg">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-mono font-bold">Inicia sesión para chatear</h2>
            <Button asChild className="font-mono">
              <Link to="/auth">Iniciar Sesión</Link>
            </Button>
          </div>
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
            <ChatMessageThread
              channelName={activeChannel.name || 'DM'}
              channelType={activeChannel.channel_type as 'group' | 'dm'}
              channelEmoji={activeChannel.icon_emoji || undefined}
              messages={messages || []}
              isLoading={messagesLoading}
              memberCount={members?.length}
              onSendMessage={(content) => sendMessage.mutate({ content })}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                  <Hash className="h-10 w-10 text-primary/40" />
                </div>
                <p className="font-mono text-muted-foreground">
                  Selecciona un canal o inicia una conversación
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
