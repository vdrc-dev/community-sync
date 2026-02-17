import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useGamification } from '@/hooks/useGamification';
import { useStreaks } from '@/hooks/useStreaks';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useWorkflows } from '@/hooks/useWorkflows';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { BadgeGrid } from '@/components/gamification/BadgeGrid';
import { StreakDisplay } from '@/components/streaks/StreakDisplay';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  User, 
  Trophy, 
  Flame, 
  Bookmark,
  LogOut,
  Zap,
  CheckCircle2,
  TrendingUp,
  Loader2,
  Save,
  Shield,
  Star,
  Target,
  GraduationCap,
  Calendar,
  ArrowRight,
  Wrench,
  BookOpen,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { userPoints, userBadges, isLoading: gamificationLoading } = useGamification();
  const { streak, isLoading: streakLoading } = useStreaks();
  const { bookmarks } = useBookmarks();
  const { stats: workflowStats } = useWorkflows();

  const [fullName, setFullName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  const updateProfile = useMutation({
    mutationFn: async (data: { full_name: string }) => {
      if (!user?.id) throw new Error('No user');
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast.success('Perfil actualizado');
    },
    onError: () => {
      toast.error('No se pudo actualizar el perfil');
    },
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile.mutateAsync({ full_name: fullName });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    const errors: typeof passwordErrors = {};

    if (!newPassword) {
      errors.newPassword = 'Ingresa tu nueva contraseña';
    } else if (newPassword.length < 6) {
      errors.newPassword = 'Mínimo 6 caracteres';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirma tu nueva contraseña';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors({});
    setIsChangingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      toast.success('Contraseña actualizada correctamente');
      setNewPassword('');
      setConfirmPassword('');
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error desconocido';
      if (msg.includes('same_password') || msg.includes('should be different')) {
        toast.error('La nueva contraseña debe ser diferente a la actual');
      } else {
        toast.error('No se pudo cambiar la contraseña: ' + msg);
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const isLoading = authLoading || profileLoading || gamificationLoading || streakLoading;

  if (!user) {
    return (
      <Layout>
        <div className="page-container section-py">
          <EmptyState
            icon={User}
            title="Inicia sesión"
            description="Necesitas iniciar sesión para ver tu perfil"
            action={{
              label: 'Iniciar sesión',
              onClick: () => navigate('/auth')
            }}
          />
        </div>
      </Layout>
    );
  }

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Usuario';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <Layout>
      <div className="page-container section-py max-w-4xl mx-auto">
        {/* Premium Header with gradient background */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 p-6 sm:p-8 rounded-2xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card/80 to-accent/5 border border-border/30 rounded-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Animated avatar ring */}
            <div className="relative">
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
              />
              <Avatar className="relative w-20 h-20 sm:w-24 sm:h-24 border-4 border-background">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary font-mono">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* Level indicator */}
              <div className="absolute -bottom-1 -right-1">
                <LevelBadge level={userPoints?.level || 1} size="sm" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-mono font-bold">{displayName}</h1>
                {isAdmin && (
                  <Badge variant="outline" className="border-primary/50 text-primary gap-1 bg-primary/5">
                    <Shield className="w-3 h-3" /> Admin
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-3">{user.email}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {profile?.generation_code && (
                  <Badge variant="outline" className="bg-primary/5 border-primary/20">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {profile.generation_code}
                  </Badge>
                )}
                {streak && streak.current_streak > 0 && (
                  <Badge variant="outline" className="bg-orange-500/5 border-orange-500/20 text-orange-400">
                    <Flame className="w-3 h-3 mr-1" />
                    {streak.current_streak} días
                  </Badge>
                )}
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => signOut()} className="hover:border-destructive/50 hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid with premium cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          {[
            { icon: Zap, value: userPoints?.points || 0, label: 'Puntos', color: 'from-primary/20 to-primary/5', iconColor: 'text-primary', borderColor: 'border-primary/20' },
            { icon: Flame, value: streak?.current_streak || 0, label: 'Racha', color: 'from-orange-500/20 to-orange-500/5', iconColor: 'text-orange-400', borderColor: 'border-orange-500/20' },
            { icon: CheckCircle2, value: workflowStats.completed, label: 'Workflows', color: 'from-green-500/20 to-green-500/5', iconColor: 'text-green-400', borderColor: 'border-green-500/20' },
            { icon: Bookmark, value: bookmarks?.length || 0, label: 'Favoritos', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400', borderColor: 'border-blue-500/20' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`group relative rounded-xl bg-gradient-to-br ${stat.color} border ${stat.borderColor} p-4 overflow-hidden hover:scale-[1.02] transition-transform`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center ${stat.iconColor}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Level Progress */}
        {userPoints && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 glass glass-specular rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-mono font-semibold">Nivel {userPoints.level}</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {userPoints.points} / {(userPoints.level || 1) * 100} XP
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(((userPoints.points % 100) / 100) * 100, 100)}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-mono">
              {Math.max(0, ((userPoints.level || 1) * 100) - (userPoints.points || 0))} XP para nivel {(userPoints.level || 1) + 1}
            </p>
          </motion.div>
        )}

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {[
            { href: '/bookmarks', label: 'Mis Favoritos', icon: Bookmark, count: bookmarks?.length || 0, hue: 200 },
            { href: '/my-tools', label: 'Mi Stack', icon: Wrench, count: null, hue: 45 },
            { href: '/quick-notes', label: 'Notas', icon: Calendar, count: null, hue: 160 },
            { href: '/dictionary', label: 'Diccionario', icon: BookOpen, count: null, hue: 263 },
          ].map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              className="group flex items-center gap-3 p-3 rounded-xl glass hover:border-white/[0.1] transition-all duration-300 active:scale-[0.98]"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                style={{
                  background: `hsl(${link.hue} 70% 55% / 0.08)`,
                  border: `1px solid hsl(${link.hue} 70% 55% / 0.15)`,
                }}
              >
                <link.icon className="w-3.5 h-3.5" style={{ color: `hsl(${link.hue} 70% 55%)` }} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium truncate block">{link.label}</span>
                {link.count !== null && (
                  <span className="text-[10px] text-muted-foreground font-mono">{link.count}</span>
                )}
              </div>
              <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 border border-border/30">
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2 data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-400">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Logros</span>
            </TabsTrigger>
            <TabsTrigger value="streaks" className="gap-2 data-[state=active]:bg-orange-500/10 data-[state=active]:text-orange-400">
              <Flame className="w-4 h-4" />
              <span className="hidden sm:inline">Rachas</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Estadísticas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="space-y-6">
              <Card className="glass border-border/30">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tu información de perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email || ''} disabled className="bg-muted/30 opacity-60" />
                  </div>

                  <Button
                    onClick={handleSave}
                    disabled={isSaving || fullName === profile?.full_name}
                    className="w-full sm:w-auto"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Guardar cambios
                  </Button>
                </CardContent>
              </Card>

              {/* Password Change */}
              <Card className="glass border-border/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <KeyRound className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <CardTitle>Cambiar Contraseña</CardTitle>
                      <CardDescription>Actualiza tu contraseña de acceso al portal</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="font-mono text-xs tracking-wider">
                      Nueva contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Mínimo 6 caracteres"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordErrors((prev) => ({ ...prev, newPassword: undefined }));
                        }}
                        className="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary/50"
                        disabled={isChangingPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="text-xs text-destructive">{passwordErrors.newPassword}</p>
                    )}
                    {newPassword.length > 0 && newPassword.length < 6 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-muted/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-red-500 transition-all"
                            style={{ width: `${Math.min((newPassword.length / 6) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">Débil</span>
                      </div>
                    )}
                    {newPassword.length >= 6 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-muted/50 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min((newPassword.length / 12) * 100, 100)}%`,
                              background: newPassword.length >= 10 ? 'hsl(160 70% 50%)' : newPassword.length >= 8 ? 'hsl(45 80% 55%)' : 'hsl(30 80% 55%)',
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {newPassword.length >= 10 ? 'Fuerte' : newPassword.length >= 8 ? 'Media' : 'Aceptable'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="font-mono text-xs tracking-wider">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Repite tu nueva contraseña"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setPasswordErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                        }}
                        className="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary/50"
                        disabled={isChangingPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="text-xs text-destructive">{passwordErrors.confirmPassword}</p>
                    )}
                    {confirmPassword.length > 0 && newPassword === confirmPassword && (
                      <p className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Las contraseñas coinciden
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={handleChangePassword}
                    disabled={isChangingPassword || !newPassword || !confirmPassword}
                    className="w-full sm:w-auto"
                    variant={newPassword && confirmPassword && newPassword === confirmPassword ? 'default' : 'outline'}
                  >
                    {isChangingPassword ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <KeyRound className="w-4 h-4 mr-2" />
                    )}
                    Cambiar Contraseña
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                <Card className="glass border-border/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      Insignias Obtenidas
                      {userBadges && userBadges.length > 0 && (
                        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs ml-auto">
                          {userBadges.length} desbloqueadas
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BadgeGrid />
                  </CardContent>
                </Card>

                <Card className="glass border-border/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Nivel Actual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <LevelBadge level={userPoints?.level || 1} size="lg" />
                      <div>
                        <p className="font-semibold">Nivel {userPoints?.level || 1}</p>
                        <p className="text-sm text-muted-foreground">
                          {userPoints?.points || 0} puntos acumulados
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="streaks">
            <Card className="glass border-border/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  Tu Racha de Actividad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <StreakDisplay size="lg" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: streak?.current_streak || 0, label: 'Racha actual', color: 'text-orange-400', bg: 'from-orange-500/10 to-orange-500/5' },
                    { value: streak?.longest_streak || 0, label: 'Mejor racha', color: 'text-primary', bg: 'from-primary/10 to-primary/5' },
                  ].map((item) => (
                    <div key={item.label} className={`text-center p-4 rounded-xl bg-gradient-to-br ${item.bg} border border-border/20`}>
                      <p className={`text-3xl font-bold font-mono ${item.color}`}>
                        {item.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span>Multiplicador: <span className="text-primary font-bold">{streak?.multiplier || 1}x</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>Freezes: <span className="text-blue-400 font-bold">{streak?.streak_freezes || 0}</span></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="space-y-4">
              {/* Learning Journey Summary */}
              <Card className="glass border-border/30 border-primary/10 bg-primary/[0.02]">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <h3 className="font-mono font-semibold text-sm">Tu viaje de aprendizaje</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Dias activo', value: (streak?.current_streak || 0) + (workflowStats.completed * 2), emoji: '📅' },
                      { label: 'Acciones', value: (userPoints?.points || 0), emoji: '⚡' },
                      { label: 'Completados', value: workflowStats.completed, emoji: '✅' },
                      { label: 'Herramientas', value: bookmarks?.length || 0, emoji: '🔧' },
                    ].map(s => (
                      <div key={s.label} className="text-center p-2 rounded-xl bg-background/50">
                        <span className="text-sm">{s.emoji}</span>
                        <p className="text-lg font-mono font-bold text-foreground mt-1">{s.value}</p>
                        <p className="text-[9px] text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="glass border-border/30">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Workflows
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: 'Completados', value: workflowStats.completed, color: 'text-green-400' },
                      { label: 'En progreso', value: workflowStats.inProgress, color: 'text-blue-400' },
                      { label: 'Iniciados', value: workflowStats.started, color: 'text-foreground' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className={`font-mono font-bold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass border-border/30">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      Actividad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: 'Favoritos guardados', value: bookmarks?.length || 0, color: 'text-foreground' },
                      { label: 'Insignias', value: userBadges?.length || 0, color: 'text-yellow-400' },
                      { label: 'Nivel', value: userPoints?.level || 1, color: 'text-primary' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className={`font-mono font-bold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Next steps suggestion */}
              <Card className="glass border-border/30">
                <CardContent className="p-4">
                  <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-2">Sugerencias</p>
                  <div className="space-y-2">
                    {workflowStats.completed === 0 && (
                      <Link to="/workflows" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        Completa tu primer workflow para ganar XP extra
                        <ArrowRight className="w-3 h-3 ml-auto" />
                      </Link>
                    )}
                    {(bookmarks?.length || 0) === 0 && (
                      <Link to="/tools" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
                        Guarda tus herramientas favoritas en Mi Stack
                        <ArrowRight className="w-3 h-3 ml-auto" />
                      </Link>
                    )}
                    <Link to="/dictionary" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
                      Explora el Diccionario Digital — 73 conceptos con ejercicios practicos
                      <ArrowRight className="w-3 h-3 ml-auto" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

