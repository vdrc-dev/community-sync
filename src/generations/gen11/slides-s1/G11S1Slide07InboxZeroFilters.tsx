import { motion } from 'framer-motion';
import { Filter, Tag, Star, Bell, Archive, Zap } from 'lucide-react';
import { G11Shell, useG11Motion } from './Shell';
import { G11 } from './theme';

const FILTERS = [
  { emoji: '🔴', label: 'URGENTE', rule: 'De: jefe@ / asunto: "urgente"', action: 'Etiquetar rojo + notificación', icon: Bell },
  { emoji: '🟡', label: 'SEGUIMIENTO', rule: 'Yo en CC / asunto: "pendiente"', action: 'Etiquetar amarillo', icon: Tag },
  { emoji: '🟢', label: 'NEWSLETTERS', rule: 'De: substack, beehiiv, etc.', action: 'Saltar inbox → Etiqueta "Leer"', icon: Archive },
  { emoji: '⚫', label: 'NOTIFICACIONES', rule: 'De: noreply@, notifications@', action: 'Marcar leído + archivar', icon: Filter },
];

const BEFORE_AFTER = [
  { label: 'ANTES', emoji: '😰', items: ['4.000 emails sin leer', '"Lo leo después"', 'Todo mezclado', 'Ansiedad al abrir email'], color: G11.rose },
  { label: 'DESPUÉS', emoji: '😎', items: ['Inbox en 0 cada noche', 'Filtros automáticos', 'Solo lo importante', 'Email = 5 min/día'], color: G11.emerald },
];

export function G11S1Slide07InboxZeroFilters() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-center justify-center"
      radials={<div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,_rgba(59,130,246,0.1),_transparent_70%)]" />}>
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-12">
        <motion.div {...m(0)} className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Filtros y Etiquetas Inteligentes</h2>
          <p className="text-white/40 mt-2 text-sm">Configura una vez, funciona para siempre</p>
        </motion.div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {FILTERS.map((f, i) => (
            <motion.div key={f.label} {...m(0.1 + i * 0.08)}
              className="p-4 rounded-xl border bg-white/[0.02]" style={{ borderColor: 'hsl(0 0% 100% / 0.08)' }}>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{f.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-sm mb-1">{f.label}</h4>
                  <p className="text-white/40 text-xs mb-2"><strong className="text-white/60">Regla:</strong> {f.rule}</p>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: G11.blue.bg, borderColor: G11.blue.border }}>
                    <Zap className="w-3 h-3" style={{ color: G11.blue.text }} />
                    <span className="text-[11px]" style={{ color: G11.blue.text }}>{f.action}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-4">
          {BEFORE_AFTER.map((col, i) => (
            <motion.div key={col.label} {...m(0.5 + i * 0.1)}
              className="p-5 rounded-2xl border" style={{ borderColor: col.color.border, background: col.color.bg }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{col.emoji}</span>
                <span className="font-bold text-sm" style={{ color: col.color.text }}>{col.label}</span>
              </div>
              <ul className="space-y-2">
                {col.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/60">
                    <div className="w-1 h-1 rounded-full" style={{ background: col.color.dot }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </G11Shell>
  );
}
