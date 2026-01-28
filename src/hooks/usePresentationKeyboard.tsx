import { useEffect, useCallback } from 'react';
import { PRESENTATION_SHORTCUTS, type ShortcutAction } from '@/types/presentation';

interface UsePresentationKeyboardOptions {
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
  onToggleFullscreen: () => void;
  onToggleGrid: () => void;
  onToggleSpeaker: () => void;
  onExit: () => void;
  enabled?: boolean;
}

export function usePresentationKeyboard({
  onNext,
  onPrev,
  onFirst,
  onLast,
  onToggleFullscreen,
  onToggleGrid,
  onToggleSpeaker,
  onExit,
  enabled = true,
}: UsePresentationKeyboardOptions) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    // Ignore if user is typing in an input
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    const key = event.key;
    const action = PRESENTATION_SHORTCUTS[key as keyof typeof PRESENTATION_SHORTCUTS] as ShortcutAction | undefined;

    if (!action) return;

    event.preventDefault();

    switch (action) {
      case 'next':
        onNext();
        break;
      case 'prev':
        onPrev();
        break;
      case 'first':
        onFirst();
        break;
      case 'last':
        onLast();
        break;
      case 'fullscreen':
        onToggleFullscreen();
        break;
      case 'grid':
        onToggleGrid();
        break;
      case 'speaker':
        onToggleSpeaker();
        break;
      case 'exit':
        onExit();
        break;
    }
  }, [enabled, onNext, onPrev, onFirst, onLast, onToggleFullscreen, onToggleGrid, onToggleSpeaker, onExit]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
