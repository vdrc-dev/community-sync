import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface AccessRequest {
  id: string;
  email: string;
  full_name: string;
  message: string | null;
  status: string;
  reviewed_by: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export function useAccessRequests() {
  const { session, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: requests = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['access_requests', isAdmin],
    queryFn: async () => {
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession) return [] as AccessRequest[];

      const { data, error } = await (supabase as any)
        .from('access_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching access requests:', error.message);
        if (error.message?.includes('permission') || error.code === '42501' || error.code === 'PGRST301') {
          return [] as AccessRequest[];
        }
        throw error;
      }
      return (data ?? []) as AccessRequest[];
    },
    enabled: !!session && isAdmin,
    retry: 1,
    retryDelay: 1000,
  });

  const approveRequest = useMutation({
    mutationFn: async (request: AccessRequest) => {
      // 1. Send invitation via edge function
      const { data, error: inviteError } = await supabase.functions.invoke('invite-user', {
        body: {
          email: request.email,
          full_name: request.full_name,
          role: 'participant',
        },
      });

      if (inviteError) throw new Error(inviteError.message || 'Error al enviar invitacion');
      if (data?.error) throw new Error(data.error);

      // 2. Update request status
      const { error: updateError } = await (supabase as any)
        .from('access_requests')
        .update({
          status: 'approved',
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', request.id);

      if (updateError) throw new Error(updateError.message);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['access_requests'] });
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });

  const rejectRequest = useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await (supabase as any)
        .from('access_requests')
        .update({
          status: 'rejected',
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['access_requests'] });
    },
  });

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const reviewedRequests = requests.filter((r) => r.status !== 'pending');

  return {
    requests,
    pendingRequests,
    reviewedRequests,
    isLoading,
    error,
    refetch,
    approveRequest: approveRequest.mutateAsync,
    rejectRequest: rejectRequest.mutateAsync,
    isApproving: approveRequest.isPending,
    isRejecting: rejectRequest.isPending,
  };
}
