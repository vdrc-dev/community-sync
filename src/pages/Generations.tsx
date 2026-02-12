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
import { Search, Calendar, ChevronRight, Loader2, GraduationCap, BookOpen, Users, Sparkles } from 'lucide-react';

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
            activeCount > 0 ? (
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20 gap-1 badge-pulse">
                <Sparkles className="w-3 h-3" />
                {activeCount} activa{activeCount > 1 ? 's' : ''}
              </Badge>
            ) : undefined
          }
        />

        {/* Quick stats */}
        {generations && generations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-8 flex-wrap"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{generations.length} generaciones</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/5 border border-accent/10">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">+200 participantes</span>
            </div>
            {activeCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/5 border border-green-500/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-400">{activeCount} en curso</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative max-w-md mb-8"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar generación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50"
          />
        </motion.div>

        {/* Generations Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-56 rounded-xl skeleton-shimmer" />
            ))}
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
                  className="group block relative rounded-xl card-premium glow-hover overflow-hidden h-full"
                >
                  {/* Background decoration */}
                  {gen.cover_image_url && (
                    <div 
                      className="absolute inset-0 opacity-10 bg-cover bg-center transition-opacity group-hover:opacity-20"
                      style={{ backgroundImage: `url(${gen.cover_image_url})` }}
                    />
                  )}
                  
                  {/* Top gradient accent */}
                  <div className={`h-1 w-full ${gen.is_active ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-primary/50 to-accent/30'}`} />
                  
                  <div className="relative z-10 p-6">
                    {/* Status badge */}
                    {gen.is_active && (
                      <Badge className="absolute top-4 right-4 bg-green-500/20 text-green-400 border-green-500/30 badge-pulse gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Activo
                      </Badge>
                    )}

                    {/* Generation code */}
                    <motion.div 
                      className="icon-glow inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="font-mono font-bold text-primary text-lg">
                        {gen.code.replace('GEN-', '')}
                      </span>
                    </motion.div>

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
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </motion.div>
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
