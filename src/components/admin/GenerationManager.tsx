import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Plus,
  Calendar,
  Users,
  FileText,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CreateGenerationModal } from './CreateGenerationModal';
import { PresentationStatusBadge } from './PresentationStatusBadge';
import { useGenerations, type GenerationWithClasses, type ClassWithPresentation } from '@/hooks/useGenerations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';
import type { PresentationStatus } from '@/hooks/usePresentations';

interface GenerationManagerProps {
  onSelectPresentation?: (presentationId: string) => void;
  onCreatePresentation?: (classId: string) => void;
}

export function GenerationManager({ onSelectPresentation, onCreatePresentation }: GenerationManagerProps) {
  const { 
    generations, 
    isLoading, 
    createPresentation, 
    isCreatingPresentation,
    deleteGeneration,
    isDeleting,
    getStats 
  } = useGenerations();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedGenerations, setExpandedGenerations] = useState<Set<string>>(new Set());
  const [creatingForClass, setCreatingForClass] = useState<string | null>(null);

  const stats = getStats();

  const toggleExpanded = (genId: string) => {
    setExpandedGenerations(prev => {
      const next = new Set(prev);
      if (next.has(genId)) {
        next.delete(genId);
      } else {
        next.add(genId);
      }
      return next;
    });
  };

  const handleCreatePresentation = async (classId: string) => {
    setCreatingForClass(classId);
    try {
      await createPresentation(classId);
      onCreatePresentation?.(classId);
    } finally {
      setCreatingForClass(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  // Empty state
  if (!generations || generations.length === 0) {
    return (
      <>
        <Card className="glass-card border-dashed">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay generaciones creadas</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Crea tu primera generación del taller para comenzar a diseñar las presentaciones de cada clase.
            </p>
            <Button onClick={() => setIsModalOpen(true)} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Crear Primera Generación
            </Button>
          </CardContent>
        </Card>

        <CreateGenerationModal 
          open={isModalOpen} 
          onOpenChange={setIsModalOpen}
        />
      </>
    );
  }

  return (
    <>
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalGenerations}</div>
            <div className="text-sm text-muted-foreground">Generaciones</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <div className="text-sm text-muted-foreground">Clases</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-green-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">{stats.classesWithPresentation}</div>
            <div className="text-sm text-muted-foreground">Con presentación</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-yellow-500/30">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-500">{stats.classesWithoutPresentation}</div>
            <div className="text-sm text-muted-foreground">Sin presentación</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Generación
        </Button>
      </div>

      {/* Generations List */}
      <div className="space-y-4">
        <AnimatePresence>
          {generations.map((gen) => (
            <GenerationCard
              key={gen.id}
              generation={gen}
              isExpanded={expandedGenerations.has(gen.id)}
              onToggle={() => toggleExpanded(gen.id)}
              onCreatePresentation={handleCreatePresentation}
              onSelectPresentation={onSelectPresentation}
              onDelete={deleteGeneration}
              isCreatingPresentation={isCreatingPresentation}
              creatingForClass={creatingForClass}
              isDeleting={isDeleting}
            />
          ))}
        </AnimatePresence>
      </div>

      <CreateGenerationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

interface GenerationCardProps {
  generation: GenerationWithClasses;
  isExpanded: boolean;
  onToggle: () => void;
  onCreatePresentation: (classId: string) => void;
  onSelectPresentation?: (presentationId: string) => void;
  onDelete: (id: string) => void;
  isCreatingPresentation: boolean;
  creatingForClass: string | null;
  isDeleting: boolean;
}

function GenerationCard({
  generation,
  isExpanded,
  onToggle,
  onCreatePresentation,
  onSelectPresentation,
  onDelete,
  isCreatingPresentation,
  creatingForClass,
  isDeleting,
}: GenerationCardProps) {
  const classesWithPres = generation.classes.filter(c => c.class_presentations);
  const classesWithoutPres = generation.classes.filter(c => !c.class_presentations);
  const progress = generation.classes.length > 0 
    ? (classesWithPres.length / generation.classes.length) * 100 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-primary">{generation.code}</span>
                <span className="text-muted-foreground font-normal">
                  ({generation.name})
                </span>
              </CardTitle>
              {generation.is_active && (
                <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/30">
                  Activa
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {classesWithPres.length}/{generation.classes.length} presentaciones
              </div>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
          </div>

          {classesWithoutPres.length > 0 && !isExpanded && (
            <div className="mt-2 flex items-center gap-2 text-yellow-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              {classesWithoutPres.length} clases sin presentación
            </div>
          )}
        </CardHeader>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="border-t pt-4">
                <div className="space-y-3">
                  {generation.classes.map((cls) => (
                    <ClassRow
                      key={cls.id}
                      classData={cls}
                      onCreatePresentation={onCreatePresentation}
                      onSelectPresentation={onSelectPresentation}
                      isCreating={creatingForClass === cls.id}
                    />
                  ))}
                </div>

                {generation.classes.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No hay clases en esta generación</p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    {generation.start_date && (
                      <span>
                        Inicio: {format(new Date(generation.start_date), "d 'de' MMMM yyyy", { locale: es })}
                      </span>
                    )}
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar generación?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará la generación {generation.code} y todas sus clases asociadas.
                          Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(generation.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Eliminar'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

interface ClassRowProps {
  classData: ClassWithPresentation;
  onCreatePresentation: (classId: string) => void;
  onSelectPresentation?: (presentationId: string) => void;
  isCreating: boolean;
}

function ClassRow({ classData, onCreatePresentation, onSelectPresentation, isCreating }: ClassRowProps) {
  const hasPresentation = !!classData.class_presentations;

  return (
    <div 
      className={cn(
        "flex items-center gap-4 p-3 rounded-lg transition-colors",
        hasPresentation ? "bg-muted/30" : "bg-yellow-500/5 border border-yellow-500/20"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
        hasPresentation ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
      )}>
        {hasPresentation ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          classData.class_number
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">
          Clase {classData.class_number}: {classData.title}
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          {classData.class_date 
            ? format(new Date(classData.class_date), "d 'de' MMMM", { locale: es })
            : 'Sin fecha'
          }
        </div>
      </div>

      {hasPresentation ? (
        <div className="flex items-center gap-2">
          <PresentationStatusBadge 
            status={classData.class_presentations!.status as PresentationStatus} 
          />
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onSelectPresentation?.(classData.class_presentations!.id)}
          >
            Editar
          </Button>
        </div>
      ) : (
        <Button 
          size="sm" 
          onClick={() => onCreatePresentation(classData.id)}
          disabled={isCreating}
        >
          {isCreating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Crear
            </>
          )}
        </Button>
      )}
    </div>
  );
}
