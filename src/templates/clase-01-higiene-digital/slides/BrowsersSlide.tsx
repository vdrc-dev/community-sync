import { motion } from 'framer-motion';
import { Chrome, Globe, User, Briefcase } from 'lucide-react';

const PROFILES = [
  {
    browser: 'Chrome',
    icon: Chrome,
    context: 'Personal',
    contextIcon: User,
    color: 'bg-blue-500',
    uses: ['Gmail personal', 'YouTube', 'Redes sociales'],
  },
  {
    browser: 'Edge',
    icon: Globe,
    context: 'Trabajo',
    contextIcon: Briefcase,
    color: 'bg-emerald-500',
    uses: ['Email corporativo', 'Herramientas de trabajo', 'Documentos'],
  },
];

export function BrowsersSlide() {
  return (
    <div className="slide-16-9 relative flex items-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="absolute top-8 left-12 flex items-start gap-4">
        <div className="w-1 h-16 bg-emerald-500 rounded-full" />
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Perfiles de Navegador</h2>
          <p className="text-emerald-600 dark:text-emerald-400 mt-1">
            Separar contextos = Separar distracciones
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-12 pt-32 pb-12">
        <div className="flex items-center justify-center gap-8">
          {PROFILES.map((profile, index) => (
            <motion.div
              key={profile.browser}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Browser Header */}
              <div className={`${profile.color} p-4 flex items-center gap-3`}>
                <profile.icon className="w-8 h-8 text-white" />
                <span className="text-xl font-bold text-white">{profile.browser}</span>
              </div>

              {/* Context Badge */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <profile.contextIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  <span className="font-medium text-slate-900 dark:text-white">{profile.context}</span>
                </div>
              </div>

              {/* Uses */}
              <div className="p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">Usos</p>
                <ul className="space-y-2">
                  {profile.uses.map((use) => (
                    <li key={use} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tip */}
        <p className="text-center mt-8 text-slate-500 dark:text-slate-400">
          💡 Configura cada perfil con sus propias extensiones y bookmarks
        </p>
      </div>
    </div>
  );
}
