import { motion } from 'framer-motion';
import { ExternalLink, School, Users, Database, BarChart3, Clock, Globe, CheckCircle2, Cpu, ArrowRight, Zap } from 'lucide-react';
import bgCaseStudy from '@/assets/gen10-s4/bg-case-study-campus.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const STATS = [
  { label: 'Registros', value: '19,000+', icon: Database, color: 'hsl(150 60% 50%)', hue: 150, sub: 'filas de Excel' },
  { label: 'Tablas', value: '12', icon: BarChart3, color: 'hsl(280 70% 60%)', hue: 280, sub: 'interconectadas' },
  { label: 'Roles', value: 'Multi-rol', icon: Users, color: 'hsl(185 70% 50%)', hue: 185, sub: 'auth por dominio' },
  { label: 'Tiempo', value: '90 min', icon: Clock, color: 'hsl(38 90% 55%)', hue: 38, sub: 'cero a producción' },
];

const FLOW = [
  { step: 'Excel con 19,000 filas', action: 'Cursor analiza y genera modelo relacional con FK', tool: 'Cursor + Claude' },
  { step: 'Prototipo visual', action: 'Lovable crea la interfaz con colores corporativos (naranja)', tool: 'Lovable' },
  { step: 'Backend estructurado', action: 'Supabase almacena 12 tablas interconectadas con RLS', tool: 'Supabase' },
  { step: 'Acceso controlado', action: 'Auth restringe acceso solo a @fundaciontrabun.cl', tool: 'Auth' },
  { step: 'Versión y deploy', action: 'GitHub versiona todo. URL pública lista en segundos.', tool: 'GitHub' },
];

export function S4Slide14CaseStudy() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d * 1.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgCaseStudy} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.22]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/70 via-[#04030a]/45 to-[#04030a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-15%,_hsl(38_80%_45%_/_0.1),_transparent_60%)]" />
        {/* Editorial watermark */}
        <div className="absolute top-[4%] right-[2%] text-[16vw] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">CK</div>
      </div>

      {!isExporting && (
        <motion.div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'hsl(38 80% 50% / 0.06)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full bg-amber-500" style={{ boxShadow: '0 0 12px hsl(38 90% 55% / 0.6)' }} />
            <div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-white/80">Aplicación · Caso Real · 90 Minutos</span>
              <h1 className="text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-tight">Campus Kind</h1>
            </div>
          </div>
          <p className="text-amber-400/60 text-sm ml-5 pl-1 font-medium">Sistema de gestión de colegios. De Excel caótico a app web profesional en una sesión.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-6">
          {/* Stats + URL */}
          <div className="col-span-2 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={i} {...m(0.12 + i * 0.08)}
                    className="relative p-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] text-center overflow-hidden group hover:border-white/[0.1] transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${stat.color.replace(')', ' / 0.5)')}, transparent)` }} />
                    <div className="w-9 h-9 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ background: `hsl(${stat.hue} 60% 45% / 0.1)`, border: `1px solid hsl(${stat.hue} 60% 50% / 0.2)` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
                    </div>
                    <p className="text-2xl font-black text-white leading-tight">{stat.value}</p>
                    <p className="text-[11px] font-black uppercase tracking-wider mt-0.5" style={{ color: `hsl(${stat.hue} 55% 60% / 0.6)` }}>{stat.label}</p>
                    <p className="text-[11px] text-white/70 mt-0.5">{stat.sub}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* URL card */}
            <motion.div {...m(0.5)} className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] flex items-center gap-3"
              style={{ boxShadow: '0 0 30px hsl(38 80% 50% / 0.06)' }}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                <Globe className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-[11px] text-white/75 uppercase tracking-wider font-bold mb-0.5">URL Pública · Live</p>
                <p className="text-sm font-black text-amber-400 font-mono">campus-kind.vercel.app</p>
              </div>
              <ExternalLink className="w-4 h-4 text-amber-400/40 ml-auto" />
            </motion.div>

            {/* Achievement badge */}
            <motion.div {...m(0.55)} className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-white/70 font-medium">Construido <span className="text-emerald-400 font-black">en vivo</span> durante una sesión de clase real</p>
            </motion.div>
          </div>

          {/* Flujo real */}
          <motion.div {...m(0.3)} className="col-span-3 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/12 border border-amber-500/25 flex items-center justify-center">
                <School className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-black text-white">Fundación Trabún — Flujo Real</p>
                <p className="text-[11px] text-white/80">De Excel a producción, paso a paso</p>
              </div>
            </div>

            <div className="space-y-3">
              {FLOW.map((item, i) => (
                <motion.div key={i}
                  {...(isExporting ? {} : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] } })}
                  className="flex items-start gap-3">
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    <div className="w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                      <span className="text-[11px] font-black text-amber-400">{i + 1}</span>
                    </div>
                    {i < FLOW.length - 1 && <div className="w-px h-full bg-amber-500/10 absolute" style={{ left: '22px', top: '26px', height: '16px' }} />}
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-3 rounded-xl border border-white/[0.05] bg-white/[0.015] group hover:border-white/[0.08] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-black text-white/90">{item.step}</p>
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400/70 border border-amber-500/15">{item.tool}</span>
                    </div>
                    <p className="text-[11px] text-white/85 leading-relaxed">{item.action}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Result */}
            <motion.div {...m(0.75)} className="mt-4 p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs text-white/70">
                <span className="text-amber-400/80 font-black">Resultado: </span>
                App con 19,000 registros, multi-rol, datos reales, publicada en internet. <span className="text-white/85">En 90 minutos.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 50% 55% / 0.3), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase">Aplicación</span>
          <span className="text-[11px] font-black tabular-nums tracking-wider text-white/70">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 100px hsl(260 30% 2% / 0.88)' }} />
    </div>
  );
}
