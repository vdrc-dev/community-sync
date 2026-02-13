-- =============================================
-- SEED: 10 Generations + Gen 11 upcoming
-- Based on real VDRC workshop history
-- =============================================

-- Upsert generations (avoid duplicates if some already exist)
INSERT INTO public.generations (code, name, description, start_date, end_date, is_active)
VALUES
  ('GEN-001', 'Generación 001', 'La primera generación del Taller Intensivo de Productividad Digital. Pioneros en explorar ChatGPT, Claude y las bases de la higiene digital.', '2025-06-04', '2025-07-02', false),
  ('GEN-002', 'Generación 002', 'Segunda generación. Se incorporaron Perplexity, Gemini y las primeras sesiones de automatización con App Script.', '2025-06-18', '2025-07-09', false),
  ('GEN-003', 'Generación 003', 'Tercera generación. Introducción de Gama para presentaciones y Notebook LM para análisis de documentos.', '2025-06-25', '2025-07-16', false),
  ('GEN-004', 'Generación 004', 'Cuarta generación. Se sumó el módulo de Vibe Coding con Lovable + Supabase. Primeros proyectos funcionales.', '2025-07-08', '2025-07-29', false),
  ('GEN-005', 'Generación 005', 'Quinta generación. Consolidación del stack: Bitwarden, Granola, Beautiful.ai, Airtable y Faces App.', '2025-08-05', '2025-08-26', false),
  ('GEN-006', 'Generación 006', 'Sexta generación. Se profundizó en metaprompts, O3 vs GPT-4, y proyectos de ERP con Lovable.', '2025-09-16', '2025-10-07', false),
  ('GEN-007', 'Generación 007', 'Séptima generación. Introducción de Manus (agente autónomo), Codex y Claude Code. Proyectos avanzados.', '2025-10-07', '2025-10-28', false),
  ('GEN-008', 'Generación 008', 'Octava generación. HubSpot, Crea, Read.ai y automatizaciones avanzadas con Zapier.', '2025-11-04', '2025-11-25', false),
  ('GEN-009', 'Generación 009', 'Novena generación. Stack completo: +30 herramientas, Cursor para desarrollo local, dashboards con Recharts.', '2026-01-06', '2026-01-27', false),
  ('GEN-010', 'Generación 010', 'Décima generación. La más reciente. Integración de todo el ecosistema VDRC con portal de comunidad.', '2026-02-03', '2026-02-24', true)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  is_active = EXCLUDED.is_active;

-- =============================================
-- SEED: 4 classes per generation (template)
-- Each generation follows the same 4-module structure
-- =============================================

-- Helper: create classes for each generation that doesn't have them yet
DO $$
DECLARE
  gen RECORD;
  class_count INT;
BEGIN
  FOR gen IN SELECT id, code, start_date FROM public.generations ORDER BY code
  LOOP
    -- Check if generation already has classes
    SELECT COUNT(*) INTO class_count FROM public.classes WHERE generation_id = gen.id;
    
    IF class_count = 0 AND gen.start_date IS NOT NULL THEN
      INSERT INTO public.classes (generation_id, class_number, title, description, class_date)
      VALUES
        (gen.id, 1, 'Higiene Digital', 'Inbox Zero, Bitwarden, perfiles de navegador, Granola y rutinas digitales productivas.', gen.start_date),
        (gen.id, 2, 'IA & Productividad', 'ChatGPT, Claude, Gemini, Perplexity, Manus. Metaprompts, automatización con Zapier y App Script.', gen.start_date + INTERVAL '7 days'),
        (gen.id, 3, 'Presentaciones con IA', 'Gama, Beautiful.ai, Napkin, Canva, Colors y Font Joy. De idea a presentación profesional.', gen.start_date + INTERVAL '14 days'),
        (gen.id, 4, 'Vibe Coding', 'Lovable + Supabase + GitHub. Airtable, Faces App, Codex y Cursor. De prompt a software funcional.', gen.start_date + INTERVAL '21 days');
    END IF;
  END LOOP;
END $$;
