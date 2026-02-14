import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, Database, ArrowRight, Table2, Key, Link2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const EXCEL_PROBLEMS = [
  'Columnas redundantes en cada fila',
  'Sin relaciones entre entidades',
  'Datos inconsistentes y duplicados',
  'No escala más allá de 10,000 filas',
];

const RELATIONAL_BENEFITS = [
  'Tablas con llaves primarias (PK)',
  'Relaciones Foreign Key (FK)',
  'Integridad referencial automática',
  'Escalable a millones de registros',
];

const MOCK_TABLES = [
  { name: 'colegios', rows: '847', cols: ['id (PK)', 'nombre', 'región_id (FK)', 'tipo'] },
  { name: 'regiones', rows: '16', cols: ['id (PK)', 'nombre', 'código'] },
  { name: 'evaluaciones', rows: '19,234', cols: ['id (PK)', 'colegio_id (FK)', 'fecha', 'puntaje'] },
];

export function S4Slide08DataModeling() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const [view, setView] = useState<'before' | 'after'>('before');
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(280_60%_40%_/_0.1),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-violet-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Stack</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">De Excel a Modelo Relacional</h1>
            </div>
          </div>
          <p className="text-violet-400/60 text-sm ml-5 pl-1">Tu Excel tiene 19,000 filas. Supabase las convierte en poder.</p>
        </motion.div>

        {/* Toggle */}
        <motion.div {...m(0.1)} className="flex items-center gap-2 mb-6 justify-center">
          {[
            { key: 'before' as const, label: 'Excel (Antes)', icon: FileSpreadsheet, color: 'hsl(0 60% 50%)' },
            { key: 'after' as const, label: 'Relacional (Después)', icon: Database, color: 'hsl(150 60% 50%)' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setView(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${view === tab.key ? 'bg-white/[0.05] border-white/[0.15] text-white' : 'border-white/[0.04] text-white/30'}`}>
              <tab.icon className="w-4 h-4" style={{ color: view === tab.key ? tab.color : undefined }} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'before' ? (
            <motion.div key="before" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-2 gap-6">
              {/* Excel problems */}
              <div className="p-6 rounded-2xl border border-red-500/15 bg-red-500/[0.03]">
                <div className="flex items-center gap-3 mb-4">
                  <FileSpreadsheet className="w-6 h-6 text-red-400" />
                  <span className="text-lg font-bold text-white">Excel Tradicional</span>
                </div>
                <div className="space-y-3">
                  {EXCEL_PROBLEMS.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-red-500/10 bg-red-500/[0.02]">
                      <AlertTriangle className="w-4 h-4 text-red-400/60 shrink-0" />
                      <span className="text-xs text-white/45">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mock excel view */}
              <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <p className="text-xs font-bold text-white/30 mb-3 uppercase tracking-wider">Vista Excel (1 tabla monolítica)</p>
                <div className="space-y-1 font-mono text-[10px]">
                  {['Colegio A | Antofagasta | Norte | Bueno | 2024 | 85 | Dir: Juan...', 'Colegio A | Antofagasta | Norte | Bueno | 2024 | 92 | Dir: Juan...', 'Colegio B | Santiago | Centro | Regular | 2024 | 67 | Dir: Ana...'].map((row, i) => (
                    <div key={i} className={`p-2 rounded ${i === 0 || i === 1 ? 'bg-red-500/[0.05] border border-red-500/10' : 'bg-white/[0.01] border border-white/[0.03]'}`}>
                      <span className="text-white/30">{row}</span>
                      {(i === 0 || i === 1) && <span className="text-red-400/50 ml-2">← Datos duplicados</span>}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="after" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 gap-6">
              {/* Benefits */}
              <div className="p-6 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03]">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-emerald-400" />
                  <span className="text-lg font-bold text-white">Modelo Relacional</span>
                </div>
                <div className="space-y-3">
                  {RELATIONAL_BENEFITS.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.02]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400/60 shrink-0" />
                      <span className="text-xs text-white/45">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mock tables */}
              <div className="space-y-3">
                {MOCK_TABLES.map((t, i) => (
                  <motion.div key={i} initial={isExporting ? {} : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                    className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-2">
                      <Table2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-bold text-white">{t.name}</span>
                      <span className="text-[9px] text-white/20 ml-auto">{t.rows} filas</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {t.cols.map((col, j) => (
                        <span key={j} className={`text-[9px] px-2 py-0.5 rounded-full border ${col.includes('PK') ? 'border-amber-500/20 bg-amber-500/[0.05] text-amber-400/60' : col.includes('FK') ? 'border-violet-500/20 bg-violet-500/[0.05] text-violet-400/60' : 'border-white/[0.06] bg-white/[0.02] text-white/30'}`}>
                          {col.includes('PK') && <Key className="w-2.5 h-2.5 inline mr-1" />}
                          {col.includes('FK') && <Link2 className="w-2.5 h-2.5 inline mr-1" />}
                          {col}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(280 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">STACK</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
