import { useQuery, useQueryClient, QueryKey } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

interface OptimizedQueryOptions<T> {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
  enabled?: boolean;
  staleTime?: number;
  prefetchKeys?: QueryKey[];
}

/**
 * Optimized query hook with prefetching and cache management
 */
export function useOptimizedQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 1000 * 60 * 5,
  prefetchKeys = [],
}: OptimizedQueryOptions<T>) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime,
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  });

  // Prefetch related queries
  useEffect(() => {
    if (query.isSuccess && prefetchKeys.length > 0) {
      prefetchKeys.forEach((key) => {
        queryClient.prefetchQuery({ queryKey: key, queryFn });
      });
    }
  }, [query.isSuccess, prefetchKeys, queryClient, queryFn]);

  return query;
}

/**
 * Hook for prefetching data on hover/focus
 */
export function usePrefetch<T>(queryKey: QueryKey, queryFn: () => Promise<T>) {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 1000 * 60 * 5,
    });
  }, [queryClient, queryKey, queryFn]);
}

/**
 * Hook for batch invalidation
 */
export function useBatchInvalidate() {
  const queryClient = useQueryClient();

  return useCallback((keys: QueryKey[]) => {
    keys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  }, [queryClient]);
}
