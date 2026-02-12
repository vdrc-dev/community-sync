import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSpaces } from '@/hooks/useSpaces';
import { CommunityLayout } from '@/components/community/CommunityLayout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, TrendingUp, Users, ArrowRight, Pin, Heart, Clock, Sparkles } from 'lucide-react';
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
        .limit(5);
      if (error) throw error;

      // Fetch author profiles
      const authorIds = [...new Set((data || []).map(p => p.author_id))];
      if (authorIds.length === 0) return [];
      
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', authorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      return (data || []).map(post => ({
        ...post,
        author: profileMap.get(post.author_id) || { full_name: 'Anonimo', avatar_url: null },
      }));
    },
    staleTime: 1000 * 60 * 2,
  });
}

// Gradient backgrounds for space cards
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
  const navigate = useNavigate();

  // Auto-redirect to first space on desktop
  useEffect(() => {
    if (spaces && spaces.length > 0 && window.innerWidth >= 1024) {
      const defaultSpace = spaces.find(s => s.is_default) || spaces[0];
      navigate(`/community/${defaultSpace.slug}`, { replace: true });
    }
  }, [spaces, navigate]);

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70">
            /// COMUNIDAD_VDRC
          </span>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-foreground mt-2">
            Espacios
          </h1>
          <p className="text-muted-foreground mt-1">
            Conecta, comparte y aprende con la comunidad
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50 text-center">
            <div className="text-2xl font-mono font-bold text-primary">{spaces?.length || 0}</div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mt-1">Espacios</div>
          </div>
          <div className="p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50 text-center">
            <div className="text-2xl font-mono font-bold text-primary">{totalPosts}</div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mt-1">Posts</div>
          </div>
          <div className="p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50 text-center">
            <div className="text-2xl font-mono font-bold text-primary">{totalMembers || '—'}</div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mt-1">Miembros</div>
          </div>
        </motion.div>

        {/* Spaces Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-mono font-semibold text-sm tracking-wider uppercase">Espacios</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {spaces?.map((space, i) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={`/community/${space.slug}`}>
                  <Card className={`${spaceBorders[i % spaceBorders.length]} transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group overflow-hidden`}>
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${spaceGradients[i % spaceGradients.length]} opacity-50`} />

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

        {/* Recent Activity Feed */}
        {recentPosts && recentPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h2 className="font-mono font-semibold text-sm tracking-wider uppercase">Actividad reciente</h2>
            </div>

            <div className="space-y-3">
              {recentPosts.map((post: any, i: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Link to={`/community/${post.spaces?.slug}/post/${post.id}`}>
                    <Card className="border-border/30 hover:border-primary/30 transition-all duration-200 group">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {/* Space icon */}
                          <span className="text-lg shrink-0 mt-0.5">
                            {post.spaces?.icon_emoji || '💬'}
                          </span>
                          <div className="flex-1 min-w-0">
                            {/* Title or content preview */}
                            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {post.title || post.content.slice(0, 80)}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                              <span>{post.author?.full_name || 'Anonimo'}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es })}
                              </span>
                              <span className="text-muted-foreground/50">{post.spaces?.name}</span>
                            </div>
                            {/* Post stats */}
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
      </div>
    </CommunityLayout>
  );
}
