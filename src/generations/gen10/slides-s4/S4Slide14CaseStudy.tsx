import { motion } from 'framer-motion';
import { ExternalLink, Beer, Users, Database, BarChart3, Clock, Globe, CheckCircle2, Zap, TrendingUp } from 'lucide-react';
import bgCaseStudy from '@/assets/gen10-s4/bg-case-study-campus.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S4Footer } from './S4Footer';

const CYN = 185; // Mad Charlies cyan hue

const STATS = [
  { label: 'Tablas', value: '5+', icon: Database, hue: CYN, sub: 'ingresos · gastos · canales' },
  { label: 'Módulo', value: 'Finanzas', icon: Users, hue: CYN, sub: 'flujo de caja + reportes' },
  { label: 'ROI', value: 'Calculado', icon: TrendingUp, hue: 38, sub: 'dashboard cada hora' },
  { label: 'Tiempo', value: '1 clase', icon: Clock, hue: CYN, sub: 'de Excel a app en vivo' },
];

const FLOW = [
  { step: 'Excel de Diego → modelo relacional', action: 'Ventas con listas desplegables, conectado a tabla clientes y costeo. Vicente modela 5 tablas: ingresos, gastos, categorías, canales, proveedores.', tool: 'Google Sheets' },
  { step: 'Módulo elegido: Finanzas y Reportes', action: 'No inventario — se eligió Finanzas para reemplazar el CFO. "Yo quería contratar un CFO remoto, huevón." — Diego. El ERP lo reemplaza.', tool: 'Lovable' },
  { step: 'Backend con RLS', action: 'Supabase almacena las 5 tablas. RLS activado: cada rol solo ve sus datos. Claude cayó en clase → el flujo igual funcionó mostrando la importancia del backup.', tool: 'Supabase' },
  { step: 'Código en la organización', action: 'GitHub org Mad Charlies. Todo versionado. "Si lo hacéis bien al principio, cuando la empresa sea gigante, no tenéis un equipo de 90 personas planillando." — Vicente', tool: 'GitHub' },
  { step: 'Deploy con dominio real', action: 'Vercel conecta GitHub → madcharlies.cl. La URL de Lovable es temporal. El custom domain es la app real del equipo.', tool: 'Vercel' },
];

