import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Rocket, Calendar, ExternalLink, Video, CalendarPlus,
  Download, Clock, ChevronRight, Phone, ArrowRight,
} from 'lucide-react';

const MEET_URL = 'https://meet.google.com/nda-iqqk-qaw';
const PHONE = '+56 43 245 2070';
const PIN = '362 944 091 2476';
const INSCRIPTION_URL = 'https://vdrc.cl/talleres';

const SESSIONS = [
  { n: 1, title: 'Higiene Digital', date: '2026-03-03', day: 3, icon: '🛡️', hue: 210 },
  { n: 2, title: 'IA y Productividad', date: '2026-03-10', day: 10, icon: '🤖', hue: 160 },
  { n: 3, title: 'Presentaciones con IA', date: '2026-03-17', day: 17, icon: '🎨', hue: 280 },
  { n: 4, title: 'Vibe Coding', date: '2026-03-24', day: 24, icon: '💻', hue: 45 },
] as const;

function useCountdown(targetIso: string) {
  const [diff, setDiff] = useState(() => {
    const target = new Date(targetIso + 'T19:30:00-03:00').getTime();
    return Math.max(0, target - Date.now());
  });

  useEffect(() => {
    const id = setInterval(() => {
      const target = new Date(targetIso + 'T19:30:00-03:00').getTime();
      setDiff(Math.max(0, target - Date.now()));
    }, 60_000);
    return () => clearInterval(id);
  }, [targetIso]);

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  return { days, hours, isPast: diff === 0 };
}

function buildGoogleCalendarUrl(session: (typeof SESSIONS)[number]): string {
  const start = session.date.replace(/-/g, '') + 'T193000';
  const end = session.date.replace(/-/g, '') + 'T210000';
  const title = `Gen 11 — S${session.n}: ${session.title}`;
  const details = [
    `Taller de Productividad Digital con IA — Generación 11`,
    `Sesión ${session.n}: ${session.title}`,
    '',
    `Google Meet: ${MEET_URL}`,
    `Teléfono: ${PHONE}  PIN: ${PIN}`,
  ].join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details,
    location: MEET_URL,
    ctz: 'America/Santiago',
  });
  return `https://calendar.google.com/calendar/event?${params.toString()}`;
}

