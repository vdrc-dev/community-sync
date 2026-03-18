import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type ActivityResourceType = 'class' | 'tool' | 'post' | 'generation';

interface ActivityItem {
  id: string;
  user_id: string;
  resource_type: ActivityResourceType;
  resource_id: string;
  resource_title: string | null;
  resource_meta: Record<string, unknown>;
  last_accessed_at: string;
}

export function useActivityResume() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch recent activity
  const { data: recentActivity, isLoading } = useQuery({
    queryKey: ['activity-resume', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_activity_resume')
        .select('*')
        .eq('user_id', user.id)
        .order('last_accessed_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return (data || []) as ActivityItem[];
    },
    enabled: !!user?.id,
  });

  // Track activity
  const trackActivityMutation = useMutation({
    mutationFn: async ({
      resourceType,
      resourceId,
      resourceTitle,
      resourceMeta,
    }: {
      resourceType: ActivityResourceType;
      resourceId: string;
      resourceTitle: string;
      resourceMeta?: Record<string, unknown>;
    }) => {
      if (!user?.id) return;
      
      await (supabase.rpc as unknown as (fn: string, args: Record<string, unknown>) => Promise<unknown>)('track_activity', {
        p_user_id: user.id,
        p_resource_type: resourceType,
        p_resource_id: resourceId,
        p_resource_title: resourceTitle,
        p_resource_meta: (resourceMeta || {}) as unknown,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-resume', user?.id] });
    },
  });

  // Get last activity of a specific type
  const getLastActivity = (type: ActivityResourceType): ActivityItem | undefined => {
    return recentActivity?.find(a => a.resource_type === type);
  };

  // Get most recent activity
  const mostRecentActivity = recentActivity?.[0];

  return {
    recentActivity,
    isLoading,
    trackActivity: trackActivityMutation.mutate,
    getLastActivity,
    mostRecentActivity,
  };
}
