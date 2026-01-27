import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAutomations, AutomationInsert } from '@/hooks/useAutomations';
import { Zap, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface QuickAddAutomationProps {
  onSuccess?: () => void;
}

export function QuickAddAutomation({ onSuccess }: QuickAddAutomationProps) {
  const { addAutomation, calculateROI } = useAutomations();
  const [open, setOpen] = useState(false);
  
  const [taskName, setTaskName] = useState('');
  const [timeSaved, setTimeSaved] = useState(20); // Minutes saved per execution
  const [frequency, setFrequency] = useState(5); // Times per week

  const preview = calculateROI({
    task_name: taskName,
    time_before_minutes: timeSaved + 5, // Estimate: saved + 5 min after
    time_after_minutes: 5,
    frequency_per_week: frequency,
    hourly_rate: 25,
  });

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      toast.error('Ingresa el nombre de la tarea');
      return;
    }

    const automation: AutomationInsert = {
      task_name: taskName.trim(),
      category: 'other', // Default category for quick add
      time_before_minutes: timeSaved + 5,
      time_after_minutes: 5,
      frequency_per_week: frequency,
      hourly_rate: 25,
      tool_used: '',
    };

    try {
      await addAutomation.mutateAsync(automation);
      toast.success('¡Automatización agregada!');
      setTaskName('');
      setTimeSaved(20);
      setFrequency(5);
      setOpen(false);
      onSuccess?.();
    } catch {
      toast.error('Error al guardar');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Zap className="w-4 h-4" />
          Agregar Rápido
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Agregar Automatización Rápida
          </DialogTitle>
          <DialogDescription>
            Solo 3 campos. Registra tu ahorro en segundos.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="quick-task" className="text-sm font-medium">
              ¿Qué tarea automatizaste?
            </Label>
            <Input
              id="quick-task"
              placeholder="Ej: Escribir emails de seguimiento"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="text-base"
              autoFocus
            />
          </div>

          {/* Time Saved Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Tiempo ahorrado por ejecución
              </Label>
              <span className="text-lg font-bold text-primary">
                {formatTime(timeSaved)}
              </span>
            </div>
            <Slider
              value={[timeSaved]}
              onValueChange={([val]) => setTimeSaved(val)}
              min={5}
              max={120}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 min</span>
              <span>2 horas</span>
            </div>
          </div>

          {/* Frequency Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                Veces por semana
              </Label>
              <span className="text-lg font-bold text-primary">
                {frequency}x
              </span>
            </div>
            <Slider
              value={[frequency]}
              onValueChange={([val]) => setFrequency(val)}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1x/semana</span>
              <span>20x/semana</span>
            </div>
          </div>

          {/* Live Preview */}
          <AnimatePresence mode="wait">
            {taskName.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 via-primary/5 to-green-500/10 border border-green-500/20"
              >
                <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tu ahorro estimado
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{formatTime(preview.weeklyMinutes)}</p>
                    <p className="text-xs text-muted-foreground">Semanal</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{formatMoney(preview.monthlyValue)}</p>
                    <p className="text-xs text-muted-foreground">Mensual</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{formatMoney(preview.yearlyValue)}</p>
                    <p className="text-xs text-muted-foreground">Anual</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!taskName.trim() || addAutomation.isPending}
          >
            {addAutomation.isPending ? 'Guardando...' : 'Guardar Automatización'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
