-- ============================================================
-- VDRC Presentation Engine Tables
-- Adds component-based slide system from vdrc.lovable.app
-- ============================================================

-- Presentation generations (separate from community generations table)
-- This powers the slide deck engine with per-generation, per-week slides
CREATE TABLE IF NOT EXISTS public.slide_generations (
  id SERIAL PRIMARY KEY,
  generation_number INTEGER UNIQUE NOT NULL,
  name TEXT NOT NULL,
  module TEXT NOT NULL,
  week INTEGER NOT NULL,
  total_weeks INTEGER NOT NULL DEFAULT 4,
  date DATE NOT NULL,
  instructor TEXT NOT NULL DEFAULT 'Vicente Donoso R.',
  stack TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Weeks per generation (S1-S4)
CREATE TABLE IF NOT EXISTS public.generation_weeks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_id INTEGER NOT NULL REFERENCES public.slide_generations(id) ON DELETE CASCADE,
  week INTEGER NOT NULL,
  name TEXT NOT NULL,
  stack TEXT[] NOT NULL DEFAULT '{}',
  drive_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(generation_id, week)
);

-- Slide sections (grouping for sidebar navigation)
CREATE TABLE IF NOT EXISTS public.sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Slides (component_name maps to React components via registry)
CREATE TABLE IF NOT EXISTS public.slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_id INTEGER NOT NULL REFERENCES public.slide_generations(id) ON DELETE CASCADE,
  week INTEGER NOT NULL DEFAULT 1,
  slide_number INTEGER NOT NULL,
  section_id TEXT NOT NULL REFERENCES public.sections(id),
  section_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  storyline TEXT,
  component_name TEXT NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT slides_generation_week_slide_unique UNIQUE (generation_id, week, slide_number)
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_slides_generation_week ON public.slides(generation_id, week, slide_number);

-- ============================================================
-- RLS: Public read, admin write
-- ============================================================
ALTER TABLE public.slide_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for slide_generations"
  ON public.slide_generations FOR SELECT USING (true);
CREATE POLICY "Public read access for generation_weeks"
  ON public.generation_weeks FOR SELECT USING (true);
CREATE POLICY "Public read access for sections"
  ON public.sections FOR SELECT USING (true);
CREATE POLICY "Public read access for slides"
  ON public.slides FOR SELECT USING (true);

-- Updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_slide_generations_updated_at
  BEFORE UPDATE ON public.slide_generations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_slides_updated_at
  BEFORE UPDATE ON public.slides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- SEED DATA: Sections
-- ============================================================
INSERT INTO public.sections (id, title, display_order) VALUES
  ('context', 'Contexto', 1),
  ('fundamentals', 'Fundamentos', 2),
  ('tools', 'Stack de Herramientas', 3),
  ('application', 'Aplicación', 4),
  ('closing', 'Cierre', 5),
  -- S1 sections
  ('s1-bienvenida', 'Bienvenida', 6),
  ('s1-higiene', 'Higiene Digital', 7),
  ('s1-navegadores', 'Navegadores', 8),
  ('s1-seguridad', 'Seguridad', 9),
  ('s1-contexto', 'Context Engineering', 10),
  ('s1-cierre', 'Cierre', 11),
  -- S2 sections
  ('s2-inicio', 'Inicio', 12),
  ('s2-mod01', '01 · Los Nuevos Fundamentos', 13),
  ('s2-mod02', '02 · El Nuevo Rol: Orquestador', 14),
  ('s2-mod03', '03 · La Suite Claude en Acción', 15),
  ('s2-mod04', '04 · El Paisaje de Modelos', 16),
  ('s2-mod05', '05 · Agentes y Ejecución', 17),
  ('s2-cierre', 'Cierre S2', 18),
  -- S3 sections
  ('s3-apertura', 'Apertura S3', 20),
  ('s3-fundamentos', 'Fundamentos S3', 21),
  ('s3-herramientas', 'Herramientas S3', 22),
  ('s3-aplicacion', 'Aplicación S3', 23),
  ('s3-cierre', 'Cierre S3', 24),
  -- S4 sections
  ('s4-inicio', 'Apertura', 30),
  ('s4-fundamentos', 'Fundamentos S4', 31),
  ('s4-stack', 'Stack', 32),
  ('s4-aplicacion', 'Aplicación S4', 33),
  ('s4-cierre', 'Cierre S4', 34)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, display_order = EXCLUDED.display_order;

