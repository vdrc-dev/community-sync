import { cn } from '@/lib/utils';
import { useProgress } from '@/hooks/useProgress';
import { useAuth } from '@/hooks/useAuth';
import { Check } from 'lucide-react';

interface ClassProgressCheckboxProps {
  classId: string;
  className?: string;
  onComplete?: () => void;
}

export function ClassProgressCheckbox({ classId, className, onComplete }: ClassProgressCheckboxProps) {
  const { user } = useAuth();
  const { isClassCompleted, markClassComplete, unmarkClassComplete, celebrateCompletion } = useProgress();
  
  const isCompleted = isClassCompleted(classId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    if (isCompleted) {
      unmarkClassComplete(classId);
    } else {
      markClassComplete(classId);
      celebrateCompletion();
      onComplete?.();
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all',
        isCompleted
          ? 'bg-primary border-primary text-primary-foreground'
          : 'border-border hover:border-primary/50 bg-transparent',
        className
      )}
      title={isCompleted ? 'Marcar como no completada' : 'Marcar como completada'}
    >
      {isCompleted && <Check className="w-4 h-4" />}
    </button>
  );
}
