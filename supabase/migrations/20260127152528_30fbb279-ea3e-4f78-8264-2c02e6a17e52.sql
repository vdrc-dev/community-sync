-- Create class_presentations table for admin presentation planning
CREATE TABLE public.class_presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'published')),
  outline TEXT DEFAULT '',
  key_points TEXT[] DEFAULT '{}',
  talking_points JSONB DEFAULT '[]',
  resources_needed TEXT[] DEFAULT '{}',
  duration_estimate INTEGER DEFAULT 60,
  assigned_to TEXT,
  review_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  UNIQUE(class_id)
);

-- Enable RLS
ALTER TABLE public.class_presentations ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only admins can manage presentations (using existing has_role function)
CREATE POLICY "Admins can manage presentations"
  ON public.class_presentations
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at (using existing function)
CREATE TRIGGER update_class_presentations_updated_at
  BEFORE UPDATE ON public.class_presentations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();