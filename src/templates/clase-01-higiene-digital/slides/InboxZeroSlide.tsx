import { motion } from 'framer-motion';
import { Trash2, Forward, CheckCircle, Archive, Mailbox } from 'lucide-react';

const ACTIONS = [
  { icon: Trash2, label: 'BASURA', desc: 'Eliminar spam', color: 'text-red-500' },
  { icon: Forward, label: 'DELEGAR', desc: 'Reenviar a responsable', color: 'text-blue-500' },
  { icon: CheckCircle, label: 'ACTUAR', desc: 'Responder < 2 min', color: 'text-emerald-500' },
  { icon: Archive, label: 'ARCHIVAR', desc: 'Referencia futura', color: 'text-amber-500' },
];

export function InboxZeroSlide() {
  return (
    <div className="slide-16-9 relative flex items-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="absolute top-8 left-12 flex items-start gap-4">
        <div className="w-1 h-16 bg-emerald-500 rounded-full" />
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Inbox Zero</h2>
          <p className="text-emerald-600 dark:text-emerald-400 mt-1">
            Tu inbox es solo una mesa de trámites, no un almacén
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-12 pt-32 pb-12">
        <div className="flex items-center justify-center gap-12">
          {/* Mailbox Visual */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-40 bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-lg relative">
              <Mailbox className="absolute inset-0 m-auto w-16 h-16 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center max-w-[150px]">
              Si no lo harías con cartas de papel, no lo hagas con tu email
            </p>
          </div>

          {/* Arrow */}
          <div className="text-4xl text-slate-400">→</div>

          {/* Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            {ACTIONS.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 min-w-[200px]"
              >
                <div className={`w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{action.label}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{action.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Tip */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm">
            💡 Gmail: "Enviar y Archivar" | Outlook: "Mover a carpeta"
          </span>
        </div>
      </div>
    </div>
  );
}
