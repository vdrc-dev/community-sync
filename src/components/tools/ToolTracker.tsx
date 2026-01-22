import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToolLogs, ToolStatus } from '@/hooks/useToolLogs';
import { useAuth } from '@/hooks/useAuth';
import { Star, CheckCircle, Bookmark, XCircle, Sparkles, ChevronDown } from 'lucide-react';

interface ToolTrackerProps {
  toolId: string;
  toolName: string;
  compact?: boolean;
}

const statusConfig: Record<ToolStatus, { label: string; icon: React.ReactNode; color: string }> = {
  wishlist: { 
    label: 'Por probar', 
    icon: <Bookmark className="w-3 h-3" />, 
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
  },
  tried: { 
    label: 'Probada', 
    icon: <CheckCircle className="w-3 h-3" />, 
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' 
  },
  frequent: { 
    label: 'Uso frecuente', 
    icon: <Sparkles className="w-3 h-3" />, 
    color: 'bg-green-500/10 text-green-400 border-green-500/20' 
  },
  discarded: { 
    label: 'Descartada', 
    icon: <XCircle className="w-3 h-3" />, 
    color: 'bg-red-500/10 text-red-400 border-red-500/20' 
  },
};

export function ToolTracker({ toolId, toolName, compact = false }: ToolTrackerProps) {
  const { user } = useAuth();
  const { getToolLog, updateToolLog, removeToolLog } = useToolLogs();
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  
  const currentLog = getToolLog(toolId);
  const currentStatus = currentLog?.status;

  const handleStatusChange = async (status: ToolStatus) => {
    await updateToolLog.mutateAsync({ 
      toolId, 
      status,
      rating: rating || currentLog?.rating,
      notes: notes || currentLog?.notes || undefined,
    });
    setIsOpen(false);
  };

  const handleClear = async () => {
    await removeToolLog.mutateAsync(toolId);
    setIsOpen(false);
    setNotes('');
    setRating(0);
  };

  if (!user) return null;

  if (compact) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {currentStatus ? (
            <Badge 
              variant="outline" 
              className={`${statusConfig[currentStatus].color} cursor-pointer hover:opacity-80 transition-opacity`}
            >
              {statusConfig[currentStatus].icon}
              <span className="ml-1">{statusConfig[currentStatus].label}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </Badge>
          ) : (
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <Bookmark className="w-3 h-3 mr-1" />
              Trackear
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="end">
          <div className="space-y-3">
            <p className="text-sm font-medium">{toolName}</p>
            
            {/* Status options */}
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(statusConfig) as [ToolStatus, typeof statusConfig[ToolStatus]][]).map(([status, config]) => (
                <Button
                  key={status}
                  variant={currentStatus === status ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 text-xs justify-start"
                  onClick={() => handleStatusChange(status)}
                >
                  {config.icon}
                  <span className="ml-1">{config.label}</span>
                </Button>
              ))}
            </div>

            {/* Rating */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Tu rating:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        star <= (rating || currentLog?.rating || 0)
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Notas:</p>
              <Textarea
                placeholder="Tus notas sobre esta herramienta..."
                value={notes || currentLog?.notes || ''}
                onChange={(e) => setNotes(e.target.value)}
                className="h-16 text-xs resize-none"
              />
            </div>

            {currentStatus && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs text-destructive hover:text-destructive"
                onClick={handleClear}
              >
                Quitar del tracking
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <motion.div 
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {(Object.entries(statusConfig) as [ToolStatus, typeof statusConfig[ToolStatus]][]).map(([status, config]) => (
        <Button
          key={status}
          variant={currentStatus === status ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleStatusChange(status)}
          disabled={updateToolLog.isPending}
          className="h-8"
        >
          {config.icon}
          <span className="ml-1">{config.label}</span>
        </Button>
      ))}
    </motion.div>
  );
}
