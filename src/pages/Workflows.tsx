import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkflows } from '@/hooks/useWorkflows';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { Search, Zap, Clock, CheckCircle2, PlayCircle, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Workflows() {
  const { workflows, userProgress, isLoading, getWorkflowProgress, stats } = useWorkflows();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Get unique categories
  const categories = [...new Set(workflows?.map(w => w.category).filter(Boolean))];

  // Filter workflows
  const filteredWorkflows = workflows?.filter(workflow => {
    const matchesSearch = 
      workflow.title.toLowerCase().includes(search.toLowerCase()) ||
      workflow.description?.toLowerCase().includes(search.toLowerCase()) ||
      workflow.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter === 'all' || workflow.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || workflow.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  // Separate by status
  const inProgressWorkflows = filteredWorkflows?.filter(w => {
    const progress = getWorkflowProgress(w.id);
    return progress && !progress.completed_at && (progress.completed_steps?.length || 0) > 0;
  });

  const completedWorkflows = filteredWorkflows?.filter(w => {
    const progress = getWorkflowProgress(w.id);
    return progress?.completed_at;
  });

  const notStartedWorkflows = filteredWorkflows?.filter(w => {
    const progress = getWorkflowProgress(w.id);
    return !progress || (progress.completed_steps?.length || 0) === 0;
  });

  // Calculate total time saved
  const totalTimeSaved = completedWorkflows?.reduce((acc, w) => acc + w.time_saved_per_use_minutes * 5, 0) || 0;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Workflows de Automatización</h1>
          <p className="text-muted-foreground">
            Aprende a automatizar tareas complejas paso a paso con herramientas de IA
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Workflows</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <PlayCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.inProgress}</p>
                  <p className="text-sm text-muted-foreground">En progreso</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                  <p className="text-sm text-muted-foreground">Completados</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalTimeSaved}</p>
                  <p className="text-sm text-muted-foreground">Min/semana ahorrables</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar workflows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Dificultad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las dificultades</SelectItem>
              <SelectItem value="beginner">Principiante</SelectItem>
              <SelectItem value="intermediate">Intermedio</SelectItem>
              <SelectItem value="advanced">Avanzado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat!}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              Todos ({filteredWorkflows?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              En progreso ({inProgressWorkflows?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completados ({completedWorkflows?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredWorkflows?.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No se encontraron workflows</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkflows?.map(workflow => (
                  <WorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    progress={getWorkflowProgress(workflow.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="in-progress">
            {inProgressWorkflows?.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No tienes workflows en progreso</p>
                  <Button variant="outline" className="mt-4" onClick={() => {}}>
                    Explora workflows
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressWorkflows?.map(workflow => (
                  <WorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    progress={getWorkflowProgress(workflow.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedWorkflows?.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Aún no has completado ningún workflow</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedWorkflows?.map(workflow => (
                  <WorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    progress={getWorkflowProgress(workflow.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
