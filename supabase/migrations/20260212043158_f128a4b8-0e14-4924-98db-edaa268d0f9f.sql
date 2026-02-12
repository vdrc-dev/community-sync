
-- Create all tables first, then add policies

-- Spaces
CREATE TABLE public.spaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_emoji TEXT DEFAULT '💬',
  cover_image_url TEXT,
  space_type TEXT NOT NULL DEFAULT 'discussion',
  is_private BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  member_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Space Members
CREATE TABLE public.space_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  space_id UUID NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  notifications_enabled BOOLEAN DEFAULT true,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(space_id, user_id)
);

-- Space Posts
CREATE TABLE public.space_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  space_id UUID NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT,
  content TEXT NOT NULL,
  post_type TEXT DEFAULT 'discussion',
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Space Post Comments
CREATE TABLE public.space_post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.space_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  parent_comment_id UUID REFERENCES public.space_post_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Post Likes
CREATE TABLE public.space_post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.space_posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.space_post_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(post_id, user_id),
  UNIQUE(comment_id, user_id)
);

-- Now add RLS
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_post_likes ENABLE ROW LEVEL SECURITY;

-- Spaces policies
CREATE POLICY "Anyone can view public spaces" ON public.spaces FOR SELECT USING (is_private = false);
CREATE POLICY "Members can view private spaces" ON public.spaces FOR SELECT USING (
  is_private = true AND EXISTS (SELECT 1 FROM public.space_members sm WHERE sm.space_id = id AND sm.user_id = auth.uid())
);
CREATE POLICY "Admins can manage spaces" ON public.spaces FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Space Members policies
CREATE POLICY "Users can view space members" ON public.space_members FOR SELECT USING (true);
CREATE POLICY "Users can join spaces" ON public.space_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave spaces" ON public.space_members FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage members" ON public.space_members FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Space Posts policies
CREATE POLICY "Anyone can view posts in public spaces" ON public.space_posts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.spaces s WHERE s.id = space_id AND s.is_private = false)
);
CREATE POLICY "Members can view posts in private spaces" ON public.space_posts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.space_members sm WHERE sm.space_id = space_id AND sm.user_id = auth.uid())
);
CREATE POLICY "Authenticated users can create posts" ON public.space_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own posts" ON public.space_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own posts" ON public.space_posts FOR DELETE USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all posts" ON public.space_posts FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Comments policies
CREATE POLICY "Anyone can view comments" ON public.space_post_comments FOR SELECT USING (true);
CREATE POLICY "Auth users can create comments" ON public.space_post_comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own comments" ON public.space_post_comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own comments" ON public.space_post_comments FOR DELETE USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage comments" ON public.space_post_comments FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Likes policies
CREATE POLICY "Anyone can view likes" ON public.space_post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON public.space_post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.space_post_likes FOR DELETE USING (auth.uid() = user_id);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.space_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.space_post_comments;

-- Seed default spaces
INSERT INTO public.spaces (name, slug, description, icon_emoji, space_type, is_default, sort_order) VALUES
  ('General', 'general', 'Conversaciones generales de la comunidad', '🏠', 'discussion', true, 1),
  ('Presentaciones', 'presentaciones', 'Comparte y discute presentaciones del workshop', '🎤', 'discussion', false, 2),
  ('Recursos IA', 'recursos-ia', 'Herramientas, artículos y recursos sobre IA', '🤖', 'discussion', false, 3),
  ('Proyectos', 'proyectos', 'Muestra tus proyectos y recibe feedback', '🚀', 'discussion', false, 4),
  ('Ayuda', 'ayuda', 'Preguntas y respuestas de la comunidad', '❓', 'discussion', false, 5),
  ('Anuncios', 'anuncios', 'Noticias y actualizaciones oficiales', '📢', 'discussion', false, 6);

-- Triggers for counts
CREATE OR REPLACE FUNCTION public.update_space_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.spaces SET post_count = post_count + 1 WHERE id = NEW.space_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.spaces SET post_count = post_count - 1 WHERE id = OLD.space_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_space_post_change
  AFTER INSERT OR DELETE ON public.space_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_space_post_count();

CREATE OR REPLACE FUNCTION public.update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.space_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.space_posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_post_comment_change
  AFTER INSERT OR DELETE ON public.space_post_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_post_comment_count();

CREATE OR REPLACE FUNCTION public.update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.post_id IS NOT NULL THEN
      UPDATE public.space_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
    ELSIF NEW.comment_id IS NOT NULL THEN
      UPDATE public.space_post_comments SET likes_count = likes_count + 1 WHERE id = NEW.comment_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.post_id IS NOT NULL THEN
      UPDATE public.space_posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
    ELSIF OLD.comment_id IS NOT NULL THEN
      UPDATE public.space_post_comments SET likes_count = likes_count - 1 WHERE id = OLD.comment_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_like_change
  AFTER INSERT OR DELETE ON public.space_post_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_likes_count();
