import { Suspense, Component, ReactNode, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-white/40 mx-auto" />
        <p className="text-white/50 text-sm">Cargando...</p>
      </div>
    </div>
  );
}

/* ── Main Presentation Content ─────────────────────────────────── */
function PresentationContent() {
  const location = useLocation();
  const { config, isLoading, currentWeek, slidesData, generationNumber, resolvedSlides, computedSections } = useGeneration();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const isPerformanceMode = searchParams.get('fast') !== '0';

  // All hooks MUST be called before any early return (Rules of Hooks)
  const presentationConfig = useMemo<PresentationConfig>(() => ({
    name: config.name,
    badge: `Gen ${String(config.generation).padStart(2, '0')}`,
    badgeColor: 'hsl(var(--primary))',
    footer: `${config.module} | Semana ${config.week}`,
  }), [config.name, config.generation, config.module, config.week]);

  const presentationSections = useMemo<PresentationSection[]>(
    () => computedSections.map(s => ({ id: s.id, title: s.title, slides: s.slides })),
    [computedSections]
  );

  const exportConfig = useMemo<ExportConfig>(() => ({
    filename: `vdrc-gen${config.generation}-semana${currentWeek}`,
    title: `${config.name} - Semana ${currentWeek}`,
    author: config.instructor,
    subject: config.module,
  }), [config.generation, config.name, config.instructor, config.module, currentWeek]);

  const slideMetadata = useMemo(
    () => slidesData.map(s => ({ id: s.id, title: s.title })),
    [slidesData]
  );

  const slideListItems = useMemo(
    () => slidesData.map(s => ({ componentName: s.componentName, slideNumber: s.id })),
    [slidesData]
  );

  const totalWeeks = config.totalWeeks || 4;
  const availableWeeks = useMemo(
    () => Array.from({ length: totalWeeks }, (_, i) => i + 1),
    [totalWeeks]
  );

  const generationNavInfo = useMemo<GenerationNavInfo>(() => ({
    generationNumber: config.generation,
    currentWeek,
    totalWeeks,
    availableWeeks,
  }), [config.generation, currentWeek, totalWeeks, availableWeeks]);

  const { user } = useAuth();
  const backUrl = user
    ? `/generations/GEN-${String(config.generation).padStart(3, '0')}`
    : '/';

  // Early return AFTER all hooks
  if (isLoading) {
    return <PresentationSkeleton />;
  }

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
              progressBar: false,
              performanceMode: isPerformanceMode,
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
