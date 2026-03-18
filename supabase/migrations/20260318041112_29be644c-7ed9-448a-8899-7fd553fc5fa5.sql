
-- ============================================================
-- MORE MISSING TABLES: user_notes, user_progress, user_saved_prompts
-- + more prompt_library columns + fix chat_messages channel_id
-- ============================================================

-- ── user_notes ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_notes (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL,
  class_id   UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  content    TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, class_id)
);
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own notes v2" ON public.user_notes FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_user_notes_ts BEFORE UPDATE ON public.user_notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── user_progress ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_progress (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID NOT NULL,
  class_id     UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, class_id)
);
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own progress v2"  ON public.user_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins view all user_progress" ON public.user_progress FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- ── user_saved_prompts ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_saved_prompts (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL,
  prompt_id  UUID NOT NULL REFERENCES public.prompt_library(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, prompt_id)
);
ALTER TABLE public.user_saved_prompts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own saved prompts" ON public.user_saved_prompts FOR ALL USING (auth.uid() = user_id);

-- ── prompt_library extra columns ─────────────────────────
ALTER TABLE public.prompt_library
  ADD COLUMN IF NOT EXISTS tool_id     UUID REFERENCES public.tools(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS copy_count  INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- increment_prompt_copy function
CREATE OR REPLACE FUNCTION public.increment_prompt_copy(_prompt_id UUID) RETURNS void AS $$
BEGIN
  UPDATE public.prompt_library SET copy_count = copy_count + 1 WHERE id = _prompt_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── Fix chat_messages: rename channel_id_ref → ensure channel_id is used ─
-- The insert uses channel_id, sender_id — already exists; no action needed.
-- Remove temporary column we added before:
ALTER TABLE public.chat_messages DROP COLUMN IF EXISTS channel_id_ref;

-- ── Fix chat_channels: slug is required but insert doesn't provide it ─
-- Make slug nullable so seeding without slug works
ALTER TABLE public.chat_channels ALTER COLUMN slug DROP NOT NULL;
ALTER TABLE public.chat_channels ALTER COLUMN slug SET DEFAULT NULL;
