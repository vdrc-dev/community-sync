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

const PRIORITY_STYLES = {
  Obligatoria: { bg: 'rgba(61,153,112,0.15)', color: '#5ec99a' },
  Recomendada: { bg: 'rgba(96,165,250,0.15)', color: '#93c5fd' },
  Opcional: { bg: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' },
};

export function G11S1Slide10Extensions() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(245,158,11,0.08), transparent 70%)'
        }} />
      }>
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-14">
        <motion.div {...m(0)} className="mb-7">
          <div className="flex items-center gap-3 mb-2">
            <Puzzle className="w-5 h-5" style={{ color: G11.amber.text }} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: G11.amber.text }}>
              Módulo 02 — Extensiones Clave
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">Tu Kit de</h2>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none" style={{ color: G11.amber.text }}>Extensiones</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXTENSIONS.map((ext, i) => {
            const Icon = ext.icon;
            const ps = PRIORITY_STYLES[ext.priority as keyof typeof PRIORITY_STYLES];
            return (
              <motion.div key={ext.name} {...m(0.08 + i * 0.07)}
                className="relative p-4 rounded-xl border"
                style={{ borderColor: ext.accent.border, background: `linear-gradient(135deg, ${ext.accent.bg}, rgba(0,0,0,0.25))` }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,0,0,0.4)', borderColor: ext.accent.border }}>
                    <Icon className="w-5 h-5" style={{ color: ext.accent.text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-black text-sm">{ext.name}</h4>
                      <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full"
                        style={{ background: ps.bg, color: ps.color }}>
                        {ext.priority}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold mb-1" style={{ color: ext.accent.text }}>{ext.cat}</p>
                    <p className="text-white/35 text-xs">{ext.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...m(0.65)} className="mt-5 p-4 rounded-xl border"
          style={{ borderColor: G11.amber.border, background: `linear-gradient(135deg, ${G11.amber.bg}, rgba(0,0,0,0.3))` }}>
          <p className="text-white/65 text-xs text-center">
            ⚡ <strong className="text-white/85">Regla de oro:</strong> Solo instala extensiones que uses diariamente. Cada extensión consume RAM y puede ser un vector de ataque.
          </p>
        </motion.div>
      </div>
    </G11Shell>
  );
}
