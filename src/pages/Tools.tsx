import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, 
  ExternalLink, 
  Star, 
  Loader2, 
  Grid3X3, 
  List,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import { ToolTracker } from '@/components/tools/ToolTracker';
import { ToolsHeroStats, FeaturedToolsCarousel } from '@/components/tools/ToolsHeroStats';
import { VirtualizedGrid } from '@/components/virtualized/VirtualizedList';
import { useDebouncedValue } from '@/hooks/usePerformance';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const categories = [
  { value: 'all', label: 'Todas', icon: Grid3X3, count: 0 },
  { value: 'Chat', label: 'Chat IA', icon: Sparkles, count: 0 },
  { value: 'Search', label: 'Búsqueda', icon: Search, count: 0 },
  { value: 'Code', label: 'Código', icon: Zap, count: 0 },
  { value: 'Video', label: 'Video', icon: TrendingUp, count: 0 },
  { value: 'Productivity', label: 'Productividad', icon: Star, count: 0 },
  { value: 'Research', label: 'Investigación', icon: TrendingUp, count: 0 },
];

const pricingOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'Free', label: 'Gratis' },
  { value: 'Freemium', label: 'Freemium' },
  { value: 'Paid', label: 'Pago' },
];

interface Tool {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  pricing: string | null;
  url: string | null;
  icon_emoji: string | null;
  is_featured: boolean | null;
}

// Enhanced tool card component
const ToolCard = ({ tool, viewMode }: { tool: Tool; viewMode: 'grid' | 'list' }) => {
  const pricingColor = useMemo(() => {
    switch (tool.pricing) {
      case 'Free': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Freemium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Paid': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  }, [tool.pricing]);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="group"
      >
        <Card className="glass border-border/50 hover:border-primary/30 transition-all">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-2xl group-hover:border-primary/30 transition-colors flex-shrink-0">
                {tool.icon_emoji || '🔧'}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  {tool.is_featured && (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  )}
                  <Badge variant="outline" className={`${pricingColor} ml-auto`}>
                    {tool.pricing || 'N/A'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {tool.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <ToolTracker toolId={tool.id} toolName={tool.name} compact />
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group glass border-border/50 hover:border-primary/30 transition-all overflow-hidden h-full">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-muted to-muted/50 border border-border flex items-center justify-center text-3xl group-hover:border-primary/30 group-hover:scale-110 transition-all flex-shrink-0">
              {tool.icon_emoji || '🔧'}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                {tool.is_featured && (
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {tool.category && (
                  <span className="text-xs text-muted-foreground">
                    {tool.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          {tool.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {tool.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <Badge variant="outline" className={pricingColor}>
              {tool.pricing || 'N/A'}
            </Badge>

            {tool.url && (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Visitar
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <ToolTracker toolId={tool.id} toolName={tool.name} compact />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Tools() {
  const { user } = useAuth();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const debouncedSearch = useDebouncedValue(searchQuery, 200);

  const { data: tools, isLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data as Tool[];
    },
    staleTime: 1000 * 60 * 10,
  });

  // Category counts
  const categoryCounts = useMemo(() => {
    if (!tools) return {};
    const counts: Record<string, number> = { all: tools.length };
    tools.forEach(tool => {
      if (tool.category) {
        counts[tool.category] = (counts[tool.category] || 0) + 1;
      }
    });
    return counts;
  }, [tools]);

  // Memoized filtering
  const filteredTools = useMemo(() => {
    if (!tools) return [];
    
    return tools.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        tool.description?.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || tool.category === selectedCategory;
      
      const matchesPricing = 
        selectedPricing === 'all' || tool.pricing === selectedPricing;
      
      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [tools, debouncedSearch, selectedCategory, selectedPricing]);

  const featuredTools = useMemo(() => 
    tools?.filter(t => t.is_featured) || [], 
    [tools]
  );

  const renderTool = useCallback((tool: Tool) => (
    <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
  ), [viewMode]);

  const shouldVirtualize = filteredTools.length > 50;

  return (
    <Layout>
      <div className="page-container section-py">
        {/* Page Header */}
        <PageHeader
          title={<>Catálogo <span className="text-gradient">IA</span></>}
          description="Explora, trackea y domina las mejores herramientas de inteligencia artificial"
          badge={{ label: `${tools?.length || 0} herramientas`, icon: <Sparkles className="w-3 h-3 mr-1" /> }}
          actions={
            <Link to="/my-tools">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                <Star className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Mi Stack</span>
              </Button>
            </Link>
          }
        />

        {/* Personal Stats (logged in users) */}
        {user && <ToolsHeroStats />}

        {/* Featured Carousel */}
        {featuredTools.length > 0 && (
          <FeaturedToolsCarousel tools={featuredTools} />
        )}

        {/* Search and Filters Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar herramientas, categorías, funciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 bg-muted/50 border-border focus:border-primary text-base"
              />
            </div>
            
            {/* View Toggle & Filter Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
              
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')}>
                <TabsList className="h-12">
                  <TabsTrigger value="grid" className="px-4">
                    <Grid3X3 className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="px-4">
                    <List className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-border/50 space-y-4">
                  {/* Categories */}
                  <div>
                    <p className="text-sm font-medium mb-2">Categoría</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat.value}
                          variant={selectedCategory === cat.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(cat.value)}
                          className={selectedCategory === cat.value 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'border-border hover:border-primary/50'
                          }
                        >
                          <cat.icon className="w-3 h-3 mr-1" />
                          {cat.label}
                          {categoryCounts[cat.value] !== undefined && (
                            <span className="ml-1 text-xs opacity-70">
                              ({categoryCounts[cat.value]})
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <p className="text-sm font-medium mb-2">Precio</p>
                    <div className="flex flex-wrap gap-2">
                      {pricingOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={selectedPricing === option.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedPricing(option.value)}
                          className={selectedPricing === option.value 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'border-border hover:border-primary/50'
                          }
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredTools.length} herramienta{filteredTools.length !== 1 ? 's' : ''} encontrada{filteredTools.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Tools Grid/List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="text-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Cargando herramientas...</p>
              </div>
            </motion.div>
          ) : filteredTools.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium mb-2">No se encontraron herramientas</p>
              <p className="text-muted-foreground">Intenta con otros filtros o términos de búsqueda</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPricing('all');
                }}
              >
                Limpiar filtros
              </Button>
            </motion.div>
          ) : viewMode === 'list' ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} viewMode="list" />
              ))}
            </motion.div>
          ) : shouldVirtualize ? (
            <motion.div
              key="virtualized"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VirtualizedGrid
                items={filteredTools}
                renderItem={renderTool}
                estimateRowHeight={320}
                columns={4}
                gap={16}
                className="min-h-[600px]"
              />
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} viewMode="grid" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
