import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { PromptCard } from '@/components/prompts/PromptCard';
import { usePrompts } from '@/hooks/usePrompts';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { EmptyState } from '@/components/ui/empty-state';
import { 
  Search, 
  MessageSquare, 
  Bookmark,
  Filter,
  Sparkles,
  Plus,
  BookOpen,
  Code2,
  BarChart3,
  Palette,
  Layers
} from 'lucide-react';

const CATEGORIES = [
  { value: 'all', label: 'Todos', icon: Layers },
  { value: 'writing', label: 'Escritura', icon: BookOpen },
  { value: 'code', label: 'Código', icon: Code2 },
  { value: 'analysis', label: 'Análisis', icon: BarChart3 },
  { value: 'creative', label: 'Creatividad', icon: Palette },
];

export default function Prompts() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  const { 
    prompts, 
    savedPrompts, 
    myPrompts, 
    isLoading, 
    isPromptSaved, 
    copyPrompt, 
    toggleSavePrompt 
  } = usePrompts(
    selectedCategory === 'all' ? undefined : selectedCategory
  );

  const filteredPrompts = useMemo(() => {
    let result = prompts || [];
    
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.prompt_text.toLowerCase().includes(query) ||
        p.tags?.some(t => t.toLowerCase().includes(query))
      );
    }

    return result;
  }, [prompts, search]);

  const savedPromptIds = savedPrompts?.map(sp => sp.prompt_id) || [];
  const savedPromptDetails = prompts?.filter(p => savedPromptIds.includes(p.id)) || [];
  const featuredCount = prompts?.filter(p => p.is_featured).length || 0;

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
  };

  const hasActiveFilters = search || selectedCategory !== 'all';

  return (
    <Layout>
      <div className="page-container section-py">
        <PageHeader
          title={<>Biblioteca de <span className="text-gradient">Prompts</span></>}
          description="Prompts optimizados y listos para usar con las herramientas de IA"
          badge={{ 
            label: `${prompts?.length || 0} prompts`, 
            icon: <MessageSquare className="w-3 h-3" /> 
          }}
          breadcrumbs={[{ label: 'Prompts' }]}
          actions={
            featuredCount > 0 ? (
              <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 gap-1">
                <Sparkles className="w-3 h-3" />
                {featuredCount} destacados
              </Badge>
            ) : undefined
          }
        />

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar prompts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden shrink-0 relative">
                  <Filter className="w-4 h-4" />
                  {hasActiveFilters && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <Button
                        key={cat.value}
                        variant={selectedCategory === cat.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(cat.value)}
                        className="gap-1.5"
                      >
                        <cat.icon className="w-3.5 h-3.5" />
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Category pills with enhanced styling */}
          <div className="hidden sm:flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.value} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`shrink-0 gap-1.5 transition-all duration-300 ${
                    selectedCategory === cat.value 
                      ? '' 
                      : 'hover:border-primary/30 hover:bg-primary/5'
                  }`}
                >
                  <cat.icon className="h-3.5 w-3.5" />
                  {cat.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-muted/50 p-1 border border-border/30">
            <TabsTrigger value="all" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Sparkles className="w-3 h-3" />
              Todos
              <Badge variant="secondary" className="ml-1 bg-background/50 text-xs">
                {filteredPrompts?.length || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2 data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-400">
              <Bookmark className="w-3 h-3" />
              <span className="hidden sm:inline">Guardados</span>
              {savedPromptDetails.length > 0 && (
                <Badge variant="secondary" className="ml-1 bg-yellow-500/20 text-yellow-400 text-xs">
                  {savedPromptDetails.length}
                </Badge>
              )}
            </TabsTrigger>
            {user && (
              <TabsTrigger value="mine" className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <Plus className="w-3 h-3" />
                <span className="hidden sm:inline">Mis prompts</span>
                {myPrompts && myPrompts.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {myPrompts.length}
                  </Badge>
                )}
              </TabsTrigger>
            )}
          </TabsList>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 rounded-xl skeleton-shimmer" />
              ))}
            </div>
          ) : (
            <>
              <TabsContent value="all" className="mt-6">
                {filteredPrompts && filteredPrompts.length > 0 ? (
                  <motion.div layout className="grid gap-4 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                      {filteredPrompts.map((prompt, index) => (
                        <motion.div
                          key={prompt.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * Math.min(index, 8) }}
                        >
                          <PromptCard
                            prompt={prompt}
                            isSaved={isPromptSaved(prompt.id)}
                            onCopy={() => copyPrompt(prompt)}
                            onToggleSave={() => toggleSavePrompt(prompt.id)}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <EmptyState
                    icon={Sparkles}
                    title="No hay prompts"
                    description={hasActiveFilters 
                      ? "No se encontraron prompts con los filtros aplicados" 
                      : "Los prompts aparecerán aquí cuando se agreguen"
                    }
                    action={hasActiveFilters ? {
                      label: 'Limpiar filtros',
                      onClick: clearFilters
                    } : undefined}
                  />
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                {savedPromptDetails.length > 0 ? (
                  <motion.div layout className="grid gap-4 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                      {savedPromptDetails.map((prompt, index) => (
                        <motion.div
                          key={prompt.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * Math.min(index, 8) }}
                        >
                          <PromptCard
                            prompt={prompt}
                            isSaved={true}
                            onCopy={() => copyPrompt(prompt)}
                            onToggleSave={() => toggleSavePrompt(prompt.id)}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <EmptyState
                    icon={Bookmark}
                    title="Sin prompts guardados"
                    description="Guarda prompts para acceder rápidamente a ellos"
                  />
                )}
              </TabsContent>

              <TabsContent value="mine" className="mt-6">
                {myPrompts && myPrompts.length > 0 ? (
                  <motion.div layout className="grid gap-4 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                      {myPrompts.map((prompt, index) => (
                        <motion.div
                          key={prompt.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * Math.min(index, 8) }}
                        >
                          <PromptCard
                            prompt={prompt}
                            isSaved={isPromptSaved(prompt.id)}
                            onCopy={() => copyPrompt(prompt)}
                            onToggleSave={() => toggleSavePrompt(prompt.id)}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <EmptyState
                    icon={Plus}
                    title="Crea tu primer prompt"
                    description="Guarda tus prompts favoritos para compartir con la comunidad"
                    action={{
                      label: 'Crear prompt',
                      onClick: () => {}
                    }}
                  />
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
