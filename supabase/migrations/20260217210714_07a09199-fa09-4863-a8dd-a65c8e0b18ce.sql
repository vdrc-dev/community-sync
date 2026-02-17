
-- Create trigger to auto-update invitation status when a user signs up
CREATE OR REPLACE FUNCTION public.handle_invitation_accepted()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.invitations
  SET status = 'accepted', accepted_at = now()
  WHERE email = NEW.email AND status = 'pending';
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_update_invitation
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_invitation_accepted();
