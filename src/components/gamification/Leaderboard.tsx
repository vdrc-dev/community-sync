import { cn } from '@/lib/utils';
import { useGamification } from '@/hooks/useGamification';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LevelBadge } from './LevelBadge';
import { Trophy, Medal, Award, Loader2 } from 'lucide-react';

interface LeaderboardProps {
  limit?: number;
  className?: string;
}

export function Leaderboard({ limit = 10, className }: LeaderboardProps) {
  const { leaderboard, leaderboardLoading } = useGamification();
  const { user } = useAuth();

  if (leaderboardLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const topEntries = leaderboard?.slice(0, limit) || [];
  const userRank = leaderboard?.findIndex(e => e.user_id === user?.id);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 text-center text-muted-foreground font-mono">{index + 1}</span>;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Top 3 Featured */}
      {topEntries.length >= 3 && (
        <div className="flex items-end justify-center gap-4 mb-6 pt-4">
          {/* Second place */}
          <div className="flex flex-col items-center">
            <Avatar className="w-12 h-12 border-2 border-gray-400">
              <AvatarImage src={topEntries[1].profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-muted text-sm">2</AvatarFallback>
            </Avatar>
            <div className="mt-2 text-center">
              <Medal className="w-6 h-6 text-gray-400 mx-auto" />
              <p className="text-xs font-medium truncate max-w-[80px]">
                {topEntries[1].profile?.full_name || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground">{topEntries[1].points} pts</p>
            </div>
          </div>

          {/* First place */}
          <div className="flex flex-col items-center -mt-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-yellow-400 ring-2 ring-yellow-400/30">
                <AvatarImage src={topEntries[0].profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-yellow-400/20 text-yellow-400">1</AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -right-2">
                <span className="text-2xl">👑</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto" />
              <p className="text-sm font-semibold truncate max-w-[100px]">
                {topEntries[0].profile?.full_name || 'Usuario'}
              </p>
              <p className="text-sm text-primary font-mono">{topEntries[0].points} pts</p>
            </div>
          </div>

          {/* Third place */}
          <div className="flex flex-col items-center">
            <Avatar className="w-12 h-12 border-2 border-amber-600">
              <AvatarImage src={topEntries[2].profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-muted text-sm">3</AvatarFallback>
            </Avatar>
            <div className="mt-2 text-center">
              <Award className="w-6 h-6 text-amber-600 mx-auto" />
              <p className="text-xs font-medium truncate max-w-[80px]">
                {topEntries[2].profile?.full_name || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground">{topEntries[2].points} pts</p>
            </div>
          </div>
        </div>
      )}

      {/* Rest of leaderboard */}
      <div className="space-y-1">
        {topEntries.slice(3).map((entry, index) => (
          <div
            key={entry.id}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              entry.user_id === user?.id
                ? 'bg-primary/10 border border-primary/30'
                : 'hover:bg-muted/50'
            )}
          >
            {getRankIcon(index + 3)}
            
            <Avatar className="w-8 h-8">
              <AvatarImage src={entry.profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-muted text-xs">
                {(entry.profile?.full_name || 'U').charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {entry.profile?.full_name || 'Usuario'}
                {entry.user_id === user?.id && (
                  <span className="text-primary ml-1">(tú)</span>
                )}
              </p>
            </div>

            <LevelBadge level={entry.level} size="sm" showName={false} />

            <span className="text-sm font-mono text-primary">
              {entry.points}
            </span>
          </div>
        ))}
      </div>

      {/* User's rank if not in top */}
      {userRank !== undefined && userRank >= limit && leaderboard && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
            <span className="w-5 text-center text-muted-foreground font-mono">
              {userRank + 1}
            </span>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                Tú
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 text-sm">Tu posición</span>
            <span className="text-sm font-mono text-primary">
              {leaderboard[userRank].points}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
