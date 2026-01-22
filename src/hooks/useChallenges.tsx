import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string | null;
  challenge_type: string;
  target_count: number;
  points_reward: number;
  badge_reward: string | null;
  icon_emoji: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface ChallengeProgress {
  id: string;
  user_id: string;
  challenge_id: string;
  current_count: number;
  completed_at: string | null;
}

export interface ChallengeWithProgress extends WeeklyChallenge {
  progress: ChallengeProgress | null;
}

export function useChallenges() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['weekly-challenges', user?.id],
    queryFn: async () => {
      // Get active challenges
      const { data: challengesData, error: challengesError } = await supabase
        .from('weekly_challenges')
        .select('*')
        .eq('is_active', true)
        .gte('end_date', new Date().toISOString().split('T')[0])
        .lte('start_date', new Date().toISOString().split('T')[0]);
      
      if (challengesError) throw challengesError;
      
      if (!user || !challengesData) {
        return (challengesData || []).map(c => ({ ...c, progress: null })) as ChallengeWithProgress[];
      }
      
      // Get user progress
      const { data: progressData } = await supabase
        .from('user_challenge_progress')
        .select('*')
        .eq('user_id', user.id)
        .in('challenge_id', challengesData.map(c => c.id));
      
      const progressMap = new Map(progressData?.map(p => [p.challenge_id, p]) || []);
      
      return challengesData.map(challenge => ({
        ...challenge,
        progress: progressMap.get(challenge.id) || null,
      })) as ChallengeWithProgress[];
    },
  });

  const incrementProgress = useMutation({
    mutationFn: async (challengeType: string) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase.rpc('increment_challenge_progress', {
        _user_id: user.id,
        _challenge_type: challengeType,
      });
      
      if (error) throw error;
      return data as Array<{
        challenge_id: string;
        title: string;
        current: number;
        target: number;
        completed: boolean;
      }>;
    },
    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ['weekly-challenges'] });
      queryClient.invalidateQueries({ queryKey: ['user-points'] });
      
      results.forEach(result => {
        if (result.completed) {
          // Big celebration!
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#06b6d4', '#fbbf24'],
          });
          
          toast.success(`🎯 ¡Desafío completado!`, {
            description: result.title,
            duration: 5000,
          });
        }
      });
    },
  });

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Terminado';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h restantes`;
    return `${hours}h restantes`;
  };

  const completedCount = challenges?.filter(c => c.progress?.completed_at).length || 0;
  const totalCount = challenges?.length || 0;

  return {
    challenges,
    isLoading,
    incrementProgress: incrementProgress.mutate,
    getTimeRemaining,
    completedCount,
    totalCount,
  };
}
