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
      const { data, error } = await (supabase as any)
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as Invitation[];
    },
    enabled: !!session,
  });

  // Invite a new user via edge function
  const inviteUser = useMutation({
    mutationFn: async ({ email, full_name, role }: InviteUserParams) => {
      const { data, error } = await supabase.functions.invoke('invite-user', {
        body: {
          email,
          full_name: full_name || null,
          role: role || 'participant',
        },
      });

      if (error) throw new Error(error.message || 'Error al enviar invitación');
      if (data?.error) throw new Error(data.error);

      return data;
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
