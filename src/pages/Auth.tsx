import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Eye, EyeOff, Rocket, ExternalLink } from 'lucide-react';
import { z } from 'zod';
import { motion } from 'framer-motion';

const authSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({ 
        email, 
        password, 
        fullName: isSignUp ? fullName : undefined 
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: typeof errors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof typeof errors] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isSignUp) {
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
      } else {
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
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-background" />
      {/* Subtle grid background */}
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
            <CardTitle className="text-2xl font-mono mt-4">
              {isSignUp ? 'Crear cuenta' : 'Iniciar sesion'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSignUp 
                ? 'Unete al portal de participantes VDRC' 
                : 'Accede a tu cuenta de participante'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="fullName" className="font-mono text-xs tracking-wider">Nombre completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Tu nombre"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-muted/30 border-border/50 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all"
                    disabled={loading}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">{errors.fullName}</p>
                  )}
                </motion.div>
              )}

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
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
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
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold hover:scale-[1.01] transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isSignUp ? 'CREAR CUENTA' : 'INICIAR SESION'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isSignUp ? (
                  <>Ya tienes cuenta? <span className="text-primary font-medium">Inicia sesion</span></>
                ) : (
                  <>No tienes cuenta? <span className="text-primary font-medium">Registrate</span></>
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
