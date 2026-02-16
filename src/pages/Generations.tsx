import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/input';
import { SearchInput } from '@/components/ui/search-input';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, Calendar, ChevronRight, Loader2, GraduationCap, BookOpen, 
  Users, Sparkles, Rocket, ExternalLink, Clock, Presentation, 
  Play, ArrowRight, FolderOpen
} from 'lucide-react';

// Module color map for presentation badges
const MODULE_COLORS = [
  { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20' },
];

const MODULE_NAMES = ['Higiene Digital', 'IA & Productividad', 'Presentaciones con IA', 'Vibe Coding'];
const MODULE_ICONS = ['🛡️', '🤖', '🎨', '💻'];

/* ── Google Drive folders per generation ── */
const GENERATION_MATERIALS: Record<number, string> = {
  1: 'https://drive.google.com/drive/folders/1IqjBJpjB9KlnK2e0BIfJfLesaLDVGA1H?usp=sharing',
  2: 'https://drive.google.com/drive/folders/1NRo-U33wBnZTHoJyIGRIGB5ztbA4favv?usp=sharing',
  3: 'https://drive.google.com/drive/folders/1i5oQqKjoKm3qqB8SAlSuCeKVRvB38EHp?usp=sharing',
  4: 'https://drive.google.com/drive/folders/1cZr5P7gh25_67SY00zdHIQNjDsRzMHg4?usp=sharing',
  5: 'https://drive.google.com/drive/folders/1UHXOV2jRs1yPi2LMMPqX-NkxcukF-FXM?usp=sharing',
  6: 'https://drive.google.com/drive/folders/1otjBivaxa61t4a5PQ-s94j4Afu2iZvLZ?usp=sharing',
  7: 'https://drive.google.com/drive/folders/10oFF5FIsI4upeWLNwt1XPpEqIExR4yrP?usp=sharing',
  8: 'https://drive.google.com/drive/folders/1-tuuQTeD9ljfsIdn1MEvPPbg6vPHJ0mC?usp=sharing',
  9: 'https://drive.google.com/drive/folders/1zRkGMNafdrrM0iJruJ94L0Q1gF8Iktqr?usp=sharing',
  10: 'https://drive.google.com/drive/folders/1gNQ9AVsZIB0OM7FYSTCVazC4Xc-wZiwi?usp=sharing',
  11: 'https://drive.google.com/drive/folders/1PxXlr9RoGd9ZtZQvB52LsQCHVDB0K5dx?usp=sharing',
};

export default function Generations() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: generations, isLoading } = useQuery({
    queryKey: ['generations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .order('code', { ascending: true });
      
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

  // Extract generation number from code (e.g., "GEN-008" → 8)
  const getGenNumber = (code: string) => parseInt(code.replace('GEN-', '').replace('GEN-0', ''), 10);

  return (
    <Layout>
      <div className="page-container section-py">
        <PageHeader
          title={<>Las <span className="text-gradient">11 Generaciones</span></>}
          description="Desde abril 2025 — cada generación es un grupo unico de profesionales que transformaron su productividad digital con IA. 4 modulos intensivos, herramientas reales, y una comunidad que sigue creciendo."
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

        {/* Timeline stats */}
        {generations && generations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-8 flex-wrap"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{generations.length} generaciones</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">+150 participantes</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill">
              <Presentation className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">4 módulos por gen</span>
            </div>
            {activeCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill">
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
          className="max-w-md mb-8"
        >
          <SearchInput
            placeholder="Buscar por nombre, codigo o descripcion..."
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </motion.div>

        {/* Educational context */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="glass rounded-2xl p-4 mb-8 border-primary/5"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-primary/50 uppercase tracking-wider mb-0.5">Como funciona</p>
              <p className="text-sm text-foreground/70">Cada generacion cubre <span className="font-semibold text-foreground">4 modulos</span>: Higiene Digital, IA & Productividad, Presentaciones con IA, y Vibe Coding. Haz clic en cualquier generacion para ver sus clases, materiales y presentaciones.</p>
            </div>
          </div>
        </motion.div>

        {/* Generations Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 rounded-2xl skeleton-shimmer" />
            ))}
          </div>
        ) : !generations || generations.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="Próximamente"
            description="Las generaciones del taller aparecerán aquí."
          />
        ) : filteredGenerations?.length === 0 ? (
          <EmptyState
            icon={Search}
            title="Sin resultados"
            description="No se encontraron generaciones con ese término"
            action={{
              label: 'Limpiar búsqueda',
              onClick: () => setSearchQuery('')
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* Gen 11 Coming Soon Banner */}
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <a
                  href="https://vdrc.cl/talleres"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative rounded-2xl overflow-hidden"
                >
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent/40 via-primary/40 to-accent/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  
                  <div className="glass glass-specular relative p-6 sm:p-8 rounded-2xl border border-accent/20 group-hover:border-accent/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-start gap-5">
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/30 flex items-center justify-center shrink-0"
                        >
                          <Rocket className="w-8 h-8 text-accent" />
                        </motion.div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-accent/10 text-accent border-accent/30 font-mono text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              PRÓXIMAMENTE
                            </Badge>
                          </div>
                          <h3 className="text-2xl font-mono font-bold group-hover:text-accent transition-colors">
                            Generación <span className="text-gradient">11</span>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2 max-w-lg">
                            El Taller de Productividad Digital con IA vuelve el <span className="text-accent font-semibold">3 de marzo 2026</span>.
                            Higiene Digital, Productividad con IA, Presentaciones Automatizadas y Apps y Webs con IA.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-accent font-mono font-semibold group-hover:gap-3 transition-all shrink-0">
                        INSCRÍBETE
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            )}

            {/* Generations — reverse order so newest is first */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...filteredGenerations!].reverse().map((gen, index) => {
                const genNum = getGenNumber(gen.code);
                
                return (
                  <motion.div
                    key={gen.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * Math.min(index, 10) }}
                  >
                    <Link
                      to={`/generations/${gen.code}`}
                      className="group block relative rounded-2xl overflow-hidden h-full"
                    >
                      <div className="glass glass-specular relative h-full p-5 rounded-2xl transition-all duration-500 hover:scale-[1.02]">
                        {/* Active glow */}
                        {gen.is_active && (
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-green-500/30 animate-pulse pointer-events-none" />
                        )}

                        {/* Top row: number + status */}
                        <div className="flex items-center justify-between mb-4">
                          <motion.div 
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <span className="font-mono font-bold text-primary text-lg">
                              {String(genNum).padStart(2, '0')}
                            </span>
                          </motion.div>
                          {gen.is_active ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1 text-[10px]">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                              Activo
                            </Badge>
                          ) : (
                            <span className="text-[10px] font-mono text-muted-foreground/50">
                              {gen.code}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors">
                          {gen.name}
                        </h3>

                        {/* Date */}
                        {gen.start_date && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                            <Calendar className="w-3 h-3" />
                            {new Date(gen.start_date).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
                          </p>
                        )}

                        {/* Description */}
                        {gen.description && (
                          <p className="text-xs text-muted-foreground/80 mb-4 line-clamp-2 leading-relaxed">
                            {gen.description}
                          </p>
                        )}

                        {/* Materials link */}
                        {GENERATION_MATERIALS[genNum] && (
                          <a
                            href={GENERATION_MATERIALS[genNum]}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-yellow-400/80 hover:text-yellow-400 mb-3 transition-colors"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            Materiales
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </a>
                        )}

                        {/* Module presentations mini-badges */}
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {MODULE_NAMES.map((mod, i) => (
                            <span
                              key={mod}
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${MODULE_COLORS[i].bg} ${MODULE_COLORS[i].border} border ${MODULE_COLORS[i].text}`}
                              title={mod}
                            >
                              {MODULE_ICONS[i]} M{i + 1}
                            </span>
                          ))}
                        </div>

                        {/* Hover arrow */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
