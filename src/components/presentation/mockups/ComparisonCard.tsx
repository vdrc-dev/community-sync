import { cn } from '@/lib/utils';
import { X, Check } from 'lucide-react';

interface ComparisonItem {
  label: string;
  before: string;
  after: string;
}

interface ComparisonCardProps {
  items: ComparisonItem[];
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function ComparisonCard({ 
  items, 
  beforeLabel = 'Antes', 
  afterLabel = 'Después',
  className 
}: ComparisonCardProps) {
  return (
    <div className={cn('rounded-xl overflow-hidden border border-border/30', className)}>
      {/* Header */}
      <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-wider">
        <div className="p-3 bg-secondary/20 text-muted-foreground/70" />
        <div className="p-3 bg-red-500/10 text-red-400/80 text-center border-x border-border/20">
          {beforeLabel}
        </div>
        <div className="p-3 bg-emerald-500/10 text-emerald-400/80 text-center">
          {afterLabel}
        </div>
      </div>
      
      {/* Rows */}
      {items.map((item, i) => (
        <div 
          key={i} 
          className={cn(
            'grid grid-cols-3 text-sm',
            i !== items.length - 1 && 'border-b border-border/20'
          )}
        >
          <div className="p-3 bg-card/30 font-medium text-foreground/90">
            {item.label}
          </div>
          <div className="p-3 bg-red-500/[0.03] text-muted-foreground/70 text-center border-x border-border/20 flex items-center justify-center gap-1.5">
            <X className="w-3.5 h-3.5 text-red-400/60" />
            <span>{item.before}</span>
          </div>
          <div className="p-3 bg-emerald-500/[0.03] text-foreground/90 text-center flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{item.after}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
