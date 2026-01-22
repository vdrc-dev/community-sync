-- Table for automation workflows/templates
CREATE TABLE public.automation_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  category text,
  icon_emoji text DEFAULT '⚡',
  time_to_setup_minutes integer DEFAULT 30,
  time_saved_per_use_minutes integer DEFAULT 10,
  mermaid_diagram text,
  steps jsonb NOT NULL DEFAULT '[]',
  tools_used text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Table for user progress on workflows
CREATE TABLE public.user_workflow_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  workflow_id uuid NOT NULL REFERENCES public.automation_workflows(id) ON DELETE CASCADE,
  completed_steps integer[] DEFAULT '{}',
  notes text,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  UNIQUE(user_id, workflow_id)
);

-- Enable RLS
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_workflow_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for workflows
CREATE POLICY "Anyone can view published workflows"
ON public.automation_workflows FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage workflows"
ON public.automation_workflows FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for user progress
CREATE POLICY "Users can view own progress"
ON public.user_workflow_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress"
ON public.user_workflow_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
ON public.user_workflow_progress FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
ON public.user_workflow_progress FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_automation_workflows_updated_at
BEFORE UPDATE ON public.automation_workflows
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample workflows
INSERT INTO public.automation_workflows (title, description, difficulty, category, icon_emoji, time_to_setup_minutes, time_saved_per_use_minutes, mermaid_diagram, steps, tools_used, tags, is_featured) VALUES
(
  'Automatizar Resúmenes de Reuniones',
  'Convierte tus reuniones en notas estructuradas, action items y follow-ups automáticos usando IA',
  'beginner',
  'Productividad',
  '📝',
  15,
  20,
  'graph LR
    A[🎤 Reunión] --> B[Granola/Otter]
    B --> C[Transcripción]
    C --> D[ChatGPT/Claude]
    D --> E[Resumen Estructurado]
    E --> F[Notion/Docs]
    D --> G[Action Items]
    G --> H[Todoist/Asana]',
  '[
    {"step": 1, "title": "Configura grabación automática", "description": "Instala Granola o Otter.ai y configúralo para grabar tus reuniones automáticamente", "prompt": null},
    {"step": 2, "title": "Obtén la transcripción", "description": "Después de la reunión, exporta la transcripción en formato texto", "prompt": null},
    {"step": 3, "title": "Procesa con IA", "description": "Usa el siguiente prompt para extraer información clave", "prompt": "Analiza esta transcripción de reunión y extrae:\n1. **Resumen ejecutivo** (3-5 puntos)\n2. **Decisiones tomadas**\n3. **Action items** con responsable y fecha\n4. **Temas pendientes** para próxima reunión\n\nTranscripción:\n{{TRANSCRIPCION}}"},
    {"step": 4, "title": "Organiza en tu sistema", "description": "Copia el resultado a Notion o Google Docs y crea tareas en tu gestor de proyectos", "prompt": null}
  ]',
  ARRAY['Granola', 'Otter.ai', 'ChatGPT', 'Claude', 'Notion'],
  ARRAY['reuniones', 'productividad', 'notas'],
  true
),
(
  'Research Automatizado con IA',
  'Investiga cualquier tema en profundidad combinando búsqueda web, análisis y síntesis con múltiples herramientas de IA',
  'intermediate',
  'Investigación',
  '🔍',
  20,
  60,
  'graph TD
    A[📋 Tema de Research] --> B[Perplexity]
    B --> C[Fuentes Primarias]
    C --> D[NotebookLM]
    D --> E[Análisis Profundo]
    E --> F[ChatGPT/Claude]
    F --> G[Síntesis Final]
    G --> H[📊 Presentación]
    G --> I[📄 Documento]',
  '[
    {"step": 1, "title": "Define tu pregunta de investigación", "description": "Escribe claramente qué quieres investigar y por qué", "prompt": null},
    {"step": 2, "title": "Búsqueda inicial con Perplexity", "description": "Usa Perplexity para obtener una visión general con fuentes citadas", "prompt": "Necesito investigar sobre {{TEMA}}. Dame:\n1. Una visión general del tema\n2. Los 5 aspectos más importantes a considerar\n3. Fuentes académicas o confiables para profundizar\n4. Controversias o debates actuales sobre el tema"},
    {"step": 3, "title": "Carga fuentes en NotebookLM", "description": "Sube los PDFs y artículos encontrados a NotebookLM de Google", "prompt": null},
    {"step": 4, "title": "Análisis profundo", "description": "Haz preguntas específicas a NotebookLM sobre tus fuentes", "prompt": "Basándote en las fuentes que he subido:\n1. ¿Cuáles son los puntos de consenso entre los autores?\n2. ¿Dónde hay desacuerdos?\n3. ¿Qué gaps de información identificas?\n4. ¿Qué conclusiones puedo sacar?"},
    {"step": 5, "title": "Síntesis final", "description": "Usa ChatGPT o Claude para crear el entregable final", "prompt": "Con base en mi investigación sobre {{TEMA}}, necesito crear {{FORMATO_SALIDA}}. Aquí están mis hallazgos principales:\n\n{{HALLAZGOS}}\n\nGenera un {{FORMATO_SALIDA}} profesional que incluya introducción, desarrollo y conclusiones."}
  ]',
  ARRAY['Perplexity', 'NotebookLM', 'ChatGPT', 'Claude', 'Google Slides'],
  ARRAY['research', 'análisis', 'síntesis'],
  true
),
(
  'Crear Contenido para Redes Sociales',
  'Genera una semana completa de contenido para múltiples plataformas a partir de una sola idea',
  'beginner',
  'Marketing',
  '📱',
  30,
  120,
  'graph TD
    A[💡 Idea Original] --> B[ChatGPT]
    B --> C[Contenido Largo]
    C --> D[Claude]
    D --> E[Versiones Cortas]
    E --> F[🐦 Twitter/X]
    E --> G[📸 Instagram]
    E --> H[💼 LinkedIn]
    C --> I[Midjourney/DALL-E]
    I --> J[🎨 Imágenes]',
  '[
    {"step": 1, "title": "Define tu idea central", "description": "Escribe el tema o mensaje principal que quieres comunicar", "prompt": null},
    {"step": 2, "title": "Genera contenido largo", "description": "Crea un post de blog o artículo como base", "prompt": "Escribe un artículo de 500 palabras sobre: {{TEMA}}\n\nEl artículo debe:\n- Tener un hook atractivo\n- Incluir 3 puntos principales\n- Terminar con un call to action\n- Usar un tono {{TONO}}"},
    {"step": 3, "title": "Adapta para cada plataforma", "description": "Transforma el contenido largo en versiones específicas", "prompt": "Adapta este contenido para redes sociales:\n\n{{CONTENIDO}}\n\nGenera:\n1. Un thread de Twitter (5-7 tweets)\n2. Un caption de Instagram (con emojis y hashtags)\n3. Un post de LinkedIn (profesional, con estadísticas si es posible)"},
    {"step": 4, "title": "Genera imágenes", "description": "Crea visuales para acompañar tu contenido", "prompt": "Create a modern, minimal social media graphic about {{TEMA}}. Style: clean, professional, with subtle gradients. Include abstract shapes and icons related to the topic. Aspect ratio 1:1 for Instagram."},
    {"step": 5, "title": "Programa y publica", "description": "Usa Buffer, Hootsuite o las herramientas nativas para programar", "prompt": null}
  ]',
  ARRAY['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Buffer'],
  ARRAY['contenido', 'redes sociales', 'marketing'],
  true
),
(
  'Análisis de Datos con IA',
  'Transforma datos crudos en insights actionables usando ChatGPT y herramientas de visualización',
  'advanced',
  'Datos',
  '📊',
  45,
  90,
  'graph LR
    A[📁 Datos CSV/Excel] --> B[ChatGPT Code Interpreter]
    B --> C[Limpieza de Datos]
    C --> D[Análisis Estadístico]
    D --> E[Visualizaciones]
    E --> F[📈 Gráficos]
    D --> G[Insights]
    G --> H[📋 Recomendaciones]',
  '[
    {"step": 1, "title": "Prepara tus datos", "description": "Exporta tus datos a CSV o Excel. Asegúrate de que las columnas tengan nombres claros", "prompt": null},
    {"step": 2, "title": "Sube a ChatGPT con Code Interpreter", "description": "Activa Code Interpreter en ChatGPT Plus y sube tu archivo", "prompt": null},
    {"step": 3, "title": "Exploración inicial", "description": "Pide un análisis exploratorio de tus datos", "prompt": "Analiza este dataset y proporciona:\n1. Resumen estadístico de cada columna\n2. Valores faltantes o anómalos\n3. Correlaciones interesantes\n4. Distribución de las variables principales\n\nGenera visualizaciones para cada punto."},
    {"step": 4, "title": "Análisis profundo", "description": "Haz preguntas específicas sobre tus datos", "prompt": "Basándote en los datos:\n1. ¿Cuáles son los principales drivers de {{METRICA_OBJETIVO}}?\n2. ¿Hay segmentos o clusters naturales en los datos?\n3. ¿Qué tendencias se observan a lo largo del tiempo?\n4. ¿Qué predicciones podemos hacer?"},
    {"step": 5, "title": "Genera recomendaciones", "description": "Convierte insights en acciones concretas", "prompt": "Con base en el análisis realizado, genera:\n1. Top 5 insights más importantes\n2. 3 recomendaciones actionables con impacto esperado\n3. Próximos pasos sugeridos\n4. Métricas a monitorear\n\nFormatea como presentación ejecutiva."}
  ]',
  ARRAY['ChatGPT', 'Code Interpreter', 'Excel', 'Python'],
  ARRAY['datos', 'análisis', 'visualización', 'estadísticas'],
  true
),
(
  'Automatizar Email Marketing',
  'Crea campañas de email personalizadas y secuencias automatizadas con IA',
  'intermediate',
  'Marketing',
  '✉️',
  40,
  45,
  'graph TD
    A[🎯 Objetivo de Campaña] --> B[ChatGPT]
    B --> C[Subject Lines]
    B --> D[Body Copy]
    C --> E[A/B Testing]
    D --> F[Personalización]
    E --> G[Mailchimp/Brevo]
    F --> G
    G --> H[📧 Envío Automatizado]
    H --> I[📊 Métricas]',
  '[
    {"step": 1, "title": "Define tu objetivo y audiencia", "description": "Clarifica qué quieres lograr y a quién te diriges", "prompt": null},
    {"step": 2, "title": "Genera subject lines", "description": "Crea múltiples opciones para A/B testing", "prompt": "Genera 10 subject lines para un email sobre: {{TEMA}}\n\nAudiencia: {{AUDIENCIA}}\nObjetivo: {{OBJETIVO}}\n\nIncluye variaciones:\n- Con urgencia\n- Con curiosidad\n- Con beneficio directo\n- Con pregunta\n- Con número/estadística"},
    {"step": 3, "title": "Escribe el cuerpo del email", "description": "Genera el contenido principal del email", "prompt": "Escribe un email de marketing con estas características:\n\nSubject: {{SUBJECT_LINE}}\nObjetivo: {{OBJETIVO}}\nAudiencia: {{AUDIENCIA}}\nTono: {{TONO}}\nCTA: {{CALL_TO_ACTION}}\n\nEstructura:\n- Hook en las primeras 2 líneas\n- Problema que resuelves\n- Tu solución\n- Prueba social o beneficio\n- CTA claro\n\nMáximo 150 palabras."},
    {"step": 4, "title": "Crea variantes personalizadas", "description": "Genera versiones para diferentes segmentos", "prompt": "Adapta este email para estos segmentos:\n1. Nuevos suscriptores\n2. Clientes existentes\n3. Usuarios inactivos\n\nEmail base:\n{{EMAIL_BASE}}\n\nMantén el mensaje central pero ajusta el tono y ofertas."},
    {"step": 5, "title": "Configura la automatización", "description": "Sube a tu herramienta de email y configura triggers", "prompt": null}
  ]',
  ARRAY['ChatGPT', 'Claude', 'Mailchimp', 'Brevo', 'ConvertKit'],
  ARRAY['email', 'marketing', 'automatización', 'copywriting'],
  false
);