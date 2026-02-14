import { motion } from 'framer-motion';
import { Presentation } from 'lucide-react';

export function CoverSlide() {
  return (
    <div className="slide-16-9 relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-8">
            <Presentation className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Clase 03</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Comunicación
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 mb-8">
            Presentaciones y documentos potenciados por IA
          </p>

          {/* Stack Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Gamma', 'Manus', 'Cursor'].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-lg bg-white/10 text-white/80 text-sm font-medium border border-white/10"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </div>
  );
}
