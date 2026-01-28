import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import type { Slide } from '@/types/presentation';
import type { Json } from '@/integrations/supabase/types';

export type PresentationStatus = 'draft' | 'review' | 'approved' | 'published';

export interface Presentation {
  id: string;
  class_id: string;
  status: PresentationStatus;
  outline: string;
  key_points: string[];
  talking_points: Record<string, string>[];
  resources_needed: string[];
  duration_estimate: number;
  assigned_to: string | null;
  review_notes: string;
  slides: Slide[];
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface PresentationWithClass extends Presentation {
  classes: {
    id: string;
    title: string;
    class_number: number;
    class_date: string | null;
    generation_id: string;
    generations?: {
      id: string;
      name: string;
      code: string;
    };
  };
}

export function usePresentations() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all presentations with class info
  const { data: presentations, isLoading, error, refetch } = useQuery({
    queryKey: ['presentations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('class_presentations')
        .select(`
          *,
          classes (
            id,
            title,
            class_number,
            class_date,
            generation_id,
            generations (
              id,
              name,
              code
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as PresentationWithClass[];
    },
    enabled: isAdmin,
  });

  // Fetch single presentation by class_id
  const fetchPresentationByClassId = useCallback(async (classId: string) => {
    const { data, error } = await supabase
      .from('class_presentations')
      .select('*')
      .eq('class_id', classId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as Presentation | null;
  }, []);

  // Create presentation
  const createMutation = useMutation({
    mutationFn: async (classId: string) => {
      const { data, error } = await supabase
        .from('class_presentations')
        .insert({
          class_id: classId,
          created_by: user?.id,
          status: 'draft',
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Presentation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      toast({
        title: 'Presentación creada',
        description: 'Se ha creado un nuevo borrador de presentación.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update presentation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Presentation> }) => {
      // Convert slides to Json type for Supabase
      const updateData = { ...data } as Record<string, any>;
      if (data.slides) {
        updateData.slides = data.slides as unknown as Json;
      }
      
      const { data: updated, error } = await supabase
        .from('class_presentations')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated as unknown as Presentation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error al guardar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update status with toast
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: PresentationStatus }) => {
      const { data, error } = await supabase
        .from('class_presentations')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Presentation;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      const statusMessages: Record<PresentationStatus, string> = {
        draft: 'Movido a borrador',
        review: 'Enviado a revisión',
        approved: 'Presentación aprobada',
        published: 'Presentación publicada',
      };
      toast({
        title: statusMessages[data.status as PresentationStatus],
        description: 'El estado se ha actualizado correctamente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete presentation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('class_presentations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      toast({
        title: 'Presentación eliminada',
        description: 'La presentación ha sido eliminada.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    presentations,
    isLoading,
    error,
    refetch,
    fetchPresentationByClassId,
    createPresentation: createMutation.mutateAsync,
    updatePresentation: updateMutation.mutate,
    updatePresentationAsync: updateMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutate,
    deletePresentation: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
