import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useGamification, POINTS_CONFIG } from './useGamification';
import confetti from 'canvas-confetti';

export interface UserProgress {
  id: string;
  user_id: string;
  class_id: string;
  completed_at: string;
}

export function useProgress() {
  const { user } = useAuth();
  const { addPoints, awardBadge } = useGamification();
  const queryClient = useQueryClient();

  const { data: completedClasses, isLoading } = useQuery({
    queryKey: ['user-progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserProgress[];
    },
    enabled: !!user,
  });

  const markClassComplete = useMutation({
    mutationFn: async (classId: string) => {
      if (!user) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('user_progress')
        .insert({ user_id: user.id, class_id: classId });
      
      if (error) throw error;
      return classId;
    },
    onSuccess: async (classId) => {
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
      
      // Award points
      addPoints({
        points: POINTS_CONFIG.complete_class,
        action: 'complete_class',
        resourceType: 'class',
        resourceId: classId,
      });

      // Check if this is first class completion
      const currentCompleted = completedClasses?.length || 0;
      if (currentCompleted === 0) {
        awardBadge('first_class');
      }

      // Check for generation completion (veteran badge)
      // This would need more complex logic checking if all classes in a generation are complete
    },
  });

  const unmarkClassComplete = useMutation({
    mutationFn: async (classId: string) => {
      if (!user) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('class_id', classId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    },
  });

  const isClassCompleted = (classId: string) => {
    return completedClasses?.some(c => c.class_id === classId) || false;
  };

  const getGenerationProgress = (classes: { id: string }[]) => {
    if (!classes.length) return { completed: 0, total: 0, percentage: 0 };
    
    const completed = classes.filter(c => isClassCompleted(c.id)).length;
    const percentage = (completed / classes.length) * 100;
    
    return { completed, total: classes.length, percentage };
  };

  const celebrateCompletion = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4ade80', '#22d3ee', '#f59e0b'],
    });
  };

  return {
    completedClasses,
    isLoading,
    markClassComplete: markClassComplete.mutate,
    unmarkClassComplete: unmarkClassComplete.mutate,
    isClassCompleted,
    getGenerationProgress,
    celebrateCompletion,
  };
}
