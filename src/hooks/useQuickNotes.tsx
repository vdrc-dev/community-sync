import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

interface QuickNote {
  id: string;
  user_id: string;
  content: string;
  context_type: string | null;
  context_id: string | null;
  context_url: string | null;
  tags: string[];
  is_processed: boolean;
  created_at: string;
  updated_at: string;
}

export function useQuickNotes() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();

  // Fetch all quick notes
  const { data: quickNotes, isLoading } = useQuery({
    queryKey: ['quick-notes', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('quick_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []) as QuickNote[];
    },
    enabled: !!user?.id,
  });

  // Create quick note with auto context
  const createQuickNoteMutation = useMutation({
    mutationFn: async ({ content, tags }: { content: string; tags?: string[] }) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      // Auto-detect context from current URL
      const contextUrl = location.pathname;
      let contextType: string | null = null;
      let contextId: string | null = null;
      
      // Parse URL for context
      if (contextUrl.includes('/generations/')) {
        contextType = 'generation';
        const match = contextUrl.match(/\/generations\/([^/]+)/);
        if (match) contextId = match[1];
      } else if (contextUrl.includes('/tools')) {
        contextType = 'tools';
      } else if (contextUrl.includes('/forum')) {
        contextType = 'forum';
      } else if (contextUrl.includes('/calendar')) {
        contextType = 'calendar';
      }
      
      const { data, error } = await supabase
        .from('quick_notes')
        .insert({
          user_id: user.id,
          content,
          context_type: contextType,
          context_url: contextUrl,
          tags: tags || [],
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quick-notes', user?.id] });
      toast.success('Nota guardada');
    },
    onError: () => {
      toast.error('Error al guardar nota');
    },
  });

  // Update quick note
  const updateQuickNoteMutation = useMutation({
    mutationFn: async ({ 
      id, 
      content, 
      tags, 
      isProcessed 
    }: { 
      id: string; 
      content?: string; 
      tags?: string[]; 
      isProcessed?: boolean 
    }) => {
      const updates: Record<string, unknown> = {};
      if (content !== undefined) updates.content = content;
      if (tags !== undefined) updates.tags = tags;
      if (isProcessed !== undefined) updates.is_processed = isProcessed;
      
      const { error } = await supabase
        .from('quick_notes')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quick-notes', user?.id] });
    },
    onError: () => {
      toast.error('Error al actualizar nota');
    },
  });

  // Delete quick note
  const deleteQuickNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('quick_notes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quick-notes', user?.id] });
      toast.success('Nota eliminada');
    },
    onError: () => {
      toast.error('Error al eliminar');
    },
  });

  const unprocessedCount = quickNotes?.filter(n => !n.is_processed).length ?? 0;

  return {
    quickNotes,
    isLoading,
    unprocessedCount,
    createQuickNote: createQuickNoteMutation.mutate,
    updateQuickNote: updateQuickNoteMutation.mutate,
    deleteQuickNote: deleteQuickNoteMutation.mutate,
    isCreating: createQuickNoteMutation.isPending,
  };
}
