import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { GenerationProvider, useGeneration } from '@/contexts/GenerationContext';
import { PresentationLayout } from '@/components/presentation/PresentationLayout';
import { SlideListProvider } from '@/contexts/SlideListContext';
import type { PresentationConfig, PresentationSection, ExportConfig, GenerationNavInfo } from '@/components/presentation/types';

function PresentationContent() {
  const { config, isLoading, currentWeek, slidesData, generationNumber, resolvedSlides, computedSections } = useGeneration();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Cargando presentación...</p>
        </div>
      </div>
    );
  }

  const presentationConfig: PresentationConfig = {
    name: config.name,
    badge: `Gen ${String(config.generation).padStart(2, '0')}`,
    badgeColor: 'hsl(var(--primary))',
    footer: `${config.module} | Semana ${config.week}`,
  };

  // Use dynamically computed sections from DB
  const presentationSections: PresentationSection[] = computedSections.map(s => ({
    id: s.id,
    title: s.title,
    slides: s.slides,
  }));

  const exportConfig: ExportConfig = {
    filename: `vdrc-gen${config.generation}-semana${currentWeek}`,
    title: `${config.name} - Semana ${currentWeek}`,
    author: config.instructor,
    subject: config.module,
  };

  const slideMetadata = slidesData.map(s => ({
    id: s.id,
    title: s.title,
  }));

  const slideListItems = slidesData.map(s => ({
    componentName: s.componentName,
    slideNumber: s.id,
  }));

  const generationNavInfo: GenerationNavInfo = {
    generationNumber: config.generation,
    currentWeek,
    totalWeeks: config.totalWeeks || 4,
  };

  const backUrl = `/alumnos/gen${config.generation}`;
  // Note: presentations are served at /slides/:genId in comunidad-vdrc

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Cargando slides...</p>
        </div>
      </div>
    }>
      <SlideListProvider slides={slideListItems}>
        <PresentationLayout
          slides={resolvedSlides}
          sections={presentationSections}
          slideMetadata={slideMetadata}
          config={presentationConfig}
          exportConfig={exportConfig}
          backUrl={backUrl}
          generationInfo={generationNavInfo}
          features={{
            galleryMode: false,
            export: true,
            sidebar: true,
            thumbnails: true,
            keyboardShortcuts: true,
            fullscreen: true,
            progressBar: true,
          }}
        />
      </SlideListProvider>
    </Suspense>
  );
}

export default function GenerationPage() {
  const { genId } = useParams<{ genId: string }>();
  
  return (
    <GenerationProvider genId={genId}>
      <PresentationContent />
    </GenerationProvider>
  );
}