-- ============================================================
-- SEED DATA: Gen 09
-- ============================================================
INSERT INTO public.slide_generations (generation_number, name, module, week, total_weeks, date, instructor, stack, is_active) VALUES
  (9, 'Taller Intensivo de Productividad Digital', 'DESARROLLO', 4, 4, '2026-01-27', 'Vicente Donoso R.', ARRAY['Lovable', 'Supabase', 'Cursor'], false);

INSERT INTO public.generation_weeks (generation_id, week, name, stack) VALUES
  (1, 1, 'Higiene Digital', ARRAY['ChatGPT', 'Bitwarden', 'Chrome', 'Edge']),
  (1, 2, 'IA & Productividad', ARRAY['Claude', 'Gemini', 'Perplexity', 'NotebookLM']),
  (1, 3, 'Comunicación', ARRAY['Gamma', 'Manus', 'Cursor']),
  (1, 4, 'Desarrollo', ARRAY['Lovable', 'Supabase', 'Cursor']);

INSERT INTO public.slides (generation_id, week, slide_number, section_id, section_number, title, storyline, component_name) VALUES
  (1, 4, 1, 'context', 1, 'De Consumidor a Creador', 'En 90 minutos, tu primera app funcionando con datos reales.', 'Slide01Cover'),
  (1, 4, 2, 'context', 1, 'Conectando Todo', '3 semanas de preparación te trajeron hasta aquí.', 'Slide02Context'),
  (1, 4, 3, 'fundamentals', 2, 'Front-End: La Tienda', 'Lo que ven tus usuarios.', 'Slide03FrontEnd'),
  (1, 4, 4, 'fundamentals', 2, 'Back-End: La Bodega', 'Donde viven tus datos.', 'Slide04BackEnd'),
  (1, 4, 5, 'fundamentals', 2, 'CRUD: El Lenguaje Universal', 'Las 4 operaciones que toda app necesita.', 'Slide05CRUD'),
  (1, 4, 6, 'tools', 3, 'Gemini: Diseña Gratis', 'Tu copiloto de diseño.', 'Slide06Gemini'),
  (1, 4, 7, 'tools', 3, 'Lovable: La Magia', 'De prompt a app en minutos.', 'Slide07Lovable'),
  (1, 4, 8, 'tools', 3, 'Cursor + Claude', 'Para cuando necesitas el 80% extra de control.', 'Slide08CursorClaude'),
  (1, 4, 9, 'tools', 3, 'GitHub: Tu Seguro', 'Máquina del tiempo para tu código.', 'Slide09GitHub'),
  (1, 4, 10, 'application', 4, 'El Flujo Completo', 'Gemini → Lovable → Supabase → GitHub → Cursor.', 'Slide10FlowDiagram'),
  (1, 4, 11, 'application', 4, 'Tu Guía de Decisión', 'Cada herramienta tiene su momento.', 'Slide11WhenToUse'),
  (1, 4, 12, 'closing', 5, 'Tu Turno', 'El poder está en tus manos.', 'Slide12NextSteps');

-- ============================================================
-- SEED DATA: Gen 10
-- ============================================================
INSERT INTO public.slide_generations (generation_number, name, module, week, total_weeks, date, instructor, stack, is_active) VALUES
  (10, 'Afila Tu Sierra Digital', 'HIGIENE DIGITAL', 3, 4, '2026-02-10', 'Vicente Donoso R.', ARRAY['ChatGPT', 'Claude', 'Perplexity', 'Gemini'], true);

INSERT INTO public.generation_weeks (generation_id, week, name, stack) VALUES
  (2, 1, 'Higiene Digital', ARRAY['ChatGPT', 'Bitwarden', 'Chrome', 'Edge']),
  (2, 2, 'La Era Agéntica', ARRAY['Claude', 'Gemini', 'Perplexity', 'NotebookLM']),
  (2, 3, 'Comunicación y Creación Digital', ARRAY['Gamma', 'NotebookLM', 'Claude Code', 'Cursor']),
  (2, 4, 'VibeCoding: De Consumidor a Creador', ARRAY['Lovable', 'Supabase', 'Cursor', 'GitHub']);

