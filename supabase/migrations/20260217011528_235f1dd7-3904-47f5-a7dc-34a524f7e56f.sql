-- Fix infinite recursion: create a security definer function to check membership
CREATE OR REPLACE FUNCTION public.is_chat_channel_member(_channel_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.chat_channel_members
    WHERE channel_id = _channel_id AND user_id = _user_id
  )
$$;

-- Fix chat_channels SELECT policy
DROP POLICY IF EXISTS "Users can view accessible channels" ON public.chat_channels;
CREATE POLICY "Users can view accessible channels"
ON public.chat_channels
FOR SELECT
USING (
  channel_type = 'group' OR
  public.is_chat_channel_member(id, auth.uid())
);

-- Fix chat_channel_members SELECT policy to avoid recursion
DROP POLICY IF EXISTS "Users can view members of their channels" ON public.chat_channel_members;
CREATE POLICY "Users can view members of their channels"
ON public.chat_channel_members
FOR SELECT
USING (
  public.is_chat_channel_member(channel_id, auth.uid())
);

-- Fix chat_messages SELECT policy to avoid recursion
DROP POLICY IF EXISTS "Users can view messages in their channels" ON public.chat_messages;
CREATE POLICY "Users can view messages in their channels"
ON public.chat_messages
FOR SELECT
USING (
  public.is_chat_channel_member(channel_id, auth.uid())
);

-- Fix chat_messages INSERT policy
DROP POLICY IF EXISTS "Members can send messages to their channels" ON public.chat_messages;
CREATE POLICY "Members can send messages to their channels"
ON public.chat_messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  public.is_chat_channel_member(channel_id, auth.uid())
);