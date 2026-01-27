import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { usePromptGenerator } from '@/hooks/usePromptPlayground';
import { Wand2, Copy, Bookmark, Loader2, Lightbulb, CheckCircle2, Play, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const TOOLS = [
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'perplexity', label: 'Perplexity' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'general', label: 'General (cualquier IA)' },
];

const TONES = [
  { value: 'profesional', label: 'Profesional' },
  { value: 'casual', label: 'Casual' },
  { value: 'academico', label: 'Académico' },
  { value: 'creativo', label: 'Creativo' },
  { value: 'tecnico', label: 'Técnico' },
];

const OUTPUT_FORMATS = [
  { value: 'texto', label: 'Texto libre' },
  { value: 'lista', label: 'Lista con puntos' },
  { value: 'tabla', label: 'Tabla' },
  { value: 'json', label: 'JSON estructurado' },
  { value: 'markdown', label: 'Markdown formateado' },
  { value: 'paso-a-paso', label: 'Paso a paso' },
];

interface GeneratedPrompt {
  prompt: string;
  techniques: string[];
  explanation: string;
  variables: string[];
  tips: string[];
}

export function PromptGenerator() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { generatePrompt, isLoading, error } = usePromptGenerator();
  
  const [objective, setObjective] = useState('');
  const [tool, setTool] = useState('general');
  const [context, setContext] = useState('');
  const [outputFormat, setOutputFormat] = useState('texto');
  const [tone, setTone] = useState('profesional');
  
  const [result, setResult] = useState<GeneratedPrompt | null>(null);

  const handleGenerate = async () => {
    if (!objective.trim()) {
      toast.error('Describe qué quieres lograr');
      return;
    }

    try {
      const generated = await generatePrompt({
        objective,
        tool: TOOLS.find(t => t.value === tool)?.label,
        context: context || undefined,
        outputFormat: OUTPUT_FORMATS.find(f => f.value === outputFormat)?.label,
        tone: TONES.find(t => t.value === tone)?.label,
      });
      setResult(generated);
      toast.success('Prompt generado con éxito');
    } catch {
      toast.error(error || 'Error al generar el prompt');
    }
  };

  const handleCopy = () => {
    if (result?.prompt) {
      navigator.clipboard.writeText(result.prompt);
      toast.success('Prompt copiado al portapapeles');
    }
  };

  const handleSave = async () => {
    if (!user || !result?.prompt) return;

    try {
      const { error } = await supabase.from('prompt_library').insert({
        title: objective.slice(0, 50) + (objective.length > 50 ? '...' : ''),
        prompt_text: result.prompt,
        description: result.explanation,
        tags: result.techniques,
        created_by: user.id,
        is_public: false,
      });

      if (error) throw error;
      toast.success('Prompt guardado en tu biblioteca');
    } catch {
      toast.error('Error al guardar el prompt');
    }
  };

  const handleUseInPlayground = () => {
    if (result?.prompt) {
      // Store prompt in sessionStorage to pass to playground
      sessionStorage.setItem('playground_prompt', result.prompt);
      navigate('/playground');
      toast.success('Prompt cargado en el Playground');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left - Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Generador de Prompts
          </CardTitle>
          <CardDescription>
            Describe tu objetivo y la IA creará un prompt optimizado usando técnicas avanzadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="objective">¿Qué quieres lograr? *</Label>
            <Textarea
              id="objective"
              placeholder="Ej: Quiero analizar datos de ventas y obtener insights actionables para mejorar mi negocio"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Herramienta destino</Label>
              <Select value={tool} onValueChange={setTool}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TOOLS.map(t => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tono</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map(t => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Formato de salida</Label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OUTPUT_FORMATS.map(f => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Contexto adicional (opcional)</Label>
            <Textarea
              id="context"
              placeholder="Información extra que ayude a personalizar el prompt..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !objective.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generar Prompt Optimizado
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Right - Result */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Prompt Generado
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              {/* Main Prompt */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm font-mono">
                  {result.prompt}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleUseInPlayground} size="sm" className="bg-gradient-to-r from-primary to-primary/80">
                  <Play className="mr-2 h-4 w-4" />
                  Usar en Playground
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
                <Button onClick={handleCopy} variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar
                </Button>
                {user && (
                  <Button onClick={handleSave} variant="outline" size="sm">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Guardar
                  </Button>
                )}
              </div>

              <Separator />

              {/* Techniques */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Técnicas aplicadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.techniques.map((tech, i) => (
                    <Badge key={i} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <h4 className="text-sm font-medium mb-2">Por qué funciona</h4>
                <p className="text-sm text-muted-foreground">{result.explanation}</p>
              </div>

              {/* Variables */}
              {result.variables.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Variables personalizables</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.variables.map((v, i) => (
                      <Badge key={i} variant="outline" className="font-mono">{v}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              {result.tips.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Tips adicionales</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {result.tips.map((tip, i) => (
                      <li key={i}>💡 {tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Completa el formulario y genera tu primer prompt optimizado</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
