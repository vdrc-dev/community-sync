import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, Calendar, ChevronRight, Loader2, GraduationCap, BookOpen } from 'lucide-react';

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

  const activeCount = generations?.filter(g => g.is_active).length || 0;

  return (
    <Layout>
      <div className="page-container section-py">
        <PageHeader
          title={<>Generaciones del <span className="text-gradient">Taller</span></>}
          description="Explora los materiales de cada versión del Taller de Productividad Digital"
          badge={{ 
            label: `${generations?.length || 0} generaciones`, 
            icon: <GraduationCap className="w-3 h-3" /> 
          }}
          breadcrumbs={[{ label: 'Generaciones' }]}
          actions={
            activeCount > 0 && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {activeCount} activa{activeCount > 1 ? 's' : ''}
              </Badge>
            )
          }
        />

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-md mb-8"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar generación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border focus:border-primary"
          />
        </motion.div>

        {/* Generations Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !generations || generations.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="Próximamente"
            description="Las generaciones del taller aparecerán aquí. Vuelve pronto para explorar los recursos."
          />
        ) : filteredGenerations?.length === 0 ? (
          <EmptyState
            icon={Search}
            title="Sin resultados"
            description="No se encontraron generaciones con ese término de búsqueda"
            action={{
              label: 'Limpiar búsqueda',
              onClick: () => setSearchQuery('')
            }}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGenerations?.map((gen, index) => (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * Math.min(index, 6) }}
              >
                <Link
                  to={`/generations/${gen.code}`}
                  className="group block relative p-6 rounded-xl card-premium glow-hover overflow-hidden h-full"
                >
                  {/* Background decoration */}
                  {gen.cover_image_url && (
                    <div 
                      className="absolute inset-0 opacity-10 bg-cover bg-center transition-opacity group-hover:opacity-20"
                      style={{ backgroundImage: `url(${gen.cover_image_url})` }}
                    />
                  )}
                  
                  <div className="relative z-10">
                    {/* Status badge */}
                    {gen.is_active && (
                      <Badge className="absolute top-0 right-0 bg-green-500/20 text-green-400 border-green-500/30 badge-pulse">
                        Activo
                      </Badge>
                    )}

                    {/* Generation code */}
                    <div className="icon-glow inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 mb-4 group-hover:scale-110 transition-transform">
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
