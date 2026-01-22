import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  prompt: string | null;
}

export interface Workflow {
  id: string;
  title: string;
  description: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string | null;
  icon_emoji: string;
  time_to_setup_minutes: number;
  time_saved_per_use_minutes: number;
  mermaid_diagram: string | null;
  steps: WorkflowStep[];
  tools_used: string[];
  tags: string[];
  is_featured: boolean;
  created_at: string;
}

export interface UserWorkflowProgress {
  id: string;
  user_id: string;
  workflow_id: string;
  completed_steps: number[];
  notes: string | null;
  started_at: string;
  completed_at: string | null;
}

export function useWorkflows() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all published workflows
  const { data: workflows, isLoading: workflowsLoading } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automation_workflows')
        .select('*')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(w => ({
        ...w,
        steps: (w.steps as unknown as WorkflowStep[]) || [],
        tools_used: w.tools_used || [],
        tags: w.tags || [],
      })) as Workflow[];
    },
  });

  // Fetch user's progress on all workflows
  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ['workflow-progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_workflow_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return (data || []) as UserWorkflowProgress[];
    },
    enabled: !!user,
  });

  // Get progress for a specific workflow
  const getWorkflowProgress = (workflowId: string): UserWorkflowProgress | undefined => {
    return userProgress?.find(p => p.workflow_id === workflowId);
  };

  // Start a workflow
  const startWorkflow = useMutation({
    mutationFn: async (workflowId: string) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_workflow_progress')
        .insert({
          user_id: user.id,
          workflow_id: workflowId,
          completed_steps: [],
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-progress'] });
      toast.success('¡Workflow iniciado!');
    },
    onError: () => {
      toast.error('Error al iniciar el workflow');
    },
  });

  // Toggle step completion
  const toggleStep = useMutation({
    mutationFn: async ({ workflowId, stepNumber }: { workflowId: string; stepNumber: number }) => {
      if (!user) throw new Error('Not authenticated');

      const existing = userProgress?.find(p => p.workflow_id === workflowId);
      
      if (!existing) {
        // Start workflow and mark step
        const { data, error } = await supabase
          .from('user_workflow_progress')
          .insert({
            user_id: user.id,
            workflow_id: workflowId,
            completed_steps: [stepNumber],
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }

      const currentSteps = existing.completed_steps || [];
      const isCompleted = currentSteps.includes(stepNumber);
      const newSteps = isCompleted
        ? currentSteps.filter(s => s !== stepNumber)
        : [...currentSteps, stepNumber];

      // Check if workflow is fully completed
      const workflow = workflows?.find(w => w.id === workflowId);
      const totalSteps = workflow?.steps.length || 0;
      const isFullyCompleted = newSteps.length === totalSteps;

      const { data, error } = await supabase
        .from('user_workflow_progress')
        .update({
          completed_steps: newSteps,
          completed_at: isFullyCompleted ? new Date().toISOString() : null,
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return { data, isFullyCompleted, wasJustCompleted: isFullyCompleted && !existing.completed_at };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['workflow-progress'] });
      if (result && typeof result === 'object' && 'wasJustCompleted' in result && result.wasJustCompleted) {
        toast.success('🎉 ¡Workflow completado!');
      }
    },
    onError: () => {
      toast.error('Error al actualizar progreso');
    },
  });

  // Update notes
  const updateNotes = useMutation({
    mutationFn: async ({ workflowId, notes }: { workflowId: string; notes: string }) => {
      if (!user) throw new Error('Not authenticated');

      const existing = userProgress?.find(p => p.workflow_id === workflowId);
      
      if (!existing) {
        const { error } = await supabase
          .from('user_workflow_progress')
          .insert({
            user_id: user.id,
            workflow_id: workflowId,
            notes,
            completed_steps: [],
          });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_workflow_progress')
          .update({ notes })
          .eq('id', existing.id);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-progress'] });
    },
  });

  // Reset workflow progress
  const resetProgress = useMutation({
    mutationFn: async (workflowId: string) => {
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_workflow_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('workflow_id', workflowId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-progress'] });
      toast.success('Progreso reiniciado');
    },
  });

  // Calculate stats
  const stats = {
    total: workflows?.length || 0,
    started: userProgress?.length || 0,
    completed: userProgress?.filter(p => p.completed_at).length || 0,
    inProgress: userProgress?.filter(p => !p.completed_at && (p.completed_steps?.length || 0) > 0).length || 0,
  };

  return {
    workflows,
    userProgress,
    isLoading: workflowsLoading || progressLoading,
    getWorkflowProgress,
    startWorkflow,
    toggleStep,
    updateNotes,
    resetProgress,
    stats,
  };
}
