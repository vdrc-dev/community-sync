import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface InlineHelpProps {
  text: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  iconSize?: number;
}

/**
 * A subtle help icon with a tooltip — great for explaining features
 * or adding context to labels.
 */
export function InlineHelp({ text, side = 'top', className, iconSize = 14 }: InlineHelpProps) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-help',
            className
          )}
          tabIndex={-1}
          aria-label="Ayuda"
        >
          <HelpCircle style={{ width: iconSize, height: iconSize }} />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className="max-w-[260px] text-xs leading-relaxed"
      >
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
