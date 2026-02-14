import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterLine {
  text: string;
  delay?: number;
  isUser?: boolean;
}

interface TypewriterDemoProps {
  lines: TypewriterLine[];
  loop?: boolean;
  showCursor?: boolean;
  speed?: 'fast' | 'medium' | 'slow';
  className?: string;
  onComplete?: () => void;
}

export function TypewriterDemo({
  lines,
  loop = false,
  showCursor = true,
  speed = 'medium',
  className,
  onComplete,
}: TypewriterDemoProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const speedMap = {
    fast: 20,
    medium: 40,
    slow: 60,
  };

  const charDelay = speedMap[speed];

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      onComplete?.();
      if (loop) {
        setTimeout(() => {
          setCurrentLineIndex(0);
          setCurrentText('');
          setCompletedLines([]);
          setIsTyping(true);
        }, 2000);
      }
      return;
    }

    const currentLine = lines[currentLineIndex];
    const targetText = currentLine.text;

    if (currentText.length < targetText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1));
      }, charDelay);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      const lineDelay = currentLine.delay ?? 800;
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, targetText]);
        setCurrentText('');
        setCurrentLineIndex((prev) => prev + 1);
        setIsTyping(true);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentLineIndex, lines, charDelay, loop, onComplete]);

  const currentLine = lines[currentLineIndex];

  return (
    <div className={cn('space-y-3', className)}>
      {/* Completed lines */}
      <AnimatePresence mode="popLayout">
        {completedLines.map((line, index) => {
          const lineData = lines[index];
          return (
            <motion.div
              key={`completed-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.5 }}
              className={cn(
                'p-3 rounded-xl text-sm',
                lineData?.isUser
                  ? 'bg-primary/10 border border-primary/20 ml-8'
                  : 'bg-card/60 border border-border/30 mr-8'
              )}
            >
              {line}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Current typing line */}
      {currentLineIndex < lines.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'p-3 rounded-xl text-sm',
            currentLine?.isUser
              ? 'bg-primary/10 border border-primary/20 ml-8'
              : 'bg-card/60 border border-border/30 mr-8'
          )}
        >
          <span>{currentText}</span>
          {showCursor && isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
