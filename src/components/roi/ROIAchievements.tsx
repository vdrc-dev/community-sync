import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Target, Rocket, Crown, Zap } from 'lucide-react';
import type { ROISummary } from '@/hooks/useAutomations';

interface ROIAchievementsProps {
  roiSummary: ROISummary | null | undefined;
  totalAutomations: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  threshold: number;
  current: number;
  unit: string;
  color: string;
}

export function ROIAchievements({ roiSummary, totalAutomations }: ROIAchievementsProps) {
  const achievements = useMemo<Achievement[]>(() => {
    const weeklyMinutes = roiSummary?.weekly_minutes_saved || 0;
    const yearlyValue = roiSummary?.yearly_value_saved || 0;

    return [
      {
        id: 'first-auto',
        name: 'Primer Paso',
        description: 'Registra tu primera automatización',
        icon: <Zap className="w-5 h-5" />,
        threshold: 1,
        current: totalAutomations,
        unit: 'automatización',
        color: 'text-blue-500',
      },
      {
        id: 'time-saver',
        name: 'Ahorrador de Tiempo',
        description: 'Ahorra 1 hora por semana',
        icon: <Flame className="w-5 h-5" />,
        threshold: 60,
        current: weeklyMinutes,
        unit: 'min/semana',
        color: 'text-orange-500',
      },
      {
        id: 'efficiency-master',
        name: 'Maestro de Eficiencia',
        description: 'Registra 5 automatizaciones',
        icon: <Target className="w-5 h-5" />,
        threshold: 5,
        current: totalAutomations,
        unit: 'automatizaciones',
        color: 'text-green-500',
      },
      {
        id: 'power-user',
        name: 'Power User',
        description: 'Ahorra $1,000 USD al año',
        icon: <Rocket className="w-5 h-5" />,
        threshold: 1000,
        current: yearlyValue,
        unit: 'USD/año',
        color: 'text-purple-500',
      },
      {
        id: 'automation-pro',
        name: 'Automation Pro',
        description: 'Registra 10 automatizaciones',
        icon: <Trophy className="w-5 h-5" />,
        threshold: 10,
        current: totalAutomations,
        unit: 'automatizaciones',
        color: 'text-yellow-500',
      },
      {
        id: 'roi-legend',
        name: 'Leyenda del ROI',
        description: 'Ahorra $5,000 USD al año',
        icon: <Crown className="w-5 h-5" />,
        threshold: 5000,
        current: yearlyValue,
        unit: 'USD/año',
        color: 'text-primary',
      },
    ];
  }, [roiSummary, totalAutomations]);

  const unlockedCount = achievements.filter(a => a.current >= a.threshold).length;
  const nextToUnlock = achievements.find(a => a.current < a.threshold);

  if (totalAutomations === 0) {
    return null;
  }

  return (
    <Card className="glass border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">Logros de Productividad</h3>
          </div>
          <span className="text-sm text-muted-foreground">
            {unlockedCount}/{achievements.length} desbloqueados
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((achievement, index) => {
            const isUnlocked = achievement.current >= achievement.threshold;
            const progress = Math.min((achievement.current / achievement.threshold) * 100, 100);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-3 rounded-lg border text-center transition-all ${
                  isUnlocked 
                    ? 'bg-gradient-to-br from-primary/10 to-yellow-500/10 border-yellow-500/30' 
                    : 'bg-muted/30 border-border/50'
                }`}
              >
                <div className={`mb-2 ${isUnlocked ? achievement.color : 'text-muted-foreground/50'}`}>
                  {achievement.icon}
                </div>
                <p className={`text-xs font-medium mb-1 ${isUnlocked ? '' : 'text-muted-foreground'}`}>
                  {achievement.name}
                </p>
                {!isUnlocked && (
                  <div className="space-y-1">
                    <Progress value={progress} className="h-1" />
                    <p className="text-[10px] text-muted-foreground">
                      {Math.round(achievement.current)}/{achievement.threshold}
                    </p>
                  </div>
                )}
                {isUnlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs">✓</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {nextToUnlock && (
          <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <div className={`${nextToUnlock.color}`}>
                {nextToUnlock.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Próximo: {nextToUnlock.name}</p>
                <p className="text-xs text-muted-foreground">{nextToUnlock.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">
                  {Math.round(nextToUnlock.current)}/{nextToUnlock.threshold}
                </p>
                <p className="text-xs text-muted-foreground">{nextToUnlock.unit}</p>
              </div>
            </div>
            <Progress 
              value={(nextToUnlock.current / nextToUnlock.threshold) * 100} 
              className="h-2 mt-2" 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
