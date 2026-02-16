import { useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'vdrc_recently_visited';
const MAX_ITEMS = 8;

interface VisitedPage {
  path: string;
  title: string;
  timestamp: number;
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Inicio',
  '/generations': 'Generaciones',
  '/tools': 'Herramientas',
  '/workflows': 'Workflows',
  '/community': 'Comunidad',
  '/playground': 'Lab IA',
  '/dictionary': 'Diccionario',
  '/personalizacion-ia': 'Personalizar IA',
  '/guia-instalacion': 'Guia Instalacion',
  '/prompts': 'Prompts',
  '/forum': 'Foro',
  '/chat': 'Chat',
  '/calendar': 'Calendario',
  '/leaderboard': 'Leaderboard',
  '/bookmarks': 'Favoritos',
  '/quick-notes': 'Notas Rapidas',
  '/roi-calculator': 'Calculadora ROI',
  '/my-tools': 'Mi Stack',
  '/profile': 'Perfil',
};

function getPageTitle(path: string): string | null {
  if (PAGE_TITLES[path]) return PAGE_TITLES[path];
  if (path.startsWith('/generations/')) return `Gen ${path.split('/').pop()?.toUpperCase()}`;
  if (path.startsWith('/workflows/')) return 'Detalle Workflow';
  if (path.startsWith('/community/')) return 'Espacio Comunidad';
  return null;
}

function loadVisited(): VisitedPage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveVisited(pages: VisitedPage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch {
    // quota exceeded — silently fail
  }
}

/**
 * Tracks which pages the user visits and exposes a list of recently visited pages.
 * Excludes the current page from the list.
 */
export function useRecentlyVisited() {
  const location = useLocation();

  useEffect(() => {
    const title = getPageTitle(location.pathname);
    if (!title) return; // skip unknown routes (404, auth, etc.)

    const pages = loadVisited();
    const filtered = pages.filter((p) => p.path !== location.pathname);
    filtered.unshift({
      path: location.pathname,
      title,
      timestamp: Date.now(),
    });
    saveVisited(filtered.slice(0, MAX_ITEMS));
  }, [location.pathname]);

  const recentPages = useMemo(() => {
    const pages = loadVisited();
    // Exclude the current page
    return pages.filter((p) => p.path !== location.pathname).slice(0, 5);
  }, [location.pathname]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { recentPages, clearHistory };
}
