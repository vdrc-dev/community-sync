import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN, VDRC_GREEN_DIM } from './theme';
import participantsBg from '@/assets/gen11-participants-bg.png';

const PARTICIPANTS = [
  { nombre: 'Gonzalo', apellido: 'Velasco' },
  { nombre: 'Gianluca', apellido: 'Baselli' },
  { nombre: 'Alejandro', apellido: 'Soto' },
  { nombre: 'Carolina', apellido: 'Bustamante' },
  { nombre: 'Francisco', apellido: 'Fernández' },
  { nombre: 'Pablo', apellido: 'Dittborn' },
  { nombre: 'Pablo', apellido: 'Campino' },
  { nombre: 'Vicente', apellido: 'Dittborn' },
  { nombre: 'Cristóbal', apellido: 'Dittborn' },
  { nombre: 'Agustín', apellido: 'Dittborn' },
  { nombre: 'Francisca', apellido: 'Campino' },
  { nombre: 'Eduardo', apellido: 'Gomien' },
  { nombre: 'Cesar', apellido: 'Kattan' },
];

// Assign a cycling accent color per participant
const ACCENTS = [
  G11.emerald, G11.cyan, G11.blue, G11.purple,
  G11.amber, G11.rose, G11.orange, G11.emerald,
  G11.cyan, G11.blue, G11.purple, G11.amber,
  G11.rose,
];

export function G11S1Slide02Participants() {
  const m = useG11Motion();

  return (
    <G11Shell className="!min-h-0 h-full">
      {/* Left green accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Background image — right half */}
      <div className="absolute right-0 top-0 bottom-0 w-[42%] overflow-hidden z-0">
        <img
          src={participantsBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.18 }}
        />
        <div className="absolute inset-y-0 left-0 w-32"
          style={{ background: 'linear-gradient(90deg, #181c1b, transparent)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(61,153,112,0.12), transparent 75%)' }} />
      </div>

      {/* Main layout — ocupa todo el alto disponible */}
      <div className="absolute inset-0 z-10 flex gap-10 pl-12 sm:pl-20 pr-8 sm:pr-12 pt-12 pb-14 items-stretch">

        {/* LEFT: title block */}
        <div className="flex-shrink-0 w-[220px] flex flex-col justify-center gap-6">
          <motion.div {...m(0)} className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border self-start"
              style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
              <Users className="w-3 h-3" style={{ color: G11.emerald.text }} />
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: G11.emerald.text }}>
                Generación 11
              </span>
            </div>

            <h1 className="text-4xl font-black text-white uppercase leading-none tracking-tight">
              PARTI<span style={{ color: VDRC_GREEN }}>CI</span>PANTES
            </h1>

            <G11GreenLine className="max-w-[110px]" />

            <p className="text-white/35 text-xs leading-relaxed">
              13 profesionales.<br />
              Una misión: dominar<br />
              la IA con intención.
            </p>
          </motion.div>

          {/* Count badge */}
          <motion.div {...m(0.15)}>
            <div className="inline-flex flex-col items-center px-5 py-4 rounded-2xl border"
              style={{ borderColor: VDRC_GREEN_DIM, background: 'rgba(61,153,112,0.06)' }}>
              <span className="text-5xl font-black tabular-nums" style={{ color: VDRC_GREEN }}>13</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 mt-1">Participantes</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: participant grid — fills full height */}
        <div className="flex-1 grid grid-cols-3 gap-4" style={{ gridTemplateRows: 'repeat(5, 1fr)' }}>
          {PARTICIPANTS.map((p, i) => {
            const accent = ACCENTS[i];
            const initials = `${p.nombre[0]}${p.apellido[0]}`;
            return (
              <motion.div
                key={`${p.nombre}-${p.apellido}`}
                {...m(0.05 + i * 0.04)}
                className="relative overflow-hidden rounded-2xl border flex items-center gap-4 px-5"
                style={{
                  borderColor: accent.border,
                  background: `linear-gradient(135deg, ${accent.bg} 0%, rgba(0,0,0,0.3) 100%)`,
                }}
              >
                {/* Number watermark */}
                <div className="absolute right-3 bottom-1 text-6xl font-black pointer-events-none select-none leading-none"
                  style={{ color: accent.text, opacity: 0.07 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Avatar initials */}
                <div className="w-13 h-13 rounded-xl border flex items-center justify-center flex-shrink-0 font-black text-base"
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderColor: accent.border,
                    background: 'rgba(0,0,0,0.4)',
                    color: accent.text,
                  }}>
                  {initials}
                </div>

                {/* Name */}
                <div className="min-w-0 flex-1">
                  <div className="text-white font-bold text-base leading-tight truncate">{p.nombre}</div>
                  <div className="text-white/45 text-sm leading-tight truncate">{p.apellido}</div>
                </div>

                {/* Accent dot */}
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: accent.dot, boxShadow: `0 0 10px ${accent.glow}` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </G11Shell>
  );
}
