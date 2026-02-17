-- Fix: allow channel creators to see their own channels (needed for INSERT RETURNING)
DROP POLICY IF EXISTS "Users can view accessible channels" ON public.chat_channels;
CREATE POLICY "Users can view accessible channels"
ON public.chat_channels
FOR SELECT
USING (
  channel_type = 'group' OR
  created_by = auth.uid() OR
  public.is_chat_channel_member(id, auth.uid())
);