ALTER TABLE public.tools ADD COLUMN source text DEFAULT 'community';
COMMENT ON COLUMN public.tools.source IS 'workshop = vistas en el taller, community = para explorar por cuenta propia';