
-- ============================================================
-- ADDITIONAL TABLES: automation_workflows, user_preferences,
--   prompt_library, tool extras columns, user_activity_resume,
--   user_automations, user_bookmarks, weekly_challenges,
--   user_challenge_progress, chat_channels, chat_messages,
--   user_streaks, leaderboard_scores, notifications,
--   gamification, notes, quick_notes, access_requests,
--   invitations, admin_users, workflows, workflow_executions,
--   roi_entries, calendar_events
-- ============================================================

-- ── automation_workflows ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.automation_workflows (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID NOT NULL,
  name          TEXT NOT NULL,
  description   TEXT,
  trigger_type  TEXT DEFAULT 'manual',
  steps         JSONB DEFAULT '[]',
  is_active     BOOLEAN DEFAULT true,
  run_count     INT DEFAULT 0,
  last_run_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own automations" ON public.automation_workflows FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_automation_workflows_ts BEFORE UPDATE ON public.automation_workflows FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── user_preferences ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id                      UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                 UUID NOT NULL UNIQUE,
  theme                   TEXT DEFAULT 'dark',
  language                TEXT DEFAULT 'es',
  onboarding_completed    BOOLEAN DEFAULT false,
  onboarding_step         INT DEFAULT 0,
  discovered_easter_eggs  TEXT[] DEFAULT '{}',
  keyboard_shortcuts      BOOLEAN DEFAULT true,
  notifications_enabled   BOOLEAN DEFAULT true,
  preferences             JSONB DEFAULT '{}',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_user_preferences_ts BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── prompt_library ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.prompt_library (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID,
  title        TEXT NOT NULL,
  description  TEXT,
  prompt       TEXT NOT NULL,
  category     TEXT DEFAULT 'general',
  tags         TEXT[] DEFAULT '{}',
  is_public    BOOLEAN DEFAULT false,
  use_count    INT DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.prompt_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public prompts viewable by all"       ON public.prompt_library FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Authenticated users create prompts"   ON public.prompt_library FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own prompts"             ON public.prompt_library FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own prompts"             ON public.prompt_library FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_prompt_library_ts BEFORE UPDATE ON public.prompt_library FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── user_activity_resume ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_activity_resume (
  id               UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID NOT NULL,
  resource_type    TEXT NOT NULL,
  resource_id      TEXT NOT NULL,
  resource_title   TEXT,
  resource_meta    JSONB DEFAULT '{}',
  last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_type, resource_id)
);
ALTER TABLE public.user_activity_resume ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own activity" ON public.user_activity_resume FOR ALL USING (auth.uid() = user_id);

-- track_activity function
CREATE OR REPLACE FUNCTION public.track_activity(
  p_user_id       UUID,
  p_resource_type TEXT,
  p_resource_id   TEXT,
  p_resource_title TEXT DEFAULT NULL,
  p_resource_meta JSONB DEFAULT '{}'
) RETURNS void AS $$
BEGIN
  INSERT INTO public.user_activity_resume (user_id, resource_type, resource_id, resource_title, resource_meta, last_accessed_at)
  VALUES (p_user_id, p_resource_type, p_resource_id, p_resource_title, p_resource_meta, now())
  ON CONFLICT (user_id, resource_type, resource_id)
  DO UPDATE SET resource_title = EXCLUDED.resource_title, resource_meta = EXCLUDED.resource_meta, last_accessed_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── user_automations ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_automations (
  id                  UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             UUID NOT NULL,
  task_name           TEXT NOT NULL,
  category            TEXT DEFAULT 'general',
  time_before_minutes INT DEFAULT 0,
  time_after_minutes  INT DEFAULT 0,
  frequency           TEXT DEFAULT 'daily',
  tools_used          TEXT[] DEFAULT '{}',
  is_active           BOOLEAN DEFAULT true,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_automations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own user_automations" ON public.user_automations FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_user_automations_ts BEFORE UPDATE ON public.user_automations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- calculate_user_roi function
CREATE OR REPLACE FUNCTION public.calculate_user_roi(p_user_id UUID)
RETURNS TABLE(total_minutes_saved INT, weekly_hours_saved NUMERIC, monthly_hours_saved NUMERIC) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(time_before_minutes - time_after_minutes), 0)::INT AS total_minutes_saved,
    ROUND(COALESCE(SUM(time_before_minutes - time_after_minutes), 0) / 60.0, 2) AS weekly_hours_saved,
    ROUND(COALESCE(SUM(time_before_minutes - time_after_minutes), 0) / 60.0 * 4, 2) AS monthly_hours_saved
  FROM public.user_automations
  WHERE user_id = p_user_id AND is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── user_bookmarks ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id   TEXT NOT NULL,
  note          TEXT,
  tags          TEXT[] DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_type, resource_id)
);
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own bookmarks" ON public.user_bookmarks FOR ALL USING (auth.uid() = user_id);

