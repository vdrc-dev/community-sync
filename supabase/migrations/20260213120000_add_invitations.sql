-- =============================================
-- INVITATIONS: Admin invite system
-- =============================================

-- Invitations table
CREATE TABLE public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    role public.app_role NOT NULL DEFAULT 'participant',
    full_name TEXT,
    invited_by UUID REFERENCES auth.users(id),
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    accepted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Only admins can manage invitations
CREATE POLICY "Admins can view all invitations"
    ON public.invitations FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create invitations"
    ON public.invitations FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update invitations"
    ON public.invitations FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

-- Update handle_new_user to check for invited_role metadata and mark invitation as accepted
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    _invited_role TEXT;
BEGIN
    -- Create profile
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    
    -- Check if user was invited with a specific role
    _invited_role := NEW.raw_user_meta_data->>'invited_role';
    
    -- Always assign participant role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'participant');
    
    -- If invited as admin, also assign admin role
    IF _invited_role = 'admin' THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    -- Mark invitation as accepted
    UPDATE public.invitations
    SET status = 'accepted', accepted_at = now()
    WHERE email = NEW.email AND status = 'pending';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
