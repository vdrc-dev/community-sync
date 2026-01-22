import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, Calendar, Users, ChevronRight, Loader2 } from 'lucide-react';

export default function Generations() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: generations, isLoading } = useQuery({
    queryKey: ['generations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const filteredGenerations = generations?.filter((gen) =>
    gen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gen.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gen.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
            Generaciones del <span className="text-gradient">Taller</span>
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Explora los materiales de cada versión del Taller de Productividad Digital
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar generación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border focus:border-primary"
          />
        </div>

        {/* Generations Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredGenerations?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No se encontraron generaciones</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGenerations?.map((gen) => (
              <Link
                key={gen.id}
                to={`/generations/${gen.code}`}
                className="group relative p-6 rounded-xl glass border-border/50 hover:border-primary/30 transition-all hover-lift overflow-hidden"
              >
                {/* Background decoration */}
                {gen.cover_image_url && (
                  <div 
                    className="absolute inset-0 opacity-10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${gen.cover_image_url})` }}
                  />
                )}
                
                <div className="relative z-10">
                  {/* Status badge */}
                  {gen.is_active && (
                    <Badge className="absolute top-0 right-0 bg-primary/20 text-primary border-primary/30">
                      Activo
                    </Badge>
                  )}

                  {/* Generation code */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 mb-4 group-hover:glow-primary transition-all">
                    <span className="font-mono font-bold text-primary text-lg">
                      {gen.code.replace('GEN-', '')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {gen.name}
                  </h3>

                  {/* Description */}
                  {gen.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {gen.description}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {gen.start_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(gen.start_date).toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-6 right-6">
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state for no data */}
        {!isLoading && (!generations || generations.length === 0) && (
          <div className="text-center py-20 glass rounded-xl border-border/50">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Las generaciones del taller aparecerán aquí. Vuelve pronto para explorar los recursos.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
