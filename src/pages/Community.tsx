import { useSpaces } from '@/hooks/useSpaces';
import { CommunityLayout } from '@/components/community/CommunityLayout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { OnlineUsers } from '@/components/presence/OnlineUsers';
import { 
  MessageSquare, TrendingUp, Users, ArrowRight, Pin, Heart, 
  Clock, Sparkles, MessageCircle, BookOpen, Hash, Zap,
  Trophy, Calendar, Lightbulb, PenLine, Rocket, ExternalLink
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// Fetch recent posts across all spaces
function useRecentPosts() {
  return useQuery({
    queryKey: ['community-recent-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('space_posts')
        .select('*, spaces!inner(name, slug, icon_emoji)')
        .order('created_at', { ascending: false })
        .limit(8);
      if (error) throw error;

      const authorIds = [...new Set((data || []).map(p => p.author_id))];
      if (authorIds.length === 0) return [];
      
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', authorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      return (data || []).map(post => ({
        ...post,
        author: profileMap.get(post.author_id) || { full_name: 'Anónimo', avatar_url: null },
      }));
    },
    staleTime: 1000 * 60 * 2,
  });
}

const spaceGradients = [
  'from-primary/15 to-accent/5',
  'from-purple-500/15 to-pink-500/5',
  'from-blue-500/15 to-cyan-500/5',
  'from-orange-500/15 to-yellow-500/5',
  'from-green-500/15 to-emerald-500/5',
  'from-rose-500/15 to-red-500/5',
];

const spaceBorders = [
  'border-primary/20 hover:border-primary/50',
  'border-purple-500/20 hover:border-purple-500/50',
  'border-blue-500/20 hover:border-blue-500/50',
  'border-orange-500/20 hover:border-orange-500/50',
  'border-green-500/20 hover:border-green-500/50',
  'border-rose-500/20 hover:border-rose-500/50',
];

