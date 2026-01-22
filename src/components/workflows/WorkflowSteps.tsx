import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { WorkflowStep } from '@/hooks/useWorkflows';
import { WorkflowPromptExecutor } from './WorkflowPromptExecutor';
import { Copy, ChevronDown, ChevronUp, CheckCircle2, Lightbulb, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkflowStepsProps {
  steps: WorkflowStep[];
  completedSteps: number[];
  onToggleStep: (stepNumber: number) => void;
  isLoading?: boolean;
  workflowId: string;
}

export function WorkflowSteps({ steps, completedSteps, onToggleStep, isLoading, workflowId }: WorkflowStepsProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1]); // First step expanded by default

  const toggleExpand = (stepNumber: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepNumber)
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copiado al portapapeles');
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.step);
        const isExpanded = expandedSteps.includes(step.step);
        const isNextStep = !isCompleted && steps.slice(0, index).every(s => completedSteps.includes(s.step));

        return (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`transition-all duration-300 ${
              isCompleted 
                ? 'border-green-500/30 bg-green-500/5' 
                : isNextStep 
                  ? 'border-primary/50 ring-2 ring-primary/20' 
                  : ''
            }`}>
              <Collapsible open={isExpanded} onOpenChange={() => toggleExpand(step.step)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : isNextStep
                              ? 'border-primary text-primary'
                              : 'border-muted-foreground/30 text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span className="font-bold">{step.step}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className={`text-base ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {step.title}
                        </CardTitle>
                        {!isExpanded && (
                          <CardDescription className="line-clamp-1">
                            {step.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {step.prompt && (
                          <Badge variant="outline" className="text-xs">
                            <Lightbulb className="h-3 w-3 mr-1" />
                            Prompt
                          </Badge>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-4">
                    <Separator />
                    
                    <p className="text-muted-foreground">{step.description}</p>

                    {step.prompt && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Prompt interactivo</span>
                        </div>
                        <WorkflowPromptExecutor
                          prompt={step.prompt}
                          workflowId={workflowId}
                          stepNumber={step.step}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <label
                        htmlFor={`step-${step.step}`}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <Checkbox
                          id={`step-${step.step}`}
                          checked={isCompleted}
                          onCheckedChange={() => onToggleStep(step.step)}
                          disabled={isLoading}
                        />
                        <span className="text-sm font-medium">
                          {isCompleted ? 'Completado' : 'Marcar como completado'}
                        </span>
                      </label>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
