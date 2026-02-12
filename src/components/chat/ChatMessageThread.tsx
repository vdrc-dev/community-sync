import { useRef, useEffect, useState } from 'react';
import { ChatMessage } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Send, Hash, Users, Smile } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessageThreadProps {
  channelName: string;
  channelType: 'group' | 'dm';
  channelEmoji?: string;
  messages: ChatMessage[];
  isLoading: boolean;
  memberCount?: number;
  onSendMessage: (content: string) => void;
}

function formatMessageDate(dateStr: string) {
  const date = new Date(dateStr);
  if (isToday(date)) return 'Hoy';
  if (isYesterday(date)) return 'Ayer';
  return format(date, "d 'de' MMMM", { locale: es });
}

function shouldShowDate(messages: ChatMessage[], index: number) {
  if (index === 0) return true;
  const curr = new Date(messages[index].created_at).toDateString();
  const prev = new Date(messages[index - 1].created_at).toDateString();
  return curr !== prev;
}

function shouldGroupWithPrevious(messages: ChatMessage[], index: number) {
  if (index === 0) return false;
  const curr = messages[index];
  const prev = messages[index - 1];
  if (curr.sender_id !== prev.sender_id) return false;
  const diff = new Date(curr.created_at).getTime() - new Date(prev.created_at).getTime();
  return diff < 5 * 60 * 1000; // 5 min
}

export function ChatMessageThread({
  channelName,
  channelType,
  channelEmoji,
  messages,
  isLoading,
  memberCount,
  onSendMessage,
}: ChatMessageThreadProps) {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputValue('');
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Channel Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border/50 bg-card/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2.5">
          {channelType === 'group' ? (
            <Hash className="h-5 w-5 text-muted-foreground" />
          ) : (
            <span className="text-lg">{channelEmoji || '💬'}</span>
          )}
          <div>
            <h3 className="font-mono font-semibold text-sm">{channelName}</h3>
            {memberCount !== undefined && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" /> {memberCount} miembros
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Cargando mensajes...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              {channelType === 'group' ? (
                <Hash className="h-8 w-8 text-primary/60" />
              ) : (
                <span className="text-3xl">👋</span>
              )}
            </div>
            <div>
              <p className="font-mono font-semibold text-foreground">
                {channelType === 'group' ? `Bienvenido a #${channelName}` : `Inicia la conversación`}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Sé el primero en enviar un mensaje
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-0.5">
            {messages.map((msg, idx) => {
              const showDate = shouldShowDate(messages, idx);
              const grouped = shouldGroupWithPrevious(messages, idx);
              const isOwn = msg.sender_id === user?.id;

              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="flex items-center gap-3 py-3">
                      <div className="flex-1 h-px bg-border/50" />
                      <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
                        {formatMessageDate(msg.created_at)}
                      </span>
                      <div className="flex-1 h-px bg-border/50" />
                    </div>
                  )}

                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'group flex items-start gap-3 py-1 px-2 -mx-2 rounded-lg hover:bg-accent/30 transition-colors',
                        grouped && 'pt-0'
                      )}
                    >
                      {/* Avatar */}
                      {!grouped ? (
                        <Avatar className="h-8 w-8 mt-0.5 shrink-0">
                          <AvatarImage src={msg.sender_profile?.avatar_url || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-mono">
                            {msg.sender_profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 shrink-0 flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            {format(new Date(msg.created_at), 'HH:mm')}
                          </span>
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        {!grouped && (
                          <div className="flex items-baseline gap-2">
                            <span className={cn(
                              'font-semibold text-sm',
                              isOwn ? 'text-primary' : 'text-foreground'
                            )}>
                              {msg.sender_profile?.full_name || 'Usuario'}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {format(new Date(msg.created_at), 'HH:mm')}
                            </span>
                          </div>
                        )}
                        <p className={cn(
                          'text-sm text-foreground/90 break-words whitespace-pre-wrap',
                          msg.is_deleted && 'italic text-muted-foreground'
                        )}>
                          {msg.is_deleted ? 'Mensaje eliminado' : msg.content}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/50 bg-card/30 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2 bg-accent/20 rounded-xl border border-border/50 px-3 py-1.5 focus-within:border-primary/50 transition-colors">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={`Mensaje en ${channelType === 'group' ? '#' + channelName : channelName}...`}
            className="border-0 bg-transparent h-9 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/50"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            size="icon"
            className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-30 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
