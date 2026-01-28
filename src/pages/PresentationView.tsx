import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PresentationViewer } from '@/components/presentation/PresentationViewer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Slide } from '@/types/presentation';

// Demo slides for testing
const DEMO_SLIDES: Slide[] = [
  {
    id: '1',
    type: 'title',
    title: 'Vibe Coding 2026',
    subtitle: 'De la Idea a la Aplicación con IA',
    tags: ['IA Generativa', 'Deploy Instantáneo', 'No-Code'],
  },
  {
    id: '2',
    type: 'bullets',
    title: 'Agenda del Día',
    bullets: [
      'Introducción al Vibe Coding',
      'Demo en vivo con Lovable',
      'Práctica guiada',
      'Q&A y recursos adicionales',
    ],
    speakerNotes: 'Comenzar con una bienvenida y explicar el flujo del día.',
  },
  {
    id: '3',
    type: 'content',
    title: '¿Qué es Vibe Coding?',
    content: 'El Vibe Coding es un enfoque moderno de desarrollo donde la IA es tu co-piloto. Ya no escribes código línea por línea, sino que describes lo que quieres lograr y la IA genera el código por ti.\n\nEsto permite a cualquier persona crear aplicaciones funcionales sin años de experiencia en programación.',
    speakerNotes: 'Enfatizar que no reemplaza a los desarrolladores, los potencia.',
  },
  {
    id: '4',
    type: 'split',
    title: 'Herramientas que Usaremos',
    content: 'Durante el workshop exploraremos varias herramientas de vanguardia que están revolucionando cómo creamos software.',
    bullets: [
      'Lovable - Apps web completas',
      'Claude - Asistente de IA',
      'Supabase - Backend moderno',
    ],
    image: '',
  },
  {
    id: '5',
    type: 'code',
    title: 'Ejemplo: Crear un Componente',
    content: 'Así de simple es crear un botón animado:',
    code: `import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function AnimatedButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button>¡Click me!</Button>
    </motion.div>
  );
}`,
    codeLanguage: 'typescript',
  },
  {
    id: '6',
    type: 'bullets',
    title: 'Beneficios del Vibe Coding',
    bullets: [
      '10x más rápido que desarrollo tradicional',
      'Menor curva de aprendizaje',
      'Iteración instantánea',
      'Foco en la experiencia, no en sintaxis',
    ],
  },
  {
    id: '7',
    type: 'title',
    title: '¡Manos a la Obra!',
    subtitle: 'Es hora de crear tu primera app',
    tags: ['Práctica', 'En Vivo'],
  },
];

export default function PresentationView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresentation = async () => {
      if (!id) {
        // No ID - use demo slides
        setSlides(DEMO_SLIDES);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('class_presentations')
          .select('slides, outline, key_points')
          .eq('id', id)
          .single();

        if (error) throw error;

        // Use slides if available, otherwise generate from outline
        if (data?.slides && Array.isArray(data.slides) && data.slides.length > 0) {
          setSlides(data.slides as unknown as Slide[]);
        } else {
          // Fallback to demo slides
          setSlides(DEMO_SLIDES);
        }
      } catch (err) {
        console.error('Error fetching presentation:', err);
        setError('No se pudo cargar la presentación');
        // Use demo slides on error
        setSlides(DEMO_SLIDES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresentation();
  }, [id]);

  const handleExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate(-1);
  };

  const handleExportPDF = async () => {
    // TODO: Implement PDF export
    console.log('PDF export not yet implemented');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PresentationViewer
      slides={slides}
      onExit={handleExit}
      onExportPDF={handleExportPDF}
    />
  );
}
