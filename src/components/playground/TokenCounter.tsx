import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Hash, AlertTriangle, CheckCircle } from 'lucide-react';

interface TokenCounterProps {
  text: string;
  systemPrompt?: string;
  maxTokens?: number;
}

// Simple token estimation: ~4 characters per token for English/Spanish
// This is a rough estimate - actual tokenization varies by model
function estimateTokens(text: string): number {
  if (!text) return 0;
  // More accurate estimation considering:
  // - Spaces and punctuation
  // - Average word length in Spanish/English
  const words = text.trim().split(/\s+/).filter(Boolean);
  const avgCharsPerWord = text.length / Math.max(words.length, 1);
  
  // Typical GPT tokenization: ~0.75 tokens per word for English, ~1.2 for Spanish
  // We'll use an average of ~1 token per word plus overhead for punctuation
  const wordTokens = words.length * 1.1;
  
  // Add tokens for special characters and punctuation
  const punctuation = (text.match(/[.,!?;:'"()\[\]{}]/g) || []).length;
  const specialTokens = punctuation * 0.5;
  
  return Math.ceil(wordTokens + specialTokens);
}

export function TokenCounter({ text, systemPrompt = '', maxTokens = 8192 }: TokenCounterProps) {
  const { promptTokens, systemTokens, totalTokens, percentage, status } = useMemo(() => {
    const promptTokens = estimateTokens(text);
    const systemTokens = estimateTokens(systemPrompt);
    const totalTokens = promptTokens + systemTokens;
    const percentage = Math.min((totalTokens / maxTokens) * 100, 100);
    
    let status: 'good' | 'warning' | 'danger' = 'good';
    if (percentage > 80) status = 'danger';
    else if (percentage > 50) status = 'warning';
    
    return { promptTokens, systemTokens, totalTokens, percentage, status };
  }, [text, systemPrompt, maxTokens]);

  const statusColors = {
    good: 'text-green-500 bg-green-500/10 border-green-500/20',
    warning: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    danger: 'text-red-500 bg-red-500/10 border-red-500/20',
  };

  const StatusIcon = status === 'good' ? CheckCircle : AlertTriangle;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge 
          variant="outline" 
          className={`gap-1.5 cursor-help transition-colors ${statusColors[status]}`}
        >
          <Hash className="w-3 h-3" />
          <span className="font-mono text-xs">
            ~{totalTokens.toLocaleString()} tokens
          </span>
          <StatusIcon className="w-3 h-3" />
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <div className="space-y-2 text-sm">
          <div className="font-medium flex items-center gap-2">
            Estimación de tokens
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <span className="text-muted-foreground">System prompt:</span>
            <span className="font-mono">{systemTokens.toLocaleString()}</span>
            <span className="text-muted-foreground">Tu prompt:</span>
            <span className="font-mono">{promptTokens.toLocaleString()}</span>
            <span className="text-muted-foreground font-medium">Total:</span>
            <span className="font-mono font-medium">{totalTokens.toLocaleString()}</span>
          </div>
          
          {/* Progress bar */}
          <div className="pt-1">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  status === 'good' ? 'bg-green-500' :
                  status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {percentage.toFixed(0)}% del contexto máximo ({maxTokens.toLocaleString()} tokens)
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground border-t border-border pt-2">
            💡 Esta es una estimación. Los tokens reales varían según el modelo.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
