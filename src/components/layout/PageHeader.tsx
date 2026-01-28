import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  badge?: {
    label: string;
    icon?: ReactNode;
  };
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('mb-8', className)}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4 overflow-x-auto scrollbar-hide">
          <Link
            to="/"
            className="flex items-center hover:text-foreground transition-colors shrink-0"
          >
            <Home className="w-4 h-4" />
          </Link>
          {breadcrumbs.map((item, index) => (
            <span key={index} className="flex items-center gap-1 shrink-0">
              <ChevronRight className="w-4 h-4" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          {badge && (
            <Badge
              variant="outline"
              className="mb-3 border-primary/50 bg-primary/5"
            >
              {badge.icon}
              <span className="ml-1">{badge.label}</span>
            </Badge>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </motion.div>
  );
}
