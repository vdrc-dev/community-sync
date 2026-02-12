import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Global listener that shows toast notifications for new chat messages
 * when the user is NOT currently on the /chat page.
 */
export function useChatNotifications() {
  const { user } = useAuth();
  const location = useLocation();
  const queryClient = useQueryClient();

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

          // Don't show toast if already on chat page
          if (location.pathname === '/chat') return;

          // Check if user is a member of this channel
          const { data: membership } = await supabase
            .from('chat_channel_members')
            .select('id')
            .eq('channel_id', msg.channel_id)
            .eq('user_id', user.id)
            .maybeSingle();

          if (!membership) return;

          // Get sender profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('user_id', msg.sender_id)
            .maybeSingle();

          const senderName = profile?.full_name || 'Alguien';
          const preview = msg.content?.length > 60 
            ? msg.content.substring(0, 60) + '...' 
            : msg.content;

          toast(`💬 ${senderName}`, {
            description: preview,
            action: {
              label: 'Ir al chat',
              onClick: () => {
                window.location.href = '/chat';
              },
            },
            duration: 5000,
          });

          // Invalidate channels to update unread state
          queryClient.invalidateQueries({ queryKey: ['chat-channels'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, location.pathname, queryClient]);
}
