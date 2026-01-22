import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface WorkflowExecution {
  id: string;
  user_id: string;
  workflow_id: string;
  step_number: number;
  variables: Record<string, string>;
  prompt_used: string;
  ai_response: string;
  model_used: string;
  tokens_used: number | null;
  execution_time_ms: number | null;
  created_at: string;
}

interface ExecutePromptParams {
  prompt: string;
  variables?: Record<string, string>;
  workflowId?: string;
  stepNumber?: number;
  onDelta?: (text: string) => void;
}

interface ExecutePromptResult {
  response: string;
  model: string;
  tokens_used: number | null;
  execution_time_ms: number;
}

export function useWorkflowExecutions(workflowId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<string>('');

  // Fetch execution history for a workflow
  const { data: executions, isLoading: executionsLoading } = useQuery({
    queryKey: ['workflow-executions', workflowId, user?.id],
    queryFn: async () => {
      if (!user || !workflowId) return [];
      
      const { data, error } = await supabase
        .from('workflow_executions')
        .select('*')
        .eq('workflow_id', workflowId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return (data || []) as WorkflowExecution[];
    },
    enabled: !!user && !!workflowId,
  });

  // Get latest execution for a specific step
  const getLatestExecution = (stepNumber: number): WorkflowExecution | undefined => {
    return executions?.find(e => e.step_number === stepNumber);
  };

  // Execute a prompt (streaming)
  const executePrompt = async ({
    prompt,
    variables = {},
    workflowId: wfId,
    stepNumber,
    onDelta,
  }: ExecutePromptParams): Promise<ExecutePromptResult> => {
    setIsExecuting(true);
    setCurrentResponse('');

    const useWorkflowId = wfId || workflowId;

    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/execute-workflow-prompt`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
          body: JSON.stringify({
            prompt,
            variables,
            workflowId: useWorkflowId,
            stepNumber,
            stream: !!onDelta,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al ejecutar prompt');
      }

      // Handle streaming
      if (onDelta && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          
          // Process complete lines
          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);

            if (!line || line.startsWith(':')) continue;
            if (!line.startsWith('data: ')) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
                setCurrentResponse(fullResponse);
                onDelta(content);
              }
            } catch {
              // Partial JSON, wait for more data
            }
          }
        }

        // Invalidate cache to refresh history
        if (useWorkflowId) {
          queryClient.invalidateQueries({ queryKey: ['workflow-executions', useWorkflowId] });
        }

        return {
          response: fullResponse,
          model: 'google/gemini-3-flash-preview',
          tokens_used: null,
          execution_time_ms: 0,
        };
      }

      // Non-streaming response
      const data = await response.json();
      
      // Invalidate cache to refresh history
      if (useWorkflowId) {
        queryClient.invalidateQueries({ queryKey: ['workflow-executions', useWorkflowId] });
      }

      return data as ExecutePromptResult;

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(message);
      throw error;
    } finally {
      setIsExecuting(false);
    }
  };

  // Delete an execution
  const deleteExecution = useMutation({
    mutationFn: async (executionId: string) => {
      const { error } = await supabase
        .from('workflow_executions')
        .delete()
        .eq('id', executionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-executions', workflowId] });
      toast.success('Ejecución eliminada');
    },
    onError: () => {
      toast.error('Error al eliminar ejecución');
    },
  });

  return {
    executions,
    executionsLoading,
    getLatestExecution,
    executePrompt,
    deleteExecution,
    isExecuting,
    currentResponse,
  };
}
