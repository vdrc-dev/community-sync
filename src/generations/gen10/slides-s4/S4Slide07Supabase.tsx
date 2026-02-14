import { motion } from 'framer-motion';
import { Database, Users, Zap, Table2, Shield, Server, ArrowRight } from 'lucide-react';
import bgSupabase from '@/assets/gen10-s4/bg-supabase-database.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const CAPABILITIES = [
  { title: 'Base de Datos', desc: 'PostgreSQL profesional. Tablas, relaciones, consultas SQL.', icon: Table2, color: 'hsl(150 60% 50%)' },
  { title: 'Autenticación', desc: 'Login, registro, protección de rutas. Configuración en minutos.', icon: Users, color: 'hsl(185 70% 50%)' },
  { title: 'APIs Automáticas', desc: 'CRUD generado automáticamente. Sin escribir endpoints.', icon: Zap, color: 'hsl(38 90% 55%)' },
  { title: 'Seguridad (RLS)', desc: 'Row Level Security. Cada usuario solo ve sus datos.', icon: Shield, color: 'hsl(330 70% 60%)' },
];

const MOCK_TABLE = [
  { name: 'María López', email: 'maria@startup.io', role: 'Admin', status: 'active' },
  { name: 'Pedro Sánchez', email: 'pedro@dev.io', role: 'Editor', status: 'active' },
  { name: 'Ana García', email: 'ana@empresa.com', role: 'Viewer', status: 'active' },
];

export function S4Slide07Supabase() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgSupabase} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/40 to-[#04030a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(150_60%_40%_/_0.08),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-emerald-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Stack</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Supabase: Tu Backend</h1>
            </div>
          </div>
          <p className="text-emerald-400/60 text-sm ml-5 pl-1">Base de datos, autenticación y APIs. Con 1 click.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-6">
          {/* Capabilities */}
          <div className="col-span-2 space-y-3">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div key={i} {...m(0.15 + i * 0.08)}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cap.color.replace(')', ' / 0.1)')}`, border: `1px solid ${cap.color.replace(')', ' / 0.2)')}` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: cap.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{cap.title}</p>
                    <p className="text-[11px] text-white/35 mt-0.5">{cap.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mock Table Editor */}
          <motion.div {...m(0.4)} className="col-span-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.02] overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-3">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400/80">Table Editor — usuarios</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                <span className="text-[10px] text-white/25">47 registros</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    {['Nombre', 'Email', 'Rol', 'Estado'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold tracking-wider text-white/25 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TABLE.map((row, i) => (
                    <motion.tr key={i} {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 + i * 0.1 } })}
                      className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-xs text-white/60">{row.name}</td>
                      <td className="px-4 py-3 text-xs text-white/35 font-mono">{row.email}</td>
                      <td className="px-4 py-3"><span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.06]">{row.role}</span></td>
                      <td className="px-4 py-3"><span className="text-[10px] text-emerald-400/60">● {row.status}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center gap-2">
              <Database className="w-3 h-3 text-white/20" />
              <span className="text-[10px] text-white/20">PostgreSQL · Tiempo Real · Escalable</span>
            </div>
          </motion.div>
        </div>

        <motion.div {...m(0.6)} className="mt-5 p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] text-center max-w-2xl mx-auto">
          <p className="text-xs text-white/40">💡 <span className="text-emerald-400/70 font-semibold">Versión gratuita muy potente</span> — Data centers de AWS. Hasta 2 proyectos gratis con todo incluido.</p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(150 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">STACK</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
