import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Workflow, UserWorkflowProgress } from '@/hooks/useWorkflows';
import { 
  Clock, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Play,
  RotateCcw,
  Sparkles,
  Timer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkflowCardProps {
  workflow: Workflow;
  progress?: UserWorkflowProgress;
  onStart?: () => void;
}

const difficultyConfig = {
  beginner: { 
    label: 'Principiante', 
    color: 'bg-green-500/10 text-green-400 border-green-500/30',
    dot: 'bg-green-500'
  },
  intermediate: { 
    label: 'Intermedio', 
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    dot: 'bg-yellow-500'
  },
  advanced: { 
    label: 'Avanzado', 
    color: 'bg-red-500/10 text-red-400 border-red-500/30',
    dot: 'bg-red-500'
  },
};

export function WorkflowCard({ workflow, progress, onStart }: WorkflowCardProps) {
  const navigate = useNavigate();

  const completedSteps = progress?.completed_steps?.length || 0;
  const totalSteps = workflow.steps.length;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isCompleted = progress?.completed_at !== null && progress?.completed_at !== undefined;
  const isStarted = progress && completedSteps > 0;

  const weeklyTimeSaved = workflow.time_saved_per_use_minutes * 5;
  const difficulty = difficultyConfig[workflow.difficulty];
  
  // Estimate time to complete remaining steps (5 min per step average)
  const remainingTime = (totalSteps - completedSteps) * 5;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card
        className={`
          group cursor-pointer h-full card-premium glow-hover
          ${isCompleted ? 'border-green-500/30' : ''}
        `}
        onClick={() => navigate(`/workflows/${workflow.id}`)}
      >
        {/* Progress indicator bar */}
        {isStarted && !isCompleted && (
          <div className="h-1 bg-muted overflow-hidden">
            <motion.div 
              className="h-full progress-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        )}
        {isCompleted && (
          <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Icon with glow effect */}
              <div className="icon-glow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {workflow.icon_emoji}
                </div>
              </div>
              <div className="min-w-0">
                <CardTitle className="text-base font-semibold flex items-center gap-2 group-hover:text-primary transition-colors">
                  <span className="truncate">{workflow.title}</span>
                  {workflow.is_featured && (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                    </motion.div>
                  )}
                </CardTitle>
                {workflow.category && (
                  <Badge variant="outline" className="text-xs mt-1 bg-background/50 border-border/50">
                    {workflow.category}
                  </Badge>
                )}
              </div>
            </div>
            
            {isCompleted && (
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {workflow.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{workflow.time_to_setup_minutes}m setup</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/10 text-green-400">
              <Zap className="h-3 w-3" />
              <span>-{weeklyTimeSaved}m/sem</span>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${difficulty.color}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`} />
              <span>{difficulty.label}</span>
            </div>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="text-xs bg-muted/50">
              {totalSteps} pasos
            </Badge>
            {workflow.tools_used.slice(0, 2).map((tool, i) => (
              <Badge key={i} variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
                {tool}
              </Badge>
            ))}
            {workflow.tools_used.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{workflow.tools_used.length - 2}
              </Badge>
            )}
          </div>

          {/* Progress section */}
          {isStarted && !isCompleted && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  ~{remainingTime}m restantes
                </span>
                <span className="font-medium text-primary">{completedSteps}/{totalSteps}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full progress-gradient rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Action button */}
          <Button
            variant="outline"
            className={`
              w-full mt-2 transition-all duration-300 touch-target
              ${isCompleted 
                ? 'border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50' 
                : isStarted 
                  ? 'bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground' 
                  : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/workflows/${workflow.id}`);
            }}
          >
            {isCompleted ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Repetir
              </>
            ) : isStarted ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Continuar
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Comenzar
              </>
            )}
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
