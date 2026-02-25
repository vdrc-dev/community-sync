import { motion } from 'framer-motion';
import { Database, Users, Zap, Table2, Shield, Server, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import bgSupabase from '@/assets/gen10-s4/bg-supabase-database.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const CAPABILITIES = [
  { title: 'PostgreSQL', sub: 'Base de Datos', desc: 'Tablas relacionales, consultas SQL, full-text search.', icon: Table2, color: 'hsl(150 60% 50%)', hue: 150 },
  { title: 'Auth', sub: 'Autenticación', desc: 'Login, registro, OAuth. Protección por fila (RLS).', icon: Users, color: 'hsl(185 70% 50%)', hue: 185 },
  { title: 'REST & GraphQL', sub: 'APIs Automáticas', desc: 'CRUD generado al instante. Zero endpoints manuales.', icon: Zap, color: 'hsl(38 90% 55%)', hue: 38 },
  { title: 'Row Level Security', sub: 'Seguridad', desc: 'Cada usuario solo accede a sus datos. A nivel DB.', icon: Shield, color: 'hsl(330 70% 60%)', hue: 330 },
];

const MOCK_TABLE = [
  { name: 'María López', email: 'maria@startup.io', role: 'Admin', status: 'active' },
  { name: 'Pedro Sánchez', email: 'pedro@dev.io', role: 'Editor', status: 'active' },
  { name: 'Ana García', email: 'ana@empresa.com', role: 'Viewer', status: 'inactive' },
  { name: 'Carlos Ruiz', email: 'carlos@corp.cl', role: 'Editor', status: 'active' },
];

export function S4Slide07Supabase() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgSupabase} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/45 to-[#04030a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-15%,_hsl(150_60%_40%_/_0.14),_transparent_60%)]" />
        <div className="absolute top-[5%] right-[3%] text-[20vw] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">SB</div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 12px hsl(150 60% 50% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Stack · Backend</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Supabase: Tu Backend</h1>
            </div>
          </div>
          <p className="text-emerald-400/60 text-sm ml-5 pl-1 font-medium">Base de datos, auth y APIs. Profesional, gratis, con 1 click desde Lovable.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-6">
          {/* Capabilities */}
          <div className="col-span-2 space-y-3">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div key={i} {...m(0.12 + i * 0.08)}
                  className="relative p-4 rounded-xl border border-white/[0.06] bg-white/[0.025] flex items-start gap-3 overflow-hidden group hover:border-white/[0.1] transition-all duration-300"
                  style={{ boxShadow: `0 0 0 0 hsl(${cap.hue} 60% 50% / 0)` }}>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl" style={{ background: cap.color }} />
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ml-1" style={{ background: `hsl(${cap.hue} 60% 45% / 0.12)`, border: `1px solid hsl(${cap.hue} 60% 50% / 0.25)` }}>
                    <Icon className="w-5 h-5" style={{ color: cap.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white leading-tight">{cap.title}</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: `hsl(${cap.hue} 55% 60% / 0.6)` }}>{cap.sub}</p>
                    <p className="text-[11px] text-white/85 leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mock Table Editor */}
          <motion.div {...m(0.35)} className="col-span-3 rounded-2xl border border-emerald-500/20 overflow-hidden"
            style={{ background: 'hsl(150 30% 5% / 0.6)', boxShadow: '0 0 60px hsl(150 60% 40% / 0.08) inset, 0 0 40px hsl(150 60% 40% / 0.05)' }}>
            {/* Table header bar */}
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-3 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="flex items-center gap-2 ml-1">
                <Server className="w-3.5 h-3.5 text-emerald-400/70" />
                <span className="text-xs font-black text-emerald-400/80 font-mono">Table Editor</span>
                <span className="text-xs text-white/70 font-mono">›</span>
                <span className="text-xs font-bold text-white/90 font-mono">usuarios</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <motion.div className="w-2 h-2 rounded-full bg-emerald-500"
                  {...(isExporting ? {} : { animate: { opacity: [1, 0.4, 1] }, transition: { duration: 2, repeat: Infinity } })} />
                <span className="text-[11px] text-white/75 font-mono">4 / 47 rows</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                    {['id', 'nombre', 'email', 'rol', 'estado'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-[11px] font-black tracking-widest text-white/70 uppercase font-mono">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TABLE.map((row, i) => (
                    <motion.tr key={i}
                      {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 + i * 0.08 } })}
                      className="border-b border-white/[0.025] hover:bg-white/[0.02] transition-colors group">
                      <td className="px-4 py-2.5 text-[11px] text-white/70 font-mono">{i + 1}</td>
                      <td className="px-4 py-2.5 text-xs text-white/85 font-medium">{row.name}</td>
                      <td className="px-4 py-2.5 text-xs text-white/80 font-mono">{row.email}</td>
                      <td className="px-4 py-2.5">
                        <span className="text-[11px] px-2.5 py-1 rounded-md font-bold"
                          style={{ background: row.role === 'Admin' ? 'hsl(38 80% 50% / 0.12)' : 'hsl(0 0% 100% / 0.04)', color: row.role === 'Admin' ? 'hsl(38 80% 65%)' : 'hsl(0 0% 100% / 0.35)', border: `1px solid ${row.role === 'Admin' ? 'hsl(38 80% 50% / 0.2)' : 'hsl(0 0% 100% / 0.06)'}` }}>
                          {row.role}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: row.status === 'active' ? 'hsl(150 60% 55% / 0.8)' : 'hsl(0 0% 100% / 0.25)' }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: row.status === 'active' ? 'hsl(150 60% 55%)' : 'hsl(0 0% 100% / 0.2)' }} />
                          {row.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer bar */}
            <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center gap-3 bg-white/[0.01]">
              <Globe className="h-3 w-3 text-white/85" />
              <span className="text-[11px] text-white/70 font-mono">PostgreSQL · Real-time · Edge Network · REST API</span>
              <div className="ml-auto text-[11px] text-emerald-400/40 font-mono font-bold">✓ RLS enabled</div>
            </div>
          </motion.div>
        </div>

        {/* Callout */}
        <motion.div {...m(0.6)} className="mt-5 p-3.5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] flex items-center gap-3 max-w-3xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-xs text-white/90 leading-relaxed">
            <span className="text-emerald-400/80 font-black">Plan gratuito muy potente — </span>
            Hasta 2 proyectos gratis con PostgreSQL, Auth, Storage y APIs incluidas. Infraestructura de AWS.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(150 50% 50% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase">Stack</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/70">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
