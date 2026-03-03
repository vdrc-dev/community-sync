import { motion } from 'framer-motion';
import { TrendingUp, Brain, DollarSign, Zap, AlertTriangle } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const STATS = [
  { label: 'Herramientas IA nuevas', value: '+200', sub: 'cada semana', icon: TrendingUp, accent: G11.emerald },
  { label: 'Profesionales usando IA', value: '78%', sub: 'en LATAM (2026)', icon: Brain, accent: G11.cyan },
  { label: 'ROI promedio reportado', value: '3.2x', sub: 'productividad', icon: DollarSign, accent: G11.amber },
];

export function G11S1Slide03Contexto() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_30%_20%,_rgba(16,185,129,0.12),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,_rgba(59,130,246,0.1),_transparent_70%)]" />
      </>}>
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-12">
        <motion.div {...m(0)} className="mb-8 sm:mb-10">
          <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: G11.cyan.text }}>El Momento que Vivimos</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">La IA no espera</h2>
          <p className="text-white/40 mt-2 max-w-2xl">El problema no es acceso a herramientas — es no tener los cimientos digitales para usarlas bien.</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} {...m(0.15 + i * 0.1)}
                className="relative p-6 rounded-2xl border bg-white/[0.02] backdrop-blur-sm text-center"
                style={{ borderColor: stat.accent.border }}>
                <Icon className="w-5 h-5 mx-auto mb-3" style={{ color: stat.accent.text }} />
                <div className="text-4xl sm:text-5xl font-black mb-1" style={{ color: stat.accent.text }}>{stat.value}</div>
                <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                <div className="text-white/30 text-xs mt-1">{stat.sub}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Warning */}
        <motion.div {...m(0.55)} className="relative p-5 rounded-2xl border" style={{ borderColor: G11.rose.border, background: G11.rose.bg }}>
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: G11.rose.text }} />
            <div>
              <h4 className="text-white font-bold mb-1">Sin cimientos = Caos digital</h4>
              <p className="text-white/50 text-sm">3 claves repetidas, inbox con 4.000 emails, navegador con 80 tabs. Si esto te suena, esta clase es para ti.</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.div {...m(0.7)} className="mt-6 text-center">
          <p className="text-white/30 text-xs italic">"Las barreras intelectuales están siendo reemplazadas por barreras de pago. Delega en sistemas."</p>
        </motion.div>
      </div>
    </G11Shell>
  );
}
