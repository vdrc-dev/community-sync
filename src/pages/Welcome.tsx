import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, BookOpen, Zap, Users, Wrench, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvitationData {
  email: string;
  full_name: string | null;
  role: string;
  invited_by: string | null;
  inviter_name?: string;
}

const FEATURES = [
  {
    icon: BookOpen,
    label: 'Clases',
    desc: 'Grabaciones, presentaciones y recursos organizados por generación.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Zap,
    label: 'Workflows',
    desc: 'Automatiza tareas paso a paso con workflows guiados e IA.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: Users,
    label: 'Comunidad',
    desc: 'Conecta con otros participantes y comparte recursos.',
    color: 'text-accent',
    bg: 'bg-accent/10 border-accent/20',
  },
  {
    icon: Wrench,
    label: 'Herramientas',
    desc: 'Explora y organiza las mejores herramientas de productividad con IA.',
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
  },
];

export default function Welcome() {
  const [searchParams] = useSearchParams();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);

  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');

  useEffect(() => {
    const fetchInvitation = async () => {
      if (token) {
        const { data } = await (supabase as any)
          .from('invitations')
          .select('email, full_name, role, invited_by')
          .eq('id', token)
          .maybeSingle();

        if (data) {
          let inviterName: string | undefined;
          if (data.invited_by) {
            const { data: profile } = await (supabase as any)
              .from('profiles')
              .select('full_name')
              .eq('id', data.invited_by)
              .maybeSingle();
            inviterName = profile?.full_name || undefined;
          }
          setInvitation({ ...data, inviter_name: inviterName });
        }
      }
      setLoading(false);
    };

    fetchInvitation();
  }, [token]);

  const displayName = invitation?.full_name
    || (invitation?.email ?? emailParam ?? '').split('@')[0]
    || 'participante';
  const inviterName = invitation?.inviter_name;
  const signupEmail = invitation?.email || emailParam || '';

  const signupUrl = `/auth?mode=signup${signupEmail ? `&email=${encodeURIComponent(signupEmail)}` : ''}${inviterName ? `&inviter=${encodeURIComponent(inviterName)}` : ''}${invitation?.full_name ? `&name=${encodeURIComponent(invitation.full_name)}` : ''}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-background" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Radial glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--primary)), transparent)' }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="mx-auto mb-6"
          >
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden mx-auto border border-white/10">
              <img src="/logos/vdrc-icon.png" alt="VDRC" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Hola{' '}
              <span className="text-primary">{displayName}</span>
              {' '}👋
            </h1>
            {inviterName ? (
              <p className="text-muted-foreground text-lg">
                <span className="text-foreground font-medium">{inviterName}</span>{' '}
                te invitó al Portal VDRC
              </p>
            ) : (
              <p className="text-muted-foreground text-lg">
                Te invitamos a unirte al Portal VDRC
              </p>
            )}
          </motion.div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-3 mt-10 mb-10">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className={`p-4 rounded-xl border ${feat.bg} text-left`}
              >
                <feat.icon className={`w-5 h-5 ${feat.color} mb-2`} />
                <h3 className="font-semibold text-sm mb-1">{feat.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to={signupUrl}>
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold hover:scale-[1.02] transition-all duration-300 gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Crear mi cuenta
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground/60 mt-4">
              Taller de Productividad Digital con IA
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
