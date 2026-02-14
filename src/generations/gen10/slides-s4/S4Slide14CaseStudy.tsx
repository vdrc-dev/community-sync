import { motion } from 'framer-motion';
import { ExternalLink, School, Users, Database, BarChart3, Clock, CheckCircle2, Globe } from 'lucide-react';
import bgCaseStudy from '@/assets/gen10-s4/bg-case-study-campus.jpg';
import { useExportContext } from '@/contexts/ExportContext';
import { useSlideNumber } from '@/contexts/SlideNumberContext';

const STATS = [
  { label: 'Registros', value: '19,000+', icon: Database, color: 'hsl(150 60% 50%)' },
  { label: 'Tablas', value: '12', icon: BarChart3, color: 'hsl(280 70% 60%)' },
  { label: 'Usuarios', value: 'Multi-rol', icon: Users, color: 'hsl(185 70% 50%)' },
  { label: 'Tiempo', value: '90 min', icon: Clock, color: 'hsl(38 90% 55%)' },
];

const FLOW = [
  'Excel con 19,000 filas → Cursor analiza y genera modelo relacional',
  'Lovable crea la interfaz con colores corporativos (naranja)',
  'Supabase almacena 12 tablas interconectadas con FK',
  'Auth restringe acceso a @fundaciontrabun.cl',
  'GitHub versiona todo. Deploy automático.',
];

export function S4Slide14CaseStudy() {
  const { isExporting } = useExportContext();
  const slideNum = useSlideNumber();
  const m = (d: number) => isExporting ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5 } };

  return (
    <div className="h-full w-full min-h-screen relative overflow-hidden flex flex-col justify-center px-16 2xl:px-20 font-sans" style={{ background: '#04030a' }}>
      <div className="absolute inset-0">
        <img src={bgCaseStudy} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04030a]/60 via-[#04030a]/40 to-[#04030a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,_hsl(38_80%_45%_/_0.08),_transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <motion.div {...m(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-amber-500" />
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Aplicación · Caso Real</span>
              <h1 className="text-4xl 2xl:text-5xl font-black text-white tracking-tight">Campus Kind</h1>
            </div>
          </div>
          <p className="text-amber-400/60 text-sm ml-5 pl-1">Sistema de gestión de colegios con datos reales. De Excel a app web en una sesión.</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-6">
          {/* Stats */}
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={i} {...m(0.15 + i * 0.08)}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
                  <p className="text-xl font-black text-white">{stat.value}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
            
            {/* URL */}
            <motion.div {...m(0.5)} className="col-span-2 p-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] flex items-center gap-3">
              <Globe className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-wider">URL Pública</p>
                <p className="text-sm font-bold text-amber-400 font-mono">campus-kind.lovable.app</p>
              </div>
              <ExternalLink className="w-4 h-4 text-amber-400/40 ml-auto" />
            </motion.div>
          </div>

          {/* Flow */}
          <motion.div {...m(0.3)} className="col-span-3 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-5">
              <School className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-white">Fundación Trabún — Flujo Real</span>
            </div>
            <div className="space-y-3">
              {FLOW.map((step, i) => (
                <motion.div key={i} {...(isExporting ? {} : { initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4 + i * 0.1 } })}
                  className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black text-amber-400">{i + 1}</span>
                  </div>
                  <span className="text-xs text-white/45 leading-relaxed">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px mx-16" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 50% 50% / 0.2), transparent)' }} />
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[10px] font-medium tracking-wider text-white/40 uppercase">APLICACIÓN</span>
          <span className="text-[11px] font-bold tabular-nums tracking-wider text-white/60">{slideNum ? `${String(slideNum.current).padStart(2, '0')} / ${slideNum.total}` : ''}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px 80px hsl(260 30% 3% / 0.85)' }} />
    </div>
  );
}
