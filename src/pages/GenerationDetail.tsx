import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Users,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { usePresentations } from '@/hooks/usePresentations';

const MODULE_COLORS = [
  { gradient: 'from-blue-500/20 to-blue-500/5', text: 'text-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/10' },
  { gradient: 'from-primary/20 to-primary/5', text: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/10' },
  { gradient: 'from-purple-500/20 to-purple-500/5', text: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/10' },
  { gradient: 'from-accent/20 to-accent/5', text: 'text-accent', border: 'border-accent/20', bg: 'bg-accent/10' },
];
const MODULE_ICONS = ['🛡️', '🤖', '🎨', '💻'];

export default function GenerationDetail() {
  const { code } = useParams<{ code: string }>();
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
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
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!generation) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <h2 className="text-2xl font-mono font-bold mb-4">Generación no encontrada</h2>
            <Button asChild>
              <Link to="/generations">Volver a generaciones</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const genNumber = parseInt(generation.code.replace('GEN-', '').replace('GEN-0', ''), 10);

  return (
    <Layout>
      <div className="page-container section-py">
        {/* Page Header */}
        <PageHeader
          title={generation.name}
          description={generation.description || undefined}
          badge={generation.is_active ? { label: 'En curso', icon: <Sparkles className="w-3 h-3 mr-1" /> } : undefined}
          breadcrumbs={[
            { label: 'Generaciones', href: '/generations' },
            { label: generation.code }
          ]}
        />

        {/* Date range */}
        {generation.start_date && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground font-mono mb-6 -mt-2"
          >
            {new Date(generation.start_date).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
            {generation.end_date && (
              <> — {new Date(generation.end_date).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</>
            )}
          </motion.p>
        )}

        {/* Content */}
        {!user ? (
          <Card className="glass border-border/50">
            <CardContent className="py-16 text-center">
              <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contenido exclusivo</h3>
              <p className="text-muted-foreground mb-6">
                Inicia sesión para acceder a los recursos de esta generación
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/auth">Iniciar sesión</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="overview">Vista General</TabsTrigger>
                  <TabsTrigger value="classes">Clases</TabsTrigger>
                  <TabsTrigger value="presentations">Presentaciones</TabsTrigger>
                </TabsList>
                {classes && classes.length > 0 && (
                  <div className="w-full sm:w-64">
                    <GenerationProgressBar classes={classes} />
                  </div>
                )}
              </div>

              {/* OVERVIEW TAB */}
              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* Module Presentations Grid */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Presentation className="w-4 h-4 text-primary" />
                      <h3 className="font-mono font-semibold text-sm tracking-wider uppercase">Presentaciones del Módulo</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[1, 2, 3, 4].map((moduleNum) => {
                        const colors = MODULE_COLORS[moduleNum - 1];
                        const names = ['Higiene Digital', 'IA & Productividad', 'Presentaciones con IA', 'Vibe Coding'];
                        const descriptions = [
                          'Inbox Zero, Bitwarden, perfiles, Granola',
                          'ChatGPT, Claude, Gemini, Perplexity, Manus',
                          'Gama, Beautiful.ai, Napkin, Canva',
                          'Lovable + Supabase + GitHub + Cursor'
                        ];
                        
                        return (
                          <motion.div
                            key={moduleNum}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: moduleNum * 0.08 }}
                          >
                            <Link
                              to={`/presentations/module/${moduleNum}`}
                              className="group block"
                            >
                              <div className={`glass glass-specular relative p-5 rounded-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden h-full`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-30`} />
                                <div className="relative z-10">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl">{MODULE_ICONS[moduleNum - 1]}</span>
                                    <Badge variant="outline" className={`${colors.border} ${colors.text} text-[10px] font-mono`}>
                                      M{moduleNum}
                                    </Badge>
                                  </div>
                                  <h4 className={`font-semibold text-sm mb-1 group-hover:${colors.text} transition-colors`}>
                                    {names[moduleNum - 1]}
                                  </h4>
                                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                                    {descriptions[moduleNum - 1]}
                                  </p>
                                  <div className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${colors.text} opacity-0 group-hover:opacity-100 transition-all`}>
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
                  </div>

                  {/* Classes overview */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <h3 className="font-mono font-semibold text-sm tracking-wider uppercase">
                          Clases ({classes?.length || 0})
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab('classes')}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Ver todas <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                    
                    {loadingClasses ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : classes?.length === 0 ? (
                      <Card className="glass border-border/30">
                        <CardContent className="py-8 text-center">
                          <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Las clases aparecerán cuando estén disponibles</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {classes?.map((cls, i) => {
                          const colors = MODULE_COLORS[i % 4];
                          return (
                            <motion.div
                              key={cls.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                            >
                              <Card className="glass border-border/30 hover:border-primary/30 transition-all group cursor-pointer" onClick={() => setActiveTab('classes')}>
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center font-mono font-bold ${colors.text} shrink-0`}>
                                      {cls.class_number}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{cls.title}</h4>
                                      {cls.class_date && (
                                        <p className="text-[11px] text-muted-foreground">
                                          {new Date(cls.class_date).toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' })}
                                        </p>
                                      )}
                                    </div>
                                    <ClassProgressCheckbox classId={cls.id} />
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Quick links to community */}
                  <div className="glass glass-specular p-5 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-accent" />
                      <h3 className="font-mono font-semibold text-sm tracking-wider uppercase">Comunidad</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Conecta con los participantes de esta y otras generaciones.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to="/community"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill hover:border-primary/15 hover:bg-white/[0.06] transition-all text-sm font-medium"
                      >
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Espacios
                      </Link>
                      <Link
                        to="/chat"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill hover:border-primary/15 hover:bg-white/[0.06] transition-all text-sm font-medium"
                      >
                        <Users className="w-4 h-4 text-accent" />
                        Chat en vivo
                      </Link>
                      <Link
                        to="/forum"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill hover:border-primary/15 hover:bg-white/[0.06] transition-all text-sm font-medium"
                      >
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        Foro
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* CLASSES TAB */}
              <TabsContent value="classes">
                {loadingClasses ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : classes?.length === 0 ? (
                  <Card className="card-static">
                    <EmptyState
                      icon={BookOpen}
                      title="Sin clases aún"
                      description="Las clases de esta generación aparecerán aquí cuando estén disponibles"
                    />
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {classes?.map((cls, i) => {
                      const classPresentation = presentations?.find(p => p.class_id === cls.id);
                      const colors = MODULE_COLORS[i % 4];
                      
                      return (
                        <motion.div
                          key={cls.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Card className="card-interactive group">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                  <ClassProgressCheckbox classId={cls.id} />
                                  <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center font-mono font-bold ${colors.text}`}>
                                    {cls.class_number}
                                  </div>
                                  <div>
                                    <CardTitle className="text-lg">{cls.title}</CardTitle>
                                    {cls.class_date && (
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(cls.class_date).toLocaleDateString('es-CL', {
                                          weekday: 'long',
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric'
                                        })}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {/* Module presentation link */}
                                  <Link
                                    to={`/presentations/module/${cls.class_number}`}
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${colors.bg} ${colors.text} border ${colors.border} text-xs hover:opacity-80 transition-opacity`}
                                  >
                                    <Presentation className="w-3 h-3" />
                                    <span className="hidden sm:inline">Slides M{cls.class_number}</span>
                                  </Link>
                                  {/* Published presentation: anyone can view */}
                                  {classPresentation?.status === 'published' && (
                                    <Link
                                      to={`/presentations/${classPresentation.id}`}
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 text-xs hover:bg-green-500/20 transition-colors"
                                    >
                                      <Play className="w-3 h-3" />
                                      <span className="hidden sm:inline">Ver</span>
                                    </Link>
                                  )}
                                  {/* Admin */}
                                  {isAdmin && (
                                    classPresentation ? (
                                      <Link
                                        to="/admin/presentations"
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs hover:bg-yellow-500/20 transition-colors"
                                      >
                                        <Presentation className="w-3 h-3" />
                                        <span className="hidden sm:inline">Editar</span>
                                      </Link>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => createPresentation(cls.id)}
                                        disabled={isCreating}
                                        className="gap-1 text-xs border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10"
                                      >
                                        <Presentation className="w-3 h-3" />
                                        <span className="hidden sm:inline">Diseñar</span>
                                      </Button>
                                    )
                                  )}
                                  <BookmarkButton 
                                    resourceType="class" 
                                    resourceId={cls.id}
                                    showLabel
                                  />
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {cls.description && (
                                <p className="text-sm text-muted-foreground mb-4">
                                  {cls.description}
                                </p>
                              )}

                              {/* Resource links */}
                              <div className="flex flex-wrap gap-2">
                                {cls.recording_url && (
                                  <a
                                    href={cls.recording_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition-colors"
                                  >
                                    <Play className="w-4 h-4" />
                                    Grabación
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                                {cls.drive_folder_url && (
                                  <a
                                    href={cls.drive_folder_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm hover:bg-blue-500/20 transition-colors"
                                  >
                                    <FileText className="w-4 h-4" />
                                    Slides
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
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

                              {/* Personal Notes */}
                              <ClassNotes classId={cls.id} classTitle={cls.title} className="mt-4" />

                              {/* Tools mentioned */}
                              {cls.class_tools && cls.class_tools.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-border/50">
                                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                    <Wrench className="w-3 h-3" />
                                    Herramientas mencionadas:
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {cls.class_tools.map((ct: any) => (
                                      <Badge 
                                        key={ct.tool.id} 
                                        variant="outline" 
                                        className="border-border hover:border-primary/50"
                                      >
                                        {ct.tool.icon_emoji} {ct.tool.name}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              {/* PRESENTATIONS TAB */}
              <TabsContent value="presentations">
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Slides interactivas de los 4 módulos del taller. Cada generación cubre el mismo programa de 4 sesiones.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((moduleNum) => {
                      const colors = MODULE_COLORS[moduleNum - 1];
                      const names = ['Higiene Digital', 'IA & Productividad', 'Presentaciones con IA', 'Vibe Coding'];
                      const descriptions = [
                        'Inbox Zero, gestores de contraseñas, perfiles de navegador y rutinas digitales productivas.',
                        'ChatGPT, Claude, Gemini, Perplexity, Manus. Metaprompts, agentes, automatización.',
                        'Gama, Beautiful.ai, Napkin, Canva. Presentaciones y diseño visual profesional con IA.',
                        'Lovable + Supabase + GitHub: crea software real sin escribir código.'
                      ];
                      
                      return (
                        <motion.div
                          key={moduleNum}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: moduleNum * 0.1 }}
                        >
                          <Link
                            to={`/presentations/module/${moduleNum}`}
                            className="group block h-full"
                          >
                            <Card className="glass glass-specular h-full hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                              <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-30`} />
                              <CardContent className="relative p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="text-3xl">{MODULE_ICONS[moduleNum - 1]}</span>
                                  <div>
                                    <Badge variant="outline" className={`${colors.border} ${colors.text} text-[10px] font-mono mb-1`}>
                                      Módulo {moduleNum}
                                    </Badge>
                                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                      {names[moduleNum - 1]}
                                    </h4>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                  {descriptions[moduleNum - 1]}
                                </p>
                                <div className={`flex items-center gap-2 text-sm font-medium ${colors.text}`}>
                                  <Play className="w-4 h-4" />
                                  Ver presentación completa
                                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
}
