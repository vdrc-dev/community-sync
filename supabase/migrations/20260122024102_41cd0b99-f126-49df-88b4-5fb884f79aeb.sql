-- =============================================
-- MINDBLOWING FEATURES: Streaks, Challenges, Presence
-- =============================================

-- User Streaks Table (Duolingo-style)
CREATE TABLE public.user_streaks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    current_streak integer NOT NULL DEFAULT 0,
    longest_streak integer NOT NULL DEFAULT 0,
    last_activity_date date NOT NULL DEFAULT CURRENT_DATE,
    streak_freezes integer NOT NULL DEFAULT 0,
    multiplier numeric(3,2) NOT NULL DEFAULT 1.0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Weekly Challenges Table
CREATE TABLE public.weekly_challenges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    challenge_type text NOT NULL, -- 'view_classes', 'complete_classes', 'forum_posts', 'forum_comments', 'use_tools'
    target_count integer NOT NULL DEFAULT 1,
    points_reward integer NOT NULL DEFAULT 50,
    badge_reward text, -- optional badge type to award
    icon_emoji text DEFAULT '🎯',
    start_date date NOT NULL,
    end_date date NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- User Challenge Progress
CREATE TABLE public.user_challenge_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id uuid NOT NULL REFERENCES public.weekly_challenges(id) ON DELETE CASCADE,
    current_count integer NOT NULL DEFAULT 0,
    completed_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, challenge_id)
);

-- User Preferences (for dashboard customization)
CREATE TABLE public.user_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    sound_enabled boolean DEFAULT true,
    ambient_sound text DEFAULT 'none', -- 'none', 'rain', 'cafe', 'space', 'nature'
    theme text DEFAULT 'dark',
    dashboard_layout jsonb DEFAULT '{}',
    discovered_easter_eggs text[] DEFAULT '{}',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_streaks
CREATE POLICY "Users can view their own streak" ON public.user_streaks
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own streak" ON public.user_streaks
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own streak" ON public.user_streaks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for weekly_challenges (everyone can view active challenges)
CREATE POLICY "Anyone can view active challenges" ON public.weekly_challenges
    FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage challenges" ON public.weekly_challenges
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_challenge_progress
CREATE POLICY "Users can view their own progress" ON public.user_challenge_progress
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_challenge_progress
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.user_challenge_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_preferences
CREATE POLICY "Users can manage their preferences" ON public.user_preferences
    FOR ALL USING (auth.uid() = user_id);

