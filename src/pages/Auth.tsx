import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Eye, EyeOff, Rocket, ExternalLink, KeyRound, CheckCircle2, Mail, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const emailSchema = z.string().email('Email inválido');
const passwordSchema = z.string().min(6, 'Mínimo 6 caracteres');
const nameSchema = z.string().min(2, 'Mínimo 2 caracteres');

type AuthView = 'signin' | 'signup' | 'forgot';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';

  const [view, setView] = useState<AuthView>(initialView);
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(searchParams.get('name') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'allowed' | 'denied'>('idle');
  const emailCheckTimer = useRef<ReturnType<typeof setTimeout>>();

  const { signIn, signUp, resetPassword, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Smart redirect: go to intended page or home
  const redirectTo = (location.state as any)?.from || '/';

  useEffect(() => {
    if (!authLoading && user) {
      // Auto-update streak on login
      void supabase.rpc('update_user_streak', { _user_id: user.id });
      navigate(redirectTo, { replace: true });
    }
  }, [user, authLoading, navigate, redirectTo]);

  // Reset state when switching views
  const switchView = (newView: AuthView) => {
    setView(newView);
    setPassword('');
    setTouched({});
    setEmailSent(false);
    setEmailStatus('idle');
  };

  // ── Real-time email whitelist check (debounced) ──
  const checkEmailLive = useCallback((emailVal: string) => {
    if (emailCheckTimer.current) clearTimeout(emailCheckTimer.current);
    if (!emailSchema.safeParse(emailVal).success) {
      setEmailStatus('idle');
      return;
    }
    setEmailStatus('checking');
    emailCheckTimer.current = setTimeout(async () => {
      const { data } = await (supabase.rpc as unknown as (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }>)('is_email_allowed', { check_email: emailVal });
      setEmailStatus(data ? 'allowed' : 'denied');
    }, 400);
  }, []);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    checkEmailLive(val);
  };

  // Live validation helpers
  const emailError = touched.email ? emailSchema.safeParse(email).success ? null : 'Email inválido' : null;
  const passwordError = touched.password ? passwordSchema.safeParse(password).success ? null : 'Mínimo 6 caracteres' : null;
  const nameError = touched.fullName && view === 'signup' ? nameSchema.safeParse(fullName).success ? null : 'Mínimo 2 caracteres' : null;

  const isSignInValid = emailSchema.safeParse(email).success && passwordSchema.safeParse(password).success;
  const isSignUpValid = isSignInValid && nameSchema.safeParse(fullName).success;
  const isForgotValid = emailSchema.safeParse(email).success;

  const checkEmailAllowed = async (emailToCheck: string): Promise<boolean> => {
    const { data, error } = await (supabase.rpc as unknown as (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>)('is_email_allowed', { check_email: emailToCheck });
    if (error) {
      console.error('Error checking email whitelist:', error);
      return false;
    }
    return !!data;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isSignInValid) return;
    setLoading(true);
    try {
      const allowed = await checkEmailAllowed(email);
      if (!allowed) {
        toast({
          title: 'Acceso restringido',
          description: 'Este email no está autorizado. Contacta al administrador para solicitar acceso.',
          variant: 'destructive',
        });
        return;
      }
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: 'Error al iniciar sesión',
          description: 'Credenciales incorrectas. Verifica tu email y contraseña.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true, fullName: true });
    if (!isSignUpValid) return;
    setLoading(true);
    try {
      const allowed = await checkEmailAllowed(email);
      if (!allowed) {
        toast({
          title: 'Acceso restringido',
          description: 'Este email no está autorizado para registrarse. Contacta al administrador.',
          variant: 'destructive',
        });
        return;
      }
      const { error } = await signUp(email, password, fullName);
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Usuario ya registrado',
            description: 'Este email ya está registrado. Intenta iniciar sesión.',
            variant: 'destructive',
          });
          switchView('signin');
        } else {
          toast({ title: 'Error al registrarse', description: error.message, variant: 'destructive' });
        }
      } else {
        setEmailSent(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true });
    if (!isForgotValid) return;
    setLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        setEmailSent(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Email sent confirmation screen
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="fixed inset-0 bg-background" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="glass-strong glass-specular rounded-3xl">
            <CardContent className="pt-8 pb-8 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </motion.div>
              <h2 className="text-xl font-bold mb-2">
                {view === 'forgot' ? '¡Revisa tu email!' : '¡Confirma tu cuenta!'}
              </h2>
              <p className="text-sm text-muted-foreground mb-2">
                Enviamos un enlace a:
              </p>
              <p className="text-sm font-medium text-primary mb-6">{email}</p>
              <p className="text-xs text-muted-foreground mb-6">
                {view === 'forgot'
                  ? 'Haz click en el enlace para restablecer tu contraseña.'
                  : 'Haz click en el enlace para activar tu cuenta.'}
              </p>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { setEmailSent(false); switchView('signin'); }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al login
                </Button>
                <p className="text-[10px] text-muted-foreground/50">
                  ¿No lo ves? Revisa tu carpeta de spam.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="fixed inset-0 bg-background" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-mono">Volver al inicio</span>
        </Link>

        <Card className="glass-strong glass-specular rounded-3xl">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring' }}
              className="mx-auto"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                <img src="/logos/vdrc-icon.png" alt="VDRC" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
              >
                <CardTitle className="text-2xl font-mono mt-4">
                  {view === 'signin' ? 'Iniciar sesión' : view === 'signup' ? 'Crear cuenta' : 'Recuperar contraseña'}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {view === 'signin'
                    ? 'Accede a tu cuenta del Portal VDRC'
                    : view === 'signup'
                      ? 'Regístrate para unirte al Portal VDRC'
                      : 'Te enviaremos un enlace por email'}
                </CardDescription>
              </motion.div>
            </AnimatePresence>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {view === 'signin' ? (
                <motion.form
                  key="signin"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  onSubmit={handleSignIn}
                  className="space-y-4"
                >
                  <FieldEmail value={email} onChange={handleEmailChange} error={emailError} disabled={loading} onBlur={() => setTouched(t => ({ ...t, email: true }))} emailStatus={emailStatus} />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="font-mono text-xs tracking-wider">Contraseña</Label>
                      <button
                        type="button"
                        onClick={() => switchView('forgot')}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <FieldPassword
                      id="password"
                      value={password}
                      onChange={setPassword}
                      show={showPassword}
                      onToggle={() => setShowPassword(p => !p)}
                      error={passwordError}
                      disabled={loading}
                      onBlur={() => setTouched(t => ({ ...t, password: true }))}
                    />
                  </div>

                  <SubmitButton loading={loading} disabled={!isSignInValid}>
                    INICIAR SESIÓN
                  </SubmitButton>
                </motion.form>
              ) : view === 'signup' ? (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  onSubmit={handleSignUp}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signupName" className="font-mono text-xs tracking-wider">Nombre completo</Label>
                    <Input
                      id="signupName"
                      type="text"
                      placeholder="Tu nombre"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onBlur={() => setTouched(t => ({ ...t, fullName: true }))}
                      className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all"
                      disabled={loading}
                      autoFocus
                    />
                    {nameError && <p className="text-xs text-destructive">{nameError}</p>}
                  </div>

                  <FieldEmail value={email} onChange={handleEmailChange} error={emailError} disabled={loading} onBlur={() => setTouched(t => ({ ...t, email: true }))} id="signupEmail" emailStatus={emailStatus} />
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="font-mono text-xs tracking-wider">Contraseña</Label>
                    <FieldPassword
                      id="signupPassword"
                      value={password}
                      onChange={setPassword}
                      show={showPassword}
                      onToggle={() => setShowPassword(p => !p)}
                      error={passwordError}
                      disabled={loading}
                      onBlur={() => setTouched(t => ({ ...t, password: true }))}
                    />
                  </div>

                  <SubmitButton loading={loading} disabled={!isSignUpValid}>
                    CREAR CUENTA
                  </SubmitButton>
                </motion.form>
              ) : (
                <motion.form
                  key="forgot"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  onSubmit={handleForgotPassword}
                  className="space-y-4"
                >
                  <FieldEmail value={email} onChange={handleEmailChange} error={emailError} disabled={loading} onBlur={() => setTouched(t => ({ ...t, email: true }))} id="forgotEmail" autoFocus emailStatus={emailStatus} />

                  <SubmitButton loading={loading} disabled={!isForgotValid} icon={<KeyRound className="w-4 h-4 mr-2" />}>
                    ENVIAR ENLACE
                  </SubmitButton>
                </motion.form>
              )}
            </AnimatePresence>

            {/* View toggle */}
            <div className="mt-6 text-center space-y-2">
              <button
                type="button"
                onClick={() => switchView(view === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {view === 'signin' ? (
                  <>¿No tienes cuenta? <span className="text-primary font-medium">Regístrate</span></>
                ) : view === 'signup' ? (
                  <>¿Ya tienes cuenta? <span className="text-primary font-medium">Inicia sesión</span></>
                ) : (
                  <><span className="text-primary font-medium">← Volver al login</span></>
                )}
              </button>
            </div>

            {/* Gen 11 callout */}
            <div className="mt-4 pt-4 border-t border-border/30">
              <a
                href="https://vdrc.cl/talleres"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/15 hover:border-accent/30 hover:bg-accent/10 transition-all group"
              >
                <Rocket className="w-4 h-4 text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">Generación 11 — Marzo 2026</p>
                  <p className="text-[10px] text-muted-foreground">Inscripciones abiertas</p>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Terminal decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="font-mono text-xs text-muted-foreground/50">
            <span className="text-primary/60">$</span> vdrc://auth <span className="text-primary/40">v3.0</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-primary/50"
            > ▊</motion.span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Shared sub-components ──────────────────────────────

function FieldEmail({ value, onChange, error, disabled, onBlur, id = 'email', autoFocus, emailStatus = 'idle' }: {
  value: string; onChange: (v: string) => void; error: string | null; disabled: boolean; onBlur: () => void; id?: string; autoFocus?: boolean;
  emailStatus?: 'idle' | 'checking' | 'allowed' | 'denied';
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-mono text-xs tracking-wider">Email</Label>
      <div className="relative">
        <Input
          id={id}
          type="email"
          placeholder="tu@email.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all pr-10 ${
            emailStatus === 'allowed' ? 'border-emerald-500/50 focus:border-emerald-500/70' :
            emailStatus === 'denied' ? 'border-destructive/50 focus:border-destructive/70' : ''
          }`}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="email"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {emailStatus === 'checking' && (
              <motion.div key="checking" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </motion.div>
            )}
            {emailStatus === 'allowed' && (
              <motion.div key="allowed" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </motion.div>
            )}
            {emailStatus === 'denied' && (
              <motion.div key="denied" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <ShieldX className="w-4 h-4 text-destructive" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {emailStatus === 'denied' && !error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive flex items-center gap-1">
          <ShieldAlert className="w-3 h-3" /> Este email no está autorizado
        </motion.p>
      )}
      {emailStatus === 'allowed' && !error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-emerald-500 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Email autorizado ✓
        </motion.p>
      )}
    </div>
  );
}

function FieldPassword({ id, value, onChange, show, onToggle, error, disabled, onBlur }: {
  id: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void; error: string | null; disabled: boolean; onBlur: () => void;
}) {
  return (
    <>
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 pr-10 transition-all"
          disabled={disabled}
          autoComplete={id.includes('signup') ? 'new-password' : 'current-password'}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </>
  );
}

function SubmitButton({ loading, disabled, children, icon }: {
  loading: boolean; disabled: boolean; children: React.ReactNode; icon?: React.ReactNode;
}) {
  return (
    <Button
      type="submit"
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold hover:scale-[1.01] transition-all duration-300"
      disabled={loading || disabled}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : icon}
      {children}
    </Button>
  );
}
