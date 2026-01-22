import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Prefetch configuration for routes
const ROUTE_PREFETCH_MAP: Record<string, string[]> = {
  '/': ['generations', 'tools'],
  '/generations': ['classes'],
  '/tools': ['tool_votes', 'user_tool_logs'],
  '/prompts': ['prompt_library'],
  '/workflows': ['automation_workflows'],
  '/forum': ['forum_categories', 'forum_posts'],
  '/leaderboard': ['user_points', 'profiles'],
};

/**
 * Prefetches data for likely next navigation targets
 */
export function usePrefetcher() {
  const queryClient = useQueryClient();
  const location = useLocation();

  const prefetchTable = useCallback(async (table: string) => {
    const queryKey = [table];
    
    // Skip if already cached and fresh
    const existingData = queryClient.getQueryData(queryKey);
    if (existingData) return;

    await queryClient.prefetchQuery({
      queryKey,
      queryFn: async () => {
        const { data } = await supabase
          .from(table as any)
          .select('*')
          .limit(50);
        return data;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  }, [queryClient]);

  // Prefetch data for current route
  useEffect(() => {
    const tablesToPrefetch = ROUTE_PREFETCH_MAP[location.pathname];
    if (tablesToPrefetch) {
      tablesToPrefetch.forEach(prefetchTable);
    }
  }, [location.pathname, prefetchTable]);

  // Expose manual prefetch for link hover
  const prefetchRoute = useCallback((route: string) => {
    const tablesToPrefetch = ROUTE_PREFETCH_MAP[route];
    if (tablesToPrefetch) {
      tablesToPrefetch.forEach(prefetchTable);
    }
  }, [prefetchTable]);

  return { prefetchRoute };
}

/**
 * Link component with prefetch on hover
 */
export function useLinkPrefetch(to: string) {
  const { prefetchRoute } = usePrefetcher();

  return {
    onMouseEnter: () => prefetchRoute(to),
    onFocus: () => prefetchRoute(to),
  };
}
