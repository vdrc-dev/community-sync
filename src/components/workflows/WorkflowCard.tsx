import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Workflow, UserWorkflowProgress } from '@/hooks/useWorkflows';
import { Clock, Zap, ChevronRight, CheckCircle2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkflowCardProps {
  workflow: Workflow;
  progress?: UserWorkflowProgress;
  onStart?: () => void;
}

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

export function WorkflowCard({ workflow, progress, onStart }: WorkflowCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const completedSteps = progress?.completed_steps?.length || 0;
  const totalSteps = workflow.steps.length;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isCompleted = progress?.completed_at !== null && progress?.completed_at !== undefined;
  const isStarted = progress && completedSteps > 0;

  const weeklyTimeSaved = workflow.time_saved_per_use_minutes * 5; // Assuming 5 uses per week

  return (
    <Card
      className={`group cursor-pointer transition-all duration-300 hover:border-primary/50 ${
        isCompleted ? 'border-green-500/30 bg-green-500/5' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/workflows/${workflow.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{workflow.icon_emoji}</div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {workflow.title}
                {workflow.is_featured && (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                )}
              </CardTitle>
              {workflow.category && (
                <span className="text-sm text-muted-foreground">{workflow.category}</span>
              )}
            </div>
          </div>
          {isCompleted && (
            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {workflow.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{workflow.time_to_setup_minutes} min setup</span>
          </div>
          <div className="flex items-center gap-1 text-green-500">
            <Zap className="h-4 w-4" />
            <span>Ahorra {weeklyTimeSaved} min/semana</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={difficultyColors[workflow.difficulty]}>
            {difficultyLabels[workflow.difficulty]}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            {totalSteps} pasos
          </Badge>
        </div>

        {/* Progress */}
        {isStarted && !isCompleted && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium">{completedSteps}/{totalSteps} pasos</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        )}

        {/* Tools */}
        {workflow.tools_used.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {workflow.tools_used.slice(0, 4).map((tool, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {tool}
              </Badge>
            ))}
            {workflow.tools_used.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{workflow.tools_used.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Action */}
        <div className="pt-2">
          <Button
            variant={isCompleted ? 'outline' : isStarted ? 'default' : 'outline'}
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workflows/${workflow.id}`);
            }}
          >
            {isCompleted ? 'Ver de nuevo' : isStarted ? 'Continuar' : 'Comenzar'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
