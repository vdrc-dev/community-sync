import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, Database, Table2, Key, Link2, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

// Caso real Mad Charlies — Diego Meza Stange, clase 4 Gen 10
const EXCEL_ROWS = [
  { data: 'Venta | 2026-02-10 | Bar Las Condes | Lager 500cc | $4.800 | Canal: bar | Proveedor: MadCh | Categoría: directa', dup: true },
  { data: 'Venta | 2026-02-10 | Bar Las Condes | Lager 500cc | $4.800 | Canal: bar | Proveedor: MadCh | Categoría: directa', dup: true },
  { data: 'Venta | 2026-02-11 | Tienda Online | IPA 330cc | $3.500 | Canal: online | Proveedor: MadCh | Categoría: retail', dup: false },
];

// Tablas reales creadas en clase con el Excel de Diego
const MOCK_TABLES = [
  { name: 'ingresos', rows: '~', color: 'hsl(150 60% 50%)', hue: 150, cols: ['id (PK)', 'monto', 'fecha', 'descripción', 'canal_id (FK)', 'categoría_id (FK)'], comment: 'Registro de ingresos. Cada fila = una venta o entrada de dinero.' },
  { name: 'gastos', rows: '~', color: 'hsl(185 70% 50%)', hue: 185, cols: ['id (PK)', 'monto', 'fecha', 'descripción', 'proveedor_id (FK)', 'categoría_id (FK)'], comment: 'Gastos operacionales de la cervecería.' },
  { name: 'categorías', rows: '~', color: 'hsl(280 70% 60%)', hue: 280, cols: ['id (PK)', 'nombre', 'tipo'], comment: 'Catálogo de categorías. Una categoría tiene muchos ingresos/gastos.' },
  { name: 'canales', rows: '~', color: 'hsl(38 90% 55%)', hue: 38, cols: ['id (PK)', 'nombre'], comment: 'Tienda online, bar, distribuidores, eventos.' },
  { name: 'proveedores', rows: '~', color: 'hsl(330 70% 60%)', hue: 330, cols: ['id (PK)', 'nombre', 'contacto'], comment: 'Proveedores de insumos y materias primas.' },
];

const RELATIONAL_BENEFITS = [
  'Tablas en español con lógica en español (buena práctica)',
  'Relaciones FK: categoría_id une gastos ↔ categorías',
  'Sin duplicados: canal "Bar" se escribe 1 sola vez',
  'RLS: el analista solo ve sus filas, no las del CEO',
  'Escalable: Shopify, APIs externas se conectan directo',
];