export default function Community() {
  const { spaces, spacesLoading } = useSpaces();
  const { data: recentPosts, isLoading: postsLoading } = useRecentPosts();
  const { user } = useAuth();

  if (spacesLoading) {
    return (
      <CommunityLayout>
        <LoadingSpinner fullScreen />
      </CommunityLayout>
    );
  }

  const totalPosts = spaces?.reduce((sum, s) => sum + (s.post_count || 0), 0) || 0;
  const totalMembers = spaces?.reduce((sum, s) => sum + (s.member_count || 0), 0) || 0;

  return (
    <CommunityLayout>
      <div className="p-4 sm:p-6 space-y-8 max-w-4xl mx-auto">

        {/* ─── Hero Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute -inset-x-4 -inset-y-2 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute top-0 left-1/4 w-64 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-24 bg-accent/5 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70">
              /// COMUNIDAD_VDRC
            </span>
            <h1 className="text-3xl sm:text-4xl font-mono font-bold text-foreground mt-2">
              Tu espacio para <span className="text-gradient">conectar</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl leading-relaxed">
              Comparte descubrimientos, pide ayuda, muestra tus proyectos y aprende de las 11 generaciones del taller.
              Desde startups hasta family offices — todos aprendiendo juntos.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-[2px] w-24 mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-transparent origin-left"
            />
          </div>
        </motion.div>

        {/* ─── Quick Actions ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-wrap gap-2.5"
        >
          {[
            { to: '/chat', icon: MessageCircle, label: 'Chat en vivo', color: 'text-primary', live: true },
            { to: '/forum', icon: Hash, label: 'Foro', color: 'text-purple-400' },
            { to: '/leaderboard', icon: Trophy, label: 'Leaderboard', color: 'text-yellow-400' },
            { to: '/calendar', icon: Calendar, label: 'Calendario', color: 'text-accent' },
          ].map(action => (
            <Link
              key={action.to}
              to={action.to}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill hover:border-primary/20 hover:bg-white/[0.06] active:scale-[0.97] transition-all text-sm font-medium group"
            >
              <action.icon className={`w-4 h-4 ${action.color} group-hover:scale-110 transition-transform`} />
              {action.label}
              {action.live && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[9px] py-0 px-1.5">LIVE</Badge>
              )}
            </Link>
          ))}
        </motion.div>

        {/* ─── Stats Grid ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { value: spaces?.length || 0, label: 'Espacios', icon: Sparkles, color: 'text-primary' },
            { value: totalPosts, label: 'Posts', icon: MessageSquare, color: 'text-accent' },
            { value: 11, label: 'Generaciones', icon: BookOpen, color: 'text-purple-400' },
            { value: '+150', label: 'Participantes', icon: Users, color: 'text-yellow-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              className="glass glass-specular p-4 rounded-2xl text-center group hover:scale-[1.02] transition-transform"
            >
              <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-2 opacity-50 group-hover:opacity-100 transition-opacity`} />
              <div className="text-2xl font-mono font-bold text-primary">{stat.value}</div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Online Users ─── */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass glass-specular p-4 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">En linea ahora</span>
              </div>
              <OnlineUsers showCount maxAvatars={8} />
            </div>
          </motion.div>
        )}

        {/* ─── Spaces Grid ─── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="font-mono font-semibold text-sm tracking-wider uppercase">Espacios de discusion</h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">{spaces?.length || 0} espacios</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {spaces?.map((space, i) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
              >
                <Link to={`/community/${space.slug}`}>
                  <Card className={`glass glass-specular ${spaceBorders[i % spaceBorders.length]} transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] group overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${spaceGradients[i % spaceGradients.length]} opacity-30 group-hover:opacity-50 transition-opacity`} />
                    <CardContent className="p-5 relative">
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          className="text-3xl shrink-0"
                        >
                          {space.icon_emoji || '💬'}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {space.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {space.description}
                          </p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {space.post_count || 0} posts
                            </span>
                            {space.member_count > 0 && (
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {space.member_count}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Conversation starters (when no posts) ─── */}
        {(!recentPosts || recentPosts.length === 0) && !postsLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <h2 className="font-mono font-semibold text-sm tracking-wider uppercase">Empieza la conversacion</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  emoji: '🔧',
                  title: 'Comparte tu herramienta favorita',
                  desc: '¿Que herramienta de IA cambio tu flujo de trabajo? Cuentanos en',
                  space: spaces?.[0],
                },
                {
                  emoji: '💡',
                  title: 'Muestra tu proyecto',
                  desc: '¿Construiste algo con vibe coding? Muestra el resultado en',
                  space: spaces?.find(s => s.name === 'Proyectos') || spaces?.[3],
                },
                {
                  emoji: '❓',
                  title: 'Haz una pregunta',
                  desc: '¿Necesitas ayuda con alguna herramienta o concepto? Pregunta en',
                  space: spaces?.find(s => s.name === 'Ayuda') || spaces?.[4],
                },
              ].map((starter, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                >
                  <Link
                    to={starter.space ? `/community/${starter.space.slug}` : '/community'}
                    className="group block h-full"
                  >
                    <div className="glass glass-specular p-5 rounded-2xl h-full transition-all duration-300 hover:scale-[1.02] hover:border-primary/20 border border-transparent">
                      <span className="text-2xl">{starter.emoji}</span>
                      <h3 className="font-semibold text-sm mt-3 mb-1.5 group-hover:text-primary transition-colors">
                        {starter.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {starter.desc}{' '}
                        <span className="text-primary font-medium">
                          {starter.space?.icon_emoji} {starter.space?.name || 'un espacio'}
                        </span>
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-xs text-primary/60 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <PenLine className="w-3 h-3" />
                        Publicar
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Recent Activity Feed ─── */}
        {recentPosts && recentPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <h2 className="font-mono font-semibold text-sm tracking-wider uppercase">Actividad reciente</h2>
              </div>
              <span className="text-xs text-muted-foreground font-mono">{recentPosts.length} posts</span>
            </div>

            <div className="space-y-2">
              {recentPosts.map((post: any, i: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                >
                  <Link to={`/community/${post.spaces?.slug}/post/${post.id}`}>
                    <Card className="glass border-border/30 hover:border-primary/30 transition-all duration-200 group hover:scale-[1.01] active:scale-[0.99]">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-lg shrink-0 mt-0.5">
                            {post.spaces?.icon_emoji || '💬'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {post.title || post.content.slice(0, 120)}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                              <span className="font-medium">{post.author?.full_name || 'Anonimo'}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es })}
                              </span>
                              <span className="text-muted-foreground/50 hidden sm:inline">{post.spaces?.name}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground/70">
                              {post.is_pinned && (
                                <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-yellow-500/30 text-yellow-500">
                                  <Pin className="w-2.5 h-2.5 mr-1" />
                                  Fijado
                                </Badge>
                              )}
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {post.likes_count || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {post.comments_count || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Posts loading skeleton ─── */}
        {postsLoading && (
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg skeleton-shimmer shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                    <div className="h-3 w-1/2 rounded skeleton-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Discussion Topics ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <h2 className="font-mono font-semibold text-sm tracking-wider uppercase">Temas trending</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { emoji: '🤖', topic: 'Claude vs ChatGPT — cuando usar cada uno', count: '12 opiniones' },
              { emoji: '⚡', topic: 'Automatizaciones con Make que te ahorran horas', count: '8 workflows' },
              { emoji: '💻', topic: 'Apps creadas con Vibe Coding por participantes', count: '15 proyectos' },
              { emoji: '📊', topic: 'Excel + IA — formulas que Claude genera mejor', count: '6 templates' },
              { emoji: '🎯', topic: 'Mejores prompts CROP compartidos', count: '20+ prompts' },
              { emoji: '🔐', topic: 'Tips de seguridad digital y Bitwarden', count: '5 guias' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.04 }}
                className="glass rounded-xl p-3 flex items-center gap-3 hover:border-primary/15 transition-all cursor-pointer group"
              >
                <span className="text-lg">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate group-hover:text-primary transition-colors">{item.topic}</p>
                  <p className="text-[10px] text-muted-foreground">{item.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── How to participate ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass glass-tinted p-6 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Como participar</h3>
              <p className="text-xs text-muted-foreground mb-3">La comunidad VDRC es un espacio seguro para compartir, preguntar y crecer juntos. No hay preguntas tontas — todos empezamos de cero.</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { step: '1', text: 'Elige un espacio y lee lo que otros comparten', emoji: '👀' },
                  { step: '2', text: 'Publica tu primera pregunta, tip o proyecto', emoji: '✍️' },
                  { step: '3', text: 'Gana XP, sube de nivel y aparece en el leaderboard', emoji: '🏆' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-[10px] font-mono font-bold text-primary shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                      <span className="text-sm">{item.emoji}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Quick links ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap gap-2"
        >
          {[
            { to: '/dictionary', label: 'Diccionario Digital', icon: BookOpen, color: 'text-blue-400' },
            { to: '/tools', label: 'Herramientas IA', icon: Zap, color: 'text-yellow-400' },
            { to: '/playground', label: 'Lab IA', icon: Sparkles, color: 'text-primary' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl glass-pill text-xs text-muted-foreground hover:text-foreground transition-all"
            >
              <link.icon className={`w-3.5 h-3.5 ${link.color}`} />
              {link.label}
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </motion.div>
      </div>
    </CommunityLayout>
  );
}
