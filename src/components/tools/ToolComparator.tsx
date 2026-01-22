import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Scale, X, Check, Minus, ExternalLink, Star } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string | null;
  icon_emoji: string | null;
  category: string | null;
  pricing: string | null;
  url: string | null;
  is_featured: boolean | null;
  pros: string[] | null;
  cons: string[] | null;
  use_cases: string[] | null;
  best_for: string | null;
}

export function ToolComparator() {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const { data: tools } = useQuery({
    queryKey: ['tools-for-comparison'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Tool[];
    },
  });

  const selectedToolsData = useMemo(() => {
    return tools?.filter(t => selectedTools.includes(t.id)) || [];
  }, [tools, selectedTools]);

  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(prev => prev.filter(id => id !== toolId));
    } else if (selectedTools.length < 4) {
      setSelectedTools(prev => [...prev, toolId]);
    }
  };

  const pricingColor = (pricing: string | null) => {
    switch (pricing) {
      case 'Free': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Freemium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Paid': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Group tools by category
  const toolsByCategory = useMemo(() => {
    const grouped: Record<string, Tool[]> = {};
    tools?.forEach(tool => {
      const category = tool.category || 'Otros';
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(tool);
    });
    return grouped;
  }, [tools]);

  return (
    <div className="space-y-6">
      {/* Tool Selection */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Selecciona hasta 4 herramientas para comparar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-4">
              {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
                <div key={category}>
                  <p className="text-xs font-medium text-muted-foreground mb-2">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {categoryTools.map(tool => (
                      <Button
                        key={tool.id}
                        variant={selectedTools.includes(tool.id) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleTool(tool.id)}
                        disabled={!selectedTools.includes(tool.id) && selectedTools.length >= 4}
                        className="h-8"
                      >
                        <span className="mr-1">{tool.icon_emoji}</span>
                        {tool.name}
                        {selectedTools.includes(tool.id) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedToolsData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground w-32">
                        Característica
                      </th>
                      {selectedToolsData.map(tool => (
                        <th key={tool.id} className="p-4 text-center min-w-[180px]">
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl">{tool.icon_emoji}</span>
                            <span className="font-semibold">{tool.name}</span>
                            {tool.is_featured && (
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Description */}
                    <tr className="border-b border-border/50">
                      <td className="p-4 text-sm font-medium text-muted-foreground">
                        Descripción
                      </td>
                      {selectedToolsData.map(tool => (
                        <td key={tool.id} className="p-4 text-sm text-center">
                          {tool.description || '-'}
                        </td>
                      ))}
                    </tr>

                    {/* Pricing */}
                    <tr className="border-b border-border/50">
                      <td className="p-4 text-sm font-medium text-muted-foreground">
                        Precio
                      </td>
                      {selectedToolsData.map(tool => (
                        <td key={tool.id} className="p-4 text-center">
                          <Badge variant="outline" className={pricingColor(tool.pricing)}>
                            {tool.pricing || 'N/A'}
                          </Badge>
                        </td>
                      ))}
                    </tr>

                    {/* Category */}
                    <tr className="border-b border-border/50">
                      <td className="p-4 text-sm font-medium text-muted-foreground">
                        Categoría
                      </td>
                      {selectedToolsData.map(tool => (
                        <td key={tool.id} className="p-4 text-sm text-center">
                          {tool.category || '-'}
                        </td>
                      ))}
                    </tr>

                    {/* Best For */}
                    <tr className="border-b border-border/50">
                      <td className="p-4 text-sm font-medium text-muted-foreground">
                        Mejor para
                      </td>
                      {selectedToolsData.map(tool => (
                        <td key={tool.id} className="p-4 text-sm text-center">
                          {tool.best_for || '-'}
                        </td>
                      ))}
                    </tr>

                    {/* Pros */}
                    <tr className="border-b border-border/50">
                      <td className="p-4 text-sm font-medium text-muted-foreground align-top">
                        <span className="text-green-400">Pros</span>
                      </td>
                      {selectedToolsData.map(tool => (
                        <td key={tool.id} className="p-4 text-sm align-top">
                          {tool.pros && tool.pros.length > 0 ? (
                            <ul className="space-y-1">
                              {tool.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-1 text-left">
                                  <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-xs">{pro}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Cons */}
                    <tr className="border-b border-border/50">
                      <td className="p-4 text-sm font-medium text-muted-foreground align-top">
                        <span className="text-red-400">Contras</span>
                      </td>
                      {selectedToolsData.map(tool => (
                        <td key={tool.id} className="p-4 text-sm align-top">
                          {tool.cons && tool.cons.length > 0 ? (
                            <ul className="space-y-1">
                              {tool.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-1 text-left">
                                  <Minus className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-xs">{con}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Use Cases */}
                    <tr className="border-b border-border/50">
                      <td className="p-4 text-sm font-medium text-muted-foreground align-top">
                        Casos de uso
                      </td>
                      {selectedToolsData.map(tool => (
                        <td key={tool.id} className="p-4 text-sm align-top">
                          {tool.use_cases && tool.use_cases.length > 0 ? (
                            <div className="flex flex-wrap gap-1 justify-center">
                              {tool.use_cases.map((useCase, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {useCase}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Links */}
                    <tr>
                      <td className="p-4 text-sm font-medium text-muted-foreground">
                        Enlace
                      </td>
                      {selectedToolsData.map(tool => (
                        <td key={tool.id} className="p-4 text-center">
                          {tool.url ? (
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                            >
                              Visitar <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {selectedTools.length === 0 && (
        <Card className="glass border-dashed border-muted-foreground/30">
          <CardContent className="p-8 text-center">
            <Scale className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              Selecciona herramientas arriba para compararlas
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
