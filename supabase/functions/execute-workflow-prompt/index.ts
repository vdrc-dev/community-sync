import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const { prompt, variables, workflowId, stepNumber, stream = false } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    if (authHeader) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: authHeader } }
      });
      
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id || null;
    }

    // Replace variables in prompt
    let processedPrompt = prompt;
    if (variables && typeof variables === 'object') {
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'gi');
        processedPrompt = processedPrompt.replace(regex, String(value));
      }
    }

    console.log('Executing workflow prompt:', { 
      workflowId, 
      stepNumber, 
      hasUser: !!userId,
      promptLength: processedPrompt.length,
      stream
    });

    const model = 'google/gemini-3-flash-preview';

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { 
            role: 'system', 
            content: 'Eres un asistente experto en automatización y productividad. Responde de forma clara, estructurada y actionable. Usa markdown para formatear tu respuesta cuando sea apropiado.' 
          },
          { role: 'user', content: processedPrompt }
        ],
        stream,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Límite de uso alcanzado. Intenta de nuevo en unos minutos.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Créditos de IA agotados.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error('Error del servicio de IA');
    }

    // Handle streaming response
    if (stream) {
      return new Response(response.body, {
        headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
      });
    }

    // Non-streaming response
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    const executionTime = Date.now() - startTime;
    const tokensUsed = data.usage?.total_tokens || null;

    // Save execution to database if user is authenticated
    if (userId && workflowId && stepNumber) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        await supabaseAdmin.from('workflow_executions').insert({
          user_id: userId,
          workflow_id: workflowId,
          step_number: stepNumber,
          variables: variables || {},
          prompt_used: processedPrompt,
          ai_response: content,
          model_used: model,
          tokens_used: tokensUsed,
          execution_time_ms: executionTime,
        });

        console.log('Execution saved to database');
      } catch (dbError) {
        console.error('Failed to save execution:', dbError);
        // Don't fail the request if DB save fails
      }
    }

    return new Response(JSON.stringify({
      response: content,
      model,
      tokens_used: tokensUsed,
      execution_time_ms: executionTime,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Execute workflow prompt error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
