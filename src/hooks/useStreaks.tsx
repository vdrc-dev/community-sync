import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface UserStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  streak_freezes: number;
  multiplier: number;
  created_at: string;
  updated_at: string;
}

export interface StreakUpdateResult {
  streak: number;
  multiplier: number;
  extended: boolean;
  broken: boolean;
  longest?: number;
  previous_streak?: number;
}

export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 365];

export function useStreaks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: streak, isLoading } = useQuery({
    queryKey: ['user-streak', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as UserStreak | null;
    },
    enabled: !!user,
  });

  const updateStreak = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase.rpc('update_user_streak', {
        _user_id: user.id,
      });
      
      if (error) throw error;
      return data as unknown as StreakUpdateResult;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['user-streak'] });
      
      if (result.extended) {
        // Check for milestone
        const milestone = STREAK_MILESTONES.find(m => result.streak === m);
        if (milestone) {
          toast.success(`🔥 ¡${result.streak} días seguidos!`, {
            description: `¡Increíble racha! Multiplicador: x${result.multiplier}`,
            duration: 5000,
          });
        } else if (result.streak > 1) {
          toast.success(`🔥 Racha: ${result.streak} días`, {
            description: `Multiplicador: x${result.multiplier}`,
            duration: 2000,
          });
        }
      } else if (result.broken && result.previous_streak && result.previous_streak > 3) {
        toast.error('💔 Racha perdida', {
          description: `Tu racha de ${result.previous_streak} días se reinició`,
          duration: 4000,
        });
      }
    },
  });

  const getStreakEmoji = (days: number) => {
    if (days >= 365) return '👑';
    if (days >= 100) return '💎';
    if (days >= 60) return '🏆';
    if (days >= 30) return '⚡';
    if (days >= 14) return '🔥';
    if (days >= 7) return '✨';
    if (days >= 3) return '🌟';
    return '🔥';
  };

  const getStreakColor = (days: number) => {
    if (days >= 30) return 'text-yellow-400';
    if (days >= 14) return 'text-orange-400';
    if (days >= 7) return 'text-red-400';
    return 'text-primary';
  };

  const isAtRisk = () => {
    if (!streak) return false;
    const lastDate = new Date(streak.last_activity_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 1 && streak.current_streak > 0;
  };

  return {
    streak,
    isLoading,
    updateStreak: updateStreak.mutate,
    isUpdating: updateStreak.isPending,
    getStreakEmoji,
    getStreakColor,
    isAtRisk,
    STREAK_MILESTONES,
  };
}