export function S4Slide08DataModeling() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [view, setView] = useState<'before' | 'after'>('before');
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-20%,_hsl(280_60%_40%_/_0.1),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(280 55% 65%) 0.5px, transparent 0.5px)', backgroundSize: '52px 52px' }} />
        <div className="absolute top-[5%] right-[2%] text-[15vw] font-black text-white/[0.022] leading-none select-none pointer-events-none tracking-tighter">DB</div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-violet-500" style={{ boxShadow: '0 0 12px hsl(280 60% 55% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Stack · Modelado de Datos</span>
          <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">De Excel a Modelo Relacional</h1>
            </div>
          </div>
          <p className="text-violet-400/60 text-sm ml-5 pl-1 font-medium italic">"Una categoría tiene muchos ingresos. Un ingreso solo puede tener una categoría. Así funciona." — Vicente · Caso Real Mad Charlies</p>
          <p className="text-white/40 text-xs ml-5 pl-1 mt-1 italic">Diego Meza: "Limpié las ventas, costos y clientes con Claude y lo automaticé. El dashboard se actualiza cada hora."</p>
        </motion.div>

        {/* Toggle */}
        <motion.div {...m(0.1)} className="flex items-center gap-3 mb-6">
          {[
            { key: 'before' as const, label: 'Excel (Antes)', icon: FileSpreadsheet, color: 'hsl(0 65% 55%)', hue: 0 },
            { key: 'after' as const, label: 'Relacional (Después)', icon: Database, color: 'hsl(150 60% 50%)', hue: 150 },
          ].map((tab, i) => {
            const Icon = tab.icon;
            const isActive = view === tab.key;
            return (
              <button key={tab.key} onClick={() => setView(tab.key)}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border transition-all duration-300"
                style={{
                  borderColor: isActive ? `hsl(${tab.hue} 60% 50% / 0.4)` : 'hsl(0 0% 100% / 0.06)',
                  background: isActive ? `hsl(${tab.hue} 60% 45% / 0.1)` : 'transparent',
                  boxShadow: isActive ? `0 0 20px hsl(${tab.hue} 60% 50% / 0.1)` : 'none',
                }}>
                <Icon className="w-4 h-4" style={{ color: isActive ? tab.color : 'hsl(0 0% 100% / 0.3)' }} />
                <span className={`text-sm font-black ${isActive ? 'text-white' : 'text-white/90'}`}>{tab.label}</span>
              </button>
            );
          })}
          <ArrowRight className="h-4 w-4 text-white/85" />
          <span className="text-xs text-white/70 italic">Haz clic para comparar</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'before' ? (
            <motion.div key="before"
              initial={isExporting ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-6">
              {/* Problems */}
              <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.04]" style={{ boxShadow: '0 0 40px hsl(0 60% 40% / 0.06) inset' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                 <p className="text-lg font-black text-white">Google Sheets de Diego</p>
                    <p className="text-xs text-red-400/60">Una sola tabla monolítica · ventas Mad Charlies</p>
                  </div>
                </div>
                {['Canal "bar" repetido en cada fila de venta (datos duplicados)', 'Categoría escrita diferente cada vez → inconsistencias', 'Sin relaciones: no se puede saber cuánto vendió cada canal', 'No escala: agregar Shopify o API externa es imposible'].map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-red-500/12 bg-red-500/[0.02] mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400/70 shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed text-white/85">{p}</span>
                  </div>
                ))}
              </div>
                <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                  <p className="text-xs font-black text-white/75 mb-3 uppercase tracking-widest">Vista Excel — 1 tabla monolítica</p>
                  <div className="space-y-1.5 font-mono">
                    {EXCEL_ROWS.map((row, i) => (
                      <div key={i} className={`p-2.5 rounded-lg border text-[11px] leading-relaxed ${row.dup ? 'border-red-500/15 bg-red-500/[0.04]' : 'border-white/[0.05] bg-white/[0.01]'}`}>
                        <span className="text-white/80">{row.data}</span>
                        {row.dup && <span className="text-red-400/60 ml-2 font-bold">← DUPLICADO</span>}
                      </div>
                    ))}
                    <p className="mt-2 text-[11px] italic text-white/85">... 19,000+ filas mas con los mismos datos repetidos</p>
                  </div>
                  <div className="mt-3 p-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]">
                    <p className="text-[11px] font-black text-amber-300 mb-1">Pregunta de Pablo en clase:</p>
                    <p className="text-[11px] text-white/75 leading-relaxed">¿Partes del Excel o de Lovable? → <span className="font-bold text-white/85">Depende:</span> Excel ordenado → limpia con Claude y sube. Excel caótico → modela desde Lovable y adapta el Excel.</p>
                    <p className="text-[11px] text-red-400/80 mt-1.5 font-bold">⚠️ Lee siempre el SQL que propone Lovable antes de aprobar → puede borrar datos.</p>
                  </div>
                </div>
            </motion.div>
          ) : (
            <motion.div key="after"
              initial={isExporting ? {} : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-6">
              {/* Benefits */}
              <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]" style={{ boxShadow: '0 0 40px hsl(150 60% 40% / 0.06) inset' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                    <Database className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                 <p className="text-lg font-black text-white">ERP Mad Charlies · Supabase</p>
                    <p className="text-xs text-emerald-400/60">5 tablas relacionales · construido en clase</p>
                  </div>
                </div>
                {RELATIONAL_BENEFITS.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70 shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed text-white/85">{b}</span>
                  </div>
                ))}
              </div>
              {/* Tables */}
              <div className="space-y-3">
                  {MOCK_TABLES.map((t, i) => (
                    <motion.div key={i}
                      initial={isExporting ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                      className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.025] relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl" style={{ background: t.color }} />
                      <div className="ml-2 flex items-center gap-2 mb-2">
                        <Table2 className="w-4 h-4" style={{ color: t.color }} />
                        <span className="text-sm font-black text-white">{t.name}</span>
                        <span className="text-[11px] text-white/70 ml-auto font-mono">{t.rows} rows</span>
                      </div>
                      <div className="ml-2 flex gap-1.5 flex-wrap mb-2">
                        {t.cols.map((col, j) => (
                          <span key={j} className="text-[11px] px-2 py-0.5 rounded-md border font-mono"
                            style={{
                              borderColor: col.includes('PK') ? 'hsl(38 80% 50% / 0.25)' : col.includes('FK') ? `hsl(${t.hue} 60% 50% / 0.25)` : 'hsl(0 0% 100% / 0.06)',
                              background: col.includes('PK') ? 'hsl(38 80% 50% / 0.08)' : col.includes('FK') ? `hsl(${t.hue} 60% 45% / 0.08)` : 'hsl(0 0% 100% / 0.02)',
                              color: col.includes('PK') ? 'hsl(38 80% 65%)' : col.includes('FK') ? `hsl(${t.hue} 55% 65%)` : 'hsl(0 0% 100% / 0.3)',
                            }}>
                            {col.includes('PK') && '🔑 '}{col.includes('FK') && '🔗 '}{col}
                          </span>
                        ))}
                      </div>
                      <div className="ml-2 text-[10px] italic text-white/40 leading-relaxed border-t border-white/[0.04] pt-1.5">
                        💬 IA: "{t.comment}"
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(280 50% 55% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase">Stack</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/70">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
