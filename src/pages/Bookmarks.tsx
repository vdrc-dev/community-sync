import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Search, Tag, BookOpen, Wrench, MessageSquare, Sparkles, Trash2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useBookmarks, ResourceType } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

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

  // Filter bookmarks
  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];
    
    return bookmarks.filter((b) => {
      // Type filter
      if (selectedType !== 'all' && b.resource_type !== selectedType) return false;
      
      // Tag filter
      if (selectedTag && !b.tags.includes(selectedTag)) return false;
      
      // Search filter (in notes and tags)
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesNote = b.note?.toLowerCase().includes(searchLower);
        const matchesTags = b.tags.some(t => t.toLowerCase().includes(searchLower));
        if (!matchesNote && !matchesTags) return false;
      }
      
      return true;
    });
  }, [bookmarks, selectedType, selectedTag, search]);

  if (!user) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <Bookmark className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Inicia sesión para ver tus favoritos</h2>
          <p className="text-muted-foreground mb-4">
            Guarda clases, herramientas y posts para acceder rápidamente
          </p>
          <Button onClick={() => navigate('/auth')}>
            Iniciar sesión
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bookmark className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Mis Favoritos</h1>
          </div>
          <p className="text-muted-foreground">
            Tu colección personal de recursos guardados
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en favoritos..."
              className="pl-10"
            />
          </div>

          {/* Type filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {FILTERS.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedType === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(filter.value)}
                className="shrink-0"
              >
                {filter.label}
              </Button>
            ))}
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

        {/* Bookmarks list */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : filteredBookmarks.length > 0 ? (
          <motion.div layout className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredBookmarks.map((bookmark) => (
                <motion.div
                  key={bookmark.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="group hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          {resourceIcons[bookmark.resource_type as ResourceType]}
                        </div>

                        {/* Content */}
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

                          {/* Tags */}
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

                        {/* Delete button */}
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
        ) : (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {bookmarks?.length === 0 ? 'Sin favoritos todavía' : 'No hay resultados'}
            </h3>
            <p className="text-muted-foreground">
              {bookmarks?.length === 0 
                ? 'Guarda clases, herramientas y posts usando el ícono de bookmark'
                : 'Intenta con otros filtros'
              }
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
