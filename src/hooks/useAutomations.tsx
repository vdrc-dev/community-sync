import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Automation {
  id: string;
  user_id: string;
  task_name: string;
  category: string | null;
  time_before_minutes: number;
  time_after_minutes: number;
  frequency_per_week: number;
  hourly_rate: number;
  tool_used: string | null;
  created_at: string;
  updated_at: string;
}

export interface AutomationInsert {
  task_name: string;
  category?: string;
  time_before_minutes: number;
  time_after_minutes: number;
  frequency_per_week: number;
  hourly_rate?: number;
  tool_used?: string;
}

export interface ROISummary {
  total_automations: number;
  weekly_minutes_saved: number;
  monthly_minutes_saved: number;
  yearly_minutes_saved: number;
  weekly_value_saved: number;
  monthly_value_saved: number;
  yearly_value_saved: number;
}

export function useAutomations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: automations, isLoading } = useQuery({
    queryKey: ['automations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_automations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Automation[];
    },
    enabled: !!user,
  });

  const { data: roiSummary } = useQuery({
    queryKey: ['roi-summary', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .rpc('calculate_user_roi', { _user_id: user.id });
      
      if (error) throw error;
      return data as unknown as ROISummary;
    },
    enabled: !!user,
  });

  const addAutomation = useMutation({
    mutationFn: async (automation: AutomationInsert) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('user_automations')
        .insert({
          ...automation,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
      queryClient.invalidateQueries({ queryKey: ['roi-summary'] });
      toast.success('¡Automatización registrada!');
    },
    onError: (error) => {
      toast.error('Error al guardar la automatización');
      console.error(error);
    },
  });

  const deleteAutomation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('user_automations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
      queryClient.invalidateQueries({ queryKey: ['roi-summary'] });
      toast.success('Automatización eliminada');
    },
  });

  // Calculate ROI for a single automation
  const calculateROI = (automation: AutomationInsert) => {
    const minutesSaved = (automation.time_before_minutes - automation.time_after_minutes) * automation.frequency_per_week;
    const hourlyRate = automation.hourly_rate || 25;
    
    return {
      weeklyMinutes: minutesSaved,
      monthlyMinutes: minutesSaved * 4,
      yearlyMinutes: minutesSaved * 52,
      weeklyValue: (minutesSaved * hourlyRate) / 60,
      monthlyValue: (minutesSaved * 4 * hourlyRate) / 60,
      yearlyValue: (minutesSaved * 52 * hourlyRate) / 60,
      percentageReduction: Math.round(((automation.time_before_minutes - automation.time_after_minutes) / automation.time_before_minutes) * 100),
    };
  };

  return {
    automations,
    roiSummary,
    isLoading,
    addAutomation,
    deleteAutomation,
    calculateROI,
  };
}
