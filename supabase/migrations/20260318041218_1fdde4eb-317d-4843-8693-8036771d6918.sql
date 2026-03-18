
-- ============================================================
-- FINAL PATCH: space_post_comments, space_post_likes, 
--   user_tool_logs, quick_notes extra cols, user_streaks extra cols,
--   workflow_executions extra cols, update_user_streak fn,
--   chat insert fixes
-- ============================================================

-- ── space_post_comments ───────────────────────────────────
CREATE TABLE IF NOT EXISTS public.space_post_comments (
  id                UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id           UUID NOT NULL REFERENCES public.space_posts(id) ON DELETE CASCADE,
  author_id         UUID NOT NULL,
  parent_comment_id UUID REFERENCES public.space_post_comments(id) ON DELETE CASCADE,
  content           TEXT NOT NULL,
  likes_count       INT DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.space_post_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments viewable by auth v2"    ON public.space_post_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth users create comments v2"   ON public.space_post_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors update comments v2"      ON public.space_post_comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors delete comments v2"      ON public.space_post_comments FOR DELETE USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_space_post_comments_ts BEFORE UPDATE ON public.space_post_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── space_post_likes ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.space_post_likes (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id    UUID NOT NULL REFERENCES public.space_posts(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);
ALTER TABLE public.space_post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes viewable by authenticated" ON public.space_post_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own likes"          ON public.space_post_likes FOR ALL USING (auth.uid() = user_id);

-- ── user_tool_logs ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_tool_logs (
  id             UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID NOT NULL,
  tool_id        UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  status         TEXT NOT NULL DEFAULT 'tried',
  rating         INT,
  notes          TEXT,
  first_tried_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, tool_id)
);
ALTER TABLE public.user_tool_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own tool logs" ON public.user_tool_logs FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_user_tool_logs_ts BEFORE UPDATE ON public.user_tool_logs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── quick_notes extra columns ─────────────────────────────
ALTER TABLE public.quick_notes
  ADD COLUMN IF NOT EXISTS context_type TEXT,
  ADD COLUMN IF NOT EXISTS context_id   TEXT,
  ADD COLUMN IF NOT EXISTS context_url  TEXT,
  ADD COLUMN IF NOT EXISTS tags         TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS is_processed BOOLEAN DEFAULT false;

-- ── user_streaks extra columns ────────────────────────────
ALTER TABLE public.user_streaks
  ADD COLUMN IF NOT EXISTS last_activity_date DATE,
  ADD COLUMN IF NOT EXISTS streak_freezes     INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS multiplier         NUMERIC(4,2) DEFAULT 1.0;

-- Backfill from existing column
UPDATE public.user_streaks SET last_activity_date = last_activity_at::DATE WHERE last_activity_date IS NULL;

-- ── update_user_streak function ───────────────────────────
CREATE OR REPLACE FUNCTION public.update_user_streak(_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  _streak RECORD;
  _today  DATE := CURRENT_DATE;
  _prev   DATE;
  _new_streak INT;
  _new_mult   NUMERIC(4,2);
  _extended   BOOLEAN := false;
  _broken     BOOLEAN := false;
  _prev_streak INT := 0;
BEGIN
  SELECT * INTO _streak FROM public.user_streaks WHERE user_id = _user_id;

  IF _streak IS NULL THEN
    INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, last_activity_date, total_days, multiplier, streak_freezes)
    VALUES (_user_id, 1, 1, _today, 1, 1.0, 0);
    RETURN jsonb_build_object('streak', 1, 'multiplier', 1.0, 'extended', true, 'broken', false);
  END IF;

  _prev := _streak.last_activity_date;
  _prev_streak := _streak.current_streak;

  IF _prev = _today THEN
    RETURN jsonb_build_object('streak', _streak.current_streak, 'multiplier', _streak.multiplier, 'extended', false, 'broken', false);
  END IF;

  IF _prev = _today - 1 OR (_streak.streak_freezes > 0 AND _prev = _today - 2) THEN
    _new_streak := _streak.current_streak + 1;
    _extended := true;
    _broken := false;
    IF _streak.streak_freezes > 0 AND _prev = _today - 2 THEN
      UPDATE public.user_streaks SET streak_freezes = streak_freezes - 1 WHERE user_id = _user_id;
    END IF;
  ELSE
    _new_streak := 1;
    _broken := _prev_streak > 1;
    _extended := false;
  END IF;

  _new_mult := LEAST(3.0, 1.0 + (_new_streak / 10.0));

  UPDATE public.user_streaks
  SET current_streak = _new_streak,
      longest_streak = GREATEST(longest_streak, _new_streak),
      last_activity_date = _today,
      last_activity_at = now(),
      total_days = total_days + 1,
      multiplier = _new_mult,
      updated_at = now()
  WHERE user_id = _user_id;

  RETURN jsonb_build_object(
    'streak', _new_streak,
    'multiplier', _new_mult,
    'extended', _extended,
    'broken', _broken,
    'previous_streak', _prev_streak,
    'longest', GREATEST(_streak.longest_streak, _new_streak)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── workflow_executions extra columns ─────────────────────
ALTER TABLE public.workflow_executions
  ADD COLUMN IF NOT EXISTS step_number      INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS variables        JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS prompt_used      TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS ai_response      TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS model_used       TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS tokens_used      INT,
  ADD COLUMN IF NOT EXISTS execution_time_ms INT,
  ADD COLUMN IF NOT EXISTS created_at       TIMESTAMPTZ NOT NULL DEFAULT now();
