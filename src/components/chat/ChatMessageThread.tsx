import { useRef, useEffect, useState } from 'react';
import { ChatMessage } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Send, Hash, Users, Smile, Sparkles, MessageCircle } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessageThreadProps {
  channelName: string;
  channelType: 'group' | 'dm';
  channelEmoji?: string;
  channelDescription?: string;
  messages: ChatMessage[];
  isLoading: boolean;
  memberCount?: number;
  onlineCount?: number;
  showMembersPanel?: boolean;
  onToggleMembersPanel?: () => void;
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
  return diff < 5 * 60 * 1000;
}

export function ChatMessageThread({
  channelName,
  channelType,
  channelEmoji,
  channelDescription,
  messages,
  isLoading,
  memberCount,
  onlineCount,
  showMembersPanel,
  onToggleMembersPanel,
  onSendMessage,
}: ChatMessageThreadProps) {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Channel Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border/50 bg-card/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2.5">
          {channelType === 'group' ? (
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-base">
              {channelEmoji || <Hash className="h-4 w-4 text-primary" />}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-accent" />
            </div>
          )}
          <div>
            <h3 className="font-mono font-semibold text-sm flex items-center gap-1.5">
              {channelType === 'group' && <span className="text-muted-foreground">#</span>}
              {channelName}
            </h3>
            {channelDescription ? (
              <span className="text-[10px] text-muted-foreground line-clamp-1">
                {channelDescription}
              </span>
            ) : memberCount !== undefined ? (
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" /> {memberCount} {memberCount === 1 ? 'miembro' : 'miembros'}
              </span>
            ) : null}
          </div>
        </div>

        {/* Members toggle */}
        {onToggleMembersPanel && channelType === 'group' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMembersPanel}
            className={cn(
              'h-8 gap-1.5 text-xs font-mono',
              showMembersPanel
                ? 'bg-primary/10 text-primary hover:bg-primary/15'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-label="Mostrar miembros"
          >
            <Users className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{memberCount ?? 0}</span>
            {onlineCount !== undefined && onlineCount > 0 && (
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-green-500/80">{onlineCount}</span>
              </span>
            )}
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              Cargando mensajes...
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
              className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
            >
              {channelType === 'group' ? (
                <span className="text-4xl">{channelEmoji || '💬'}</span>
              ) : (
                <span className="text-4xl">👋</span>
              )}
            </motion.div>
            <div>
              <p className="font-mono font-semibold text-foreground text-lg">
                {channelType === 'group' ? `Bienvenido a #${channelName}` : 'Inicia la conversación'}
              </p>
              {channelDescription && (
                <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                  {channelDescription}
                </p>
              )}
              <p className="text-xs text-muted-foreground/60 mt-2">
                Sé el primero en enviar un mensaje ✨
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
                    <div className="flex items-center gap-3 py-3 my-2">
                      <div className="flex-1 h-px bg-border/30" />
                      <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/60 px-2">
                        {formatMessageDate(msg.created_at)}
                      </span>
                      <div className="flex-1 h-px bg-border/30" />
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      'group flex items-start gap-3 py-1 px-2 -mx-2 rounded-lg hover:bg-accent/20 transition-colors',
                      grouped && 'pt-0'
                    )}
                  >
                    {/* Avatar */}
                    {!grouped ? (
                      <Avatar className="h-8 w-8 mt-0.5 shrink-0">
                        <AvatarImage src={msg.sender_profile?.avatar_url || undefined} />
                        <AvatarFallback className={cn(
                          'text-xs font-mono',
                          isOwn ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent'
                        )}>
                          {msg.sender_profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 shrink-0 flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
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
                          <span className="text-[10px] text-muted-foreground/50 font-mono">
                            {format(new Date(msg.created_at), 'HH:mm')}
                          </span>
                        </div>
                      )}
                      <p className={cn(
                        'text-sm text-foreground/90 break-words whitespace-pre-wrap leading-relaxed',
                        msg.is_deleted && 'italic text-muted-foreground/50'
                      )}>
                        {msg.is_deleted ? 'Mensaje eliminado' : msg.content}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/30 bg-card/30 backdrop-blur-sm shrink-0">
        <div className="flex items-end gap-2 bg-accent/10 rounded-xl border border-border/40 px-3 py-2 focus-within:border-primary/40 focus-within:bg-accent/15 transition-all">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`Escribe en ${channelType === 'group' ? '#' + channelName : channelName}...`}
            rows={1}
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/40 resize-none outline-none min-h-[24px] max-h-[120px] py-0.5 leading-relaxed"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            size="icon"
            className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-20 shrink-0 transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[9px] text-muted-foreground/30 mt-1.5 text-center font-mono">
          Enter para enviar · Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
