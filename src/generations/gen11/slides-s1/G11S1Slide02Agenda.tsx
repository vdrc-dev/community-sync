import { motion } from 'framer-motion';
import logoVdrc from '@/assets/logo-vdrc.png';
import { G11Shell, useG11Motion } from './Shell';
import { VDRC_GREEN } from './theme';

const MODULES = [
  { num: '01', title: 'Contexto y Fundamentos', desc: 'Quién soy, misión, afilar la sierra y metodología' },
  { num: '02', title: 'Inbox Zero', desc: 'Libera tu bandeja de entrada y tu mente' },
  { num: '03', title: 'Navegadores y Perfiles', desc: 'Separa tu vida digital en espacios definidos' },
  { num: '04', title: 'Contraseñas y Seguridad', desc: 'Protege tu identidad digital' },
  { num: '05', title: 'Bonus: IA Personalizada', desc: 'Memoria y personalización en Claude' },
];

export function G11S1Slide02Agenda() {
  const m = useG11Motion();

  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full flex flex-col px-16 sm:px-24 py-12 sm:py-14">

        {/* Header */}
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: VDRC_GREEN }} />
            <p className="text-sm font-bold tracking-[0.22em] uppercase" style={{ color: VDRC_GREEN }}>
              /// &nbsp; AGENDA
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Contenidos de la Sesión
          </h1>
          <div className="mt-4 h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </motion.div>

        {/* Module list */}
        <div className="flex-1 flex flex-col justify-between">
          {MODULES.map((mod, i) => (
            <motion.div key={mod.num} {...m(0.08 + i * 0.07)} className="flex items-start gap-6">
              {/* Number + connector */}
              <div className="flex flex-col items-center flex-shrink-0" style={{ width: '3rem' }}>
                <div
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-black text-base flex-shrink-0"
                  style={{ borderColor: VDRC_GREEN, color: VDRC_GREEN, background: 'rgba(61,153,112,0.08)' }}
                >
                  {mod.num}
                </div>
                {i < MODULES.length - 1 && (
                  <div className="flex-1 w-px mt-1" style={{ background: 'rgba(61,153,112,0.25)', minHeight: '1.5rem' }} />
                )}
              </div>

              {/* Content */}
              <div className="pt-2 pb-4">
                <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight mb-1">{mod.title}</h3>
                <p className="text-white/45 text-sm sm:text-base leading-relaxed">{mod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo bottom-right */}
        <motion.div {...m(0.5)} className="absolute bottom-7 right-8">
          <img src={logoVdrc} alt="VDRC" className="h-7 w-auto opacity-50" />
        </motion.div>
      </div>
    </G11Shell>
  );
}
