import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface AdminUser {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  generation_code: string | null;
  email: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  roles: string[];
}

async function adminAction(action: string, params: Record<string, unknown> = {}) {
  const { data, error } = await supabase.functions.invoke('admin-users', {
    body: { action, ...params },
  });
  if (error) {
    let msg = error.message;
    try {
      const ctx = (error as any)?.context;
      if (ctx?.json) {
        const body = await ctx.json();
        if (body?.error) msg = body.error;
      }
    } catch {}
    throw new Error(msg);
  }
  if (data?.error) throw new Error(data.error);
  return data;
}

export function useAdminUsers() {
  const { isAdmin, session } = useAuth();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const result = await adminAction('list');
      return (result.users || []) as AdminUser[];
    },
    enabled: !!session && isAdmin,
  });

  const updateProfile = useMutation({
    mutationFn: (params: { user_id: string; full_name: string; generation_code?: string }) =>
      adminAction('update_profile', params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const setRole = useMutation({
    mutationFn: (params: { user_id: string; role: string }) =>
      adminAction('set_role', params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const deleteUser = useMutation({
    mutationFn: (params: { user_id: string }) =>
      adminAction('delete_user', params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  return {
    users,
    isLoading,
    refetch,
    updateProfile: updateProfile.mutateAsync,
    setRole: setRole.mutateAsync,
    deleteUser: deleteUser.mutateAsync,
    isUpdating: updateProfile.isPending,
    isDeleting: deleteUser.isPending,
  };
}
