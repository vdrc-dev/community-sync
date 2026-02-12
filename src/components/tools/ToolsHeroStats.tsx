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
  ArrowUpRight
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
      gradient: 'from-blue-500/20 to-cyan-500/10',
      glowColor: 'shadow-blue-500/10',
      textColor: 'text-blue-400',
    },
    { 
      label: 'Probadas', 
      value: stats?.tried || 0, 
      icon: CheckCircle, 
      gradient: 'from-amber-500/20 to-yellow-500/10',
      glowColor: 'shadow-amber-500/10',
      textColor: 'text-amber-400',
    },
    { 
      label: 'Uso Frecuente', 
      value: stats?.frequent || 0, 
      icon: Sparkles, 
      gradient: 'from-emerald-500/20 to-green-500/10',
      glowColor: 'shadow-emerald-500/10',
      textColor: 'text-emerald-400',
    },
    { 
      label: 'Total Tracked', 
      value: toolLogs?.length || 0, 
      icon: TrendingUp, 
      gradient: 'from-primary/20 to-accent/10',
      glowColor: 'shadow-primary/10',
      textColor: 'text-primary',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <Card className={`glass border-border/30 hover:border-border/50 transition-all duration-300 overflow-hidden group hover:shadow-xl ${stat.glowColor}`}>
            {/* Top accent */}
            <div className={`h-px bg-gradient-to-r ${stat.gradient}`} />
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold font-mono ${stat.textColor}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground/70">{stat.label}</p>
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
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/10 flex items-center justify-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Herramientas Destacadas</h2>
            <p className="text-xs text-muted-foreground/60 font-mono">TOP_PICKS</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs border-yellow-500/20 text-yellow-400/80">
          Top picks del taller
        </Badge>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {featuredTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
            className="flex-shrink-0 w-72"
          >
            <Card className="relative glass border-border/30 hover:border-yellow-500/30 transition-all duration-500 h-full group overflow-hidden">
              {/* Premium gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-5 relative">
                <div className="flex items-start gap-3 mb-4">
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/20 flex items-center justify-center text-3xl shadow-lg shadow-yellow-500/5"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {tool.icon_emoji || '🔧'}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">{tool.category}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground/80 line-clamp-2 mb-5 leading-relaxed">
                  {tool.description}
                </p>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary/80 hover:text-primary transition-colors group/link"
                  >
                    Explorar 
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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
