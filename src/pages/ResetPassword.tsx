import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { updatePassword, isRecovery, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Wait for auth to initialize
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // No recovery session detected
  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
          <Card className="glass-strong rounded-3xl">
            <CardContent className="pt-8 pb-8">
              <KeyRound className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Enlace inválido</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Este enlace de recuperación no es válido o ha expirado. Solicita uno nuevo.
              </p>
              <Link to="/auth">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Ir a iniciar sesión
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
          <Card className="glass-strong rounded-3xl">
            <CardContent className="pt-8 pb-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl font-bold mb-2">¡Contraseña actualizada!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Ya puedes usar tu nueva contraseña para iniciar sesión.
              </p>
              <Button onClick={() => navigate('/')} className="gap-2">
                Ir al inicio
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({ title: 'Error', description: 'La contraseña debe tener al menos 6 caracteres.', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Las contraseñas no coinciden.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await updatePassword(password);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        setSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordLongEnough = password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="fixed inset-0 bg-background" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
        <Link to="/auth" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-mono">Volver al login</span>
        </Link>

        <Card className="glass-strong glass-specular rounded-3xl">
          <CardHeader className="text-center pb-2">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="mx-auto">
              <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <KeyRound className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-mono mt-4">Nueva contraseña</CardTitle>
            <CardDescription>Ingresa tu nueva contraseña</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-xs tracking-wider">Nueva contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-muted/30 border-border/50 focus:border-primary/50 pr-10 transition-all"
                    disabled={loading}
                    minLength={6}
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password.length > 0 && !passwordLongEnough && (
                  <p className="text-xs text-destructive">Mínimo 6 caracteres</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-mono text-xs tracking-wider">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-muted/30 border-border/50 focus:border-primary/50 transition-all"
                  disabled={loading}
                  minLength={6}
                  required
                />
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <p className="text-xs text-destructive">Las contraseñas no coinciden</p>
                )}
                {passwordsMatch && passwordLongEnough && (
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Contraseñas coinciden
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-semibold"
                disabled={loading || !passwordLongEnough || !passwordsMatch}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                ACTUALIZAR CONTRASEÑA
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
