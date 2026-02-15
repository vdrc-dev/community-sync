import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PresentationViewer } from '@/components/presentation/PresentationViewer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Slide } from '@/types/presentation';

const MODULE_NAMES = ['', 'Higiene Digital', 'IA & Productividad', 'Presentaciones con IA', 'Vibe Coding'];

export default function ModulePresentationView() {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModulePresentation = async () => {
      const moduleNumber = parseInt(number || '1', 10);

      if (moduleNumber < 1 || moduleNumber > 4) {
        setError('Módulo no encontrado');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await (supabase as any)
          .from('module_presentations')
          .select('*')
          .eq('module_number', moduleNumber)
          .eq('status', 'published')
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!data || !data.slides) {
          setError('Presentación del módulo no encontrada');
          setIsLoading(false);
          return;
        }

        const slideData = Array.isArray(data.slides) ? data.slides : [];
        setSlides(slideData as unknown as Slide[]);
        setTitle(data.title || MODULE_NAMES[moduleNumber] || `Módulo ${moduleNumber}`);
      } catch (err) {
        console.error('Error fetching module presentation:', err);
        setError('No se pudo cargar la presentación');
      } finally {
        setIsLoading(false);
      }
    };

    fetchModulePresentation();
  }, [number]);

  const handleExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background gap-4">
        <p className="text-muted-foreground font-mono">{error || 'Sin slides disponibles'}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:underline text-sm font-mono"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <PresentationViewer
      slides={slides}
      title={title}
      generationCode={`MOD-${number}`}
      classNumber={parseInt(number || '1', 10)}
      onExit={handleExit}
    />
  );
}
