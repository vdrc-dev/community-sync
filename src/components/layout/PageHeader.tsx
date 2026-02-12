import { ReactNode, useMemo } from 'react';
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
  gradient?: boolean;
}

// Minimal floating dots for header ambiance
const generateDots = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 6 + 8,
    delay: Math.random() * 3,
  }));

export function PageHeader({
  title,
  description,
  badge,
  breadcrumbs,
  actions,
  className,
  gradient = true,
}: PageHeaderProps) {
  const dots = useMemo(() => generateDots(8), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('mb-8 relative', className)}
    >
      {/* Subtle ambient glow */}
      {gradient && (
        <div className="absolute -inset-x-4 -inset-y-2 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute top-0 left-1/4 w-64 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-24 bg-accent/5 rounded-full blur-3xl" />
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full bg-primary/20"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size,
              }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: dot.duration,
                delay: dot.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="relative flex items-center gap-1 text-sm text-muted-foreground mb-4 overflow-x-auto scrollbar-hide">
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

      <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge
                variant="outline"
                className="mb-3 border-primary/50 bg-primary/5 backdrop-blur-sm"
              >
                {badge.icon}
                <span className="ml-1">{badge.label}</span>
              </Badge>
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold mb-2"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground text-base sm:text-lg max-w-2xl"
            >
              {description}
            </motion.p>
          )}

          {/* Gradient underline accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-[2px] w-24 mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-transparent origin-left"
          />
        </div>
        {actions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 shrink-0"
          >
            {actions}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
