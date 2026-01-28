import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Type, 
  FileText, 
  List, 
  Columns, 
  Image, 
  Code,
  Play,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import type { Slide, SlideType } from '@/types/presentation';
import { cn } from '@/lib/utils';

interface SlideEditorProps {
  slides: Slide[];
  onChange: (slides: Slide[]) => void;
  onGenerateFromOutline?: () => void;
  onPreview?: () => void;
  isGenerating?: boolean;
}

const SLIDE_TYPES: { type: SlideType; label: string; icon: React.ReactNode }[] = [
  { type: 'title', label: 'Título', icon: <Type className="h-4 w-4" /> },
  { type: 'content', label: 'Contenido', icon: <FileText className="h-4 w-4" /> },
  { type: 'bullets', label: 'Bullets', icon: <List className="h-4 w-4" /> },
  { type: 'split', label: 'Dividida', icon: <Columns className="h-4 w-4" /> },
  { type: 'image', label: 'Imagen', icon: <Image className="h-4 w-4" /> },
  { type: 'code', label: 'Código', icon: <Code className="h-4 w-4" /> },
];

export function SlideEditor({ 
  slides, 
  onChange, 
  onGenerateFromOutline,
  onPreview,
  isGenerating 
}: SlideEditorProps) {
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null);

  const addSlide = (type: SlideType = 'content') => {
    const newSlide: Slide = {
      id: crypto.randomUUID(),
      type,
      title: '',
    };
    onChange([...slides, newSlide]);
    setExpandedSlide(newSlide.id);
  };

  const updateSlide = (id: string, updates: Partial<Slide>) => {
    onChange(
      slides.map(slide => 
        slide.id === id ? { ...slide, ...updates } : slide
      )
    );
  };

  const deleteSlide = (id: string) => {
    onChange(slides.filter(slide => slide.id !== id));
    if (expandedSlide === id) {
      setExpandedSlide(null);
    }
  };

  const handleReorder = (newOrder: Slide[]) => {
    onChange(newOrder);
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Editor de Slides
          </CardTitle>
          <div className="flex items-center gap-2">
            {onGenerateFromOutline && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onGenerateFromOutline}
                disabled={isGenerating}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isGenerating ? 'Generando...' : 'Generar desde Outline'}
              </Button>
            )}
            {onPreview && slides.length > 0 && (
              <Button size="sm" onClick={onPreview}>
                <Play className="h-4 w-4 mr-1" />
                Previsualizar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {slides.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No hay slides. Crea tu primera slide:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SLIDE_TYPES.map(({ type, label, icon }) => (
                <Button 
                  key={type} 
                  variant="outline" 
                  size="sm"
                  onClick={() => addSlide(type)}
                >
                  {icon}
                  <span className="ml-1">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <Reorder.Group
              axis="y"
              values={slides}
              onReorder={handleReorder}
              className="space-y-2"
            >
              <AnimatePresence>
                {slides.map((slide, index) => (
                  <Reorder.Item
                    key={slide.id}
                    value={slide}
                    className="touch-none"
                  >
                    <SlideItem
                      slide={slide}
                      index={index}
                      isExpanded={expandedSlide === slide.id}
                      onToggle={() => setExpandedSlide(
                        expandedSlide === slide.id ? null : slide.id
                      )}
                      onUpdate={(updates) => updateSlide(slide.id, updates)}
                      onDelete={() => deleteSlide(slide.id)}
                    />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            {/* Add Slide Button */}
            <div className="flex justify-center pt-2">
              <Select onValueChange={(value) => addSlide(value as SlideType)}>
                <SelectTrigger className="w-48">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Agregar Slide</span>
                </SelectTrigger>
                <SelectContent>
                  {SLIDE_TYPES.map(({ type, label, icon }) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        {icon}
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface SlideItemProps {
  slide: Slide;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (updates: Partial<Slide>) => void;
  onDelete: () => void;
}

function SlideItem({ slide, index, isExpanded, onToggle, onUpdate, onDelete }: SlideItemProps) {
  const typeInfo = SLIDE_TYPES.find(t => t.type === slide.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border border-border/50 rounded-lg overflow-hidden bg-muted/30"
    >
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <button className="w-full p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <span className="text-sm font-bold text-primary min-w-[24px]">
              {index + 1}
            </span>
            <Badge variant="secondary" className="gap-1">
              {typeInfo?.icon}
              {typeInfo?.label}
            </Badge>
            <span className="flex-1 text-left text-sm truncate">
              {slide.title || 'Sin título'}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-4 pt-0 space-y-4 border-t border-border/50">
            {/* Type Selector */}
            <div className="space-y-2">
              <Label>Tipo de Slide</Label>
              <Select 
                value={slide.type} 
                onValueChange={(value) => onUpdate({ type: value as SlideType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SLIDE_TYPES.map(({ type, label, icon }) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        {icon}
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={slide.title || ''}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Título de la slide"
              />
            </div>

            {/* Subtitle (for title slides) */}
            {slide.type === 'title' && (
              <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Input
                  value={slide.subtitle || ''}
                  onChange={(e) => onUpdate({ subtitle: e.target.value })}
                  placeholder="Subtítulo"
                />
              </div>
            )}

            {/* Content (for content/split slides) */}
            {(slide.type === 'content' || slide.type === 'split') && (
              <div className="space-y-2">
                <Label>Contenido</Label>
                <Textarea
                  value={slide.content || ''}
                  onChange={(e) => onUpdate({ content: e.target.value })}
                  placeholder="Contenido de la slide..."
                  className="min-h-[100px]"
                />
              </div>
            )}

            {/* Bullets */}
            {(slide.type === 'bullets' || slide.type === 'split') && (
              <div className="space-y-2">
                <Label>Bullets (uno por línea)</Label>
                <Textarea
                  value={(slide.bullets || []).join('\n')}
                  onChange={(e) => onUpdate({ 
                    bullets: e.target.value.split('\n').filter(b => b.trim()) 
                  })}
                  placeholder="- Punto 1&#10;- Punto 2&#10;- Punto 3"
                  className="min-h-[80px]"
                />
              </div>
            )}

            {/* Image URL */}
            {(slide.type === 'image' || slide.type === 'split') && (
              <div className="space-y-2">
                <Label>URL de Imagen</Label>
                <Input
                  value={slide.image || ''}
                  onChange={(e) => onUpdate({ image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            )}

            {/* Code */}
            {slide.type === 'code' && (
              <>
                <div className="space-y-2">
                  <Label>Lenguaje</Label>
                  <Input
                    value={slide.codeLanguage || ''}
                    onChange={(e) => onUpdate({ codeLanguage: e.target.value })}
                    placeholder="typescript, javascript, python..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Código</Label>
                  <Textarea
                    value={slide.code || ''}
                    onChange={(e) => onUpdate({ code: e.target.value })}
                    placeholder="// Tu código aquí..."
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
              </>
            )}

            {/* Tags (for title slides) */}
            {slide.type === 'title' && (
              <div className="space-y-2">
                <Label>Tags (separados por coma)</Label>
                <Input
                  value={(slide.tags || []).join(', ')}
                  onChange={(e) => onUpdate({ 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                  })}
                  placeholder="IA, Desarrollo, Demo"
                />
              </div>
            )}

            {/* Speaker Notes */}
            <div className="space-y-2">
              <Label>Notas del Presentador</Label>
              <Textarea
                value={slide.speakerNotes || ''}
                onChange={(e) => onUpdate({ speakerNotes: e.target.value })}
                placeholder="Notas privadas para el presentador..."
                className="min-h-[60px]"
              />
            </div>

            {/* Delete Button */}
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={onDelete}
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Eliminar Slide
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}
