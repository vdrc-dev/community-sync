import { useState, useMemo, useCallback } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, ExternalLink, Star, Loader2 } from 'lucide-react';
import { ToolTracker } from '@/components/tools/ToolTracker';
import { VirtualizedGrid } from '@/components/virtualized/VirtualizedList';
import { useDebouncedValue } from '@/hooks/usePerformance';

const categories = [
  { value: 'all', label: 'Todas' },
  { value: 'Chat', label: 'Chat' },
  { value: 'Search', label: 'Búsqueda' },
  { value: 'Code', label: 'Código' },
  { value: 'Video', label: 'Video' },
  { value: 'Productivity', label: 'Productividad' },
  { value: 'Research', label: 'Investigación' },
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

// Memoized tool card component
const ToolCard = ({ tool }: { tool: Tool }) => {
  const pricingColor = useMemo(() => {
    switch (tool.pricing) {
      case 'Free': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Freemium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Paid': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  }, [tool.pricing]);

  return (
    <Card className="group glass border-border/50 hover:border-primary/30 transition-all hover-lift overflow-hidden h-full">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-2xl group-hover:border-primary/30 transition-colors flex-shrink-0">
            {tool.icon_emoji}
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
            
            {tool.category && (
              <span className="text-xs text-muted-foreground">
                {tool.category}
              </span>
            )}
          </div>
        </div>

        {tool.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
            {tool.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <Badge 
            variant="outline" 
            className={pricingColor}
          >
            {tool.pricing || 'N/A'}
          </Badge>

          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Visitar
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-border/50">
          <ToolTracker toolId={tool.id} toolName={tool.name} compact />
        </div>
      </CardContent>
    </Card>
  );
};

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Debounce search for performance
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
    staleTime: 1000 * 60 * 10, // 10 minutes - tools don't change often
  });

  // Memoized filtering
  const filteredTools = useMemo(() => {
    if (!tools) return [];
    
    return tools.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        tool.description?.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [tools, debouncedSearch, selectedCategory]);

  // Render function for virtualized grid
  const renderTool = useCallback((tool: Tool) => (
    <ToolCard key={tool.id} tool={tool} />
  ), []);

  // Use virtualization only for large datasets (50+ items)
  const shouldVirtualize = filteredTools.length > 50;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
            Herramientas <span className="text-gradient">IA</span>
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Catálogo de herramientas de inteligencia artificial mencionadas en los talleres
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar herramientas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border focus:border-primary"
            />
          </div>
          
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
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No se encontraron herramientas</p>
          </div>
        ) : shouldVirtualize ? (
          // Virtualized grid for large datasets
          <VirtualizedGrid
            items={filteredTools}
            renderItem={renderTool}
            estimateRowHeight={280}
            columns={4}
            gap={16}
            className="min-h-[600px]"
          />
        ) : (
          // Regular grid for smaller datasets
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
