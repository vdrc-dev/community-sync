-- =============================================
-- VDRC Workshop Portal - Complete Database Schema
-- =============================================

-- 1. Create role enum for users
CREATE TYPE public.app_role AS ENUM ('admin', 'participant');

-- 2. User Profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    generation_code TEXT, -- e.g., "GEN-008"
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. User Roles table (separate for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'participant',
    UNIQUE (user_id, role)
);

-- 4. Generations table (each workshop version)
CREATE TABLE public.generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- e.g., "GEN-008"
    name TEXT NOT NULL, -- e.g., "Generación 008"
    description TEXT,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT false,
    cover_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Classes table (each session within a generation)
CREATE TABLE public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    generation_id UUID REFERENCES public.generations(id) ON DELETE CASCADE NOT NULL,
    class_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    class_date DATE,
    recording_url TEXT,
    drive_folder_url TEXT,
    slides_url TEXT,
    notes_content TEXT, -- Markdown content
    granola_transcript TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (generation_id, class_number)
);

-- 6. Tools/Resources catalog
CREATE TABLE public.tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    url TEXT,
    icon_emoji TEXT DEFAULT '🔧',
    category TEXT, -- e.g., "Chat", "Search", "Automation", "Video"
    pricing TEXT, -- e.g., "Free", "Freemium", "Paid"
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. Class-Tools junction (which tools were mentioned in which class)
CREATE TABLE public.class_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
    notes TEXT,
    UNIQUE (class_id, tool_id)
);

-- 8. Forum Categories
CREATE TABLE public.forum_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon_emoji TEXT DEFAULT '💬',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Forum Posts
CREATE TABLE public.forum_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.forum_categories(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 10. Forum Comments
CREATE TABLE public.forum_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES public.forum_comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 11. Calendar Events
CREATE TABLE public.calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    generation_id UUID REFERENCES public.generations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 90,
    location TEXT, -- e.g., "Zoom"
    meeting_url TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 12. User Favorites (saved resources)
CREATE TABLE public.user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    resource_type TEXT NOT NULL, -- 'class', 'tool', 'post'
    resource_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, resource_type, resource_id)
);

-- =============================================
-- Enable RLS on all tables
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Security Definer function for role checking
-- =============================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- =============================================
-- RLS Policies
-- =============================================

-- Profiles: Users can view all, update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Roles: Only viewable by self or admin
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Generations: Public read, admin write
CREATE POLICY "Generations are viewable by everyone" ON public.generations FOR SELECT USING (true);
CREATE POLICY "Admins can manage generations" ON public.generations FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Classes: Authenticated users can view, admin write
CREATE POLICY "Authenticated users can view classes" ON public.classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage classes" ON public.classes FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Tools: Public read, admin write
CREATE POLICY "Tools are viewable by everyone" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Admins can manage tools" ON public.tools FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Class Tools: Public read, admin write
CREATE POLICY "Class tools are viewable by everyone" ON public.class_tools FOR SELECT USING (true);
CREATE POLICY "Admins can manage class tools" ON public.class_tools FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Forum Categories: Public read, admin write
CREATE POLICY "Forum categories are viewable by everyone" ON public.forum_categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage forum categories" ON public.forum_categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Forum Posts: Authenticated read, author/admin write
CREATE POLICY "Authenticated users can view posts" ON public.forum_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.forum_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own posts" ON public.forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own posts" ON public.forum_posts FOR DELETE USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all posts" ON public.forum_posts FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Forum Comments: Authenticated read, author/admin write
CREATE POLICY "Authenticated users can view comments" ON public.forum_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.forum_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own comments" ON public.forum_comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own comments" ON public.forum_comments FOR DELETE USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all comments" ON public.forum_comments FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Calendar Events: Public events visible to all, private to authenticated
CREATE POLICY "Public events are viewable by everyone" ON public.calendar_events FOR SELECT USING (is_public = true);
CREATE POLICY "Authenticated users can view all events" ON public.calendar_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage events" ON public.calendar_events FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- User Favorites: Users manage own favorites
CREATE POLICY "Users can view own favorites" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON public.user_favorites FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- Triggers for updated_at
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_forum_comments_updated_at BEFORE UPDATE ON public.forum_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- Function to create profile on signup
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'participant');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Insert default forum categories
-- =============================================
INSERT INTO public.forum_categories (name, slug, description, icon_emoji, sort_order) VALUES
    ('Preguntas', 'preguntas', 'Dudas sobre IA, herramientas y productividad', '❓', 1),
    ('Proyectos', 'proyectos', 'Comparte lo que estás construyendo', '🚀', 2),
    ('Herramientas', 'herramientas', 'Discusión sobre tools de IA', '🛠️', 3),
    ('Off-Topic', 'off-topic', 'Conversación general', '💬', 4);

-- =============================================
-- Insert sample tools
-- =============================================
INSERT INTO public.tools (name, description, url, icon_emoji, category, pricing, is_featured) VALUES
    ('ChatGPT Plus', 'Asistente conversacional de OpenAI con GPT-4', 'https://chat.openai.com', '🤖', 'Chat', 'Paid', true),
    ('Claude', 'Asistente de Anthropic con contexto extendido', 'https://claude.ai', '🧠', 'Chat', 'Freemium', true),
    ('Perplexity', 'Motor de búsqueda potenciado por IA', 'https://perplexity.ai', '🔍', 'Search', 'Freemium', true),
    ('Gemini', 'IA multimodal de Google', 'https://gemini.google.com', '✨', 'Chat', 'Freemium', true),
    ('Opus Clip', 'Edición automática de videos con IA', 'https://opus.pro', '🎬', 'Video', 'Freemium', false),
    ('Notebook LM', 'Investigación y análisis de documentos', 'https://notebooklm.google.com', '📓', 'Research', 'Free', false),
    ('Granola', 'Notas automáticas de reuniones', 'https://granola.so', '🥣', 'Productivity', 'Freemium', false),
    ('Cursor', 'Editor de código con IA integrada', 'https://cursor.sh', '💻', 'Code', 'Freemium', false),
    ('Lovable', 'Construye apps con IA', 'https://lovable.dev', '💜', 'Code', 'Freemium', true);

-- Enable realtime for forum
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_comments;