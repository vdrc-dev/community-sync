import { useState } from 'react';
import { useSpacePosts, usePostLikes, type SpacePost, type Space } from '@/hooks/useSpaces';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Pin, Send, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface SpaceFeedProps {
  space: Space;
}

export function SpaceFeed({ space }: SpaceFeedProps) {
  const { posts, isLoading, createPost } = useSpacePosts(space.id);
  const { user } = useAuth();
  const [showComposer, setShowComposer] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await createPost.mutateAsync({ title: title.trim() || undefined, content });
    setTitle('');
    setContent('');
    setShowComposer(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Space Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{space.icon_emoji}</span>
          <div>
            <h1 className="text-2xl font-mono font-bold text-foreground">{space.name}</h1>
            <p className="text-sm text-muted-foreground">{space.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{space.post_count} posts</span>
          <span>{space.member_count} miembros</span>
        </div>
      </div>

      {/* Composer */}
      {user && (
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            {!showComposer ? (
              <button
                onClick={() => setShowComposer(true)}
                className="flex items-center gap-3 w-full text-left"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm flex-1 py-2 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
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
                  onChange={e => setContent(e.target.value)}
                  rows={4}
                  className="border-none bg-transparent resize-none placeholder:text-muted-foreground/50 px-0 focus-visible:ring-0"
                  autoFocus
                />
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ImageIcon className="h-4 w-4 mr-1" /> Media
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowComposer(false)}>
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSubmit}
                      disabled={!content.trim() || createPost.isPending}
                      className="bg-primary text-primary-foreground"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Publicar
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
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 bg-muted rounded" />
                    <div className="h-2 w-16 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-3 w-full bg-muted rounded" />
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
      <Card className="border-border/50 hover:border-primary/20 transition-all duration-300 group">
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
          <div className="flex items-center gap-4 pt-1">
            <button
              onClick={() => toggleLike.mutate()}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                userLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${userLiked ? 'fill-current' : ''}`} />
              <span className="tabular-nums">{post.likes_count}</span>
            </button>
            <Link
              to={`/community/${spaceSlug}/post/${post.id}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
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
