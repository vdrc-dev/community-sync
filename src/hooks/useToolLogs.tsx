import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export type ToolStatus = 'wishlist' | 'tried' | 'frequent' | 'discarded';

export interface ToolLog {
  id: string;
  user_id: string;
  tool_id: string;
  status: ToolStatus;
  rating: number | null;
  notes: string | null;
  first_tried_at: string;
  updated_at: string;
}

export interface ToolLogWithTool extends ToolLog {
  tools: {
    id: string;
    name: string;
    icon_emoji: string | null;
    category: string | null;
    url: string | null;
  };
}

export function useToolLogs() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: toolLogs, isLoading } = useQuery({
    queryKey: ['tool-logs', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_tool_logs')
        .select(`
          *,
          tools (id, name, icon_emoji, category, url)
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as ToolLogWithTool[];
    },
    enabled: !!user,
  });

  const { data: toolLogMap } = useQuery({
    queryKey: ['tool-log-map', user?.id],
    queryFn: async () => {
      if (!user) return new Map<string, ToolLog>();
      const { data, error } = await supabase
        .from('user_tool_logs')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return new Map((data as ToolLog[]).map(log => [log.tool_id, log]));
    },
    enabled: !!user,
  });

  const updateToolLog = useMutation({
    mutationFn: async ({ 
      toolId, 
      status, 
      rating, 
      notes 
    }: { 
      toolId: string; 
      status: ToolStatus; 
      rating?: number; 
      notes?: string;
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('user_tool_logs')
        .upsert({
          user_id: user.id,
          tool_id: toolId,
          status,
          rating,
          notes,
        }, {
          onConflict: 'user_id,tool_id',
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tool-logs'] });
      queryClient.invalidateQueries({ queryKey: ['tool-log-map'] });
      toast.success('¡Estado actualizado!');
    },
    onError: (error) => {
      toast.error('Error al actualizar');
      console.error(error);
    },
  });

  const removeToolLog = useMutation({
    mutationFn: async (toolId: string) => {
      if (!user) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('user_tool_logs')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tool-logs'] });
      queryClient.invalidateQueries({ queryKey: ['tool-log-map'] });
    },
  });

  const getToolLog = (toolId: string) => toolLogMap?.get(toolId);

  const stats = {
    total: toolLogs?.length || 0,
    tried: toolLogs?.filter(l => l.status === 'tried').length || 0,
    frequent: toolLogs?.filter(l => l.status === 'frequent').length || 0,
    discarded: toolLogs?.filter(l => l.status === 'discarded').length || 0,
    wishlist: toolLogs?.filter(l => l.status === 'wishlist').length || 0,
  };

  return {
    toolLogs,
    toolLogMap,
    isLoading,
    updateToolLog,
    removeToolLog,
    getToolLog,
    stats,
  };
}