-- Function to update streak on activity
CREATE OR REPLACE FUNCTION public.update_user_streak(_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    result jsonb;
    current_date_val date := CURRENT_DATE;
    last_date date;
    new_streak integer;
    new_longest integer;
    new_multiplier numeric(3,2);
    streak_broken boolean := false;
    streak_extended boolean := false;
BEGIN
    -- Get or create streak record
    INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, last_activity_date, multiplier)
    VALUES (_user_id, 1, 1, current_date_val, 1.0)
    ON CONFLICT (user_id) DO UPDATE SET updated_at = now()
    RETURNING last_activity_date INTO last_date;
    
    -- Get current values
    SELECT current_streak, longest_streak, last_activity_date, multiplier
    INTO new_streak, new_longest, last_date, new_multiplier
    FROM public.user_streaks WHERE user_id = _user_id;
    
    -- Calculate new streak
    IF last_date = current_date_val THEN
        -- Already updated today, no change
        result := jsonb_build_object('streak', new_streak, 'multiplier', new_multiplier, 'extended', false, 'broken', false);
    ELSIF last_date = current_date_val - 1 THEN
        -- Consecutive day - extend streak!
        new_streak := new_streak + 1;
        streak_extended := true;
        
        -- Update multiplier based on streak
        new_multiplier := CASE
            WHEN new_streak >= 30 THEN 2.0
            WHEN new_streak >= 14 THEN 1.75
            WHEN new_streak >= 7 THEN 1.5
            WHEN new_streak >= 3 THEN 1.25
            ELSE 1.0
        END;
        
        -- Update longest if needed
        IF new_streak > new_longest THEN
            new_longest := new_streak;
        END IF;
        
        UPDATE public.user_streaks
        SET current_streak = new_streak,
            longest_streak = new_longest,
            last_activity_date = current_date_val,
            multiplier = new_multiplier,
            updated_at = now()
        WHERE user_id = _user_id;
        
        result := jsonb_build_object('streak', new_streak, 'multiplier', new_multiplier, 'extended', true, 'broken', false, 'longest', new_longest);
    ELSE
        -- Streak broken :(
        streak_broken := true;
        UPDATE public.user_streaks
        SET current_streak = 1,
            last_activity_date = current_date_val,
            multiplier = 1.0,
            updated_at = now()
        WHERE user_id = _user_id;
        
        result := jsonb_build_object('streak', 1, 'multiplier', 1.0, 'extended', false, 'broken', true, 'previous_streak', new_streak);
    END IF;
    
    RETURN result;
END;
$$;

-- Function to increment challenge progress
CREATE OR REPLACE FUNCTION public.increment_challenge_progress(_user_id uuid, _challenge_type text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    challenge_record record;
    progress_record record;
    result jsonb := '[]'::jsonb;
    completed boolean;
BEGIN
    -- Find active challenges of this type
    FOR challenge_record IN
        SELECT * FROM public.weekly_challenges
        WHERE challenge_type = _challenge_type
        AND is_active = true
        AND CURRENT_DATE BETWEEN start_date AND end_date
    LOOP
        -- Get or create progress
        INSERT INTO public.user_challenge_progress (user_id, challenge_id, current_count)
        VALUES (_user_id, challenge_record.id, 0)
        ON CONFLICT (user_id, challenge_id) DO NOTHING;
        
        -- Get current progress
        SELECT * INTO progress_record
        FROM public.user_challenge_progress
        WHERE user_id = _user_id AND challenge_id = challenge_record.id;
        
        -- Skip if already completed
        IF progress_record.completed_at IS NOT NULL THEN
            CONTINUE;
        END IF;
        
        -- Increment progress
        UPDATE public.user_challenge_progress
        SET current_count = current_count + 1
        WHERE id = progress_record.id
        RETURNING current_count INTO progress_record.current_count;
        
        -- Check if completed
        completed := progress_record.current_count >= challenge_record.target_count;
        
        IF completed THEN
            -- Mark as completed
            UPDATE public.user_challenge_progress
            SET completed_at = now()
            WHERE id = progress_record.id;
            
            -- Award points
            PERFORM public.add_user_points(_user_id, challenge_record.points_reward, 'challenge_complete', 'challenge', challenge_record.id);
            
            -- Award badge if specified
            IF challenge_record.badge_reward IS NOT NULL THEN
                PERFORM public.award_badge(_user_id, challenge_record.badge_reward);
            END IF;
        END IF;
        
        result := result || jsonb_build_object(
            'challenge_id', challenge_record.id,
            'title', challenge_record.title,
            'current', progress_record.current_count,
            'target', challenge_record.target_count,
            'completed', completed
        );
    END LOOP;
    
    RETURN result;
END;
$$;

-- Trigger to create streak and preferences on new user
CREATE OR REPLACE FUNCTION public.handle_new_user_extras()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Create streak record
    INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, last_activity_date)
    VALUES (NEW.id, 1, 1, CURRENT_DATE);
    
    -- Create preferences record
    INSERT INTO public.user_preferences (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$;

-- Attach trigger (if not exists)
DROP TRIGGER IF EXISTS on_auth_user_created_extras ON auth.users;
CREATE TRIGGER on_auth_user_created_extras
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_extras();

-- Insert some initial weekly challenges
INSERT INTO public.weekly_challenges (title, description, challenge_type, target_count, points_reward, icon_emoji, start_date, end_date) VALUES
('Maratón de Clases', 'Ve 3 clases esta semana', 'view_classes', 3, 50, '🎬', CURRENT_DATE, CURRENT_DATE + 7),
('Contribuidor Activo', 'Comenta en 2 posts del foro', 'forum_comments', 2, 30, '💬', CURRENT_DATE, CURRENT_DATE + 7),
('Explorador de Herramientas', 'Explora 5 herramientas IA', 'use_tools', 5, 40, '🔧', CURRENT_DATE, CURRENT_DATE + 7),
('Completador Serial', 'Marca 2 clases como completadas', 'complete_classes', 2, 75, '✅', CURRENT_DATE, CURRENT_DATE + 7);

-- Enable realtime for presence features
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_streaks;