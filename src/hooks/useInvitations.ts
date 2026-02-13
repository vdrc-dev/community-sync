import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Invitation {
  id: string;
  email: string;
  role: 'admin' | 'participant';
  full_name: string | null;
  invited_by: string | null;
  status: string;
  created_at: string;
  accepted_at: string | null;
}

export interface InviteUserParams {
  email: string;
  full_name?: string;
  role?: 'admin' | 'participant';
}

export function useInvitations() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all invitations
  const {
    data: invitations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['invitations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Invitation[];
    },
    enabled: !!session,
  });

  // Invite a new user via edge function
  const inviteUser = useMutation({
    mutationFn: async ({ email, full_name, role }: InviteUserParams) => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) throw new Error('No hay sesión activa');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/invite-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentSession.access_token}`,
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            email,
            full_name: full_name || null,
            role: role || 'participant',
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar invitación');
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });

  return {
    invitations,
    isLoading,
    error,
    inviteUser: inviteUser.mutateAsync,
    isInviting: inviteUser.isPending,
    inviteError: inviteUser.error,
  };
}
