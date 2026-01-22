import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, BookOpen, Bookmark, Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PromptCard } from '@/components/prompts/PromptCard';
import { usePrompts } from '@/hooks/usePrompts';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { value: 'all', label: 'Todos', icon: Sparkles },
  { value: 'writing', label: 'Escritura', icon: BookOpen },
  { value: 'code', label: 'Código', icon: BookOpen },
  { value: 'analysis', label: 'Análisis', icon: BookOpen },
  { value: 'creative', label: 'Creatividad', icon: BookOpen },
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

  // Filter prompts by search
  const filteredPrompts = prompts?.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.prompt_text.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  // Get saved prompt details
  const savedPromptIds = savedPrompts?.map(sp => sp.prompt_id) || [];
  const savedPromptDetails = prompts?.filter(p => savedPromptIds.includes(p.id)) || [];

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Biblioteca de Prompts</h1>
          </div>
          <p className="text-muted-foreground">
            Prompts listos para copiar y usar en tus herramientas de IA favoritas
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
              placeholder="Buscar prompts..."
              className="pl-10"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
                className="shrink-0 gap-1.5"
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="gap-1.5">
              <Sparkles className="h-4 w-4" />
              Todos
              {prompts && (
                <Badge variant="secondary" className="ml-1 h-5">
                  {filteredPrompts?.length || 0}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-1.5">
              <Bookmark className="h-4 w-4" />
              Guardados
              {savedPromptDetails.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5">
                  {savedPromptDetails.length}
                </Badge>
              )}
            </TabsTrigger>
            {user && (
              <TabsTrigger value="mine" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Mis prompts
                {myPrompts && myPrompts.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5">
                    {myPrompts.length}
                  </Badge>
                )}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all">
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-48 rounded-xl bg-muted/50 animate-pulse" />
                ))}
              </div>
            ) : filteredPrompts && filteredPrompts.length > 0 ? (
              <motion.div layout className="grid gap-4 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filteredPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      isSaved={isPromptSaved(prompt.id)}
                      onCopy={() => copyPrompt(prompt)}
                      onToggleSave={() => toggleSavePrompt(prompt.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No hay prompts todavía</h3>
                <p className="text-muted-foreground">
                  Los prompts aparecerán aquí cuando se agreguen
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {savedPromptDetails.length > 0 ? (
              <motion.div layout className="grid gap-4 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {savedPromptDetails.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      isSaved={true}
                      onCopy={() => copyPrompt(prompt)}
                      onToggleSave={() => toggleSavePrompt(prompt.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">Sin prompts guardados</h3>
                <p className="text-muted-foreground">
                  Guarda prompts para acceder rápidamente a ellos
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="mine">
            {myPrompts && myPrompts.length > 0 ? (
              <motion.div layout className="grid gap-4 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {myPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      isSaved={isPromptSaved(prompt.id)}
                      onCopy={() => copyPrompt(prompt)}
                      onToggleSave={() => toggleSavePrompt(prompt.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Plus className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">Crea tu primer prompt</h3>
                <p className="text-muted-foreground mb-4">
                  Guarda tus prompts favoritos para compartir con la comunidad
                </p>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Crear prompt
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
