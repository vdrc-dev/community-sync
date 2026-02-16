import { motion } from 'framer-motion';
import { CheckCircle2, Circle, PlayCircle, Clock, Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO, isToday, isBefore, isAfter } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface ClassData {
  id: string;
  title: string;
  class_number: number;
  class_date: string | null;
  recording_url: string | null;
}

interface GenerationTimelineProps {
  classes: ClassData[];
  isLoading?: boolean;
}

type ClassStatus = 'completed' | 'today' | 'upcoming' | 'locked';

export function GenerationTimeline({ classes, isLoading }: GenerationTimelineProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  const now = new Date();

  const getClassStatus = (cls: ClassData): ClassStatus => {
    if (!cls.class_date) return 'locked';
    const classDate = parseISO(cls.class_date);
    
    if (isToday(classDate)) return 'today';
    if (isBefore(classDate, now)) return 'completed';
    return 'upcoming';
  };

  const getStatusIcon = (status: ClassStatus, hasRecording: boolean) => {
    switch (status) {
      case 'completed':
        return hasRecording 
          ? <PlayCircle className="h-5 w-5 text-primary" />
          : <CheckCircle2 className="h-5 w-5 text-primary" />;
      case 'today':
        return <Circle className="h-5 w-5 text-primary fill-primary animate-pulse" />;
      case 'upcoming':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-muted-foreground/50" />;
    }
  };

  const getStatusStyles = (status: ClassStatus) => {
    switch (status) {
      case 'completed':
        return 'border-primary/30 bg-primary/5';
      case 'today':
        return 'border-primary bg-primary/10 ring-2 ring-primary/20';
      case 'upcoming':
        return 'border-border/50 bg-muted/30';
      case 'locked':
        return 'border-border/30 bg-muted/20 opacity-50';
    }
  };

  // Module names for the 4 standard sessions
  const moduleNames = [
    'Higiene Digital',
    'IA & Productividad', 
    'Presentaciones con IA',
    'Vibe Coding'
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Progreso del Taller
      </h3>

      <div className="space-y-2">
        {classes.length === 0 ? (
          // Default 4 modules if no classes
          moduleNames.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-muted/20 opacity-50"
            >
              <Lock className="h-5 w-5 text-muted-foreground/50" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Clase {i + 1}: {name}</p>
                <p className="text-xs text-muted-foreground">Por definir</p>
              </div>
            </div>
          ))
        ) : (
          classes.map((cls, index) => {
            const status = getClassStatus(cls);
            return (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all",
                  getStatusStyles(status),
                  status === 'completed' && cls.recording_url && "cursor-pointer hover:border-primary/50"
                )}
                onClick={() => {
                  if (status === 'completed' && cls.recording_url) {
                    window.open(cls.recording_url, '_blank');
                  }
                }}
              >
                {getStatusIcon(status, !!cls.recording_url)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      #{cls.class_number}
                    </span>
                    {status === 'today' && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        HOY
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-sm truncate">{cls.title}</p>
                </div>

                {cls.class_date && (
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">
                      {format(parseISO(cls.class_date), "d MMM", { locale: es })}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      {format(parseISO(cls.class_date), "HH:mm")}
                    </p>
                  </div>
                )}

                {status === 'completed' && cls.recording_url && (
                  <PlayCircle className="h-4 w-4 text-primary shrink-0" />
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Progress indicator */}
      {classes.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progreso</span>
            <span>
              {classes.filter(c => c.class_date && isBefore(parseISO(c.class_date), now)).length}
              /{classes.length} clases
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${(classes.filter(c => c.class_date && isBefore(parseISO(c.class_date), now)).length / classes.length) * 100}%` 
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