function generateIcs(): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VDRC//Gen11//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Gen 11 — VDRC',
    'X-WR-TIMEZONE:America/Santiago',
  ];

  for (const s of SESSIONS) {
    const dtStart = s.date.replace(/-/g, '') + 'T193000';
    const dtEnd = s.date.replace(/-/g, '') + 'T210000';
    const uid = `gen11-s${s.n}@vdrc.cl`;
    lines.push(
      'BEGIN:VEVENT',
      `DTSTART;TZID=America/Santiago:${dtStart}`,
      `DTEND;TZID=America/Santiago:${dtEnd}`,
      `SUMMARY:Gen 11 — S${s.n}: ${s.title}`,
      `DESCRIPTION:Google Meet: ${MEET_URL}\\nTeléfono: ${PHONE} PIN: ${PIN}`,
      `LOCATION:${MEET_URL}`,
      `UID:${uid}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function downloadIcs() {
  const blob = new Blob([generateIcs()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gen11-vdrc.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div
        className="text-2xl sm:text-3xl font-mono font-bold"
        style={{
          background: 'linear-gradient(180deg, hsl(152 70% 65%), hsl(174 60% 45%))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/50">
        {label}
      </div>
    </div>
  );
}

export function Gen11Banner() {
  const countdown = useCountdown(SESSIONS[0].date);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <section id="gen11-banner" className="py-16 sm:py-24 relative overflow-hidden" aria-label="Generación 11">
      {/* Ambient background */}
      <motion.div
        className="absolute top-[20%] left-[5%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, hsl(152 70% 40% / 0.1), transparent 65%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, hsl(263 60% 50% / 0.08), transparent 65%)' }}
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute top-[50%] left-[40%] w-[280px] h-[280px] rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, hsl(174 60% 45% / 0.05), transparent 65%)' }}
        animate={{ x: [0, 30, -20, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-10 sm:mb-14"
          >
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent/50">
              /// PRÓXIMA_GENERACIÓN
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mt-3">
              Generación{' '}
              <span className="text-gradient-live text-glow-epic">11</span>
            </h2>
            <p className="text-muted-foreground/60 max-w-2xl text-base sm:text-lg mt-3 font-light">
              4 sesiones en vivo — todos los martes de marzo 2026, 19:30 a 21:00 hrs Chile
            </p>
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            {/* Animated glow border */}
            <div className="absolute -inset-px rounded-3xl border-glow-animated" />

            <div className="glass-prismatic glass-specular relative rounded-3xl overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />

              <div className="relative z-10 p-6 sm:p-10">
                {/* Top bar: countdown + badges */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                  {/* Countdown */}
                  {!countdown.isPast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-primary/5 border border-primary/10"
                    >
                      <div className="flex items-center gap-3">
                        <CountdownUnit value={countdown.days} label="Días" />
                        <span className="text-muted-foreground/30 text-lg font-light">:</span>
                        <CountdownUnit value={countdown.hours} label="Horas" />
                      </div>
                      <div className="w-px h-8 bg-border/20" />
                      <span className="text-[10px] font-mono text-muted-foreground/50 leading-tight max-w-[80px]">
                        para la primera sesión
                      </span>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-accent/10 text-accent border-accent/20 gap-1">
                      <Rocket className="w-3 h-3" />
                      Marzo 2026
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 gap-1">
                      <Video className="w-3 h-3" />
                      Google Meet
                    </Badge>
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 gap-1">
                      <Clock className="w-3 h-3" />
                      19:30 – 21:00
                    </Badge>
                  </div>
                </div>

                {/* Session timeline */}
                <div className="grid sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                  {SESSIONS.map((s, i) => (
                    <motion.a
                      key={s.n}
                      href={buildGoogleCalendarUrl(s)}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="group relative flex flex-col items-center text-center rounded-2xl p-4 sm:p-5 border transition-all duration-500 hover:scale-[1.04] hover:-translate-y-1"
                      style={{
                        background: `hsl(${s.hue} 60% 50% / 0.03)`,
                        borderColor: `hsl(${s.hue} 60% 50% / 0.1)`,
                      }}
                      title={`Agregar S${s.n} a Google Calendar`}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                        style={{ background: `hsl(${s.hue} 60% 50% / 0.08)` }}
                      />

                      {/* Day number */}
                      <div
                        className="text-3xl sm:text-4xl font-mono font-bold mb-1 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(180deg, hsl(${s.hue} 70% 70%), hsl(${s.hue} 70% 45%))`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {s.day}
                      </div>
                      <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-foreground/40 mb-3">
                        Mar · Martes
                      </div>

                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          background: `hsl(${s.hue} 60% 50% / 0.08)`,
                          border: `1px solid hsl(${s.hue} 60% 50% / 0.15)`,
                        }}
                      >
                        {s.icon}
                      </div>

                      {/* Module label */}
                      <span
                        className="text-[9px] font-mono px-2 py-0.5 rounded-md border mb-2"
                        style={{
                          background: `hsl(${s.hue} 60% 50% / 0.06)`,
                          borderColor: `hsl(${s.hue} 60% 50% / 0.15)`,
                          color: `hsl(${s.hue} 60% 65%)`,
                        }}
                      >
                        Módulo {s.n}
                      </span>

                      <p className="text-sm font-semibold leading-tight">{s.title}</p>

                      {/* Calendar hover icon */}
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono" style={{ color: `hsl(${s.hue} 60% 60%)` }}>
                          <CalendarPlus className="w-3 h-3" />
                          Agregar
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Accent line */}
                <div
                  className="h-px w-full rounded-full mb-8"
                  style={{ background: 'linear-gradient(90deg, transparent, hsl(152 70% 45% / 0.2), hsl(174 60% 45% / 0.2), transparent)' }}
                />

                {/* Bottom: Meet + Actions */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                  {/* Meet info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider">Todas las sesiones por</p>
                      <a
                        href={MEET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-blue-400 hover:text-blue-300 transition-colors truncate block"
                      >
                        {MEET_URL.replace('https://', '')}
                        <ExternalLink className="w-3 h-3 inline-block ml-1.5 opacity-50" />
                      </a>
                    </div>

                    {/* Phone toggle */}
                    <button
                      onClick={() => setShowPhone(!showPhone)}
                      className="w-8 h-8 rounded-lg bg-muted/30 border border-border/20 flex items-center justify-center shrink-0 hover:bg-muted/50 transition-colors ml-1"
                      title="Ver teléfono"
                      aria-expanded={showPhone ? 'true' : 'false'}
                    >
                      <Phone className="w-3.5 h-3.5 text-muted-foreground/50" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={downloadIcs}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border/20 text-sm font-mono text-muted-foreground hover:text-foreground hover:border-border/40 hover:bg-white/[0.02] transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      .ics
                    </button>
                    <a
                      href={INSCRIPTION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent font-mono font-semibold text-sm hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(174_60%_45%_/_0.3)]"
                    >
                      <Rocket className="w-4 h-4" />
                      Inscríbete en Gen 11
                      <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Phone info (expandable) */}
                {showPhone && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted/20 border border-border/10 text-xs font-mono text-muted-foreground/60"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{PHONE}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span>PIN: {PIN}</span>
                  </motion.div>
                )}

                {/* Timezone note */}
                <div className="mt-4 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground/30 font-mono">
                  <Calendar className="w-3 h-3" />
                  Hora Chile (GMT-3) · América/Santiago
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
