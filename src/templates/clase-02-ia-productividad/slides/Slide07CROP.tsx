import { motion } from 'framer-motion';
import { EditableText } from '@/components/presentation/EditableText';
import { useExportContext } from '@/contexts/ExportContext';

const letters = [
  { letter: 'C', title: 'CONTEXTO', desc: 'El trasfondo de la pega.', color: 'from-amber-500 to-amber-600' },
  { letter: 'R', title: 'ROL', desc: 'El experto que necesitamos que sea (ej. Abogado senior, Analista financiero).', color: 'from-teal-500 to-teal-600' },
  { letter: 'O', title: 'OBJETIVO', desc: 'El encargo específico con verbo de acción: "Redacta", "Analiza", "Compara".', color: 'from-purple-500 to-purple-600' },
  { letter: 'P', title: 'PARÁMETROS', desc: 'Las reglas del juego: largo, tono, formato e idioma.', color: 'from-sky-500 to-sky-600' },
];

export function Slide07CROP() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: d, duration: 0.4 } };

  return (
    <div className="slide-16-9 relative flex flex-col overflow-hidden bg-[#04030a]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(263 40% 10% / 0.5), transparent 70%)' }} />

      <div className="relative z-10 flex-1 flex flex-col px-16 py-12">
        <motion.p {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } })} className="text-sm tracking-wider text-amber-400/60 uppercase mb-2">MÓDULO 01 | FUNDAMENTOS</motion.p>
        <motion.h1 {...(isExporting ? {} : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } })} className="text-5xl font-serif text-white mb-10">
          <EditableText defaultValue="Protocolo C.R.O.P." tag="span" />
        </motion.h1>

        <div className="flex-1 grid grid-cols-4 gap-6">
          {letters.map((l, i) => (
            <motion.div key={l.letter} {...m(0.2 + i * 0.1)} className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center mb-4`}>
                <span className="text-3xl font-black text-white">{l.letter}</span>
              </div>
              <p className="text-lg font-bold text-white mb-2"><EditableText defaultValue={l.title} tag="span" /></p>
              <p className="text-white/60 text-sm"><EditableText defaultValue={l.desc} tag="span" /></p>
            </motion.div>
          ))}
        </div>

        <motion.div {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.7 } })} className="mt-8 text-center">
          <p className="text-lg text-white/70">
            → <EditableText defaultValue="Un encargo sin C.R.O.P. es como mandar un correo sin asunto, contexto ni destinatario claro." tag="span" />
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(35 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">FUNDAMENTOS</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">7 / 23</span>
        </div>
      </div>
    </div>
  );
}
