-- Allow users to see all group channels (so they can auto-join)
-- Drop the existing restrictive SELECT policy
DROP POLICY IF EXISTS "Users can view channels they belong to" ON public.chat_channels;

-- Create a new policy: users can see group channels OR channels they're a member of
CREATE POLICY "Users can view accessible channels"
ON public.chat_channels
FOR SELECT
USING (
  (channel_type = 'group') OR
  EXISTS (
    SELECT 1 FROM public.chat_channel_members
    WHERE chat_channel_members.channel_id = chat_channels.id
    AND chat_channel_members.user_id = auth.uid()
  )
);