-- =============================================
-- ACCESS CONTROL: Invitation-only system
-- =============================================

-- 1. Cleanup ghost profiles (users with null full_name)
DELETE FROM public.profiles
WHERE full_name IS NULL
  AND id IN (
    'd408426e-021b-4f82-8853-1acf36361fb5',
    '3e532f7f-ee58-4122-9fe1-c5a4d61a4ac9',
    '5af7cb45-f4d0-4827-aeb9-016a80df05b7'
  );

-- 2. Create access_requests table
CREATE TABLE IF NOT EXISTS public.access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);

ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Only admins can view all requests
CREATE POLICY "Admins can view access requests"
  ON public.access_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update requests (approve/reject)
CREATE POLICY "Admins can update access requests"
  ON public.access_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. RPC function: check if an email has a pending invitation (safe for anonymous callers)
CREATE OR REPLACE FUNCTION public.check_invitation_status(check_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.invitations
    WHERE email = check_email AND status = 'pending'
  );
$$;

GRANT EXECUTE ON FUNCTION public.check_invitation_status(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.check_invitation_status(TEXT) TO authenticated;

-- 4. RPC function to submit access requests (bypasses RLS for anonymous users)
CREATE OR REPLACE FUNCTION public.submit_access_request(
  req_email TEXT,
  req_full_name TEXT,
  req_message TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  INSERT INTO public.access_requests (email, full_name, message)
  VALUES (req_email, req_full_name, req_message)
  RETURNING to_json(access_requests.*) INTO result;

  RETURN result;
EXCEPTION
  WHEN unique_violation THEN
    RETURN json_build_object('error', 'already_requested');
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_access_request(TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.submit_access_request(TEXT, TEXT, TEXT) TO authenticated;

-- 5. Table-level grants
GRANT INSERT ON public.access_requests TO anon;
GRANT INSERT ON public.access_requests TO authenticated;
GRANT SELECT, UPDATE ON public.access_requests TO authenticated;
