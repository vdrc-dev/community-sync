import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Clock, 
  User, 
  Plus, 
  X, 
  Trash2,
  CheckCircle2,
  FileText,
  MessageSquare,
  Package,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PresentationStatusBadge } from './PresentationStatusBadge';
import { usePresentations, type Presentation, type PresentationStatus, type PresentationWithClass } from '@/hooks/usePresentations';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface PresentationEditorProps {
  presentation: PresentationWithClass;
  onBack: () => void;
}

export function PresentationEditor({ presentation, onBack }: PresentationEditorProps) {
  const { updatePresentationAsync, updateStatus, deletePresentation, isUpdating } = usePresentations();
  
  // Local state for form
  const [outline, setOutline] = useState(presentation.outline || '');
  const [keyPoints, setKeyPoints] = useState<string[]>(presentation.key_points || []);
  const [talkingPoints, setTalkingPoints] = useState<Record<string, string>[]>(
    (presentation.talking_points as Record<string, string>[]) || []
  );
  const [resourcesNeeded, setResourcesNeeded] = useState<string[]>(presentation.resources_needed || []);
  const [durationEstimate, setDurationEstimate] = useState(presentation.duration_estimate || 60);
  const [assignedTo, setAssignedTo] = useState(presentation.assigned_to || '');
  const [reviewNotes, setReviewNotes] = useState(presentation.review_notes || '');
  
  const [newKeyPoint, setNewKeyPoint] = useState('');
  const [newResource, setNewResource] = useState('');
  const [newTalkingPointSection, setNewTalkingPointSection] = useState('');
  const [newTalkingPointContent, setNewTalkingPointContent] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const autoSaveTimeout = useRef<NodeJS.Timeout>();

  // Track changes
  useEffect(() => {
    const changed = 
      outline !== (presentation.outline || '') ||
      JSON.stringify(keyPoints) !== JSON.stringify(presentation.key_points || []) ||
      JSON.stringify(talkingPoints) !== JSON.stringify(presentation.talking_points || []) ||
      JSON.stringify(resourcesNeeded) !== JSON.stringify(presentation.resources_needed || []) ||
      durationEstimate !== (presentation.duration_estimate || 60) ||
      assignedTo !== (presentation.assigned_to || '') ||
      reviewNotes !== (presentation.review_notes || '');
    
    setHasChanges(changed);
  }, [outline, keyPoints, talkingPoints, resourcesNeeded, durationEstimate, assignedTo, reviewNotes, presentation]);

  // Auto-save
  useEffect(() => {
    if (hasChanges) {
      if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
      autoSaveTimeout.current = setTimeout(() => {
        handleSave(true);
      }, 3000);
    }
    return () => {
      if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
    };
  }, [hasChanges, outline, keyPoints, talkingPoints, resourcesNeeded, durationEstimate, assignedTo, reviewNotes]);

  const handleSave = async (isAutoSave = false) => {
    if (isSaving) return;
    setIsSaving(true);
    
    try {
      await updatePresentationAsync({
        id: presentation.id,
        data: {
          outline,
          key_points: keyPoints,
          talking_points: talkingPoints,
          resources_needed: resourcesNeeded,
          duration_estimate: durationEstimate,
          assigned_to: assignedTo || null,
          review_notes: reviewNotes,
        },
      });
      
      setHasChanges(false);
      if (!isAutoSave) {
        toast({
          title: 'Guardado',
          description: 'Los cambios se han guardado correctamente.',
        });
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = (newStatus: PresentationStatus) => {
    updateStatus({ id: presentation.id, status: newStatus });
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de eliminar esta presentación? Esta acción no se puede deshacer.')) {
      deletePresentation(presentation.id);
      onBack();
    }
  };

  const addKeyPoint = () => {
    if (newKeyPoint.trim()) {
      setKeyPoints([...keyPoints, newKeyPoint.trim()]);
      setNewKeyPoint('');
    }
  };

  const removeKeyPoint = (index: number) => {
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  };

  const addResource = () => {
    if (newResource.trim()) {
      setResourcesNeeded([...resourcesNeeded, newResource.trim()]);
      setNewResource('');
    }
  };

  const removeResource = (index: number) => {
    setResourcesNeeded(resourcesNeeded.filter((_, i) => i !== index));
  };

  const addTalkingPoint = () => {
    if (newTalkingPointSection.trim() && newTalkingPointContent.trim()) {
      setTalkingPoints([
        ...talkingPoints, 
        { section: newTalkingPointSection.trim(), content: newTalkingPointContent.trim() }
      ]);
      setNewTalkingPointSection('');
      setNewTalkingPointContent('');
    }
  };

  const removeTalkingPoint = (index: number) => {
    setTalkingPoints(talkingPoints.filter((_, i) => i !== index));
  };

  const { classes } = presentation;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold">
                {classes?.class_number || '?'}
              </div>
              <div>
                <h1 className="text-xl font-bold">{classes?.title}</h1>
                <p className="text-sm text-muted-foreground">{classes?.generations?.code}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-sm text-muted-foreground animate-pulse">
              Cambios sin guardar...
            </span>
          )}
          <PresentationStatusBadge status={presentation.status as PresentationStatus} />
          <Button 
            onClick={() => handleSave(false)} 
            disabled={!hasChanges || isSaving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>

      {/* Status Actions */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium mr-2">Cambiar estado:</span>
            {(['draft', 'review', 'approved', 'published'] as PresentationStatus[]).map((status) => (
              <Button
                key={status}
                variant={presentation.status === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStatusChange(status)}
                disabled={presentation.status === status}
              >
                {status === 'draft' && 'Borrador'}
                {status === 'review' && 'En Revisión'}
                {status === 'approved' && 'Aprobado'}
                {status === 'published' && 'Publicado'}
              </Button>
            ))}
            <div className="flex-1" />
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-1" />
              Eliminar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Outline */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Outline (Markdown)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
                placeholder="# Estructura de la presentación...&#10;&#10;## Sección 1&#10;- Punto A&#10;- Punto B"
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Talking Points */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Notas del Presentador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {talkingPoints.map((tp, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{tp.section}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeTalkingPoint(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{tp.content}</p>
                </div>
              ))}
              
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar Nota
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-3">
                  <Input
                    placeholder="Sección (ej: Introducción)"
                    value={newTalkingPointSection}
                    onChange={(e) => setNewTalkingPointSection(e.target.value)}
                  />
                  <Textarea
                    placeholder="Notas para esta sección..."
                    value={newTalkingPointContent}
                    onChange={(e) => setNewTalkingPointContent(e.target.value)}
                  />
                  <Button onClick={addTalkingPoint} size="sm">
                    Agregar
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Meta Info */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Información</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duración (min)
                  </Label>
                  <Input
                    type="number"
                    value={durationEstimate}
                    onChange={(e) => setDurationEstimate(Number(e.target.value))}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Responsable
                  </Label>
                  <Input
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="Nombre..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Puntos Clave
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {keyPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
                >
                  <span className="flex-1 text-sm">{point}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeKeyPoint(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="flex gap-2">
                <Input
                  placeholder="Nuevo punto clave..."
                  value={newKeyPoint}
                  onChange={(e) => setNewKeyPoint(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addKeyPoint()}
                />
                <Button onClick={addKeyPoint} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Recursos Necesarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resourcesNeeded.map((resource, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
                >
                  <Checkbox checked disabled />
                  <span className="flex-1 text-sm">{resource}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeResource(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="flex gap-2">
                <Input
                  placeholder="Nuevo recurso (ej: Demo de ChatGPT)..."
                  value={newResource}
                  onChange={(e) => setNewResource(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addResource()}
                />
                <Button onClick={addResource} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Review Notes */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Notas de Revisión</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Comentarios del equipo, feedback, sugerencias..."
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
