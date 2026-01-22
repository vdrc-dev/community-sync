import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Prompt {
  id: string;
  title: string;
  prompt_text: string;
  description: string | null;
  tool_id: string | null;
  category: string | null;
  tags: string[];
  copy_count: number;
  created_by: string | null;
  is_public: boolean;
  is_featured: boolean;
  created_at: string;
  tools?: {
    id: string;
    name: string;
    icon_emoji: string | null;
  } | null;
}

interface SavedPrompt {
  id: string;
  user_id: string;
  prompt_id: string;
  created_at: string;
}

export function usePrompts(category?: string, toolId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all public prompts
  const { data: prompts, isLoading } = useQuery({
    queryKey: ['prompts', category, toolId],
    queryFn: async () => {
      let query = supabase
        .from('prompt_library')
        .select(`
          *,
          tools:tool_id (
            id,
            name,
            icon_emoji
          )
        `)
        .eq('is_public', true)
        .order('copy_count', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      if (toolId) {
        query = query.eq('tool_id', toolId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as Prompt[];
    },
  });

  // Fetch user's saved prompts
  const { data: savedPrompts } = useQuery({
    queryKey: ['saved-prompts', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_saved_prompts')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return (data || []) as SavedPrompt[];
    },
    enabled: !!user?.id,
  });

  // Fetch user's own prompts
  const { data: myPrompts } = useQuery({
    queryKey: ['my-prompts', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('prompt_library')
        .select(`
          *,
          tools:tool_id (
            id,
            name,
            icon_emoji
          )
        `)
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []) as Prompt[];
    },
    enabled: !!user?.id,
  });

  // Check if prompt is saved
  const isPromptSaved = (promptId: string): boolean => {
    return savedPrompts?.some(sp => sp.prompt_id === promptId) ?? false;
  };

  // Copy prompt and increment counter
  const copyPromptMutation = useMutation({
    mutationFn: async (prompt: Prompt) => {
      await navigator.clipboard.writeText(prompt.prompt_text);
      
      // Increment copy count
      await supabase.rpc('increment_prompt_copy', { _prompt_id: prompt.id });
      
      return prompt;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast.success('Prompt copiado al portapapeles');
    },
    onError: () => {
      toast.error('Error al copiar');
    },
  });

  // Save/unsave prompt
  const toggleSavePromptMutation = useMutation({
    mutationFn: async (promptId: string) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const isSaved = isPromptSaved(promptId);
      
      if (isSaved) {
        const { error } = await supabase
          .from('user_saved_prompts')
          .delete()
          .eq('user_id', user.id)
          .eq('prompt_id', promptId);
        
        if (error) throw error;
        return { action: 'removed' };
      } else {
        const { error } = await supabase
          .from('user_saved_prompts')
          .insert({
            user_id: user.id,
            prompt_id: promptId,
          });
        
        if (error) throw error;
        return { action: 'added' };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['saved-prompts', user?.id] });
      toast.success(result.action === 'added' ? 'Prompt guardado' : 'Prompt eliminado de guardados');
    },
    onError: () => {
      toast.error('Error');
    },
  });

  // Create new prompt
  const createPromptMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      prompt_text: string;
      description?: string;
      tool_id?: string;
      category?: string;
      tags?: string[];
      is_public?: boolean;
    }) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('prompt_library')
        .insert({
          ...data,
          created_by: user.id,
          is_public: data.is_public ?? false,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      queryClient.invalidateQueries({ queryKey: ['my-prompts', user?.id] });
      toast.success('Prompt creado');
    },
    onError: () => {
      toast.error('Error al crear prompt');
    },
  });

  // Get unique categories
  const categories = [...new Set(prompts?.map(p => p.category).filter(Boolean) || [])];

  return {
    prompts,
    savedPrompts,
    myPrompts,
    isLoading,
    isPromptSaved,
    copyPrompt: copyPromptMutation.mutate,
    toggleSavePrompt: toggleSavePromptMutation.mutate,
    createPrompt: createPromptMutation.mutate,
    categories,
  };
}
