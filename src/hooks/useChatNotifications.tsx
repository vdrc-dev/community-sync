import { useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

// ─── Unread store ────────────────────────────────────────────
interface UnreadState {
  unreadByChannel: Record<string, number>;
  totalUnread: number;
  increment: (channelId: string) => void;
  clear: (channelId: string) => void;
  clearAll: () => void;
}

export const useChatUnread = create<UnreadState>((set) => ({
  unreadByChannel: {},
  totalUnread: 0,
  increment: (channelId) =>
    set((state) => {
      const updated = {
        ...state.unreadByChannel,
        [channelId]: (state.unreadByChannel[channelId] || 0) + 1,
      };
      return {
        unreadByChannel: updated,
        totalUnread: Object.values(updated).reduce((a, b) => a + b, 0),
      };
    }),
  clear: (channelId) =>
    set((state) => {
      const { [channelId]: _, ...rest } = state.unreadByChannel;
      return {
        unreadByChannel: rest,
        totalUnread: Object.values(rest).reduce((a, b) => a + b, 0),
      };
    }),
  clearAll: () => set({ unreadByChannel: {}, totalUnread: 0 }),
}));

// ─── Browser notification permission ─────────────────────────
function requestNotificationPermission() {
  if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function showBrowserNotification(title: string, body: string, channelId: string) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  if (document.hasFocus()) return; // Only show when tab is in background

  const notif = new Notification(title, {
    body,
    icon: '/logos/vdrc-icon.png',
    tag: `chat-${channelId}`,
  } as NotificationOptions);

  notif.onclick = () => {
    window.focus();
    window.location.href = `/chat?channel=${channelId}`;
    notif.close();
  };

  setTimeout(() => notif.close(), 6000);
}

// ─── Notification sound ──────────────────────────────────────
let audioCtx: AudioContext | null = null;

function playNotificationSound() {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.15);
  } catch {
    // Silently fail if audio is blocked
  }
}

// ─── Main hook ───────────────────────────────────────────────
export function useChatNotifications() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const increment = useChatUnread((s) => s.increment);
  const permissionRequested = useRef(false);

  // Request permission once
  useEffect(() => {
    if (user && !permissionRequested.current) {
      permissionRequested.current = true;
      requestNotificationPermission();
    }
  }, [user]);

  // Clear unread for active channel
  const activeChannelId = searchParams.get('channel');
  const clearChannel = useChatUnread((s) => s.clear);
  useEffect(() => {
    if (location.pathname === '/chat' && activeChannelId) {
      clearChannel(activeChannelId);
    }
  }, [location.pathname, activeChannelId, clearChannel]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`global-chat-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        async (payload) => {
          const msg = payload.new as any;

          // Don't notify for own messages
          if (msg.sender_id === user.id) return;

          // Check if user is a member of this channel
          const { data: membership } = await supabase
            .from('chat_channel_members')
            .select('id')
            .eq('channel_id', msg.channel_id)
            .eq('user_id', user.id)
            .maybeSingle();

          if (!membership) return;

          // Get channel info
          const { data: channelData } = await supabase
            .from('chat_channels')
            .select('name, channel_type, icon_emoji')
            .eq('id', msg.channel_id)
            .maybeSingle();

          // Get sender profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('user_id', msg.sender_id)
            .maybeSingle();

          const senderName = profile?.full_name || 'Alguien';
          const channelName = channelData?.name || 'Chat';
          const isGroup = channelData?.channel_type === 'group';
          const emoji = channelData?.icon_emoji || '💬';
          const preview = msg.content?.length > 80
            ? msg.content.substring(0, 80) + '...'
            : msg.content;

          // Check if currently viewing this specific channel
          const isOnThisChannel =
            location.pathname === '/chat' &&
            searchParams.get('channel') === msg.channel_id;

          if (!isOnThisChannel) {
            // Increment unread count
            increment(msg.channel_id);

            // Play sound
            playNotificationSound();

            // Toast notification
            const title = isGroup
              ? `${emoji} #${channelName}`
              : `💬 ${senderName}`;

            toast(title, {
              description: isGroup ? `${senderName}: ${preview}` : preview,
              action: {
                label: 'Ver',
                onClick: () => navigate(`/chat?channel=${msg.channel_id}`),
              },
              duration: 5000,
            });

            // Browser notification (background tab)
            showBrowserNotification(
              isGroup ? `#${channelName}` : senderName,
              isGroup ? `${senderName}: ${preview}` : preview,
              msg.channel_id
            );
          }

          // Invalidate channels to update last_message_at
          queryClient.invalidateQueries({ queryKey: ['chat-channels'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, location.pathname, searchParams, queryClient, increment, navigate]);
}
