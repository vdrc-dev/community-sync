import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BrowserMockupProps {
  children: ReactNode;
  title?: string;
  url?: string;
  className?: string;
  variant?: 'default' | 'app' | 'code' | 'focused';
}

export function BrowserMockup({ 
  children, 
  title = 'App', 
  url = 'miapp.vercel.app',
  className,
  variant = 'default'
}: BrowserMockupProps) {
  const isFocused = variant === 'focused';
  const isCode = variant === 'code';
  
  return (
    <div className={cn(
      'rounded-2xl overflow-hidden transition-all duration-300',
      isCode 
        ? 'bg-[hsl(220,20%,8%)] border-border/40' 
        : 'bg-card/60 border-border/30',
      isFocused ? 'mockup-glow' : 'mockup-shadow',
      'border',
      className
    )}>
      {/* Browser header - premium style */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-3 border-b transition-colors',
        isCode ? 'border-border/30 bg-[hsl(220,18%,6%)]' : 'border-border/25 bg-secondary/30'
      )}>
        {/* Traffic lights with hover */}
        <div className="flex items-center gap-2 group">
          <div className="w-3 h-3 rounded-full bg-red-500/70 group-hover:bg-red-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70 group-hover:bg-yellow-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500/70 group-hover:bg-green-500 transition-colors cursor-pointer" />
        </div>
        
        {/* URL bar - enhanced */}
        <div className="flex-1 flex justify-center">
          <div className={cn(
            'flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs',
            'bg-background/60 border border-border/30',
            isFocused && 'border-primary/30 bg-primary/5'
          )}>
            <svg className="w-3.5 h-3.5 text-emerald-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-muted-foreground/70 font-mono">{url}</span>
          </div>
        </div>
        
        {/* Tab title */}
        <span className="text-xs text-muted-foreground/40 hidden md:block font-medium">{title}</span>
      </div>
      
      {/* Content with better padding */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
