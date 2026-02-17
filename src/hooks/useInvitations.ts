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
  const { session, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all invitations (only for admins — RLS blocks non-admins)
  const {
    data: invitations = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['invitations', isAdmin],
    queryFn: async () => {
      // Ensure we have a fresh session token
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession) return [] as Invitation[];

      const { data, error } = await (supabase as any)
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching invitations:', error.message);
        // Return empty on permission errors instead of crashing
        if (error.message?.includes('permission') || error.code === '42501' || error.code === 'PGRST301') {
          return [] as Invitation[];
        }
        throw error;
      }
      return (data ?? []) as Invitation[];
    },
    enabled: !!session && isAdmin,
    retry: 1,
    retryDelay: 1000,
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

      if (error) {
        // Try to extract the actual error message from the response
        let message = error.message || 'Error al enviar invitación';
        try {
          const context = (error as any)?.context;
          if (context && typeof context.json === 'function') {
            const body = await context.json();
            if (body?.error) message = body.error;
          }
        } catch {}
        throw new Error(message);
      }
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
    refetch,
    inviteUser: inviteUser.mutateAsync,
    isInviting: inviteUser.isPending,
    inviteError: inviteUser.error,
  };
}
