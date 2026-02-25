import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, UserPlus, ShoppingCart, Settings, FileX, Database, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const OPS = [
  { letter: 'C', word: 'Create', label: 'Crear', icon: Plus, color: 'hsl(150 60% 50%)', hue: 150, example: 'Registrar usuario nuevo', excelAnalogy: 'Agregar una fila nueva', exampleIcon: UserPlus, sql: 'INSERT INTO usuarios (nombre, email) VALUES ($1, $2)' },
  { letter: 'R', word: 'Read', label: 'Leer', icon: Search, color: 'hsl(185 70% 50%)', hue: 185, example: 'Ver todos los productos', excelAnalogy: 'Ver o filtrar datos', exampleIcon: ShoppingCart, sql: 'SELECT * FROM productos WHERE activo = true' },
  { letter: 'U', word: 'Update', label: 'Editar', icon: Pencil, color: 'hsl(38 90% 55%)', hue: 38, example: 'Cambiar foto de perfil', excelAnalogy: 'Editar el contenido de una celda', exampleIcon: Settings, sql: 'UPDATE usuarios SET avatar = $1 WHERE id = $2' },
  { letter: 'D', word: 'Delete', label: 'Borrar', icon: Trash2, color: 'hsl(0 70% 55%)', hue: 0, example: 'Eliminar publicación', excelAnalogy: 'Eliminar fila completa', exampleIcon: FileX, sql: 'DELETE FROM posts WHERE id = $1 AND user_id = $2' },
];

export function S4Slide04CRUD() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [active, setActive] = useState(0);
  const op = OPS[active];
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,_hsl(150_60%_40%_/_0.12),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'radial-gradient(circle, hsl(150 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
        <div className="absolute top-[5%] right-[3%] text-[18vw] font-black text-white/[0.022] leading-none select-none pointer-events-none tracking-tighter">CRUD</div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 12px hsl(150 60% 50% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Fundamentos · Operaciones de Datos</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">CRUD: El Lenguaje Universal</h1>
            </div>
          </div>
          <p className="text-emerald-400/60 text-sm ml-5 pl-1 font-medium">Las 4 operaciones que toda app necesita. Más potente que Excel. Haz clic en cada letra.</p>
        </motion.div>

        {/* CRUD letter cards */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {OPS.map((o, i) => {
            const Icon = o.icon;
            const isActive = active === i;
            return (
              <motion.button key={o.letter} {...m(0.1 + i * 0.07)} onClick={() => setActive(i)}
                className="relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden group"
                style={{
                  borderColor: isActive ? `hsl(${o.hue} 60% 50% / 0.35)` : 'hsl(0 0% 100% / 0.05)',
                  background: isActive ? `hsl(${o.hue} 60% 40% / 0.08)` : 'hsl(0 0% 100% / 0.01)',
                  boxShadow: isActive ? `0 0 40px hsl(${o.hue} 60% 40% / 0.1) inset` : 'none',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${o.color.replace(')', ' / ' + (isActive ? '0.7' : '0.15)'))}, transparent)` }} />
                {/* Background letter */}
                <div className="absolute bottom-2 right-3 text-[72px] font-black leading-none select-none pointer-events-none" style={{ color: `hsl(${o.hue} 50% 50% / ${isActive ? '0.07' : '0.03'})`, transition: 'color 0.3s' }}>{o.letter}</div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `hsl(${o.hue} 60% 45% / ${isActive ? '0.15' : '0.08'})`, border: `1px solid hsl(${o.hue} 60% 50% / ${isActive ? '0.3' : '0.15'})`, boxShadow: isActive ? `0 0 20px hsl(${o.hue} 60% 50% / 0.15)` : 'none', transition: 'all 0.3s' }}>
                  <span className="text-2xl font-black" style={{ color: o.color }}>{o.letter}</span>
                </div>

                <p className="text-lg font-black text-white leading-tight">{o.word}</p>
                <p className="text-xs font-bold mt-0.5 mb-3" style={{ color: `hsl(${o.hue} 55% 60% / 0.6)` }}>{o.label}</p>

                <div className="flex items-center gap-1.5 text-xs text-white/90">
                  <Icon className="w-3.5 h-3.5" style={{ color: `${o.color.replace(')', ' / 0.7)')}` }} />
                  <span>{o.example}</span>
                </div>
                <p className="text-[11px] text-white/70 mt-1.5 italic">Excel: {o.excelAnalogy}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Active detail */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={isExporting ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-5">
            {/* Visual example */}
            <div className="p-5 rounded-2xl border relative overflow-hidden"
              style={{ borderColor: `hsl(${op.hue} 60% 50% / 0.2)`, background: `hsl(${op.hue} 60% 40% / 0.05)` }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${op.color.replace(')', ' / 0.5)')}, transparent)` }} />
              <div className="flex items-center gap-3 mb-4">
                {(() => { const ExIcon = op.exampleIcon; return (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `hsl(${op.hue} 60% 45% / 0.15)`, border: `1px solid hsl(${op.hue} 60% 50% / 0.3)` }}>
                    <ExIcon className="w-6 h-6" style={{ color: op.color }} />
                  </div>
                ); })()}
                <div>
                  <p className="text-xs font-black tracking-widest uppercase" style={{ color: `hsl(${op.hue} 55% 60% / 0.7)` }}>{op.word} — Ejemplo</p>
                  <p className="text-base font-black text-white">{op.example}</p>
                </div>
              </div>
              <p className="text-xs text-white/85 mb-3">Como en Excel: <span className="text-white/70 font-medium">{op.excelAnalogy}</span></p>
              <div className="flex items-center gap-2 text-xs text-white/75">
                <Database className="w-3 h-3" />
                <span>Supabase genera la API automáticamente</span>
              </div>
            </div>

            {/* SQL snippet */}
            <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[11px] font-black text-white/75 uppercase tracking-widest mb-3">SQL generado automáticamente</p>
              <div className="p-4 rounded-xl border border-white/[0.06] bg-black/50 font-mono text-xs">
                <span className="text-emerald-400/60">{op.sql.split(' ')[0]}</span>
                <span className="text-white/85"> {op.sql.split(' ').slice(1).join(' ')}</span>
              </div>
              <p className="text-[11px] text-white/70 mt-3 italic">💡 Con Supabase no necesitas escribir esto. La plataforma lo genera por ti.</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(150 50% 50% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase">Fundamentos</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/70">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
