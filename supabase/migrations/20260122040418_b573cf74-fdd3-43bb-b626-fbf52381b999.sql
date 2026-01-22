-- Tabla para almacenar ejecuciones de prompts en workflows
CREATE TABLE public.workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workflow_id UUID NOT NULL REFERENCES public.automation_workflows(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  variables JSONB DEFAULT '{}'::jsonb,
  prompt_used TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  model_used TEXT NOT NULL DEFAULT 'google/gemini-3-flash-preview',
  tokens_used INTEGER,
  execution_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para consultas eficientes
CREATE INDEX idx_workflow_executions_user ON public.workflow_executions(user_id);
CREATE INDEX idx_workflow_executions_workflow ON public.workflow_executions(workflow_id);
CREATE INDEX idx_workflow_executions_user_workflow ON public.workflow_executions(user_id, workflow_id);
CREATE INDEX idx_workflow_executions_created ON public.workflow_executions(created_at DESC);

-- RLS
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;

-- Políticas: usuarios solo ven y crean sus propias ejecuciones
CREATE POLICY "Users can view their own executions"
ON public.workflow_executions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own executions"
ON public.workflow_executions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own executions"
ON public.workflow_executions FOR DELETE
USING (auth.uid() = user_id);