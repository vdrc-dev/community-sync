import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Slide } from '@/types/presentation';

interface CodeSlideProps {
  slide: Slide;
}

export function CodeSlide({ slide }: CodeSlideProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (slide.code) {
      await navigator.clipboard.writeText(slide.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full px-12 py-10">
      {slide.title && (
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-primary"
        >
          {slide.title}
        </motion.h2>
      )}

      {slide.content && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground mb-6"
        >
          {slide.content}
        </motion.p>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex-1 overflow-hidden rounded-xl bg-zinc-950 border border-border/50"
      >
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          {slide.codeLanguage && (
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
              {slide.codeLanguage}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <pre className="p-6 overflow-auto h-full">
          <code className="text-base md:text-lg font-mono text-foreground/90">
            {slide.code}
          </code>
        </pre>
      </motion.div>
    </div>
  );
}
