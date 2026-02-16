import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Vim-style "g" prefix navigation.
 * Press G then a letter to jump to a page:
 *   G+H → Home, G+W → Workflows, G+T → Tools, G+C → Community, G+G → Generations
 */
export function useKeyboardNav() {
  const navigate = useNavigate();
  const pendingG = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      )
        return;

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key.toLowerCase() === 'g' && !pendingG.current) {
        pendingG.current = true;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          pendingG.current = false;
        }, 800);
        return;
      }

      if (pendingG.current) {
        pendingG.current = false;
        clearTimeout(timer.current);

        const routes: Record<string, string> = {
          h: '/',
          w: '/workflows',
          t: '/tools',
          c: '/community',
          g: '/generations',
          d: '/dictionary',
          p: '/playground',
          s: '/guia-instalacion',
          i: '/personalizacion-ia',
        };

        const route = routes[e.key.toLowerCase()];
        if (route) {
          e.preventDefault();
          navigate(route);
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer.current);
    };
  }, [handleKeyDown]);
}
