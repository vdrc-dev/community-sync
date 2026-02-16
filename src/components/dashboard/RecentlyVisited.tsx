import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecentlyVisited } from '@/hooks/useRecentlyVisited';
import { Clock, ChevronRight, History } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export function RecentlyVisited() {
  const { recentPages } = useRecentlyVisited();

  if (recentPages.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-mono font-semibold text-muted-foreground">Visitado recientemente</h3>
      </div>
      <div className="space-y-1">
        {recentPages.map((page, i) => (
          <Link
            key={page.path}
            to={page.path}
            className="group flex items-center justify-between py-2 px-3 -mx-1 rounded-lg hover:bg-white/[0.04] transition-all duration-200 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs font-mono text-muted-foreground/50 w-4 text-right tabular-nums">
                {i + 1}
              </span>
              <span className="text-sm truncate group-hover:text-foreground transition-colors">
                {page.title}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-muted-foreground/40 hidden sm:inline">
                {formatDistanceToNow(page.timestamp, { addSuffix: false, locale: es })}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
