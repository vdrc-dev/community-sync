import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Rocket } from 'lucide-react';

const TASKS = [
  'Configurar Inbox Zero en tu email',
  'Crear perfiles Chrome/Edge separados',
  'Instalar Bitwarden + migrar 5 claves',
  'Crear tu Manual Digital en ChatGPT',
];

export function ClosingSlide() {
  return (
    <div className="slide-16-9 relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
            <Rocket className="w-10 h-10 text-emerald-400" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Misión Semanal
          </h1>

          <p className="text-white/60 mb-8">
            Completa estas tareas antes de la próxima clase
          </p>

          {/* Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {TASKS.map((task, index) => (
              <motion.div
                key={task}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-left"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white/80 text-sm">{task}</span>
              </motion.div>
            ))}
          </div>

          {/* Next Week Preview */}
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <span className="text-sm">Próxima semana: IA & Productividad</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </div>
  );
}
