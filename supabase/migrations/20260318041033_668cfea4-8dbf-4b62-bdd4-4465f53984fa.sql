
-- ============================================================
-- FINAL TABLES: user_points, user_badges, slide_generations,
--   generation_weeks, slides, sections + gamification RPCs
-- ============================================================

-- ── user_points ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_points (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL UNIQUE,
  points     INT DEFAULT 0,
  level      INT DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Points viewable by authenticated" ON public.user_points FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage own points"          ON public.user_points FOR ALL USING (auth.uid() = user_id);

-- ── user_badges ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_badges (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL,
  badge_type  TEXT NOT NULL,
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_type)
);
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges viewable by authenticated" ON public.user_badges FOR SELECT TO authenticated USING (true);
CREATE POLICY "System awards badges"             ON public.user_badges FOR INSERT WITH CHECK (true);

-- ── add_user_points function ──────────────────────────────
CREATE OR REPLACE FUNCTION public.add_user_points(
  _user_id      UUID,
  _points       INT,
  _action       TEXT,
  _resource_type TEXT DEFAULT NULL,
  _resource_id  TEXT DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO public.user_points (user_id, points, level)
  VALUES (_user_id, _points, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET
    points     = user_points.points + EXCLUDED.points,
    level      = GREATEST(1, (user_points.points + EXCLUDED.points) / 50 + 1),
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── award_badge function ──────────────────────────────────
CREATE OR REPLACE FUNCTION public.award_badge(
  _user_id   UUID,
  _badge_type TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  inserted BOOLEAN;
BEGIN
  INSERT INTO public.user_badges (user_id, badge_type)
  VALUES (_user_id, _badge_type)
  ON CONFLICT (user_id, badge_type) DO NOTHING;
  
  GET DIAGNOSTICS inserted = ROW_COUNT;
  RETURN inserted > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── sections ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.sections (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sections viewable by authenticated" ON public.sections FOR SELECT TO authenticated USING (true);

-- ── slide_generations ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.slide_generations (
  id                SERIAL PRIMARY KEY,
  generation_number INT NOT NULL UNIQUE,
  name              TEXT NOT NULL,
  module            TEXT,
  week              INT DEFAULT 1,
  total_weeks       INT DEFAULT 4,
  date              TEXT,
  instructor        TEXT DEFAULT 'VDRC',
  stack             TEXT[] DEFAULT '{}',
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.slide_generations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Slide generations viewable by authenticated" ON public.slide_generations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage slide_generations"             ON public.slide_generations FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ── generation_weeks ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.generation_weeks (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_id   INT NOT NULL REFERENCES public.slide_generations(id) ON DELETE CASCADE,
  week            INT NOT NULL,
  name            TEXT,
  stack           TEXT[] DEFAULT '{}',
  UNIQUE (generation_id, week)
);
ALTER TABLE public.generation_weeks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Generation weeks viewable by authenticated" ON public.generation_weeks FOR SELECT TO authenticated USING (true);

-- ── slides ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.slides (
  id               UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_id    INT NOT NULL REFERENCES public.slide_generations(id) ON DELETE CASCADE,
  week             INT DEFAULT 1,
  slide_number     INT NOT NULL,
  section_id       UUID REFERENCES public.sections(id),
  section_number   INT DEFAULT 1,
  title            TEXT,
  storyline        TEXT,
  component_name   TEXT NOT NULL,
  content          JSONB DEFAULT '{}',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Slides viewable by authenticated" ON public.slides FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage slides"             ON public.slides FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_slides_ts BEFORE UPDATE ON public.slides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── Fix chat_messages: channel_id insert issue ───────────
-- The column exists but TS type may have named it differently — ensure it's there
ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS channel_id_ref UUID;