-- Gen 10 - Semana 1 (Higiene Digital) - 29 slides
INSERT INTO public.slides (generation_id, week, slide_number, section_id, section_number, title, component_name) VALUES
  (2, 1, 1, 's1-bienvenida', 1, 'Afila Tu Sierra Digital', 'Slide01Cover'),
  (2, 1, 2, 's1-bienvenida', 1, 'Contexto', 'Slide02Context'),
  (2, 1, 3, 's1-bienvenida', 1, 'Participantes', 'Slide03Participants'),
  (2, 1, 4, 's1-bienvenida', 1, 'Misión', 'Slide04Mission'),
  (2, 1, 5, 's1-bienvenida', 1, 'Cómo Trabajamos', 'Slide05HowWeWork'),
  (2, 1, 6, 's1-bienvenida', 1, 'Afila Tu Sierra', 'Slide06SharpenStory'),
  (2, 1, 7, 's1-bienvenida', 1, 'Filosofía', 'Slide07SharpenPhilosophy'),
  (2, 1, 8, 's1-bienvenida', 1, 'Podcast', 'Slide08Podcast'),
  (2, 1, 9, 's1-higiene', 2, 'Roadmap', 'Slide09Roadmap'),
  (2, 1, 10, 's1-higiene', 2, 'Inbox Zero', 'Slide10InboxZeroTitle'),
  (2, 1, 11, 's1-higiene', 2, 'Metáfora del Inbox', 'Slide11InboxMetaphor'),
  (2, 1, 12, 's1-higiene', 2, 'Algoritmo de Procesamiento', 'Slide12ProcessingAlgorithm'),
  (2, 1, 13, 's1-navegadores', 3, 'Navegadores', 'Slide13BrowsersTitle'),
  (2, 1, 14, 's1-navegadores', 3, 'Perfiles de Navegador', 'Slide14BrowserProfiles'),
  (2, 1, 15, 's1-navegadores', 3, 'Configurar Perfiles', 'Slide15ConfigureProfiles'),
  (2, 1, 16, 's1-navegadores', 3, 'Extensiones', 'Slide16ExtensionAnchoring'),
  (2, 1, 17, 's1-seguridad', 4, 'Seguridad', 'Slide17SecurityTitle'),
  (2, 1, 18, 's1-seguridad', 4, 'Matriz de Seguridad', 'Slide18SecurityMatrix'),
  (2, 1, 19, 's1-seguridad', 4, 'Soluciones de Seguridad', 'Slide19SecuritySolutions'),
  (2, 1, 20, 's1-seguridad', 4, 'Instalar Bitwarden', 'Slide20BitwardenInstall'),
  (2, 1, 21, 's1-contexto', 5, 'Context Engineering', 'Slide21ContextEngineering'),
  (2, 1, 22, 's1-contexto', 5, 'Problema y Solución', 'Slide22ContextProblemSolution'),
  (2, 1, 23, 's1-contexto', 5, 'Manual Digital', 'Slide23ManualDigital'),
  (2, 1, 24, 's1-contexto', 5, 'Ejemplos de Contexto', 'Slide24ContextExamples'),
  (2, 1, 25, 's1-contexto', 5, 'Formato de Output', 'Slide25OutputFormat'),
  (2, 1, 26, 's1-contexto', 5, 'Markdown', 'Slide26Markdown'),
  (2, 1, 27, 's1-cierre', 6, 'Roadmap Vertical', 'Slide27RoadmapVertical'),
  (2, 1, 28, 's1-cierre', 6, 'Misión Semanal', 'Slide28WeeklyMission'),
  (2, 1, 29, 's1-cierre', 6, 'Cierre', 'Slide29Closing');

