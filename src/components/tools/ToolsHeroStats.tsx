import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Bookmark, 
  CheckCircle, 
  Sparkles, 
  Star,
  ArrowRight
} from 'lucide-react';
import { useToolLogs } from '@/hooks/useToolLogs';
import { Link } from 'react-router-dom';

export function ToolsHeroStats() {
  const { toolLogs, stats } = useToolLogs();

  const statItems = [
    { 
      label: 'Por Probar', 
      value: stats?.wishlist || 0, 
      icon: Bookmark, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    { 
      label: 'Probadas', 
      value: stats?.tried || 0, 
      icon: CheckCircle, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    { 
      label: 'Uso Frecuente', 
      value: stats?.frequent || 0, 
      icon: Sparkles, 
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    { 
      label: 'Total Tracked', 
      value: toolLogs?.length || 0, 
      icon: TrendingUp, 
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`glass ${stat.borderColor} hover:border-opacity-50 transition-all`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

interface FeaturedToolsProps {
  tools: Array<{
    id: string;
    name: string;
    description: string | null;
    icon_emoji: string | null;
    category: string | null;
    url: string | null;
  }>;
}

export function FeaturedToolsCarousel({ tools }: FeaturedToolsProps) {
  const featuredTools = tools.filter(t => t).slice(0, 5);

  if (featuredTools.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <h2 className="text-lg font-semibold">Herramientas Destacadas</h2>
        </div>
        <Badge variant="outline" className="text-xs">
          Top picks del taller
        </Badge>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {featuredTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-72"
          >
            <Card className="glass border-yellow-500/20 hover:border-yellow-500/40 transition-all h-full group">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {tool.icon_emoji || '🔧'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {tool.description}
                </p>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Explorar <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
