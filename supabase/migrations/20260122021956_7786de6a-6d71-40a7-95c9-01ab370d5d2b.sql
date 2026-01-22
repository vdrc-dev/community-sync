
-- User Points tracking for gamification
CREATE TABLE public.user_points (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    points integer NOT NULL DEFAULT 0,
    level integer NOT NULL DEFAULT 1,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- User Badges/Achievements
CREATE TABLE public.user_badges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_type text NOT NULL,
    earned_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, badge_type)
);

-- User Progress for tracking class completion
CREATE TABLE public.user_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    class_id uuid NOT NULL,
    completed_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, class_id)
);

-- Notifications system
CREATE TABLE public.notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type text NOT NULL,
    title text NOT NULL,
    message text,
    link text,
    is_read boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Event RSVPs for calendar
CREATE TABLE public.event_rsvps (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_id uuid NOT NULL,
    status text NOT NULL DEFAULT 'going',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, event_id)
);

-- Activity log for tracking all user actions
CREATE TABLE public.activity_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action text NOT NULL,
    resource_type text,
    resource_id uuid,
    points_earned integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_points
CREATE POLICY "Users can view all points (leaderboard)" ON public.user_points FOR SELECT USING (true);
CREATE POLICY "Users can insert own points" ON public.user_points FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own points" ON public.user_points FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_badges
CREATE POLICY "Users can view all badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "System can insert badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_progress
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own progress" ON public.user_progress FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for event_rsvps
CREATE POLICY "Users can view all RSVPs" ON public.event_rsvps FOR SELECT USING (true);
CREATE POLICY "Users can manage own RSVPs" ON public.event_rsvps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own RSVPs" ON public.event_rsvps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own RSVPs" ON public.event_rsvps FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for activity_log
CREATE POLICY "Users can view own activity" ON public.activity_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity" ON public.activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all activity" ON public.activity_log FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to add points and log activity
CREATE OR REPLACE FUNCTION public.add_user_points(
    _user_id uuid,
    _points integer,
    _action text,
    _resource_type text DEFAULT NULL,
    _resource_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Insert or update user points
    INSERT INTO public.user_points (user_id, points, level)
    VALUES (_user_id, _points, 1)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        points = user_points.points + _points,
        level = CASE 
            WHEN user_points.points + _points >= 1000 THEN 5
            WHEN user_points.points + _points >= 500 THEN 4
            WHEN user_points.points + _points >= 200 THEN 3
            WHEN user_points.points + _points >= 50 THEN 2
            ELSE 1
        END,
        updated_at = now();
    
    -- Log the activity
    INSERT INTO public.activity_log (user_id, action, resource_type, resource_id, points_earned)
    VALUES (_user_id, _action, _resource_type, _resource_id, _points);
END;
$$;

-- Function to award badge
CREATE OR REPLACE FUNCTION public.award_badge(_user_id uuid, _badge_type text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.user_badges (user_id, badge_type)
    VALUES (_user_id, _badge_type)
    ON CONFLICT (user_id, badge_type) DO NOTHING;
    
    RETURN FOUND;
END;
$$;

-- Function to create notification
CREATE OR REPLACE FUNCTION public.create_notification(
    _user_id uuid,
    _type text,
    _title text,
    _message text DEFAULT NULL,
    _link text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    notification_id uuid;
BEGIN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (_user_id, _type, _title, _message, _link)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$;

-- Trigger to create user_points entry when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user_points()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.user_points (user_id, points, level)
    VALUES (NEW.id, 0, 1);
    
    -- Award first badge
    INSERT INTO public.user_badges (user_id, badge_type)
    VALUES (NEW.id, 'newcomer');
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_points
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_points();

-- Create indexes for performance
CREATE INDEX idx_user_points_points ON public.user_points(points DESC);
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_activity_log_user ON public.activity_log(user_id, created_at DESC);
CREATE INDEX idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX idx_event_rsvps_event ON public.event_rsvps(event_id);
