import { motion } from 'framer-motion';
import { Filter, Tag, Bell, Archive, Zap } from 'lucide-react';
import { G11Shell, useG11Motion, G11GreenLine } from './Shell';
import { G11, VDRC_GREEN } from './theme';

const FILTERS = [
  { emoji: '🔴', label: 'URGENTE', rule: 'De: jefe@ / asunto: "urgente"', action: 'Etiquetar rojo + notificación', icon: Bell },
  { emoji: '🟡', label: 'SEGUIMIENTO', rule: 'Yo en CC / asunto: "pendiente"', action: 'Etiquetar amarillo', icon: Tag },
  { emoji: '🟢', label: 'NEWSLETTERS', rule: 'De: substack, beehiiv, mirror.xyz', action: 'Saltar inbox → Etiqueta "Leer"', icon: Archive },
  { emoji: '⚫', label: 'NOTIFICACIONES', rule: 'De: noreply@, notifications@', action: 'Marcar leído + archivar auto', icon: Filter },
];

const BEFORE_AFTER = [
  { label: 'ANTES', emoji: '😰', items: ['4.000 emails sin leer', '"Lo leo después"', 'Todo mezclado', 'Ansiedad al abrir email'], color: G11.rose },
  { label: 'DESPUÉS', emoji: '😎', items: ['Inbox en 0 cada noche', 'Filtros automáticos', 'Solo lo importante', 'Email = 5 min/día'], color: G11.emerald },
];

export function G11S1Slide07InboxZeroFilters() {
  const m = useG11Motion();
  return (
    <G11Shell className="flex items-stretch">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-20" style={{ background: VDRC_GREEN }} />

      <div className="relative z-10 w-full flex flex-col justify-center px-12 sm:px-20 py-10">
        <motion.div {...m(0)} className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: G11.blue.text }}>Módulo 01 — Inbox Zero</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">Filtros y Etiquetas</h2>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none mb-4" style={{ color: VDRC_GREEN }}>Inteligentes</h2>
          <G11GreenLine className="max-w-xs mb-2" />
          <p className="text-white/40 text-sm">Configura una vez, funciona para siempre</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Filters */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FILTERS.map((f, i) => (
              <motion.div key={f.label} {...m(0.1 + i * 0.07)}
                className="p-4 rounded-xl border relative overflow-hidden"
                style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{f.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-black text-sm mb-1">{f.label}</h4>
                    <p className="text-white/40 text-xs mb-2.5">
                      <strong className="text-white/55">Regla:</strong> {f.rule}
                    </p>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg w-fit"
                      style={{ background: G11.blue.bg, border: `1px solid ${G11.blue.border}` }}>
                      <Zap className="w-3 h-3" style={{ color: G11.blue.text }} />
                      <span className="text-[10px] font-bold" style={{ color: G11.blue.text }}>{f.action}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Before/After */}
          <div className="space-y-3">
            {BEFORE_AFTER.map((col, i) => (
              <motion.div key={col.label} {...m(0.45 + i * 0.1)}
                className="p-4 rounded-xl border"
                style={{ borderColor: col.color.border, background: `linear-gradient(135deg, ${col.color.bg}, rgba(0,0,0,0.3))` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{col.emoji}</span>
                  <span className="font-black text-sm tracking-wide" style={{ color: col.color.text }}>{col.label}</span>
                </div>
                <ul className="space-y-2">
                  {col.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-white/55">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.color.dot }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </G11Shell>
  );
}