-- Gen 10 - Semana 2 (La Era Agéntica) - 37 slides
INSERT INTO public.slides (generation_id, week, slide_number, section_id, section_number, title, component_name) VALUES
  (2, 2, 1, 's2-inicio', 1, 'La Era Agéntica', 'S2Slide01Cover'),
  (2, 2, 2, 's2-inicio', 1, 'Agenda', 'tpl02:Slide02Agenda'),
  (2, 2, 3, 's2-mod01', 2, 'Los Nuevos Fundamentos', 'tpl02:Slide03Mod01Divider'),
  (2, 2, 4, 's2-mod01', 2, '2026: El Año de la Agencia', 'S2Slide02YearAgency'),
  (2, 2, 5, 's2-mod01', 2, 'La Transición', 'S2Slide03Transition'),
  (2, 2, 6, 's2-mod01', 2, 'Adopción Masiva', 'S2Slide04Adoption'),
  (2, 2, 7, 's2-mod01', 2, 'La Fragmentación', 'S2Slide05Fragmentation'),
  (2, 2, 8, 's2-mod01', 2, 'El Practicante', 'tpl02:Slide05Practicante'),
  (2, 2, 9, 's2-mod01', 2, 'Ventana de Contexto', 'S2Slide09ContextWindow'),
  (2, 2, 10, 's2-mod01', 2, 'Prompt vs Resultado', 'S2Slide11Prompt'),
  (2, 2, 11, 's2-mod01', 2, 'El Problema de la Ambigüedad', 'S2Slide12Ambiguity'),
  (2, 2, 12, 's2-mod01', 2, 'Define tu Rol', 'S2Slide13Role'),
  (2, 2, 13, 's2-mod01', 2, 'El Contexto es el Rey', 'S2Slide14Context'),
  (2, 2, 14, 's2-mod01', 2, 'Framework C.R.O.P.', 'S2Slide15CROP'),
  (2, 2, 15, 's2-mod01', 2, 'Ingeniería de Prompts', 'S2Slide16PromptEngineering'),
  (2, 2, 16, 's2-mod01', 2, 'Meta-Prompting', 'tpl02:Slide08MetaPrompting'),
  (2, 2, 17, 's2-mod02', 3, 'El Nuevo Rol: Orquestador', 'tpl02:Slide09Mod02Divider'),
  (2, 2, 18, 's2-mod02', 3, 'Del Maestro Chasquilla al Jefe de Obra', 'tpl02:Slide10JefeDeObra'),
  (2, 2, 19, 's2-mod02', 3, 'Lienzos Digitales', 'tpl02:Slide11Lienzos'),
  (2, 2, 20, 's2-mod03', 4, 'La Suite Claude en Acción', 'tpl02:Slide12Mod03Divider'),
  (2, 2, 21, 's2-mod03', 4, 'Tres Herramientas, Un Ecosistema', 'tpl02:Slide13SuiteClaude'),
  (2, 2, 22, 's2-mod03', 4, 'NotebookLM: Síntesis Inteligente', 'tpl02:Slide14NotebookLM'),
  (2, 2, 23, 's2-mod03', 4, 'Nano Banana: Diseño y Renders', 'tpl02:Slide15NanoBanana'),
  (2, 2, 24, 's2-mod04', 5, 'El Paisaje de Modelos', 'tpl02:Slide16Mod04Divider'),
  (2, 2, 25, 's2-mod04', 5, 'Paisaje de Modelos', 'S2Slide06Landscape'),
  (2, 2, 26, 's2-mod04', 5, 'Cómo Piensa una IA', 'S2Slide08Metrics'),
  (2, 2, 27, 's2-mod04', 5, 'Las 3 Preguntas', 'S2Slide10ModelChoice'),
  (2, 2, 28, 's2-mod05', 6, 'Agentes y Ejecución', 'tpl02:Slide18Mod05Divider'),
  (2, 2, 29, 's2-mod05', 6, 'La Revolución Agéntica', 'S2Slide17Revolution'),
  (2, 2, 30, 's2-mod05', 6, 'Anatomía de un Agente', 'S2Slide18Anatomy'),
  (2, 2, 31, 's2-mod05', 6, 'Los Protagonistas', 'S2Slide19Protagonists'),
  (2, 2, 32, 's2-mod05', 6, 'Delegación: Manus AI', 'tpl02:Slide20Manus'),
  (2, 2, 33, 's2-mod05', 6, 'Supervisión: Operator', 'tpl02:Slide21Operator'),
  (2, 2, 34, 's2-mod05', 6, 'De Orquestador a Director', 'tpl02:Slide22Director'),
  (2, 2, 35, 's2-mod05', 6, 'Infraestructura MCP', 'S2Slide20Infrastructure'),
  (2, 2, 36, 's2-cierre', 7, 'Tu Kit Personal', 'S2Slide21Kit'),
  (2, 2, 37, 's2-cierre', 7, 'Cierre', 'S2Slide22Closing');

