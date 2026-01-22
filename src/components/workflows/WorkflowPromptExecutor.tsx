import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWorkflowExecutions, WorkflowExecution } from '@/hooks/useWorkflowExecutions';
import { useAuth } from '@/hooks/useAuth';
import { 
  Play, 
  Copy, 
  Loader2, 
  Sparkles, 
  Clock, 
  History,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface WorkflowPromptExecutorProps {
  prompt: string;
  workflowId: string;
  stepNumber: number;
}

// Extract variables from prompt ({{VARIABLE}})
function extractVariables(prompt: string): string[] {
  const regex = /\{\{([A-Z_]+)\}\}/g;
  const matches = [...prompt.matchAll(regex)];
  const uniqueVars = [...new Set(matches.map(m => m[1]))];
  return uniqueVars;
}

export function WorkflowPromptExecutor({ prompt, workflowId, stepNumber }: WorkflowPromptExecutorProps) {
  const { user } = useAuth();
  const { 
    executePrompt, 
    isExecuting, 
    currentResponse, 
    getLatestExecution,
    executions 
  } = useWorkflowExecutions(workflowId);

  const variables = useMemo(() => extractVariables(prompt), [prompt]);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  // Get step-specific executions
  const stepExecutions = useMemo(() => 
    executions?.filter(e => e.step_number === stepNumber) || [],
    [executions, stepNumber]
  );

  // Load latest execution on mount
  useEffect(() => {
    const latest = getLatestExecution(stepNumber);
    if (latest) {
      setResponse(latest.ai_response);
      // Restore variable values if available
      if (latest.variables && typeof latest.variables === 'object') {
        setVariableValues(latest.variables as Record<string, string>);
      }
    }
  }, [stepNumber, getLatestExecution]);

  // Update response during streaming
  useEffect(() => {
    if (isExecuting && currentResponse) {
      setResponse(currentResponse);
    }
  }, [currentResponse, isExecuting]);

  // Auto-scroll during streaming
  useEffect(() => {
    if (isExecuting && responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response, isExecuting]);

  const handleVariableChange = (variable: string, value: string) => {
    setVariableValues(prev => ({ ...prev, [variable]: value }));
  };

  const handleExecute = async () => {
    if (!user) {
      toast.error('Inicia sesión para ejecutar prompts');
      return;
    }

    // Check all variables are filled
    const missingVars = variables.filter(v => !variableValues[v]?.trim());
    if (missingVars.length > 0) {
      toast.error(`Completa las variables: ${missingVars.join(', ')}`);
      return;
    }

    setResponse('');

    try {
      await executePrompt({
        prompt,
        variables: variableValues,
        workflowId,
        stepNumber,
        onDelta: () => {}, // We use the hook's currentResponse for streaming UI
      });
      
      toast.success('¡Prompt ejecutado exitosamente!');
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    toast.success('Respuesta copiada');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPrompt = () => {
    let processedPrompt = prompt;
    for (const [key, value] of Object.entries(variableValues)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'gi');
      processedPrompt = processedPrompt.replace(regex, value || `{{${key}}}`);
    }
    navigator.clipboard.writeText(processedPrompt);
    toast.success('Prompt copiado');
  };

  const handleLoadExecution = (execution: WorkflowExecution) => {
    setResponse(execution.ai_response);
    if (execution.variables && typeof execution.variables === 'object') {
      setVariableValues(execution.variables as Record<string, string>);
    }
    setShowHistory(false);
    toast.success('Ejecución cargada');
  };

  const handleReset = () => {
    setResponse('');
    setVariableValues({});
  };

  return (
    <div className="space-y-4">
      {/* Variable Inputs */}
      {variables.length > 0 && (
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Variables del prompt
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {variables.map((variable) => (
              <div key={variable} className="space-y-1.5">
                <Label htmlFor={variable} className="text-xs font-mono">
                  {`{{${variable}}}`}
                </Label>
                <Input
                  id={variable}
                  placeholder={`Ingresa ${variable.toLowerCase().replace(/_/g, ' ')}`}
                  value={variableValues[variable] || ''}
                  onChange={(e) => handleVariableChange(variable, e.target.value)}
                  disabled={isExecuting}
                  className="h-9"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Preview */}
      <div className="relative">
        <pre className="p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap font-mono overflow-x-auto border">
          {prompt.split(/(\{\{[A-Z_]+\}\})/g).map((part, i) => {
            const match = part.match(/\{\{([A-Z_]+)\}\}/);
            if (match) {
              const value = variableValues[match[1]];
              return (
                <span
                  key={i}
                  className={value ? 'text-primary font-semibold' : 'text-yellow-600 dark:text-yellow-400'}
                >
                  {value || part}
                </span>
              );
            }
            return part;
          })}
        </pre>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyPrompt}
          className="absolute top-2 right-2"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleExecute}
          disabled={isExecuting || !user}
          className="gap-2"
        >
          {isExecuting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Ejecutar con IA
            </>
          )}
        </Button>

        {response && (
          <>
            <Button variant="outline" size="icon" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </>
        )}

        {stepExecutions.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="ml-auto gap-2"
          >
            <History className="h-4 w-4" />
            Historial ({stepExecutions.length})
            {showHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Execution History */}
      <AnimatePresence>
        {showHistory && stepExecutions.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-dashed">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Ejecuciones anteriores</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <ScrollArea className="max-h-48">
                  <div className="space-y-2">
                    {stepExecutions.slice(0, 5).map((execution) => (
                      <button
                        key={execution.id}
                        onClick={() => handleLoadExecution(execution)}
                        className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors border"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(execution.created_at), { 
                              addSuffix: true, 
                              locale: es 
                            })}
                          </div>
                          {execution.execution_time_ms && (
                            <Badge variant="secondary" className="text-xs">
                              {execution.execution_time_ms}ms
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm line-clamp-2">{execution.ai_response}</p>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Response */}
      <AnimatePresence>
        {(response || isExecuting) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="py-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm font-medium">Respuesta de IA</CardTitle>
                  {isExecuting && (
                    <Badge variant="secondary" className="animate-pulse">
                      Generando...
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="py-4">
                <ScrollArea className="max-h-96" ref={responseRef}>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {response ? (
                      <div className="whitespace-pre-wrap">{response}</div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Esperando respuesta...
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!user && (
        <p className="text-xs text-muted-foreground text-center py-2">
          💡 Inicia sesión para ejecutar prompts y guardar tu historial
        </p>
      )}
    </div>
  );
}
