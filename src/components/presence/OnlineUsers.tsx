import { motion, AnimatePresence } from 'framer-motion';
import { usePresence, PresenceUser } from '@/hooks/usePresence';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Users, Circle } from 'lucide-react';

interface OnlineUsersProps {
  currentPage?: string;
  showCount?: boolean;
  maxAvatars?: number;
  className?: string;
}

export function OnlineUsers({ 
  currentPage = 'home',
  showCount = true,
  maxAvatars = 5,
  className 
}: OnlineUsersProps) {
  const { onlineUsers, onlineCount } = usePresence(currentPage);

  const displayUsers = onlineUsers.slice(0, maxAvatars);
  const extraCount = Math.max(0, onlineUsers.length - maxAvatars);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Online Indicator */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Circle className="w-2 h-2 fill-green-500 text-green-500" />
        </motion.div>
        {showCount && (
          <span className="font-mono">
            {onlineCount} online
          </span>
        )}
      </div>

      {/* Avatar Stack */}
      {displayUsers.length > 0 && (
        <div className="flex -space-x-2">
          <AnimatePresence mode="popLayout">
            {displayUsers.map((user, index) => (
              <Tooltip key={user.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ zIndex: maxAvatars - index }}
                  >
                    <Avatar className="w-7 h-7 border-2 border-background ring-2 ring-green-500/30">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs bg-primary/20">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Viendo: {formatPageName(user.page)}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </AnimatePresence>

          {/* Extra count badge */}
          {extraCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center"
              style={{ zIndex: 0 }}
            >
              <span className="text-xs font-medium text-muted-foreground">
                +{extraCount}
              </span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

function formatPageName(page: string): string {
  const pageNames: Record<string, string> = {
    home: 'Inicio',
    generations: 'Generaciones',
    tools: 'Herramientas',
    forum: 'Comunidad',
    calendar: 'Calendario',
    leaderboard: 'Leaderboard',
    profile: 'Perfil',
  };
  return pageNames[page] || page;
}
