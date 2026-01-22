import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Note {
  id: string;
  user_id: string;
  class_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function useNotes(classId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  // Fetch note for a specific class
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', classId, user?.id],
    queryFn: async () => {
      if (!classId || !user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('class_id', classId)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Note | null;
    },
    enabled: !!classId && !!user?.id,
  });

  // Fetch all notes for a user
  const { data: allNotes } = useQuery({
    queryKey: ['all-notes', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_notes')
        .select(`
          *,
          classes:class_id (
            id,
            title,
            class_number,
            generation_id
          )
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Save/update note with debounce-friendly approach
  const saveNote = useCallback(async (content: string) => {
    if (!classId || !user?.id) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('user_notes')
        .upsert({
          user_id: user.id,
          class_id: classId,
          content,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,class_id',
        });
      
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['note', classId, user.id] });
      queryClient.invalidateQueries({ queryKey: ['all-notes', user.id] });
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Error al guardar nota');
    } finally {
      setIsSaving(false);
    }
  }, [classId, user?.id, queryClient]);

  // Delete note
  const deleteNoteMutation = useMutation({
    mutationFn: async () => {
      if (!classId || !user?.id) throw new Error('No class or user');
      
      const { error } = await supabase
        .from('user_notes')
        .delete()
        .eq('class_id', classId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note', classId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['all-notes', user?.id] });
      toast.success('Nota eliminada');
    },
    onError: () => {
      toast.error('Error al eliminar nota');
    },
  });

  return {
    note,
    allNotes,
    isLoading,
    isSaving,
    saveNote,
    deleteNote: deleteNoteMutation.mutate,
  };
}
