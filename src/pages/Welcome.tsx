import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Zap, Users, Wrench, Sparkles, ShieldCheck, ShieldX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

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
  const emailParam = searchParams.get('email');
  const nameParam = searchParams.get('name');
  const [emailStatus, setEmailStatus] = useState<'checking' | 'allowed' | 'denied' | 'idle'>('idle');

  const displayName = nameParam || (emailParam ? emailParam.split('@')[0] : 'participante');
  const signupUrl = `/auth?mode=signup${emailParam ? `&email=${encodeURIComponent(emailParam)}` : ''}${nameParam ? `&name=${encodeURIComponent(nameParam)}` : ''}`;

  // Auto-check email against whitelist
  useEffect(() => {
    if (!emailParam) return;
    setEmailStatus('checking');
    supabase.rpc('is_email_allowed', { check_email: emailParam }).then(({ data }) => {
      setEmailStatus(data ? 'allowed' : 'denied');
    });
  }, [emailParam]);

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
            <p className="text-muted-foreground text-lg">
              Te invitamos a unirte al Portal VDRC
            </p>
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

          {/* Status badge */}
          {emailParam && emailStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-4"
            >
              {emailStatus === 'checking' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" /> Verificando acceso...
                </div>
              )}
              {emailStatus === 'allowed' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> ¡Acceso autorizado!
                </div>
              )}
              {emailStatus === 'denied' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                  <ShieldX className="w-4 h-4" /> Email no autorizado — contacta al administrador
                </div>
              )}
            </motion.div>
          )}

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
                disabled={emailStatus === 'denied'}
              >
                <Sparkles className="w-4 h-4" />
                {emailStatus === 'denied' ? 'Acceso no disponible' : 'Crear mi cuenta'}
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
