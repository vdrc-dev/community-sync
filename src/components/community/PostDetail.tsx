import { useState } from 'react';
import { usePostComments, usePostLikes, type SpacePost } from '@/hooks/useSpaces';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Pin, Send, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface PostDetailProps {
  post: SpacePost;
  spaceSlug: string;
}

export function PostDetail({ post, spaceSlug }: PostDetailProps) {
  const { comments, isLoading, addComment } = usePostComments(post.id);
  const { userLiked, toggleLike } = usePostLikes(post.id);
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    await addComment.mutateAsync({ content: commentText });
    setCommentText('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Back nav */}
      <Link
        to={`/community/${spaceSlug}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al espacio
      </Link>

      {/* Post */}
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {(post.author?.full_name || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{post.author?.full_name || 'Usuario'}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es })}
              </p>
            </div>
            {post.is_pinned && (
              <Badge variant="outline" className="ml-auto text-xs bg-primary/5 border-primary/20 text-primary">
                <Pin className="h-3 w-3 mr-1" /> Fijado
              </Badge>
            )}
          </div>

          {post.title && (
            <h1 className="text-xl font-mono font-bold text-foreground">{post.title}</h1>
          )}

          <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{post.content}</p>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => toggleLike.mutate()}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                userLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${userLiked ? 'fill-current' : ''}`} />
              <span>{post.likes_count} Me gusta</span>
            </button>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              {post.comments_count} Comentarios
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Comment composer */}
      {user && (
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 mt-1">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Escribe un comentario..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={2}
              className="resize-none"
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!commentText.trim() || addComment.isPending}
              >
                <Send className="h-3.5 w-3.5 mr-1" />
                Comentar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Separator />

      {/* Comments */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-sm text-muted-foreground py-8">Cargando comentarios...</div>
        ) : comments?.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-8">
            No hay comentarios aún. Sé el primero.
          </div>
        ) : (
          comments?.map((comment, i) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3"
            >
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarImage src={comment.author?.avatar_url || undefined} />
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                  {(comment.author?.full_name || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{comment.author?.full_name || 'Usuario'}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: es })}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
