
-- Final batch: workflows extra cols, user_workflow_progress, calendar_events, is_email_allowed fn, chat fixes

-- Fix automation_workflows to have proper columns for Workflow type
ALTER TABLE public.automation_workflows
  ADD COLUMN IF NOT EXISTS title        TEXT,
  ADD COLUMN IF NOT EXISTS difficulty   TEXT DEFAULT 'beginner',
  ADD COLUMN IF NOT EXISTS category     TEXT DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS icon_emoji   TEXT DEFAULT '⚡',
  ADD COLUMN IF NOT EXISTS tools_used   TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tags         TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS estimated_time_minutes INT DEFAULT 15;

-- user_workflow_progress
CREATE TABLE IF NOT EXISTS public.user_workflow_progress (
  id               UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID NOT NULL,
  workflow_id      UUID NOT NULL REFERENCES public.automation_workflows(id) ON DELETE CASCADE,
  completed_steps  INT[] DEFAULT '{}',
  notes            TEXT,
  started_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at     TIMESTAMPTZ,
  UNIQUE (user_id, workflow_id)
);
ALTER TABLE public.user_workflow_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own workflow progress" ON public.user_workflow_progress FOR ALL USING (auth.uid() = user_id);

-- calendar_events
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_id   UUID REFERENCES public.generations(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  event_date      DATE NOT NULL,
  event_type      TEXT DEFAULT 'class',
  start_time      TIME,
  end_time        TIME,
  location_url    TEXT,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Calendar events viewable by authenticated" ON public.calendar_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage calendar events"             ON public.calendar_events FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- is_email_allowed function
CREATE OR REPLACE FUNCTION public.is_email_allowed(_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if there's a pending/accepted invitation for this email
  RETURN EXISTS (
    SELECT 1 FROM public.invitations
    WHERE email = lower(_email)
      AND status IN ('pending', 'accepted')
      AND (expires_at IS NULL OR expires_at > now())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix prompt_library title column issue: add title as alias to prompt if missing
-- The title column already exists but some inserts use 'title' which conflicts with the schema
-- Ensure the title field in Insert type is properly recognized
-- Nothing to do - the column exists already

-- Fix chat_messages: the schema has 'channel_id' but TypeScript is confused
-- Let's rename the original chat_messages table
-- Actually, the issue is author_id vs sender_id - make channel_id NOT NULL default
ALTER TABLE public.chat_messages ALTER COLUMN channel_id SET NOT NULL;
