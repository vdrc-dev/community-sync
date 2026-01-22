import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Check, Trash2, Edit2, ExternalLink, Tag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useQuickNotes } from '@/hooks/useQuickNotes';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export default function QuickNotes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { quickNotes, isLoading, updateQuickNote, deleteQuickNote } = useQuickNotes();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showProcessed, setShowProcessed] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <PenLine className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Inicia sesión para ver tus notas</h2>
          <Button onClick={() => navigate('/auth')}>
            Iniciar sesión
          </Button>
        </div>
      </Layout>
    );
  }

  const filteredNotes = quickNotes?.filter(n => showProcessed || !n.is_processed) || [];
  const unprocessedCount = quickNotes?.filter(n => !n.is_processed).length || 0;
  const processedCount = quickNotes?.filter(n => n.is_processed).length || 0;

  const handleStartEdit = (note: { id: string; content: string }) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = (id: string) => {
    updateQuickNote({ id, content: editContent });
    setEditingId(null);
  };

  const toggleProcessed = (id: string, current: boolean) => {
    updateQuickNote({ id, isProcessed: !current });
  };

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <PenLine className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Notas Rápidas</h1>
          </div>
          <p className="text-muted-foreground">
            Tu inbox de ideas capturadas al vuelo
          </p>
        </motion.div>

        {/* Stats and filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">{unprocessedCount}</span> pendientes
            </span>
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">{processedCount}</span> procesadas
            </span>
          </div>
          
          <Button
            variant={showProcessed ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowProcessed(!showProcessed)}
          >
            {showProcessed ? 'Ocultar procesadas' : 'Ver todas'}
          </Button>
        </div>

        {/* Notes list */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : filteredNotes.length > 0 ? (
          <motion.div layout className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <Card className={cn(
                    "group transition-all",
                    note.is_processed && "opacity-60"
                  )}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        {/* Checkbox */}
                        <div className="pt-0.5">
                          <Checkbox
                            checked={note.is_processed}
                            onCheckedChange={() => toggleProcessed(note.id, note.is_processed)}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {editingId === note.id ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="min-h-[80px]"
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleSaveEdit(note.id)}>
                                  Guardar
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => setEditingId(null)}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className={cn(
                                "text-foreground whitespace-pre-wrap",
                                note.is_processed && "line-through"
                              )}>
                                {note.content}
                              </p>

                              {/* Meta info */}
                              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                <span>
                                  {formatDistanceToNow(new Date(note.created_at), {
                                    addSuffix: true,
                                    locale: es,
                                  })}
                                </span>
                                
                                {note.context_type && (
                                  <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <ExternalLink className="h-3 w-3" />
                                      {note.context_type}
                                    </span>
                                  </>
                                )}

                                {note.tags.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Tag className="h-3 w-3" />
                                    {note.tags.map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs h-4">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Actions */}
                        {editingId !== note.id && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleStartEdit(note)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => {
                                if (confirm('¿Eliminar esta nota?')) {
                                  deleteQuickNote(note.id);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <PenLine className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {quickNotes?.length === 0 ? 'Sin notas todavía' : 'Todas procesadas 🎉'}
            </h3>
            <p className="text-muted-foreground">
              {quickNotes?.length === 0 
                ? 'Presiona N en cualquier página para capturar una idea'
                : 'Buen trabajo procesando tus notas'
              }
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
