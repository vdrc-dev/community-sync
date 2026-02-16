import { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Copy text to clipboard with automatic toast feedback.
 * Returns [copied, copy] where `copied` resets after 2s.
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(label ? `${label} copiado` : 'Copiado al portapapeles', {
        duration: 1800,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('No se pudo copiar');
    }
  }, []);

  return { copied, copy } as const;
}
