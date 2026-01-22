import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface PresenceUser {
  id: string;
  name: string;
  avatar?: string;
  page: string;
  cursor?: { x: number; y: number };
  online_at: string;
}

export function usePresence(pageName: string = 'home') {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user) return;

    const presenceChannel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const users: PresenceUser[] = [];
        
        Object.entries(state).forEach(([_, presences]) => {
          if (Array.isArray(presences) && presences.length > 0) {
            const presence = presences[0] as any;
            if (presence.id !== user.id) {
              users.push(presence as PresenceUser);
            }
          }
        });
        
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        // Someone joined
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        // Someone left
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            id: user.id,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
            avatar: user.user_metadata?.avatar_url,
            page: pageName,
            online_at: new Date().toISOString(),
          });
        }
      });

    setChannel(presenceChannel);

    return () => {
      presenceChannel.unsubscribe();
    };
  }, [user, pageName]);

  const updatePage = useCallback(async (newPage: string) => {
    if (!channel || !user) return;
    
    await channel.track({
      id: user.id,
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
      avatar: user.user_metadata?.avatar_url,
      page: newPage,
      online_at: new Date().toISOString(),
    });
  }, [channel, user]);

  const updateCursor = useCallback(async (x: number, y: number) => {
    if (!channel || !user) return;
    
    await channel.track({
      id: user.id,
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
      avatar: user.user_metadata?.avatar_url,
      page: pageName,
      cursor: { x, y },
      online_at: new Date().toISOString(),
    });
  }, [channel, user, pageName]);

  return {
    onlineUsers,
    updatePage,
    updateCursor,
    onlineCount: onlineUsers.length + (user ? 1 : 0),
  };
}
