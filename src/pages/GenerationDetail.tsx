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
  Sparkles
} from 'lucide-react';
import { usePresentations } from '@/hooks/usePresentations';

export default function GenerationDetail() {
  const { code } = useParams<{ code: string }>();
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('classes');
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

  return (
    <Layout>
      <div className="page-container section-py">
        {/* Page Header with breadcrumbs */}
        <PageHeader
          title={generation.name}
          description={generation.description || undefined}
          badge={generation.is_active ? { label: 'Activo', icon: <Sparkles className="w-3 h-3 mr-1" /> } : undefined}
          breadcrumbs={[
            { label: 'Generaciones', href: '/generations' },
            { label: generation.code }
          ]}
        />

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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="classes">Clases</TabsTrigger>
                <TabsTrigger value="tools">Herramientas</TabsTrigger>
              </TabsList>
              {classes && classes.length > 0 && (
                <div className="w-full sm:w-64">
                  <GenerationProgressBar classes={classes} />
                </div>
              )}
            </div>

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
                  {classes?.map((cls) => {
                    const classPresentation = presentations?.find(p => p.class_id === cls.id);
                    
                    return (
                    <Card key={cls.id} className="card-interactive group">
                      <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <ClassProgressCheckbox classId={cls.id} />
                              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-mono font-bold text-primary">
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
                              {/* Published presentation: anyone can view */}
                              {classPresentation?.status === 'published' && (
                                <Link
                                  to={`/presentations/${classPresentation.id}`}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 text-xs hover:bg-green-500/20 transition-colors"
                                >
                                  <Play className="w-3 h-3" />
                                  <span className="hidden sm:inline">Ver Presentación</span>
                                </Link>
                              )}
                              {/* Admin: Design Presentation Button */}
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
                              {/* Bookmark button */}
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
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition-colors"
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
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm hover:bg-yellow-500/20 transition-colors"
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
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm hover:bg-blue-500/20 transition-colors"
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
                              className="border-green-500/20 text-green-400 hover:bg-green-500/10"
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
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="tools">
              <Card className="card-static">
                <EmptyState
                  icon={Wrench}
                  title="Herramientas de la generación"
                  description="Las herramientas mencionadas en esta generación aparecerán aquí"
                  action={{
                    label: 'Ver catálogo completo',
                    onClick: () => window.location.href = '/tools',
                    variant: 'outline'
                  }}
                />
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