-- ── weekly_challenges ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.weekly_challenges (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  challenge    TEXT NOT NULL,
  week_number  INT,
  year         INT,
  xp_reward    INT DEFAULT 100,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.weekly_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Challenges viewable by authenticated" ON public.weekly_challenges FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage challenges"             ON public.weekly_challenges FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ── user_challenge_progress ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_challenge_progress (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID NOT NULL,
  challenge_id UUID NOT NULL REFERENCES public.weekly_challenges(id) ON DELETE CASCADE,
  status       TEXT DEFAULT 'in_progress',
  submission   TEXT,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, challenge_id)
);
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own progress" ON public.user_challenge_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins view all progress"  ON public.user_challenge_progress FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- ── chat_channels ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.chat_channels (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_emoji  TEXT DEFAULT '💬',
  is_private  BOOLEAN DEFAULT false,
  is_default  BOOLEAN DEFAULT false,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Channels viewable by authenticated" ON public.chat_channels FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage channels"             ON public.chat_channels FOR ALL USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.chat_channels (name, slug, description, icon_emoji, is_default, sort_order)
VALUES
  ('General', 'general', 'Canal general de la comunidad', '💬', true, 1),
  ('Recursos', 'recursos', 'Comparte recursos y herramientas', '📚', false, 2),
  ('Proyectos', 'proyectos', 'Muestra tus proyectos', '🚀', false, 3)
ON CONFLICT (slug) DO NOTHING;

-- ── chat_messages ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id  UUID NOT NULL REFERENCES public.chat_channels(id) ON DELETE CASCADE,
  author_id   UUID NOT NULL,
  content     TEXT NOT NULL,
  type        TEXT DEFAULT 'text',
  reply_to_id UUID REFERENCES public.chat_messages(id) ON DELETE SET NULL,
  reactions   JSONB DEFAULT '{}',
  is_edited   BOOLEAN DEFAULT false,
  is_deleted  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Messages viewable by authenticated"    ON public.chat_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users send messages"     ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors update their messages"         ON public.chat_messages FOR UPDATE USING (auth.uid() = author_id);
CREATE TRIGGER update_chat_messages_ts BEFORE UPDATE ON public.chat_messages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- ── user_streaks ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_streaks (
  id               UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID NOT NULL UNIQUE,
  current_streak   INT DEFAULT 0,
  longest_streak   INT DEFAULT 0,
  last_activity_at DATE,
  total_days       INT DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Streaks viewable by authenticated" ON public.user_streaks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own streaks"          ON public.user_streaks FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_user_streaks_ts BEFORE UPDATE ON public.user_streaks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── leaderboard_scores ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leaderboard_scores (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL UNIQUE,
  xp_total    INT DEFAULT 0,
  level       INT DEFAULT 1,
  rank        INT,
  badges      TEXT[] DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leaderboard_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leaderboard viewable by authenticated" ON public.leaderboard_scores FOR SELECT TO authenticated USING (true);
CREATE POLICY "System updates scores"                 ON public.leaderboard_scores FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_leaderboard_scores_ts BEFORE UPDATE ON public.leaderboard_scores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── notifications ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL,
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  message     TEXT,
  link        TEXT,
  is_read     BOOLEAN DEFAULT false,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own notifications"   ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System creates notifications"   ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ── notes ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notes (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT DEFAULT '',
  tags        TEXT[] DEFAULT '{}',
  is_pinned   BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own notes" ON public.notes FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_notes_ts BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── quick_notes ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quick_notes (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL,
  content     TEXT NOT NULL,
  color       TEXT DEFAULT 'default',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quick_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own quick_notes" ON public.quick_notes FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_quick_notes_ts BEFORE UPDATE ON public.quick_notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── access_requests ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.access_requests (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID,
  email        TEXT NOT NULL,
  full_name    TEXT,
  message      TEXT,
  status       TEXT DEFAULT 'pending',
  reviewed_by  UUID,
  reviewed_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit access requests" ON public.access_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view all requests"          ON public.access_requests FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update requests"            ON public.access_requests FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- ── invitations ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.invitations (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  invited_by   UUID,
  token        TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  role         TEXT DEFAULT 'user',
  status       TEXT DEFAULT 'pending',
  expires_at   TIMESTAMPTZ DEFAULT now() + INTERVAL '7 days',
  accepted_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage invitations"  ON public.invitations FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can view by token"   ON public.invitations FOR SELECT USING (true);

-- ── workflows ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.workflows (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID NOT NULL,
  name          TEXT NOT NULL,
  description   TEXT,
  definition    JSONB DEFAULT '{}',
  is_active     BOOLEAN DEFAULT true,
  run_count     INT DEFAULT 0,
  last_run_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own workflows" ON public.workflows FOR ALL USING (auth.uid() = user_id);
CREATE TRIGGER update_workflows_ts BEFORE UPDATE ON public.workflows FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── workflow_executions ───────────────────────────────────
CREATE TABLE IF NOT EXISTS public.workflow_executions (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id  UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL,
  status       TEXT DEFAULT 'running',
  logs         JSONB DEFAULT '[]',
  result       JSONB,
  started_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own executions" ON public.workflow_executions FOR ALL USING (auth.uid() = user_id);

-- ── tools extra columns ───────────────────────────────────
ALTER TABLE public.tools
  ADD COLUMN IF NOT EXISTS pricing       TEXT DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS is_featured   BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS pros          TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS cons          TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS rating        NUMERIC(3,2) DEFAULT 0;

-- ── admin_users view helper ───────────────────────────────
CREATE OR REPLACE VIEW public.admin_users AS
  SELECT ur.user_id, p.full_name, p.avatar_url, p.username
  FROM public.user_roles ur
  LEFT JOIN public.profiles p ON p.user_id = ur.user_id
  WHERE ur.role = 'admin';
