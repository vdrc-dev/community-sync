import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PresentationStatus } from '@/hooks/usePresentations';

interface PresentationStatusBadgeProps {
  status: PresentationStatus;
  className?: string;
}

const statusConfig: Record<PresentationStatus, { label: string; className: string }> = {
  draft: {
    label: 'Borrador',
    className: 'bg-muted text-muted-foreground hover:bg-muted/80',
  },
  review: {
    label: 'En Revisión',
    className: 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-yellow-500/30',
  },
  approved: {
    label: 'Aprobado',
    className: 'bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/30',
  },
  published: {
    label: 'Publicado',
    className: 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-blue-500/30',
  },
};

export function PresentationStatusBadge({ status, className }: PresentationStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
