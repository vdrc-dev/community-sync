import { motion } from 'framer-motion';
import { Phone, MessageCircle, Headphones, BookOpen, Wrench } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const PREPARATIONS = [
  { num: 1, title: 'Notebook cargado', desc: 'Con Chrome y Edge instalados', icon: '💻', accent: G11.blue },
  { num: 2, title: 'Gmail activo', desc: 'Tu cuenta personal principal', icon: '📧', accent: G11.emerald },
  { num: 3, title: 'Actitud curiosa', desc: 'Preguntar, experimentar, fallar', icon: '🧠', accent: G11.purple },
];

export function G11S1SlideHowWeWork() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<>
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[160px]" style={{ background: 'rgba(96,165,250,0.07)' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full blur-[140px]" style={{ background: 'rgba(61,153,112,0.06)' }} />
      </>}>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full max-w-5xl px-8 sm:px-16 py-10">
        {/* Header */}
        <motion.div {...m(0)} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5"
            style={{ background: G11.blue.bg, borderColor: G11.blue.border }}>
            <Wrench className="w-4 h-4" style={{ color: G11.blue.text }} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: G11.blue.text }}>Metodología</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">Cómo</h2>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight uppercase leading-none mb-5" style={{ color: VDRC_GREEN }}>Trabajamos</h2>
          <G11GreenLine className="max-w-sm" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Format */}
          <div className="space-y-4">
            <motion.div {...m(0.1)} className="p-5 rounded-xl border"
              style={{ borderColor: G11.emerald.border, background: `linear-gradient(135deg, ${G11.emerald.bg}, rgba(0,0,0,0.3))` }}>
              <h4 className="text-[10px] font-black tracking-[0.15em] uppercase mb-3" style={{ color: G11.emerald.text }}>📋 Formato</h4>
              <ul className="space-y-2.5">
                {[
                  '4 sesiones de ~90 minutos cada una',
                  'Teoría mínima + práctica máxima',
                  'Cada clase: configurar herramientas en vivo',
                  'Misiones semanales para consolidar',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/55 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: G11.emerald.dot }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...m(0.2)} className="p-5 rounded-xl border"
              style={{ borderColor: G11.cyan.border, background: `linear-gradient(135deg, ${G11.cyan.bg}, rgba(0,0,0,0.3))` }}>
              <h4 className="text-[10px] font-black tracking-[0.15em] uppercase mb-3" style={{ color: G11.cyan.text }}>📞 Soporte</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: G11.cyan.text }} />
                  <span className="text-white/60 text-sm">WhatsApp directo</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" style={{ color: G11.cyan.text }} />
                  <span className="text-white/60 text-sm">Grupo del taller</span>
                </div>
              </div>
              <p className="text-white/35 text-xs mt-3">
                Cualquier duda entre sesiones → WhatsApp. No hay preguntas tontas.
              </p>
            </motion.div>
          </div>

          {/* Right: Preparations */}
          <div>
            <motion.div {...m(0.12)} className="p-5 rounded-xl border h-full"
              style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <h4 className="text-[10px] font-black tracking-[0.15em] uppercase mb-5" style={{ color: G11.amber.text }}>🎒 Lo que necesitas hoy</h4>
              <div className="space-y-4">
                {PREPARATIONS.map((prep, i) => (
                  <motion.div key={prep.num} {...m(0.2 + i * 0.08)}
                    className="flex items-start gap-4 p-4 rounded-xl border"
                    style={{ borderColor: prep.accent.border, background: `linear-gradient(135deg, ${prep.accent.bg}, rgba(0,0,0,0.25))` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${prep.accent.border}` }}>
                      {prep.icon}
                    </div>
                    <div>
                      <h5 className="text-white font-black text-sm">{prep.title}</h5>
                      <p className="text-white/40 text-xs mt-0.5">{prep.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div {...m(0.5)} className="mt-5 p-4 rounded-xl border text-center"
                style={{ borderColor: G11.emerald.border, background: `linear-gradient(135deg, ${G11.emerald.bg}, rgba(0,0,0,0.3))` }}>
                <p className="text-xs font-bold" style={{ color: G11.emerald.text }}>
                  ⚡ Filosofía: "Hoy sales con todo configurado"
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
