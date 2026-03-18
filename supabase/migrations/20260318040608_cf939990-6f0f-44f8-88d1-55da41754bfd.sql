
-- ============================================================
-- CORE TABLES: profiles, generations, classes, class_presentations
--              spaces, space_members, space_posts, space_comments, tools
-- ============================================================

-- Update timestamp helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ── profiles ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID NOT NULL UNIQUE,
  full_name    TEXT,
  avatar_url   TEXT,
  bio          TEXT,
  username     TEXT UNIQUE,
  website      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone"   ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert own profile"        ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile"        ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── generations ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.generations (
  id          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  start_date  DATE,
  end_date    DATE,
  is_active   BOOLEAN DEFAULT false,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Generations viewable by authenticated" ON public.generations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage generations"             ON public.generations FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_generations_updated_at
  BEFORE UPDATE ON public.generations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── classes ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.classes (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_id   UUID NOT NULL REFERENCES public.generations(id) ON DELETE CASCADE,
  class_number    INT NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  class_date      DATE,
  recording_url   TEXT,
  resources_url   TEXT,
  is_published    BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (generation_id, class_number)
);

ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Classes viewable by authenticated" ON public.classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage classes"             ON public.classes FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── class_presentations ───────────────────────────────────
CREATE TABLE IF NOT EXISTS public.class_presentations (
  id                  UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id            UUID NOT NULL UNIQUE REFERENCES public.classes(id) ON DELETE CASCADE,
  status              TEXT NOT NULL DEFAULT 'draft',
  outline             TEXT DEFAULT '',
  key_points          TEXT[] DEFAULT '{}',
  talking_points      TEXT[] DEFAULT '{}',
  resources_needed    TEXT[] DEFAULT '{}',
  duration_estimate   INT DEFAULT 60,
  slide_template      TEXT,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.class_presentations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Presentations viewable by authenticated" ON public.class_presentations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage presentations"             ON public.class_presentations FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_class_presentations_updated_at
  BEFORE UPDATE ON public.class_presentations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── spaces ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.spaces (
  id               UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT,
  icon_emoji       TEXT DEFAULT '💬',
  cover_image_url  TEXT,
  space_type       TEXT NOT NULL DEFAULT 'general',
  is_private       BOOLEAN DEFAULT false,
  is_default       BOOLEAN DEFAULT false,
  sort_order       INT DEFAULT 0,
  member_count     INT DEFAULT 0,
  post_count       INT DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Spaces viewable by authenticated"  ON public.spaces FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage spaces"              ON public.spaces FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_spaces_updated_at
  BEFORE UPDATE ON public.spaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── space_members ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.space_members (
  id         UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  space_id   UUID NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL,
  role       TEXT NOT NULL DEFAULT 'member',
  joined_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (space_id, user_id)
);

ALTER TABLE public.space_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Space members viewable by authenticated" ON public.space_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users join spaces"                       ON public.space_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users leave spaces"                      ON public.space_members FOR DELETE USING (auth.uid() = user_id);

-- ── space_posts ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.space_posts (
  id              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  space_id        UUID NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  author_id       UUID NOT NULL,
  title           TEXT,
  content         TEXT NOT NULL,
  post_type       TEXT NOT NULL DEFAULT 'post',
  is_pinned       BOOLEAN DEFAULT false,
  is_locked       BOOLEAN DEFAULT false,
  likes_count     INT DEFAULT 0,
  comments_count  INT DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.space_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts viewable by authenticated"     ON public.space_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users create posts"    ON public.space_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors update their posts"          ON public.space_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors delete their posts"          ON public.space_posts FOR DELETE USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_space_posts_updated_at
  BEFORE UPDATE ON public.space_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── space_comments ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.space_comments (
  id                  UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id             UUID NOT NULL REFERENCES public.space_posts(id) ON DELETE CASCADE,
  author_id           UUID NOT NULL,
  parent_comment_id   UUID REFERENCES public.space_comments(id) ON DELETE CASCADE,
  content             TEXT NOT NULL,
  likes_count         INT DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.space_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments viewable by authenticated"    ON public.space_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users create comments"   ON public.space_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors update their comments"         ON public.space_comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors delete their comments"         ON public.space_comments FOR DELETE USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_space_comments_updated_at
  BEFORE UPDATE ON public.space_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── tools ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tools (
  id            UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  icon_emoji    TEXT DEFAULT '🔧',
  category      TEXT DEFAULT 'general',
  url           TEXT,
  is_published  BOOLEAN DEFAULT true,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tools viewable by authenticated"  ON public.tools FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage tools"              ON public.tools FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_tools_updated_at
  BEFORE UPDATE ON public.tools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ── default spaces seed ───────────────────────────────────
INSERT INTO public.spaces (name, slug, description, icon_emoji, space_type, is_default, sort_order)
VALUES
  ('General',   'general',   'Conversaciones generales de la comunidad', '💬', 'general',   true,  1),
  ('Recursos',  'recursos',  'Comparte y descubre recursos útiles',       '📚', 'resources', false, 2),
  ('Proyectos', 'proyectos', 'Muestra tus proyectos e iniciativas',       '🚀', 'projects',  false, 3),
  ('Preguntas', 'preguntas', 'Haz preguntas y obtén respuestas',          '❓', 'qa',        false, 4),
  ('Off-topic', 'off-topic', 'Conversaciones fuera del tema principal',   '🎯', 'general',   false, 5)
ON CONFLICT (slug) DO NOTHING;
