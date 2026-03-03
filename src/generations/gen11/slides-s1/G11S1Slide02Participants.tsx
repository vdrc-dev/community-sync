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
];

// Assign a cycling accent color per participant
const ACCENTS = [
  G11.emerald, G11.cyan, G11.blue, G11.purple,
  G11.amber, G11.rose, G11.orange, G11.emerald,
  G11.cyan, G11.blue, G11.purple, G11.amber,
];

export function G11S1Slide02Participants() {
  const m = useG11Motion();

  return (
    <G11Shell className="flex items-stretch">
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
        {/* fade gradient over the left edge of the image */}
        <div className="absolute inset-y-0 left-0 w-32"
          style={{ background: 'linear-gradient(90deg, #181c1b, transparent)' }} />
        {/* radial green glow behind the image */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(61,153,112,0.12), transparent 75%)' }} />
      </div>

      {/* Main layout */}
      <div className="relative z-10 w-full flex gap-10 px-12 sm:px-20 py-10 items-center justify-between">

        {/* LEFT: title block */}
        <div className="flex-shrink-0 w-[260px] flex flex-col justify-center">
          <motion.div {...m(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
              style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
              <Users className="w-3 h-3" style={{ color: G11.emerald.text }} />
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: G11.emerald.text }}>
                Generación 11
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl font-black text-white uppercase leading-none tracking-tight">
              Part<br />
              <span style={{ color: VDRC_GREEN }}>icip</span><br />
              antes
            </h1>

            <G11GreenLine className="my-5 max-w-[120px]" />

            <p className="text-white/35 text-xs leading-relaxed max-w-[200px]">
              12 profesionales.<br />
              Una misión: dominar<br />
              la IA con intención.
            </p>
          </motion.div>

          {/* Count badge */}
          <motion.div {...m(0.15)} className="mt-6">
            <div className="inline-flex flex-col items-center px-5 py-3 rounded-2xl border"
              style={{ borderColor: VDRC_GREEN_DIM, background: 'rgba(61,153,112,0.06)' }}>
              <span className="text-4xl font-black tabular-nums" style={{ color: VDRC_GREEN }}>12</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 mt-0.5">Participantes</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: participant grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {PARTICIPANTS.map((p, i) => {
            const accent = ACCENTS[i];
            const initials = `${p.nombre[0]}${p.apellido[0]}`;
            return (
              <motion.div
                key={`${p.nombre}-${p.apellido}`}
                {...m(0.05 + i * 0.05)}
                className="relative overflow-hidden rounded-xl border flex items-center gap-3 px-3.5 py-3"
                style={{
                  borderColor: accent.border,
                  background: `linear-gradient(135deg, ${accent.bg} 0%, rgba(0,0,0,0.25) 100%)`,
                }}
              >
                {/* Number watermark */}
                <div className="absolute right-2 bottom-1 text-4xl font-black pointer-events-none select-none leading-none"
                  style={{ color: accent.text, opacity: 0.07 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Avatar initials */}
                <div className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 font-black text-sm"
                  style={{
                    borderColor: accent.border,
                    background: 'rgba(0,0,0,0.35)',
                    color: accent.text,
                  }}>
                  {initials}
                </div>

                {/* Name */}
                <div className="min-w-0">
                  <div className="text-white font-bold text-xs leading-tight truncate">{p.nombre}</div>
                  <div className="text-white/45 text-[10px] leading-tight truncate">{p.apellido}</div>
                </div>

                {/* Accent dot */}
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 ml-auto"
                  style={{ background: accent.dot, boxShadow: `0 0 6px ${accent.glow}` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </G11Shell>
  );
}
