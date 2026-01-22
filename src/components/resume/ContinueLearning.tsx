import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, Wrench, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useActivityResume, ActivityResourceType } from '@/hooks/useActivityResume';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const resourceIcons: Record<ActivityResourceType, React.ReactNode> = {
  class: <BookOpen className="h-5 w-5" />,
  tool: <Wrench className="h-5 w-5" />,
  post: <MessageSquare className="h-5 w-5" />,
  generation: <BookOpen className="h-5 w-5" />,
};

const resourceLabels: Record<ActivityResourceType, string> = {
  class: 'Clase',
  tool: 'Herramienta',
  post: 'Post',
  generation: 'Generación',
};

export function ContinueLearning() {
  const { user } = useAuth();
  const { mostRecentActivity, recentActivity, isLoading } = useActivityResume();
  const navigate = useNavigate();

  if (!user || isLoading || !mostRecentActivity) {
    return null;
  }

  const handleNavigate = (type: ActivityResourceType, meta: Record<string, unknown>) => {
    switch (type) {
      case 'class':
        if (meta.generation_code) {
          navigate(`/generations/${meta.generation_code}`);
        }
        break;
      case 'tool':
        navigate('/tools');
        break;
      case 'post':
        navigate('/forum');
        break;
      case 'generation':
        navigate(`/generations/${meta.code || mostRecentActivity.resource_id}`);
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
        <CardContent className="p-0">
          {/* Main continue card */}
          <div 
            className="p-4 sm:p-6 cursor-pointer group"
            onClick={() => handleNavigate(
              mostRecentActivity.resource_type as ActivityResourceType, 
              mostRecentActivity.resource_meta || {}
            )}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                <Play className="h-5 w-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span className="uppercase tracking-wider font-medium text-primary">
                    Continuar
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(mostRecentActivity.last_accessed_at), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                </div>
                
                <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {mostRecentActivity.resource_title || 'Continuar donde lo dejaste'}
                </h3>
                
                <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                  {resourceIcons[mostRecentActivity.resource_type as ActivityResourceType]}
                  {resourceLabels[mostRecentActivity.resource_type as ActivityResourceType]}
                </p>
              </div>

              {/* Arrow */}
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          </div>

          {/* Recent activity list */}
          {recentActivity && recentActivity.length > 1 && (
            <div className="border-t border-border/50 px-4 sm:px-6 py-3 bg-muted/30">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Clock className="h-3 w-3" />
                Actividad reciente
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
                {recentActivity.slice(1, 5).map((activity) => (
                  <Button
                    key={activity.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigate(
                      activity.resource_type as ActivityResourceType,
                      activity.resource_meta || {}
                    )}
                    className={cn(
                      "h-8 text-xs shrink-0 gap-1.5",
                      "hover:bg-background hover:text-primary"
                    )}
                  >
                    {resourceIcons[activity.resource_type as ActivityResourceType]}
                    <span className="max-w-[120px] truncate">
                      {activity.resource_title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
