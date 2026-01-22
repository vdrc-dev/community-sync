import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Eye, 
  Pin, 
  Loader2,
  Lock,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Forum() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: categories } = useQuery({
    queryKey: ['forum-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ['forum-posts', activeCategory],
    queryFn: async () => {
      let query = supabase
        .from('forum_posts')
        .select(`
          *,
          category:forum_categories(*)
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (activeCategory !== 'all') {
        query = query.eq('category_id', activeCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card className="glass border-border/50 max-w-md mx-auto">
            <CardContent className="py-16 text-center">
              <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comunidad exclusiva</h3>
              <p className="text-muted-foreground mb-6">
                Inicia sesión para acceder al foro de participantes
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/auth">Iniciar sesión</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-2">
              <span className="text-gradient">Comunidad</span>
            </h1>
            <p className="text-muted-foreground">
              Conecta con otros participantes del taller
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 glow-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nueva publicación
          </Button>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en el foro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('all')}
              className={activeCategory === 'all' 
                ? 'bg-primary hover:bg-primary/90' 
                : 'border-border hover:border-primary/50'
              }
            >
              Todos
            </Button>
            {categories?.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id 
                  ? 'bg-primary hover:bg-primary/90' 
                  : 'border-border hover:border-primary/50'
                }
              >
                {cat.icon_emoji} {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredPosts?.length === 0 ? (
          <Card className="glass border-border/50">
            <CardContent className="py-16 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay publicaciones aún</h3>
              <p className="text-muted-foreground mb-6">
                ¡Sé el primero en iniciar una conversación!
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Crear publicación
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredPosts?.map((post) => (
              <Card 
                key={post.id} 
                className="glass border-border/50 hover:border-primary/30 transition-all cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Author avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-primary text-sm flex-shrink-0">
                      ?
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {post.is_pinned && (
                          <Pin className="w-3 h-3 text-primary" />
                        )}
                        <h3 className="font-semibold hover:text-primary transition-colors truncate">
                          {post.title}
                        </h3>
                        {post.is_locked && (
                          <Lock className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="outline" className="border-border">
                          {post.category?.icon_emoji} {post.category?.name}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(post.created_at), { 
                            addSuffix: true, 
                            locale: es 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views_count}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
