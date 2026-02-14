import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Copy, Check, Play, FileCode } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';

interface CodeRevealProps {
  code: string;
  language?: 'tsx' | 'sql' | 'json' | 'bash';
  highlightLines?: number[];
  revealSpeed?: 'fast' | 'medium' | 'slow';
  className?: string;
  showLineNumbers?: boolean;
  title?: string;
}

const syntaxColors: Record<string, Record<string, string>> = {
  tsx: {
    keyword: 'text-pink-400',
    string: 'text-emerald-400',
    function: 'text-blue-400',
    comment: 'text-muted-foreground/50',
    type: 'text-amber-400',
    bracket: 'text-muted-foreground/70',
    operator: 'text-pink-300',
  },
  sql: {
    keyword: 'text-blue-400',
    string: 'text-emerald-400',
    function: 'text-amber-400',
    comment: 'text-muted-foreground/50',
  },
  json: {
    key: 'text-blue-400',
    string: 'text-emerald-400',
    number: 'text-amber-400',
    boolean: 'text-pink-400',
  },
  bash: {
    command: 'text-emerald-400',
    flag: 'text-blue-400',
    string: 'text-amber-400',
  },
};

function highlightSyntax(line: string, language: string): React.ReactNode {
  // Simple syntax highlighting
  const colors = syntaxColors[language] || syntaxColors.tsx;
  
  // Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'import', 'export', 'from', 'async', 'await', 'if', 'else', 'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'TABLE'];
  
  let result = line;
  
  // Highlight strings
  result = result.replace(/(["'`])([^"'`]*)\1/g, `<span class="${colors.string}">$1$2$1</span>`);
  
  // Highlight keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    result = result.replace(regex, `<span class="${colors.keyword}">$1</span>`);
  });
  
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

export function CodeReveal({
  code,
  language = 'tsx',
  highlightLines = [],
  revealSpeed = 'medium',
  className,
  showLineNumbers = true,
  title,
}: CodeRevealProps) {
  const { isExporting } = useExportContext();
  const [visibleLines, setVisibleLines] = useState(isExporting ? 999 : 0);
  const [copied, setCopied] = useState(false);
  const lines = code.trim().split('\n');

  const speedMap = {
    fast: 60,
    medium: 120,
    slow: 200,
  };

  useEffect(() => {
    if (isExporting) {
      setVisibleLines(lines.length);
      return;
    }
    
    if (visibleLines < lines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, speedMap[revealSpeed]);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, lines.length, revealSpeed, isExporting]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('rounded-xl overflow-hidden h-full flex flex-col border border-white/[0.1]', className)}>
      {/* Header */}
      <div className="px-3 py-2 bg-[hsl(222_25%_10%)] border-b border-white/[0.08] flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        {title && (
          <>
            <div className="w-px h-4 bg-white/[0.1]" />
            <FileCode className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span className="text-[10px] text-muted-foreground/80 font-mono">{title}</span>
          </>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
            language === 'tsx' ? 'bg-blue-500/20 text-blue-400' :
            language === 'sql' ? 'bg-emerald-500/20 text-emerald-400' :
            language === 'json' ? 'bg-amber-500/20 text-amber-400' :
            'bg-white/[0.1] text-muted-foreground/70'
          }`}>
            {language.toUpperCase()}
          </span>
          <button
            onClick={handleCopy}
            className="w-6 h-6 rounded bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-muted-foreground/60" />
            )}
          </button>
        </div>
      </div>
      
      {/* Code - fills remaining space */}
      <div className="flex-1 bg-[hsl(222_25%_5%)] p-3 font-mono text-[10px] leading-relaxed overflow-auto min-h-0">
        <AnimatePresence mode="popLayout">
          {lines.slice(0, visibleLines).map((line, index) => (
            <motion.div
              key={index}
              initial={isExporting ? {} : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12 }}
              className={cn(
                'flex min-h-[1.4em]',
                highlightLines.includes(index + 1) && 'bg-primary/10 -mx-3 px-3 border-l-2 border-primary'
              )}
            >
              {showLineNumbers && (
                <span className="w-7 text-muted-foreground/30 select-none shrink-0 text-right pr-3">
                  {index + 1}
                </span>
              )}
              <span className="text-foreground/90 whitespace-pre">{highlightSyntax(line, language)}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Cursor */}
        {visibleLines < lines.length && !isExporting && (
          <motion.div
            className="flex items-center"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {showLineNumbers && <span className="w-7" />}
            <span className="w-2 h-4 bg-primary rounded-sm" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
