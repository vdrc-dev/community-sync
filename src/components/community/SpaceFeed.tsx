import { useState } from 'react';
import { useSpacePosts, usePostLikes, type SpacePost, type Space } from '@/hooks/useSpaces';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Pin, Send, ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const MAX_CONTENT_LENGTH = 2000;

interface SpaceFeedProps {
  space: Space;
}

export function SpaceFeed({ space }: SpaceFeedProps) {
  const { posts, isLoading, createPost } = useSpacePosts(space.id);
  const { user } = useAuth();
  const [showComposer, setShowComposer] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      await createPost.mutateAsync({ title: title.trim() || undefined, content });
      setTitle('');
      setContent('');
      setShowComposer(false);
      toast({ title: 'Post publicado', description: 'Tu publicación se compartió con la comunidad.' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo publicar. Intenta de nuevo.', variant: 'destructive' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Space Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 flex items-center justify-center text-2xl">
            {space.icon_emoji}
          </div>
          <div>
            <h1 className="text-2xl font-mono font-bold text-foreground">{space.name}</h1>
            <p className="text-sm text-muted-foreground">{space.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
          <span className="px-2 py-0.5 rounded-md bg-muted/50">{space.post_count} posts</span>
          <span className="px-2 py-0.5 rounded-md bg-muted/50">{space.member_count} miembros</span>
        </div>
      </div>

      {/* Composer */}
      {user && (
        <Card className="border-border/30 bg-card/40 backdrop-blur-sm">
          <CardContent className="p-4">
            {!showComposer ? (
              <button
                onClick={() => setShowComposer(true)}
                className="flex items-center gap-3 w-full text-left group"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm flex-1 py-2 px-3 rounded-lg bg-muted/30 border border-border/30 group-hover:bg-muted/50 group-hover:border-primary/20 transition-all duration-300">
                  Escribe algo para la comunidad...
                </span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <Input
                  placeholder="Título (opcional)"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="border-none bg-transparent text-lg font-medium placeholder:text-muted-foreground/50 px-0 focus-visible:ring-0"
                />
                <Textarea
                  placeholder="¿Qué quieres compartir?"
                  value={content}
                  onChange={e => {
                    if (e.target.value.length <= MAX_CONTENT_LENGTH) {
                      setContent(e.target.value);
                    }
                  }}
                  rows={4}
                  className="border-none bg-transparent resize-none placeholder:text-muted-foreground/50 px-0 focus-visible:ring-0"
                  autoFocus
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-muted-foreground min-h-[36px]">
                      <ImageIcon className="h-4 w-4 mr-1" /> Media
                    </Button>
                    <span className={`text-xs font-mono ${content.length > MAX_CONTENT_LENGTH * 0.9 ? 'text-destructive' : 'text-muted-foreground/50'}`}>
                      {content.length}/{MAX_CONTENT_LENGTH}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowComposer(false)} className="min-h-[36px]">
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSubmit}
                      disabled={!content.trim() || createPost.isPending}
                      className="bg-primary text-primary-foreground min-h-[36px]"
                    >
                      {createPost.isPending ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4 mr-1" />
                      )}
                      {createPost.isPending ? 'Publicando...' : 'Publicar'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Posts Feed */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="border-border/30 bg-card/40">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full skeleton-shimmer" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 skeleton-shimmer rounded" />
                    <div className="h-2 w-16 skeleton-shimmer rounded" />
                  </div>
                </div>
                <div className="h-4 w-3/4 skeleton-shimmer rounded" />
                <div className="h-3 w-full skeleton-shimmer rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts?.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">💬</span>
          <h3 className="text-lg font-mono font-bold text-foreground">No hay posts aún</h3>
          <p className="text-sm text-muted-foreground mt-1">Sé el primero en publicar algo</p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {posts?.map((post, index) => (
            <PostCard key={post.id} post={post} spaceSlug={space.slug} index={index} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

function PostCard({ post, spaceSlug, index }: { post: SpacePost; spaceSlug: string; index: number }) {
  const { userLiked, toggleLike } = usePostLikes(post.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 group">
        <CardContent className="p-4 space-y-3">
          {/* Author row */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {(post.author?.full_name || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {post.author?.full_name || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es })}
              </p>
            </div>
            {post.is_pinned && (
              <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
                <Pin className="h-3 w-3 mr-1" /> Fijado
              </Badge>
            )}
          </div>

          {/* Content */}
          <Link to={`/community/${spaceSlug}/post/${post.id}`} className="block">
            {post.title && (
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            )}
            <p className="text-sm text-muted-foreground line-clamp-4 mt-1 whitespace-pre-wrap">
              {post.content}
            </p>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1 pt-1 -ml-2">
            <button
              onClick={() => toggleLike.mutate()}
              className={`flex items-center gap-1.5 text-sm transition-colors rounded-lg px-3 py-2 min-h-[44px] ${
                userLiked ? 'text-red-500 bg-red-500/5' : 'text-muted-foreground hover:text-red-500 hover:bg-red-500/5'
              }`}
              aria-label={userLiked ? 'Quitar like' : 'Dar like'}
            >
              <Heart className={`h-4 w-4 ${userLiked ? 'fill-current' : ''}`} />
              <span className="tabular-nums">{post.likes_count}</span>
            </button>
            <Link
              to={`/community/${spaceSlug}/post/${post.id}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded-lg px-3 py-2 min-h-[44px]"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="tabular-nums">{post.comments_count}</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
