import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, getNotificationIcon } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleNotificationClick = (notification: { id: string; link: string | null }) => {
    markAsRead(notification.id);
    if (notification.link) {
      setOpen(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-mono animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 glass">
        <div className="flex items-center justify-between px-3 py-2">
          <h4 className="font-semibold">Notificaciones</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => markAllAsRead()}
            >
              Marcar todas como leídas
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {!notifications?.length ? (
            <div className="py-8 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No hay notificaciones</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  'flex items-start gap-3 p-3 cursor-pointer',
                  !notification.is_read && 'bg-primary/5'
                )}
                onClick={() => handleNotificationClick(notification)}
                asChild={!!notification.link}
              >
                {notification.link ? (
                  <Link to={notification.link}>
                    <NotificationContent notification={notification} getNotificationIcon={getNotificationIcon} />
                  </Link>
                ) : (
                  <div>
                    <NotificationContent notification={notification} getNotificationIcon={getNotificationIcon} />
                  </div>
                )}
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationContent({ 
  notification, 
  getNotificationIcon 
}: { 
  notification: { type: string; title: string; message: string | null; is_read: boolean; created_at: string }; 
  getNotificationIcon: (type: string) => string;
}) {
  return (
    <>
      <span className="text-xl flex-shrink-0">{getNotificationIcon(notification.type)}</span>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm', !notification.is_read && 'font-medium')}>
          {notification.title}
        </p>
        {notification.message && (
          <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: es })}
        </p>
      </div>
      {!notification.is_read && (
        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
      )}
    </>
  );
}
