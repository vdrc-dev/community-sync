import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { useWorkflows } from '@/hooks/useWorkflows';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Workflow, 
  CheckCircle2, 
  Play,
  Sparkles,
  Filter,
  TrendingUp,
  Loader2
} from 'lucide-react';

export default function Workflows() {
  const { user } = useAuth();
  const { workflows, userProgress, isLoading, getWorkflowProgress, stats } = useWorkflows();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    workflows?.forEach(w => {
      if (w.category) cats.add(w.category);
    });
    return Array.from(cats);
  }, [workflows]);

  // Filter workflows
  const filteredWorkflows = useMemo(() => {
    let result = workflows || [];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(w =>
        w.title.toLowerCase().includes(query) ||
        w.description?.toLowerCase().includes(query) ||
        w.tags?.some(t => t.toLowerCase().includes(query))
      );
    }

    if (difficultyFilter !== 'all') {
      result = result.filter(w => w.difficulty === difficultyFilter);
    }

    if (categoryFilter !== 'all') {
      result = result.filter(w => w.category === categoryFilter);
    }

    if (activeTab === 'in-progress') {
      result = result.filter(w => {
        const progress = getWorkflowProgress(w.id);
        return progress && !progress.completed_at && (progress.completed_steps?.length || 0) > 0;
      });
    } else if (activeTab === 'completed') {
      result = result.filter(w => {
        const progress = getWorkflowProgress(w.id);
        return progress?.completed_at;
      });
    } else if (activeTab === 'not-started') {
      result = result.filter(w => !getWorkflowProgress(w.id));
    }

    return result;
  }, [workflows, searchQuery, difficultyFilter, categoryFilter, activeTab, getWorkflowProgress]);

  const featuredWorkflow = workflows?.find(w => w.is_featured);

  const totalTimeSaved = useMemo(() => {
    let total = 0;
    userProgress?.forEach(p => {
      if (p.completed_at) {
        const workflow = workflows?.find(w => w.id === p.workflow_id);
        if (workflow) {
          total += workflow.time_saved_per_use_minutes * 4;
        }
      }
    });
    return total;
  }, [userProgress, workflows]);

  const clearFilters = () => {
    setSearchQuery('');
    setDifficultyFilter('all');
    setCategoryFilter('all');
  };

  const hasActiveFilters = searchQuery || difficultyFilter !== 'all' || categoryFilter !== 'all';

  const FilterControls = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={vertical ? 'space-y-4' : 'flex gap-2'}>
      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
        <SelectTrigger className={vertical ? 'w-full' : 'w-[140px]'}>
          <SelectValue placeholder="Dificultad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="beginner">Principiante</SelectItem>
          <SelectItem value="intermediate">Intermedio</SelectItem>
          <SelectItem value="advanced">Avanzado</SelectItem>
        </SelectContent>
      </Select>

      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className={vertical ? 'w-full' : 'w-[160px]'}>
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categories.map(cat => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className={vertical ? 'w-full' : ''}>
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="page-container section-py">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-64" />)}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container section-py">
        <PageHeader
          title={<>Workflows <span className="text-gradient">Interactivos</span></>}
          description="Automatiza tareas complejas paso a paso con guías interactivas"
          badge={{ 
            label: `${workflows?.length || 0} workflows`, 
            icon: <Workflow className="w-3 h-3" /> 
          }}
          breadcrumbs={[{ label: 'Workflows' }]}
          actions={
            featuredWorkflow && (
              <Link to={`/workflows/${featuredWorkflow.id}`}>
                <Button variant="outline" size="sm" className="gap-2 glow-hover hidden sm:flex">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="hidden md:inline">Recomendado:</span>
                  <span className="max-w-[120px] truncate">{featuredWorkflow.title}</span>
                </Button>
              </Link>
            )
          }
        />

        {user && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          >
            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Disponibles</p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Play className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{stats.inProgress}</p>
                  <p className="text-xs text-muted-foreground">En progreso</p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{stats.completed}</p>
                  <p className="text-xs text-muted-foreground">Completados</p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{totalTimeSaved}</p>
                  <p className="text-xs text-muted-foreground">Min ahorrados/mes</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>

          <div className="hidden sm:flex gap-2">
            <FilterControls />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="sm:hidden shrink-0 relative">
                <Filter className="w-4 h-4" />
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <FilterControls vertical />
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="all" className="gap-2">
              Todos
              <Badge variant="secondary" className="ml-1 bg-background/50 text-xs">
                {workflows?.length || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="gap-2">
              <span className="hidden sm:inline">En progreso</span>
              <span className="sm:hidden">Activos</span>
              {stats.inProgress > 0 && (
                <Badge variant="secondary" className="ml-1 bg-blue-500/20 text-blue-400 text-xs">
                  {stats.inProgress}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <span className="hidden sm:inline">Completados</span>
              <span className="sm:hidden">✓</span>
              {stats.completed > 0 && (
                <Badge variant="secondary" className="ml-1 bg-green-500/20 text-green-400 text-xs">
                  {stats.completed}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="not-started" className="hidden sm:flex">
              Sin empezar
            </TabsTrigger>
          </TabsList>

          {filteredWorkflows.length === 0 ? (
            <div className="py-12">
              <EmptyState
                icon={Workflow}
                title={activeTab === 'all' ? 'No hay workflows' : 'Sin resultados'}
                description={
                  hasActiveFilters 
                    ? 'No se encontraron workflows con los filtros aplicados' 
                    : activeTab === 'in-progress'
                      ? 'Aún no has comenzado ningún workflow'
                      : activeTab === 'completed'
                        ? 'Aún no has completado ningún workflow'
                        : 'No hay workflows disponibles'
                }
                action={hasActiveFilters ? {
                  label: 'Limpiar filtros',
                  onClick: clearFilters
                } : undefined}
              />
            </div>
          ) : (
            <TabsContent value={activeTab} className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredWorkflows.map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * Math.min(index, 8) }}
                  >
                    <WorkflowCard
                      workflow={workflow}
                      progress={getWorkflowProgress(workflow.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
