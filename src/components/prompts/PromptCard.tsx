import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Bookmark, BookmarkCheck, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    prompt_text: string;
    description: string | null;
    category: string | null;
    tags: string[];
    copy_count: number;
    is_featured: boolean;
    tools?: {
      id: string;
      name: string;
      icon_emoji: string | null;
    } | null;
  };
  isSaved: boolean;
  onCopy: () => void;
  onToggleSave: () => void;
}

export function PromptCard({ prompt, isSaved, onCopy, onToggleSave }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    writing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    code: 'bg-green-500/10 text-green-400 border-green-500/30',
    analysis: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    creative: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Card className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        prompt.is_featured && "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent"
      )}>
        {/* Featured indicator */}
        {prompt.is_featured && (
          <div className="absolute top-0 right-0">
            <div className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-bl-lg font-medium">
              ⭐ Destacado
            </div>
          </div>
        )}

        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {prompt.title}
              </h3>
              {prompt.description && (
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                  {prompt.description}
                </p>
              )}
            </div>
            
            {/* Tool badge */}
            {prompt.tools && (
              <Badge variant="outline" className="shrink-0 gap-1">
                <span>{prompt.tools.icon_emoji || '🔧'}</span>
                <span className="hidden sm:inline">{prompt.tools.name}</span>
              </Badge>
            )}
          </div>

          {/* Prompt text preview */}
          <div className="relative mb-3">
            <pre className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 font-mono overflow-hidden line-clamp-3 whitespace-pre-wrap">
              {prompt.prompt_text}
            </pre>
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-muted/50 to-transparent rounded-b-lg pointer-events-none" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {prompt.category && (
              <Badge 
                variant="outline" 
                className={cn("text-xs", categoryColors[prompt.category] || '')}
              >
                {prompt.category}
              </Badge>
            )}
            {prompt.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Copy className="h-3 w-3" />
              <span>{prompt.copy_count} copias</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleSave}
                className={cn(
                  "h-8 gap-1.5",
                  isSaved && "text-primary"
                )}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>

              <Button
                size="sm"
                onClick={handleCopy}
                className="h-8 gap-1.5"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
