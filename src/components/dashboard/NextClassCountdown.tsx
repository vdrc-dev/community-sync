import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { format, parseISO, differenceInSeconds, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

interface ClassData {
  id: string;
  title: string;
  class_number: number;
  class_date: string | null;
}

interface NextClassCountdownProps {
  classData: ClassData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function NextClassCountdown({ classData }: NextClassCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!classData.class_date) return;

    const targetDate = parseISO(classData.class_date);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const totalSeconds = differenceInSeconds(targetDate, now);
      
      if (totalSeconds <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [classData.class_date]);

  if (!classData.class_date) return null;

  const targetDate = parseISO(classData.class_date);
  const daysUntil = differenceInDays(targetDate, new Date());

  return (
    <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Próxima clase</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {format(targetDate, "EEEE d 'de' MMMM", { locale: es })}
        </span>
      </div>

      <div>
        <p className="font-semibold">
          Clase {classData.class_number}: {classData.title}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {format(targetDate, "HH:mm 'hrs'", { locale: es })}
        </p>
      </div>

      {/* Countdown Display */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { value: timeLeft.days, label: 'días' },
          { value: timeLeft.hours, label: 'hrs' },
          { value: timeLeft.minutes, label: 'min' },
          { value: timeLeft.seconds, label: 'seg' },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-2 rounded-lg bg-background/50"
          >
            <p className="text-xl font-mono font-bold text-primary">
              {String(item.value).padStart(2, '0')}
            </p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {daysUntil <= 1 && (
        <p className="text-xs text-center text-primary font-medium animate-pulse">
          {daysUntil === 0 ? '¡Es mañana!' : '¡Falta menos de un día!'}
        </p>
      )}
    </div>
  );
}
