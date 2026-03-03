import { motion } from 'framer-motion';
import { TrendingUp, Brain, DollarSign, AlertTriangle } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine, G11BrainDecor } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const STATS = [
  { label: 'Herramientas IA nuevas', value: '+200', sub: 'cada semana', icon: TrendingUp, accent: G11.emerald },
  { label: 'Profesionales usando IA', value: '78%', sub: 'en LATAM (2026)', icon: Brain, accent: G11.cyan },
  { label: 'ROI promedio reportado', value: '3.2x', sub: 'productividad', icon: DollarSign, accent: G11.amber },
];

export function G11S1Slide03Contexto() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Left content */}
      <div className="relative z-10 flex flex-col justify-center w-full sm:w-[60%] px-12 sm:px-16 py-12">
        <motion.div {...m(0)} className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: VDRC_GREEN }}>El Momento que Vivimos</p>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none mb-2">La IA no</h2>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>espera</h2>
          <G11GreenLine className="max-w-sm mb-4" />
          <p className="text-white/50 text-sm max-w-lg">
            El problema no es acceso a herramientas — es no tener los cimientos digitales para usarlas bien.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} {...m(0.15 + i * 0.1)}
                className="p-4 rounded-xl border text-center"
                style={{ borderColor: stat.accent.border, background: stat.accent.bg }}>
                <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: stat.accent.text }} />
                <div className="text-3xl font-black mb-0.5" style={{ color: stat.accent.text }}>{stat.value}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
                <div className="text-white/30 text-[10px] mt-0.5">{stat.sub}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Warning */}
        <motion.div {...m(0.5)} className="p-4 rounded-xl border flex items-start gap-3"
          style={{ borderColor: G11.rose.border, background: G11.rose.bg }}>
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: G11.rose.text }} />
          <div>
            <h4 className="text-white font-bold text-sm mb-0.5">Sin cimientos = Caos digital</h4>
            <p className="text-white/50 text-xs">3 claves repetidas, inbox con 4.000 emails, 80 tabs abiertos. Esta clase es para ti.</p>
          </div>
        </motion.div>
      </div>

      {/* Right decor */}
      <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-[42%] items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 60% 50%, rgba(61,153,112,0.10), transparent 70%)' }} />
        <G11BrainDecor className="w-[80%] aspect-square" />
      </div>
    </G11Shell>
  );
}
