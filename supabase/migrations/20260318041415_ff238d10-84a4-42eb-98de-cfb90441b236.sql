
-- Add remaining missing columns
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS notes_content TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS generation_code TEXT;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'curated';
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS channel_id UUID REFERENCES public.chat_channels(id) ON DELETE CASCADE;
UPDATE public.chat_messages SET channel_id = (SELECT id FROM public.chat_channels LIMIT 1) WHERE channel_id IS NULL;
