import { motion } from 'framer-motion';
import { Heart, Database, Code2 } from 'lucide-react';

const TOOLS = [
  {
    name: 'Lovable',
    icon: Heart,
    color: 'bg-pink-500',
    desc: 'Crea aplicaciones web desde conversaciones',
    features: ['React + Tailwind', 'Deploy automático', 'Iteración rápida'],
  },
  {
    name: 'Supabase',
    icon: Database,
    color: 'bg-emerald-500',
    desc: 'Backend completo sin código',
    features: ['Base de datos', 'Autenticación', 'Storage'],
  },
  {
    name: 'Cursor',
    icon: Code2,
    color: 'bg-cyan-500',
    desc: 'IDE con IA integrada',
    features: ['Chat contextual', 'Generación de código', 'Debugging'],
  },
];

export function ContentSlide() {
  return (
    <div className="slide-16-9 relative flex items-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="absolute top-8 left-12 flex items-start gap-4">
        <div className="w-1 h-16 bg-cyan-500 rounded-full" />
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Stack de Desarrollo</h2>
          <p className="text-cyan-600 dark:text-cyan-400 mt-1">
            De la idea al producto en horas, no semanas
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-12 pt-32 pb-12">
        <div className="flex justify-center gap-6">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Header */}
              <div className={`${tool.color} p-4 flex items-center gap-3`}>
                <tool.icon className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white">{tool.name}</span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{tool.desc}</p>
                <ul className="space-y-2">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
