import { useChatNotifications } from '@/hooks/useChatNotifications';

export function GlobalNotificationListener() {
  useChatNotifications();
  return null;
}
