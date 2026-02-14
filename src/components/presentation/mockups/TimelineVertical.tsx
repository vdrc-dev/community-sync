import { cn } from '@/lib/utils';
import { Check, AlertCircle, GitCommit, Clock, User } from 'lucide-react';

interface TimelineItem {
  hash?: string;
  title: string;
  description?: string;
  time?: string;
  current?: boolean;
  reverted?: boolean;
  author?: string;
  files?: number;
}

interface TimelineVerticalProps {
  items: TimelineItem[];
  className?: string;
}

export function TimelineVertical({ items, className }: TimelineVerticalProps) {
  return (
    <div className={cn('h-full flex flex-col gap-1.5', className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            'flex-1 flex items-start gap-3 p-3 rounded-lg transition-all min-h-0',
            item.current 
              ? 'bg-primary/[0.08] border border-primary/25' 
              : item.reverted
                ? 'bg-amber-500/[0.06] border border-amber-500/20'
                : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05]'
          )}
        >
          {/* Indicator */}
          <div className="relative flex flex-col items-center shrink-0">
            <div className={cn(
              'w-3 h-3 rounded-full flex items-center justify-center',
              item.current 
                ? 'bg-primary' 
                : item.reverted 
                  ? 'bg-amber-500'
                  : 'bg-muted-foreground/30'
            )}>
              {item.current && <Check className="w-2 h-2 text-primary-foreground" />}
              {item.reverted && <AlertCircle className="w-2 h-2 text-amber-950" />}
            </div>
            {i < items.length - 1 && (
              <div className={cn(
                'w-0.5 flex-1 mt-1.5 rounded-full',
                item.current || item.reverted ? 'bg-primary/30' : 'bg-border/50'
              )} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2 flex-wrap">
              {item.hash && (
                <span className="font-mono text-[9px] text-muted-foreground/50 flex items-center gap-1">
                  <GitCommit className="w-2.5 h-2.5" />
                  {item.hash}
                </span>
              )}
              {item.current && (
                <span className="text-[9px] text-primary font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> HEAD
                </span>
              )}
              {item.reverted && (
                <span className="text-[9px] text-amber-500 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Reverted
                </span>
              )}
            </div>
            <p className={cn(
              'text-[11px] font-medium truncate mt-0.5',
              item.current ? 'text-foreground' : 'text-foreground/80'
            )}>
              {item.title}
            </p>
            {item.description && (
              <p className="text-[9px] text-muted-foreground/60 truncate">{item.description}</p>
            )}
            <div className="flex items-center gap-3 mt-1">
              {item.author && (
                <span className="text-[8px] text-muted-foreground/50 flex items-center gap-1">
                  <User className="w-2.5 h-2.5" />
                  {item.author}
                </span>
              )}
              {item.time && (
                <span className="text-[8px] text-muted-foreground/50 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {item.time}
                </span>
              )}
              {item.files && (
                <span className="text-[8px] text-muted-foreground/50">
                  {item.files} files
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
