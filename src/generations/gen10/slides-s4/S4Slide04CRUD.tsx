import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, UserPlus, ShoppingCart, Settings, FileX } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const OPS = [
  { letter: 'C', word: 'Create', label: 'Crear', icon: Plus, color: 'hsl(150 60% 50%)', example: 'Registrar usuario', excelAnalogy: 'Agregar fila', exampleIcon: UserPlus },
  { letter: 'R', word: 'Read', label: 'Leer', icon: Search, color: 'hsl(185 70% 50%)', example: 'Ver productos', excelAnalogy: 'Ver datos', exampleIcon: ShoppingCart },
  { letter: 'U', word: 'Update', label: 'Editar', icon: Pencil, color: 'hsl(38 90% 55%)', example: 'Cambiar perfil', excelAnalogy: 'Editar celda', exampleIcon: Settings },
  { letter: 'D', word: 'Delete', label: 'Borrar', icon: Trash2, color: 'hsl(0 70% 55%)', example: 'Eliminar post', excelAnalogy: 'Eliminar fila', exampleIcon: FileX },
];

export function S4Slide04CRUD() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [active, setActive] = useState(0);
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(150_60%_40%_/_0.1),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-emerald-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Fundamentos</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">CRUD: El Lenguaje Universal</h1>
            </div>
          </div>
          <p className="text-emerald-400/60 text-sm ml-5 pl-1">Las 4 operaciones que toda app necesita. Más potente que Excel.</p>
        </motion.div>

        {/* CRUD cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {OPS.map((op, i) => {
            const Icon = op.icon;
            const isActive = active === i;
            return (
              <motion.button key={op.letter} {...m(0.15 + i * 0.08)} onClick={() => setActive(i)}
                className={`relative p-5 rounded-2xl border text-left transition-all ${isActive ? 'bg-white/[0.04] border-white/[0.12] scale-[1.02]' : 'bg-white/[0.01] border-white/[0.04]'}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-b-full" style={{ background: op.color, opacity: isActive ? 1 : 0.2 }} />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${op.color.replace(')', ' / 0.1)')}`, border: `1px solid ${op.color.replace(')', ' / 0.25)')}` }}>
                    <span className="text-lg font-black" style={{ color: op.color }}>{op.letter}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{op.word}</p>
                    <p className="text-[11px] text-white/30">{op.label}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Icon className="w-3.5 h-3.5" style={{ color: op.color }} />
                    <span>{op.example}</span>
                  </div>
                  <div className="text-[10px] text-white/25 pl-5.5">Excel: {op.excelAnalogy}</div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active operation detail */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={isExporting ? {} : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${OPS[active].color.replace(')', ' / 0.08)')}` }}>
                {(() => { const ExIcon = OPS[active].exampleIcon; return <ExIcon className="w-7 h-7" style={{ color: OPS[active].color }} />; })()}
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase" style={{ color: OPS[active].color }}>{OPS[active].word}</p>
                <p className="text-base font-bold text-white">{OPS[active].example}</p>
                <p className="text-xs text-white/30 mt-1">Como en Excel: <span className="text-white/50">{OPS[active].excelAnalogy}</span></p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div {...m(0.6)} className="mt-5 p-3 rounded-xl border border-cyan-500/10 bg-cyan-500/[0.02] text-center max-w-2xl mx-auto">
          <p className="text-xs text-white/40">💡 Con Supabase: <span className="text-cyan-400/70 font-semibold">no escribes SQL</span>. La plataforma genera CRUD automáticamente. Solo describes qué quieres.</p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(150 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">FUNDAMENTOS</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
