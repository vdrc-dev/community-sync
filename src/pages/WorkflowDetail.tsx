import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useWorkflows } from '@/hooks/useWorkflows';
import { MermaidDiagram } from '@/components/workflows/MermaidDiagram';
import { WorkflowSteps } from '@/components/workflows/WorkflowSteps';
import { useAuth } from '@/hooks/useAuth';
import { 
  ArrowLeft, Clock, Zap, CheckCircle2, RotateCcw, 
  Star, Share2, Bookmark, ExternalLink 
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const difficultyColors = {
  beginner: 'bg-green-500/10 text-green-500 border-green-500/30',
  intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  advanced: 'bg-red-500/10 text-red-500 border-red-500/30',
};

const difficultyLabels = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

export default function WorkflowDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    workflows, 
    getWorkflowProgress, 
    toggleStep, 
    updateNotes, 
    resetProgress,
    isLoading 
  } = useWorkflows();

  const [notes, setNotes] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const workflow = workflows?.find(w => w.id === id);
  const progress = id ? getWorkflowProgress(id) : undefined;

  const completedSteps = progress?.completed_steps || [];
  const totalSteps = workflow?.steps.length || 0;
  const progressPercent = totalSteps > 0 ? (completedSteps.length / totalSteps) * 100 : 0;
  const isCompleted = progress?.completed_at !== null && progress?.completed_at !== undefined;

  useEffect(() => {
    if (progress?.notes) {
      setNotes(progress.notes);
    }
  }, [progress?.notes]);

  useEffect(() => {
    if (isCompleted && !showConfetti) {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isCompleted]);

  const handleToggleStep = (stepNumber: number) => {
    if (!id || !user) {
      toast.error('Inicia sesión para guardar tu progreso');
      return;
    }
    toggleStep.mutate({ workflowId: id, stepNumber });
  };

  const handleSaveNotes = () => {
    if (!id || !user) return;
    updateNotes.mutate({ workflowId: id, notes });
    toast.success('Notas guardadas');
  };

  const handleReset = () => {
    if (!id) return;
    if (confirm('¿Estás seguro de reiniciar tu progreso en este workflow?')) {
      resetProgress.mutate(id);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado al portapapeles');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-96" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64" />
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
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Workflow no encontrado</p>
              <Button onClick={() => navigate('/workflows')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Workflows
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/workflows')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Todos los Workflows
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{workflow.icon_emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-2xl">{workflow.title}</CardTitle>
                        {workflow.is_featured && (
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        )}
                        {isCompleted && (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        )}
                      </div>
                      <CardDescription className="text-base">
                        {workflow.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge variant="outline" className={difficultyColors[workflow.difficulty]}>
                      {difficultyLabels[workflow.difficulty]}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{workflow.time_to_setup_minutes} min setup</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-500">
                      <Zap className="h-4 w-4" />
                      <span>Ahorra {workflow.time_saved_per_use_minutes * 5} min/semana</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tu progreso</span>
                      <span className="font-medium">{completedSteps.length}/{totalSteps} pasos</span>
                    </div>
                    <Progress value={progressPercent} className="h-3" />
                  </div>

                  {/* Tools */}
                  {workflow.tools_used.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Herramientas utilizadas:</p>
                      <div className="flex flex-wrap gap-2">
                        {workflow.tools_used.map((tool, i) => (
                          <Badge key={i} variant="secondary">{tool}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Mermaid Diagram */}
            {workflow.mermaid_diagram && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Flujo del Proceso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <MermaidDiagram chart={workflow.mermaid_diagram} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Pasos del Workflow</h2>
              <WorkflowSteps
                steps={workflow.steps}
                completedSteps={completedSteps}
                onToggleStep={handleToggleStep}
                isLoading={toggleStep.isPending}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir workflow
                </Button>
                {progress && (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleReset}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reiniciar progreso
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mis Notas</CardTitle>
                  <CardDescription>
                    Guarda observaciones personales sobre este workflow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Escribe tus notas aquí..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <Button
                    onClick={handleSaveNotes}
                    disabled={updateNotes.isPending}
                    className="w-full"
                  >
                    Guardar notas
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Completion celebration */}
            {isCompleted && (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="font-bold text-lg text-green-500 mb-2">
                    ¡Workflow Completado!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ahora puedes ahorrar {workflow.time_saved_per_use_minutes * 5} minutos cada semana con esta automatización.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {workflow.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Etiquetas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tags.map((tag, i) => (
                      <Badge key={i} variant="outline">#{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
