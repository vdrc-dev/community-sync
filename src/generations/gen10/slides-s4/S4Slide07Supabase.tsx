import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Users, Zap, Table2, Shield, Server, CheckCircle2, Globe, Bot, Settings, Eye, ChevronRight } from 'lucide-react';
import bgSupabase from '@/assets/gen10-s4/bg-supabase-database.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S4Footer } from './S4Footer';

const CAPABILITIES = [
  { title: 'PostgreSQL', sub: 'Base de Datos', desc: 'Tablas relacionales, consultas SQL, full-text search.', icon: Table2, color: 'hsl(150 60% 50%)', hue: 150 },
  { title: 'Auth', sub: 'Autenticación', desc: 'Login, registro, OAuth. Protección por fila (RLS).', icon: Users, color: 'hsl(185 70% 50%)', hue: 185 },
  { title: 'REST & GraphQL', sub: 'APIs Automáticas', desc: 'CRUD generado al instante. Zero endpoints manuales.', icon: Zap, color: 'hsl(38 90% 55%)', hue: 38 },
  { title: 'Row Level Security', sub: 'Seguridad', desc: 'Cada usuario solo accede a sus datos. A nivel DB.', icon: Shield, color: 'hsl(330 70% 60%)', hue: 330 },
];

const MOCK_TABLE = [
  { name: 'Diego Meza', email: 'diego@mascharlies.cl', role: 'Admin', status: 'active' },
  { name: 'Vicente Donoso', email: 'vdrc@vdrc.cl', role: 'Owner', status: 'active' },
  { name: 'Pablo Aguirre', email: 'pablo@startup.io', role: 'Editor', status: 'active' },
  { name: 'Catalina Loayza', email: 'catalina@empresa.com', role: 'Viewer', status: 'inactive' },
];

const AI_TIPS = [
  { q: '¿Cómo agrego a Vicente Donoso como owner?', hint: 'Settings → Team → Invite → pon vicente@vdrc.cl → rol Admin u Owner.', color: 'hsl(150 60% 50%)', hue: 150 },
  { q: '¿Cómo creo una tabla en español con RLS?', hint: 'Table Editor → New table → nombre en español → activa RLS. Siempre en español.', color: 'hsl(185 70% 50%)', hue: 185 },
  { q: '¿Qué es FK y PK en una tabla?', hint: 'PK = ID único de cada fila. FK = relación con el PK de otra tabla. Como Excel pero real.', color: 'hsl(280 70% 60%)', hue: 280 },
];

const TABS = [
  { key: 'tables', label: 'Table Editor' },
  { key: 'ai', label: 'AI Assistant · Tip de clase' },
] as const;

