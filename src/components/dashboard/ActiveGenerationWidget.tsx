import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { NextClassCountdown } from './NextClassCountdown';
import { GenerationTimeline } from './GenerationTimeline';
import { 
  GraduationCap, 
  PlayCircle, 
  Calendar, 
  ChevronRight,
  Sparkles,
  Clock
} from 'lucide-react';
import { format, isToday, isBefore, isAfter, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface Generation {
  id: string;
  code: string;
  name: string;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean | null;
}

interface ClassWithGeneration {
  id: string;
  title: string;
  class_number: number;
  class_date: string | null;
  recording_url: string | null;
  generation_id: string;
  generations: Generation;
}

export function ActiveGenerationWidget() {
  const navigate = useNavigate();
  const now = new Date();

  // Fetch active and upcoming generations
  const { data: generations, isLoading: loadingGens } = useQuery({
    queryKey: ['active-generations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .order('start_date', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data as Generation[];
    },
  });

  // Fetch classes for active generation
  const { data: classes, isLoading: loadingClasses } = useQuery({
    queryKey: ['generation-classes', generations?.[0]?.id],
    queryFn: async () => {
      if (!generations?.[0]) return [];
      const { data, error } = await supabase
        .from('classes')
        .select(`
          id,
          title,
          class_number,
          class_date,
          recording_url,
          generation_id,
          generations (*)
        `)
        .eq('generation_id', generations[0].id)
        .order('class_number', { ascending: true });
      if (error) throw error;
      return data as unknown as ClassWithGeneration[];
    },
    enabled: !!generations?.[0],
  });

  // Calculate current state
  const { activeGeneration, nextGeneration, currentClass, nextClass, lastRecording } = useMemo(() => {
    if (!generations?.length) return { 
      activeGeneration: null, 
      nextGeneration: null, 
      currentClass: null, 
      nextClass: null,
      lastRecording: null 
    };

    // Find active generation (is_active = true or current date is within range)
    const active = generations.find(g => 
      g.is_active || 
      (g.start_date && g.end_date && 
        isAfter(now, parseISO(g.start_date)) && 
        isBefore(now, parseISO(g.end_date)))
    );

    // Find next upcoming generation
    const upcoming = generations.find(g => 
      g.start_date && isAfter(parseISO(g.start_date), now)
    );

    // Find current/next class
    let current: ClassWithGeneration | null = null;
    let next: ClassWithGeneration | null = null;
    let lastRec: ClassWithGeneration | null = null;

    if (classes?.length) {
      for (const cls of classes) {
        if (cls.class_date) {
          const classDate = parseISO(cls.class_date);
          if (isToday(classDate)) {
            current = cls;
          } else if (isAfter(classDate, now) && !next) {
            next = cls;
          }
          if (cls.recording_url && isBefore(classDate, now)) {
            lastRec = cls;
          }
        }
      }
    }

    return {
      activeGeneration: active || generations[0],
      nextGeneration: upcoming,
      currentClass: current,
      nextClass: next,
      lastRecording: lastRec,
    };
  }, [generations, classes, now]);

  if (loadingGens) {
    return (
      <Card className="glass border-primary/20 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-32 w-full md:w-1/3" />
            <Skeleton className="h-32 w-full md:w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activeGeneration) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass border-primary/20 overflow-hidden relative">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Generation Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {activeGeneration.is_active ? 'En curso' : 'Próximamente'}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold">{activeGeneration.name}</h2>
                  <p className="text-sm text-muted-foreground font-mono">
                    {activeGeneration.code}
                  </p>
                </div>
              </div>

              {/* Current/Today's Class */}
              {currentClass && (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="p-4 rounded-xl bg-primary/10 border border-primary/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-sm font-medium text-primary">¡HOY!</span>
                  </div>
                  <p className="font-semibold">
                    Clase {currentClass.class_number}: {currentClass.title}
                  </p>
                  {currentClass.class_date && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {format(parseISO(currentClass.class_date), "HH:mm 'hrs'", { locale: es })}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Next Class Countdown */}
              {nextClass && !currentClass && (
                <NextClassCountdown classData={nextClass} />
              )}

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                {lastRecording && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(lastRecording.recording_url!, '_blank')}
                    className="gap-2"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Última grabación
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/calendar')}
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Ver calendario
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate(`/generations/${activeGeneration.code}`)}
                  className="gap-2"
                >
                  Ir a la generación
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right: Timeline */}
            <div className="lg:w-1/2 lg:border-l lg:border-border/50 lg:pl-6">
              <GenerationTimeline 
                classes={classes || []} 
                isLoading={loadingClasses}
              />
            </div>
          </div>

          {/* Next Generation Teaser */}
          {nextGeneration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 pt-4 border-t border-border/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <GraduationCap className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Próxima generación</p>
                    <p className="font-medium">{nextGeneration.name}</p>
                  </div>
                </div>
                {nextGeneration.start_date && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Comienza</p>
                    <p className="font-medium">
                      {format(parseISO(nextGeneration.start_date), "d 'de' MMMM", { locale: es })}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
