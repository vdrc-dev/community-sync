import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Sparkles, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGenerations, calculateClassDates, WORKSHOP_MODULES } from '@/hooks/useGenerations';

interface CreateGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateGenerationModal({ open, onOpenChange, onSuccess }: CreateGenerationModalProps) {
  const { createGeneration, isCreating } = useGenerations();
  
  const [code, setCode] = useState('GEN-10');
  const [name, setName] = useState('Febrero 2026');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2026, 1, 3)); // Feb 3, 2026
  const [isActive, setIsActive] = useState(true);
  const [autoCreateClasses, setAutoCreateClasses] = useState(true);

  const classDates = startDate ? calculateClassDates(startDate) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || !name || !startDate) return;

    await createGeneration({
      code,
      name,
      startDate,
      isActive,
      autoCreateClasses,
    });

    onOpenChange(false);
    onSuccess?.();
    
    // Reset form
    setCode('GEN-10');
    setName('');
    setStartDate(undefined);
    setIsActive(true);
    setAutoCreateClasses(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Nueva Generación
          </DialogTitle>
          <DialogDescription>
            Crea una nueva generación del taller con sus 4 clases automáticas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="GEN-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Febrero 2026"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Fecha de inicio</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: es }) : "Selecciona una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked === true)}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Marcar como generación activa
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="autoCreate"
              checked={autoCreateClasses}
              onCheckedChange={(checked) => setAutoCreateClasses(checked === true)}
            />
            <Label htmlFor="autoCreate" className="cursor-pointer">
              Auto-crear las 4 clases del taller
            </Label>
          </div>

          {autoCreateClasses && startDate && (
            <Card className="bg-muted/50">
              <CardContent className="p-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Se crearán las siguientes clases (martes consecutivos):
                </p>
                {WORKSHOP_MODULES.map((mod, i) => (
                  <div key={mod.number} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {mod.number}
                    </div>
                    <span className="font-medium">{mod.title}</span>
                    <span className="text-muted-foreground ml-auto">
                      {format(classDates[i], "d 'de' MMMM", { locale: es })}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreating || !code || !name || !startDate}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                'Crear Generación'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