-- Gen 10 - Semana 3 (Comunicación) - 15 slides
INSERT INTO public.slides (generation_id, week, slide_number, section_id, section_number, title, component_name) VALUES
  (2, 3, 1, 's3-apertura', 1, 'Comunicación y Creación Digital', 'S3Slide01Cover'),
  (2, 3, 2, 's3-apertura', 1, 'Recap: Semanas 1 y 2', 'S3Slide02Recap'),
  (2, 3, 3, 's3-fundamentos', 2, 'Fundamentos de Diseño', 'S3Slide03DesignFoundations'),
  (2, 3, 4, 's3-fundamentos', 2, 'Canvas', 'S3Slide03Canvas'),
  (2, 3, 5, 's3-fundamentos', 2, 'VibeCoding', 'S3Slide04VibeCoding'),
  (2, 3, 6, 's3-herramientas', 3, 'NotebookLM', 'S3Slide05NotebookLM'),
  (2, 3, 7, 's3-herramientas', 3, 'Claude Code', 'S3Slide06ClaudeCode'),
  (2, 3, 8, 's3-herramientas', 3, 'Presentaciones con IA', 'S3Slide07PresentationAI'),
  (2, 3, 9, 's3-herramientas', 3, 'Skills de Comunicación', 'S3Slide07Skills'),
  (2, 3, 10, 's3-aplicacion', 4, 'Automatización', 'S3Slide08Automatizacion'),
  (2, 3, 11, 's3-aplicacion', 4, 'CRM y Gestión', 'S3Slide09CRM'),
  (2, 3, 12, 's3-aplicacion', 4, 'MCP vs API', 'S3Slide10MCPvsAPI'),
  (2, 3, 13, 's3-aplicacion', 4, 'Cursor', 'S3Slide11Cursor'),
  (2, 3, 14, 's3-cierre', 5, 'Video Generativo con IA', 'S3Slide14VideoAI'),
  (2, 3, 15, 's3-cierre', 5, 'Cierre y Próximos Pasos', 'S3Slide12Closing');

-- Gen 10 - Semana 4 (Desarrollo / VibeCoding) - 15 slides
INSERT INTO public.slides (generation_id, week, slide_number, section_id, section_number, title, storyline, component_name) VALUES
  (2, 4, 1, 's4-inicio', 1, 'VibeCoding: De Consumidor a Creador', 'En 90 minutos, tu primera app funcionando con datos reales.', 'S4Slide01Cover'),
  (2, 4, 2, 's4-inicio', 1, 'El Camino Completo', '3 semanas de preparación te trajeron hasta aquí.', 'S4Slide02Recap'),
  (2, 4, 3, 's4-fundamentos', 2, 'Front-End y Back-End', 'La tienda y la bodega.', 'S4Slide03Architecture'),
  (2, 4, 4, 's4-fundamentos', 2, 'CRUD: El Lenguaje Universal', 'Las 4 operaciones que toda app necesita.', 'S4Slide04CRUD'),
  (2, 4, 5, 's4-stack', 3, 'Gemini Canvas: Diseña Gratis', 'Tu copiloto de diseño.', 'S4Slide05GeminiCanvas'),
  (2, 4, 6, 's4-stack', 3, 'Lovable: La Magia', 'De prompt a app en minutos.', 'S4Slide06Lovable'),
  (2, 4, 7, 's4-stack', 3, 'Supabase: Tu Backend', 'Base de datos, autenticación y APIs.', 'S4Slide07Supabase'),
  (2, 4, 8, 's4-stack', 3, 'De Excel a Modelo Relacional', 'Tu Excel tiene 19,000 filas.', 'S4Slide08DataModeling'),
  (2, 4, 9, 's4-stack', 3, 'GitHub: Tu Máquina del Tiempo', 'El Google Drive de tu código.', 'S4Slide09GitHub'),
  (2, 4, 10, 's4-stack', 3, 'Cursor + Claude Code', 'El bisturí. Precisión.', 'S4Slide10CursorClaude'),
  (2, 4, 11, 's4-aplicacion', 4, 'El Flujo Completo', 'Gemini → Lovable → Supabase → GitHub → Cursor.', 'S4Slide11CompleteFlow'),
  (2, 4, 12, 's4-aplicacion', 4, 'Tu Guía de Decisión', 'Cada herramienta tiene su momento.', 'S4Slide12DecisionGuide'),
  (2, 4, 13, 's4-aplicacion', 4, 'Autenticación y Seguridad', 'Login + dominios corporativos.', 'S4Slide13Authentication'),
  (2, 4, 14, 's4-aplicacion', 4, 'Caso Real: Campus Kind', 'De idea a app publicada.', 'S4Slide14CaseStudy'),
  (2, 4, 15, 's4-cierre', 5, 'Tu Turno', 'El poder está en tus manos.', 'S4Slide15Closing');

-- ============================================================
-- Storage bucket for presentation assets
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('presentation-assets', 'presentation-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for presentation assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'presentation-assets');

CREATE POLICY "Authenticated users can upload presentation assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'presentation-assets' AND auth.role() = 'authenticated');
