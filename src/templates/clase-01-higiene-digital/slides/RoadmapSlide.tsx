import { motion } from 'framer-motion';
import { Building2, Mail, Globe, Shield, Brain } from 'lucide-react';

const ROADMAP_ITEMS = [
  { icon: Mail, label: 'Inbox Zero', desc: 'Decisión inmediata' },
  { icon: Globe, label: 'Navegadores', desc: 'Contextos separados' },
  { icon: Shield, label: 'Seguridad', desc: 'Bitwarden + 2FA' },
  { icon: Brain, label: 'Context IA', desc: 'Manual Digital' },
];

export function RoadmapSlide() {
  return (
    <div className="slide-16-9 relative flex items-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="absolute top-8 left-12 flex items-start gap-4">
        <div className="w-1 h-16 bg-emerald-500 rounded-full" />
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Tu Roadmap</h2>
          <p className="text-emerald-600 dark:text-emerald-400 mt-1">
            No puedes construir un rascacielos sobre cimientos de barro
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-12 pt-32 pb-12">
        <div className="flex items-center justify-center gap-8">
          {/* Building Metaphor */}
          <div className="flex-shrink-0">
            <div className="w-48 h-64 bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-t-lg relative overflow-hidden">
              <Building2 className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-24 text-slate-400 dark:text-slate-500" />
              {/* Floors */}
              {[0, 1, 2, 3].map((floor) => (
                <div
                  key={floor}
                  className="absolute left-0 right-0 h-px bg-slate-400/30"
                  style={{ bottom: `${(floor + 1) * 25}%` }}
                />
              ))}
            </div>
            <div className="text-center mt-2 text-sm text-slate-500 dark:text-slate-400">
              Tus Cimientos
            </div>
          </div>

          {/* Roadmap Items */}
          <div className="grid grid-cols-2 gap-6 max-w-2xl">
            {ROADMAP_ITEMS.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{item.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
