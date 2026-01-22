import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ClassProgressCheckbox } from '@/components/progress/ClassProgressCheckbox';
import { GenerationProgressBar } from '@/components/progress/GenerationProgressBar';
import { 
  ArrowLeft, 
  Play, 
  Folder, 
  FileText, 
  BookOpen, 
  Wrench,
  Calendar,
  ExternalLink,
  Loader2,
  Lock
} from 'lucide-react';

export default function GenerationDetail() {
  const { code } = useParams<{ code: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('classes');

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
      <div className="container mx-auto px-4 py-12">
        {/* Back link */}
        <Link 
          to="/generations" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Todas las generaciones</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center glow-primary">
              <span className="font-mono font-bold text-primary text-xl">
                {generation.code.replace('GEN-', '')}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-mono font-bold">{generation.name}</h1>
                {generation.is_active && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Activo
                  </Badge>
                )}
              </div>
              {generation.description && (
                <p className="text-muted-foreground">{generation.description}</p>
              )}
              {generation.start_date && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(generation.start_date).toLocaleDateString('es-CL', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                  {generation.end_date && (
                    <> - {new Date(generation.end_date).toLocaleDateString('es-CL', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}</>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

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
                <Card className="glass border-border/50">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No hay clases registradas aún</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {classes?.map((cls) => (
                    <Card key={cls.id} className="glass border-border/50 hover:border-primary/30 transition-all group">
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
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="tools">
              <Card className="glass border-border/50">
                <CardContent className="py-8 text-center">
                  <Wrench className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Las herramientas de esta generación aparecerán aquí
                  </p>
                  <Button asChild variant="link" className="text-primary mt-2">
                    <Link to="/tools">Ver catálogo completo de herramientas</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
