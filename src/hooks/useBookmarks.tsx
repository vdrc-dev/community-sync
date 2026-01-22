import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export type ResourceType = 'class' | 'tool' | 'post' | 'prompt';

interface Bookmark {
  id: string;
  user_id: string;
  resource_type: ResourceType;
  resource_id: string;
  note: string | null;
  tags: string[];
  created_at: string;
}

export function useBookmarks(resourceType?: ResourceType) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all bookmarks or filtered by type
  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ['bookmarks', user?.id, resourceType],
    queryFn: async () => {
      if (!user?.id) return [];
      
      let query = supabase
        .from('user_bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (resourceType) {
        query = query.eq('resource_type', resourceType);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as Bookmark[];
    },
    enabled: !!user?.id,
  });

  // Check if a specific resource is bookmarked
  const isBookmarked = (type: ResourceType, resourceId: string): boolean => {
    return bookmarks?.some(b => b.resource_type === type && b.resource_id === resourceId) ?? false;
  };

  // Get bookmark for a specific resource
  const getBookmark = (type: ResourceType, resourceId: string): Bookmark | undefined => {
    return bookmarks?.find(b => b.resource_type === type && b.resource_id === resourceId);
  };

  // Toggle bookmark
  const toggleBookmarkMutation = useMutation({
    mutationFn: async ({ 
      type, 
      resourceId, 
      note, 
      tags 
    }: { 
      type: ResourceType; 
      resourceId: string; 
      note?: string; 
      tags?: string[] 
    }) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const existing = getBookmark(type, resourceId);
      
      if (existing) {
        // Remove bookmark
        const { error } = await supabase
          .from('user_bookmarks')
          .delete()
          .eq('id', existing.id);
        
        if (error) throw error;
        return { action: 'removed' };
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('user_bookmarks')
          .insert({
            user_id: user.id,
            resource_type: type,
            resource_id: resourceId,
            note: note || null,
            tags: tags || [],
          });
        
        if (error) throw error;
        return { action: 'added' };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', user?.id] });
      toast.success(result.action === 'added' ? 'Guardado en favoritos' : 'Eliminado de favoritos');
    },
    onError: () => {
      toast.error('Error al actualizar favoritos');
    },
  });

  // Update bookmark (note/tags)
  const updateBookmarkMutation = useMutation({
    mutationFn: async ({ 
      bookmarkId, 
      note, 
      tags 
    }: { 
      bookmarkId: string; 
      note?: string; 
      tags?: string[] 
    }) => {
      const updates: Record<string, unknown> = {};
      if (note !== undefined) updates.note = note;
      if (tags !== undefined) updates.tags = tags;
      
      const { error } = await supabase
        .from('user_bookmarks')
        .update(updates)
        .eq('id', bookmarkId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', user?.id] });
      toast.success('Favorito actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar');
    },
  });

  // Get all unique tags
  const allTags = [...new Set(bookmarks?.flatMap(b => b.tags) || [])];

  return {
    bookmarks,
    isLoading,
    isBookmarked,
    getBookmark,
    toggleBookmark: toggleBookmarkMutation.mutate,
    updateBookmark: updateBookmarkMutation.mutate,
    allTags,
  };
}
