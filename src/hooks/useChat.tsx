import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface ChatChannel {
  id: string;
  name: string | null;
  description: string | null;
  channel_type: 'group' | 'dm';
  space_id: string | null;
  created_by: string | null;
  icon_emoji: string | null;
  is_archived: boolean;
  last_message_at: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  channel_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  reply_to_id: string | null;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  sender_profile?: { full_name: string | null; avatar_url: string | null };
}

export interface ChatMember {
  id: string;
  channel_id: string;
  user_id: string;
  role: string;
  last_read_at: string;
  joined_at: string;
  profile?: { full_name: string | null; avatar_url: string | null };
}

const DEFAULT_CHANNELS = [
  { name: 'general', description: 'Conversación general del taller', icon_emoji: '💬' },
  { name: 'recursos', description: 'Comparte herramientas, links y materiales útiles', icon_emoji: '📚' },
  { name: 'ayuda', description: 'Preguntas y soporte entre participantes', icon_emoji: '🙋' },
  { name: 'off-topic', description: 'Conversación libre y relajada', icon_emoji: '☕' },
];

export function useChat(channelId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const seedingRef = useRef(false);

  // Auto-join all group channels
  const autoJoinRef = useRef(false);
  useEffect(() => {
    if (!user || autoJoinRef.current) return;
    autoJoinRef.current = true;
    (async () => {
      try {
        // Get all group channels
        const { data: allGroupChannels } = await supabase
          .from('chat_channels')
          .select('id')
          .eq('channel_type', 'group');
        if (!allGroupChannels || allGroupChannels.length === 0) return;

        // Get user's existing memberships
        const { data: myMemberships } = await supabase
          .from('chat_channel_members')
          .select('channel_id')
          .eq('user_id', user.id);
        const memberChannelIds = new Set(myMemberships?.map(m => m.channel_id) || []);

        // Join channels user isn't a member of
        const toJoin = allGroupChannels.filter(c => !memberChannelIds.has(c.id));
        if (toJoin.length > 0) {
          await supabase.from('chat_channel_members').insert(
            toJoin.map(c => ({ channel_id: c.id, user_id: user.id, role: 'member' }))
          );
          queryClient.invalidateQueries({ queryKey: ['chat-channels'] });
        }
      } catch (e) {
        console.error('Auto-join error:', e);
      }
    })();
  }, [user, queryClient]);

  // Fetch user's channels (enriched with DM partner names)
  const { data: channels, isLoading: channelsLoading } = useQuery({
    queryKey: ['chat-channels', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_channels')
        .select('*')
        .order('last_message_at', { ascending: false });
      if (error) throw error;

      // Enrich DM channels with the other user's name
      const dmChannels = (data || []).filter(c => c.channel_type === 'dm');
      if (dmChannels.length > 0) {
        const dmIds = dmChannels.map(c => c.id);
        const { data: dmMembers } = await supabase
          .from('chat_channel_members')
          .select('channel_id, user_id')
          .in('channel_id', dmIds);

        // Find the other user in each DM
        const otherUserIds = new Set<string>();
        const channelToOther = new Map<string, string>();
        for (const m of dmMembers || []) {
          if (m.user_id !== user!.id) {
            otherUserIds.add(m.user_id);
            channelToOther.set(m.channel_id, m.user_id);
          }
        }

        if (otherUserIds.size > 0) {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('user_id, full_name, avatar_url')
            .in('user_id', [...otherUserIds]);
          const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

          for (const ch of dmChannels) {
            const otherId = channelToOther.get(ch.id);
            if (otherId) {
              const profile = profileMap.get(otherId);
              if (profile) {
                (ch as any).name = profile.full_name || 'Usuario';
                (ch as any).dm_avatar_url = profile.avatar_url;
              }
            }
          }
        }
      }

      return data as ChatChannel[];
    },
    enabled: !!user,
  });

  // Auto-seed default channels if none exist
  useEffect(() => {
    if (!user || channelsLoading || seedingRef.current) return;
    if (channels && channels.filter(c => c.channel_type === 'group').length === 0) {
      seedingRef.current = true;
      (async () => {
        for (const ch of DEFAULT_CHANNELS) {
          try {
            const { data: created, error } = await supabase
              .from('chat_channels')
              .insert({
                name: ch.name,
                description: ch.description,
                icon_emoji: ch.icon_emoji,
                channel_type: 'group',
                created_by: user.id,
              })
              .select()
              .single();
            if (!error && created) {
              await supabase.from('chat_channel_members').insert({
                channel_id: created.id,
                user_id: user.id,
                role: 'owner',
              });
            }
          } catch {
            // Channel may already exist via another session
          }
        }
        queryClient.invalidateQueries({ queryKey: ['chat-channels'] });
        seedingRef.current = false;
      })();
    }
  }, [user, channels, channelsLoading, queryClient]);

  // Fetch messages for active channel
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['chat-messages', channelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('channel_id', channelId!)
        .order('created_at', { ascending: true })
        .limit(100);
      if (error) throw error;

      const senderIds = [...new Set(data.map((m: any) => m.sender_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', senderIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      return data.map((m: any) => ({
        ...m,
        sender_profile: profileMap.get(m.sender_id) || null,
      })) as ChatMessage[];
    },
    enabled: !!channelId && !!user,
  });

  // Fetch channel members
  const { data: members } = useQuery({
    queryKey: ['chat-members', channelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_channel_members')
        .select('*')
        .eq('channel_id', channelId!);
      if (error) throw error;

      const userIds = data.map((m: any) => m.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      return data.map((m: any) => ({
        ...m,
        profile: profileMap.get(m.user_id) || null,
      })) as ChatMember[];
    },
    enabled: !!channelId && !!user,
  });

  // Realtime subscription for new messages
  useEffect(() => {
    if (!channelId || !user) return;

    const channel = supabase
      .channel(`chat-${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `channel_id=eq.${channelId}`,
        },
        async (payload) => {
          const newMsg = payload.new as any;
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_id, full_name, avatar_url')
            .eq('user_id', newMsg.sender_id)
            .maybeSingle();

          const enrichedMsg: ChatMessage = {
            ...newMsg,
            sender_profile: profile || null,
          };

          queryClient.setQueryData(
            ['chat-messages', channelId],
            (old: ChatMessage[] | undefined) =>
              old ? [...old, enrichedMsg] : [enrichedMsg]
          );

          queryClient.invalidateQueries({ queryKey: ['chat-channels'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId, user, queryClient]);

  // Send message
  const sendMessage = useMutation({
    mutationFn: async ({ content, replyToId }: { content: string; replyToId?: string }) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          channel_id: channelId!,
          sender_id: user!.id,
          content,
          reply_to_id: replyToId || null,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });

  // Create group channel
  const createChannel = useMutation({
    mutationFn: async ({ name, description, iconEmoji }: { name: string; description?: string; iconEmoji?: string }) => {
      const { data: channel, error } = await supabase
        .from('chat_channels')
        .insert({
          name,
          description,
          icon_emoji: iconEmoji || '💬',
          channel_type: 'group',
          created_by: user!.id,
        })
        .select()
        .single();
      if (error) throw error;

      await supabase.from('chat_channel_members').insert({
        channel_id: channel.id,
        user_id: user!.id,
        role: 'owner',
      });

      return channel;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-channels'] });
    },
  });

  // Create or get DM channel
  const createDM = useMutation({
    mutationFn: async (otherUserId: string) => {
      const { data: existingChannels } = await supabase
        .from('chat_channel_members')
        .select('channel_id')
        .eq('user_id', user!.id);

      if (existingChannels && existingChannels.length > 0) {
        const channelIds = existingChannels.map(c => c.channel_id);
        const { data: dmChannels } = await supabase
          .from('chat_channels')
          .select('id')
          .in('id', channelIds)
          .eq('channel_type', 'dm');

        if (dmChannels) {
          for (const ch of dmChannels) {
            const { data: otherMember } = await supabase
              .from('chat_channel_members')
              .select('id')
              .eq('channel_id', ch.id)
              .eq('user_id', otherUserId)
              .maybeSingle();
            if (otherMember) return ch;
          }
        }
      }

      const { data: channel, error } = await supabase
        .from('chat_channels')
        .insert({
          channel_type: 'dm',
          created_by: user!.id,
        })
        .select()
        .single();
      if (error) throw error;

      await supabase.from('chat_channel_members').insert([
        { channel_id: channel.id, user_id: user!.id, role: 'member' },
        { channel_id: channel.id, user_id: otherUserId, role: 'member' },
      ]);

      return channel;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-channels'] });
    },
  });

  // Join channel
  const joinChannel = useMutation({
    mutationFn: async (chId: string) => {
      const { error } = await supabase.from('chat_channel_members').insert({
        channel_id: chId,
        user_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-channels'] });
      queryClient.invalidateQueries({ queryKey: ['chat-members'] });
    },
  });

  // Update last_read_at
  const markAsRead = useCallback(async () => {
    if (!channelId || !user) return;
    await supabase
      .from('chat_channel_members')
      .update({ last_read_at: new Date().toISOString() })
      .eq('channel_id', channelId)
      .eq('user_id', user.id);
  }, [channelId, user]);

  // Fetch all users for DM search
  const { data: allUsers } = useQuery({
    queryKey: ['all-users-for-dm'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .neq('user_id', user!.id)
        .limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return {
    channels,
    channelsLoading,
    messages,
    messagesLoading,
    members,
    allUsers,
    sendMessage,
    createChannel,
    createDM,
    joinChannel,
    markAsRead,
    groupChannels: channels?.filter(c => c.channel_type === 'group') || [],
    dmChannels: channels?.filter(c => c.channel_type === 'dm') || [],
  };
}
