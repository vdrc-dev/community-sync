import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, full_name, role } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email es requerido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // 1. Verify the caller is an admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user: callerUser } } = await supabaseClient.auth.getUser();
    if (!callerUser) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check admin role
    const { data: adminRole } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', callerUser.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!adminRole) {
      return new Response(JSON.stringify({ error: 'Solo administradores pueden invitar usuarios' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Use service role to invite user via Supabase Auth
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const inviteRole = role || 'participant';

    // Fetch inviter name for the welcome page context
    const { data: inviterProfile } = await supabaseAdmin
      .from('profiles')
      .select('full_name')
      .eq('user_id', callerUser.id)
      .maybeSingle();

    const inviterName = inviterProfile?.full_name || '';
    const origin = req.headers.get('origin') || 'https://comunidad-vdrc.lovable.app';

    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: {
        full_name: full_name || null,
        invited_role: inviteRole,
      },
      redirectTo: `${origin}/welcome?email=${encodeURIComponent(email)}`,
    });

    if (inviteError) {
      console.error('Invite error:', inviteError);

      // Check if user already exists
      if (inviteError.message?.includes('already been registered') || inviteError.message?.includes('already exists')) {
        return new Response(JSON.stringify({ error: 'Este email ya está registrado en la plataforma' }), {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: inviteError.message || 'Error al enviar invitación' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. Record invitation in database (upsert to handle resends)
    const { error: dbError } = await supabaseAdmin.from('invitations').upsert({
      email,
      role: inviteRole,
      full_name: full_name || null,
      invited_by: callerUser.id,
      status: 'pending',
      created_at: new Date().toISOString(),
    }, { onConflict: 'email' });

    if (dbError) {
      console.error('DB insert error:', dbError);
      // Don't fail the request — the auth invite was already sent
    }

    console.log(`Invitation sent to ${email} by ${callerUser.email} with role ${inviteRole}`);

    return new Response(JSON.stringify({
      success: true,
      message: `Invitación enviada a ${email}`,
      user_id: inviteData?.user?.id,
      inviter_name: inviterName,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Invite user error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Error desconocido',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
