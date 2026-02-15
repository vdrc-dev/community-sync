import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Filter, 
  Search,
  Clock,
  User,
  ChevronRight,
  Plus,
  LayoutGrid,
  List,
  Settings,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresentationStatusBadge } from './PresentationStatusBadge';
import { GenerationManager } from './GenerationManager';
import { usePresentations, type PresentationStatus, type PresentationWithClass } from '@/hooks/usePresentations';
import { useGenerations } from '@/hooks/useGenerations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface PresentationDashboardProps {
  onSelectPresentation: (presentation: PresentationWithClass) => void;
  onCreatePresentation: (classId: string) => void;
}

export function PresentationDashboard({ 
  onSelectPresentation, 
  onCreatePresentation 
}: PresentationDashboardProps) {
  const { presentations, isLoading } = usePresentations();
  const { generations: generationsData, isLoading: isLoadingGenerations } = useGenerations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<PresentationStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showGenerationManager, setShowGenerationManager] = useState(false);

  // Get unique generations for filter dropdown
  const generationOptions = useMemo(() => {
    if (!presentations) return [];
    const genMap = new Map<string, { id: string; name: string; code: string }>();
    presentations.forEach((p) => {
      if (p.classes?.generations) {
        genMap.set(p.classes.generations.id, p.classes.generations);
      }
    });
    return Array.from(genMap.values());
  }, [presentations]);

  // Filter presentations
  const filteredPresentations = useMemo(() => {
    if (!presentations) return [];
    return presentations.filter((p) => {
      const matchesSearch = 
        p.classes?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.assigned_to?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGeneration = 
        selectedGeneration === 'all' || 
        p.classes?.generations?.id === selectedGeneration;
      const matchesStatus = 
        statusFilter === 'all' || 
        p.status === statusFilter;
      return matchesSearch && matchesGeneration && matchesStatus;
    });
  }, [presentations, searchQuery, selectedGeneration, statusFilter]);

  // Group by generation
  const groupedByGeneration = useMemo(() => {
    const groups: Record<string, PresentationWithClass[]> = {};
    filteredPresentations.forEach((p) => {
      const genCode = p.classes?.generations?.code || 'Sin Generación';
      if (!groups[genCode]) groups[genCode] = [];
      groups[genCode].push(p);
    });
    // Sort each group by class_number
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => (a.classes?.class_number || 0) - (b.classes?.class_number || 0));
    });
    return groups;
  }, [filteredPresentations]);

  // Stats
  const stats = useMemo(() => {
    if (!presentations) return { total: 0, draft: 0, review: 0, approved: 0, published: 0 };
    return {
      total: presentations.length,
      draft: presentations.filter((p) => p.status === 'draft').length,
      review: presentations.filter((p) => p.status === 'review').length,
      approved: presentations.filter((p) => p.status === 'approved').length,
      published: presentations.filter((p) => p.status === 'published').length,
    };
  }, [presentations]);

  const progressPercent = stats.total > 0 
    ? Math.round(((stats.approved + stats.published) / stats.total) * 100) 
    : 0;

  if (isLoading || isLoadingGenerations) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  // Show GenerationManager if no generations exist OR if user toggled to it
  const hasNoGenerations = !generationsData || generationsData.length === 0;
  if (hasNoGenerations || showGenerationManager) {
    return (
      <div className="space-y-6">
        {!hasNoGenerations && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowGenerationManager(false)}>
              Volver al Dashboard
            </Button>
          </div>
        )}
        <GenerationManager
          onCreatePresentation={onCreatePresentation}
          onSelectPresentation={(presentationId) => {
            // Find the presentation and select it
            const pres = presentations?.find(p => p.id === presentationId);
            if (pres) onSelectPresentation(pres);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setShowGenerationManager(true)}>
          <Settings className="mr-2 h-4 w-4" />
          Gestionar Generaciones
        </Button>
      </div>

      {/* Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-muted">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-muted-foreground">{stats.draft}</div>
            <div className="text-sm text-muted-foreground">Borradores</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-yellow-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-500">{stats.review}</div>
            <div className="text-sm text-muted-foreground">En Revisión</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-green-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
            <div className="text-sm text-muted-foreground">Aprobados</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-blue-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-500">{stats.published}</div>
            <div className="text-sm text-muted-foreground">Publicados</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso General</span>
            <span className="text-sm text-muted-foreground">
              {stats.approved + stats.published} / {stats.total} clases listas
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o responsable..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedGeneration} onValueChange={setSelectedGeneration}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Generación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las generaciones</SelectItem>
            {generationOptions.map((gen) => (
              <SelectItem key={gen.id} value={gen.id}>
                {gen.code} - {gen.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PresentationStatus | 'all')}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="draft">Borrador</SelectItem>
            <SelectItem value="review">En Revisión</SelectItem>
            <SelectItem value="approved">Aprobado</SelectItem>
            <SelectItem value="published">Publicado</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Presentations Grid/List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="by-generation">Por Generación</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                  : 'space-y-2'
              )}
            >
              {filteredPresentations.map((presentation, index) => (
                <PresentationCard
                  key={presentation.id}
                  presentation={presentation}
                  viewMode={viewMode}
                  index={index}
                  onClick={() => onSelectPresentation(presentation)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPresentations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay presentaciones que coincidan con los filtros</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="by-generation">
          <div className="space-y-8">
            {Object.entries(groupedByGeneration).map(([genCode, presos]) => (
              <div key={genCode}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-primary">{genCode}</span>
                  <span className="text-sm text-muted-foreground font-normal">
                    ({presos.length} presentaciones)
                  </span>
                </h3>
                <div className={cn(
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    : 'space-y-2'
                )}>
                  {presos.map((presentation, index) => (
                    <PresentationCard
                      key={presentation.id}
                      presentation={presentation}
                      viewMode={viewMode}
                      index={index}
                      onClick={() => onSelectPresentation(presentation)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface PresentationCardProps {
  presentation: PresentationWithClass;
  viewMode: 'grid' | 'list';
  index: number;
  onClick: () => void;
}

function PresentationCard({ presentation, viewMode, index, onClick }: PresentationCardProps) {
  const { classes } = presentation;

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
      >
        <Card 
          className="glass-card hover:border-primary/50 transition-all cursor-pointer group"
          onClick={onClick}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold">
              {classes?.class_number || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{classes?.title}</div>
              <div className="text-sm text-muted-foreground">
                {classes?.generations?.code}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {presentation.assigned_to && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="h-3 w-3" />
                  {presentation.assigned_to}
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {presentation.duration_estimate} min
              </div>
              <PresentationStatusBadge status={presentation.status as PresentationStatus} />
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        className="glass-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group h-full"
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold text-lg">
                {classes?.class_number || '?'}
              </div>
              <div>
                <CardTitle className="text-base line-clamp-1">{classes?.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{classes?.generations?.code}</p>
              </div>
            </div>
            <PresentationStatusBadge status={presentation.status as PresentationStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {presentation.key_points && presentation.key_points.length > 0 && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">{presentation.key_points.length}</span> puntos clave
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {presentation.duration_estimate} min
              </div>
              {presentation.assigned_to && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <User className="h-3 w-3" />
                  {presentation.assigned_to}
                </div>
              )}
            </div>
            {(presentation as any).slides?.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/admin/presentations`, '_blank');
                }}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Play className="h-3 w-3" />
                Ver presentación
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
