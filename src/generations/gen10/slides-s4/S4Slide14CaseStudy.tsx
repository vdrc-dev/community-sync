import { motion } from 'framer-motion';
import { ExternalLink, Beer, Users, Database, BarChart3, Clock, Globe, CheckCircle2, Zap, TrendingUp } from 'lucide-react';
import bgCaseStudy from '@/assets/gen10-s4/bg-case-study-campus.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { S4Footer } from './S4Footer';

const STATS = [
  { label: 'Tablas', value: '8+', icon: Database, color: 'hsl(150 60% 50%)', hue: 150, sub: 'ventas · clientes · inventario' },
  { label: 'Roles', value: 'Multi-rol', icon: Users, color: 'hsl(280 70% 60%)', hue: 280, sub: 'admin + equipo' },
  { label: 'ROI', value: 'Calculado', icon: TrendingUp, color: 'hsl(38 90% 55%)', hue: 38, sub: 'flujo caja en tiempo real' },
  { label: 'Tiempo', value: '1 clase', icon: Clock, color: 'hsl(185 70% 50%)', hue: 185, sub: 'de Excel a app en vivo' },
];

const FLOW = [
  { step: 'Excel de ventas MasCharlies', action: 'Diego envía el Google Sheets consolidado. Vicente modela las tablas relacionales.', tool: 'Google Sheets' },
  { step: 'Prototipo visual', action: 'Lovable crea la interfaz con colores corporativos: negro + rojo MasCharlies.', tool: 'Lovable' },
  { step: 'Backend estructurado', action: 'Supabase almacena tablas de ventas, clientes y flujo de caja. RLS por rol.', tool: 'Supabase' },
  { step: 'Organización y control', action: 'GitHub en org MasCharlies. Todo el código versionado y compartido con el equipo.', tool: 'GitHub' },
  { step: 'Portal de usuario', action: 'Login seguro. Solo el equipo MasCharlies puede ver los datos de la empresa.', tool: 'Auth + RLS' },
];

export function S4Slide14CaseStudy() {
  const { isExporting } = useExportContext();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgCaseStudy} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/45 to-[#04030a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-15%,_hsl(0_80%_45%_/_0.1),_transparent_60%)]" />
        {/* Editorial watermark */}
        <div className="absolute top-[4%] right-[2%] text-[16vw] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">MC</div>
      </div>

      {!isExporting && (
        <motion.div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'hsl(0 80% 50% / 0.06)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-red-500" style={{ boxShadow: '0 0 12px hsl(0 80% 55% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Caso Real · Construido en Clase · Gen 10</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">MasCharlies — ERP Real</h1>
            </div>
          </div>
          <p className="text-red-400/60 text-sm ml-5 pl-1 font-medium italic">"Un mini SAP. Un mini Oracle. Para tu empresa. Construido en una tarde." — Vicente</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-5">
          {/* Stats + Identity */}
          <div className="col-span-2 space-y-3">
            {/* Brand card */}
            <motion.div {...m(0.08)} className="p-4 rounded-2xl border border-red-500/25 bg-red-500/[0.05] flex items-center gap-4"
              style={{ boxShadow: '0 0 30px hsl(0 80% 50% / 0.07)' }}>
              <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                <Beer className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <p className="text-base font-black text-white">MasCharlies</p>
                <p className="text-[11px] text-white/60">Cervecería artesanal · Diego Meza Stange</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-3 h-3 rounded-sm bg-red-600" />
                  <span className="w-3 h-3 rounded-sm bg-neutral-900 border border-white/20" />
                  <span className="text-[10px] text-white/40 font-mono">Negro + Rojo</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-2.5">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={i} {...m(0.12 + i * 0.07)}
                    className="relative p-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] text-center overflow-hidden hover:border-white/[0.1] transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${stat.color.replace(')', ' / 0.5)')}, transparent)` }} />
                    <div className="w-8 h-8 mx-auto mb-1.5 rounded-xl flex items-center justify-center" style={{ background: `hsl(${stat.hue} 60% 45% / 0.1)`, border: `1px solid hsl(${stat.hue} 60% 50% / 0.2)` }}>
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <p className="text-xl font-black text-white leading-tight">{stat.value}</p>
                    <p className="text-[10px] font-black uppercase tracking-wider mt-0.5" style={{ color: `hsl(${stat.hue} 55% 60% / 0.6)` }}>{stat.label}</p>
                    <p className="text-[10px] text-white/60 mt-0.5 leading-tight">{stat.sub}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* URL card */}
            <motion.div {...m(0.48)} className="p-3.5 rounded-2xl border border-red-500/20 bg-red-500/[0.04] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                <Globe className="w-4.5 h-4.5 text-red-400" />
              </div>
              <div>
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-bold mb-0.5">URL Pública · Live</p>
                <p className="text-sm font-black text-red-400 font-mono">erp-mascharlies.vercel.app</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-red-400/40 ml-auto" />
            </motion.div>
          </div>

          {/* Flujo real */}
          <motion.div {...m(0.28)} className="col-span-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-red-500/12 border border-red-500/25 flex items-center justify-center">
                <BarChart3 className="w-4.5 h-4.5 text-red-400" />
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
                  <div className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-black text-red-400">{i + 1}</span>
                  </div>
                  <div className="flex-1 p-3 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-black text-white/90">{item.step}</p>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-500/10 text-red-400/70 border border-red-500/15">{item.tool}</span>
                    </div>
                    <p className="text-[11px] text-white/75 leading-relaxed">{item.action}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...m(0.72)} className="mt-4 p-3.5 rounded-xl border border-red-500/20 bg-red-500/[0.04] flex items-center gap-3">
              <Zap className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-xs text-white/75">
                <span className="text-red-400/80 font-black">Resultado real: </span>
                ERP de cervecería con portal de usuario, datos reales de ventas, RLS activado. <span className="text-white/85">Construido en una sola sesión de clase.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div {...m(0.78)} className="mt-4 p-3.5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] flex items-center gap-3 max-w-4xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-xs text-white/80 leading-relaxed">
            <span className="text-emerald-400/80 font-black">Stack completo validado: </span>
            GitHub (org) + Supabase (DB) + Lovable (frontend) + Vercel (deploy). El mismo flujo sirve para cualquier empresa del grupo.
          </p>
        </motion.div>
      </div>

      <S4Footer sectionLabel="Aplicación" contextHint="Caso Real · MasCharlies Gen 10" hue={0} session="S4" />
    </div>
  );
}
