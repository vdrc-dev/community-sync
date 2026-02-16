import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { useWorkflows } from '@/hooks/useWorkflows';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { SearchInput } from '@/components/ui/search-input';
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
  Clock,
  Target,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Zap,
  Shield,
  Brain,
  Palette,
  Code2,
  BarChart3,
} from 'lucide-react';

export default function Workflows() {
  const { user } = useAuth();
  const { workflows, userProgress, isLoading, getWorkflowProgress, stats } = useWorkflows();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    workflows?.forEach(w => {
      if (w.category) cats.add(w.category);
    });
    return Array.from(cats);
  }, [workflows]);

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
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-64 rounded-xl" />)}
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
          description="Guias paso a paso con prompts listos para ejecutar. Cada workflow incluye plantillas IA, ejercicios practicos, y tracking de progreso."
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

        {/* Premium Stats Cards */}
        {user && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          >
            {[
              { icon: Workflow, value: stats.total, label: 'Disponibles', sub: 'workflows', color: 'from-primary/20 to-primary/5', iconColor: 'text-primary', borderColor: 'border-primary/20' },
              { icon: Play, value: stats.inProgress, label: 'En progreso', sub: stats.inProgress > 0 ? 'activos ahora' : '', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400', borderColor: 'border-blue-500/20' },
              { icon: CheckCircle2, value: stats.completed, label: 'Completados', sub: stats.completed > 0 ? '🔥 ¡Sigue así!' : '', color: 'from-green-500/20 to-green-500/5', iconColor: 'text-green-400', borderColor: 'border-green-500/20' },
              { icon: TrendingUp, value: totalTimeSaved, label: 'Min ahorrados', sub: '/mes estimado', color: 'from-yellow-500/20 to-yellow-500/5', iconColor: 'text-yellow-400', borderColor: 'border-yellow-500/20' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`relative group rounded-xl bg-gradient-to-br ${stat.color} border ${stat.borderColor} p-4 overflow-hidden hover:scale-[1.02] transition-transform`}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.6 }}
                />
                <div className="relative flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center ${stat.iconColor}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    {stat.sub && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.sub}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Category Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6"
        >
          {[
            { label: 'Higiene Digital', icon: Shield, hue: 200, cat: 'Higiene Digital' },
            { label: 'IA & Productividad', icon: Brain, hue: 263, cat: 'IA & Productividad' },
            { label: 'Presentaciones', icon: Palette, hue: 340, cat: 'Presentaciones' },
            { label: 'Vibe Coding', icon: Code2, hue: 160, cat: 'Vibe Coding' },
            { label: 'Automatizacion', icon: Zap, hue: 45, cat: 'Automatizacion' },
            { label: 'Todas', icon: Workflow, hue: 0, cat: 'all' },
          ].map((c, i) => {
            const isActive = categoryFilter === c.cat || (c.cat === 'all' && categoryFilter === 'all');
            return (
              <motion.button
                key={c.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.03 }}
                onClick={() => setCategoryFilter(c.cat === 'all' ? 'all' : (categoryFilter === c.cat ? 'all' : c.cat))}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-mono transition-all"
                style={{
                  background: isActive ? `hsl(${c.hue} 40% 50% / 0.12)` : 'hsl(0 0% 100% / 0.02)',
                  borderColor: isActive ? `hsl(${c.hue} 50% 50% / 0.25)` : 'hsl(0 0% 100% / 0.06)',
                  color: isActive ? `hsl(${c.hue} 60% 65%)` : undefined,
                }}
              >
                <c.icon className="w-3.5 h-3.5" />
                <span className="truncate">{c.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Educational Context */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-4 mb-6 border-primary/5"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-primary/50 uppercase tracking-wider mb-0.5">Como funcionan los workflows</p>
              <p className="text-sm text-foreground/70">
                Cada workflow tiene <strong className="text-foreground">prompts con variables</strong> que tu completas con tus datos reales. 
                Marca los pasos completados para trackear tu progreso. 
                Los workflows con <Sparkles className="w-3 h-3 inline text-yellow-400" /> son los mas recomendados para empezar.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3 mb-6"
        >
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar workflows..."
            className="flex-1"
            inputClassName="bg-muted/50 border-border/50 focus:border-primary/50"
          />

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

        {/* Active filter summary */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-mono"
          >
            <span>{filteredWorkflows.length} resultado{filteredWorkflows.length !== 1 ? 's' : ''}</span>
            {searchQuery && (
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 gap-1">
                &ldquo;{searchQuery}&rdquo;
              </Badge>
            )}
            <button
              onClick={clearFilters}
              className="text-primary hover:text-primary/80 transition-colors ml-auto"
            >
              Limpiar todo
            </button>
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-muted/70 p-1 border border-border/30 w-full sm:w-auto overflow-x-auto">
            <TabsTrigger value="all" className="gap-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Target className="w-3 h-3" />
              <span className="hidden sm:inline">Todos</span>
              <Badge variant="secondary" className="ml-1 bg-background/50 text-xs">
                {workflows?.length || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="gap-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Play className="w-3 h-3" />
              <span className="hidden sm:inline">En progreso</span>
              {stats.inProgress > 0 && (
                <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary text-xs">
                  {stats.inProgress}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <CheckCircle2 className="w-3 h-3" />
              <span className="hidden sm:inline">Completados</span>
              {stats.completed > 0 && (
                <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary text-xs">
                  {stats.completed}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="not-started" className="gap-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Clock className="w-3 h-3" />
              <span className="hidden sm:inline">Sin empezar</span>
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
