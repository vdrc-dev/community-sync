
-- Add missing columns to calendar_events, classes, automation_workflows, and forum tables
ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS duration_minutes INT DEFAULT 90,
  ADD COLUMN IF NOT EXISTS meeting_url      TEXT,
  ADD COLUMN IF NOT EXISTS location         TEXT;

ALTER TABLE public.classes
  ADD COLUMN IF NOT EXISTS drive_folder_url TEXT,
  ADD COLUMN IF NOT EXISTS slides_url       TEXT;

ALTER TABLE public.automation_workflows
  ADD COLUMN IF NOT EXISTS is_published              BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS is_featured               BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS time_to_setup_minutes     INT DEFAULT 10,
  ADD COLUMN IF NOT EXISTS time_saved_per_use_minutes INT DEFAULT 5,
  ADD COLUMN IF NOT EXISTS mermaid_diagram           TEXT;

-- Forum tables
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_emoji  TEXT DEFAULT '💬',
  sort_order  INT DEFAULT 0,
  post_count  INT DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Forum categories viewable by authenticated" ON public.forum_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage forum categories"             ON public.forum_categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.forum_posts (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id  UUID REFERENCES public.forum_categories(id) ON DELETE SET NULL,
  author_id    UUID NOT NULL,
  title        TEXT NOT NULL,
  content      TEXT NOT NULL,
  tags         TEXT[] DEFAULT '{}',
  is_pinned    BOOLEAN DEFAULT false,
  is_locked    BOOLEAN DEFAULT false,
  views_count  INT DEFAULT 0,
  likes_count  INT DEFAULT 0,
  replies_count INT DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Forum posts viewable by authenticated"   ON public.forum_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth users create forum posts"           ON public.forum_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors update forum posts"              ON public.forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors delete forum posts"              ON public.forum_posts FOR DELETE USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_forum_posts_ts BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.forum_categories (name, slug, description, icon_emoji, sort_order)
VALUES
  ('General', 'general', 'Discusión general', '💬', 1),
  ('Preguntas', 'preguntas', 'Preguntas y respuestas', '❓', 2),
  ('Proyectos', 'proyectos', 'Comparte tus proyectos', '🚀', 3),
  ('Recursos', 'recursos', 'Herramientas y recursos', '📚', 4)
ON CONFLICT (slug) DO NOTHING;

-- class_tools relationship table
CREATE TABLE IF NOT EXISTS public.class_tools (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id   UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  tool_id    UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  UNIQUE (class_id, tool_id)
);
ALTER TABLE public.class_tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Class tools viewable by authenticated" ON public.class_tools FOR SELECT TO authenticated USING (true);
