
-- Chat channels (group channels and DM channels)
CREATE TABLE public.chat_channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  description TEXT,
  channel_type TEXT NOT NULL DEFAULT 'group' CHECK (channel_type IN ('group', 'dm')),
  space_id UUID REFERENCES public.spaces(id) ON DELETE SET NULL,
  created_by UUID,
  icon_emoji TEXT DEFAULT '💬',
  is_archived BOOLEAN DEFAULT false,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Chat channel members
CREATE TABLE public.chat_channel_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID NOT NULL REFERENCES public.chat_channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  last_read_at TIMESTAMPTZ DEFAULT now(),
  notifications_enabled BOOLEAN DEFAULT true,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(channel_id, user_id)
);

-- Chat messages
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID NOT NULL REFERENCES public.chat_channels(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  reply_to_id UUID REFERENCES public.chat_messages(id) ON DELETE SET NULL,
  is_edited BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_chat_messages_channel_id ON public.chat_messages(channel_id, created_at DESC);
CREATE INDEX idx_chat_channel_members_user_id ON public.chat_channel_members(user_id);
CREATE INDEX idx_chat_channels_space_id ON public.chat_channels(space_id);
CREATE INDEX idx_chat_channels_type ON public.chat_channels(channel_type);

-- Enable RLS
ALTER TABLE public.chat_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS: chat_channels - users can see channels they're members of
CREATE POLICY "Users can view channels they belong to"
  ON public.chat_channels FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_channel_members
      WHERE chat_channel_members.channel_id = chat_channels.id
      AND chat_channel_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create channels"
  ON public.chat_channels FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Channel owners can update"
  ON public.chat_channels FOR UPDATE
  USING (created_by = auth.uid());

-- RLS: chat_channel_members
CREATE POLICY "Users can view members of their channels"
  ON public.chat_channel_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_channel_members AS my_membership
      WHERE my_membership.channel_id = chat_channel_members.channel_id
      AND my_membership.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can join channels"
  ON public.chat_channel_members FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own membership"
  ON public.chat_channel_members FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can leave channels"
  ON public.chat_channel_members FOR DELETE
  USING (user_id = auth.uid());

-- RLS: chat_messages
CREATE POLICY "Users can view messages in their channels"
  ON public.chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_channel_members
      WHERE chat_channel_members.channel_id = chat_messages.channel_id
      AND chat_channel_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can send messages to their channels"
  ON public.chat_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.chat_channel_members
      WHERE chat_channel_members.channel_id = chat_messages.channel_id
      AND chat_channel_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can edit their own messages"
  ON public.chat_messages FOR UPDATE
  USING (sender_id = auth.uid());

CREATE POLICY "Users can delete their own messages"
  ON public.chat_messages FOR DELETE
  USING (sender_id = auth.uid());

-- Trigger to update last_message_at on channel
CREATE OR REPLACE FUNCTION public.update_channel_last_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.chat_channels
  SET last_message_at = NEW.created_at, updated_at = NEW.created_at
  WHERE id = NEW.channel_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_new_chat_message
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_channel_last_message();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
