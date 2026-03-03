import { motion } from 'framer-motion';
import { Puzzle, Shield, Brain, Eye, FileText, Globe, Star } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const EXTENSIONS = [
  { name: 'Bitwarden', cat: 'Seguridad', desc: 'Password manager gratuito, open source', icon: Shield, accent: G11.emerald, priority: 'Obligatoria' },
  { name: 'Granola', cat: 'Productividad', desc: 'Notas automáticas de reuniones con IA', icon: Brain, accent: G11.purple, priority: 'Recomendada' },
  { name: 'uBlock Origin', cat: 'Privacidad', desc: 'Bloqueador de ads y trackers', icon: Eye, accent: G11.rose, priority: 'Recomendada' },
  { name: 'Notion Web Clipper', cat: 'Captura', desc: 'Guarda cualquier web en Notion', icon: FileText, accent: G11.blue, priority: 'Opcional' },
  { name: 'Dark Reader', cat: 'Confort', desc: 'Modo oscuro en todas las webs', icon: Globe, accent: G11.cyan, priority: 'Opcional' },
  { name: 'Perplexity', cat: 'Búsqueda', desc: 'Búsqueda con IA desde cualquier tab', icon: Star, accent: G11.amber, priority: 'Recomendada' },
];

export function G11S1Slide10Extensions() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,_rgba(245,158,11,0.1),_transparent_70%)]" />}>
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-12">
        <motion.div {...m(0)} className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Puzzle className="w-5 h-5" style={{ color: G11.amber.text }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: G11.amber.text }}>Extensiones Clave</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Tu Kit de Extensiones</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXTENSIONS.map((ext, i) => {
            const Icon = ext.icon;
            return (
              <motion.div key={ext.name} {...m(0.1 + i * 0.07)}
                className="relative p-4 rounded-xl border bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                style={{ borderColor: ext.accent.border }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0"
                    style={{ background: ext.accent.bg, borderColor: ext.accent.border }}>
                    <Icon className="w-5 h-5" style={{ color: ext.accent.text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-white font-bold text-sm">{ext.name}</h4>
                      <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                        ext.priority === 'Obligatoria' ? 'bg-emerald-500/20 text-emerald-400' :
                        ext.priority === 'Recomendada' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-white/10 text-white/40'
                      }`}>{ext.priority}</span>
                    </div>
                    <p className="text-[10px] font-medium mb-1" style={{ color: ext.accent.text }}>{ext.cat}</p>
                    <p className="text-white/40 text-xs">{ext.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.65)} className="mt-6 p-4 rounded-xl border" style={{ borderColor: G11.amber.border, background: G11.amber.bg }}>
          <p className="text-white/70 text-xs text-center">⚡ <strong>Regla de oro:</strong> Solo instala extensiones que uses diariamente. Cada extensión consume RAM y puede ser un vector de ataque.</p>
        </motion.div>
      </div>
    </G11Shell>
  );
}
