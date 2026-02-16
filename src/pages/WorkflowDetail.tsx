import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { WorkflowSteps } from '@/components/workflows/WorkflowSteps';
import { MermaidDiagram } from '@/components/workflows/MermaidDiagram';
import { useWorkflows } from '@/hooks/useWorkflows';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Clock, 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  Star,
  Loader2,
  FileText,
  GitBranch,
  StickyNote,
  Info,
  Save
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const difficultyConfig = {
  beginner: { label: 'Principiante', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  intermediate: { label: 'Intermedio', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  advanced: { label: 'Avanzado', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

export default function WorkflowDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { workflows, isLoading, getWorkflowProgress, toggleStep, updateNotes, resetProgress } = useWorkflows();

  const workflow = workflows?.find(w => w.id === id);
  const progress = workflow ? getWorkflowProgress(workflow.id) : undefined;

  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (progress?.notes !== undefined) {
      setNotes(progress.notes || '');
    }
  }, [progress?.notes]);

  // Autosave notes
  useEffect(() => {
    if (!id || !user || notes === (progress?.notes || '')) return;

    setSaveStatus('saving');
    const timeout = setTimeout(() => {
      updateNotes.mutate(
        { workflowId: id, notes },
        {
          onSuccess: () => setSaveStatus('saved'),
          onError: () => setSaveStatus('idle'),
        }
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [notes, id, user]);

  useEffect(() => {
    if (saveStatus === 'saved') {
      const timeout = setTimeout(() => setSaveStatus('idle'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [saveStatus]);

  const isCompleted = progress?.completed_at !== null && progress?.completed_at !== undefined;

  useEffect(() => {
    if (isCompleted && !showConfetti) {
      setShowConfetti(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [isCompleted]);

  const completedSteps = progress?.completed_steps || [];
  const progressPercent = workflow ? (completedSteps.length / workflow.steps.length) * 100 : 0;

  const stats = useMemo(() => {
    if (!workflow) return null;
    return {
      setupTime: workflow.time_to_setup_minutes,
      weeklySaved: workflow.time_saved_per_use_minutes * 5,
      remainingSteps: workflow.steps.length - completedSteps.length,
      remainingTime: (workflow.steps.length - completedSteps.length) * 5,
    };
  }, [workflow, completedSteps]);

  const handleToggleStep = (stepNumber: number) => {
    if (!id || !user) {
      toast.error('Inicia sesión para guardar tu progreso');
      return;
    }
    toggleStep.mutate({ workflowId: id, stepNumber });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="page-container section-py">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-12 w-96 mb-8" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-96" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!workflow) {
    return (
      <Layout>
        <div className="page-container section-py flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4 max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/30 border border-white/[0.06] mx-auto">
              <FileText className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <h1 className="text-xl font-mono font-bold">Workflow no encontrado</h1>
            <p className="text-sm text-muted-foreground">
              Este workflow no existe o fue removido. Explora otros workflows disponibles.
            </p>
            <Button onClick={() => navigate('/workflows')} className="gap-2">
              Ver todos los workflows
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const difficulty = difficultyConfig[workflow.difficulty];

  return (
    <Layout>
      <div className="page-container section-py">
        <PageHeader
          title={
            <span className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl">{workflow.icon_emoji}</span>
              <span>{workflow.title}</span>
              {workflow.is_featured && (
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              )}
            </span>
          }
          description={workflow.description || undefined}
          breadcrumbs={[
            { label: 'Workflows', href: '/workflows' },
            { label: workflow.title }
          ]}
          showBack
          actions={
            <div className="flex items-center gap-2">
              {isCompleted && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Completado
                </Badge>
              )}
              {progress && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => resetProgress.mutate(workflow.id)}
                  disabled={resetProgress.isPending}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Reiniciar</span>
                </Button>
              )}
            </div>
          }
        />

        {user && (
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                Progreso: {completedSteps.length}/{workflow.steps.length} pasos
              </span>
              <span className="font-mono text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full progress-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <div className="stat-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs">Configuración</span>
            </div>
            <p className="text-xl font-bold font-mono">{stats?.setupTime}min</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs">Ahorro semanal</span>
            </div>
            <p className="text-xl font-bold font-mono text-green-400">{stats?.weeklySaved}min</p>
          </div>
          <div className="stat-card">
            <Badge className={`${difficulty.color} mb-2`}>{difficulty.label}</Badge>
            <p className="text-xs text-muted-foreground">{workflow.steps.length} pasos</p>
          </div>
          {stats && stats.remainingSteps > 0 && (
            <div className="stat-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Info className="w-4 h-4" />
                <span className="text-xs">Tiempo restante</span>
              </div>
              <p className="text-xl font-bold font-mono">~{stats.remainingTime}min</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="steps" className="lg:hidden">
              <TabsList className="w-full">
                <TabsTrigger value="steps" className="flex-1 gap-2">
                  <FileText className="w-4 h-4" />
                  Pasos
                </TabsTrigger>
                {workflow.mermaid_diagram && (
                  <TabsTrigger value="diagram" className="flex-1 gap-2">
                    <GitBranch className="w-4 h-4" />
                    Diagrama
                  </TabsTrigger>
                )}
                <TabsTrigger value="notes" className="flex-1 gap-2">
                  <StickyNote className="w-4 h-4" />
                  Notas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="steps" className="mt-4">
                <WorkflowSteps
                  steps={workflow.steps}
                  completedSteps={completedSteps}
                  onToggleStep={handleToggleStep}
                  isLoading={toggleStep.isPending}
                  workflowId={workflow.id}
                />
              </TabsContent>

              {workflow.mermaid_diagram && (
                <TabsContent value="diagram" className="mt-4">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-primary" />
                        Diagrama del Flujo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MermaidDiagram chart={workflow.mermaid_diagram} />
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              <TabsContent value="notes" className="mt-4">
                <Card className="glass">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <StickyNote className="w-5 h-5 text-primary" />
                        Mis Notas
                      </CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {saveStatus === 'saving' && (
                          <span className="flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Guardando...
                          </span>
                        )}
                        {saveStatus === 'saved' && (
                          <span className="flex items-center gap-1 text-green-500">
                            <Save className="w-3 h-3" /> Guardado
                          </span>
                        )}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Escribe tus notas personales sobre este workflow..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[150px] bg-muted/50"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="hidden lg:block">
              <WorkflowSteps
                steps={workflow.steps}
                completedSteps={completedSteps}
                onToggleStep={handleToggleStep}
                isLoading={toggleStep.isPending}
                workflowId={workflow.id}
              />
            </div>

            {workflow.mermaid_diagram && (
              <Card className="glass hidden lg:block">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-primary" />
                    Diagrama del Flujo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MermaidDiagram chart={workflow.mermaid_diagram} />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="hidden lg:block space-y-6">
            <div className="sticky top-24 space-y-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base">Herramientas Utilizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tools_used.map((tool, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/5 border-primary/20">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {workflow.tags && workflow.tags.length > 0 && (
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-base">Etiquetas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {workflow.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {user && (
                <Card className="glass">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <StickyNote className="w-4 h-4 text-primary" />
                        Mis Notas
                      </CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {saveStatus === 'saving' && (
                          <span className="flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Guardando...
                          </span>
                        )}
                        {saveStatus === 'saved' && (
                          <span className="flex items-center gap-1 text-green-500">
                            <Save className="w-3 h-3" /> Guardado
                          </span>
                        )}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Escribe tus notas personales..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[120px] bg-muted/50 text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Las notas se guardan automáticamente
                    </p>
                  </CardContent>
                </Card>
              )}

              {isCompleted && (
                <Card className="glass border-green-500/30 bg-green-500/5">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <h3 className="font-bold text-lg text-green-500 mb-2">
                      ¡Workflow Completado!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ahora puedes ahorrar {workflow.time_saved_per_use_minutes * 5} minutos cada semana.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
