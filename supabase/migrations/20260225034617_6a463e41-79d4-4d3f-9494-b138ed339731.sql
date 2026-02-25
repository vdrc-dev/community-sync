
-- Table for allowed emails (whitelist)
CREATE TABLE public.allowed_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  generation_code text DEFAULT 'GEN-010',
  added_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.allowed_emails ENABLE ROW LEVEL SECURITY;

-- Admins can manage
CREATE POLICY "Admins can manage allowed emails"
  ON public.allowed_emails FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can check if their email is allowed (needed for signup check)
CREATE POLICY "Anyone can check allowed emails"
  ON public.allowed_emails FOR SELECT
  USING (true);

-- Function to check if email is allowed
CREATE OR REPLACE FUNCTION public.is_email_allowed(check_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.allowed_emails
    WHERE lower(email) = lower(check_email)
  )
$$;

-- Seed Gen 10 emails
INSERT INTO public.allowed_emails (email, generation_code) VALUES
  ('brodriguez@ra4.cl', 'GEN-010'),
  ('catalina@vdrc.cl', 'GEN-010'),
  ('crisso@gimax.cl', 'GEN-010'),
  ('dmezastange@gmail.com', 'GEN-010'),
  ('jaime.a.loayza@gmail.com', 'GEN-010'),
  ('jmpellegrinim@gmail.com', 'GEN-010'),
  ('jose.pellegrini@btgpactual.com', 'GEN-010'),
  ('nicolasnazarc@gmail.com', 'GEN-010'),
  ('pablo@dulceriafrutillar.cl', 'GEN-010'),
  ('romina@vdrc.cl', 'GEN-010'),
  ('vicente@vdrc.cl', 'GEN-010'),
  ('vvillalobos@constructorawellness.cl', 'GEN-010');
