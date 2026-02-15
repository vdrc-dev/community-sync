import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_ORIGINS = [
  'https://comunidad-vdrc.vercel.app',
  'http://localhost:8080',
  'http://localhost:5173',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

const SYSTEM_PROMPT = `Eres un experto en ingeniería de prompts con años de experiencia optimizando interacciones con modelos de IA. Tu rol es crear prompts altamente efectivos usando técnicas avanzadas.

TÉCNICAS QUE DOMINAS:
1. **Chain of Thought (CoT)**: Guiar al modelo paso a paso
2. **Few-shot Learning**: Proporcionar ejemplos antes de la tarea
3. **Role-playing**: Asignar un rol específico al modelo
4. **Structured Output**: Definir formato exacto de respuesta
5. **Context Priming**: Establecer contexto relevante
6. **Constraint Setting**: Definir límites claros

FORMATO DE RESPUESTA:
Responde SIEMPRE en JSON con esta estructura:
{
  "prompt": "El prompt optimizado listo para usar",
  "techniques": ["Lista de técnicas aplicadas"],
  "explanation": "Por qué este prompt es efectivo (máximo 2 oraciones)",
  "variables": ["Variables que el usuario puede personalizar, ej: {{TEMA}}"],
  "tips": ["1-2 consejos para mejorar resultados"]
}

REGLAS:
- El prompt debe ser claro, específico y actionable
- Incluye ejemplos cuando sea apropiado
- Usa variables con formato {{VARIABLE}} para personalización
- Adapta el tono al objetivo del usuario
- Mantén el prompt conciso pero completo`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: getCorsHeaders(req) });
  }

  try {
    const { objective, tool, context, outputFormat, tone } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generate prompt request:', { objective, tool, tone });

    const userMessage = `Genera un prompt optimizado con estos parámetros:

OBJETIVO: ${objective}
HERRAMIENTA DESTINO: ${tool || 'ChatGPT/Claude/Gemini (general)'}
CONTEXTO ADICIONAL: ${context || 'Ninguno especificado'}
FORMATO DE SALIDA DESEADO: ${outputFormat || 'Texto libre'}
TONO: ${tone || 'Profesional'}

Crea el mejor prompt posible aplicando las técnicas más apropiadas para este caso.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again.' }), {
          status: 429,
          headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required.' }), {
          status: 402,
          headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error('AI service error');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log('Generated prompt response received');

    // Try to parse as JSON, fallback to raw content
    let result;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content;
      result = JSON.parse(jsonStr);
    } catch {
      result = {
        prompt: content,
        techniques: ['Direct generation'],
        explanation: 'Prompt generado directamente',
        variables: [],
        tips: ['Ajusta según tus necesidades específicas']
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Generate prompt error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' },
    });
  }
});
