-- Add unique constraint on channel name + type to prevent duplicate seeding
CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_channels_unique_group_name 
ON public.chat_channels (name) 
WHERE channel_type = 'group' AND name IS NOT NULL;