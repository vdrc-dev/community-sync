import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, X, Loader2, Send, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useQuickNotes } from '@/hooks/useQuickNotes';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function QuickNoteButton() {
  const { user } = useAuth();
  const { unprocessedCount, createQuickNote, isCreating } = useQuickNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  // Keyboard shortcut: N
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'n' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    createQuickNote({ content: content.trim() });
    setContent('');
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg relative",
            "bg-primary hover:bg-primary/90",
            "transition-all hover:scale-105 active:scale-95"
          )}
        >
          <PenLine className="h-6 w-6" />
          
          {/* Unprocessed count badge */}
          <AnimatePresence>
            {unprocessedCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1"
              >
                <Badge 
                  className="h-5 min-w-[20px] rounded-full bg-destructive text-destructive-foreground text-xs font-bold"
                >
                  {unprocessedCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Keyboard hint */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity">
          <Badge variant="secondary" className="text-xs">
            Press N
          </Badge>
        </div>
      </motion.div>

      {/* Quick Note Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] max-w-md"
            >
              <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-border/50">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <PenLine className="h-4 w-4 text-primary" />
                    Nota rápida
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="p-3">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handleSubmit();
                      }
                    }}
                    placeholder="Captura tu idea..."
                    className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
                    autoFocus
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t border-border/50 bg-muted/30">
                  <div className="flex items-center gap-2">
                    <a 
                      href="/quick-notes" 
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Inbox className="h-3.5 w-3.5" />
                      Ver todas
                      {unprocessedCount > 0 && (
                        <Badge variant="secondary" className="h-4 text-xs">
                          {unprocessedCount}
                        </Badge>
                      )}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      ⌘+Enter
                    </span>
                    <Button
                      size="sm"
                      onClick={handleSubmit}
                      disabled={!content.trim() || isCreating}
                      className="gap-1.5"
                    >
                      {isCreating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          Guardar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
