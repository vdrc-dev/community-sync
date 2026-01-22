import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkflows } from '@/hooks/useWorkflows';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { 
  Search, 
  Zap, 
  Clock, 
  CheckCircle2, 
  PlayCircle, 
  Workflow,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Workflows() {
  const { user } = useAuth();
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

  // Get a featured workflow (first not started one)
  const featuredWorkflow = notStartedWorkflows?.[0];

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
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <Badge variant="outline" className="mb-3 border-primary/50 bg-primary/5">
                <Workflow className="w-3 h-3 mr-1" />
                {workflows?.length || 0} workflows disponibles
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-mono font-bold mb-2">
                Workflows <span className="text-gradient">Interactivos</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Automatiza tareas complejas paso a paso. Ejecuta prompts en tiempo real 
                con variables personalizables.
              </p>
            </div>

            {user && featuredWorkflow && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link to={`/workflows/${featuredWorkflow.id}`}>
                  <Card className="glass border-primary/30 hover:border-primary/50 transition-all w-full lg:w-80 group">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-xs text-primary mb-2">
                        <Sparkles className="w-3 h-3" />
                        Recomendado para ti
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                        {featuredWorkflow.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {featuredWorkflow.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {featuredWorkflow.steps?.length || 0} pasos
                        </Badge>
                        <span className="text-sm text-primary flex items-center gap-1">
                          Comenzar <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { 
              icon: Zap, 
              value: stats.total, 
              label: 'Workflows', 
              color: 'text-primary', 
              bg: 'bg-primary/10',
              border: 'border-primary/20'
            },
            { 
              icon: PlayCircle, 
              value: stats.inProgress, 
              label: 'En progreso', 
              color: 'text-blue-400', 
              bg: 'bg-blue-500/10',
              border: 'border-blue-500/20'
            },
            { 
              icon: CheckCircle2, 
              value: stats.completed, 
              label: 'Completados', 
              color: 'text-green-400', 
              bg: 'bg-green-500/10',
              border: 'border-green-500/20'
            },
            { 
              icon: Clock, 
              value: `${totalTimeSaved}`, 
              label: 'Min ahorrables/sem', 
              color: 'text-yellow-400', 
              bg: 'bg-yellow-500/10',
              border: 'border-yellow-500/20'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className={`glass ${stat.border}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, descripción o tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 bg-muted/50 border-border"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-12">
                <SelectValue placeholder="Dificultad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las dificultades</SelectItem>
                <SelectItem value="beginner">🟢 Principiante</SelectItem>
                <SelectItem value="intermediate">🟡 Intermedio</SelectItem>
                <SelectItem value="advanced">🔴 Avanzado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-12">
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
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="glass p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Todos ({filteredWorkflows?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <PlayCircle className="w-4 h-4 mr-1" />
              En progreso ({inProgressWorkflows?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Completados ({completedWorkflows?.length || 0})
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="all">
              {filteredWorkflows?.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="glass border-border/50">
                    <CardContent className="py-16 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                        <Search className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium mb-2">No se encontraron workflows</p>
                      <p className="text-muted-foreground mb-4">Prueba con otros filtros o términos</p>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSearch('');
                          setDifficultyFilter('all');
                          setCategoryFilter('all');
                        }}
                      >
                        Limpiar filtros
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredWorkflows?.map(workflow => (
                    <motion.div key={workflow.id} variants={itemVariants}>
                      <WorkflowCard
                        workflow={workflow}
                        progress={getWorkflowProgress(workflow.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="in-progress">
              {inProgressWorkflows?.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="glass border-border/50">
                    <CardContent className="py-16 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-blue-400" />
                      </div>
                      <p className="text-lg font-medium mb-2">No tienes workflows en progreso</p>
                      <p className="text-muted-foreground">Comienza uno nuevo para verlo aquí</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {inProgressWorkflows?.map(workflow => (
                    <motion.div key={workflow.id} variants={itemVariants}>
                      <WorkflowCard
                        workflow={workflow}
                        progress={getWorkflowProgress(workflow.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {completedWorkflows?.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="glass border-border/50">
                    <CardContent className="py-16 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                      </div>
                      <p className="text-lg font-medium mb-2">Aún no has completado ningún workflow</p>
                      <p className="text-muted-foreground">Termina un workflow para verlo aquí</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {completedWorkflows?.map(workflow => (
                    <motion.div key={workflow.id} variants={itemVariants}>
                      <WorkflowCard
                        workflow={workflow}
                        progress={getWorkflowProgress(workflow.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </Layout>
  );
}
