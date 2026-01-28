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
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

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
        {/* Header with Avatar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8"
        >
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-primary/30">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-mono font-bold">{displayName}</h1>
              {userPoints && <LevelBadge level={userPoints.level} size="sm" />}
              {isAdmin && (
                <Badge variant="outline" className="border-primary/50 text-primary gap-1">
                  <Shield className="w-3 h-3" /> Admin
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-3">{user.email}</p>
            {profile?.generation_code && (
              <Badge variant="outline" className="bg-primary/5">
                {profile.generation_code}
              </Badge>
            )}
          </div>

          <Button variant="outline" size="sm" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">{userPoints?.points || 0}</p>
                <p className="text-xs text-muted-foreground">Puntos</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">{streak?.current_streak || 0}</p>
                <p className="text-xs text-muted-foreground">Racha</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">{workflowStats.completed}</p>
                <p className="text-xs text-muted-foreground">Workflows</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">{bookmarks?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Favoritos</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Logros</span>
            </TabsTrigger>
            <TabsTrigger value="streaks" className="gap-2">
              <Flame className="w-4 h-4" />
              <span className="hidden sm:inline">Rachas</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Estadísticas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="glass">
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
                    className="bg-muted/50"
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
          </TabsContent>

          <TabsContent value="achievements">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      Insignias Obtenidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BadgeGrid />
                  </CardContent>
                </Card>

                <Card className="glass">
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
            <Card className="glass">
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
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold font-mono text-orange-400">
                      {streak?.current_streak || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Racha actual</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold font-mono text-primary">
                      {streak?.longest_streak || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Mejor racha</p>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Multiplicador actual: <span className="text-primary font-bold">{streak?.multiplier || 1}x</span></p>
                  <p>Freezes disponibles: <span className="text-blue-400 font-bold">{streak?.streak_freezes || 0}</span></p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base">Workflows</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Completados</span>
                    <span className="font-mono font-bold text-green-400">{workflowStats.completed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">En progreso</span>
                    <span className="font-mono font-bold text-blue-400">{workflowStats.inProgress}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Iniciados</span>
                    <span className="font-mono font-bold">{workflowStats.started}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base">Actividad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Favoritos guardados</span>
                    <span className="font-mono font-bold">{bookmarks?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Insignias</span>
                    <span className="font-mono font-bold text-yellow-400">{userBadges?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Nivel</span>
                    <span className="font-mono font-bold text-primary">{userPoints?.level || 1}</span>
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
