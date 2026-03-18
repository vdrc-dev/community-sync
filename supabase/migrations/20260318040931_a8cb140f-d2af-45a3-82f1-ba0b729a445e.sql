
-- Add aliases for prompt_library columns
ALTER TABLE public.prompt_library
  ADD COLUMN IF NOT EXISTS prompt_text TEXT,
  ADD COLUMN IF NOT EXISTS created_by  UUID;

-- Backfill from existing columns
UPDATE public.prompt_library SET prompt_text = prompt WHERE prompt_text IS NULL;
UPDATE public.prompt_library SET created_by = user_id WHERE created_by IS NULL;

-- chat_channel_members (without IF NOT EXISTS on policies)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='chat_channel_members') THEN
    CREATE TABLE public.chat_channel_members (
      id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      channel_id    UUID NOT NULL REFERENCES public.chat_channels(id) ON DELETE CASCADE,
      user_id       UUID NOT NULL,
      role          TEXT NOT NULL DEFAULT 'member',
      last_read_at  TIMESTAMPTZ DEFAULT now(),
      joined_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (channel_id, user_id)
    );
    ALTER TABLE public.chat_channel_members ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Members viewable by authenticated"  ON public.chat_channel_members FOR SELECT TO authenticated USING (true);
    CREATE POLICY "Users join channels"                ON public.chat_channel_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Users leave channels"               ON public.chat_channel_members FOR DELETE USING (auth.uid() = user_id);
    CREATE POLICY "System update memberships"          ON public.chat_channel_members FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- Fix chat_channels columns
ALTER TABLE public.chat_channels
  ADD COLUMN IF NOT EXISTS channel_type    TEXT NOT NULL DEFAULT 'group',
  ADD COLUMN IF NOT EXISTS space_id        UUID,
  ADD COLUMN IF NOT EXISTS created_by      UUID,
  ADD COLUMN IF NOT EXISTS is_archived     BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMPTZ DEFAULT now();

-- Fix chat_messages: add sender_id and message_type
ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS sender_id    UUID,
  ADD COLUMN IF NOT EXISTS message_type TEXT DEFAULT 'text';
UPDATE public.chat_messages SET sender_id = author_id WHERE sender_id IS NULL;

-- Fix weekly_challenges columns
ALTER TABLE public.weekly_challenges
  ADD COLUMN IF NOT EXISTS challenge_type TEXT DEFAULT 'engagement',
  ADD COLUMN IF NOT EXISTS target_count   INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS points_reward  INT DEFAULT 100,
  ADD COLUMN IF NOT EXISTS badge_reward   TEXT,
  ADD COLUMN IF NOT EXISTS icon_emoji     TEXT DEFAULT '🎯',
  ADD COLUMN IF NOT EXISTS start_date     DATE,
  ADD COLUMN IF NOT EXISTS end_date       DATE;

-- Fix user_challenge_progress: add current_count
ALTER TABLE public.user_challenge_progress
  ADD COLUMN IF NOT EXISTS current_count INT DEFAULT 0;

-- Fix user_automations columns
ALTER TABLE public.user_automations
  ADD COLUMN IF NOT EXISTS frequency_per_week INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS hourly_rate         NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tool_used           TEXT;

-- Fix tools columns
ALTER TABLE public.tools
  ADD COLUMN IF NOT EXISTS use_cases TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS best_for  TEXT;

-- increment_challenge_progress function
CREATE OR REPLACE FUNCTION public.increment_challenge_progress(
  _user_id        UUID,
  _challenge_type TEXT
) RETURNS TABLE(
  challenge_id UUID,
  title        TEXT,
  current      INT,
  target       INT,
  completed    BOOLEAN
) AS $$
DECLARE
  _challenge RECORD;
  _progress  RECORD;
  _new_count INT;
BEGIN
  FOR _challenge IN
    SELECT * FROM public.weekly_challenges
    WHERE challenge_type = _challenge_type AND is_active = true
      AND (start_date IS NULL OR start_date <= CURRENT_DATE)
      AND (end_date IS NULL OR end_date >= CURRENT_DATE)
  LOOP
    SELECT * INTO _progress
    FROM public.user_challenge_progress
    WHERE user_id = _user_id AND challenge_id = _challenge.id;

    IF _progress IS NULL THEN
      INSERT INTO public.user_challenge_progress (user_id, challenge_id, current_count, status)
      VALUES (_user_id, _challenge.id, 1, 'in_progress')
      RETURNING current_count INTO _new_count;
    ELSE
      _new_count := _progress.current_count + 1;
      UPDATE public.user_challenge_progress
      SET current_count = _new_count,
          status = CASE WHEN _new_count >= _challenge.target_count THEN 'completed' ELSE 'in_progress' END,
          completed_at = CASE WHEN _new_count >= _challenge.target_count THEN now() ELSE NULL END
      WHERE user_id = _user_id AND challenge_id = _challenge.id;
    END IF;

    challenge_id := _challenge.id;
    title        := _challenge.title;
    current      := _new_count;
    target       := _challenge.target_count;
    completed    := (_new_count >= _challenge.target_count);
    RETURN NEXT;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop and recreate calculate_user_roi with correct signature
DROP FUNCTION IF EXISTS public.calculate_user_roi(UUID);
CREATE OR REPLACE FUNCTION public.calculate_user_roi(p_user_id UUID)
RETURNS TABLE(
  total_automations     INT,
  weekly_minutes_saved  NUMERIC,
  monthly_minutes_saved NUMERIC,
  yearly_minutes_saved  NUMERIC,
  weekly_value_saved    NUMERIC,
  monthly_value_saved   NUMERIC,
  yearly_value_saved    NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::INT,
    ROUND(COALESCE(SUM((time_before_minutes - time_after_minutes)::NUMERIC * COALESCE(frequency_per_week, 1)), 0), 2),
    ROUND(COALESCE(SUM((time_before_minutes - time_after_minutes)::NUMERIC * COALESCE(frequency_per_week, 1)), 0) * 4, 2),
    ROUND(COALESCE(SUM((time_before_minutes - time_after_minutes)::NUMERIC * COALESCE(frequency_per_week, 1)), 0) * 52, 2),
    ROUND(COALESCE(SUM((time_before_minutes - time_after_minutes)::NUMERIC * COALESCE(frequency_per_week, 1) * COALESCE(hourly_rate, 0) / 60), 0), 2),
    ROUND(COALESCE(SUM((time_before_minutes - time_after_minutes)::NUMERIC * COALESCE(frequency_per_week, 1) * COALESCE(hourly_rate, 0) / 60), 0) * 4, 2),
    ROUND(COALESCE(SUM((time_before_minutes - time_after_minutes)::NUMERIC * COALESCE(frequency_per_week, 1) * COALESCE(hourly_rate, 0) / 60), 0) * 52, 2)
  FROM public.user_automations
  WHERE user_id = p_user_id AND is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
