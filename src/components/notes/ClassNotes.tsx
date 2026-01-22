import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Save, Trash2, X, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNotes } from '@/hooks/useNotes';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface ClassNotesProps {
  classId: string;
  classTitle: string;
  className?: string;
}

export function ClassNotes({ classId, classTitle, className }: ClassNotesProps) {
  const { user } = useAuth();
  const { note, isLoading, isSaving, saveNote, deleteNote } = useNotes(classId);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Sync content with fetched note
  useEffect(() => {
    if (note) {
      setContent(note.content);
      setHasChanges(false);
    }
  }, [note]);

  // Auto-save debounce
  useEffect(() => {
    if (!hasChanges || !content) return;
    
    const timer = setTimeout(() => {
      saveNote(content);
      setHasChanges(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [content, hasChanges, saveNote]);

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
    setHasChanges(true);
  }, []);

  const handleExport = () => {
    const blob = new Blob([`# ${classTitle}\n\n${content}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notas-${classTitle.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (confirm('¿Eliminar esta nota?')) {
      deleteNote();
      setContent('');
      setIsOpen(false);
    }
  };

  if (!user) return null;

  return (
    <div className={className}>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "gap-2 transition-all",
          note?.content && "border-primary/50 text-primary"
        )}
      >
        <FileText className="h-4 w-4" />
        <span className="hidden sm:inline">
          {note?.content ? 'Ver notas' : 'Agregar notas'}
        </span>
        {note?.content && (
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        )}
      </Button>

      {/* Notes Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Mis notas</span>
                  {isSaving && (
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Guardando...
                    </span>
                  )}
                  {hasChanges && !isSaving && (
                    <span className="text-xs text-amber-500">Sin guardar</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {content && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={handleExport}
                        title="Exportar como Markdown"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={handleDelete}
                        title="Eliminar nota"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Editor */}
              {isLoading ? (
                <div className="h-32 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Escribe tus notas aquí... (Markdown soportado)"
                  className="min-h-[120px] resize-y bg-background/50 font-mono text-sm"
                />
              )}

              {/* Tip */}
              <p className="mt-2 text-xs text-muted-foreground">
                💡 Tip: Usa #timestamps como [5:30] para marcar momentos del video
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