export function S4Slide14CaseStudy() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={bgCaseStudy} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.15]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/45 to-[#04030a]/85" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 120% 70% at 50% -15%, hsl(${CYN} 80% 45% / 0.08), transparent 60%)` }} />
        <div className="absolute top-[4%] right-[2%] text-[16vw] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">MC</div>
      </div>

      {!isExporting && (
        <motion.div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: `hsl(${CYN} 80% 50% / 0.07)` }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full" style={{ background: `hsl(${CYN} 80% 50%)`, boxShadow: `0 0 12px hsl(${CYN} 80% 55% / 0.6)` }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Caso Real · Construido en Clase · Gen 10</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Mad Charlies — ERP Real</h1>
            </div>
          </div>
          <p className="text-sm ml-5 pl-1 font-medium italic" style={{ color: `hsl(${CYN} 60% 55% / 0.6)` }}>"Un mini SAP. Un mini Oracle. Para tu empresa. Construido en una tarde." — Vicente</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-5">
          {/* Stats + Identity */}
          <div className="col-span-2 space-y-3">
            {/* Brand card */}
            <motion.div {...m(0.08)} className="p-4 rounded-2xl flex items-center gap-4"
              style={{ border: `1px solid hsl(${CYN} 70% 50% / 0.25)`, background: `hsl(${CYN} 70% 50% / 0.05)`, boxShadow: `0 0 30px hsl(${CYN} 70% 50% / 0.07)` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `hsl(${CYN} 70% 50% / 0.15)`, border: `1px solid hsl(${CYN} 70% 50% / 0.3)` }}>
                <Beer className="w-7 h-7" style={{ color: `hsl(${CYN} 70% 60%)` }} />
              </div>
              <div>
                <p className="text-base font-black text-white">Mad Charlies</p>
                <p className="text-[11px] text-white/60">Cervecería artesanal · Diego Meza Stange</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-3 h-3 rounded-sm" style={{ background: `hsl(${CYN} 80% 45%)` }} />
                  <span className="w-3 h-3 rounded-sm bg-neutral-900 border border-white/20" />
                  <span className="text-[10px] text-white/40 font-mono">Negro + Cyan · madcharlies.cl</span>
                </div>
              </div>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={i} {...m(0.12 + i * 0.07)}
                    className="relative p-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] text-center overflow-hidden hover:border-white/[0.1] transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, transparent, hsl(${stat.hue} 65% 55% / 0.5), transparent)` }} />
                    <div className="w-8 h-8 mx-auto mb-1.5 rounded-xl flex items-center justify-center"
                      style={{ background: `hsl(${stat.hue} 60% 45% / 0.1)`, border: `1px solid hsl(${stat.hue} 60% 50% / 0.2)` }}>
                      <Icon className="w-4 h-4" style={{ color: `hsl(${stat.hue} 65% 60%)` }} />
                    </div>
                    <p className="text-xl font-black text-white leading-tight">{stat.value}</p>
                    <p className="text-[10px] font-black uppercase tracking-wider mt-0.5" style={{ color: `hsl(${stat.hue} 55% 60% / 0.6)` }}>{stat.label}</p>
                    <p className="text-[10px] text-white/60 mt-0.5 leading-tight">{stat.sub}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* URL card */}
            <motion.div {...m(0.48)} className="p-3.5 rounded-2xl flex items-center gap-3"
              style={{ border: `1px solid hsl(${CYN} 70% 50% / 0.2)`, background: `hsl(${CYN} 70% 50% / 0.04)` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `hsl(${CYN} 70% 50% / 0.15)`, border: `1px solid hsl(${CYN} 70% 50% / 0.25)` }}>
                <Globe className="w-4 h-4" style={{ color: `hsl(${CYN} 70% 60%)` }} />
              </div>
              <div>
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-bold mb-0.5">Sitio real · Live</p>
                <p className="text-sm font-black font-mono" style={{ color: `hsl(${CYN} 70% 60%)` }}>madcharlies.cl</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 ml-auto" style={{ color: `hsl(${CYN} 70% 50% / 0.4)` }} />
            </motion.div>
          </div>

          {/* Flujo real */}
          <motion.div {...m(0.28)} className="col-span-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `hsl(${CYN} 70% 50% / 0.12)`, border: `1px solid hsl(${CYN} 70% 50% / 0.25)` }}>
                <BarChart3 className="w-4 h-4" style={{ color: `hsl(${CYN} 70% 60%)` }} />
              </div>
              <div>
                <p className="text-sm font-black text-white">Flujo Real de Construcción</p>
                <p className="text-[11px] text-white/60">De Google Sheets a producción, en vivo durante clase</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {FLOW.map((item, i) => (
                <motion.div key={i}
                  {...(isExporting ? {} : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] } })}
                  className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `hsl(${CYN} 70% 50% / 0.15)`, border: `1px solid hsl(${CYN} 70% 50% / 0.25)` }}>
                    <span className="text-[10px] font-black" style={{ color: `hsl(${CYN} 70% 60%)` }}>{i + 1}</span>
                  </div>
                  <div className="flex-1 p-3 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-black text-white/90">{item.step}</p>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md"
                        style={{ background: `hsl(${CYN} 70% 50% / 0.1)`, color: `hsl(${CYN} 70% 60% / 0.7)`, border: `1px solid hsl(${CYN} 70% 50% / 0.15)` }}>
                        {item.tool}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/75 leading-relaxed">{item.action}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...m(0.72)} className="mt-4 p-3.5 rounded-xl flex items-center gap-3"
              style={{ border: `1px solid hsl(${CYN} 70% 50% / 0.2)`, background: `hsl(${CYN} 70% 50% / 0.04)` }}>
              <Zap className="w-4 h-4 shrink-0" style={{ color: `hsl(${CYN} 70% 60%)` }} />
              <p className="text-xs text-white/75">
                <span className="font-black" style={{ color: `hsl(${CYN} 70% 60% / 0.8)` }}>Resultado real: </span>
                ERP de cervecería con portal de usuario, datos reales de ventas, RLS activado. <span className="text-white/85">Construido en una sola sesión de clase.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div {...m(0.78)} className="mt-4 grid grid-cols-2 gap-3 max-w-4xl">
          <div className="p-3.5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-white/80 leading-relaxed">
              <span className="text-emerald-400/80 font-black">Stack validado: </span>
              GitHub org + Supabase + Lovable + Vercel → madcharlies.cl. El mismo flujo para cualquier empresa del grupo.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03] flex items-start gap-3">
            <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: `hsl(${CYN} 70% 60%)` }} />
            <div>
              <p className="text-[11px] font-black mb-1" style={{ color: `hsl(${CYN} 70% 60% / 0.8)` }}>Próximos pasos Mad Charlies</p>
              <p className="text-[11px] text-white/70 leading-relaxed">Conectar Shopify API · Servicio de despacho API · Edge Functions para reportes automáticos</p>
            </div>
          </div>
        </motion.div>
      </div>

      <S4Footer sectionLabel="Aplicación" contextHint="Caso Real · Mad Charlies Gen 10" hue={CYN} session="S4" />
    </div>
  );
}
