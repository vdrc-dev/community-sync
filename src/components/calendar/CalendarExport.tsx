import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, Download, ExternalLink, Check, Copy } from 'lucide-react';
import { format, addMinutes } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string | null;
  event_date: string;
  duration_minutes?: number | null;
  location?: string | null;
  meeting_url?: string | null;
}

interface CalendarExportProps {
  event: CalendarEvent;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'icon';
}

export function CalendarExport({ event, variant = 'outline', size = 'sm' }: CalendarExportProps) {
  const [copied, setCopied] = useState(false);

  const eventDate = new Date(event.event_date);
  const endDate = addMinutes(eventDate, event.duration_minutes || 90);

  // Format for ICS file
  const formatDateForICS = (date: Date): string => {
    return format(date, "yyyyMMdd'T'HHmmss");
  };

  // Generate ICS content
  const generateICS = (): string => {
    const description = [
      event.description || '',
      event.meeting_url ? `\\n\\nEnlace de reunión: ${event.meeting_url}` : '',
    ].join('');

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VDRC//Taller IA//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${formatDateForICS(eventDate)}
DTEND:${formatDateForICS(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
LOCATION:${event.location || event.meeting_url || 'Online'}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
  };

  // Download ICS file
  const downloadICS = () => {
    const icsContent = generateICS();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast({
      title: 'Archivo descargado',
      description: 'Abre el archivo .ics para agregarlo a tu calendario',
    });
  };

  // Generate Google Calendar URL
  const getGoogleCalendarUrl = (): string => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${formatDateForICS(eventDate)}/${formatDateForICS(endDate)}`,
      details: `${event.description || ''}${event.meeting_url ? `\n\nEnlace: ${event.meeting_url}` : ''}`,
      location: event.location || event.meeting_url || '',
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  // Generate Outlook Calendar URL
  const getOutlookUrl = (): string => {
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      startdt: eventDate.toISOString(),
      enddt: endDate.toISOString(),
      subject: event.title,
      body: `${event.description || ''}${event.meeting_url ? `\n\nEnlace: ${event.meeting_url}` : ''}`,
      location: event.location || event.meeting_url || '',
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  // Copy event details
  const copyEventDetails = () => {
    const details = `📅 ${event.title}
📆 ${format(eventDate, 'dd/MM/yyyy HH:mm')}
⏱️ Duración: ${event.duration_minutes || 90} minutos
${event.location ? `📍 ${event.location}` : ''}
${event.meeting_url ? `🔗 ${event.meeting_url}` : ''}
${event.description ? `\n${event.description}` : ''}`;

    navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    toast({
      title: 'Copiado al portapapeles',
      description: 'Puedes pegar los detalles del evento',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <Calendar className="h-4 w-4" />
          {size !== 'icon' && 'Agregar al calendario'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => window.open(getGoogleCalendarUrl(), '_blank')}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Google Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(getOutlookUrl(), '_blank')}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Outlook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadICS}>
          <Download className="mr-2 h-4 w-4" />
          Descargar .ics (Apple)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyEventDetails}>
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-primary" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          Copiar detalles
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
