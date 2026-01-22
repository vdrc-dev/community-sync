import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToolLogs } from '@/hooks/useToolLogs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, CheckCircle, Bookmark, XCircle, Star, ExternalLink, BarChart3 } from 'lucide-react';

const statusConfig = {
  wishlist: { 
    label: 'Por probar', 
    icon: <Bookmark className="w-4 h-4" />, 
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  tried: { 
    label: 'Probadas', 
    icon: <CheckCircle className="w-4 h-4" />, 
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10'
  },
  frequent: { 
    label: 'Uso frecuente', 
    icon: <Sparkles className="w-4 h-4" />, 
    color: 'text-green-400',
    bg: 'bg-green-500/10'
  },
  discarded: { 
    label: 'Descartadas', 
    icon: <XCircle className="w-4 h-4" />, 
    color: 'text-red-400',
    bg: 'bg-red-500/10'
  },
};

export function MyToolStack() {
  const { toolLogs, stats, isLoading } = useToolLogs();

  const { data: totalTools } = useQuery({
    queryKey: ['total-tools-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('tools')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  const progressPercentage = totalTools ? Math.round((stats.total / totalTools) * 100) : 0;

  // Group logs by status
  const logsByStatus = {
    frequent: toolLogs?.filter(l => l.status === 'frequent') || [],
    tried: toolLogs?.filter(l => l.status === 'tried') || [],
    wishlist: toolLogs?.filter(l => l.status === 'wishlist') || [],
    discarded: toolLogs?.filter(l => l.status === 'discarded') || [],
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-24 bg-muted/50 rounded-lg" />
        <div className="h-48 bg-muted/50 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="glass border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Tu Progreso
              </h3>
              <p className="text-sm text-muted-foreground">
                Has explorado {stats.total} de {totalTools} herramientas
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{progressPercentage}%</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          {/* Status breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {(Object.entries(statusConfig) as [keyof typeof statusConfig, typeof statusConfig[keyof typeof statusConfig]][]).map(([status, config]) => (
              <div key={status} className={`p-3 rounded-lg ${config.bg}`}>
                <div className={`flex items-center gap-2 ${config.color}`}>
                  {config.icon}
                  <span className="text-lg font-bold">{stats[status]}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{config.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tool Lists by Status */}
      {(Object.entries(logsByStatus) as [keyof typeof logsByStatus, typeof logsByStatus[keyof typeof logsByStatus]][]).map(([status, logs]) => {
        if (logs.length === 0) return null;
        const config = statusConfig[status];
        
        return (
          <Card key={status} className="glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className={`text-base flex items-center gap-2 ${config.color}`}>
                {config.icon}
                {config.label}
                <Badge variant="secondary" className="ml-auto">{logs.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {logs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{log.tools?.icon_emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium truncate">{log.tools?.name}</h4>
                          {log.tools?.url && (
                            <a
                              href={log.tools.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        
                        {log.rating && (
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= log.rating! 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-muted-foreground/30'
                                }`} 
                              />
                            ))}
                          </div>
                        )}
                        
                        {log.notes && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {log.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {stats.total === 0 && (
        <Card className="glass border-dashed border-muted-foreground/30">
          <CardContent className="p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              Aún no has registrado ninguna herramienta.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Ve a <a href="/tools" className="text-primary hover:underline">Herramientas</a> y marca las que has probado.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
