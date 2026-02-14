import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Key, Lock, Smartphone } from 'lucide-react';

const MATRIX = [
  {
    type: 'Problema',
    icon: AlertTriangle,
    color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    items: ['Claves repetidas', 'Guardadas en navegador', 'Cuaderno físico'],
  },
  {
    type: 'Solución',
    icon: Shield,
    color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30',
    items: ['Password Manager', 'Claves únicas', '2FA obligatorio'],
  },
  {
    type: 'Beneficio',
    icon: CheckCircle,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    items: ['Una clave maestra', 'Autocompletado', 'Alertas de breach'],
  },
];

export function SecuritySlide() {
  return (
    <div className="slide-16-9 relative flex items-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="absolute top-8 left-12 flex items-start gap-4">
        <div className="w-1 h-16 bg-emerald-500 rounded-full" />
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Seguridad Digital</h2>
          <p className="text-emerald-600 dark:text-emerald-400 mt-1">
            Los hackers no entran a tu notebook, pero sí a tus servicios online
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-12 pt-32 pb-12">
        {/* Myth/Reality Banner */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="px-6 py-3 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">
              <strong>Mito:</strong> "Tengo mis claves en un cuaderno, estoy seguro"
            </p>
          </div>
          <div className="px-6 py-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              <strong>Realidad:</strong> Data Leaks + Credential Stuffing = Acceso a tu banco
            </p>
          </div>
        </div>

        {/* Matrix */}
        <div className="flex justify-center gap-6">
          {MATRIX.map((col, index) => (
            <motion.div
              key={col.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className={`p-4 ${col.color} flex items-center gap-2`}>
                <col.icon className="w-5 h-5" />
                <span className="font-semibold">{col.type}</span>
              </div>
              <ul className="p-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bitwarden CTA */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-700">
            <Lock className="w-6 h-6 text-emerald-400" />
            <span className="text-white font-medium">Bitwarden</span>
            <span className="text-slate-400">+</span>
            <Smartphone className="w-6 h-6 text-emerald-400" />
            <span className="text-white font-medium">2FA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
