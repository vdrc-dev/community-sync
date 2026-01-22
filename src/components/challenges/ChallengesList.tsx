import { motion } from 'framer-motion';
import { useChallenges } from '@/hooks/useChallenges';
import { ChallengeCard } from './ChallengeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ChallengesListProps {
  compact?: boolean;
  maxChallenges?: number;
}

export function ChallengesList({ compact = false, maxChallenges }: ChallengesListProps) {
  const { challenges, isLoading, getTimeRemaining, completedCount, totalCount } = useChallenges();
  const { user } = useAuth();

  if (!user) {
    return (
      <Card className="glass border-border/50">
        <CardContent className="p-6 text-center text-muted-foreground">
          Inicia sesión para ver los desafíos semanales
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="glass border-border/50">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <Card className="glass border-border/50">
        <CardContent className="p-6 text-center text-muted-foreground">
          No hay desafíos activos esta semana
        </CardContent>
      </Card>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Card className="glass border-border/50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Desafíos Semanales
          </CardTitle>
          <div className="text-sm text-muted-foreground font-mono">
            {completedCount}/{totalCount} completados
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </CardHeader>

      <CardContent>
        <motion.div
          className={compact ? 'space-y-3' : 'grid gap-4 md:grid-cols-2'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {(maxChallenges ? challenges.slice(0, maxChallenges) : challenges).map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              timeRemaining={getTimeRemaining(challenge.end_date)}
            />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
