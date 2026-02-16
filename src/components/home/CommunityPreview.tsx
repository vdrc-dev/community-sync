import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowRight, Users, MessageSquare, MessageCircle, Hash, 
  Heart, Clock, Zap, Trophy, BookOpen 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface CommunityPreviewProps {
  isAuthenticated: boolean;
}

export function CommunityPreview({ isAuthenticated }: CommunityPreviewProps) {
  // Fetch recent posts
  const { data: recentPosts } = useQuery({
    queryKey: ['home-community-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('space_posts')
        .select('id, title, content, author_id, likes_count, comments_count, created_at, spaces!inner(name, slug, icon_emoji)')
        .order('created_at', { ascending: false })
        .limit(4);
      if (error) throw error;

      const authorIds = [...new Set((data || []).map(p => p.author_id))];
      if (authorIds.length === 0) return [];
      
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name')
        .in('user_id', authorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      return (data || []).map(post => ({
        ...post,
        author_name: profileMap.get(post.author_id)?.full_name || 'Participante',
      }));
    },
    staleTime: 1000 * 60 * 3,
  });

  // Fetch spaces count
  const { data: spacesData } = useQuery({
    queryKey: ['home-spaces-count'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spaces')
        .select('id, name, icon_emoji, post_count')
        .order('post_count', { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const interactionModes = [
    { icon: MessageSquare, label: 'Espacios', desc: 'Discusiones temáticas', color: 'text-primary', href: '/community' },
    { icon: MessageCircle, label: 'Chat en vivo', desc: 'Mensajería en tiempo real', color: 'text-accent', href: '/chat' },
    { icon: Hash, label: 'Foro', desc: 'Preguntas y respuestas', color: 'text-purple-400', href: '/forum' },
    { icon: Trophy, label: 'Leaderboard', desc: 'Rankings y logros', color: 'text-yellow-400', href: '/leaderboard' },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent/70">
            /// COMUNIDAD_VDRC
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mt-3">
            Aprende con{' '}
            <span className="text-gradient">otros</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg mt-2">
            Startups de 550 empleados, family offices, profesores universitarios, arquitectos, consultores de energía, content managers, abogados y cromañones tecnológicos — todos aprendiendo juntos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Interaction Modes */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Formas de interactuar
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {interactionModes.map((mode, i) => (
                <motion.div
                  key={mode.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={isAuthenticated ? mode.href : '/auth'} className="group block">
                    <div className="glass glass-specular p-4 rounded-2xl transition-all duration-300 hover:scale-[1.03] h-full">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <mode.icon className={`w-5 h-5 ${mode.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {mode.label}
                          </h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {mode.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Active Spaces */}
            {spacesData && spacesData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mt-6 mb-3">
                  Espacios activos
                </p>
                <div className="flex flex-wrap gap-2">
                  {spacesData.map((space) => (
                    <Link
                      key={space.id}
                      to={isAuthenticated ? `/community/${space.name.toLowerCase().replace(/\s+/g, '-')}` : '/auth'}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill hover:border-primary/15 hover:bg-white/[0.06] transition-all text-sm"
                    >
                      <span>{space.icon_emoji || '💬'}</span>
                      <span className="text-xs">{space.name}</span>
                      {space.post_count > 0 && (
                        <span className="text-[10px] text-muted-foreground">({space.post_count})</span>
                      )}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
                Actividad reciente
              </p>
              <Link
                to={isAuthenticated ? '/community' : '/auth'}
                className="text-xs font-mono text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                Ver todo <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentPosts && recentPosts.length > 0 ? (
              <div className="space-y-2">
                {recentPosts.map((post: any, i: number) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={isAuthenticated ? `/community/${post.spaces?.slug}/post/${post.id}` : '/auth'}
                      className="group block"
                    >
                      <div className="glass border-border/30 hover:border-primary/30 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01]">
                        <div className="flex items-start gap-3">
                          <span className="text-lg shrink-0">{post.spaces?.icon_emoji || '💬'}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {post.title || post.content?.slice(0, 80)}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-muted-foreground">
                              <span>{post.author_name}</span>
                              <span>·</span>
                              <span className="flex items-center gap-0.5">
                                <Clock className="w-3 h-3" />
                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es })}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground/70">
                              <span className="flex items-center gap-0.5">
                                <Heart className="w-3 h-3" /> {post.likes_count || 0}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <MessageSquare className="w-3 h-3" /> {post.comments_count || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass glass-specular p-8 rounded-2xl text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">La comunidad te espera</p>
                <p className="text-xs text-muted-foreground">
                  Comparte, pregunta y colabora con otros participantes.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button asChild size="lg" variant="outline" className="font-mono rounded-2xl border-white/[0.08] bg-white/[0.04] backdrop-blur-xl hover:border-accent/20 hover:bg-accent/5 group">
            <Link to={isAuthenticated ? '/community' : '/auth'}>
              <Users className="w-4 h-4 mr-2 text-accent" />
              Explorar la comunidad
              <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
