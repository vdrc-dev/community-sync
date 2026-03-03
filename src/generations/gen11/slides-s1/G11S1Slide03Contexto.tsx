import { motion } from 'framer-motion';
import { TrendingUp, Brain, DollarSign, AlertTriangle } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine, G11BrainDecor } from './Shell';
import { G11, VDRC_GREEN } from './theme';
import contextoHero from '@/assets/gen11-contexto-hero.jpg';

const STATS = [
  { label: 'Herramientas IA nuevas', value: '+200', sub: 'cada semana', icon: TrendingUp, accent: G11.emerald },
  { label: 'Profesionales usando IA', value: '78%', sub: 'en LATAM 2026', icon: Brain, accent: G11.cyan },
  { label: 'ROI promedio reportado', value: '3.2x', sub: 'productividad', icon: DollarSign, accent: G11.amber },
];

export function G11S1Slide03Contexto() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      {/* Left content */}
      <div className="relative z-10 flex flex-col justify-center w-full sm:w-[56%] px-12 sm:px-20 py-12">
        <motion.div {...m(0)} className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 self-start"
            style={{ background: G11.emerald.bg, borderColor: G11.emerald.border }}>
            <div className="w-1 h-1 rounded-full" style={{ background: VDRC_GREEN }} />
            <p className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: VDRC_GREEN }}>El Momento que Vivimos</p>
          </div>
          <h2 className="text-5xl sm:text-[4.8rem] font-black text-white tracking-[-0.02em] uppercase leading-none">La IA no</h2>
          <h2 className="text-5xl sm:text-[4.8rem] font-black tracking-[-0.02em] uppercase leading-none mb-4" style={{
            color: VDRC_GREEN,
            textShadow: '0 0 60px rgba(61,153,112,0.4)',
          }}>espera</h2>
          <G11GreenLine className="max-w-sm mb-4" />
          <p className="text-white/50 text-sm max-w-md leading-relaxed">
            El problema no es acceso a herramientas — es no tener los cimientos digitales para usarlas bien.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-xl">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} {...m(0.15 + i * 0.1)}
                className="p-4 rounded-xl border text-center relative overflow-hidden"
                style={{
                  borderColor: stat.accent.border,
                  background: `linear-gradient(135deg, ${stat.accent.bg}, rgba(0,0,0,0.45))`,
                  boxShadow: `0 4px 24px ${stat.accent.glow}`,
                }}>
                <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: stat.accent.text }} />
                <div className="text-3xl sm:text-4xl font-black mb-1 leading-none" style={{ color: stat.accent.text, textShadow: `0 0 20px ${stat.accent.glow}` }}>{stat.value}</div>
                <div className="text-white/55 text-[10px] leading-tight">{stat.label}</div>
                <div className="text-white/25 text-[9px] mt-1 font-mono">{stat.sub}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Warning */}
        <motion.div {...m(0.5)} className="p-4 rounded-xl border flex items-start gap-3 max-w-xl"
          style={{ borderColor: G11.rose.border, background: `linear-gradient(135deg, ${G11.rose.bg}, rgba(0,0,0,0.4))`, boxShadow: `0 0 30px rgba(251,113,133,0.08)` }}>
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: G11.rose.text }} />
          <div>
            <h4 className="text-white font-black text-sm mb-0.5">Sin cimientos = Caos digital</h4>
            <p className="text-white/50 text-xs leading-relaxed">3 claves repetidas, inbox con 4.000 emails, 80 tabs abiertos. Esta clase es para ti.</p>
          </div>
        </motion.div>
      </div>

      {/* Right — hero image */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[46%] overflow-hidden">
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-36 z-10"
          style={{ background: 'linear-gradient(90deg, #181c1b 0%, transparent 100%)' }} />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-20 z-10"
          style={{ background: 'linear-gradient(180deg, #181c1b 0%, transparent 100%)' }} />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-20 z-10"
          style={{ background: 'linear-gradient(0deg, #181c1b 0%, transparent 100%)' }} />
        {/* Green overlay tint */}
        <div className="absolute inset-0 z-[5]"
          style={{ background: 'rgba(24,28,27,0.35)' }} />
        <motion.img
          src={contextoHero}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    </G11Shell>
  );
}
