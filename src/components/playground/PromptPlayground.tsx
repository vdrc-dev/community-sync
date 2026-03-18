import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePromptPlayground, AVAILABLE_MODELS, PROMPT_TEMPLATES } from '@/hooks/usePromptPlayground';
import { TokenCounter } from './TokenCounter';
import { Play, Square, Copy, Trash2, Bookmark, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ExecutionResult {
  id: string;
  prompt: string;
  response: string;
  model: string;
  timestamp: Date;
}

export function PromptPlayground() {
  const { user } = useAuth();
  const { executePrompt, cancelRequest, isLoading, error } = usePromptPlayground();
  
  const [prompt, setPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [currentResponse, setCurrentResponse] = useState('');
  const [history, setHistory] = useState<ExecutionResult[]>([]);
  const [activeTab, setActiveTab] = useState('editor');
  
  const responseRef = useRef<HTMLDivElement>(null);

  // Scroll response into view
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [currentResponse]);

  // Load prompt from generator if passed via sessionStorage
  useEffect(() => {
    const storedPrompt = sessionStorage.getItem('playground_prompt');
    if (storedPrompt) {
      setPrompt(storedPrompt);
      sessionStorage.removeItem('playground_prompt');
    }
  }, []);

  const handleExecute = async () => {
    if (!prompt.trim()) {
      toast.error('Escribe un prompt primero');
      return;
    }

    setCurrentResponse('');
    setActiveTab('response');

    try {
      const fullResponse = await executePrompt(
        prompt,
        selectedModel,
        systemPrompt || undefined,
        (delta) => {
          setCurrentResponse(prev => prev + delta);
        }
      );

      const result: ExecutionResult = {
        id: crypto.randomUUID(),
        prompt,
        response: fullResponse,
        model: selectedModel,
        timestamp: new Date(),
      };
      setHistory(prev => [result, ...prev].slice(0, 20));
      toast.success('Prompt ejecutado correctamente');
    } catch (err) {
      toast.error(error || 'Error al ejecutar el prompt');
    }
  };

  const handleUseTemplate = (template: typeof PROMPT_TEMPLATES[0]) => {
    setPrompt(template.prompt);
    toast.info(`Template "${template.name}" cargado. Reemplaza las variables {{...}}`);
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(currentResponse);
    toast.success('Respuesta copiada al portapapeles');
  };

  const handleSaveToLibrary = async () => {
    if (!user || !prompt.trim()) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from('prompt_library') as any).insert({
        title: prompt.slice(0, 50) + (prompt.length > 50 ? '...' : ''),
        prompt_text: prompt,
        description: `Prompt probado con ${AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name}`,
        created_by: user.id,
        is_public: false,
      });

      if (error) throw error;
      toast.success('Prompt guardado en tu biblioteca');
    } catch {
      toast.error('Error al guardar el prompt');
    }
  };

  const modelInfo = AVAILABLE_MODELS.find(m => m.id === selectedModel);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Editor */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Playground de Prompts
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_MODELS.map(model => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col">
                          <span>{model.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {modelInfo && (
              <p className="text-sm text-muted-foreground">{modelInfo.description}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="response">
                  Respuesta
                  {isLoading && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    System Prompt (opcional)
                  </label>
                  <Textarea
                    placeholder="Define el comportamiento del modelo... (ej: Eres un experto en marketing)"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="min-h-[80px] font-mono text-sm"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">
                      Tu Prompt
                    </label>
                    <TokenCounter text={prompt} systemPrompt={systemPrompt} />
                  </div>
                  <Textarea
                    placeholder="Escribe tu prompt aquí... Usa {{VARIABLE}} para variables personalizables"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  {isLoading ? (
                    <Button onClick={cancelRequest} variant="destructive">
                      <Square className="mr-2 h-4 w-4" />
                      Detener
                    </Button>
                  ) : (
                    <Button onClick={handleExecute} disabled={!prompt.trim()}>
                      <Play className="mr-2 h-4 w-4" />
                      Ejecutar
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={() => setPrompt('')}
                    disabled={!prompt.trim()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpiar
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="response">
                <div
                  ref={responseRef}
                  className="min-h-[300px] max-h-[500px] overflow-y-auto p-4 bg-muted/50 rounded-lg font-mono text-sm whitespace-pre-wrap"
                >
                  {currentResponse || (
                    <span className="text-muted-foreground">
                      {isLoading ? 'Generando respuesta...' : 'La respuesta aparecerá aquí'}
                    </span>
                  )}
                </div>
                
                {currentResponse && (
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={handleCopyResponse}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    {user && (
                      <Button variant="outline" size="sm" onClick={handleSaveToLibrary}>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Guardar Prompt
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* History */}
        {history.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Historial de Ejecuciones</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => {
                        setPrompt(item.prompt);
                        setCurrentResponse(item.response);
                        setSelectedModel(item.model);
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="text-xs">
                          {AVAILABLE_MODELS.find(m => m.id === item.model)?.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {item.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm line-clamp-2">{item.prompt}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Panel - Templates */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {PROMPT_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleUseTemplate(template)}
                  className="w-full p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{template.icon}</span>
                    <span className="font-medium text-sm">{template.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map(v => (
                      <Badge key={v} variant="secondary" className="text-xs">
                        {`{{${v}}}`}
                      </Badge>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>💡 Usa <code className="bg-muted px-1 rounded">{`{{VARIABLE}}`}</code> para crear prompts reutilizables.</p>
            <p>🎯 Sé específico sobre el formato de salida que esperas.</p>
            <p>📝 El System Prompt define la personalidad del modelo.</p>
            <p>⚡ Gemini Flash es ideal para pruebas rápidas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
