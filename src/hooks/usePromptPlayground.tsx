import { useState, useCallback, useRef } from 'react';

export interface PlaygroundMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: Date;
}

export interface PlaygroundModel {
  id: string;
  name: string;
  description: string;
}

export const AVAILABLE_MODELS: PlaygroundModel[] = [
  { id: 'google/gemini-3-flash-preview', name: 'Gemini 3 Flash', description: 'Rápido y balanceado' },
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Bueno para multimodal' },
  { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Máxima calidad' },
  { id: 'openai/gpt-5-mini', name: 'GPT-5 Mini', description: 'Buen balance costo/calidad' },
  { id: 'openai/gpt-5', name: 'GPT-5', description: 'Máxima precisión' },
];

export const PROMPT_TEMPLATES = [
  {
    id: 'summarize',
    name: 'Resumir Documento',
    icon: '📝',
    prompt: 'Resume el siguiente texto en 3 puntos clave, manteniendo la información más importante:\n\n{{TEXTO}}',
    variables: ['TEXTO'],
  },
  {
    id: 'analyze',
    name: 'Analizar Datos',
    icon: '📊',
    prompt: 'Analiza los siguientes datos y proporciona:\n1. Tendencias principales\n2. Anomalías detectadas\n3. Recomendaciones actionables\n\nDatos:\n{{DATOS}}',
    variables: ['DATOS'],
  },
  {
    id: 'brainstorm',
    name: 'Brainstorming',
    icon: '💡',
    prompt: 'Genera 10 ideas creativas y originales sobre: {{TEMA}}\n\nPara cada idea incluye:\n- Nombre corto\n- Descripción de 1 línea\n- Nivel de dificultad (fácil/medio/difícil)',
    variables: ['TEMA'],
  },
  {
    id: 'email',
    name: 'Escribir Email',
    icon: '✉️',
    prompt: 'Escribe un email profesional con las siguientes características:\n\nDestinatario: {{DESTINATARIO}}\nObjetivo: {{OBJETIVO}}\nTono: {{TONO}}\n\nEl email debe ser conciso, claro y con un call-to-action definido.',
    variables: ['DESTINATARIO', 'OBJETIVO', 'TONO'],
  },
  {
    id: 'code',
    name: 'Generar Código',
    icon: '💻',
    prompt: 'Escribe código en {{LENGUAJE}} que haga lo siguiente:\n\n{{DESCRIPCION}}\n\nRequisitos:\n- Código limpio y bien comentado\n- Manejo de errores\n- Ejemplos de uso',
    variables: ['LENGUAJE', 'DESCRIPCION'],
  },
  {
    id: 'translate',
    name: 'Traducir y Adaptar',
    icon: '🌍',
    prompt: 'Traduce el siguiente texto de {{IDIOMA_ORIGEN}} a {{IDIOMA_DESTINO}}, adaptando:\n- Expresiones culturales\n- Tono apropiado para el público objetivo\n- Formato y estructura\n\nTexto:\n{{TEXTO}}',
    variables: ['IDIOMA_ORIGEN', 'IDIOMA_DESTINO', 'TEXTO'],
  },
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function usePromptPlayground() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const executePrompt = useCallback(async (
    prompt: string,
    model: string,
    systemPrompt?: string,
    onDelta?: (text: string) => void
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    let fullResponse = '';

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/prompt-playground`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, model, systemPrompt }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResponse += content;
              onDelta?.(content);
            }
          } catch {
            // Incomplete JSON, put back and wait
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Flush remaining buffer
      if (buffer.trim()) {
        for (let raw of buffer.split('\n')) {
          if (!raw || raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResponse += content;
              onDelta?.(content);
            }
          } catch { /* ignore */ }
        }
      }

      return fullResponse;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return fullResponse;
      }
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    executePrompt,
    cancelRequest,
    isLoading,
    error,
  };
}

export function usePromptGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface GeneratedPrompt {
    prompt: string;
    techniques: string[];
    explanation: string;
    variables: string[];
    tips: string[];
  }

  const generatePrompt = useCallback(async (params: {
    objective: string;
    tool?: string;
    context?: string;
    outputFormat?: string;
    tone?: string;
  }): Promise<GeneratedPrompt> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    generatePrompt,
    isLoading,
    error,
  };
}
