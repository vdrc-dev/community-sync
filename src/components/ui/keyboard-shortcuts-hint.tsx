import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

const shortcuts = [
  { keys: ['⌘', 'K'], desc: 'Buscar en todo el portal' },
  { keys: ['N'], desc: 'Nueva nota rapida' },
  { keys: ['?'], desc: 'Mostrar atajos de teclado' },
  { keys: ['G', 'H'], desc: 'Ir al inicio' },
  { keys: ['G', 'W'], desc: 'Ir a Workflows' },
  { keys: ['G', 'T'], desc: 'Ir a Herramientas' },
  { keys: ['G', 'C'], desc: 'Ir a Comunidad' },
  { keys: ['Esc'], desc: 'Cerrar dialogo o panel' },
];

export function KeyboardShortcutsHint() {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      e.preventDefault();
      setOpen(prev => !prev);
    }
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-20 z-50 w-72 glass-strong rounded-2xl p-4 shadow-2xl border border-white/[0.08]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-mono font-semibold">Atajos de teclado</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] transition-colors"
              aria-label="Cerrar atajos"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <div className="space-y-1.5">
            {shortcuts.map((s) => (
              <div key={s.desc} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{s.desc}</span>
                <div className="flex items-center gap-0.5">
                  {s.keys.map((k) => (
                    <kbd key={k} className="kbd text-[10px] min-w-[20px] text-center">{k}</kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-white/[0.06] text-[10px] text-muted-foreground/60 font-mono text-center">
            Presiona ? para cerrar
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
