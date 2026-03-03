import { motion } from 'framer-motion';
import { Brain, Clock, Cog, Target, Rocket } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const PILLARS = [
  { verb: 'CUESTIONEN', action: 'Los paradigmas operativos que les consumen tiempo', icon: Brain, accent: G11.purple, emoji: '🧠' },
  { verb: 'VALOREN', action: 'Su tiempo real vs. el costo de las herramientas', icon: Clock, accent: G11.amber, emoji: '⏳' },
  { verb: 'DELEGUEN', action: 'Primero en tecnología, después en personas', icon: Cog, accent: G11.emerald, emoji: '⚙️', highlight: true },
  { verb: 'CONCENTREN', action: 'Su energía en resolver desafíos de alto impacto', icon: Target, accent: G11.rose, emoji: '🎯' },
];

export function G11S1SlideMission() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<>
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full blur-[180px]" style={{ background: 'rgba(61,153,112,0.08)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-[150px]" style={{ background: 'rgba(167,139,250,0.06)' }} />
      </>}>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full max-w-6xl px-8 sm:px-16 py-10">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5"
            style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
            <Rocket className="w-4 h-4" style={{ color: G11.emerald.text }} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: G11.emerald.text }}>Propósito</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">Mi</h2>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight uppercase leading-none mb-5" style={{ color: VDRC_GREEN }}>Misión</h2>
          <G11GreenLine className="max-w-sm mb-4" />
          <p className="text-white/45 text-sm max-w-2xl leading-relaxed">
            Que cada participante salga con herramientas configuradas, hábitos digitales sólidos y un sistema de productividad personal con IA.
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div {...m(0.15)} className="mb-8 p-5 rounded-xl border relative overflow-hidden"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full" style={{ background: VDRC_GREEN }} />
          <p className="text-white/70 text-sm sm:text-base leading-relaxed pl-4">
            "La tecnología no es el fin, sino el medio. Cuando automatizamos lo trivial, liberamos el potencial humano para enfocarse en lo que verdaderamente importa."
          </p>
        </motion.div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.verb} {...m(0.2 + i * 0.08)}
                className="p-5 rounded-xl border relative overflow-hidden"
                style={{
                  borderColor: pillar.highlight ? pillar.accent.border : 'rgba(255,255,255,0.06)',
                  background: pillar.highlight
                    ? `linear-gradient(135deg, ${pillar.accent.bg}, rgba(0,0,0,0.3))`
                    : 'rgba(255,255,255,0.02)',
                  boxShadow: pillar.highlight ? `0 0 40px ${pillar.accent.glow}` : 'none',
                }}>
                {/* Top accent bar */}
                <div className="absolute top-0 left-4 right-4 h-[2px] rounded-b-full" style={{ background: pillar.accent.dot }} />

                <div className="w-11 h-11 rounded-xl border flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0,0,0,0.4)', borderColor: pillar.accent.border }}>
                  <Icon className="w-5 h-5" style={{ color: pillar.accent.text }} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-black text-base" style={{ color: pillar.highlight ? pillar.accent.text : 'white' }}>{pillar.verb}</h3>
                  <span className="text-base opacity-60">{pillar.emoji}</span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">{pillar.action}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </G11Shell>
  );
}
