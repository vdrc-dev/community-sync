import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface UserPoints {
  id: string;
  user_id: string;
  points: number;
  level: number;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_type: string;
  earned_at: string;
}

export interface LeaderboardEntry extends UserPoints {
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export const LEVEL_NAMES = ['Novato', 'Explorador', 'Pro', 'Master', 'Leyenda'];
export const LEVEL_THRESHOLDS = [0, 50, 200, 500, 1000];
export const LEVEL_COLORS = [
  'text-muted-foreground',
  'text-blue-400',
  'text-purple-400',
  'text-yellow-400',
  'text-primary'
];

export const BADGES = {
  newcomer: { name: 'Bienvenido', icon: '👋', description: 'Te uniste al taller' },
  first_class: { name: 'Primera Clase', icon: '🎬', description: 'Viste tu primera grabación' },
  contributor: { name: 'Contribuidor', icon: '✍️', description: 'Creaste 5 posts en el foro' },
  mentor: { name: 'Mentor', icon: '🌟', description: 'Recibiste 10 likes en respuestas' },
  collector: { name: 'Coleccionista', icon: '📚', description: 'Guardaste 20 herramientas' },
  veteran: { name: 'Veterano', icon: '🏆', description: 'Completaste una generación' },
  daily_streak: { name: 'Constante', icon: '🔥', description: '7 días seguidos activo' },
  explorer: { name: 'Explorador', icon: '🧭', description: 'Visitaste todas las secciones' },
};

export const POINTS_CONFIG = {
  view_class: 5,
  complete_class: 20,
  create_post: 10,
  create_comment: 5,
  daily_login: 2,
  rsvp_event: 3,
  favorite_tool: 1,
};

export function useGamification() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: userPoints, isLoading: pointsLoading } = useQuery({
    queryKey: ['user-points', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as UserPoints | null;
    },
    enabled: !!user,
  });

  const { data: userBadges, isLoading: badgesLoading } = useQuery({
    queryKey: ['user-badges', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });
      
      if (error) throw error;
      return data as UserBadge[];
    },
    enabled: !!user,
  });

  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      // Get points
      const { data: pointsData, error } = await supabase
        .from('user_points')
        .select('*')
        .order('points', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      
      // Get profiles for these users
      const userIds = pointsData?.map(p => p.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', userIds);
      
      // Merge data
      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      
      return (pointsData || []).map(point => ({
        ...point,
        profile: profileMap.get(point.user_id) || undefined,
      })) as LeaderboardEntry[];
    },
  });

  const addPoints = useMutation({
    mutationFn: async ({ 
      points, 
      action, 
      resourceType, 
      resourceId 
    }: { 
      points: number; 
      action: string; 
      resourceType?: string; 
      resourceId?: string; 
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      const { error } = await supabase.rpc('add_user_points', {
        _user_id: user.id,
        _points: points,
        _action: action,
        _resource_type: resourceType || null,
        _resource_id: resourceId || null,
      });
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-points'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      toast.success(`+${variables.points} puntos`, {
        description: 'Sigue participando para subir de nivel',
        duration: 2000,
      });
    },
  });

  const awardBadge = useMutation({
    mutationFn: async (badgeType: string) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase.rpc('award_badge', {
        _user_id: user.id,
        _badge_type: badgeType,
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (awarded, badgeType) => {
      if (awarded) {
        queryClient.invalidateQueries({ queryKey: ['user-badges'] });
        const badge = BADGES[badgeType as keyof typeof BADGES];
        if (badge) {
          toast.success(`🏆 Nuevo badge: ${badge.name}`, {
            description: badge.description,
            duration: 5000,
          });
        }
      }
    },
  });

  const getLevelProgress = () => {
    if (!userPoints) return { current: 0, next: LEVEL_THRESHOLDS[1], percentage: 0 };
    
    const currentLevel = userPoints.level;
    const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1] || 0;
    const nextThreshold = LEVEL_THRESHOLDS[currentLevel] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    
    const progress = userPoints.points - currentThreshold;
    const needed = nextThreshold - currentThreshold;
    const percentage = Math.min((progress / needed) * 100, 100);
    
    return { current: userPoints.points, next: nextThreshold, percentage };
  };

  return {
    userPoints,
    userBadges,
    leaderboard,
    isLoading: pointsLoading || badgesLoading,
    leaderboardLoading,
    addPoints: addPoints.mutate,
    awardBadge: awardBadge.mutate,
    getLevelProgress,
    LEVEL_NAMES,
    LEVEL_COLORS,
    BADGES,
    POINTS_CONFIG,
  };
}
