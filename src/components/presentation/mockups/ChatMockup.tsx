import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Heart, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: ReactNode;
}

interface ChatMockupProps {
  messages: ChatMessage[];
  platform: 'gemini' | 'lovable' | 'claude';
  className?: string;
  showTyping?: boolean;
  isExporting?: boolean;
}

const platformConfig = {
  gemini: {
    name: 'Gemini Pro',
    icon: Sparkles,
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/20',
    badge: 'Canvas ON',
    badgeClass: 'bg-blue-500/15 text-blue-400',
  },
  lovable: {
    name: 'Lovable',
    icon: Heart,
    color: 'text-pink-400',
    bg: 'bg-pink-500/15',
    border: 'border-pink-500/20',
    badge: 'Chat',
    badgeClass: 'bg-pink-500/15 text-pink-400',
  },
  claude: {
    name: 'Claude',
    icon: Bot,
    color: 'text-orange-400',
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/20',
    badge: 'Sonnet',
    badgeClass: 'bg-orange-500/15 text-orange-400',
  },
};

export function ChatMockup({ 
  messages, 
  platform, 
  className,
  showTyping = false,
  isExporting = false,
}: ChatMockupProps) {
  // Don't show typing animation during export
  const shouldShowTyping = showTyping && !isExporting;
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <div className={cn(
      'rounded-xl bg-card/40 border border-border/30 overflow-hidden',
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
        <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', config.bg)}>
          <Icon className={cn('w-3.5 h-3.5', config.color)} />
        </div>
        <span className="font-medium text-sm">{config.name}</span>
        <span className={cn('ml-auto text-xs px-2 py-1 rounded', config.badgeClass)}>
          {config.badge}
        </span>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={cn(
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div className={cn(
              'max-w-[85%] p-3 rounded-xl text-sm',
              msg.role === 'user' 
                ? 'bg-primary/15 text-foreground' 
                : 'bg-secondary/40 text-muted-foreground'
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {shouldShowTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-xl bg-secondary/40">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse [animation-delay:150ms]" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
