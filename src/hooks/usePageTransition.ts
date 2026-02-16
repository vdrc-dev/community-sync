import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Adds a brief entry animation state on page navigation.
 * Components can use `ready` to delay their entrance animation until
 * the page transition is "ready" — avoids flashes of content.
 */
export function usePageTransition(delayMs = 50) {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const timeout = setTimeout(() => setReady(true), delayMs);
    return () => clearTimeout(timeout);
  }, [location.pathname, delayMs]);

  return ready;
}
