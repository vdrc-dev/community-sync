import { Suspense, Component, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { GenerationProvider, useGeneration } from '@/contexts/GenerationContext';
import { PresentationLayout } from '@/components/presentation/PresentationLayout';
import { SlideListProvider } from '@/contexts/SlideListContext';
import type { PresentationConfig, PresentationSection, ExportConfig, GenerationNavInfo } from '@/components/presentation/types';

/* ── Slide Error Boundary ──────────────────────────────────────── */
interface ErrorBoundaryProps { children: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; error?: Error; }

class SlideErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4 max-w-md p-8">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Error al cargar slide</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {this.state.error?.message || 'Ocurrió un error inesperado al renderizar esta diapositiva.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── Loading Skeleton ──────────────────────────────────────────── */
function PresentationSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="relative">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <div className="absolute inset-0 w-10 h-10 mx-auto rounded-full animate-ping bg-primary/10" />
        </div>
        <div className="space-y-2">
          <p className="text-foreground font-medium">Cargando presentación...</p>
          <p className="text-xs text-muted-foreground">Preparando slides y recursos</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Presentation Content ─────────────────────────────────── */
function PresentationContent() {
  const { config, isLoading, currentWeek, slidesData, generationNumber, resolvedSlides, computedSections } = useGeneration();
  
  if (isLoading) {
    return <PresentationSkeleton />;
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

  // Compute available weeks (1-4 for Gen 10, based on known data)
  const availableWeeks = Array.from({ length: config.totalWeeks || 4 }, (_, i) => i + 1);

  const generationNavInfo: GenerationNavInfo = {
    generationNumber: config.generation,
    currentWeek,
    totalWeeks: config.totalWeeks || 4,
    availableWeeks,
  };

  const backUrl = `/alumnos/gen${config.generation}`;

  return (
    <Suspense fallback={<PresentationSkeleton />}>
      <SlideErrorBoundary>
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
      </SlideErrorBoundary>
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
