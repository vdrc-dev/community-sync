-- =====================================================
-- PRACTICAL UTILITY FEATURES - PHASE 1
-- Notes, Bookmarks, Quick Notes, Prompts, Resume Learning
-- =====================================================

-- 1. User Notes per Class (Markdown notes with timestamps)
CREATE TABLE public.user_notes (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    content text NOT NULL DEFAULT '',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, class_id)
);

ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes" ON public.user_notes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notes" ON public.user_notes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON public.user_notes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON public.user_notes
    FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_notes_updated_at
    BEFORE UPDATE ON public.user_notes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Unified Bookmarks System
CREATE TABLE public.user_bookmarks (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    resource_type text NOT NULL, -- 'class', 'tool', 'post', 'prompt'
    resource_id uuid NOT NULL,
    note text,
    tags text[] DEFAULT '{}',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, resource_type, resource_id)
);

ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks" ON public.user_bookmarks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks" ON public.user_bookmarks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks" ON public.user_bookmarks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON public.user_bookmarks
    FOR DELETE USING (auth.uid() = user_id);

-- 3. Quick Notes (floating capture)
CREATE TABLE public.quick_notes (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    content text NOT NULL,
    context_type text, -- page type when note was created
    context_id uuid, -- resource id if applicable
    context_url text, -- URL where note was created
    tags text[] DEFAULT '{}',
    is_processed boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.quick_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own quick notes" ON public.quick_notes
    FOR ALL USING (auth.uid() = user_id);

CREATE TRIGGER update_quick_notes_updated_at
    BEFORE UPDATE ON public.quick_notes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Prompt Library (copyable prompts/snippets)
CREATE TABLE public.prompt_library (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    prompt_text text NOT NULL,
    description text,
    tool_id uuid REFERENCES public.tools(id) ON DELETE SET NULL,
    category text, -- 'writing', 'code', 'analysis', 'creative'
    tags text[] DEFAULT '{}',
    copy_count integer DEFAULT 0,
    created_by uuid,
    is_public boolean DEFAULT true,
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.prompt_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public prompts" ON public.prompt_library
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own prompts" ON public.prompt_library
    FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create prompts" ON public.prompt_library
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own prompts" ON public.prompt_library
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Admins can manage all prompts" ON public.prompt_library
    FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 5. User Saved Prompts (favorites)
CREATE TABLE public.user_saved_prompts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    prompt_id uuid NOT NULL REFERENCES public.prompt_library(id) ON DELETE CASCADE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, prompt_id)
);

ALTER TABLE public.user_saved_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved prompts" ON public.user_saved_prompts
    FOR ALL USING (auth.uid() = user_id);

-- 6. Activity Resume (continue where you left off)
CREATE TABLE public.user_activity_resume (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    resource_type text NOT NULL, -- 'class', 'tool', 'post', 'generation'
    resource_id uuid NOT NULL,
    resource_title text, -- Cached title for quick display
    resource_meta jsonb DEFAULT '{}', -- Additional metadata
    last_accessed_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, resource_type, resource_id)
);

ALTER TABLE public.user_activity_resume ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own resume data" ON public.user_activity_resume
    FOR ALL USING (auth.uid() = user_id);

-- Function to track activity resume
CREATE OR REPLACE FUNCTION public.track_activity(_user_id uuid, _resource_type text, _resource_id uuid, _resource_title text, _resource_meta jsonb DEFAULT '{}')
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.user_activity_resume (user_id, resource_type, resource_id, resource_title, resource_meta, last_accessed_at)
    VALUES (_user_id, _resource_type, _resource_id, _resource_title, _resource_meta, now())
    ON CONFLICT (user_id, resource_type, resource_id)
    DO UPDATE SET 
        last_accessed_at = now(),
        resource_title = COALESCE(_resource_title, user_activity_resume.resource_title),
        resource_meta = COALESCE(_resource_meta, user_activity_resume.resource_meta);
    
    -- Keep only the 20 most recent items per user
    DELETE FROM public.user_activity_resume
    WHERE user_id = _user_id
    AND id NOT IN (
        SELECT id FROM public.user_activity_resume
        WHERE user_id = _user_id
        ORDER BY last_accessed_at DESC
        LIMIT 20
    );
END;
$$;

-- Function to increment prompt copy count
CREATE OR REPLACE FUNCTION public.increment_prompt_copy(_prompt_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.prompt_library
    SET copy_count = copy_count + 1
    WHERE id = _prompt_id;
END;
$$;

-- Indexes for performance
CREATE INDEX idx_user_notes_user_class ON public.user_notes(user_id, class_id);
CREATE INDEX idx_user_bookmarks_user ON public.user_bookmarks(user_id);
CREATE INDEX idx_user_bookmarks_type ON public.user_bookmarks(resource_type);
CREATE INDEX idx_quick_notes_user ON public.quick_notes(user_id);
CREATE INDEX idx_prompt_library_tool ON public.prompt_library(tool_id);
CREATE INDEX idx_prompt_library_category ON public.prompt_library(category);
CREATE INDEX idx_user_activity_resume_user ON public.user_activity_resume(user_id, last_accessed_at DESC);