export function S4Slide07Supabase() {
  const { isExporting } = useExportContext();
  const [tab, setTab] = useState<'tables' | 'ai'>('tables');
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
        <motion.div {...m(0)} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 12px hsl(150 60% 50% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Stack · Backend</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Supabase: Tu Backend</h1>
            </div>
          </div>
          <p className="text-emerald-400/60 text-sm ml-5 pl-1 font-medium italic">"Supabase es el Excel por detrás. Lovable es como el Power BI encima de él." — Vicente</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-5">
          {/* Capabilities */}
          <div className="col-span-2 space-y-2.5">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div key={i} {...m(0.1 + i * 0.07)}
                  className="relative p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.025] flex items-start gap-3 overflow-hidden hover:border-white/[0.1] transition-all duration-300">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl" style={{ background: cap.color }} />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ml-1" style={{ background: `hsl(${cap.hue} 60% 45% / 0.12)`, border: `1px solid hsl(${cap.hue} 60% 50% / 0.25)` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: cap.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white leading-tight">{cap.title}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: `hsl(${cap.hue} 55% 60% / 0.6)` }}>{cap.sub}</p>
                    <p className="text-[11px] text-white/80 leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Setup tip */}
            <motion.div {...m(0.5)} className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex items-start gap-2.5">
              <Settings className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-black text-amber-400/90 mb-1">Actívalo en clase</p>
                <p className="text-[11px] text-white/80 leading-relaxed">Con <span className="text-amber-400 font-bold">Schema Log</span> y <span className="text-amber-400 font-bold">Database Data</span> activados, el AI Assistant dentro de Supabase usa <strong>GPT-5</strong> para leer tu base y responder en lenguaje natural. Org Settings → Data Privacy → activa ambas opciones.</p>
              </div>
            </motion.div>
          </div>

          {/* Right panel with tabs */}
          <motion.div {...m(0.3)} className="col-span-3 rounded-2xl border border-emerald-500/20 overflow-hidden"
            style={{ background: 'hsl(150 30% 5% / 0.6)', boxShadow: '0 0 60px hsl(150 60% 40% / 0.08) inset' }}>
            {/* Tab bar */}
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="flex items-center gap-1 ml-2">
                {TABS.map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black transition-all"
                    style={{
                      background: tab === t.key ? 'hsl(150 60% 45% / 0.15)' : 'transparent',
                      color: tab === t.key ? 'hsl(150 60% 60%)' : 'hsl(0 0% 100% / 0.35)',
                    }}>
                    {t.key === 'ai' && <Bot className="w-3 h-3" />}
                    {t.key === 'tables' && <Server className="w-3 h-3" />}
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2">
                <motion.div className="w-2 h-2 rounded-full bg-emerald-500"
                  {...(isExporting ? {} : { animate: { opacity: [1, 0.4, 1] }, transition: { duration: 2, repeat: Infinity } })} />
                <span className="text-[11px] text-white/75 font-mono">Mad Charlies</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'tables' ? (
                <motion.div key="tables"
                  initial={isExporting ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
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
                          {...(isExporting ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.1 + i * 0.07 } })}
                          className="border-b border-white/[0.025] hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-2.5 text-[11px] text-white/70 font-mono">{i + 1}</td>
                          <td className="px-4 py-2.5 text-xs text-white/85 font-medium">{row.name}</td>
                          <td className="px-4 py-2.5 text-xs text-white/80 font-mono">{row.email}</td>
                          <td className="px-4 py-2.5">
                            <span className="text-[11px] px-2.5 py-1 rounded-md font-bold"
                              style={{ background: row.role === 'Owner' ? 'hsl(38 80% 50% / 0.15)' : row.role === 'Admin' ? 'hsl(280 60% 50% / 0.12)' : 'hsl(0 0% 100% / 0.04)', color: row.role === 'Owner' ? 'hsl(38 80% 65%)' : row.role === 'Admin' ? 'hsl(280 60% 70%)' : 'hsl(0 0% 100% / 0.35)', border: `1px solid ${row.role === 'Owner' ? 'hsl(38 80% 50% / 0.25)' : 'hsl(0 0% 100% / 0.06)'}` }}>
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
                  <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center gap-3 bg-white/[0.01]">
                    <Globe className="h-3 w-3 text-white/85" />
                    <span className="text-[11px] text-white/70 font-mono">PostgreSQL · Real-time · REST API</span>
                    <div className="ml-auto text-[11px] text-emerald-400/40 font-mono font-bold">✓ RLS enabled</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="ai"
                  initial={isExporting ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04]">
                    <Bot className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-emerald-300 mb-1">AI Assistant · GPT-5 incluido en plan Pro</p>
                      <p className="text-[11px] text-white/80 leading-relaxed">Con Schema Log activado, el AI de Supabase usa GPT-5 para leer tu base y responder preguntas. Así aprendió Vicente a usar Supabase: "¿Cómo creo una API Key?" y el asistente te navega.</p>
                    </div>
                  </div>

                  <p className="text-[11px] font-black uppercase tracking-wider text-white/40 px-1">Ejemplos de preguntas en clase</p>

                  {AI_TIPS.map((tip, i) => (
                    <motion.div key={i}
                      {...(isExporting ? {} : { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + i * 0.08 } })}
                      className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015]">
                      <div className="flex items-start gap-2 mb-2">
                        <Eye className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: tip.color }} />
                        <p className="text-xs font-black text-white/90">{tip.q}</p>
                      </div>
                      <div className="flex items-center gap-2 pl-5">
                        <ChevronRight className="w-3 h-3 text-white/30" />
                        <p className="text-[11px] text-white/60 font-mono italic">{tip.hint}</p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex items-center gap-2">
                    <span className="text-[11px] text-white/70">⚠️ <span className="text-red-400 font-black">Trampa de Lovable Cloud:</span> Lovable te ofrece habilitar su propia base de datos automáticamente — es una mala maña que te deja "amarrado". Ve a Settings → Connectors → deshabilita Lovable Cloud → conecta Supabase manual. Así el código es tuyo.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Callout */}
        <motion.div {...m(0.65)} className="mt-4 p-3.5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] flex items-center gap-3 max-w-4xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-xs text-white/85 leading-relaxed">
          <span className="text-emerald-400/80 font-black">Plan Pro $20 USD/mes — </span>
            AI Assistant con GPT-5 incluido. Si invitas a alguien, ve TODOS los proyectos de la org. Plan Enterprise ($600/mes) permite permisos granulares por proyecto. Cowork de Claude tiene conector nativo a Supabase para carga masiva de datos desde Excel.
          </p>
        </motion.div>
      </div>

      <S4Footer sectionLabel="Stack" contextHint="Backend · Supabase" hue={150} session="S4" />
    </div>
  );
}
