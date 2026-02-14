import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const premiumEase = [0.16, 1, 0.3, 1];

const shortcuts = [
  { keys: ['←', '→'], description: 'Navegar entre slides' },
  { keys: ['↑', '↓'], description: 'Slide anterior / siguiente' },
  { keys: ['Space'], description: 'Siguiente slide' },
  { keys: ['Home'], description: 'Ir al primer slide' },
  { keys: ['End'], description: 'Ir al último slide' },
  { keys: ['F'], description: 'Pantalla completa' },
  { keys: ['M'], description: 'Abrir menú lateral' },
  { keys: ['T'], description: 'Ver miniaturas' },
  { keys: ['Esc'], description: 'Cerrar paneles' },
  { keys: ['?'], description: 'Atajos de teclado' },
];

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div 
              className="rounded-2xl border overflow-hidden"
              style={{
                background: 'rgba(8, 8, 12, 0.95)',
                backdropFilter: 'blur(40px) saturate(1.3)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 pb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(263 55% 50% / 0.2), hsl(185 60% 50% / 0.1))',
                      border: '1px solid hsl(263 55% 50% / 0.25)',
                    }}
                  >
                    <Keyboard className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white/90">Atajos de Teclado</h2>
                    <p className="text-[10px] text-white/30 mt-0.5">Navega rápido con el teclado</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.06)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 text-white/50" />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="h-px mx-5" style={{ background: 'rgba(255,255,255,0.05)' }} />

              {/* Shortcuts list */}
              <div className="p-3 space-y-1">
                {shortcuts.map((shortcut, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors"
                    style={{ background: 'transparent' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.03, ease: premiumEase }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <span className="text-xs text-white/50">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, j) => (
                        <span 
                          key={j} 
                          className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md text-[10px] font-bold border"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.5)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer hint */}
              <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <p className="text-[10px] text-white/20 text-center">
                  También puedes deslizar en pantallas táctiles
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
