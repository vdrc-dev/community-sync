
-- Add unique constraint on email for upsert support
ALTER TABLE public.invitations ADD CONSTRAINT invitations_email_unique UNIQUE (email);
