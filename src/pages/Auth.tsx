import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Eye, EyeOff, Rocket, ExternalLink, Sparkles, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const authSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
});

const requestSchema = z.object({
  email: z.string().email('Email invalido'),
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  message: z.string().optional(),
});

type AuthView = 'signin' | 'request' | 'signup';

export default function Auth() {
  const [searchParams] = useSearchParams();

  const inviteEmail = searchParams.get('email') || '';
  const inviteName = searchParams.get('name') || '';
  const inviterName = searchParams.get('inviter') || '';
  const isFromInvite = !!(inviteEmail || inviterName);

  const [view, setView] = useState<AuthView>(
    searchParams.get('mode') === 'signup' || isFromInvite ? 'signup' : 'signin'
  );
  const [email, setEmail] = useState(inviteEmail);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(inviteName);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingInvite, setCheckingInvite] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // When coming from invite link, verify invitation exists
  useEffect(() => {
    if (isFromInvite && inviteEmail) {
      checkInvitation(inviteEmail);
    }
  }, [isFromInvite, inviteEmail]);

  const checkInvitation = async (emailToCheck: string): Promise<boolean> => {
    setCheckingInvite(true);
    try {
      const { data, error } = await (supabase as any).rpc('check_invitation_status', {
        check_email: emailToCheck,
      });
      if (error) {
        console.warn('Error checking invitation:', error.message);
        return false;
      }
      return data === true;
    } catch {
      return false;
    } finally {
      setCheckingInvite(false);
    }
  };

  const validateAuthForm = () => {
    try {
      authSchema.parse({
        email,
        password,
        fullName: view === 'signup' ? fullName : undefined,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateRequestForm = () => {
    try {
      requestSchema.parse({ email, fullName, message });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAuthForm()) return;

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: 'Error al iniciar sesion',
          description: 'Credenciales incorrectas. Verifica tu email y contrasena.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Hola de nuevo!',
          description: 'Has iniciado sesion correctamente.',
        });
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAuthForm()) return;

    setLoading(true);
    try {
      // Double-check invitation still exists
      const hasInvite = await checkInvitation(email);
      if (!hasInvite) {
        toast({
          title: 'Invitacion no encontrada',
          description: 'No se encontro una invitacion pendiente para este email. Solicita acceso primero.',
          variant: 'destructive',
        });
        setView('request');
        setLoading(false);
        return;
      }

      const { error } = await signUp(email, password, fullName);
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Usuario ya registrado',
            description: 'Este email ya esta registrado. Intenta iniciar sesion.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error al registrarse',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Bienvenido!',
          description: 'Tu cuenta ha sido creada exitosamente.',
        });
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRequestForm()) return;

    setLoading(true);
    try {
      // First check if they already have a pending invitation
      const hasInvite = await checkInvitation(email);
      if (hasInvite) {
        toast({
          title: 'Ya tienes una invitacion!',
          description: 'Tu email tiene una invitacion pendiente. Puedes crear tu cuenta.',
        });
        setView('signup');
        setLoading(false);
        return;
      }

      // Submit access request via RPC (bypasses RLS)
      const { data, error } = await (supabase as any).rpc('submit_access_request', {
        req_email: email,
        req_full_name: fullName,
        req_message: message || null,
      });

      if (error) {
        toast({
          title: 'Error al enviar solicitud',
          description: error.message,
          variant: 'destructive',
        });
      } else if (data && typeof data === 'object' && 'error' in data && (data as any).error === 'already_requested') {
        toast({
          title: 'Solicitud ya enviada',
          description: 'Ya enviaste una solicitud con este email. Te notificaremos cuando sea revisada.',
        });
      } else {
        setRequestSent(true);

        // Notify admin via notifications table
        try {
          const { data: adminRoles } = await (supabase as any)
            .from('user_roles')
            .select('user_id')
            .eq('role', 'admin');

          if (adminRoles && adminRoles.length > 0) {
            const notifications = adminRoles.map((ar: { user_id: string }) => ({
              user_id: ar.user_id,
              type: 'access_request',
              title: 'Nueva solicitud de acceso',
              message: `${fullName} (${email}) ha solicitado acceso al portal.`,
              link: '/admin/users',
            }));
            await (supabase as any).from('notifications').insert(notifications);
          }
        } catch {
          // Non-critical: notification failed but request was saved
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRequest = async () => {
    // If user typed an email in sign-in, check if they have an invitation
    if (email) {
      const hasInvite = await checkInvitation(email);
      if (hasInvite) {
        setView('signup');
        return;
      }
    }
    setView('request');
  };

  // Success screen after requesting access
  if (requestSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="fixed inset-0 bg-background" />
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="glass-strong glass-specular rounded-3xl">
            <CardContent className="pt-10 pb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-mono font-bold mb-2">Solicitud enviada</h2>
              <p className="text-muted-foreground mb-6">
                Tu solicitud de acceso ha sido enviada al equipo administrador.
                Te notificaremos por email cuando sea aprobada.
              </p>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setRequestSent(false);
                    setView('signin');
                  }}
                  className="w-full font-mono"
                >
                  Volver a iniciar sesion
                </Button>
                <Link to="/">
                  <Button variant="ghost" className="w-full font-mono text-muted-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Ir al inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-background" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-mono">Volver al inicio</span>
        </Link>

        <Card className="glass-strong glass-specular rounded-3xl">
          <CardHeader className="text-center pb-2">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mx-auto relative"
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
                transition={{ duration: 0.2 }}
              >
                <CardTitle className="text-2xl font-mono mt-4">
                  {view === 'signin' && 'Iniciar sesion'}
                  {view === 'request' && 'Solicitar acceso'}
                  {view === 'signup' && 'Crear cuenta'}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {view === 'signin' && 'Accede a tu cuenta de participante'}
                  {view === 'request' && 'Envia una solicitud para unirte al portal VDRC'}
                  {view === 'signup' && 'Completa tu registro con tu invitacion'}
                </CardDescription>
              </motion.div>
            </AnimatePresence>

            {isFromInvite && inviterName && view === 'signup' && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs"
              >
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">
                  Invitado por <span className="text-primary font-medium">{inviterName}</span>
                </span>
              </motion.div>
            )}

            {view === 'signup' && !isFromInvite && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs"
              >
                <ShieldCheck className="w-3 h-3 text-green-500" />
                <span className="text-muted-foreground">
                  Invitacion verificada
                </span>
              </motion.div>
            )}
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {/* ─── SIGN IN ─── */}
              {view === 'signin' && (
                <motion.form
                  key="signin"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSignIn}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono text-xs tracking-wider">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all"
                      disabled={loading}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-mono text-xs tracking-wider">Contrasena</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 pr-10 transition-all"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold hover:scale-[1.01] transition-all duration-300"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    INICIAR SESION
                  </Button>
                </motion.form>
              )}

              {/* ─── REQUEST ACCESS ─── */}
              {view === 'request' && (
                <motion.form
                  key="request"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRequestAccess}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="reqName" className="font-mono text-xs tracking-wider">Nombre completo</Label>
                    <Input
                      id="reqName"
                      type="text"
                      placeholder="Tu nombre"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all"
                      disabled={loading}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reqEmail" className="font-mono text-xs tracking-wider">Email</Label>
                    <Input
                      id="reqEmail"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all"
                      disabled={loading}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reqMessage" className="font-mono text-xs tracking-wider">
                      Mensaje <span className="text-muted-foreground">(opcional)</span>
                    </Label>
                    <Textarea
                      id="reqMessage"
                      placeholder="Cuentanos por que quieres unirte..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all resize-none"
                      rows={3}
                      disabled={loading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold hover:scale-[1.01] transition-all duration-300"
                    disabled={loading || checkingInvite}
                  >
                    {(loading || checkingInvite) && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    <Send className="w-4 h-4 mr-2" />
                    ENVIAR SOLICITUD
                  </Button>
                </motion.form>
              )}

              {/* ─── SIGN UP (invitation-only) ─── */}
              {view === 'signup' && (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
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
                      className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all"
                      disabled={loading}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="font-mono text-xs tracking-wider">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all"
                      disabled={loading}
                      readOnly={isFromInvite && !!inviteEmail}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="font-mono text-xs tracking-wider">Contrasena</Label>
                    <div className="relative">
                      <Input
                        id="signupPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 pr-10 transition-all"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold hover:scale-[1.01] transition-all duration-300"
                    disabled={loading || checkingInvite}
                  >
                    {(loading || checkingInvite) && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    CREAR CUENTA
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* ─── View toggles ─── */}
            <div className="mt-6 text-center space-y-2">
              {view === 'signin' && (
                <button
                  type="button"
                  onClick={handleGoToRequest}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  disabled={checkingInvite}
                >
                  {checkingInvite ? (
                    <span className="inline-flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Verificando...
                    </span>
                  ) : (
                    <>No tienes cuenta? <span className="text-primary font-medium">Solicitar acceso</span></>
                  )}
                </button>
              )}
              {view === 'request' && (
                <button
                  type="button"
                  onClick={() => setView('signin')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Ya tienes cuenta? <span className="text-primary font-medium">Inicia sesion</span>
                </button>
              )}
              {view === 'signup' && (
                <button
                  type="button"
                  onClick={() => setView('signin')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Ya tienes cuenta? <span className="text-primary font-medium">Inicia sesion</span>
                </button>
              )}
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
                  <p className="text-xs font-medium">Generacion 11 — Marzo 2026</p>
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
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="font-mono text-xs text-muted-foreground/50">
            <span className="text-primary/60">$</span> vdrc://auth <span className="text-primary/40">v2.0</span>
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
