import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { useBookmarks, ResourceType } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { 
  Bookmark, 
  Trash2, 
  Search,
  MessageSquare,
  Wrench,
  BookOpen,
  Sparkles,
  Tag,
  Heart,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const resourceIcons: Record<ResourceType, React.ReactNode> = {
  class: <BookOpen className="h-4 w-4" />,
  tool: <Wrench className="h-4 w-4" />,
  post: <MessageSquare className="h-4 w-4" />,
  prompt: <Sparkles className="h-4 w-4" />,
};

const resourceLabels: Record<ResourceType, string> = {
  class: 'Clase',
  tool: 'Herramienta',
  post: 'Post',
  prompt: 'Prompt',
};

const FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'class', label: 'Clases' },
  { value: 'tool', label: 'Herramientas' },
  { value: 'post', label: 'Posts' },
  { value: 'prompt', label: 'Prompts' },
];

export default function Bookmarks() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bookmarks, isLoading, toggleBookmark, allTags } = useBookmarks();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];
    
    return bookmarks.filter((b) => {
      if (selectedType !== 'all' && b.resource_type !== selectedType) return false;
      if (selectedTag && !b.tags.includes(selectedTag)) return false;
      
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesNote = b.note?.toLowerCase().includes(searchLower);
        const matchesTags = b.tags.some(t => t.toLowerCase().includes(searchLower));
        if (!matchesNote && !matchesTags) return false;
      }
      
      return true;
    });
  }, [bookmarks, selectedType, selectedTag, search]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    bookmarks?.forEach(b => {
      counts[b.resource_type] = (counts[b.resource_type] || 0) + 1;
    });
    return counts;
  }, [bookmarks]);

  if (!user) {
    return (
      <Layout>
        <div className="page-container section-py">
          <EmptyState
            icon={Heart}
            title="Inicia sesión"
            description="Necesitas iniciar sesión para ver tus favoritos"
            action={{
              label: 'Iniciar sesión',
              onClick: () => navigate('/auth')
            }}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container section-py">
        <PageHeader
          title={<>Mis <span className="text-gradient">Favoritos</span></>}
          description="Tu colección personal de recursos guardados"
          badge={{ 
            label: `${bookmarks?.length || 0} guardados`, 
            icon: <Bookmark className="w-3 h-3" /> 
          }}
          breadcrumbs={[{ label: 'Favoritos' }]}
        />

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en favoritos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>

          {/* Tag filters */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </motion.div>

        {/* Tabs by Type */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-6">
          <TabsList className="bg-muted/50 p-1 flex-wrap h-auto">
            {FILTERS.map((filter) => {
              const count = filter.value === 'all' 
                ? bookmarks?.length || 0 
                : typeCounts[filter.value] || 0;
              
              if (filter.value !== 'all' && count === 0) return null;
              
              return (
                <TabsTrigger key={filter.value} value={filter.value} className="gap-2">
                  {filter.label}
                  <Badge variant="secondary" className="ml-1 bg-background/50 text-xs">
                    {count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredBookmarks.length === 0 ? (
            <div className="py-12">
              <EmptyState
                icon={Bookmark}
                title={bookmarks?.length === 0 ? 'Sin favoritos todavía' : 'No hay resultados'}
                description={
                  bookmarks?.length === 0 
                    ? 'Guarda clases, herramientas y posts usando el ícono de bookmark'
                    : 'Intenta con otros filtros'
                }
                action={search || selectedTag ? {
                  label: 'Limpiar filtros',
                  onClick: () => {
                    setSearch('');
                    setSelectedTag(null);
                  }
                } : undefined}
              />
            </div>
          ) : (
            <TabsContent value={selectedType} className="mt-6">
              <motion.div layout className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredBookmarks.map((bookmark, index) => (
                    <motion.div
                      key={bookmark.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: 0.05 * Math.min(index, 8) }}
                    >
                      <Card className="card-premium glow-hover group">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              {resourceIcons[bookmark.resource_type as ResourceType]}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {resourceLabels[bookmark.resource_type as ResourceType]}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(bookmark.created_at), {
                                    addSuffix: true,
                                    locale: es,
                                  })}
                                </span>
                              </div>
                              
                              {bookmark.note && (
                                <p className="text-sm text-foreground mb-2 line-clamp-2">
                                  {bookmark.note}
                                </p>
                              )}

                              {bookmark.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {bookmark.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                              onClick={() => toggleBookmark({ 
                                type: bookmark.resource_type as ResourceType, 
                                resourceId: bookmark.resource_id 
                              })}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
