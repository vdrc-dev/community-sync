-- User Automations for ROI Calculator
CREATE TABLE public.user_automations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  task_name text NOT NULL,
  category text,
  time_before_minutes integer NOT NULL CHECK (time_before_minutes > 0),
  time_after_minutes integer NOT NULL CHECK (time_after_minutes >= 0),
  frequency_per_week integer NOT NULL CHECK (frequency_per_week > 0),
  hourly_rate numeric(10,2) DEFAULT 25,
  tool_used text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- User Tool Logs for Tool Tracker
CREATE TABLE public.user_tool_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tool_id uuid REFERENCES public.tools(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('wishlist', 'tried', 'frequent', 'discarded')),
  rating integer CHECK (rating BETWEEN 1 AND 5),
  notes text,
  first_tried_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, tool_id)
);

-- Tool Votes for Community Comparison
CREATE TABLE public.tool_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tool_id uuid REFERENCES public.tools(id) ON DELETE CASCADE,
  use_case text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, tool_id, use_case)
);

-- Add comparison columns to tools table
ALTER TABLE public.tools 
ADD COLUMN IF NOT EXISTS pros text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS cons text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS use_cases text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS best_for text;

-- Enable RLS
ALTER TABLE public.user_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tool_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_automations
CREATE POLICY "Users can view their own automations"
ON public.user_automations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own automations"
ON public.user_automations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own automations"
ON public.user_automations FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own automations"
ON public.user_automations FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for user_tool_logs
CREATE POLICY "Users can view their own tool logs"
ON public.user_tool_logs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tool logs"
ON public.user_tool_logs FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tool logs"
ON public.user_tool_logs FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tool logs"
ON public.user_tool_logs FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for tool_votes (public read, user write)
CREATE POLICY "Anyone can view tool votes"
ON public.tool_votes FOR SELECT
USING (true);

CREATE POLICY "Users can create their own votes"
ON public.tool_votes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
ON public.tool_votes FOR DELETE
USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_user_automations_updated_at
BEFORE UPDATE ON public.user_automations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_tool_logs_updated_at
BEFORE UPDATE ON public.user_tool_logs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate total ROI for a user
CREATE OR REPLACE FUNCTION public.calculate_user_roi(_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_automations', COUNT(*),
    'weekly_minutes_saved', SUM((time_before_minutes - time_after_minutes) * frequency_per_week),
    'monthly_minutes_saved', SUM((time_before_minutes - time_after_minutes) * frequency_per_week * 4),
    'yearly_minutes_saved', SUM((time_before_minutes - time_after_minutes) * frequency_per_week * 52),
    'weekly_value_saved', SUM((time_before_minutes - time_after_minutes) * frequency_per_week * hourly_rate / 60),
    'monthly_value_saved', SUM((time_before_minutes - time_after_minutes) * frequency_per_week * 4 * hourly_rate / 60),
    'yearly_value_saved', SUM((time_before_minutes - time_after_minutes) * frequency_per_week * 52 * hourly_rate / 60)
  )
  INTO result
  FROM public.user_automations
  WHERE user_id = _user_id;
  
  RETURN COALESCE(result, '{"total_automations": 0, "weekly_minutes_saved": 0, "monthly_minutes_saved": 0, "yearly_minutes_saved": 0, "weekly_value_saved": 0, "monthly_value_saved": 0, "yearly_value_saved": 0}'::jsonb);
END;
$$;