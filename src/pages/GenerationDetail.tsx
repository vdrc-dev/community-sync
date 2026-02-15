import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ClassProgressCheckbox } from '@/components/progress/ClassProgressCheckbox';
import { GenerationProgressBar } from '@/components/progress/GenerationProgressBar';
import { ClassNotes } from '@/components/notes/ClassNotes';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { useActivityResume } from '@/hooks/useActivityResume';
import { EmptyState } from '@/components/ui/empty-state';
import { motion } from 'framer-motion';
import { 
  Play, 
  Folder, 
  FileText, 
  BookOpen, 
  Wrench,
  ExternalLink,
  Loader2,
  Lock,
  Presentation,
  Sparkles,
  ChevronRight,
  Home,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { usePresentations } from '@/hooks/usePresentations';

const MODULE_COLORS = [
  { gradient: 'from-blue-500/20 to-blue-500/5', text: 'text-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/10', ring: 'ring-blue-500/20' },
  { gradient: 'from-primary/20 to-primary/5', text: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/10', ring: 'ring-primary/20' },
  { gradient: 'from-purple-500/20 to-purple-500/5', text: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/10', ring: 'ring-purple-500/20' },
  { gradient: 'from-accent/20 to-accent/5', text: 'text-accent', border: 'border-accent/20', bg: 'bg-accent/10', ring: 'ring-accent/20' },
];
const MODULE_ICONS = ['🛡️', '🤖', '🎨', '💻'];
const MODULE_NAMES = ['Higiene Digital', 'IA & Productividad', 'Comunicacion y Creacion', 'Vibe Coding'];
const MODULE_DESCRIPTIONS = [
  'Inbox Zero, Bitwarden, perfiles, Context Engineering',
  'Era Agentica, CROP, Agentes, MCP',
  'Gamma, NotebookLM, Claude Code, Cursor',
  'Lovable + Supabase + GitHub + Cursor'
];

export default function GenerationDetail() {
  const { code } = useParams<{ code: string }>();
  const { user, isAdmin } = useAuth();
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const { trackActivity } = useActivityResume();
  const { presentations, createPresentation, isCreating } = usePresentations();

  const { data: generation, isLoading: loadingGen } = useQuery({
    queryKey: ['generation', code],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('code', code)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: classes, isLoading: loadingClasses } = useQuery({
    queryKey: ['classes', generation?.id],
    queryFn: async () => {
      if (!generation?.id) return [];
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          class_tools(
            tool:tools(*)
          )
        `)
        .eq('generation_id', generation.id)
        .order('class_number', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!generation?.id,
  });

  // Track activity when viewing generation
  useEffect(() => {
    if (generation && user) {
      trackActivity({
        resourceType: 'generation',
        resourceId: generation.id,
        resourceTitle: generation.name,
        resourceMeta: { code: generation.code },
      });
    }
  }, [generation?.id, user?.id]);

  if (loadingGen) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Cargando generacion...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!generation) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <h2 className="text-2xl font-mono font-bold mb-4">Generacion no encontrada</h2>
            <Button asChild>
              <Link to="/generations">Volver a generaciones</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const genNumber = parseInt(generation.code.replace(/GEN-0*/i, ''), 10);

  const dateRange = generation.start_date ? (
    <>
      {new Date(generation.start_date).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
      {generation.end_date && (
        <> — {new Date(generation.end_date).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}</>
      )}
    </>
  ) : null;

  return (
    <Layout>
      <div className="page-container py-6 md:py-10 max-w-5xl mx-auto">
        
        {/* ─── Breadcrumb ─── */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/generations" className="hover:text-foreground transition-colors">Generaciones</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{generation.code}</span>
        </nav>

        {/* ─── Hero: Title + Progress ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">
            <div>
              {generation.is_active && (
                <Badge variant="outline" className="mb-3 border-primary/40 bg-primary/5 text-primary text-xs">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  En curso
                </Badge>
              )}
              <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight">{generation.name}</h1>
              {dateRange && (
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-mono">{dateRange}</span>
                </div>
              )}
            </div>
            
            {/* Progress card */}
            {classes && classes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="lg:min-w-[280px]"
              >
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tu progreso</span>
                  </div>
                  <GenerationProgressBar classes={classes} />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        {!user ? (
          <Card className="glass border-border/50">
            <CardContent className="py-16 text-center">
              <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contenido exclusivo</h3>
              <p className="text-muted-foreground mb-6">
                Inicia sesion para acceder a los recursos de esta generacion
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/auth">Iniciar sesion</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-10">

            {/* ─── SECTION 1: Slides por semana ─── */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Presentation className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base">Slides por semana</h2>
                    <p className="text-xs text-muted-foreground">4 modulos interactivos</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((moduleNum) => {
                  const colors = MODULE_COLORS[moduleNum - 1];
                  
                  return (
                    <motion.div
                      key={moduleNum}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + moduleNum * 0.06 }}
                    >
                      <Link
                        to={genNumber >= 9 ? `/slides/gen${genNumber}s${moduleNum}` : `/presentations/module/${moduleNum}`}
                        className="group block h-full"
                      >
                        <div className="glass glass-specular relative rounded-2xl overflow-hidden h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-40`} />
                          <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-2xl sm:text-3xl">{MODULE_ICONS[moduleNum - 1]}</span>
                              <Badge variant="outline" className={`${colors.border} ${colors.text} text-[10px] font-mono shrink-0`}>
                                S{moduleNum}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                              {MODULE_NAMES[moduleNum - 1]}
                            </h3>
                            <p className="text-[11px] text-muted-foreground line-clamp-2 flex-1">
                              {MODULE_DESCRIPTIONS[moduleNum - 1]}
                            </p>
                            <div className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${colors.text} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                              <Play className="w-3 h-3" />
                              Ver slides
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

            </motion.section>

            {/* ─── Divider ─── */}
            <div className="divider-gradient" />

            {/* ─── SECTION 2: Cronograma de clases ─── */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-base">Cronograma</h2>
                  <p className="text-xs text-muted-foreground">{classes?.length || 0} clases programadas</p>
                </div>
              </div>
              
              {loadingClasses ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : classes?.length === 0 ? (
                <Card className="card-static">
                  <EmptyState
                    icon={BookOpen}
                    title="Sin clases aun"
                    description="Las clases de esta generacion apareceran aqui cuando esten disponibles"
                  />
                </Card>
              ) : (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[23px] top-3 bottom-3 w-px bg-border/60 hidden sm:block" />
                  
                  <div className="space-y-3">
                    {classes?.map((cls, i) => {
                      const classPresentation = presentations?.find(p => p.class_id === cls.id);
                      const colors = MODULE_COLORS[i % 4];
                      const isExpanded = expandedClass === cls.id;
                      
                      return (
                        <motion.div
                          key={cls.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.06 }}
                          className="relative"
                        >
                          {/* Timeline dot */}
                          <div className={`absolute left-[18px] top-[22px] w-[11px] h-[11px] rounded-full border-2 ${colors.border} ${colors.bg} z-10 hidden sm:block`} />
                          
                          <div
                            className={`sm:ml-12 glass rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:border-primary/20 ${isExpanded ? 'border-primary/20' : ''}`}
                            onClick={() => setExpandedClass(isExpanded ? null : cls.id)}
                          >
                            {/* Class header row */}
                            <div className="flex items-center gap-3 p-4">
                              <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center font-mono font-bold ${colors.text} shrink-0 text-sm`}>
                                {cls.class_number}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm sm:text-base truncate">{cls.title}</h3>
                                {cls.class_date && (
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(cls.class_date).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <ClassProgressCheckbox classId={cls.id} />
                              </div>
                            </div>

                            {/* Expandable detail */}
                            <motion.div
                              initial={false}
                              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-1 border-t border-border/30">
                                {cls.description && (
                                  <p className="text-sm text-muted-foreground mb-4">
                                    {cls.description}
                                  </p>
                                )}

                                {/* Resource links */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {cls.recording_url && (
                                    <a
                                      href={cls.recording_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition-colors"
                                    >
                                      <Play className="w-4 h-4" />
                                      Grabacion
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  {cls.drive_folder_url && (
                                    <a
                                      href={cls.drive_folder_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm hover:bg-yellow-500/20 transition-colors"
                                    >
                                      <Folder className="w-4 h-4" />
                                      Carpeta
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  {cls.slides_url && (
                                    <a
                                      href={cls.slides_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm hover:bg-blue-500/20 transition-colors"
                                    >
                                      <FileText className="w-4 h-4" />
                                      Slides
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  {classPresentation?.status === 'published' && (
                                    <Link
                                      to={`/presentations/${classPresentation.id}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-sm hover:bg-green-500/20 transition-colors"
                                    >
                                      <Play className="w-4 h-4" />
                                      Presentacion
                                    </Link>
                                  )}
                                  {cls.notes_content && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-green-500/20 text-green-400 hover:bg-green-500/10 rounded-xl"
                                    >
                                      <BookOpen className="w-4 h-4 mr-2" />
                                      Apuntes
                                    </Button>
                                  )}
                                </div>

                                {/* Admin actions */}
                                {isAdmin && (
                                  <div className="flex items-center gap-2 mb-3">
                                    {classPresentation ? (
                                      <Link
                                        to="/admin/presentations"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs hover:bg-yellow-500/20 transition-colors"
                                      >
                                        <Presentation className="w-3 h-3" />
                                        Editar presentacion
                                      </Link>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={(e) => { e.stopPropagation(); createPresentation(cls.id); }}
                                        disabled={isCreating}
                                        className="gap-1.5 text-xs border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10"
                                      >
                                        <Presentation className="w-3 h-3" />
                                        Diseñar
                                      </Button>
                                    )}
                                  </div>
                                )}

                                <div className="flex items-center gap-2">
                                  <BookmarkButton 
                                    resourceType="class" 
                                    resourceId={cls.id}
                                    showLabel
                                  />
                                </div>

                                {/* Personal Notes */}
                                <div onClick={(e) => e.stopPropagation()}>
                                  <ClassNotes classId={cls.id} classTitle={cls.title} className="mt-3" />
                                </div>

                                {/* Tools mentioned */}
                                {cls.class_tools && cls.class_tools.length > 0 && (
                                  <div className="mt-3 pt-3 border-t border-border/30">
                                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                      <Wrench className="w-3 h-3" />
                                      Herramientas:
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {cls.class_tools.map((ct: any) => (
                                        <Badge 
                                          key={ct.tool.id} 
                                          variant="outline" 
                                          className="border-border/50 text-xs"
                                        >
                                          {ct.tool.icon_emoji} {ct.tool.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.section>
          </div>
        )}
      </div>
    </Layout>
  );
}
