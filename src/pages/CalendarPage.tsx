import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  ExternalLink, 
  Loader2,
  ChevronRight
} from 'lucide-react';
import { format, isSameDay, isAfter, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

export default function CalendarPage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: events, isLoading } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: async () => {
      let query = supabase
        .from('calendar_events')
        .select(`
          *,
          generation:generations(code, name)
        `)
        .order('event_date', { ascending: true });
      
      // If not logged in, only show public events
      if (!user) {
        query = query.eq('is_public', true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const upcomingEvents = events?.filter(
    (event) => isAfter(new Date(event.event_date), new Date())
  );

  const selectedDateEvents = events?.filter(
    (event) => selectedDate && isSameDay(new Date(event.event_date), selectedDate)
  );

  // Dates that have events for highlighting in calendar
  const eventDates = events?.map((event) => new Date(event.event_date)) || [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
            <span className="text-gradient">Calendario</span>
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Próximas sesiones y eventos del taller
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card className="glass border-border/50 lg:col-span-1">
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={es}
                modifiers={{
                  hasEvent: eventDates,
                }}
                modifiersStyles={{
                  hasEvent: {
                    backgroundColor: 'hsl(142 76% 50% / 0.2)',
                    borderRadius: '50%',
                  },
                }}
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Events for selected date */}
          <Card className="glass border-border/50 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarIcon className="w-5 h-5 text-primary" />
                {selectedDate ? (
                  format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })
                ) : (
                  'Selecciona una fecha'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : selectedDateEvents?.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No hay eventos programados para esta fecha
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents?.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">{event.title}</h4>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {event.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {format(new Date(event.event_date), 'HH:mm')}
                              {event.duration_minutes && (
                                <> ({event.duration_minutes} min)</>
                              )}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                            )}
                            {event.generation && (
                              <Badge variant="outline" className="border-primary/30 text-primary">
                                {event.generation.code}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {event.meeting_url && (
                          <a
                            href={event.meeting_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                          >
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              <Video className="w-4 h-4 mr-1" />
                              Unirse
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events List */}
        <div className="mt-12">
          <h2 className="text-xl font-mono font-bold mb-6 flex items-center gap-2">
            <ChevronRight className="w-5 h-5 text-primary" />
            Próximos eventos
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : upcomingEvents?.length === 0 ? (
            <Card className="glass border-border/50">
              <CardContent className="py-12 text-center">
                <CalendarIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No hay eventos próximos programados
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents?.slice(0, 6).map((event) => (
                <Card 
                  key={event.id} 
                  className="glass border-border/50 hover:border-primary/30 transition-all hover-lift"
                >
                  <CardContent className="p-5">
                    {/* Date badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-3">
                      <CalendarIcon className="w-3 h-3" />
                      {format(new Date(event.event_date), "d MMM, HH:mm", { locale: es })}
                    </div>

                    <h4 className="font-semibold mb-2">{event.title}</h4>
                    
                    {event.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {event.generation && (
                        <Badge variant="outline" className="border-border">
                          {event.generation.code}
                        </Badge>
                      )}
                      {event.meeting_url && (
                        <a
                          href={event.meeting_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          Unirse <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
