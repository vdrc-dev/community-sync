import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Zap,
  ArrowUpRight,
  GraduationCap,
  Compass
} from 'lucide-react';
import { ToolTracker } from '@/components/tools/ToolTracker';
import { ToolsHeroStats } from '@/components/tools/ToolsHeroStats';
import { useDebouncedValue } from '@/hooks/usePerformance';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const categories = [
  { value: 'all', label: 'Todas', icon: Grid3X3, count: 0 },
  { value: 'Chat', label: 'LLMs & Chatbots', icon: Sparkles, count: 0 },
  { value: 'Code', label: 'Vibe Coding', icon: Zap, count: 0 },
  { value: 'Video', label: 'Video, Imagen & Audio', icon: TrendingUp, count: 0 },
  { value: 'Productivity', label: 'Productividad', icon: Star, count: 0 },
  { value: 'Research', label: 'Investigación', icon: Search, count: 0 },
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
  source: string | null;
}

const ToolCard = ({ tool, viewMode, index = 0 }: { tool: Tool; viewMode: 'grid' | 'list'; index?: number }) => {
  const pricingColor = useMemo(() => {
    switch (tool.pricing) {
      case 'Free': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Freemium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Paid': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  }, [tool.pricing]);

  const categoryGradient = useMemo(() => {
    switch (tool.category) {
      case 'Chat': return 'from-emerald-500/20 to-cyan-500/10';
      case 'Code': return 'from-violet-500/20 to-blue-500/10';
      case 'Video': return 'from-pink-500/20 to-rose-500/10';
      case 'Productivity': return 'from-sky-500/20 to-indigo-500/10';
      case 'Research': return 'from-amber-500/20 to-orange-500/10';
      default: return 'from-primary/20 to-accent/10';
    }
  }, [tool.category]);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ delay: index * 0.03 }}
        className="group"
      >
        <Card className="glass border-border/30 hover:border-primary/40 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryGradient} border border-border/50 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300 flex-shrink-0`}>
                {tool.icon_emoji || '🔧'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  {tool.source === 'workshop' && (
                    <GraduationCap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
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
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors" title={`Abrir ${tool.name}`} aria-label={`Abrir ${tool.name}`}>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className="group relative glass border-border/30 hover:border-primary/40 transition-all duration-500 overflow-hidden h-full">
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.04), transparent 40%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/70 transition-all duration-500" />
        
        <CardContent className="p-5 flex flex-col h-full relative">
          <div className="flex items-start gap-4 mb-4">
            <motion.div 
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryGradient} border border-border/50 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {tool.icon_emoji || '🔧'}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate group-hover:text-primary transition-colors text-base">
                  {tool.name}
                </h3>
                {tool.source === 'workshop' && (
                  <GraduationCap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                )}
              </div>
              {tool.category && (
                <span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider">
                  {tool.category}
                </span>
              )}
            </div>
          </div>

          {tool.description && (
            <p className="text-sm text-muted-foreground/80 mb-5 line-clamp-2 flex-grow leading-relaxed">
              {tool.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <Badge variant="outline" className={`${pricingColor} text-xs`}>
              {tool.pricing || 'N/A'}
            </Badge>
            {tool.url && (
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary/70 hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                Explorar
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border/30">
            <ToolTracker toolId={tool.id} toolName={tool.name} compact />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title, subtitle, badge, gradient }: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  badge: string;
  gradient: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between mb-6 mt-12 first:mt-0"
  >
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-foreground" />
      </div>
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-wider">{subtitle}</p>
      </div>
    </div>
    <Badge variant="outline" className="text-xs border-border/40 text-muted-foreground/70">
      {badge}
    </Badge>
  </motion.div>
);

export default function Tools() {
  const { user } = useAuth();
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

  const workshopTools = useMemo(() => filteredTools.filter(t => t.source === 'workshop'), [filteredTools]);
  const communityTools = useMemo(() => filteredTools.filter(t => t.source !== 'workshop'), [filteredTools]);

  // Group tools by category within each section
  const groupByCategory = useCallback((toolsList: Tool[]) => {
    const groups: Record<string, Tool[]> = {};
    const categoryOrder = ['Chat', 'Code', 'Video', 'Productivity', 'Research'];
    
    toolsList.forEach(tool => {
      const cat = tool.category || 'Otros';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(tool);
    });

    return categoryOrder.filter(cat => groups[cat]).map(cat => ({
      category: cat,
      label: categories.find(c => c.value === cat)?.label || cat,
      tools: groups[cat],
    }));
  }, []);

  const workshopGroups = useMemo(() => groupByCategory(workshopTools), [groupByCategory, workshopTools]);
  const communityGroups = useMemo(() => groupByCategory(communityTools), [groupByCategory, communityTools]);

  const isSearchActive = debouncedSearch || selectedCategory !== 'all' || selectedPricing !== 'all';

  return (
    <Layout>
      <div className="page-container section-py relative">
        {/* Ambient background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-2">
          <span className="text-xs font-mono text-muted-foreground/50 tracking-widest">
            /// CATÁLOGO_HERRAMIENTAS
          </span>
        </motion.div>

        <PageHeader
          title={<>Catálogo <span className="text-gradient">IA</span></>}
          description="Las herramientas que usamos en el taller + más para que sigas explorando"
          badge={{ label: `${tools?.length || 0} herramientas`, icon: <Sparkles className="w-3 h-3 mr-1" /> }}
          actions={
            <Link to="/my-tools">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all">
                <Star className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Mi Stack</span>
              </Button>
            </Link>
          }
        />

        {user && <ToolsHeroStats />}

        {/* Educational Tips Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          {(() => {
            const tips = [
              { icon: '🎯', title: 'Regla de oro', text: 'Usa Perplexity para investigar, ChatGPT para crear, y Claude para analizar codigo y textos complejos.' },
              { icon: '🔄', title: 'Stack minimo viable', text: 'ChatGPT + Claude + Perplexity + Cursor = puedes hacer practicamente cualquier cosa con IA.' },
              { icon: '💡', title: 'Automatiza lo repetitivo', text: 'Si haces algo mas de 3 veces, automatizalo con Make o Zapier. Tu tiempo vale mas.' },
              { icon: '🧪', title: 'Compara siempre', text: 'Antes de adoptar una herramienta, prueba la tarea en 2-3 alternativas. Cada una tiene su superpoder.' },
              { icon: '📐', title: 'CROP en todo', text: 'El framework CROP (Contexto, Rol, Objetivo, Pasos) funciona en CUALQUIER herramienta de IA, no solo en ChatGPT.' },
            ];
            const todayTip = tips[new Date().getDate() % tips.length];
            return (
              <div className="glass rounded-2xl p-4 flex items-start gap-3 border-yellow-500/10 bg-yellow-500/[0.02]">
                <span className="text-xl">{todayTip.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-yellow-400/60 uppercase tracking-wider">Tip del dia</span>
                  <p className="text-sm text-foreground/80 mt-0.5">
                    <span className="font-semibold text-foreground">{todayTip.title}:</span> {todayTip.text}
                  </p>
                </div>
                <Link to="/dictionary" className="shrink-0 text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                  Diccionario <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })()}
        </motion.div>

        {/* Search & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative glass-strong rounded-2xl p-5 mb-8 border-border/30"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
          
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Buscar herramientas, categorías, funciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary/30 text-base rounded-xl transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-xl transition-all relative ${showFilters ? 'bg-primary/10 border-primary/40 text-primary' : 'border-border/50'}`}
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Filtros"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {(selectedCategory !== 'all' || selectedPricing !== 'all') && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {(selectedCategory !== 'all' ? 1 : 0) + (selectedPricing !== 'all' ? 1 : 0)}
                  </span>
                )}
              </Button>
              
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')}>
                <TabsList className="h-12 rounded-xl bg-background/50">
                  <TabsTrigger value="grid" className="px-4 rounded-lg">
                    <Grid3X3 className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="px-4 rounded-lg">
                    <List className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-5 border-t border-border/30 space-y-5">
                  {/* Clear all filters */}
                  {(selectedCategory !== 'all' || selectedPricing !== 'all') && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => { setSelectedCategory('all'); setSelectedPricing('all'); }}
                        className="text-xs text-primary hover:text-primary/80 font-mono transition-colors"
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-mono text-muted-foreground/70 mb-3 uppercase tracking-wider">Categoría</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat.value}
                          variant={selectedCategory === cat.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`rounded-lg transition-all ${selectedCategory === cat.value 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'border-border/40 hover:border-primary/50 hover:bg-primary/5'
                          }`}
                        >
                          <cat.icon className="w-3 h-3 mr-1.5" />
                          {cat.label}
                          {categoryCounts[cat.value] !== undefined && (
                            <span className="ml-1.5 text-xs opacity-60">
                              {categoryCounts[cat.value]}
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-muted-foreground/70 mb-3 uppercase tracking-wider">Precio</p>
                    <div className="flex flex-wrap gap-2">
                      {pricingOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={selectedPricing === option.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedPricing(option.value)}
                          className={`rounded-lg transition-all ${selectedPricing === option.value 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'border-border/40 hover:border-primary/50 hover:bg-primary/5'
                          }`}
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-primary/50 to-transparent" />
            <p className="text-sm font-mono text-muted-foreground/70">
              {filteredTools.length} resultado{filteredTools.length !== 1 ? 's' : ''}
              {workshopTools.length > 0 && communityTools.length > 0 && !isSearchActive && (
                <span className="text-muted-foreground/50"> · {workshopTools.length} del taller · {communityTools.length} para explorar</span>
              )}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-primary/20 blur-xl animate-pulse" />
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4 relative" />
                </div>
                <p className="text-muted-foreground font-mono text-sm">Cargando herramientas...</p>
              </div>
            </motion.div>
          ) : filteredTools.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted/30 border border-border/30 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <p className="text-lg font-medium mb-2">No se encontraron herramientas</p>
              <p className="text-muted-foreground text-sm mb-6">Intenta con otros filtros o términos de búsqueda</p>
              <Button 
                variant="outline" 
                className="rounded-xl border-primary/30 hover:bg-primary/10"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedPricing('all'); }}
              >
                Limpiar filtros
              </Button>
            </motion.div>
          ) : isSearchActive ? (
            // Flat list when searching/filtering
            <motion.div key="search-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ToolGrid tools={filteredTools} viewMode={viewMode} />
            </motion.div>
          ) : (
            // Organized sections when no search is active
            <motion.div key="organized" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Workshop Section */}
              {workshopTools.length > 0 && (
                <div>
                  <SectionHeader
                    icon={GraduationCap}
                    title="Herramientas del Taller"
                    subtitle="WORKSHOP_TOOLS"
                    badge={`${workshopTools.length} herramientas`}
                    gradient="from-yellow-500/20 to-orange-500/10"
                  />
                  <p className="text-sm text-muted-foreground/70 mb-6 -mt-3 ml-[52px]">
                    Estas son las herramientas que revisamos juntos en el taller. Ya las conoces — ¡ahora domínalas!
                  </p>

                  {workshopGroups.map((group) => (
                    <div key={group.category} className="mb-8">
                      <div className="flex items-center gap-2 mb-4 ml-1">
                        <div className="h-px w-4 bg-primary/30" />
                        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">{group.label}</span>
                        <span className="text-xs text-muted-foreground/40">({group.tools.length})</span>
                        <div className="h-px flex-1 bg-border/20" />
                      </div>
                      <ToolGrid tools={group.tools} viewMode={viewMode} />
                    </div>
                  ))}
                </div>
              )}

              {/* Community / Explore Section */}
              {communityTools.length > 0 && (
                <div>
                  <SectionHeader
                    icon={Compass}
                    title="Explora por tu cuenta"
                    subtitle="EXPLORE_MORE"
                    badge={`${communityTools.length} herramientas`}
                    gradient="from-violet-500/20 to-blue-500/10"
                  />
                  <p className="text-sm text-muted-foreground/70 mb-6 -mt-3 ml-[52px]">
                    Herramientas adicionales que complementan lo aprendido. Investiga, prueba y encuentra tus favoritas.
                  </p>

                  {communityGroups.map((group) => (
                    <div key={group.category} className="mb-8">
                      <div className="flex items-center gap-2 mb-4 ml-1">
                        <div className="h-px w-4 bg-accent/30" />
                        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">{group.label}</span>
                        <span className="text-xs text-muted-foreground/40">({group.tools.length})</span>
                        <div className="h-px flex-1 bg-border/20" />
                      </div>
                      <ToolGrid tools={group.tools} viewMode={viewMode} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

// Extracted grid/list renderer
function ToolGrid({ tools, viewMode }: { tools: Tool[]; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {tools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} viewMode="list" index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {tools.map((tool, index) => (
        <ToolCard key={tool.id} tool={tool} viewMode="grid" index={index} />
      ))}
    </div>
  );
}
